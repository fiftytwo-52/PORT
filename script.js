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
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isShown);
  });

  hamburger.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      hamburger.click();
    }
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
  // Append penguin inside the div containing the Notes menu item
  const navDiv = document.querySelector('nav div[style*="background-color"]');
  if (navDiv) {
    navDiv.appendChild(floatingPenguin);
  } else {
    document.body.appendChild(floatingPenguin);
  }

    function tiltIn() {
      floatingPenguin.style.animation = 'tiltInRight 0.5s forwards';
    }

    function tiltOut() {
      floatingPenguin.style.animation = 'tiltOutRight 0.5s forwards';
    }

    function moveToEdge() {
      const y = Math.random() * (window.innerHeight - floatingPenguin.clientHeight);
      floatingPenguin.style.right = `-${floatingPenguin.clientWidth / 4}px`;
      floatingPenguin.style.left = '';
      floatingPenguin.style.top = `${y}px`;
      floatingPenguin.classList.remove('peek-left');
      floatingPenguin.classList.add('peek-right');
      floatingPenguin.style.transform = 'translateX(0) scaleX(1)';
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

  // Start the animation cycle after 30 seconds delay initially
  setTimeout(() => {
    floatingPenguin.style.display = 'block';
    moveToEdge();
    animationCycle();
  }, 30000);
  }
});
