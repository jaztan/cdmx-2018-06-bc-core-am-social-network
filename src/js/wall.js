initializeFirebase();

firebase.initializeApp({
  apiKey: "AIzaSyCm7I3cvutJG8L4Sbt7BiK-VQdPdxk3i4Y",
  authDomain: "count-on-me-476fd.firebaseapp.com",
  projectId: "count-on-me-476fd"
});

let db = firebase.firestore();
const publicar = () => {
  const userPost = document.getElementById('paint-wall').value;
db.collection("publicaciones").add({
  post: userPost
})
.then(function (docRef) {
  console.log("Document written with ID: ", docRef.id);

})
.catch(function (error) {
  console.error("Error adding document: ", error);
});
}


// Pintando la primer publicación del usuario
const paintPost = document.getElementById('paint-post')
db.collection('publicaciones').onSnapshot(querySnapshot => {
  paintPost.innerHTML = '';

  querySnapshot.forEach(doc => {
    console.log(`${doc.id} => ${doc.data().post}`);
    paintPost.innerHTML +=
      `<span class="card-title"></span>
     <p>ID del post: ${doc.id}</p>
     <p>${doc.data().post}</p>`


  });
});

/*
const deletePost = (idPost) => {
  const publicaciones = db.collection('publicaciones').doc(idPost).delete()
    .then(response => {
      alert('Eliminando...');
      paintPost();
    })
    .catch(error => {
      console.log('No se ha eliminado');
    });
};*/
