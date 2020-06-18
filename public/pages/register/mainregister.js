import { firebaseActions } from '../../data.js';

export function registerDOM() {
  const form = document.querySelector('#form-register'); // pega o Id do nosso form. 

  form.backButton.addEventListener('click', () => {
    window.location = '#';
  }); // botão de voltar do nosso form, retorna para a hash da home.

  // ao clicar em registrar, a funão de register do firebase actions é ativada e ela vai capturar os valores que são imputados pelo nosso usuário. 
  form.signRegister.addEventListener('click', (event) => {
    event.preventDefault();
    firebaseActions.register(form.emailRegister.value, form.passwordRegister.value,
      form.nameRegister.value, form.dateRegister.value);
  });
} 
