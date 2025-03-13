let frase = "MeLlamoAlvaroVazquez";
console.log(frase.replace(/a/gi,'o')); 

const frasefoo = (frase) => {
    if(frase.startsWith('aca')){
        console.log(true);
    }else{
        console.log(false);
    }
}
frasefoo("academia");
frasefoo("escuela");
let fraseH = "hola";

const holaFoo = (frase) => {
    if(frase.toLowerCase === fraseH.toLowerCase){
        for (let index = 0; index < 3; index++) {
            console.log("Hola");
            
        }
    }else{
        console.log("no te saludo");
    }
}
holaFoo("HOLA"); 