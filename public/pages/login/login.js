import { initFunc } from './mainlogin.js';

export const formLogin = (root) => {
  const container = document.createElement('form');
  container.id = 'form-id';
  container.classList.add('display-column');
  container.classList.add('display-web');

  container.innerHTML = `
    <img class='img img-web' src='../../img/logo.png' alt='logo'>
    <div class='display-column login-style-web'>
      <h1 class='style-title title-web'>Social Trekkers</h1>
      <input class='style-input' name='emailInput' type='email' placeholder='Digite seu e-mail...' required>
      <input class='style-input' name='passwordInput' type='password' placeholder='Digite sua senha...' required>
      <button class='button-login login-btn-web width-button-login'  name='loginButton' type='submit'>Logar</button>
      <p id="div-error" class="error-message" ></p>
      <p class='letter-color margin-web'> Esqueceu a senha,
        <span class='link-register forgot'>Clique aqui</span>
      </p>
      <p class='letter-color logo-google-facebook'>Entre com 
        <img class='img-g' id='google' src='../../img/google.png' alt='logo-google'>
        <img class='img-f'  id='facebook' src='../../img/facebook.png' alt='logo-facebook'>
      <p class='letter-color'>Caso não possua conta ainda, 
        <a class='link-register' href='#register' id='register'>Registre-se</a>
      </p>  
      <div class="div-sound">
        </div> 
        <div class="audio-classic">Abertura da série Clássica
        <audio class="play-audio-classic" src="http://trekcore.com/tos/audio/themes/season1voice.mp3"></audio>
        <p class="box-play">
          <span class="play-classic span-play-classic">Play</span>
          <span class="pause-classic span-play-classic">Pause</span>
        </p>
        </div>    
    </div>
  `;

  const element = root;
  element.innerHTML = '';
  element.appendChild(container);
  initFunc.loginEvent(initFunc.errorsLogin);
  initFunc.registerEvent();
  initFunc.loginEventGoogle();
  initFunc.loginEventFacebook();
  initFunc.forgotPassword();
  initFunc.playSoundClassic();
};
