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

  // Quiz form submission and result calculation
  const quizForm = document.getElementById('quizForm');
  const resultDiv = document.getElementById('result');

  // Correct answers mapping (question name -> correct option value)
  const correctAnswers = {
    q1: 'a',
    q2: 'c',
    q3: 'b',
    q4: 'c',
    q5: 'd',
    q6: 'b',
    q7: 'c',
    q8: 'b',
    q9: 'c',
    q10: 'a',
    q11: 'd',
    q12: 'c',
    q13: 'c',
    q14: 'c',
    q15: 'b',
    q16: 'd',
    q17: 'c',
    q18: 'b',
    q19: 'c',
    q20: 'b'
  };

  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let score = 0;
    let total = Object.keys(correctAnswers).length;
    let unanswered = [];
    let wrongAnswers = [];

    for (let q in correctAnswers) {
      const selected = quizForm.elements[q].value;
      if (!selected) {
        unanswered.push(q);
      } else if (selected === correctAnswers[q]) {
        score++;
      } else {
        wrongAnswers.push(q);
      }
    }

    let resultHTML = '';
    if (unanswered.length > 0) {
      resultHTML += `<p>Please answer all questions. You left ${unanswered.length} unanswered.</p>`;
    } else {
      resultHTML += `<h2>Your Score: ${score} / ${total}</h2>`;
      if (wrongAnswers.length > 0) {
        resultHTML += `<h3>Incorrect Answers:</h3><ul>`;
        wrongAnswers.forEach(q => {
          const correctOption = correctAnswers[q].toUpperCase();
          resultHTML += `<li>Question ${q.substring(1)}: Correct answer is option ${correctOption}</li>`;
        });
        resultHTML += `</ul>`;
      }
    }
    resultDiv.innerHTML = resultHTML;
    resultDiv.scrollIntoView({ behavior: 'smooth' });
  });

  // Password form handling
  const passwordForm = document.getElementById('passwordForm');
  const passwordInput = document.getElementById('passwordInput');
  const passwordError = document.getElementById('passwordError');

  passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = passwordInput.value;
    if (password === 'wac8') {
      passwordError.style.display = 'none';
      passwordForm.style.display = 'none';
      quizForm.style.display = 'block';
    } else {
      passwordError.style.display = 'block';
    }
  });
});
