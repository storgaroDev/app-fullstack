import { getIsAdmin } from '../../../components/getUserRole.js'

const adminBtns = document.querySelectorAll('.admin-btn');
const form = document.querySelector('#form');
const workNew = document.querySelector('#work-new');
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
const divProfiles = document.querySelector("#div-profiles");

console.log(workNew);

(async () => {
  try {
    await getIsAdmin();   
    
    const { data } = await axios.get('/api/actions');
	  data.forEach(workNew => {
      let newRow = document.createElement("div");
      newRow.id = workNew.id;
    console.log(workNew);

      newRow.classList.add('xl:w-full', 'h-20', 'md:w-full', 'p-4', 'flex', 'flex-row');
      newRow.innerHTML = `
              <div class="border border-gray-400 p-6 rounded-lg flex overflow-hidden justify-center items-center">
                <div  id="table" class="table-auto" >
                <input id="actions" readonly type="text" value="${workNew.work}" class="bg-transparent outline-none"> 
                <button class="delete-btn"><i class='bx bx-trash'></i></button>

                </div>
              </div>
        
                `;
    divProfiles.appendChild(newRow);


	  })

  } catch (error) {
    adminBtns.forEach(btn => btn.classList.add('buttons-employees'))
  }
})();

closeBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});



// following are the code to change sidebar button(optional)
function menuBtnChange() {
 if(sidebar.classList.contains("open")){
   closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
 }else {
   closeBtn.classList.replace("bx-menu-alt-right","bx-menu");//replacing the iocns class
 }
}



form.addEventListener('submit', async e => {
	e.preventDefault();
try {
  const { data } = await axios.post('/api/actions', {
		work: workNew.value})
    console.log(data);
    let newRow = document.createElement("div");
    newRow.id = workNew.id;
    newRow.classList.add('xl:w-full', 'h-20' , 'md:w-full', 'p-4', 'flex');
    newRow.innerHTML = `
            <div class="border border-gray-400 p-6 rounded-lg flex overflow-hidden justify-center items-center">
              <div  id="table" class="table-auto" >
                <input id="actions" readonly type="text" value="${workNew.value}" class="bg-transparent outline-none"> 
                <button class="delete-btn"><i class='bx bx-trash'></i></button>

                </div>
            </div>
                `;

    divProfiles.appendChild(newRow);

    
} catch (error) {
  console.log(error);
}

workNew.value = '';
});

divProfiles.addEventListener('click', async e =>{
  // console.log(e.target.closest(".delete-btn"));
  const button = e.target.closest('.delete-btn');
  const id = button.parentElement.parentElement.parentElement.id;
  console.log(id);
  await axios.delete(`/api/actions/${id}`);  
  e.target.parentElement.parentElement.parentElement.remove();
  
  // console.log();
  
  })
