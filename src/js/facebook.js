const btnFace = document.getElementById('facebook-button');
btnFace.addEventListener('click', function (e) {
  let provider = new firebase.auth.FacebookAuthProvider();
  validacion(provider);
});
const validacion = (provider) => {
  firebase.auth().signInWithPopup(provider).then(result=> {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const token = result.credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    location.href = 'views/wall.html';
    // ...
  }).catch(function (error) {
    // Handle Errors here.
    let errorCode = error.code;
    console.log(errorCode);
    let errorMessage = error.message;
    console.log(errorMessage);
    // The email of the user's account used.
    let email = error.email;
    console.log(email);
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;
    console.log(credential);
  });
}