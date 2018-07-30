initializeFirebase();

document.getElementById('btn-loginaitor').addEventListener('click', event => {
    event.preventDefault();
    console.log('diste un click');
    const email = document.getElementById('email-two').value;
    const password = document.getElementById('password-two').value;
    countMeNetwork.signInUser(email, password);

  })

  document.getElementById('signin-google').addEventListener('click', event =>{
    event.preventDefault();
    countMeNetwork.signInGoogle();
  });
