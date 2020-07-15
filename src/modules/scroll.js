'use strict';

const scrollPage = () => {
    const menu = document.querySelector('menu'),
        menuItem = menu.querySelectorAll('ul>li'),
        startScrollBtn = document.querySelector('.start-scroll-btn'),
        serviceBlock = document.querySelector('#service-block'),
        portfolio = document.querySelector('#portfolio'),
        calc = document.querySelector('#calc'),
        command = document.querySelector('#command'),
        connect = document.querySelector('#connect');

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

export default scrollPage;