const express = require('express');
const route = express.Router();

const Profesor = require('../models/profesor');

// Crear un nuevo profesor
route.post('/', async (req, resp) => {
    const { nombre, apellido, email, telefono, especialidad } = req.body;

    const nuevoProfesor = new Profesor({
        nombre,
        apellido,
        email,
        telefono,
        especialidad
    });

    try {
        const profesorGuardado = await nuevoProfesor.save();
        resp.status(201).json(profesorGuardado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Update PUT
route.put('/:id', async (req, resp) => {
    try {
        const profesorActualizado = await Profesor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!profesorActualizado) {
            return resp.status(404).json({ mensaje: "Profesor no encontrado" });
        }

        resp.status(200).json(profesorActualizado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Delete
route.delete('/:id', async (req, resp) => {
    try {
        const profesorEliminado = await Profesor.findByIdAndDelete(req.params.id);

        if (!profesorEliminado) {
            return resp.status(404).json({ mensaje: "Profesor no encontrado" });
        }

        resp.status(200).json({ mensaje: 'Profesor eliminado' });
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Obtener profesor por ID
route.get('/:id', async (req, resp) => {
    try {
        const profesor = await Profesor.findById(req.params.id);

        if (!profesor) {
            return resp.status(404).json({ mensaje: "Profesor no encontrado" });
        }

        resp.json(profesor);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});

// Obtener todos
route.get('/', async (req, resp) => {
    try {
        const profesorDatos = await Profesor.find();
        resp.json(profesorDatos);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});

module.exports = route;
