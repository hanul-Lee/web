const projects = {
  intranet: {
    no:'01', type:'B2B SaaS · 모바일 업무 흐름', title:'한맥기술 모바일 인트라넷', lead:'“가능한 기능”에서 “실제로 쓰는 기능”으로. 현장과 사무실의 업무가 끊기지 않도록 전자결재와 회의실 예약을 모바일에서 완결되는 흐름으로 다시 설계했습니다.',
    period:'2023.01 — 2023.06', role:'UX/UI 디자인 100%', cover:1, bg:'#e7eeec', ink:'#172322', accent:'#315f5d', muted:'#516461',
    problem:'모바일로 편하게 결재할 수 있도록, 단순하고 직관적인 디자인을 목표로 삼았습니다.', detail:'사용자가 실제로 자주 쓰는 전자결재·예약 기능에 집중했습니다. 주요 과업의 진입 경로를 짧게 만들고 모바일 전자결재에 맞는 정보 우선순위를 정리해, 어디서든 끊김 없이 업무를 처리할 수 있는 구조를 만들었습니다.',
    outcomes:[['43% 증가','전자결재·예약 사용'],['2.1배','모바일 사용'],['4.6 / 5.0','사용자 만족도']], images:6, next:['dashboard','프로젝트 원가·공수 대시보드']
  },
  dashboard: {
    no:'02', type:'B2B 대시보드 · 데이터 시각화', title:'프로젝트 원가·공수 분석 대시보드', lead:'숫자는 매일 쌓였지만 결정은 매일 늦었습니다. 흩어진 프로젝트 데이터를 역할에 맞춘 실시간 의사결정 화면으로 바꿨습니다.',
    period:'2025.12 — 2026.03', role:'UX/UI · 퍼블리싱 100%', cover:1, bg:'#151d35', ink:'#fff', accent:'#8fa9ff', muted:'#c0c7da',
    problem:'데이터는 충분했습니다. 문제는 그 데이터가 의사결정에 닿지 못한다는 것이었습니다.', detail:'엑셀과 수기 장부로 흩어진 원가·인원 데이터를 하나로 통합하고, 사용자 역할에 따라 필요한 판단 기준을 다른 뷰로 제공했습니다. 색상은 의미 전달에만 쓰고 카드·테이블·차트의 상태 규칙을 시스템화했습니다.',
    outcomes:[['한 화면','핵심 현황 통합'],['역할 기반','사용자별 화면'],['UI 시스템','생성형 AI 협업']], images:6, next:['platform','건설 통합 플랫폼']
  },
  platform: {
    no:'03', type:'다중 사용자 플랫폼 · 정보구조', title:'건설 통합 플랫폼 정보구조 재설계', lead:'사용자가 셋이면 필요한 정보도 셋입니다. 약 60억 원 규모 통합 플랫폼의 다중 사용자 정보구조와 핵심 탐색 흐름을 재설계했습니다.',
    period:'2023.01 — 2023.12', role:'UX/UI 100% · 기획 20%', cover:1, bg:'#1d2024', ink:'#fff', accent:'#ff8b44', muted:'#c7c8ca',
    problem:'원하는 정보를 찾기까지 불필요한 탐색 과정이 많았습니다.', detail:'현장 관리자, 관제 담당자, 일반 사용자의 목표와 언어를 구분해 사용자 모델을 정의했습니다. 지도 기반 시각화와 계층형 업무 구조를 재편하고, 흩어진 공정 데이터를 하나의 흐름으로 연결해 탐색 시간을 줄였습니다.',
    outcomes:[['25% 감소','이탈률'],['30% 향상','전환율'],['우수 프로젝트','내부 평가 선정']], images:8, next:['tbm','TBM 기록 시스템']
  },
  tbm: {
    no:'04', type:'모바일 안전관리 · 신규 구축 및 확장', title:'TBM 안전 기록 시스템', lead:'장갑 낀 손가락으로도, 일부 단계를 건너뛰어도 실수 없이 쓸 수 있는 화면. 종이 서류 중심의 TBM 업무를 현장에서 실제로 쓰이는 모바일 경험으로 전환했습니다.',
    period:'2025.11 — 2026.04', role:'모바일 앱 UX/UI 전담', cover:1, bg:'#16171b', ink:'#fff', accent:'#7692ff', muted:'#c9cbd2',
    problem:'종이 서류에서 디지털로, 현장에서 체감하는 안전관리로.', detail:'수기 기록의 반복 입력, 현장·사무실 간 단절, 긴 점검 절차를 개선했습니다. 엄지손가락 도달 범위와 큰 터치 타깃을 기준으로 모바일 흐름을 설계하고, 서명과 확인 절차를 짧게 연결해 업무 효율과 확장성을 높였습니다.',
    outcomes:[['수기 → 모바일','기록 전환'],['단계 축소','업무 흐름 간결화'],['2번째 회사','서비스 확장']], images:6, next:['pet','댕냥실록']
  },
  pet: {
    no:'05', type:'B2C · 습관 형성 UX', title:'댕냥실록 — 반려동물 건강관리', lead:'반려동물은 왕, 나는 사관입니다. 조선시대 실록 콘셉트로 기록 부담을 낮추고 건강 습관이 자연스럽게 이어지는 경험을 설계했습니다.',
    period:'2026.02 — 진행중', role:'UX 기획 · 브랜딩 · UI 100%', cover:1, bg:'#eee8da', ink:'#20201f', accent:'#81643a', muted:'#665f54',
    problem:'기록은 중요하지만 사용자에게는 번거로운 일입니다.', detail:'“기록해야 한다”는 압박을 “오늘의 실록을 남긴다”는 감성적 보상으로 바꿨습니다. 기록 행동을 최소 단계로 줄이고 캐릭터·문체·시각 언어를 일관되게 설계해, 사용자가 부담 없이 반복할 수 있는 습관 형성 UX를 만들었습니다.',
    outcomes:[['62.4%','기존 앱 사용 이탈'],['45.8초','평균 기록 소요'],['2단계','핵심 기록 플로우']], images:8, next:['intranet','모바일 인트라넷']
  }
};

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
  document.querySelector('.case-cover img').src=`assets/cases/${slug}-${p.cover}.jpg`;
  document.querySelector('.case-cover img').alt=p.title;
  document.querySelector('.problem').textContent=p.problem;
  document.querySelector('.detail').textContent=p.detail;
  document.querySelector('.outcomes').innerHTML=p.outcomes.map(x=>`<div class="outcome"><strong>${x[0]}</strong><span>${x[1]}</span></div>`).join('');
  document.querySelector('.gallery').innerHTML=Array.from({length:p.images-1},(_,i)=>`<img loading="lazy" src="assets/cases/${slug}-${i+2}.jpg" alt="${p.title} 상세 화면 ${i+1}">`).join('');
  document.querySelector('.next a').href=`project-${p.next[0]}.html`;
  document.querySelector('.next h3').textContent=p.next[1];
}
