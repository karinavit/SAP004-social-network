
export const firebaseActions = {
  editOrLikePost(postId, updateTextOrLike) {
    const postCollection = firebase.firestore().collection("posts");
  
    postCollection.doc(postId).update(updateTextOrLike).then(() => { })
  },
  deletePost(postId) {
    const postCollection = firebase.firestore().collection("posts");
  
    postCollection.doc(postId).delete().then(() => { })
  },
  register(email, password,name,userData) {
    const userCollection = firebase.firestore().collection("users-info");

    firebase
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then((cred) =>
        cred.user.updateProfile({ displayName: name })
      )
      .then(() => {
        userCollection.add(userData);
      })
      .catch((error) => {
        alert(error.message);
      });
  },
   googleLogin() {
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
  

}


