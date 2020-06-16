import { menuFixed } from '../posts/menufixed.js';
import { backPosts } from './mainprofile.js';
import {firebaseActions} from "../../data.js"
import {postsFunc, commentsDOM, clearArea} from "../posts/mainposts.js"
import {printComments} from "../posts/postsAndComments.js"
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
      </form>
      <ul class="width-list-post list-post-web" id="profile-posts"></ul>
    </div>
  </div>
  `;

  
  const element = root;
  element.innerHTML = '';
  element.appendChild(container);
  menuFixed(container);
  backPosts();
  firebaseActions.readPostsProfile(readPostsProfileDOM, element)
};

function readPostsProfileDOM(post, element) {
  element.querySelector('#profile-posts').prepend(createElementProfilePost(post));
}


function createElementProfilePost (post) {
  const postElement = `
  <div class="name-edit-post">
    <p class="post-user-name">${post.data().name}</p>
    <span class="edit">
      <img src="../../img/edit-regular.svg" alt="edit-posts">
    </span>
  </div>
  <p class="post-text-area" id='text-${post.id}'>${post.data().text}</p>
  <div class="name-edit-post">
    <span class="display-like">
      <img class="like-img like" src="../../img/like-spock.svg" alt="like-button">
      <span class="like-value">${post.data().likes}</span> 
    </span>
    <p class="style-hour">${post.data().date}</p>
    <span >
      <img class="comment-button" src="../../img/comentario.svg" alt="comment-button">
      <img class="delete" src="../../img/trash-alt-regular.svg" alt="delete-posts">
    </span>
    </div>
  <ul>
    <li class="post-comment">
      <input type="text" class="comment-input-area input-comment">
      <button type="submit" class="post-button width-button-login button-login">Comentário</button>
    </li>
    <li class="comment-area" >
    </li>
  </ul>
`;
const postTemplate = document.createElement('li');
  postTemplate.classList.add('each-post');
  postTemplate.id = `post-${post.id}`;
  postTemplate.innerHTML = postElement;
  postTemplate.getElementsByClassName('edit')[0].addEventListener('click', () => {
    postsFunc.editPostDOM(post.id, postTemplate);
  });
  postTemplate.getElementsByClassName('like')[0].addEventListener('click', () => {
    postsFunc.likePostDOM(post.id, postTemplate);
  });
  postTemplate.getElementsByClassName('delete')[0].addEventListener('click', () => {
    postsFunc.deletePostDOM(post.id, postTemplate);
  });
  postTemplate.getElementsByClassName('comment-button')[0].addEventListener('click', () => {
    const comentario = postTemplate.getElementsByClassName('post-comment')[0];
    comentario.classList.toggle('show');
    commentsDOM(post.id, postTemplate);
  });
  firebaseActions.readComments(post.id, printComments, postTemplate, clearArea);
return postTemplate
}
