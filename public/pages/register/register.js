export const register = () => {
  const container = document.createElement("div");
  container.classList.add("display-column");
  container.classList.add("display-web");

  container.innerHTML = `
    <img class="img img-web" src="img/logo.png" alt="logo">
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
        <a class="width-button-login" href="/#">
          <button class="button-login login-btn-web" id="back-button">Voltar</button>
        </a>
        <a class="width-button-login" href="/#posts" >
          <button class="button-login login-btn-web" id="sign-in-button">Registrar-se</button>
        </a>
      </div>
    </div>
  `;
  return container;
};
