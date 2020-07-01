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

    //Таймер
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

            if(timer.timeRemainig > 0) {
                setInterval(updateClock, 1000);
            }
        };
        updateClock();
    };
    setInterval(countTimer, 1000, '15 july 2020');

    //Меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            closeBtn = document.querySelector('.close-btn');
        
        const heandlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', heandlerMenu);
        closeBtn.addEventListener('click', heandlerMenu);
        menuItem.forEach( item => item.addEventListener('click', heandlerMenu));
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
});