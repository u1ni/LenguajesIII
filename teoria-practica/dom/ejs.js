
// Arrays

document.getElementById('btn-ejecutar-arrays').addEventListener('click', () => {

    // filtrar pares
    const arrNumeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const pares = arrNumeros.filter(num => num % 2 === 0);
    console.log("Números Pares:", pares);

    // eliminar duplicados
    const arrConDuplicados = [10, 10, 20, 30, 30, 40, 50, 50];
    const sinDuplicados = [...new Set(arrConDuplicados)];
    console.log("Sin duplicados:", sinDuplicados);

    // ordenar alfabéticamente
    const arrNombres = ["Lautaro", "Santi", "Anto", "Juan", "Lu"];
    // .slice() para crear una copia y no modificar el original
    const nombresOrdenados = arrNombres.slice().sort(); 
    console.log("Nombres ordenados:", nombresOrdenados);

    // sumar elementos
    const arrPrecios = [15000, 8500, 25500];
    const totalSuma = arrPrecios.reduce((acumulador, num) => acumulador + num, 0);
    console.log("Suma total:", totalSuma);

    // buscar elemento ( que esta en el índice)
    const marcas = ["Oreo", "Chocolinas", "Pepitos"];
    const indice = marcas.indexOf("Pepitos");
    console.log("Índice buscado:", indice);
});

// Dom

document.getElementById('btn-lista').addEventListener('click', () => {
    //crear lista dinámica
    const nombres = ["Santi", "Lucas", "Juan", "Lautaro"];
    const ul = document.getElementById('lista-nombres');
    
    ul.innerHTML = ""; // para que si se hacen multiples clicks no se siga repitiendo la lista porque si no esta la lsita se mostrara una abajo de la otra hasta que el usuario deje de hacer clicks
    
    nombres.forEach(nombre => {
        const li = document.createElement('li');
        li.textContent = nombre;
        ul.appendChild(li);
    });
});

// modificar contenido por ID
document.getElementById('btn-modificar-texto').addEventListener('click', () => {
    const parrafo = document.getElementById('texto-objetivo');
    parrafo.innerText = "cambiado chau chau 456 456 456 456";
    parrafo.style.color = "blue"; //efecto visual que cambia de color el texto 
});

// agregar o quitar clases
document.getElementById('caja-interactiva').addEventListener('click', function() {

    this.classList.toggle('caja-activa');      // cambiar el css
    
    if (this.classList.contains('caja-activa')) {     // cambiar el texto si esta activo o no

        this.innerText = "click para desactivar";
    } else {
        this.innerText = "click para activar";
    }
});

// formulario dinámico
const datosGuardados = [];
const formulario = document.getElementById('formulario-datos');

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault(); // evitamos que la página se recargue para no perder las cosas escritas en el formulario
    
    const input = document.getElementById('input-nuevo-dato');
    const valor = input.value.trim(); // .trim() para sacar los espacios en blanco si el usuario ingresa "hola " se guarda "hola"
    
    if (valor !== "") {
        datosGuardados.push(valor); // guardamos en el array
        document.getElementById('salida-array').innerText = JSON.stringify(datosGuardados); // mostrar
        input.value = ""; // vaciar el input para que el usuario pueda ingresar otro dato si quiere sin tener que hacer que borre lo que escribio antes y ademas sin refrescar
    }
});

// Generación de tarjetas
document.getElementById('btn-generar-tarjetas').addEventListener('click', () => {
    const productos = [
        { 
            nombre: "Teclado Mecánico 75%", 
            precio: 104000, 
            img: "https://noaweb.com.ar/wp-content/uploads/2026/03/17748830300d04eea3d94c4823df60c5331d2a67a3.jpg" 
        },
        { 
            nombre: "Mouse Inalámbrico", 
            precio: 47100, 
            img: "https://spacegamer.com.ar/img/Public/1058/19245-producto-1.jpg" 
        },
        { 
            nombre: "Monitor 27 pulgadas curvo", 
            precio: 165000, 
            img: "https://www.gamerspoint.com.ar/wp-content/uploads/Monitor-Samsung-27-Curvo-F390-60hz-1920-X-1080.png" 
        }
    ];

    const contenedor = document.getElementById('contenedor-tarjetas');
    contenedor.innerHTML = ""; // lo mismo que en la lista de nombres para que no se repitan si seguimos apretando el boton
    
    productos.forEach(prod => {
        // template/base para cargar en html
        const tarjetaHTML = `
            <div class="tarjeta">
                <img src="${prod.img}" alt="${prod.nombre}">
                <h4>${prod.nombre}</h4>
                <p class="precio">$${prod.precio.toLocaleString('es-AR')}</p>
            </div>
        `;
        contenedor.innerHTML += tarjetaHTML;
    });
});