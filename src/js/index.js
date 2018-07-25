firebase.initializeApp({
  apiKey: "AIzaSyCm7I3cvutJG8L4Sbt7BiK-VQdPdxk3i4Y",
  authDomain: "count-on-me-476fd.firebaseapp.com",
  projectId: "count-on-me-476fd"
});

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

db.collection("users").add({
  first: "Ada",
  last: "Lovelace",
  born: 1815
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});
