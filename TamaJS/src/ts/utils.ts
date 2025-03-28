import { Bar } from "./classBar";
const dangerTimers: Map<string, number> = new Map();
export function showMessage(message: string, bar?: Bar): boolean {
    let messageBox = document.getElementById("messageBox") as HTMLElement;
    if (!bar) {
        messageBox.innerText = message;
        messageBox.style.display = "block";
        setTimeout(() => {
            messageBox.style.display = "none";
        }, 3000);
        return false;
    }
    if (bar?.getValue() === 0) {
        messageBox.innerText = message;
        messageBox.style.display = "block";
        setTimeout(() => {
            messageBox.style.display = "none";
        }, 3000);
        return true;
    }
    return false;
}

export function performAction(
    actionName: string,
    targetBar: Bar,
    targetIncrease: number,
    dependencies: { bar: Bar, penalty: number }[],
    imageSrc: string,
    catImg: HTMLImageElement,
): void {
    // 📌 Verifica si alguna barra dependiente está en 0
    for (const dep of dependencies) {
        if(showMessage(`⚠️ Triss no puede ${actionName} porque ${dep.bar.getName()} está en 0.`, dep.bar)) {
            // 🔹 Penaliza las barras dependientes si intentan la acción sin recursos
            dependencies.forEach((dep) => dep.bar.decrease(dep.penalty));
            return;
        }

    }

    // 📌 Aplica el cambio en la barra principal
    targetBar.increase(targetIncrease);

    // 📌 Aplica penalizaciones a las barras dependientes
    dependencies.forEach((dep) => dep.bar.decrease(dep.penalty));
    // 📌 Cambia la imagen de Triss
    catImg.src = imageSrc;
    
}
export function startDecayTimer(bar: Bar, key: string, checkDeath: (bar: Bar) => void): void {
    let dangerCounter = document.getElementById("dangerCounter") as HTMLElement;

    // 📌 Si ya existe un temporizador para esta barra, no lo reinicia
    if (dangerTimers.has(key)) return;

    let timeLeft = 20;
    dangerCounter.innerText = `⚠️ ${timeLeft}s`;
    dangerCounter.style.display = "block";

    let timer = setInterval(() => {
        timeLeft--;
        dangerCounter.innerText = `⚠️ ${timeLeft}s`;

        if (timeLeft <= 5) {
            dangerCounter.style.backgroundColor = "darkred";
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            dangerTimers.delete(key);
            checkDeath(bar); 
            dangerCounter.style.display = "none";
        }
    }, 1000);

    dangerTimers.set(key, timer);
}
export function stopDecayTimer(key: string): void {
    if (dangerTimers.has(key)) {
        clearInterval(dangerTimers.get(key)!);
        dangerTimers.delete(key);
        document.getElementById("dangerCounter")!.style.display = "none";
    }
}
export function disableAllButtons(): void {
    let buttons = document.querySelectorAll("button"); // Selecciona todos los botones
    buttons.forEach((button) => {
        (button as HTMLButtonElement).disabled = true; // 🔴 Deshabilita cada botón
    });
}