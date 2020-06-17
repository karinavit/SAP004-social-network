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
  loginEvent() {
    const form = document.querySelector('#form-id');
    form.loginButton.addEventListener('click', (event) => {
      event.preventDefault();
      firebaseActions.loginData(form.emailInput.value, form.passwordInput.value);
    });
  },
  registerEvent() {
    const registerButton = document.querySelector('#register');
    registerButton.addEventListener('click', () => {
      window.location = '#register';
    });
  },
};
