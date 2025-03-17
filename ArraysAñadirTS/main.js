const alimentos = ["🍕", "🍍", "🥑", "🥔", "🥕", "🥐", "🥒", "🫘", "🥜", "🥝", "🫒", "🥞"];
let alimentosActuales = [];
let elementosArray;
let numeroMax;
updateDisplay();

function getRandomIndex() {
    return Math.floor(Math.random() * alimentos.length);
}

function transferItem(insertAtStart = false, atIndex = null) {
    proveError(alimentos,"Alimentos");
    let randomNumero = getRandomIndex();

    let elemento = alimentos.splice(randomNumero, 1)[0];

    if (atIndex !== null) {
        alimentosActuales.splice(atIndex, 0, elemento);
    } else if (insertAtStart) {
        alimentosActuales.unshift(elemento);
    } else {
        alimentosActuales.push(elemento);
    }
    updateDisplay();
}

function updateDisplay() {
    document.getElementById("output").innerText =
        alimentosActuales.length > 0
            ? alimentosActuales.join(" ")
            : "No hay nada en el array compadre";

    let maxIndex = Math.max(alimentosActuales.length - 1, 0);
    ["removeIndex", "insertIndex"].forEach(id => {
        document.getElementById(id).setAttribute("max", maxIndex);
    });

}

function pushItem() { transferItem(); }
function unshiftItem() { transferItem(true); }
function insertAt() {
    let index = parseInt(document.getElementById("insertIndex").value);
    transferItem(false, index);
}

function popItem() {
    proveError((alimentosActuales, "alimentosActuales"));
    let elementoEliminar = alimentosActuales.pop();
    if (elementoEliminar) alimentos.push(elementoEliminar);
    updateDisplay();
}

function shiftItem() {
    proveError((alimentosActuales, "alimentosActuales"));
    let elementoEliminar = alimentosActuales.shift();
    if (elementoEliminar) alimentos.unshift(elementoEliminar);
    updateDisplay();
}

function removeAt() {
    proveError((alimentosActuales, "alimentosActuales"));
    let numero = parseInt(document.getElementById("removeIndex").value);
    if (isNaN(numero) || numero < 0 || numero >= alimentosActuales.length) {
        alert("⚠️ Advertencia Amigo Conducto ese indice no esta dentro del array");
        return;
    }
    let elementoEliminar = alimentosActuales.splice(numero, 1)[0];
    if (elementoEliminar) alimentos.push(elementoEliminar);
    updateDisplay();
}

function proveError(arr, arrName) {
    if (arr.length === 0) {
        throw new Error(`Error el array "${arrName}" está vacio.`);
    }
}
