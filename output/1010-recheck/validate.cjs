const {spawn}=require('node:child_process');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const assert=require('node:assert/strict');
const root=__dirname;
(async()=>{
 const chrome=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless','--disable-gpu','--disable-component-update','--no-sandbox','--remote-debugging-port=9247','--user-data-dir=/private/tmp/portfolio-1010-html-qa','--allow-file-access-from-files','about:blank'],{stdio:'ignore'});
 let ws;const report={date:'2026-10-10',method:'Local Chrome DevTools Protocol',scope:'Generated HTML only; does not validate original PDF or live service',checks:[]};
 try{
 let tabs;for(let n=0;n<70;n++){try{tabs=await(await fetch('http://127.0.0.1:9247/json')).json();break;}catch{}await new Promise(r=>setTimeout(r,100));}if(!tabs)throw Error('Chrome debug port unavailable');
 ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
 let seq=0;const pending=new Map();ws.onmessage=e=>{const x=JSON.parse(e.data);if(x.id){const p=pending.get(x.id);pending.delete(x.id);x.error?p.reject(x.error):p.resolve(x.result);}};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const x=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(x.exceptionDetails)throw Error(JSON.stringify(x.exceptionDetails));return x.result.value;};
 await send('Page.enable');
 for(const file of ['1010_원본과수정안.html','1010_수정원고_레이아웃.html']){
  for(const width of [390,960,1440,1920]){
   await send('Emulation.setDeviceMetricsOverride',{width,height:1080,deviceScaleFactor:1,mobile:false});
   await send('Page.navigate',{url:pathToFileURL(path.join(root,file)).href});
   await new Promise(r=>setTimeout(r,300));
   await evaluate(`(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));})()`);
   if(file.includes('레이아웃'))await evaluate(`document.querySelector('#all').checked=true;document.querySelector('#all').dispatchEvent(new Event('change'));`);
   const check=await evaluate(`(()=>{const badImages=[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src);const slides=[...document.querySelectorAll('.slide')];const collisions=slides.flatMap(s=>{const main=s.querySelector('.slide-main'),note=s.querySelector('.evidence-note'),foot=s.querySelector('footer');const items=[...s.querySelectorAll('.copy-card')];return [...items.filter(c=>c.offsetTop+c.offsetHeight>main.offsetTop+main.clientHeight+2).map(c=>({page:s.className,type:'card exceeds body',text:c.innerText})),...((note||main).offsetTop+(note||main).offsetHeight>foot.offsetTop-8?[{page:s.className,type:'body/footer overlap'}]:[])];});return{width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,badImages,slides:slides.length,reviews:document.querySelectorAll('.page-review').length,collisions};})()`);
   report.checks.push({file,...check});assert(!check.overflow,JSON.stringify(check));assert.equal(check.badImages.length,0);assert.equal(check.collisions.length,0,JSON.stringify(check.collisions));
   if(width===1440){if(file.includes('레이아웃'))await evaluate(`document.querySelector('#all').checked=false;show(13);document.querySelector('.viewport:not([hidden])').scrollIntoView({behavior:'instant'});`);const shot=await send('Page.captureScreenshot');fs.writeFileSync(path.join(root,'inspection',file.includes('레이아웃')?'draft-desktop.png':'review-desktop.png'),Buffer.from(shot.data,'base64'));}
  }
    if(file.includes('원본')){
   await evaluate(`document.querySelector('.copy-btn').click();`);await new Promise(r=>setTimeout(r,250));report.clipboardStatus=await evaluate(`document.querySelector('.copy .status').textContent`);assert(report.clipboardStatus.includes('コピー')||report.clipboardStatus.includes('복사'));
   const filters=await evaluate(`(()=>{document.querySelector('#group').value='TBM';document.querySelector('#group').dispatchEvent(new Event('change'));const shown=[...document.querySelectorAll('.page-review')].filter(s=>!s.hidden).length;document.querySelector('#reset').click();return{shown,reset:[...document.querySelectorAll('.page-review')].filter(s=>!s.hidden).length};})()`);assert.equal(filters.shown,5);assert.equal(filters.reset,26);report.filters=filters;
  }else{
   const nav=await evaluate(`(()=>{document.querySelector('#all').checked=false;document.querySelector('#all').dispatchEvent(new Event('change'));document.querySelector('#page-select').value='23';document.querySelector('#page-select').dispatchEvent(new Event('change'));const at23=document.querySelector('.viewport:not([hidden])').id;document.querySelector('#next').click();const next=document.querySelector('.viewport:not([hidden])').id;document.querySelector('#prev').click();return{at23,next,prev:document.querySelector('.viewport:not([hidden])').id};})()`);assert.equal(nav.at23,'page-23');assert.equal(nav.next,'page-24');assert.equal(nav.prev,'page-23');report.navigation=nav;
   await evaluate(`document.querySelector('#all').checked=true;document.querySelector('#all').dispatchEvent(new Event('change'));`);
   await send('Emulation.setEmulatedMedia',{media:'print'});
   const pdf=await send('Page.printToPDF',{printBackground:true,preferCSSPageSize:true});fs.writeFileSync(path.join(root,'1010_수정원고_레이아웃_확인용.pdf'),Buffer.from(pdf.data,'base64'));
   await send('Emulation.setEmulatedMedia',{media:''});
  }
 }
 const pages=JSON.parse(fs.readFileSync(path.join(root,'revision-data.json'),'utf8'));assert.equal(pages.length,26);assert(pages.every(p=>p.title&&p.desc&&p.blocks.length));assert(pages.every(p=>!p.desc.includes('법적 리스크')));report.manuscript={pages:26,everyPageHasTitleAndDescription:true};
 const originals=JSON.parse(fs.readFileSync(path.join(root,'source-manifest.json'),'utf8'));assert.equal(originals.length,26);report.originalImages={pages:26,hashVerifiedDuringBuild:true};
 report.status='passed';fs.writeFileSync(path.join(root,'validation.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await send('Browser.close');
 }finally{if(ws)ws.close();chrome.kill();}
})().catch(e=>{console.error(e);process.exit(1)});
