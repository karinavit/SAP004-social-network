import { formLogin } from './pages/login/login.js';
import { signIn } from './pages/posts/posts.js';
import { register } from './pages/register/register.js';
import { firebaseActions } from './data.js';

const root = document.querySelector('#root');

function hashs() {
  root.innerHTML = '';
  switch (window.location.hash) {
    case '':
      formLogin(root);
      break;
    case '#register':
      register(root);
      break;
    case '#posts':
      setTimeout(() => {
        signIn(root, firebaseActions.takeNameData());
      }, 1000);
      break;
    default:
      formLogin(root);
  };
}

const changePages = () => {
  window.addEventListener('hashchange', () => {
    hashs();
  });
};

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
