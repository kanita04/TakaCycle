// Mobile menu toggle
const menuBtn = document.querySelector('.menu');
const navLinks = document.getElementById('nav-links');
const navItems = navLinks.querySelectorAll('a');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Auto-close menu on link click (for mobile)
navItems.forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      navLinks.classList.remove('open');
    }
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    navLinks.classList.remove('open');
  }
});

const carousel = document.querySelector('.features-carousel');
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');

btnLeft.addEventListener('click', () => {
  carousel.scrollBy({ left: -carousel.offsetWidth * 0.9, behavior: 'smooth' });
});

btnRight.addEventListener('click', () => {
  carousel.scrollBy({ left: carousel.offsetWidth * 0.9, behavior: 'smooth' });
});

const toggleBtns = document.querySelectorAll('.toggle-btn');
const groups = document.querySelectorAll('.testimonial-group');

toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active state from all buttons
    toggleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show the target group
    const target = btn.dataset.target;
    groups.forEach(group => {
      group.classList.remove('active');
      if (group.id === target) group.classList.add('active');
    });
  });
});

const faqButtons = document.querySelectorAll('.faq-question');

faqButtons.forEach(button => {
  button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    // Reset all
    faqButtons.forEach(btn => {
      btn.setAttribute('aria-expanded', false);
      btn.classList.remove('active-question');
      btn.nextElementSibling.classList.remove('show');
    });

    if (!isExpanded) {
      button.setAttribute('aria-expanded', true);
      button.classList.add('active-question');
      button.nextElementSibling.classList.add('show');
    }
  });
});

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault(); // prevent page refresh

  const email = document.getElementById("email").value.trim();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  // Basic validation
  if (!email || !name || !phone || !message) {
    alert("Please fill in all fields.");
    return;
  }

  // Simple email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Phone format: allow digits, optional +, spaces, dashes
  const phonePattern = /^\+?\d[\d\s-]{6,}$/;
  if (!phonePattern.test(phone)) {
    alert("Please enter a valid phone number.");
    return;
  }

  // Success (mock)
  alert("Thank you! Your message has been submitted.");
  document.getElementById("contact-form").reset();
});

// Visitor Counter using localStorage
const visitDisplay = document.getElementById('visit-count');
let visits = localStorage.getItem('visitCount');

if (!visits) {
  visits = 1;
} else {
  visits = parseInt(visits) + 1;
}

localStorage.setItem('visitCount', visits);
visitDisplay.textContent = `Site Visits: ${visits}`;
