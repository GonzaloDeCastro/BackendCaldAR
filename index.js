const express = require('express')

const app = express()

const path = require('path')

app.listen(3001, () => {
    console.log('Aplicacion corriendo en el puerto 3001')
})

//Routes o rutas
app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/empresa', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'empresa.html'))
})

app.get('/contacto', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'contacto.html'))
})

app.get('/mantenimientos', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'mantenimientos.html'))
})

app.get('/clientes', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'clientes.html'))
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

/*const http = require('http')

const fs = require('fs')

//3 variables para llamar a los 3 archivos html

const paginaEmpresa = fs.readFileSync('empresa.html')
const paginaContacto = fs.readFileSync('contacto.html')
const paginaInicio = fs.readFileSync('index.html')

const server = http.createServer((request, response) => {
    console.log(request.url)

    if(request.url === '/empresa'){
        return response.end(paginaEmpresa)
    }else if(request.url === '/contacto'){
        return response.end(paginaContacto)
    }else if (request.url === '/'){
        return response.end(paginaInicio)
    }else{
        response.writeHead(404)
        response.end('Pagina no encontrada')
    }


    
})

server.listen(3001)*/