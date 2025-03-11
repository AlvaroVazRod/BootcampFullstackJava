var nombre;
do{
    nombre = prompt("Cual es tu nombre" );
}while (nombre === null || nombre.trim() === "");

alert("Me llamo " + nombre);
