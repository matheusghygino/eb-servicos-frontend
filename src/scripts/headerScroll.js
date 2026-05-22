const header = document.querySelector('[data-header]');
const shell = document.querySelector('[data-header-shell]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const menuBackdrop = document.querySelector('[data-menu-backdrop]');
const menuLinks = document.querySelectorAll('[data-menu-link]');

let lastScrollY = window.scrollY;
let ticking = false;

function setHeaderState() {
  const currentScrollY = window.scrollY;
  const isScrolled = currentScrollY > 12;
  const isGoingDown = currentScrollY > lastScrollY && currentScrollY > 140;

  shell?.classList.toggle('border-border', isScrolled);
  shell?.classList.toggle('bg-white/82', isScrolled);
  shell?.classList.toggle('shadow-soft', isScrolled);
  shell?.classList.toggle('backdrop-blur-xl', isScrolled);
  header?.classList.toggle('-translate-y-full', isGoingDown && menuToggle?.getAttribute('aria-expanded') !== 'true');

  lastScrollY = Math.max(currentScrollY, 0);
  ticking = false;
}

function requestHeaderUpdate() {
  if (!ticking) {
    window.requestAnimationFrame(setHeaderState);
    ticking = true;
  }
}

function closeMenu() {
  menuToggle?.setAttribute('aria-expanded', 'false');
  mobileMenu?.classList.add('translate-y-[-120%]');
  mobileMenu?.classList.remove('translate-y-0');
  menuBackdrop?.classList.add('pointer-events-none', 'opacity-0');
  document.documentElement.classList.remove('overflow-hidden');
}

function toggleMenu() {
  const isOpen = menuToggle?.getAttribute('aria-expanded') === 'true';

  if (isOpen) {
    closeMenu();
    return;
  }

  menuToggle?.setAttribute('aria-expanded', 'true');
  mobileMenu?.classList.remove('translate-y-[-120%]');
  mobileMenu?.classList.add('translate-y-0');
  menuBackdrop?.classList.remove('pointer-events-none', 'opacity-0');
  document.documentElement.classList.add('overflow-hidden');
}

window.addEventListener('scroll', requestHeaderUpdate, { passive: true });
menuToggle?.addEventListener('click', toggleMenu);
menuBackdrop?.addEventListener('click', closeMenu);
menuLinks.forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

setHeaderState();
