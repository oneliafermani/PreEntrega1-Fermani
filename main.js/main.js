
let cantidadAlumnos = 0;
let alumnos = [];

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

cantidadAlumnos = prompt("Ingrese la cantidad de alumnos:");
cantidadAlumnos = parseInt(cantidadAlumnos);

for (let i = 0; i < cantidadAlumnos; i++) {
  let nombre = prompt("Ingrese el nombre del alumno " + (i + 1) + ":");
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
}

// Búsqueda de un alumno por nombre
let nombreBuscado = prompt("Ingrese el nombre del alumno que desea buscar:");
let alumnoEncontrado = alumnos.find(alumno => alumno.nombre === nombreBuscado);
if (alumnoEncontrado) {
  console.log("Alumno encontrado:", alumnoEncontrado);
} else {
  console.log("Alumno no encontrado.");
}

// Filtrado de alumnos con nota final mayor o igual a 7
let alumnosAprobados = alumnos.filter(alumno => alumno.notaFinal >= 7);
console.log("Alumnos aprobados:", alumnosAprobados);
