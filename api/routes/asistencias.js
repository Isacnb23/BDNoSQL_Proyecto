const express = require('express');
const route = express.Router();

const Asistencia = require('../models/asistencia');
const Estudiante = require('../models/estudiante');
const Clase = require('../models/clase');
const Curso = require('../models/curso');

//Crear una nueva asistencia
route.post('/', async (req, resp) => {
     const { estudianteId,
          claseId,
          fecha,
          estado } = req.body;


     const nuevaAsistencia = new Asistencia(
          {
               estudianteId,
               claseId,
               fecha,
               estado
          }
     );

     try {
          const asistenciaGuardada = await nuevaAsistencia.save();
          resp.status(201).json(asistenciaGuardada);
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);

route.post('/masivo', async (req, resp) => {
     const { claseId, asistencias } = req.body;

     try {
          const clase = await Clase.findById(claseId);

          const documentos = asistencias.map(a => ({
               estudianteId: a.estudianteId,
               claseId,
               fecha: clase.fecha,
               estado: a.estado || 'presente'
          }));
          await Asistencia.insertMany(documentos);

          resp.status(201).json({
               mensaje: 'Asistencias registradas correctamente'
          });

     } catch (error) {
          resp.status(500).json({
               mensaje: 'Error al registrar asistencias',
               error: error.message
          });
     }
});


//Update put
route.put('/:id', async (req, resp) => {

     try {

          const asistenciaActualizada = await Asistencia.findByIdAndUpdate(
               req.params.id,
               req.body,
               { new: true }

          );

          if (!asistenciaActualizada) {
               return resp.status(404).json({ mesaje: "Asistencia no encontrada" });
          }

          resp.status(200).json(asistenciaActualizada);
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);


//Delete 
route.delete('/:id', async (req, resp) => {

     try {

          const asistenciaEliminada = await Asistencia.findByIdAndDelete(
               req.params.id,
          );

          if (!asistenciaEliminada) {
               return resp.status(404).json({ mesaje: "Asistencia no encontrada" });
          }

          resp.status(200).json({ mesaje: 'Asistencia eliminada' });
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);



//Obtener datos
route.get('/', async (req, resp) => {
     try {
          const asistencias = await Asistencia.find();

          const asistenciasCompletas = [];

          for (let a of asistencias) {
               const estudiante = await Estudiante.findById(a.estudianteId);
               const clase = await Clase.findById(a.claseId);

               asistenciasCompletas.push({
                    _id: a._id,
                    estudiante: estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : "Estudiante no encontrado",
                    clase: clase ? clase.tema : "Clase no encontrada",
                    fecha: a.fecha,
                    estado: a.estado,
                    fechaCreacion: a.fechaCreacion
               });
          }

          resp.json(asistenciasCompletas);

     } catch (error) {
          resp.status(500).json({ mensaje: error.message });
     }
});

route.get('/clase/:claseId', async (req, res) => {
     try {
          const asistencias = await Asistencia.find({ claseId: req.params.claseId });

          const asistenciasCompletas = [];

          for (let a of asistencias) {
               const estudiante = await Estudiante.findById(a.estudianteId);
               const clase = await Clase.findById(a.claseId);

               asistenciasCompletas.push({
                    _id: a._id,
                    estudiante: estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : "Estudiante no encontrado",
                    clase: clase ? clase.tema : "Clase no encontrada",
                    fecha: a.fecha,
                    estado: a.estado,
                    fechaCreacion: a.fechaCreacion
               });
          }

          res.json(asistenciasCompletas);

     } catch (error) {
          res.status(500).json({ mensaje: error.message });
     }
});

route.get("/curso/:cursoId", async (req, res) => {
    try {
        const cursoId = req.params.cursoId;
        const clases = await Clase.find({ cursoId: cursoId });
        const claseIds = clases.map(c => c._id);

        const asistencias = await Asistencia.find({ claseId: { $in: claseIds } });

        const asistenciasCompletas = [];

        for (let a of asistencias) {
            const estudiante = await Estudiante.findById(a.estudianteId);
            const clase = await Clase.findById(a.claseId);

            asistenciasCompletas.push({
                _id: a._id,
                estudiante: estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : "Estudiante no encontrado",
                clase: clase ? clase.tema : "Clase no encontrada",
                fecha: a.fecha,
                estado: a.estado,
                fechaCreacion: a.fechaCreacion
            });
        }

        res.json(asistenciasCompletas);

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});



//Buscar por id
route.get('/:id', async (req, resp) => {

     try {

          const asistenciaEncontrada = await Asistencia.findById(
               req.params.id
          );

          if (!asistenciaEncontrada) {
               return resp.status(404).json({ mesaje: "Asistencia no encontrada" });
          }

          resp.status(200).json(asistenciaEncontrada);
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);

module.exports = route;