const express = require('express');
const route = express.Router();

const Sede = require('../models/sede');


//Crear una nueva sede
route.post('/', async(req, resp) =>{
        const { nombre,
                direccion,
                telefono, 
                ciudad } = req.body;


       const nuevaSede = new Sede (
                { nombre,
                  direccion,
                  telefono, 
                  ciudad }
       );    
       
       try {
            const sedeGuardada = await nuevaSede.save();
            resp.status(201).json(sedeGuardada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

//Update put
route.put('/:id', async(req, resp) =>{

       try {

               const sedeActualizada = await Sede.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!sedeActualizada){
                    return resp.status(404).json({mesaje: "Sede no encontrada"});
               }
            
               resp.status(200).json(sedeActualizada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


//Delete 
route.delete('/:id', async(req, resp) =>{

       try {

               const sedeEliminada = await Sede.findByIdAndDelete(
                         req.params.id,
                    );

               if (!sedeEliminada){
                    return resp.status(404).json({mesaje: "Sede no encontrada"});
               }
            
               resp.status(200).json({mesaje : 'Sede eliminada'});
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);



//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const sedeDatos = await Sede.find();
                         resp.json(sedeDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

//Buscar por id
route.get('/:id', async(req, resp) =>{

       try {

               const sedeEncontrada = await Sede.findById(
                         req.params.id
                    );

               if (!sedeEncontrada){
                    return resp.status(404).json({mesaje: "Sede no encontrada"});
               }
            
               resp.status(200).json(sedeEncontrada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

module.exports = route;