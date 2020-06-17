import { firebaseActions } from '../../../data.js';
import { postsFunc } from './mainposts.js';
import { printComments } from '../comments/commentsTemplate.js';
import { menuFixed } from '../menu/menufixed.js';

function editHoursPosted(dateInfo) {
  return dateInfo < 10 ? `0${dateInfo}` : dateInfo;
}

export function getHoursPosted() {
  const date = new Date();
  return `${editHoursPosted(date.getDate())}/${editHoursPosted(date.getMonth() + 1)}
  /${editHoursPosted(date.getFullYear())} 
  ${editHoursPosted(date.getHours())}:${editHoursPosted(date.getMinutes())}
  :${editHoursPosted(date.getSeconds())}`;
}

export function clearArea(element) {
  const elementArea = element;
  elementArea.getElementsByClassName('comment-area')[0].innerHTML = '';
}

export function commentsDOM(postId, ownerPost) {
  document.getElementsByClassName('post-button')[0].addEventListener('click', () => {
    const textPosted = document.getElementsByClassName('comment-input-area')[0];
    firebaseActions.comments(textPosted.value, postId, getHoursPosted(), ownerPost);
  });
}

function createElementPost(post) {
  const postTemplate = `
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
      <span>
        <img class="comment-button" src="../../img/comentario.svg" alt="comment-button">
        <img class="delete" src="../../img/trash-alt-regular.svg" alt="delete-posts">
      </span>
    </div>
    <ul>
      <li class="post-comment">
        <input type="text" class="comment-input-area input-comment">
        <button type="submit" class="post-button width-button-login button-login">Comentário</button>
      </li>
      <li class="comment-area"></li>
    </ul>
  `;
  const postElement = document.createElement('li');
  postElement.classList.add('each-post');
  postElement.id = `post-${post.id}`;
  postElement.innerHTML = postTemplate;
  postElement.getElementsByClassName('edit')[0].addEventListener('click', () => {
    postsFunc.editPostDOM(post.id);
  });
  postElement.getElementsByClassName('like')[0].addEventListener('click', () => {
    postsFunc.likePostDOM(post.id, postElement);
  });
  postElement.getElementsByClassName('delete')[0].addEventListener('click', () => {
    postsFunc.deletePostDOM(post.id);
  });
  postElement.getElementsByClassName('comment-button')[0].addEventListener('click', () => {
    const comentario = postElement.getElementsByClassName('post-comment')[0];
    comentario.classList.toggle('show');
    commentsDOM(post.id, post.data().id_user);
  });
  firebaseActions.readComments(post.id, printComments, postElement, clearArea);

  if (post.data().id_user !== firebase.auth().currentUser.uid) {
    postElement.querySelector('.delete').classList.add('visibility');
    postElement.querySelector('.edit').classList.add('visibility');
  }
  return postElement;
}

function readPostsDOM(post) {
  document.querySelector('#postados').prepend(createElementPost(post));
}

function postDOM() {
  const postar = document.querySelector('#postar');
  const postTexto = document.querySelector('#post-text');
  const img = document.querySelector('#post-img');
  const inputFile = document.querySelector('#input-file');
  const privateField = document.querySelector('#private');

  img.addEventListener('click', () => {
    inputFile.click();
  });

  postar.addEventListener('click', (event) => {
    event.preventDefault();
    const post = {
      text: postTexto.value,
      id_user: firebase.auth().currentUser.uid,
      name: firebase.auth().currentUser.displayName,
      likes: 0,
      private: true,
      visibility: privateField.checked ? 'private' : 'public',
      date: getHoursPosted(),
      wholiked: [],
    };
    postTexto.value = '';
    privateField.checked = false;
    firebaseActions.postData(post, readPostsDOM);
  });
}

function pagePost() {
  document.getElementById('postados').innerHTML = '';
  firebaseActions.readPosts(readPostsDOM);
  postDOM();
}

export function initPostsAndMenu(container) {
  menuFixed(container);
  pagePost();
}
