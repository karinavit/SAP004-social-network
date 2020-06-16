export function backPosts() {
  const buttonBack = document.querySelector('#button-back-posts');
  buttonBack.addEventListener('click', () => {
    window.location = '#posts';
  });
}