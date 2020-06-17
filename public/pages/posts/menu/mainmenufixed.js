import { firebaseActions } from '../../../data.js';

export const menuPost = {
  loggoutMenuEvent() {
    const loggoutButton = document.querySelector('#loggout');
    loggoutButton.addEventListener('click', () => {
      firebaseActions.loggoutData();
    });
    const profileButton = document.querySelector('#profile');
    profileButton.addEventListener('click', () => {
      window.location = '#profile';
    });
    const menuBar = document.querySelector('#bar-menu');
    menuBar.addEventListener('click', () => {
      loggoutButton.classList.toggle('show-loggout');
      profileButton.classList.toggle('show-loggout');
    });
  },
};
