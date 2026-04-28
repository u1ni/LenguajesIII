async function obtenerPersonajes() {
    const url = 'https://rickandmortyapi.com/api/character';
    const contenedor = document.getElementById('contenedor-personajes');

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        
        contenedor.innerHTML = "";

        // primeros 12 para no cargar todos por ejemplo
        const primeros12 = datos.results.slice(0, 12);
        primeros12.forEach(personaje => {
            
            // color del estado de vida
            let badgeColor = 'bg-secondary';
            if (personaje.status === 'Alive') badgeColor = 'bg-success'; //verde
            if (personaje.status === 'Dead') badgeColor = 'bg-danger'; //rojo

            
            // base de la tarjeta universal para cada uno de los personajes mediante el json y col-lg-3 para poner cuatro por fila en pc
            const tarjetaHTML = `
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="card h-100 shadow-sm border-0">
                        <img src="${personaje.image}" class="card-img-top" alt="${personaje.name}">
                        <div class="card-body text-center">
                            <h5 class="card-title fw-bold">${personaje.name}</h5>
                            <span class="badge ${badgeColor} mb-3">${personaje.status}</span>
                            <p class="card-text mb-1"><small class="text-muted fw-bold">Especie:</small><br>${personaje.species}</p>
                            <p class="card-text mb-1"><small class="text-muted fw-bold">Género:</small><br>${personaje.gender}</p>
                            <p class="card-text"><small class="text-muted fw-bold">Origen:</small><br>${personaje.origin.name}</p>
                        </div>
                    </div>
                </div>
            `;
            
            //sumar la tarjeta al html
            contenedor.innerHTML += tarjetaHTML;
        });

        //para el manejo de errores
    } catch (error) {
        console.error("Hubo un error al obtener los datos de la api:", error); // por consola
        contenedor.innerHTML = "<p class='text-center text-danger w-100 fw-bold'>Error al cargar los personajes.</p>"; //mensaje en el html
    }
}

//para no tener que hacer clic sobre un boton para que haga un get a la api su no quer se ejecute solo al entrar a la pagina
obtenerPersonajes();