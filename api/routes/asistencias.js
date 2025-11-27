const express = require('express');
const route = express.Router();

const Asistencia = require('../models/asistencia');


//Crear una nueva asistencia
route.post('/', async(req, resp) =>{
        const { estudianteId,
                claseId,
                fecha,
                estado } = req.body;


       const nuevaAsistencia = new Asistencia (
                { estudianteId,
                  claseId,
                  fecha,
                  estado }
       );    
       
       try {
            const asistenciaGuardada = await nuevaAsistencia.save();
            resp.status(201).json(asistenciaGuardada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

//Update put
route.put('/:id', async(req, resp) =>{

       try {

               const asistenciaActualizada = await Asistencia.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!asistenciaActualizada){
                    return resp.status(404).json({mesaje: "Asistencia no encontrada"});
               }
            
               resp.status(200).json(asistenciaActualizada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


//Delete 
route.delete('/:id', async(req, resp) =>{

       try {

               const asistenciaEliminada = await Asistencia.findByIdAndDelete(
                         req.params.id,
                    );

               if (!asistenciaEliminada){
                    return resp.status(404).json({mesaje: "Asistencia no encontrada"});
               }
            
               resp.status(200).json({mesaje : 'Asistencia eliminada'});
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);



//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const asistenciaDatos = await Asistencia.find();
                         resp.json(asistenciaDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

//Buscar por id
route.get('/:id', async(req, resp) =>{

       try {

               const asistenciaEncontrada = await Asistencia.findById(
                         req.params.id
                    );

               if (!asistenciaEncontrada){
                    return resp.status(404).json({mesaje: "Asistencia no encontrada"});
               }
            
               resp.status(200).json(asistenciaEncontrada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

module.exports = route;