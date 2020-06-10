const elements = {
  registerDOM() {
    const emailRegisterInput = document.querySelector("#email-input-register");
    const nameRegisterInput = document.querySelector("#name-input-register");
    const birthdayRegisterInput = document.querySelector("#date-input-register");
    const passwordRegisterInput = document.querySelector("#password-input-register");
    const singInButton = document.querySelector("#sign-in-button");
    const backButton = document.querySelector("#back-button");

    backButton.addEventListener("click", () => {
      container.innerHTML = '';
      container.appendChild(routes.home);
    })

    singInButton.addEventListener("click", () => {
      const user = {
        name: nameRegisterInput.value,
        email: emailRegisterInput.value, birthday: birthdayRegisterInput.value
      }
      firebaseActions.register(emailRegisterInput.value, passwordRegisterInput.value, nameRegisterInput.value, user)
    })
  },

}