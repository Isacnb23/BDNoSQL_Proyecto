const express = require('express');
const route = express.Router();

const Usuario = require('../models/usuario');
const Role = require('../models/rol'); 

//Crear
route.post('/', async(req, resp) =>{
        const { nombre,
                email,
                password, 
                nota_rol,            
                estado } = req.body;

       
       try {
            const rolExiste = await Role.findById(nota_rol);
            if (!rolExiste) {
                 return resp.status(400).json({mesaje: 'El rol especificado no existe'});
            }
       } catch(error) {
            return resp.status(400).json({mesaje: 'Rol inválido'});
       }

       const nuevoUsuario = new Usuario (
                { nombre,
                  email,
                  password, 
                  nota_rol,
                  estado }
       );    
       
       try {
            const usuarioGuardado = await nuevoUsuario.save();
           
            const usuarioConRol = await Usuario.findById(usuarioGuardado._id).populate('nota_rol');
            resp.status(201).json(usuarioConRol);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

//Update put
route.put('/:id', async(req, resp) =>{

       try {
               
               if (req.body.nota_rol) {
                    const rolExiste = await Role.findById(req.body.nota_rol);
                    if (!rolExiste) {
                         return resp.status(400).json({mesaje: 'El rol especificado no existe'});
                    }
               }

               const usuarioActualizado = await Usuario.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}
                    ).populate('nota_rol');

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
                         
                         const usuarioDatos = await Usuario.find().populate('nota_rol');
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
                    ).populate('nota_rol');

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