// ===============================
// RAPIDÍN - script.js
// ===============================

// Animación al cargar la página
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

// Animación de aparición de las tarjetas
const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.2
});

cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all .6s ease";
    observer.observe(card);
});

// =============================================
// NO BLOQUEAR los botones principales
// =============================================

// Si quieres mostrar mensaje temporal solo en algunos botones, usa esta clase:
document.querySelectorAll(".btn-coming-soon").forEach(btn => {
    btn.addEventListener("click", function(e){
        e.preventDefault();
        Swal.fire({
            title: "Próximamente",
            text: "Esta función estará disponible en la siguiente versión de Rapidín.",
            icon: "info",
            confirmButtonColor: "#e53935"
        });
    });
});
