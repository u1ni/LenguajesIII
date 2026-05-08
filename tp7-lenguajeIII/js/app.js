let paginaActual = 1;
let busquedaActiva = "";
const urlBase = 'https://rickandmortyapi.com/api/character';

// Elementos del DOM
const contenedor = document.getElementById('contenedor-personajes');
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const inputBusqueda = document.getElementById('inputBusqueda');
const btnBuscar = document.getElementById('btnBuscar');
const errorMsg = document.getElementById('errorBusqueda');

// Nuevos elementos para la paginación con Select
const selectPagina = document.getElementById('selectPagina');
const totalPaginasSpan = document.getElementById('totalPaginas');

async function cargarPersonajes(pagina = 1, nombre = "") {
    let url = `${urlBase}/?page=${pagina}`;
    
    // Si hay un nombre en el buscador, lo sumamos a la URL
    if (nombre) {
        url += `&name=${nombre}`;
    }

    try {
        const respuesta = await fetch(url);
        
        if (!respuesta.ok) throw new Error("No se encontraron resultados");
        
        const datos = await respuesta.json();
        errorMsg.classList.add('d-none');
        renderizarTarjetas(datos.results);
        actualizarControles(datos.info);
        
    } catch (error) {
        console.error("Error:", error);
        contenedor.innerHTML = "";
        errorMsg.classList.remove('d-none');
        document.getElementById('paginacion').classList.add('d-none'); // Ocultar paginación si hay error
    }
}

// Función especial para buscar por ID directamente
async function buscarPorId(id) {
    try {
        const respuesta = await fetch(`${urlBase}/${id}`);
        if (!respuesta.ok) throw new Error("ID no encontrado");
        const personaje = await respuesta.json();
        
        errorMsg.classList.add('d-none');
        renderizarTarjetas([personaje]); 
        
        // Ocultamos la paginación porque estamos viendo un solo resultado
        document.getElementById('paginacion').classList.add('d-none');
    } catch (error) {
        errorMsg.classList.remove('d-none');
        contenedor.innerHTML = "";
        document.getElementById('paginacion').classList.add('d-none');
    }
}

function renderizarTarjetas(personajes) {
    contenedor.innerHTML = "";
    
    personajes.forEach(personaje => {
        let badgeColor = 'bg-secondary';
        if (personaje.status === 'Alive') badgeColor = 'bg-success';
        if (personaje.status === 'Dead') badgeColor = 'bg-danger';

        const tarjetaHTML = `
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm border-0">
                    <img src="${personaje.image}" class="card-img-top" alt="${personaje.name}">
                    <div class="card-body text-center">
                        <small class="text-muted">#${personaje.id}</small>
                        <h5 class="card-title fw-bold mt-1">${personaje.name}</h5>
                        <span class="badge ${badgeColor} mb-3">${personaje.status}</span>
                        <div class="small">
                            <p class="mb-1"><strong>Especie:</strong> ${personaje.species}</p>
                            <p class="mb-0 text-truncate"><strong>Origen:</strong> ${personaje.origin.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjetaHTML;
    });
}

function actualizarControles(info) {
    document.getElementById('paginacion').classList.remove('d-none');
    
    // Limpiamos el select por si tenía opciones de una búsqueda anterior
    selectPagina.innerHTML = '';
    
    // Bucle para crear dinámicamente las opciones (<option>) desde 1 hasta el total de páginas
    for (let i = 1; i <= info.pages; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        
        // Dejamos seleccionada la página en la que estamos actualmente
        if (i === paginaActual) {
            option.selected = true;
        }
        
        selectPagina.appendChild(option);
    }
    
    // Actualizamos el texto que dice "de X"
    totalPaginasSpan.textContent = info.pages;
    
    // Mostramos u ocultamos botones según si hay más páginas (para la 1 oculta "Anterior")
    btnAnterior.classList.toggle('d-none', !info.prev);
    btnSiguiente.classList.toggle('d-none', !info.next);
}

// Manejo de búsqueda
function manejarBusqueda() {
    const valor = inputBusqueda.value.trim();
    paginaActual = 1; // Volvemos a la 1 al buscar algo nuevo

    if (!valor) {
        busquedaActiva = "";
        cargarPersonajes(1);
        return;
    }

    if (!isNaN(valor)) {
        buscarPorId(valor);
    } else {
        busquedaActiva = valor;
        cargarPersonajes(1, valor);
    }
}

// ==========================================
// LISTENERS (Eventos)
// ==========================================

btnBuscar.addEventListener('click', manejarBusqueda);
inputBusqueda.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') manejarBusqueda();
});

btnSiguiente.addEventListener('click', () => {
    paginaActual++;
    cargarPersonajes(paginaActual, busquedaActiva);
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

btnAnterior.addEventListener('click', () => {
    if (paginaActual > 1) {
        paginaActual--;
        cargarPersonajes(paginaActual, busquedaActiva);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// NUEVO: Evento para detectar cuando el usuario cambia la página desde el desplegable
selectPagina.addEventListener('change', function(e) {
    // Tomamos el valor que el usuario eligió y lo convertimos a número
    paginaActual = parseInt(e.target.value); 
    cargarPersonajes(paginaActual, busquedaActiva);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scrolleo hacia arriba
});

// Carga inicial
cargarPersonajes();