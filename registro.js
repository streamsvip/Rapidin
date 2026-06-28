// =====================================
// RAPIDÍN - REGISTRO FIREBASE
// =====================================

import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// Formulario
const form = document.getElementById("registerForm");

// Inputs
const nombre = document.getElementById("nombre");
const correo = document.getElementById("email");
const clave = document.getElementById("password");
const confirmar = document.getElementById("confirmPassword");

// Botón
const boton = document.getElementById("registroBtn");

// Evento submit
form.addEventListener("submit", function (e) {
    e.preventDefault();
    registrarUsuario();
});

async function registrarUsuario() {

    const nombreValor = nombre.value.trim();
    const correoValor = correo.value.trim();
    const claveValor = clave.value.trim();
    const confirmarValor = confirmar.value.trim();

    // 🔥 VALIDACIONES
    if (nombreValor === "") {
        alert("Ingresa tu nombre.");
        return;
    }

    if (correoValor === "") {
        alert("Ingresa tu correo.");
        return;
    }

    if (claveValor.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    if (claveValor !== confirmarValor) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    try {

        // 🔒 bloqueo botón
        boton.disabled = true;
        boton.innerHTML = "Creando cuenta...";

        // 🔥 crear usuario en Firebase Auth
        const credencial = await createUserWithEmailAndPassword(
            auth,
            correoValor,
            claveValor
        );

        // 💾 guardar datos en Firestore
        await setDoc(
            doc(db, "usuarios", credencial.user.uid),
            {
                uid: credencial.user.uid,
                nombre: nombreValor,
                correo: correoValor,
                fechaRegistro: Date.now(),
                tipo: "cliente"
            }
        );

        alert("Cuenta creada correctamente.");

        // 🔁 redirigir a login
        window.location.href = "login.html";

    } catch (error) {

        console.error(error);

        alert("Error: " + error.message);

        boton.disabled = false;
        boton.innerHTML = "Crear cuenta";
    }
}
