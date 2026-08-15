const projects = {
  intranet: {
    no:'04', type:'B2B SAAS · MOBILE WORKFLOW', title:'모바일 업무 포털 예약 UX 개선', domain:'Hanmac Mobile Intranet', lead:'PC 중심으로 운영되던 사내 업무 중 자주 사용하는 결재와 예약 기능을 모바일에서도 빠르게 완료하도록 핵심 흐름과 정보 우선순위를 재설계했습니다.',
    period:'2023.01 — 2023.06', role:'UX 전략 · 정보구조 · UI 디자인', contribution:'100%', team:'기획자 · 디자이너 · 개발자', cover:1, bg:'#e7eeec', ink:'#172322', accent:'#315f5d', textAccent:'#315f5d', muted:'#516461',
    problem:'핵심은 모바일에서도 볼 수 있는 것이 아니라, 모바일에서 바로 처리할 수 있는 구조였습니다.', detail:'기존 모바일 화면은 PC 기능을 축소해 보여주는 데 그쳤습니다. 자주 사용하는 전자결재와 예약 업무를 중심으로 진입 경로와 정보 우선순위를 다시 정리했습니다.',
    outcomes:[['43% 증가','전자결재·예약 사용'],['2.1배','모바일 사용'],['4.6 / 5.0','사용자 만족도']], outcomeBasis:'도입 전후 사용량과 기존 사용자 15명 대상 설문조사 기준', images:6, next:['tbm','현장 기록의 모바일 전환 UX']
  },
  dashboard: {
    no:'01', type:'B2B DASHBOARD · DECISION SUPPORT', title:'실시간 운영 의사결정 대시보드', domain:'Project Cost & Workforce Analysis Dashboard', lead:'프로젝트 데이터를 단순히 조회하는 화면이 아니라, 역할별로 필요한 정보를 빠르게 판단하고 위험 신호를 먼저 발견할 수 있는 대시보드로 재구성했습니다.',
    period:'2025.12 — 2026.03', role:'데이터 UX · UI 디자인 · 퍼블리싱', contribution:'100%', team:'기획자 · 디자이너 · 개발자', cover:1, bg:'#151d35', ink:'#fff', accent:'#526dc7', textAccent:'#455db0', muted:'#c0c7da',
    problem:'데이터는 충분했습니다. 문제는 그 데이터가 의사결정에 닿지 못한다는 것이었습니다.', detail:'엑셀과 수기 장부로 흩어진 원가·인원 데이터를 하나로 통합하고, 사용자 역할에 따라 필요한 판단 기준을 다른 뷰로 제공했습니다. 색상은 의미 전달에만 쓰고 카드·테이블·차트의 상태 규칙을 시스템화했습니다.',
    outcomes:[['한 화면','핵심 현황 통합'],['역할 기반','사용자별 화면'],['UI 시스템','일관된 상태 규칙']], outcomeBasis:'프로젝트 원가·공수 데이터 구조와 역할별 핵심 과업 분석 기준', images:6, next:['platform','멀티 유저 B2B 플랫폼']
  },
  platform: {
    no:'02', type:'B2B PLATFORM · INFORMATION ARCHITECTURE', title:'멀티 유저 B2B 플랫폼 정보구조 재설계', domain:'Construction Integrated Platform · 약 60억 규모 R&D 프로젝트', lead:'현장 관리자, 본사 담당자, 외부 사용자가 하나의 시스템을 사용하는 환경에서 각자의 목적에 맞게 정보를 빠르게 탐색하고 판단하도록 정보구조와 핵심 사용자 흐름을 재설계했습니다.',
    period:'2023.01 — 2023.12', role:'UX 전략 · 정보구조 · UI · 디자인 시스템', contribution:'90%', team:'기획 · UX/UI · 프론트엔드 · 백엔드 · BIM', cover:1, bg:'#1d2024', ink:'#fff', accent:'#c85c1b', textAccent:'#a9470f', muted:'#c7c8ca',
    problem:'문제는 정보가 부족한 것이 아니라, 사용자마다 필요한 정보와 탐색 목적이 다르다는 것이었습니다.', detail:'서로 다른 역할의 사용자가 동일한 메뉴 구조를 사용하면서 필요한 정보에 도달하기까지 불필요한 탐색과 화면 이동이 반복되고 있었습니다.',
    outcomes:[['5.4 → 2','대표 과업 기준 평균 탐색 단계'],['25% 감소','적용 이후 이탈률'],['30% 향상','적용 이후 전환율']], outcomeBasis:'대표 탐색 과업과 적용 전후 서비스 지표 기준', images:8, next:['pet','기록을 습관으로 만드는 반려동물 건강관리 UX']
  },
  tbm: {
    no:'05', type:'MOBILE WORKFLOW · DIGITAL TRANSFORMATION', title:'현장 기록의 모바일 전환 UX', domain:'TBM Safety Record System', lead:'종이 작성에서 사무실 입력으로 이어지던 업무를 현장에서 작성과 확인까지 완료할 수 있는 모바일 경험으로 전환했습니다.',
    period:'2025.11 — 2026.04', role:'현장 조사 · 모바일 UX/UI', contribution:'UX/UI 전담', team:'기획자 · 디자이너 · 개발자', cover:1, bg:'#16171b', ink:'#fff', accent:'#3b389f', textAccent:'#3b389f', muted:'#c9cbd2',
    problem:'종이 서류에서 디지털로, 현장에서 체감하는 안전관리로.', detail:'수기 기록의 반복 입력, 현장·사무실 간 단절, 긴 점검 절차를 개선했습니다. 엄지손가락 도달 범위와 큰 터치 타깃을 기준으로 모바일 흐름을 설계하고, 서명과 확인 절차를 짧게 연결해 업무 효율과 확장성을 높였습니다.',
    outcomes:[['40% 감소','관리자 수기 정리 업무'],['즉시 검색','과거 TBM 기록'],['현장·관리자','양쪽 사용성 개선']], outcomeBasis:'사용자 피드백과 개선 전후 TBM 기록·관리 업무 비교 기준', images:6, next:['responsive','반응형 웹 전면 리뉴얼']
  },
  pet: {
    no:'03', type:'B2C · HABIT UX', title:'기록을 습관으로 만드는 반려동물 건강관리 UX', domain:'Dangnyangsilrok · Personal Product Project', lead:'해야 하지만 쉽게 미뤄지는 반려동물 건강 기록을 빠른 입력과 즉각적인 보상으로 반복 가능한 행동 경험으로 설계했습니다.',
    period:'2026.02 — 진행중', role:'UX 전략 · 브랜딩 · UI 디자인', contribution:'100%', team:'개인 프로젝트', cover:1, bg:'#eee8da', ink:'#20201f', accent:'#81643a', textAccent:'#72552e', muted:'#665f54',
    problem:'기록은 중요하지만 사용자에게는 번거로운 일입니다.', detail:'“기록해야 한다”는 압박을 “오늘의 실록을 남긴다”는 감성적 보상으로 바꿨습니다. 기록 행동을 최소 단계로 줄이고 캐릭터·문체·시각 언어를 일관되게 설계해, 사용자가 부담 없이 반복할 수 있는 습관 형성 UX를 만들었습니다.',
    outcomes:[['62.4%','기존 서비스 사용자 이탈 지점 분석'],['45.8초','프로토타입 평균 기록 소요'],['2단계','개선한 핵심 기록 플로우']], outcomeBasis:'경쟁 서비스 분석과 2명 대상 프로토타입 과업 테스트 기준', images:8, next:['intranet','모바일 업무 포털과 예약 플로우']
  },
  responsive: {
    no:'06', type:'RESPONSIVE WEB · UI RENEWAL', title:'반응형 웹 전면 리뉴얼', domain:'5G Testing Solutions Website', lead:'디바이스별로 달라지는 탐색 경험과 높은 이탈률을 개선하고, 복잡한 솔루션 정보를 더 쉽게 이해하고 비교할 수 있는 반응형 제품 사이트로 재설계했습니다.',
    period:'2023.03 — 2023.11', role:'웹 UX/UI · 반응형 디자인 시스템', contribution:'100%', team:'기획 · 디자인 · 개발', bg:'#0d4f91', ink:'#fff', accent:'#176fa6', textAccent:'#17618f', muted:'#d2e7f6',
    problem:'글로벌 방문자는 늘었지만, 디바이스가 바뀌면 탐색 경험도 함께 끊기고 있었습니다.', detail:'PC 중심의 고정형 웹은 모바일에서 정보가 잘리거나 우선순위가 흐려졌습니다. 솔루션과 제품 정보를 사용자의 탐색 목적에 맞게 재구성하고, 같은 정보 구조가 모든 화면에서 자연스럽게 이어지도록 반응형 규칙을 만들었습니다.',
    outcomes:[['30% 단축','모바일 페이지 로딩 시간'],['6.3% 감소','사용자 이탈률'],['25% 증가','모바일 사용자 유지율']], outcomeBasis:'리뉴얼 적용 전후 운영 데이터와 디바이스별 사용자 행동 지표 기준', next:['psc','PSC 거더 관리 플랫폼']
  },
  psc: {
    no:'07', type:'B2B PLATFORM · FIELD DATA', title:'PSC 거더 관리 플랫폼', domain:'PSC Girder Measurement & Management Platform', lead:'수기로 기록하던 측면 곡률 데이터를 센서 기반 자동 수집과 실시간 분석으로 연결해, 현장 측정의 정확성과 관리 효율을 높인 웹·앱 플랫폼입니다.',
    period:'2023.08 — 2024.08', role:'웹/앱 UX/UI · 퍼블리싱 · 현장 구조 분석', contribution:'100%', team:'기획 · 디자인 · 개발 · 현장 실무자', bg:'#367fa0', ink:'#fff', accent:'#5e86a6', textAccent:'#466b88', muted:'#d8edf4',
    problem:'측정값을 손으로 옮기는 과정이 정확도와 현장 대응 속도를 함께 떨어뜨리고 있었습니다.', detail:'종이 기록, 수동 엑셀 입력, 지연된 검토로 이어지던 프로세스를 자동 수집·분석 구조로 바꿨습니다. 웹에서는 거더별 측정 데이터를 통합 관리하고, 모바일에서는 센서 연결과 현장 상태 확인을 빠르게 완료하도록 설계했습니다.',
    outcomes:[['자동화','측정 데이터 수집'],['실시간','곡률 분석·모니터링'],['Web + App','현장·사무실 연결']], outcomeBasis:'현장 측정 프로세스와 제품 구현 범위 기준', next:['designsystem','일관성과 작업 속도를 높인 디자인 시스템']
  },
  designsystem: {
    no:'08', type:'DESIGN SYSTEM · WEB PLATFORM', title:'일관성과 작업 속도를 높인 디자인 시스템', domain:'Hanmac Design System', lead:'프로젝트마다 달랐던 UI 규칙을 공통 기반으로 통합해 디자인 재작업을 줄이고, 팀이 더 빠르고 일관되게 협업할 수 있는 설계 체계를 구축했습니다.',
    period:'2024.05 — 진행중', role:'UX 기획 · 컴포넌트 설계 · 핵심 화면 디자인', contribution:'100%', team:'기획 · 디자인 · 개발', bg:'#1e554d', ink:'#fff', accent:'#4b8d80', textAccent:'#2e6b61', muted:'#d5e5e1',
    problem:'반복되는 UI 변경과 프로젝트별로 달라지는 규칙이 디자인과 개발 양쪽의 재작업을 만들고 있었습니다.', detail:'브랜드, 파운데이션, 컴포넌트를 하나의 웹 플랫폼으로 정리하고 사용 기준과 예외를 문서화했습니다. 팀이 같은 언어와 규칙으로 설계하고 구현할 수 있는 지속 가능한 기반을 만드는 데 집중했습니다.',
    outcomes:[['하나의 기준','브랜드·UI 규칙 통합'],['재작업 감소','공통 컴포넌트 재사용'],['지속 가능','업데이트 가능한 문서']], outcomeBasis:'기술개발센터 프로젝트의 UI 자산과 협업 과정 분석 기준', next:['kanvan','업무의 흐름이 보이는 칸반보드']
  },
  kanvan: {
    no:'09', type:'B2B SAAS · WORKFLOW UX · INTERACTION', title:'업무의 흐름이 보이는 칸반보드 서비스', domain:'Kanban Workflow Management', lead:'리스트 중심 업무관리에서 파악하기 어려웠던 상태와 우선순위를 카드와 컬럼으로 시각화하고, 화면에서 직접 변경할 수 있는 인터랙션으로 구현했습니다.',
    period:'2026.03', role:'문제 정의 · UX 기획 · UI 디자인 · 프론트엔드 구현', contribution:'UX/UI·개발 100%', team:'개인 프로젝트 · 기획 협업', bg:'#15162d', ink:'#fff', accent:'#ff8500', textAccent:'#d96800', muted:'#d4d5e2',
    problem:'제목과 등록일 중심의 목록만으로는 업무의 현재 상태와 다음 행동을 빠르게 판단하기 어려웠습니다.', detail:'진행·대기·완료 업무를 컬럼으로 구분하고, 카드 안에서 담당자와 우선순위를 바로 확인하도록 정보 위계를 재설계했습니다. 드래그앤드롭과 상세 모달까지 직접 구현하며 상태 변경 과정의 예외를 보완했습니다.',
    outcomes:[['85% 단축','업무 탐색 시간'],['80% 감소','오클릭'],['100%','과제 성공률']], outcomeBasis:'실무자 7명 대상 기존 리스트와 개선 칸반의 동일 과업 사용성 테스트', next:['skyautonet','자율주행 기술을 이해시키는 웹 경험']
  },
  skyautonet: {
    no:'10', type:'WEB UX · BRAND UX · RESPONSIVE', title:'자율주행 기술을 이해시키는 반응형 웹 리디자인', domain:'SkyAutoNet Website Renewal', lead:'복잡한 자율주행 기술과 핵심 사업을 고객이 빠르게 이해하도록 브랜드 메시지, 정보 위계, 반응형 탐색 구조를 전면 재설계했습니다.',
    period:'2023.03 — 2023.11', role:'UX 기획 · IA · 브랜드 메시지 · 반응형 UI · 퍼블리싱', contribution:'UX/UI 100% · 퍼블리싱 40%', team:'기획 · 디자인 · 개발', bg:'#303640', ink:'#fff', accent:'#0877c9', textAccent:'#0867aa', muted:'#d9e0e8',
    problem:'기술력은 있었지만 기존 웹사이트에서는 핵심 사업과 브랜드 신뢰가 충분히 전달되지 않았습니다.', detail:'첫 화면에 사업 분야와 기술 적용 장면을 제시하고, 목적 중심 메뉴와 명확한 정보 위계를 적용했습니다. 데스크톱과 모바일에서 같은 메시지와 CTA가 이어지도록 반응형 경험을 설계했습니다.',
    outcomes:[['59.86% 감소','사이트 이탈률'],['4배 증가','주요 페이지 조회수'],['확대','해외 유입 국가']], outcomeBasis:'리뉴얼 전후 각 3개월 Google Analytics 및 국가별 세션 비교 기준', next:['dashboard','실시간 운영 의사결정 대시보드']
  }
};

const caseStudies = {
  designsystem: {
    insight:'프로젝트마다 달라지는 UI와 반복 수정이 팀의 속도와 브랜드 일관성을 함께 떨어뜨리고 있었습니다.',
    strategyHeadline:'브랜드부터 컴포넌트까지 하나의 규칙과 문서 안에서 재사용하도록 통합했습니다.',
    voice:['협업 과정 분석','“같은 UI도 프로젝트마다 다시 만들고, 변경된 기준을 매번 따로 전달해야 했습니다.”'],
    context:[['사용자','사내 기획자 · 디자이너 · 개발자'],['환경','다수의 웹 플랫폼 프로젝트'],['범위','브랜드 · 파운데이션 · 컴포넌트']],
    pains:[['반복되는 재작업','공통 UI를 프로젝트마다 다시 설계하고 수정했습니다.'],['일관되지 않은 규칙','색상·서체·간격·상태 표현이 제품마다 달랐습니다.'],['분산된 가이드','사용 기준과 최신 자산을 한곳에서 확인하기 어려웠습니다.']],
    strategies:[['01','공통 기반 정의','브랜드와 파운데이션을 먼저 정리해 모든 화면의 기준을 세웠습니다.'],['02','컴포넌트 표준화','상태와 사용 맥락을 포함한 재사용 단위로 UI를 구조화했습니다.'],['03','웹 가이드 구축','팀이 최신 규칙과 리소스를 한곳에서 찾도록 문서화했습니다.']],
    ui:'web', uiTitle:'팀이 함께 쓰고 계속 확장할 수 있는 디자인 기반', uiText:'브랜드, 파운데이션, 컴포넌트와 다운로드 리소스를 하나의 웹 가이드로 연결했습니다.',
    finalVisual:['assets/pp/designsystem/designsystem01.jpg','한맥 디자인 시스템','프로젝트 전반의 디자인 기준과 리소스를 통합한 웹 플랫폼입니다.','landscape'],
    visuals:[['assets/pp/designsystem/designsystem02.jpg','문제 정의와 회고','반복 변경과 일관성 부족을 지속 가능한 시스템의 문제로 재정의'],['assets/pp/designsystem/designsystem03.jpg','디자인 시스템 아웃풋','브랜드·파운데이션·컴포넌트의 실제 가이드 화면']],
    reflection:{learned:'디자인 시스템은 화면 모음이 아니라 팀이 같은 결정을 반복하지 않게 만드는 협업 도구라는 점을 확인했습니다.', next:'사용 빈도와 변경 이력을 수집해 컴포넌트 우선순위와 운영 정책을 더 정교하게 만들겠습니다.'}
  },
  kanvan: {
    insight:'리스트에서는 업무의 상태, 우선순위, 담당자가 흩어져 있어 현재 흐름을 빠르게 읽기 어려웠습니다.',
    strategyHeadline:'업무를 상태별 컬럼과 카드로 재구성하고, 화면에서 바로 흐름을 바꾸도록 설계했습니다.',
    voice:['실무 업무관리 관찰','“업무가 어디까지 진행됐는지 보려면 항목을 하나씩 열어봐야 했습니다.”'],
    context:[['사용자','기획 · 디자인 · 개발 실무자'],['환경','데스크톱 기반 협업 도구'],['검증','실무자 7명 사용성 테스트']],
    pains:[['상태 파악의 어려움','진행·대기·완료 업무가 한 목록에 섞여 있었습니다.'],['우선순위 비교의 어려움','긴급도와 마감일을 빠르게 비교하기 어려웠습니다.'],['협업 정보 분산','담당자·댓글·첨부가 상세 화면에 흩어져 있었습니다.']],
    strategies:[['01','상태 중심 정보 구조','업무를 상태별 컬럼으로 구분해 흐름을 한눈에 보이게 했습니다.'],['02','카드 정보 위계','담당자·우선순위·기한을 열지 않고 확인하도록 정리했습니다.'],['03','직접 조작 인터랙션','드래그앤드롭과 상세 모달로 상태 변경을 짧게 연결했습니다.']],
    ui:'web', uiTitle:'읽는 목록에서 상태가 흐르는 업무 보드로', uiText:'업무 현황을 카드와 컬럼으로 시각화하고 디자인부터 상태 변경 인터랙션까지 직접 구현했습니다.',
    finalVisual:['assets/pp/kanvan/kanvan01.jpg','칸반보드 업무관리 서비스','업무 상태와 다음 행동을 한눈에 보여주는 칸반 경험입니다.','landscape'],
    visuals:[['assets/pp/kanvan/kanvan02.jpg','문제 정의','리스트형 게시판의 상태·우선순위·협업 정보 문제'],['assets/pp/kanvan/kanvan03.jpg','해결 과정','문제 정의부터 UX/UI 설계와 구현·검증까지의 과정'],['assets/pp/kanvan/kanvan04.jpg','Before & After','목록 탐색에서 직접 상태를 변경하는 구조로 전환'],['assets/pp/kanvan/kanvan05.jpg','구현과 회고','드래그앤드롭과 협업 기능 구현 및 후속 검증 과제'],['assets/pp/kanvan/kanvan06.jpg','사용성 테스트 결과','탐색 시간 85% 단축과 과제 성공률 100%를 확인']],
    impact:{type:'depth', label:'사용성 테스트', title:'칸반 구조에서 업무를 찾는 시간이 85% 줄었습니다.', before:'200초', after:'30초', note:'실무자 7명 대상 동일 업무 탐색 과제 · 오클릭 80% 감소 · 과제 성공률 100%'},
    reflection:{learned:'화면의 완성도뿐 아니라 상태·예외·데이터 구조까지 함께 다뤄야 실제로 작동하는 UX가 된다는 점을 배웠습니다.', next:'실제 협업 환경에서 장기 생산성을 검증하고 모바일 대체 인터랙션과 검색·필터·알림을 확장하겠습니다.'}
  },
  skyautonet: {
    insight:'기술력은 있었지만 첫 화면과 정보 구조가 핵심 사업과 브랜드 신뢰를 충분히 전달하지 못했습니다.',
    strategyHeadline:'기술 적용 장면, 목적 중심 정보 구조, 반응형 메시지로 브랜드 신뢰와 접근성을 함께 높였습니다.',
    voice:['기존 사이트·운영 지표 분석','“첫 화면에서 회사가 무엇을 하는지 알기 어렵고 모바일 탐색도 불편했습니다.”'],
    context:[['사용자','자율주행 솔루션 고객 · 글로벌 방문자'],['환경','데스크톱 · 모바일 · 다국어'],['근거','리뉴얼 전후 Google Analytics']],
    pains:[['약한 첫인상','기술 기업의 전문성과 핵심 사업이 첫 화면에서 드러나지 않았습니다.'],['불명확한 정보 구조','중요한 페이지와 정보 우선순위를 파악하기 어려웠습니다.'],['모바일 탐색 단절','작은 화면에서 메시지와 탐색 흐름이 이어지지 않았습니다.']],
    strategies:[['01','기술 맥락 시각화','실제 자율주행 차량과 산업 현장 이미지로 사업 이해를 도왔습니다.'],['02','정보 위계 재설계','제목·수치·CTA의 우선순위를 정리해 핵심을 먼저 읽게 했습니다.'],['03','반응형 경험 통합','화면 크기가 달라도 메시지와 탐색 흐름이 유지되게 했습니다.']],
    ui:'web', uiTitle:'복잡한 자율주행 기술을 이해하고 신뢰하는 웹 경험', uiText:'기술 적용 장면과 핵심 메시지를 연결하고 데스크톱과 모바일의 정보 우선순위를 통합했습니다.',
    finalVisual:['assets/pp/skyautonet/skyautonet01.jpg','스카이오토넷 웹 리디자인','자율주행 기술과 브랜드 메시지를 연결한 반응형 웹 경험입니다.','landscape'],
    visuals:[['assets/pp/skyautonet/skyautonet02.jpg','문제 발견','브랜드 신뢰와 정보 탐색을 함께 저해한 기존 사이트 진단'],['assets/pp/skyautonet/skyautonet03.jpg','목표와 가설','브랜드 신뢰도와 정보 접근성을 동시에 개선하는 가설 설정'],['assets/pp/skyautonet/skyautonet04.jpg','브랜드 비주얼','실제 산업 장면과 명확한 메시지로 기술 신뢰 강화'],['assets/pp/skyautonet/skyautonet05.jpg','정보 위계','제목·수치·CTA를 재정렬해 핵심 정보를 먼저 읽도록 설계'],['assets/pp/skyautonet/skyautonet06.jpg','반응형 UX','화면 크기가 달라도 메시지와 탐색 흐름을 유지'],['assets/pp/skyautonet/skyautonet07.jpg','리뉴얼 성과','이탈률 감소, 페이지 조회 증가, 해외 유입 확대']],
    impact:{type:'depth', label:'운영 성과', title:'리뉴얼 이후 이탈률은 줄고 핵심 페이지 탐색은 늘었습니다.', before:'29.74%', after:'11.94%', note:'이탈률 59.86% 감소 · 주요 페이지 조회수 4배 증가 · 해외 유입 국가 확대'},
    reflection:{learned:'기술 기업의 웹 UX는 기능 설명보다 사용자가 기술의 맥락과 신뢰 근거를 어떤 순서로 이해하는지가 중요했습니다.', next:'국가별 유입 이후의 문의 전환까지 추적해 글로벌 콘텐츠 우선순위를 더 세밀하게 검증하겠습니다.'}
  },
  responsive: {
    insight:'이탈의 원인은 콘텐츠 부족이 아니라, 디바이스마다 달라지는 정보 구조와 느린 탐색 경험이었습니다.',
    strategyHeadline:'솔루션을 이해하고 제품을 비교하는 흐름을 모든 디바이스에서 같은 구조로 연결했습니다.',
    voice:['운영 데이터·경쟁사 분석','“모바일에서는 제품 정보를 비교하기 어렵고, 원하는 솔루션까지 도달하기 전에 페이지를 떠납니다.”'],
    context:[['사용자','글로벌 5G 테스트 솔루션 고객'],['환경','데스크톱 · 태블릿 · 모바일'],['제약','기술 정보량 · 다국어 · 기존 콘텐츠']],
    pains:[['낮은 모바일 사용성','고정형 화면 때문에 작은 디바이스에서 정보 탐색이 어려웠습니다.'],['높은 이탈률','핵심 정보까지 가는 흐름이 길어 방문자가 탐색을 중단했습니다.'],['제품 이해 장벽','기술 중심 설명만으로 제품의 용도와 차이를 파악하기 어려웠습니다.']],
    strategies:[['01','솔루션 중심 정보 구조','제품명이 아니라 해결하려는 테스트 목적에서 탐색을 시작하도록 했습니다.'],['02','메인 배너 최적화','가격·기술 근거·솔루션 방향을 빠르게 비교하는 진입점을 구성했습니다.'],['03','반응형 디자인 시스템','디바이스별 레이아웃과 미디어 쿼리 규칙을 컴포넌트 단위로 정리했습니다.']],
    reframe:{request:'오래된 웹사이트의 화면을 새롭게 리뉴얼', observed:'시각 스타일보다 디바이스별 탐색 단절과 제품 정보의 이해 장벽이 이탈을 만들고 있었습니다.', result:'화면 교체가 아니라 어떤 디바이스에서도 솔루션을 이해하고 제품을 찾는 탐색 경험으로 정의했습니다.'},
    ui:'web', uiTitle:'어떤 화면에서도 이어지는 솔루션 탐색', uiText:'제품·적용 분야·기술 정보를 재구성하고 데스크톱부터 모바일까지 같은 우선순위로 전달했습니다.',
    finalVisual:['assets/cases/responsive-cover.jpg','반응형 웹 리뉴얼 핵심 화면','기술 솔루션의 신뢰감과 제품 탐색성을 함께 높인 반응형 웹 경험입니다.','landscape'],
    visuals:[
      ['assets/pp/tescom/42.jpg','반응형 웹 전면 리뉴얼','데스크톱과 모바일의 경험 불일치를 해소하고 모바일 유입을 되살린 프로젝트 개요'],
      ['assets/pp/tescom/41.jpg','문제 정의와 이탈 지점','첫 화면의 서비스 불명확성, 탐색 유도 부족, 상세 도달 전 이탈을 데이터로 정리'],
      ['assets/pp/tescom/40.jpg','정보 구조 재설계 목표','디바이스와 관계없이 핵심 행동을 파악하도록 정보 위계와 탐색 흐름을 재구성'],
      ['assets/pp/tescom/39.jpg','메인 배너 최적화','브랜드 노출 영역을 제품·솔루션 탐색을 시작하는 진입점으로 전환'],
      ['assets/pp/tescom/38.jpg','반응형 디자인 시스템','단일 코드 기반의 유연한 미디어 쿼리로 웹·태블릿·모바일 경험을 통합'],
      ['assets/pp/tescom/37.jpg','운영 성과','로딩 시간과 이탈률을 낮추고 모바일 사용자 유지율을 높인 결과']
    ],
    impact:{type:'depth', label:'운영 성과', title:'이탈은 줄이고, 제품을 탐색한 뒤 이어지는 행동은 늘었습니다.', before:'11.14%', after:'4.84%', note:'이탈률 6.3%p 감소 · 모바일 로딩 시간 30% 단축 · 모바일 사용자 유지율 25% 증가'},
    reflection:{learned:'반응형 디자인은 화면 크기를 줄이는 작업이 아니라, 어떤 환경에서도 같은 판단 순서를 유지하는 정보 설계라는 점을 확인했습니다.', next:'다시 진행한다면 국가·디바이스별 퍼널을 분리해 콘텐츠 우선순위와 문의 전환의 관계를 더 세밀하게 검증하겠습니다.'}
  },
  psc: {
    insight:'현장의 데이터 오류는 입력 화면의 문제가 아니라 수기 기록과 재입력이 반복되는 업무 구조에서 시작됐습니다.',
    strategyHeadline:'센서 측정부터 분석과 확인까지 데이터를 다시 입력하지 않는 흐름으로 연결했습니다.',
    voice:['현장 업무 분석','“측정값을 종이에 적고 엑셀로 다시 옮기다 보니 오류를 찾는 데 시간이 더 걸립니다.”'],
    context:[['사용자','현장 작업자 · 품질 관리자'],['환경','PSC 제작 현장 · PC · 모바일'],['제약','센서 연동 · 실시간 측정 · 거더별 이력']],
    pains:[['수기 측정·기록','측정 결과를 종이에 적고 다시 전산화해야 했습니다.'],['데이터 오류 위험','반복 입력 과정에서 누락과 오기가 발생할 가능성이 높았습니다.'],['늦은 상태 확인','분석이 끝나기 전에는 곡률 이상을 즉시 파악하기 어려웠습니다.']],
    strategies:[['01','자동 데이터 수집','6개 센서의 측정값을 플랫폼으로 바로 가져오도록 연결했습니다.'],['02','거더 중심 이력 관리','제작·측정·분석 데이터를 거더 단위로 한곳에서 확인하도록 했습니다.'],['03','현장용 모바일 UX','센서 연결 상태와 측정 진행을 현장에서 즉시 확인하도록 큰 조작 영역을 적용했습니다.']],
    reframe:{request:'PSC 측정 결과를 관리하는 화면 구축', observed:'결과 화면만 만들어도 종이 기록과 엑셀 재입력에서 생기는 오류와 지연은 남아 있었습니다.', result:'결과 조회가 아니라 측정부터 분석까지 데이터가 끊기지 않는 현장 플랫폼으로 정의했습니다.'},
    ui:'web', uiTitle:'측정과 분석이 한 흐름으로 이어지는 현장 데이터 플랫폼', uiText:'센서 상태, 거더별 곡률, 측정 이력을 웹과 모바일에서 같은 데이터 기준으로 확인합니다.',
    finalVisual:['assets/cases/psc-cover.jpg','PSC 거더 관리 플랫폼 핵심 화면','거더별 측정·이미지·분석 데이터를 통합한 다크 테마 운영 화면입니다.','landscape'],
    visuals:[
      ['assets/pp/psc/psc-5.jpg','PSC 거더 관리 플랫폼','분산된 거더 공정 데이터를 하나의 웹·앱 흐름으로 연결한 프로젝트 개요'],
      ['assets/pp/psc/psc-4.jpg','디지털 전환 목표','수동 측정의 오류와 지연을 자동화·실시간 모니터링 중심 과제로 정의'],
      ['assets/pp/psc/psc-3.jpg','거더 데이터 입력과 분석','측정값과 곡률 변화를 같은 화면에서 비교하는 PC 관리 화면'],
      ['assets/pp/psc/psc-2.jpg','실시간 곡률 모니터링','6개 센서 데이터와 현장 이미지를 통합해 이상 상태를 빠르게 확인'],
      ['assets/pp/psc/psc-1.jpg','현장 모바일 연동','센서 연결과 측정 진행 상태를 현장에서 확인하는 모바일 애플리케이션'],
      ['assets/pp/psc/psc.jpg','성과와 회고','효율·안전·정보 접근성·데이터 정확도 관점에서 정리한 개선 결과']
    ],
    impact:{type:'workflow', label:'업무 방식 변화', title:'수기 측정과 재입력을 자동 수집과 실시간 분석으로 전환했습니다.', before:'수기 · 엑셀', after:'자동 수집', note:'데이터 정확도 향상 · 작업자 안전성 향상 · 현장 접근성 향상 · 업무 효율 향상'},
    reflection:{learned:'현장 제품의 사용성은 화면 안의 조작뿐 아니라 데이터가 생성되고 전달되는 전체 과정에서 결정된다는 점을 배웠습니다.', next:'운영 로그를 확보한다면 수기 방식 대비 측정 완료 시간과 오류 수정 횟수를 정량화해 자동화 효과를 검증하겠습니다.'}
  },
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
    reframe:{request:'기존 종이 양식을 모바일 화면으로 전환', observed:'입력 화면만 옮기면 장갑·햇빛·서명·현장과 사무실의 단절은 그대로 남았습니다.', result:'문서 디지털화가 아니라 현장에서 기록을 끝내는 연속적인 업무 경험으로 정의했습니다.'},
    iteration:{initial:'종이 양식에 직접 작성하고 사무실에서 다시 취합하는 흐름', feedback:'현장에서는 기록 도구보다 장갑을 낀 상태에서도 바로 완료할 수 있는 큰 조작 영역이 필요했습니다.', final:'현장에서 확인·작성·보고를 완료하는 모바일 흐름', initialImage:'assets/cases/before-tbm.png', finalImage:'assets/cases/after-tbm.png'},
    ui:'phone', uiTitle:'야외 환경에서도 즉시 기록하는 안전관리', uiText:'작성일, 출역 인원과 결재 상태를 한 화면에서 확인하고 바로 기록합니다.',
    finalVisual:['assets/cases/tbm-7.png','현장 안전관리 최종 화면','장갑 착용과 야외 시인성을 고려해 주요 현장 업무를 큰 터치 영역으로 구성했습니다.','portrait'],
    visuals:[
      ['assets/pp/ptc/it/ptc-6.jpg','현장 TBM 기록 전환','작성 중심의 수기 업무를 활용 중심의 모바일 기록 경험으로 바꾼 프로젝트 개요'],
      ['assets/pp/ptc/it/ptc-5.jpg','문제 발견과 UX 목표','누락·분리 저장·확인 지연을 발견하고 작성부터 조회까지의 목표를 설정'],
      ['assets/pp/ptc/it/ptc-4.jpg','행동 흐름 기반 가설','작성·사진 첨부·제출을 하나의 흐름으로 묶어 기록 부담을 줄이는 가설'],
      ['assets/pp/ptc/it/ptc-3.jpg','현장 기록 구조','작성 시간 단축, 사진 누락 방지, 조회와 재활용을 연결한 UX 구조'],
      ['assets/pp/ptc/it/ptc-2.jpg','TBM 핵심 화면','홈에서 오늘의 작업을 확인하고 달력과 작성 화면으로 이어지는 모바일 흐름'],
      ['assets/pp/ptc/it/ptc-1.jpg','사용자 피드백과 결과','관리자 정리 업무 감소와 과거 기록 즉시 검색으로 확인한 개선 효과'],
      ['assets/pp/ptc/it/ptc.jpg','프로젝트 회고','기록을 나중에 다시 찾고 활용할 수 있는 데이터 자산으로 전환한 회고']
    ],
    impact:{type:'workflow', label:'업무 환경 변화', title:'사무실로 돌아가 정리하던 업무를 현장에서 기록하고 바로 활용합니다.', before:'수기 · 분리 저장', after:'검색 가능한 기록', note:'관리자 수기 정리 업무 40% 감소 · 과거 TBM 기록 즉시 검색 · 현장 작성자와 관리자 사용성 개선'},
    reflection:{learned:'종이를 화면으로 옮기는 것보다 기록이 시작되고 끝나는 장소를 먼저 이해해야 했습니다. 야외에서는 작은 효율 차이가 실제 사용 여부를 바꿨습니다.', next:'다시 진행한다면 장갑 착용 상태의 과업 시간과 강한 햇빛 아래 오입력률을 현장에서 더 체계적으로 측정하겠습니다.'}
  },
  intranet: {
    label:'모바일 업무 흐름',
    insight:'핵심은 모바일에서도 볼 수 있는 것이 아니라, 모바일에서 바로 처리할 수 있는 구조였습니다.',
    strategyHeadline:'PC에서 하던 업무를 모바일에서 바로 완료할 수 있는 흐름으로 바꿨습니다.',
    voice:['사용자 인터뷰 요약','“긴급한 결재 하나 때문에 이동 중에도 PC 버전에 다시 로그인해야 했습니다.”'],
    context:[['사용자','사내 임직원 · 결재 담당자'],['환경','PC 인트라넷 · 모바일'],['제약','기존 업무 시스템과 작은 모바일 화면']],
    pains:[['PC 로그인 의존','긴급한 전자결재도 PC 버전에 로그인해야 했습니다.'],['정보 접근 제약','이동 중에는 결재 상태와 회의실 현황 확인이 어려웠습니다.'],['작은 화면 피로','기존 화면을 축소해서 제공해 확대와 이동을 반복해야 했습니다.']],
    strategies:[['01','과업 중심 홈','자주 사용하는 결재와 예약 업무를 첫 화면에서 바로 시작하도록 구성했습니다.'],['02','한 화면 예약','위치, 날짜, 시간을 하나의 흐름 안에서 선택하도록 단순화했습니다.'],['03','모바일 우선 정보','긴 문서보다 사용자의 다음 행동에 필요한 정보를 먼저 노출했습니다.']],
    reframe:{request:'PC 인트라넷의 주요 기능을 모바일에서도 제공', observed:'기능은 보였지만 결재와 예약을 끝내려면 확대·이동하거나 PC로 돌아가야 했습니다.', result:'모바일 열람이 아니라 이동 중에도 핵심 업무를 완료하는 제품으로 정의했습니다.'},
    iteration:{initial:'PC 화면을 축소한 목록·입력 중심 예약 구조', feedback:'사용자는 상세 목록보다 예약 가능한 장소와 시간을 한 화면에서 먼저 확인하고 싶어 했습니다.', final:'위치·날짜·시간과 예약 행동을 한 화면에 연결한 구조', initialImage:'assets/cases/before-intranet.png', finalImage:'assets/cases/after-intranet.png', initialCrop:'left', finalCrop:'right'},
    ui:'booking', uiTitle:'생각하지 않아도 다음 행동이 보이는 예약', uiText:'회의실 현황과 날짜·시간을 한 화면에서 확인하고 최소 단계로 예약합니다.',
    finalVisual:['assets/cases/intranet-7.png','모바일 업무 포털 최종 화면','결재·공지·회의실 등 자주 쓰는 업무를 홈에서 바로 확인하도록 재구성했습니다.','portrait'],
    visuals:[
      ['assets/pp/hanmac/it/hanmac-5.jpg','모바일 업무 흐름 연결','전자결재와 회의실 예약을 모바일에서 이어서 처리하도록 설계한 프로젝트 개요'],
      ['assets/pp/hanmac/it/hanmac-4.jpg','사용자 문제 정의','당일 연차, 회의 연장, 낮은 가독성 등 실제 업무 맥락에서 불편을 구체화'],
      ['assets/pp/hanmac/it/hanmac-3.jpg','핵심 기능과 설계 원칙','전자결재·회의실 신청을 중심으로 큰 글씨와 직관적인 아이콘 원칙을 설정'],
      ['assets/pp/hanmac/it/hanmac-2.jpg','모바일 회의실 예약','위치·예약 현황·날짜·시간을 한 흐름으로 묶어 예약 절차를 2단계로 단축'],
      ['assets/pp/hanmac/it/hanmac-1.jpg','모바일 전자결재','기안·부결 문서를 한눈에 확인하고 복잡한 결재 입력을 모바일에 맞게 단순화'],
      ['assets/pp/hanmac/it/hanmac.jpg','설문조사와 회고','15명 대상 사용성 설문으로 편의성과 고연령층 가독성 개선을 확인']
    ],
    reflection:{learned:'모바일 전환의 기준은 기능 수가 아니라 사용자가 작은 화면에서 업무를 끝낼 수 있는지였습니다. 특히 예약은 정보 조회와 행동을 한 화면에 연결했을 때 가치가 분명해졌습니다.', next:'다음에는 결재와 예약 완료까지의 실제 소요 시간을 기능별로 나눠, 홈의 우선순위를 사용 빈도와 긴급도로 함께 검증하고 싶습니다.'}
  },
  pet: {
    label:'습관 형성 UX',
    insight:'사용자는 기록을 도움 되는 행동보다 귀찮지만 해야 하는 일로 느끼고 있었습니다.',
    strategyHeadline:'기록의 부담은 줄이고 보상은 강화해 반복 행동 구조를 만들었습니다.',
    voice:['사용자 인터뷰 · 프로토타입 테스트','“건강 기록이 중요한 건 알지만, 매번 여러 단계를 입력하는 건 부담스러워요.”'],
    context:[['사용자','반려동물 보호자'],['환경','개인 모바일 서비스'],['검증 범위','기존 서비스 분석 · 프로토타입 테스트']],
    pains:[['깊은 메뉴 구조','기록 기능이 여러 단계 안쪽에 있어 진입 자체가 어려웠습니다.'],['입력 피로','많은 입력 단계와 수동 기록이 반복 사용을 막았습니다.'],['보상 경험 부족','기록 후 즉각적인 피드백이나 변화의 시각화가 없었습니다.'],['사용자 이탈','마찰이 누적되며 기존 서비스 이탈률이 62.4%에 달했습니다.']],
    strategies:[['01','오늘의 기록 요약','사용자가 해야 할 행동과 현재 상태를 한눈에 파악하도록 했습니다.'],['02','한 번 누르는 기록','자주 사용하는 기록은 최소 입력으로 완료하도록 단순화했습니다.'],['03','업적과 리포트','기록이 쌓이는 과정을 보상과 변화로 보여주며 다시 사용할 이유를 만들었습니다.']],
    reframe:{request:'반려동물 건강 기록 기능을 더 편리하게 개선', observed:'단계만 줄여도 기록을 귀찮은 의무로 느끼는 감정은 바뀌지 않았습니다.', result:'입력 기능이 아니라 오늘의 돌봄을 짧게 완료하고 보상받는 습관 경험으로 정의했습니다.'},
    iteration:{initial:'캐릭터와 기록 결과를 중심으로 한 정보 밀도가 낮은 홈', feedback:'사용자는 기록 결과보다 오늘 해야 할 행동과 빠른 입력 진입점을 먼저 찾았습니다.', final:'진행률·빠른 기록·오늘의 일정을 우선 배치한 행동 중심 홈', initialImage:'assets/cases/before-pet.png', finalImage:'assets/cases/after-pet.png'},
    ui:'pet', uiTitle:'기록을 의무가 아닌 일상의 보상으로', uiText:'오늘의 돌봄 진행률과 빠른 기록을 홈에 모아 반복 행동의 부담을 낮췄습니다.',
    finalVisual:['assets/cases/pet-9.png','오늘의 돌봄 최종 화면','진행률·빠른 기록·오늘의 일정을 홈에 모아 반복 기록의 부담을 낮췄습니다.','portrait'],
    visuals:[['assets/cases/pet-4.jpg','핵심 화면 구성','오늘의 기록·빠른 입력·일정·리포트로 정리한 제품 구조'],['assets/cases/pet-6.jpg','Visual System','브랜드 컬러와 카드 레이아웃을 적용한 주요 모바일 UI']],
    impact:{type:'prototype', label:'설계 결과', title:'길었던 기록 흐름을 두 단계로 줄였습니다.', before:'3+ 단계', after:'2단계', note:'프로토타입 과업 테스트 기준 · 참여자 2명 · 정식 사용성 검증 예정'},
    reflection:{learned:'기능을 추가하는 것보다 기록을 시작하기 싫은 감정을 낮추는 일이 먼저였습니다. 빠른 완료와 캐릭터 피드백을 함께 보여줬을 때 다시 써보고 싶다는 반응이 나왔습니다.', next:'현재 테스트 인원이 적어 방향성 확인에 가깝습니다. 다음 단계에서는 1~2주 반복 사용 데이터를 통해 보상이 실제 재방문으로 이어지는지 검증하겠습니다.'}
  }
};

const projectOrder = [
  'dashboard',
  'platform',
  'pet',
  'intranet',
  'tbm',
  'responsive',
  'psc',
  'designsystem',
  'kanvan',
  'skyautonet'
];

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

const renderReflection = (item, number = '08') => item ? `
  <article class="story-section reflection" id="reflection">
    <header><p>${number} 회고</p><h3>이 프로젝트에서 배운 것과 다음에 검증할 것</h3></header>
    <div class="reflection-grid"><div><small>배운 점</small><p>${item.learned}</p></div><div><small>다시 한다면</small><p>${item.next}</p></div></div>
  </article>` : '';

const renderVisuals = (items) => items?.length ? `
  <article class="story-section project-visuals" id="visuals">
    <header><p>실제 설계 화면</p><h3>설계 의도가 제품 화면에 어떻게 적용됐는지 확인했습니다.</h3></header>
    <div class="project-visual-grid">${items.map((item, index) => `
      <figure class="${index === 0 ? 'featured' : ''} ${item[3] || ''}">
        <div class="visual-frame ${item[3] || ''}"><img src="${item[0]}" alt="${item[1]}" loading="lazy" decoding="async"></div>
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
    <div class="strategy-list">${study.strategies.map(x=>`<div><b>${x[0]}</b><h4>${x[1]}</h4><small>선택 이유</small><p>${x[2]}</p></div>`).join('')}</div>
  </article>
  ${renderIteration(study.iteration, study.reframe ? '05' : '04')}
  <article class="story-section solution" id="solution">
    <div class="solution-copy"><p>${study.reframe ? study.iteration ? '06' : '05' : study.iteration ? '05' : '04'} 최종 경험</p><h3>${study.uiTitle}</h3><span>${study.uiText}</span>${study.solutionSteps ? `<ol class="solution-steps">${study.solutionSteps.map(x=>`<li><b>${x[0]}</b><span>${x[1]}</span></li>`).join('')}</ol>` : ''}</div>
    <div class="ui-stage">${renderMockup(study.ui, study.finalVisual)}</div>
  </article>
  ${renderVisuals(study.visuals)}
  ${study.impact ? renderImpact(study.impact, study.reframe ? study.iteration ? '07' : '06' : study.iteration ? '06' : '05') : ''}
  ${renderReflection(study.reflection, study.reframe ? study.iteration ? '08' : study.impact ? '07' : '06' : '08')}`;

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
  document.documentElement.style.setProperty('--case-text-accent',p.textAccent || p.accent);
  document.documentElement.style.setProperty('--case-muted',p.muted);
  document.title = '이한울 UX/UI 디자이너 포트폴리오';
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
  if (p.outcomeBasis) document.querySelector('.outcomes').insertAdjacentHTML('afterend',`<p class="outcome-basis"><b>측정 기준</b>${p.outcomeBasis}</p>`);
  document.querySelector('.gallery').innerHTML=renderStudy(caseStudies[slug]);
  const progressItems = [
    ['overview', '개요'],
    ['context', '배경'],
    ['evidence', '근거'],
    ['reframe', '재정의'],
    ['decision', '결정'],
    ['iteration', '조정'],
    ['solution', '경험'],
    ['impact', '성과'],
    ['reflection', '회고']
  ].filter(([id]) => document.getElementById(id));
  if (progressItems.length) {
    const progressMarkup = progressItems
      .map(([id, label]) => `<a href="#${id}">${label}</a>`)
      .join('');
    document.querySelector('.case-main').insertAdjacentHTML('beforeend',`<nav class="case-progress" aria-label="사례 진행 순서">${progressMarkup}</nav>`);
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
  const currentProjectIndex = projectOrder.indexOf(slug);
  const nextSlug = projectOrder[(currentProjectIndex + 1) % projectOrder.length];
  document.querySelector('.next a').href=`project-${nextSlug}.html`;
  document.querySelector('.next h3').textContent=projects[nextSlug].title;
}
