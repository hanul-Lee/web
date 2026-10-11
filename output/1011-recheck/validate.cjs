const {spawn}=require('node:child_process');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..');
const order=['platform','tbm','dashboard','designsystem','intranet','kanvan','responsive','psc','skyautonet','pet'];
const report={date:'2026-10-11',method:'Local Chrome DevTools Protocol',scope:'Local website and review artifacts; original PDF and live apps not tested',checks:[],errors:[],interactions:[]};
(async()=>{
 const chrome=spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless','--disable-gpu','--no-sandbox','--disable-component-update','--remote-debugging-port=9251','--user-data-dir=/private/tmp/portfolio-1011-qa','--allow-file-access-from-files','about:blank'],{stdio:'ignore'});
 let ws;
 try{
  let tabs;
  for(let i=0;i<80;i++){try{tabs=await(await fetch('http://127.0.0.1:9251/json')).json();break;}catch{}await new Promise(r=>setTimeout(r,100));}
  assert(tabs,'Chrome debugging connection unavailable');
  ws=new WebSocket((tabs.find(t=>t.url==='about:blank') || tabs.find(t=>t.type==='page')).webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
  let seq=0;const pending=new Map();
  ws.onmessage=e=>{const x=JSON.parse(e.data);if(x.id){const p=pending.get(x.id);pending.delete(x.id);x.error?p.reject(x.error):p.resolve(x.result);}else if(x.method==='Runtime.exceptionThrown')report.errors.push(x.params.exceptionDetails);};
  const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
  const evaluate=async expression=>{const x=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});assert(!x.exceptionDetails,JSON.stringify(x.exceptionDetails));return x.result.value;};
  await send('Page.enable');await send('Runtime.enable');
  async function visit(file,width){
   await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
   await send('Page.navigate',{url:pathToFileURL(path.join(root,file)).href});
   await send('Page.bringToFront');
   await new Promise(r=>setTimeout(r,150));
   await evaluate(`(async()=>{while(document.readyState!=='complete')await new Promise(r=>setTimeout(r,20));document.querySelectorAll('img').forEach(i=>i.loading='eager');await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));})()`);
  }
  console.log('PASS: 11 pages at 390, 801 and 1440px; text, image, local-link and next-project checks');
  for(const width of [390,801,1440])for(const file of ['index.html',...order.map(x=>'project-'+x+'.html')]){
   await visit(file,width);
   const info=await evaluate(`(()=>{const texts=[],walker=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT);while(walker.nextNode()){const n=walker.currentNode,p=n.parentElement;if(!n.textContent.trim()||p.closest('script,style,svg,.case-progress'))continue;const range=document.createRange();range.selectNodeContents(n);for(const r of range.getClientRects())if(r.width&&r.height)texts.push({p,x:r.x,y:r.y,right:r.right,bottom:r.bottom,text:n.textContent.trim().slice(0,60)});}const overlaps=[];for(let i=0;i<texts.length;i++)for(let j=i+1;j<texts.length;j++){const a=texts[i],b=texts[j];if(a.p===b.p)continue;if(Math.min(a.right,b.right)-Math.max(a.x,b.x)>3&&Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y)>3)overlaps.push([a.text,b.text]);}return{width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth+1,missingImages:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),h1:document.querySelector('h1')?.textContent.trim(),sections:document.querySelectorAll('.gallery .story-section').length,overlaps,next:document.querySelector('.next a')?.getAttribute('href'),images:document.images.length,links:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))};})()`);
   for(const link of info.links){if(/^(?:https?:|mailto:|tel:|#)/.test(link))continue;assert(fs.existsSync(path.resolve(path.dirname(path.join(root,file)),link.split(/[?#]/)[0])),`Missing local link ${file}: ${link}`);}
   assert(!info.overflow,`${file} ${width} overflow`);assert.equal(info.missingImages.length,0);assert.equal(info.overlaps.length,0,JSON.stringify({file,width,overlaps:info.overlaps}));assert(info.h1);
   if(file!=='index.html'){assert(info.sections>=5);const slug=file.slice(8,-5);assert.equal(info.next,`project-${order[(order.indexOf(slug)+1)%order.length]}.html`);}
   delete info.links;report.checks.push({file,...info});
   if((file==='index.html'&&(width===390||width===1440))||(file==='project-tbm.html'&&width===390)||(file==='project-dashboard.html'&&width===1440)||(file==='project-designsystem.html'&&width===1440)){
    const shot=await send('Page.captureScreenshot');fs.writeFileSync(path.join(__dirname,`${file.replace('.html','')}-${width}.png`),Buffer.from(shot.data,'base64'));
   }
  }
  await visit('index.html',390);
  const home=await evaluate(`({featured:[...document.querySelectorAll('.work-case')].map(a=>a.querySelector('a').getAttribute('href')),extra:[...document.querySelectorAll('.more-project')].map(a=>a.getAttribute('href')),phone:document.querySelector('a[href="tel:+821092718997"]')?.textContent})`);
  assert.deepEqual(home.featured,order.slice(0,4).map(x=>`project-${x}.html`));assert.deepEqual(home.extra,order.slice(4).map(x=>`project-${x}.html`));assert(home.phone);report.home=home;
  await evaluate(`document.querySelector('.menu').click()`);assert.equal(await evaluate(`document.querySelector('.menu').getAttribute('aria-expanded')`),'true');
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape'});
  assert.equal(await evaluate(`document.querySelector('.menu').getAttribute('aria-expanded')`),'false');report.interactions.push('Mobile menu open and Escape close');
  for(const slug of order.slice(0,6)){
   await visit(`project-${slug}.html`,390);
   await evaluate(`document.querySelector('.brief-heading a').click()`);assert(await evaluate(`location.hash==='#solution'`));
   await evaluate(`document.querySelector('.image-zoom').click()`);assert(await evaluate(`document.querySelector('dialog').open`));
   await evaluate(`document.querySelector('dialog img').decode()`);
   await send('Input.dispatchKeyEvent',{type:'rawKeyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
   await evaluate(`new Promise(r=>setTimeout(r,100))`);
   assert.equal(await evaluate(`document.querySelector('dialog').open`),false);assert(await evaluate(`document.activeElement.classList.contains('image-zoom')`));report.interactions.push(`${slug}: summary link, image zoom, Escape and focus restore`);
   console.log('PASS:',slug,'summary, zoom, Escape, focus restore');
  }
  await send('Emulation.setScriptExecutionDisabled',{value:true});
  await send('Page.navigate',{url:pathToFileURL(path.join(root,'index.html')).href});
  await new Promise(r=>setTimeout(r,300));
  assert.equal(await evaluate(`document.querySelectorAll('.work-case').length+document.querySelectorAll('.more-project').length`),10);report.interactions.push('All 10 project links present without JavaScript');
  await send('Emulation.setScriptExecutionDisabled',{value:false});
  const review='output/1011-recheck/1011_원본과_최종수정안.html';
  for(const width of [390,1440]){
   await visit(review,width);
   const result=await evaluate(`({pages:document.querySelectorAll('.review').length,overflow:document.documentElement.scrollWidth>innerWidth+1,missingImages:[...document.images].filter(i=>!i.naturalWidth).length})`);
   assert.equal(result.pages,26);assert(!result.overflow);assert.equal(result.missingImages,0);report.checks.push({file:review,width,...result});
  }
  await send('Emulation.setEmulatedMedia',{media:'print'});
  const printed=await send('Page.printToPDF',{printBackground:true,preferCSSPageSize:true,displayHeaderFooter:false});
  const pdfPath=path.join(__dirname,'1011_남은수정안_인쇄용.pdf');fs.writeFileSync(pdfPath,Buffer.from(printed.data,'base64'));
  report.print={file:path.basename(pdfPath),bytes:fs.statSync(pdfPath).size,purpose:'Correction instructions only; original page images omitted when printing'};
  assert.equal(report.errors.length,0,JSON.stringify(report.errors));report.status='passed';
  fs.writeFileSync(path.join(__dirname,'web-validation.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({status:report.status,checks:report.checks.length,interactions:report.interactions.length,print:report.print}));
  await send('Browser.close');
 }catch(e){report.status='failed';report.failure=String(e);fs.writeFileSync(path.join(__dirname,'web-validation.json'),JSON.stringify(report,null,2));throw e;}
 finally{if(ws)ws.close();chrome.kill();}
})().catch(e=>{console.error(e);process.exit(1)});
