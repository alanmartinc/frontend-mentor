const menuButton = document.querySelector(".menu-btn");

menuButton.onclick = function () {
  const navBar = document.querySelector(".nav-bar");
  const openMenu = document.querySelector(".open-menu");
  const closeMenu = document.querySelector(".close-menu");
  navBar.classList.toggle("nav-active");
  openMenu.classList.toggle("occult");
  closeMenu.classList.toggle("show");
  document.querySelector(".overlay").classList.toggle("show");
};

const featuresNav = document.querySelector(".features");
const companyNav = document.querySelector(".company");

function changeIconArrow(extraClass) {
  const iconArrowDown = document.querySelector(`.icon-arrow-down${extraClass}`);
  const iconArrowUp = document.querySelector(`.icon-arrow-up${extraClass}`);

  iconArrowDown.classList.toggle("occult");
  iconArrowUp.classList.toggle("show");
}

featuresNav.onclick = function () {
  const dropdownMenu = document.querySelector(".dropdown-menu");
  dropdownMenu.classList.toggle("dropdown-active");
  changeIconArrow("");
};

companyNav.onclick = function () {
  const secondDropdownMenu = document.querySelector(".second");
  secondDropdownMenu.classList.toggle("dropdown-active");
  changeIconArrow("-second");
};
