function calc() {

    const result = document.querySelector('.calculating__result span');

    let sex = 'female', height, weight, age,
        ratio = '1.375';

    if (localStorage.getItem('sex')) {
       sex = localStorage.getItem('sex');
       
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = '1.375';
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio);
        } else {
            result.textContent = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio);
        }
    }
    calcTotal();

    function initLocalAvailable(selector, activClass) {
        const element = document.querySelectorAll(selector);
        element.forEach(elem => {
            elem.classList.remove(activClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activClass);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activClass);
            }

        });

    }
    initLocalAvailable('#gender div', 'calculating__choose-item_active');
    initLocalAvailable('.calculating__choose_big div', 'calculating__choose-item_active');

    function staticInformation(selector, activClass) {
        const element = document.querySelectorAll(selector);
        element.forEach(elem => {
            elem.addEventListener('click', () => {
                if(elem.getAttribute('data-ratio')) {
                    ratio = +elem.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +elem.getAttribute('data-ratio'));
                } else {
                    sex = elem.getAttribute('id');
                    localStorage.setItem('sex', elem.getAttribute('id'));
                }

                element.forEach(elem => {
                    elem.classList.remove(activClass);
                });
                elem.classList.add(activClass);

                calcTotal();
            });
        });

    }
    staticInformation('#gender div', 'calculating__choose-item_active');
    staticInformation('.calculating__choose_big div', 'calculating__choose-item_active');


    function dinamicInformation(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '2px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                     weight = +input.value;
                    break;
                case 'age':
                     age = +input.value;
                    break;
                
            }
            calcTotal();
        });

    }
    dinamicInformation('#height');
    dinamicInformation('#weight');
    dinamicInformation('#age'); 


}
export default calc;