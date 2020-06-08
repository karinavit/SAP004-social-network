export const signIn = (name) => {
  const container = document.createElement('div');
  container.classList.add("display-column");

  container.innerHTML = `
    <div class="nav-posts">
      <img id="bar-menu" class="bar-menu" src="img/bars-solid.svg" alt="bar">
      <h1 class="logo-name-posts-nav">Social Trekkers</h1>
      <img class="menu-posts" src="img/logo.png" alt="logo">
    </div>
    <a id="loggout" class="loggout" href="/#">
      <div>Sair</div>
    </a>
    <div class="margin-top-user id-user">
      <img class="img-user" src="img/startrek_spock.jpg" alt="spock">
      <div class="name-user">
        <h1>Bem vindo ${name}</h1>
        <br>
        <p>Number One - Classic</p>
      </div>
    </div>
    <br>
    <div class="id-user">
      <form class="display-form">
        <input class="input-posts" type=text id="post-text">
        <div class="display-posts">
          <input type="file" src="img/image-solid.svg" style="display:none" id="input-file">
          <img class="posts-img" src="img/image-solid.svg" alt="photo-to-post" id="post-img">
          <input type="checkbox" id="private"><label>Privado</label>
          <button class="button-login width-button-login" id="postar" type="submit">
          Publicar
          </button>
        </div>
      </form>
    </div>
    <ul class="width-list-post" id="postados"></ul>
  `;
  return container;
};
