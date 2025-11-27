const mongoose = require('mongoose');

const aulaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    capacidad: {
        type: Number,
        required: true
    },
    sedeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    equipamiento: {
        type: [String],
        default: []
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('aula', aulaSchema);