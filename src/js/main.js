(function () { 'use strict';

  // Mobile nav
  function navMenu() {
    document.getElementById('navMenu').classList.toggle('active');
    this.classList.toggle('active');
  }
  document.getElementById('navBtn').addEventListener('click', navMenu);

  // Tabs
  function tabs() {

  }

}()); // end 'use strict'