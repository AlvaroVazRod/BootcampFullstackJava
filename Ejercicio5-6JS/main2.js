//Ejercicio1
const suma = (num1, num2, num3) =>{
    return a = num1 + num2 +num3;
}

//Ejercicio2
console.log(suma(3,4,5));
const nomCompleto = (nom, apellido1, apellido2) =>{
    return nombre = nom + " " + apellido1 + " " + apellido2;
}

//Ejercicio3
console.log(nomCompleto('Alvaro','Vazquez','Rodriguez'));
const numMayor = (num1, num2) =>{
    if(num1>num2){
        return num1;
    }if(num2>num1){
        return num2;
    }else{
        return a = "Son iguales";
    }
}
console.log(numMayor(10, 10));