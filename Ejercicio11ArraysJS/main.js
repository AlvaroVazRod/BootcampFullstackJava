const arr = ['🍕', '🍔', '🌭', '🍟', '🍍', '🍕', '🍍', '🧋'];

for (let i = 0; i < arr.length; i++) {
        if (arr[i] != '🍕') {
            arr[i]='🍕';   
        }
        
    };
    arr.forEach(element => {
        console.log(element);
    });
let numeroPiñas = 0;
for (let i = 0; i < arr.length; i++) {

    if (arr[i] === '🍍') {
        numeroPiñas++;
        arr[i] = '';

    }

}
console.log("Hay " + numeroPiñas + " piña");
const nuevaArr = arr.filter(item => item.trim() != '');
nuevaArr.forEach(element => {
    console.log(element);
});