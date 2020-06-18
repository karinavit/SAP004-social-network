import { createElementProfilePost } from './profileAndComments.js';

export function backPosts() {
  const buttonBack = document.querySelector('#button-back-posts');
  buttonBack.addEventListener('click', () => {
    window.location = '#posts';
  });
} //esta função atribui a funcionalidade do botão de voltar da nossa página de perfil para a página de posts

export function readPostsProfileDOM(post, element) {
  element.querySelector('#profile-posts').prepend(createElementProfilePost(post));
} 
//esta função tras os posts do autor na página de perfil e sempre o mais recente será apresentado acima.
