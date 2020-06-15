import firebaseActions from "../../data.js";
import { postsFunc, commentsDOM } from "./mainposts.js";

export const signIn = (root, name) => {
  const container = document.createElement('div');
  container.classList.add("display-column");
  container.innerHTML = `
    <div class="nav-posts">
      <img id="bar-menu" class="bar-menu" src="img/bars-solid.svg" alt="bar">
      <h1 class="logo-name-posts-nav">Social Trekkers</h1>
      <img class="menu-posts" src="img/logo.png" alt="logo">
    </div>
    <a id="loggout" class="loggout" href="#">
      <div>Sair</div>
    </a>
    <div class="display-mobile display-web-row">
      <div class="margin-top-user profile-mobile display-web-user profile-web">
        <img class="img-user img-user-web" src="img/startrek_spock.jpg" alt="spock">
        <div class="name-user">
          <h1>Bem vindo ${name}</h1>
          <br>
          <p>Number One - Classic</p>
        </div>
      </div>
      <br>
      <div class="id-user display-web-user posts-web">
        <form class="display-form form-web-display">
          <input class="input-posts" type=text id="post-text">
          <div class="display-posts display-post-web">
            <input type="file" src="img/image-solid.svg" class="display-none-img" id="input-file">
            <img class="posts-img" src="img/image-solid.svg" alt="photo-to-post" id="post-img">
            <span class="check-prive">
              <input type="checkbox" id="private">Privado
            </span>
            <button class="button-login width-button-login" id="postar" type="submit">
            Publicar
            </button>
          </div>
        </form>
        <ul class="width-list-post list-post-web" id="postados"></ul>
      </div>
    </div>
  `;
  root.innerHTML = "";
  root.appendChild(container);
  postsFunc.pagePost();
  setTimeout(postsFunc.loggoutMenuEvent(), 1);
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
      <span class="display-like">
        <img class="like-img like" src="../../img/like-spock.svg" alt="like-button">
        <span class="like-value">${post.data().likes}</span> 
      </span>
      <p class="style-hour">${post.data().date}</p>
      <span >
        <img class="comment-button" src="../../img/comentario.svg" alt="comment-button">
        <img class="delete" src="img/trash-alt-regular.svg" alt="delete-posts">
      </span>
      </div>
    <ul>
      <li class="post-comment">
        <input type="text" class="comment-input-area input-comment">
        <button type="submit" class="post-button width-button-login button-login">Comentário</button>
      </li>
      <li class="comment-area" >
      </li>
    </ul>
  `;

  let postElement = document.createElement("li");
  postElement.classList.add("each-post");
  postElement.id = `post-${post.id}`;
  postElement.innerHTML = postTemplate;
  postElement.getElementsByClassName("edit")[0].addEventListener("click", () => {
    postsFunc.editPostDOM(post.id);
  });
  postElement.getElementsByClassName("like")[0].addEventListener("click", () => {
    postsFunc.likePostDOM(post.id);
  });
  postElement.getElementsByClassName("delete")[0].addEventListener("click", () => {
    postsFunc.deletePostDOM(post.id);
  });
  postElement.getElementsByClassName("comment-button")[0].addEventListener("click", () => {
    const comentario = postElement.getElementsByClassName("post-comment")[0];
    comentario.classList.toggle("show");
    commentsDOM(post.id, postElement);
  })
  firebaseActions.readCommentsData(post.id, printComments, postElement, postsFunc.clearArea)

  if (post.data().id_user !== firebase.auth().currentUser.uid) {
    postElement.querySelector(".delete").classList.add("visibility");
    postElement.querySelector(".edit").classList.add("visibility");
  }
  return postElement;
}

function printComments(doc, element) {
  const div = document.createElement("div");
  div.innerHTML = `
    <p>${doc.data().name} </p>
    <p>${doc.data().text}</p>
    <p>${doc.data().date}</p>
  `;
  div.classList.add("style-comment-area");
  element.getElementsByClassName("comment-area")[0].prepend(div);
}
