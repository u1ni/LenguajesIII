// Variable global para controlar si creamos una tarea nueva o editamos una existente
let filaEnEdicion = null;

$(document).ready(function() {
    
//inicializar el datatables
    let tabla = $('#tablaTareas').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' 
        }
    });

//funcion para guardar los datos de la tabla
    function guardarEnLocalStorage() {
        let datosActuales = tabla.rows().data().toArray();
        localStorage.setItem('tp6_tareas_proyecto', JSON.stringify(datosActuales));
    }

//lee el json
    function cargarDesdeLocalStorage() {
        let datosGuardados = localStorage.getItem('tp6_tareas_proyecto');
        if (datosGuardados) {
            let arrayReconstruido = JSON.parse(datosGuardados);
            tabla.rows.add(arrayReconstruido).draw();
        }
    }

//ejec carga inicial
    cargarDesdeLocalStorage();

//agregar y act
    $('#btnAccion').click(function() {
        let nombreTarea = $('#tarea').val().trim();
        let nivelPrioridad = $('#prioridad').val();

        //validamos de que tenga nombre
        if (nombreTarea === "") {
            alert("El nombre de la tarea es obligatorio.");
            return;
        }

        // formateamos la prioridad con color para la tabla asi queda acorde con los colores de la seleccion de la lista
        let prioridadFormateada = '';
        if (nivelPrioridad === 'Alta') {
            prioridadFormateada = '<span class="text-danger fw-bold">Alta</span>';
        } else if (nivelPrioridad === 'Media') {
            prioridadFormateada = '<span class="text-warning fw-bold">Media</span>';
        } else if (nivelPrioridad === 'Baja') {
            prioridadFormateada = '<span class="text-success fw-bold">Baja</span>';
        }

        let botones = `
            <button class="btn btn-warning btn-sm btn-tabla editar">Editar</button>
            <button class="btn btn-danger btn-sm eliminar">Eliminar</button>
        `;

        if (filaEnEdicion) {
            //editor
            tabla.row(filaEnEdicion).data([nombreTarea, prioridadFormateada, botones]).draw();
            
            //resetea la edicion y el estado
            filaEnEdicion = null;
            $(this).text('Agregar').removeClass('btn-success').addClass('btn-primary');
            
        } else {
            //agregamos nueva tarea - agrega nueva fila a la tabla
            let nuevaFila = tabla.row.add([nombreTarea, prioridadFormateada, botones]).draw().node();
            
            //anim de fade in cuando se crea la tarea para que aparezca de forma suave y no de golpe
            $(nuevaFila).hide().fadeIn(600);
        }

        //sinc con localstorage
        guardarEnLocalStorage();

        //limpiamos
        $('#tarea').val('').focus();
        $('#prioridad').val('Media').trigger('change');
    });

//declaramos los eventos de los botones

    $('#tablaTareas tbody').on('click', '.eliminar', function() {
        let fila = $(this).closest('tr');
        
        //fadeout para que desaparezca suavemente
        fila.fadeOut(500, function() {
            tabla.row(fila).remove().draw();
            
            //sinc con localstorage
            guardarEnLocalStorage();
        });
    });

    //editar
    $('#tablaTareas tbody').on('click', '.editar', function() {
        let fila = $(this).closest('tr');
        let datos = tabla.row(fila).data();

        // Extraemos el texto limpio de la prioridad (sin el HTML del span)
        let prioridadLimpia = $('<div>').html(datos[1]).text();

        //completar el formulario con los datos del usuario
        $('#tarea').val(datos[0]);
        $('#prioridad').val(prioridadLimpia).trigger('change');

        //guardamos y el boton cambia
        filaEnEdicion = fila;
        $('#btnAccion').text('Actualizar').removeClass('btn-primary').addClass('btn-success');
    });

    //estetica 
    $('#titulo').on('mouseenter', function() {
        $(this).css({
            'color': '#0d6efd',
            'transform': 'scale(1.02)'
        });
    }).on('mouseleave', function() {
        $(this).css({
            'color': '#2c3e50',
            'transform': 'scale(1)'
        });
    });

    //efecto focus
    $('#tarea').on('focus', function() {
        $(this).addClass('input-focus-custom');
    }).on('blur', function() {
        $(this).removeClass('input-focus-custom');
    });

    //cambio del color dinamico
    $('#prioridad').change(function() {
        let valor = $(this).val();
        $(this).removeClass('text-danger text-warning text-success fw-bold'); 

        if (valor === 'Alta') {
            $(this).addClass('text-danger fw-bold');
        } else if (valor === 'Media') {
            $(this).addClass('text-warning fw-bold');
        } else if (valor === 'Baja') {
            $(this).addClass('text-success fw-bold');
        }
    });
});