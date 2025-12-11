const express = require('express');
const route = express.Router();

const Certificado = require('../models/certificado');
const Estudiante = require('../models/estudiante');
const Curso = require('../models/curso');

// Crear un nuevo certificado
route.post('/', async (req, resp) => {
    const { estudianteId,
        cursoId,
        fechaEmision,
        codigo,
        notaFinal } = req.body;

    const nuevoCertificado = new Certificado(
        {
            estudianteId,
            cursoId,
            fechaEmision,
            codigo,
            notaFinal
        }
    );

    try {
        const certificadoGuardado = await nuevoCertificado.save();
        resp.status(201).json(certificadoGuardado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});

// Update put
route.put('/:id', async (req, resp) => {
    try {
        const certificadoActualizado = await Certificado.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!certificadoActualizado) {
            return resp.status(404).json({ mesaje: "Certificado no encontrado" });
        }

        resp.status(200).json(certificadoActualizado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});

// Delete 
route.delete('/:id', async (req, resp) => {
    try {
        const certificadoEliminado = await Certificado.findByIdAndDelete(
            req.params.id,
        );

        if (!certificadoEliminado) {
            return resp.status(404).json({ mesaje: "Certificado no encontrado" });
        }

        resp.status(200).json({ mesaje: 'Certificado eliminado' });
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});

// Obtener datos con información completa del estudiante y curso
route.get('/', async (req, resp) => {
    try {
        const certificados = await Certificado.find();
        const certificadosCompletos = [];

        for (let c of certificados) {
            const estudiante = await Estudiante.findById(c.estudianteId);
            const curso = await Curso.findById(c.cursoId);

            certificadosCompletos.push({
                _id: c._id,
                fechaEmision: c.fechaEmision,
                codigo: c.codigo,
                notaFinal: c.notaFinal,
                fechaCreacion: c.fechaCreacion,
                estudiante: estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : "Estudiante no encontrado",
                curso: curso ? curso.nombre : "Curso no encontrado"
            });
        }

        resp.json(certificadosCompletos);
    } catch (error) {
        resp.status(500).json({ mesaje: error.message });
    }
});

// Buscar por id
route.get('/:id', async (req, resp) => {
    try {
        const certificadoEncontrado = await Certificado.findById(
            req.params.id
        );

        if (!certificadoEncontrado) {
            return resp.status(404).json({ mesaje: "Certificado no encontrado" });
        }

        resp.status(200).json(certificadoEncontrado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});

module.exports = route;