const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser');

/* Body-Parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3001, () => {
    console.log('Aplicacion corriendo en el puerto 3001')
})

//Routes o rutas
app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'index.html'))
})



const tecnicosRuta = require('./rutas/rutaTecnicos');
const clientesRuta = require('./rutas/rutaClientes');
const calderasRuta = require('./rutas/rutaCalderas');

app.use('/api/clientes', clientesRuta());
app.use('/api/calderas', calderasRuta());
app.use('/api/tecnicos', tecnicosRuta());


