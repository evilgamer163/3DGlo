'use strict';

const goodDay = document.querySelector('.good-day'),
    day = document.querySelector('.day'),
    time = document.querySelector('.time'),
    toNewYear = document.querySelector('.to-new-year');


const renderContent = () => {
    let date = new Date(),
    weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    hour = date.getHours();

    if(hour >= 5 && hour <= 10) {
        goodDay.textContent = 'Доброе утро!';
    } else if(hour > 10 && hour <= 16) {
        goodDay.textContent = 'Добрый день!';
    } else if(hour > 16 && hour < 22) {
        goodDay.textContent = 'Добрый вечер!';
    } else {
        goodDay.textContent = 'Доброй ночи!';
    }

    day.textContent = weekDays[date.getDay()];

    time.textContent = date.toLocaleTimeString();

    toNewYear.textContent = Math.floor((new Date('01 January 2021') - date)/1000/60/60/24);
};

renderContent();
