const express = require('express');
const route = express.Router();

const Aula = require('../models/aula');
const Sede = require('../models/sede');



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
route.get('/', async (req, resp) => {
    try {
        const aulas = await Aula.find();

        const aulasCompletas = [];

        for (let a of aulas) {
            const sede = await Sede.findById(a.sedeId);

            aulasCompletas.push({
                _id: a._id,
                nombre: a.nombre,
                capacidad: a.capacidad,
                sedeId: a.sedeId,
                fechaCreacion: a.fechaCreacion,
                equipamiento: a.equipamiento,

                // NUEVO → nombre real
                sedeNombre: sede ? sede.nombre : "Sede no encontrada"
            });
        }

        resp.json(aulasCompletas);

    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});



//Buscar por id
route.get('/:id', async (req, resp) => {
    try {
        const a = await Aula.findById(req.params.id);

        if (!a) {
            return resp.status(404).json({ mensaje: "Aula no encontrada" });
        }

        const sede = await Sede.findById(a.sedeId);

        resp.json({
            _id: a._id,
            nombre: a.nombre,
            capacidad: a.capacidad,
            sedeId: a.sedeId,
            equipamiento: a.equipamiento,
            fechaCreacion: a.fechaCreacion,

            sedeNombre: sede ? sede.nombre : "Sede no encontrada"
        });

    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});


module.exports = route;