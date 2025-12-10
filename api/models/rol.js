const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    permisos: [String],
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('role', roleSchema, 'roles');