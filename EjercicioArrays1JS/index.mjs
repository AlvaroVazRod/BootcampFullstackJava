import foods from './foods.mjs';
const todasCategorias = [...new Set(foods.map(food => food.category))];
const ticket = ['🥜', '🌮', '🥗', '🍕', '🍣', '🧀'];



const calcularTicket = (ticket, foods) =>
    ticket
        .map((item) => foods.find((food) => food.icon === item))
        .filter(Boolean)
        .reduce((total, food) => total + food.price, 0);

const totalTicket  = calcularTicket(ticket, foods);

console.log(
    `Total of the ticket: ${JSON.stringify(ticket)} is $${totalTicket.toFixed(2)}`);
const calcularTicket2 = (ticket, foods) => {
    const items = ticket
        .map((item) => foods.find((food) => food.icon === item))
        .filter(Boolean);

    const total = items.reduce((total, food) => total + food.price, 0);

    return { items, total };
};
const { items, total } = calcularTicket2(ticket, foods);

console.log("Ticket Breakdown:");
items.forEach(food => console.log(`- ${food.name}: $${food.price.toFixed(2)}`));
console.log(`Total: $${total.toFixed(2)}`);

/* console.log(...new Set(foods.map(food => food.category)));
console.log(todasCategorias);
const estaCategoria = function (categoria) {
    console.log(todasCategorias.includes(categoria));
} */
/* const existeCategori = (categoria) => todasCategorias.includes(categoria);
const platoCategoria = (categoria) => foods.filter((food) => (food.category === categoria));
console.log(existeCategori("Italiana"));
estaCategoria('Mexican');
console.log(platoCategoria('Mexican')); */