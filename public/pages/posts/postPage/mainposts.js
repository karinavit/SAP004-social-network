import { firebaseActions, oneLikePerUser } from '../../../data.js';

function updateLikeDOM(like, postId) {
  const postElement = document.getElementById(`post-${postId}`);
  const likeValueElement = postElement.getElementsByClassName('like-value')[0];
  likeValueElement.innerHTML = like;
}

export const postsFunc = {
  loggoutMenuEvent() {
    const loggoutButton = document.querySelector('#loggout');
    loggoutButton.addEventListener('click', () => {
      firebaseActions.loggoutData();
    });
    const menuBar = document.querySelector('#bar-menu');
    menuBar.addEventListener('click', () => {
      loggoutButton.classList.toggle('show-loggout');
    });
  },
  editPostDOM(postId) {
    const element = document.getElementById(`post-${postId}`);
    const textEditElement = element.getElementsByClassName('post-text-area')[0];

    if (textEditElement.contentEditable !== 'true') {
      textEditElement.contentEditable = true;
      textEditElement.focus();
    } else {
      textEditElement.contentEditable = false;
      firebaseActions.editOrLikePost(postId, { text: textEditElement.textContent });
    }
  },
  deletePostDOM(postId) {
    firebaseActions.deletePost(postId);
    const post = document.getElementById(`post-${postId}`);
    post.remove();
  },
  likePostDOM(postId, element) {
    const postElement = document.getElementById(`post-${postId}`);
    const likeValueElement = postElement.getElementsByClassName('like-value')[0];
    const likes = Number(likeValueElement.textContent);
    oneLikePerUser(postId, likes, updateLikeDOM, element);
  },
};
