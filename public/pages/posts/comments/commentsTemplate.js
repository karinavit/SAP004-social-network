import { firebaseActions, oneLikePerUserComments } from '../../../data.js';
import { editComments, updateCommentsLikes } from './mainComments.js';

export function printComments(doc, element, postId) {
  const div = document.createElement('div');
  div.id = doc.id;
  div.innerHTML = `
    <p>${doc.data().name}</p>
    <p class="comment-posted">${doc.data().text}</p>
    <p>${doc.data().date}</p>
    <img class="delete-comment delete" src="../../img/trash-alt-regular.svg" alt="delete-posts">
    <span class="display-like">
      <img class="like-img like-comment" src="../../img/like-spock.svg" alt="like-button">
      <span class="like-value-comment">${doc.data().likes}</span>
    </span>
    <span class="edit-comment edit name-edit-post">
      <img src="../../img/edit-regular.svg" alt="edit-posts">
    </span>
  `;
  div.classList.add('style-comment-area');
  element.getElementsByClassName('comment-area')[0].prepend(div);

  element.getElementsByClassName('delete-comment')[0].addEventListener('click', () => {
    firebaseActions.deleteComments(postId, doc.id);
  });
  element.getElementsByClassName('edit-comment')[0].addEventListener('click', () => {
    const commentEdited = element.getElementsByClassName('comment-posted')[0];
    editComments(doc.id, commentEdited, postId);
  });
  element.getElementsByClassName('like-comment')[0].addEventListener('click', () => {
    const commentsLike = Number(element.getElementsByClassName('like-value-comment')[0].textContent);
    oneLikePerUserComments(postId, doc.id, updateCommentsLikes, commentsLike, element);
  });

  if (doc.data().id_user !== firebase.auth().currentUser.uid) {
    element.querySelector('.delete-comment').classList.add('visibility');
    element.querySelector('.edit-comment').classList.add('visibility');
  } else if (doc.data().postOwner === firebase.auth().currentUser.uid) {
    element.querySelector('.delete-comment').classList.add('visibility');
  }
}
