import firebaseActions from '../../data.js';
import { createElementPost } from './posts.js';

export const postsFunc = {
  pagePost() {
    document.getElementById('postados').innerHTML = '';
    firebaseActions.readPosts(readPostsDOM);
    postDOM();
  },
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
    let postElement = document.getElementById(`post-${postId}`);
    let textEditElement = postElement.getElementsByClassName('post-text-area')[0];

    if (textEditElement.contentEditable != 'true') {
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
  likePostDOM(postId) {
    let postElement = document.getElementById(`post-${postId}`);
    let likeValueElement = postElement.getElementsByClassName('like-value')[0];
    let likes = Number(likeValueElement.textContent) + 1;
    likeValueElement.innerHTML = likes;
    firebaseActions.editOrLikePost(postId, { likes: likes });
  },
  getHoursPosted() {
    const date = new Date()
    return `${editHoursPosted(date.getDate())}/${editHoursPosted(date.getMonth() + 1)}
    /${editHoursPosted(date.getFullYear())} 
    ${editHoursPosted(date.getHours())}:${editHoursPosted(date.getMinutes())}
    :${editHoursPosted(date.getSeconds())}`;
  },
  clearArea(element) {
    element.getElementsByClassName('comment-area')[0].innerHTML = '';
  },
}

export function commentsDOM(postId, element) {
  element.getElementsByClassName('post-button')[0].addEventListener('click', () => {
    const textPosted = element.getElementsByClassName('comment-input-area')[0];
    firebaseActions.comments(textPosted.value, postId, postsFunc.getHoursPosted());
  })
}

function editHoursPosted(dateInfo) {
  return dateInfo < 10 ? '0' + dateInfo : dateInfo;
}

function readPostsDOM(post) {
  document.querySelector('#postados').prepend(createElementPost(post));
}

function postDOM() {
  const postar = document.querySelector('#postar');
  const postTexto = document.querySelector('#post-text');
  const img = document.querySelector('#post-img');
  const inputFile = document.querySelector('#input-file');
  const privateField = document.querySelector('#private');

  img.addEventListener('click', () => {
    inputFile.click();
  });

  postar.addEventListener('click', (event) => {
    event.preventDefault();
    const post = {
      text: postTexto.value,
      id_user: firebase.auth().currentUser.uid,
      name: firebase.auth().currentUser.displayName,
      likes: 0,
      private: true,
      visibility: privateField.checked ? 'private' : 'public',
      date: postsFunc.getHoursPosted(),
    };
    postTexto.value = '';
    privateField.checked = false;
    firebaseActions.postData(post, readPostsDOM);
  });
}