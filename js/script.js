// плавная прокрутка снизу
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
  anchor.addEventListener('click', function (event) {
    event.preventDefault();
    const blockID = anchor.getAttribute('href');
    document.querySelector('' + blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  })
}

// МЕНЮ БУРГЕР
const iconMenu = document.querySelector('.burger');
const menuBody = document.querySelector('.menu__nav');
const closeMenu = document.querySelector('.close__menu')
// Меню открывается
if (iconMenu) {
  iconMenu.addEventListener('click', function (e) {
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');
    document.body.classList.toggle('_lock');
  });

  // Меню закрывается
  closeMenu.addEventListener('click', function () {
    menuBody.classList.remove('_active');
    document.body.classList.remove('_lock');
  });

}

// Переход к разделам
const menuLinks = document.querySelectorAll('.menu__list-link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menu__link => {
    menu__link.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

      if (iconMenu.classList.contains('_active')) {
        iconMenu.classList.remove('_active');
        menuBody.classList.remove('_active');
        document.body.classList.remove('_lock');
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: 'smooth',
      });
      e.preventDefault();
    }
  }
}

//================================= TO TOP(button)
const scrollTop = document.querySelector('.to__top');

// кнопка появляется, если проскролил больше 700px 
window.onscroll = () => {
  // если проскролили больше 700px, то появляется класс _visible
  if (window.scrollY > 700) {
    scrollTop.classList.add('_visible');
    // если находимся в пределах первых 700px, то класс _visible пропадает
  } else if (window.scrollY < 700) {
    scrollTop.classList.remove('_visible');
  }
};
// при клике на кнопку, поднимает до 0px
scrollTop.addEventListener('click', function () {
  window.scrollTo(0, 0);
});

//================================= ACCORDEON
+function () {

  // (18:27) - функция, которая сразу делает развернутым первый аккордеон
  // function initAccordeon() {
  //   let firstSectionBodyHeight = document.querySelector('.accordeon__section .accordeon__body > *').clientHeight;
  //   document.querySelector('.accordeon__section .accordeon__body').style.maxHeight = firstSectionBodyHeight + 'px';
  // }

  // 16:42
  let accordeonHeaderClickHandler = function (e) {
    // (9:06)
    document.querySelectorAll('.accordeon__section').forEach(function (section) {
      section.querySelector('.accordeon__body').style.maxHeight = '0px';

    });
    // (16:23)
    let accordeonSection = e.target.closest('.accordeon__section');
    // (13:02) + (14:40)
    let insideElHeight = accordeonSection.querySelector('.accordeon__body > *').clientHeight;
    // (7:05)
    accordeonSection.querySelector('.accordeon__body').style.maxHeight = insideElHeight + 'px';
  }
  // (7:05) - при нажатии на какой-то из заголовков, класс _opened перемещается
  document.querySelectorAll('.accordeon__section')
    .forEach(function (section) {
      section.addEventListener('click', accordeonHeaderClickHandler);
    })
}()


