import { routes } from './routes.js';
const container = document.querySelector('#root');

function init() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      container.innerHTML = '';
      container.appendChild(routes.posts);
      const loggoutButton = document.querySelector("#loggout");
      loggoutButton.addEventListener("click", () => {
        firebase.auth().signOut();
      })
      post();

    } else if (!user) {
      container.innerHTML = '';
      container.appendChild(routes.home);
      const emailInput = document.querySelector("#email-input");
      const passwordInput = document.querySelector("#password-input");
      const loginButton = document.querySelector("#submit-btn");
      loginButton.addEventListener("click", () => {
        firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value);
      })
      const registerButton = document.querySelector("#register");
      registerButton.addEventListener("click", () => {
        container.innerHTML = '';
        container.appendChild(routes.register);
        register()
      })

      const googleAuth = document.querySelector("#google");

      googleAuth.addEventListener("click", googleLogin);
    }
  })
}

window.addEventListener('load', () => {
  init();
  readPosts();
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
      likes: 0
    }
    const postCollection = firebase.firestore().collection("posts");

    postCollection.add(post);
    document.getElementById("postados").innerHTML = "";
    readPosts();
  })
}

function readPosts() {
  const postCollection = firebase.firestore().collection("posts");

  postCollection.get().then(snap => {
    snap.forEach(post => addPosts(post));
  })
    .then(() => deletePosts())
    .then(() => likePosts());
}

function deletePosts() {
  const postCollection = firebase.firestore().collection("posts");

  const deletar = document.querySelectorAll(".delete");
  deletar.forEach(element => {
    element.addEventListener("click", (event) => {
      const postID = event.currentTarget.parentElement.id;
      postCollection.doc(postID).delete().then(() => {
        document.getElementById("postados").innerHTML = "";
        readPosts();
      })
    })
  })
}

function likePosts() {
  const postCollection = firebase.firestore().collection("posts");

  const likeButton = document.querySelectorAll(".like");

  console.log(likeButton)
  likeButton.forEach(element => {
    element.addEventListener("click", (event) => {
      const postID = event.currentTarget.parentElement.id;
      const likeNextElement = Number(event.currentTarget.nextSibling.textContent) + 1;
      postCollection.doc(postID).update({ likes: likeNextElement });
      console.log(likeNextElement);
      // location.reload();
      document.getElementById("postados").innerHTML = "";
      readPosts();
    })
  })
}

function addPosts(post) {
  const postTemplate = `
    <li id='${post.id}'>
        <p>${post.data().text}</p> <span class="delete"> Deletar </span>
        <span class="like"> ❤️ </span><span class="like-value">${post.data().likes}</span> 
    </li>
  `;
  document.querySelector("#postados").innerHTML += postTemplate;
}


function register() {
  const emailRegisterInput = document.querySelector("#email-input-register");
  const nameRegisterInput = document.querySelector("#name-input-register");
  const dateRegisterInput = document.querySelector("#date-input-register");
  const passwordRegisterInput = document.querySelector("#password-input-register");
  const singInButton = document.querySelector("#sign-in-button");

  singInButton.addEventListener("click", () => {
    const userCollection = firebase.firestore().collection("users-info");

    const user = {
      name: nameRegisterInput.value,
      email: emailRegisterInput.value,
      birthday: dateRegisterInput.value,
      password: passwordRegisterInput.value
    }
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((cred) => cred.user.updateProfile({ displayName: user.name }))
      .then(() => {

        user.uid = firebase.auth().currentUser.uid;

        console.log(uid);
        userCollection.add(user);
      })
  })
}

function googleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    let token = result.credential.accessToken;
    // The signed-in user info.
    let user = result.user;
    // ...
  }).catch(function (error) {
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