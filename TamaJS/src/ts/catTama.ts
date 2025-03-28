import { EatBar, SleepBar, FightBar, PlayBar, LifeBar } from "./bars";
import { showMessage, performAction, startDecayTimer, stopDecayTimer,disableAllButtons } from "./utils";
import { Bar } from "./classBar";

export class CatTama {
    private eatBar;
    private sleepBar;
    private fightBar;
    private playBar;
    private lifeBar;
    private lives: number = 3;
    private catImg: HTMLImageElement;
    private decayInterval: number | undefined;
    private allBars: { bar: Bar, key: string }[];

    constructor() {
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
        this.catImg = document.getElementById("catImg") as HTMLImageElement;
        this.startBarDecay();
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        document.getElementById("buttonIce")?.addEventListener("click", () => this.eat(20, 5, 10));
        document.getElementById("buttonChicken")?.addEventListener("click", () => this.eat(50, 5, 0));
        document.getElementById("fightHands")?.addEventListener("click", () => this.fight(50, 30, 30));
        document.getElementById("fightRun")?.addEventListener("click", () => this.fight(25, 20, 20));
        document.getElementById("playTennis")?.addEventListener("click", () => this.play(25, 15, -10));
        document.getElementById("playGame")?.addEventListener("click", () => this.play(50, 5, 15));
        document.getElementById("sleepBed")?.addEventListener("click", () => this.sleep(100, 20, 30));
        document.getElementById("sleepNap")?.addEventListener("click", () => this.sleep(20, 10, 5));
    }
    private play(playIncrease: number, sleepDecrease: number, fightDecrease: number) {
        performAction(
            "jugar",
            this.playBar,
            playIncrease,
            [
                { bar: this.sleepBar, penalty: sleepDecrease },
                { bar: this.fightBar, penalty: fightDecrease }
            ],
            "./src/assets/playing_cat.png",
            this.catImg
        );
        this.recoverBar(this.playBar, "barPlay");
    }
    private eat(foodIncrease: number, sleepDecrease: number, fightDecrease: number): void {
        performAction(
            "comer",
            this.eatBar,
            foodIncrease,
            [
                { bar: this.sleepBar, penalty: sleepDecrease },
                { bar: this.fightBar, penalty: fightDecrease }
            ],
            "./src/assets/simple_eating_cat.png",
            this.catImg
        );
        this.recoverBar(this.eatBar, "barEat");
    }

    private fight(fightIncrease: number, sleepDecrease: number, eatDecrease: number): void {
        performAction(
            "entrenar",
            this.fightBar,
            fightIncrease,
            [
                { bar: this.sleepBar, penalty: sleepDecrease },
                { bar: this.eatBar, penalty: eatDecrease }
            ],
            "./src/assets/exercising_cat.png",
            this.catImg
        );
        this.recoverBar(this.fightBar, "barFight");
    }

    private sleep(sleepIncrease: number, fightDecrease: number, eatDecrease: number): void {
        performAction(
            "Dormir",
            this.sleepBar,
            sleepIncrease,
            [
                { bar: this.fightBar, penalty: fightDecrease },
                { bar: this.eatBar, penalty: eatDecrease }
            ],
            "./src/assets/sleeping_cat.png",
            this.catImg
        );
        this.recoverBar(this.sleepBar, "barSleep");
    }

    private applyDecay(): void {
        for (let { bar, key } of this.allBars) {
            if (bar.getValue() === 0) {
                startDecayTimer(bar, key, this.checkDeath.bind(this));
            }
            bar.decay();
        }
        this.lifeBar.updateLife(this.allBars.map(b => b.bar));


    }
    private recoverBar(bar: Bar, key: string,): void {

        if (bar.getValue() > 0) {
            stopDecayTimer(key);
        }
        this.lifeBar.updateLife(this.allBars.map(b => b.bar));
    }
    private checkDeath(bar?: Bar): void {
        const isDead = (
            (bar && bar.getValue() === 0) ||  // Si la barra que decayó llegó a 0
            (this.eatBar.getValue() === 0 && this.sleepBar.getValue() === 0) ||  // Si Comida y Sueño están en 0
            (this.lifeBar.getValue() < 20)  // Si la vida total es menor a 20%
        );
        if (isDead) {
            this.lives--;
            this.updateLives();

            if (this.lives > 0) {
                this.resetBars();
                showMessage("⚠️ Has perdido una vida, pero Triss se recupera.");
                for (const {key} of this.allBars) {
                    stopDecayTimer(key);
                }
            } else {

                showMessage("💀 Triss ha muerto...");
                this.catImg.src = './src/assets/lying_cat_closed_eyes.png'
                disableAllButtons(); // 🔴 Deshabilita todos los botones
                this.stopBarDecay();
                for (const {key} of this.allBars) {
                    stopDecayTimer(key);
                }
                clearInterval(this.decayInterval);
                document.body.innerHTML += "<h1 style='color:red; text-align:center;'>💀 GAME OVER 💀</h1>";
                return;
            }
        }
    }

    private updateLives(): void {
        let lifeContainer = document.getElementById("lifeContainer") as HTMLElement;
        lifeContainer.innerHTML = this.lives > 0 ? "❤️".repeat(this.lives) : "💀";
    }

    private resetBars(): void {
        this.eatBar.setValue(50);
        this.sleepBar.setValue(50);
        this.playBar.setValue(50);
        this.fightBar.setValue(50);
        this.lifeBar.updateLife(this.allBars.map(b => b.bar));
    }

    public startBarDecay(): void {
        this.decayInterval = setInterval(() => {
            this.checkDeath();
            this.applyDecay();
            this.catImg.src = './src/assets/cat.png';
        }, 20000);
    }
    public stopBarDecay(): void {
        if (this.decayInterval !== undefined) {
            clearInterval(this.decayInterval);
            this.decayInterval = undefined;
        }
    }
}
