const {chromium}=require('/Users/ihan-ul/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const page=await browser.newPage({reducedMotion:'reduce'});
const base='file:///Users/ihan-ul/Downloads/최최종/0.web/';
for(const width of [390,1280]){
await page.setViewportSize({width,height:900});
for(const file of ['index','project-platform','project-tbm','project-designsystem']){
await page.goto(base+file+'.html');
await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
if(file==='project-platform') assert.ok(await page.evaluate(()=>document.querySelector('#solution').compareDocumentPosition(document.querySelector('#decision'))&Node.DOCUMENT_POSITION_FOLLOWING));
if(file==='project-tbm') assert.match(await page.locator('.impact-note').innerText(),/測定|측정하지/);
await page.screenshot({path:`/tmp/hanul-review-20261107/${file}-${width}.png`,fullPage:true});
}
}
await browser.close(); console.log('PASS: screenshots, platform reading order and TBM evidence limit');
})();
