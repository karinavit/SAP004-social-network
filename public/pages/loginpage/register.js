export const register = () => {
  const container = document.createElement("div");
  container.classList.add("display-column");

  container.innerHTML = `
    <img class="img" src="img/logo.png" alt="logo">
    <img class="img" src="img/name.png" alt="name">
    <label class="letter-color">Digite seu nome Completo:</label>
    <input class="style-input" id="name-input-register" type="text">
    <label class="letter-color">Digite seu e-mail:</label>
    <input class="style-input" id="email-input-register" type="email">
    <label class="letter-color">Digite sua data de nascimento:</label>
    <input class="style-input" id="date-input-register" type="date">
    <label class="letter-color">Digite uma senha:</label>
    <input class="style-input" id="password-input-register" type="password">
    <div class="register-display-buttons">
      <a class="width-button-login" href="/#">
        <button class="button-login" id="back-button">Voltar</button>
      </a>
      <a class="width-button-login" href="/#posts" >
        <button class="button-login" id="sign-in-button">Registrar-se</button>
      </a>
    </div>
  `;
  return container;
};
