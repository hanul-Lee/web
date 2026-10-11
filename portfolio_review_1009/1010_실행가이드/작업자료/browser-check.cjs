const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const {spawn} = require('node:child_process');
const {pathToFileURL} = require('node:url');
const out = path.resolve(__dirname, '..');
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-guide-check-'));
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless', '--disable-gpu', '--no-sandbox', '--disable-background-networking',
  '--disable-sync', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=0', '--user-data-dir='+profile, '--allow-file-access-from-files', 'about:blank'
], {stdio:'ignore'});
const delay = ms => new Promise(resolve => setTimeout(resolve,ms));
let ws;
(async()=>{
  let port;
  for(let i=0;i<100;i++) {
    const active=path.join(profile,'DevToolsActivePort');
    if(fs.existsSync(active)){port=fs.readFileSync(active,'utf8').split('\n')[0];break}
    await delay(100);
  }
  if(!port) throw new Error('Chrome debugger did not start');
  const tab=await (await fetch('http://127.0.0.1:'+port+'/json/new?about:blank',{method:'PUT'})).json();
  ws=new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true})});
  let serial=0;const pending=new Map();
  ws.addEventListener('message',ev=>{const message=JSON.parse(ev.data);if(message.id&&pending.has(message.id)){const {resolve,reject}=pending.get(message.id);pending.delete(message.id);message.error?reject(new Error(JSON.stringify(message.error))):resolve(message.result)}});
  const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));setTimeout(()=>{if(pending.has(id)){pending.delete(id);reject(new Error('timeout: '+method))}},15000).unref()});
  const evaluate=async expression=>{const value=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(value.exceptionDetails)throw new Error(JSON.stringify(value.exceptionDetails));return value.result.value};
  await call('Page.enable');
  await call('Page.navigate',{url:pathToFileURL(path.join(out,'원본-수정배치-비교.html')).href});
  for(let i=0;i<50;i++){if(await evaluate('document.readyState === "complete"'))break;await delay(100)}
  const results=[];
  for(const width of [1440,390]){
    await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
    for(let n=1;n<=26;n++){
      const result=await evaluate(`(async()=>{show(${n});const section=document.querySelector('.detail.active');section.querySelectorAll('img').forEach(i=>i.loading='eager');await document.fonts.ready;await Promise.all([...section.querySelectorAll('img')].map(i=>i.decode().catch(()=>{})));return {page:${n},width:innerWidth,active:document.querySelectorAll('.detail.active').length,images:[...section.querySelectorAll('img')].every(i=>i.naturalWidth>0),overflow:document.documentElement.scrollWidth>innerWidth+1,rows:section.querySelectorAll('tbody tr').length}})()`);
      results.push(result);
    }
  }
  const sourceMapping=await evaluate(`(()=>{document.querySelector('#original').value='25';document.querySelector('#original').dispatchEvent(new Event('change'));return {target:document.querySelector('.detail.active').id,original:document.querySelector('.detail.active .before-label').textContent}})()`);
  const controls=await evaluate(`(()=>{show(6);document.querySelector('#next').click();const next=current;document.querySelector('#previous').click();return {next,previous:current}})()`);
  const report={checks:results.length,results,sourceMapping,controls};
  fs.writeFileSync(path.join(out,'작업자료/browser-validation.json'),JSON.stringify(report,null,2));
  if(results.some(r=>r.active!==1||!r.images||r.overflow||!r.rows)||sourceMapping.target!=='target-08'||controls.next!==7||controls.previous!==6)throw new Error('Guide browser checks failed');
  await call('Emulation.setDeviceMetricsOverride',{width:1600,height:1100,deviceScaleFactor:1,mobile:false});
  await evaluate('show(6); window.scrollTo(0,300)');
  await delay(200);
  const shot=await call('Page.captureScreenshot',{format:'png'});
  fs.writeFileSync(path.join(out,'작업자료/비교화면-미리보기.png'),Buffer.from(shot.data,'base64'));
  console.log('Passed 52 page/viewport checks, original 25 → target 08, previous/next controls.');
})().catch(error=>{console.error(error.message);process.exitCode=1}).finally(()=>{if(ws)ws.close();chrome.kill('SIGTERM');setTimeout(()=>{chrome.kill('SIGKILL');fs.rmSync(profile,{recursive:true,force:true})},800).unref()});
