initializeFirebase();

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

document.getElementById('signout').addEventListener('click', event => {
  event.preventDefault();
  countMeNetwork.signOut();
});

window.wallNetwork = {

  setUserProfile: user => {
    if (user.displayName === null) {
      document.getElementById('user-name').innerHTML = user.email;
    } else {
      document.getElementById('user-name').innerHTML = user.displayName;
    }
    document.getElementById('user-email').innerHTML = user.email;
    userPhoto = document.getElementById('user-image');
    if (user.photoURL === null) {
      userPhoto.src = '../images/profile-photo.jpg';
    } else {
      userPhoto.src = `${user.photoURL}?height=50`;
    }
  },

  getCurrentUserData: () => {
    let userPhotoLink;
    let currentName;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        wallNetwork.setUserProfile(user);
        document.getElementById('send-post').addEventListener('click', event => {
          event.preventDefault();
          let datePost = firebase.firestore.FieldValue.serverTimestamp();
          const contentPost = document.getElementById('user-content-post').value;
          if (contentPost !== '' && contentPost !== ' ') {
            if (user.photoURL === null) {
              userPhotoLink = '../images/profile-photo.jpg';
            } else {
              userPhotoLink = user.photoURL;
            }
            if (user.displayName === null) {
              currentName = user.email;
            } else {
              currentName = user.displayName;
            }
            db.collection('post').add({
              userID: user.uid,
              userName: currentName,
              userPhoto: userPhotoLink,
              time: datePost,
              likes: [],
              content: contentPost
            }).then(result => {
              alert('Se ha publicado');
              document.getElementById('user-content-post').value = '';
              wallNetwork.drawPostByUser();
            }).catch(error => {
              console.error('Error adding document: ', error);
            });
          }
        });
      } else {
        location.href = ('../index.html');
      }
    });
  },

  drawPostByUser: () => {
    firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          const currentUserID = user.uid;
          const postRef = db.collection('post').orderBy('time', 'desc');
          postRef.get()
            .then(element => {
              let result = '';
              element.forEach(post => {
                if (currentUserID === post.data().userID) {
                  result += `<div class="card mb-4 border-secondary">
              <div class="card-body">
                <p class="card-text" id="${post.id}">${post.data().content}</p>
              </div><div class="card-header small-font"><div class="container"><div class="row"><div class="col-md-8"><div class="row"><div class="col-md-2 px-0 px-md-2 col-2"><img src="${post.data().userPhoto}" class="rounded-circle profile-image"></div><div class="col-10 col-md-10 pl-0"><strong>${post.data().userName}</strong><p>${post.data().time}</p></div></div></div><div class="col-md-4 text-md-right text-center">${post.data().likes.length} <button class="no-btn mr-4" onclick="addLikeToPost('${post.id}')"><i class="fas fa-thumbs-up"></i></button>
              <button class="no-btn" onclick="deletePost('${post.id}')"><i class="far fa-trash-alt"></i></button><button class="no-btn" onclick="createUpdateArea('${post.id}')"><i class="ml-3 fas fa-pencil-alt"></i></button></div></div></div>
              </div>
            </div>`;
                } else {
                  result += `<div class="card mb-4 border-secondary">
              <div class="card-body">
                <p class="card-text" id="${post.id}">${post.data().content}</p>
              </div><div class="card-header small-font"><div class="container"><div class="row"><div class="col-md-8"><div class="row"><div class="col-md-2 px-0 px-md-2 col-2"><img src="${post.data().userPhoto}" class="rounded-circle profile-image"></div><div class="col-10 col-md-10 pl-0"><strong>${post.data().userName}</strong><p>${post.data().time}</p></div></div></div><div class="col-md-4 text-md-right text-center">${post.data().likes.length} <button class="no-btn mr-4" onclick="addLikeToPost('${post.id}')"><i class="fas fa-thumbs-up"></i></button></div></div></div>
              </div>
            </div>`;
                }
              });
              document.getElementById('list-of-post').innerHTML = result;
            });
        } else {
          location.href = ('../index.html');
        }
      });
  },

  checkUserIDforLike: (userID, likes) => {
    const positionUserID = likes.indexOf(userID);
    if (positionUserID === -1) {
      return true;
    } else {
      return positionUserID;
    }
  },


  deletePost: (postID) => {
    db.collection('post').doc(postID).delete()
      .then(element => {
        alert('Seguro que deseas eliminarla');
        wallNetwork.drawPostByUser();
      }).catch(element => {
        alert('No se puede borrar');
      });
  },

  createUpdateArea: postID => {
    db.collection('post').doc(postID).get()
      .then(post => {
        document.getElementById(postID).innerHTML = `<textarea class="form-control form-textarea" id="post${postID}" rows="4">${post.data().content}</textarea><div class="ml-auto text-right"><button class="btn btn-warning" onclick="updatePostContent('${postID}')"><i class="fas fa-save"></i></button><div>`;
      }).catch(error => {
        console.log('Error al editar');
      });
  },

  updatePostContent: postID => {
    const postContent = document.getElementById(`post${postID}`).value;
    db.collection('post').doc(postID).get()
      .then(post => {
        db.collection('post').doc(postID).update({
          content: postContent
        }).then(element => {
          wallNetwork.drawPostByUser();
        }).catch(element => {
          console.log('Error al editar la publicación');
        });
      });
  }

};
wallNetwork.getCurrentUserData();
wallNetwork.drawPostByUser();



/*
function enviar() {
  var mensaje = document.getElementById('mensaje').value;

  db.collection('users')
    .add({
      first: mensaje
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      var mensaje = (document.getElementById("mensaje").value = "");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}

var tabla = document.getElementById("tabla");
db.collection("users").onSnapshot(querySnapshot => {
  tabla.innerHTML = ""; //con este inner se limpia la caja
  querySnapshot.forEach(doc => {
    console.log(`${doc.id} => ${doc.data()}`);
    tabla.innerHTML += `
            <tr>
            <td>${doc.data().first}</td>
            <td><button class="btn btn-danger" onclick="eliminar('${
              doc.id
            }')">Eliminar</button></td>
            <td><button class="btn btn-warning" onclick="editar('${doc.id}','${
      doc.data().first
    }')">Editar</button></td>
            </tr>
            `;
  });
});

//a esta función se le paso el parámetro de Id para que se pueda borrar el comentario con su respectivo deseado
function eliminar(id) {
  db.collection("users")
    .doc(id)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
}

//con esta función se pueden editar el mensaje y se le pasan los parámetros de id y mensaje para redireccionar
//el mensaje que se va a cambiar al input de mensaje

function editar(id, mensaje) {
  document.getElementById("mensaje").value = mensaje;
  var boton = document.getElementById("boton");
  boton.innerHTML = "Editar"; //se cambia el nombre del boton por la función que se va a realizar

  boton.onclick = function() {
    var washingtonRef = db.collection("users").doc(id);
    // Set the "capital" field of the city 'DC'
    var mensaje = document.getElementById("mensaje").value;
    //var apellido = document.getElementById('apellido').value;
    // var fecha = document.getElementById('fecha').value;
    return washingtonRef
      .update({
        first: mensaje
        //last: apellido,
        //born: fecha
      })
      .then(function() {
        console.log("Document successfully updated!");
        boton.innerHTML = "Enviar"; //se regresa el nombre del boton como se tenia al inicio
        document.getElementById("mensaje").value = ""; //se pone en blanco para que puedan ingresar otro comentario
        //document.getElementById('apellido').value = '';
        //document.getElementById('fecha').value = '';
      })
      .catch(function(error) {
        // The document probably doesn't exist.

       console.error("Error updating document: ", error);
      });
  };
}
*/
