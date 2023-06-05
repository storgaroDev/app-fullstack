import { getIsAdmin } from '../../../components/getUserRole.js'

const adminBtns = document.querySelectorAll('.admin-btn');
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
const divProfiles = document.querySelector("#div-profiles");
// const form = document.querySelector('#form');



(async () => {
  try {
    await getIsAdmin();    
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

const getTodos = async () =>{
  const { data } = await axios.get('/api/todos');
  // console.log(data);
  data.forEach(todo => {
    // console.log(todo);
    let newRow = document.createElement("div");
    newRow.id = todo.id;
    newRow.classList.add('xl:w-full', 'h-[16rem]' , 'md:w-full', 'p-4', 'flex');
    newRow.innerHTML = `
            <div class="border border-gray-900 p-6 w-full rounded-lg flex overflow-auto">
              <div  id="table" class="table-auto" >
                <p class="font-semibold">Nombre</p><input id="edit-name" readonly type="text" value="${todo.text}" class="bg-transparent"> 
                <p class="font-semibold">Apellido</p><input id="edit-lastName" readonly type="text" value="${todo.lastname}" class="bg-transparent">
                <p class="font-semibold">Telf</p><input id="edit-number" readonly type="text" value="${todo.number}" class="bg-transparent">
                <p class="font-semibold">Email</p><input id="edit-email" readonly type="text" value="${todo.email}" class="bg-transparent">
                <p class="font-semibold">Trabajo</p><input id="edit-work" readonly type="text" value="${todo.work}" class="bg-transparent"> 
                <p class="font-semibold">Precio</p><input id="edit-price" readonly type="text" value="${todo.price}" class="bg-transparent"> 
                <p class="font-semibold">Marca</p><input id="edit-carModel" readonly type="text" value="${todo.carModel}" class="bg-transparent">
                <p class="font-semibold">Fecha</p><input id="edit-date" readonly type="text" value="${todo.date}" class="bg-transparent">
                <p class="font-semibold">Id Trabajador</p><input id="edit-idWorker" readonly type="text" value="${todo.idworker}" class="bg-transparent"> <br>


                <button class="delete-btn h-10 px-5 m-2 text-red-100 transition-colors duration-150 
                bg-blue-500 rounded-lg focus:shadow-outline hover:bg-blue-500">Completado</button></td> 
                
                <td><button class="edit-button h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 
                rounded-lg focus:shadow-outline hover:bg-green-800">Editar</button>
                </div>
                </div>
      `;
    const button = newRow.children[0].children[0].children[9];

      if (todo.checked) {
        const button = newRow.children[0].children[0].children[19];
        button.parentElement.classList.add('line-through', 'text-slate-400', 'dark:text-slate-600');
        button.classList.remove('delete-btn');
        button.classList.add('deshacer-btn');

        button.innerHTML='Deshacer';
            // console.log(newRow.children[0].children[0]);
            
          } else{
            button.parentElement.classList.remove('line-through', 'text-slate-400', 'dark:text-slate-600', 'deshacer-btn');
            button.classList.add('delete-btn');
            button.classList.remove('deshacer-btn');

            button.innerText='Completado';
          }


    divProfiles.appendChild(newRow);

  });

divProfiles.addEventListener('click', async e =>{
  if (e.target.closest('.delete-btn')) {
    const button = e.target.closest('.delete-btn')
    const id = button.parentElement.parentElement.parentElement.id;
    // console.log(button.parentElement);
    await axios.patch(`/api/todos/${id}`, {checked: true})
    // await axios.delete(`/api/todos/`);
    button.parentElement.classList.add('line-through', 'text-slate-400', 'dark:text-slate-600');
    button.classList.remove('delete-btn');
    button.classList.add('deshacer-btn');

    button.innerText='Deshacer';
        console.log('jejjej');
        
    } else if (e.target.closest('.deshacer-btn')){
    const button = e.target.closest('.deshacer-btn');
    const id = button.parentElement.parentElement.parentElement.id;
    await axios.patch(`/api/todos/${id}`, {checked: false})
    button.parentElement.classList.remove('line-through', 'text-slate-400', 'dark:text-slate-600', 'deshacer-btn');
    button.classList.add('delete-btn');
    button.classList.remove('deshacer-btn');

    button.innerText='Completado';


      } else if (e.target.closest('.edit-button')){
        const button = e.target.closest('.edit-button');
        const id = button.parentElement.parentElement.parentElement.id;
        const text = e.target.parentElement.children[1];
        const lastname = e.target.parentElement.children[3];
        const number = e.target.parentElement.children[5];
        const email = e.target.parentElement.children[7];
        const work = e.target.parentElement.children[9];
        const price = e.target.parentElement.children[11];
        const carModel = e.target.parentElement.children[13];
        console.log(lastname);

        text.removeAttribute('readonly');
        lastname.removeAttribute('readonly');
        number.removeAttribute('readonly');
        email.removeAttribute('readonly')
        work.removeAttribute('readonly')
        price.removeAttribute('readonly')
        carModel.removeAttribute('readonly')

        button.classList.remove('edit-button');
        button.classList.add('save-button');
        console.log(button);

        e.target.innerHTML = 'Salvar'
      } else if (e.target.closest('.save-button')) {
        const button = e.target.closest('.save-button');
        const td = e.target.parentElement
        console.log(td);
        const text = e.target.parentElement.children[1];
        const lastname = e.target.parentElement.children[3];
        const number = e.target.parentElement.children[5];
        const email = e.target.parentElement.children[7];
        const work = e.target.parentElement.children[9];
        const price = e.target.parentElement.children[11];
        const carModel = e.target.parentElement.children[13];
        // console.log(text, lastname, number, email, work, price, carModel);
        // console.log(lastname);
        // await axios.patch(`/api/users/${td}`, { text: name.value, email: email.value });

        text.setAttribute('readonly', 'readonly');
        lastname.setAttribute('readonly', 'readonly');
        email.setAttribute('readonly', 'readonly')
        number.setAttribute('readonly', 'readonly');
        email.setAttribute('readonly', 'readonly')
        work.setAttribute('readonly', 'readonly')
        price.setAttribute('readonly', 'readonly' )
        carModel.setAttribute('readonly', 'readonly')

        
        button.classList.add('edit-button');
        button.classList.remove('save-button');

        e.target.innerText='Editar'

      }


})

};


getTodos();
// doGetTodos();