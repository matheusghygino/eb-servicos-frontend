const backToTopButton = document.querySelector('#back-to-top');

function updateBackToTop() {
  const shouldShow = window.scrollY > 520;
  backToTopButton?.classList.toggle('opacity-0', !shouldShow);
  backToTopButton?.classList.toggle('translate-y-4', !shouldShow);
  backToTopButton?.classList.toggle('pointer-events-none', !shouldShow);
}

backToTopButton?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();
