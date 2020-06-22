import { initPostsAndMenu } from './createPost.js';

export const signIn = (root, name = '', photo) => {
  const container = document.createElement('div');
  container.classList.add('display-column');
  container.innerHTML = `
    <div class="display-mobile display-web-row">
      <div class="margin-top-user profile-mobile display-web-user profile-web">
        <img class="img-user img-user-web" src=${photo} alt="spock">
        <div class="name-user">
          <h1>Bem vindo <span id='true-name'>${name}</span></h1>
          <br>
          <p>Number One - Classic</p>
        </div>
      </div>
      <br>
      <div class="id-user display-web-user posts-web">
        <form class="display-form form-web-display">
          <input class="input-posts" type=text id="post-text">
          <div class="display-posts display-post-web">
            <input type="file" class="display-none-img" id="input-file">
            <img class="posts-img" src="../../img/image-solid.svg" alt="photo-to-post" id="post-img">
            <span class="img-preview">
              <img src=''>
            </span>
            <span class="check-prive">
              <input type="checkbox" id="private">Privado
            </span>
            <button class="button-login width-button-login class" id="submit-post" type="submit">
            Publicar
            </button>
          </div>
        </form>
        <ul class="width-list-post list-post-web" id="post-main-area"></ul>
      </div>
    </div>
  `;
  const element = root;
  element.innerHTML = '';
  element.appendChild(container);
  initPostsAndMenu(container);
  document.getElementById('submit-post').disabled = true;
};
