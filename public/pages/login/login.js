export const formLogin = () => {
  const container = document.createElement("div");
  container.classList.add("display-column");
  container.classList.add("display-web");

  container.innerHTML = `
    <img class="img img-web" src="img/logo.png" alt="logo">
    <div class="display-column login-style-web">
      <h1 class="style-title title-web">Social Trekkers</h1>
      <input class="style-input" id='email-input' type='email' placeholder="Digite seu e-mail...">
      <input class="style-input" id='password-input' type='password' placeholder="Digite sua senha...">
      <a class="width-button-login" href="/#posts">
      <button class="button-login login-btn-web" id='submit-btn' >Logar</button>
      </a>
      <p class="letter-color margin-web"> Esqueceu a senha,
        <a class="link-register" href="">Clique aqui</a>
      </p>
      <p class="letter-color logo-google" id="google">Entre com 
        <img class="img-g" src="img/google.png" alt="logo">
      </p>
      <p class="letter-color">Caso não possua conta ainda, 
        <a class="link-register" href="/#register" id="register">Registre-se</a>
      </p>      
    </div>
  `;

  return container;
};
