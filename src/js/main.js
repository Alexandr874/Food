
'use strict';

import card from'./modules/card';
import form from'./modules/form';
import slider from'./modules/slider';
import tabs from'./modules/tabs';
import timer from'./modules/timer';
import calc from'./modules/calc';
import modal from './modules/modal';
import {openModal} from './modules/modal';




window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 2000);

        

          card();
          form('form', modalTimerId);
          slider({
            container: '.offer__slider',
            slid: '.offer__slide ',
            nextArrow: '.offer__slider-next',
            prevArrow: '.offer__slider-prev',
            totalCounter: '#total',
            currentCounter: '#current',
            wrapper: '.offer__slider-wrapper',
            inner: '.offer__slider-inner'

          });
          tabs('.tabcontent', '.tabheader__item', '.tabheader__items', 'tabheader__item_active');
          timer('.timer', '2023-02-09');
          calc();
          modal('[data-modal]', '.modal', modalTimerId);
        

});

