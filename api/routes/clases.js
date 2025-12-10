const express = require('express');
const route = express.Router();

const Clase = require('../models/clase');


//Crear una nueva clase
route.post('/', async(req, resp) =>{
        const { cursoId,
                fecha,
                tema,
                descripcion, 
                profesorId } = req.body;


       const nuevaClase = new Clase (
                { cursoId,
                  fecha,
                  tema,
                  descripcion, 
                  profesorId }
       );    
       
       try {
            const claseGuardada = await nuevaClase.save();
            resp.status(201).json(claseGuardada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

//Update put
route.put('/:id', async(req, resp) =>{

       try {

               const claseActualizada = await Clase.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!claseActualizada){
                    return resp.status(404).json({mesaje: "Clase no encontrada"});
               }
            
               resp.status(200).json(claseActualizada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


//Delete 
route.delete('/:id', async(req, resp) =>{

       try {

               const claseEliminada = await Clase.findByIdAndDelete(
                         req.params.id,
                    );

               if (!claseEliminada){
                    return resp.status(404).json({mesaje: "Clase no encontrada"});
               }
            
               resp.status(200).json({mesaje : 'Clase eliminada'});
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);



//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const claseDatos = await Clase.find();
                         resp.json(claseDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

route.get('/curso/:cursoId', async (req, res) => {
  try {
    const clases = await Clase.find({ cursoId: req.params.cursoId })
                              .sort({ fecha: -1 });
    res.json(clases);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});


//Buscar por id
route.get('/:id', async(req, resp) =>{

       try {

               const claseEncontrada = await Clase.findById(
                         req.params.id
                    );

               if (!claseEncontrada){
                    return resp.status(404).json({mesaje: "Clase no encontrada"});
               }
            
               resp.status(200).json(claseEncontrada);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

module.exports = route;
