import { firebaseActions } from '../../../data.js';

export function updateCommentsLikes(like, element) {
  const likeValueElement = element.getElementsByClassName('like-value-comment')[0];
  likeValueElement.innerHTML = like;
}

export function editComments(docId, commentEdited, postId) {
  const comment = commentEdited;
  if (comment.contentEditable !== 'true') {
    comment.contentEditable = true;
    comment.focus();
  } else {
    comment.contentEditable = false;
    firebaseActions.editOrLikeComments(docId, { text: comment.textContent }, postId);
  }
}
