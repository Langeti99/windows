const modals = () => {
   function bindModals(triggerSelector, modalSelector, closeSelector){
      
      const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector);
            
      trigger.forEach(item => {
         item.addEventListener('click', (e) => {
            if(e.target){
               e.preventDefault();
            }
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
         });
      });

      modal.addEventListener('click', (e) => {
         if(e.target === modal){
            modal.style.display = 'none';
            document.body.style.overflow = '';
         }
      });
      
      close.addEventListener('click', () => {
         modal.style.display = 'none';
         document.body.style.overflow = '';
      });
      console.log(1);
   };

   function showMyModal(selector, time){
      setTimeout(()=>{
         document.querySelector(selector).style.display = 'block';
         document.body.style.overflow = 'hidden';
      }, time);
   }

   bindModals('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
   bindModals('.phone_link', '.popup', '.popup .popup_close');
   showMyModal('.popup', 3000);
};

export default modals;