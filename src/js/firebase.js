window.initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: 'AIzaSyCm7I3cvutJG8L4Sbt7BiK-VQdPdxk3i4Y',
    authDomain: 'count-on-me-476fd.firebaseapp.com',
    databaseURL: 'https://count-on-me-476fd.firebaseio.com',
    projectId: 'count-on-me-476fd',
    storageBucket: 'count-on-me-476fd.appspot.com',
    messagingSenderId: '578346489088'
  });
};

window.countMeNetwork = {

  registerNewAccount: (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        countMeNetwork.verififyAccount();

        countMeNetwork.signOut();
        location.href = '../index.html';
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
        alert(errorMessage);
        // ...
      });
  },

  signInUser: (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(event => {
        // Se utiliza la interfaz Location, implementando la propiedad Location.href que contiene la URL
        location.href = 'views/wall.html';
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
        alert(errorMessage);
      });
  },

  signInGoogle: () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const token = result.credential.accerssToken;
        const user = result.user;
        location.href = 'views/wall.html';
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log(result);
      }).catch(error => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('Usuario ya existente, intenta de nuevo');
        }
      });
  },
  signInFacebook: () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    //provider.addScope('public_profile');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const token = result.credential.accerssToken;
        const user = result.user;
        location.href = 'views/wall.html';
        // This gives you a Google Access Token. You can use it to access the Google API.
        console.log(result);
        console.log(token);
        console.log(user);
      }).catch(error => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorMessage);
        let email = error.email;
        console.log(email);
        let credential = error.credential;
        console.log(credential);
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('Usuario ya existente, intenta de nuevo');
        }
      });
  },
  verififyAccount: () => {
    let user = firebase.auth().currentUser;
    user
      .sendEmailVerification()
      .then(result => {
        alert('Enviando correo de verificación...');
        // Email sent.
      })
      .catch(error => {
        console.log(error);
        // An error happened.
      });
  },

  signOut: () => {
    firebase
      .auth()
      .signOut()
      .then(event => {
        location.href = '../index.html';
        alert('Saliendo...');
      }).catch(error => {
        console.log('Error al cerrar sesión', error);
      });
  }};


/*
const btnFace=document.getElementById('btnFace');


btnFace.addEventListener('click',function(e){
e.preventDefault();
let provider = new firebase.auth.FacebookAuthProvider();
validacion(provider);
});

//const validacion=(provider)=>{
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
    });
//}
*/

window.fbAsyncInit = () => {
  FB.init({
    appId: '289516981795849',
    xfbml: true,
    version: 'v3.1'
  });
  FB.AppEvents.logPageView();
};
