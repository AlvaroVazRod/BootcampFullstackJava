import { Bar } from "./classBar";
export class EatBar extends Bar {
    constructor() {
        super("Eat", "barEat", "labelEat", 50, 5);
    }
}
export class SleepBar extends Bar {
    constructor() {
        super("Sleep", "barSleep", "labelSleep", 50, 5);
    }
}
export class FightBar extends Bar {
    constructor() {
        super("Fight", "barFight", "labelFight", 50, 5);
    }
}
export class PlayBar extends Bar {
    constructor() {
        super("Play", "barPlay", "labelPlay", 50, 10);
    }
}
export class LifeBar extends Bar {
    constructor() {
        super("Life", "barHappy", "labelLife", 80, 0);
    }
    updateLife(bars) {
        let weightings = {
            "Eat": 0.2,
            "Sleep": 0.5,
            "Fight": 0.2,
            "Play": 0.1
        };
        let newLife = bars.reduce((total, bar) => {
            var _a;
            let weight = (_a = weightings[bar.getName()]) !== null && _a !== void 0 ? _a : 0;
            return total + weight * bar.getValue();
        }, 0);
        console.log(`✅ Nueva Vida Calculada: ${newLife}`);
        this.setValue(Math.round(newLife));
    }
}
//# sourceMappingURL=bars.js.map