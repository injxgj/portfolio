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
const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click', (e) => {
  navbarMenu.classList.remove('open'); // small device일 때 메뉴 접히도록
  scrollIntoView(e.target.dataset.link); // 해당 페이지로 scroll 되도록
  setActiveNavBtn(e.target.dataset.link.substring(1));
});

// 스크롤된 페이지에 맞게 메뉴 선택되도록
const Top = document.querySelector('#top-bar');
const Bottom = document.querySelector('#bottom-bar');

const homeSection = document.querySelector('#home');
const aboutSection = document.querySelector('#about');
const skillsSection = document.querySelector('#skills');
const workSection = document.querySelector('#work');
// const testimonialsSection = document.querySelector('#testimonials');
const contactSection = document.querySelector('#contact');
// let sectionList = [homeSection, aboutSection, skillsSection, workSection, testimonialsSection, contactSection];
let sectionList = [homeSection, aboutSection, skillsSection, workSection,  contactSection];

let observer = new IntersectionObserver(
  (entries, observer) => {
    const target = entries[0].target;
    const isIntersecting = entries[0].isIntersecting;
    console.log(entries[0]);

    let preActiveNavBtn = document.querySelector('.navbar__menu--item.active');
    let activeNavBtn;

    // 맨 위랑 맨 밑일 경우
    if (window.scrollY === 0) {
      setActiveNavBtn('home');
    } else if (window.scrollY + window.innerHeight === document.body.clientHeight) {
      setActiveNavBtn('contact');
    }
    if (isIntersecting === false && target !== Top && target !== Bottom) {
      // console.log(entries[0]);
      let curIdx = sectionList.indexOf(target);
      // setActiveNavBtn(sectionList[curIdx].id);
      if (entries[0].boundingClientRect.y < 0) {
        // 스크롤 위에서 아래로
        setActiveNavBtn(sectionList[curIdx + 1].id);
      } else {
        // 스크롤 아래서 위로
        setActiveNavBtn(sectionList[curIdx - 1].id);
      }
    }
  },
  { threshold: 0.8 }
);

sectionList.forEach((cur) => {
  observer.observe(cur);
});

observer.observe(Top);
observer.observe(Bottom);

function setActiveNavBtn(targetId) {
  let activeNavBtn = document.querySelector(`[data-link='#${targetId}']`);
  let preActiveNavBtn = document.querySelector('.navbar__menu--item.active');
  preActiveNavBtn && preActiveNavBtn.classList.remove('active');
  activeNavBtn.classList.add('active');
}

// navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
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
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

let activeWork = 'all';
setActiveWorkTab(activeWork);

workBtnContainer.addEventListener('click', (e) => {
  if (e.target.className === 'category__btn' || e.target.className === 'category__count') {
    const active = document.querySelector('.category__btn.active');
    active.classList.remove('active');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode; // Btn안에 있는 span을 클릭햇을 경우 방어로직

    target.classList.add('active');

    projectContainer.classList.add('anim-out');

    setTimeout(() => {
      let targetWork = e.target.dataset.work || e.target.parentNode.dataset.work; // Btn안에 있는 span을 클릭했을 경우 방어로직
      projects.forEach((cur) => {
        if (targetWork === 'all' || targetWork === cur.dataset.type) {
          cur.classList.remove('invisible');
        } else {
          cur.classList.add('invisible');
        }
      });
      projectContainer.classList.remove('anim-out');
    }, 300);
  }
});

const studyBtnContainer = document.querySelector('.study__categories');
function getUrl (target) {
  let url;
  if(target.dataset.study === 'javascript') {
    url = 'https://www.notion.so/d86a1d45469d4ad4a6ab4140cab70a07?v=06948217f6494002bb170eb6fb38140c';
  }else if(target.dataset.study === 'react') {
    url = 'https://www.notion.so/72c61f8bdaca445ebd28ca1cbcd88a16?v=fcb4fe816c05449298e4a0e0a52abfb0';
  } else if (target.dataset.study === 'brower') {
    url = 'https://www.notion.so/c13879ea865c4b2d8f679cf252d9b472?v=e9c995751f9242e2b915ec2c60070b43';
  } else if (target.dataset.study === 'etc') {
    url = 'https://www.notion.so/c5327ce3a32f4e57a5ea886a717c9aaf?v=925b776f02bc49b3b87d6a2a4c8c2b27'
  }
  return url;
}
studyBtnContainer.addEventListener('click', (e) => {
  if (e.target.className === 'category__btn' || e.target.className === 'category__count') {
    const active = document.querySelector('.category__btn.active');
    active.classList.remove('active');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode; // Btn안에 있는 span을 클릭햇을 경우 방어로직

    target.classList.add('active');

    projectContainer.classList.add('anim-out');

    let url = getUrl(target);
    window.open(url);

    setTimeout(() => {
      let targetWork = e.target.dataset.work || e.target.parentNode.dataset.work; // Btn안에 있는 span을 클릭했을 경우 방어로직
      projects.forEach((cur) => {
        if (targetWork === 'all' || targetWork === cur.dataset.type) {
          cur.classList.remove('invisible');
        } else {
          cur.classList.add('invisible');
        }
      });
      projectContainer.classList.remove('anim-out');
    }, 300);
  }
});

function getAcitiveWorkTab() {
  return sessionStorage.getItem('active-work');
}

function setActiveWorkTab(selected) {
  sessionStorage.setItem('active-work', selected);
}

// Modal
const projectsMap = document.querySelector('.work__projects');
projectsMap.addEventListener('click', (e) => {
  const target = projectDivRecursive(e.target);
  const cover = document.querySelector('#cover');
  cover.classList.toggle('hidden');

  const image = document.querySelector('.modal_img');
  image.src = target.dataset.image;

  const title = document.querySelector('.modal_title');
  const name = document.querySelector('.modal_name');
  const path = document.querySelector('.modal_path');
  const description = document.querySelector('.modal_description');

  title.innerText = target.dataset.name + '-' + target.dataset.subname;
  name.innerText = target.dataset.name;
  path.href = target.dataset.path;
  path.innerText = target.dataset.path;
  description.innerText = target.dataset.description;

  document.body.style.overflow = 'hidden';

  console.log(target);
});

const projectDivRecursive = (target) => {
  if (target.className !== 'project') {
    target = projectDivRecursive(target.parentNode);
  }
  return target;
};

const overlay = document.querySelector('.modal_wrapper');
overlay.addEventListener('click', () => {
  const cover = document.querySelector('#cover');
  cover.classList.toggle('hidden');
  document.body.style.overflow = 'visible';
});
