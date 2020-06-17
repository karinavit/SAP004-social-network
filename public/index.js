import routes from './routes.js';
import { firebaseActions } from './data.js';

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
      routes[hashPage](root, firebaseActions.takeNameData());
    }, 1000);
  }
}

function verifyUser() {
  const user = firebase.auth().currentUser;
  if (user) {
    if (window.location.hash !== '#profile') {
      window.location = '#posts';
    }
  } else if (window.location.hash !== '#register') {
    window.location = '#';
  }
  hashs();
}

const changePages = () => {
  window.addEventListener('hashchange', () => {
    verifyUser();
  });
};

function init() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      verifyUser();
    } else {
      verifyUser();
    }
  });
}

window.addEventListener('load', () => {
  hashs();
  init();
  changePages();
});
