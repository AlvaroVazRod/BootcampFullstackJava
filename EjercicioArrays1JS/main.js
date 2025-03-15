//1-2-3-4.
/* const dinner = [];
//Output: []
//Expected output ['🍸', '🧋', '🧋', '🍕', '🍟', '🍟', '🌭', '🍔']
dinner.push('🍔');
dinner.push('🌭');
dinner.push('🍟', '🍟');
dinner[dinner.length] = "🧋";
dinner[dinner.length] = "🧋";
//dinner.reverse();
const dinnerOrdenado = [];
for (let i = 0; i < dinner.length; i++) {
    dinnerOrdenado.push(dinner[i]);
}
for (let i = 0; i < Math.floor(dinner.length/2); i++) {
    let temp = dinner[i];
    dinner[i] = dinner[dinner.length - 1 - i];
    dinner[dinner.length - 1 - i] = temp;
}
dinner.forEach((elem, i, dinner) => {
    let iReverso = dinner.length - 1 - i;
    if (i < iReverso) {
        [dinner[i], dinner[iReverso]] = [dinner[iReverso], dinner[i]];
    }
});
dinner.unshift('🍸');
console.log(dinner); */

//5.
/* const ticket01 = ['🍺', '🍺', '🥜']; 
const ticket02 = ['🍺', '🥪', '🥙']; 
const combinedTicket = [];
const combinedTicket = ticket01.concat(ticket02);
const combinedTicket = [...ticket01,...ticket02];
combinedTicket.push.apply(combinedTicket,ticket01);
combinedTicket.push.apply(combinedTicket,ticket02);
let i = 0;
for (let index = 0; index < ticket01.length+ticket02.length; index++) {
    
    if (index<3) {
        combinedTicket[index] = ticket01[index];
    }else{
        
        combinedTicket[index] = ticket02[i];
        i++;
    }

    
}
ticket01.forEach((element)=>{
    combinedTicket.push(element);
});
ticket02.forEach((element)=>{
    combinedTicket.push(element);
}); */

// 6.
/* const combinedTicket = ['🍺', '🍺', '🍺', '🥜', '🍺', '🥪', '🥙'];
combinedTicket.shift();
combinedTicket.pop();
console.log(combinedTicket); */
// 8.
/* const shake = ['🥛', '🍓', '🍌'];
console.log(shake.join("+"));
 */

// 9.
/* const tickets = [1, 100000, 21, 30, 4, 200000, 454, 42, 65, 23, 54];
let num = tickets.length;
let temp;
function ordenar(arra){
    for (let i = 0; i < num - 1; i++) {
        for (let j = 0; j < num - i - 1; j++) {
            if (tickets[j] > tickets[j + 1]) {
                //temp = tickets[j];
                //tickets[j] = tickets[j + 1];
                //tickets[j + 1] = temp; 
                [tickets[j],tickets[j+1]]=[tickets[j+1],tickets[j]];
            }
        }
    }
    return arra;
}
function ordenar2(arra){
    let arra2 = [...arra].sort((a,b)=> a-b);
    return arra2;
}
console.log(ordenar2(tickets));
 */

// 10.
const ticket01 = ['☕', '☕', '☕', '☕'];
const ticket02 = ['☕', '🥖', '☕', '🥯', '🍵', '🥐', '🥪'];
function sonCafes(arr) {
    let cafes = arr.every(cafe => cafe === '☕');
    return cafes;
}
//console.log(sonCafes(ticket01)&&sonCafes(ticket02));
/* const ticket03 = ['🍹', '🥖', '☕', '🥯', '🍵', '🥐', '🥪'];
const person1Consumption = ['☕', '🥐'];
const person2Consumption = ['🍵', '🥖'];
const person3Consumption = ['🍹', '🥪'];
const creaTicketIndividual = (ticket, individual) => {
    return individual.filter(item => ticket.includes(item));
};

const cliente1 = creaTicketIndividual(ticket03.slice(), person1Consumption);
const cliente2 = creaTicketIndividual(ticket03.slice(), person2Consumption);
const cliente3 = creaTicketIndividual(ticket03.slice(), person3Consumption);

const consumidos = [...cliente1, ...cliente2, ...cliente3];
const ticketRestante = ticket03.slice().filter(item => !consumidos.includes(item));


console.log("Person 1 Ticket:", cliente1);
console.log("Person 2 Ticket:", cliente2);
console.log("Person 3 Ticket:", cliente3);
console.log("Remaining items in the original ticket:", ticketRestante);
const creaTicketIndividual = (ticket, individual) => {
    const ticketIndividual = [];
    
    for (const item of individual) {
        const index = ticket.indexOf(item);
        if (index !== -1) {
            ticketIndividual.push(item);
            ticket.splice(index, 1);
            //o 
            //ticketIndividual.push(ticket.splice(index, 1 )[0]);
        }
    }

    return ticketIndividual;
};


const cliente1 = creaTicketIndividual(ticket03, person1Consumption);
const cliente2 = creaTicketIndividual(ticket03, person2Consumption);
const cliente3 = creaTicketIndividual(ticket03, person3Consumption);

console.log("Person 1 Ticket:", cliente1);
console.log("Person 2 Ticket:", cliente2);
console.log("Person 3 Ticket:", cliente3);
console.log("Remaining items in the original ticket:", ticket03);  */

// 11.
const drinksConsumed = [
    { nombre: 'Alice', bebida: '🍹', hora: '18:30:00' },
    { nombre: 'Bob', bebida: '🍷', hora: '19:15:00' },
    { nombre: 'Charlie', bebida: '🍹', hora: '20:00:00' },
    { nombre: 'Alice', bebida: '🍸', hora: '21:45:00' },
    { nombre: 'Bob', bebida: '🥂', hora: '22:30:00' },
    { nombre: 'Charlie', bebida: '🍵', hora: '23:15:00' },
    { nombre: 'Alice', bebida: '🍹', hora: '03:30:00' },
    { nombre: 'Bob', bebida: '🍺', hora: '04:15:00' },
    { nombre: 'Charlie', bebida: '🍸', hora: '05:00:00' },
];
function buscaPrimeraConsumicion (arr, bebida){
    const index = arr.findIndex(arr => arr.bebida === bebida);
    //o
    //const indexe= arr
		//.map((item) => item.bebida)
		//.indexOf(bebida);
    if(index!==-1){
        const personaBebida = arr[index].nombre;
        const tiempoBebida = arr[index].hora;
        console.log("La primera persona que ha bebido "+ bebida+ " es "+ personaBebida+ " a las "+ tiempoBebida);
    }else{
        console.log("Nadie ha bebido "+bebida);
    }

}
function buscaUltimaConsumicion (arr, bebida){
    const index = arr.findLastIndex(arr => arr.bebida === bebida);
    //o
    //const indexe= arr
		//.map((item) => item.bebida)
		//.LastindexOf(bebida);
    if(index!==-1){
        const personaBebida = arr[index].nombre;
        const tiempoBebida = arr[index].hora;
        console.log("La ultima persona que ha bebido "+ bebida+ " es "+ personaBebida+ " a las "+ tiempoBebida);
    }else{
        console.log("Nadie ha bebido "+bebida);
    }

}
buscaPrimeraConsumicion(drinksConsumed,'🍹');
buscaPrimeraConsumicion(drinksConsumed,'🥂');
buscaPrimeraConsumicion(drinksConsumed,'☕');
buscaUltimaConsumicion(drinksConsumed,'🍸');

