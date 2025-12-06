const inpBusc = document.getElementById('inpBusc');
const inpModelo = document.getElementById('inpModelo');
const AutoAPI = document.getElementById('AutoAPI');
const listaDatos = document.getElementById('listaDatos');

inpBusc.addEventListener('change', async () => {
    const marca = inpBusc.value.trim();
    AutoAPI.style.backgroundImage = '';
    listaDatos.innerHTML = '';
    inpModelo.style.display = 'none';
    
    if (!marca) return;

    try {
        const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${encodeURIComponent(marca)}?format=json`);
        const data = await res.json();

        if (data.Results.length === 0) {
            listaDatos.innerHTML = '<li>No hay modelos disponibles</li>';
            return;
        }

        listaDatos.innerHTML = '';
        data.Results.forEach(m => {
            const li = document.createElement('li');
            li.textContent = m.Model_Name;
            listaDatos.appendChild(li);
        });

        inpModelo.style.display = 'inline-block';

    } catch (err) {
        listaDatos.innerHTML = '<li>Error al cargar modelos</li>';

    }

});

inpModelo.addEventListener('change', async () => {
    const marca = inpBusc.value.trim();
    const modelo = inpModelo.value.trim();

    if (!marca || !modelo) return;

    try {
        const termino = encodeURIComponent(`${marca} ${modelo}`);
        const url = `https://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=${termino}`;

        const res = await fetch(url);
        const xml = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'text/xml');
        const imgUrl = doc.getElementsByTagName('string')[0]?.textContent;

        if (imgUrl && imgUrl.startsWith('http')) {
            AutoAPI.style.backgroundImage = `url('${imgUrl}')`;
            AutoAPI.style.backgroundSize = 'cover';
            AutoAPI.style.backgroundPosition = 'center';
        } else {
            AutoAPI.style.backgroundImage = '';
            alert('No se encontró imagen para este modelo');
        }
    } catch (err) {
        AutoAPI.style.backgroundImage = '';
        alert('Error al cargar imagen');
    }

});

