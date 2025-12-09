document.addEventListener('DOMContentLoaded', () => {
    const menuInt = document.getElementById('menuInt');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    menuInt.innerHTML = ""; 

    favoritos.forEach(fav => {
        const item = document.createElement("div");
        item.classList.add("interesItem");

        const imgDiv = document.createElement("div");
        imgDiv.style.backgroundImage = `url('${fav.url}')`;
        imgDiv.style.backgroundSize = "cover";
        imgDiv.style.backgroundPosition = "center";
        imgDiv.classList.add("imgInteres");

        const nombre = document.createElement("p");
        nombre.textContent = fav.nombre;

        item.appendChild(imgDiv);
        item.appendChild(nombre);

        menuInt.appendChild(item);
    });

    // Desplazamiento con flechas
    const scrollAmount = 200; // pixeles por click

    prevBtn.addEventListener("click", () => {
        menuInt.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
        menuInt.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
});