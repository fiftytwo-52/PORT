console.log('Script loaded'); // Debug log

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  console.log('Hamburger and mobileNav elements found'); // Debug log

  hamburger.addEventListener('click', () => {
    console.log('Hamburger clicked'); // Debug log
    const isActive = mobileNav.classList.toggle('show');
    hamburger.classList.toggle('active', isActive);
    hamburger.setAttribute('aria-expanded', isActive);
  });

  // Hide mobile nav when clicking outside
  document.addEventListener('click', (event) => {
    const isClickInsideNav = mobileNav.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideNav && !isClickOnHamburger) {
      if (mobileNav.classList.contains('show')) {
        mobileNav.classList.remove('show');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      }
    }
  });
} else {
  console.log('Hamburger or mobileNav element not found'); // Debug log
}

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

// Floating penguin show/hide with random vertical position
const penguin = document.getElementById('floatingPenguin');
if (penguin) {
  penguin.style.display = 'none'; // Initially hidden

  function showPenguin() {
    const windowHeight = window.innerHeight;
    // Random vertical position between 10% and 80% of viewport height
    const randomBottom = Math.floor(Math.random() * (80 - 10 + 1) + 10);
    penguin.style.bottom = randomBottom + 'vh';

    // Remove slide-out class and add slide-in class to trigger animation
    penguin.classList.remove('slide-out');
    penguin.classList.add('slide-in');
    penguin.style.display = 'block';

    // After 3 seconds, start slide-out animation and then hide
    setTimeout(() => {
      penguin.classList.remove('slide-in');
      penguin.classList.add('slide-out');

      // Listen for animation end to hide the penguin
      penguin.addEventListener('animationend', function handleAnimationEnd() {
        penguin.style.display = 'none';
        penguin.removeEventListener('animationend', handleAnimationEnd);
      });
    }, 3000);
  }

  // Show penguin first time after 30 seconds, then every 15 seconds
  setTimeout(() => {
    showPenguin();
    setInterval(showPenguin, 25000);
  }, 40000);
}
