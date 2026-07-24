// 스크롤 시 등장 애니메이션 (Intersection Observer)
const items = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 }); // 14% 노출 시 작동
items.forEach(item => observer.observe(item));

// 모바일 메뉴 토글
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-header nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('mobile-open', !open);
});

// 히어로 인터랙션 (마우스 반응형 배경 & 키워드 루프)
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hero = document.querySelector('.hero');
const keywords = [...document.querySelectorAll('.flow-keywords span')];

if (!reduceMotion) {
  // 1. 키워드 순환 강조 애니메이션 (1.8초마다)
  let keywordIndex = 0;
  window.setInterval(() => {
    keywords[keywordIndex].classList.remove('active');
    keywordIndex = (keywordIndex + 1) % keywords.length;
    keywords[keywordIndex].classList.add('active');
  }, 1800);

  // 2. 마우스 움직임에 반응하는 배경 패럴랙스 효과
  hero.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return; // 터치 기기에서는 제외
    const rect = hero.getBoundingClientRect();
    // 중심점 기준 좌표 계산 (-0.5 ~ 0.5) 후 가중치 곱함
    const x = ((event.clientX - rect.left) / rect.width - .5) * -12;
    const y = ((event.clientY - rect.top) / rect.height - .5) * -8;
    hero.style.setProperty('--mx', `${x}px`);
    hero.style.setProperty('--my', `${y}px`);
  });

  // 마우스가 영역을 벗어나면 배경 위치 리셋
  hero.addEventListener('pointerleave', () => {
    hero.style.setProperty('--mx', '0px');
    hero.style.setProperty('--my', '0px');
  });
}