
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



          
        



});
    

 
 










