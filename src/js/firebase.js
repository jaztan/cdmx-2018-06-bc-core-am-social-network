window.initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyCm7I3cvutJG8L4Sbt7BiK-VQdPdxk3i4Y",
    authDomain: "count-on-me-476fd.firebaseapp.com",
    databaseURL: "https://count-on-me-476fd.firebaseio.com",
    projectId: "count-on-me-476fd",
    storageBucket: "count-on-me-476fd.appspot.com",
    messagingSenderId: "578346489088"
  });
};
window.fbAsyncInit = function() {
        FB.init({
          appId      : '289516981795849',
          xfbml      : true,
          version    : 'v3.1'
        });
        FB.AppEvents.logPageView();
      };
