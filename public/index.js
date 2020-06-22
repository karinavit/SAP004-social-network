import routes from './routes.js';
import { firebaseActions } from './data.js';
import { postsFunc } from './pages/posts/postPage/mainposts.js';

const root = document.querySelector('#root');

function verifyHash(hash) {
  return hash === '' ? 'home' : hash.replace('#', '');
}

function hashs() {
  root.innerHTML = '';
  const hashPage = verifyHash(window.location.hash);
  if (hashPage === 'home' || hashPage === 'register') {
    routes[hashPage](root);
  } else {
    setTimeout(() => {
      routes[hashPage](root, firebaseActions.takeNameData(postsFunc.updateNameData), firebaseActions.takePhotoUser());
    }, 1000);
  }
}

function init() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (window.location.hash !== '#profile') window.location = '#posts';
      hashs();
    } else {
      if (window.location.hash !== '#register') window.location = '#';
      hashs();
    }
  });
}

const changePages = () => {
  window.addEventListener('hashchange', () => {
    init();
  });
};


window.addEventListener('load', () => {
  hashs();
  init();
  changePages();
});
