console.log('Script loaded'); // Debug log

// --- Hamburger menu toggle functionality ---
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {
  console.log('Hamburger and mobileNav elements found'); // Debug log

  // Toggle mobile navigation visibility and hamburger icon animation
  hamburger.addEventListener('click', () => {
    console.log('Hamburger clicked'); // Debug log
    // Toggle the 'active' class on mobileNav to trigger slide animation
    const isActive = mobileNav.classList.toggle('active');
    // Toggle 'active' class on hamburger to animate its icon
    hamburger.classList.toggle('active', isActive);
    // Update ARIA-expanded attribute for accessibility
    hamburger.setAttribute('aria-expanded', isActive);
  });

  // Hide mobile nav when clicking outside of it or the hamburger button
  document.addEventListener('click', (event) => {
    const isClickInsideNav = mobileNav.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    // If click is outside both the nav and the hamburger, and the nav is currently open
    if (!isClickInsideNav && !isClickOnHamburger) {
      if (mobileNav.classList.contains('active')) { // Check for 'active' class
        mobileNav.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      }
    }
  });

  // Close mobile nav when a link inside it is clicked (for smooth scrolling)
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

} else {
  console.log('Hamburger or mobileNav element not found'); // Debug log
}

// --- Smooth scroll animation for navigation links ---
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor link behavior
    const targetId = link.getAttribute('href').substring(1); // Get the ID from the href
    const targetElement = document.getElementById(targetId); // Find the target element
    if (targetElement) {
      // Scroll to the target element with smooth behavior
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// --- "Now Hire" button functionality (using custom message box) ---
const nowHireBtn = document.getElementById('nowHireBtn');
const messageBox = document.getElementById('messageBox');
const closeMessageBox = document.getElementById('closeMessageBox');

if (nowHireBtn && messageBox && closeMessageBox) {
  console.log('Now Hire button, message box, and close button found.');

  // Show the message box when "Now Hire" button is clicked
  nowHireBtn.addEventListener('click', () => {
    messageBox.style.display = 'block'; // Show the message box
  });

  // Hide the message box when its close button is clicked
  closeMessageBox.addEventListener('click', () => {
    messageBox.style.display = 'none'; // Hide the message box
  });

  // Hide the message box if clicking outside of it
  document.addEventListener('click', (event) => {
    const isClickInsideMessageBox = messageBox.contains(event.target);
    const isClickOnNowHireBtn = nowHireBtn.contains(event.target);

    if (!isClickInsideMessageBox && !isClickOnNowHireBtn && messageBox.style.display === 'block') {
      messageBox.style.display = 'none';
    }
  });
} else {
  console.log('Now Hire button, message box, or close button not found. Message box functionality disabled.');
}


// --- Floating penguin show/hide with random vertical position ---
const penguin = document.getElementById('floatingPenguin');
if (penguin) {
  penguin.style.display = 'none'; // Initially hidden

  function showPenguin() {
    // Get viewport height to calculate random position
    const windowHeight = window.innerHeight; 
    // Random vertical position between 10% and 80% of viewport height
    const randomBottom = Math.floor(Math.random() * (80 - 10 + 1) + 10);
    penguin.style.bottom = randomBottom + 'vh'; // Set position using vh units

    // Remove slide-out class (if present) and add slide-in class to trigger animation
    penguin.classList.remove('slide-out');
    penguin.classList.add('slide-in');
    penguin.style.display = 'block'; // Make it visible

    // After 3 seconds, start slide-out animation and then hide
    setTimeout(() => {
      penguin.classList.remove('slide-in');
      penguin.classList.add('slide-out');

      // Listen for animation end to hide the penguin completely
      // This ensures the element is hidden only after the slide-out animation completes
      penguin.addEventListener('animationend', function handleAnimationEnd() {
        penguin.style.display = 'none';
        // Remove the event listener to prevent multiple calls
        penguin.removeEventListener('animationend', handleAnimationEnd);
      });
    }, 3000); // Penguin stays on screen for 3 seconds
  }

  // Show penguin first time after 40 seconds, then every 25 seconds
  // This creates a staggered appearance
  setTimeout(() => {
    showPenguin();
    setInterval(showPenguin, 25000); // Repeat every 25 seconds
  }, 40000); // Initial delay of 40 seconds
} else {
  console.log('Floating penguin element not found.'); // Debug log
}

// --- Intersection Observer for Projects and Blogs sections slide-up animation ---
const sectionsToAnimate = document.querySelectorAll('#projects, #blogs');

const observerOptions = {
  root: null, // Use the viewport as the root
  rootMargin: '0px',
  threshold: 0.1 // Trigger when 10% of the section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // If the section is intersecting the viewport, add the 'fade-in-up' class
      entry.target.classList.add('fade-in-up');
      // Stop observing once the animation is triggered
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe each section
sectionsToAnimate.forEach(section => {
  observer.observe(section);
});
