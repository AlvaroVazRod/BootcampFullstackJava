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

    updateLife(bars: Bar[]): void {
        let weightings: { [key: string]: number } = {
            "Eat": 0.2,
            "Sleep": 0.5,
            "Fight": 0.2,
            "Play": 0.1
        };

        let newLife = bars.reduce((total, bar) => {
            let weight = weightings[bar.getName()] ?? 0;
            return total + weight * bar.getValue();
        }, 0);
        this.setValue(Math.round(newLife));
    }
}
