const nombres = ['Carlos', 'Alejandro', 'Manuel', 'Cesar'];

const numero_caracteres = nombres.map( nombre => `${nombre} tiene ${nombre.length} letras de caracteres`);

console.log(numero_caracteres);