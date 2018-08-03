initializeFirebase();

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();
document.getElementById('signout').addEventListener('click', event => {
  event.preventDefault();
  countMeNetwork.signOut();
});
/* Se crea la función para traer de firebase los datos que ingresa el usuario al autenticarse ya sea por correo y contraseña como por gmail o por facebook */
const userProfile = (user) => {
  /* Se condiciona al usuario de acuerdo al parámetro 'user' al extraer el nombre y comparar que sí el resultado es nulo */
  if (user.displayName === null) {
    /* Con el id del elemento en html se extrae al nombre del usuario en el caso de registro e ingreso con correo debido a que en firebase en la autenticación nos da la data del correo y la contraseña que se genera */
    document.getElementById('user-name').innerHTML = user.name;
    document.getElementById('user-email').innerHTML = user.email;
  }
  /* Se declara la una variable let para traer la imagen del usuario y en caso de correo y contraseña se guarda o nos pinte una que se defina por default */
  let userPhoto = document.getElementById('user-photo');
  /* Se vuelve a condicionar con el parámetro de User ahora se condicionar que si en su propiedad de photoURL es null se pinte la imagen por Default */
  if (user.photoURL === null) {
    userPhoto.src = '../images/profile-photo.jpg';
  } else {
    userPhoto.src = `${user.photoURL}?height=200`;
  }
};

/* Función para traer la información e inyectarla en el comentario para condicionar la data*/
const getUserData = () => {
  /* Se declaran variables let para asignarles valores dentro de los métodos de firebase para los usuraios logueados*/
  let userPhotoDefault;
  let currentName;
  /* Métodos de firebase  */
  firebase
  /* Cuando un usuario accede a su cuenta (el usuario activo está configurado)*/
    .auth()
    .onAuthStateChanged(user => {
      if (user) {
        userProfile(user); // Se llama a la función del perfil para darle un evento de click al botón defido en html
        document.getElementById('send-post').addEventListener('click', event => {
          /* Previene que el evento recargué la página */
          event.preventDefault();
          /* Para traer y guardar la fecha de con el método de Firestore ( notación abreviada para recuperar los servicios de la aplicación) y con el método   */
          /* FieldValue Valores de Sentinel que se pueden usar al escribir campos de documento */
          /* Método serverTimestamp para incluir una marca de tiempo generada por el servidor en los datos escritos. */
          let datePost = firebase.firestore.FieldValue.serverTimestamp();

          const contentPost = document.getElementById('content-post').value;
          if (contentPost !== '' && contentPost !== ' ') {
            if (user.photoURL === null) {
              userPhotoDefault = '../images/profile-photo.jpg';
            } else {
              userPhotoDefault = user.photoURL;
            }
            if (user.displayName === null) {
              currentName = user.email;
            } else {
              currentName = user.displayName;
            }
            /* Se crea en firestore la collección de Post como un objeto con el método add y se crean las propiedades */
            db.collection('post').add({
              userID: user.uid,
              userName: currentName,
              time: datePost,
              content: contentPost
            }).then(result => {
              alert('Publicación exitosa');
              document.getElementById('content-post').value = '';
              /* Se llama a la función que se va a crear para pintar el comentario */
              drawPost();
            }).catch(error => {
              console.error('Error adding document: ', error);
            });
          }
        });
      } else {
        /* De la condicional de usuario logueado en caso de que no, no le permita entrar al muro */
        location.href = ('../index.html');
      }
    });
};

// Función para pintar los post en el muro
const drawPost = () => {
  firebase
    .auth()
    .onAuthStateChanged(user => {
      /* De acuerdo al usuario logueado se condiciona con el id que se genera de cada uno en la base de datos */
      if (user) {
        /* se crea la variable cons para darle el valor del objeto user llamando a su ID generado por usuario */
        const currentUserID = user.uid;
        /* Se crea la variable postRef que crea una referencia a una ubicación en un nivel subordinado del árbol de datos de colleccióm de post */
        /* Con el método orderBy se usa para especificar el orden en el que se presentan los datos en este caso por la propiedad de 'time' y 'desc' también puedes ordenar de forma descendente para ver las últimas  */
        const postRef = db.collection('post').orderBy('time', 'desc');
        postRef.get()
          .then(element => {
            let result = '';
            element.forEach(post => {
              if (currentUserID === post.data().userID) {
                result +=
                `<div class="card mb-4 border-secondary">
                   <div class="card-body">
                    <p class="card-text" id="${post.id}">${post.data().content}</p>
                   </div>
                  <div class="card-header small-font">
                   <div class="container">
                    <div class="row">
                     <div class="col-md-8"><div class="row">
                      <div class="col-md-2 px-0 px-md-2 col-2">
                   </div>
                    <div class="col-10 col-md-10 pl-0">
                     <strong>${post.data().userName}</strong>
                       <p>${post.data().time}</p>
                     </div>
                    </div>
                  </div>
                    <div class="col-md-4 text-md-right text-center">
                      <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onclick="deletePost('${post.id}')">
                       <i class="far fa-trash-alt"></i> Delete</button>
                      <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onclick="createUpdateArea('${post.id}')">
                       <i class="ml-3 fas fa-pencil-alt"></i> Edit</button>
                     </div>
                   </div>
                  </div>
                 </div>
                </div>`;
              } else {
                result +=
                `<div class="card mb-4 border-secondary">
                  <div class="card-body">
                   <p class="card-text" id="${post.id}">${post.data().content}</p>
                  </div>
                  <div class="card-header small-font">
                   <div class="container">
                    <div class="row">
                     <div class="col-md-8">
                      <div class="row">
                      <div class="col-md-2 px-0 px-md-2 col-2">
                       </div>
                       <div class="col-10 col-md-10 pl-0">
                        <strong>${post.data().userName}</strong><p>${post.data().time}</p>
                </div>
                  </div>
                   </div>
                    <div class="col-md-4 text-md-right text-center">
                    <button class="no-btn mr-4" <i class="fas fa-thumbs-up"></i></button>
                   </div>
                   </div>
                  </div>
                 </div>
              </div>`;
              }
            });
            document.getElementById('allList-of-post').innerHTML = result;
          });
      } else {
        location.href = ('../index.html');
      }
    });
};


const deletePost = (postID) => {
  db.collection('post').doc(postID).delete()
    .then(element => {
      alert('Se ha eliminado el post');
      drawPost();
    }).catch(element => {
      alert('No se puede borrar');
    });
};


const createUpdateArea = postID => {
  db.collection('post').doc(postID).get()
    .then(post => {
      document.getElementById(postID).innerHTML =
      `<textarea class="form-control form-textarea" id="post${postID}" rows="4">${post.data().content}</textarea>
       <div class="ml-auto text-right">
       <button class="btn btn-warning" onclick="updatePost('${postID}')">
      <i class="fas fa-save"></i></button><div>`;
    }).catch(error => {
      console.log('Error al editar');
    });
};

const updatePost = postID => {
  const postContent = document.getElementById(`post${postID}`).value;
  db.collection('post').doc(postID).get()
    .then(post => {
      db.collection('post').doc(postID).update({
        content: postContent
      }).then(element => {
        drawPost();
      }).catch(element => {
        console.log('Error al editar la publicación');
      });
    });
};
getUserData();
drawPost();
