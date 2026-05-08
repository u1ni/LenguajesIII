// 1 para que funcione tenemos que trabajar don el dom entonces capturamos/obtemenos los elementos
const inputNumero = document.getElementById('numeroInput');
const divResultado = document.getElementById('resultado');
const btnDoble = document.getElementById('btnDoble');
const btnFactorial = document.getElementById('btnFactorial');
const btnPrimo = document.getElementById('btnPrimo');

// 2 y 3 mensajes sin usar conssole.log para que el usuario pueda leerlos sin tener que abrir el f12
// muestra mensajes en el div de resultados sin recargar la página
function mostrarResultado(mensaje) {
    divResultado.textContent = mensaje;
}

// valida que el usuario haya ingresado un número y no otra cosa
function obtenerNumeroValido() {
    const valor = inputNumero.value.trim(); // .trim() elimina espacios en blanco
    
    // validacion de campo vacio ademas solo va a tomar los numeros no letras ni simbolos
    if (valor === "") {
        mostrarResultado("Error: Por favor, ingresa un número.");
        return null;
    }
    
    const numero = parseInt(valor); // lo que ingresamos esta en forma de texto entonces lo pasamos a int (numero entero)
    
    return numero;
}

// calcular el doble del ingresado
btnDoble.addEventListener('click', function() {
    const num = obtenerNumeroValido();
    
    if (num !== null) {
        const doble = num * 2;
        mostrarResultado(`El doble de ${num} es ${doble}`); // mostramos el resultado dentro del div con la funcion que usamos arriba para mostrar si lo ingresado esta correcto
    }
});

// calcular el factorial
btnFactorial.addEventListener('click', function() {
    const num = obtenerNumeroValido();
    
    if (num !== null) {
        // el factorial no existe para los numeros negativos entonces si es negativo no hay factorial
        if (num < 0) {
            mostrarResultado("Error: No existe el factorial de números negativos.");
            return;
        }
        
        let factorial = 1;
        // el bucle factorial es multiplicar el numerod esde el 1 hasta el numero que el usuario ingreso
        for (let i = 1; i <= num; i++) {
            factorial *= i;
        }
        
        mostrarResultado(`El factorial de ${num} es ${factorial}`);
    }
});

// determinar si es Primo
btnPrimo.addEventListener('click', function() {
    const num = obtenerNumeroValido();
    
    if (num !== null) {
        // nums menores o iguales a 1 no son primos
        if (num <= 1) {
            mostrarResultado(`${num} no es primo`);
            return;
        }
        
        let esPrimo = true;
        // comprobar si tiene divisor 2 hasta llegar a la base del numero lo que seria el modulo
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                esPrimo = false; // si se encuentra un divisor no es primo
                break;
            }
        }
        
        if (esPrimo) {
            mostrarResultado(`${num} es primo`);
        } else {
            mostrarResultado(`${num} no es primo`);
        }
    }
});