import { menuFixed } from '../posts/menu/menufixed.js';
import { backPosts, readPostsProfileDOM } from './mainprofile.js';
import { firebaseActions } from '../../data.js';

export const profilePage = (root, name) => {
  const container = document.createElement('div');
  container.classList.add('display-column');
  container.innerHTML = `
    <button id="button-back-posts" style="margin-top: 150px">Voltar posts</button>
    <div class="display-mobile display-web-row">
      <div class="margin-top-user profile-mobile display-web-user profile-web">
        <img class="img-user img-user-web" src="../../img/startrek_spock.jpg" alt="spock">
        <div class="name-user">
          <h1>Bem vindo ${name}</h1>
          <br>
          <p>Number One - Classic</p>
        </div>
      </div>
      <br>
      <ul class="width-list-post list-post-web" id="profile-posts"></ul>
    </div>
  `;
  const element = root;
  element.innerHTML = '';
  element.appendChild(container);
  menuFixed(container);
  backPosts();
  firebaseActions.readPostsProfile(readPostsProfileDOM, element);
};
