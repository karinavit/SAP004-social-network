import { firebaseActions, oneLikePerUserComments } from '../../../data.js';
import { editComments, updateCommentsLikes } from './mainComments.js';

export function printComments(doc, element, postId) {
  const div = document.createElement('div');
  div.id = doc.id; //doc.id pega o id que vemn do firebase e atribui o mesmo para a div do nosso container. 
  div.innerHTML = `
    <p>${doc.data().name}</p> 
    <p class="comment-posted">${doc.data().text}</p>
    <p>${doc.data().date}</p>
    <img class="delete-comment delete" src="../../img/trash-alt-regular.svg" alt="delete-posts">
    <span class="display-like">
      <img class="like-img like-comment" src="../../img/like-spock.svg" alt="like-button">
      <span class="like-value-comment">${doc.data().likes}</span>
    </span>
    <span class="edit-comment edit name-edit-post">
      <img src="../../img/edit-regular.svg" alt="edit-posts">
    </span>
  `;
  //${doc.data().name}, no elemento acima representa que estou buscando um determinado campo no meu banco de dados, neste exempplo, buscamos o campo name. 

  div.classList.add('style-comment-area'); 
  element.getElementsByClassName('comment-area')[0].prepend(div); // neste caso o prepend mantém os comentários sempre acima um do outro na ordem que eles são comentados, pois ele ordena por data e hora. 

  element.getElementsByClassName('delete-comment')[0].addEventListener('click', () => {
    firebaseActions.deleteComments(postId, doc.id); 
  }); //o getElementsByClassName, ele vai pegar a classe como um todo, porém quando clicamos ele identifica o comentário pelo Id e somente o comentário do id específico será deletado. logo que a função deteteComments for acionada. Obs: Colocamos o [0] do array, pois só tem 1 elemento espcifico com essa classe dentro desse Id.

  element.getElementsByClassName('edit-comment')[0].addEventListener('click', () => {
    const commentEdited = element.getElementsByClassName('comment-posted')[0];
    editComments(doc.id, commentEdited, postId);
  });
  element.getElementsByClassName('like-comment')[0].addEventListener('click', () => {
    const commentsLike = Number(element.getElementsByClassName('like-value-comment')[0].textContent); // mesma linha de raciocínio, só muda a conversão de uma string em nṕumeor para realizar a soma/sub de likes em um comentário.
    oneLikePerUserComments(postId, doc.id, updateCommentsLikes, commentsLike, element);
  });

  if (doc.data().id_user !== firebase.auth().currentUser.uid) {
    element.querySelector('.delete-comment').classList.add('visibility');
    element.querySelector('.edit-comment').classList.add('visibility'); // se o meu usuário for diferente ele não pode editar e nem deletar o comentário de outras pessoas. 
  } else if (doc.data().postOwner === firebase.auth().currentUser.uid) {
    element.querySelector('.delete-comment').classList.add('visibility');
  } //aqui é quando o usuário for o dono, deve-se mostrar o delete , porém na linha 42 estamos com um erro, pois a classe que foi atribuída acima mantém escondido o "deletar".
}
