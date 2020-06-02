import { routes } from './routes.js';
const container = document.querySelector('#root');

function init() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      container.innerHTML = '';
      container.appendChild(routes.posts)
      const loggoutButton = document.querySelector("#loggout")
      loggoutButton.addEventListener("click", () => {
        firebase.auth().signOut()
      })
      post()


    } else if (!user) {
      container.innerHTML = '';
      container.appendChild(routes.home)
      const emailInput = document.querySelector("#email-input")
      const passwordInput = document.querySelector("#password-input")
      const loginButton = document.querySelector("#submit-btn")
      loginButton.addEventListener("click", () => {
        firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value)
      })
      const registerButton = document.querySelector("#register")
      registerButton.addEventListener("click", () => {
        container.innerHTML = '';
        container.appendChild(routes.register)
        register()
      })

      const googleAuth = document.querySelector("#google")

      googleAuth.addEventListener("click", googleLogin)


    }

  })
}

window.addEventListener('load', () => {
  // container.appendChild(routes[window.location.hash.replace("#", "")])
  init()
  // readPosts()
});

function post() {
  const postar = document.querySelector("#postar")
  const postTexto = document.querySelector("#porfavor")

  postar.addEventListener("click", (event) => {
    event.preventDefault()
    const post = {
      text: postTexto.value,
      id_user: firebase.auth().currentUser.uid,
      username: firebase.auth().currentUser.displayName,
      likes: 0
    }
    const postCollection = firebase.firestore().collection("posts")

    postCollection.add(post)
    readPosts()
  })


}

function readPosts() {
  const postCollection = firebase.firestore().collection("posts")

  postCollection.get().then(snap => {
    snap.forEach(post => addPosts(post))
  })
}

function addPosts (post) {
  const postTemplate = `
  <li id='${post.id}'>
      ${post.data().text} ❤️${post.data().likes}
  </li>
  `
  document.querySelector("#postados").innerHTML += postTemplate;

}


function register() {
  const emailRegisterInput = document.querySelector("#email-input-register")
  const nameRegisterInput = document.querySelector("#name-input-register")
  const dateRegisterInput = document.querySelector("#date-input-register")
  const passwordRegisterInput = document.querySelector("#password-input-register")
  const singInButton = document.querySelector("#sign-in-button")



  singInButton.addEventListener("click", () => {
    const userCollection = firebase.firestore().collection("users-info")

    const user = {
      name: nameRegisterInput.value,
      email: emailRegisterInput.value,
      birthday: dateRegisterInput.value,
      password: passwordRegisterInput.value
    }
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((cred) => cred.user.updateProfile({ displayName: user.name }))
      .then(() => {

        const uid = firebase.auth().currentUser.uid

        console.log(uid)
        userCollection.add({
          name: nameRegisterInput.value,
          email: emailRegisterInput.value,
          birthday: dateRegisterInput.value,
          password: passwordRegisterInput.value,
          uid: firebase.auth().currentUser.uid
        })
      })

  })
}

function googleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function (error) {
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
