const mongoose = require('mongoose');

const claseSchema = new mongoose.Schema({
    cursoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    tema: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    profesorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('clase', claseSchema);
