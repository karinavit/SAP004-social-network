import { registerDOM } from './mainregister.js';


export const register = (root) => {
  const container = document.createElement('form');
  container.id = 'form-register';
  container.classList.add('display-column'); // clases atribuídas no nosso css, pois esses elementos não foram criados no arquvio html padrão.
  container.classList.add('display-web'); 

  container.innerHTML = `
    <img class="img img-web" src="../../img/logo.png" alt="logo">
    <div class="display-column register-style-web">
      <h1 class="style-title title-web">Social Trekkers</h1>
      <label class="letter-color">Digite seu nome completo:</label>
      <input class="style-input" name="nameRegister" type="text" placeholder="Digite seu nome completo aqui" required>
      <label class="letter-color">Digite seu e-mail:</label>
      <input class="style-input" name="emailRegister" type="email" placeholder="email@email.com" required>
      <label class="letter-color">Digite sua data de nascimento:</label>
      <input class="style-input" name="dateRegister" type="date" required>
      <label class="letter-color">Digite uma senha:</label>
      <input class="style-input" name="passwordRegister" type="password" minlength="6" required>
      <div class="register-display-buttons margin-web-register">
        <button class="button-login width-button-login login-btn-web" name="backButton">Voltar</button>
        <button class="button-login width-button-login login-btn-web" name="signRegister">Registrar-se</button>
      </div>
    </div>
  `;
  const element = root;
  element.innerHTML = '';
  element.appendChild(container); //aqui o root é rendereizado com este container, e ao ser renderizado ele traz a função de registerDom que é que garante a interação do form com o usuário. 
  registerDOM();
};
