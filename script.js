const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: .12 });
reveals.forEach(item => observer.observe(item));

const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav nav');
if (menu && nav) menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  menu.setAttribute('aria-label', open ? '메뉴 열기' : '메뉴 닫기');
  nav.classList.toggle('mobile-open', !open);
});

if (nav) nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('mobile-open');
  if (menu) {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', '메뉴 열기');
  }
}));
