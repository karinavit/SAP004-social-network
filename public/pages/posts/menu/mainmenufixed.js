import { firebaseActions } from '../../../data.js';

export const menuPost = {
  loggoutMenuEvent() {
    const loggoutButton = document.querySelector('#loggout');
    loggoutButton.addEventListener('click', () => {
      firebaseActions.loggoutData();
    });
    const profileButton = document.querySelector('#profile'); // para identificar onde está o botão, neste caso #profile é referente ao id atribuido no botão do html.
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
//toogle verifica se o click é verdadeiro ou falso, onde no nosso menu dá aquele efeito de aparecer / desaparecer conforme clicado.