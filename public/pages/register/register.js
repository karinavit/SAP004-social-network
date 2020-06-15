import { registerDOM } from './mainregister.js';

export const register = (root) => {
  const container = document.createElement('div');
  container.classList.add('display-column');
  container.classList.add('display-web');

  container.innerHTML = `
    <img class="img img-web" src="../../img/logo.png" alt="logo">
    <div class="display-column register-style-web">
      <h1 class="style-title title-web">Social Trekkers</h1>
      <label class="letter-color">Digite seu nome completo:</label>
      <input class="style-input" id="name-input-register" type="text">
      <label class="letter-color">Digite seu e-mail:</label>
      <input class="style-input" id="email-input-register" type="email">
      <label class="letter-color">Digite sua data de nascimento:</label>
      <input class="style-input" id="date-input-register" type="date">
      <label class="letter-color">Digite uma senha:</label>
      <input class="style-input" id="password-input-register" type="password">
      <div class="register-display-buttons margin-web-register">
        <button class="button-login width-button-login login-btn-web" id="back-button">Voltar</button>
        <button class="button-login width-button-login login-btn-web" id="sign-in-register-button">Registrar-se</button>
      </div>
    </div>
  `;
  const element = root;
  element.innerHTML = '';
  element.appendChild(container);
  registerDOM();
};
