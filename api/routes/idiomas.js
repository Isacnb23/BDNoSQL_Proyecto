const express = require('express');
const route = express.Router();

const Idioma = require('../models/idioma');


//Crear un nuevo idioma
route.post('/', async(req, resp) =>{
        const { nombre,
                codigo,
                pais } = req.body;


       const nuevoIdioma = new Idioma (
                { nombre,
                  codigo,
                  pais }
       );    
       
       try {
            const idiomaGuardado = await nuevoIdioma.save();
            resp.status(201).json(idiomaGuardado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

//Update put
route.put('/:id', async(req, resp) =>{

       try {

               const idiomaActualizado = await Idioma.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!idiomaActualizado){
                    return resp.status(404).json({mesaje: "Idioma no encontrado"});
               }
            
               resp.status(200).json(idiomaActualizado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


//Delete 
route.delete('/:id', async(req, resp) =>{

       try {

               const idiomaEliminado = await Idioma.findByIdAndDelete(
                         req.params.id,
                    );

               if (!idiomaEliminado){
                    return resp.status(404).json({mesaje: "Idioma no encontrado"});
               }
            
               resp.status(200).json({mesaje : 'Idioma eliminado'});
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);



//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const idiomaDatos = await Idioma.find();
                         resp.json(idiomaDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

//Buscar por id
route.get('/:id', async(req, resp) =>{

       try {

               const idiomaEncontrado = await Idioma.findById(
                         req.params.id
                    );

               if (!idiomaEncontrado){
                    return resp.status(404).json({mesaje: "Idioma no encontrado"});
               }
            
               resp.status(200).json(idiomaEncontrado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

module.exports = route;