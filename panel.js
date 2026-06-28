import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const usuarioLabel = document.getElementById("usuario");
const salir = document.getElementById("salir");

// 🔥 verificar sesión real
onAuthStateChanged(auth, (user) => {

    if (user) {
        usuarioLabel.textContent = user.email;
    } else {
        window.location.href = "login.html";
    }

});

// 🔥 cerrar sesión real
salir.addEventListener("click", async () => {

    if (confirm("¿Deseas cerrar sesión?")) {

        await signOut(auth);

        window.location.href = "login.html";
    }

});

// animación tarjetas
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
