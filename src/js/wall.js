firebase.initializeApp({
  apiKey: "AIzaSyCm7I3cvutJG8L4Sbt7BiK-VQdPdxk3i4Y",
  authDomain: "count-on-me-476fd.firebaseapp.com",
  projectId: "count-on-me-476fd"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
function enviar() {
  var mensaje = document.getElementById("mensaje").value;

  db.collection("users")
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
