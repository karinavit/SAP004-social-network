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
  postData(post,func) {
    const postCollection = firebase.firestore().collection("posts");
    postCollection.add(post)
      .then((postAdded) => {
        postAdded.get()
          .then((newPost) => {
            func(newPost);
          });
      });
  },
}

export function readPosts(func) {
  const postCollection = firebase.firestore().collection("posts").orderBy("date", "asc");
  postCollection.get()
  .then((posts) => {
    posts.forEach((post) => {
      if (firebase.auth().currentUser.uid == post.data().id_user || post.data().visibility == "public") {
        func(post);
      }
    });
  });
}

export function readComments (postId, element) {
  firebase.firestore().collection("posts").doc(postId)
  .collection('comments').get().then(function(doc) {
    doc.forEach(doc => {
      console.log(doc.data())
      const div = document.createElement("div")
      div.innerHTML=`
      <p>${doc.data().name} </p>
      <p>${doc.data().text}</p>`

      console.log(div)
    element.getElementsByClassName("comment-area")[0].prepend(div)
    })
}).catch(function(error) {
    console.log("Error getting document:", error);
});
}




export function googleAndFacebookLogin(provider) {
  // const userCollection = firebase.firestore().collection("users-info");
  provider.setCustomParameters({ prompt: 'select_account' });
  firebase
    .auth()
    .signInWithPopup(provider)
    // .then(function (result) {
    //   const user = result.user;
    //   const userInfo = {
    //     name: user.displayName,
    //     id_user: user.uid,
    //     email: user.email
    //   }
    //   userCollection.add(userInfo);      
    // })
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


export function comments(text, postId, date, parentId ) {
  const commentsReference =
  firebase.firestore().collection('posts').doc(postId)
        .collection('comments');

  commentsReference
      .doc()
      .set({
        name: firebase.auth().currentUser.displayName,
        date: date, 
        text:text,
        parent_id: postId
      })
      .then(() => {})
      .catch( (error) => {
          console.error('Error adding document: ', error);
      });
    }
