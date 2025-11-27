const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    idiomaId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    nivelId: {
        type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('curso', cursoSchema);