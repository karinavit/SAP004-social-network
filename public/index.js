import { routes } from "./routes.js";
import { signIn } from "./pages/posts/posts.js";
import {registerDOM , postDOM} from "./main.js"
import {readPosts, googleLogin} from "./data.js"
const container = document.querySelector("#root");

function init() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      container.innerHTML = "";
      container.appendChild(signIn(firebase.auth().currentUser.displayName));
      const loggoutButton = document.querySelector("#loggout");
      const menuBar = document.querySelector("#bar-menu");
      menuBar.addEventListener("click", () => {
        loggoutButton.classList.toggle("show-loggout");
      })
      loggoutButton.addEventListener("click", () => {
        firebase.auth().signOut();
      });
      document.getElementById("postados").innerHTML = "";
      readPosts();
      postDOM();
    } else if (!user) {
      container.innerHTML = "";
      container.appendChild(routes.home);
      const emailInput = document.querySelector("#email-input");
      const passwordInput = document.querySelector("#password-input");
      const loginButton = document.querySelector("#submit-btn");
      loginButton.addEventListener("click", () => {
        firebase
          .auth()
          .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
          .catch((error) => {
            alert(error.message);
          });
      })
      const registerButton = document.querySelector("#register");
      registerButton.addEventListener("click", () => {
        container.innerHTML = "";
        container.appendChild(routes.register);
        registerDOM();
      });

      const googleAuth = document.querySelector("#google");

      googleAuth.addEventListener("click",googleLogin);
    }
  });
}

window.addEventListener("load", () => {
  init();
});




