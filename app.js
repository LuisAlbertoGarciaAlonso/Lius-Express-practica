                      //esto es sin express

// const http = require("http");
// const server = http.createServer((req, res ) => {
//     res.end('estoy respondiendo a la solucitud');
// });

// const PORT = 3000;

// server.listen(PORT, ()=>{
//     console.log('escuchando solucitud');
// });

const express = require('express');
const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

require('dotenv').config();

//conexion a base de datos
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
//para que no se muestre informacion importante este es un pack para eso configurar el .env


//aca estaban los datos del .env
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@luisalgar.divye.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority` ;

mongoose.connect(uri)
.then(() => {
    console.log('Base de Datos Conectada')
}).catch((err) => {
    console.log(err)
});

             //MOTOR DE PLANTILLAS//
app.set('view engine', 'ejs');
app.set('views', __dirname +'/views');

//middlewars   // dirname para que lea la direccion de donde lee las cosas se pone el dirname porque es dinamica y lee el archivo del hosting donde lee los archivos.
app.use(express.static(__dirname + '/public'));//paginas staticas

app.use('/', require('./router/rutasWeb'));

app.use('/productos', require('./router/productos'));

//middleware
app.use((req, res, next) => {
    res.status(404).render('404', {
        titulo: '404',
        descripcion: 'le pifiaste estoy en view soy 404.ejs'
    });
});



app.listen(PORT, () => {
    console.log('servidor a su servicio', PORT)
});