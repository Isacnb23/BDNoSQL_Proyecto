const mongoose = require('mongoose');

const evaluacionSchema = new mongoose.Schema({
    cursoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    puntajeMaximo: {
        type: Number,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('evaluacion', evaluacionSchema);