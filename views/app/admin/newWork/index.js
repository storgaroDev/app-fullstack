import { getIsAdmin } from '../../../components/getUserRole.js'


let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
const form = document.querySelector('#form');
const inputNombre = document.querySelector('#first-name');
const inputApellido = document.querySelector('#last-name');
const inputEmail = document.querySelector('#email-address');
const inputCelular = document.querySelector('#street-address');
const selectMarca = document.querySelector('#country');
const inputWork = document.querySelector('#work-todo');
const inputFecha = document.querySelector('#city');
const inputPrecio = document.querySelector('#price');
const inputId = document.querySelector('#region');
const adminBtns = document.querySelectorAll('.admin-btn');
// const plusIcon = document.querySelector('.plus-icon');
const moreItems = document.querySelector('#more-items');
// console.log(moreItems);
// let actions = [];
(async () => {
	try {
	  await getIsAdmin();
	  const { data } = await axios.get('/api/actions');
	  data.forEach(actions => {
		const option = document.createElement("option");
		option.value = actions.work;
		option.innerHTML = actions.work;
		console.log(inputWork);
		inputWork.appendChild(option)
	  })
	} catch (error) {
	  adminBtns.forEach(btn => btn.classList.add('buttons-employees'))
	}
  })();

  (async () => {
	try {
	const { data } = await axios.get('/api/modelos');
	data.forEach(modelos => {
		const option = document.createElement("option");
		option.value = modelos.modelos;
		option.innerHTML = modelos.modelos;
		console.log(inputWork);
		selectMarca.appendChild(option)
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

(async() => {



})();

form.addEventListener('submit', async e => {
	e.preventDefault();

	// Create todo in backen/mongodb
	const { data } = await axios.post('/api/todos', {
		text: inputNombre.value,
		lastname: inputApellido.value,
		number: inputCelular.value,
		email: inputEmail.value,
		work: inputWork.value,
		price: inputPrecio.value,
		carModel: selectMarca.value,
		date: inputFecha.value,
		idworker: inputId.value
	
	});


	// const { works } = await axios.post('/api/todos', {
	// works: inputWork.value,
	
	// });
	
	// Empty input
	inputNombre.value = ''
	inputApellido.value = ''
	inputCelular.value = ''
	inputEmail.value = ''
	inputFecha.value = ''
	inputId.value = ''
	inputPrecio.value = ''
	inputWork.value = ''
	selectMarca.value = ''
});

// console.log(form.children[0].children[0].children[0].children[5]);

moreItems.addEventListener("click", ()=>{
	console.log('jejej');
	const newLabel = document.createElement('div');
	newLabel.classList.add('col-span-6')
	newLabel.innerHTML = `
	<div class="col-span-6">
	<label for="work-todo" class="block overflow-auto text-sm font-medium text-gray-700">Trabajo a realizar</label>
  <select id="work-todo" name="work-todo" autocomplete="work-todo" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
	<option value="Amortiguadores">Amortiguadores</option>
	  <option value="Cambio de aceite">Cambio de aceite</option>
	  <option value="Tren delantero">Tren delantero</option>
	  <option value="Frenos">Frenos</option>
	</select>
  </div>
  `
  work: inputWork.value,
//   console.log(work);


  form.children[0].children[0].children[0].children[5].append(newLabel);
  
})

console.log(form.children[0].children[0].children[0].children[5]);
