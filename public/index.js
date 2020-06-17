import routes from './routes.js';
import { firebaseActions } from './data.js';

//esta constante pega o  <main id="root"></main> do index.html para renderizar as outras telas.
const root = document.querySelector('#root');

// função verifica a hash da SPA, e também tira as # da frente de cada uma, de modo a ficar padrão, conforme o objeto indicado no routes.js, se <main id="root"></main> for vazio ele coloca o nome de home e se tem uma # ele mantem apenas uma e substitui 
function verifyHash(hash) {
  return hash === '' ? 'home' : hash.replace('#', '');
}

//
function hashs() {
  root.innerHTML = ''; // limpa primeiro o que tiver de conteúdo no main (index.html)
  const hashPage = verifyHash(window.location.hash);
  if (hashPage === 'home' || hashPage === 'register') {
    routes[hashPage](root); // o hasPage, está dentro dos colchetes para que ele possa ser renderizado dentro da função. ele traz o valor que deve ser chamado na função do objeto. é literalmente a mesma coisa do routes.home. 

  } else { // Se não ele só pode ser perfil ou post. então fazemos um setTimeout de 1 seg para para tempo de carregar a página e então pegar o nome do usuário usando a takeNameData (nomenclatura padrão do firebase)
    setTimeout(() => {
      routes[hashPage](root, firebaseActions.takeNameData());
    }, 1000); 
  }
}


function verifyUser() {
  const user = firebase.auth().currentUser;
  if (user) { // se o usuário estiver logado
    if (window.location.hash !== '#profile') { // tudo que for diferente de profile ele vai virar a página de posts. o usuário não terá acesso a parte de fora, pois o mesmo está logado.
      window.location = '#posts';
    }
  } else if (window.location.hash !== '#register') { // idem acima, porém com a tela de registro e home e usuário deslogado ou não criado.
    window.location = '#';
  } 
  hashs(); // a função hashs é chamada novamente para dar continuidade a troca de páginas. 
}

const changePages = () => {
  window.addEventListener('hashchange', () => { 
    verifyUser();
  }); // esta constante está apenas registrando o evento de mudança de hash, se isso ocorrerm então a função verufyUser.
};

// a função init registra o evento, comparado ao onclic, onde ele verifica se o usuário está logado ou não.
function init() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      verifyUser();
    } else {
      verifyUser();
    }
  });
}

// ele registra o evento de refresh da página e então ele carrega aquela que for pertinente, fazendo as verificações que foram vistas acima. 
window.addEventListener('load', () => {
  hashs();
  init();
  changePages();
});
