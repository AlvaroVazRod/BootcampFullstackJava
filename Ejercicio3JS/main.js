//define variable
let string;
let num;
let bool;
let nulo;
let undef;
let simbol;
let obj;
let array;
let foo;

//initialize variable
string = "hola que tal";
num = 123.54
bool = true;
nulo = null;
//undef es directamente indefinido
simbol = Symbol('ASAP');
obj = { valor: 1, nombre: 'Alvaro' };
array = [21, 'abril', 1999];
foo = function () {
    console.log("Esto es una funcion");
}

//print description
console.log(string);
console.log(num);
console.log(bool);
console.log(nulo);
console.log(undef);
console.table(obj);
console.log(array);
foo();

//print type
console.log(typeof (string));
console.log(typeof (num));
console.log(typeof (bool));
console.log(typeof (nulo));
console.log(typeof (undef));
console.table(typeof (obj));
console.log(typeof (array));
console.log(typeof foo);

//define and initialize scope variables
let fooScope = function () {
    let string = "Nueva defincion";
    let num = 23.4;
    let bool = false;
    let nulo = null;
    let undef;
    let obj = { valor: 2, nombre: 'Cristina' };
    let array = [26, 'noviembre', 2000];
    let foo = function () {
        console.log("Y esta sera la declaracion y la inizilizacion de todos los datos en JS");
    }
    console.log(string);
    console.log(num);
    console.log(bool);
    console.log(nulo);
    console.log(undef);
    console.table(obj);
    console.log(array);
    foo();
}
fooScope();



