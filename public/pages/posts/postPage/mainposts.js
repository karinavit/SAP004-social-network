import { firebaseActions, oneLikePerUser } from '../../../data.js';

function updateLikeDOM(like, postId) {
  const postElement = document.getElementById(`post-${postId}`);
  const likeValueElement = postElement.getElementsByClassName('like-value')[0];
  likeValueElement.innerHTML = like;
}

export const postsFunc = {
  loggoutMenuEvent() {
    const loggoutButton = document.querySelector('#loggout');
    loggoutButton.addEventListener('click', () => {
      firebaseActions.loggoutData();
    });
    const menuBar = document.querySelector('#bar-menu');
    menuBar.addEventListener('click', () => {
      loggoutButton.classList.toggle('show-loggout');
    });
  },
  editPostDOM(postId) {
    const element = document.getElementById(`post-${postId}`);
    const textEditElement = element.getElementsByClassName('post-text-area')[0];
    const popup = document.getElementById('popup');
    popup.innerHTML = '';
    popup.classList.remove('popup-none');
    popup.classList.add('popup');
    const editAreaPopUp = `
      <p class='close-popup' id='close-popup'>X</p>
      <h1 class='edit-title-popup-post'>Edite sua mensagem subespacial:</h1>
      <img class='img-edit-popup' src='../../../img/popup-editar.svg' alt='communicator'>
      <textarea id='text-area' class='edit-message-popup-post textarea-edit-popup'>${textEditElement.textContent}</textarea>
      <button class='button-login width-button-login' id='save'>Salvar</button>
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
      textEditElement.textContent = textArea.value;

      firebaseActions.editOrLikePost(postId, {
        text: textEditElement.textContent,
      });
      popup.classList.remove('popup');
      popup.classList.add('popup-none');
    });
    document.getElementById('close-popup').addEventListener('click', () => {
      popup.classList.remove('popup');
      popup.classList.add('popup-none');
    });
  },

  deletePostDOM(postId) {
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
      firebaseActions.deletePost(postId);
      const post = document.getElementById(`post-${postId}`);
      post.remove();
      popup.classList.remove('popup');
      popup.classList.add('popup-none');
    });

    const cancel = document.getElementById('no');
    cancel.addEventListener('click', () => {
      popup.classList.remove('popup');
      popup.classList.add('popup-none');
    });
  },

  likePostDOM(postId, element) {
    oneLikePerUser({ postId, func: updateLikeDOM, element });
  },
  updateNameData(data) {
    document.getElementById('true-name').innerHTML = '';
    document.getElementById('true-name').innerHTML = data;
  },
  updatePhotoData(data) {
    document.getElementById('photo-area').innerHTML = '';
    document.getElementById('photo-area').innerHTML = `
      <img class='photo-user' id='photo-area' src='${data}' alt='photo-user'>
    `;
  },
};
