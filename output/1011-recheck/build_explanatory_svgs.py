from pathlib import Path
import html

ASSETS=Path(__file__).resolve().parents[2]/'assets/cases/1011'
def start(title,w=1100,h=650):
    return [f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img"><title>{html.escape(title)}</title><rect width="{w}" height="{h}" rx="20" fill="#f4f6fa"/><g font-family="Arial, sans-serif" fill="#202c3d">']
def text(x,y,t,size=20,color='#202c3d',weight=400):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{weight}">{html.escape(t)}</text>'
def rect(x,y,w,h,fill='white',stroke='#dce3ed',r=10):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}"/>'
def finish(name,parts):
    (ASSETS/name).write_text(''.join(parts)+ '</g></svg>')

p=start('비용·인원 ERP 조회 구조 재구성')
p += [text(36,52,'조회 범위 → 주요 수치·현황 요약 → 상세',26,weight=700), rect(36,82,1028,506), rect(36,82,210,506,'#202947','#202947')]
for i,(label,active) in enumerate([('CostView',False),('전체 프로젝트 통합',False),('팀/개인별 분석',True),('전사 현황',False),('프로젝트 상세',False),('개인 업무 정보',False)]):
    y=118+i*66
    if active:p += [rect(49,y-27,184,43,'#ecebff','#ecebff',5)]
    p += [text(62,y,label,17,'#5643d9' if active else '#ffffff',700 if i==0 else 400)]
p += [rect(265,99,780,50,'#f9fafc'),text(285,132,'조회 조건',19,weight=700),text(410,132,'기간  ·  조회 범위  ·  프로젝트',17),rect(908,108,118,32,'#5548dd','#5548dd',5),text(938,130,'조회',17,'white')]
for i,(title,content) in enumerate([('프로젝트','현황 요약'),('비용','항목과 합계'),('인원','투입 현황')]):
    x=265+i*264
    p += [rect(x,166,252,98),text(x+18,197,title,16,'#627189'),text(x+18,236,content,24,weight=700)]
p += [rect(265,282,780,156),text(285,315,'프로젝트별 상세',19,weight=700)]
for i,(label,color) in enumerate([('프로젝트 A','#526ce0'),('프로젝트 B','#ed9860'),('프로젝트 C','#43a698')]):
    y=347+i*32
    p += [text(285,y,label,16),rect(433,y-15,395,11,'#edf0f5','#edf0f5',4),rect(433,y-15,210+i*60,11,color,color,4),text(854,y,'비용·투입 정보',15,'#627189')]
p += [rect(265,454,490,111),text(285,486,'인원별 상세 · 상태 예시',18,weight=700),text(285,526,'투입 9시간 / 기준 8시간',23,'#5548dd',700),text(285,551,'초과 1시간 표시',16,'#d95667'),rect(772,454,273,111),text(791,486,'비용 합계',18,weight=700),text(791,526,'항목과 합계 구분',21,weight=700),text(36,626,'정보 구조 설명도 · 1011 16–19쪽 재구성 · 최종 웹 설계안 미사용',17,'#627189')]
finish('erp-structure.svg',p)

p=start('검색 입력의 상태와 배치 예시')
p += [text(36,52,'검색 입력의 상태와 배치',28,weight=700),text(36,87,'입력 문자열이 있는 상태와 검색 요청·로딩을 구분합니다.',18,'#627189'),rect(36,115,528,465),rect(588,115,476,465)]
for i,(label,border,value,disabled) in enumerate([('기본','#dce3ed','검색어를 입력해 주세요.',False),('포커스','#1e554d','│',False),('입력 중','#1e554d','현장 자료',False),('비활성','#dce3ed','검색어를 입력해 주세요.',True)]):
    y=162+i*99
    p += [text(61,y,label,18,weight=700),rect(61,y+14,477,52,'#f1f2f4' if disabled else 'white',border,4),text(78,y+47,value,18,'#c5c8cd' if disabled else '#627189'),rect(492,y+22,37,36,'#c5c8cd' if disabled else '#1e554d','#c5c8cd' if disabled else '#1e554d',4),f'<circle cx="509" cy="{y+37}" r="8" fill="none" stroke="white" stroke-width="2"/><path d="M515 {y+43}l7 7" stroke="white" stroke-width="2"/>']
    if i==2:p += [text(460,y+47,'×',24,'#627189')]
p += [text(612,162,'검색 입력 배치 예시',21,weight=700),rect(612,193,428,325,'#e8ded1','#e8ded1',8),text(636,231,'자료 목록',23,weight=700),rect(631,252,390,244,'white','#dce3ed',7),rect(648,274,355,47,'white','#dce3ed',4),text(664,305,'검색어를 입력해 주세요.',17,'#627189')]
for i in range(3):p += [rect(649,343+i*42,354,26,'#f1f3f6','#f1f3f6',4)]
p += [text(612,551,'콘텐츠 상단에 검색 진입점 배치',17,'#627189'),text(36,626,'가이드 설명도 · 1011 23쪽의 상태 명칭·중복 예시 정리',17,'#627189')]
finish('search-guide.svg',p)

p=start('공통 입력 UI의 상태와 스타일')
p += [text(36,52,'공통 입력 UI의 상태와 스타일',28,weight=700),rect(36,96,485,478),rect(546,96,518,478),text(61,138,'기본 입력과 라벨 입력',22,weight=700)]
for i,(label,value,border,fill) in enumerate([('기본','내용을 입력해 주세요.','#dce3ed','white'),('포커스','│','#1e554d','white'),('입력 중','작성 내용','#1e554d','white'),('비활성','내용을 입력해 주세요.','#dce3ed','#f1f2f4')]):
    y=180+i*89
    p += [text(62,y,label,16,'#627189'),rect(62,y+13,430,44,fill,border,4),text(77,y+42,value,18,'#9aa3b0')]
p += [text(572,138,'테이블·목록 안의 스타일',22,weight=700),text(573,184,'읽기 전용',18,weight=700),rect(573,200,462,117,'#f9fafc'),text(590,239,'input / textarea',18,'#1e554d'),text(590,273,'값 확인 · 배경과 테두리 정리',18,'#627189'),text(573,365,'편집 상태',18,weight=700),rect(573,381,462,117,'#f9fafc'),rect(589,399,430,46,'white','#c7d1dd',4),text(607,430,'수정할 내용을 입력합니다.',18,'#627189'),text(590,480,'입력 영역을 테두리로 구분',18,'#627189'),text(36,626,'가이드 설명도 · 1011 22쪽 재구성 · 실제 크기 조정 전후 화면은 아님',17,'#627189')]
finish('input-guide.svg',p)

p=start('모바일 일지의 작성 맥락과 확인 상태')
p += [text(36,52,'작성 맥락 · 확인 상태 · 작성 진입',28,weight=700),rect(71,87,337,494,'white','#c9d0da',24),text(225,129,'TBM',23,weight=700),text(96,179,'작성일',19),rect(240,151,142,41,'#f5f6fa'),text(257,179,'날짜 선택',17,'#627189'),text(96,232,'금일 출역 인원',19),rect(283,204,99,41,'#f5f6fa'),text(300,232,'인원 확인',16,'#627189'),text(96,282,'결재자',19),rect(96,297,139,98,'#f5f6fa'),rect(246,297,139,98,'#f5f6fa'),text(116,328,'담당',16),text(268,328,'소장',16),rect(110,346,110,31,'#6b441e','#6b441e',4),text(129,368,'확인 완료',16,'white'),rect(260,346,110,31,'#ff972d','#ff972d',4),text(294,368,'확인',16,'white'),text(96,433,'근로자 확인 사항',18),rect(96,451,139,38,'#5367ff','#5367ff',4),text(146,477,'적합',17,'white'),rect(246,451,139,38),text(286,477,'부적합',17),rect(96,508,289,48,'#5367ff','#5367ff',4),text(190,539,'작성하기',18,'white')]
for i,(title,desc) in enumerate([('1 · 작성 맥락','작성일과 금일 출역 인원 확인'),('2 · 확인 상태','담당·소장의 확인 표시와 액션'),('3 · 작성 진입','근로자 확인 항목과 작성하기 버튼')]):
    y=125+i*145
    p += [rect(455,y,608,117),text(483,y+43,title,22,weight=700),text(483,y+82,desc,20,'#627189')]
p += [text(36,626,'모바일 UI 설명도 · 1011 13쪽 재구성 · 원본 날짜는 검토 문서에서 별도 확인',17,'#627189')]
finish('tbm-record.svg',p)

p=start('칸반 작업 생성 입력 항목')
p += [text(36,52,'작업 생성 · 개인 UX/UI와 AI 보조 구현',28,weight=700),rect(62,95,548,487,'#15191f','#15191f',14),text(86,136,'작업 추가',24,'white',700)]
for i,(label,value) in enumerate([('작업 제목','제목 입력'),('작업 설명','설명 입력'),('담당자 · 상태','담당자와 상태 선택'),('일정','시작일 · 종료일')]):
    y=172+i*91
    p += [text(88,y,label,16,'#c0c9d7'),rect(88,y+13,497,44,'#222831','#39404c',5),text(106,y+42,value,17,'#8795a9')]
p += [rect(460,541,125,27,'#e57518','#e57518',4),text(505,562,'저장',16,'white')]
for i,(title,desc) in enumerate([('이미지·제목 카드','이미지와 제목으로 작업을 구분'),('카드 이동','AI의 도움을 받아 인터랙션 구현'),('개인 프로토타입','실제 사용자 평가 미실시')]):
    y=106+i*154
    p += [rect(643,y,422,131),text(668,y+46,title,22,weight=700),text(668,y+90,desc,18,'#627189')]
p += [text(36,626,'작업 생성 항목 설명도 · 1011 25쪽 재구성 · 실제 앱 시연 캡처는 아님',17,'#627189')]
finish('task-create.svg',p)
print('Built 5 code-native explanatory diagrams; all labelled as reconstructions.')
