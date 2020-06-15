import { initFunc } from './mainlogin.js';

export const formLogin = (root) => {
  const container = document.createElement('div');
  container.classList.add('display-column');
  container.classList.add('display-web');

  container.innerHTML = `
    <img class="img img-web" src="../../img/logo.png" alt="logo">
    <div class="display-column login-style-web">
      <h1 class="style-title title-web">Social Trekkers</h1>
      <input class="style-input" id='email-input' type='email' placeholder="Digite seu e-mail...">
      <input class="style-input" id='password-input' type='password' placeholder="Digite sua senha...">
      <button class="button-login login-btn-web width-button-login" id='submit-btn'>Logar</button>
      <p class="letter-color margin-web"> Esqueceu a senha,
        <a class="link-register" href="">Clique aqui</a>
      </p>
      <p class="letter-color logo-google-facebook">Entre com 
        <img class="img-g" id="google" src="../../img/google.png" alt="logo-google">
        <img class="img-f"  id="facebook" src="../../img/facebook.png" alt="logo-facebook">
      <p class="letter-color">Caso não possua conta ainda, 
        <a class="link-register" href="#register" id="register">Registre-se</a>
      </p>      
    </div>
  `;
  const element = root;
  element.innerHTML = '';
  element.appendChild(container);
  initFunc.loginEvent();
  initFunc.registerEvent();
  initFunc.loginEventGoogle();
  initFunc.loginEventFacebook();
};
