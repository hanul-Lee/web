const assert=require('node:assert/strict');
const {withSite,withBrowsers,preparePage}=require('./helpers/browser.cjs');
(async()=>{await withSite(async base=>{await withBrowsers(async(name,browser)=>{
 let tagRequests=0,collectRequests=0,blockedRequests=0,referrer='';
 const context=await browser.newContext();
 try{
  // Simulate static hosting without security response headers; test the deployed HTML meta policy itself.
  await context.route('**/*',async route=>{
   const request=route.request(),url=new URL(request.url());
   if(url.hostname==='portfolio.test'){
    const result=await context.request.get(base+url.pathname+url.search);
    const headers={...result.headers()};delete headers['content-security-policy'];
    await route.fulfill({status:result.status(),headers,body:await result.body()});return;
   }
   if(url.hostname==='www.googletagmanager.com'){
    tagRequests++;referrer=request.headers().referer||'';
    await route.fulfill({contentType:'text/javascript',body:'window.__allowedTag=true;fetch("https://www.google-analytics.com/g/collect",{method:"POST",body:"security-test"}).then(()=>window.__allowedCollect=true);'});return;
   }
   if(url.hostname==='www.google-analytics.com'){
    collectRequests++;await route.fulfill({status:204,headers:{'Access-Control-Allow-Origin':'*'}});return;
   }
   blockedRequests++;await route.fulfill({contentType:'text/javascript',body:'window.__untrustedScript=true;'});
  });
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('https://portfolio.test/project-dashboard.html?private=must-not-leak');await preparePage(page);
  await page.waitForFunction(()=>window.__allowedTag&&window.__allowedCollect);
  assert.equal(tagRequests,1,name+' Google tag allowed');assert.equal(collectRequests,1,name+' analytics collection allowed');assert.equal(referrer,'https://portfolio.test/',name+' external referrer must exclude page path and query');assert.deepEqual(errors,[]);
  await page.evaluate(async()=>{
   window.__violations=[];window.__blockedExceptions=[];const attempt=fn=>{try{fn();}catch(error){window.__blockedExceptions.push(error.name);}};document.addEventListener('securitypolicyviolation',e=>window.__violations.push(e.effectiveDirective));
   const inline=document.createElement('script');inline.textContent='window.__inlineScript=true';attempt(()=>document.head.append(inline));
   const remote=document.createElement('script');remote.src='https://blocked.example/injected.js';attempt(()=>document.head.append(remote));
   const button=document.createElement('button');button.setAttribute('onclick','window.__inlineEvent=true');document.body.append(button);attempt(()=>button.click());
   const base=document.createElement('base');base.href='https://blocked.example/';attempt(()=>document.head.append(base));
   const form=document.createElement('form');form.action='https://blocked.example/submit';form.method='post';document.body.append(form);attempt(()=>form.submit());
   await fetch('https://blocked.example/data').catch(()=>{});
  });
  await page.waitForTimeout(250);
  const state=await page.evaluate(()=>({inline:!!window.__inlineScript,event:!!window.__inlineEvent,remote:!!window.__untrustedScript,base:document.baseURI,violations:window.__violations}));
  assert.equal(state.inline,false);assert.equal(state.event,false);assert.equal(state.remote,false);assert.ok(state.base.startsWith('https://portfolio.test/'));assert.equal(blockedRequests,0,name+' forbidden resources must be blocked before network');
  for(const directive of ['script-src-elem','script-src-attr','connect-src','base-uri','form-action'])assert.ok(state.violations.includes(directive),name+' missing violation '+directive);
  await page.close();
  const privatePage=await context.newPage();await privatePage.addInitScript(()=>Object.defineProperty(navigator,'globalPrivacyControl',{value:true,configurable:true}));
  const before=tagRequests;await privatePage.goto('https://portfolio.test/index.html');await preparePage(privatePage);assert.equal(tagRequests,before,name+' GPC must prevent analytics loading');assert.equal(await privatePage.evaluate(()=>typeof window.gtag),'undefined');await privatePage.close();
  console.log('PASS: '+name+' meta-only CSP blocks inline/remote scripts, handlers, requests, base and forms; permits GA; strips referrers and respects GPC');
 }finally{await context.close();}
});});})().catch(e=>{console.error(e);process.exitCode=1;});
