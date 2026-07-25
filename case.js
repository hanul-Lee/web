const projects = {
  intranet: {
    no:'04', type:'B2B SaaS · 모바일 업무 흐름', title:'한맥기술 모바일 인트라넷', lead:'“가능한 기능”에서 “실제로 쓰는 기능”으로. 현장과 사무실의 업무가 끊기지 않도록 전자결재와 회의실 예약을 모바일에서 완결되는 흐름으로 다시 설계했습니다.',
    period:'2023.01 — 2023.06', role:'UX 전략 · 정보구조 · UI 디자인', contribution:'100%', team:'기획자 · 디자이너 · 개발자', cover:1, bg:'#e7eeec', ink:'#172322', accent:'#315f5d', muted:'#516461',
    problem:'모바일로 편하게 결재할 수 있도록, 단순하고 직관적인 디자인을 목표로 삼았습니다.', detail:'사용자가 실제로 자주 쓰는 전자결재·예약 기능에 집중했습니다. 주요 과업의 진입 경로를 짧게 만들고 모바일 전자결재에 맞는 정보 우선순위를 정리해, 어디서든 끊김 없이 업무를 처리할 수 있는 구조를 만들었습니다.',
    outcomes:[['43% 증가','전자결재·예약 사용'],['2.1배','모바일 사용'],['4.6 / 5.0','사용자 만족도']], images:6, next:['dashboard','프로젝트 원가·공수 대시보드']
  },
  dashboard: {
    no:'02', type:'B2B 대시보드 · 데이터 시각화', title:'프로젝트 원가·공수 분석 대시보드', lead:'숫자는 매일 쌓였지만 결정은 매일 늦었습니다. 흩어진 프로젝트 데이터를 역할에 맞춘 실시간 의사결정 화면으로 바꿨습니다.',
    period:'2025.12 — 2026.03', role:'데이터 UX · UI 디자인 · 퍼블리싱', contribution:'100%', team:'기획자 · 디자이너 · 개발자', cover:1, bg:'#151d35', ink:'#fff', accent:'#8fa9ff', muted:'#c0c7da',
    problem:'데이터는 충분했습니다. 문제는 그 데이터가 의사결정에 닿지 못한다는 것이었습니다.', detail:'엑셀과 수기 장부로 흩어진 원가·인원 데이터를 하나로 통합하고, 사용자 역할에 따라 필요한 판단 기준을 다른 뷰로 제공했습니다. 색상은 의미 전달에만 쓰고 카드·테이블·차트의 상태 규칙을 시스템화했습니다.',
    outcomes:[['한 화면','핵심 현황 통합'],['역할 기반','사용자별 화면'],['UI 시스템','생성형 AI 협업']], images:6, next:['platform','건설 통합 플랫폼']
  },
  platform: {
    no:'01', type:'다중 사용자 플랫폼 · 정보구조', title:'건설 통합 플랫폼 정보구조 재설계', lead:'사용자가 셋이면 필요한 정보도 셋입니다. 약 60억 원 규모 통합 플랫폼의 다중 사용자 정보구조와 핵심 탐색 흐름을 재설계했습니다.',
    period:'2023.01 — 2023.12', role:'UX 전략 · 정보구조 · UI · 디자인 시스템', contribution:'90%', team:'기획 · UX/UI · 프론트엔드 · 백엔드 · BIM', cover:1, bg:'#1d2024', ink:'#fff', accent:'#ff8b44', muted:'#c7c8ca',
    problem:'원하는 정보를 찾기까지 불필요한 탐색 과정이 많았습니다.', detail:'현장 관리자, 관제 담당자, 일반 사용자의 목표와 언어를 구분해 사용자 모델을 정의했습니다. 지도 기반 시각화와 계층형 업무 구조를 재편하고, 흩어진 공정 데이터를 하나의 흐름으로 연결해 탐색 시간을 줄였습니다.',
    outcomes:[['5.4 → 2','평균 탐색 깊이'],['25% 감소','이탈률'],['30% 향상','전환율']], images:8, next:['tbm','TBM 기록 시스템']
  },
  tbm: {
    no:'03', type:'모바일 안전관리 · 신규 구축 및 확장', title:'TBM 안전 기록 시스템', lead:'장갑 낀 손가락으로도, 일부 단계를 건너뛰어도 실수 없이 쓸 수 있는 화면. 종이 서류 중심의 TBM 업무를 현장에서 실제로 쓰이는 모바일 경험으로 전환했습니다.',
    period:'2025.11 — 2026.04', role:'현장 조사 · 모바일 UX/UI', contribution:'UX/UI 전담', team:'기획자 · 디자이너 · 개발자', cover:1, bg:'#16171b', ink:'#fff', accent:'#7692ff', muted:'#c9cbd2',
    problem:'종이 서류에서 디지털로, 현장에서 체감하는 안전관리로.', detail:'수기 기록의 반복 입력, 현장·사무실 간 단절, 긴 점검 절차를 개선했습니다. 엄지손가락 도달 범위와 큰 터치 타깃을 기준으로 모바일 흐름을 설계하고, 서명과 확인 절차를 짧게 연결해 업무 효율과 확장성을 높였습니다.',
    outcomes:[['Paper → Mobile','작성 방식'],['PC Only → Field Ready','업무 환경'],['1st → 2nd Company','확장 적용']], images:6, next:['pet','댕냥실록']
  },
  pet: {
    no:'05', type:'PERSONAL PRODUCT PROJECT · B2C · 습관 형성 UX', title:'댕냥실록 — 반려동물 건강관리', lead:'반려동물은 왕, 나는 사관입니다. 조선시대 실록 콘셉트로 기록 부담을 낮추고 건강 습관이 자연스럽게 이어지는 경험을 설계했습니다.',
    period:'2026.02 — 진행중', role:'UX 전략 · 브랜딩 · UI 디자인', contribution:'100%', team:'개인 프로젝트', cover:1, bg:'#eee8da', ink:'#20201f', accent:'#81643a', muted:'#665f54',
    problem:'기록은 중요하지만 사용자에게는 번거로운 일입니다.', detail:'“기록해야 한다”는 압박을 “오늘의 실록을 남긴다”는 감성적 보상으로 바꿨습니다. 기록 행동을 최소 단계로 줄이고 캐릭터·문체·시각 언어를 일관되게 설계해, 사용자가 부담 없이 반복할 수 있는 습관 형성 UX를 만들었습니다.',
    outcomes:[['62.4%','기존 앱 사용 이탈'],['45.8초','평균 기록 소요'],['2단계','핵심 기록 플로우']], images:8, next:['intranet','모바일 인트라넷']
  }
};

const caseStudies = {
  platform: {
    label:'정보구조 재설계',
    insight:'문제는 정보량이 아니라, 사용자마다 필요한 정보와 탐색 목적이 다르다는 것이었습니다.',
    strategyHeadline:'사용자별 탐색 목적을 기준으로 정보 구조를 재편했습니다.',
    voice:['사내 관계자 VOC','“메뉴 구조가 복잡해서 필요한 정보를 어디서 찾아야 할지 어렵습니다.”'],
    pains:[['복잡한 메뉴 구조','업무 흐름과 다른 메뉴 때문에 정보 탐색에 평균 5.4단계가 필요했습니다.'],['위치 맥락 부재','텍스트 위주의 화면에서는 공정과 현장의 관계를 한눈에 파악하기 어려웠습니다.'],['분산된 데이터','공정·CCTV·BIM 데이터가 여러 시스템과 파일로 흩어져 있었습니다.']],
    strategies:[['01','업무 목적 중심 진입','메뉴명이 아닌 사용자의 과업을 기준으로 진입 구조를 다시 설계했습니다.'],['02','지도 기반 시각화','위치 맥락이 필요한 정보를 지도 위에 통합했습니다.'],['03','끊기지 않는 흐름','조회부터 협업까지 하나의 업무 흐름으로 연결했습니다.']],
    ui:'map', uiTitle:'분산된 현장 정보를 하나의 지도에서', uiText:'현장 위치, 공정 상태와 주요 알림을 같은 맥락에서 탐색하도록 구성했습니다.',
    impact:{type:'depth', label:'탐색 구조 검증', title:'정보에 도달하는 경로를 절반 이하로 줄였습니다.', before:'5.4', after:'2', note:'Average navigation depth'}
  },
  dashboard: {
    label:'데이터 UX',
    insight:'데이터는 충분했습니다. 문제는 그 데이터가 의사결정에 닿지 못한다는 것이었습니다.',
    strategyHeadline:'숫자를 나열하는 대신 이상 징후를 먼저 발견하는 화면으로 재구성했습니다.',
    voice:['실무자 인터뷰 요약','“현황을 파악하려면 엑셀을 다시 모아야 해서, 위험을 발견했을 때는 이미 늦습니다.”'],
    pains:[['수동 취합','프로젝트별 투입 공수와 원가를 매번 수작업으로 모아야 했습니다.'],['리스크 인지 실패','초과 공수와 공기 지연의 패턴을 사전에 발견하기 어려웠습니다.'],['반복 보고서','경영진 보고용 자료를 별도 문서로 다시 만들어야 했습니다.']],
    strategies:[['01','역할별 관점','경영진과 실무자가 서로 다른 판단 기준을 볼 수 있도록 나눴습니다.'],['02','상태 규칙 통합','필터 변경 시 모든 컴포넌트가 같은 기준으로 갱신되도록 설계했습니다.'],['03','위험 신호 강조','게이지와 수치를 함께 사용해 임계치를 넘는 순간이 바로 보이게 했습니다.']],
    ui:'dashboard', uiTitle:'나열이 아니라 리스크의 패턴을 읽는 화면', uiText:'원가, 공수, 진행률을 한 화면에 연결하고 위험 상태에만 색을 사용했습니다.',
    impact:{type:'risk', label:'판단 방식 변화', title:'보고서를 만든 뒤 확인하던 위험을, 화면에서 먼저 발견합니다.', before:'수동 취합', after:'실시간 감지', note:'Spreadsheet reporting → Live risk signal'}
  },
  tbm: {
    label:'현장 중심 모바일 UX',
    insight:'디지털 전환의 핵심은 종이를 없애는 것이 아니라, 현장에서 기록이 끊기지 않게 하는 것이었습니다.',
    strategyHeadline:'현장 작업이 끊기지 않도록 기록 동선을 최소 단계로 재설계했습니다.',
    voice:['현장 사용자 피드백 요약','“장갑을 벗고 사무실 PC로 돌아가야 기록할 수 있으면 현장에서는 결국 종이를 씁니다.”'],
    pains:[['수기 서류 반복','매일 종이를 작성하고 다시 취합하면서 분실과 보고 지연이 발생했습니다.'],['현장·사무실 단절','사진과 서명 전달이 늦어 사고 발생 시 즉시 대응하기 어려웠습니다.'],['낮은 접근성','PC 웹만 존재해 야외 현장 작업자의 활용률이 낮았습니다.'],['다중 현장 확장','회사와 현장이 늘어나도 같은 규칙으로 운영할 구조가 필요했습니다.']],
    strategies:[['01','큰 터치 영역','장갑을 낀 손으로도 누를 수 있는 크기와 간격을 적용했습니다.'],['02','고명암 시각 체계','강한 햇빛 아래에서도 상태와 버튼이 구분되도록 설계했습니다.'],['03','짧은 기록 흐름','확인·서명·보고 단계를 한 화면 흐름으로 연결했습니다.']],
    ui:'phone', uiTitle:'야외 환경에서도 즉시 기록하는 안전관리', uiText:'작성일, 출역 인원과 결재 상태를 한 화면에서 확인하고 바로 기록합니다.',
    impact:{type:'workflow', label:'업무 환경 변화', title:'사무실로 돌아가 기록하던 업무를 현장에서 바로 완료합니다.', before:'종이 · PC', after:'현장 모바일', note:'Paper & PC only → Field-ready mobile'}
  },
  intranet: {
    label:'모바일 업무 흐름',
    insight:'핵심은 모바일에서도 볼 수 있는 것이 아니라, 모바일에서 바로 처리할 수 있는 구조였습니다.',
    strategyHeadline:'PC에서 하던 업무를 모바일에서 바로 완료할 수 있는 흐름으로 바꿨습니다.',
    voice:['사용자 인터뷰 요약','“긴급한 결재 하나 때문에 이동 중에도 PC 버전에 다시 로그인해야 했습니다.”'],
    pains:[['PC 로그인 의존','긴급한 전자결재도 PC 버전에 로그인해야 했습니다.'],['정보 접근 제약','이동 중에는 결재 상태와 회의실 현황 확인이 어려웠습니다.'],['작은 화면 피로','기존 화면을 축소해서 제공해 확대와 이동을 반복해야 했습니다.']],
    strategies:[['01','과업 중심 홈','전자결재와 회의실 예약을 첫 화면에서 바로 시작하도록 했습니다.'],['02','한 화면 예약','위치·시간·현황·예약 행동을 한 흐름에 배치했습니다.'],['03','모바일 우선 정보','긴 문서에서 판단에 필요한 정보부터 먼저 보여줬습니다.']],
    ui:'booking', uiTitle:'생각하지 않아도 다음 행동이 보이는 예약', uiText:'회의실 현황과 날짜·시간을 한 화면에서 확인하고 최소 단계로 예약합니다.'
  },
  pet: {
    label:'습관 형성 UX',
    insight:'사용자는 기록을 도움 되는 행동보다 귀찮지만 해야 하는 일로 느끼고 있었습니다.',
    strategyHeadline:'기록의 부담은 줄이고 보상은 강화해 반복 행동 구조를 만들었습니다.',
    voice:['사용자 인터뷰 · 프로토타입 테스트','“건강 기록이 중요한 건 알지만, 매번 여러 단계를 입력하는 건 부담스러워요.”'],
    pains:[['깊은 메뉴 구조','기록 기능이 여러 단계 안쪽에 있어 진입 자체가 어려웠습니다.'],['입력 피로','많은 입력 단계와 수동 기록이 반복 사용을 막았습니다.'],['보상 경험 부족','기록 후 즉각적인 피드백이나 변화의 시각화가 없었습니다.'],['사용자 이탈','마찰이 누적되며 기존 서비스 이탈률이 62.4%에 달했습니다.']],
    strategies:[['01','오늘의 기록 요약','식사·산책·배변 상태를 홈에서 바로 확인합니다.'],['02','한 번 누르는 기록','자주 쓰는 행동은 한 번의 탭으로 남길 수 있게 했습니다.'],['03','일정과 리포트','기록이 건강 변화와 관리 일정으로 이어지도록 했습니다.']],
    ui:'pet', uiTitle:'기록을 의무가 아닌 일상의 보상으로', uiText:'오늘의 돌봄 진행률과 빠른 기록을 홈에 모아 반복 행동의 부담을 낮췄습니다.'
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

const renderMockup = (type) => {
  if (type === 'map') return `<div class="mock-window map-ui"><div class="mock-top"><i></i><i></i><i></i><span>건설 통합 플랫폼 · 현장 관제</span></div><div class="map-product"><aside><b>HANUL MAP</b><span class="active">통합 현황</span><span>공정 관리</span><span>CCTV</span><span>BIM 데이터</span></aside><div class="map-workspace"><div class="map-filter"><strong>전체 현장</strong><span>공정률 순 · 최신 데이터</span></div><div class="map-canvas"><span class="route r1"></span><span class="route r2"></span><b class="pin p1"></b><b class="pin p2"></b><b class="pin p3"></b><div class="map-panel"><small>구리-포천 3공구</small><strong>78%</strong><span>공정 정상 · 알림 2건</span><button>현장 상세 보기 →</button></div></div></div></div></div>`;
  if (type === 'dashboard') return `<div class="mock-window dashboard-ui"><div class="mock-side"><b>ERP</b><i></i><i></i><i></i></div><div class="mock-main"><div class="mock-filter"><span>전체 프로젝트</span><span>2026.07</span></div><div class="kpi-row"><div><small>총 원가</small><b>₩ 4.2B</b></div><div><small>공수율</small><b>82%</b></div><div class="risk"><small>위험 프로젝트</small><b>03</b></div></div><div class="chart"><i style="--h:42%"></i><i style="--h:65%"></i><i style="--h:53%"></i><i class="hot" style="--h:88%"></i><i style="--h:72%"></i><i style="--h:57%"></i></div></div></div>`;
  const title = type === 'booking' ? '회의실 예약' : type === 'pet' ? '오늘의 돌봄' : 'TBM 안전관리';
  const color = type === 'pet' ? 'pet-ui' : type === 'booking' ? 'booking-ui' : 'safety-ui';
  return `<div class="phone-shell ${color}"><div class="phone-bar"><span>9:41</span><i></i></div><div class="phone-head"><small>HANUL UX</small><h4>${title}</h4></div><div class="phone-progress"><span></span></div><div class="phone-card"><small>${type === 'booking' ? '예약 가능한 회의실' : type === 'pet' ? '오늘의 기록 진행률' : '금일 출역 인원'}</small><strong>${type === 'booking' ? '회의실 A · 09:00' : type === 'pet' ? '3 / 5 완료' : '24명'}</strong></div><div class="phone-grid"><span>${type === 'booking' ? '날짜' : '확인'}</span><span>${type === 'booking' ? '시간' : '기록'}</span><span>${type === 'booking' ? '인원' : '보고'}</span></div><button>${type === 'booking' ? '예약하기' : '작성하기'}</button></div>`;
};

const renderStudy = (study) => `
  <article class="story-section evidence">
    <header><p>${study.label} · 01 PROBLEM</p><h3>${study.insight}</h3></header>
    <blockquote class="user-voice"><span>${icon('voice')}</span><div><small>${study.voice[0]}</small><p>${study.voice[1]}</p></div></blockquote>
    <div class="evidence-grid">${study.pains.map((x,i)=>`<div><span>${icon(['search','flow','data','action'][i%4])}</span><small>0${i+1}</small><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join('')}</div>
  </article>
  <article class="story-section strategy">
    <header><p>${study.label} · 02 STRATEGY</p><h3>${study.strategyHeadline}</h3></header>
    <div class="strategy-list">${study.strategies.map(x=>`<div><b>${x[0]}</b><h4>${x[1]}</h4><p>${x[2]}</p></div>`).join('')}</div>
  </article>
  <article class="story-section solution">
    <div class="solution-copy"><p>${study.label} · 03 SOLUTION</p><h3>${study.uiTitle}</h3><span>${study.uiText}</span></div>
    <div class="ui-stage">${renderMockup(study.ui)}</div>
  </article>
  ${study.impact ? renderImpact(study.impact) : ''}`;

const renderImpact = (impact) => `
  <article class="story-section impact impact-${impact.type}">
    <header><p>${impact.label} · 04 IMPACT</p><h3>${impact.title}</h3></header>
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
  document.querySelector('.case-eyebrow').textContent=`프로젝트 ${p.no} · ${p.type}`;
  document.querySelector('.case-title').textContent=p.title;
  document.querySelector('.case-lead').textContent=p.lead;
  document.querySelector('.period').textContent=p.period;
  document.querySelector('.role').textContent=p.role;
  document.querySelector('.contribution').textContent=p.contribution;
  document.querySelector('.team').textContent=p.team;
  document.querySelector('.case-cover').innerHTML=renderMockup(caseStudies[slug].ui);
  document.querySelector('.problem').textContent=p.problem;
  document.querySelector('.detail').textContent=p.detail;
  document.querySelector('.outcomes').innerHTML=p.outcomes.map(x=>`<div class="outcome"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join('');
  document.querySelector('.gallery').innerHTML=renderStudy(caseStudies[slug]);
  document.querySelector('.next a').href=`project-${p.next[0]}.html`;
  document.querySelector('.next h3').textContent=p.next[1];
}
