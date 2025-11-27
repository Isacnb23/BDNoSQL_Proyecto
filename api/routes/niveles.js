const express = require('express');
const route = express.Router();

const Nivel = require('../models/nivel');


//Crear un nuevo nivel
route.post('/', async(req, resp) =>{
        const { nombre,
                descripcion, 
                duracion } = req.body;


       const nuevoNivel = new Nivel (
                { nombre,
                  descripcion, 
                  duracion }
       );    
       
       try {
            const nivelGuardado = await nuevoNivel.save();
            resp.status(201).json(nivelGuardado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

//Update put
route.put('/:id', async(req, resp) =>{

       try {

               const nivelActualizado = await Nivel.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!nivelActualizado){
                    return resp.status(404).json({mesaje: "Nivel no encontrado"});
               }
            
               resp.status(200).json(nivelActualizado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


//Delete 
route.delete('/:id', async(req, resp) =>{

       try {

               const nivelEliminado = await Nivel.findByIdAndDelete(
                         req.params.id,
                    );

               if (!nivelEliminado){
                    return resp.status(404).json({mesaje: "Nivel no encontrado"});
               }
            
               resp.status(200).json({mesaje : 'Nivel eliminado'});
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);



//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const nivelDatos = await Nivel.find();
                         resp.json(nivelDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

//Buscar por id
route.get('/:id', async(req, resp) =>{

       try {

               const nivelEncontrado = await Nivel.findById(
                         req.params.id
                    );

               if (!nivelEncontrado){
                    return resp.status(404).json({mesaje: "Nivel no encontrado"});
               }
            
               resp.status(200).json(nivelEncontrado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

module.exports = route;
