const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: ['PDF', 'Video', 'Audio', 'Enlace', 'Libro Digital']
    },
    url: {
        type: String,
        required: true
    },
    cursoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'curso'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('material', materialSchema);