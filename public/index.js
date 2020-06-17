import routes from './routes.js';
import { firebaseActions } from './data.js';

const root = document.querySelector('#root');

function hashs() {
  root.innerHTML = '';
  const hashPage = verifyHash(window.location.hash);
  if (hashPage === "home" || hashPage === "register") {
    routes[hashPage](root);
  } else {
    setTimeout(() => {
      routes[hashPage](root, firebaseActions.takeNameData());
    }, 1000);
  }
}

function verifyHash(hash) {
  return hash === '' ? "home" : hash.replace("#", '');
}

const changePages = () => {
  window.addEventListener('hashchange', () => {
    verifyUser()
  });
};

function verifyUser() {
  const user = firebase.auth().currentUser;
  if (user) {
    if (window.location.hash !== "#profile") {
    window.location = "#posts";
    } 
  } else {
    if (window.location.hash !== "#register") {
    window.location = "#";
    }
  }
  hashs();
}

function init() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      window.location = '#posts';
    } else {
      window.location = '#';
    }
  });
}

window.addEventListener('load', () => {
  init();
  hashs();
  changePages();
});
