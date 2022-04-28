"use strict";

carouselBikes();

function carouselBikes() {

    const carousel = document.querySelector('.carousel');
    const gallery = carousel.children[0];
    const images = carousel.querySelectorAll('.gallery img');
    const prev = carousel.children[1];
    const next = carousel.children[2];
    const modalWindow = document.querySelector('.modalWindow');
    let modalWindowImg;
    let tooglePauseChangePic = true;
    let namberNowPic = 0;
    let width;
    let delayChangePic = 3000;

    function resizePic() {
        width = carousel.offsetWidth;
        gallery.style.width = width * images.length + 'px';
        images.forEach(item => {
            item.style.width = width + 'px';
            item.style.height = 'auto';
        });
        rollSlider();
    };

    window.addEventListener('resize', resizePic);
    resizePic();

    prev.addEventListener('click', prevClickLeft);
    next.addEventListener('click', nextClickRight);

    function prevClickLeft() {
        namberNowPic--;

        if (namberNowPic < 0) {
            namberNowPic = images.length - 1;
        };

        rollSlider();
    };

    function nextClickRight() {
        namberNowPic++;

        if (namberNowPic >= images.length) {
            namberNowPic = 0;
        };

        rollSlider();
    };

    function rollSlider() {
        gallery.style.left = '-' + namberNowPic * width + 'px';
    };

    gallery.addEventListener('click', zoomPic);

    function zoomPic() {
        modalWindow.style.display = "block";
        tooglePauseChangePic = false;
        modalWindowImg = document.createElement('img');
        modalWindowImg.src = images[namberNowPic].src;

        modalWindow.children[0].appendChild(modalWindowImg);

        window.onclick = function(event) {
            if (event.target == modalWindow) {
                picClose();
            };
        };
    };

    function picClose() {
        modalWindow.style.display = "none";
        modalWindowImg.remove();
        tooglePauseChangePic = true;
    };

    setTimeout(function threeSecondsNextPic() {

        if (tooglePauseChangePic) {
            next.click();
        } else {
            next.click();
            prev.click();
        }

        setTimeout(threeSecondsNextPic, delayChangePic);

    }, delayChangePic);

};