import { firebaseActions, oneLikePerUserComments } from '../../../data.js';
import { editComments, updateCommentsLikes } from './mainComments.js';

export function printComments(doc, element, postId) {
  const div = document.createElement('div');
  div.id = doc.id;
  div.innerHTML = `
    <p class='comment-name'>${doc.data().name}</p>
    <p class='comment-posted'>${doc.data().text}</p>
    <div class='display-comments'>
      <span>
        <div class='like-comment display-like'>
          <img class='like-img liked-comment svg-class ${doc.data().wholiked.includes(firebase.auth().currentUser.uid) ? '' : 'hidden'}' src='../../img/like-spock.svg' alt='like-button'>
          <img class='like-img like-back-comment svg-class ${doc.data().wholiked.includes(firebase.auth().currentUser.uid) ? 'hidden' : ''}' src='../../img/notliked.svg' alt='like-button'>
          <span class='like-value-comment'>${doc.data().wholiked.length}</span>
        </div>
      </span>
      <p>${doc.data().date}</p>
      <span class='comment-edit-delete'>
        <img class='edit-comment edit' src='../../img/edit-regular.svg' alt='edit-posts'>
        <img class='delete-comment delete' src='../../img/trash-alt-regular.svg' alt='delete-posts'>
      </span>
    </div>
  `;
  div.classList.add('style-comment-area');
  element.getElementsByClassName('comment-area')[0].prepend(div);

  element.getElementsByClassName('delete-comment')[0].addEventListener('click', () => {
    const popup = document.getElementById('popup');
    popup.innerHTML = '';
    popup.classList.remove('popup-none');
    popup.classList.add('popup');
    const deleteAreaPopUp = `
      <h1 class='edit-title-popup-post'>Tem certeza que deseja excluir essa mensagem subespacial?</h1>
      <img class='img-edit-popup' src='../../../img/klingon-head.svg' alt='klingon-head'>
      <div class='button-delete-div-popup'>
        <button class='button-login width-button-login border-btn-del-yes' id='yes'>Excluir</button>
        <button class='button-login width-button-login border-btn-del-cancel' id='no'>Cancelar</button>
      </div>
    `;
    popup.innerHTML = deleteAreaPopUp;

    const confirm = document.getElementById('yes');
    confirm.addEventListener('click', () => {
      firebaseActions.deleteComments(postId, doc.id);
      popup.classList.remove('popup');
      popup.classList.add('popup-none');
    });
    const cancel = document.getElementById('no');
    cancel.addEventListener('click', () => {
      popup.classList.remove('popup');
      popup.classList.add('popup-none');
    });
  });
  element.getElementsByClassName('edit-comment')[0].addEventListener('click', () => {
    editComments(doc.id, postId);
  });
  element.getElementsByClassName('like-comment')[0].addEventListener('click', () => {
    oneLikePerUserComments({
      postId,
      docId: doc.id,
      func: updateCommentsLikes,
      element,
    });
    element.getElementsByClassName('liked-comment')[0].classList.toggle('hidden');
    element.getElementsByClassName('like-back-comment')[0].classList.toggle('hidden');
  });

  if (doc.data().id_user !== firebase.auth().currentUser.uid) {
    element.querySelector('.delete-comment').classList.add('visibility');
    element.querySelector('.edit-comment').classList.add('visibility');
    if (doc.data().postOwner === firebase.auth().currentUser.uid) {
      element.querySelector('.delete-comment').classList.remove('visibility');
    }
  }
}
