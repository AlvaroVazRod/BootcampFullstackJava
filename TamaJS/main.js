"use strict";
class CatTama {
    constructor() {
        this.decayInterval = null;
        this.zeroCounters = { barEat: 0, barSleep: 0, barFight: 0 };
        this.barEat = document.getElementById("barEat");
        const eatIce = document.getElementById("buttonIce");
        const eatChick = document.getElementById("buttonChicken");
        this.barFight = document.getElementById("barFight");
        const fightHands = document.getElementById("fightHands");
        const fightRun = document.getElementById("fightRun");
        this.barSleep = document.getElementById("barSleep");
        const sleepNap = document.getElementById("sleepNap");
        const sleepBed = document.getElementById("sleepBed");
        this.barPlay = document.getElementById("barPlay");
        const playTennis = document.getElementById("playTennis");
        const playGame = document.getElementById("playGame");
        this.barLife = document.getElementById("barHappy");
        this.labelLife = document.getElementById("Happy");
        this.life();
        this.updateBarColor(this.barEat, this.getBarWidth(this.barEat));
        this.updateBarColor(this.barSleep, this.getBarWidth(this.barSleep));
        this.updateBarColor(this.barFight, this.getBarWidth(this.barFight));
        this.updateBarColor(this.barPlay, this.getBarWidth(this.barPlay));
        this.updateBarColor(this.barLife, this.getBarWidth(this.barLife));
        eatIce.addEventListener("click", () => {
            this.eat(20, -5, -10);
        });
        eatChick.addEventListener("click", () => {
            this.eat(50, -5, 0);
        });
        fightRun.addEventListener("click", () => {
            this.fight(25, -20, -20);
        });
        fightHands.addEventListener("click", () => {
            this.fight(50, -30, -30);
        });
        playTennis.addEventListener("click", () => {
            this.play(25, -15, 10);
        });
        playGame.addEventListener("click", () => {
            this.play(50, -5, -15);
        });
        sleepBed.addEventListener("click", () => {
            this.sleep(100, -20, -30);
        });
        sleepNap.addEventListener("click", () => {
            this.sleep(20, -10, -5);
        });
    }
    upgradeBarW(bar, change) {
        let currentWidth = this.getBarWidth(bar);
        let newWidth = Math.min(Math.max(currentWidth + change, 0), 100);
        bar.style.width = `${newWidth}%`;
        this.updateBarColor(bar, newWidth);
        this.life();
    }
    getBarWidth(bar) {
        return parseInt(bar.style.width) || 0;
    }
    updateBarColor(bar, value) {
        bar.classList.remove("blink");
        if (value > 75) {
            bar.style.backgroundColor = "green"; // Alta vida
        }
        else if (value > 50) {
            bar.style.backgroundColor = "yellow"; // Media vida
        }
        else if (value > 25) {
            bar.style.backgroundColor = "orange"; // Baja vida
        }
        else {
            bar.style.backgroundColor = "red"; // Peligro
            bar.classList.add("blink");
        }
    }
    eat(foodIncrease, sleepDecrease, fightDeacrese) {
        if (this.getBarWidth(this.barSleep) === 0 || this.getBarWidth(this.barFight) === 0) {
            this.showMessage("⚠️ Cuidado tu Triss no puede comer si tiene otra barra tan baja.");
            this.upgradeBarW(this.barSleep, -5);
            this.upgradeBarW(this.barFight, -5);
            return;
        }
        this.upgradeBarW(this.barEat, foodIncrease);
        this.upgradeBarW(this.barSleep, sleepDecrease);
        this.upgradeBarW(this.barFight, fightDeacrese);
    }
    fight(fightIncrease, sleepDecrease, eatDeacrese) {
        if (this.getBarWidth(this.barSleep) === 0 || this.getBarWidth(this.barEat) === 0) {
            this.showMessage("⚠️ Cuidado tu Triss no puede entrenar si tiene otra barra tan baja.");
            this.upgradeBarW(this.barSleep, -5);
            this.upgradeBarW(this.barEat, -5);
            return;
        }
        this.upgradeBarW(this.barFight, fightIncrease);
        this.upgradeBarW(this.barSleep, sleepDecrease);
        this.upgradeBarW(this.barEat, eatDeacrese);
    }
    play(playIncrease, sleepDecrease, fightDeacrese) {
        if (this.getBarWidth(this.barSleep) === 0 || this.getBarWidth(this.barFight) === 0) {
            this.showMessage("⚠️ Cuidado tu Triss no puede jugar si tiene otra barra tan baja.");
            this.upgradeBarW(this.barSleep, -5);
            this.upgradeBarW(this.barFight, -5);
            return;
        }
        this.upgradeBarW(this.barPlay, playIncrease);
        this.upgradeBarW(this.barSleep, sleepDecrease);
        this.upgradeBarW(this.barFight, fightDeacrese);
    }
    sleep(sleepIncrease, fightDeacrese, foodDeacrese) {
        if (this.getBarWidth(this.barFight) === 0 || this.getBarWidth(this.barEat) === 0) {
            this.showMessage("⚠️ Cuidado tu Triss no puede comer si tiene otra barra tan baja.");
            this.upgradeBarW(this.barEat, -5);
            this.upgradeBarW(this.barFight, -5);
            return;
        }
        this.upgradeBarW(this.barSleep, sleepIncrease);
        this.upgradeBarW(this.barFight, fightDeacrese);
        this.upgradeBarW(this.barEat, foodDeacrese);
    }
    life() {
        let newWidth = Math.min(Math.max(((0.4 * this.getBarWidth(this.barEat)) + (0.2 * this.getBarWidth(this.barFight)) + (0.1 * this.getBarWidth(this.barPlay)) + (0.5 * this.getBarWidth(this.barSleep))) * 1, 0), 100);
        this.barLife.style.width = `${newWidth}%`;
        this.updateBarColor(this.barLife, newWidth);
        this.updateBarColor(this.barLife, newWidth);
        this.labelLife.innerText = `Life ${newWidth}%`;
    }
    startBarDecay() {
        this.decayInterval = setInterval(() => {
            this.applyDecay(this.barEat, "barEat");
            this.applyDecay(this.barFight, "barFight");
            this.upgradeBarW(this.barPlay, -10);
            this.applyDecay(this.barSleep, "barSleep");
        }, 1000);
    }
    showMessage(message) {
        let messageBox = document.getElementById("messageBox");
        messageBox.innerText = message;
        messageBox.style.display = "block"; // Mostrar el mensaje
        setTimeout(() => {
            messageBox.style.display = "none";
        }, 3000);
    }
    applyDecay(bar, key) {
        let currentWidth = this.getBarWidth(bar);
        // Si la barra está en 0, aumentamos su contador
        if (currentWidth === 0 && (key === "barEat" || key === "barSleep" || key === "barFight")) {
            this.zeroCounters[key]++;
        }
        else {
            this.zeroCounters[key] = 0; // Si la barra sube, reseteamos el contador
        }
        // Si la barra lleva más de 10 segundos en 0, las demás bajan más rápido
        let decayAmount = (this.zeroCounters[key] > 10) ? -2 : -1;
        this.upgradeBarW(bar, decayAmount);
    }
    stopBarDecay() {
        if (this.decayInterval) {
            clearInterval(this.decayInterval);
            this.decayInterval = null;
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const triss = new CatTama();
    triss.startBarDecay();
});
