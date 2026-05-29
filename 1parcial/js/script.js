function validar_nombre() {
    // coom dice la consigna usar el getElementById() para obtener y leer los valores de cada campo
    var nombre = document.getElementById('campo_nombre').value;
    var sololetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (nombre.length < 3 || sololetras.test(nombre) == false) {
        document.getElementById('errornombre').innerHTML = "El nombre debe de tener 3 letras sin numeros ni simbolos.";
        return false;
    } else {
        document.getElementById('errornombre').innerHTML = "";
        return true;
    }
}


function validar_dni() {
    var dni = document.getElementById('campo_dni').value;
    
    // como dice el enunciado verificamos que no este vacia y que sea un numero (isNaN) y que tenga 8 numeros
    if (dni === "" || isNaN(dni) || dni.length !== 8) {
        document.getElementById('errordni').innerHTML = "El DNI debe tener exactamente 8 numeros.";
        return false;
    } else {
        document.getElementById('errordni').innerHTML = "";
        return true;
    }
}


function validar_edad() {
    var fecha_input = document.getElementById('campo_nacimiento').value;
    
    if (fecha_input === "") {
        document.getElementById('errornacimiento').innerHTML = "Debe de elegir una fecha.";
        return false;
    }

    // usamos el date
    var fecha_nac = new Date(fecha_input);
    var hoy = new Date();
    
    var edad = hoy.getFullYear() - fecha_nac.getFullYear();

    if (edad >= 18) {
        document.getElementById('errornacimiento').innerHTML = "";
        return true;
    } else {
        document.getElementById('errornacimiento').innerHTML = "Debe de ser mayor de 18 años para poder inscribirse.";
        return false;
    }
}


function enviarformulario() {
    document.getElementById('mensajeexito').style.display = "none";

    var nom_ok = validar_nombre();
    var dni_ok = validar_dni();
    var edad_ok = validar_edad();

    if (nom_ok == true && dni_ok == true && edad_ok == true) {
        document.getElementById('mensajeexito').style.display = "block";
    }
}


function hacerpreguntas() {
    var p1 = prompt("¿Cual es su nacionalidad?");
    var p2 = prompt("¿Cual es su nivel de conocimiento en programacion? (Básico / Intermedio / Avanzado)");
    var p3 = prompt("¿Por que elegiste esta carrera?");

    if (p1 === null || p1 === "") { p1 = "No respondio"; }
    if (p2 === null || p2 === "") { p2 = "No respondio"; }
    if (p3 === null || p3 === "") { p3 = "No respondio"; }

    //para mostrar las respuestas separadas segun la pregunta 1,2,3 + p que seria lo que responde el usuario
    var resultado_html = "<p><strong>Pregunta 1 (Nacionalidad):</strong> " + p1 + "</p>" +
                         "<p><strong>Pregunta 2 (Nivel):</strong> " + p2 + "</p>" +
                         "<p><strong>Pregunta 3 (Motivo):</strong> " + p3 + "</p>";

    document.getElementById('mostrarrespuestas').innerHTML = resultado_html;
    document.getElementById('casilla_respuestas').style.display = "block";
}