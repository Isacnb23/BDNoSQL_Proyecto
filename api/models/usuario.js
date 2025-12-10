const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nota_rol: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'role',
    required: true
},
    estado: {
        type: String,
        default: 'activo'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('usuario', usuarioSchema);