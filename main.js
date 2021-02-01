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

// 메뉴 선택시 해당 페이지로 스크롤
const menu = document.querySelector('.navbar__menu');

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}

menu.addEventListener('click', (e) => {
  scrollIntoView(e.target.dataset.link);
});

// `Contact me` 버튼 클릭 시 이동
const contactMeBtn = document.querySelector('.home__contact');
contactMeBtn.addEventListener('click', (e) => {
  scrollIntoView(e.target.dataset.link);
});
