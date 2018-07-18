function registrar() {
  // console.log('diste un click');
  let email = document.getElementById("email").value;
  let password = document.getElementById("contrasena").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(){
          verificar()

      })
      .catch(function (error) {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          // ...
      });
}

function ingresar() {
  let email2 = document.getElementById("email2").value;
  let password2 = document.getElementById("contrasena2").value;

  firebase.auth().signInWithEmailAndPassword(email2, password2)
      .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          // ...
      });
}

function observador() {
  firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
          //aparece(user);
          // User is signed in.
          let displayName = user.displayName;
          let email = user.email;
          // console.log('***************');
          console.log(user.emailVerified);
          // console.log('***************');
          let emailVerified = user.emailVerified;
          let photoURL = user.photoURL;
          let isAnonymous = user.isAnonymous;
          let uid = user.uid;
          let providerData = user.providerData;
          // ...
      } else {
          // User is signed out.
          console.log("No existe usuario, registrese para acceder");
          // ...
      }
  });

}

observador();
/*
function aparece(user) {
  let user = user;
  let contenido = document.getElementById("contenido");
  if(user.emailVerified){
      contenido.innerHTML =
      `
  <p>Bienvenido</p>

  <button onclick="cerrar()">Cerrar sesión</button>
  `;
  }
}*/

function cerrar() {
  firebase.auth().signOut()
      .then(function () {
          console.log("Saliendo...")
      })
      .catch(function (error) {
          console.log(error)
      });
}

function verificar() {
  let user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function () {
      console.log('Enviando correo de verificación...');
      // Email sent.
  }).catch(function (error) {
      console.log(error);
      // An error happened.
  });

}
