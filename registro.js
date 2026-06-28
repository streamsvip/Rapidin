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

const form = document.querySelector("form");

const nombre = document.getElementById("nombre");

const correo = document.getElementById("correo");

const clave = document.getElementById("clave");

const confirmar = document.getElementById("confirmar");

const boton = document.getElementById("registroBtn");

form.addEventListener("submit", function(e){

    e.preventDefault();

    registrarUsuario();

});

async function registrarUsuario(){

    const nombreValor = nombre.value.trim();

    const correoValor = correo.value.trim();

    const claveValor = clave.value.trim();

    const confirmarValor = confirmar.value.trim();

    if(nombreValor === ""){

        alert("Ingresa tu nombre.");
        return;

    }

    if(claveValor.length < 6){

        alert("La contraseña debe tener al menos 6 caracteres.");
        return;

    }

    if(claveValor !== confirmarValor){

        alert("Las contraseñas no coinciden.");
        return;

    }

    try{

        boton.disabled = true;

        boton.innerHTML = "Creando cuenta...";

        const credencial =
            await createUserWithEmailAndPassword(
                auth,
                correoValor,
                claveValor
            );

        await setDoc(
            doc(db,"usuarios",credencial.user.uid),
            {
                uid: credencial.user.uid,
                nombre: nombreValor,
                correo: correoValor,
                fechaRegistro: Date.now(),
                tipo:"cliente"
            }
        );

        alert("Cuenta creada correctamente.");

        window.location.href = "login.html";

    }catch(error){

        alert(error.message);

        boton.disabled = false;

        boton.innerHTML = "Crear cuenta";

    }

}
