const fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
const withChrome=require('./chrome.cjs');
const root=path.resolve(__dirname,'..');process.chdir(root);
const site=new URL(process.env.SITE_URL||'https://hanul-lee.github.io/web/');
if(!/^https?:$/.test(site.protocol)||site.search||site.hash)throw Error('SITE_URL must be an HTTP(S) base URL');
if(!site.pathname.endsWith('/'))site.pathname+='/';
const manifest=JSON.parse(fs.readFileSync('tools/image-manifest.json','utf8'));
const images=new Map(Object.entries(manifest).flatMap(([source,image])=>[[source,image],[image.src,image]]));
function responsive(html){return html.replace(/<img\b[^>]*>/g,tag=>{
 const source=tag.match(/\bsrc="([^"]+)"/)?.[1],image=images.get(source);if(!image)return tag;
 tag=tag.replace(/\s(?:width|height|srcset|sizes)="[^"]*"/g,'').replace(`src="${source}"`,`src="${image.src}"`);
 return tag.replace(/\s*\/?\>$/,` width="${image.width}" height="${image.height}" srcset="${image.variants.map(v=>`${v.src} ${v.width}w`).join(', ')}" sizes="(max-width: 800px) calc(100vw - 40px), (max-width: 1100px) 90vw, 60vw">`);
});}
function metadata(html,file){
 html=html.replace(/\s*<meta (?:property="og:(?:image(?::[\w]+)?|url)"|name="twitter:[^"]+")[^>]*>/g,'').replace(/\s*<link rel="canonical"[^>]*>/g,'');
 const url=new URL(file==='index.html'?'':file,site).href;
 const image=new URL('assets/og-image.png',site).href;
 const title=html.match(/<title>(.*?)<\/title>/s)[1];
 return html.replace('</head>',`    <link rel="canonical" href="${url}">\n    <meta property="og:url" content="${url}">\n    <meta property="og:image" content="${image}">\n    <meta property="og:image:width" content="1200">\n    <meta property="og:image:height" content="630">\n    <meta property="og:image:alt" content="이한울 UX/UI 포트폴리오 · B2B 업무 서비스의 정보 구조와 UI 설계">\n    <meta name="twitter:card" content="summary_large_image">\n    <meta name="twitter:title" content="${title}">\n    <meta name="twitter:image" content="${image}">\n  </head>`).replace(/[ \t]+$/gm,'');
}
(async()=>{require('./build-styles.cjs');
 const files=fs.readdirSync('tools/templates').filter(f=>/^project-.*\.html$/.test(f));
 await withChrome(async({send,evaluate})=>{
 for(const file of files){
  const template=fs.readFileSync('tools/templates/'+file,'utf8');
  await send('Page.navigate',{url:'about:blank'});
  const {frameTree}=await send('Page.getFrameTree');
  const scripts=[...template.matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/g)].map(m=>m[0]).join('\n');
  const html=template.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace('<head>',`<head><base href="${pathToFileURL(root+path.sep).href}">`);
  await send('Page.setDocumentContent',{frameId:frameTree.frame.id,html});
  await evaluate(fs.readFileSync('tools/render-case.js','utf8'));
  await evaluate(fs.readFileSync('components.js','utf8'));
  const output=await evaluate(`document.querySelector('base').remove();'<!doctype html>\\n'+document.documentElement.outerHTML`);
  fs.writeFileSync(file,responsive(metadata(output.replace('</body>',scripts+'\n</body>'),file))+'\n');
 }
 });
 fs.writeFileSync('index.html',responsive(metadata(fs.readFileSync('index.html','utf8'),'index.html')).replace(/(<div class="more-project-thumb"><img[^>]* sizes=")[^"]*/g,'$164px'));
 fs.writeFileSync('robots.txt',`User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml',site).href}\n`);
 const escape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
 fs.writeFileSync('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${['index.html',...files].map(f=>`  <url><loc>${escape(new URL(f==='index.html'?'':f,site).href)}</loc></url>`).join('\n')}\n</urlset>\n`);
 const notFound=`<!doctype html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>페이지를 찾을 수 없습니다 | 이한울</title><style>body{margin:0;background:#0c0f14;color:#fff;font-family:system-ui,sans-serif;display:grid;min-height:100vh;place-items:center}main{padding:32px;max-width:640px}a{color:#a9c5ff}h1{font-size:clamp(28px,5vw,48px)}</style></head><body><main><p>404</p><h1>페이지를 찾을 수 없습니다.</h1><p>주소가 바뀌었거나 존재하지 않는 페이지입니다.</p><a href="${site.href}">포트폴리오 홈으로 돌아가기 →</a></main></body></html>`;
 fs.writeFileSync('404.html',metadata(notFound,'404.html'));
 require('./build-fonts.cjs');
 console.log('Built 10 static project pages, responsive images, sharing metadata, sitemap, robots and 404.');
})().catch(e=>{console.error(e);process.exitCode=1;});
