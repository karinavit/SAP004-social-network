import { menuFixed } from '../posts/menufixed.js';
import { backPosts } from './mainprofile.js';

export const profilePage = (root) => {
  const container = document.createElement('div');
  container.classList.add('display-column');
  container.innerHTML = `
    <button id="button-back-posts" style="margin-top: 150px">Voltar posts</button>
  `;
  const element = root;
  element.innerHTML = '';
  element.appendChild(container);
  menuFixed(container);
  backPosts();
};