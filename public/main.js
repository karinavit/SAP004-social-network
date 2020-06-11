import { routes } from "./index.js";
import { firebaseActions, readPosts, googleLogin, comments } from "./data.js";

const elements = {
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
  getHoursPosted() {
    const date = new Date();
    const fullDate = {
      day: date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
      month: date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth(),
      year: date.getFullYear(),
      hours: date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
      minutes: date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
      seconds: date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(),
    }
    return `${fullDate.day}/${fullDate.month}/${fullDate.year} as 
    ${fullDate.hours}:${fullDate.minutes}:${fullDate.seconds}`;
  },
  createElementPost(post) {
    const postTemplate = `
      <div class="name-edit-post">
        <p class="post-user-name">${post.data().name}</p>
        <span class="edit">
          <img src="img/edit-regular.svg" alt="edit-posts">
        </span>
      </div>
      <p class="post-text-area" id='text-${post.id}'>${post.data().text}</p>
      <div class="name-edit-post">
        <div>
          <span class="like">❤️</span>
          <span class="like-value">${post.data().likes}</span> 
        </div>
        <p> Postado em: ${post.data().date}</p>
        <p class="comentar"> Comentar</p>
        <span class="delete">
          <img src="img/trash-alt-regular.svg" alt="delete-posts">
        </span>
        </div>
      <ul class="comments hidden">
      <input type="text" class="comment-area ">
      <button type="submit" class="post-comment"> Comentário </button>
        </ul>
    `;

    let postElement = document.createElement("li");
    postElement.classList.add("each-post");
    postElement.id = `post-${post.id}`;
    postElement.innerHTML = postTemplate;
    postElement.getElementsByClassName("edit")[0].addEventListener("click", () => {
      elements.editPostDOM(post.id);
    });
    postElement.getElementsByClassName("like")[0].addEventListener("click", () => {
      elements.likePostDOM(post.id);
    });
    postElement.getElementsByClassName("delete")[0].addEventListener("click", () => {
      elements.deletePostDOM(post.id);
    });
    postElement.getElementsByClassName("comentar")[0].addEventListener("click", () => {
         const comentario = postElement.getElementsByClassName("comments")[0]
      comentario.classList.toggle("hidden")
       
      // comments("Oi isso é um teste", post.id, elements.getHoursPosted())
    })

    if (post.data().id_user !== firebase.auth().currentUser.uid) {
      postElement.querySelector(".delete").classList.add("hidden");
      postElement.querySelector(".edit").classList.add("hidden");
    }
    return postElement;
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

    firebaseActions.postData(post);

  });
}

export function registerDOM() {
  const emailRegisterInput = document.querySelector("#email-input-register");
  const nameRegisterInput = document.querySelector("#name-input-register");
  const birthdayRegisterInput = document.querySelector("#date-input-register");
  const passwordRegisterInput = document.querySelector("#password-input-register");
  const singInButton = document.querySelector("#sign-in-button");
  const backButton = document.querySelector("#back-button");

  backButton.addEventListener("click", () => {
    container.innerHTML = '';
    container.appendChild(routes.home());
  });

  singInButton.addEventListener("click", () => {
    firebaseActions.register(emailRegisterInput.value, passwordRegisterInput.value, nameRegisterInput.value, birthdayRegisterInput.value);
  });
}

export function readPostsDOM(post) {
  document.querySelector("#postados").prepend(elements.createElementPost(post));
}

export const initFunc = {
  pagePost() {
    document.getElementById("postados").innerHTML = "";
    readPosts();
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
      registerDOM();
    });
  },
}