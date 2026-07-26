const projects = {
  intranet: {
    no:'04', type:'B2B SAAS · MOBILE WORKFLOW', title:'모바일 업무 포털 예약 UX 개선', domain:'Hanmac Mobile Intranet', lead:'PC 중심으로 운영되던 사내 업무 중 자주 사용하는 결재와 예약 기능을 모바일에서도 빠르게 완료하도록 핵심 흐름과 정보 우선순위를 재설계했습니다.',
    period:'2023.01 — 2023.06', role:'UX 전략 · 정보구조 · UI 디자인', contribution:'100%', team:'기획자 · 디자이너 · 개발자', cover:1, bg:'#e7eeec', ink:'#172322', accent:'#315f5d', muted:'#516461',
    problem:'핵심은 모바일에서도 볼 수 있는 것이 아니라, 모바일에서 바로 처리할 수 있는 구조였습니다.', detail:'기존 모바일 화면은 PC 기능을 축소해 보여주는 데 그쳤습니다. 자주 사용하는 전자결재와 예약 업무를 중심으로 진입 경로와 정보 우선순위를 다시 정리했습니다.',
    outcomes:[['43% 증가','전자결재·예약 사용'],['2.1배','모바일 사용'],['4.6 / 5.0','사용자 만족도']], images:6, next:['tbm','현장 기록의 모바일 전환 UX']
  },
  dashboard: {
    no:'01', type:'B2B DASHBOARD · DECISION SUPPORT', title:'실시간 운영 의사결정 대시보드', domain:'Project Cost & Workforce Analysis Dashboard', lead:'프로젝트 데이터를 단순히 조회하는 화면이 아니라, 역할별로 필요한 정보를 빠르게 판단하고 위험 신호를 먼저 발견할 수 있는 대시보드로 재구성했습니다.',
    period:'2025.12 — 2026.03', role:'데이터 UX · UI 디자인 · 퍼블리싱', contribution:'100%', team:'기획자 · 디자이너 · 개발자', cover:1, bg:'#151d35', ink:'#fff', accent:'#8fa9ff', muted:'#c0c7da',
    problem:'데이터는 충분했습니다. 문제는 그 데이터가 의사결정에 닿지 못한다는 것이었습니다.', detail:'엑셀과 수기 장부로 흩어진 원가·인원 데이터를 하나로 통합하고, 사용자 역할에 따라 필요한 판단 기준을 다른 뷰로 제공했습니다. 색상은 의미 전달에만 쓰고 카드·테이블·차트의 상태 규칙을 시스템화했습니다.',
    outcomes:[['한 화면','핵심 현황 통합'],['역할 기반','사용자별 화면'],['UI 시스템','일관된 상태 규칙']], images:6, next:['platform','멀티 유저 B2B 플랫폼']
  },
  platform: {
    no:'02', type:'B2B PLATFORM · INFORMATION ARCHITECTURE', title:'멀티 유저 B2B 플랫폼 정보구조 재설계', domain:'Construction Integrated Platform · 약 60억 규모 R&D 프로젝트', lead:'현장 관리자, 본사 담당자, 외부 사용자가 하나의 시스템을 사용하는 환경에서 각자의 목적에 맞게 정보를 빠르게 탐색하고 판단하도록 정보구조와 핵심 사용자 흐름을 재설계했습니다.',
    period:'2023.01 — 2023.12', role:'UX 전략 · 정보구조 · UI · 디자인 시스템', contribution:'90%', team:'기획 · UX/UI · 프론트엔드 · 백엔드 · BIM', cover:1, bg:'#1d2024', ink:'#fff', accent:'#ff8b44', muted:'#c7c8ca',
    problem:'문제는 정보가 부족한 것이 아니라, 사용자마다 필요한 정보와 탐색 목적이 다르다는 것이었습니다.', detail:'서로 다른 역할의 사용자가 동일한 메뉴 구조를 사용하면서 필요한 정보에 도달하기까지 불필요한 탐색과 화면 이동이 반복되고 있었습니다.',
    outcomes:[['5.4 → 2','대표 과업 기준 평균 탐색 단계'],['25% 감소','적용 이후 이탈률'],['30% 향상','적용 이후 전환율']], images:8, next:['pet','기록을 습관으로 만드는 반려동물 건강관리 UX']
  },
  tbm: {
    no:'05', type:'MOBILE WORKFLOW · DIGITAL TRANSFORMATION', title:'현장 기록의 모바일 전환 UX', domain:'TBM Safety Record System', lead:'종이 작성에서 사무실 입력으로 이어지던 업무를 현장에서 작성과 확인까지 완료할 수 있는 모바일 경험으로 전환했습니다.',
    period:'2025.11 — 2026.04', role:'현장 조사 · 모바일 UX/UI', contribution:'UX/UI 전담', team:'기획자 · 디자이너 · 개발자', cover:1, bg:'#16171b', ink:'#fff', accent:'#7692ff', muted:'#c9cbd2',
    problem:'종이 서류에서 디지털로, 현장에서 체감하는 안전관리로.', detail:'수기 기록의 반복 입력, 현장·사무실 간 단절, 긴 점검 절차를 개선했습니다. 엄지손가락 도달 범위와 큰 터치 타깃을 기준으로 모바일 흐름을 설계하고, 서명과 확인 절차를 짧게 연결해 업무 효율과 확장성을 높였습니다.',
    outcomes:[['Paper → Mobile','작성 방식'],['PC Only → Field Ready','업무 환경'],['1st → 2nd Company','확장 적용']], images:6, next:['dashboard','실시간 운영 의사결정 대시보드']
  },
  pet: {
    no:'03', type:'B2C · HABIT UX', title:'기록을 습관으로 만드는 반려동물 건강관리 UX', domain:'Dangnyangsilrok · Personal Product Project', lead:'해야 하지만 쉽게 미뤄지는 반려동물 건강 기록을 빠른 입력과 즉각적인 보상으로 반복 가능한 행동 경험으로 설계했습니다.',
    period:'2026.02 — 진행중', role:'UX 전략 · 브랜딩 · UI 디자인', contribution:'100%', team:'개인 프로젝트', cover:1, bg:'#eee8da', ink:'#20201f', accent:'#81643a', muted:'#665f54',
    problem:'기록은 중요하지만 사용자에게는 번거로운 일입니다.', detail:'“기록해야 한다”는 압박을 “오늘의 실록을 남긴다”는 감성적 보상으로 바꿨습니다. 기록 행동을 최소 단계로 줄이고 캐릭터·문체·시각 언어를 일관되게 설계해, 사용자가 부담 없이 반복할 수 있는 습관 형성 UX를 만들었습니다.',
    outcomes:[['62.4%','기존 서비스 사용자 이탈 지점 분석'],['45.8초','프로토타입 평균 기록 소요'],['2단계','개선한 핵심 기록 플로우']], images:8, next:['intranet','모바일 업무 포털과 예약 플로우']
  }
};

const caseStudies = {
  platform: {
    label:'정보구조 재설계',
    insight:'문제는 정보량이 아니라, 사용자마다 필요한 정보와 탐색 목적이 다르다는 것이었습니다.',
    strategyHeadline:'사용자별 탐색 목적을 기준으로 정보 구조를 재편했습니다.',
    voice:['사내 관계자 VOC','“메뉴 구조가 복잡해서 필요한 정보를 어디서 찾아야 할지 어렵습니다.”'],
    context:[['사용자','현장 관리자 · 본사 담당자 · 외부 사용자'],['환경','PC · 지도 기반 관제 화면'],['제약','기존 개발 구조와 분산된 데이터 모듈']],
    pains:[['복잡한 메뉴 구조','업무 목적과 관계없이 기능 중심으로 구성되어 탐색 단계가 길었습니다.'],['위치 맥락 부재','지도와 현장 정보가 분리되어 현재 상황을 이해하기 어려웠습니다.'],['분산된 데이터','공정·CCTV·BIM 등 핵심 정보가 서로 다른 화면에 흩어져 있었습니다.']],
    strategies:[['01','업무 목적 중심 진입','기능 목록이 아니라 사용자가 해결하려는 업무를 기준으로 진입 구조를 다시 설계했습니다.'],['02','지도 기반 시각화','위치 정보와 현장 데이터를 하나의 맥락 안에서 확인하도록 통합했습니다.'],['03','끊기지 않는 흐름','조회에서 상세 확인, 관련 작업까지 자연스럽게 이어지도록 탐색 단계를 연결했습니다.']],
    ui:'map', uiTitle:'분산된 현장 정보를 하나의 맥락에서 판단할 수 있도록', uiText:'현장 위치를 기준으로 공정, 영상, BIM 데이터를 연결해 화면을 반복 이동하지 않고 필요한 정보를 탐색하도록 구성했습니다.',
    reframe:{request:'여러 기능과 데이터를 하나의 플랫폼에 통합', observed:'역할이 다른 사용자에게 동일한 기능 중심 메뉴를 제공하고 있었습니다.', result:'기능 통합보다 각 사용자의 시작점과 탐색 목적을 먼저 구분했습니다.'},
    iteration:{initial:'기능과 시스템 단위로 나눈 공통 메뉴', feedback:'사용자는 메뉴명보다 현재 해결해야 하는 업무를 기준으로 정보를 찾았습니다.', final:'역할별 진입점과 지도 중심 탐색을 연결한 구조', initialImage:'assets/cases/befre-platform.png', finalImage:'assets/cases/after-platform.png'},
    solutionSteps:[['01 발견','지도에서 담당 현장과 주요 상태를 확인'],['02 판단','공정·CCTV·BIM 정보를 같은 위치 맥락에서 비교'],['03 행동','상세 화면으로 이동해 관련 업무를 이어서 처리']],
    finalVisual:['assets/cases/platform-9.png','지도 기반 통합 관제 최종 화면','현장 위치를 중심으로 시뮬레이션과 주요 기능을 한 화면에 연결했습니다.','landscape'],
    visuals:[['assets/cases/platform-5.jpg','지도 기반 제품 화면','위치 맥락 위에 공정·구조물·영상 데이터를 연결한 실제 화면과 디바이스 목업'],['assets/cases/platform-7.jpg','핵심 UX 적용','탐색·통합·시뮬레이션으로 이어지는 세 가지 핵심 화면']],
    impact:{type:'depth', label:'탐색 구조 검증', title:'정보에 도달하는 경로를 절반 이하로 줄였습니다.', before:'5.4', after:'2', note:'대표 과업 기준 평균 탐색 단계 · Bounce Rate -25% · Conversion +30%'},
    reflection:{learned:'사용자 유형이 많은 제품에서는 모든 기능을 한곳에 모으는 것보다, 각 사용자가 어디에서 시작해야 하는지를 명확히 하는 일이 더 중요했습니다.', next:'다시 진행한다면 역할별 사용 로그를 더 세분화해 홈과 지도 화면의 정보 우선순위를 지속적으로 검증하겠습니다.'}
  },
  dashboard: {
    label:'데이터 UX',
    insight:'데이터는 충분했습니다. 문제는 그 데이터가 의사결정에 닿지 못한다는 것이었습니다.',
    strategyHeadline:'숫자를 나열하는 대신 이상 징후를 먼저 발견하는 화면으로 재구성했습니다.',
    voice:['실무자 인터뷰 요약','“현황을 파악하려면 엑셀을 다시 모아야 해서, 위험을 발견했을 때는 이미 늦습니다.”'],
    context:[['사용자','경영진 · 프로젝트 관리자 · 실무자'],['환경','ERP · PC 대시보드 · 정기 보고'],['제약','엑셀·수기 데이터와 서로 다른 집계 기준']],
    pains:[['수동 취합','프로젝트별 투입 공수와 원가를 매번 수작업으로 모아야 했습니다.'],['리스크 인지 실패','초과 공수와 공기 지연의 패턴을 사전에 발견하기 어려웠습니다.'],['반복 보고서','경영진 보고용 자료를 별도 문서로 다시 만들어야 했습니다.']],
    strategies:[['01','역할별 관점','경영진과 실무자가 서로 다른 판단 기준으로 핵심 지표를 확인하도록 구성했습니다.'],['02','상태 규칙 통합','흩어진 상태값을 동일한 규칙으로 정리해 데이터의 의미를 빠르게 이해하도록 했습니다.'],['03','위험 신호 강조','변화가 필요한 항목은 사용자가 먼저 찾지 않아도 화면에서 드러나도록 설계했습니다.']],
    ui:'dashboard', uiTitle:'나열이 아니라 리스크의 패턴을 읽는 화면', uiText:'원가, 공수, 진행률을 한 화면에 연결하고 위험 상태에만 색을 사용했습니다.',
    reframe:{request:'흩어진 원가와 공수 데이터를 한 화면에 표시', observed:'데이터를 모아도 모든 수치가 같은 우선순위로 나열되어 위험을 다시 찾아야 했습니다.', result:'데이터 조회 화면이 아니라 역할별 판단과 이상 징후 발견을 지원하는 제품으로 정의했습니다.'},
    iteration:{initial:'모든 지표를 동일한 우선순위로 배치한 나열형 화면', feedback:'실무자는 상세 수치보다 먼저 위험 프로젝트와 변화 원인을 확인했습니다.', final:'위험 신호를 상단에 두고 세부 지표를 단계적으로 여는 구조', initialImage:'assets/cases/dashboard-5.jpg', finalImage:'assets/cases/dashboard-5.jpg', initialCrop:'left', finalCrop:'right'},
    solutionSteps:[['01 발견','임계값을 벗어난 프로젝트를 먼저 확인'],['02 판단','같은 기간의 원가율·공수율·진행률을 비교'],['03 행동','프로젝트 상세로 이동해 변화 원인을 확인']],
    finalVisual:['assets/cases/dashboard-7.png','운영 의사결정 대시보드 최종 화면','원가·공수·프로젝트 위험 상태를 한 화면에서 비교하도록 구성했습니다.','landscape'],
    visuals:[['assets/cases/dashboard-3.jpg','역할 기반 정보구조','경영진·프로젝트 관리자·실무자 관점으로 분리한 대시보드 IA'],['assets/cases/dashboard-5.jpg','Before & After','수작업 원장 조회에서 실시간 리스크 탐지 화면으로 바뀐 결과']],
    impact:{type:'risk', label:'판단 방식 변화', title:'보고서를 만든 뒤 확인하던 위험을, 화면에서 먼저 발견합니다.', before:'수동 취합', after:'실시간 감지', note:'Spreadsheet reporting → Live risk signal'},
    reflection:{learned:'대시보드는 정보를 많이 보여주는 화면이 아니라, 사용자가 먼저 확인해야 할 변화를 합의하는 도구라는 점을 배웠습니다.', next:'운영 이후에는 경고 확인 뒤 어떤 상세 화면과 행동으로 이어지는지 로그를 연결해 상태 기준을 더 정교하게 조정하고 싶습니다.'}
  },
  tbm: {
    label:'현장 중심 모바일 UX',
    insight:'디지털 전환의 핵심은 종이를 없애는 것이 아니라, 현장에서 기록이 끊기지 않게 하는 것이었습니다.',
    strategyHeadline:'현장 작업이 끊기지 않도록 기록 동선을 최소 단계로 재설계했습니다.',
    voice:['현장 사용자 피드백 요약','“장갑을 벗고 사무실 PC로 돌아가야 기록할 수 있으면 현장에서는 결국 종이를 씁니다.”'],
    context:[['사용자','현장 작업자 · 안전 관리자'],['환경','야외 현장 · 모바일 · 사무실 PC'],['제약','장갑 착용 · 강한 햇빛 · 사진과 서명 입력']],
    pains:[['수기 서류 반복','매일 종이를 작성하고 다시 취합하면서 분실과 보고 지연이 발생했습니다.'],['현장·사무실 단절','사진과 서명 전달이 늦어 사고 발생 시 즉시 대응하기 어려웠습니다.'],['낮은 접근성','PC 웹만 존재해 야외 현장 작업자의 활용률이 낮았습니다.'],['다중 현장 확장','회사와 현장이 늘어나도 같은 규칙으로 운영할 구조가 필요했습니다.']],
    strategies:[['01','큰 터치 영역','장갑을 낀 현장에서도 주요 기능을 빠르게 조작할 수 있도록 설계했습니다.'],['02','고명암 시각 체계','야외 환경에서도 상태와 핵심 정보를 명확히 구분하도록 했습니다.'],['03','짧은 기록 흐름','확인에서 입력과 완료까지 최소 단계로 연결했습니다.']],
    iteration:{initial:'종이 양식에 직접 작성하고 사무실에서 다시 취합하는 흐름', feedback:'현장에서는 기록 도구보다 장갑을 낀 상태에서도 바로 완료할 수 있는 큰 조작 영역이 필요했습니다.', final:'현장에서 확인·작성·보고를 완료하는 모바일 흐름', initialImage:'assets/cases/before-tbm.png', finalImage:'assets/cases/after-tbm.png'},
    ui:'phone', uiTitle:'야외 환경에서도 즉시 기록하는 안전관리', uiText:'작성일, 출역 인원과 결재 상태를 한 화면에서 확인하고 바로 기록합니다.',
    finalVisual:['assets/cases/tbm-7.png','현장 안전관리 최종 화면','장갑 착용과 야외 시인성을 고려해 주요 현장 업무를 큰 터치 영역으로 구성했습니다.','portrait'],
    visuals:[['assets/cases/tbm-3.jpg','Paper to Mobile','종이 기록을 큰 터치 영역의 모바일 홈으로 전환한 비교'],['assets/cases/tbm-5.jpg','현장 완결형 서명','별도 스캔 없이 모바일에서 서명과 완료 확인을 끝내는 흐름']],
    impact:{type:'workflow', label:'업무 환경 변화', title:'사무실로 돌아가 기록하던 업무를 현장에서 바로 완료합니다.', before:'종이 · PC', after:'현장 모바일', note:'Paper → Mobile · PC Only → Field Ready · 1st → 2nd Company'}
  },
  intranet: {
    label:'모바일 업무 흐름',
    insight:'핵심은 모바일에서도 볼 수 있는 것이 아니라, 모바일에서 바로 처리할 수 있는 구조였습니다.',
    strategyHeadline:'PC에서 하던 업무를 모바일에서 바로 완료할 수 있는 흐름으로 바꿨습니다.',
    voice:['사용자 인터뷰 요약','“긴급한 결재 하나 때문에 이동 중에도 PC 버전에 다시 로그인해야 했습니다.”'],
    context:[['사용자','사내 임직원 · 결재 담당자'],['환경','PC 인트라넷 · 모바일'],['제약','기존 업무 시스템과 작은 모바일 화면']],
    pains:[['PC 로그인 의존','긴급한 전자결재도 PC 버전에 로그인해야 했습니다.'],['정보 접근 제약','이동 중에는 결재 상태와 회의실 현황 확인이 어려웠습니다.'],['작은 화면 피로','기존 화면을 축소해서 제공해 확대와 이동을 반복해야 했습니다.']],
    strategies:[['01','과업 중심 홈','자주 사용하는 결재와 예약 업무를 첫 화면에서 바로 시작하도록 구성했습니다.'],['02','한 화면 예약','위치, 날짜, 시간을 하나의 흐름 안에서 선택하도록 단순화했습니다.'],['03','모바일 우선 정보','긴 문서보다 사용자의 다음 행동에 필요한 정보를 먼저 노출했습니다.']],
    iteration:{initial:'PC 화면을 축소한 목록·입력 중심 예약 구조', feedback:'사용자는 상세 목록보다 예약 가능한 장소와 시간을 한 화면에서 먼저 확인하고 싶어 했습니다.', final:'위치·날짜·시간과 예약 행동을 한 화면에 연결한 구조', initialImage:'assets/cases/before-intranet.jpg', finalImage:'assets/cases/intranet.jpg', initialCrop:'left', finalCrop:'right'},
    ui:'booking', uiTitle:'생각하지 않아도 다음 행동이 보이는 예약', uiText:'회의실 현황과 날짜·시간을 한 화면에서 확인하고 최소 단계로 예약합니다.',
    finalVisual:['assets/cases/intranet-7.png','모바일 업무 포털 최종 화면','결재·공지·회의실 등 자주 쓰는 업무를 홈에서 바로 확인하도록 재구성했습니다.','portrait'],
    visuals:[['assets/cases/intranet-4.jpg','회의실 예약 Before & After','분리된 PC 화면을 위치·날짜·시간이 연결된 모바일 예약 흐름으로 재구성'],['assets/cases/intranet-5.jpg','전자결재 Before & After','작성자 중심 문서 구조를 결재자가 빠르게 처리하는 모바일 화면으로 전환']]
  },
  pet: {
    label:'습관 형성 UX',
    insight:'사용자는 기록을 도움 되는 행동보다 귀찮지만 해야 하는 일로 느끼고 있었습니다.',
    strategyHeadline:'기록의 부담은 줄이고 보상은 강화해 반복 행동 구조를 만들었습니다.',
    voice:['사용자 인터뷰 · 프로토타입 테스트','“건강 기록이 중요한 건 알지만, 매번 여러 단계를 입력하는 건 부담스러워요.”'],
    context:[['사용자','반려동물 보호자'],['환경','개인 모바일 서비스'],['검증 범위','기존 서비스 분석 · 프로토타입 테스트']],
    pains:[['깊은 메뉴 구조','기록 기능이 여러 단계 안쪽에 있어 진입 자체가 어려웠습니다.'],['입력 피로','많은 입력 단계와 수동 기록이 반복 사용을 막았습니다.'],['보상 경험 부족','기록 후 즉각적인 피드백이나 변화의 시각화가 없었습니다.'],['사용자 이탈','마찰이 누적되며 기존 서비스 이탈률이 62.4%에 달했습니다.']],
    strategies:[['01','오늘의 기록 요약','사용자가 해야 할 행동과 현재 상태를 한눈에 파악하도록 했습니다.'],['02','한 번 누르는 기록','자주 사용하는 기록은 최소 입력으로 완료하도록 단순화했습니다.'],['03','업적과 리포트','기록이 쌓이는 과정을 보상과 변화로 보여주며 다시 사용할 이유를 만들었습니다.']],
    iteration:{initial:'캐릭터와 기록 결과를 중심으로 한 정보 밀도가 낮은 홈', feedback:'사용자는 기록 결과보다 오늘 해야 할 행동과 빠른 입력 진입점을 먼저 찾았습니다.', final:'진행률·빠른 기록·오늘의 일정을 우선 배치한 행동 중심 홈', initialImage:'assets/cases/before-pet.png', finalImage:'assets/cases/after-pet.png'},
    ui:'pet', uiTitle:'기록을 의무가 아닌 일상의 보상으로', uiText:'오늘의 돌봄 진행률과 빠른 기록을 홈에 모아 반복 행동의 부담을 낮췄습니다.',
    finalVisual:['assets/cases/pet-9.png','오늘의 돌봄 최종 화면','진행률·빠른 기록·오늘의 일정을 홈에 모아 반복 기록의 부담을 낮췄습니다.','portrait'],
    visuals:[['assets/cases/pet-4.jpg','핵심 화면 구성','오늘의 기록·빠른 입력·일정·리포트로 정리한 제품 구조'],['assets/cases/pet-6.jpg','Visual System','브랜드 컬러와 카드 레이아웃을 적용한 주요 모바일 UI']],
    impact:{type:'prototype', label:'설계 결과', title:'길었던 기록 흐름을 두 단계로 줄였습니다.', before:'3+ 단계', after:'2단계', note:'프로토타입 기준 · 정식 사용성 검증 예정'}
  }
};

const icon = (name) => {
  const paths = {
    search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
    flow:'<path d="M4 6h7M13 6h7M7 6v12h10V6M4 18h7M13 18h7"/>',
    data:'<path d="M5 19V9M12 19V4M19 19v-7"/>',
    action:'<path d="m5 12 4 4L19 6"/>',
    voice:'<path d="M5 6h14v9H9l-4 4V6Z"/><path d="M9 10h6"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.action}</svg>`;
};

const renderMockup = (type, finalVisual) => {
  if (finalVisual) return `<div class="mock-window final-mockup ${finalVisual[3]}"><img src="${finalVisual[0]}" alt="${finalVisual[1]}" decoding="async"></div>`;
  if (type === 'map') return `<div class="mock-window map-ui"><div class="mock-top"><i></i><i></i><i></i><span>건설 통합 플랫폼 · 현장 관제</span></div><div class="map-product"><aside><b>HANUL MAP</b><span class="active">통합 현황</span><span>공정 관리</span><span>CCTV</span><span>BIM 데이터</span></aside><div class="map-workspace"><div class="map-filter"><strong>전체 현장</strong><span>공정률 순 · 최신 데이터</span></div><div class="map-canvas"><span class="route r1"></span><span class="route r2"></span><b class="pin p1"></b><b class="pin p2"></b><b class="pin p3"></b><div class="map-panel"><small>구리-포천 3공구</small><strong>78%</strong><span>공정 정상 · 알림 2건</span><button>현장 상세 보기 →</button></div></div></div></div></div>`;
  if (type === 'dashboard') return `<div class="mock-window dashboard-ui"><div class="mock-side"><b>ERP</b><i></i><i></i><i></i></div><div class="mock-main"><div class="mock-filter"><span>전체 프로젝트</span><span>2026.07</span></div><div class="kpi-row"><div><small>총 원가</small><b>₩ 4.2B</b></div><div><small>공수율</small><b>82%</b></div><div class="risk"><small>위험 프로젝트</small><b>03</b></div></div><div class="chart"><i style="--h:42%"></i><i style="--h:65%"></i><i style="--h:53%"></i><i class="hot" style="--h:88%"></i><i style="--h:72%"></i><i style="--h:57%"></i></div></div></div>`;
  const title = type === 'booking' ? '회의실 예약' : type === 'pet' ? '오늘의 돌봄' : 'TBM 안전관리';
  const color = type === 'pet' ? 'pet-ui' : type === 'booking' ? 'booking-ui' : 'safety-ui';
  return `<div class="phone-shell ${color}"><div class="phone-bar"><span>9:41</span><i></i></div><div class="phone-head"><small>HANUL UX</small><h4>${title}</h4></div><div class="phone-progress"><span></span></div><div class="phone-card"><small>${type === 'booking' ? '예약 가능한 회의실' : type === 'pet' ? '오늘의 기록 진행률' : '금일 출역 인원'}</small><strong>${type === 'booking' ? '회의실 A · 09:00' : type === 'pet' ? '3 / 5 완료' : '24명'}</strong></div><div class="phone-grid"><span>${type === 'booking' ? '날짜' : '확인'}</span><span>${type === 'booking' ? '시간' : '기록'}</span><span>${type === 'booking' ? '인원' : '보고'}</span></div><button>${type === 'booking' ? '예약하기' : '작성하기'}</button></div>`;
};

const renderReframe = (item) => item ? `
  <article class="story-section reframe" id="reframe">
    <header><p>03 문제 재정의</p><h3>처음 요청을 그대로 화면으로 옮기지 않고, 해결해야 할 문제를 다시 정의했습니다.</h3></header>
    <div class="reframe-flow">
      <div><small>처음 요청</small><p>${item.request}</p></div>
      <span>→</span>
      <div><small>관찰한 문제</small><p>${item.observed}</p></div>
      <span>→</span>
      <div class="reframed"><small>다시 정의한 문제</small><p>${item.result}</p></div>
    </div>
  </article>` : '';

const renderIteration = (item, number) => item ? `
  <article class="story-section iteration" id="iteration">
    <header><p>${number} 설계 조정</p><h3>첫 구조에서 끝내지 않고, 실제 확인 목적을 기준으로 우선순위를 바꿨습니다.</h3></header>
    <div class="iteration-compare">
      <div><small>초기안</small><strong>${item.initial}</strong>${item.initialImage ? `<div class="comparison-image ${item.initialCrop ? `split-${item.initialCrop}` : ''}"><img src="${item.initialImage}" alt="초기안 화면" loading="lazy" decoding="async"></div>` : '<div class="wireframe initial"><i></i><i></i><i></i><i></i></div>'}</div>
      <blockquote><small>확인한 내용</small><p>${item.feedback}</p></blockquote>
      <div class="final"><small>최종안</small><strong>${item.final}</strong>${item.finalImage ? `<div class="comparison-image ${item.finalCrop ? `split-${item.finalCrop}` : ''}"><img src="${item.finalImage}" alt="최종안 화면" loading="lazy" decoding="async"></div>` : '<div class="wireframe"><i></i><i></i><i></i></div>'}</div>
    </div>
  </article>` : '';

const renderReflection = (item) => item ? `
  <article class="story-section reflection" id="reflection">
    <header><p>08 회고</p><h3>이 프로젝트에서 배운 것과 다음에 검증할 것</h3></header>
    <div class="reflection-grid"><div><small>배운 점</small><p>${item.learned}</p></div><div><small>다시 한다면</small><p>${item.next}</p></div></div>
  </article>` : '';

const renderVisuals = (items) => items?.length ? `
  <article class="story-section project-visuals" id="visuals">
    <header><p>실제 설계 화면</p><h3>설계 의도가 제품 화면에 어떻게 적용됐는지 확인했습니다.</h3></header>
    <div class="project-visual-grid">${items.map((item, index) => `
      <figure class="${index === 0 ? 'featured' : ''}">
        <div class="visual-frame"><img src="${item[0]}" alt="${item[1]}" loading="lazy" decoding="async"></div>
        <figcaption><b>${item[1]}</b><span>${item[2]}</span><small>portfolio.pdf 발췌</small></figcaption>
      </figure>`).join('')}</div>
  </article>` : '';

const renderStudy = (study) => `
  <article class="story-section evidence" id="evidence">
    <header><p>02 문제 발견</p><h3>${study.insight}</h3></header>
    <blockquote class="user-voice"><span>${icon('voice')}</span><div><small>${study.voice[0]}</small><p>${study.voice[1]}</p></div></blockquote>
    <div class="evidence-grid">${study.pains.map((x,i)=>`<div><small>0${i+1}</small><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join('')}</div>
  </article>
  ${renderReframe(study.reframe)}
  <article class="story-section strategy" id="decision">
    <header><p>${study.reframe ? '04' : '03'} 설계 결정</p><h3>${study.strategyHeadline}</h3></header>
    <div class="strategy-list">${study.strategies.map(x=>`<div><b>${x[0]}</b><h4>${x[1]}</h4><p>${x[2]}</p></div>`).join('')}</div>
  </article>
  ${renderIteration(study.iteration, study.reframe ? '05' : '04')}
  <article class="story-section solution" id="solution">
    <div class="solution-copy"><p>${study.reframe ? '06' : study.iteration ? '05' : '04'} 최종 경험</p><h3>${study.uiTitle}</h3><span>${study.uiText}</span>${study.solutionSteps ? `<ol class="solution-steps">${study.solutionSteps.map(x=>`<li><b>${x[0]}</b><span>${x[1]}</span></li>`).join('')}</ol>` : ''}</div>
    <div class="ui-stage">${renderMockup(study.ui, study.finalVisual)}</div>
  </article>
  ${renderVisuals(study.visuals)}
  ${study.impact ? renderImpact(study.impact, study.reframe ? '07' : study.iteration ? '06' : '05') : ''}
  ${renderReflection(study.reflection)}`;

const renderImpact = (impact, number) => `
  <article class="story-section impact impact-${impact.type}" id="impact">
    <header><p>${number} ${impact.label}</p><h3>${impact.title}</h3></header>
    <div class="impact-flow">
      <div><small>BEFORE</small><strong>${impact.before}</strong></div>
      <span aria-hidden="true"><i></i><b>→</b></span>
      <div class="after"><small>AFTER</small><strong>${impact.after}</strong></div>
    </div>
    <p class="impact-note">${impact.note}</p>
  </article>`;

const slug = document.body.dataset.project;
const p = projects[slug];
if (p) {
  document.documentElement.style.setProperty('--case-bg',p.bg);
  document.documentElement.style.setProperty('--case-ink',p.ink);
  document.documentElement.style.setProperty('--case-accent',p.accent);
  document.documentElement.style.setProperty('--case-muted',p.muted);
  document.title = `${p.title} — 이한울`;
  document.querySelector('.case-eyebrow').textContent=slug === 'pet'
    ? `PERSONAL PRODUCT PROJECT · ${p.type}`
    : `PROJECT ${p.no} · ${p.type}`;
  document.querySelector('.case-title').textContent=p.title;
  document.querySelector('.case-domain').textContent=p.domain;
  document.querySelector('.case-lead').textContent=p.lead;
  document.querySelector('.period').textContent=p.period;
  document.querySelector('.role').textContent=p.role;
  document.querySelector('.contribution').textContent=p.contribution;
  document.querySelector('.team').textContent=p.team;
  document.querySelector('.case-cover').innerHTML=renderMockup(caseStudies[slug].ui, caseStudies[slug].finalVisual);
  document.querySelector('.problem').textContent=p.problem;
  document.querySelector('.detail').textContent=p.detail;
  document.querySelector('.context-facts').innerHTML=caseStudies[slug].context.map(x=>`<div><small>${x[0]}</small><span>${x[1]}</span></div>`).join('');
  document.querySelector('.outcomes').innerHTML=p.outcomes.map(x=>`<div class="outcome"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join('');
  document.querySelector('.gallery').innerHTML=renderStudy(caseStudies[slug]);
  if (caseStudies[slug].reframe) {
    document.querySelector('.case-main').insertAdjacentHTML('beforeend',`<nav class="case-progress" aria-label="사례 진행 순서"><a href="#overview">개요</a><a href="#context">배경</a><a href="#evidence">근거</a><a href="#reframe">재정의</a><a href="#decision">결정</a><a href="#iteration">조정</a><a href="#solution">경험</a><a href="#impact">성과</a><a href="#reflection">회고</a></nav>`);
    const progressLinks = [...document.querySelectorAll('.case-progress a')];
    const progressSections = progressLinks
      .map(link => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);
    const setActiveSection = id => {
      progressLinks.forEach(link => {
        const active = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    setActiveSection('overview');
    const progressObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0, .15, .35, .6] });
    progressSections.forEach(section => progressObserver.observe(section));
  }
  document.querySelector('.next a').href=`project-${p.next[0]}.html`;
  document.querySelector('.next h3').textContent=p.next[1];
}
