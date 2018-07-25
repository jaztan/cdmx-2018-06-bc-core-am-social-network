initializeFirebase();

document.getElementById("btn-singin").addEventListener('click', event => {
  event.preventDefault();
  console.log('diste un click');
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  registrar(email, password);

});

const registrar = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      verificar();
    })
    .catch(error => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      //console.log(errorCode);
      //console.log(errorMessage);
      // ...
    });
};

document.getElementById("btn-loginaitor").addEventListener('click', event => {
  event.preventDefault();
  console.log('diste un click');
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  ingresar(email, password);

})
const ingresar = () => {
  let email = document.getElementById("email-two").value;
  let password = document.getElementById("password-two").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(event => {
      // Se utiliza la interfaz Location, implementando la propiedad Location.href que contiene la URL
      location.href = "../views/wall.html";
    })
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      //console.log(errorCode);
      //console.log(errorMessage);
      // ...
    });
};

const observador = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // aparece(user);
      // User is signed in.
      let displayName = user.displayName;
      let email = user.email;
      // console.log('***************');
      // console.log(user.emailVerified);
      // console.log('***************');
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      //console.log("No existe usuario, registrese para acceder");
      // ...
    }
  });
};


const aparece = () => {
  let contenido = document.getElementById("contenido");
  contenido.innerHTML = `
<p>Bienvenido</p>

<button onclick="cerrar()">Cerrar sesión</button>
`;
  /*if(user.emailVerified){

  }*/
}

// Se codea el login
let provider = new firebase.auth.GoogleAuthProvider(); // Instancia del proveedor del servicio

$("#login").click(function () {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      console.log(result.user);
      $("#login").hide();
    });
});

const cerrar = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("Saliendo...");
    })
    .catch(error => {
      console.log(error);
    });
}

const verificar = () => {
  let user = firebase.auth().currentUser;

  user
    .sendEmailVerification()
    .then(function () {
      console.log("Enviando correo de verificación...");
      // Email sent.
    })
    .catch(function (error) {
      console.log(error);
      // An error happened.
    });
}
