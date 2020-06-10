
export const firebaseActions = {
  editOrLikePost(postId, updateTextOrLike) {
    const postCollection = firebase.firestore().collection("posts");
  
    postCollection.doc(postId).update(updateTextOrLike).then(() => { })
  },
  deletePost(postId) {
    const postCollection = firebase.firestore().collection("posts");
  
    postCollection.doc(postId).delete().then(() => { })
  }

}


