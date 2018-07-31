
const validacion = (provider) => {
  firebase.auth().signInWithPopup(provider).then(result => {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    location.href = './views/wall.html';
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
}).catch(error => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

  });
};
