var contador = 0;
var solucionIndice = 0;

const soluciones = [
    [0, 4, 7, 5, 2, 6, 1, 3],
    [0, 5, 7, 2, 6, 3, 1, 4],
    [0, 6, 3, 5, 7, 1, 4, 2]
];

// Revisa si hay una imagen de reina atacando la posición (r, c)
function estaAmenazada(r, c) {
    const tablero = document.getElementById("tablero");
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (tablero.rows[i].cells[j].querySelector("img")) {
                // Lógica matemática de ataque de reina
                if (i === r || j === c || Math.abs(i - r) === Math.abs(j - c)) {
                    return true; 
                }
            }
        }
    }
    return false;
}

function cellClick(celda) {
    // Si ya hay reina, la quitamos
    if (celda.querySelector("img")) {
        celda.innerHTML = "";
        contador--;
        return;
    }

    const r = celda.parentNode.rowIndex;
    const c = celda.cellIndex;

    // VALIDACIÓN: ¿Hay otra reina atacando aquí?
    if (estaAmenazada(r, c)) {
        alert("Posición inválida: La celda está bajo ataque de otra reina.");
        return; 
    }

    if (contador < 8) {
        const ruta = document.getElementById("reinaTipo").value;
        const img = document.createElement("img");
        img.src = ruta;
        celda.appendChild(img);
        contador++;
    }
}

function cambiar(r, c) {
    const tablero = document.getElementById("tablero");
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i === r || j === c || Math.abs(i - r) === Math.abs(j - c)) {
                tablero.rows[i].cells[j].style.backgroundColor = "red";
            }
        }
    }
}

function limpiar() {
    const celdas = document.getElementsByTagName("td");
    for (let td of celdas) { td.style.backgroundColor = ""; }
}

function reiniciar() {
    const celdas = document.getElementsByTagName("td");
    for (let td of celdas) { td.innerHTML = ""; }
    contador = 0;
}

function mostrarSolucion() {
    reiniciar();
    const tabla = document.getElementById("tablero");
    const sol = soluciones[solucionIndice];
    const ruta = document.getElementById("reinaTipo").value;

    sol.forEach((col, fila) => {
        const img = document.createElement("img");
        img.src = ruta;
        tabla.rows[fila].cells[col].appendChild(img);
    });
    contador = 8;
    solucionIndice = (solucionIndice + 1) % 3;
}

// Inicializar cambios de color
document.addEventListener("DOMContentLoaded", () => {
    const c1 = document.getElementById("color1");
    const c2 = document.getElementById("color2");
    c1.addEventListener("input", () => document.documentElement.style.setProperty("--color-celda1", c1.value));
    c2.addEventListener("input", () => document.documentElement.style.setProperty("--color-celda2", c2.value));
});