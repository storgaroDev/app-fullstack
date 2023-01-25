const input = document.querySelector('input');
const ul = document.querySelector('ul');
const addBtn = document.querySelector('.add-btn');
const invalidCheck = document.querySelector('.invalid-check');
const form = document.querySelector('#form');
const totalCountSpan = document.querySelector('.total-count');
const completedCountSpan = document.querySelector('.completed-count');
const incompletedCountSpan = document.querySelector('.incompleted-count');

(async() => {
	try {
		const { data } = await axios.get('/api/todos');
		data.forEach(todo => {
			const listItem = document.createElement('li');
			listItem.id = todo.id;
			listItem.classList.add('flex', 'flex-row');
			listItem.innerHTML = `
				<div class="group grow flex flex-row justify-between">
					<button class="delete-icon w-12 md:w-14 hidden group-hover:flex group-hover:justify-center group-hover:items-center cursor-pointer bg-red-500 origin-left">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
					<p class="p-4 break-words grow">${todo.text}</p>
				</div>
				<button class="check-icon w-12 md:w-14 flex justify-center items-center cursor-pointer border-l border-slate-300 dark:border-slate-400 hover:bg-green-300 transition duration-300 easy-in-out">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
					</svg>
				</button>
			`;
	
			if (todo.checked) {
				listItem.children[1].classList.add('bg-green-400');
				listItem.children[1].classList.remove('hover:bg-green-300');
				listItem.classList.add('line-through', 'text-slate-400', 'dark:text-slate-600');
			} else {
				listItem.children[1].classList.remove('bg-green-400');
				listItem.children[1].classList.add('hover:bg-green-300');
				listItem.classList.remove('line-through', 'text-slate-400', 'dark:text-slate-600');
			}
	
			ul.append(listItem);
			todoCount();
		});
	} catch (error) {
		if (error.response.status === 401){
			window.location.pathname = '/';
		}
	}




})();


const totalCount = () => {
	const howMany = document.querySelector('ul').children.length; 
	totalCountSpan.innerHTML = howMany;
};

const completeCount = () => {
	const howMany = document.querySelectorAll('.line-through').length;
	completedCountSpan.innerHTML = howMany;
};

const incompletedCount = () => {
	const howMany = document.querySelectorAll('ul li:not(.line-through)').length; 
	incompletedCountSpan.textContent = howMany;
};

const todoCount = () => {
	totalCount();
	completeCount();
	incompletedCount();
};

form.addEventListener('submit', async e => {
	e.preventDefault();

	// Check if the input is empty
	if (input.value === '') {
		input.classList.remove('focus:ring-2', 'focus:ring-violet-600');
		input.classList.add('focus:ring-2', 'focus:ring-rose-600');
		invalidCheck.classList.remove('hidden');
		return
	}

	// Remove classes and hide invalidCheck
	input.classList.remove('focus:ring-2', 'focus:ring-rose-600', 'border-2', 'border-rose-600');
	input.classList.add('focus:ring-2', 'focus:ring-violet-600');
	invalidCheck.classList.add('hidden');

	// Create todo in backen/mongodb
	const { data } = await axios.post('/api/todos', {text: input.value});

	// Create list item
	const listItem = document.createElement('li');
	listItem.id = data.id;
	listItem.classList.add('flex', 'flex-row');
	listItem.innerHTML = `
		<div class="group grow flex flex-row justify-between">
			<button class="delete-icon w-12 md:w-14 hidden group-hover:flex group-hover:justify-center group-hover:items-center cursor-pointer bg-red-500 origin-left">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
			<p class="p-4 break-words grow">${input.value}</p>
		</div>
		<button class="check-icon w-12 md:w-14 flex justify-center items-center cursor-pointer border-l border-slate-300 dark:border-slate-400 hover:bg-green-300 transition duration-300 easy-in-out">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-7 md:w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
			</svg>
		</button>
	`;

	// Append listItem
	ul.append(listItem);

	// Empty input
	input.value = ''

	todoCount();
});

ul.addEventListener('click', async e => {

	// Select delete-icon
	if (e.target.closest('.delete-icon')) {
		const id = e.target.closest('.delete-icon').parentElement.parentElement.id;
		await axios.delete(`/api/todos/${id}`)
		e.target.closest('.delete-icon').parentElement.parentElement.remove();
		todoCount();
	}

	// Select check-icon
	if (e.target.closest('.check-icon')) {
		const checkIcon = e.target.closest('.check-icon');
		const listItem = checkIcon.parentElement;
		if (!listItem.classList.contains('line-through')) {
			await axios.patch(`/api/todos/${listItem.id}`, {checked: true});
			checkIcon.classList.add('bg-green-400');
			checkIcon.classList.remove('hover:bg-green-300');
			listItem.classList.add('line-through', 'text-slate-400', 'dark:text-slate-600');
		} else {
			await axios.patch(`/api/todos/${listItem.id}`, {checked: false});
			checkIcon.classList.remove('bg-green-400');
			checkIcon.classList.add('hover:bg-green-300');
			listItem.classList.remove('line-through', 'text-slate-400', 'dark:text-slate-600');
		}
	}
});

