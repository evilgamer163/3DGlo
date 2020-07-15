'use strict';

const slider = () => {
    const slider = document.querySelector('.portfolio-content'),
        slide = document.querySelectorAll('.portfolio-item'),
        portfolioDots = document.querySelector('.portfolio-dots');

    let currentSlide = 0,
        interval,
        dot;

    const addDots = () => {
        let arrayDots = [];
        arrayDots.length = slide.length;
        for(let i = 0; i < arrayDots.length; i++) {
            arrayDots[i] = document.createElement('li');
            arrayDots[i].classList.add('dot');
            portfolioDots.append(arrayDots[i]);
        }
        dot = portfolioDots.querySelectorAll('.dot');
        dot[0].classList.add('dot-active');
    };

    addDots();

    const next = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };

    const prev = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };

    const playSlide = () => {
        prev(slide, currentSlide, 'portfolio-item-active');
        prev(dot, currentSlide, 'dot-active');
        currentSlide++;
        if(currentSlide >= slide.length) {
            currentSlide = 0;
        }
        next(slide, currentSlide, 'portfolio-item-active');
        next(dot, currentSlide, 'dot-active');
    };

    const startSlider = (time = 3000) => {
        interval = setInterval(playSlide, time);
    };

    const stopSlider = () => {
        clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
        event.preventDefault();
        let target = event.target;

        if(!target.matches('.portfolio-btn, .dot')) {
            return;
        }

        prev(slide, currentSlide, 'portfolio-item-active');
        prev(dot, currentSlide, 'dot-active');

        if(target.matches('#arrow-right')) {
            currentSlide++;
        } else if(target.matches('#arrow-left')) {
            currentSlide--;
        } else if(target.matches('.dot')) {
            dot.forEach( (item, i) => {
                if(target === item) {
                    currentSlide = i;
                }
            });
        }

        if(currentSlide >= slide.length) {
            currentSlide = 0;
        }

        if(currentSlide < 0) {
            currentSlide = slide.length - 1;
        }
        next(slide, currentSlide, 'portfolio-item-active');
        next(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
        if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
            stopSlider();
        }
    });

    slider.addEventListener('mouseout', (event) => {
        if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
            startSlider();
        }
    });

    startSlider();
};

export default slider;