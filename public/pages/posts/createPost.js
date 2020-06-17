import { firebaseActions } from '../../data.js';
import { postsFunc } from './mainposts.js';
import { commentsDOM, clearArea } from './mainComments.js';
import { printComments } from './commentsTemplate.js';

export function createElementPost(post) {
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
    postsFunc.editPostDOM(post.id, postElement);
  });
  postElement.getElementsByClassName('like')[0].addEventListener('click', () => {
    postsFunc.likePostDOM(post.id, postElement);
  });
  postElement.getElementsByClassName('delete')[0].addEventListener('click', () => {
    postsFunc.deletePostDOM(post.id, postElement);
  });
  postElement.getElementsByClassName('comment-button')[0].addEventListener('click', () => {
    const comentario = postElement.getElementsByClassName('post-comment')[0];
    comentario.classList.toggle('show');
    commentsDOM(post.id, post.data().id_user, postElement);
  });
  firebaseActions.readComments(post.id, printComments, postElement, clearArea);

  if (post.data().id_user !== firebase.auth().currentUser.uid) {
    postElement.querySelector('.delete').classList.add('visibility');
    postElement.querySelector('.edit').classList.add('visibility');
  }
  return postElement;
}
