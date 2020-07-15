'use strict';

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

export default tabs;