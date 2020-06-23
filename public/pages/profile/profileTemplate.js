import { menuFixed } from '../posts/menu/menufixed.js';
import { readPostsProfileDOM, editProfile } from './mainprofile.js';
import { firebaseActions, profileUpdate } from '../../data.js';

export const profilePage = (root, name = '') => {
  const container = document.createElement('div');
  container.classList.add('display-column');
  container.innerHTML = `
    <div class='display-mobile display-web-row'>
      <div class='margin-top-user profile-mobile display-web-user profile-web'>
        <div class='img-user' id='photo-area'></div>
        <div class='name-user'>
          <h1>
            <span id='true-name'>${name}</span>
          </h1>
          <br>
          <img class='edit' id='edit-profile' src='../../img/edit-regular.svg' alt='edit-profile'>
        </div>
      </div>
      <ul class='width-post-profile profile-posts-web' id='profile-posts'></ul>
    </div>
  `;
  const element = root;
  element.innerHTML = '';
  element.appendChild(container);
  menuFixed(container);
  profileUpdate.readUserInfo(editProfile);
  firebaseActions.readPostsProfile(readPostsProfileDOM, element);
};
