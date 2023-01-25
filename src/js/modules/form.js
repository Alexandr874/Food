
import {closeModal, openModal} from './modal';
import { postData } from '../servises/servises';

function form(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Мы скоро вам перезвоним',
      failure: 'Что то пошло не так'
    };

    forms.forEach(item => {
          postDataBild(item);
    });

    

    function postDataBild(form) {
      form.addEventListener('submit', (e) => {
              e.preventDefault();

              let statusMesage = document.createElement('img');
              statusMesage.src = message.loading;
              statusMesage.style.cssText = `
                  display: block;
                  margin: 0 auto
              `;
              form.insertAdjacentElement('afterend', statusMesage);

             const formData = new FormData(form);

             const json = JSON.stringify(Object.fromEntries(formData.entries()));

             
              postData('http://localhost:3000/requests', json)
              .then(data => {
              console.log(data);
              showThanksModal(message.success);
             }).catch(() => {
              showThanksModal(message.failure);
             }).finally(() => {
                  form.reset();
             });

      });
    }


    function showThanksModal(message) {
      const hiddenModalDialog = document.querySelector('.modal__dialog');
      hiddenModalDialog.classList.add('hide');

      openModal('.modal', modalTimerId);

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
      <div class="modal__content">
      <div data-close class="modal__close">&times;</div>
      <div class="modal__title">Мы свяжемся с вами как можно быстрее!</div>
      </div>
      `;
      document.querySelector('.modal').append(thanksModal);

      setTimeout(() => {
          thanksModal.remove();
          hiddenModalDialog.classList.add('show'); 
          hiddenModalDialog.classList.remove('hide');
          closeModal('.modal');
      },2000);
    }

}
export default form;