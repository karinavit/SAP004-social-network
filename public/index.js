import { formLogin } from "./pages/login/login.js";
import { signIn } from "./pages/posts/posts.js";
import { register } from "./pages/register/register.js";
import firebaseActions from "./data.js";

export const routes = {
  home: formLogin,
  posts: signIn,
  register: register,
};

const root = document.querySelector("#root");

const changePages = () => {
  window.addEventListener("hashchange", teste)
}

function teste () {
  root.innerHTML = "";
    switch (window.location.hash) {
      case "":
        routes.home(root);
        break;
      case "#register":
        routes.register(root);
        break;
      case "#posts":
        setTimeout(() => {
          routes.posts(root, firebaseActions.takeNameData());
        }, 1000);
        break;
      default:
        routes.home(root);
    }
}

function init() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.location = "#posts";
    } else {
      window.location = "#";
      // window.location = "#register"
    }
  });
}

window.addEventListener("load", () => {
  init();
  changePages();
  teste();
});
