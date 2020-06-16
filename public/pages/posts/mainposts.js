import { firebaseActions, oneLikePerUser } from '../../data.js';
import { menuFixed } from './menufixed.js';
import {createElementPost} from "./postsAndComments.js"

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
  editPostDOM(postId, element) {
    const postElement = element.getElementById(`post-${postId}`);
    const textEditElement = postElement.getElementsByClassName('post-text-area')[0];

    if (textEditElement.contentEditable !== 'true') {
      textEditElement.contentEditable = true;
      textEditElement.focus();
    } else {
      textEditElement.contentEditable = false;
      firebaseActions.editOrLikePost(postId, { text: textEditElement.textContent });
    }
  },
  deletePostDOM(postId, element) {
    firebaseActions.deletePost(postId);
    const post = element.getElementById(`post-${postId}`);
    post.remove();
  },
  likePostDOM(postId, element) {
    const postElement = document.getElementById(`post-${postId}`);
    const likeValueElement = postElement.getElementsByClassName('like-value')[0];
    const likes = Number(likeValueElement.textContent);
    oneLikePerUser(postId, likes, updateLikeDOM, element);
  },
};

function editHoursPosted(dateInfo) {
  return dateInfo < 10 ? `0${dateInfo}` : dateInfo;
}

function getHoursPosted() {
  const date = new Date();
  return `${editHoursPosted(date.getDate())}/${editHoursPosted(date.getMonth() + 1)}
  /${editHoursPosted(date.getFullYear())} 
  ${editHoursPosted(date.getHours())}:${editHoursPosted(date.getMinutes())}
  :${editHoursPosted(date.getSeconds())}`;
}

export function commentsDOM(postId, ownerPost, element) {
  element.getElementsByClassName('post-button')[0].addEventListener('click', () => {
    const textPosted = element.getElementsByClassName('comment-input-area')[0];
    firebaseActions.comments(textPosted.value, postId, getHoursPosted(), ownerPost);
  });
}

export function clearArea(element) {
  const elementArea = element;
  elementArea.getElementsByClassName('comment-area')[0].innerHTML = '';
}




export function updateCommentsLikes (like, element) {
  const likeValueElement = element.getElementsByClassName('like-value-comment')[0];
  likeValueElement.innerHTML = like;
}




export function editComments (docId, commentEdited, postId) {
  if (commentEdited.contentEditable !== 'true') {
    commentEdited.contentEditable = true;
    commentEdited.focus();
  } else {
    commentEdited.contentEditable = false;
    firebaseActions.editOrLikeComments(docId,{text:commentEdited.textContent}, postId)
}
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
      date: getHoursPosted(),
      wholiked: [],
    };
    postTexto.value = '';
    privateField.checked = false;
    firebaseActions.postData(post, readPostsDOM);
  });
}

function pagePost() {
  document.getElementById('postados').innerHTML = '';
  firebaseActions.readPosts(readPostsDOM);
  postDOM();
}

export function initPostsAndMenu(container) {
  menuFixed(container);
  pagePost();
}
