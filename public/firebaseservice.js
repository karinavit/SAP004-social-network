export function login(email, password) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      
}