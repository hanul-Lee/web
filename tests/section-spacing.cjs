const {spawn}=require('node:child_process');
const fs=require('node:fs');
const path=require('node:path');
const os=require('node:os');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..');
const assert=require('node:assert/strict');
(async()=>{
const chrome=spawn(process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless','--disable-gpu','--no-sandbox','--disable-component-update','--remote-debugging-port=9223','--user-data-dir=/tmp/portfolio-browser-check','--allow-file-access-from-files','about:blank'],{stdio:'ignore'});
let ws;
try{
let tabs;
for(let n=0;n<50;n++){try{tabs=await(await fetch('http://127.0.0.1:9223/json')).json();break;}catch{}await new Promise(r=>setTimeout(r,100));}
ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
let id=0;const pending=new Map();ws.onmessage=e=>{const x=JSON.parse(e.data);if(x.id){const p=pending.get(x.id);pending.delete(x.id);x.error?p.reject(x.error):p.resolve(x.result);}};
function send(method,params={}){return new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});}
async function evalJS(expression){const x=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(x.exceptionDetails)throw Error(JSON.stringify(x.exceptionDetails));return x.result.value;}
await send('Page.enable');
const base=pathToFileURL(root+path.sep).href;
const report=[];
for(const width of [320,390,600,800,801,1024,1280,1440,1920,2560]){
await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
for(const file of ['index.html',...['dashboard','platform','intranet','kanvan','tbm','responsive','psc','designsystem','skyautonet','pet'].map(x=>'project-'+x+'.html')]){
await send('Page.navigate',{url:base+file});
await new Promise(r=>setTimeout(r,100));
await evalJS(`new Promise(resolve=>{const ready=()=>document.readyState==='complete'&&(!document.body.dataset.project||document.querySelector('.case-context'));if(ready())resolve();else{const timer=setInterval(()=>{if(ready()){clearInterval(timer);resolve()}},20)}})`);
await evalJS(`(async()=>{for(const image of document.images) image.loading='eager';await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));})()`);
const info=await evalJS(`(()=>{
const stacks=document.body.classList.contains('portfolio-home')?[[document.querySelector('main'),':scope > section'],[document.querySelector('.featured-projects'),':scope > .work-case']]:[[document.querySelector('.case-main'),':scope > section'],[document.querySelector('.case-body'),':scope > .case-context, :scope > .gallery, :scope > .next'],[document.querySelector('.gallery'),':scope > .story-section']];
const gaps=[];for(const [parent,selector]of stacks){const nodes=[...parent.querySelectorAll(selector)];for(let i=1;i<nodes.length;i++){const a=nodes[i-1],b=nodes[i];const as=getComputedStyle(a),bs=getComputedStyle(b);gaps.push({stack:parent.className||'main',from:a.id||a.className,to:b.id||b.className,actual:+(b.getBoundingClientRect().top-a.getBoundingClientRect().bottom).toFixed(2),previousMargin:as.marginBottom,nextMargin:bs.marginTop});}}
return{width:innerWidth,gapToken:getComputedStyle(document.documentElement).getPropertyValue('--section-gap').trim(),gaps,overflow:document.documentElement.scrollWidth>innerWidth,missing:[...document.images].filter(i=>!i.naturalWidth).length};})()`);
assert.equal(info.overflow,false,file+' overflow '+width);assert.equal(info.missing,0,file+' missing images');
const min=width<=800?60:96,max=width<=800?74:120;
for(const gap of info.gaps){assert.ok(gap.actual>=min-.1&&gap.actual<=max+.1,JSON.stringify({file,width,...gap}));assert.equal(gap.previousMargin,'0px');assert.equal(gap.nextMargin,'0px');}
if(file !== 'index.html') {
  const numbers = await evalJS(`Array.from(document.querySelectorAll('.gallery > .story-section > header > p, .gallery > .story-section > .solution-copy > p')).map(x => x.textContent.match(/^([0-9]{2}) /)?.[1]).filter(Boolean).map(Number)`);
  assert.deepEqual(numbers, numbers.map((_, i) => i + 2), file + ' section sequence');
  assert.equal(await evalJS(`document.querySelectorAll('.user-voice').length`), 0);
}
if(width <= 1024) {
  await evalJS(`document.querySelector('.menu').click()`);
  const menu = await evalJS(`(()=>{const n=document.querySelector('#primary-nav').getBoundingClientRect(),b=document.querySelector('.menu').getBoundingClientRect();return {width:n.width,right:n.right,buttonRight:b.right,expanded:document.querySelector('.menu').getAttribute('aria-expanded')};})()`);
  assert.equal(menu.expanded,'true');
  assert.ok(menu.width < width - 48, file + ' compact menu');
  assert.ok(Math.abs(menu.right-menu.buttonRight)<2, file + ' menu right alignment');
  await evalJS(`document.querySelector('.menu').click()`);
}
report.push({file,...info});
if(file==='index.html'&&width===390){await evalJS(`document.documentElement.style.scrollBehavior='auto'; document.querySelector('.selected-work').scrollIntoView({behavior:'instant'})`);const shot=await send('Page.captureScreenshot');fs.writeFileSync('/tmp/section-gap-home.png',Buffer.from(shot.data,'base64'));}
if(file==='project-dashboard.html'&&width===1280){await evalJS(`document.documentElement.style.scrollBehavior='auto'; document.querySelector('#evidence').scrollIntoView({behavior:'instant'})`);const shot=await send('Page.captureScreenshot');fs.writeFileSync('/tmp/section-gap-detail.png',Buffer.from(shot.data,'base64'));}
}
console.log('PASS',width+'px','11 pages: all outer gaps within '+(width<=800?'60–74':'96–120')+'px, zero adjacent margins, no overflow or missing images');
}
fs.writeFileSync(process.env.AUDIT_REPORT || path.join(os.tmpdir(),'section-spacing-validation.json'),JSON.stringify({date:'2026-10-05',method:'Chrome DevTools Protocol + getBoundingClientRect + computed styles',results:report},null,2));
await send('Browser.close');
}finally{if(ws)ws.close();chrome.kill();}
})().catch(e=>{console.error(e);process.exit(1)});
