import { createElementProfilePost } from './profileAndComments.js';
import { updateNameUser, updateUsersInfoStore } from '../../data.js';

export function backPosts() {
  const buttonBack = document.querySelector('#button-back-posts');
  buttonBack.addEventListener('click', () => {
    window.location = '#posts';
  });
}

export function readPostsProfileDOM(post, element) {
  element.querySelector('#profile-posts').prepend(createElementProfilePost(post));
}

export function editProfile(posts) {
  const buttonEdit = document.getElementById('edit-profile');
  buttonEdit.addEventListener('click', () => {
    const popup = document.getElementById('popup');
    popup.innerHTML = '';
    popup.classList.remove('popup-none');
    popup.classList.add('popup');
    const editAreaPopUp = `<label>Nome</label> 
    <input id='update-name' type='text' value='${posts.data().nameUser}'>
    <label>Data de Nascimento</label>
    <input id="update-birthday" type='date' value='${posts.data().birthdayUser}'>
    <label>Foto</label>
    <input id='update-photo' type='file'>
    <div id='photo-preview'></div>
    <label>Patente</label>
    <input type='text'>
    <button type='submit' id='update-info'>Atualizar</button>
    `;
    popup.innerHTML = editAreaPopUp;
    const buttonUpdate = document.getElementById('update-info');
    buttonUpdate.addEventListener('click', (event) => {
      event.preventDefault();
      const nameUpdate = document.getElementById('update-name');
      const birthdayUpdate = document.getElementById('update-birthday');
      const photoUpdate = document.getElementById('update-photo');
      const photoPreview = document.getElementById('photo-preview');
      updateNameUser(nameUpdate.value);
      const uid = firebase.auth().currentUser.uid;
      const updateProfile = {
        name: nameUpdate.value,
        email: firebase.auth().currentUser.email,
        birthday: birthdayUpdate.value,
      }
      updateUsersInfoStore(uid, updateProfile);
      popup.classList.remove('popup');
      popup.classList.add('popup-none');
    });
  });
}
