const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

/* Body-Parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://GonzaloDeCastro:12ec5DciPaAA7Z7U@cluster0.ca39s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then((result) => {
    console.log(`Base de datos conectada`)
})
.catch((error) => {
    console.log(`Base de datos no conectada, error ${error}`)
})


const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('Aplicacion corriendo en el puerto ', port)
});


//Routes o rutas
app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'index.html'));
});


const mantenimientosRuta = require('./rutas/rutaMantenimientos');
const clientesRuta = require('./rutas/rutaClientes');
const calderasRuta = require('./rutas/rutaCalderas');
const tecnicosRuta = require('./rutas/rutaTecnicos');

app.use('/api/mantenimientos', mantenimientosRuta());
app.use('/api/clientes', clientesRuta());
app.use('/api/calderas', calderasRuta());
app.use('/api/tecnicos', tecnicosRuta());


