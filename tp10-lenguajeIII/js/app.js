var num_pregunta = 1;

function ir_adelante() {
    var paso_validacion = false;

    // dependiendo en que paso estamos, llamo a la funcion que corresponde
    if(num_pregunta == 1) { paso_validacion = validar_p1(); }
    else if(num_pregunta == 2) { paso_validacion = validar_p2(); }
    else if(num_pregunta == 3) { paso_validacion = validar_p3(); }
    else if(num_pregunta == 4) { paso_validacion = validar_p4(); }
    else if(num_pregunta == 5) { paso_validacion = validar_p5(); }
    else if(num_pregunta == 6) { paso_validacion = validar_p6(); }
    else if(num_pregunta == 7) { paso_validacion = validar_p7(); }
    else if(num_pregunta == 8) { paso_validacion = validar_p8(); }
    else if(num_pregunta == 9) { paso_validacion = validar_p9(); }
    else if(num_pregunta == 10) { paso_validacion = validar_p10(); }

    console.log("Intentando pasar la pregunta: " + num_pregunta + " | Resultado: " + paso_validacion);

    // si dio true entonces sigo 
    if(paso_validacion == true) {
        
        // bloqueo el campo actual
        document.getElementById('campo_p' + num_pregunta).disabled = true;

        // si era la ultima pregunta, cierro el registro
        if(num_pregunta == 10) {
            mostrar_cartel_final();
        } else {
            // ocultar la caja actual
            document.getElementById('caja_p' + num_pregunta).style.display = "none";
            
            // sumador para la variable  de las preguntas
            num_pregunta++;
            
            // se muestra la caja que sigue
            document.getElementById('caja_p' + num_pregunta).style.display = "block";
            
            // activo el boton de retroceder porque ya no estamos en la 1 entonces si quiero voler a la pregunta anterior se activa diferente para la 1
            document.getElementById('btn_retroceder').disabled = false;
        }
    }
}

//funcion del boton de retroceder
function ir_atras() {
    if(num_pregunta > 1) {
        
        document.getElementById('caja_p' + num_pregunta).style.display = "none";
        
        num_pregunta--;
        
        // muestro la anterior
        document.getElementById('caja_p' + num_pregunta).style.display = "block";
        
        // desbloqueo el campo anterior para que lo pueda editar
        document.getElementById('campo_p' + num_pregunta).disabled = false;
        document.getElementById('campo_p' + num_pregunta).style.borderColor = "";

        // si se vuelvee a la preg 1 entonces deshabilita el boton retroceder porque no hay mas preguntas anteriores a la 1
        if(num_pregunta == 1) {
            document.getElementById('btn_retroceder').disabled = true;
        }
    }
}

//funcion del boton de reiniciar
function reiniciar_todo() {

    for(var i = 1; i <= 10; i++) {
        var camp = document.getElementById('campo_p' + i);
        camp.value = "";
        camp.disabled = false;
        camp.style.borderColor = ""; 
        document.getElementById('err_p' + i).innerHTML = "";

        if(i == 1) {
            document.getElementById('caja_p' + i).style.display = "block";
        } else {
            document.getElementById('caja_p' + i).style.display = "none";
        }
    }
    
    num_pregunta = 1;
    document.getElementById('cartel_final').style.display = "none";
    document.getElementById('panel_botones').style.display = "block";
    document.getElementById('btn_retroceder').disabled = true;
}

//funcion para mostrar e4l cartel del final
function mostrar_cartel_final() {
    document.getElementById('panel_botones').style.display = "none";
    
    var nombre = document.getElementById('campo_p1').value;
    var raza = document.getElementById('campo_p2').value;
    var clase = document.getElementById('campo_p3').value;

    var txt = "¡Registro exitoso, " + nombre + "! Tu leyenda comienza hoy. ¡Que la gran alianza guie tus pasos, " + clase + " de los " + raza + "!";
    
    document.getElementById('mensaje_bienvenida').innerHTML = txt;
    document.getElementById('cartel_final').style.display = "block";
    document.getElementById('cartel_final').scrollIntoView({ behavior: 'smooth' });
}


//validaciones de cada pregunta

function validar_p1() {
    var val = document.getElementById('campo_p1').value.trim();
    var inp = document.getElementById('campo_p1');
    var err = document.getElementById('err_p1');

    if(val === "") {
        inp.style.borderColor = "gray";
        err.innerHTML = "El campo no puede estar vacio.";
        return false;
    }

    var regex_letras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if(val.length < 3 || regex_letras.test(val) == false) {
        inp.style.borderColor = "red";
        err.innerHTML = "Solo letras y minimo 3 caracteres.";
        return false;
    }

    inp.style.borderColor = "green";
    err.innerHTML = "";
    return true;
}

function validar_p2() {
    var val = document.getElementById('campo_p2').value;
    var inp = document.getElementById('campo_p2');
    var err = document.getElementById('err_p2');

    if(val === "") {
        inp.style.borderColor = "gray";
        err.innerHTML = "Debes seleccionar una opcion.";
        return false;
    }
    inp.style.borderColor = "green";
    err.innerHTML = "";
    return true;
}

function validar_p3() {
    var val = document.getElementById('campo_p3').value;
    var inp = document.getElementById('campo_p3');
    var err = document.getElementById('err_p3');

    if(val === "") {
        inp.style.borderColor = "gray";
        err.innerHTML = "Debes seleccionar una opcion.";
        return false;
    }
    inp.style.borderColor = "green";
    err.innerHTML = "";
    return true;
}

function validar_p4() {
    var val = document.getElementById('campo_p4').value.trim();
    var inp = document.getElementById('campo_p4');
    var err = document.getElementById('err_p4');

    if(val === "") {
        inp.style.borderColor = "gray";
        err.innerHTML = "El campo no puede estar vacio.";
        return false;
    }

    var regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if(val.length < 3 || regex.test(val) == false) {
        inp.style.borderColor = "red";
        err.innerHTML = "Solo letras y minimo 3 caracteres.";
        return false;
    }

    inp.style.borderColor = "green";
    err.innerHTML = "";
    return true;
}

function validar_p5() {
    var val = document.getElementById('campo_p5').value.trim();
    var inp = document.getElementById('campo_p5');
    var err = document.getElementById('err_p5');

    if(val === "") {
        inp.style.borderColor = "gray";
        err.innerHTML = "El campo no puede estar vacio.";
        return false;
    }

    var regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if(val.length < 3 || regex.test(val) == false) {
        inp.style.borderColor = "red";
        err.innerHTML = "Solo letras y minimo 3 caracteres.";
        return false;
    }

    inp.style.borderColor = "green";
    err.innerHTML = "";
    return true;
}

function validar_p6() {
    var val = document.getElementById('campo_p6').value.trim();
    var inp = document.getElementById('campo_p6');
    var err = document.getElementById('err_p6');

    if(val === "") {
        inp.style.borderColor = "gray";
        err.innerHTML = "El campo no puede estar vacio.";
        return false;
    }

    // el IsNaN comprueba si no es un numero
    if(isNaN(val) || val.length !== 6) {
        inp.style.borderColor = "red";
        err.innerHTML = "Deben ser exactamente 6 numeros.";
        return false;
    }

    inp.style.borderColor = "green";
    err.innerHTML = "";
    return true;
}

function validar_p7() {
    var val = document.getElementById('campo_p7').value.trim();
    var inp = document.getElementById('campo_p7');
    var err = document.getElementById('err_p7');

    if(val === "") {
        inp.style.borderColor = "gray";
        err.innerHTML = "El campo no puede estar vacio.";
        return false;
    }

    var numero = parseInt(val);
    if(isNaN(val) || numero < 1 || numero > 999) {
        inp.style.borderColor = "red";
        err.innerHTML = "Ingresa un numero entre 1 y 999.";
        return false;
    }

    inp.style.borderColor = "green";
    err.innerHTML = "";
    return true;
}

function validar_p8() {
    var val = document.getElementById('campo_p8').value.trim();
    var inp = document.getElementById('campo_p8');
    var err = document.getElementById('err_p8');

    if(val === "") {
        inp.style.borderColor = "gray";
        err.innerHTML = "El campo no puede estar vacio.";
        return false;
    }

    var numero = parseInt(val);
    if(isNaN(val) || numero < 0) {
        inp.style.borderColor = "red";
        err.innerHTML = "Debe ser un número minimo de 0.";
        return false;
    }

    inp.style.borderColor = "green";
    err.innerHTML = "";
    return true;
}

function validar_p9() {
    var val = document.getElementById('campo_p9').value;
    var inp = document.getElementById('campo_p9');
    var err = document.getElementById('err_p9');

    if(val === "") {
        inp.style.borderColor = "gray";
        err.innerHTML = "Debe elegir una fecha.";
        return false;
    }

    // validar con el date
    var partes = val.split('-');
    var fecha_nac = new Date(partes[0], partes[1] - 1, partes[2]);
    var hoy = new Date();
    
    var edad = hoy.getFullYear() - fecha_nac.getFullYear();
    var mes = hoy.getMonth() - fecha_nac.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha_nac.getDate())) {
        edad--;
    }

    if(edad < 18) {
        inp.style.borderColor = "red";
        err.innerHTML = "El personaje debe tener al menos 18 años.";
        return false;
    }

    inp.style.borderColor = "green";
    err.innerHTML = "";
    return true;
}

function validar_p10() {
    var val = document.getElementById('campo_p10').value;
    var inp = document.getElementById('campo_p10');
    var err = document.getElementById('err_p10');

    if(val === "") {
        inp.style.borderColor = "gray";
        err.innerHTML = "Debe elegir una fecha.";
        return false;
    }

    var partes = val.split('-');
    var fecha_inicio = new Date(partes[0], partes[1] - 1, partes[2]);
    var hoy = new Date();
    
    //lo ponemos en 0 para poder comparar
    hoy.setHours(0,0,0,0);

    // si la fecha ingresada es mayor a hoy, es futura y no se puede mostramos el error
    if(fecha_inicio > hoy) {
        inp.style.borderColor = "red";
        err.innerHTML = "La fecha no puede ser en el futuro.";
        return false;
    }

    inp.style.borderColor = "green";
    err.innerHTML = "";
    return true;
}
