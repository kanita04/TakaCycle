// Mobile menu toggle
const menuBtn = document.querySelector('.menu');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    navLinks.classList.remove('open');
  }
});
