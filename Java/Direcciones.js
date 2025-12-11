const sucursalPorMarca = {
    "Toyota": { lat: -16.522480, lng: -68.111770 },        // Toyota Calacoto
    "Honda": { lat: -16.509830, lng: -68.128300 },         // Honda Sopocachi
    "Hyundai": { lat: -16.503700, lng: -68.119300 },       // Hyundai Miraflores
    "Ford": { lat: -16.527900, lng: -68.121900 },          // Ford Obrajes
    "Chevrolet": { lat: -16.524700, lng: -68.108900 },     // Chevrolet Calacoto
    "Nissan": { lat: -16.509200, lng: -68.124100 },        // Nissan Sopocachi
    "Kia": { lat: -16.530700, lng: -68.109600 },           // Kia Mall Ventura
    "Volkswagen": { lat: -16.523900, lng: -68.111200 },    // VW Calacoto
    "Suzuki": { lat: -16.509100, lng: -68.123400 },        // Suzuki Sopocachi
    "Renault": { lat: -16.530600, lng: -68.110100 }        // Renault Mall Ventura
};

const marca = document.getElementById("marca");
let mapa;
let punto;

function initMap() {
    mapa = new google.maps.Map(document.getElementById("mapa"), {
        center: { lat: -16.5000, lng: -68.1500 },
        zoom: 12
    });
}

function verSucursal(coords) {
    mapa.setCenter(coords);

    if (punto) punto.setMap(null);

    punto = new google.maps.Marker({
        map: mapa,
        position: coords
    });
}

marca.addEventListener("change", () => {
    const m = marca.value;

    if (sucursalPorMarca[m]) {
        verSucursal(sucursalPorMarca[m]);
    }
});

async function spawnCarImage() {
    try {
        const autos = [
            "Toyota Supra",
            "Honda Civic",
            "Ford Mustang",
            "Nissan GTR",
            "Chevrolet Camaro",
            "BMW M3",
            "Audi R8",
            "Porsche 911"
        ];

        const randomCar = autos[Math.floor(Math.random() * autos.length)];

        const termino = encodeURIComponent(randomCar);
        const url = `https://www.carimagery.com/api.asmx/GetImageUrl?searchTerm=${termino}`;
        
        const res = await fetch(url);
        const xml = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'text/xml');
        const imgUrl = doc.getElementsByTagName('string')[0]?.textContent;

        if (!imgUrl || !imgUrl.startsWith("http")) return;

        const car = document.createElement("img");
        car.src = imgUrl;
        car.className = "autoMoving";
        car.style.left = Math.floor(Math.random() * 80 + 10) + "%";

        document.getElementById("backgroundCars").appendChild(car);

        setTimeout(() => car.remove(), 7000); 

    } catch (e) {

    }
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