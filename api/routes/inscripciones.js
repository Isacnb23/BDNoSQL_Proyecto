const express = require('express');
const route = express.Router();

const Inscripcion = require('../models/inscripcion');


//Crear una nueva inscripcion
route.post('/', async(req, resp) =>{
        const { estudianteId,
                cursoId,
                fechaInscripcion,
                estado } = req.body;


       const nuevaInscripcion = new Inscripcion (
                { estudianteId,
                  cursoId,
                  fechaInscripcion,
                  estado }
       );    
       
       try {
            const inscripcionGuardada = await nuevaInscripcion.save();
            resp.status(201).json(inscripcionGuardada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

//Update put
route.put('/:id', async(req, resp) =>{

       try {

               const inscripcionActualizada = await Inscripcion.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!inscripcionActualizada){
                    return resp.status(404).json({mesaje: "Inscripcion no encontrada"});
               }
            
               resp.status(200).json(inscripcionActualizada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


//Delete 
route.delete('/:id', async(req, resp) =>{

       try {

               const inscripcionEliminada = await Inscripcion.findByIdAndDelete(
                         req.params.id,
                    );

               if (!inscripcionEliminada){
                    return resp.status(404).json({mesaje: "Inscripcion no encontrada"});
               }
            
               resp.status(200).json({mesaje : 'Inscripcion eliminada'});
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);



//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const inscripcionDatos = await Inscripcion.find();
                         resp.json(inscripcionDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

//Buscar por id
route.get('/:id', async(req, resp) =>{

       try {

               const inscripcionEncontrada = await Inscripcion.findById(
                         req.params.id
                    );

               if (!inscripcionEncontrada){
                    return resp.status(404).json({mesaje: "Inscripcion no encontrada"});
               }
            
               resp.status(200).json(inscripcionEncontrada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

module.exports = route;