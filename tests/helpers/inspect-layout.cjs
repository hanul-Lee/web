// Use glyph ink bounds rather than line leading, including mixed fallback fonts.
module.exports=function inspectLayout(){
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
    const texts=[], canvas=document.createElement('canvas').getContext('2d'), walker=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT);
    while(walker.nextNode()) {
      const n=walker.currentNode, p=n.parentElement;
      const collapsed=p.closest('details:not([open])');
      if(collapsed&&!collapsed.querySelector(':scope > summary')?.contains(p))continue;
      if(getComputedStyle(p).visibility==='hidden')continue;
      if(!n.textContent.trim() || p.closest('script,style,svg,.case-progress')) continue;
      const range=document.createRange(); range.selectNodeContents(n);
      // Range bounds include font leading; use ink bounds when Chrome exposes matching font metrics.
      const style=getComputedStyle(p);
      canvas.font=`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const metrics=canvas.measureText(n.textContent);
      for(const r of range.getClientRects()) if(r.width && r.height) {
        const useInk=Number.isFinite(metrics.fontBoundingBoxAscent) && metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent>0;
        const baseline=(r.top+r.bottom+metrics.fontBoundingBoxAscent-metrics.fontBoundingBoxDescent)/2;
        texts.push({p,x:r.x,y:useInk?baseline-metrics.actualBoundingBoxAscent:r.y,right:r.right,bottom:useInk?baseline+metrics.actualBoundingBoxDescent:r.bottom,text:n.textContent.trim().slice(0,45)});
      }
    }
    for(let i=0;i<texts.length;i++) for(let j=i+1;j<texts.length;j++) {
      const a=texts[i],b=texts[j];
      if(a.p===b.p) continue;
      if(Math.min(a.right,b.right)-Math.max(a.x,b.x)>3 && Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y)>3) issues.push(`text overlap: ${a.text} / ${b.text}`);
    }
    return issues;
};
