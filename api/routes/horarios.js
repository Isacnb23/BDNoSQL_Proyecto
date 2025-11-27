const express = require('express');
const route = express.Router();

const Horario = require('../models/horario');


//Crear un nuevo horario
route.post('/', async(req, resp) =>{
        const { cursoId,
                diaSemana,
                horaInicio,
                horaFin, 
                aula } = req.body;


       const nuevoHorario = new Horario (
                { cursoId,
                  diaSemana,
                  horaInicio,
                  horaFin, 
                  aula }
       );    
       
       try {
            const horarioGuardado = await nuevoHorario.save();
            resp.status(201).json(horarioGuardado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

//Update put
route.put('/:id', async(req, resp) =>{

       try {

               const horarioActualizado = await Horario.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!horarioActualizado){
                    return resp.status(404).json({mesaje: "Horario no encontrado"});
               }
            
               resp.status(200).json(horarioActualizado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


//Delete 
route.delete('/:id', async(req, resp) =>{

       try {

               const horarioEliminado = await Horario.findByIdAndDelete(
                         req.params.id,
                    );

               if (!horarioEliminado){
                    return resp.status(404).json({mesaje: "Horario no encontrado"});
               }
            
               resp.status(200).json({mesaje : 'Horario eliminado'});
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);



//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const horarioDatos = await Horario.find();
                         resp.json(horarioDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

//Buscar por id
route.get('/:id', async(req, resp) =>{

       try {

               const horarioEncontrado = await Horario.findById(
                         req.params.id
                    );

               if (!horarioEncontrado){
                    return resp.status(404).json({mesaje: "Horario no encontrado"});
               }
            
               resp.status(200).json(horarioEncontrado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

module.exports = route;