export abstract class Bar {
    protected element: HTMLDivElement;
    protected label: HTMLLabelElement;
    protected name: string;
    protected value: number;
    protected decayAmount: number;

    constructor(name: string, elementId: string, labelId: string, initialValue: number, decayAmount: number) {
        this.name = name;

        const el = document.getElementById(elementId);
        const lbl = document.getElementById(labelId);

        if (!el || !lbl) {
            throw new Error(`Elemento con ID '${elementId}' o '${labelId}' no encontrado.`);
        }

        this.element = el as HTMLDivElement;
        this.label = lbl as HTMLLabelElement;
        this.value = initialValue;
        this.decayAmount = decayAmount;
        this.updateBar();
    }

    updateBar(): void {
        this.value = Math.max(0, Math.min(this.value, 100)); // Evita valores fuera de rango
        this.element.style.width = `${this.value}%`;
        this.label.innerText = `${this.name}: ${this.value}%`;
        this.updateColor();
    }

    private updateColor(): void {
        this.element.classList.remove("blink");
        if (this.value > 75) {
            this.element.style.backgroundColor = "green";
        } else if (this.value > 50) {
            this.element.style.backgroundColor = "yellow";
        } else if (this.value > 25) {
            this.element.style.backgroundColor = "orange";
        } else {
            this.element.style.backgroundColor = "red";
            this.element.classList.add("blink");
        }
    }

    decay(): void {
        this.value -= this.decayAmount;
        this.updateBar();
    }
    decrease(amount: number): void {
        this.value -= amount;
        this.updateBar();
    }
    increase(amount: number): void {
        this.value += amount;
        this.updateBar();
    }
    setValue(amount: number): void {
        this.value = Math.max(Math.min(amount,100),0);
        this.updateBar();
    }

    getValue(): number {
        return this.value;
    }
    getName(): string{
        return this.name.trim();
    }
}
