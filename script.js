document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  hamburger.addEventListener('click', () => {
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

  // Floating penguin image animation on right edge
  const floatingPenguin = document.createElement('img');
  floatingPenguin.id = 'floatingPenguin';
  floatingPenguin.src = 'peng.png';
  floatingPenguin.alt = 'Floating Penguin';
  floatingPenguin.style.position = 'fixed';
  floatingPenguin.style.top = '0px';
  floatingPenguin.style.right = '-100px'; // Initially hidden outside right edge
  floatingPenguin.style.width = '80px';
  floatingPenguin.style.height = 'auto';
  floatingPenguin.style.cursor = 'pointer';
  floatingPenguin.style.zIndex = '1000';
  floatingPenguin.style.opacity = '0';
  floatingPenguin.style.transition = 'none';

  document.body.appendChild(floatingPenguin);

  function slideIn() {
    floatingPenguin.style.right = '-100px'; // Start fully outside right edge
    floatingPenguin.style.animation = 'tiltInRight 1s forwards';
    floatingPenguin.style.opacity = '1';
  }

  function slideOut() {
    floatingPenguin.style.animation = 'slideOutNoFade 1s forwards';
    floatingPenguin.style.opacity = '0';
    floatingPenguin.style.right = '-10px';  // Slide out fully outside screen
  }

  function animationCycle() {
    // Hide and move outside right edge, fully hidden
    floatingPenguin.style.animation = '';
    floatingPenguin.style.opacity = '0';
    floatingPenguin.style.right = '-100px';

    // Wait 12 seconds while hidden (15s cycle - 3s visible)
    setTimeout(() => {
      // Set vertical position to a random position along the right edge
      const maxY = window.innerHeight - floatingPenguin.clientHeight;
      const randomY = Math.floor(Math.random() * maxY);
      floatingPenguin.style.top = randomY + 'px';

      // Slide in with tilt effect and show
      slideIn();

      // Wait 3 seconds fully visible before sliding out
      setTimeout(() => {
        // Slide out with tilt effect and show
        slideOut();

        // Wait 1 second for slide out animation to finish
        setTimeout(() => {
          // Repeat the cycle
          animationCycle();
        }, 1000);
      }, 3000);
    }, 12000);
  }

  // Start the animation cycle after initial 30 seconds delay
  setTimeout(() => {
    animationCycle();
  }, 30000);

  // Explicitly ensure prof.jpg image normal position and hover effect
  const profImage = document.querySelector('.image-container img');
  profImage.style.position = 'static';
  profImage.style.left = 'auto';
  profImage.style.opacity = '0.3';
  profImage.style.transition = 'opacity 0.3s ease';
});
