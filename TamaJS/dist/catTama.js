import { EatBar, SleepBar, FightBar, PlayBar, LifeBar } from "./bars";
import { showMessage, performAction, startDecayTimer, stopDecayTimer, disableAllButtons } from "./utils";
export class CatTama {
    constructor() {
        this.lives = 3;
        this.eatBar = new EatBar();
        this.sleepBar = new SleepBar();
        this.fightBar = new FightBar();
        this.playBar = new PlayBar();
        this.lifeBar = new LifeBar();
        this.allBars = [
            { bar: this.eatBar, key: "barEat" },
            { bar: this.sleepBar, key: "barSleep" },
            { bar: this.fightBar, key: "barFight" },
            { bar: this.playBar, key: "barPlay" }
        ];
        this.catImg = document.getElementById("catImg");
        this.startBarDecay();
        this.setupEventListeners();
    }
    setupEventListeners() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_a = document.getElementById("buttonIce")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => this.eat(20, 5, 10));
        (_b = document.getElementById("buttonChicken")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => this.eat(50, 5, 0));
        (_c = document.getElementById("fightHands")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => this.fight(50, 30, 30));
        (_d = document.getElementById("fightRun")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => this.fight(25, 20, 20));
        (_e = document.getElementById("playTennis")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => this.play(25, 15, -10));
        (_f = document.getElementById("playGame")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => this.play(50, 5, 15));
        (_g = document.getElementById("sleepBed")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => this.sleep(100, 20, 30));
        (_h = document.getElementById("sleepNap")) === null || _h === void 0 ? void 0 : _h.addEventListener("click", () => this.sleep(20, 10, 5));
    }
    play(playIncrease, sleepDecrease, fightDecrease) {
        performAction("jugar", this.playBar, playIncrease, [
            { bar: this.sleepBar, penalty: sleepDecrease },
            { bar: this.fightBar, penalty: fightDecrease }
        ], "./src/assets/playing_cat.png", this.catImg);
        this.recoverBar(this.playBar, "barPlay");
    }
    eat(foodIncrease, sleepDecrease, fightDecrease) {
        performAction("comer", this.eatBar, foodIncrease, [
            { bar: this.sleepBar, penalty: sleepDecrease },
            { bar: this.fightBar, penalty: fightDecrease }
        ], "./src/assets/simple_eating_cat.png", this.catImg);
        this.recoverBar(this.eatBar, "barEat");
    }
    fight(fightIncrease, sleepDecrease, eatDecrease) {
        performAction("entrenar", this.fightBar, fightIncrease, [
            { bar: this.sleepBar, penalty: sleepDecrease },
            { bar: this.eatBar, penalty: eatDecrease }
        ], "./src/assets/exercising_cat.png", this.catImg);
        this.recoverBar(this.fightBar, "barFight");
    }
    sleep(sleepIncrease, fightDecrease, eatDecrease) {
        performAction("Dormir", this.sleepBar, sleepIncrease, [
            { bar: this.fightBar, penalty: fightDecrease },
            { bar: this.eatBar, penalty: eatDecrease }
        ], "./src/assets/sleeping_cat.png", this.catImg);
        this.recoverBar(this.sleepBar, "barSleep");
    }
    applyDecay() {
        for (let { bar, key } of this.allBars) {
            if (bar.getValue() === 0) {
                startDecayTimer(bar, key, this.checkDeath.bind(this));
            }
            bar.decay();
        }
        this.lifeBar.updateLife(this.allBars.map(b => b.bar));
    }
    recoverBar(bar, key) {
        if (bar.getValue() > 0) {
            stopDecayTimer(key);
        }
        this.lifeBar.updateLife(this.allBars.map(b => b.bar));
    }
    checkDeath(bar) {
        const isDead = ((bar && bar.getValue() === 0) || // Si la barra que decayó llegó a 0
            (this.eatBar.getValue() === 0 && this.sleepBar.getValue() === 0) || // Si Comida y Sueño están en 0
            (this.lifeBar.getValue() < 20) // Si la vida total es menor a 20%
        );
        if (isDead) {
            this.lives--;
            this.updateLives();
            if (this.lives > 0) {
                this.resetBars();
                showMessage("⚠️ Has perdido una vida, pero Triss se recupera.");
                for (const { key } of this.allBars) {
                    stopDecayTimer(key);
                }
            }
            else {
                showMessage("💀 Triss ha muerto...");
                this.catImg.src = './src/assets/lying_cat_closed_eyes.png';
                disableAllButtons(); // 🔴 Deshabilita todos los botones
                this.stopBarDecay();
                for (const { key } of this.allBars) {
                    stopDecayTimer(key);
                }
                clearInterval(this.decayInterval);
                document.body.innerHTML += "<h1 style='color:red; text-align:center;'>💀 GAME OVER 💀</h1>";
                return;
            }
        }
    }
    updateLives() {
        let lifeContainer = document.getElementById("lifeContainer");
        lifeContainer.innerHTML = this.lives > 0 ? "❤️".repeat(this.lives) : "💀";
    }
    resetBars() {
        this.eatBar.setValue(50);
        this.sleepBar.setValue(50);
        this.playBar.setValue(50);
        this.fightBar.setValue(50);
        this.lifeBar.updateLife(this.allBars.map(b => b.bar));
    }
    startBarDecay() {
        this.decayInterval = setInterval(() => {
            this.checkDeath();
            this.applyDecay();
            this.catImg.src = './src/assets/cat.png';
        }, 20000);
    }
    stopBarDecay() {
        if (this.decayInterval !== undefined) {
            clearInterval(this.decayInterval);
            this.decayInterval = undefined;
        }
    }
}
//# sourceMappingURL=catTama.js.map