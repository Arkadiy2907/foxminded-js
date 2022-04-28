'use strict'

const wrap = document.querySelector('.wrap');
const arrChildren = wrap.children;
const arrHeadine = [];

for (let index = 0; index < arrChildren.length; index++) {
  let strHeadings = String(arrChildren[index].classList);
  let str = strHeadings.substring(0, strHeadings.indexOf(" "));
  if (str == 'wrap__headine') {
    arrHeadine.push(arrChildren[index]);
  };
};

const rectWrap = wrap.getBoundingClientRect().top;
const resultTop = [];

for (let i = 0; i < arrHeadine.length; i++) {
  resultTop.push(arrHeadine[i].getBoundingClientRect().top - rectWrap);
};

wrap.addEventListener('scroll', function() {

  for (let index = 0; index < arrHeadine.length; index++) {
    if (wrap.scrollTop > (resultTop[index])) {
      arrHeadine[index].style.position = 'sticky';
      arrHeadine[index].style.top = 0;
    } else {
      arrHeadine[index].style.position = 'static';
    };
  };
});