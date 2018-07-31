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

const btnFace=document.getElementById('btnFace');


btnFace.addEventListener('click',function(e){
  /*e.preventDefault();*/
let provider = new firebase.auth.FacebookAuthProvider();
validacion(provider);
});

/*const validacion=(provider)=>{
    firebase.auth().signInWithPopup(provider).then(function(result) {
      console.log(result);
      window.location.assign("../views/wall.html");
       //location es un metodo
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log("Iniciando Sesion con Facebook")
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });*/


 
 function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  };
 function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

 window.fbAsyncInit = () => {
        FB.init({
          appId      : '289516981795849',
          xfbml      : true,
          version    : 'v3.1'
        });
        FB.AppEvents.logPageView();
      };
FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v3.1&appId=289516981795849&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });


