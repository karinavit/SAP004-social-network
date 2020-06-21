import { firebaseActions } from '../../data.js';

export const initFunc = {
  loginEventFacebook() {
    const facebookAuth = document.querySelector('#facebook');
    facebookAuth.addEventListener('click', () => {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebaseActions.googleAndFacebookLogin(provider);
    });
  },
  loginEventGoogle() {
    const googleAuth = document.querySelector('#google');
    googleAuth.addEventListener('click', () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebaseActions.googleAndFacebookLogin(provider);
    });
  },
  loginEvent(errHandle) {
    const form = document.querySelector('#form-id');
    form.loginButton.addEventListener('click', (event) => {
      event.preventDefault();
      firebaseActions.loginData(form.emailInput.value, form.passwordInput.value, errHandle);
    });
  },
  registerEvent() {
    const registerButton = document.querySelector('#register');
    registerButton.addEventListener('click', () => {
      window.location = '#register';
    });
  },
  forgotPassword() {
    const forgetPasswordButton = document.getElementsByClassName('forgot')[0];
    forgetPasswordButton.addEventListener('click', () => {
      const popup = document.getElementById('popup');
      popup.innerHTML = '';
      popup.classList.remove('popup-none');
      popup.classList.add('popup');
      const editAreaPopUp = `<label>Digite seu e-mail para recuperar sua senha:</label>
    <input type='email' id='email-user'>
    <button type='submit' id='send'>Enviar</button>`;
      popup.innerHTML = editAreaPopUp;
      document.getElementById('send').addEventListener('click', () => {
        firebaseActions.recoverPassword(document.getElementById('email-user').value);
        popup.classList.remove('popup');
        popup.classList.add('popup-none');
      });
    });
  },
  errorsLogin(err) {
    const divError = document.querySelector('#div-error');
    divError.innerHTML = `${err}`;
  },
};
