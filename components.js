// Shared site chrome. Load before script.js so menu controls exist at initialization.
(() => {
  const isHome = document.body.classList.contains('portfolio-home');
  const homeLink = isHome ? '#top' : 'index.html';
  const sectionLink = (id) => `${isHome ? '' : 'index.html'}#${id}`;
  const pdfLink = 'assets/portfolio.pdf?v=20261025-linked';
  const logo = `<a class="logo" href="${homeLink}">HANUL<span>●</span></a>`;

  document.querySelector('[data-site-header]')?.insertAdjacentHTML('afterbegin', `
    ${logo}
    <nav id="primary-nav" aria-label="주요 메뉴">
      <a href="${sectionLink('work')}">프로젝트</a>
      <a href="${sectionLink('about')}">소개</a>
      <a href="${sectionLink('contact')}">연락처</a>
      <a class="mobile-pdf" href="${pdfLink}" target="_blank" rel="noopener noreferrer">포트폴리오 PDF ↗</a>
    </nav>
    <a class="nav-cta" href="${pdfLink}" target="_blank" rel="noopener noreferrer">포트폴리오 PDF ↗</a>
    <button class="menu" aria-label="메뉴 열기" aria-expanded="false" aria-controls="primary-nav">
      <i></i><i></i>
    </button>
  `);

  document.querySelector('[data-site-footer]')?.insertAdjacentHTML('afterbegin', `
    ${logo}
    <p>© 2026 이한울</p>
    ${isHome ? '<a href="#top">맨 위로 ↑</a>' : ''}
  `);
})();
