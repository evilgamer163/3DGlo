'use strict';

const calculate = (price = 100) => {
    const calcInput = document.querySelectorAll('input[type="text"].calc-item'),
        calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),
        totalValue = document.getElementById('total'),
        calcImg = document.querySelector('.calc-img');

    calcType.addEventListener('change', () => {
        calcImg.src = calcType.options[calcType.selectedIndex].dataset.img;
    });

    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1,
            typeValye = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        if(calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
        }

        if(calcDay.value < 5 && calcDay.value) {
            dayValue *= 2;
        } else if(calcDay.value < 10 && calcDay.value) {
            dayValue *= 1.5;
        }

        if(typeValye && squareValue) {
            total = price * typeValye * squareValue * countValue * dayValue;
        }

        const animate = ({ duration, draw, timing }) => {
            let start = performance.now();
    
            requestAnimationFrame(function animate(time) {
                let timeFraction = (time - start) / duration;
                if (timeFraction > 1) {
                    timeFraction = 1;
                }
                let progress = timing(timeFraction);
                draw(progress);
                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }
            });
        };
    
        animate({
            duration: 500,
            timing(timeFraction) {
                return timeFraction;
            },
            draw(progress) {
                totalValue.textContent = Math.floor(progress * total);
            }
        });
    };

    calcBlock.addEventListener('change', (event) => {
        let target = event.target;

        if(target.matches('.calc-type') || target.matches('.calc-square') ||
            target.matches('.calc-day') || target.matches('.calc-count')) {
                countSum();
            }
    });
    
    calcInput.forEach( item => {
        item.addEventListener('input', () => {
            if(/\D/.test(item.value)) {
                item.value = '';
                item.placeholder = 'Вводите только цифры!';
            }
        });
    });
};

export default calculate;