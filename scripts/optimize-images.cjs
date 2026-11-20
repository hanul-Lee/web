// Local Chrome's canvas encoder avoids native image dependencies.
const fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
const withChrome=require('./lib/chrome.cjs');
const root=path.resolve(__dirname,'..');process.chdir(root);
const sources=['src/templates/index.html','src/content/projects.json','src/styles/portfolio.scss'].map(f=>fs.readFileSync(f,'utf8')).join('\n');
const discovered=[...new Set([...sources.matchAll(/assets\/[\w/.-]+\.(?:png|jpe?g|webp)/g)].map(m=>m[0]))].sort();
const paths=fs.existsSync('src/content/image-manifest.json') ? Object.keys(JSON.parse(fs.readFileSync('src/content/image-manifest.json','utf8'))) : discovered;
(async()=>{await withChrome(async({send,evaluate})=>{
 await send('Page.navigate',{url:pathToFileURL(path.join(root,'dist/index.html')).href});
 const manifest={};let before=0,after=0;
 for(const source of paths){
  const original=fs.existsSync('.local/image-sources/'+source) ? '.local/image-sources/'+source : 'src/'+source;
  if(!fs.existsSync(original))throw Error('Original image is unavailable: '+source+' (restore .local/image-sources to re-encode)');
  const result=await evaluate(`(async()=>{const image=new Image();image.src=${JSON.stringify(pathToFileURL(path.join(root,original)).href)};await image.decode();const variants=[];for(const width of [...new Set([480,960,1920,2560].map(w=>Math.min(w,image.naturalWidth)))]){const canvas=document.createElement('canvas');canvas.width=width;canvas.height=Math.round(image.naturalHeight*width/image.naturalWidth);canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);variants.push({width,height:canvas.height,data:canvas.toDataURL('image/webp',.88).split(',')[1]});}return variants;})()`);
  const variants=result.map(({width,height,data})=>{const file=source.replace(/\.[^.]+$/,'')+`-${width}w.webp`;fs.writeFileSync('src/'+file,Buffer.from(data,'base64'));after+=fs.statSync('src/'+file).size;return {src:file,width,height};});
  manifest[source]={...variants.at(-1),variants};before+=fs.statSync(original).size;
 }
 fs.writeFileSync('src/content/image-manifest.json',JSON.stringify(manifest,null,2)+'\n');
 // A deterministic branded share card with real text, rendered at 1200×630.
 const social=await evaluate(`(()=>{const c=document.createElement('canvas');c.width=1200;c.height=630;const x=c.getContext('2d');x.fillStyle='#0c0f14';x.fillRect(0,0,1200,630);x.fillStyle='#a9c5ff';x.font='600 24px sans-serif';x.fillText('HANUL · UX/UI DESIGNER',76,100);x.fillStyle='#fff';x.font='bold 66px sans-serif';x.fillText('B2B 업무 서비스의',76,240);x.fillText('정보 구조와 UI를 설계합니다.',76,330);x.fillStyle='#aab4c5';x.font='28px sans-serif';x.fillText('현장 안전 기록  /  공통 UI 기준  /  iOS 출시 앱',76,438);x.fillStyle='#a9c5ff';x.fillRect(76,509,70,5);x.fillStyle='#fff';x.font='bold 26px sans-serif';x.fillText('이한울  |  Portfolio',76,574);return c.toDataURL('image/png').split(',')[1];})()`);
 fs.writeFileSync('src/assets/og-image.png',Buffer.from(social,'base64'));
 console.log(`Images: ${(before/1e6).toFixed(2)} MB originals → ${(after/1e6).toFixed(2)} MB including all responsive variants (${paths.length} images)`);
});})().catch(e=>{console.error(e);process.exitCode=1;});
