import { menuFixed } from '../posts/menu/menufixed.js';
import { backPosts, readPostsProfileDOM, editProfile } from './mainprofile.js';
import { firebaseActions, readUserInfo } from '../../data.js';

export const profilePage = (root, name) => {
  const container = document.createElement('div');
  container.classList.add('display-column');
  container.innerHTML = `
    <div class="display-mobile display-web-row">
      <div class="margin-top-user profile-mobile display-web-user profile-web">
        <img class="img-user img-user-web" src="../../img/startrek_spock.jpg" alt="spock">
        <div class="name-user">
          <h1>Bem vindo ${name}</h1>
          <br>
          <p>Number One - Classic</p>
          <div id='edit-profile'>Editar</div>
        </div>
      </div>
      <br>
      <ul class="width-post-profile posts-web" id="profile-posts"></ul>
    </div>
    <button id="button-back-posts" class="button-login width-button-login">Voltar posts</button>
  `;
  const element = root;
  element.innerHTML = '';
  element.appendChild(container);
  menuFixed(container);
  backPosts();
  readUserInfo(editProfile);
  firebaseActions.readPostsProfile(readPostsProfileDOM, element);
};
