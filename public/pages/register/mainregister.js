import { firebaseActions } from '../../data.js';

export function registerDOM() {
  const emailRegisterInput = document.querySelector('#email-input-register');
  const nameRegisterInput = document.querySelector('#name-input-register');
  const birthdayRegisterInput = document.querySelector('#date-input-register');
  const passwordRegisterInput = document.querySelector('#password-input-register');
  const singInRegisterButton = document.querySelector('#sign-in-register-button');
  const backButton = document.querySelector('#back-button');

  backButton.addEventListener('click', () => {
    window.location = '#';
  });

  singInRegisterButton.addEventListener('click', () => {
    firebaseActions.register(emailRegisterInput.value, passwordRegisterInput.value,
      nameRegisterInput.value, birthdayRegisterInput.value);
  });
}
