let mes;
const semanaFoo = (mes) => {
    switch (mes) {
        case 1:
            return "Enero";
            break;
        case 2:
            return "Febrero";

            break;
        case 3:
            return "Marzo";

            break;
        case 4:
            return "Abril";

            break;
        case 5:
            return "Mayo";

            break;
        case 6:
            return "Junio";

            break;
        case 7:
            return "Julio";

            break;
        case 8:
            return "Agosto";

            break;
        case 9:
            return "Septiembre";

            break;
        case 10:
            return "Octubre";

            break;
        case 11:
            return "Noviembre";

            break;
        case 12:
            return "Diciembre";

            break;
        default:
            return "Este numero no es un mes del año, los meses del año van del 1 al 12";
            break;
    }
}

do {
    let input = prompt("Qué número de mes estamos?");

    if (input === null) {
        alert("No valido");
        break;
    }

    mes = parseInt(input);

} while (isNaN(mes) || mes < 1 || mes > 12);
if (!isNaN(mes)) {
    alert("Tu mes es " + semanaFoo(mes));
}

