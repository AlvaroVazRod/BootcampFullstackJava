//Ejercicio1
const funcion = (name, apellido1, apellido2) => {
    let a = name + " " + apellido1 + " " + apellido2;
    return a;
}
let nombre = funcion('Alvaro','Vazquez','Rodriguez')
console.log(nombre);
//Ejercicio2
const funcion2 = function(bool){
    console.log(typeof(bool));
    console.log(bool);
}
funcion2(true);
const infinite = function(...valores){
    valores.forEach(elemento =>{
        console.log(elemento);
    });
}
infinite(1,2,3,4,5);