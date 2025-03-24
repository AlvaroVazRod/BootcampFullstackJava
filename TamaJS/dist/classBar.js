export class Bar {
    constructor(name, elementId, labelId, initialValue, decayAmount) {
        this.name = name;
        const el = document.getElementById(elementId);
        const lbl = document.getElementById(labelId);
        if (!el || !lbl) {
            throw new Error(`Elemento con ID '${elementId}' o '${labelId}' no encontrado.`);
        }
        this.element = el;
        this.label = lbl;
        this.value = initialValue;
        this.decayAmount = decayAmount;
        this.updateBar();
    }
    updateBar() {
        this.value = Math.max(0, Math.min(this.value, 100)); // Evita valores fuera de rango
        this.element.style.width = `${this.value}%`;
        this.label.innerText = `${this.name}: ${this.value}%`;
        this.updateColor();
    }
    updateColor() {
        this.element.classList.remove("blink");
        if (this.value > 75) {
            this.element.style.backgroundColor = "green";
        }
        else if (this.value > 50) {
            this.element.style.backgroundColor = "yellow";
        }
        else if (this.value > 25) {
            this.element.style.backgroundColor = "orange";
        }
        else {
            this.element.style.backgroundColor = "red";
            this.element.classList.add("blink");
        }
    }
    decay() {
        this.value -= this.decayAmount;
        this.updateBar();
    }
    decrease(amount) {
        this.value -= amount;
        this.updateBar();
    }
    increase(amount) {
        this.value += amount;
        this.updateBar();
    }
    setValue(amount) {
        this.value = Math.max(Math.min(amount, 100), 0);
        this.updateBar();
    }
    getValue() {
        return this.value;
    }
    getName() {
        return this.name.trim();
    }
}
//# sourceMappingURL=classBar.js.map