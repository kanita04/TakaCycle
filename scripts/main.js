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

const carousel = document.querySelector('.features-carousel');
const btnLeft = document.querySelector('.carousel-btn.left');
const btnRight = document.querySelector('.carousel-btn.right');

btnLeft.addEventListener('click', () => {
  carousel.scrollBy({ left: -carousel.offsetWidth * 0.9, behavior: 'smooth' });
});

btnRight.addEventListener('click', () => {
  carousel.scrollBy({ left: carousel.offsetWidth * 0.9, behavior: 'smooth' });
});
