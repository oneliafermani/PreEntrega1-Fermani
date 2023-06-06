let alumnos = [];

// Definición de la función constructora Alumno
function Alumno(nombre) {
  this.nombre = nombre;
  this.notas = [];
  this.notaFinal = 0;
}

// Método para calcular la nota final del alumno
Alumno.prototype.calcularNotaFinal = function() {
  let notaFinal = (this.notas[0] * 0.2) + (this.notas[1] * 0.3) + (this.notas[2] * 0.3) + (this.notas[3] * 0.2);
  this.notaFinal = notaFinal;
};

// Función para guardar los alumnos en el almacenamiento local
function guardarAlumnosEnStorage() {
  localStorage.setItem('alumnos', JSON.stringify(alumnos));
}

// Función para cargar los alumnos desde el almacenamiento local
function cargarAlumnosDesdeStorage() {
  const almacenamiento = localStorage.getItem('alumnos');
  if (almacenamiento) {
    alumnos = JSON.parse(almacenamiento);
  }
}

// Función para agregar un nuevo alumno
function agregarAlumno() {
  let nombre = prompt("Ingrese el nombre del alumno:");
  let alumno = new Alumno(nombre);

  for (let j = 1; j <= 4; j++) {
    let nota = 0;
    while (nota < 1 || nota > 10) {
      nota = prompt("Ingrese la nota de la evaluación " + j + " del alumno " + alumno.nombre + ":");
      nota = parseFloat(nota);
      if (nota < 1 || nota > 10) {
        alert("La nota ingresada es inválida. Ingrese una nota entre 1 y 10.");
      }
    }
    alumno.notas.push(nota);
  }

  alumno.calcularNotaFinal();
  alumnos.push(alumno);
  guardarAlumnosEnStorage();
  mostrarAlumnos();
}

// Función para buscar un alumno por nombre
function buscarAlumno() {
  let nombreBuscado = prompt("Ingrese el nombre del alumno que desea buscar:");
  let alumnoEncontrado = alumnos.find(alumno => alumno.nombre === nombreBuscado);
  if (alumnoEncontrado) {
    console.log("Alumno encontrado:", alumnoEncontrado);
  } else {
    console.log("Alumno no encontrado.");
  }
}

// Función para filtrar los alumnos aprobados
function filtrarAlumnosAprobados() {
  let alumnosAprobados = alumnos.filter(alumno => alumno.notaFinal >= 7);
  console.log("Alumnos aprobados:", alumnosAprobados);
}

// Función para mostrar los alumnos en el DOM
function mostrarAlumnos() {
  const alumnosContainer = document.getElementById('alumnos-container');
  alumnosContainer.innerHTML = '';

  alumnos.forEach(alumno => {
    const alumnoElement = document.createElement('div');
    alumnoElement.innerHTML = `
      <h3>${alumno.nombre}</h3>
      <p>Nota Final: ${alumno.notaFinal}</p>
    `;
    alumnosContainer.appendChild(alumnoElement);
  });
}

// Carga de los alumnos desde el almacenamiento local y muestra inicial
cargarAlumnosDesdeStorage();
mostrarAlumnos();
