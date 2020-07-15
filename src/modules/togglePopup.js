'use strict';

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

export default togglePopup;