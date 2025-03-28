"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => {
    const jokeText = document.getElementById("jokeText");
    const jokeButton = document.getElementById("jokeButton");
    function fetchJoke() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("https://api.chucknorris.io/jokes/random");
                if (!response.ok)
                    throw new Error("Error al obtener el chiste");
                const data = yield response.json();
                jokeText.textContent = data.value; // Muestra el chiste en el contenedor
            }
            catch (error) {
                jokeText.textContent = "Error al obtener el chiste. Inténtalo de nuevo.";
                console.error(error);
            }
        });
    }
    jokeButton.addEventListener("click", fetchJoke);
});
