const mongoose = require('mongoose');

const asistenciaSchema = new mongoose.Schema({
    estudianteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    claseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        default: 'presente'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('asistencia', asistenciaSchema);