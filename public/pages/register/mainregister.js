import { firebaseActions } from '../../data.js';

export function registerDOM() {
  const form = document.querySelector("#form-register")

  form.backButton.addEventListener('click', () => {
    window.location = '#';
  });

  form.signRegister.addEventListener('click', (event) => {
    event.preventDefault()
    firebaseActions.register(form.emailRegister.value, form.passwordRegister.value,
      form.nameRegister.value, form.dateRegister.value);
  });
}
