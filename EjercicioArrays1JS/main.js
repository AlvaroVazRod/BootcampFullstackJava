const dinner = [];
//Output: []
//Expected output ['🍸', '🧋', '🧋', '🍕', '🍟', '🍟', '🌭', '🍔']
dinner.push('🍔');
dinner.push('🌭');
dinner.push('🍟', '🍟');
dinner[dinner.length] = "🧋";
dinner[dinner.length] = "🧋";
//dinner.reverse();
/* const dinnerOrdenado = [];
for (let i = 0; i < dinner.length; i++) {
    dinnerOrdenado.push(dinner[i]);
} */
/* for (let i = 0; i < Math.floor(dinner.length/2); i++) {
    let temp = dinner[i];
    dinner[i] = dinner[dinner.length - 1 - i];
    dinner[dinner.length - 1 - i] = temp;
} */
dinner.forEach((elem, i, dinner) => {
    let iReverso = dinner.length - 1 - i;
    if (i < iReverso) {
        [dinner[i], dinner[iReverso]] = [dinner[iReverso], dinner[i]];
    }
});
dinner.unshift('🍸');
console.log(dinner);