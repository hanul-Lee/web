"""Build the reviewed 26-page portfolio with selectable Korean text and links.
Run with the bundled Python runtime (reportlab and Pillow).
"""
from pathlib import Path
from xml.sax.saxutils import escape
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from PIL import Image
import json
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output/pdf/portfolio-final.pdf';OUT.parent.mkdir(parents=True,exist_ok=True)
for n,f in [('R','SUIT-Regular.ttf'),('B','SUIT-Bold.ttf')]:
 pdfmetrics.registerFont(TTFont(n,str(Path.home()/'Library/Fonts'/f)))
W,H=1200,675;C=canvas.Canvas(str(OUT),pagesize=(W,H),pageCompression=1)
C.setTitle('이한울 | UX/UI · Product Designer 포트폴리오');C.setAuthor('이한울');C.setSubject('업무 플랫폼 · 현장 기록 · 비용·인원 ERP · 공통 UI');C.setCreator('Portfolio source / 2026-10-16')
page=0;dark=False;fg='#18212C';muted='#536170';accent='#27625B';audit=[]
def rect(x,y,w,h,color,r=0):
 C.setFillColor(HexColor(color));C.setStrokeColor(HexColor(color))
 if r:C.roundRect(x,H-y-h,w,h,r,fill=1,stroke=0)
 else:C.rect(x,H-y-h,w,h,fill=1,stroke=0)
def para(text,x,y,w,size=16,color=None,bold=False,maxh=300):
 sty=ParagraphStyle('p',fontName='B' if bold else 'R',fontSize=size,leading=size*1.5,textColor=HexColor(color or fg),wordWrap='CJK')
 p=Paragraph(escape(text).replace('\n','<br/>'),sty);_,h=p.wrap(w,maxh)
 assert h<=maxh+1,(page,text,h,maxh)
 assert y+h<=H-12,(page,text,y,h)
 p.drawOn(C,x,H-y-h);audit.append({'page':page,'text':text,'x':x,'y':y,'w':w,'h':h});return h

def img(path,x,y,w,h):
 path=ROOT/path
 im=Image.open(path);iw,ih=im.size;scale=min(w/iw,h/ih);dw,dh=iw*scale,ih*scale
 C.drawImage(str(path),x+(w-dw)/2,H-y-(h+dh)/2,dw,dh,mask='auto')
def start(label,title='',sub='',is_dark=False):
 global page,dark,fg,muted,accent
 page+=1;dark=is_dark;fg='#F5F7FA' if dark else '#18212C';muted='#B5C0CE' if dark else '#536170';accent='#EDB86C' if dark else '#27625B'
 rect(0,0,W,H,'#161C25' if dark else '#FAFBFC');C.bookmarkPage(f'p{page}')
 para('HANUL  /  PORTFOLIO',48,24,400,10,muted,True,maxh=20)
 para(f'{label}   /   {page:02}',770,24,382,10,muted,maxh=20)
 C.linkRect('', 'p3',(48,H-43,230,H-20),relative=0,thickness=0)
 if title:para(title,48,72,1104,29,bold=True,maxh=90)
 if sub:para(sub,48,151,1090,15,muted,maxh=68)
 para('이한울 · UX/UI / Product Designer',48,642,700,9,muted,maxh=16)
 para('목차로',1095,642,60,9,muted,maxh=16);C.linkRect('','p3',(1090,14,1153,37),thickness=0)
def end():C.showPage()
def note(text,y=582):
 rect(48,y,1104,44,'#252F3C' if dark else '#EAF0F2',8);para(text,65,y+11,1070,13,muted,maxh=25)
def card(x,y,w,h,label,text):
 rect(x,y,w,h,'#222D3A' if dark else '#EDF1F4',9);para(label,x+20,y+18,w-40,17,accent,True,maxh=55);para(text,x+20,y+(48 if h<=150 else 72),w-40,14 if h<=150 else 15,maxh=h-(56 if h<=150 else 85))
def figure(path,x,y,w,h,caption):
 rect(x,y,w,h,'#FFFFFF',7);img(path,x+10,y+10,w-20,h-20);para(caption,x,y+h+10,w,12,muted,maxh=48)
def cover(label,title,sub,path,meta,is_dark=False):
 start(label,is_dark=is_dark);para(title,48,145,510,34,bold=True,maxh=120);para(sub,48,296,465,17,muted,maxh=150)
 img(path,590,100,562,420)
 for i,(k,v) in enumerate(meta):
  x=48+i*276;para(k,x,550,254,11,accent,True,maxh=20);para(v,x,578,250,13,maxh=52)
 end()
A='assets/cases/final/'
# 1
start('INTRO',is_dark=True);para('업무를 이해하고,\n화면과 구현으로 연결합니다.',48,157,1000,43,bold=True,maxh=150)
para('B2B 업무 서비스의 UX/UI를 설계하고\nHTML·CSS·SCSS로 화면을 구현하는 디자이너 이한울입니다.',52,342,1000,23,muted,maxh=90)
para('통합 플랫폼  /  현장 안전 기록  /  비용·인원 ERP  /  공통 UI',52,520,1000,15,accent,maxh=25)
para('프로젝트 목차 보기 →',52,578,400,15,bold=True,maxh=25);C.linkRect('','p3',(48,67,300,102),thickness=0);end()
# 2
start('PROFILE','업무 구조를 이해하고, UI와 퍼블리싱을 담당합니다.',is_dark=True)
img(A+'portrait.png',48,151,128,130)
para('이한울',200,157,500,23,bold=True,maxh=40);para('UX/UI · Product Designer',200,202,500,17,muted,maxh=30)
para('hanul.designer@gmail.com  /  010 9271 8997',200,240,720,15,muted,maxh=30)
C.linkURL('mailto:hanul.designer@gmail.com',(200,H-270,510,H-237),relative=0)
para('경력',48,320,550,18,accent,True,maxh=30)
para('2022.12 - 현재  |  삼안 기술개발센터',48,365,610,18,bold=True,maxh=30)
para('통합 플랫폼 메뉴·지도 UI, TBM 모바일 화면과 웹 파일 열람 UI,\n비용·인원 ERP 설계·퍼블리싱, 컬러·공통 UI 가이드를 담당했습니다.',48,404,610,15,muted,maxh=65)
para('2020.09 - 2022.12  |  핸섬피쉬',48,493,610,18,bold=True,maxh=30)
para('기업·서비스 웹사이트 UI와 반응형 화면을 설계했습니다.\n스카이오토넷 웹사이트 UI·퍼블리싱을 담당했습니다.',48,532,610,15,muted,maxh=65)
para('실무 역량',750,320,400,18,accent,True,maxh=30)
para('화면 흐름 · UX/UI · 반응형 웹\nFigma · HTML · CSS / SCSS\nJavaScript · Git · Photoshop',750,363,400,15,muted,maxh=85)
para('학력',750,480,400,18,accent,True,maxh=30)
para('2024.07 - 2026.02\n국가평생교육진흥원 · 시각디자인 학사\n2020.03 - 2022.02\n한국방송통신대학교 · 미디어영상학과 졸업',750,519,400,13,muted,maxh=85);end()
# 3
start('CONTENTS','배포된 서비스부터, 설계와 구현 경험까지.', '프로젝트를 누르면 해당 페이지로 이동합니다.',True)
items=[('01','통합 관리 플랫폼','메뉴 구분 · 지도 탐색 · 퍼블리싱','배포 후 실사용',4),('02','현장 안전 기록(TBM)','모바일 일지·서명 · 웹 파일 열람','배포 후 실사용',11),('03','비용·인원 ERP','조회 범위 · 요약과 상세 · 상태 표현','웹 설계안 최종 미사용',16),('04','공통 UI 기준','컬러 변수 · 입력·검색 상태 · 웹 가이드','컬러와 일부 UI 재사용',20)]
for i,(num,t,desc,state,dest) in enumerate(items):
 y=225+i*79;rect(48,y,1104,67,'#222D3A',7);para(num,67,y+16,70,22,accent,True,maxh=35);para(t,150,y+11,400,20,bold=True,maxh=34);para(desc,150,y+44,620,12,muted,maxh=22);para(state,810,y+21,270,14,muted,maxh=25);para(f'{dest:02} →',1090,y+20,60,14,accent,maxh=24);C.linkRect('',f'p{dest}',(48,H-y-67,1152,H-y),thickness=0)
para('추가 경험   24 모바일 인트라넷   /   25 개인 칸반 프로토타입',48,570,1000,15,muted,maxh=26)
C.linkRect('','p24',(48,75,700,110),thickness=0);end()
# 4
cover('01 / PLATFORM','지도와 업무 자료를 연결한\n통합 관리 플랫폼','기획에서 제안한 메뉴 구분을 UI에 반영하고, 지도 탐색 화면과 퍼블리싱을 담당했습니다. 플랫폼은 배포 후 실제 사용자가 이용했습니다.','assets/cases/platform-9.png',[('기간','2023.01 - 2023.12'),('직접 담당','메뉴·지도 탐색 UI · 퍼블리싱'),('협업','개발자 · 기획자 · 엔지니어'),('결과','배포 후 실사용')],True)
# 5
start('PLATFORM / CONTEXT','자료를 파악하는 일과 메뉴를 구분하는 일이 필요했습니다.','프로젝트를 처음 맡으며 여러 파일과 기존 프로그램의 자료를 전달받았습니다.',True)
card(48,240,352,280,'자료 인계','여러 파일과 프로그램을 함께 살펴봐야 했습니다. 사람마다 보유한 파일이 달라 어떤 자료가 최종본인지 헷갈리기도 했습니다.')
card(424,240,352,280,'화면에서 드러난 문제','초기 화면에서는 기능이 어느 분야에 속하는지 구분하기 어려웠습니다. 기획 측에서 메뉴를 나누자는 요청을 받았습니다.')
card(800,240,352,280,'제가 맡은 UI 과제','‘현장 설명 / 사업 관리’의 구분을 메뉴에 반영하고, 지도에서 관련 기능으로 진입하는 화면을 설계했습니다.')
note('자료의 최종본 혼동은 업무 배경입니다. 메뉴를 나눠 파일 버전 관리까지 해결했다는 의미는 아닙니다.');end()
# 6
start('PLATFORM / ROLE','메뉴를 나누는 방향과, 화면에서 표현하는 일을 구분했습니다.','기획의 요청을 바탕으로 메뉴와 지도 탐색 UI를 구체화했습니다.',True)
card(48,234,425,145,'기획에서 정한 방향','메뉴를 ‘현장 설명 / 사업 관리’로 구분')
card(48,399,425,145,'제가 비교하고 선택한 부분','메뉴 영역을 구분하면서 지도 배경이 이어져 보이도록 배경색과 선택 상태를 검토')
figure('assets/cases/platform-9.png',505,234,647,310,'당시 실제 설계 화면 · 하단 공통 메뉴와 자료 유형 선택');end()
# 7
start('PLATFORM / FLOW','지도에서 업무 메뉴로, 메뉴에서 자료 유형으로 이어집니다.','위치와 메뉴, 자료 선택 영역의 역할을 나눠 화면을 구성했습니다.',True)
figure('assets/cases/platform-9.png',48,228,710,352,'지도·하단 업무 메뉴·시뮬레이션 자료 선택 화면')
for i,(l,t) in enumerate([('01  지도','공정 구간과 현장 위치를 확인합니다.'),('02  업무 메뉴','관련 기능으로 이동할 진입점을 선택합니다.'),('03  자료 유형','공정·주행·일조·배수 시뮬레이션을 확인합니다.')]):card(790,228+i*119,362,105,l,t)
end()
# 8
start('PLATFORM / ALTERNATIVES','메뉴는 구분하되, 지도는 끊지 않기.','메뉴 영역의 구분과 지도 배경의 연속성을 함께 비교했습니다.',True)
# Original alternative crops, same area and scale.
for i,(l,t,path) in enumerate([('흰색','경계는 선명하지만 지도와 분리되어 보였습니다.','menu-white'),('검정','메뉴 영역의 존재감이 강했습니다.','menu-black'),('반투명 검정 · 선택','메뉴를 구분하면서 지도 배경이 이어져 보였습니다.','menu-selected')]):
 x=48+i*376;figure(A+path+'.png',x,228,352,210,l);para(t,x,497,352,16,muted,maxh=65)
note('당시 시안은 메뉴 구성과 선택 상태도 다릅니다. 동일 조건의 사용성 실험 결과는 아닙니다.');end()
# 9
start('PLATFORM / INFORMATION','자료 유형마다 진입할 메뉴를 정리했습니다.','같은 지도 위에서 필요한 자료로 이동할 수 있도록 진입점을 구성했습니다.',True)
figure('assets/cases/platform-9.png',48,230,674,345,'당시 설계 화면 · 시뮬레이션 자료 유형 선택')
for i,(l,t) in enumerate([('도면','도면 메뉴로 진입'),('시뮬레이션 영상','시뮬레이션 메뉴에서 자료 유형 선택'),('3D 자료','실감형 모델 메뉴로 진입')]):card(754,230+i*115,398,102,l,t)
end()
# 10
start('PLATFORM / DELIVERY','설계·퍼블리싱한 플랫폼이 실제 사용으로 이어졌습니다.','배포 사실과 내부 의견을 나누어 정리했습니다.',True)
card(48,235,540,265,'직접 담당과 협업','기획의 메뉴 분리 요청을 UI에 반영하고 지도 탐색 화면을 퍼블리싱했습니다. 개발자·기획자·엔지니어와 정보 범위와 UI 기준을 조율했습니다. 산출물은 시연과 내부 소통에도 활용했습니다.')
card(612,235,540,265,'내부 동료에게 받은 의견','메뉴가 나뉘어 구분이 명확하고 사용하기 좋다는 의견을 받았습니다. 현장 사용자에게 직접 받은 평가는 아닙니다.')
note('탐색 시간·클릭 수 변화는 측정하지 않았습니다. 실제 현장 사용자의 탐색 과업은 후속 확인 과제입니다.');end()
# 11
cover('02 / TBM','종이 안전 일지를,\n웹·모바일 기록으로.','모바일 일지·서명 화면의 기획·디자인과 웹 UI에 참여했습니다. 담당자 요청으로 추가한 파일 열람 기능의 디자인·퍼블리싱도 맡았습니다.','assets/cases/tbm-7.png',[('기간','2025.11 - 2026.04'),('모바일','일지·서명 기획·디자인'),('웹','UI 참여 · 파일 열람 퍼블리싱'),('결과','배포 후 실제 사용자 이용')])
# 12
start('TBM / CONTEXT','기록의 보관과 판독, 현장 작성에 대응했습니다.','종이 일지의 항목을 바탕으로 웹과 모바일에서 필요한 일을 정리했습니다.')
card(48,236,352,288,'보관','종이 기록은 분실·변색될 수 있었습니다. 기록을 입력하고 보관하는 웹 화면을 설계 과제로 삼았습니다.')
card(424,236,352,288,'판독','손글씨 대신 내용을 입력할 항목이 필요했습니다. 작성일·작업 내용·확인 항목 등 기존 일지의 구조를 살폈습니다.')
card(800,236,352,288,'현장 작성','현장에서도 일지를 작성할 수 있도록 모바일 화면을 설계했습니다. 작성 맥락과 확인 상태를 구분했습니다.')
note('기존 일지 검토를 바탕으로 정리한 설계 과제입니다. 분실률·작성 시간의 전후 변화는 측정하지 않았습니다.');end()
# 13
start('TBM / RECORD','작성 맥락과 확인 상태를 보고, 일지 작성으로 진입합니다.','일지의 날짜·출역 인원·담당자 확인 항목과 작성 버튼을 구분했습니다.')
img(A+'tbm-record-source.png',100,224,400,365)
for i,(l,t) in enumerate([('작성 맥락','작성일과 금일 출역 인원을 상단에서 확인합니다.'),('확인 상태','담당·소장 확인 상태와 근로자 확인 항목을 구분합니다.'),('작성 진입','하단 ‘작성하기’ 버튼에서 다음 입력 단계로 이동합니다.')]):card(570,226+i*119,582,105,l,t)
end()
# 14
start('TBM / SIGNATURE','서명 입력과 저장 완료를 구분해 보여줍니다.','마이페이지에서 서명을 입력·변경하고, 저장 후 완료 메시지를 확인합니다.')
figure(A+'tbm-sign-source.png',48,220,535,355,'01  서명 입력·변경 → 저장')
figure(A+'tbm-saved-source.png',617,220,535,355,'02  저장 완료 메시지 확인')
para('서명 저장 흐름입니다. 일지 전체의 작성·제출 흐름과는 별도입니다.',48,614,1100,12,muted,maxh=20);end()
# 15
start('TBM / SCOPE CHANGE','일지 업로드에, 사이트 안에서 파일을 여는 기능을 더했습니다.','담당자는 각자의 PC에서 따로 열던 자료를 사이트 안에서 함께 확인하기를 원했습니다.')
card(48,235,352,274,'초기 기획','프로젝트 선택\nTBM 일지 작성·업로드')
card(424,235,352,274,'추가 요청','사이트 안에서 PDF·HWP 등 관련 파일 열람')
card(800,235,352,274,'직접 담당','추가된 파일 열람 기능의 디자인·퍼블리싱\n개발자와 협업')
para('담당한 화면은 배포되어 실제 사용자가 이용했습니다. 사용자 의견은 개발자를 통해 전달받았습니다.',48,538,1100,16,maxh=30)
note('기획 범위 변화 설명입니다. 파일 열람 화면 캡처는 포함하지 않았으며 이용률·업무 시간 변화는 측정하지 않았습니다.');end()
# 16
cover('03 / ERP','조회 목적에 맞춘\n비용·인원 대시보드.','전사·프로젝트·개인 범위에서 주요 수치와 상세 내역을 확인하는 UI를 설계·퍼블리싱했습니다. 이후 제공 형식이 PDF로 바뀌어 웹 설계안은 최종 사용되지 않았습니다.',A+'erp-screen.png',[('기간','2025.11 - 2026.04'),('직접 담당','조회 범위 · UX/UI · 퍼블리싱'),('협업','개발자'),('결과','웹 설계·퍼블리싱 · 최종 미사용')])
# 17
start('ERP / STRUCTURE','행 단위 자료를 요약과 상세로 나눴습니다.','기존 자료의 날짜·인원·프로젝트·시간·비용 항목을 화면의 정보 위계로 정리했습니다.')
figure(A+'erp-records.png',48,235,535,280,'기존 업무 자료 · 행 단위 기록')
figure(A+'erp-screen.png',617,235,535,280,'당시 웹 설계안 · 주요 수치와 프로젝트·인원별 상세')
note('비교 범위: 기존 자료와 웹 설계안의 정보 배치. 운영 전후의 효과를 비교한 자료는 아닙니다.');end()
# 18
start('ERP / QUERY','조건을 정한 뒤, 주요 수치와 상세 내역을 확인합니다.','전사·프로젝트·개인은 접근 권한이 아니라 정보를 조회하는 범위입니다.')
figure(A+'erp-screen.png',48,224,690,350,'조회 조건 · 주요 수치 · 프로젝트와 인원별 상세')
for i,(l,t) in enumerate([('전사','여러 프로젝트의 비용·인원 현황'),('프로젝트','선택한 프로젝트의 수치와 상세'),('개인','본인과 관련된 업무 정보')]):card(770,224+i*118,382,105,l,t)
end()
# 19
start('ERP / DELIVERY','현재 범위, 비용 합계, 초과 상태를 구분했습니다.','상태 색상·수치 강조·요소 간격을 개발자와 공유하고 HTML·CSS·SCSS로 퍼블리싱했습니다.')
figure(A+'erp-menu.png',48,230,345,300,'선택한 조회 범위와 비용 합계')
figure(A+'erp-overtime.png',417,230,345,300,'투입 9시간 / 기준 8시간 · 초과 상태 예시')
card(786,230,366,300,'진행 결과와 배운 점','웹 UI 설계와 퍼블리싱을 수행했습니다. 제공 형식이 PDF로 바뀐 경험을 바탕으로, 다음에는 조회 방식과 최종 산출물 형식을 먼저 합의하겠습니다.')
note('화면 속 수치는 상태 표현 예시입니다. 웹 설계안은 최종 사용되지 않았습니다.');end()
# 20
cover('04 / COMMON UI','컬러와 공통 UI를\n디자인·퍼블리싱에 재사용.','공통 컬러를 SCSS 변수로 관리하고 입력·검색 UI의 상태를 웹 가이드로 정리했습니다. 컬러와 일부 UI 요소를 디자이너의 작업에서 재사용했습니다.','assets/cases/designsystem-guide-source.png',[('기간','2024.05 - 진행 중'),('직접 담당','공통 UI 기준 · 웹 가이드'),('구현','SCSS 컬러 변수 관리'),('사용 범위','컬러와 일부 UI 요소 재사용')])
# 21
start('COMMON UI / COLOR','컬러 변수와 가이드의 색상 기준을 연결했습니다.','공통 컬러를 SCSS 변수로 정의하고, 웹 가이드에 대응하는 색상 단계를 정리했습니다.')
figure(A+'color-code.png',48,235,535,300,'실제 변수 파일 · Primary / Secondary 컬러 정의')
figure(A+'color-guide.png',617,235,535,300,'웹 가이드 · 색상 단계와 사용 기준')
note('컬러 변수의 정의와 가이드입니다. 프로젝트별 적용 화면이나 조직 전체 도입 성과를 보여주는 자료는 아닙니다.');end()
# 22
start('COMMON UI / INPUT','입력 UI의 상태와 스타일을 정리했습니다.','테이블·목록의 읽기 전용·편집 상태와 기본 입력·라벨·설명문 예시를 구분했습니다.')
figure(A+'input-code.png',48,228,535,320,'실제 SCSS · 읽기 전용 / 편집 스타일')
figure(A+'input-guide.png',617,228,535,320,'당시 입력 가이드 · 기본 입력 / 라벨·설명문')
note('입력·라디오·체크박스 중 일부 요소는 화면에 맞춰 크기를 조정해 사용했습니다.');end()
# 23
start('COMMON UI / SEARCH','검색 입력은 네 상태와 배치 예시로 정리했습니다.','기본·포커스·입력 중·비활성 상태를 구분하고 검색창이 놓일 위치를 보여주었습니다.')
figure(A+'search-states.png',48,230,535,300,'기본 / 포커스 / 입력 중 / 비활성')
figure(A+'search-layout.png',617,230,535,300,'콘텐츠 영역 상단의 검색 입력 배치 예시')
note('당시 가이드 발췌입니다. 실제 재사용 범위는 컬러와 일부 UI이며 전체 컴포넌트 운영 성과는 측정하지 않았습니다.');end()
# 24
start('ADDITIONAL / INTRANET','현황 확인에서 회의실 예약과 근태 신청으로 연결했습니다.','디자이너 팀에서 모바일 인트라넷의 기획·UI·퍼블리싱에 참여했습니다.')
figure(A+'intranet-booking.png',48,222,535,330,'회의실 현황 → 예약일·시간·목적 입력')
figure(A+'intranet-request.png',617,222,535,330,'문서 상태 → 근태 종류·일자·사유 입력')
note('2023.01 - 2023.06 · 팀 내부 설계·구현 확인 · 미배포');end()
# 25
start('ADDITIONAL / PROTOTYPE','이미지 카드와 작업 생성을 직접 구현해 본 개인 작업입니다.','보드 UI를 설계하고 AI의 도움을 받아 카드 이동과 작업 입력을 구현했습니다.')
figure('assets/cases/kanban-board-source.png',48,221,650,300,'실제 개인 프로토타입 · 이미지·제목·담당자 정보')
figure(A+'kanban-create.png',736,221,416,300,'작업 생성 · 제목·설명·담당자·상태·일정')
para('다음 수정: 현재 섞여 있는 작업 분야와 진행 상태를 분리하고, 작업 생성·카드 이동 과업을 확인하려 합니다.',48,595,1104,13,muted,maxh=40)
para('2026.03 - 진행 중 · AI 보조 구현 · 실제 사용자 평가 미실시',48,565,1104,12,muted,maxh=22);end()
# 26
start('CONTACT',is_dark=True);para('업무를 이해하는 설계부터\n화면 구현까지 함께하겠습니다.',48,165,1050,40,bold=True,maxh=135)
para('이한울  |  UX/UI · Product Designer',52,346,1000,20,muted,maxh=35)
for i,(t,url) in enumerate([('hanul.designer@gmail.com','mailto:hanul.designer@gmail.com'),('010 9271 8997','tel:+821092718997'),('hanul-lee.github.io/web','https://hanul-lee.github.io/web/')]):
 y=420+i*51;para(t,52,y,1000,21,accent,maxh=35);C.linkURL(url,(48,H-y-36,720,H-y+2),relative=0)
end()
for title,n in [('소개',1),('경력',2),('목차',3),('통합 플랫폼',4),('현장 안전 기록',11),('비용·인원 ERP',16),('공통 UI',20),('모바일 인트라넷',24),('개인 프로토타입',25),('연락처',26)]:C.addOutlineEntry(title,f'p{n}',level=0,closed=False)
C.save();(OUT.parent/'layout-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2));print(OUT)
