import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

window.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const toggle = document.getElementById("togglePass");
    const boton = document.getElementById("loginBtn");

    if (!form || !email || !password || !toggle || !boton) {
        console.error("❌ Error: Faltan elementos en el DOM");
        return;
    }

    // Toggle contraseña
    toggle.style.cursor = "pointer";
    toggle.style.pointerEvents = "all";
    toggle.style.zIndex = "30";

    toggle.addEventListener("click", () => {
        if (password.type === "password") {
            password.type = "text";
            toggle.textContent = "🙈";
        } else {
            password.type = "password";
            toggle.textContent = "👁";
        }
    });

    // Login
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        boton.disabled = true;
        boton.textContent = "Ingresando...";

        try {
            const cred = await signInWithEmailAndPassword(
                auth, 
                email.value.trim(), 
                password.value.trim()
            );

            if (cred?.user) {
                localStorage.setItem("uid", cred.user.uid);

                Swal.fire({
                    title: "¡Bienvenido!",
                    text: "Iniciando sesión...",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                    willClose: () => {
                        window.location.href = "panel-cliente.html";
                    }
                });
            }
        } catch (error) {
            console.error(error);
            
            let msg = "Error al iniciar sesión";
            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                msg = "Correo o contraseña incorrectos";
            }
            if (error.code === "auth/invalid-email") {
                msg = "El correo electrónico no es válido";
            }

            Swal.fire({
                title: "Error",
                text: msg,
                icon: "error",
                confirmButtonColor: "#e53935"
            });
        } finally {
            boton.disabled = false;
            boton.textContent = "Ingresar";
        }
    });
});
