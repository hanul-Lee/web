/* Run with Playwright installed; see tests/README.md. */
const {devices}=require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const {pages:allFiles}=require('./helpers/site.cjs');
const {withSite,withBrowsers,preparePage}=require('./helpers/browser.cjs');
const inspectLayout=require('./helpers/inspect-layout.cjs');
let base;
const files = process.env.AUDIT_PAGES ? allFiles.filter(f => process.env.AUDIT_PAGES.split(',').includes(f)) : allFiles;
if (!files.length) throw new Error('AUDIT_PAGES did not match any portfolio page');
const widths = [320, 360, 375, 390, 412, 430, 640, 768, 800, 801, 844, 1024, 1100, 1101, 1280, 1366, 1440, 1920, 2560];
const report = {pages:files.length, widths, pageChecks:0, errors:[], failures:[]};
async function audit(page, label, file, width) {
  await page.goto(`${base}/${file}`, {waitUntil:'load'});
  await preparePage(page,{openDetails:true});
  const issues = await page.evaluate(inspectLayout);
  await page.evaluate(() => window.scrollTo({top:1600,behavior:'instant'}));
  const header=await page.locator('.nav').boundingBox();
  if(Math.abs(header.y)>1 || header.height!==(width<=800?68:82)) issues.push('header position/height');
  if([390,844,1100].includes(width)) {
    await page.locator('.menu').click();
    const menu=await page.locator('#primary-nav').boundingBox();
    if(!menu || menu.y<header.height-1 || menu.y+menu.height>page.viewportSize().height+1) issues.push('mobile menu bounds');
    await page.keyboard.press('Escape');
    if(await page.locator('.menu').getAttribute('aria-expanded')!=='false') issues.push('menu close');
  }
  report.pageChecks++;
  if(issues.length) report.failures.push({label,file,width,issues:[...new Set(issues)]});
}
(async () => {
  await withSite(async url=>{base=url;await withBrowsers(async(name,browser)=>{
    const context=await browser.newContext({reducedMotion:'reduce',colorScheme:'dark'});
    const page=await context.newPage();
    page.on('pageerror',e=>report.errors.push({engine:name,error:e.message}));
    page.on('response',r=>{if(r.status()>=400)report.errors.push({engine:name,status:r.status(),url:r.url()});});
    for(const width of widths) {
      await page.setViewportSize({width,height:width===844?390:900});
      for(const file of files) await audit(page,name,file,width);
    }
    // Touch, high-density rendering, user agent, and portrait-to-landscape rotation.
    if(name!=='firefox') {
      const device=name==='webkit'?'iPhone 13':'Galaxy S9+';
      const mobile=await browser.newContext({...devices[device],reducedMotion:'reduce'});
      const touch=await mobile.newPage();
      for(const file of files) await audit(touch,device,file,devices[device].viewport.width);
      await touch.locator('.menu').tap();
      await touch.setViewportSize({width:844,height:390});
      const menu=await touch.locator('#primary-nav').boundingBox();
      if(menu.y+menu.height>390) report.failures.push({label:device,issues:['rotated menu overflow']});
      await mobile.close();
    }
    // Optional enhancement APIs must not prevent case content/next links from rendering.
    await page.addInitScript(() => {
      delete window.IntersectionObserver;
      const original=window.matchMedia.bind(window);
      window.matchMedia=q=>{const m=original(q);m.addEventListener=undefined;return m;};
    });
    await page.setViewportSize({width:390,height:844});
    await page.goto(`${base}/project-dashboard.html`);
    if(!(await page.locator('.next a').first().getAttribute('href'))?.endsWith('.html')) report.failures.push({label:name,issues:['legacy API fallback failed']});
    console.log(`${name}: completed`);
  });});
  fs.writeFileSync(process.env.AUDIT_REPORT || path.join(require('node:os').tmpdir(), 'portfolio-browser-audit.json'), JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  if(report.errors.length || report.failures.length) process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
