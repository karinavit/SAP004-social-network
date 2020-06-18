import { firebaseActions } from '../../data.js';

export const initFunc = {
  loginEventFacebook() {
    const facebookAuth = document.querySelector('#facebook');
    facebookAuth.addEventListener('click', () => {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebaseActions.googleAndFacebookLogin(provider);
    });
  }, //nesta função vamos pegar o id que atribuimos ao facebook que está indicado no nosso container do html, e atribuimos ao evento de click a busca no provedor do facebook, de modo que ele traga os dados do nosso usuário do provedor do face para a nossa aplicação. o uso da palavra "new" é padrão para utilizarmos em conjunto com as "autenticações do firesabe, ver linha 7 e 8. (PS: Pesquisar o por que usar a palavra new.)
  loginEventGoogle() {
    const googleAuth = document.querySelector('#google');
    googleAuth.addEventListener('click', () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebaseActions.googleAndFacebookLogin(provider);
    });
  }, // idem linha de raciocínio do Face.

  loginEvent() {
    const form = document.querySelector('#form-id');
    form.loginButton.addEventListener('click', (event) => {
      event.preventDefault();
      firebaseActions.loginData(form.emailInput.value, form.passwordInput.value);
    });
  }, // aqui acontece literalmente o evento da função loginData que vimos no Data.js

  registerEvent() {
    const registerButton = document.querySelector('#register');
    registerButton.addEventListener('click', () => {
      window.location = '#register';
    });
  }, // está pegando o id do botão da página de registro e quando clicarmos nele o nosso hash muda para a página registro.
};
