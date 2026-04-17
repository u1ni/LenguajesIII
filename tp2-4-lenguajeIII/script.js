document.addEventListener('DOMContentLoaded', function() {
    const btnIngresar = document.getElementById('btnIngresar');
    const pantallaIntro = document.getElementById('pantallaIntro');
    const musica = document.getElementById('musicaFondo');

    btnIngresar.addEventListener('click', function() {
        pantallaIntro.classList.add('oculto');
        musica.volume = 0.3; 
        musica.play();
    });
});