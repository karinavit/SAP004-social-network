import { login } from './firebaseservice.js';
import { errLogin, errorRegister } from './handleErrors.js';

export const firebaseActions = {
  loginData(email, password, funcError) {
    return login(email, password)
      .catch((err) => {
        const errorResult = errLogin.filter(item => item.code === err.code);
        funcError(errorResult[0].message);
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
  editOrLikeComments(document) {
    const postCollection = firebase.firestore().collection('posts').doc(document.postId).collection('comments');
    postCollection.doc(document.docId).update(document.update)
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
      .then((cred) => {
        cred.user.updateProfile({ displayName: document.name });
        cred.user.updateProfile({ photoURL: 'https://assets.b9.com.br/wp-content/uploads/2015/02/mr-spock.jpg' });
      })
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
          photo: user.photoURL,
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
function updateLikePostsValue(likeValue, arrayAction, document) {
  document.func(likeValue, document.postId, document.element);
  firebaseActions.editOrLikePost(document.postId, {
    wholiked: firebase.firestore.FieldValue[arrayAction](firebase.auth().currentUser.uid),
  });
}

export function oneLikePerUser(document) {
  const postCollection = firebase.firestore().collection('posts').doc(document.postId);
  postCollection.get()
    .then((posts) => {
      let likeValue = posts.data().wholiked.length;
      if (posts.data().wholiked.includes(firebase.auth().currentUser.uid)) {
        likeValue -= 1;
        updateLikePostsValue(likeValue, 'arrayRemove', document);
      } else {
        likeValue += 1;
        updateLikePostsValue(likeValue, 'arrayUnion', document);
      }
    });
}

function updateLikeCommentsValue(likeComment, arrayAction, document) {
  document.func(likeComment, document.element);
  firebaseActions.editOrLikeComments({
    docId: document.docId,
    update: {
      wholiked: firebase.firestore.FieldValue[arrayAction](firebase.auth().currentUser.uid),
    },
    postId: document.postId,
  });
}

export function oneLikePerUserComments(document) {
  const postCollection = firebase.firestore().collection('posts')
    .doc(document.postId).collection('comments')
    .doc(document.docId);
  postCollection.get()
    .then((posts) => {
      if (posts.data().wholiked.includes(firebase.auth().currentUser.uid)) {
        let likeComment = posts.data().wholiked.length;
        likeComment -= 1;
        updateLikeCommentsValue(likeComment, 'arrayRemove', document);
      } else {
        let likeComment = posts.data().wholiked.length;
        likeComment += 1;
        updateLikeCommentsValue(likeComment, 'arrayUnion', document);
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
