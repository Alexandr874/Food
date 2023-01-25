import { getResource } from "../servises/servises";

function card() {
    class MenuCart{
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.valuta = 9;
            this.exchange();
        }
        exchange() {
            this.price = this.price * this.valuta;
        }

        render() {
            const element = document.createElement('div');
            if(this.classes == 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(classPlus => element.classList.add(classPlus));
            }
            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;
        this.parent.append(element);
        }
        
      }


     

     getResource('http://localhost:3000/menu')
     .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCart(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
        }); 

        
     });

      


}
export default card;