const express = require('express');
const route = express.Router();

const Material = require('../models/material');
const Curso = require('../models/curso');

// Crear un nuevo material
route.post('/', async (req, resp) => {
    const { nombre,
        descripcion,
        tipo,
        url,
        cursoId } = req.body;

    const nuevoMaterial = new Material(
        {
            nombre,
            descripcion,
            tipo,
            url,
            cursoId
        }
    );

    try {
        const materialGuardado = await nuevoMaterial.save();
        resp.status(201).json(materialGuardado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});

// Update put
route.put('/:id', async (req, resp) => {
    try {
        const materialActualizado = await Material.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!materialActualizado) {
            return resp.status(404).json({ mesaje: "Material no encontrado" });
        }

        resp.status(200).json(materialActualizado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});

// Delete 
route.delete('/:id', async (req, resp) => {
    try {
        const materialEliminado = await Material.findByIdAndDelete(
            req.params.id,
        );

        if (!materialEliminado) {
            return resp.status(404).json({ mesaje: "Material no encontrado" });
        }

        resp.status(200).json({ mesaje: 'Material eliminado' });
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});

// Obtener datos con información completa del curso
route.get('/', async (req, resp) => {
    try {
        const materiales = await Material.find();
        const materialesCompletos = [];

        for (let m of materiales) {
            const curso = await Curso.findById(m.cursoId);

            materialesCompletos.push({
                _id: m._id,
                nombre: m.nombre,
                descripcion: m.descripcion,
                tipo: m.tipo,
                url: m.url,
                fechaCreacion: m.fechaCreacion,
                curso: curso ? curso.nombre : "Curso no encontrado"
            });
        }

        resp.json(materialesCompletos);
    } catch (error) {
        resp.status(500).json({ mesaje: error.message });
    }
});

// Buscar por id
route.get('/:id', async (req, resp) => {
    try {
        const materialEncontrado = await Material.findById(
            req.params.id
        );

        if (!materialEncontrado) {
            return resp.status(404).json({ mesaje: "Material no encontrado" });
        }

        resp.status(200).json(materialEncontrado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});

module.exports = route;