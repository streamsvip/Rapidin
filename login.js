import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

window.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const toggle = document.getElementById("togglePass");
    const boton = document.getElementById("loginBtn");

    // Contenedores de error
    const errorEmail = document.getElementById("error-email");
    const errorPassword = document.getElementById("error-password");

    if (!form || !emailInput || !passwordInput || !boton) {
        console.error("❌ Error: Faltan elementos en el DOM");
        return;
    }

    // Toggle de contraseña
    if (toggle) {
        toggle.style.cursor = "pointer";
        toggle.style.pointerEvents = "all";
        toggle.style.zIndex = "30";

        toggle.addEventListener("click", () => {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                toggle.textContent = "🙈";
            } else {
                passwordInput.type = "password";
                toggle.textContent = "👁";
            }
        });
    }

    // Login
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Limpiar errores anteriores
        errorEmail.textContent = "";
        errorPassword.textContent = "";

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validaciones básicas
        if (!email) {
            errorEmail.textContent = "Ingresa tu correo electrónico";
            return;
        }
        if (!password) {
            errorPassword.textContent = "Ingresa tu contraseña";
            return;
        }

        boton.disabled = true;
        boton.textContent = "Ingresando...";

        try {
            const cred = await signInWithEmailAndPassword(auth, email, password);

            if (cred?.user) {
                localStorage.setItem("uid", cred.user.uid);

                Swal.fire({
                    title: "¡Bienvenido de nuevo!",
                    text: "Iniciando sesión...",
                    icon: "success",
                    timer: 1200,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = "panel-cliente.html";
                });
            }
        } catch (error) {
            console.error(error);

            if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                errorPassword.textContent = "Correo o contraseña incorrectos";
            } else if (error.code === "auth/invalid-email") {
                errorEmail.textContent = "El correo electrónico no es válido";
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Ocurrió un error al iniciar sesión",
                    icon: "error",
                    confirmButtonColor: "#e53935"
                });
            }
        } finally {
            boton.disabled = false;
            boton.textContent = "Ingresar";
        }
    });
});
