import { firebaseActions } from '../../data.js';

export function registerDOM() {
  const form = document.querySelector('#form-register');

  form.backButton.addEventListener('click', () => {
    window.location = '#';
  });
  let imgProfile;
  form.profileImage.addEventListener("change", event => {
      let arquivo = event.target.files[0];
      var ref = firebase.storage().ref('arquivo')
      ref.child('arquivo' + arquivo.name).put(arquivo).then(() => {
        ref.child('arquivo' + arquivo.name).getDownloadURL().then(url => {
          imgProfile = url;
          console.log('postei')
        })
    })
      
  });
  console.log(imgProfile)

  form.signRegister.addEventListener('click', (event) => {
    event.preventDefault();
    firebaseActions.register(form.emailRegister.value, form.passwordRegister.value,
      form.nameRegister.value, form.dateRegister.value, imgProfile);
  });
}
