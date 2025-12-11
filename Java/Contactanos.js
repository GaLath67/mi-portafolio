const btnMenu = document.getElementById('btnMenu');
    const navegacion = document.getElementById('navegacion');

    btnMenu.addEventListener('click', () => {
        navegacion.classList.toggle('open');
    });


    document.querySelectorAll('#opcionesBar a').forEach(link => {
        link.addEventListener('click', () => {
            navegacion.classList.remove('open');
        });
    });