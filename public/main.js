import { routes } from "./index.js";
import { firebaseActions, readPosts, googleLogin, facebookLogin } from "./data.js";
import{createElementPost} from "./pages/posts/posts.js"

export const elements = {
  editPostDOM(postId) {
    let postElement = document.getElementById(`post-${postId}`);
    let textEditElement = postElement.getElementsByClassName("post-text-area")[0];

    if (textEditElement.contentEditable != "true") {
      textEditElement.contentEditable = true;
      textEditElement.focus();
    } else {
      textEditElement.contentEditable = false;
      firebaseActions.editOrLikePost(postId, { text: textEditElement.textContent });
    }
  },
  deletePostDOM(postId) {
    firebaseActions.deletePost(postId);
    let post = document.getElementById(`post-${postId}`);
    post.remove();

  },
  likePostDOM(postId) {
    let postElement = document.getElementById(`post-${postId}`);
    let likeValueElement = postElement.getElementsByClassName("like-value")[0];
    let likes = Number(likeValueElement.textContent) + 1;
    likeValueElement.innerHTML = likes;
    firebaseActions.editOrLikePost(postId, { likes: likes });
  },
  editHoursPosted(dateInfo) {
    return dateInfo < 10 ? "0" + dateInfo : dateInfo
  },
  getHoursPosted() {
    const date = new Date()
    return `${elements.editHoursPosted(date.getDay())}/${elements.editHoursPosted(date.getMonth()+1)}/${elements.editHoursPosted(date.getFullYear())} 
    ${elements.editHoursPosted(date.getHours())}:${elements.editHoursPosted(date.getMinutes())}:${elements.editHoursPosted(date.getSeconds())}`;
  },
}

export function postDOM() {
  const postar = document.querySelector("#postar");
  const postTexto = document.querySelector("#post-text");
  const img = document.querySelector("#post-img");
  const inputFile = document.querySelector("#input-file");
  const privateField = document.querySelector("#private");

  img.addEventListener("click", () => {
    inputFile.click();
  })
  postar.addEventListener("click", (event) => {
    event.preventDefault();
    const post = {
      text: postTexto.value,
      id_user: firebase.auth().currentUser.uid,
      name: firebase.auth().currentUser.displayName,
      likes: 0,
      private: true,
      visibility: privateField.checked ? "private" : "public",
      date: elements.getHoursPosted(),
    };
    postTexto.value = "";
    privateField.checked = false;

    firebaseActions.postData(post, readPostsDOM);

  });
}

export function registerDOM(element) {
  const emailRegisterInput = document.querySelector("#email-input-register");
  const nameRegisterInput = document.querySelector("#name-input-register");
  const birthdayRegisterInput = document.querySelector("#date-input-register");
  const passwordRegisterInput = document.querySelector("#password-input-register");
  const singInButton = document.querySelector("#sign-in-button");
  const backButton = document.querySelector("#back-button");

  backButton.addEventListener("click", () => {
    element.innerHTML = '';
    element.appendChild(routes.home());
  });

  singInButton.addEventListener("click", () => {
    firebaseActions.register(emailRegisterInput.value, passwordRegisterInput.value, nameRegisterInput.value, birthdayRegisterInput.value);
  });
}

export function readPostsDOM(post) {
  document.querySelector("#postados").prepend(createElementPost(post));
}

export const initFunc = {
  pagePost() {
    document.getElementById("postados").innerHTML = "";
    readPosts(readPostsDOM);
    postDOM();
  },
  loggoutMenuEvent(element) {
    element.innerHTML = "";
    element.appendChild(routes.posts(firebaseActions.nameData()));
    const loggoutButton = document.querySelector("#loggout");
    loggoutButton.addEventListener("click", () => {
      firebaseActions.loggoutData();
    });
    const menuBar = document.querySelector("#bar-menu");
    menuBar.addEventListener("click", () => {
      loggoutButton.classList.toggle("show-loggout");
    });
  },
  loginEventFacebook() {
    const facebookAuth = document.querySelector("#facebook");
    facebookAuth.addEventListener("click", () => {
      facebookLogin()
    })
  },
  loginEventGoogle() {
    const googleAuth = document.querySelector("#google");
    googleAuth.addEventListener("click", googleLogin);
  },
  loginEvent(element) {
    element.innerHTML = "";
    element.appendChild(routes.home());
    const emailInput = document.querySelector("#email-input");
    const passwordInput = document.querySelector("#password-input");
    const loginButton = document.querySelector("#submit-btn");
    loginButton.addEventListener("click", function click() {
      firebaseActions.loginData(emailInput.value, passwordInput.value);
    });
  },
  registerEvent(element) {
    const registerButton = document.querySelector("#register");
    registerButton.addEventListener("click", () => {
      element.innerHTML = "";
      element.appendChild(routes.register());
      registerDOM(element);
    });
  },
}