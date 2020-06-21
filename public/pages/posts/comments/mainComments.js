import { firebaseActions } from '../../../data.js';

export function updateCommentsLikes(like, element) {
  const likeValueElement = element.getElementsByClassName('like-value-comment')[0];
  likeValueElement.innerHTML = like;
}

export function editComments(docId, postId) {
  const element = document.getElementById(`${docId}`);
  const commentEdited = element.getElementsByClassName('comment-posted')[0];
  const popup = document.getElementById('popup');
  popup.innerHTML = '';
  popup.classList.remove('popup-none');
  popup.classList.add('popup');
  const editAreaPopUp = `
    <h1 class="edit-title-popup-post">Edite sua mensagem subespacial:</h1>
    <img class="img-edit-popup" src="../../../img/img-edit-popup.svg" alt="tricorder">
    <p id='text-area' class="edit-message-popup-post">${commentEdited.textContent}</p>
    <button class="button-login width-button-login" id='save'>Salvar</button>
  `;
  popup.innerHTML = editAreaPopUp;
  const textArea = document.getElementById('text-area');
  const buttonSave = document.getElementById('save');
  if (textArea.contentEditable !== 'true') {
    textArea.contentEditable = true;
    textArea.focus();
  } else {
    textArea.contentEditable = false;
  }
  buttonSave.addEventListener('click', () => {
    commentEdited.textContent = textArea.textContent;
    firebaseActions.editOrLikeComments(docId, { text: commentEdited.textContent }, postId);
    popup.classList.remove('popup');
    popup.classList.add('popup-none');
  });
}
