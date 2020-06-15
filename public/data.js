const firebaseActions = {
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
  takeNameData() {
    return firebase.auth().currentUser.displayName;
  },
  editOrLikePost(postId, updateTextOrLike) {
    const postCollection = firebase.firestore().collection('posts');
    postCollection.doc(postId).update(updateTextOrLike)
      .then(() => { });
  },
  deletePost(postId) {
    const postCollection = firebase.firestore().collection('posts');
    postCollection.doc(postId).delete()
      .then(() => { });
  },
  register(email, password, name, birthday) {
    const userCollection = firebase.firestore().collection('users-info');
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
  postData(post, func) {
    const postCollection = firebase.firestore().collection('posts');
    postCollection.add(post)
      .then((postAdded) => {
        postAdded.get()
          .then((newPost) => {
            func(newPost);
          });
      });
  },
  readCommentsData(postId, func, element, clear) {
    firebase
      .firestore()
      .collection('posts').doc(postId)
      .collection('comments').orderBy('date', 'asc').onSnapshot((doc) => {
        clear(element)
        doc.forEach(doc => {
          func(doc, element)
        })
      })
  },
  readPosts(func) {
    const postCollection = firebase.firestore().collection('posts').orderBy('date', 'asc');
    postCollection.get()
      .then((posts) => {
        posts.forEach((post) => {
          if (firebase.auth().currentUser.uid == post.data().id_user || post.data().visibility == 'public') {
            func(post);
          }
        });
      });
  },
  googleAndFacebookLogin(provider) {
    const userCollection = firebase.firestore().collection('users-info');
    provider.setCustomParameters({ prompt: 'select_account' });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        userCollection.doc(user.uid).set({
          email: user.email,
          id_user: user.uid,
          name: user.displayName,
        });
      })
      .catch(function (error) {
        let errorMessage = error.message;
        alert(errorMessage);
      });
  },
  comments(text, postId, date, parentId) {
    const commentsReference =
      firebase.firestore().collection('posts').doc(postId)
        .collection('comments');
  
    commentsReference
      .doc()
      .set({
        name: firebase.auth().currentUser.displayName,
        date: date,
        text: text,
        parent_id: postId
      })
      .then(() => { })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  },  
}

export default firebaseActions;