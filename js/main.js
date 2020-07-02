'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('menu'),
        menuItem = menu.querySelectorAll('ul>li'),
        startScrollBtn = document.querySelector('.start-scroll-btn'),
        serviceBlock = document.querySelector('#service-block'),
        portfolio = document.querySelector('#portfolio'),
        calc = document.querySelector('#calc'),
        command = document.querySelector('#command'),
        connect = document.querySelector('#connect');

    //timer
    const countTimer = (deadline) => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinute = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        const getTimeRemainig = () => {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemainig = (dateStop - dateNow) / 1000,
                sec = Math.floor(timeRemainig % 60),
                minutes = Math.floor((timeRemainig / 60) % 60),
                hours = Math.floor(timeRemainig / 60 / 60);

            return { timeRemainig, hours, minutes, sec };
        };

        const updateClock = () => {
            let timer = getTimeRemainig();
            timerHours.textContent = timer.hours >= 10 ? timer.hours : '0' + timer.hours;
            timerMinute.textContent = timer.minutes >= 10 ? timer.minutes : '0' + timer.minutes;
            timerSeconds.textContent = timer.sec >= 10 ? timer.sec : '0' + timer.sec;

            if(timer.timeRemainig <= 0) {
                timerHours.textContent = '00';
                timerMinute.textContent = '00';
                timerSeconds.textContent = '00';
            }
        };
        updateClock();
    };
    setInterval(countTimer, 1000, '15 july 2020');

    //menu
    const toggleMenu = () => {
        const heandlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        document.body.addEventListener('click', (event) => {
            let target = event.target,
                targetBtnMenu = target.closest('.menu'),
                targetCloseMenu = target.closest('.close-btn'),
                targetMenuItem = target.closest('menu>ul>li'),
                targetMenu = target.closest('.active-menu');
            
            if(!targetMenu && !targetBtnMenu && !targetCloseMenu && !targetMenuItem) {
                menu.classList.remove('active-menu');
            }

            if(targetBtnMenu || targetCloseMenu || targetMenuItem) {
                heandlerMenu();
            } 
        });
    };
    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');

        let count = 0;
        let height = popupContent.clientHeight;
            
        const popupAnim = () => {
            count++;
            popup.style.display = 'block';
            popupContent.style.top = count + '%';
            let rafId = requestAnimationFrame(popupAnim);
            if(count >= 30) {
                cancelAnimationFrame(rafId);
            }
        };

        const closePopup = () => {
            count = 0;
            popupContent.style.top = -height + 'px';
            popup.style.display = '';
        };

        popupBtn.forEach( item => {
            item.addEventListener('click', () => {
                if(window.innerWidth > 768) {
                    popupAnim();
                } else {
                    popup.style.display = 'block';
                    popupContent.style.top = '89px';
                }
            });
        });
        popupClose.addEventListener('click', closePopup);

        popup.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.popup-content');
            // target === null ? closePopup() : '';
            if(!target) {
                closePopup();
            }
        });
    };
    togglePopup();

    //scroll
    const scrollPage = () => {
        const blocksArray = [serviceBlock, portfolio, calc, command, connect];

        const scrollTo = (item) => {
            window.scroll({
                left: 0,
                top: item.offsetTop,
                behavior: 'smooth'
            });
        };
        
        menuItem.forEach( (item, i) => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                scrollTo(blocksArray[i]);
            });
        });

        startScrollBtn.addEventListener('click',(event) => {
            event.preventDefault();
            scrollTo(serviceBlock);
        });
    };
    scrollPage();

    //tabs
    const tabs = () => {
        const serviceHeader = document.querySelector('.service-header'),
            serviceHeaderTab = serviceHeader.querySelectorAll('.service-header-tab'),
            serviceTab = document.querySelectorAll('.service-tab');

        const toogleServiceTab = (index) => {
            for(let i = 0; i < serviceTab.length; i++) {
                if(index === i) {
                    serviceHeaderTab[i].classList.add('active');
                    serviceTab[i].classList.remove('d-none');
                } else {
                    serviceHeaderTab[i].classList.remove('active');
                    serviceTab[i].classList.add('d-none');
                }
            }
        };

        serviceHeader.addEventListener('click', (event) => {
            let target = event.target;
            
            target = target.closest('.service-header-tab');
            if(target) {
                serviceHeaderTab.forEach( (item ,i) => {
                    if(item === target) {
                        toogleServiceTab(i);
                    }
                });
            }
        });
    };
    tabs();

    //slider
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
    slider();
});