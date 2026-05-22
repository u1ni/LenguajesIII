// ── VARIABLE GLOBAL ──────────────────────────────────────────────────────
var materias = [];

// 1. obtenerDatos()
function obtenerDatos() {
    var nombreMateria = document.getElementById("materia").value.trim();
    var valorNota = document.getElementById("nota").value;

    document.getElementById("error").innerHTML = "";

    // Validación 1: el nombre no puede estar vacío
    if (nombreMateria === "") {
        mostrarError("El nombre de la materia no puede estar vacío.");
        return null;
    }

    // Validación 2: la nota debe ser un número
    if (valorNota === "" || isNaN(valorNota)) {
        mostrarError("La nota debe ser un número.");
        return null;
    }

    var nota = parseFloat(valorNota);

    // Validación 3: la nota debe estar entre 0 y 10
    if (nota < 0 || nota > 10) {
        mostrarError("La nota debe estar entre 0 y 10.");
        return null;
    }

    return { materia: nombreMateria, nota: nota };
}

// 2. clasificarNota(nota)
function clasificarNota(nota) {
    if (nota >= 9) {
        return "Sobresaliente";
    } else if (nota >= 7) {
        return "Bueno";
    } else if (nota >= 6) {
        return "Regular";
    } else if (nota >= 4) {
        return "Aprobado mínimo";
    } else {
        return "Insuficiente";
    }
}

// 3. agregarMateria()
function agregarMateria() {
    var datos = obtenerDatos();
    if (datos === null) {
        return;
    }

    materias.push(datos);

    mostrarLista();
    calcularResumen();

    document.getElementById("materia").value = "";
    document.getElementById("nota").value = "";
    document.getElementById("materia").focus();
}

// 4. mostrarLista()
function mostrarLista() {
    if (materias.length === 0) {
        document.getElementById("lista").innerHTML =
            "<p class='text-muted p-3 mb-0'>Aún no hay materias registradas.</p>";
        return;
    }

    var html = "<div class='table-responsive'>";
    html += "<table class='table table-hover align-middle mb-0'>";
    html += "<thead class='table-dark'>";
    html += "<tr><th>#</th><th>Materia</th><th>Nota</th><th>Categoría</th></tr>";
    html += "</thead><tbody>";

    for (var i = 0; i < materias.length; i++) {
        var categoria = clasificarNota(materias[i].nota);

        var claseBadge = "";
        if (categoria === "Sobresaliente") claseBadge = "badge-sobresaliente";
        else if (categoria === "Bueno") claseBadge = "badge-bueno";
        else if (categoria === "Regular") claseBadge = "badge-regular";
        else if (categoria === "Aprobado mínimo") claseBadge = "badge-aprobado";
        else claseBadge = "badge-insuficiente";

        html += "<tr>";
        html += "<td>" + (i + 1) + "</td>";
        html += "<td>" + materias[i].materia + "</td>";
        html += "<td>" + materias[i].nota + "</td>";
        html += "<td><span class='badge text-white " + claseBadge + "'>" + categoria + "</span></td>";
        html += "</tr>";
    }

    html += "</tbody></table></div>";
    document.getElementById("lista").innerHTML = html;
}

// 5. calcularResumen()
function calcularResumen() {
    if (materias.length === 0) {
        document.getElementById("resumen").innerHTML =
            "<p class='text-muted mb-0'>Aún no hay materias registradas.</p>";
        return;
    }

    var suma = 0;
    var aprobadas = 0;
    var reprobadas = 0;

    var mejorNota = materias[0].nota;
    var mejorMateria = materias[0].materia;
    var peorNota = materias[0].nota;
    var peorMateria = materias[0].materia;

    var i = 0;
    while (i < materias.length) {
        var notaActual = materias[i].nota;

        suma = suma + notaActual;

        if (notaActual >= 6) {
            aprobadas = aprobadas + 1;
        } else {
            reprobadas = reprobadas + 1;
        }

        if (notaActual > mejorNota) {
            mejorNota = notaActual;
            mejorMateria = materias[i].materia;
        }

        if (notaActual < peorNota) {
            peorNota = notaActual;
            peorMateria = materias[i].materia;
        }

        i = i + 1;
    }

    var promedio = suma / materias.length;

    var html = "<div class='row g-3'>";
    html += tarjetaStat("bi-calculator", "primary", "Promedio", promedio.toFixed(2));
    html += tarjetaStat("bi-check-circle", "success", "Aprobadas", aprobadas);
    html += tarjetaStat("bi-x-circle", "danger", "Reprobadas", reprobadas);
    html += tarjetaStat("bi-trophy", "warning", "Mejor nota", mejorNota + " <small class='fw-normal'>(" + mejorMateria + ")</small>");
    html += tarjetaStat("bi-arrow-down-circle", "secondary", "Peor nota", peorNota + " <small class='fw-normal'>(" + peorMateria + ")</small>");
    html += "</div>";

    document.getElementById("resumen").innerHTML = html;
}

// tarjetaStat() - Función auxiliar
function tarjetaStat(icono, color, titulo, valor) {
    return (
        "<div class='col-6 col-md-4'>" +
        "<div class='border rounded p-3 text-center h-100 bg-white'>" +
        "<i class='bi " + icono + " fs-3 text-" + color + "'></i>" +
        "<div class='fw-bold mt-1'>" + titulo + "</div>" +
        "<div class='fs-5'>" + valor + "</div>" +
        "</div>" +
        "</div>"
    );
}

// mostrarError() - manejo errores importante para parcial
function mostrarError(mensaje) {
    document.getElementById("error").innerHTML =
        "<div class='alert alert-danger py-2 mb-0 mt-2'>" + mensaje + "</div>";
}

// limpiarTodo()
function limpiarTodo() {
    materias = [];

    document.getElementById("lista").innerHTML =
        "<p class='text-muted p-3 mb-0'>Aún no hay materias registradas.</p>";
    document.getElementById("resumen").innerHTML =
        "<p class='text-muted mb-0'>Aún no hay materias registradas.</p>";
    document.getElementById("error").innerHTML = "";

    document.getElementById("materia").value = "";
    document.getElementById("nota").value = "";
    document.getElementById("materia").focus();
}