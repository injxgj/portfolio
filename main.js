'use strict';

// navbar 스크롤 했을 때에 background color 변경해주는 로직
const navBar = document.querySelector('#navbar');
const navbarHeight = navBar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  // 1) scroll이 된다는 이벤트 감지
  // 2) nav높이 만큼 스크롤 되었을 때 시점 잡기
  if (window.scrollY >= navbarHeight) {
    navBar.classList.add('navbar__scroll');
  } else {
    navBar.classList.remove('navbar__scroll');
  }
});
