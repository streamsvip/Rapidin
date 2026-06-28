import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const usuarioLabel = document.getElementById("usuario");
const salir = document.getElementById("salir");

// =====================================
// VERIFICAR SESIÓN
// =====================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    try {

        const usuarioRef = doc(db, "usuarios", user.uid);

        const usuarioSnap = await getDoc(usuarioRef);

        if (usuarioSnap.exists()) {

            const datos = usuarioSnap.data();

            const nombreCompleto = datos.nombre || "Usuario";

            const primerNombre = nombreCompleto.split(" ")[0];

            usuarioLabel.textContent = primerNombre;

        } else {

            usuarioLabel.textContent = "Usuario";
        }

    } catch (error) {

        console.error(error);

        usuarioLabel.textContent = "Usuario";
    }

});

// =====================================
// CERRAR SESIÓN
// =====================================

salir.addEventListener("click", async () => {

    const confirmar = confirm("¿Deseas cerrar sesión?");

    if (!confirmar) return;

    try {

        await signOut(auth);

        window.location.href = "login.html";

    } catch (error) {

        console.error(error);

        alert("No se pudo cerrar sesión");
    }

});

// =====================================
// ANIMACIÓN TARJETAS
// =====================================

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
