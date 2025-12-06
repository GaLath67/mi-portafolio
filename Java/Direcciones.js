
    const sucursalesPorMarca = {
        "Toyota": ["Toyota Calacoto", "Toyota Irpavi", "Toyota Achumani"],
        "Honda": ["Honda Calacoto", "Honda Sopocachi"],
        "Hyundai": ["Hyundai Miraflores", "Hyundai Mall Ventura"],
        "Ford": ["Ford Obrajes", "Ford Irpavi"],
        "Chevrolet": ["Chevrolet Calacoto", "Chevrolet Achumani"],
        "Nissan": ["Nissan Sopocachi", "Nissan Miraflores"],
        "Kia": ["Kia Mall Ventura", "Kia Obrajes"],
        "Volkswagen": ["Volkswagen Calacoto", "Volkswagen Achumani"],
        "Suzuki": ["Suzuki Sopocachi", "Suzuki Miraflores"],
        "Renault": ["Renault Mall Ventura", "Renault Obrajes"]
    };

    const marca = document.getElementById("marca");
    const sucursal = document.getElementById("sucursal");
    let mapa;
    let marcador;

    function initMap() {
        mapa = new google.maps.Map(document.getElementById("mapa"), {
            center: { lat: -16.5000, lng: -68.1500 },
            zoom: 12
        });
    }

    function cargarSucursales() {
        const m = marca.value;
        sucursal.innerHTML = '<option value="" disabled selected>Selecciona una sucursal</option>';
        if (sucursalesPorMarca[m]) {
            sucursalesPorMarca[m].forEach(s => {
                const opt = document.createElement("option");
                opt.value = s;
                opt.textContent = s;
                sucursal.appendChild(opt);
            });
        }
    }

    function mostrarSucursalEnMapa(direc) {
        const geocodificador = new google.maps.Geocoder();
        geocodificador.geocode({ address: direc + ", La Paz, Bolivia" }, (resultados, status) => {
            if (status === "OK") {
                mapa.setCenter(resultados[0].geometry.location);
                if (marcador) marcador.setMap(null);
                marcador = new google.maps.Marker({
                    map: mapa,
                    position: resultados[0].geometry.location
                });
            } else {
                alert("No se pudo encontrar la ubicación: " + status);
            }
        });
    }

    marca.addEventListener("change", () => {
        cargarSucursales();
        sucursal.selectedIndex = 1; // opcional: seleccionar la primera automáticamente
        if (sucursal.value) mostrarSucursalEnMapa(sucursal.value);
    });

    sucursal.addEventListener("change", () => mostrarSucursalEnMapa(sucursal.value));