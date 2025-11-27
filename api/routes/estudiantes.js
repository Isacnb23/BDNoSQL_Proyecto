const express = require('express');
const route = express.Router();

const Estudiante = require('../models/estudiante');


//Crear un nuevo estudiante
route.post('/', async(req, resp) =>{
        const { nombre,
                apellido,
                email,
                telefono,
                fechaNacimiento } = req.body;


       const nuevoEstudiante = new Estudiante (
                { nombre,
                  apellido,
                  email,
                  telefono,
                  fechaNacimiento }
       );    
       
       try {
            const estudianteGuardado = await nuevoEstudiante.save();
            resp.status(201).json(estudianteGuardado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

//Update put
route.put('/:id', async(req, resp) =>{

       try {

               const estudianteActualizado = await Estudiante.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!estudianteActualizado){
                    return resp.status(404).json({mesaje: "Estudiante no encontrado"});
               }
            
               resp.status(200).json(estudianteActualizado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


//Delete 
route.delete('/:id', async(req, resp) =>{

       try {

               const estudianteEliminado = await Estudiante.findByIdAndDelete(
                         req.params.id,
                    );

               if (!estudianteEliminado){
                    return resp.status(404).json({mesaje: "Estudiante no encontrado"});
               }
            
               resp.status(200).json({mesaje : 'Estudiante eliminado'});
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);



//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const estudianteDatos = await Estudiante.find();
                         resp.json(estudianteDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

//Buscar por id
route.get('/:id', async(req, resp) =>{

       try {

               const estudianteEncontrado = await Estudiante.findById(
                         req.params.id
                    );

               if (!estudianteEncontrado){
                    return resp.status(404).json({mesaje: "Estudiante no encontrado"});
               }
            
               resp.status(200).json(estudianteEncontrado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

module.exports = route;
