const mongoose = require('mongoose');

const certificadoSchema = new mongoose.Schema({
    estudianteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    cursoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fechaEmision: {
        type: Date,
        default: Date.now
    },
    codigo: {
        type: String,
        required: true
    },
    notaFinal: {
        type: Number,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('certificado', certificadoSchema);
