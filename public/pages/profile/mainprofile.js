import { createElementProfilePost } from './profileAndComments.js';
import {updateNameUser, updateUsersInfoStore} from '../../data.js';

export function backPosts() {
  const buttonBack = document.querySelector('#button-back-posts');
  buttonBack.addEventListener('click', () => {
    window.location = '#posts';
  });
}

export function readPostsProfileDOM(post, element) {
  element.querySelector('#profile-posts').prepend(createElementProfilePost(post));
}

export function editProfile(posts){
  const buttonEdit = document.getElementById('edit-profile')
  buttonEdit.addEventListener('click', () => {
    const popup = document.getElementById('popup');
    popup.innerHTML = '';
    popup.classList.remove('popup-none');
    popup.classList.add('popup');
    const editAreaPopUp = `<label>Nome</label> 
    <input id='update-name' type='text' value='${posts.data().nameUser}'>
    <label>Data de Nascimento</label>
    <input type='date' value='${posts.data().birthdayUser}'>
    <label>Foto</label>
    <input type='file'>
    <label>Patente</label>
    <input type='text'>
    <button type='submit' id='update-info'>Atualizar</button>
    `;
    popup.innerHTML = editAreaPopUp;
const buttonUpdate = document.getElementById('update-info')
buttonUpdate.addEventListener('click', (event) => {
event.preventDefault();
const nameUpdate = document.getElementById('update-name')
updateNameUser(nameUpdate.value)
const uid = firebase.auth().currentUser.uid
updateUsersInfoStore(uid, {nameUser: nameUpdate.value})
popup.classList.remove('popup');
popup.classList.add('popup-none');

})

  })

}