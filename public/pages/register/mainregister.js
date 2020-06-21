import { firebaseActions } from '../../data.js';

export function registerDOM() {
  const form = document.querySelector('#form-register');

  form.backButton.addEventListener('click', () => {
    window.location = '#';
  });

  form.signRegister.addEventListener('click', (event) => {
    event.preventDefault();
    const registerObj = {
      email: form.emailRegister.value,
      password: form.passwordRegister.value,
      name: form.nameRegister.value,
      birthday: form.dateRegister.value,
    };
    firebaseActions.register(registerObj);
  });
}
