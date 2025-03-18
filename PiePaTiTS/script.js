"use strict";
// Función para obtener valores del localStorage con un valor por defecto
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
    if (rondaActual > rondas)
        return; // Evita jugar más rondas de las establecidas
    const choices = ["piedra", "papel", "tijeras"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = "";
    if (playerChoice === computerChoice) {
        result = "¡Empate! 😐";
    }
    else if ((playerChoice === "piedra" && computerChoice === "tijeras") ||
        (playerChoice === "papel" && computerChoice === "piedra") ||
        (playerChoice === "tijeras" && computerChoice === "papel")) {
        result = "¡Ganaste esta ronda! 🎉";
        jugadorPuntos++;
    }
    else {
        result = "Perdiste esta ronda 😢";
        computadoraPuntos++;
    }
    // Actualizar el estado del juego
    rondaActual++;
    actualizarLocalStorage();
    actualizarUI(playerChoice, computerChoice, result);
}
function actualizarLocalStorage() {
    localStorage.setItem("jugadorPuntos", jugadorPuntos.toString());
    localStorage.setItem("computadoraPuntos", computadoraPuntos.toString());
    localStorage.setItem("rondaActual", rondaActual.toString());
}
function actualizarUI(playerChoice, computerChoice, result) {
    const rondaElement = document.getElementById("ronda");
    const eleccionJugadorElement = document.getElementById("eleccionJugador");
    const eleccionComputadoraElement = document.getElementById("eleccionComputadora");
    const resultadoElement = document.getElementById("resultado");
    const puntuacionElement = document.getElementById("puntuacion");
    const mensajeFinalElement = document.getElementById("mensajeFinal");
    const botonesElement = document.getElementById("botones");
    if (rondaElement)
        rondaElement.innerText = `Ronda ${Math.min(rondaActual, rondas)} de ${rondas}`;
    if (eleccionJugadorElement)
        eleccionJugadorElement.innerText = `Tu elección ha sido: ${convertToEmoji(playerChoice)}`;
    if (eleccionComputadoraElement)
        eleccionComputadoraElement.innerText = `Computadora: ${convertToEmoji(computerChoice)}`;
    if (resultadoElement)
        resultadoElement.innerText = `Resultado: ${result}`;
    if (puntuacionElement)
        puntuacionElement.innerText = `Puntuación: Jugador ${jugadorPuntos} - ${computadoraPuntos} Computadora`;
    // Verificar si el juego terminó
    if (rondaActual > rondas && mensajeFinalElement && botonesElement) {
        let ganador = jugadorPuntos > computadoraPuntos ? "¡Ganaste el juego! 🎊" : "Game Over, gana la computadora 🏆";
        if (jugadorPuntos === computadoraPuntos)
            ganador = "¡Es un empate en el juego! 🤝";
        mensajeFinalElement.innerText = ganador;
        botonesElement.innerHTML = '<button onclick="reiniciarJuego()">Jugar de nuevo</button>';
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
    return choice === "piedra" ? "✊" : choice === "papel" ? "📄" : choice === "tijeras" ? "✂️" : "";
}
// Cargar valores iniciales en el HTML
document.addEventListener("DOMContentLoaded", () => {
    actualizarUI("", "", "");
});
