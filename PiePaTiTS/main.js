/* let rondas = localStorage.getItem("rondas") ? parseInt(localStorage.getItem("rondas")) : 3;
let rondaActual = localStorage.getItem("rondaActual") ? parseInt(localStorage.getItem("rondaActual")) : 1;
let jugadorPuntos = localStorage.getItem("jugadorPuntos") ? parseInt(localStorage.getItem("jugadorPuntos")) : 0;
let computadoraPuntos = localStorage.getItem("computadoraPuntos") ? parseInt(localStorage.getItem("computadoraPuntos")) : 0;

function playGame(playerChoice) {
    const choices = ["piedra", "papel", "tijeras"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = "";

    if (playerChoice === computerChoice) {
        result = "¡Empate! 😐";
    } else if (
        (playerChoice === "piedra" && computerChoice === "tijeras") ||
        (playerChoice === "papel" && computerChoice === "piedra") ||
        (playerChoice === "tijeras" && computerChoice === "papel")
    ) {
        result = "¡Ganaste esta ronda! 🎉";
        jugadorPuntos++;
    } else {
        result = "Perdiste esta ronda 😢";
        computadoraPuntos++;
    }

    // Guardar valores en localStorage
    localStorage.setItem("jugadorPuntos", jugadorPuntos);
    localStorage.setItem("computadoraPuntos", computadoraPuntos);
    localStorage.setItem("rondaActual", rondaActual + 1);

    // Mostrar resultados de la ronda
    document.write("<h1>Piedra, Papel o Tijeras ✊📄✂️</h1>");
    document.write("<h2>Ronda " + rondaActual + " de " + rondas + "</h2>");
    document.write("<h2>Tu elección: " + convertToEmoji(playerChoice) + "</h2>");
    document.write("<h2>Computadora: " + convertToEmoji(computerChoice) + "</h2>");
    document.write("<h2>Resultado: " + result + "</h2>");
    document.write("<h3>Puntuación: Jugador " + jugadorPuntos + " - " + computadoraPuntos + " Computadora</h3>");

    // Verificar si el juego terminó
    if (rondaActual < rondas) {
        document.write('<button onclick="location.reload()">Siguiente ronda</button>');
    } else {
        let ganador = jugadorPuntos > computadoraPuntos ? "¡Ganaste el juego! 🎊" : "Game Over, gana la computadora 🏆";
        if (jugadorPuntos === computadoraPuntos) ganador = "¡Es un empate en el juego! 🤝";

        document.write("<h2>" + ganador + "</h2>");
        document.write('<button onclick="reiniciarJuego()">Jugar de nuevo</button>');
    }
}

function reiniciarJuego() {
    localStorage.clear();
    location.reload();
}

function convertToEmoji(choice) {
    return choice === "piedra" ? "✊" : choice === "papel" ? "📄" : "✂️";
}

// Mostrar los botones de elección al inicio
document.write("<h1>Piedra, Papel o Tijeras ✊📄✂️</h1>");
document.write("<h2>Ronda " + rondaActual + " de " + rondas + "</h2>");
document.write('<div class="buttons">');
document.write('<button onclick="playGame(\'piedra\')">✊ Piedra</button>');
document.write('<button onclick="playGame(\'papel\')">📄 Papel</button>');
document.write('<button onclick="playGame(\'tijeras\')">✂️ Tijeras</button>');
document.write('</div>');

 */


//Version sin document.write
// Función para obtener valores de localStorage con un valor por defecto
function obtenerValorLS(clave, valorPorDefecto) {
    let valor = localStorage.getItem(clave);
    return valor !== null ? parseInt(valor) : valorPorDefecto;
}

// Variables de juego
let rondas = obtenerValorLS("rondas", 3);
let rondaActual = obtenerValorLS("rondaActual", 1);
let jugadorPuntos = obtenerValorLS("jugadorPuntos", 0);
let computadoraPuntos = obtenerValorLS("computadoraPuntos", 0);

// Función para jugar una ronda
function playGame(playerChoice) {
    if (rondaActual > rondas) return; // Evita jugar más rondas de las establecidas

    const choices = ["piedra", "papel", "tijeras"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = "";

    if (playerChoice === computerChoice) {
        result = "¡Empate! 😐";
    } else if (
        (playerChoice === "piedra" && computerChoice === "tijeras") ||
        (playerChoice === "papel" && computerChoice === "piedra") ||
        (playerChoice === "tijeras" && computerChoice === "papel")
    ) {
        result = "¡Ganaste esta ronda! 🎉";
        jugadorPuntos++;
    } else {
        result = "Perdiste esta ronda 😢";
        computadoraPuntos++;
    }

    // Actualizar el estado del juego

    rondaActual++;
    actualizarLocalStorage();
    actualizarUI(playerChoice, computerChoice, result);
}
function actualizarLocalStorage() {
    localStorage.setItem("jugadorPuntos", jugadorPuntos);
    localStorage.setItem("computadoraPuntos", computadoraPuntos);
    localStorage.setItem("rondaActual", rondaActual);
}
function actualizarUI(playerChoice, computerChoice, result) {

    document.getElementById("ronda").innerText = `Ronda ${rondaActual} de ${rondas}`;
    document.getElementById("eleccionJugador").innerText = `Tu elección: ${convertToEmoji(playerChoice)}`;
    document.getElementById("eleccionComputadora").innerText = `Computadora: ${convertToEmoji(computerChoice)}`;
    document.getElementById("resultado").innerText = `Resultado: ${result}`;
    document.getElementById("puntuacion").innerText = `Puntuación: Jugador ${jugadorPuntos} - ${computadoraPuntos} Computadora`;

    // Verificar si el juego terminó
    if (rondaActual > rondas) {
        document.getElementById("ronda").innerText = `Ronda ${rondaActual - 1} de ${rondas}`;
        let ganador = jugadorPuntos > computadoraPuntos ? "¡Ganaste el juego! 🎊" : "Game Over, gana la computadora 🏆";
        if (jugadorPuntos === computadoraPuntos) ganador = "¡Es un empate en el juego! 🤝";

        document.getElementById("mensajeFinal").innerText = ganador;
        document.getElementById("botones").innerHTML = '<button onclick="reiniciarJuego()">Jugar de nuevo</button>';
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    localStorage.removeItem("jugadorPuntos");
    localStorage.removeItem("computadoraPuntos");
    localStorage.removeItem("rondaActual");
    location.reload();
}

// Función para convertir texto a emoji
function convertToEmoji(choice) {
    return choice === "piedra" ? "✊" : choice === "papel" ? "📄" : "✂️";
}

// Cargar valores iniciales en el HTML
document.addEventListener("DOMContentLoaded", () => {
    actualizarUI("", "", "");
});
