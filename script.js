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
  }
);

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

  // Only run penguin animation on homepage
  if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
  // Floating penguin image
  const floatingPenguin = document.createElement('img');
  floatingPenguin.id = 'floatingPenguin';
  floatingPenguin.src = 'peng.png';
  floatingPenguin.alt = 'Floating Penguin';
  // Flip image horizontally at first time
  floatingPenguin.style.transform = 'translateX(0) scaleX(-1)';
  floatingPenguin.style.display = 'none'; // Hide initially

    // Append penguin inside the nav element
    const navElement = document.querySelector('nav');
    if (navElement) {
      navElement.appendChild(floatingPenguin);
      console.log('Appended floatingPenguin inside nav element');
    } else {
      document.body.appendChild(floatingPenguin);
      console.log('Appended floatingPenguin inside body');
    }

  function tiltIn() {
    floatingPenguin.style.animation = 'tiltInRight 0.5s forwards';
    floatingPenguin.style.opacity = '1';
  }

  function tiltOut() {
    floatingPenguin.style.animation = 'tiltOutRight 0.5s forwards';
    floatingPenguin.style.opacity = '0';
  }

  function moveToEdge() {
    const x = Math.random() * (window.innerWidth - floatingPenguin.clientWidth);
    const y = Math.random() * (window.innerHeight - floatingPenguin.clientHeight);
    floatingPenguin.style.left = `${x}px`;
    floatingPenguin.style.top = `${y}px`;
    floatingPenguin.style.right = '';
    floatingPenguin.classList.remove('peek-left');
    floatingPenguin.classList.add('peek-right');
    floatingPenguin.style.transform = 'translateX(0) scaleX(1)';
    console.log(`Moved floatingPenguin to random position: left ${floatingPenguin.style.left}, top ${floatingPenguin.style.top}`);
  }

  function animationCycle() {
    tiltIn();
    setTimeout(() => {
      tiltOut();
      setTimeout(() => {
        moveToEdge();
        setTimeout(() => {
          animationCycle();
        }, 9000);
      }, 6000);
    }, 3000);
  }

  // Start the animation cycle after 1 second delay for quicker testing
  setTimeout(() => {
    floatingPenguin.style.display = 'block';
    moveToEdge();
    animationCycle();
  }, 1000);
  }
});
