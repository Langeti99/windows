const forms = () => {
   const form = document.querySelectorAll('form'),
         inputs = document.querySelectorAll('input'),
         phoneInputs = document.querySelectorAll('input[name="user_phone"]');

   phoneInputs.forEach(item => {
      item.addEventListener('input', ()=>{
         item.value = item.value.replace(/\D/, '');
      });
   });

   const massage = {
      loading: "Загрузка...",
      success: "Спасибо, скоро мы с вами свяжемся!",
      failure: "Щось пішло не так"
   };

   const postData = async (url, data) => {
      document.querySelector('.status').textContent = massage.loading;

      let res = await fetch(url, {
         method: "POST",
         body: data
      });

      return await res.text();
   };

   const clearInputs = () => {
      inputs.forEach(item => {
         item.value = '';
      });
   };

   form.forEach(item => {
      item.addEventListener('submit', (e)=>{
         e.preventDefault();

         let statusMassage = document.createElement('div');
         statusMassage.classList.add('status');
         item.appendChild(statusMassage);
         
         const formData = new FormData(item);
         
         postData('./assets/server.php', formData)
            .then(res => {
               console.log(res);
               statusMassage.textContent = massage.success;
            })
            .catch(() => statusMassage.textContent = massage.failure)
            .finally(() => {
               clearInputs();
               setTimeout(()=>{
                  statusMassage.remove();
               }, 3000);
            });
      });
   });

};

export default forms;