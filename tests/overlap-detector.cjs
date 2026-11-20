const assert=require('node:assert/strict');
const inspectLayout=require('./helpers/inspect-layout.cjs');
const {withSite,withBrowsers,preparePage}=require('./helpers/browser.cjs');
(async()=>{await withSite(async base=>{await withBrowsers(async(name,browser)=>{
 const page=await browser.newPage({viewport:{width:390,height:900}});await page.goto(base);await preparePage(page);
 let issues=await page.evaluate(inspectLayout);assert.ok(!issues.some(i=>i.startsWith('text overlap:')),name+' natural mixed-font title must not trigger overlap');
 await page.goto(base+'/project-platform.html');await preparePage(page);
 for(const open of [false,true]){
  await page.evaluate(value=>{for(const detail of document.querySelectorAll('details'))detail.open=value;},open);await preparePage(page);
  const result=await page.evaluate(inspectLayout);assert.ok(!result.some(i=>i.startsWith('text overlap:')),name+' closed/open source details must not trigger hidden-content overlaps');
 }
 await page.evaluate(()=>{const probe=document.createElement('main');probe.id='overlap-probe';probe.style.cssText='position:fixed;left:20px;top:100px;width:240px;height:150px;background:white;color:black';probe.innerHTML='<span style="position:absolute;left:0;top:0;font:30px sans-serif">Overlap probe A</span><span style="position:absolute;left:0;top:0;font:30px sans-serif">Overlap probe B</span>';document.querySelector('main').replaceWith(probe);});
 issues=await page.evaluate(inspectLayout);assert.ok(issues.some(i=>i.startsWith('text overlap: Overlap probe')),name+' real overlapping glyphs must be detected');
 await page.close();console.log('PASS: '+name+' overlap detector accepts natural title and catches deliberately overlapping glyphs');
});});})().catch(e=>{console.error(e);process.exitCode=1;});
