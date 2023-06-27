const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

app.post('/guardar-alumno', (req, res) => {
  const alumno = req.body;

  fs.readFile('alumnos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al leer el archivo de alumnos' });
    }

    const alumnos = JSON.parse(data);
    alumnos.push(alumno);

    fs.writeFile('alumnos.json', JSON.stringify(alumnos), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al guardar el alumno' });
      }

      return res.status(200).json({ message: 'Alumno guardado correctamente' });
    });
  });
});

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
