import { createElementProfilePost } from './profileAndComments.js';
import { firebaseActions, profileUpdate } from '../../data.js';

export function readPostsProfileDOM(post, element) {
  element.querySelector('#profile-posts').prepend(createElementProfilePost(post));
}

function templateImageProfile(url, archiveName) {
  document.getElementById('update-info').disabled = false;
  document.getElementById('photo-preview').innerHTML = `<img src='${url}' class='image-preview' id='${archiveName}'>`;
}

export function editProfile(posts) {
  const buttonEdit = document.getElementById('edit-profile');
  buttonEdit.addEventListener('click', () => {
    const popup = document.getElementById('popup');
    popup.innerHTML = '';
    popup.classList.remove('popup-none');
    popup.classList.add('popup');
    popup.classList.add('popup-edit-profile-font');
    const editAreaPopUp = `
      <p class='close-popup' id='close-popup'>X</p>
      <label>Nome</label> 
      <input class='style-input' id='update-name' type='text' maxlength='25' value='${posts.data().name}'>
      <label>Data de Nascimento</label>
      <input class='style-input' id='update-birthday' type='date' value='${posts.data().birthday}'>
      <label class='style-input center-input-file'>
        <input id='update-photo' type='file'>Troque sua foto
      </label>
      <div id='photo-preview'>
        <img src='null' class='hidden'>
      </div>
      <button class='button-login width-button-login' type='submit' id='update-info'>Atualizar</button>
    `;
    popup.innerHTML = editAreaPopUp;
    const nameUpdate = document.getElementById('update-name');
    const birthdayUpdate = document.getElementById('update-birthday');
    const photoPreview = document.getElementById('photo-preview');
    const buttonUpdate = document.getElementById('update-info');
    const photoUpdate = document.getElementById('update-photo');
    buttonUpdate.disabled = true;
    birthdayUpdate.addEventListener('keydown', () => {
      buttonUpdate.disabled = false;
    });
    nameUpdate.addEventListener('input', () => {
      buttonUpdate.disabled = false;
    });
    photoUpdate.addEventListener('change', (event) => {
      buttonUpdate.disabled = true;
      const archive = event.target.files[0];
      firebaseActions.storageImagesUpdate(archive, templateImageProfile);
    });
    buttonUpdate.addEventListener('click', (event) => {
      event.preventDefault();
      profileUpdate.updateNameUser(nameUpdate.value);
      profileUpdate.updatePhotoUser(photoPreview.children[0].src);
      const uid = firebase.auth().currentUser.uid;
      const updateProfile = {
        name: nameUpdate.value,
        email: firebase.auth().currentUser.email,
        birthday: birthdayUpdate.value,
        photo: /firebasestorage/i.test(photoPreview.children[0].src) ? photoPreview.children[0].src : firebase.auth().currentUser.photoURL,
      };
      profileUpdate.updateUsersInfoStore(uid, updateProfile);
      popup.classList.remove('popup');
      popup.classList.add('popup-none');
      popup.classList.remove('popup-edit-profile-font');
    });
    document.getElementById('close-popup').addEventListener('click', () => {
      popup.classList.remove('popup');
      popup.classList.add('popup-none');
      popup.classList.remove('popup-edit-profile-font');
    });
  });
}
