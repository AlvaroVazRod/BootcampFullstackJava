document.addEventListener("DOMContentLoaded", () => {
    const jokeText = document.getElementById("jokeText") as HTMLParagraphElement;
    const jokeButton = document.getElementById("jokeButton") as HTMLButtonElement;
  
    async function fetchJoke(): Promise<void> {
      try {
        const response = await fetch("https://api.chucknorris.io/jokes/random");
        if (!response.ok) throw new Error("Error al obtener el chiste");
  
        const data: { value: string } = await response.json();
        jokeText.textContent = data.value; // Muestra el chiste en el contenedor
      } catch (error) {
        jokeText.textContent = "Error al obtener el chiste. Inténtalo de nuevo.";
        console.error(error);
      }
    }
  
    jokeButton.addEventListener("click", fetchJoke);
  });
  