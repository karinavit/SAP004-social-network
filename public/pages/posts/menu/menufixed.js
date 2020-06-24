import { menuPost } from './mainmenufixed.js';

export const menuFixed = (pageRoot) => {
  const container = document.createElement('div');
  container.classList.add('display-column');
  container.innerHTML = `
    <div class='nav-posts'>
      <img id='bar-menu' class='bar-menu' src='../../img/bars-solid.svg' alt='bar'>
      <h1 class='logo-name-posts-nav'><a href='#posts'>Social Trekkers</a></h1>
      <img class='menu-posts' src='../../img/logo.png' alt='logo'>
    </div>
    <a id='loggout' class='loggout' href='#'>
      <div>Sair</div>
    </a>
    <a id='profile' class='profile' href='#profile'>
      <div>Perfil</div>
    </a>
    <a id='back-posts' class='back-posts' href='#posts'>
      <div>Posts</div>
    </a>
  `;
  pageRoot.prepend(container);
  menuPost.loggoutMenuEvent();
};
