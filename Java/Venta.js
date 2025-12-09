document.addEventListener("DOMContentLoaded", ()=>{
    const divImg = document.getElementById("DivMiAnuncioImg");
    const mod = document.getElementById("InputModelo");
    const prec = document.getElementById("InputPrecio");
    const desc = document.getElementById("InputDescripcion");
    const cont = document.getElementById("InputContacto");
    const btn = document.getElementById("GuardarBtn");
    const carrusel = document.getElementById("CarruselContenido");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");

    const file = document.createElement("input");
    file.type = "file";
    file.accept = "image/*";
    divImg.appendChild(file);

    let currentImageData = "";

    file.addEventListener("change", e=>{
        const f = e.target.files[0];
        if(f){
            const r = new FileReader();
            r.onload = ev=>{
                currentImageData = ev.target.result;
                divImg.style.backgroundImage = `url(${currentImageData})`;
                divImg.style.backgroundSize = "cover";
                divImg.style.backgroundPosition = "center";
            };
            r.readAsDataURL(f);
        }
    });

    let anuncios = [
        {img:"Imagenes/auto1.jpg", mod:"Honda Civic", prec:"$18,000", desc:"Excelente estado", cont:"juan@mail.com"},
        {img:"Imagenes/auto2.jpg", mod:"Ford Ranger", prec:"$25,000", desc:"Camioneta lista para trabajo", cont:"maria@mail.com"}
    ];

    function crearAnuncio(a){
        const div = document.createElement("div");
        div.classList.add("DivOtrosAnunciosTarjeta");
        div.style.display = "none";

        const imgDiv = document.createElement("div");
        imgDiv.classList.add("DivOtrosImg");
        imgDiv.style.background = `url(${a.img}) no-repeat center/cover`;
        imgDiv.style.backgroundSize = "cover";
        imgDiv.style.backgroundPosition = "center";

        const f = document.createElement("form");
        f.id = "FormOtrosInfo";
        f.innerHTML = `
            <label>Modelo y Marca:</label><input type="text" value="${a.mod}" readonly>
            <label>Precio:</label><input type="text" value="${a.prec}" readonly>
            <label>Descripción:</label><input type="text" value="${a.desc}" readonly>
            <label>Contacto:</label><input type="text" value="${a.cont}" readonly>
        `;
        div.appendChild(imgDiv);
        div.appendChild(f);
        carrusel.appendChild(div);
    }

    anuncios.forEach(a => crearAnuncio(a));

    let currentIndex = 0;
    function mostrarActual(){
        const divs = carrusel.querySelectorAll(".DivOtrosAnunciosTarjeta");
        divs.forEach((d,i) => d.style.display = i === currentIndex ? "flex" : "none");
    }
    mostrarActual();

    prev.addEventListener("click", ()=>{
        currentIndex = (currentIndex - 1 + anuncios.length) % anuncios.length;
        mostrarActual();
    });

    next.addEventListener("click", ()=>{
        currentIndex = (currentIndex + 1) % anuncios.length;
        mostrarActual();
    });

    btn.addEventListener("click", ()=>{
        if(!mod.value || !prec.value) return;

        let finalImg = currentImageData || "Imagenes/default-car.jpg";

        const a = {
            img: finalImg,
            mod: mod.value,
            prec: prec.value,
            desc: desc.value,
            cont: cont.value
        };

        anuncios.push(a);
        crearAnuncio(a);
        currentIndex = anuncios.length - 1;
        mostrarActual();

        mod.value = "";
        prec.value = "";
        desc.value = "";
        cont.value = "";
        divImg.style.backgroundImage = "#0E223A";
        file.value = "";
        currentImageData = "";
    });
});
