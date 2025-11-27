const express = require('express');
const route = express.Router();

const Usuario = require('../models/usuario');


//Crear un nuevo usuario
route.post('/', async(req, resp) =>{
        const { nombre,
                email,
                password, 
                estado } = req.body;


       const nuevoUsuario = new Usuario (
                { nombre,
                  email,
                  password, 
                  estado }
       );    
       
       try {
            const usuarioGuardado = await nuevoUsuario.save();
            resp.status(201).json(usuarioGuardado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

//Update put
route.put('/:id', async(req, resp) =>{

       try {

               const usuarioActualizado = await Usuario.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!usuarioActualizado){
                    return resp.status(404).json({mesaje: "Usuario no encontrado"});
               }
            
               resp.status(200).json(usuarioActualizado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


//Delete 
route.delete('/:id', async(req, resp) =>{

       try {

               const usuarioEliminado = await Usuario.findByIdAndDelete(
                         req.params.id,
                    );

               if (!usuarioEliminado){
                    return resp.status(404).json({mesaje: "Usuario no encontrado"});
               }
            
               resp.status(200).json({mesaje : 'Usuario eliminado'});
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);



//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const usuarioDatos = await Usuario.find();
                         resp.json(usuarioDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

//Buscar por id
route.get('/:id', async(req, resp) =>{

       try {

               const usuarioEncontrado = await Usuario.findById(
                         req.params.id
                    );

               if (!usuarioEncontrado){
                    return resp.status(404).json({mesaje: "Usuario no encontrado"});
               }
            
               resp.status(200).json(usuarioEncontrado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

module.exports = route;
