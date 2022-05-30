import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
   const form = document.querySelectorAll('form'),
         inputs = document.querySelectorAll('input');

   checkNumInputs('input[name="user_phone"]');

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
         if(item.getAttribute('data-calc') === "end"){
            for(let key in state){
               formData.append(key, state[key]);
            }
         }
         
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
                  if(item.getAttribute("data-calc") === "end"){
                     item.style.display = "none";
                     document.querySelector('.popup_calc_end').style.display = "none";
                     document.body.style.overflow = '';
                  }
               }, 3000);
               for(let key in state){
                  delete state[key];
               }
            });
      });
   });

};

export default forms;