// Enhancements for pre-rendered project pages.
(() => {
  if (!document.body.dataset.project) return;
  installImageViewer();
  const progressItems = [
    ["overview", "개요"],
    ["brief", "핵심"],
    ["context", "배경"],
    ["evidence", "근거"],
    ["reframe", "재정의"],
    ["decision", "결정"],
    ["iteration", "조정"],
    ["solution", "경험"],
    ["impact", "결과"],
    ["reflection", "회고"],
  ].filter(([id]) => document.getElementById(id)).sort(([a], [b]) =>
    document.getElementById(a).compareDocumentPosition(document.getElementById(b)) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
  );
  if (progressItems.length) {
    const progressMarkup = progressItems
      .map(([id, label]) => `<a href="#${id}">${label}</a>`)
      .join("");
    document
      .querySelector(".case-main")
      .insertAdjacentHTML(
        "beforeend",
        `<nav class="case-progress" aria-label="사례 진행 순서">${progressMarkup}</nav>`,
      );
    const progressLinks = [...document.querySelectorAll(".case-progress a")];
    const progressSections = progressLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);
    const setActiveSection = (id) => {
      progressLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };
    setActiveSection("overview");
    if ("IntersectionObserver" in window) {
      const progressObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible) setActiveSection(visible.target.id);
        },
        { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.15, 0.35, 0.6] },
      );
      progressSections.forEach((section) => progressObserver.observe(section));
    }
  }

function installImageViewer() {
  if (!window.HTMLDialogElement || !HTMLDialogElement.prototype.showModal) return;
  const dialog=document.createElement('dialog');
  dialog.className='image-viewer';
  dialog.setAttribute('aria-label','프로젝트 화면 확대');
  dialog.innerHTML=`<div class="viewer-toolbar"><p id="viewer-caption"></p><div class="viewer-controls" role="group" aria-label="이미지 배율"><button type="button" data-view="fit" aria-pressed="true">화면 맞춤</button><button type="button" data-view="actual" aria-pressed="false">원본 크기</button><button type="button" data-view="out" aria-label="이미지 축소">−</button><output class="viewer-scale" aria-label="현재 이미지 배율" aria-live="polite"></output><button type="button" data-view="in" aria-label="이미지 확대">+</button></div><button type="button" class="viewer-close" autofocus>닫기 <span aria-hidden="true">×</span></button></div><div class="viewer-canvas" tabindex="0" aria-label="확대한 이미지 · 스크롤하여 이동"></div>`;
  document.body.append(dialog);
  const canvas=dialog.querySelector('.viewer-canvas');
  const image=document.createElement('img');
  image.draggable=false;
  let opener,scale=1,mode='fit',drag=null,request=0;
  const fitScale=()=>{
    canvas.style.height='';
    const toolbar=dialog.querySelector('.viewer-toolbar').getBoundingClientRect().height;
    dialog.style.setProperty('--viewer-toolbar-height',toolbar+'px');
    const style=getComputedStyle(canvas);
    const width=canvas.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);
    const height=canvas.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom);
    return Math.min(1,width/image.naturalWidth,height/image.naturalHeight);
  };
  const update=(next,nextMode='custom')=>{
    if(!image.naturalWidth||!dialog.open)return;
    const previous=scale,centerX=(canvas.scrollLeft+canvas.clientWidth/2)/previous,centerY=(canvas.scrollTop+canvas.clientHeight/2)/previous;
    mode=nextMode;scale=Math.max(.02,Math.min(4,next));
    const padding=getComputedStyle(canvas);
    canvas.style.height=mode==='fit'?(image.naturalHeight*scale+parseFloat(padding.paddingTop)+parseFloat(padding.paddingBottom))+'px':'';
    image.style.width=(image.naturalWidth*scale)+'px';
    image.style.height='auto';
    dialog.querySelector('.viewer-scale').textContent=Math.round(scale*100)+'%';
    for(const name of ['fit','actual'])dialog.querySelector(`[data-view="${name}"]`).setAttribute('aria-pressed',String(mode===name));
    dialog.querySelector('[data-view="out"]').disabled=scale<=.02;
    dialog.querySelector('[data-view="in"]').disabled=scale>=4;
    canvas.classList.toggle('is-pannable',image.naturalWidth*scale>canvas.clientWidth||image.naturalHeight*scale>canvas.clientHeight);
    if(mode==='fit')canvas.scrollTo(0,0);
    else canvas.scrollTo(Math.max(0,centerX*scale-canvas.clientWidth/2),Math.max(0,centerY*scale-canvas.clientHeight/2));
  };
  const action=name=>{
    if(name==='fit')update(fitScale(),'fit');
    else if(name==='actual')update(1,'actual');
    else update(scale*(name==='in'?1.25:.8));
  };
  for(const button of dialog.querySelectorAll('[data-view]'))button.addEventListener('click',()=>action(button.dataset.view));
  dialog.querySelector('.viewer-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{request++;drag=null;canvas.classList.remove('is-dragging');document.body.classList.remove('viewer-open');opener?.focus({preventScroll:true});});
  dialog.addEventListener('keydown',event=>{
    if(event.ctrlKey||event.metaKey||event.altKey)return;
    const name=({'+':'in','=':'in','-':'out','0':'fit','1':'actual'})[event.key];
    if(name){event.preventDefault();action(name);}
  });
  window.addEventListener('resize',()=>{if(dialog.open&&mode==='fit'&&image.naturalWidth)requestAnimationFrame(()=>update(fitScale(),'fit'));});
  canvas.addEventListener('pointerdown',event=>{
    if(event.pointerType!=='mouse'||event.button!==0||!canvas.classList.contains('is-pannable'))return;
    event.preventDefault();drag={x:event.clientX,y:event.clientY,left:canvas.scrollLeft,top:canvas.scrollTop};
    canvas.setPointerCapture(event.pointerId);canvas.classList.add('is-dragging');
  });
  canvas.addEventListener('pointermove',event=>{if(drag){canvas.scrollLeft=drag.left+drag.x-event.clientX;canvas.scrollTop=drag.top+drag.y-event.clientY;}});
  const endDrag=()=>{drag=null;canvas.classList.remove('is-dragging');};
  canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);canvas.addEventListener('lostpointercapture',endDrag);
  document.querySelectorAll('.visual-frame, .comparison-image, .ui-stage .final-mockup').forEach(frame=>{
    const source=frame.querySelector('img');if(!source)return;
    frame.classList.add('zoomable-frame');
    const button=document.createElement('button');button.type='button';button.className='image-zoom';
    button.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5M7.5 10.5h6M10.5 7.5v6"/></svg><span>화면 확대</span>';
    button.setAttribute('aria-label',`${source.alt} 확대`);
    button.addEventListener('click',async()=>{
      const current=++request;opener=button;mode='fit';image.hidden=true;image.src=source.src;image.alt=source.alt;
      canvas.replaceChildren(image);dialog.querySelector('#viewer-caption').textContent=source.alt;dialog.showModal();document.body.classList.add('viewer-open');
      try{await image.decode();if(current!==request||!dialog.open)return;image.hidden=false;update(fitScale(),'fit');}
      catch{if(current===request)dialog.querySelector('#viewer-caption').textContent='이미지를 불러오지 못했습니다. 닫은 뒤 다시 시도해 주세요.';}
    });
    frame.append(button);
  });
}

})();
