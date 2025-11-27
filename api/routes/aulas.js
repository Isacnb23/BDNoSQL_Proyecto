const express = require('express');
const route = express.Router();

const Aula = require('../models/aula');


//Crear un nuevo aula
route.post('/', async(req, resp) =>{
        const { nombre,
                capacidad,
                sedeId,
                equipamiento } = req.body;


       const nuevaAula = new Aula (
                { nombre,
                  capacidad,
                  sedeId,
                  equipamiento }
       );    
       
       try {
            const aulaGuardada = await nuevaAula.save();
            resp.status(201).json(aulaGuardada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

//Update put
route.put('/:id', async(req, resp) =>{

       try {

               const aulaActualizada = await Aula.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!aulaActualizada){
                    return resp.status(404).json({mesaje: "Aula no encontrada"});
               }
            
               resp.status(200).json(aulaActualizada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


//Delete 
route.delete('/:id', async(req, resp) =>{

       try {

               const aulaEliminada = await Aula.findByIdAndDelete(
                         req.params.id,
                    );

               if (!aulaEliminada){
                    return resp.status(404).json({mesaje: "Aula no encontrada"});
               }
            
               resp.status(200).json({mesaje : 'Aula eliminada'});
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);



//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const aulaDatos = await Aula.find();
                         resp.json(aulaDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

//Buscar por id
route.get('/:id', async(req, resp) =>{

       try {

               const aulaEncontrada = await Aula.findById(
                         req.params.id
                    );

               if (!aulaEncontrada){
                    return resp.status(404).json({mesaje: "Aula no encontrada"});
               }
            
               resp.status(200).json(aulaEncontrada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

module.exports = route;