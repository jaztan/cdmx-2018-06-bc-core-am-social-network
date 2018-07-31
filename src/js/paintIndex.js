initializeFirebase();

document.getElementById('btn-loginaitor').addEventListener('click', event => {
  console.log('diste un click');
  event.preventDefault();
  const email = document.getElementById('email-two').value;
  const password = document.getElementById('password-two').value;
  countMeNetwork.signInUser(email, password);
});

document.getElementById('signin-google').addEventListener('click', event => {
  console.log('diste un click');
  event.preventDefault();
  countMeNetwork.signInGoogle();
});
const btnFace = document.getElementById('facebook-button');
btnFace.addEventListener('click', function (e) {
  let provider = new firebase.auth.FacebookAuthProvider();
  validacion(provider);
});
