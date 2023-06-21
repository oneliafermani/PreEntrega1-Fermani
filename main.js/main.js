let alumnos = [];

// Constante de usuarios válidos
const usuariosValidos = [
  { email: "fermanionelia@gmail.com", contraseña: "contraseña1" },
  { email: "docentecoder@gmail.com", contraseña: "contraseña2" },
];

let emailActual = ""; // Variable para almacenar el email actualmente ingresado

function submitForm(event) {
  event.preventDefault(); // Para que el formulario no se envíe automáticamente

  // Valores ingresados por el usuario
  var email = document.getElementById("exampleInputEmail1").value;
  var password = document.getElementById("exampleInputPassword1").value;

  // Validar los campos del formulario
  if (email === "" || password === "") {
    alert("Por favor, complete todos los campos");
    return;
  }

  // Verificar el email y la contraseña
  const usuarioValido = usuariosValidos.find(
    (usuario) => usuario.email === email && usuario.contraseña === password
  );
  if (usuarioValido) {
    emailActual = email; // Almacenar el email actualmente ingresado
    // Ocultar sección de ingreso y mostrar registro de alumnos
    document.getElementById("seccion-ingreso").style.display = "none";
    document.getElementById("registro-alumnos").style.display = "block";
    cargarAlumnosDesdeStorage(); // Cargar los alumnos del almacenamiento local
    mostrarAlumnos(); // Mostrar los alumnos en la página principal
  } else {
    alert("Email o contraseña incorrectos");
    return;
  }
}

// Restablecer los campos del formulario
document.getElementById("exampleInputEmail1").value = "";
document.getElementById("exampleInputPassword1").value = "";

// Constante para obtener el ID del botón de ingreso
const botonIngresar = document.getElementById("boton-ingresar");

// Reacción del botón ingresar
botonIngresar.addEventListener("click", submitForm);

// Función constructora Alumno
function Alumno(nombre) {
  this.nombre = nombre;
  this.notas = [];
  this.notaFinal = 0;
}

// Método para calcular la nota final del alumno
Alumno.prototype.calcularNotaFinal = function () {
  let notaFinal =
    this.notas[0] * 0.2 +
    this.notas[1] * 0.3 +
    this.notas[2] * 0.3 +
    this.notas[3] * 0.2;
  this.notaFinal = notaFinal;
};

// Función para guardar los alumnos en el almacenamiento local
function guardarAlumnosEnStorage() {
  const alumnosJSON = JSON.stringify(alumnos);
  localStorage.setItem("alumnos-" + emailActual, alumnosJSON);
}

// Función para cargar los alumnos desde el almacenamiento local
function cargarAlumnosDesdeStorage() {
  const almacenamiento = localStorage.getItem("alumnos-" + emailActual);
  if (almacenamiento) {
    alumnos = JSON.parse(almacenamiento);
  }
}

// Función para agregar un alumno nuevo
function agregarAlumno() {
  let nombre = prompt("Ingrese el nombre del alumno:");
  if (!nombre) return; // Si se presiona cancelar en el cuadro de diálogo, no se agrega el alumno

  let alumno = new Alumno(nombre);

  for (let j = 1; j <= 4; j++) {
    let nota = 0;
    while (nota < 1 || nota > 10 || isNaN(nota)) {
      nota = prompt(
        "Ingrese la nota de la evaluación " +
          j +
          " del alumno " +
          alumno.nombre +
          ":"
      );
      nota = parseFloat(nota);
      if (nota < 1 || nota > 10 || isNaN(nota)) {
        alert(
          "La nota ingresada es inválida. Ingrese una nota numérica entre 1 y 10."
        );
      }
    }
    alumno.notas.push(nota);
  }

  alumno.calcularNotaFinal();
  alumnos.push(alumno);
  guardarAlumnosEnStorage();
  mostrarAlumnos();
}

// Función para eliminar un alumno
// Función para eliminar un alumno
function eliminarAlumno(nombre) {
  swal({
    title: "¿Estás seguro?",
    text: `¿Deseas eliminar al alumno ${nombre}?`,
    icon: "warning",
    buttons: ["Cancelar", "Eliminar"],
    dangerMode: true,
  })
    .then((confirmar) => {
      if (confirmar) {
        alumnos = alumnos.filter((alumno) => alumno.nombre !== nombre);
        guardarAlumnosEnStorage();
        mostrarAlumnos();
        swal("¡Alumno eliminado!", `El alumno ${nombre} ha sido eliminado.`, "success");
      } else {
        swal("Cancelado", `El alumno ${nombre} no ha sido eliminado.`, "info");
      }
    })
    .catch((err) => {
      swal("¡Oh, no!", "¡Hubo un error al eliminar el alumno!", "error");
    });
}

// Función para buscar un alumno por nombre
function buscarAlumno() {
  swal({
    text: 'Buscar un alumno. Por ejemplo, "Juan Pérez".',
    content: "input",
    button: {
      text: "Buscar",
      closeModal: false,
    },
  })
    .then((nombre) => {
      if (!nombre) throw null;

      const alumnoEncontrado = alumnos.find(
        (alumno) => alumno.nombre.toLowerCase() === nombre.toLowerCase()
      );

      if (alumnoEncontrado) {
        swal({
          title: "Resultado de búsqueda",
          text: `El alumno ${alumnoEncontrado.nombre} fue encontrado.`,
          icon: "success",
        });
      } else {
        swal("¡No se encontró ningún alumno!", "", "error");
      }
    })
    .catch((err) => {
      if (err) {
        swal("¡Oh, no!", "¡Hubo un error al buscar el alumno!", "error");
      } else {
        swal.stopLoading();
        swal.close();
      }
    });
}


// Función para filtrar los alumnos aprobados
function filtrarAlumnosAprobados() {
  let alumnosAprobados = alumnos.filter((alumno) => alumno.notaFinal >= 7);
  swal({
    title: "Alumnos aprobados",
    text: `Los alumnos aprobados son: ${alumnosAprobados
      .map((alumno) => alumno.nombre)
      .join(", ")}`,
    icon: "success",
  });
}

// Función para mostrar los alumnos en el DOM
function mostrarAlumnos() {
  const alumnosContainer = document.getElementById("alumnos-container");
  alumnosContainer.innerHTML = "";

  alumnos.forEach((alumno) => {
    const alumnoElement = document.createElement("div");
    alumnoElement.innerHTML = `
      <h3>${alumno.nombre}</h3>  
      <p>Nota Final: ${alumno.notaFinal}</p>
      <button class="btn btn-primary btnEliminar" onclick="eliminarAlumno('${alumno.nombre}')">Eliminar</button>
    `;
    alumnosContainer.appendChild(alumnoElement);
  });
}

// Función para cerrar sesión
function cerrarSesion() {
  // Restablecer variables y ocultar sección de registro de alumnos
  emailActual = "";
  alumnos = [];
  document.getElementById("registro-alumnos").style.display = "none";
  document.getElementById("seccion-ingreso").style.display = "block";
}
