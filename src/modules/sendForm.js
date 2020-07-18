'use strict';

const sendForm = () => {
    const errorMessage = 'Что то пошло не так как мы планировали...',
        successMessage = 'Спасибо! Скоро с вами свяжутся!',
        regText = /^[а-яА-Я]+$/,
        regPhone = /[\d]{7,10}/;

    const loaded = document.querySelector('.loaded');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `
        font-size: 2rem;
        color: #1DA3FE;
    `;

    const forms = document.querySelectorAll('form');
    
    forms.forEach( item => {
        item.addEventListener('input', (event) => {
            let target = event.target;
            
            if((target.name === 'user_name' || target.name === 'user_message') && !regText.test(target.value)) {
                target.value = '';
                target.style.border = '2px solid red';
            }
        });

        item.addEventListener('submit', (event) => {
            event.preventDefault();
            item.append(statusMessage);
            loaded.style.display = 'block';

            const formData = new FormData(item);

            formData.forEach( (value, key) => {
                formData[key] = value;
            });
            
            const getData = (data) => {
                return fetch('./server.php', {
                    method: 'POST',
                    headers: {'Content-Type': 'multipart/form-data'},
                    body: JSON.stringify(data)
                });
            };

            const outputMessage = (msg) => {
                loaded.style.display = 'none';
                statusMessage.textContent = msg;
            };

            getData(formData)
                .then((response) => {
                    if(response.status !== 200) {
                        throw new Error('Ошибка! Статус ответа не равен 200!');
                    }
                    outputMessage(successMessage);
                })
                .catch((error) => {
                    outputMessage(errorMessage);
                    console.error(error);
                });

            setTimeout(() => {
                statusMessage.textContent = '';
            }, 5000);

            let inputs = item.querySelectorAll('input').forEach( elem => {
                elem.value = '';
                elem.style.border = '';
            });
        });
    });
};

export default sendForm;