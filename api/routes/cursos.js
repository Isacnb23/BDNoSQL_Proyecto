const express = require('express');
const route = express.Router();

const Curso = require('../models/curso');
const Idioma = require('../models/idioma');
const Nivel = require('../models/nivel');
const Profesor = require('../models/profesor');

//Crear un nuevo curso
route.post('/', async (req, resp) => {
     const { nombre,
          descripcion,
          idiomaId,
          nivelId,
          profesorId } = req.body;


     const nuevoCurso = new Curso(
          {
               nombre,
               descripcion,
               idiomaId,
               nivelId,
               profesorId
          }
     );

     try {
          const cursoGuardado = await nuevoCurso.save();
          resp.status(201).json(cursoGuardado);
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);

//Update put
route.put('/:id', async (req, resp) => {

     try {

          const cursoActualizado = await Curso.findByIdAndUpdate(
               req.params.id,
               req.body,
               { new: true }

          );

          if (!cursoActualizado) {
               return resp.status(404).json({ mesaje: "Curso no encontrado" });
          }

          resp.status(200).json(cursoActualizado);
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);


//Delete 
route.delete('/:id', async (req, resp) => {

     try {

          const cursoEliminado = await Curso.findByIdAndDelete(
               req.params.id,
          );

          if (!cursoEliminado) {
               return resp.status(404).json({ mesaje: "Curso no encontrado" });
          }

          resp.status(200).json({ mesaje: 'Curso eliminado' });
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);



//Obtener datos
route.get('/', async (req, resp) => {
     try {
          const cursos = await Curso.find();

          const cursosCompletos = [];

          for (let c of cursos) {
               const idioma = await Idioma.findById(c.idiomaId);
               const nivel = await Nivel.findById(c.nivelId);
               const profesor = await Profesor.findById(c.profesorId);

               cursosCompletos.push({
                    _id: c._id,
                    nombre: c.nombre,
                    descripcion: c.descripcion,
                    fechaCreacion: c.fechaCreacion,
                    idioma: idioma?.nombre || "Idioma no encontrado",
                    nivel: nivel?.nombre || "Nivel no encontrado",
                    profesor: profesor ? `${profesor.nombre} ${profesor.apellido}` : "Profesor no encontrado"
               });
          }

          resp.json(cursosCompletos);

     } catch (error) {
          resp.status(500).json({ mensaje: error.message });
     }
}
);

//Buscar por id
route.get('/:id', async (req, resp) => {

     try {

          const cursoEncontrado = await Curso.findById(
               req.params.id
          );

          if (!cursoEncontrado) {
               return resp.status(404).json({ mesaje: "Curso no encontrado" });
          }

          resp.status(200).json(cursoEncontrado);
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);

module.exports = route;
