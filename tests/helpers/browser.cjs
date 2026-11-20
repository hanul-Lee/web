const {chromium,webkit,firefox}=require('playwright');
const serve=require('../../scripts/lib/server.cjs');
async function withSite(run){
 if(process.env.AUDIT_BASE_URL)return run(process.env.AUDIT_BASE_URL);
 const server=await serve();try{return await run(server.url);}finally{await server.close();}
}
async function withBrowsers(run){
 const engines={chromium,webkit,firefox};
 for(const name of (process.env.AUDIT_ENGINES||'chromium,webkit,firefox').split(',')){
  if(!engines[name])throw Error('Unknown browser: '+name);
  const browser=await engines[name].launch(name==='chromium'&&process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{});
  try{await run(name,browser);}finally{await browser.close();}
 }
}
async function preparePage(page,{openDetails=false}={}){
 await page.evaluate(async open=>{if(open)for(const detail of document.querySelectorAll('details'))detail.open=true;for(const image of document.images)image.loading='eager';await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));},openDetails);
}
module.exports={withSite,withBrowsers,preparePage};
