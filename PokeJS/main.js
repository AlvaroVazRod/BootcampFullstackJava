let peticionApiPag = 0;
let peticionApiPoke =
    "https://pokeapi.co/api/v2/pokemon?offset=" + peticionApiPag + "&limit=20";
let DATA = [];
const tipoPoke = [
    "acero", "agua", "bicho", "dragón", "eléctrico", "fantasma", "fuego", "hada", "hielo", "lucha", "normal", "planta", "psíquico", "roca", "siniestro", "tierra", "veneno", "volador"
];

const topoPokeIng = [
    "steel", "water", "bug", "dragon", "electric", "ghost", "fire", "fairy", "ice", "fighting", "normal", "grass", "psychic", "rock", "dark", "ground", "poison", "flying"
];

let selectedTypes = new Set(); 

const actualizarPeticion = () => {
    peticionApiPag += 20;
    peticionApiPoke =
        "https://pokeapi.co/api/v2/pokemon?offset=" + peticionApiPag + "&limit=20";
};

document.addEventListener("DOMContentLoaded", () => {
    peticioPoke();
    creacionTipoPoke();
});

document.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 1) {
        peticioPoke();
    }
});

async function peticioPoke() {
    try {
        let response = await fetch(peticionApiPoke);
        let data = await response.json();
        let date = data.results;
        console.log(DATA);
        
        for (let poke of date) {
            let details = await fetch(poke.url);
            let pokeData = await details.json();
            poke.types = pokeData.types.map(t => t.type.name);
        }

        DATA.push(...date);
        actualizarPokedex();
        actualizarPeticion();
    } catch (error) {
        console.error("Error en la petición:", error);
    }
}

function primeraLetra(texto) {
    if (!texto) return "";
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

async function añadirPoke(obj) {
    let pokedex = document.getElementById("grid-container");
    pokedex.innerHTML = ""; 
    let id = peticionApiPag;

    for (let e of obj) {
        id++;
        e.id = id;
        e.img = await fotoPoke(e.url);

        if (!e.types.some(type => selectedTypes.has(type))) {
            let card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <img src="${e.img}" alt="${primeraLetra(e.name)}">
                <h2>${e.name}</h2>
                <span>#${e.id}</span>
            `;
            pokedex.appendChild(card);
        }
        
    }
    
}

async function fotoPoke(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data.sprites.front_default;
    } catch (error) {
        console.error("Error en la petición de la Foto:", error);
        return "error.jpg";
    }
}

function creacionTipoPoke() {
    let box = document.getElementById("filtros");

    tipoPoke.forEach((po, index) => {
        let fil = document.createElement("div");
        fil.className = "type " + po;
        fil.innerHTML = primeraLetra(po);

        fil.addEventListener("click", function () {
            this.classList.toggle("selected");

            let typeEng = topoPokeIng[index]; 
            if (selectedTypes.has(typeEng)) {
                selectedTypes.delete(typeEng);
            } else {
                selectedTypes.add(typeEng);
            }

            actualizarPokedex(); 
        });
        
        box.appendChild(fil);
    });
}

async function actualizarPokedex() {
    añadirPoke(DATA);
}
