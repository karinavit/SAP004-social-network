import { postsFunc } from '../posts/postPage/mainposts.js';
import { commentsDOM, clearArea } from '../posts/postPage/createPost.js';
import { printComments } from '../posts/comments/commentsTemplate.js';
import { firebaseActions } from '../../data.js';

export function createElementProfilePost(post) {
  const postElement = `
    <div class="name-edit-post">
      <p class="post-user-name">${post.data().name}</p>
      <span class="edit">
        <img src="../../img/edit-regular.svg" alt="edit-posts">
      </span>
    </div>
    <p class="post-text-area" id='text-${post.id}'>${post.data().text}</p>
    <div class="name-edit-post">
      <span class="display-like">
        <div class='like'>
          <img class='like-img liked svg-class ${post.data().wholiked.includes(firebase.auth().currentUser.uid) ? '' : 'hidden'}' src='../../img/like-spock.svg' alt='like-button'>
          <img class='like-img not-liked svg-class ${post.data().wholiked.includes(firebase.auth().currentUser.uid) ? 'hidden' : ''}' src='../../img/notliked.svg' alt='like-button'>
        </div>
          <span class="like-value">${post.data().likes}</span> 
        </span>
        <p class="style-hour">${post.data().date}</p>
        <span >
          <img class="comment-button" src="../../img/comentario.svg" alt="comment-button">
          <img class="delete" src="../../img/trash-alt-regular.svg" alt="delete-posts">
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
  //postTemplate é literalmente a manipulação, de dar alguns elementos do post e mostrar para ele onde ele está no html.
  const postTemplate = document.createElement('li');
  postTemplate.classList.add('each-post');
  postTemplate.id = `post-${post.id}`;
  postTemplate.innerHTML = postElement;

  //embora a coleção de posts seja um array, ao clicar estamos "chamando" aquele único elemento a ser editado, portanto ele tem o valor de 0, por ser o primeirom elemento do array,
  postTemplate.getElementsByClassName('edit')[0].addEventListener('click', () => {
    postsFunc.editPostDOM(post.id, postTemplate); // 
  });

// idem acima.
  postTemplate.getElementsByClassName('like')[0].addEventListener('click', () => {
    postsFunc.likePostDOM(post.id, postTemplate);
    postTemplate.getElementsByClassName('liked')[0].classList.toggle('hidden');
    postTemplate.getElementsByClassName('not-liked')[0].classList.toggle('hidden');
  }); //toogle tira e coloca classes

  //idem acima.
  postTemplate.getElementsByClassName('delete')[0].addEventListener('click', () => {
    postsFunc.deletePostDOM(post.id, postTemplate);
  });

  postTemplate.getElementsByClassName('comment-button')[0].addEventListener('click', () => {
    const comentario = postTemplate.getElementsByClassName('post-comment')[0];
    comentario.classList.toggle('show');
    commentsDOM(post.id, post.data().id_user);
  });

  //objeto abaixo foi criado para ser usado como parametro na firebaseActions.readComments(),
  const readCommentsObj = {
    postId: post.id,
    func: printComments,
    element: postTemplate,
    clear: clearArea,
  };
  firebaseActions.readComments(readCommentsObj); 
  return postTemplate;
}
