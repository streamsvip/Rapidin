// =====================================
// RAPIDÍN
// login.js
// =====================================

const form = document.querySelector("form");
const email = document.querySelector('input[type="email"]');
const password = document.querySelector('input[type="password"]');
const button = document.getElementById("loginBtn");

// Evita que el formulario recargue la página
form.addEventListener("submit", function(e){

    e.preventDefault();

    iniciarSesion();

});

// También funciona al pulsar el botón
button.addEventListener("click", function(e){

    e.preventDefault();

    iniciarSesion();

});

function iniciarSesion(){

    const correo = email.value.trim();
    const clave = password.value.trim();

    if(correo === ""){

        alert("Ingrese su correo electrónico.");

        email.focus();

        return;

    }

    if(!validarCorreo(correo)){

        alert("El correo no es válido.");

        email.focus();

        return;

    }

    if(clave.length < 6){

        alert("La contraseña debe tener al menos 6 caracteres.");

        password.focus();

        return;

    }

    // Animación del botón
    button.innerHTML = "Ingresando...";
    button.disabled = true;

    setTimeout(()=>{

        // Aquí conectaremos Firebase más adelante

        localStorage.setItem("usuario",correo);

        window.location.href="panel-cliente.html";

    },1500);

}

function validarCorreo(correo){

    const expresion=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return expresion.test(correo);

}
