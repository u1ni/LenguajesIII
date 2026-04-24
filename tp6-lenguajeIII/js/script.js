// Variable global para controlar si creamos una tarea nueva o editamos una existente
let filaEnEdicion = null;
let tablaOrigenEdicion = null; // Para saber si editamos desde Pendientes o Completadas
let nombreArchivoActivo = ""; // Memoria temporal para el archivo PDF
let urlArchivoActivo = ""; // Memoria temporal para los datos del archivo en Base64

$(document).ready(function() {
    
    //inicializar el datatables
    let configDataTables = {
        language: { url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' },
        pageLength: 5,
        lengthMenu: [5, 10, 25]
    };

    let tabla = $('#tablaTareas').DataTable(configDataTables);
    let tablaCompletadas = $('#tablaCompletadas').DataTable(configDataTables);

    //calendario y recordatorios
    function actualizarRecordatorios() {
        let tareas = tabla.rows().data().toArray();
        let lista = $('#listaRecordatorios');
        lista.empty();

        // Extraer tareas con fecha, ordenarlas y mostrarlas
        let tareasConFecha = tareas.filter(t => t[2] !== "").map(t => {
            return { nombre: t[0], fecha: new Date(t[2]), fechaStr: t[2] };
        }).sort((a, b) => a.fecha - b.fecha);

        if (tareasConFecha.length === 0) {
            lista.append('<li class="list-group-item text-center text-muted">Sin vencimientos próximos</li>');
        } else {
            // Mostrar solo las primeras 5
            tareasConFecha.slice(0, 5).forEach(t => {
                let hoy = new Date();
                hoy.setHours(0,0,0,0);
                let color = t.fecha < hoy ? 'text-danger fw-bold' : 'text-primary';
                let icon = t.fecha < hoy ? '⚠️' : '📌';
                
                lista.append(`<li class="list-group-item d-flex justify-content-between align-items-center">
                    <span>${icon} ${t.nombre}</span>
                    <span class="${color}">${t.fechaStr.split('-').reverse().join('/')}</span>
                </li>`);
            });
        }
    }

    
    //modo oscuro-claro
    
    if (localStorage.getItem('tp6_dark_mode') === 'true') {
        $('body').addClass('dark-mode');
        $('#btnDarkMode').text('Modo Claro').removeClass('btn-dark').addClass('btn-light');
    }

    $('#btnDarkMode').click(function() {
        $('body').toggleClass('dark-mode');
        let esOscuro = $('body').hasClass('dark-mode');
        localStorage.setItem('tp6_dark_mode', esOscuro);

        if(esOscuro) {
            $(this).text('Modo Claro').removeClass('btn-dark').addClass('btn-light');
        } else {
            $(this).text('Modo Oscuro').removeClass('btn-light').addClass('btn-dark');
        }
    });

    //funcion para guardar los datos de la tabla
    function guardarEnLocalStorage() {
        let datosPendientes = tabla.rows().data().toArray();
        let datosCompletadas = tablaCompletadas.rows().data().toArray();
        
        let datosTotales = {
            pendientes: datosPendientes,
            completadas: datosCompletadas
        };
        
        try {
            localStorage.setItem('tp6_tareas_proyecto', JSON.stringify(datosTotales));
        } catch (e) {
            alert("⚠️ El archivo PDF es demasiado pesado para la memoria local. Intenta con uno más ligero.");
        }
        actualizarRecordatorios();
    }

    //lee el json
    function cargarDesdeLocalStorage() {
        let datosGuardados = localStorage.getItem('tp6_tareas_proyecto');
        if (datosGuardados) {
            try {
                let db = JSON.parse(datosGuardados);
                
                
                // Si se detectan datos de la versión anterior se descartan asi no causan errores
                if (Array.isArray(db) || (db.pendientes && db.pendientes.length > 0 && db.pendientes[0].length !== 6)) {
                    localStorage.removeItem('tp6_tareas_proyecto');
                    console.log("Limpieza de base de datos antigua exitosa.");
                    return;  
                }

                if(db.pendientes) tabla.rows.add(db.pendientes).draw();
                if(db.completadas) tablaCompletadas.rows.add(db.completadas).draw();
            } catch(e) {
                console.log("Estructura de datos antigua, ignora este error si recién actualizaste.");
            }
        }
        actualizarRecordatorios();
    }

    //ejec carga inicial
    cargarDesdeLocalStorage();

    // Convertir archivo PDF a Base64
    $('#archivo').on('change', function() {
        let file = this.files[0];
        if (file) {
            nombreArchivoActivo = file.name;
            let reader = new FileReader();
            reader.onload = function(e) {
                urlArchivoActivo = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            nombreArchivoActivo = "";
            urlArchivoActivo = "";
        }
    });

    // Eliminar archivo cargado en memoria temporal
    $('#btnQuitarArchivo').click(function() {
        nombreArchivoActivo = "";
        urlArchivoActivo = "";
        $('#archivoActualContainer').addClass('d-none');
        $('#archivo').val('');
    });

    //agregar y act
    $('#btnAccion').click(function() {
        let nombreTarea = $('#tarea').val().trim();
        let nivelPrioridad = $('#prioridad').val();
        let fecha = $('#fechaLimite').val();
        let notas = $('#notas').val().trim();

        //validamos de que tenga nombre
        if (nombreTarea === "") {
            alert("El nombre de la tarea es obligatorio.");
            return;
        }

        // Manejo del archivo PDF
        let linkArchivo = '-';
        if (nombreArchivoActivo && urlArchivoActivo) {
            // Creamos un link <a> real que se abre en otra pestaña
            linkArchivo = `<a href="${urlArchivoActivo}" target="_blank" class="badge bg-secondary text-decoration-none">📄 ${nombreArchivoActivo}</a>`;
        } else if (nombreArchivoActivo) {
            linkArchivo = `<span class="badge bg-secondary">📄 ${nombreArchivoActivo}</span>`;
        }
        
        let textoNotas = notas ? notas : '-';

        // formateamos la prioridad con color para la tabla asi queda acorde con los colores de la seleccion de la lista
        let prioridadFormateada = '';
        if (nivelPrioridad === 'Alta') {
            prioridadFormateada = '<span class="text-danger fw-bold">Alta</span>';
        } else if (nivelPrioridad === 'Media') {
            prioridadFormateada = '<span class="text-warning fw-bold">Media</span>';
        } else if (nivelPrioridad === 'Baja') {
            prioridadFormateada = '<span class="text-success fw-bold">Baja</span>';
        }

        let botonesPendiente = `
            <button class="btn btn-success btn-sm btn-tabla completar">Listo</button>
            <button class="btn btn-warning btn-sm btn-tabla editar">Editar</button>
            <button class="btn btn-danger btn-sm eliminar">Eliminar</button>
        `;

        if (filaEnEdicion) {
            //editor
            // Recuperar qué botones usar dependiendo de la tabla origen
            let botonesUsar = tablaOrigenEdicion === tablaCompletadas 
                ? `<button class="btn btn-secondary btn-sm btn-tabla pendiente">Restaurar</button>
                   <button class="btn btn-warning btn-sm btn-tabla editar">Editar</button>
                   <button class="btn btn-danger btn-sm eliminar">Eliminar</button>` 
                : botonesPendiente;

            tablaOrigenEdicion.row(filaEnEdicion).data([nombreTarea, prioridadFormateada, fecha, textoNotas, linkArchivo, botonesUsar]).draw();
            
            //resetea la edicion y el estado
            filaEnEdicion = null;
            tablaOrigenEdicion = null;
            nombreArchivoActivo = "";
            urlArchivoActivo = "";
            $('#archivoActualContainer').addClass('d-none');
            $(this).text('Agregar').removeClass('btn-success').addClass('btn-primary');
            
        } else {
            //agregamos nueva tarea - agrega nueva fila a la tabla (Pendiente por defecto)
            let nuevaFila = tabla.row.add([nombreTarea, prioridadFormateada, fecha, textoNotas, linkArchivo, botonesPendiente]).draw().node();
            
            //anim de fade in cuando se crea la tarea para que aparezca de forma suave y no de golpe
            $(nuevaFila).hide().fadeIn(600);
            nombreArchivoActivo = "";
            urlArchivoActivo = "";
        }

        //sinc con localstorage
        guardarEnLocalStorage();

        //limpiamos
        $('#tarea').val('');
        $('#fechaLimite').val('');
        $('#archivo').val('');
        $('#notas').val('');
        $('#prioridad').val('Media').trigger('change');
        $('#tarea').focus();
    });

    //declaramos los eventos de los botones (APLICA A AMBAS TABLAS)
    $('#tablaTareas tbody, #tablaCompletadas tbody').on('click', '.eliminar', function() {
        let fila = $(this).closest('tr');
        let tablaActual = $(this).closest('table').attr('id') === 'tablaTareas' ? tabla : tablaCompletadas;
        
        //fadeout para que desaparezca suavemente
        fila.fadeOut(500, function() {
            tablaActual.row(fila).remove().draw();
            
            //sinc con localstorage
            guardarEnLocalStorage();
        });
    });

    // marcar como completada
    $('#tablaTareas tbody').on('click', '.completar', function() {
        let fila = $(this).closest('tr');
        let datos = tabla.row(fila).data();
        
        // Cambiar botones para la tabla de completadas (Botón Deshacer)
        datos[5] = `
            <button class="btn btn-secondary btn-sm btn-tabla pendiente" title="Volver a Pendiente">Restaurar</button>
            <button class="btn btn-warning btn-sm btn-tabla editar">Editar</button>
            <button class="btn btn-danger btn-sm eliminar">Eliminar</button>
        `;

        fila.fadeOut(400, function() {
            tabla.row(fila).remove().draw();
            tablaCompletadas.row.add(datos).draw();
            guardarEnLocalStorage();
        });
    });

    // deshacer para volver a pendiente
    $('#tablaCompletadas tbody').on('click', '.pendiente', function() {
        let fila = $(this).closest('tr');
        let datos = tablaCompletadas.row(fila).data();
        
        // Restaurar botones originales
        datos[5] = `
            <button class="btn btn-success btn-sm btn-tabla completar">Listo</button>
            <button class="btn btn-warning btn-sm btn-tabla editar">Editar</button>
            <button class="btn btn-danger btn-sm eliminar">Eliminar</button>
        `;

        fila.fadeOut(400, function() {
            tablaCompletadas.row(fila).remove().draw();
            tabla.row.add(datos).draw();
            guardarEnLocalStorage();
        });
    });

    //editar
    $('#tablaTareas tbody, #tablaCompletadas tbody').on('click', '.editar', function() {
        let fila = $(this).closest('tr');
        let idTabla = $(this).closest('table').attr('id');
        tablaOrigenEdicion = idTabla === 'tablaTareas' ? tabla : tablaCompletadas;
        
        let datos = tablaOrigenEdicion.row(fila).data();

        // Extraemos el texto limpio de la prioridad (sin el HTML del span)
        let prioridadLimpia = $('<div>').html(datos[1]).text();

        //completar el formulario con los datos del usuario
        $('#tarea').val(datos[0]);
        $('#prioridad').val(prioridadLimpia).trigger('change');
        $('#fechaLimite').val(datos[2]);
        $('#notas').val(datos[3] !== '-' ? datos[3] : '');

        // Manejar el visualizador del archivo actual extrayendo el href
        if (datos[4] !== '-') {
            let $elementoArchivo = $(datos[4]);
            nombreArchivoActivo = $elementoArchivo.text().replace('📄 ', '');
            
            if ($elementoArchivo.is('a')) {
                urlArchivoActivo = $elementoArchivo.attr('href');
                $('#archivoTexto').attr('href', urlArchivoActivo);
            } else {
                urlArchivoActivo = "";
                $('#archivoTexto').removeAttr('href');
            }

            $('#archivoTexto').text('📄 ' + nombreArchivoActivo);
            $('#archivoActualContainer').removeClass('d-none');
        } else {
            nombreArchivoActivo = "";
            urlArchivoActivo = "";
            $('#archivoActualContainer').addClass('d-none');
        }

        //guardamos y el boton cambia
        filaEnEdicion = fila;
        $('#btnAccion').text('Actualizar').removeClass('btn-primary').addClass('btn-success');
        
        // Scrollear arriba suavemente para editar
        $('html, body').animate({ scrollTop: 0 }, 'fast');
    });

    //estetica 
    $('#titulo').on('mouseenter', function() {
        if(!$('body').hasClass('dark-mode')) {
            $(this).css({ 'color': '#0d6efd', 'transform': 'scale(1.02)' });
        }
    }).on('mouseleave', function() {
        if(!$('body').hasClass('dark-mode')) {
            $(this).css({ 'color': '#2c3e50', 'transform': 'scale(1)' });
        }
    });

    //efecto focus
    $('#tarea, #notas, #archivo, #fechaLimite').on('focus', function() {
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