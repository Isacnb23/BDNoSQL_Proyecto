const express = require('express');
const route = express.Router();

const Role = require('../models/rol');


//Crear un nuevo rol
route.post('/', async(req, resp) =>{
        const { nombre,
                permisos } = req.body;


       const nuevoRole = new Role (
                { nombre,
                  permisos }
       );    
       
       try {
            const roleGuardado = await nuevoRole.save();
            resp.status(201).json(roleGuardado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

//Update put
route.put('/:id', async(req, resp) =>{

       try {

               const roleActualizado = await Role.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!roleActualizado){
                    return resp.status(404).json({mesaje: "Rol no encontrado"});
               }
            
               resp.status(200).json(roleActualizado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


//Delete 
route.delete('/:id', async(req, resp) =>{

       try {

               const roleEliminado = await Role.findByIdAndDelete(
                         req.params.id,
                    );

               if (!roleEliminado){
                    return resp.status(404).json({mesaje: "Rol no encontrado"});
               }
            
               resp.status(200).json({mesaje : 'Rol eliminado'});
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);



//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const roleDatos = await Role.find();
                         resp.json(roleDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

//Buscar por id
route.get('/:id', async(req, resp) =>{

       try {

               const roleEncontrado = await Role.findById(
                         req.params.id
                    );

               if (!roleEncontrado){
                    return resp.status(404).json({mesaje: "Rol no encontrado"});
               }
            
               resp.status(200).json(roleEncontrado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

module.exports = route;