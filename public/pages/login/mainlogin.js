import firebaseActions from "../../data.js";

export const initFunc = {
  loginEventFacebook() {
    const facebookAuth = document.querySelector("#facebook");
    facebookAuth.addEventListener("click", () => {
      let provider = new firebase.auth.FacebookAuthProvider();
      firebaseActions.googleAndFacebookLogin(provider)
    })
  },
  loginEventGoogle() {
    const googleAuth = document.querySelector("#google");
    googleAuth.addEventListener("click", () => {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebaseActions.googleAndFacebookLogin(provider)
    });
  },
  loginEvent() {
    const emailInput = document.querySelector("#email-input");
    const passwordInput = document.querySelector("#password-input");
    const loginButton = document.querySelector("#submit-btn");
    loginButton.addEventListener("click", function click() {
      firebaseActions.loginData(emailInput.value, passwordInput.value);
    });
  },
  registerEvent() {
    const registerButton = document.querySelector("#register");
    registerButton.addEventListener("click", () => {
      window.location = "#register";
    });
  },
}