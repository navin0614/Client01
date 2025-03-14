// Mobile menu toggle functionality
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');
const closeBtn = document.getElementById('close-btn');

if (menuIcon && navMenu) {
  menuIcon.addEventListener('click', () => {
    navMenu.classList.add('active');
  });
}
if (closeBtn && navMenu) {
  closeBtn.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
}
