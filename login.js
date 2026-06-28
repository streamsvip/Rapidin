// =====================================
// RAPIDÍN - LOGIN FIREBASE
// =====================================

import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const form = document.querySelector("form");

const email = document.querySelector('input[type="email"]');

const password = document.querySelector('input[type="password"]');

const button = document.getElementById("loginBtn");

form.addEventListener("submit", function(e){

    e.preventDefault();

    iniciarSesion();

});

async function iniciarSesion(){

    const correo = email.value.trim();

    const clave = password.value.trim();

    if(correo === ""){

        alert("Ingrese su correo.");
        return;

    }

    if(clave === ""){

        alert("Ingrese su contraseña.");
        return;

    }

    try{

        button.disabled = true;

        button.innerHTML = "Ingresando...";

        const usuario =
            await signInWithEmailAndPassword(
                auth,
                correo,
                clave
            );

        localStorage.setItem(
            "uid",
            usuario.user.uid
        );

        window.location.href =
            "panel-cliente.html";

    }
    catch(error){

        alert("Correo o contraseña incorrectos.");

        button.disabled = false;

        button.innerHTML = "Ingresar";

    }

}
