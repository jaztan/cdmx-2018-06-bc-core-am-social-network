// Función en objeto global para llamar a la función de iniciación de Firebase
window.initializeFirebase = () => {
  // Llaves
  firebase.initializeApp({
    apiKey: 'AIzaSyCm7I3cvutJG8L4Sbt7BiK-VQdPdxk3i4Y',
    authDomain: 'count-on-me-476fd.firebaseapp.com',
    databaseURL: 'https://count-on-me-476fd.firebaseio.com',
    projectId: 'count-on-me-476fd',
    storageBucket: 'count-on-me-476fd.appspot.com',
    messagingSenderId: '578346489088'
  });
};

/* Objeto window para mandar a llamar a las funciones de login en el archivo de paintView y paintIndex */
window.countMeNetwork = {
 /* Función para registrar a un usuario por medio de su correo y de su email */
  registerNewAccount: (email, password) => {
    /* Métodos de la consola en firebase para crar al usuario por medio del email y la contraseña*/
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        /* cuando se cumple la función  ejecuta la función que mando un correo que va a verificar que se registro la cuenta */
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
<<<<<<< HEAD
        const token = result.credential.accessToken;
=======
        const token = result.credential.accerssToken;
>>>>>>> upstream/master
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
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> upstream/master
