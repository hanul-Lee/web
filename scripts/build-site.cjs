const fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
const withChrome=require('./lib/chrome.cjs');
const {addSecurityMeta}=require('./lib/security.cjs');
const {root,src,dist,build,assets}=require('./lib/paths.cjs');
process.chdir(root);
const content=require('../src/content/projects.json');
const pageMeta=require('../src/content/page-meta.json');
const manifest=require('../src/content/image-manifest.json');
const images=new Map(Object.entries(manifest).flatMap(([source,image])=>[[source,image],...image.variants.map(v=>[v.src,image])]));
const site=new URL(process.env.SITE_URL||'https://hanul-lee.github.io/web/');
if(!/^https?:$/.test(site.protocol)||site.search||site.hash||site.username||site.password)throw Error('SITE_URL must be an HTTP(S) base URL');
if(!site.pathname.endsWith('/'))site.pathname+='/';
const escape=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
function responsive(html){
 return html.replace(/<img\b[^>]*>/g,tag=>{
  const source=tag.match(/\bsrc="([^"]+)"/)?.[1],image=images.get(source);if(!image)return tag;
  tag=tag.replace(/\s(?:width|height|srcset|sizes)="[^"]*"/g,'').replace(`src="${source}"`,`src="${image.src}"`);
  return tag.replace(/\s*\/?\>$/,` width="${image.width}" height="${image.height}" srcset="${image.variants.map(v=>`${v.src} ${v.width}w`).join(', ')}" sizes="(max-width: 800px) calc(100vw - 40px), (max-width: 1100px) 90vw, 60vw">`);
 }).replace(/(<div class="more-project-thumb"><img[^>]* sizes=")[^"]*/g,'$164px').replace(/(<div class="next-preview"><img[^>]* sizes=")[^"]*/g,'$1(max-width: 600px) 96px, 160px');
}
function metadata(html,file){
 html=html.replace(/\s*<meta (?:property="og:(?:image(?::[\w]+)?|url)"|name="twitter:[^"]+")[^>]*>/g,'').replace(/\s*<link rel="canonical"[^>]*>/g,'');
 const url=new URL(file==='index.html'?'':file,site).href,image=new URL('assets/og-image.png',site).href;
 const title=html.match(/<title>(.*?)<\/title>/s)[1];
 return addSecurityMeta(html.replace('</head>',`    <link rel="canonical" href="${escape(url)}">\n    <meta property="og:url" content="${escape(url)}">\n    <meta property="og:image" content="${escape(image)}">\n    <meta property="og:image:width" content="1200">\n    <meta property="og:image:height" content="630">\n    <meta property="og:image:alt" content="이한울 UX/UI 포트폴리오 · B2B 업무 서비스의 정보 구조와 UI 설계">\n    <meta name="twitter:card" content="summary_large_image">\n    <meta name="twitter:title" content="${title.replace(/"/g,'&quot;')}">\n    <meta name="twitter:image" content="${escape(image)}">\n  </head>`).replace(/[ \t]+$/gm,''));
}
function projectTemplate(slug){
 const p=content.projects[slug],meta=pageMeta[slug];
 if(!meta)throw Error('Missing page metadata: '+slug);
 for(const action of meta.actions){const url=new URL(action.href,site);if(!['http:','https:'].includes(url.protocol)||url.username||url.password||action.href.startsWith('//'))throw Error('Unsafe project link: '+slug);}
 const actions=meta.actions.map(a=>`<a href="${escape(a.href)}"${a.newTab?' target="_blank" rel="noopener noreferrer"':''}>${escape(a.label)}${a.arrow?` <span aria-hidden="true">${escape(a.arrow)}</span>`:''}</a>`).join('');
 const values={...meta,slug,title:p.title+' | 이한울 · UX/UI 디자이너',actions};
 return fs.readFileSync(path.join(src,'templates/project.html'),'utf8').replace(/{{(\w+)}}/g,(_,key)=>key==='actions'?actions:escape(values[key]??''));
}
function copyAssets(){
 const corpus=[fs.readFileSync(path.join(src,'templates/index.html'),'utf8'),JSON.stringify(content),...['shared','portfolio','case'].map(n=>[...fs.readFileSync(path.join(dist,n+'.css'),'utf8').matchAll(/url\(([^)]+)\)/g)].map(m=>m[1]).join('\n'))].join('\n');
 const references=new Set([...corpus.matchAll(/assets\/[\w/.-]+\.[a-z0-9]+/g)].map(m=>m[0]));
 references.add('assets/og-image.png');references.add('assets/favicon.svg');
 for(const name of fs.readdirSync(path.join(assets,'fonts')).filter(f=>f.endsWith('.txt')))references.add('assets/fonts/'+name);
 const files=new Set();
 for(const url of references){
  if(url==='assets/fonts/fonts.css')continue;
  const image=images.get(url);if(image)image.variants.forEach(v=>files.add(v.src));else files.add(url);
 }
 for(const url of files){
  if(!/^assets\/[\w/.-]+$/.test(url)||url.split('/').some(part=>part==='..'||part==='.'||part.startsWith('.')))throw Error('Unsafe asset path');
  const from=path.join(assets,url.slice(7)),to=path.join(dist,url);
  if(!fs.existsSync(from))throw Error('Missing source asset: '+url);
  const actual=fs.realpathSync(from),assetRoot=fs.realpathSync(assets);if(!actual.startsWith(assetRoot+path.sep))throw Error('Asset resolves outside src/assets');
  fs.mkdirSync(path.dirname(to),{recursive:true});fs.copyFileSync(from,to);
 }
}
(async()=>{
 fs.rmSync(dist,{recursive:true,force:true});fs.mkdirSync(dist,{recursive:true});fs.mkdirSync(build,{recursive:true});
 require('./build-styles.cjs')();copyAssets();
 for(const file of fs.readdirSync(path.join(src,'scripts')).filter(f=>f.endsWith('.js')))fs.copyFileSync(path.join(src,'scripts',file),path.join(dist,file));
 const files=Object.keys(content.projects).sort().map(slug=>'project-'+slug+'.html');
 await withChrome(async({send,evaluate})=>{
  for(const file of ['index.html',...files]){
   const slug=file.slice(8,-5),template=file==='index.html'?fs.readFileSync(path.join(src,'templates/index.html'),'utf8'):projectTemplate(slug);
   await send('Page.navigate',{url:'about:blank'});
   const {frameTree}=await send('Page.getFrameTree');
   const scripts=[...template.matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/g)].map(m=>m[0]).join('\n');
   const html=template.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace('<head>',`<head><base href="${pathToFileURL(dist+path.sep).href}">`);
   await send('Page.setDocumentContent',{frameId:frameTree.frame.id,html});
   if(file!=='index.html')await evaluate(`const {projects,caseStudies,projectOrder}=${JSON.stringify(content)};\n`+fs.readFileSync(path.join(__dirname,'render-project.js'),'utf8'));
   await evaluate(fs.readFileSync(path.join(src,'scripts/components.js'),'utf8'));
   const output=await evaluate(`document.querySelector('base').remove();'<!doctype html>\\n'+document.documentElement.outerHTML`);
   fs.writeFileSync(path.join(dist,file),responsive(metadata(output.replace('</body>',scripts+'\n</body>'),file))+'\n');
  }
 });
 fs.writeFileSync(path.join(dist,'robots.txt'),`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml',site).href}\n`);
 fs.writeFileSync(path.join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${['index.html',...files].map(f=>`  <url><loc>${escape(new URL(f==='index.html'?'':f,site).href)}</loc></url>`).join('\n')}\n</urlset>\n`);
 const notFound=`<!doctype html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>페이지를 찾을 수 없습니다 | 이한울</title><style>body{margin:0;background:#0c0f14;color:#fff;font-family:system-ui,sans-serif;display:grid;min-height:100vh;place-items:center}main{padding:32px;max-width:640px}a{color:#a9c5ff}h1{font-size:clamp(28px,5vw,48px)}</style></head><body><main><p>404</p><h1>페이지를 찾을 수 없습니다.</h1><p>주소가 바뀌었거나 존재하지 않는 페이지입니다.</p><a href="${escape(site.href)}">포트폴리오 홈으로 돌아가기 →</a></main></body></html>`;
 fs.writeFileSync(path.join(dist,'404.html'),metadata(notFound,'404.html'));
 fs.writeFileSync(path.join(dist,'.nojekyll'),'');
 require('./build-fonts.cjs')();
 console.log('Built dist/: home, 10 project pages from one template, public assets, styles, scripts, fonts and metadata.');
})().catch(e=>{console.error(e);process.exitCode=1;});
