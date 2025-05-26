document.addEventListener('DOMContentLoaded', () => {
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const hiddenBlogCards = document.querySelectorAll('.hidden-blog-card');

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      const isHidden = hiddenBlogCards[0].style.display === 'none' || hiddenBlogCards[0].style.display === '';
      hiddenBlogCards.forEach(card => {
        card.style.display = isHidden ? 'block' : 'none';
      });
      loadMoreBtn.textContent = isHidden ? 'Load Less' : 'Load More';
    });
  }

  // Hamburger menu toggle
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

  // Smooth scroll animation for nav menu links
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
