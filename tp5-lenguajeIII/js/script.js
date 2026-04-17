const form = document.getElementById('formulario');
const formResult = document.getElementById('formResult');

//asignacion de los campos
const fields = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'apellido', label: 'Apellido' },
    { id: 'email', label: 'Email' },
    { id: 'fecha', label: 'Fecha de Nacimiento' },
    { id: 'password', label: 'Contraseña' },
    { id: 'confirmPassword', label: 'Confirmar contraseña' }
];

const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;  //vocales, espacios en blanco, no contenga caracteres especiales como por ejemplo ¡!¿?

function setError(input, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    const feedback = input.nextElementSibling;
    if (feedback) feedback.textContent = message;
}

function clearError(input) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    const feedback = input.nextElementSibling;
    if (feedback) feedback.textContent = '';
}

function validateField(id) {
    const input = document.getElementById(id);
    const value = input.value.trim();
    
    let valid = true;
    let message = '';

    if (value === '') {
        valid = false;
        message = 'Este campo es obligatorio.';
    } else {
        switch (id) {
            case 'nombre':
            case 'apellido':
                if (value.length <= 3) {
                    valid = false;
                    message = 'Debe tener más de 3 caracteres.';
                } else if (!regexTexto.test(value)) {
                    valid = false;
                    message = 'Solo se permiten letras.';
                }
                break;
                
            case 'email':
                //validamos que sea si o si el @ucasal.edu.ar y aunque diga ucasal.edu.ar que tenga el @ en el correo
                if (!value.includes('@')) { //que tenga el arroba
                    valid = false;
                    message = 'Falta el símbolo "@".';
                } else if (!value.endsWith('@ucasal.edu.ar')) { //que contenga explicitamente el @ucasal.edu.ar con @ si o si
                    valid = false;
                    message = 'El correo debe terminar en @ucasal.edu.ar';
                }
                break;
                
            case 'fecha':
                const [añoNac, mesNac, diaNac] = value.split('-');
                const fechaNacimiento = new Date(añoNac, mesNac - 1, diaNac);
                const hoy = new Date();
                
                let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
                const diferenciaMes = hoy.getMonth() - fechaNacimiento.getMonth();
                
                if (diferenciaMes < 0 || (diferenciaMes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
                    edad--;
                }

                if (edad <= 18) { //validacion de mayor igual a 18 años
                    valid = false;
                    message = 'Debes ser mayor de 18 años.';
                } else if (edad >= 40) { //validacion de menor igual a 40 años
                    valid = false;
                    message = 'Debes tener menos de 40 años.';
                }
                break;
                
            case 'password':
                if (value.length < 6) { //validacion de cant de caracteres en la contraseña
                    valid = false;
                    message = 'La contraseña debe tener al menos 6 caracteres.';
                }
                break;
                
            case 'confirmPassword': //comparar para ver si son iguales o no
                const password = document.getElementById('password').value;
                if (value !== password) {
                    valid = false;
                    message = 'Las contraseñas no coinciden.';
                }
                break;
        }
    }

    if (valid) {
        clearError(input);
    } else {
        setError(input, message);
    }
    
    return valid;
}

// comprobacion en vivo
fields.forEach(field => {
    const input = document.getElementById(field.id);
    input.addEventListener('input', () => validateField(field.id));
});

form.addEventListener('submit', function (e) {
    e.preventDefault(); 
    
    formResult.className = 'alert d-none';
    formResult.textContent = '';
    
    const allValid = fields.every(field => validateField(field.id));
    
    if (!allValid) {
        formResult.className = 'alert alert-danger py-2';
        formResult.textContent = 'Corrige los errores antes de enviar.';
        return; 
    }
    
    formResult.className = 'alert alert-success py-2';
    formResult.textContent = 'Formulario enviado correctamente.';
    
    form.reset();
    fields.forEach(field => {
        const input = document.getElementById(field.id);
        input.classList.remove('is-valid'); 
    });
});