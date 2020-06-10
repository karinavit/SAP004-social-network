
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
  }

}


