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

// FORM
const form = document.getElementById("registerForm");

// INPUTS
const nombre = document.getElementById("nombre");
const telefono = document.getElementById("telefono");
const correo = document.getElementById("email");
const clave = document.getElementById("password");
const confirmar = document.getElementById("confirmPassword");

// BOTÓN
const boton = document.getElementById("registroBtn");

// EVENTO
form.addEventListener("submit", function (e) {
    e.preventDefault();
    registrarUsuario();
});

async function registrarUsuario() {

    const nombreValor = nombre.value.trim();
    const telefonoValor = telefono.value.trim();
    const correoValor = correo.value.trim();
    const claveValor = clave.value.trim();
    const confirmarValor = confirmar.value.trim();

    // VALIDACIONES
    if (nombreValor === "") {
        alert("Ingresa tu nombre.");
        return;
    }

    if (telefonoValor === "") {
        alert("Ingresa tu número de celular.");
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

        boton.disabled = true;
        boton.innerHTML = "Creando cuenta...";

        // CREAR USUARIO AUTH
        const credencial = await createUserWithEmailAndPassword(
            auth,
            correoValor,
            claveValor
        );

        // GUARDAR EN FIRESTORE
        await setDoc(
            doc(db, "usuarios", credencial.user.uid),
            {
                uid: credencial.user.uid,
                nombre: nombreValor,
                telefono: telefonoValor, // 🔥 AQUÍ SE GUARDA
                correo: correoValor,
                fechaRegistro: Date.now(),
                tipo: "cliente"
            }
        );

        alert("Cuenta creada correctamente.");

        window.location.href = "login.html";

    } catch (error) {

        console.error(error);

        alert("Error: " + error.message);

        boton.disabled = false;
        boton.innerHTML = "Crear cuenta";
    }
}
