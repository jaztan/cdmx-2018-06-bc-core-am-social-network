initializeFirebase();

document.getElementById('btn-singin').addEventListener('click', event => {
  event.preventDefault();
  console.log('diste un click');
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  countMeNetwork.registerNewAccount(email, password);
  countMeNetwork.verififyAccount();
});
