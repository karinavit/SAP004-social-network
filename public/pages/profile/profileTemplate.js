import { menuFixed } from '../posts/menu/menufixed.js';
import { readPostsProfileDOM, editProfile } from './mainprofile.js';
import { firebaseActions, profileUpdate } from '../../data.js';

export const profilePage = (root, name = '') => {
  const container = document.createElement('div');
  container.classList.add('display-column');
  container.innerHTML = `
    <div class="display-mobile display-web-row">
      <div class="margin-top-user profile-mobile display-web-user profile-web">
        <img class="img-user img-user-web" src="../../img/startrek_spock.jpg" alt="spock">
        <div class="name-user">
          <h1>Bem vindo <span id='true-name'> ${name}</span></h1>
          <br>
          <p>Number One - Classic</p>
          <img class="edit" id='edit-profile' src="../../img/edit-regular.svg" alt="edit-profile">
        </div>
      </div>
      <br>
      <ul class="width-post-profile posts-web" id="profile-posts"></ul>
    </div>
  `;
  const element = root;
  element.innerHTML = '';
  element.appendChild(container);
  menuFixed(container);
  profileUpdate.readUserInfo(editProfile);
  firebaseActions.readPostsProfile(readPostsProfileDOM, element);
};
