document.addEventListener("DOMContentLoaded", () => {
    console.log("La pagina ha sido cargada");
    const switchImg = document.getElementById("switch") as HTMLImageElement;
    const bulbImg = document.getElementById("bulb") as HTMLImageElement;
    const brightnessRange = document.getElementById("brightnessRange") as HTMLInputElement;
    const sizeBulb = document.getElementById("sizeImage") as HTMLInputElement;
    const turnBulb = document.getElementById("turnImage") as HTMLInputElement;
    const angleBulb = document.getElementById("angleValue") as HTMLSpanElement;
    bulbImg.style.transition = "transform 0.5s ease-in-out";
    if (bulbImg && switchImg) {
        switchImg.addEventListener("click", (event: MouseEvent) => {
            const isOff = bulbImg.classList.contains("off");
            bulbImg.classList.toggle("off", !isOff);
            bulbImg.classList.toggle("on", isOff);
            switchImg.classList.toggle("switch-off", !isOff);
            switchImg.classList.toggle("switch-on", isOff);
            if (!isOff) {
                bulbImg.style.filter = "brightness(1)";
                brightnessRange.disabled = true;
            } else {
                brightnessRange.disabled = false;
            }
        });

    }
    turnBulb.addEventListener("input", (event) => {
        const target = event.target as HTMLInputElement;
        const turnImg = `rotate(${target.value}deg)`;
        angleBulb.innerText = `${target.value}°`;
        bulbImg.style.transform = turnImg;
    });
    turnBulb.addEventListener("change", () => {
        setTimeout(() => {
            turnBulb.value = "0";
            bulbImg.style.transform = "rotate(0deg)";
            angleBulb.innerText = "0";
        }, 500);
    })
    sizeBulb.addEventListener("input", (event) => {
        const target = event.target as HTMLInputElement;
        const sizeImg = target.value + "px";
        bulbImg.style.width = sizeImg;
        bulbImg.style.height = sizeImg;
    });
    brightnessRange.addEventListener("input", (event) => {
        if (bulbImg.classList.contains("on")) {
            const target = event.target as HTMLInputElement;
            const brightnessValue = target.value;
            bulbImg.style.filter = `brightness(${brightnessValue})`;
        }
    });
});
