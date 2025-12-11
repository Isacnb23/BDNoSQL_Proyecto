const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
    estudianteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'estudiante'
    },
    monto: {
        type: Number,
        required: true
    },
    fechaPago: {
        type: Date,
        required: true
    },
    metodoPago: {
        type: String,
        required: true,
        enum: ['Tarjeta de Crédito', 'Tarjeta de Débito', 'Transferencia Bancaria', 'PayPal', 'Efectivo']
    },
    estado: {
        type: String,
        required: true,
        enum: ['pagado', 'pendiente', 'fallido'],
        default: 'pendiente'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('pago', pagoSchema);