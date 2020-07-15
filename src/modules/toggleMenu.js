'use strict';

const toggleMenu = () => {
    const menu = document.querySelector('menu');

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

export default toggleMenu;