// =====================================
// RAPIDÍN - PANEL CLIENTE
// =====================================

// Obtener usuario guardado en el login
const usuario = localStorage.getItem("usuario");

// Mostrar nombre o correo
const usuarioLabel = document.getElementById("usuario");

if (usuario) {
    usuarioLabel.textContent = usuario;
} else {
    window.location.href = "login.html";
}

// Botón cerrar sesión
const salir = document.getElementById("salir");

salir.addEventListener("click", function () {

    if (confirm("¿Deseas cerrar sesión?")) {

        localStorage.removeItem("usuario");

        window.location.href = "login.html";

    }

});

// Animación de las tarjetas
const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(25px)";

    setTimeout(() => {

        card.style.transition = ".4s";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

    }, index * 150);

});
