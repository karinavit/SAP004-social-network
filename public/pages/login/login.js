export const formLogin = () => {
  const container = document.createElement("div");
  container.classList.add("display-column");

  container.innerHTML = `
      <img class="img" src="img/logo.png" alt="logo">
      <h1 class="style-title">Social Trekkers</h1>
      <input class="style-input" id='email-input' type='email' placeholder="Digite seu e-mail...">
      <input class="style-input" id='password-input' type='password' placeholder="Digite sua senha...">
      <a class="width-button-login" href="/#posts">
      <button class="button-login" id='submit-btn' >Logar</button>
      </a>
      <p class="letter-color"> Esqueceu a senha,
        <a class="link-register" href="">Clique aqui</a>
      </p>
      <p class="letter-color logo-google" id="google">Entre com 
        <img class="img-g" src="img/google.png" alt="logo">
      </p>
      <p id="facebook">Facebook</p>
      <p class="letter-color">Caso não possua conta ainda, 
        <a class="link-register" href="/#register" id="register">Registre-se</a>
      </p>
  `;

  return container;
};
