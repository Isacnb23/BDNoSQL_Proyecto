//Crea el server principal

//npm install express mongoose body-parser cors
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

//const rutas
const rutas = require('./routes/index');

const app = express();
const PORT = 3000; 


//Middlewares (Son como las urls del sitio) 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'Web')));


//Conexion hacia mongo
mongoose.connect('mongodb://localhost:27017/academiaEuropeaBD', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongo DB Success');
}).catch(err => {
    console.log('Mongo DB error: ', err);
});


//las rutas
app.use('/api', rutas);


app.get('/', (req, res) => {
    res.json({ 
        mensaje: 'API Academia Europea funcionando',
        rutas: {
            idiomas: '/api/idiomas',
            niveles: '/api/niveles',
            cursos: '/api/cursos',
            profesores: '/api/profesores',
            estudiantes: '/api/estudiantes',
            sedes: '/api/sedes',
            aulas: '/api/aulas',
            horarios: '/api/horarios',
            clases: '/api/clases',
            inscripciones: '/api/inscripciones',
            pagos: '/api/pagos',
            materiales: '/api/materiales',
            evaluaciones: '/api/evaluaciones',
            asistencias: '/api/asistencias',
            certificados: '/api/certificados',
            usuarios: '/api/usuarios',
            roles: '/api/roles'
        }
    });
});


//Inciar el servidor, o como veremos el server.
app.listen(PORT, () => {
    console.log(`Servidor encendido http://localhost:${PORT}`);
});

module.exports = app;