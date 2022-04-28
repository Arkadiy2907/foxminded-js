'use strict'

document.getElementById("wrap").onclick = function(event) {
  if (event.target.nodeName !== 'SPAN') {
    closeAllSubMenu();
    return;
  };
  event.target.nextElementSibling.classList.toggle('navbar__active');
};

function closeAllSubMenu() {
  const subMenu = document.querySelectorAll('.navbar ul');
  Array.from(subMenu).forEach(item => item.classList.remove('navbar__active'));
};