import { getIsAdmin } from '../../../components/getUserRole.js'

const adminBtns = document.querySelectorAll('.admin-btn');
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
const ul = document.querySelector('ul');
const divProfiles = document.querySelector("#div-profiles");


(async () => {
  try {
    await getIsAdmin();    
  } catch (error) {
    adminBtns.forEach(btn => btn.classList.add('buttons-employees'))
  }
})();

if (divProfiles.role === 'admin') {
  console.log('iiiii');
}

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

const getUsers = async () =>{
  const { data } = await axios.get('/api/users');
  console.log(data);
  data.forEach(todo => {
    const newRow = document.createElement("div");
    newRow.id = todo.id;
    newRow.classList.add('xl:w-1/3', 'md:w-1/2', 'p-4', 'flex', 'w-[50%]');
    newRow.innerHTML = `
            <div class="border border-gray-900 p-6 rounded-lg flex">
              <div  id="table" class="table-auto" >
              <p class="font-semibold">Nombres</p><input id="edit-name" readonly type="text" value="${todo.name}" class="bg-transparent">
                <p class="font-semibold">Correo</p><input id="edit-email" readonly type="text" value="${todo.email}" class="bg-transparent">
                <p class="font-semibold">Usuario</p><input id="edit-usuario" readonly type="text" value="${todo.usuario}" class="bg-transparent">
                <input id="edit-role" readonly type="text" value="${todo.role}" class="bg-transparent font-semibold"> 
                <br>
                <button class="delete-btn h-10 px-5 m-2 text-red-100 transition-colors duration-150 
                bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-500">Eliminar</button>
                <button class="edit-button h-10 px-5 m-2 text-green-100 transition-colors duration-150 bg-green-700 
                rounded-lg focus:shadow-outline hover:bg-green-800">Editar</button>
              </div>
            </div>
      `;
      
      // const button = newRow.children[0].children[0].children[3];
      
        divProfiles.appendChild(newRow);

  });


  divProfiles.addEventListener('click', async e =>{
    if (e.target.closest('.delete-btn')) {
      const confirmar = confirm('Está seguro de querer realizar esta opción? Luego de aceptada no se podra deshacer');
      if (confirmar === true) {
        const button = e.target.closest('.delete-btn')
        const id = button.parentElement.parentElement.parentElement.id;
        console.log(id);
        // await axios.patch(`/api/users/${id}`, {checked: true})
        await axios.delete(`/api/users/${id}`);  
        e.target.parentElement.parentElement.parentElement.remove();
      } else{
        console.log('false');
      }

      } if (e.target.closest('.edit-button')) {
        const button2 = e.target.closest('.edit-button');

        const name = e.target.parentElement.children[1];
        const email = e.target.parentElement.children[3];
        const usuario = e.target.parentElement.children[5];

        name.removeAttribute('readonly');
        email.removeAttribute('readonly');
        usuario.removeAttribute('readonly');

        button2.classList.remove('edit-button');
        button2.classList.add('save-button');

        e.target.innerHTML = 'Salvar'
      } else if (e.target.closest('.save-button')){
        const button2 = e.target.closest('.save-button');
        const td = e.target.parentElement.parentElement.parentElement
        console.log(td);
        const name = e.target.parentElement.children[1];
        const email = e.target.parentElement.children[3];
        const usuario = e.target.parentElement.children[5];
        console.log(`/api/users/${td.id}`);
        await axios.patch(`/api/users/${td}`, { text: name.value, email: email.value, usuario: usuario.value });

        name.setAttribute('readonly', 'readonly');
        email.setAttribute('readonly', 'readonly');
        usuario.setAttribute('readonly', 'readonly');

        
        button2.classList.add('edit-button');
        button2.classList.remove('save-button');

        e.target.innerText='Editar'


      }

  })

  

};
getUsers();
