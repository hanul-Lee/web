const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const {withChrome,navigate,pages:allPages}=require('./helpers/site.cjs');
(async()=>{await withChrome(async({send,evaluate:evalJS})=>{
const report=[];
const pages=process.env.AUDIT_PAGES?.split(',') || allPages;
const widths=process.env.AUDIT_WIDTHS?.split(',').map(Number) || [320,390,600,800,801,989,1010,1024,1057,1100,1101,1280,1440,1920,2560];
for(const width of widths){
await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
for(const file of pages){
await navigate({send,evaluate:evalJS},file);
const info=await evalJS(`(()=>{
const stacks=document.body.classList.contains('portfolio-home')?[[document.querySelector('main'),':scope > section'],[document.querySelector('.featured-projects'),':scope > .work-case']]:[[document.querySelector('.case-main'),':scope > section'],[document.querySelector('.case-body'),':scope > .case-context, :scope > .gallery, :scope > .next'],[document.querySelector('.gallery'),':scope > .story-section']];
const gaps=[];for(const [parent,selector]of stacks){const nodes=[...parent.querySelectorAll(selector)];for(let i=1;i<nodes.length;i++){const a=nodes[i-1],b=nodes[i];const as=getComputedStyle(a),bs=getComputedStyle(b);if(parent.className==='featured-projects') continue;gaps.push({stack:parent.className||'main',from:a.id||a.className,to:b.id||b.className,actual:+(b.getBoundingClientRect().top-a.getBoundingClientRect().bottom).toFixed(2),previousMargin:as.marginBottom,nextMargin:bs.marginTop});}}
return{width:innerWidth,gapToken:getComputedStyle(document.documentElement).getPropertyValue('--section-gap').trim(),gaps,overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,missing:[...document.images].filter(i=>!i.naturalWidth).length};})()`);
assert.equal(info.overflow,false,file+' overflow '+width);assert.equal(info.missing,0,file+' missing images');
const min=width<=800?72:140,max=min;
for(const gap of info.gaps){assert.ok(gap.actual>=min-.1&&gap.actual<=max+.1,JSON.stringify({file,width,...gap}));assert.equal(gap.previousMargin,'0px');assert.equal(gap.nextMargin,'0px');}
if(file === 'index.html') {
  const pair = await evalJS(`(()=>{const cases=[...document.querySelectorAll('.work-case')].slice(1,3);return cases.map(e=>{const v=e.querySelector('.work-visual').getBoundingClientRect(),story=e.querySelector('.work-story').getBoundingClientRect(),title=e.querySelector('h3').getBoundingClientRect();return {height:v.height,top:v.top,bottom:v.bottom,story:story.top,title:title.top,decisions:e.querySelector('.work-decisions').getBoundingClientRect().top,link:e.querySelector('.case-text-link').getBoundingClientRect().top};});})()`);
  assert.ok(Math.abs(pair[0].height-pair[1].height)<1,'equal project visual height '+width);
  if(width>800)for(const key of ['top','bottom','story','title'])assert.ok(Math.abs(pair[0][key]-pair[1][key])<1,'project pair '+key+' '+width);
  for(const card of pair){assert.ok(card.decisions>card.title,'project decisions after title '+width);assert.ok(card.link>card.decisions,'project link after decisions '+width);}
}
if(file !== 'index.html') {
  const visualCards = await evalJS(`(()=>{
    const measure=element=>{const bounds=element.getBoundingClientRect();return {top:bounds.top,bottom:bounds.bottom,height:bounds.height,width:bounds.width};};
    return [...document.querySelectorAll('.project-visual-grid')].map(grid=>[...grid.querySelectorAll('figure')].map(figure=>({card:measure(figure),frame:measure(figure.querySelector('.visual-frame')),caption:measure(figure.querySelector('figcaption')),portrait:figure.classList.contains('portrait'),maxHeight:parseFloat(getComputedStyle(figure.querySelector('.visual-frame')).maxHeight)})));
  })()`);
  for(const cards of visualCards) for(const card of cards) {
    const matchingFrame = cards.find(other => other.portrait === card.portrait);
    assert.ok(Math.abs(card.frame.height-matchingFrame.frame.height)<1,file+' equal image frame heights '+width);
    if (Math.abs(card.card.top-cards[0].card.top)<1) assert.ok(Math.abs(card.card.height-cards[0].card.height)<1,file+' equal visual card heights '+width);
    const fixedHeight = file === 'project-dashboard.html' ? (width <= 600 ? 220 : 280) : ['project-intranet.html','project-psc.html'].includes(file) ? (width <= 600 ? 380 : 440) : null;
    if (fixedHeight) assert.ok(Math.abs(card.frame.height-fixedHeight)<1,file+' fixed visual frame '+width);
    else {
      const ratio = file === 'project-tbm.html' && card.portrait ? 390/810 : 16/9;
      const expected = Math.min(card.frame.width/ratio, card.maxHeight || Infinity);
      assert.ok(Math.abs(card.frame.height-expected)<1,file+' compact visual frame '+width);
    }
    assert.ok(card.caption.top>=card.frame.bottom,file+' caption below image '+width);
    if(Math.abs(card.card.top-cards[0].card.top)<1) assert.ok(Math.abs(card.caption.top-cards[0].caption.top)<1,file+' aligned visual captions '+width);
  }
  const comparisonCards = await evalJS(`(()=>{const cards=[...document.querySelectorAll('.iteration-compare > div')];return cards.map(card=>{const bounds=card.getBoundingClientRect(),frame=card.querySelector('.comparison-image, .wireframe').getBoundingClientRect();return {top:bounds.top,height:bounds.height,frameTop:frame.top,frameHeight:frame.height};});})()`);
  if(comparisonCards.length>1) {
    assert.ok(Math.abs(comparisonCards[0].frameHeight-comparisonCards[1].frameHeight)<1,file+' equal comparison image heights '+width);
    if(width>800) for(const key of ['top','height','frameTop']) assert.ok(Math.abs(comparisonCards[0][key]-comparisonCards[1][key])<1,file+' aligned comparison '+key+' '+width);
  }
  const heroGroups = await evalJS(`(()=>{const hero=document.querySelector('.case-hero'),overview=hero.querySelector(':scope > .case-hero-overview'),copy=overview.querySelector(':scope > .case-hero-copy'),cover=overview.querySelector(':scope > .case-cover'),meta=hero.querySelector(':scope > .case-meta');const h=hero.getBoundingClientRect(),o=overview.getBoundingClientRect(),c=copy.getBoundingClientRect(),v=cover.getBoundingClientRect(),m=meta.getBoundingClientRect();return {groups:hero.children.length,actions:copy.querySelectorAll('.case-hero-actions a').length,actionsInside:!!copy.querySelector('.case-result + .case-hero-actions'),metaOutside:!overview.contains(meta),overviewBottom:o.bottom,metaTop:m.top,heroWidth:h.width,metaWidth:m.width,copyTop:c.top,copyBottom:c.bottom,copyRight:c.right,coverTop:v.top,coverLeft:v.left,coverBottom:v.bottom,coverRight:v.right};})()`);
  assert.equal(heroGroups.groups,2,file+' two hero groups');
  assert.equal(heroGroups.actions,file==='project-pet.html'?3:2,file+' hero shortcuts');
  assert.equal(heroGroups.actionsInside,true);
  assert.equal(heroGroups.metaOutside,true);
  assert.ok(heroGroups.metaTop>=heroGroups.overviewBottom+(file==='project-kanvan.html'?27:31),file+' metadata below overview');
  assert.ok(Math.abs(heroGroups.heroWidth-heroGroups.metaWidth)<1,file+' full-width metadata');
  if(width<=800)assert.ok(heroGroups.coverTop>=heroGroups.copyBottom+31,file+' stacked overview');
  else {assert.ok(heroGroups.coverLeft>=heroGroups.copyRight+(width<=1100?31:47),file+' side-by-side overview');assert.ok(Math.abs(heroGroups.copyTop-heroGroups.coverTop)<1,file+' image stays top-aligned');}
  assert.ok(heroGroups.coverRight<=width,file+' cover fits viewport');

  const solution = await evalJS(`(()=>{const e=document.querySelector('#solution'),copy=e.querySelector('.solution-copy').getBoundingClientRect(),stage=e.querySelector('.ui-stage').getBoundingClientRect();return {minHeight:getComputedStyle(e).minHeight,direction:getComputedStyle(e).flexDirection,copyBottom:copy.bottom,stageTop:stage.top,topSpace:copy.top-e.getBoundingClientRect().top};})()`);
  assert.equal(solution.minHeight,'0px');
  if(width<=1100){assert.equal(solution.direction,'column');assert.ok(solution.stageTop>=solution.copyBottom,'text before solution image');assert.ok(solution.topSpace<=29,'compact solution padding');}
  const arrow = await evalJS(`({old:getComputedStyle(document.querySelector('.next > a:first-child'),'::after').content,margin:getComputedStyle(document.querySelector('.next h3'),'::after').marginLeft,position:getComputedStyle(document.querySelector('.next h3'),'::after').position})`);
  assert.equal(arrow.old,'none');assert.equal(arrow.margin,'8px');assert.equal(arrow.position,'static');
  const nextPreview=await evalJS(`(()=>{const link=document.querySelector('.next-project'),preview=link.querySelector('.next-preview').getBoundingClientRect(),copy=link.querySelector('.next-copy').getBoundingClientRect();return {cardWidth:link.getBoundingClientRect().width,containerWidth:link.parentElement.getBoundingClientRect().width,display:getComputedStyle(link).display,width:preview.width,right:preview.right,copyLeft:copy.left,summary:link.querySelector('p').textContent};})()`);
  assert.equal(nextPreview.display,'grid',file+' next preview grid '+width);
  assert.ok(Math.abs(nextPreview.cardWidth-nextPreview.containerWidth)<1,file+' full-width next preview '+width);
  assert.ok(Math.abs(nextPreview.width-(width<=600?96:160))<1,file+' next preview width '+width);
  assert.ok(nextPreview.right<nextPreview.copyLeft&&nextPreview.summary.length>0,file+' next preview beside summary '+width);


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
if(file==='index.html' && [390,1280].includes(width)) {
  const hero=await evalJS(`({image:document.querySelector('.hero-case-screen img').getAttribute('src'),scope:document.querySelector('.hero-case-meta').textContent,status:document.querySelector('.hero-case-top strong').textContent,planets:document.querySelectorAll('img[src*="assets/planets/"]').length,proof:document.querySelectorAll('.intro-proof > a').length})`);
  assert.equal(hero.image,require('../src/content/image-manifest.json')['assets/cases/20261024/tbm-journal-reviewed.webp'].src);
  assert.ok(hero.scope.includes('모바일 UI 디자인') && hero.scope.includes('퍼블리싱'));
  assert.equal(hero.status,'배포 후 실사용');
  assert.equal(hero.planets,0);
  assert.equal(hero.proof,0);
  const rows=await evalJS(`(()=>{const rows=[];for(const e of document.querySelectorAll('.work-case')){const r=e.getBoundingClientRect();let row=rows.find(x=>Math.abs(x.top-r.top)<1);if(row)row.bottom=Math.max(row.bottom,r.bottom);else rows.push({top:r.top,bottom:r.bottom});}return rows.sort((a,b)=>a.top-b.top);})()`);
  for(let r=1;r<rows.length;r++)assert.ok(Math.abs(rows[r].top-rows[r-1].bottom-(width<=800?64:80))<1,'project row spacing '+width);
  const shot=await send('Page.captureScreenshot');fs.writeFileSync(path.join(os.tmpdir(),'hanul-home-'+width+'.png'),Buffer.from(shot.data,'base64'));
  await evalJS(`document.documentElement.style.scrollBehavior='auto';document.querySelector('#work').scrollIntoView({behavior:'instant'})`);
  const workShot=await send('Page.captureScreenshot');fs.writeFileSync(path.join(os.tmpdir(),'hanul-work-'+width+'.png'),Buffer.from(workShot.data,'base64'));

}
if(width===1010 && (file==='index.html'||file==='project-platform.html'||file==='project-tbm.html')) {
  const selector=file==='index.html'?'.work-case:nth-child(2)':file==='project-platform.html'?'#solution':'.next';
  await evalJS(`document.documentElement.style.scrollBehavior='auto';document.querySelector('${selector}').scrollIntoView({behavior:'instant'})`);
  const shot=await send('Page.captureScreenshot');fs.writeFileSync(path.join(os.tmpdir(),file.replace('.html','')+'-alignment.png'),Buffer.from(shot.data,'base64'));
}
if(['project-platform.html','project-tbm.html'].includes(file) && [390,1057,1280].includes(width)) {
  await evalJS(`document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,0)`);
  const shot=await send('Page.captureScreenshot');fs.writeFileSync(path.join(os.tmpdir(),file.replace('.html','')+'-hero-'+width+'.png'),Buffer.from(shot.data,'base64'));
}
report.push({file,...info});
if(file==='index.html'&&width===390){await evalJS(`document.documentElement.style.scrollBehavior='auto'; document.querySelector('.selected-work').scrollIntoView({behavior:'instant'})`);const shot=await send('Page.captureScreenshot');fs.writeFileSync('/tmp/section-gap-home.png',Buffer.from(shot.data,'base64'));}
if(file==='project-dashboard.html'&&width===1280){await evalJS(`document.documentElement.style.scrollBehavior='auto'; document.querySelector('#context').scrollIntoView({behavior:'instant'})`);const shot=await send('Page.captureScreenshot');fs.writeFileSync('/tmp/section-gap-detail.png',Buffer.from(shot.data,'base64'));}
}
console.log('PASS',width+'px',pages.length+' pages: all outer gaps within '+(width<=800?'72':'140')+'px, zero adjacent margins, no overflow or missing images');
}
fs.writeFileSync(process.env.AUDIT_REPORT || path.join(os.tmpdir(),'section-spacing-validation.json'),JSON.stringify({date:new Date().toLocaleDateString('sv-SE',{timeZone:'Asia/Seoul'}),method:'Chrome DevTools Protocol + getBoundingClientRect + computed styles',results:report},null,2));
});})().catch(e=>{console.error(e);process.exitCode=1;});
