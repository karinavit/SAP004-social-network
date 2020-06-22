import { login } from './firebaseservice.js';
import { errLogin, errorRegister } from './handleErrors.js';

export const firebaseActions = {
  loginData(email, password, func) {
    return login(email, password)
      .catch((err) => {
        const errorResult = errLogin.filter(item => item.code === err.code);
        func(errorResult[0].message);
      });
  },
  loggoutData() {
    firebase.auth().signOut();
  },
  takeNameData(func) {
    const uid = firebase.auth().currentUser.uid;
    firebase.firestore().collection('users-info').doc(uid).onSnapshot((doc) => {
      func(doc.data().name);
    });
  },
  takePhotoUser(func) {
    const uid = firebase.auth().currentUser.uid;
    firebase.firestore().collection('users-info').doc(uid).onSnapshot((doc) => {
      func(doc.data().photo);
    });
    },
  storageImagesUpdate(archive, func) {
    const stringArchive = 'archive';
    const ref = firebase.storage().ref(stringArchive);
    ref.child(stringArchive + archive.name).put(archive).then(() => {
      ref.child(stringArchive + archive.name).getDownloadURL().then((url) => {
        func(url, archive.name);
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
  register(document, errorFunc) {
    const userCollection = firebase.firestore().collection('users-info');
    firebase
      .auth()
      .createUserWithEmailAndPassword(document.email, document.password)
      .then(cred => cred.user.updateProfile({ displayName: document.name }))
      .then(() => {
        const uid = firebase.auth().currentUser.uid;
        userCollection.doc(uid).set(document);
      })
      .catch((error) => {
        const errorResult = errorRegister.filter(item => item.code === error.code);
        errorFunc(errorResult[0].message);

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
  readPosts(func, funcClear) {
    const postCollection = firebase.firestore().collection('posts').orderBy('date', 'asc');
    postCollection.onSnapshot((posts) => {
      funcClear();
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
          email: user.email,
          name: user.displayName,
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

export function oneLikePerUser(document) {
  let likeValue = document.likes;
  const postCollection = firebase.firestore().collection('posts').doc(document.postId);
  postCollection.get()
    .then((posts) => {
      if (posts.data().wholiked.includes(firebase.auth().currentUser.uid)) {
        likeValue -= 1;
        document.func(likeValue, document.postId, document.element);
        firebaseActions.editOrLikePost(document.postId, {
          wholiked: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid),
          likes: likeValue,
        });
      } else {
        likeValue += 1;
        document.func(likeValue, document.postId, document.element);
        firebaseActions.editOrLikePost(document.postId, {
          likes: likeValue,
          wholiked: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid),
        });
      }
    });
}

export function oneLikePerUserComments(document) {
  let likeComment = document.commentsLike;
  const postCollection = firebase.firestore().collection('posts')
    .doc(document.postId).collection('comments')
    .doc(document.docId);
  postCollection.get()
    .then((posts) => {
      if (posts.data().wholiked.includes(firebase.auth().currentUser.uid)) {
        likeComment -= 1;
        document.func(likeComment, document.element);
        firebaseActions.editOrLikeComments(document.docId, {
          wholiked: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid),
          likes: likeComment,
        }, document.postId);
      } else {
        likeComment += 1;
        document.func(likeComment, document.element);
        firebaseActions.editOrLikeComments(document.docId, {
          likes: likeComment,
          wholiked: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid),
        }, document.postId);
      }
    });
}


export const profileUpdate = {
  readUserInfo(func) {
    const postCollection = firebase.firestore().collection('users-info').doc(firebase.auth().currentUser.uid);
    postCollection.onSnapshot((posts) => {
      func(posts);
    });
  },
  updateNameUser(newName) {
    firebase.auth().currentUser.updateProfile({ displayName: newName });
  },
  updatePhotoUser(newPhoto) {
    firebase.auth().currentUser.updateProfile({ photoURL: newPhoto });
  },
  updateUsersInfoStore(uid, newInfoUser) {
    const userCollection = firebase.firestore().collection('users-info');
    userCollection.doc(uid).set(newInfoUser);
  },
};
