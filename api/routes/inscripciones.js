const express = require('express');
const route = express.Router();

const Inscripcion = require('../models/inscripcion');
const Curso = require('../models/curso');
const Estudiante = require('../models/estudiante');

//Crear una nueva inscripcion
route.post('/', async (req, resp) => {
     const { estudianteId,
          cursoId,
          fechaInscripcion,
          estado } = req.body;


     const nuevaInscripcion = new Inscripcion(
          {
               estudianteId,
               cursoId,
               fechaInscripcion,
               estado
          }
     );

     try {
          const inscripcionGuardada = await nuevaInscripcion.save();
          resp.status(201).json(inscripcionGuardada);
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);

//Update put
route.put('/:id', async (req, resp) => {

     try {

          const inscripcionActualizada = await Inscripcion.findByIdAndUpdate(
               req.params.id,
               req.body,
               { new: true }

          );

          if (!inscripcionActualizada) {
               return resp.status(404).json({ mesaje: "Inscripcion no encontrada" });
          }

          resp.status(200).json(inscripcionActualizada);
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);


//Delete 
route.delete('/:id', async (req, resp) => {

     try {

          const inscripcionEliminada = await Inscripcion.findByIdAndDelete(
               req.params.id,
          );

          if (!inscripcionEliminada) {
               return resp.status(404).json({ mesaje: "Inscripcion no encontrada" });
          }

          resp.status(200).json({ mesaje: 'Inscripcion eliminada' });
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);



// Obtener datos
route.get('/', async (req, resp) => {
     try {
          const inscripcionDatos = await Inscripcion.find();

          const inscripcionesCompletas = [];

          for (let c of inscripcionDatos) {
               const estudiante = await Estudiante.findById(c.estudianteId);
               const curso = await Curso.findById(c.cursoId);

               inscripcionesCompletas.push({
                    _id: c._id,
                    estudiante: estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : "Estudiante no encontrado",
                    curso: curso ? curso.nombre : "Curso no encontrado",
                    fechaInscripcion: c.fechaInscripcion || null,
                    estado: c.estado,
                    fechaCreacion: c.fechaCreacion || null
               });
          }

          resp.json(inscripcionesCompletas);

     } catch (error) {
          resp.status(500).json({ mensaje: error.message });
     }
});

route.get('/curso/:cursoId', async (req, resp) => {
  try {
    const inscripciones = await Inscripcion.find({ 
      cursoId: req.params.cursoId,
      estado: 'activa'
    });

    const estudiantes = [];

    for (let i of inscripciones) {
      const estudiante = await Estudiante.findById(i.estudianteId);
      if (estudiante) {
        estudiantes.push(estudiante);
      }
    }

    resp.json(estudiantes);
  } catch (error) {
    resp.status(500).json({ mensaje: error.message });
  }
});


//Buscar por id
route.get('/:id', async (req, resp) => {

     try {

          const inscripcionEncontrada = await Inscripcion.findById(
               req.params.id
          );

          if (!inscripcionEncontrada) {
               return resp.status(404).json({ mesaje: "Inscripcion no encontrada" });
          }

          resp.status(200).json(inscripcionEncontrada);
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);

module.exports = route;