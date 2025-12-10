const express = require('express');
const route = express.Router();

const Evaluacion = require('../models/evaluacion');
const Curso = require('../models/curso');

//Crear una nueva evaluacion
route.post('/', async(req, resp) =>{
        const { cursoId,
                nombre,
                tipo,
                fecha,
                puntajeMaximo } = req.body;


       const nuevaEvaluacion = new Evaluacion (
                { cursoId,
                  nombre,
                  tipo,
                  fecha,
                  puntajeMaximo }
       );    
       
       try {
            const evaluacionGuardada = await nuevaEvaluacion.save();
            resp.status(201).json(evaluacionGuardada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

//Update put
route.put('/:id', async(req, resp) =>{

       try {

               const evaluacionActualizada = await Evaluacion.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!evaluacionActualizada){
                    return resp.status(404).json({mesaje: "Evaluacion no encontrada"});
               }
            
               resp.status(200).json(evaluacionActualizada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


//Delete 
route.delete('/:id', async(req, resp) =>{

       try {

               const evaluacionEliminada = await Evaluacion.findByIdAndDelete(
                         req.params.id,
                    );

               if (!evaluacionEliminada){
                    return resp.status(404).json({mesaje: "Evaluacion no encontrada"});
               }
            
               resp.status(200).json({mesaje : 'Evaluacion eliminada'});
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


route.get('/', async (req, resp) => {
    try {
        const evaluaciones = await Evaluacion.find();
        const evaluacionesCompletas = [];
        for (let e of evaluaciones) {
            const curso = await Curso.findById(e.cursoId);

            evaluacionesCompletas.push({
                _id: e._id,
                curso: curso ? curso.nombre : "Curso no encontrado",
                nombre: e.nombre,
                tipo: e.tipo,
                fecha: e.fecha,
                puntajeMaximo: e.puntajeMaximo,
                fechaCreacion: e.fechaCreacion
            });
        }

        resp.json(evaluacionesCompletas);

    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});

route.get('/curso/:cursoId', async (req, resp) => {
    try {
        const { cursoId } = req.params;

        const evaluaciones = await Evaluacion.find({ cursoId });

        const evaluacionesCompletas = [];

        for (let e of evaluaciones) {
            const curso = await Curso.findById(e.cursoId);

            evaluacionesCompletas.push({
                _id: e._id,
                cursoId: e.cursoId,
                curso: curso ? curso.nombre : "Curso no encontrado",
                nombre: e.nombre,
                tipo: e.tipo,
                fecha: e.fecha,
                puntajeMaximo: e.puntajeMaximo,
                fechaCreacion: e.fechaCreacion
            });
        }

        resp.json(evaluacionesCompletas);

    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});


//Buscar por id
route.get('/:id', async(req, resp) =>{

       try {

               const evaluacionEncontrada = await Evaluacion.findById(
                         req.params.id
                    );

               if (!evaluacionEncontrada){
                    return resp.status(404).json({mesaje: "Evaluacion no encontrada"});
               }
            
               resp.status(200).json(evaluacionEncontrada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

module.exports = route;
