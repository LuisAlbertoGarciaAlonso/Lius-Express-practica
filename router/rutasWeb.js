const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {titulo:'mi titulo dinamico que esta escrito en app get del app.js linea 31'});
});

router.get('/servicios', (req, res) => {
    res.render('servicios', {tituloDeServicios:'SERVICIOS mi titulo dinamico que esta escrito en app get del app.js linea 35 estoy en view servicios.js'});
});


module.exports = router;