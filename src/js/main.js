
'use stric';



window.addEventListener('DOMContentLoaded', () => {


    // tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

          function hidenTabsContent() {
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('sshow', 'fade');
            });

            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');

            });
          }
          

          function showTabsContent(i = 0) {
            tabsContent[i].classList.add('show', 'fade');
            tabsContent[i].classList.remove('hide');

            tabs[i].classList.add('tabheader__item_active');
          }


          hidenTabsContent();
          showTabsContent();

          tabsParent.addEventListener('click', (event) => {

            const target = event.target;

            if (target && target.classList.contains('tabheader__item')) {

                    tabs.forEach((item, i) => {

                        if(target === item) {
                            hidenTabsContent();
                            showTabsContent(i);
                        }

                    });
            }

          }); 


    //timer

          const deadline = '2022-08-18';

          function getTimRimaining(endtaim) {
            const t = Date.parse(endtaim) - Date.parse(new Date()),
                  days = Math.floor(t / (1000 * 60 * 60 * 24)),
                  hours = Math.floor((t / (1000 * 60 * 60)) % 24),
                  minutes = Math.floor((t / 1000 / 60) % 60),
                  seconds = Math.floor((t / 1000) % 60);

                  return {
                    'total': t,
                    'days': days,
                    'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds 
                  };

          }

          function getZero(num) {
            if (num >= 0 && num < 10) {
              return `0${num}`;
            } else {
              return num;
            }

          }


          function setClock(selector, endtaim) {
             const timer = document.querySelector(selector),
                   days = timer.querySelector('#days'),
                   hours = timer.querySelector('#hours'),
                   minutes = timer.querySelector('#minutes'),
                   seconds = timer.querySelector('#seconds'),
                   timeInterval = setInterval(updateClock, 1000);


                   updateClock();


              function updateClock() {
                const t = getTimRimaining(endtaim);
                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if (t.total <= 0) {
                  clearInterval(timeInterval);
                }
              }

          }

          setClock('.timer', deadline);




          //modals



          const modalOpenBtn = document.querySelectorAll('[data-modal]'),
                modalContent = document.querySelector('.modal'),
                modalCloseBtn = document.querySelector('[data-close]');

        function modalsOpen() {
          modalContent.classList.add('show');
          modalContent.classList.remove('hide');
          document.body.style.overflow = 'hidden';
          clearTimeout(timeModals);
        }


          modalOpenBtn.forEach(item => {
                item.addEventListener('click', modalsOpen);
                     
          });

          function modalsClose() {
            modalContent.classList.add('hide');
            modalContent.classList.remove('show');
            document.body.style.overflow = '';
          }

          modalCloseBtn.addEventListener('click',  modalsClose);

        const timeModals = setTimeout(modalsOpen, 3000);

          document.addEventListener('keydown', (e) => {

            if (e.code === "Escape" && modalContent.classList.contains('show')) {
              modalsClose();
            }

          });

          function showModlByScroll() {
            if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
              modalsOpen();

              window.removeEventListener('scroll', showModlByScroll);
            }
          }


          window.addEventListener('scroll', showModlByScroll);



          // menu карточки 


          class menuCard {
            constructor(src, alt, title, descr, price, parentSelector, ...classes) {
              this.srs = src;
              this.alt = alt;
              this.title = title;
              this.descr = descr;
              this.price = price;
              this.parent = document.querySelector(parentSelector);
              this.classes = classes;
              this.transfer = 27;
              this.changeToUAH();
            }

            changeToUAH() {
              this.price = this.price * this.transfer;
            }

            render() {
              const element = document.createElement('div');

              if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
              } else {
                this.classes.forEach(clasName => element.classList.add(clasName));
              }
              element.innerHTML = `
                  <img src=${this.srs} alt=${this.alt}>
                  <h3 class="menu__item-subtitle">${this.title}</h3>
                  <div class="menu__item-descr">${this.descr}</div>
                  <div class="menu__item-divider"></div>
                  <div class="menu__item-price">
                      <div class="menu__item-cost">Цена:</div>
                      <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                  </div>`;
              this.parent.append(element);

            }
          }

          new menuCard(
            "img/tabs/vegy.jpg",
              "vegy",
              'Меню "Фитнес"',
              'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
              9,
              '.menu .container',
              'menu__item'
          ).render();

          new menuCard(
            "img/tabs/elite.jpg",
              "elite",
              'Меню “Премиум”',
              'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
              15,
              '.menu .container',
              'menu__item'
          ).render();

          new menuCard(
            "img/tabs/post.jpg",
              "post",
              'Меню "Постное"',
              'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
              10,
              '.menu .container',
              'menu__item'
          ).render();




          const forms = document.querySelectorAll('form');
          const message = {
              loading: 'Загрузка...',
              success: 'Спасибо! Скоро мы с вами свяжемся',
              failure: 'Что-то пошло не так...'
          };
      
          forms.forEach(item => {
              postData(item);
          });
      
          function postData(form) {
              form.addEventListener('submit', (e) => {
                  e.preventDefault();
      
                  let statusMessage = document.createElement('div');
                  statusMessage.classList.add('status');
                  statusMessage.textContent = message.loading;
                  form.appendChild(statusMessage);
              
                  const request = new XMLHttpRequest();
                  request.open('POST', 'server.php');
                  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                  const formData = new FormData(form);
      
                  const object = {};
                  formData.forEach(function(value, key){
                      object[key] = value;
                  });
                  const json = JSON.stringify(object);
      
                  request.send(json);
      
                  request.addEventListener('load', () => {
                      if (request.status === 200) {
                          console.log(request.response);
                          statusMessage.textContent = message.success;
                          form.reset();
                          setTimeout(() => {
                              statusMessage.remove();
                          }, 2000);
                      } else {
                          statusMessage.textContent = message.failure;
                      }
                  });
              });
          }
      
           

            



});
    

 
 










