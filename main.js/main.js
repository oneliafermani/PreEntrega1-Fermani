let cantidadAlumnos = 0;
let notasEvaluaciones = [];
let notaFinalAlumnos = [];

function calcularNotaFinal(nota1, nota2, nota3, nota4) {
  let notaFinal = (nota1 * 0.2) + (nota2 * 0.3) + (nota3 * 0.3) + (nota4 * 0.2);
  return notaFinal;
};

cantidadAlumnos = prompt("Ingrese la cantidad de alumnos:");
cantidadAlumnos = parseInt(cantidadAlumnos);

for (let i = 0; i < cantidadAlumnos; i++) {
  let notas = [];
  for (let j = 1; j <= 4; j++) {
    let nota = 0;
    while (nota < 1 || nota > 10) {
      nota = prompt("Ingrese la nota de la evaluación " + j + " del alumno " + (i + 1) + ":");
      nota = parseFloat(nota);
      if (nota < 1 || nota > 10) {
        alert("La nota ingresada es inválida. Ingrese una nota entre 1 y 10.");
      };
    };
    notas.push(nota);
  };
  notasEvaluaciones.push(notas);
};

for (let i = 0; i < cantidadAlumnos; i++) {
  let notas = notasEvaluaciones[i];
  let notaFinal = calcularNotaFinal(notas[0], notas[1], notas[2], notas[3]);
  notaFinalAlumnos.push(notaFinal);
};

for (let i = 0; i < cantidadAlumnos; i++) {
  let notaFinal = notaFinalAlumnos[i];
  alert("La nota final del alumno " + (i + 1) + " es: " + notaFinal);
};

