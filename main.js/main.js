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

  // Restablecer los campos del formulario
  document.getElementById("exampleInputEmail1").value = "";
  document.getElementById("exampleInputPassword1").value = "";
}

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
function guardarAlumnosEnLocalStorage() {
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
        "Ingrese la nota " + j + " del alumno " + nombre + " (1 a 10):"
      );
      nota = parseInt(nota);
    }
    alumno.notas.push(nota);
  }

  alumno.calcularNotaFinal();
  alumnos.push(alumno);
  guardarAlumnosEnLocalStorage();
  mostrarAlumnos();
}

// Función para mostrar los alumnos en la página principal
function mostrarAlumnos() {
  let listaAlumnos = document.getElementById("lista-alumnos");
  listaAlumnos.innerHTML = "";

  if (alumnos.length === 0) {
    listaAlumnos.innerHTML = "<p>No hay alumnos registrados.</p>";
    return;
  }

  let tabla = document.createElement("table");
  tabla.classList.add("table", "table-striped");

  let encabezado = document.createElement("thead");
  let encabezadoFila = document.createElement("tr");
  let encabezadoNombre = document.createElement("th");
  encabezadoNombre.textContent = "Nombre";
  encabezadoFila.appendChild(encabezadoNombre);

  for (let i = 1; i <= 4; i++) {
    let encabezadoNota = document.createElement("th");
    encabezadoNota.textContent = "Nota " + i;
    encabezadoFila.appendChild(encabezadoNota);
  }

  let encabezadoNotaFinal = document.createElement("th");
  encabezadoNotaFinal.textContent = "Nota Final";
  encabezadoFila.appendChild(encabezadoNotaFinal);

  encabezado.appendChild(encabezadoFila);
  tabla.appendChild(encabezado);

  let cuerpoTabla = document.createElement("tbody");

  alumnos.forEach((alumno) => {
    let fila = document.createElement("tr");

    let celdaNombre = document.createElement("td");
    celdaNombre.textContent = alumno.nombre;
    fila.appendChild(celdaNombre);

    alumno.notas.forEach((nota) => {
      let celdaNota = document.createElement("td");
      celdaNota.textContent = nota;
      fila.appendChild(celdaNota);
    });

    let celdaNotaFinal = document.createElement("td");
    celdaNotaFinal.textContent = alumno.notaFinal.toFixed(2);
    fila.appendChild(celdaNotaFinal);

    cuerpoTabla.appendChild(fila);
  });

  tabla.appendChild(cuerpoTabla);
  listaAlumnos.appendChild(tabla);
}

// Función para cerrar la sesión
function cerrarSesion() {
  emailActual = "";
  alumnos = [];
  document.getElementById("seccion-ingreso").style.display = "block";
  document.getElementById("registro-alumnos").style.display = "none";
  document.getElementById("lista-alumnos").innerHTML = "";
}

// Función para buscar un alumno por nombre
function buscarAlumno() {
  let nombreBusqueda = prompt("Ingrese el nombre del alumno a buscar:");
  if (!nombreBusqueda) return; // Si se presiona cancelar en el cuadro de diálogo, no se realiza la búsqueda

  let resultados = alumnos.filter((alumno) =>
    alumno.nombre.toLowerCase().includes(nombreBusqueda.toLowerCase())
  );

  if (resultados.length === 0) {
    alert("No se encontraron resultados.");
  } else {
    let mensaje = "Alumnos encontrados:\n\n";
    resultados.forEach((alumno) => {
      mensaje += "Nombre: " + alumno.nombre + "\n";
      mensaje += "Notas: " + alumno.notas.join(", ") + "\n";
      mensaje += "Nota Final: " + alumno.notaFinal.toFixed(2) + "\n\n";
    });
    alert(mensaje);
  }
}

// Función para filtrar los alumnos aprobados
function filtrarAlumnosAprobados() {
  let alumnosAprobados = alumnos.filter((alumno) => alumno.notaFinal >= 7);

  if (alumnosAprobados.length === 0) {
    alert("No hay alumnos aprobados.");
  } else {
    let mensaje = "Alumnos aprobados:\n\n";
    alumnosAprobados.forEach((alumno) => {
      mensaje += "Nombre: " + alumno.nombre + "\n";
      mensaje += "Notas: " + alumno.notas.join(", ") + "\n";
      mensaje += "Nota Final: " + alumno.notaFinal.toFixed(2) + "\n\n";
    });
    alert(mensaje);
  }
}

// Función para eliminar un alumno por nombre
function eliminarAlumno() {
  let nombreEliminar = prompt("Ingrese el nombre del alumno a eliminar:");
  if (!nombreEliminar) return; // Si se presiona cancelar en el cuadro de diálogo, no se realiza la eliminación

  const indiceAlumno = alumnos.findIndex(
    (alumno) => alumno.nombre.toLowerCase() === nombreEliminar.toLowerCase()
  );

  if (indiceAlumno === -1) {
    alert("No se encontró el alumno.");
  } else {
    alumnos.splice(indiceAlumno, 1); // Eliminar el alumno del arreglo
    guardarAlumnosEnLocalStorage(); // Guardar los cambios en el almacenamiento local
    mostrarAlumnos(); // Actualizar la lista de alumnos mostrada en la página
    alert("Alumno eliminado correctamente.");
  }
}
// Función para calcular el promedio de las notas finales de todos los alumnos
function calcularPromedio() {
  if (alumnos.length === 0) {
    return 0;
  }

  let sumaNotas = alumnos.reduce((total, alumno) => total + alumno.notaFinal, 0);
  let promedio = sumaNotas / alumnos.length;
  return promedio;
}
