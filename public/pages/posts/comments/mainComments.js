import { firebaseActions } from '../../../data.js';

export function updateCommentsLikes(like, element) {
  const likeValueElement = element.getElementsByClassName('like-value-comment')[0];
  likeValueElement.innerHTML = like;
}

// funão que cria uma área editável no nosso comentário;
export function editComments(docId, commentEdited, postId) {
  const comment = commentEdited;
  if (comment.contentEditable !== 'true') {
    comment.contentEditable = true;
    comment.focus(); // focus dá foco para aquele elemento que será editado.
  } else {
    comment.contentEditable = false;
    firebaseActions.editOrLikeComments(docId, { text: comment.textContent }, postId);
  } // ao se tornar falsa ele vai colocar o comentário atualizado utilizando a função editOrLikeComments.
}


