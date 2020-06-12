import {elements} from "../../main.js"
import {comments} from "../../data.js"
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
          <input type="file" src="img/image-solid.svg" class="hidden" id="input-file">
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


export function createElementPost(post) {
  const postTemplate = `
    <div class="name-edit-post">
      <p class="post-user-name">${post.data().name}</p>
      <span class="edit">
        <img src="img/edit-regular.svg" alt="edit-posts">
      </span>
    </div>
    <p class="post-text-area" id='text-${post.id}'>${post.data().text}</p>
    <div class="name-edit-post">
      <div>
        <span class="like">❤️</span>
        <span class="like-value">${post.data().likes}</span> 
      </div>
      <p> Postado em: ${post.data().date}</p>
      <p class="comentar"> Comentar</p>
      <span class="delete">
        <img src="img/trash-alt-regular.svg" alt="delete-posts">
      </span>
      </div>
    <ul class="comments">
    <div class="post-comment hidden">
    <input type="text" class="comment-area ">
    <button type="submit" class="post-comment"> Comentário </button>
    </div>
      </ul>
  `;

  let postElement = document.createElement("li");
  postElement.classList.add("each-post");
  postElement.id = `post-${post.id}`;
  postElement.innerHTML = postTemplate;
  postElement.getElementsByClassName("edit")[0].addEventListener("click", () => {
    elements.editPostDOM(post.id);
  });
  postElement.getElementsByClassName("like")[0].addEventListener("click", () => {
    elements.likePostDOM(post.id);
  });
  postElement.getElementsByClassName("delete")[0].addEventListener("click", () => {
    elements.deletePostDOM(post.id);
  });
  postElement.getElementsByClassName("comentar")[0].addEventListener("click", () => {
    const comentario = postElement.getElementsByClassName("post-comment")[0]
    comentario.classList.toggle("hidden")
  })
  postElement.getElementsByClassName("post-comment")[0].addEventListener("click", () => {
    const textPosted = postElement.getElementsByClassName("comment-area")[0]
    comments(textPosted.value, post.id, elements.getHoursPosted())

  })

  if (post.data().id_user !== firebase.auth().currentUser.uid) {
    postElement.querySelector(".delete").classList.add("hidden");
    postElement.querySelector(".edit").classList.add("hidden");
  }
  return postElement;
}