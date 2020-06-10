import { firebaseActions } from "./data.js"

const elements = {
  registerDOM() {
    const emailRegisterInput = document.querySelector("#email-input-register");
    const nameRegisterInput = document.querySelector("#name-input-register");
    const birthdayRegisterInput = document.querySelector("#date-input-register");
    const passwordRegisterInput = document.querySelector("#password-input-register");
    const singInButton = document.querySelector("#sign-in-button");
    const backButton = document.querySelector("#back-button");

    backButton.addEventListener("click", () => {
      container.innerHTML = '';
      container.appendChild(routes.home);
    })

    singInButton.addEventListener("click", () => {
      const user = {
        name: nameRegisterInput.value,
        email: emailRegisterInput.value, birthday: birthdayRegisterInput.value
      }
      firebaseActions.register(emailRegisterInput.value, passwordRegisterInput.value, nameRegisterInput.value, user)
    })
  },
  createElementPost(post) {
    const postTemplate = `
      <div class="name-edit-post">
        <p class="post-user-name">${post.data().name}</p>
        <span class="edit">
          <img src="img/edit-regular.svg" alt="edit-posts">
        </span>
      </div>
      <p class="post-text-area" id='text-${post.id}'>${post.data().text}</p>
      <div class="name-edit-post">
        <div>
          <span class="like">❤️</span>
          <span class="like-value">${post.data().likes}</span> 
        </div>
        <p> Postado em: ${post.data().date}</p>
        <p> ${post.data().visibility}</p>
        <span class="delete">
          <img src="img/trash-alt-regular.svg" alt="delete-posts">
        </span>
      </div>
    `;
    let postElement = document.createElement("li");
    postElement.classList.add("each-post");
    postElement.id = `post-${post.id}`;
    postElement.innerHTML = postTemplate;
    postElement.getElementsByClassName("edit")[0].addEventListener("click", () => {
      editPostDOM(post.id);
    });
    postElement.getElementsByClassName("like")[0].addEventListener("click", () => {
      likePostDOM(post.id);
    });
    postElement.getElementsByClassName("delete")[0].addEventListener("click", () => {
      deletePostDOM(post.id);
    });
    return postElement;
  },
 editPostDOM(postId) {
    let postElement = document.getElementById(`post-${postId}`);
    let textEditElement = postElement.getElementsByClassName("post-text-area")[0];
  
    if (textEditElement.contentEditable != "true") {
      textEditElement.contentEditable = true;
      textEditElement.focus();
    } else {
      textEditElement.contentEditable = false;
      firebaseActions.editOrLikePost(postId, { text: textEditElement.textContent })
    }
  },
   deletePostDOM(postId) {
    firebaseActions.deletePost(postId)
    let post = document.getElementById(`post-${postId}`);
    post.remove();
  
  },
   likePostDOM(postId) {
    let postElement = document.getElementById(`post-${postId}`);
    let likeValueElement = postElement.getElementsByClassName("like-value")[0];
    let likes = Number(likeValueElement.textContent) + 1;
    likeValueElement.innerHTML = likes;
    firebaseActions.editOrLikePost(postId, { likes: likes })
  },


}