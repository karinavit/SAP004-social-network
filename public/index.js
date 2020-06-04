import { routes } from "./routes.js";
const container = document.querySelector("#root");

function init() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      container.innerHTML = "";
      container.appendChild(routes.posts);
      const loggoutButton = document.querySelector("#loggout");
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
          .signInWithEmailAndPassword(emailInput.value, passwordInput.value);
      });
      const registerButton = document.querySelector("#register");
      registerButton.addEventListener("click", () => {
        container.innerHTML = "";
        container.appendChild(routes.register);
        register();
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
  const postTexto = document.querySelector("#porfavor");

  postar.addEventListener("click", (event) => {
    event.preventDefault();
    const post = {
      text: postTexto.value,
      id_user: firebase.auth().currentUser.uid,
      name: firebase.auth().currentUser.displayName,
      likes: 0,
      private: true,
    };
    const postCollection = firebase.firestore().collection("posts");

    postCollection.add(post);
    document.getElementById("postados").innerHTML = "";
    readPosts();
  });
}

function readPosts() {
  const postCollection = firebase.firestore().collection("posts");

  postCollection
    .get()
    .then((snap) => {
      snap.forEach((post) => {
        addPosts(post);
      });
    })
    .then(() => deletePosts())
    .then(() => likePosts())
    .then(() => editPosts());
}

function editPosts() {
  const postCollection = firebase.firestore().collection("posts");

  const editar = document.querySelectorAll(".edit");

  editar.forEach((element) => {
    element.addEventListener("click", (event) => {
      const textEdit = event.currentTarget.previousElementSibling;
      const textContent =
        event.currentTarget.previousElementSibling.textContent;
      console.log(textContent);
      textEdit.contentEditable = true;

      editar.forEach((element) => {
        element.addEventListener("click", (event) => {
          const textEdit = event.currentTarget.previousElementSibling;
          textEdit.contentEditable = false;
          const textContent =
            event.currentTarget.previousElementSibling.textContent;
          const postID = event.currentTarget.parentElement.id;
          postCollection.doc(postID).update({ text: textContent });
          document.getElementById("postados").innerHTML = "";
          readPosts();
        });
      });
    });
  });
}

function deletePosts() {
  const postCollection = firebase.firestore().collection("posts");

  const deletar = document.querySelectorAll(".delete");
  deletar.forEach((element) => {
    element.addEventListener("click", (event) => {
      const postID = event.currentTarget.parentElement.id;
      postCollection
        .doc(postID)
        .delete()
        .then(() => {
          document.getElementById("postados").innerHTML = "";
          readPosts();
        });
    });
  });
}

function likePosts() {
  const postCollection = firebase.firestore().collection("posts");

  const likeButton = document.querySelectorAll(".like");

  likeButton.forEach((element) => {
    element.addEventListener("click", (event) => {
      const postID = event.currentTarget.parentElement.id;
      const likeNextElement =
        Number(event.currentTarget.nextSibling.textContent) + 1;
      postCollection.doc(postID).update({ likes: likeNextElement });
      document.getElementById("postados").innerHTML = "";
      readPosts();
    });
  });
}

function addPosts(post) {
  const postTemplate = `
    <li id='${post.id}'>
        <p id='text-${post.id}'>${
    post.data().text
  }</p> <span class="edit">Editar </span> <span class="delete"> Deletar </span>
        <span class="like"> ❤️ </span><span class="like-value">${
          post.data().likes
        }</span> 
    </li>
    `;
  document.querySelector("#postados").innerHTML += postTemplate;
}

function register() {
  const emailRegisterInput = document.querySelector("#email-input-register");
  const nameRegisterInput = document.querySelector("#name-input-register");
  const dateRegisterInput = document.querySelector("#date-input-register");
  const passwordRegisterInput = document.querySelector(
    "#password-input-register"
  );
  const singInButton = document.querySelector("#sign-in-button");

  singInButton.addEventListener("click", () => {
    const userCollection = firebase.firestore().collection("users-info");

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        emailRegisterInput.value,
        passwordRegisterInput.value
      )
      .then((cred) =>
        cred.user.updateProfile({ displayName: nameRegisterInput.value })
      )
      .then(() => {
        const uid = firebase.auth().currentUser.uid;
        userCollection.add({
          name: nameRegisterInput.value,
          email: emailRegisterInput.value,
          birthday: dateRegisterInput.value,
          id_user: uid,
        });
      });
  });
}

function googleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}
