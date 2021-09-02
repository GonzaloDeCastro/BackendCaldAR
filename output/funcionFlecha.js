"use strict";

var nombres = ['Carlos', 'Alejandro', 'Manuel', 'Cesar'];
var numero_caracteres = nombres.map(function (nombre) {
  return "".concat(nombre, " tiene ").concat(nombre.length, " letras de caracteres");
});
console.log(numero_caracteres);