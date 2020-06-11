import { initFunc } from "./main.js";
import { formLogin } from "./pages/login/login.js";
import { signIn } from "./pages/posts/posts.js";
import { register } from "./pages/register/register.js";

export const routes = {
  home: formLogin,
  posts: signIn,
  register: register,
};

const container = document.querySelector("#root");

function init() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      initFunc.loggoutMenuEvent(container);
      initFunc.pagePost();

    } else {
      initFunc.loginEvent(container);
      initFunc.registerEvent(container);
      initFunc.loginEventGoogle();
    }
  });
}

window.addEventListener("load", () => {
  init();
});