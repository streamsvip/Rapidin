import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const form = document.getElementById("loginForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const showPass = document.getElementById("showLoginPass");

// 👁️ mostrar contraseña
showPass.addEventListener("change", () => {
    password.type = showPass.checked ? "text" : "password";
});

// LOGIN REAL FIREBASE
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
