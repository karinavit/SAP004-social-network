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

      googleAuth.addEventListener("click", elements.googleLogin);
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
      date: elements.getHoursPosted()
    };
    const postCollection = firebase.firestore().collection("posts");

    postCollection.add(post)
      .then((postAdded) => {
        postAdded.get()
          .then((newPost) => {
            postTexto.value = "";
            privateField.checked = false;
            let postElement = elements.createElementPost(newPost);
            let postadosElement = document.querySelector("#postados")
            postadosElement.prepend(postElement);
          })
      });
  });

}


function readPosts() {
  const postCollection = firebase.firestore().collection("posts").orderBy("date", "desc");
  document.getElementById("postados").innerHTML = "";

  postCollection.get().then((posts) => {
    posts.forEach((post) => {
      if (post.data().visibility == "public") {
      let postElement = elements.createElementPost(post);
        document.querySelector("#postados").appendChild(postElement);
      }
      else if (post.data().visibility == "private" && firebase.auth().currentUser.uid == post.data().id_user) {
        let postElement = elements.createElementPost(post);
        document.querySelector("#postados").appendChild(postElement);
      }
    });
  });
}

