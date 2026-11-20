const {spawn}=require('node:child_process');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
module.exports=async function withChrome(run){
 const profile=fs.mkdtempSync(path.join(os.tmpdir(),'portfolio-build-'));
 const chrome=spawn(process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless','--disable-gpu','--no-sandbox','--allow-file-access-from-files','--remote-debugging-port=0','--user-data-dir='+profile,'about:blank'],{stdio:'ignore'});
 let ws;
 try {
  let tab;
  for(let n=0;n<200;n++){try{const port=fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').split('\n')[0];tab=(await(await fetch('http://127.0.0.1:'+port+'/json')).json()).find(t=>t.type==='page');if(tab)break;}catch{}await new Promise(r=>setTimeout(r,100));}
  if(!tab)throw Error('Chrome startup failed. Set CHROME_PATH.');
  ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
  let id=0;const pending=new Map();const listeners=new Map();ws.onmessage=e=>{const x=JSON.parse(e.data);if(x.id){const p=pending.get(x.id);pending.delete(x.id);x.error?p.reject(Error(JSON.stringify(x.error))):p.resolve(x.result);}else for(const listener of listeners.get(x.method)||[])listener(x.params);};
  const send=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject});ws.send(JSON.stringify({id:n,method,params}));});
  const evaluate=async expression=>{const result=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(result.exceptionDetails)throw Error(JSON.stringify(result.exceptionDetails));return result.result.value;};
  const on=(method,listener)=>{if(!listeners.has(method))listeners.set(method,new Set());listeners.get(method).add(listener);return ()=>listeners.get(method).delete(listener);};
  await send('Page.enable');await run({send,evaluate,on});
 } finally {ws?.close();chrome.kill();fs.rmSync(profile,{recursive:true,force:true,maxRetries:5,retryDelay:100});}
};
