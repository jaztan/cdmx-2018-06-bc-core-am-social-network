initializeFirebase();

let db = firabese.firestore();

const publicar = () => {
  firabese.auth().onAuthStateChanged(user => {
    if (user) {


      document.getElementById('btn-post-public').addEventListener('click', event => {
        event.preventDefault();
        const publicPost = document.getElementById('public').value;
        let datePublic = `${new Date ()}`;
        db.collection('publicaciones').add({
          contenido: publicPost,
          user: user.displayName,
          id: user.uid,
          date: datePublic

        }).then(response => {
          console.log('Publicado');
        }).catch(error => {
          console.log('Error');
        });
        paintPost(); // se manada a llamar cuando se cargue el archivo

      });
    } else {
      location.href = ('index.html');
    }
  })
}

const paintPost = () => {
  const allPost = db.collection('publicaciones').get()
    .then(result => {

      let response = '';
      response.forEach(event => {
        response += `<div> ${event.data().usuario}</div>`
      })
      document, getElementById('lista').innerHTML = response;

    })

}

const deletePost = (idPost) => {
  const publicaciones = db.collection('publicaciones').doc(idPost).delete()
    .then(response => {
      alert('Eliminando...');
      paintPost();
    })
    .catch(error=>{
      console.log('No se ha eliminado');
    })

}
