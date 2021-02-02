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

menu.addEventListener('click', (e) => {
  scrollIntoView(e.target.dataset.link);
});

// `Contact me` 버튼 클릭 시 이동
const contactMeBtn = document.querySelector('.home__contact');
contactMeBtn.addEventListener('click', (e) => {
  scrollIntoView(e.target.dataset.link);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}

// Home 화면 점점 투명해지도록
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', (e) => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
  console.log(1 - window.scrollY / homeHeight);
});

// Top button
const topBtn = document.querySelector('.top__btn');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    topBtn.classList.add('visible');
  } else {
    topBtn.classList.remove('visible');
  }
});

topBtn.addEventListener('click', (e) => {
  scrollIntoView('#home');
});

// My work 페이지 탭 클릭시에 관련 이미지만 보이도록
const workCategoryList = ['all', 'frontend', 'backend', 'mobile'];
const workList = document.querySelectorAll('.category__btn');
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

let activeWork = 'all';
setActiveWorkTab(activeWork);

workBtnContainer.addEventListener('click', (e) => {
  let targetWork = e.target.dataset.work || e.target.parentNode.dataset.work; // Btn안에 있는 span을 클릭했을 경우 방어로직
  // removeActiveTab();
  // addActiveTab(targetWork);

  projectContainer.classList.add('anim-out');

  setTimeout(() => {
    projects.forEach((cur) => {
      if (targetWork === 'all' || targetWork === cur.dataset.type) {
        cur.classList.remove('invisible');
      } else {
        cur.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});

// function removeActiveTab() {
//   let workIdx = workCategoryList.indexOf(getAcitiveWorkTab());
//   workList[workIdx].classList.remove('active');
// }
// function addActiveTab(next) {
//   setActiveWorkTab(next);
//   let workIdx = workCategoryList.indexOf(next);
//   workList[workIdx].classList.add('active');
// }

function getAcitiveWorkTab() {
  return sessionStorage.getItem('active-work');
}

async function setActiveWorkTab(selected) {
  await sessionStorage.setItem('active-work', selected);
}
