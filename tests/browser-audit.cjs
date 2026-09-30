/* Run with Playwright installed; see tests/README.md. */
const {chromium, webkit, firefox, devices} = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const base = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173';
const files = ['index.html', ...fs.readdirSync(root).filter(f => /^project-.*\.html$/.test(f))];
const widths = [320, 360, 375, 390, 412, 430, 640, 768, 800, 801, 844, 1024, 1100, 1101, 1280, 1366, 1440, 1920, 2560];
const report = {pages:files.length, widths, pageChecks:0, errors:[], failures:[]};
async function audit(page, label, file, width) {
  await page.goto(`${base}/${file}`, {waitUntil:'load'});
  await page.evaluate(async () => {
    document.querySelectorAll('img').forEach(i => i.loading = 'eager');
    await Promise.all([document.fonts.ready, ...[...document.images].map(i => i.decode().catch(() => {}))]);
  });
  const issues = await page.evaluate(() => {
    const issues = [];
    if(document.documentElement.scrollWidth > innerWidth + 1) issues.push('horizontal overflow');
    if(!document.querySelector('h1')?.textContent.trim()) issues.push('missing heading');
    if(document.body.dataset.project && !document.querySelector('.gallery .story-section')) issues.push('missing case content');
    for(const img of document.images) {
      if(!img.naturalWidth) issues.push(`broken image: ${img.getAttribute('src')}`);
      const s=getComputedStyle(img), r=img.getBoundingClientRect();
      if(s.objectFit==='fill' && r.height && Math.abs(r.width/r.height-img.naturalWidth/img.naturalHeight) > .04) issues.push(`distorted image: ${img.getAttribute('src')}`);
    }
    const loaded=[...document.fonts].filter(f => f.status==='loaded').map(f=>f.family.replaceAll('"',''));
    for(const font of ['Manrope','Noto Sans KR']) if(!loaded.includes(font)) issues.push(`font not loaded: ${font}`);
    const hero=document.querySelector('.case-hero'), body=document.querySelector('.case-body');
    if(hero && body) {
      const edge=e=>e.getBoundingClientRect().left+parseFloat(getComputedStyle(e).paddingLeft);
      if(Math.abs(edge(hero)-edge(body))>1) issues.push('case hero/body misaligned');
    }
    const texts=[], walker=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT);
    while(walker.nextNode()) {
      const n=walker.currentNode, p=n.parentElement;
      if(!n.textContent.trim() || p.closest('script,style,svg,.case-progress')) continue;
      const range=document.createRange(); range.selectNodeContents(n);
      for(const r of range.getClientRects()) if(r.width && r.height) texts.push({p,x:r.x,y:r.y,right:r.right,bottom:r.bottom,text:n.textContent.trim().slice(0,45)});
    }
    for(let i=0;i<texts.length;i++) for(let j=i+1;j<texts.length;j++) {
      const a=texts[i],b=texts[j];
      if(a.p===b.p) continue;
      if(Math.min(a.right,b.right)-Math.max(a.x,b.x)>3 && Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y)>3) issues.push(`text overlap: ${a.text} / ${b.text}`);
    }
    return issues;
  });
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
  for(const [name,type] of Object.entries({chromium,webkit,firefox})) {
    const browser=await type.launch(name==='chromium'&&process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{});
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
    await browser.close();
    console.log(`${name}: completed`);
  }
  fs.writeFileSync(process.env.AUDIT_REPORT || path.join(require('node:os').tmpdir(), 'portfolio-browser-audit.json'), JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
  if(report.errors.length || report.failures.length) process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
