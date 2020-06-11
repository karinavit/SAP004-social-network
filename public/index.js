import { loggoutMenuEvent, pagePost, loginEvent, registerEvent, loginEventGoogle } from "./main.js";
import { formLogin } from "./pages/login/login.js";
import { signIn } from "./pages/posts/posts.js";
import { register } from "./pages/register/register.js";

export const routes = {
  home: formLogin(),
  posts: signIn(name),
  register: register(),
};

const container = document.querySelector("#root");

function init() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loggoutMenuEvent(container);
      pagePost();

    } else {
      loginEvent(container);
      registerEvent(container)
      loginEventGoogle();
    }
  });
}

window.addEventListener("load", () => {
  init();
});