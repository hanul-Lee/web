const assert=require('node:assert/strict');
const {withSite,withBrowsers,preparePage}=require('./helpers/browser.cjs');
(async()=>{await withSite(async base=>{await withBrowsers(async(name,browser)=>{
 for(const width of [320,390,1280]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  await page.goto(base+'/project-dashboard.html');await preparePage(page);
  const trigger=page.locator('#solution .image-zoom').first();await trigger.click();
  await page.waitForFunction(()=>document.querySelector('.viewer-scale').textContent.endsWith('%'));
  const state=()=>page.locator('.image-viewer').evaluate(dialog=>{const image=dialog.querySelector('img'),canvas=dialog.querySelector('.viewer-canvas'),r=image.getBoundingClientRect(),c=getComputedStyle(canvas);return {open:dialog.open,width:r.width,height:r.height,availableWidth:canvas.clientWidth-parseFloat(c.paddingLeft)-parseFloat(c.paddingRight),availableHeight:canvas.clientHeight-parseFloat(c.paddingTop)-parseFloat(c.paddingBottom),nativeWidth:image.naturalWidth,left:canvas.scrollLeft,fit:dialog.querySelector('[data-view="fit"]').getAttribute('aria-pressed')};});
  let view=await state();assert.ok(view.open&&view.width<=view.availableWidth+1&&view.height<=view.availableHeight+1,name+' fit '+width);
  const dialog=await page.locator('.image-viewer').boundingBox();assert.ok(dialog.x>=0&&dialog.x+dialog.width<=width+1&&dialog.y>=0&&dialog.y+dialog.height<=901,name+' dialog bounds '+width);
  for(const button of await page.locator('.image-viewer button').all()){const b=await button.boundingBox();assert.ok(b.x>=dialog.x&&b.x+b.width<=dialog.x+dialog.width+1,name+' controls fit '+width);}
  await page.locator('[data-view="actual"]').click();view=await state();assert.ok(Math.abs(view.width-view.nativeWidth)<1,name+' natural size '+width);
  await page.locator('[data-view="in"]').click();assert.equal(await page.locator('.viewer-scale').textContent(),'125%');
  await page.keyboard.press('-');assert.equal(await page.locator('.viewer-scale').textContent(),'100%');
  if(width===390){const box=await page.locator('.viewer-canvas').boundingBox(),before=(await state()).left;await page.mouse.move(box.x+box.width*.7,box.y+box.height*.5);await page.mouse.down();await page.mouse.move(box.x+box.width*.4,box.y+box.height*.5,{steps:5});await page.mouse.up();assert.ok((await state()).left>before,name+' drag to pan');}
  await page.locator('[data-view="fit"]').click();view=await state();assert.equal(view.fit,'true');assert.ok(view.width<=view.availableWidth+1&&view.height<=view.availableHeight+1);
  await page.keyboard.press('Escape');assert.equal(await page.locator('.image-viewer').evaluate(d=>d.open),false);assert.equal(await trigger.evaluate(e=>e===document.activeElement),true);
  await trigger.click();await page.locator('.viewer-close').click();assert.equal(await page.locator('.image-viewer').evaluate(d=>d.open),false);
  await page.close();
 }
 console.log('PASS: '+name+' viewer fit, native size, zoom, keyboard, drag, bounds and focus at 3 widths');
});});})().catch(e=>{console.error(e);process.exitCode=1;});
