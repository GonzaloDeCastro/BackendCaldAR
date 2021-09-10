const express = require('express')
const app = express()
const path = require('path')

const clientesRuta = require('./rutas/rutaClientes');

app.use(clientesRuta);

app.listen(3001, () => {
    console.log('Aplicacion corriendo en el puerto 3001')
})

//Routes o rutas
app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'index.html'))
})




app.get('/pruebaGet', (req, res) => {
    res.send('PETICION GET RECEIVED');
});

app.post('/pruebaPost', (req, res) => {
    res.send('POST REQUEST RECEIVED');
});

app.put('/pruebaPut', (req, res) => {
    res.send('UPDATE REQUEST RECEIVED');
});

app.delete('/pruebaDelete', (req, res) => {
    res.send('DELETE REQUEST RECEIVED');
});
