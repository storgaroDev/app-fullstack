//Imports
import { showNotification } from "../components/notification.js";


//Selectors
const form = document.querySelector('#form');
// const formBtn = document.querySelector('#form-btn');
const inputPassword = document.querySelector('#password-input');
const inputConfirm = document.querySelector('#confirm-input');
const notification = document.querySelector('#notification');


const checkNXicon = (input, validation) => {
    const xIcon = input.parentElement.children[1].children[0];
    const checkIcon = input.parentElement.children[1].children[1];
    const information = input.parentElement.parentElement.children[2];

    if (input.value === '') {
        checkIcon.classList.add('hidden');
        xIcon.classList.add('hidden');
        information.classList.add('hidden');
    } else if (validation) {
        checkIcon.classList.remove('hidden');
        xIcon.classList.add('hidden');
        information.classList.add('hidden');
    } else if (!validation) {
        xIcon.classList.remove('hidden');
        checkIcon.classList.add('hidden');
        information.classList.remove('hidden');
    };


    
}



// Password Regex

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; 
  
let passwordValidation = false;
let confirmValidation = false;


inputPassword.addEventListener('input', e => {
    passwordValidation = PASSWORD_REGEX.test(e.target.value);
    confirmValidation = e.target.value === inputConfirm.value; 
    
    
    checkNXicon(inputPassword, passwordValidation);
    checkNXicon(inputConfirm, confirmValidation);
    
});

inputConfirm.addEventListener('input', e => {
    passwordValidation = PASSWORD_REGEX.test(e.target.value);
    confirmValidation = inputPassword.value === e.target.value; 

    checkNXicon(inputConfirm, confirmValidation);
    
});

form.addEventListener('submit', async e =>{
    try {
        e.preventDefault();
        console.log(passwordValidation, confirmValidation);
        if ( !passwordValidation || !confirmValidation) {
            return
        }
        const newUser = {
            password: inputPassword.value
        }
        const { data } = await axios.post('/api/users', newUser);
        console.log(data);
        showNotification(`Password reset successfully  ✔`, false, notification);

        inputPassword.value = '';
        inputConfirm.value = '';

        //enviar al login de la pagina
        window.location.pathname = '/login';
        
    } catch (error) {
        console.log(error);
        showNotification(error.response.data.error, true, notification);

    } 
});
