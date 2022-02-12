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

//concecion a base de datos
const mongoose = require('mongoose');

user = 'MONGOLius';
const password = 'LIUSMongo327167';
const dbname = 'veterinaria';
const uri = `mongodb+srv://${user}:${password}@luisalgar.divye.mongodb.net/${dbname}?retryWrites=true&w=majority` ;

mongoose.connect(uri)
.then(() => {
    console.log('Base de Datos Conectada')
}).catch((err) => {
    console.log(err)
});

const app = express();

const PORT = process.env.PORT || 3000;
require('dotenv').config();

             //MOTOR DE PLANTILLAS//
app.set('view engine', 'ejs');
app.set('views', __dirname +'/views');

//middlewars   // dirname para que lea la direccion de donde lee las cosas se pone el dirname porque es dinamica y lee el archivo del hosting donde lee los archivos.
app.use(express.static(__dirname + '/public'));//paginas staticas

app.use('/', require('./router/rutasWeb'));

app.use('/mascotas', require('./router/mascotas'));

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