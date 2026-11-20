const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const withChrome=require('../tools/chrome.cjs');
const root=path.resolve(__dirname,'..');
(async()=>{await withChrome(async({send,evaluate})=>{
 const files=fs.readdirSync(root).filter(f=>/^project-.*\.html$/.test(f));
 for(const disabled of [true,false]){
  await send('Emulation.setScriptExecutionDisabled',{value:disabled});
  for(const file of files){
   await send('Page.navigate',{url:pathToFileURL(path.join(root,file)).href});
   for(let n=0;n<100;n++){if(await evaluate(`document.readyState==='complete' && document.body.dataset.project===${JSON.stringify(file.slice(8,-5))}`))break;await new Promise(r=>setTimeout(r,50));}
   const info=await evaluate(`({brief:document.querySelectorAll('.case-brief').length,context:document.querySelectorAll('.case-context').length,lead:document.querySelector('.case-lead').textContent.length,sections:document.querySelectorAll('.gallery .story-section').length,next:document.querySelector('.next a').getAttribute('href'),header:document.querySelectorAll('#primary-nav').length,images:[...document.querySelectorAll('main img')].every(i=>i.hasAttribute('srcset')&&i.width>0&&i.hasAttribute('height'))})`);
   assert.equal(info.brief,1,file+' duplicate or missing static brief');assert.equal(info.context,1);assert.ok(info.lead>20&&info.sections>=3);assert.match(info.next,/^project-.*\.html$/);assert.equal(info.header,1);assert.equal(info.images,true);
   if(!disabled){
    const result=await evaluate(`(async()=>{const trigger=document.querySelector('#solution .image-zoom');if(!trigger)return false;trigger.click();const dialog=document.querySelector('.image-viewer');await dialog.querySelector('img').decode();const opened=dialog.open&&dialog.querySelector('img').naturalWidth>0;dialog.querySelector('button').click();await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));return opened&&!dialog.open&&!document.body.classList.contains('viewer-open')&&document.activeElement===trigger;})()`);
    assert.equal(result,true,file+' viewer open/close/focus');
   }
  }
  console.log('PASS: 10 detail pages with JavaScript '+(disabled?'disabled (content, navigation and responsive images)':'enabled (no duplicate content, viewer and focus)'));
 }
 await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await send('Page.navigate',{url:pathToFileURL(path.join(root,'index.html')).href});
 for(let n=0;n<100;n++){if(await evaluate(`document.readyState==='complete' && document.body.classList.contains('portfolio-home')`))break;await new Promise(r=>setTimeout(r,50));}
 await evaluate(`(async()=>{for(const image of document.images)image.loading='eager';await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));})()`);
 await send('Page.captureScreenshot').then(result=>fs.writeFileSync(path.join(os.tmpdir(),'portfolio-optimized-home.png'),Buffer.from(result.data,'base64')));
 });})().catch(e=>{console.error(e);process.exitCode=1;});
