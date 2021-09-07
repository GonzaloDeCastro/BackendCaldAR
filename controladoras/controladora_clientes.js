console.log('hola');

let id = document.querySelector('.id');
let razon = document.querySelector('.razon_social');
let email = document.querySelector('.email');
let direccion = document.querySelector('.direccion');
let empresa = document.querySelector('.empresa');



let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    let respuesta = JSON.parse(xhttp.responseText);
    let clientes = respuesta.clientes;

    let salida = '';

    for(let i = 0; i < clientes.length; i++) {
        salida += `<li>${clientes[i].razon_social} su nickname es ${clientes[i].empresa}</li>`;
    }

    document.getElementById('personas')
    .innerHTML = salida;

    }
};
xhttp.open("GET", "datos/clientes.json", true);
xhttp.send();

/*
fetch(`../data/clientes.json`)
.then(response => response.json())
.then(data => {
    let idValue = data.id;
    let razonValue = data.razon;
    let emailValue = data.email;
    let direccionValue = data.direccion;
    let empresaValue = data.empresa;
    
    id.innerHTML = `${idValue}`;
    razon.innerHTML = `${razonValue}`;
    email.innerHTML = `${emailValue}`;
    direccion.innerHTML = `${direccionValue}`;
    empresa.innerHTML = `${empresaValue}`;
    

})*/