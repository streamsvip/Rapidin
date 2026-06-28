// =====================================
// RAPIDÍN
// registro.js
// =====================================

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

boton.addEventListener("click", function(e){

    e.preventDefault();

    registrarUsuario();

});

function registrarUsuario(){

    const nombreValor = nombre.value.trim();

    const correoValor = correo.value.trim();

    const claveValor = clave.value.trim();

    const confirmarValor = confirmar.value.trim();

    if(nombreValor === ""){

        alert("Ingresa tu nombre.");

        nombre.focus();

        return;

    }

    if(!validarCorreo(correoValor)){

        alert("Correo no válido.");

        correo.focus();

        return;

    }

    if(claveValor.length < 6){

        alert("La contraseña debe tener al menos 6 caracteres.");

        clave.focus();

        return;

    }

    if(claveValor !== confirmarValor){

        alert("Las contraseñas no coinciden.");

        confirmar.focus();

        return;

    }

    boton.disabled = true;

    boton.innerHTML = "Creando cuenta...";

    setTimeout(()=>{

        alert("Cuenta creada correctamente.");

        window.location.href="login.html";

    },1500);

}

function validarCorreo(correo){

    const expresion=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return expresion.test(correo);

}