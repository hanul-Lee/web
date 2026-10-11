from pathlib import Path
import json, html, base64, re, struct, subprocess

ROOT=Path(__file__).resolve().parents[3]
OUT=Path(__file__).resolve().parents[1]
DATA=json.loads((OUT/'작업자료/page-plan.json').read_text())
E=html.escape
ACC='#2D5BDB'

def lines(s, budget):
    result=[]
    for para in s.split('\n'):
        line=''; used=0
        for c in para:
            weight=1 if ord(c)>255 else .56
            if used+weight>budget and line:
                result.append(line);line='';used=0
            line+=c;used+=weight
        if line: result.append(line)
    return result

def text(x,y,s,size=28,color='#18212B',weight=400,budget=30,limit=20):
    chunks=lines(s,budget)
    if len(chunks)>limit:
        chunks=chunks[:limit];chunks[-1]=chunks[-1].rstrip()+'…'
    return ''.join(f'<text x="{x}" y="{y+i*size*1.5}" font-size="{size}" font-weight="{weight}" fill="{color}">{E(v)}</text>' for i,v in enumerate(chunks))

def rect(x,y,w,h,fill='#FFFFFF',stroke='#CBD4E1',dash=False):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="{fill}" stroke="{stroke}" stroke-width="2"'+(' stroke-dasharray="12 8"' if dash else '')+'/>'

def pic(path,x,y,w,h,crop=None):
    file=ROOT/path
    if not file.exists(): return rect(x,y,w,h,'#EEF2F7',ACC,True)+text(x+30,y+70,'원본 자료를 가져올 자리',32,ACC,budget=22)
    uri='data:image/'+('png' if file.suffix=='.png' else 'jpeg')+';base64,'+base64.b64encode(file.read_bytes()).decode()
    if crop:
        xx,yy,ww,hh=crop
        iw,ih=(1920,1080)
        if file.suffix=='.png': iw,ih=struct.unpack('>II',file.read_bytes()[16:24])
        else:
            dimensions=subprocess.check_output(['sips','-g','pixelWidth','-g','pixelHeight',str(file)],text=True)
            iw,ih=map(int,re.findall(r'pixel(?:Width|Height): (\d+)',dimensions))
        clip=f'crop-{x}-{y}-{w}-{h}'
        return f'<svg x="{x}" y="{y}" width="{w}" height="{h}" viewBox="{xx} {yy} {ww} {hh}" preserveAspectRatio="xMidYMid meet" overflow="hidden"><defs><clipPath id="{clip}"><rect x="{xx}" y="{yy}" width="{ww}" height="{hh}"/></clipPath></defs><g clip-path="url(#{clip})"><image href="{uri}" x="0" y="0" width="{iw}" height="{ih}"/></g></svg>'
    return f'<image href="{uri}" x="{x}" y="{y}" width="{w}" height="{h}" preserveAspectRatio="xMidYMid meet"/>'

def panel(x,y,w,h,label,body,image=''):
    b=rect(x,y,w,h)
    b+=text(x+24,y+40,label,24,ACC,650,budget=w/28,limit=2)
    if image:
        b+=pic(image,x+24,y+70,w-48,h-144)
        b+=text(x+24,y+h-45,body,22,budget=w/28,limit=2)
    else:
        small=h<160
        size=24 if small else 28
        b+=text(x+28,y+(87 if small else 104),body,size,budget=(w-56)/size,limit=2 if small else max(2,int((h-120)/42)))
    return b

def render(page):
    n=page['number'];mods=page['modules'];layout=page['layout']
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><title>새 {n:02} {E(page["title"])} 편집 배치도</title><rect width="1920" height="1080" fill="#F7F8FA"/><g font-family="Apple SD Gothic Neo, Noto Sans KR, sans-serif">'
    header_source=page['source'] if n!=23 else '웹 디자인 시스템 · Search Bar 자료 → 새 23'
    svg+=text(120,66,f'편집 가이드 · {header_source}',23,'#596579',budget=45,limit=1)
    svg+=text(1530,66,f'새 {n:02} / 26',23,ACC,600,budget=20)
    iscover=layout=='cover'
    title=mods[0]['copy'] if iscover else mods[0]['copy']
    svg+=text(120,156,title,52,'#18212B',700,budget=22 if iscover else 32,limit=2)
    areas=[]
    if iscover:
        rest=mods[1:]
        imag=next((v for v in rest if v['image']),None)
        y=360
        for idx,mod in enumerate(rest):
            if mod is imag: continue
            h=150 if idx==0 else 180
            svg+=panel(120,y,690,h,mod['position'],mod['copy'])
            areas.append([mod['position'],120,y,690,h]);y+=h+24
        if imag:
            svg+=panel(870,350,930,560,imag['position'],imag['copy'],imag['image'])
        else:
            svg+=panel(960,430,800,220,'편집 방향','연락처와 실제 연결되는 링크를 배치합니다.\n장식용 추가 화면은 필요하지 않습니다.')
        areas.append(['우측 대표 화면/보조 영역',870,350,930,560])
    elif n==2:
        svg+=panel(120,350,900,270,'좌측 현재 경력',mods[1]['copy'])
        svg+=panel(120,650,900,230,'좌측 이전 경력',mods[2]['copy'])
        svg+=panel(1060,350,740,300,'우측 역량과 사례',mods[3]['copy'])
        svg+=panel(1060,680,740,210,'우측 툴·연락처 / 학력 별도 확인',mods[4]['copy'])
        areas += [['현재 경력',120,350,900,270],['이전 경력',120,650,900,230],['역량과 사례',1060,350,740,300],['툴·연락처',1060,680,740,210]]
    elif layout=='toc':
        for j,mod in enumerate(mods[1:5]):
            y=315+j*145
            svg+=panel(120,y,1680,125,mod['position'],mod['copy'])
            areas.append([mod['position'],120,y,1680,125])
        svg+=text(120,967,mods[-1]['copy'],26,'#596579',budget=58,limit=1)
    elif layout=='decision' and n==8:
        for j,(crop,mod) in enumerate(zip([(118,546,549,374),(685,546,549,374),(1252,546,549,374)],mods[2:5])):
            x=120+j*570
            svg+=rect(x,350,540,545,'#FFFFFF',ACC if j==2 else '#CBD4E1')
            svg+=text(x+22,395,'안 '+['A','B','C · 선택'][j],28,ACC,700,budget=16)
            svg+=pic('portfolio_review_1009/25.png',x+20,420,500,340,crop)
            svg+=text(x+20,793,mod['copy'],25,budget=19,limit=3)
            areas.append([mod['position'],x,350,540,545])
        svg+=text(120,280,mods[1]['copy'],26,budget=60,limit=1)
        svg+=text(120,956,mods[-1]['copy'],23,'#596579',budget=64,limit=2)
    elif layout=='result':
        for j,mod in enumerate(mods[1:4]):
            x=120+j*570
            svg+=panel(x,350,540,500,mod['position'],mod['copy'])
            areas.append([mod['position'],x,350,540,500])
        if len(mods)>4: svg+=text(120,930,mods[-1]['copy'],26,'#596579',budget=60,limit=2)
    elif n==6:
        svg+=rect(120,350,800,485)
        svg+=text(144,390,'좌측 실제 메뉴 분류',24,ACC,650,budget=25)
        svg+=rect(285,420,450,58,'#EDF2FF',ACC)+text(426,460,'공통 메뉴',29,ACC,650,budget=15)
        svg+=text(490,512,'↓',29,ACC,budget=4)
        svg+=rect(155,525,345,65)+text(254,568,'현장설명',28,budget=10)
        svg+=rect(530,525,355,65,'#EDF2FF',ACC)+text(620,568,'사업관리',28,ACC,650,budget=10)
        svg+=text(158,636,'사업관리 선택 화면의 기능',24,'#596579',budget=24)
        labs=['CCTV','GSIM','실감형 모델','도면','원격협업','시뮬레이션','품질안전','유지관리','더보기','사이트맵']
        for j,lab in enumerate(labs):
            xx=150+(j%5)*150;yy=655+(j//5)*66
            svg+=rect(xx,yy,142,54,'#F6F8FC')+text(xx+12,yy+35,lab,20,budget=7)
        svg+=rect(960,350,840,485)
        svg+=text(984,390,'우측 실제 메뉴 부분 확대',24,ACC,650,budget=27)
        svg+=pic('assets/cases/platform-9.png',988,455,785,240,(400,525,650,115))
        svg+=text(988,760,'탭별 하위 분류는 실제 원본을 확인한 뒤 확정',25,budget=29,limit=2)
        svg+=panel(120,860,1680,135,'담당 범위',mods[-1]['copy'])
        areas += [['실제 메뉴 분류',120,350,800,485],['실제 메뉴 부분 확대',960,350,840,485],['담당 범위',120,860,1680,135]]
    elif n==19:
        for j,label in enumerate(['실제 배경·활성·합계 UI','예시 수치와 초과 상태','개발 전달 범위']):
            x=120+j*570
            svg+=rect(x,350,540,540)+text(x+24,392,label,24,ACC,650,budget=20)
        for j,crop in enumerate([(1453,481,318,128),(1453,665,318,128),(1453,849,318,128)]):
            svg+=pic('portfolio_review_1009/09.png',145,420+j*132,490,117,crop)
        svg+=pic('portfolio_review_1009/10.png',725,425,470,200,(1453,614,318,128))
        svg+=text(715,680,mods[2]['copy'],28,budget=17,limit=4)
        svg+=text(1285,455,mods[3]['copy'],28,budget=17,limit=6)
        svg+=text(1285,755,'실제 ERP 전달 자료가 있으면\n이 영역에 추가',25,'#596579',budget=17,limit=2)
        svg+=text(120,955,mods[-1]['copy'],25,'#596579',budget=61,limit=2)
        areas += [['실제 UI 확대',120,350,540,540],['수치와 상태',690,350,540,540],['개발 전달 범위',1260,350,540,540]]
    elif layout=='screen':
        if n==13:
            svg+=rect(120,335,1100,580)+text(144,375,mods[1]['position'],24,ACC,650,budget=36)
            svg+=pic('assets/cases/tbm-4.jpg',415,397,310,490,(389,213,243,503))
        else:
            svg+=panel(120,335,1100,580,mods[1]['position'],mods[1]['copy'],mods[1]['image'])
        points=[(1,410,537),(2,674,788),(3,674,623)] if n==7 else [(1,746,460),(2,746,580),(3,746,698)]
        for number,x,y in points:
            svg+=f'<circle cx="{x}" cy="{y}" r="25" fill="{ACC}" stroke="white" stroke-width="3"/>'+text(x-8,y+9,str(number),25,'white',700,budget=3)
        areas.append([mods[1]['position'],120,335,1100,580])
        for j,mod in enumerate(mods[2:]):
            y=335+j*195
            svg+=panel(1260,y,540,175,mod['position'],mod['copy'])
            areas.append([mod['position'],1260,y,540,175])
    elif layout=='mobile':
        source='16.png' if n==13 else '17.png'
        if n==13:
            crops=[(155,499,560,496),(1062,208,374,225),(1161,434,340,357)]
        else:
            crops=[(155,499,560,496),(1062,208,374,210),(1161,434,340,419)]
        widths=[500,500,620];xx=120
        for j,mod in enumerate(mods[1:4]):
            w=widths[j]
            svg+=rect(xx,355,w,550)
            svg+=pic('portfolio_review_1009/'+source,xx+20,380,w-40,395,crops[j])
            svg+=text(xx+20,815,mod['copy'],26,budget=(w-40)/27,limit=2)
            areas.append([mod['position'],xx,355,w,550]);xx+=w+30
        warn='UI 속 오타·날짜 확인 후 재추출 필요'
        svg+=text(120,958,warn,28,'#B45309',budget=57)
    else:
        left=mods[1] if len(mods)>1 else mods[0]
        right=next((v for v in mods[2:] if v['image']),mods[2] if len(mods)>2 else left)
        imageleft=''
        if n==17: imageleft='portfolio_review_1009/11.png'
        if n==25: imageleft='assets/cases/kanban-board-source.png'
        crops={12:('assets/cases/tbm-3.jpg',(88,214,247,503)),14:('assets/cases/tbm-5.jpg',(88,213,244,503)),24:('portfolio_review_1009/16.png',(1062,208,439,583))}
        if n==23:
            svg+=rect(120,350,800,485)
            svg+=text(144,395,left['position'],24,ACC,650,budget=27)
            svg+=pic('assets/pp/designsystem/designsystem03.jpg',150,430,740,265,(1425,204,342,117))
            svg+=text(150,760,left['copy'],28,budget=24,limit=2)
        elif n in crops:
            asset,crop=crops[n]
            svg+=rect(120,350,800,485)+text(144,395,left['position'],24,ACC,650,budget=27)
            svg+=pic(asset,230,420,550,310,crop)
            if n==12:
                svg+=rect(230,560,550,170,'#EDF2FF',ACC)+text(250,618,'제출본은 실명·서명 등을\n익명화한 일지로 교체',27,ACC,budget=18,limit=3)
            svg+=text(144,782,left['copy'],25,budget=27,limit=1)
        elif n in [21,22]:
            svg+=rect(120,350,800,485,'#FFFFFF',ACC,True)+text(144,395,left['position'],24,ACC,650,budget=27)
            svg+=text(160,500,left['copy'],32,budget=21,limit=3)+text(160,720,'실제 업무 원본을 가져올 자리',27,ACC,budget=24,limit=1)
        else:
            svg+=panel(120,350,800,485,left['position'],left['copy'],imageleft or left['image'])
        rightimage=right['image']
        if n==25: rightimage='assets/cases/kanban-detail-source.png'
        if n==23:
            svg+=rect(960,350,840,485)
            svg+=text(984,395,right['position'],24,ACC,650,budget=27)
            svg+=pic('assets/pp/designsystem/designsystem03.jpg',990,420,780,325,(1425,524,342,240))
            svg+=text(990,785,right['copy'],25,budget=29,limit=1)
        elif n in [14,24]:
            asset,crop=('assets/cases/tbm-5.jpg',(389,213,243,503)) if n==14 else ('portfolio_review_1009/17.png',(1062,208,439,645))
            svg+=rect(960,350,840,485)+text(984,395,right['position'],24,ACC,650,budget=27)
            svg+=pic(asset,1110,420,540,310,crop)+text(984,782,right['copy'],25,budget=29,limit=1)
        elif n in [21,22]:
            svg+=rect(960,350,840,485,'#FFFFFF',ACC,True)+text(984,395,right['position'],24,ACC,650,budget=27)
            svg+=text(1000,500,right['copy'],32,budget=22,limit=3)+text(1000,720,'실제 적용 코드·화면을 가져올 자리',27,ACC,budget=25,limit=1)
        else:
            svg+=panel(960,350,840,485,right['position'],right['copy'],rightimage)
        if n==14: svg+=text(927,610,'→',34,ACC,700,budget=2)
        areas += [[left['position'],120,350,800,485],[right['position'],960,350,840,485]]
        remain=[v for v in mods[2:] if v is not right]
        if remain:
            body=' / '.join(v['copy'].replace('\n',' · ') for v in remain)
            svg+=panel(120,860,1680,135,'하단 설명 / 추가 모듈',body)
            areas.append(['하단 설명 / 추가 모듈',120,860,1680,135])
    svg+=text(120,1042,'편집용 배치 예시 · 실제 제출 전 원본 UI 수정과 사실 확인 필요',22,'#596579',budget=68)
    svg+='</g></svg>'
    (OUT/f'배치도/{n:02}.svg').write_text(svg)
    page['areas']=areas

for page in DATA['pages']: render(page)
(OUT/'작업자료/page-plan.json').write_text(json.dumps(DATA,ensure_ascii=False,indent=2))

CSS='''*{box-sizing:border-box}body{margin:0;background:#f4f6fa;color:#18212b;font-family:"Noto Sans KR","Apple SD Gothic Neo",sans-serif;font-size:15px;line-height:1.65}header{padding:30px 4vw 20px;background:white;border-bottom:1px solid #d8dfeb}h1{font-size:27px;margin:0 0 8px}p{margin:8px 0}a{color:#2d5bdb}.controls{display:flex;gap:12px;align-items:center;flex-wrap:wrap;position:sticky;top:0;background:#fff;padding:14px 4vw;border-bottom:1px solid #ccd5e3;z-index:5}button,select,input{font:inherit;padding:9px 12px;border:1px solid #c4cede;border-radius:7px;background:#fff}button{cursor:pointer}button[aria-pressed=true]{background:#2d5bdb;color:white}.controls input{min-width:220px}.content{padding:24px 4vw}.detail{display:none}.detail.active{display:block}h2{font-size:24px}.pair{display:grid;grid-template-columns:1fr 1fr;gap:22px}figure{margin:0;background:white;border:1px solid #d5ddeb;border-radius:10px;overflow:hidden}figcaption{padding:12px 16px;background:#edf2f9;font-weight:650}.canvas{aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;background:#e5eaf2}.canvas img{width:100%;height:100%;object-fit:contain}.sources{display:flex;gap:8px;flex-wrap:wrap;padding:10px 16px}.note{background:#fff;padding:20px;margin-top:18px;border-radius:9px;border:1px solid #d5ddeb}.warn{color:#8b470c;background:#fff5df;padding:12px 16px;border-radius:7px}table{width:100%;border-collapse:collapse;table-layout:fixed}th,td{vertical-align:top;text-align:left;border-bottom:1px solid #dde3ed;padding:12px;overflow-wrap:anywhere}th{background:#edf2f9}th:nth-child(1){width:18%}th:nth-child(2){width:28%}.copy{white-space:pre-line}.meta{font-size:13px;color:#596579}.index-list{display:grid;grid-template-columns:repeat(6,1fr);gap:9px;margin-bottom:24px}.index-list button{padding:7px;font-size:13px}.mapping{margin-top:36px}details summary{cursor:pointer;font-weight:650}.coords{font-family:monospace;font-size:13px}.only-source{display:none}@media(max-width:850px){.pair{grid-template-columns:1fr}.index-list{grid-template-columns:repeat(3,1fr)}th,td{padding:8px;font-size:13px}.content{padding:20px}.controls{position:static}.controls input{min-width:0;width:100%}}@media print{.controls,.index-list,.sources{display:none}.detail{display:block!important;break-before:page}.content{padding:0}.note{break-inside:avoid}.pair{grid-template-columns:1fr 1fr}header,.mapping{display:none}}'''

def originals(page):
    def targets(destination):
        found=set(map(int,re.findall(r'\d{2}',destination)))
        for start,end in re.findall(r'(\d{2})[–-](\d{2})',destination): found.update(range(int(start),int(end)+1))
        return found
    return [int(row[0]) for row in DATA['mapping'] if page['number'] in targets(row[2])]

parts=[]
for page in DATA['pages']:
    n=page['number'];orig=originals(page);first=orig[0] if orig else 35
    srcbuttons=''.join(f'<button class="source" data-src="../{i:02}.png" data-label="원본" data-original="{i:02}">원본 {i:02}</button>' for i in orig)
    if n in [20,21,22,23]:
        srcbuttons+='<button class="source" data-src="../../assets/pp/designsystem/designsystem03.jpg" data-original="웹 추가 자료">디자인 시스템 추가 원자료</button>'
    if n in [11,12,13,14,15]:
        source={11:1,12:3,13:4,14:5,15:6}[n]
        srcbuttons+=f'<button class="source" data-src="../../assets/cases/tbm-{source}.jpg" data-original="웹 TBM 자료">TBM 추가 원자료</button>'
    table=''.join('<tr><td>'+E(v['position'])+'</td><td>'+E(v['action'])+'</td><td class="copy">'+E(v['copy'])+'</td></tr>' for v in page['modules'])
    coord=''.join(f'<li>{E(a[0])}: x={a[1]}, y={a[2]}, w={a[3]}, h={a[4]}</li>' for a in page['areas'])
    parts.append(f'''<section class="detail" id="target-{n:02}" data-title="{E(page['title'])}"><h2>새 {n:02} · {E(page['title'])}</h2><p class="meta">{E(page['source'])} · {E(page['purpose'])}</p><div class="pair"><figure><figcaption class="before-label">현재 원본 {first:02}</figcaption><div class="canvas"><img class="before-image" loading="lazy" src="../{first:02}.png" alt="현재 포트폴리오 원본 {first:02}"></div><div class="sources">{srcbuttons}</div></figure><figure><figcaption>수정 후 배치 · 편집용 설명</figcaption><div class="canvas"><img loading="lazy" src="배치도/{n:02}.svg" alt="새 {n:02} 페이지 편집 배치도"></div><div class="sources"><a href="배치도/{n:02}.svg" target="_blank">배치도 크게 열기 ↗</a></div></figure></div><div class="note"><table><thead><tr><th>정확한 위치</th><th>할 작업</th><th>그 위치의 교체 문구</th></tr></thead><tbody>{table}</tbody></table><p><strong>이미지·배치:</strong> {E(page['visual'])}</p><p><strong>완료 기준:</strong> {E(page['check'])}</p>{f'<p class="warn">추가 확인: {E(page["missing"])}</p>' if page['missing'] else ''}<details><summary>1920×1080 기준 좌표 보기</summary><ul class="coords">{coord}</ul><p>한 모듈의 여러 문장은 같은 의미 단위다. 긴 문장은 원본 디자인에서 줄바꿈과 영역 크기를 조정한다. 배치도는 요약 예시이고 위 표가 교체 원고다.</p></details></div></section>''')

buttons=''.join(f'<button data-target="{p["number"]:02}">{p["number"]:02} {E(p["title"])}</button>' for p in DATA['pages'])
opts=''.join(f'<option value="{r[0]}">원본 {r[0]} · {E(r[1])} → {E(r[2])}</option>' for r in DATA['mapping'])
rows=''.join('<tr>'+''.join('<td>'+E(s)+'</td>' for s in r)+'</tr>' for r in DATA['mapping'])
script='''const sections=[...document.querySelectorAll('.detail')];const status=document.querySelector('#status');let current=1;function show(n){current=Number(n);sections.forEach(s=>s.classList.toggle('active',s.id==='target-'+String(n).padStart(2,'0')));document.querySelectorAll('[data-target]').forEach(b=>b.setAttribute('aria-pressed',Number(b.dataset.target)===current));status.textContent='새 '+String(n).padStart(2,'0')+' / 26';const first=document.querySelector('.detail.active .source[data-original]');document.querySelector('#original').value=first?.dataset.original||'';history.replaceState(null,'','#target-'+String(n).padStart(2,'0'))}document.querySelectorAll('[data-target]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.target)));document.querySelector('#previous').onclick=()=>show(Math.max(1,current-1));document.querySelector('#next').onclick=()=>show(Math.min(26,current+1));document.querySelectorAll('.source').forEach(b=>b.onclick=()=>{const parent=b.closest('.detail');parent.querySelector('.before-image').src=b.dataset.src;parent.querySelector('.before-image').alt='현재 포트폴리오 원본 '+b.dataset.original;parent.querySelector('.before-label').textContent='현재 원본 '+b.dataset.original});const map=MAP;document.querySelector('#original').onchange=e=>{const r=map.find(r=>r[0]===e.target.value);const nums=r[2].match(/\\d{2}/g);if(nums){show(nums[0]);const s=document.querySelector('.detail.active .source[data-original="'+r[0]+'"]');if(s)s.click();document.querySelector('#original').value=r[0]}else{alert('원본 '+r[0]+'은 제출본에서 제외하고 작업 계획·면접부록으로 보존합니다. 아래 원본 대응표를 확인하세요.')}};document.querySelector('#search').oninput=e=>{const q=e.target.value.trim().toLowerCase();document.querySelectorAll('[data-target]').forEach(b=>b.hidden=!!q&&!b.textContent.toLowerCase().includes(q))};const h=location.hash.match(/target-(\\d+)/);show(h&&Number(h[1])>=1&&Number(h[1])<=26?h[1]:1);'''.replace('MAP',json.dumps(DATA['mapping'],ensure_ascii=False))

doc='<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>1009 원본 ↔ 1010 수정 배치 가이드</title><link rel="stylesheet" href="../../assets/fonts/fonts.css"><style>'+CSS+'</style></head><body><header><h1>1009 원본 ↔ 수정 후 배치</h1><p>기준은 1009 폴더의 36쪽. 새 제출본은 26쪽 구성입니다. 원본 번호와 새 번호를 함께 보며 수정하세요.</p><p><a href="../1010_페이지별_수정_실행가이드.md">전체 수정 가이드</a> · <a href="26쪽_수정배치_가이드.pdf">26쪽 배치 PDF</a> · <a href="증빙-확인목록.md">증빙 확인 목록</a></p><p class="warn">편집용 설명입니다. 원본 UI와 사실 확인이 끝난 제출본이 아닙니다. 기존 UI에 남아 있는 오타·날짜·테스트 데이터는 실제 원본에서 수정 후 다시 추출해야 합니다.</p></header><div class="controls"><button id="previous">← 이전</button><strong id="status"></strong><button id="next">다음 →</button><select id="original" aria-label="원본 페이지에서 찾기"><option value="">원본 페이지에서 찾기</option>'+opts+'</select><input id="search" type="search" aria-label="페이지 검색" placeholder="플랫폼·모바일·ERP 등 검색"></div><main class="content"><div class="index-list">'+buttons+'</div>'+''.join(parts)+'<details class="mapping"><summary>원본 36쪽 전체 대응표 펼치기</summary><table><thead><tr><th>원본</th><th>현재 페이지</th><th>새 위치</th><th>정확한 부분</th><th>실행</th></tr></thead><tbody>'+rows+'</tbody></table></details></main><script>'+script+'</script></body></html>'
(OUT/'원본-수정배치-비교.html').write_text(doc)

check='''# 증빙·이미지 확인 목록

기준: 현재 1009 PNG 36쪽 + 2026-10-10 본인 설명. 이미 답변한 배포·사용 상태는 다시 확인 대기로 돌리지 않는다.

## 확인한 사실

- 지원 조건: B2B 프로덕트 디자이너 / UX/UI 디자이너, 서울 또는 경기 성남·판교, 연봉 5,200만 원 이상.
- 통합 플랫폼·TBM: 개발자 협업, 배포 후 실제 사용자 사용.
- TBM: 웹은 수기 기록의 분실·변색·판독 어려움 위험에 대응, 모바일은 현장 일지 작성을 쉽게 하기 위한 설계. 개발자를 통해 사용자 피드백을 전달받았으나 구체적인 내용은 기억나지 않음.
- 모바일 인트라넷: 디자이너 팀이 기획·디자인·퍼블리싱. 미배포, 내부 확인. 외부 개발자 협업·실사용자 검증 사례로 쓰지 않음.
- 공통 UI 기준: 컬러 토큰을 SCSS로 만들어 프로젝트마다 사용. 입력·라디오·체크박스 일부 요소는 크기를 조정해 사용. 개발자 사용이나 팀 전체의 일괄 채택을 주장하지 않음.
- PSC: 개발 전달 이후 상태 불명. 기본 제출본에서 제외.

## 추가로 가져올 자료와 수정

| 우선 | 항목 | 가져올 자료/수정 | 새 위치 | 미확보 시 처리 |
|---|---|---|---|---|
| 1 | 플랫폼 선택·협업 | 실제 메뉴 분류, 대안 선택 이유, 변경한 UI 1건 | 06·08·10 | 화면에서 확인되는 메뉴와 실제 협업 범위만 표시 |
| 1 | 배포 범위 | 플랫폼/TBM 배포 시점·사용자 유형·본인 담당 | 04·10·11·15 | 배포·실사용 사실 유지, 인원/효과 숫자는 쓰지 않음 |
| 1 | TBM 피드백 | 당시 메신저/개발 요청/수정 화면 한 건 | 15 | 직접 인용·개선률 창작 금지, 확인되는 협업 범위만 설명 |
| 1 | 컬러 토큰 | 실제 업무용 SCSS 토큰 정의 + 적용 스타일 + UI | 21 | 가이드/실제 사용 사실로 축소, 임의 코드를 과거 증거로 쓰지 않음 |
| 2 | 요소 재사용 | 입력·라디오·체크박스 기본 요소 + 크기 조정한 적용 화면 | 22 | 자료 구조로 대체하거나 페이지 축소 |
| 2 | Search Bar | 고해상도 상태/사용 예시, 본인 제작 범위 | 23 | 본인 기여 확인되는 부분만 사용 |
| 2 | ERP 전달 | 같은 프로젝트의 규칙·수치·상태 관련 전달 자료 | 19 | 다른 프로젝트 모달 코드 제외, 실제 UI와 공유 범위만 제시 |
| 2 | 회사 관계 | 재직 회사와 프로젝트 대상 회사의 실제 관계 | 02·04·20·24 | 임의 고객/관계사 표기 금지 |
| 2 | 기간 | TBM 작업 기간, 모바일의 2023 기간과 2024/2025 UI 날짜 관계 | 11·24 | 실제 예시/추가 수정 여부에 맞춰 캡션 |
| 수정 | 결재선 | 원본 17 UI의 결제선 → 결재선 | 24 | 원본 디자인 수정 후 다시 export |
| 수정 | 칸반 | 의미 있는 시연 데이터와 작업 생성 화면 | 25 | 실제 실행 화면 재캡처 |
| 수정 | 일지 | 종이 일지 실명·서명·현장명 익명화 | 12 | 익명화한 예시 또는 식별 부분 제외 |
| 확인 | 평가·특허 | 점수 원자료/평가 범위, 특허 상태/개인 기여 | 02·10 | 확인 전 점수·최고점·등록 주장 제외 |
| 확인 | 학력 | 실제 학위·전공·수여기관 표기 | 02 | 증명서와 일치하는 사실만 기재 |

## 협업 한 건을 정리하는 양식

- 프로젝트/시점:
- 실제 요청 또는 문제:
- 당시 제약:
- 검토한 선택지:
- 내가 맡은 결정:
- 변경한 UI 요소:
- 증거 파일/기억에 근거한 회고 여부:
- 실제 확인/활용 범위:

실제 대화 내용을 모르면 직접 인용을 만들지 않는다. 새 보완은 수행 날짜를 분리한다. 연봉 비교는 기본연봉과 성과급 포함 금액을 구분한다.
'''
(OUT/'증빙-확인목록.md').write_text(check)
(OUT/'지원관리.csv').write_text('회사,공고URL,직무,필수요건,대응페이지,연봉조건,근무조건,지원일,제출버전,서류결과,1차면접일,2차면접일,결과,피드백,다음조치,입사가능일\n',encoding='utf-8-sig')

for n in [6,8,13,14,19,21]:
    (OUT/f'작업자료/render-{n:02}.html').write_text(f'<!doctype html><html lang="ko"><meta charset="utf-8"><style>body{{margin:0}}img{{width:1920px;height:1080px;display:block}}</style><img src="../배치도/{n:02}.svg" alt="편집 배치도">')

print('created: 26 SVG layouts + interactive comparison + evidence checklist + application CSV')
