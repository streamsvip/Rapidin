import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

// FORM
const form = document.getElementById("loginForm");

// INPUTS
const email = document.getElementById("email");
const password = document.getElementById("password");

// BOTÓN OJO
const toggle = document.getElementById("togglePass");

// 👁️ mostrar / ocultar contraseña
toggle.addEventListener("click", () => {

    const isHidden = password.type === "password";

    password.type = isHidden ? "text" : "password";

    toggle.textContent = isHidden ? "🙈" : "👁";
});

// LOGIN FIREBASE
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {

        await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );

        alert("Bienvenido");

        window.location.href = "panel-cliente.html";

    } catch (error) {
        alert("Error: " + error.message);
    }
});
