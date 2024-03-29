function slider({container, slid, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, inner}) {
    const slider = document.querySelector(container),
                    slides = document.querySelectorAll(slid),
                    prev = document.querySelector(prevArrow),
                    next = document.querySelector(nextArrow),
                    current = document.querySelector(currentCounter),
                    total =  document.querySelector(totalCounter),
                    slideWrapper = document.querySelector(wrapper),
                    slideInner = document.querySelector(inner),
                    width = window.getComputedStyle(slideWrapper).width;


               let slideIndex = 1;
               let  offset = 0;

               if(slides.length < 10) {
                total.textContent = `0${slides.length}`;
                current.textContent = `0${slideIndex}`;
            } else {
                total.textContent = slides.length;
                current.textContent = slideIndex;
            }

              slideInner.style.width = 100 * slides.length + '%';
              slideInner.style.display = 'flex';
              slideInner.style.transition = '0.5s all';

              slideWrapper.style.overflow = 'hidden';

              slides.forEach(item => {
                item.style.width = width;
              });

              slider.style.position = 'relative';

              const indicators = document.createElement('ol'),
                    dots = [];
              indicators.classList.add('carousel-indicators');
              indicators.style.cssText = `
              position: absolute;
              right: 0;
              bottom: 0;
              left: 0;
              z-index: 15;
              display: flex;
              justify-content: center;
              margin-right: 15%;
              margin-left: 15%;
              list-style: none;
              `;
              slider.append(indicators);

              for(let i = 0; i < slides.length; i++) {
                const dot = document.createElement('li');
                dot.setAttribute('data-slide-to', i + 1);
                dot.style.cssText = `
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 30px;
                height: 6px;
                margin-right: 3px;
                margin-left: 3px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: .5;
                transition: opacity .6s ease;
                `;
                if(i == 0) {
                    dot.style.opacity = 1;
                }
                indicators.append(dot);
                dots.push(dot);
              }

              next.addEventListener('click', () => {

                if(offset == +width.slice(0, width.length -2) * (slides.length - 1)) {
                    offset = 0;
                } else {
                    offset += +width.slice(0, width.length -2);
                }

                slideInner.style.transform = `translateX(-${offset}px)`;

                if(slideIndex == slides.length) {
                    slideIndex = 1;
                } else {
                    slideIndex++;
                }

                if(slides.length < 10) {
                    current.textContent = `0${slideIndex}`;
                } else {
                    current.textContent = slideIndex;
                }

                dots.forEach(dot => dot.style.opacity = '.5');
                dots[slideIndex - 1].style.opacity = 1;

              });


              prev.addEventListener('click', () => {

                if(offset == 0) {
                    offset = +width.slice(0, width.length -2) * (slides.length - 1);
                } else {
                    offset -= +width.slice(0, width.length -2);
                }

                slideInner.style.transform = `translateX(-${offset}px)`;

                if(slideIndex == 1 ) {
                    slideIndex = slides.length;
                } else {
                    slideIndex--;
                }

                if(slides.length < 10) {
                    current.textContent = `0${slideIndex}`;
                } else {
                    current.textContent = slideIndex;
                }

                dots.forEach(dot => dot.style.opacity = '.5');
                dots[slideIndex - 1].style.opacity = 1;

              });


             dots.forEach(dot => {
                dot.addEventListener('click', (e) => {
                    const slideTo = e.target.getAttribute('data-slide-to');

                    offset = +width.slice(0, width.length -2) * (slideTo - 1);
                    slideInner.style.transform = `translateX(-${offset}px)`;

                   slideIndex = slideTo;

                   if(slides.length < 10) {
                    current.textContent = `0${slideIndex}`;
                } else {
                    current.textContent = slideIndex;
                }

                dots.forEach(dot => dot.style.opacity = '.5');
                dots[slideIndex - 1].style.opacity = 1;

                    
                });
             });

}
export default slider;