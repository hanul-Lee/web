const reveals = document.querySelectorAll('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('is-pending');
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: .08 });
  reveals.forEach(item => {
    item.classList.add('is-pending');
    observer.observe(item);
    item.addEventListener('focusin', () => item.classList.remove('is-pending'));
  });
}

const menu = document.querySelector('.menu');
const nav = document.querySelector('#primary-nav');
if (menu && nav) {
  const setMenuOpen = (open, restoreFocus = false) => {
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    nav.classList.toggle('mobile-open', open);
    if (open) nav.querySelector('a')?.focus();
    else if (restoreFocus) menu.focus();
  };
  menu.addEventListener('click', () => {
    setMenuOpen(menu.getAttribute('aria-expanded') !== 'true');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    setMenuOpen(false);
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false, true);
    }
  });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target) && !menu.contains(event.target)) setMenuOpen(false);
  });
  document.addEventListener('focusin', event => {
    if (!nav.contains(event.target) && !menu.contains(event.target)) setMenuOpen(false);
  });
  const menuBreakpoint = window.matchMedia('(max-width: 1100px)');
  const resetMenuAtBreakpoint = () => {
    const focusWasInNav = nav.contains(document.activeElement);
    setMenuOpen(false, focusWasInNav && menuBreakpoint.matches);
  };
  if (menuBreakpoint.addEventListener) {
    menuBreakpoint.addEventListener('change', resetMenuAtBreakpoint);
  } else {
    menuBreakpoint.addListener(resetMenuAtBreakpoint);
  }
}
