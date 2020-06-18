export function login(email, password) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
}
// tudo para a conexão do firebase, começa com firebase, de modo que ele "puxe a biblioteca"

