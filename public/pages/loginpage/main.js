export const formLogin = () => {
  const container = document.createElement('div');

  container.innerHTML = `
      <input id='email-input' type='email'>
      <input id='password-input' type='password'>
      <a href="/#posts">
      <button id='submit-btn' >Logar</button>
      </a>
      
      <p id="google"> GOOGLE</p>
      <p> Caso não possua conta ainda, <a href="/#register" id="register"> Registre-se</a></p>
  `;
  
  return container
};

