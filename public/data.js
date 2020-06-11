import {readPostsDOM} from "./main.js"

export const firebaseActions = {
  loginData(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        alert(error.message);
      });
  },
  loggoutData() {
    firebase.auth().signOut();
  },
  nameData() {
    return firebase.auth().currentUser.displayName;
  },
  editOrLikePost(postId, updateTextOrLike) {
    const postCollection = firebase.firestore().collection("posts");
    postCollection.doc(postId).update(updateTextOrLike)
    .then(() => { });
  },
  deletePost(postId) {
    const postCollection = firebase.firestore().collection("posts");
    postCollection.doc(postId).delete()
    .then(() => { });
  },
  register(email, password, name, birthday) {
    const userCollection = firebase.firestore().collection("users-info");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((cred) =>
        cred.user.updateProfile({ displayName: name })
      )
      .then(() => {

        const uid = firebase.auth().currentUser.uid
        userCollection.doc(uid).set({
          birthday: birthday,
          email: email,
          id_user: firebase.auth().currentUser.uid,
          name: name,
        })
      })
      .catch((error) => {
        alert(error.message);
      });
  },
  postData(post) {
    const postCollection = firebase.firestore().collection("posts");
    postCollection.add(post)
      .then((postAdded) => {
        postAdded.get()
          .then((newPost) => {
            readPostsDOM(newPost);
          });
      });
  },
}

export function readPosts() {
  const postCollection = firebase.firestore().collection("posts").orderBy("date", "asc");
  postCollection.get()
  .then((posts) => {
    posts.forEach((post) => {
      if (firebase.auth().currentUser.uid == post.data().id_user || post.data().visibility == "public") {
        readPostsDOM(post);
      }
    });
  });
}

export function googleLogin() {
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


export function comments(text, postId, date ) {
  const commentsReference =
  firebase.firestore().collection('posts').doc(postId)
        .collection('comments');

  commentsReference
      .doc()
      .set({
        name: firebase.auth().currentUser.displayName,
        date: date, 
        text:text,
      })
      .then(() => {})
      .catch( (error) => {
          console.error('Error adding document: ', error);
      });
    }
