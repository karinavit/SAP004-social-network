import { login } from './firebaseservice.js';

export const firebaseActions = {
  loginData(email, password) {
    return login(email, password)
      .catch(() => {
      });
  },
  loggoutData() {
    firebase.auth().signOut();
  },
  takeNameData() {
    return firebase.auth().currentUser.displayName;
  },
  storageImagesUpdate(archive, func) {
    const stringArchive = 'archive';
    const ref = firebase.storage().ref(stringArchive);
    ref.child(stringArchive + archive.name).put(archive).then(() => {
      ref.child(stringArchive + archive.name).getDownloadURL().then((url) => {
      func(url, archive.name)
      });
    });
  },
  editOrLikePost(postId, updateTextOrLike) {
    const postCollection = firebase.firestore().collection('posts');
    postCollection.doc(postId).update(updateTextOrLike)
      .then(() => { });
  },
  editOrLikeComments(docId, valueToUpdate, postId) {
    const postCollection = firebase.firestore().collection('posts').doc(postId).collection('comments');
    postCollection.doc(docId).update(valueToUpdate)
      .then(() => { });
  },
  deletePost(postId) {
    const postCollection = firebase.firestore().collection('posts');
    postCollection.doc(postId).delete()
      .then(() => { });
  },
  deleteComments(postId, docId) {
    const postCollection = firebase.firestore().collection('posts').doc(postId).collection('comments');
    postCollection.doc(docId).delete()
      .then(() => { });
  },
  register(document) {
    const userCollection = firebase.firestore().collection('users-info');
    firebase
      .auth()
      .createUserWithEmailAndPassword(document.email, document.password)
      .then(cred => cred.user.updateProfile({ displayName: document.name }))
      .then(() => {
        const uid = firebase.auth().currentUser.uid;
        userCollection.doc(uid).set(document);
      })
      .catch(() => {
      });
  },
  recoverPassword(emailAddress) {
    firebase.auth().sendPasswordResetEmail(emailAddress)
      .then(() => { })
      .catch(() => { });
  },
  postData(post) {
    const postCollection = firebase.firestore().collection('posts');
    postCollection.add(post)
      .then(() => {
        // postAdded.onSnapshot((newPost) => {
        //   func(newPost);
        // });
      });
  },
  readComments(document) {
    firebase
      .firestore()
      .collection('posts')
      .doc(document.postId)
      .collection('comments')
      .orderBy('date', 'asc')
      .onSnapshot((doc) => {
        document.clear(document.element);
        doc.forEach((docs) => {
          document.func(docs, document.element, document.postId);
        });
      });
  },
  readPostsProfile(func, element) {
    const postCollection = firebase.firestore().collection('posts').orderBy('date', 'asc');
    postCollection.get()
      .then((posts) => {
        posts.forEach((post) => {
          if (firebase.auth().currentUser.uid === post.data().id_user) {
            func(post, element);
          }
        });
      });
  },
  readPosts(func, funcClear, element) {
    const postCollection = firebase.firestore().collection('posts').orderBy('date', 'asc');
    postCollection.onSnapshot((posts) => {
        funcClear(element);
        posts.forEach((post) => {
          if (firebase.auth().currentUser.uid === post.data().id_user || post.data().visibility === 'public') {
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
          emailUser: user.email,
          idUser: user.uid,
          nameUser: user.displayName,
        });
      })
      .catch(() => {
      });
  },
  comments(document) {
    firebase.firestore()
      .collection('posts')
      .doc(document.parentId)
      .collection('comments')
      .doc()
      .set(document)
      .then(() => { })
      .catch(() => {
      });
  },
};

export function oneLikePerUser(postId, likes, func, element) {
  let likeValue = likes;
  const postCollection = firebase.firestore().collection('posts').doc(postId);
  postCollection.get()
    .then((posts) => {
      if (posts.data().wholiked.includes(firebase.auth().currentUser.uid)) {
        likeValue -= 1;
        func(likeValue, postId, element);
        firebaseActions.editOrLikePost(postId, {
          wholiked: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid),
          likes: likeValue,
        });
      } else {
        likeValue += 1;
        func(likeValue, postId, element);
        firebaseActions.editOrLikePost(postId, {
          likes: likeValue,
          wholiked: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid),
        });
      }
    });
}

export function oneLikePerUserComments(postId, docId, func, commentsLike, element) {
  let likeComment = commentsLike;
  const postCollection = firebase.firestore().collection('posts')
    .doc(postId).collection('comments')
    .doc(docId);
  postCollection.get()
    .then((posts) => {
      if (posts.data().wholiked.includes(firebase.auth().currentUser.uid)) {
        likeComment -= 1;
        func(likeComment, element);
        firebaseActions.editOrLikeComments(docId, {
          wholiked: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid),
          likes: likeComment,
        }, postId);
      } else {
        likeComment += 1;
        func(likeComment, element);
        firebaseActions.editOrLikeComments(docId, {
          likes: likeComment,
          wholiked: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid),
        }, postId);
      }
    });
}

export function readUserInfo(func) {
  const postCollection = firebase.firestore().collection('users-info').doc(firebase.auth().currentUser.uid);
  postCollection.get()
    .then((posts) => {
      func(posts);
    });
}

export function updateNameUser(newName) {
  firebase.auth().currentUser.updateProfile({ displayName: newName });
}

export function updateUsersInfoStore(uid, newInfoUser) {
  const userCollection = firebase.firestore().collection('users-info');
  userCollection.doc(uid).set(newInfoUser);
}
