  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCm7I3cvutJG8L4Sbt7BiK-VQdPdxk3i4Y",
    authDomain: "count-on-me-476fd.firebaseapp.com",
    databaseURL: "https://count-on-me-476fd.firebaseio.com",
    projectId: "count-on-me-476fd",
    storageBucket: "count-on-me-476fd.appspot.com",
    messagingSenderId: "578346489088"
  };
  firebase.initializeApp(config);


let txtNickname = document.getElementById('nickname');
let txtMensaje = document.getElementById('mensaje');
let btnEnviar = document.getElementById('btnEnviar');
let chatUl = document.getElementById('chatUl');

btnEnviar.addEventListener("click", function() {
    let nickname = txtNickname.value;
    let mensaje = txtMensaje.value;
    //let html = "<li><b>"+nombre+": </b>"+mensaje+"</li>";
    //chatUl.innerHTML += html;
    //console.log(nombre);

    //con la funcion database se accede al servicio y se crea un objeto con los datos que queremos
    //guardar en la base de datos
    firebase.database().ref('chat').push({
      nickname: nickname,
      message: mensaje
    })

});

firebase.database().ref('chat')
.on('value', function(snapshot) {
    let html = '';
    snapshot.forEach(function (e) {
        let element = e.val();
        let nickname = element.nickname;
        let mensaje = element.message;
        html += "<p><b>"+nickname+": </b>"+mensaje+"</p>";

    });
    chatUl.innerHTML = html;
});





































/*initializeFirebase();

let db = firebase.firestore();

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

}*/
