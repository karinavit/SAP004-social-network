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

const changePages = () => {
  window.addEventListener('hashchange', () => {
    init()
  });
};

function init() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.location.hash !== '#profile'? window.location = '#posts': window.location = '#profile'  
      hashs();
    } else {
      window.location.hash !== '#register'? window.location = '#': window.location = '#register'
      hashs();
    }
  });
}

window.addEventListener('load', () => {
  hashs();
  init();
  changePages();
});
