const express = require('express');
const router = express.Router();

const idiomas = require('./idiomas');
const niveles = require('./niveles');
const cursos = require('./cursos');
const profesores = require('./profesores');
const estudiantes = require('./estudiantes');
const sedes = require('./sedes');
const aulas = require('./aulas');
const horarios = require('./horarios');
const clases = require('./clases');
const inscripciones = require('./inscripciones');
const pagos = require('./pagos');
const materiales = require('./materiales');
const evaluaciones = require('./evaluaciones');
const asistencias = require('./asistencias');
const certificados = require('./certificados');
const usuarios = require('./usuarios');
const roles = require('./roles');


router.use('/idiomas', idiomas);
router.use('/niveles', niveles);
router.use('/cursos', cursos);
router.use('/profesores', profesores);
router.use('/estudiantes', estudiantes);
router.use('/sedes', sedes);
router.use('/aulas', aulas);
router.use('/horarios', horarios);
router.use('/clases', clases);
router.use('/inscripciones', inscripciones);
router.use('/pagos', pagos);
router.use('/materiales', materiales);
router.use('/evaluaciones', evaluaciones);
router.use('/asistencias', asistencias);
router.use('/certificados', certificados);
router.use('/usuarios', usuarios);
router.use('/roles', roles);

module.exports = router;
