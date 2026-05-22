// variable global del ej2

var nombre_del_juego_elegido = "";

function seleccionar_card(div_html, nombre) {
    var todas_las_cards = document.getElementsByClassName('tarjuego');
    
    // recorro con un for comun y le saco la clase a todas
    for(var x = 0; x < todas_las_cards.length; x++) {
        todas_las_cards[x].classList.remove('seleccionado');
    }
    
    // se la agrego solo a la tarjeta q pasamos por parametro
    div_html.classList.add('seleccionado');
    nombre_del_juego_elegido = nombre;
    
    // si habia un error se borra
    document.getElementById('falla_juego').innerHTML = "";
}

// validador para el boton registrar
function verificar_y_registrar() {
    

    document.getElementById('falla_nick').innerHTML = "";
    document.getElementById('falla_edad').innerHTML = "";
    document.getElementById('falla_codigo').innerHTML = "";
    document.getElementById('falla_juego').innerHTML = "";
    document.getElementById('pantalla_preparacion').style.display = "none";

    var controlador = true;

    // 1 validar el nick(nombre de usuario)
    var input_nick = document.getElementById('campo_nickname').value;
    var reg = /^[a-zA-Z0-9]+$/; 
    
    if(input_nick.length < 3 || reg.test(input_nick) == false) {
        document.getElementById('falla_nick').innerHTML = "Falta el nick (mínimo 3 letras o números, sin espacios raros).";
        controlador = false;
    }

    // 2 validar edad
    var num_edad = document.getElementById('campo_edad_jugador').value;
    if(isNaN(num_edad) || num_edad == "" || parseInt(num_edad) <= 16) {
        document.getElementById('falla_edad').innerHTML = "La inscripción es solo para mayores de 16 años.";
        controlador = false;
    }

    // 3 validar el codigo de equipo
    var cod = document.getElementById('campo_codigo_team').value;
    if(isNaN(cod) || cod == "" || cod.length != 4) { // si o si 4 numeros y que no este vacio
        document.getElementById('falla_codigo').innerHTML = "Fijate bien, el código tiene que tener 4 números exactos.";
        controlador = false;
    }

    // 4 Validar que haya tocado la grilla
    if(nombre_del_juego_elegido == "") {
        document.getElementById('falla_juego').innerHTML = "Te olvidaste de elegir en qué juego vas a participar.";
        controlador = false;
    }

    // si el controlador no cambio mostramos el boton que activa el cuestionario
    if(controlador == true) {
        document.getElementById('pantalla_preparacion').style.display = "block";
    }
}

// ejercicio 3 con prompts 
function arrancar_preguntas_prompt() {
    var rta1 = prompt("¿Cuántas horas por semana dedicás a jugar?");
    var rta2 = prompt("¿Preferís jugar solo o en equipo?");
    var rta3 = prompt("¿Qué rol ocupás en tu equipo? (Atacante, Defensa, Soporte, etc.)");

    // validar los null por si tocan el boton de cancelar
    if(rta1 == null || rta1 == "") { 
        rta1 = "No respondió esta pregunta"; 
    }
    if(rta2 == null || rta2 == "") { 
        rta2 = "No respondió esta pregunta"; 
    }
    if(rta3 == null || rta3 == "") { 
        rta3 = "No respondió esta pregunta"; 
    }

    var contenedor = document.getElementById('volcado_de_respuestas');
    
    // concatenacion con las respuestas
    contenedor.innerHTML = "<b>Horas de juego por semana:</b> " + rta1 + "<br>" +
                           "<b>Modalidad preferida:</b> " + rta2 + "<br>" +
                           "<b>Rol en el equipo:</b> " + rta3;
                           
    contenedor.style.display = "block";
}