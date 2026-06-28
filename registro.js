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

// OJITO
const toggle = document.getElementById("togglePass");

// 🔥 SOLO NUMEROS
telefono.addEventListener("input", () => {
    telefono.value = telefono.value.replace(/\D/g, "");
});

// 👁 mostrar contraseña
toggle.addEventListener("click", () => {

    const isHidden = clave.type === "password";

    clave.type = isHidden ? "text" : "password";
    confirmar.type = isHidden ? "text" : "password";

    toggle.textContent = isHidden ? "🙈" : "👁";
});

// SUBMIT
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
    if (!nombreValor) return alert("Ingresa tu nombre.");

    if (!/^[0-9]{9}$/.test(telefonoValor)) {
        return alert("Ingresa un número válido de 9 dígitos.");
    }

    if (!correoValor) return alert("Ingresa tu correo.");

    if (claveValor.length < 6) {
        return alert("La contraseña debe tener al menos 6 caracteres.");
    }

    if (claveValor !== confirmarValor) {
        return alert("Las contraseñas no coinciden.");
    }

    try {

        boton.disabled = true;
        boton.innerHTML = "Creando cuenta...";

        const credencial = await createUserWithEmailAndPassword(
            auth,
            correoValor,
            claveValor
        );

        await setDoc(
            doc(db, "usuarios", credencial.user.uid),
            {
                uid: credencial.user.uid,
                nombre: nombreValor,
                telefono: "+51" + telefonoValor,
                correo: correoValor,
                fechaRegistro: Date.now(),
                tipo: "cliente"
            }
        );

        alert("Cuenta creada correctamente.");

        window.location.href = "panel-cliente.html";

    } catch (error) {

        console.error(error);

        alert("Error: " + error.message);

        boton.disabled = false;
        boton.innerHTML = "Crear cuenta";
    }
}
