const mongoose = require('mongoose');

const certificadoSchema = new mongoose.Schema({
    estudianteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'estudiante'
    },
    cursoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'curso'
    },
    fechaEmision: {
        type: Date,
        required: true
    },
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    notaFinal: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('certificado', certificadoSchema);