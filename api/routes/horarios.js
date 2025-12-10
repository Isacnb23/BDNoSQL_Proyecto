const express = require('express');
const route = express.Router();

const Horario = require('../models/horario');
const Curso = require('../models/curso');
const Aula = require('../models/aula');

//Crear un nuevo horario
route.post('/', async (req, resp) => {
     const { cursoId,
          diaSemana,
          horaInicio,
          horaFin,
          aula } = req.body;


     const nuevoHorario = new Horario(
          {
               cursoId,
               diaSemana,
               horaInicio,
               horaFin,
               aula
          }
     );

     try {
          const horarioGuardado = await nuevoHorario.save();
          resp.status(201).json(horarioGuardado);
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);

//Update put
route.put('/:id', async (req, resp) => {

     try {

          const horarioActualizado = await Horario.findByIdAndUpdate(
               req.params.id,
               req.body,
               { new: true }

          );

          if (!horarioActualizado) {
               return resp.status(404).json({ mesaje: "Horario no encontrado" });
          }

          resp.status(200).json(horarioActualizado);
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);


//Delete 
route.delete('/:id', async (req, resp) => {

     try {

          const horarioEliminado = await Horario.findByIdAndDelete(
               req.params.id,
          );

          if (!horarioEliminado) {
               return resp.status(404).json({ mesaje: "Horario no encontrado" });
          }

          resp.status(200).json({ mesaje: 'Horario eliminado' });
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);



//Obtener datos
route.get('/', async (req, resp) => {
     try {
          const horarios = await Horario.find();

          const horariosCompletos = [];

          for (let h of horarios) {
               const curso = await Curso.findById(h.cursoId);
               const aula = await Aula.findById(h.aula);

               horariosCompletos.push({
                    _id: h._id,
                    curso: curso ? curso.nombre : "Curso no encontrado",
                    diaSemana: h.diaSemana,
                    horaInicio: h.horaInicio,
                    horaFin: h.horaFin,
                    fechaCreacion: h.fechaCreacion,
                    aula: aula ? aula.nombre || aula.codigo : "Aula no encontrada"
               });
          }

          resp.json(horariosCompletos);

     } catch (error) {
          resp.status(500).json({ mensaje: error.message });
     }
});


route.get('/curso/:cursoId', async (req, resp) => {
    try {
        const { cursoId } = req.params;

        const horarios = await Horario.find({ cursoId });

        const horariosCompletos = [];

        for (let h of horarios) {
            const curso = await Curso.findById(h.cursoId);
            const aula = await Aula.findById(h.aula);

            horariosCompletos.push({
                _id: h._id,
                cursoId: h.cursoId,
                curso: curso ? curso.nombre : "Curso no encontrado",
                diaSemana: h.diaSemana,
                horaInicio: h.horaInicio,
                horaFin: h.horaFin,
                aula: aula ? (aula.nombre || aula.codigo) : "Aula no encontrada",
                fechaCreacion: h.fechaCreacion
            });
        }

        resp.json(horariosCompletos);

    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});


//Buscar por id
route.get('/:id', async (req, resp) => {

     try {

          const horarioEncontrado = await Horario.findById(
               req.params.id
          );

          if (!horarioEncontrado) {
               return resp.status(404).json({ mesaje: "Horario no encontrado" });
          }

          resp.status(200).json(horarioEncontrado);
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);

module.exports = route;