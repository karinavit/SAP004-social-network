import { routes } from "./routes.js";
import { signIn } from "./pages/posts/posts.js";
import {elements} from "./main.js"
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
      post();
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

      googleAuth.addEventListener("click", googleLogin);
    }
  });
}

window.addEventListener("load", () => {
  init();
});


function post() {
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
      date: getHoursPosted()
    };
    const postCollection = firebase.firestore().collection("posts");

    postCollection.add(post)
      .then((postAdded) => {
        postAdded.get()
          .then((newPost) => {
            postTexto.value = "";
            privateField.checked = false;
            let postElement = createElementPost(newPost);
            let postadosElement = document.querySelector("#postados")
            postadosElement.prepend(postElement);
          })
      });
  });

}

function getHoursPosted() {
  const date = new Date();
  const fullDate = {
    day: date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
    month: date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth(),
    year: date.getFullYear(),
    hours: date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
    minutes: date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
    seconds: date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
  }
  return `${fullDate.day}/${fullDate.month}/${fullDate.year} as ${fullDate.hours}:${fullDate.minutes}:${fullDate.seconds}`;
}

function readPosts() {
  const postCollection = firebase.firestore().collection("posts").orderBy("date", "desc");
  document.getElementById("postados").innerHTML = "";

  postCollection.get().then((posts) => {
    posts.forEach((post) => {
      if (post.data().visibility == "public") {
        let postElement = createElementPost(post);
        document.querySelector("#postados").appendChild(postElement);
      }
      else if (post.data().visibility == "private" && firebase.auth().currentUser.uid == post.data().id_user) {
        let postElement = createElementPost(post);
        document.querySelector("#postados").appendChild(postElement);
      }
    });
  });
}
















function googleLogin() {
  let provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      // ...
    });
}
