const express = require('express');
const route = express.Router();

const Certificado = require('../models/certificado');


//Crear un nuevo certificado
route.post('/', async(req, resp) =>{
        const { estudianteId,
                cursoId,
                fechaEmision,
                codigo,
                notaFinal } = req.body;


       const nuevoCertificado = new Certificado (
                { estudianteId,
                  cursoId,
                  fechaEmision,
                  codigo,
                  notaFinal }
       );    
       
       try {
            const certificadoGuardado = await nuevoCertificado.save();
            resp.status(201).json(certificadoGuardado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

//Update put
route.put('/:id', async(req, resp) =>{

       try {

               const certificadoActualizado = await Certificado.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!certificadoActualizado){
                    return resp.status(404).json({mesaje: "Certificado no encontrado"});
               }
            
               resp.status(200).json(certificadoActualizado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


//Delete 
route.delete('/:id', async(req, resp) =>{

       try {

               const certificadoEliminado = await Certificado.findByIdAndDelete(
                         req.params.id,
                    );

               if (!certificadoEliminado){
                    return resp.status(404).json({mesaje: "Certificado no encontrado"});
               }
            
               resp.status(200).json({mesaje : 'Certificado eliminado'});
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);



//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const certificadoDatos = await Certificado.find();
                         resp.json(certificadoDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

//Buscar por id
route.get('/:id', async(req, resp) =>{

       try {

               const certificadoEncontrado = await Certificado.findById(
                         req.params.id
                    );

               if (!certificadoEncontrado){
                    return resp.status(404).json({mesaje: "Certificado no encontrado"});
               }
            
               resp.status(200).json(certificadoEncontrado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

module.exports = route;