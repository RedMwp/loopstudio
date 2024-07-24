let container = document.querySelector('main');
let closeBtn = document.getElementById('close');
let menu = document.querySelector('.menu');
let menuIcon = document.getElementById('menu-icon');

function openMenu() {
  menu.style.bottom = '0';
  menu.style.display = 'flex';
}

function closeMenu() {
  menu.style.bottom = '100%';
  menu.style.display = 'none';
}


closeBtn.onclick = function() {
  closeMenu();
};

menuIcon.onclick = function() {

  openMenu();
};

//smooth scroll

// /
const animator = new SmoothScrollAnimator({
  container: '#cont',
  items: '.item',
  ease: 0.09,
  maxSkew:0,
});