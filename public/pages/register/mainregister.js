import { firebaseActions } from '../../data.js';

function errorsRegister(err) {
  const divError = document.querySelector('#error-area-register');
  divError.innerHTML = `${err}`;
}

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
      photo: 'https://assets.b9.com.br/wp-content/uploads/2015/02/mr-spock.jpg',
    };
    firebaseActions.register(registerObj, errorsRegister);
  });
}
