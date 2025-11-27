const express = require('express');
const route = express.Router();

const Pago = require('../models/pago');


//Crear un nuevo pago
route.post('/', async(req, resp) =>{
        const { estudianteId,
                monto,
                fechaPago,
                metodoPago, 
                estado } = req.body;


       const nuevoPago = new Pago (
                { estudianteId,
                  monto,
                  fechaPago,
                  metodoPago, 
                  estado }
       );    
       
       try {
            const pagoGuardado = await nuevoPago.save();
            resp.status(201).json(pagoGuardado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

//Update put
route.put('/:id', async(req, resp) =>{

       try {

               const pagoActualizado = await Pago.findByIdAndUpdate(
                         req.params.id,
                         req.body,
                         {new: true}

                    );

               if (!pagoActualizado){
                    return resp.status(404).json({mesaje: "Pago no encontrado"});
               }
            
               resp.status(200).json(pagoActualizado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);


//Delete 
route.delete('/:id', async(req, resp) =>{

       try {

               const pagoEliminado = await Pago.findByIdAndDelete(
                         req.params.id,
                    );

               if (!pagoEliminado){
                    return resp.status(404).json({mesaje: "Pago no encontrado"});
               }
            
               resp.status(200).json({mesaje : 'Pago eliminado'});
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);



//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const pagoDatos = await Pago.find();
                         resp.json(pagoDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

//Buscar por id
route.get('/:id', async(req, resp) =>{

       try {

               const pagoEncontrado = await Pago.findById(
                         req.params.id
                    );

               if (!pagoEncontrado){
                    return resp.status(404).json({mesaje: "Pago no encontrado"});
               }
            
               resp.status(200).json(pagoEncontrado);
       }catch(error){
            resp.status(400).json({mesaje: error.message});
       }

    }
);

module.exports = route;