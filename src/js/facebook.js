const btnFace = document.getElementById('facebook-button');
btnFace.addEventListener('click', event => {
  let provider = new firebase.auth.FacebookAuthProvider();
  validacion(provider);
<<<<<<< HEAD
  location.href = 'views/wall.html';
  /* location.assign('views/wall.html'); */
  /* event.preventDefault(); */
=======
>>>>>>> upstream/master
  console.log(location);
});
const validacion = (provider) => {
  firebase.auth().signInWithPopup(provider).then(result => {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    let token = result.credential.accessToken;
    console.log(token, 'tu token es');
    // The signed-in user info.
    let user = result.user;
    /* event.preventDefault(); */
    console.log(user, 'nombre de usuario');
    /* href = '../views/wall.html' */
    /* location.href('../views/wall.html'); */
    location.assign('views/wall.html');
    console.log('estoy en el muro');
    event.preventDefault();
  }).catch(error => {
    // Handle Errors here.
    let errorCode = error.code;
    console.log(errorCode, 'hay un error en el codigo');
    let errorMessage = error.message;
    console.log(errorMessage, 'hay un mensaje de error');
    // The email of the user's account used.
    let email = error.email;
    console.log(email, 'este es tu email');
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;
    console.log(credential);
  });
};
