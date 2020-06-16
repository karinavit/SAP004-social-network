import { firebaseActions, oneLikePerUser, oneLikePerUserComments } from '../../data.js';
import { menuFixed } from './menufixed.js';

function updateLikeDOM(like, postId) {
  const postElement = document.getElementById(`post-${postId}`);
  const likeValueElement = postElement.getElementsByClassName('like-value')[0];
  likeValueElement.innerHTML = like;
}

const postsFunc = {
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
    const postElement = document.getElementById(`post-${postId}`);
    const textEditElement = postElement.getElementsByClassName('post-text-area')[0];

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
  likePostDOM(postId) {
    const postElement = document.getElementById(`post-${postId}`);
    const likeValueElement = postElement.getElementsByClassName('like-value')[0];
    const likes = Number(likeValueElement.textContent);
    oneLikePerUser(postId, likes, updateLikeDOM);
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

function commentsDOM(postId, element) {
  element.getElementsByClassName('post-button')[0].addEventListener('click', () => {
    const textPosted = element.getElementsByClassName('comment-input-area')[0];
    firebaseActions.comments(textPosted.value, postId, getHoursPosted());
  });
}

function clearArea(element) {
  const elementArea = element;
  elementArea.getElementsByClassName('comment-area')[0].innerHTML = '';
}

function printComments(doc, element, postId) {
  const div = document.createElement('div');
  div.id = doc.id
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
  div.classList.add('style-comment-area');
  element.getElementsByClassName('comment-area')[0].prepend(div);

  element.getElementsByClassName("delete-comment")[0].addEventListener("click", () => {
    firebaseActions.deleteComments(postId,doc.id)
  })
  element.getElementsByClassName("edit-comment")[0].addEventListener("click", () => {
    const commentEdited = element.getElementsByClassName('comment-posted')[0]
    editComments(doc.id,commentEdited, postId)
  })
  element.getElementsByClassName('like-comment')[0].addEventListener("click", () => {
    const  commentsLike = Number(element.getElementsByClassName("like-value-comment")[0].textContent)
  oneLikePerUserComments(postId, doc.id, updateCommentsLikes, commentsLike, element )
  });
} 



function updateCommentsLikes (like, element) {
  const likeValueElement = element.getElementsByClassName('like-value-comment')[0];
  likeValueElement.innerHTML = like;
}




function editComments (docId, commentEdited, postId) {
  if (commentEdited.contentEditable !== 'true') {
    commentEdited.contentEditable = true;
    commentEdited.focus();
  } else {
    commentEdited.contentEditable = false;
    firebaseActions.editOrLikeComments(docId,{text:commentEdited.textContent}, postId)
}
}





function createElementPost(post) {
  const postTemplate = `
    <div class="name-edit-post">
      <p class="post-user-name">${post.data().name}</p>
      <span class="edit">
        <img src="../../img/edit-regular.svg" alt="edit-posts">
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

  const postElement = document.createElement('li');
  postElement.classList.add('each-post');
  postElement.id = `post-${post.id}`;
  postElement.innerHTML = postTemplate;
  postElement.getElementsByClassName('edit')[0].addEventListener('click', () => {
    postsFunc.editPostDOM(post.id);
  });
  postElement.getElementsByClassName('like')[0].addEventListener('click', () => {
    postsFunc.likePostDOM(post.id);
  });
  postElement.getElementsByClassName('delete')[0].addEventListener('click', () => {
    postsFunc.deletePostDOM(post.id);
  });
  postElement.getElementsByClassName('comment-button')[0].addEventListener('click', () => {
    const comentario = postElement.getElementsByClassName('post-comment')[0];
    comentario.classList.toggle('show');
    commentsDOM(post.id, postElement);
  });
  firebaseActions.readComments(post.id, printComments, postElement, clearArea);

  if (post.data().id_user !== firebase.auth().currentUser.uid) {
    postElement.querySelector('.delete').classList.add('visibility');
    postElement.querySelector('.edit').classList.add('visibility');
  }
  return postElement;
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
