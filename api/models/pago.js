const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
    estudianteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    fechaPago: {
        type: Date,
        default: Date.now
    },
    metodoPago: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        default: 'pendiente'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('pago', pagoSchema);