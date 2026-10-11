from pathlib import Path
import json, re, shutil, html

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
data = json.loads((OUT / 'web-before.json').read_text())
projects, studies = data['projects'], data['caseStudies']
order = ['platform', 'tbm', 'dashboard', 'designsystem', 'intranet', 'kanvan', 'responsive', 'psc', 'skyautonet', 'pet']

def update(key, **values):
    projects[key].update(values)

update('platform', stage='업무 프로젝트 · 배포 후 실사용', title='지도와 업무 자료를 연결한 통합 관리 플랫폼',
       lead='현장·본사·외부 사용자가 필요한 자료를 찾도록 공통 메뉴와 지도 중심 화면을 설계했습니다. 정보 구조·UI·퍼블리싱을 담당했으며, 배포 후 실제 사용자가 이용했습니다.',
       role='정보 구조 · UX/UI · 퍼블리싱 · 기획 참여', contribution='사용자 목적 정리 · 공통 메뉴 IA · 지도 탐색 UI · 퍼블리싱', team='개발자 · 기획자 · 엔지니어',
       outcomeBasis='설계·퍼블리싱한 플랫폼이 배포되어 실제 사용자가 이용했습니다. 산출물은 프로젝트 시연과 내부 소통에도 활용했습니다. 탐색 시간과 클릭 수의 개선 수치는 제시하지 않습니다.')
update('tbm', stage='업무 프로젝트 · 배포 후 실사용', title='현장 안전 기록(TBM)의 웹·모바일 전환', type='B2B WORKFLOW · WEB / MOBILE', period='2025.11 — 2026.04',
       lead='작업 전 안전 점검을 기록하는 TBM 일지를 디지털 입력 화면으로 설계했습니다. 웹은 기록 보관과 판독 문제에 대응하고, 모바일은 현장 작성을 지원하도록 구성했습니다.',
       role='모바일 기획·디자인 · 웹 UI', contribution='모바일 일지·서명 화면 기획·디자인 · 웹 UI 참여', team='개발자',
       summary='종이 일지를 웹·모바일 입력으로 전환 · 배포 후 실사용',
       problem='종이 일지의 보관과 판독 문제를 설계 과제로 삼았습니다.',
       detail='종이 일지는 보관 중 분실·변색될 수 있고 손글씨를 읽기 어려울 수 있었습니다. 웹에는 기록을 입력하고 보관하는 구조, 모바일에는 현장에서 작성하는 화면을 설계했습니다.',
       outcomes=[['일지 화면', '작성일·출역 인원·확인 항목'], ['서명 저장', '입력·변경과 완료 확인'], ['배포 후 실사용', '개발자를 통한 의견 전달']],
       outcomeBasis='모바일 기획·디자인과 웹 UI에 참여한 서비스가 배포되어 실제 사용자가 이용했습니다. 사용자 의견은 개발자를 통해 전달받았습니다. 사용자 평가 수치와 업무 시간 감소는 제시하지 않습니다.')
update('dashboard', stage='업무 프로젝트 · 웹 설계안 최종 미사용', title='조회 목적에 맞춘 비용·인원 ERP 대시보드', period='2025.11 — 2026.04',
       summary='전사·프로젝트·개인 조회 범위와 대시보드 설계',
       lead='전사·프로젝트·개인 범위에 따라 주요 수치와 상세 내역을 확인하는 UI를 설계하고 퍼블리싱했습니다. 제공 형식이 PDF로 변경되어 최종 웹 설계안은 사용되지 않았습니다.',
       role='조회 범위 · UX/UI · HTML·CSS·SCSS 퍼블리싱', contribution='조회 범위와 정보 위계 · 상태 표현 · 웹 퍼블리싱',
       problem='행 단위 업무 자료를 요약과 상세 정보로 나눴습니다.',
       detail='기존 자료의 비용·인원 항목을 대시보드의 주요 수치와 프로젝트·인원별 상세 영역에 배치했습니다. 조회 조건을 정한 뒤 요약과 상세를 확인하는 순서로 구성했습니다.',
       outcomes=[['조회 범위', '전사·프로젝트·개인'], ['정보 위계', '주요 수치와 상세 내역'], ['구현 기준', '활성 메뉴·합계·초과 상태']],
       outcomeBasis='조회 범위·대시보드 UI·웹 퍼블리싱을 수행했습니다. 제공 형식이 PDF로 바뀌어 웹 설계안은 최종 미사용입니다. 9시간 / 기준 8시간은 상태 표시 예시이며 효과 측정값이 아닙니다.')
update('designsystem', stage='업무 프로젝트 · 디자이너의 디자인·프론트 작업에 재사용', title='컬러 토큰과 공통 UI 기준·웹 가이드', type='COMMON UI · SCSS TOKENS · WEB GUIDE',
       lead='컬러를 토큰과 SCSS로 관리해 프로젝트마다 사용했습니다. 입력·라디오·체크박스 등 일부 UI 요소는 화면에 맞춰 크기를 조정해 사용하고, 웹 가이드로 정리했습니다.',
       summary='컬러 토큰·SCSS와 일부 UI 요소를 디자인·퍼블리싱에 재사용',
       role='공통 UI 기준 · 가이드 설계 · SCSS 컬러 토큰 관리', contribution='컬러 변수 정의 · 입력·검색 상태 가이드 · 일부 UI 요소 재사용',
       problem='반복 사용하는 컬러와 입력 UI의 기준을 정리했습니다.',
       detail='공통 컬러 값을 SCSS 변수로 정의하고 웹 가이드에 같은 색상 기준을 정리했습니다. 입력·검색 UI의 상태와 배치 예시를 정리해 디자이너의 디자인·프론트 작업에서 참고하고 재사용했습니다.',
       outcomes=[['컬러 토큰', 'SCSS 변수와 색상 가이드'], ['입력 UI', '읽기 전용·편집 스타일'], ['검색 입력', '기본·포커스·입력 중·비활성']],
       outcomeBasis='실제 재사용 범위는 디자이너의 디자인·프론트 작업에서 사용한 컬러와 일부 UI 요소입니다. 화면 자료는 변수 정의와 웹 가이드이며, 조직 전체 채택이나 컴포넌트 운영 체계를 입증하는 자료는 아닙니다.')
update('intranet', stage='팀 프로젝트 · 미배포 · 팀 내부 설계·구현 확인', title='회의실 예약·근태 신청 모바일 인트라넷', type='TEAM PROJECT · MOBILE WORKFLOW',
       summary='회의실 현황에서 예약으로, 문서 상태에서 근태 신청으로',
       lead='디자이너 팀에서 모바일 인트라넷의 기획·UI·퍼블리싱에 참여했습니다. 회의실 현황에서 예약으로, 전자결재 현황에서 근태 신청으로 이어지는 화면을 구성했습니다.',
       role='팀 내 기획 · UI · 퍼블리싱 참여', contribution='회의실 예약·근태 신청 모바일 화면의 기획·UI·퍼블리싱 참여', team='디자이너 팀',
       problem='회의실 현황과 문서 상태에서 필요한 신청으로 이어지도록 구성했습니다.',
       detail='회의실에서는 공간 현황을 확인한 뒤 예약일·시간·목적을 입력합니다. 전자결재에서는 문서 상태를 확인한 뒤 근태 종류·일자·사유를 입력하도록 설계했습니다.',
       outcomes=[['회의실 예약', '현황 확인 → 예약 입력'], ['근태 신청', '문서 상태 → 신청 입력'], ['팀 내부 확인', '기획·UI·퍼블리싱 참여']],
       outcomeBasis='미배포 프로젝트로, 디자이너 팀 내부에서 설계·구현을 확인했습니다. 본인은 기획·UI·퍼블리싱에 참여했으며, 실제 직원 이용이나 예약 완료율의 성과는 제시하지 않습니다.')
update('kanvan', title='카드 이동·작업 생성 개인 칸반 프로토타입', type='PERSONAL PROJECT · AI-ASSISTED PROTOTYPE',
       summary='이미지·제목으로 작업을 구분하고 카드 이동·작업 생성을 구현',
       lead='이미지와 제목으로 작업을 구분하는 보드 UI를 설계했습니다. AI의 도움을 받아 카드 이동과 작업 입력을 구현했으며, 실제 사용자 평가는 진행하지 않았습니다.',
       role='개인 UX/UI 설계 · AI 보조 구현', contribution='보드 UI · 카드 이동 · 작업 생성 프로토타입',
       problem='이미지와 제목을 함께 보여주는 작업 보드 UI를 설계했습니다.',
       detail='이미지·제목·담당자 정보를 카드에 배치하고 카드 이동과 작업 생성 입력을 구현했습니다. 현재 컬럼은 작업 분야와 상태가 함께 포함된 구성으로, 검증된 업무 단계 체계로 소개하지 않습니다.',
       outcomes=[['이미지 카드', '이미지·제목으로 작업 구분'], ['카드 이동', 'AI 보조 인터랙션 구현'], ['작업 생성', '제목·설명·담당자·상태·일정']],
       outcomeBasis='개인 UX/UI 설계와 AI 보조 구현 결과입니다. 시연 화면이며 실제 사용자 평가는 진행하지 않았습니다. 카드 이동과 작업 생성의 구현 경험을 소개합니다.')

def study(key, insight, headline, context, pains, strategies, ui_title, ui_text, final, visuals, learned, next_text, **extra):
    studies[key] = dict(insight=insight, strategyHeadline=headline, context=context, pains=pains, strategies=strategies,
                        ui=studies[key]['ui'], uiTitle=ui_title, uiText=ui_text, finalVisual=final, visuals=visuals,
                        reflection=dict(learned=learned, next=next_text), **extra)

assets = ROOT / 'assets/cases/1011'
assets.mkdir(exist_ok=True)
for n in [7,8,14,21]:
    shutil.copy2(Path('/Users/ihan-ul/Downloads/1011') / f'{n:02}.png', assets / f'page-{n:02}.png')

# Native SVG diagrams explain the source material; they are explicitly labelled as reconstructions.
def diagram(name, title, cards, foot):
    width, height = 1000, 530
    parts=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img"><title>{html.escape(title)}</title><rect width="1000" height="530" rx="18" fill="#f5f7fa"/><g font-family="Arial, sans-serif" fill="#202c3d"><text x="42" y="62" font-size="28" font-weight="700">{html.escape(title)}</text>']
    for i,(heading,lines) in enumerate(cards):
        x=42+i*310
        parts.append(f'<rect x="{x}" y="104" width="292" height="325" rx="14" fill="white" stroke="#d9e1eb"/><text x="{x+20}" y="148" font-size="21" font-weight="700">{html.escape(heading)}</text>')
        for j,line in enumerate(lines):
            parts.append(f'<text x="{x+20}" y="{199+j*45}" font-size="17">{html.escape(line)}</text>')
    parts.append(f'<text x="42" y="480" font-size="16" fill="#59687b">{html.escape(foot)}</text></g></svg>')
    (assets/name).write_text(''.join(parts))
    return 'assets/cases/1011/'+name

erp = diagram('erp-structure.svg','조회 조건 → 주요 수치·현황 요약 → 상세',[
    ('조회 목적',['전사 · 여러 프로젝트 현황','프로젝트 · 선택한 상세','개인 · 본인 관련 업무']),
    ('요약과 상세',['기간·조회 범위 선택','프로젝트·비용·인원 요약','프로젝트·인원별 상세']),
    ('구현 기준',['활성 메뉴와 합계 구분','투입 9시간 / 기준 8시간','초과 1시간 표시 예시'])], '1011 16–19쪽의 정보 구조 재구성 · 최종 웹 설계안 미사용')
inputs = diagram('input-guide.svg','공통 입력 UI의 상태와 스타일',[
    ('입력 가이드',['기본 입력','라벨·설명문이 있는 입력','상태별 모양 정리']),
    ('읽기 전용',['input / textarea','테이블·목록 안의 스타일','값 확인을 위한 표시']),
    ('편집 상태',['input / textarea','입력 영역의 테두리 구분','일부 요소 크기 조정 사용'])], '1011 22쪽의 코드·가이드 내용 재구성 · 실제 적용 전후 비교 화면은 아님')
search = diagram('search-guide.svg','검색 입력의 상태와 배치 예시',[
    ('상태 이름',['기본 (default)','포커스 (focus)','입력 중 (typing)','비활성 (disabled)']),
    ('입력 중',['입력 문자열 표시','지우기 버튼 표시','검색 요청·로딩과 구분']),
    ('배치 예시',['화면 안에 검색 입력 배치','라벨·내용 영역과 구분','금지 예시의 동일 설명 제거'])], '1011 23쪽 가이드의 수정 방향 재구성 · 실제 서비스 수정 결과는 아님')
booking = diagram('mobile-flow.svg','회의실 예약과 근태 신청의 모바일 흐름',[
    ('회의실 예약',['공간 현황 확인','예약일·시간 입력','목적·사유 입력']),
    ('근태 신청',['문서 상태 확인','근태 종류·일자 선택','사유·결재선 입력']),
    ('담당과 상태',['디자이너 팀에서 참여','기획 · UI · 퍼블리싱','미배포 · 팀 내부 확인'])], '1011 24쪽의 흐름 재구성 · 본인 참여 범위와 팀 결과를 함께 표기')
kanban = diagram('task-create.svg','작업 생성 항목과 개인 구현 범위',[
    ('기본 정보',['작업 제목','작업 설명','첨부 파일']),
    ('배정과 일정',['담당자 · 상태','카테고리','시작일 · 종료일']),
    ('구현 범위',['개인 UX/UI 설계','AI 보조 카드 이동·생성','실제 사용자 평가 미실시'])], '1011 25쪽 작업 생성 항목 재구성 · 실제 앱의 시연 데이터 교체는 별도 작업')

study('platform', '흩어진 현장 자료를 업무 목적에 따라 정리했습니다.', '현장 설명과 사업 관리의 공통 메뉴를 구성했습니다.',
      [['사용자','현장 관리자 · 본사 담당자 · 외부 이해관계자'],['기간','2023.01 — 2023.12'],['상태','배포 후 실사용 · 전시 활용']],
      [['기존 업무','공정·자원·보상·현장 자료를 파일과 프로그램에서 각각 찾아 확인했습니다.'],['현장·본사','현장 위치와 공정, 자원·보상 관리 현황을 서로 다른 목적으로 확인했습니다.'],['외부 사용자','프로젝트 현황과 시각화 자료를 확인했습니다.']],
      [['01','공통 메뉴','현장 설명 / 사업 관리의 공통 메뉴와 관련 기능의 진입점을 정리했습니다.'],['02','지도에서 자료로','위치를 확인한 뒤 업무 메뉴를 선택하고 시뮬레이션 자료 유형을 확인하도록 구성했습니다.'],['03','메뉴 대안 선택','흰색·검정·반투명 검정을 비교해 메뉴 구분과 지도 배경의 연속성을 함께 고려했습니다.']],
      '지도 → 업무 메뉴 → 자료 유형 선택','지도와 하단 메뉴, 시뮬레이션 유형 선택의 대응을 실제 화면에 표시했습니다.',
      ['assets/cases/platform-9.png','지도와 업무 메뉴가 연결된 실제 설계 화면','지도와 공통 메뉴, 시뮬레이션 유형 선택 화면','landscape'],
      [['assets/cases/1011/page-07.png','지도·메뉴·자료 유형의 대응','1011 7쪽 · 실제 설계 화면과 설명 번호의 대응','landscape'],['assets/cases/1011/page-08.png','흰색·검정·반투명 검정 비교','메뉴 구성과 선택 상태도 다른 당시 대안입니다. 통제 실험 결과가 아닙니다.','landscape']],
      '메뉴를 구분하면서 지도 배경이 이어 보이도록 반투명 검정안을 선택했습니다. 정보 범위와 UI 기준은 개발자·기획자·엔지니어와 조율했습니다.',
      '역할별 탐색 과업을 정하고 같은 조건에서 자료 찾기 경로와 완료 시간을 확인하고 싶습니다.',
      impact=dict(type='depth',label='배포 결과와 협업',title='설계·퍼블리싱한 플랫폼이 실제 사용으로 이어졌습니다.',before='파일·프로그램별 자료 확인',after='공통 메뉴·지도에서 관련 자료 탐색',note=projects['platform']['outcomeBasis']))
study('tbm', projects['tbm']['problem'], '일지의 작성 맥락과 확인 상태, 서명 저장 결과를 구분했습니다.',
      [['업무','작업 전 안전 점검 기록(TBM)'],['환경','웹 기록 입력·보관 · 모바일 현장 작성'],['상태','배포 후 실제 사용자 이용']],
      [['보관 문제','종이 일지의 분실·변색 위험에 대응하는 디지털 기록이 필요했습니다.'],['판독 문제','손글씨 대신 내용을 입력하는 항목을 구성했습니다.'],['현장 작성','모바일에서 일지를 작성하는 화면을 설계했습니다.']],
      [['01','작성 맥락','작성일과 금일 출역 인원을 일지 상단에서 확인하도록 배치했습니다.'],['02','확인 상태와 작성 진입','담당·소장 확인 상태와 근로자 확인 항목, 작성하기 버튼을 구분했습니다.'],['03','서명 저장 결과','마이페이지에서 서명을 입력·변경하고 저장 후 완료 메시지를 표시했습니다.']],
      '모바일 일지와 마이페이지 서명 저장','일지 화면의 작성일·확인 상태·작성 진입과 서명 입력·저장 완료 두 상태를 보여드립니다.',
      ['assets/cases/tbm-7.png','현장 안전 기록 모바일 홈','현장 안전 기록 서비스의 모바일 홈 화면','portrait'],
      [['assets/cases/1011/tbm-record.svg','작성일·출역 인원·확인 항목','1011 13쪽의 입력 항목과 확인 상태를 재구성한 모바일 UI 설명도','landscape'],['assets/cases/1011/page-14.png','마이페이지 서명 입력과 저장 완료','1011 14쪽 · 서명 저장의 두 상태이며 일지 전체 저장 완료 화면은 아닙니다.','landscape']],
      '일지의 작성 맥락과 확인 상태를 구분하고, 서명 저장 뒤 처리 결과를 보여주는 화면을 설계했습니다. 사용자 의견은 개발자를 통해 전달받았습니다.',
      '서명 미입력·저장 실패와 현장 작성 중단을 실제 과업에서 확인하고 싶습니다.',
      impact=dict(type='workflow',label='배포 결과',title='담당한 TBM 화면이 배포되어 실제 사용자가 이용했습니다.',before='종이 일지',after='웹·모바일 기록 입력',note=projects['tbm']['outcomeBasis']))
study('dashboard', projects['dashboard']['problem'], '전사·프로젝트·개인으로 조회 목적을 나눴습니다.',
      [['환경','데스크톱 비용·인원 업무 화면'],['조회 목적','전사 · 프로젝트 · 개인'],['상태','PDF 제공으로 변경 · 웹 설계안 최종 미사용']],
      [['행 단위 자료','날짜·인원·팀·프로젝트·투입 시간·비용 등이 행 단위로 기록돼 있었습니다.'],['조회 목적','여러 프로젝트 현황과 선택한 프로젝트 상세, 본인 관련 업무를 구분했습니다.'],['정보 위계','주요 수치와 프로젝트·인원별 상세를 확인하는 순서를 정리했습니다.']],
      [['01','조회 범위','전사·프로젝트·개인이라는 조회 목적을 구분했습니다. 역할별 접근 권한 정책으로 확대하지 않습니다.'],['02','조회 순서','조건 설정 → 주요 수치·현황 요약 → 프로젝트·인원별 상세 순서로 구성했습니다.'],['03','구현 기준 공유','활성 메뉴·비용 합계·초과 상태의 색상과 수치 강조, 요소 간격을 개발자와 공유하고 퍼블리싱했습니다.']],
      '조회 조건에서 요약과 상세로 이어지는 구조','아래는 조회 범위·요약·상세·상태 표현을 재구성한 정보 구조 설명도입니다.',
      [erp,'비용·인원 ERP 조회 구조 설명도','1011의 정보 구조 재구성 · 최종 웹 설계안 미사용','landscape'],[],
      '조회 범위와 합계·초과 상태를 구분해 UI 기준을 정리하고 HTML·CSS·SCSS로 퍼블리싱했습니다. 제공 형식이 PDF로 변경된 결과도 함께 설명합니다.',
      '동일한 데이터로 각 조회 목적에 필요한 정보가 빠짐없이 연결되는지 확인하고 싶습니다.',
      impact=dict(type='risk',label='설계·퍼블리싱 결과',title='웹 UI를 설계·퍼블리싱했고, 최종 제공 형식은 PDF로 바뀌었습니다.',before='행 단위 업무 기록',after='요약·상세를 구분한 웹 설계안',note=projects['dashboard']['outcomeBasis']))
study('designsystem', projects['designsystem']['problem'], '컬러 정의와 입력·검색 상태를 웹 가이드로 정리했습니다.',
      [['실제 사용','디자이너의 디자인·프론트 작업'],['재사용 범위','컬러와 일부 UI 요소'],['담당','공통 UI 기준 · 웹 가이드 · SCSS 컬러 토큰']],
      [['컬러 기준','프로젝트에서 반복 사용할 공통 컬러 기준을 정리했습니다.'],['입력 스타일','테이블·목록의 입력·텍스트 영역에 읽기 전용·편집 스타일을 정의했습니다.'],['상태 설명','검색 입력의 상태 이름과 배치 예시를 실제 화면에 맞춰 정리했습니다.']],
      [['01','SCSS 컬러 변수','공통 컬러 값을 변수로 정의하고 Primary·Secondary 색상 단계를 웹 가이드에 정리했습니다.'],['02','입력 UI','기본 입력과 라벨·설명문이 있는 입력, 읽기 전용·편집 상태의 스타일을 정리했습니다.'],['03','검색 상태','기본·포커스·입력 중·비활성을 구분합니다. 입력 중 화면을 검색 요청 중이나 로딩으로 설명하지 않습니다.']],
      '컬러 토큰과 입력·검색 UI의 기준','컬러 변수 정의와 웹 가이드를 보여드립니다. 입력·검색 내용은 원자료의 중복 코드와 상태 설명을 정리한 설명도로 제시합니다.',
      ['assets/cases/designsystem-guide-source.png','공통 UI 기준 웹 가이드','공통 컬러·입력 UI 기준을 정리한 웹 가이드','landscape'],
      [['assets/cases/1011/page-21.png','SCSS 컬러 변수와 색상 가이드','1011 21쪽 · 변수 정의와 Primary·Secondary 가이드. 프로젝트 참조 코드의 증거는 아닙니다.','landscape'],[inputs,'입력 UI의 상태·스타일 설명도','1011 22쪽 코드와 가이드 내용을 재구성했습니다.','landscape'],[search,'검색 입력 상태·배치 설명도','입력 중·비활성 명칭을 바로잡고, 동일한 설명의 Do/Don’t 구분을 제거했습니다.','landscape']],
      '컬러 기준을 SCSS와 웹 가이드에 연결하고 일부 UI 요소를 화면에 맞춰 조정해 사용했습니다. 실제 사용 범위를 디자이너의 디자인·프론트 작업으로 구분합니다.',
      '프로젝트의 토큰 참조 코드와 기본·변형 UI를 함께 모아 실제 적용 범위를 더 구체적으로 보여주고 싶습니다.')
study('intranet', projects['intranet']['problem'], '현황 확인에서 신청 입력으로 이어지는 두 흐름을 설계했습니다.',
      [['협업','디자이너 팀'],['담당','기획·UI·퍼블리싱 참여'],['상태','미배포 · 팀 내부 설계·구현 확인']],
      [['회의실 현황','공간 현황에서 예약할 회의실을 확인하는 화면이 필요했습니다.'],['예약 입력','예약일·시간·목적을 모바일에서 입력하도록 구성했습니다.'],['근태 신청','문서 상태 확인에서 근태 종류·일자·사유 입력으로 이어지도록 정리했습니다.']],
      [['01','회의실 예약','공간 현황 확인 → 예약일·시간·목적 입력의 흐름입니다.'],['02','근태 신청','문서 상태 확인 → 근태 종류·일자·사유 입력의 흐름입니다.'],['03','팀 참여','디자이너 팀에서 기획·UI·퍼블리싱에 참여하고 팀 내부에서 설계·구현을 확인했습니다.']],
      '회의실 예약과 근태 신청의 모바일 설계','모바일 홈의 실제 설계 화면과 두 신청 흐름의 설명도를 제공합니다.',
      ['assets/cases/intranet-7.png','모바일 인트라넷 홈 설계 화면','디자이너 팀 내부 설계 · 미배포','portrait'],[[booking,'회의실 예약·근태 신청 흐름','1011 24쪽의 흐름 재구성 · 승인·반려 전체 절차를 검증한 결과는 아닙니다.','landscape']],
      '현황 확인에서 신청 입력으로 이어지는 흐름을 작은 화면에 구성했습니다. 팀 작업의 결과와 본인의 참여 범위, 미배포 상태를 구분해 소개합니다.',
      '실제 사용 과업에서 예약 충돌과 입력 오류, 신청 완료까지의 흐름을 확인하고 싶습니다.')
study('kanvan', projects['kanvan']['problem'], '이미지 카드와 카드 이동, 작업 생성 입력을 구현했습니다.',
      [['유형','개인 UX/UI 설계 · AI 보조 구현'],['화면','데스크톱 보드 · 작업 생성'],['평가','시연 화면 · 실제 사용자 평가 미실시']],
      [['작업 구분','여러 작업의 이미지와 제목을 카드에서 함께 확인하도록 구성했습니다.'],['직접 조작','카드를 이동하는 인터랙션을 프로토타입으로 구현했습니다.'],['작업 생성','제목·설명·담당자·상태·일정을 입력하는 화면을 구현했습니다.']],
      [['01','이미지와 제목','카드에 작업을 구분할 이미지·제목과 관련 정보를 배치했습니다.'],['02','카드 이동','AI의 도움을 받아 카드 이동 인터랙션을 구현했습니다.'],['03','작업 생성','작업 제목·설명·첨부·담당자·상태·일정을 입력하도록 구성했습니다.']],
      '이미지 카드와 작업 생성 프로토타입','보드 시연 화면과 작업 생성 항목을 보여드립니다. 현재 컬럼 구성이 검증된 단계 체계라는 주장은 하지 않습니다.',
      ['assets/cases/kanban-board-source.png','개인 칸반 보드 시연 화면','이미지·제목으로 작업을 구분하는 개인 프로토타입','landscape'],[[kanban,'작업 생성 항목 설명도','1011 25쪽의 입력 항목 재구성 · 작업 상세 편집 화면으로 소개하지 않습니다.','landscape']],
      '이미지와 제목으로 작업을 구분하는 UI를 설계하고 AI의 도움을 받아 카드 이동과 작업 생성을 구현했습니다. 실제 사용자 평가는 진행하지 않았습니다.',
      '시연 데이터를 정리한 실제 앱에서 카드 이동과 작업 생성 과업을 확인하고 사용자 평가를 진행하고 싶습니다.')

notes = {
 'platform': [['판단 기준','메뉴 구분과 지도 배경의 연속성을 함께 고려했습니다.'],['선택과 협업','흰색·검정·반투명 검정 대안을 비교하고 정보 범위와 UI 기준을 관련 직군과 조율했습니다.'],['실제 활용','배포 후 실제 사용자 이용 · 프로젝트 시연과 내부 소통 활용']],
 'dashboard': [['조회 목적','전사·프로젝트·개인 범위의 정보 조회를 구분했습니다.'],['구현 기준','활성 메뉴·합계·초과 상태의 색상과 강조, 간격을 개발자와 공유했습니다.'],['최종 상태','PDF 제공으로 바뀌어 웹 설계안은 최종 사용되지 않았습니다.']],
 'intranet': [['팀 참여','디자이너 팀에서 기획·UI·퍼블리싱에 참여했습니다.'],['설계 흐름','회의실 현황 → 예약 입력 / 문서 상태 → 근태 신청 입력'],['확인 범위','미배포 · 팀 내부 설계·구현 확인']]
}
for i,key in enumerate(order,1):
    projects[key]['no']=f'{i:02}'
    nxt=order[i % len(order)]
    projects[key]['next']=[nxt,projects[nxt]['title']]

src=(ROOT/'case.js').read_text()
render=src[src.index('const icon ='):]
start=render.index('const decisionNotes =')
end=render.index('const renderDecisionNotes',start)
render=render[:start]+'const decisionNotes = '+json.dumps(notes,ensure_ascii=False,indent=2)+';\n\n'+render[end:]
render=render.replace('최종 경험','설계 화면과 흐름').replace('실제 화면 보기','설계 화면 보기')
(ROOT/'case.js').write_text('const projects = '+json.dumps(projects,ensure_ascii=False,indent=2)+';\n\nconst caseStudies = '+json.dumps(studies,ensure_ascii=False,indent=2)+';\n\nconst projectOrder = '+json.dumps(order)+';\n\n'+render)

main=(ROOT/'index.html').read_text()
main=main.replace('ERP, B2B 플랫폼, 모바일 업무 흐름을 설계하는 프로덕트 디자이너 이한울. 정보 구조부터 UI, 작동하는 프로토타입까지 연결합니다.','B2B 업무 서비스의 정보 구조·UX/UI·퍼블리싱을 연결하는 디자이너 이한울. 배포된 통합 플랫폼과 TBM, ERP 설계, 공통 UI 재사용 경험을 소개합니다.')
main=main.replace('복잡한 B2B 업무를 탐색·판단·실행의 흐름으로 단순화합니다. ERP, 통합 플랫폼, 모바일 업무 UX 사례를 확인하세요.','배포된 통합 플랫폼과 현장 안전 기록(TBM), 비용·인원 ERP 설계, 공통 UI 기준과 웹 가이드 사례를 소개합니다.')
main=re.sub(r'<h1 id="intro-title">.*?</h1>','<h1 id="intro-title">복잡한 업무 정보를,<br><em>찾고 쓰기 쉬운 화면으로.</em></h1>',main,flags=re.S)
main=re.sub(r'<div class="intro-bottom">.*?</div>','<div class="intro-bottom"><p>B2B 업무 서비스의 정보 구조와 UX/UI를 설계하고,<br>HTML·CSS·SCSS 퍼블리싱까지 연결하는 디자이너 이한울입니다.</p><a class="intro-link" href="#work">대표 프로젝트 4개 <span aria-hidden="true">↓</span></a></div>',main,flags=re.S)
heading='<div class="work-heading"><div><p class="label">SELECTED WORK / 01—04</p><h2 id="work-title">업무 구조에서 화면과 구현까지.</h2></div><p>배포된 플랫폼과 현장 기록,<br>ERP 설계와 공통 UI 재사용 경험입니다.</p></div>'
start=main.index('        <div class="work-heading">')
end=main.index('      <section class="capabilities"',start)
specs=[('platform','platform-visual','지도와 업무 자료를 연결한<br>통합 관리 플랫폼.','파일·프로그램에 나뉜 현장 자료','업무 단위 공통 메뉴와 지도 기반 탐색','assets/cases/platform-9.png',1289,659),
       ('tbm','mobile-visual','종이 안전 일지를,<br>웹·모바일 기록으로.','종이 일지의 보관·판독 문제와 현장 작성','일지 확인 항목과 서명 저장 상태 구분','assets/cases/tbm-7.png',374,773),
       ('dashboard','dashboard-visual','조회 목적에 맞춘<br>비용·인원 대시보드.','행 단위 비용·인원 기록','전사·프로젝트·개인 조회와 요약·상세 구분',erp,1000,530),
       ('designsystem','platform-visual','컬러 토큰과 공통 UI를<br>디자인·퍼블리싱에 재사용.','반복 사용하는 컬러와 입력 UI 기준','SCSS 컬러 변수와 입력·검색 상태 가이드','assets/cases/designsystem-guide-source.png',504,337)]
cards=[]
for i,(key,cls,title,problem,decision,img,w,h) in enumerate(specs):
    p=projects[key]
    loading='fetchpriority="high"' if i==0 else 'loading="lazy" decoding="async"'
    cards.append(f'''<article class="work-case {'featured-case' if i==0 else ''}"><a class="work-visual {cls}" href="project-{key}.html" aria-label="{p['title']} 사례 보기"><div class="visual-label"><span>{p['no']} / {p['type']}</span><span>UX/UI</span></div><img src="{img}" width="{w}" height="{h}" {loading} alt="{html.escape(studies[key]['finalVisual'][1])}"><span class="visual-link" aria-hidden="true">사례 보기 ↗</span></a><div class="work-story"><p class="work-meta">{p['period']} · {p['stage']}</p><h3><a href="project-{key}.html">{title}</a></h3><p class="work-description">{p['title']}</p><dl class="work-decisions"><div><dt>문제</dt><dd>{problem}</dd></div><div><dt>결정</dt><dd>{decision}</dd></div><div><dt>담당</dt><dd>{p['contribution']}</dd></div></dl><a class="case-text-link" href="project-{key}.html">설계 과정과 화면 보기 <span aria-hidden="true">↗</span></a></div></article>''')
main=main[:start]+heading+'<div class="featured-projects">'+''.join(cards)+'</div></section>\n'+main[end:]
start=main.index('      <section class="capabilities"')
end=main.index('      <section class="more-work"',start)
main=main[:start]+'''<section class="capabilities" aria-labelledby="capability-title"><div class="work-heading"><div><p class="label">HOW I CONTRIBUTE</p><h2 id="capability-title">정보 구조와 현장 업무를 구현까지 연결합니다.</h2></div></div><div class="capability-grid"><a href="project-platform.html#decision"><span>01 / STRUCTURE</span><h3>흩어진 자료를<br>공통 탐색으로 연결합니다.</h3><p>통합 플랫폼의 업무별 공통 메뉴와 지도 중심 탐색 UI를 설계했습니다.</p><b>배포된 플랫폼의 정보 구조 ↗</b></a><a href="project-tbm.html#solution"><span>02 / WORKFLOW</span><h3>현장의 기록을<br>모바일 화면으로 설계합니다.</h3><p>TBM 일지의 확인 항목과 서명 입력·저장 완료 상태를 구분했습니다.</p><b>배포된 TBM 기록 UI ↗</b></a><a href="project-designsystem.html#solution"><span>03 / DELIVERY</span><h3>공통 기준을<br>퍼블리싱에 재사용합니다.</h3><p>컬러 토큰·SCSS와 일부 UI 요소를 디자인·프론트 작업에 재사용했습니다.</p><b>공통 UI 기준과 웹 가이드 ↗</b></a></div></section>\n'''+main[end:]
start=main.index('        <ul class="more-project-list">')
end=main.index('        </ul>',start)+len('        </ul>')
thumbs={'intranet':('assets/cases/intranet-7.png',374,773),'kanvan':('assets/cases/kanban-board-source.png',796,680),'responsive':('assets/pp/tescom/38.jpg',1920,1080),'psc':('assets/cases/psc-measurement-source.png',1380,820),'skyautonet':('assets/pp/skyautonet/skyautonet06.jpg',1920,1080),'pet':('assets/cases/pet-9.png',374,773)}
items=[]
for key in order[4:]:
    p=projects[key]; img,w,h=thumbs[key]
    items.append(f'<li><a class="more-project" href="project-{key}.html"><div class="more-project-thumb"><img src="{img}" width="{w}" height="{h}" alt="" loading="lazy" decoding="async"></div><div class="more-project-copy"><p class="more-project-category">{p["no"]} · {p["type"]}</p><h3>{p["title"]}</h3><p class="more-project-scope">{p["stage"]} · {p["contribution"]}</p></div><span class="more-project-arrow" aria-hidden="true">↗</span></a></li>')
main=main[:start]+'<ul class="more-project-list">'+''.join(items)+'</ul>'+main[end:]
main=main.replace('MORE WORK / 04—10','MORE WORK / 05—10').replace('7개</span>','6개</span>').replace('현장 UX부터 디자인 시스템까지,<br>각각의 문제와 설계 과정을 담은 프로젝트입니다.','팀 내부 모바일 설계와 개인 프로토타입,<br>그 밖의 웹·앱 설계 경험입니다.')
main=main.replace('경영진이 보는 숫자, 현장 관리자가 찾는 정보, 이동 중인 직원이 끝내야 하는 업무. 같은 제품에서도 역할과 상황에 따라 달라지는 사용자의 목적을 화면에 반영합니다.','현장·본사·외부 사용자의 자료 확인 목적을 정리하고, 필요한 정보와 다음 행동이 연결되도록 화면을 설계합니다.')
main=main.replace('<strong>Product Design</strong><span>ERP · 통합 플랫폼 · 모바일 업무 UX/UI</span>','<strong>삼안 기술개발센터 · Product Designer / UX·UI</strong><span>B2B 플랫폼·ERP·모바일 업무 서비스 · 공통 UI 기준 · 퍼블리싱</span>')
main=main.replace('<strong>Web Design</strong>','<strong>핸섬피쉬 · Web Designer</strong>').replace('IA / User Flow · UI Design · Design System · HTML / CSS / SCSS','정보 구조 / 화면 흐름 · UI Design · Figma · HTML / CSS / SCSS · JavaScript · Photoshop · Git')
main=main.replace('복잡한 업무를 함께 풀어갈<br>팀을 만나고 싶습니다.','업무 구조와 UI를<br>함께 설계할 팀을 찾고 있습니다.').replace('<span>경기도 구리 · 대한민국</span>','<a href="tel:+821092718997">010 9271 8997</a>')
(ROOT/'index.html').write_text(main)

for key,p in projects.items():
    file=ROOT/f'project-{key}.html'
    content=file.read_text()
    content=re.sub(r'<title>.*?</title>',f'<title>{html.escape(p["title"])} | 이한울 · Product Designer</title>',content)
    content=re.sub(r'(<h1 class="case-title">).*?(</h1>)',lambda m:m[1]+html.escape(p['title'])+m[2],content)
    content=re.sub(r'(<p class="case-result"><span>).*?(</span></p>)',lambda m:m[1]+html.escape(p['summary'])+m[2],content)
    content=re.sub(r'(<meta (?:name="description"|property="og:description") content=")[^"]*',lambda m:m[1]+html.escape(p['summary'],quote=True),content)
    content=re.sub(r'(<meta property="og:title" content=")[^"]*',lambda m:m[1]+html.escape(p['title']+' | 이한울 · Product Designer',quote=True),content)
    content=content.replace('case.js?v=20261005-section-gap','case.js?v=20261011-pdf-sync')
    file.write_text(content)
(OUT/'web-after.json').write_text(json.dumps(dict(projects=projects,caseStudies=studies,projectOrder=order),ensure_ascii=False,indent=2))
print('Synced homepage, 10 project shells and 6 case studies with 1011 source; original PDF untouched.')
import runpy
runpy.run_path(str(OUT/'build_explanatory_svgs.py'))
