
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const isShown = mobileNav.classList.toggle('show');
  hamburger.setAttribute('aria-expanded', isShown);
});

hamburger.addEventListener('keydown', e => {
  if(e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    hamburger.click();
  }
});
