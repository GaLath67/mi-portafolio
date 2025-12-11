const inpBusc = document.getElementById('inpBusc');
const inpModelo = document.getElementById('inpModelo');
const AutoAPI = document.getElementById('AutoAPI');
const listaDatos = document.getElementById('listaDatos');
const meGustaBtn = document.getElementById('meGusta');

let autoActual = {
    nombre: '',
    url: ''
};


function actualizarDatosAuto() {
    const marca = inpBusc.value.trim();
    const modelo = inpModelo.value.trim();

    autoActual.nombre = modelo ? marca + ' ' + modelo : marca;


    const bg = AutoAPI.style.backgroundImage;
    if (bg && bg !== 'none') {
        autoActual.url = bg.slice(5, -2); 
    }
}


meGustaBtn.addEventListener('click', function() {
    actualizarDatosAuto();

    if (!autoActual.url || !autoActual.nombre) {
        alert('Primero busca un auto con imagen');
        return;
    }

    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    if (favoritos.some(function(f) { return f.nombre.toLowerCase() === autoActual.nombre.toLowerCase(); })) {
        meGustaBtn.textContent = 'Ya en favoritos ❤️';
        meGustaBtn.style.backgroundColor = '#751919ff';
        setTimeout(function() {
            meGustaBtn.textContent = 'Me gusta';
            meGustaBtn.style.backgroundColor = '#0E223A';
        }, 1800);
        return;
    }

    favoritos.push({ nombre: autoActual.nombre, url: autoActual.url });
    localStorage.setItem('favoritos', JSON.stringify(favoritos));


    meGustaBtn.innerHTML = 'Agregado ❤️';
    meGustaBtn.style.backgroundColor = '#2d7097ff';
    setTimeout(function() {
        meGustaBtn.innerHTML = 'Me gusta';
        meGustaBtn.style.backgroundColor = '#0E223A';
    }, 2000);
});


inpBusc.addEventListener('change', async function() {
    const marca = inpBusc.value.trim();
    AutoAPI.style.backgroundImage = '';
    listaDatos.innerHTML = '';
    inpModelo.style.display = 'none';
    
    if (!marca) return;

    try {
        const res = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/' + encodeURIComponent(marca) + '?format=json');
        const data = await res.json();

        if (data.Results.length === 0) {
            listaDatos.innerHTML = '<li>No hay modelos disponibles</li>';
            return;
        }

        listaDatos.innerHTML = '';
        data.Results.forEach(function(m) {
            const li = document.createElement('li');
            li.textContent = m.Model_Name;
            listaDatos.appendChild(li);
        });

        inpModelo.style.display = 'inline-block';

    } catch (err) {
        listaDatos.innerHTML = '<li>Error al cargar modelos</li>';
    }
});

inpModelo.addEventListener('change', async function() {
    const marca = inpBusc.value.trim();
    const modelo = inpModelo.value.trim();

    if (!marca || !modelo) return;

    try {
        const termino = encodeURIComponent(marca + ' ' + modelo);
        const url = 'https://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=' + termino;

        const res = await fetch(url);
        const xml = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'text/xml');
        const imgUrl = doc.getElementsByTagName('string')[0].textContent;

        if (imgUrl && imgUrl.startsWith('http')) {
            AutoAPI.style.backgroundImage = 'url(' + imgUrl + ')';
            AutoAPI.style.backgroundSize = 'cover';
            AutoAPI.style.backgroundPosition = 'center';
        } else {
            AutoAPI.style.backgroundImage = '';
            alert('No se encontro imagen para este modelo');
        }
    } catch (err) {
        AutoAPI.style.backgroundImage = '';
        alert('Error al cargar imagen');
    }
});


async function spawnCarImage() {
    const autos = ["Toyota Supra","Honda Civic","Ford Mustang","Nissan GTR","Chevrolet Camaro","BMW M3","Audi R8","Porsche 911"];
    const randomCar = autos[Math.floor(Math.random() * autos.length)];
    const termino = encodeURIComponent(randomCar);
    const url = 'https://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=' + termino;
    
    try {
        const res = await fetch(url);
        const xml = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'text/xml');
        const imgUrl = doc.getElementsByTagName('string')[0].textContent;

        if (imgUrl && imgUrl.startsWith("http")) {
            const car = document.createElement("img");
            car.src = imgUrl;
            car.className = "autoMoving";
            car.style.left = Math.floor(Math.random() * 80 + 10) + "%";
            document.getElementById("backgroundCars").appendChild(car);
            setTimeout(function() { car.remove(); }, 7000);
        }
    } catch (e) {}
}
setInterval(spawnCarImage, 2500);

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