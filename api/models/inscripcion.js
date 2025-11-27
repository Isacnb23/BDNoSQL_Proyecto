const mongoose = require('mongoose');

const inscripcionSchema = new mongoose.Schema({
    estudianteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    cursoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fechaInscripcion: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        default: 'activa'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('inscripcion', inscripcionSchema);