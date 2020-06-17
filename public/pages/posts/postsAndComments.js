import { firebaseActions, oneLikePerUserComments } from '../../data.js';
import {commentsDOM, postsFunc, editComments, clearArea, updateCommentsLikes} from "../posts/mainposts.js"


export function createElementPost(post) {
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
    <span>
        <img class="comment-button" src="../../img/comentario.svg" alt="comment-button">
        <img class="delete" src="../../img/trash-alt-regular.svg" alt="delete-posts">
    </span>
</div>
<ul>
    <li class="post-comment">
        <input type="text" class="comment-input-area input-comment">
        <button type="submit" class="post-button width-button-login button-login">Comentário</button>
    </li>
    <li class="comment-area">
    </li>
</ul>
`;

    const postElement = document.createElement('li');
    postElement.classList.add('each-post');
    postElement.id = `post-${post.id}`;
    postElement.innerHTML = postTemplate;
    postElement.getElementsByClassName('edit')[0].addEventListener('click', () => {
        postsFunc.editPostDOM(post.id, postElement);
    });
    postElement.getElementsByClassName('like')[0].addEventListener('click', () => {
        postsFunc.likePostDOM(post.id, postElement);
    });
    postElement.getElementsByClassName('delete')[0].addEventListener('click', () => {
        postsFunc.deletePostDOM(post.id, postElement);
    });
    postElement.getElementsByClassName('comment-button')[0].addEventListener('click', () => {
        const comentario = postElement.getElementsByClassName('post-comment')[0];
        comentario.classList.toggle('show');
        commentsDOM(post.id, post.data().id_user, postElement);
    });
    firebaseActions.readComments(post.id, printComments, postElement, clearArea);

    if (post.data().id_user !== firebase.auth().currentUser.uid) {
        postElement.querySelector('.delete').classList.add('visibility');
        postElement.querySelector('.edit').classList.add('visibility');
    }
    return postElement;
}



export function printComments(doc, element, postId) {
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
        firebaseActions.deleteComments(postId, doc.id)
    })
    element.getElementsByClassName("edit-comment")[0].addEventListener("click", () => {
        const commentEdited = element.getElementsByClassName('comment-posted')[0]
        editComments(doc.id, commentEdited, postId)
    })
    element.getElementsByClassName('like-comment')[0].addEventListener("click", () => {
        const commentsLike = Number(element.getElementsByClassName("like-value-comment")[0].textContent)
        oneLikePerUserComments(postId, doc.id, updateCommentsLikes, commentsLike, element)
    });

    if (doc.data().id_user !== firebase.auth().currentUser.uid ) {
        element.querySelector('.delete-comment').classList.add('visibility');
        element.querySelector('.edit-comment').classList.add('visibility');
    }
    else if (doc.data().postOwner == firebase.auth().currentUser.uid) {
        element.querySelector('.delete-comment').classList.add('visibility');

    }
}