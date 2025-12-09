const mongoose = require('mongoose');

const horarioSchema = new mongoose.Schema({
    cursoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    diaSemana: {
        type: String,
        required: true
    },
    horaInicio: {
        type: String,
        required: true
    },
    horaFin: {
        type: String,
        required: true
    },
    aula: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('horario', horarioSchema);