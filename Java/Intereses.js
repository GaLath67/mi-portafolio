document.addEventListener('DOMContentLoaded', () => {
    const menuInt = document.getElementById('menuInt');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    function cargarFavoritos() {
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

        menuInt.innerHTML = ''; 

        if (favoritos.length === 0) {
            menuInt.innerHTML = `
                <div style="width:100%; text-align:center; padding:60px 20px; color:#aaa; font-size:18px;">
                    Aún no tienes autos favoritos
                </div>`;
            return;
        }

        favoritos.forEach((fav, index) => {
            const item = document.createElement('div');
            item.classList.add('interesItem');
            item.style.cursor = 'pointer';
            item.title = 'Haz clic para ver este auto';


            item.addEventListener('click', () => {
                sessionStorage.setItem('autoSeleccionado', JSON.stringify(fav));
                window.location.href = 'Buscar.html';
            });

            const imgDiv = document.createElement('div');
            imgDiv.classList.add('imgInteres');
            imgDiv.style.backgroundImage = `url('${fav.url}')`;
            imgDiv.style.backgroundSize = 'cover';
            imgDiv.style.backgroundPosition = 'center';
            imgDiv.style.borderRadius = '8px';

            const nombre = document.createElement('p');
            nombre.textContent = fav.nombre;
            nombre.style.marginTop = '10px';
            nombre.style.color = '#333';
            nombre.style.fontWeight = '600';


            const btnQuitar = document.createElement('button');
            btnQuitar.textContent = 'Quitar';
            btnQuitar.style.cssText = `
                margin-top: 8px;
                padding: 6px 14px;
                background: #000000ff;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 13px;
                transition: 0.2s;
            `;
            btnQuitar.onmouseover = () => btnQuitar.style.background = '#6174e0ff';
            btnQuitar.onmouseout = () => btnQuitar.style.background = '#0c074dff';

            btnQuitar.onclick = (e) => {
                e.stopPropagation(); 
                favoritos.splice(index, 1);
                localStorage.setItem('favoritos', JSON.stringify(favoritos));
                cargarFavoritos();
            };

            item.appendChild(imgDiv);
            item.appendChild(nombre);
            item.appendChild(btnQuitar);
            menuInt.appendChild(item);
        });
    }

    const scrollAmount = 220;
    prevBtn.addEventListener('click', () => {
        menuInt.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        menuInt.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    cargarFavoritos();
});

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