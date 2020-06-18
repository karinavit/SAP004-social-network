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
  register(email, password, name, birthday) {
    const userCollection = firebase.firestore().collection('users-info');
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(cred => cred.user.updateProfile({ displayName: name }))
      .then(() => {
        const uid = firebase.auth().currentUser.uid;
        const infoUser = {
          birthdayUser: birthday,
          emailUser: email,
          idUser: firebase.auth().currentUser.uid,
          nameUser: name,
        };
        userCollection.doc(uid).set(infoUser);
      })
      .catch(() => {
      });
  },
  postData(post, func) {
    const postCollection = firebase.firestore().collection('posts');
    postCollection.add(post)
      .then((postAdded) => {
        postAdded.onSnapshot((newPost) => {
          func(newPost);
        });
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
  readPosts(func) {
    const postCollection = firebase.firestore().collection('posts').orderBy('date', 'asc');
    postCollection.get()
      .then((posts) => {
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
    const commentsReference = firebase
      .firestore()
      .collection('posts')
      .doc(document.parentId)
      .collection('comments');
    commentsReference
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


function readUserInfo() {
  const postCollection = firebase.firestore().collection('users-info').doc(firebase.auth().currentUser.uid);
  postCollection.get()
    .then((posts) => {
      console.log(posts.data());
    });
}

function updateNameUser(newName) {
  firebase.auth().currentUser.updateProfile({ displayName: newName });
}

function updateUsersInfoStore(uid, newInfoUser) {
  const userCollection = firebase.firestore().collection('users-info');
  userCollection.doc(uid).set(newInfoUser);
}
