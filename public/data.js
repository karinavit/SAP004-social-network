import { login } from './firebaseservice.js';

//o arquivo data.js é onde estão as funções puras de manipulação do firebase. 

export const firebaseActions = {
  loginData(email, password) {
    return login(email, password)
      .catch(() => {
      });
  }, // o catch é para nos lembrar que precisamos tratar os erros. 
  loggoutData() {
    firebase.auth().signOut();
  },
  takeNameData() {
    return firebase.auth().currentUser.displayName;
  }, //autentifica o usuário corrente e apresenta seu nome na tela.

  //editar ou dar like no post, o processo é o mesmo, de modo que ele vai buscar na coleção de posts na firestore. 
  //Estamos usando o .then ao final é referente a resolução da promise que está sendo resolvida em outro local. Esta linha de raciocínio é usada nas funções: editOrLikePost e editOrLikeComments.
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

  // busca o id do post a ser deletado, na coleção pertinente
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
      .then(cred => cred.user.updateProfile({ displayName: name })) // este then é chamado no exato momento em que o usuário foi criado, então o cred é de credential. Onde o displayName no firebase.auth é atualizado com o nome do usuário corrente "currentuser"
      .then(() => {
        const uid = firebase.auth().currentUser.uid; //armazenamos o uid em uma constante.
        // depois criamos o objeto com os dados que queremos do nosso usuário, onde o mesmo nome da propriedade do objeto é criado na firestore na coleção de Users_info
        const infoUser = { 
          birthdayUser: birthday,
          emailUser: email,
          idUser: firebase.auth().currentUser.uid,
          nameUser: name,
        };
        userCollection.doc(uid).set(infoUser); //o doc está definindo exatamente onde está o id do usuário que será usado e atribuído para o memso.
      })
      .catch(() => {
      }); // catch está no futuro espaço tempo para o tratamento de erros.
  },

  postData(post, func) {
    const postCollection = firebase.firestore().collection('posts');
    postCollection.add(post)
      .then((postAdded) => {
        postAdded.get() // usando o get para realizar uma primeira leitura, 
          .then((newPost) => { //realiza uma segunda leitura e traz somente o novo post
            func(newPost);
          });
      });
  },
  readComments(postId, func, element, clear) {
    firebase
      .firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('date', 'asc')
      .onSnapshot((doc) => { // olha todas as vezes e já atualiza (tipo o wacht)
        clear(element); // limpa o DOM e 
        // carrega o que precisamos. 
        doc.forEach((document) => {
          func(document, element, postId);
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
  //readPosts, lê a coleção de posts por data de forma crescente, onde o usuário pode ver todos os seus posts e os posts que são públicos de outros usuários.
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
  //provider = provedor, nesta função vamos utilizar as informações do provedor do google / facebook, e vamos atribuir no objeto as mesmas informações que são extraidas do mesmo.
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

  comments(text, postId, date, postOwner) {
    const commentsReference = firebase
      .firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments');
    commentsReference
      .doc()
      .set({
        name: firebase.auth().currentUser.displayName,
        id_user: firebase.auth().currentUser.uid,
        date,
        text,
        postOwner,
        parentId: postId, // é o ID do post onde o comentário foi postado.
        likes: 0,
        wholiked: [],// aqui garantimos que quem curtiu uma vez, não vai curtir novamente.
      })
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
      if (posts.data().wholiked.includes(firebase.auth().currentUser.uid)) { // está verificando se o id do usuário está contido no post, de modo que se sim, então retira-se a curtida.
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
        }); // na linha 173, literalmente conclui-se a ação de atribuir o like, uninindo o id de usuário ao id do post likeado.
      }
    });
}
// oneLikePerUserComments mesma linha de raciocínio acima. =)
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
