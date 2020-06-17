import { firebaseActions } from '../../../data.js';
import { getHoursPosted } from '../postPage/createPost.js';

export function commentsDOM(postId, ownerPost) {
  document.getElementsByClassName('post-button')[0].addEventListener('click', () => {
    const textPosted = document.getElementsByClassName('comment-input-area')[0];
    firebaseActions.comments(textPosted.value, postId, getHoursPosted(), ownerPost);
  });
}

export function clearArea(element) {
  const elementArea = element;
  elementArea.getElementsByClassName('comment-area')[0].innerHTML = '';
}

export function updateCommentsLikes(like, element) {
  const likeValueElement = element.getElementsByClassName('like-value-comment')[0];
  likeValueElement.innerHTML = like;
}

export function editComments(docId, commentEdited, postId) {
  if (commentEdited.contentEditable !== 'true') {
    commentEdited.contentEditable = true;
    commentEdited.focus();
  } else {
    commentEdited.contentEditable = false;
    firebaseActions.editOrLikeComments(docId, { text: commentEdited.textContent }, postId);
  }
}
