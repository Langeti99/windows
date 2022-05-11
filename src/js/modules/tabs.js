const tabs = (parentSelector, tabsSelector, contentSelector, activeClass) => {
   console.log('tabs');
   const parent = document.querySelector(parentSelector),
         tabs = document.querySelectorAll(tabsSelector),
         content = document.querySelectorAll(contentSelector);
         // active = document.querySelector(activeSelector);


   function hideTabsAndContent(){
      tabs.forEach(item =>{
         item.classList.remove(activeClass);
      });

      content.forEach(item => {
         item.style.display = 'none';
      });
   }

   function showTabsAndContent(i = 0){
      tabs[i].classList.add(activeClass);
      content[i].style.display = 'block';
   }
   
   hideTabsAndContent();
   showTabsAndContent();

   parent.addEventListener('click', (e)=>{
      const target = e.target;

      if(target && (target.classList.contains(tabsSelector.replace(/\./, '')) ||
         target.parentNode.classList.contains(tabsSelector.replace(/\./, '')))){
         tabs.forEach((item, i) => {
            if(item == target || item == target.parentNode){
               hideTabsAndContent();
               showTabsAndContent(i);
            }
         });
      }
   });
};

export default tabs;