import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

window.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const toggle = document.getElementById("togglePass");

    if (!form || !email || !password || !toggle) {
        console.error("❌ Error: Faltan elementos en el DOM");
        return;
    }

    console.log("✅ Login JS cargado correctamente");

    // === TOGGLE CONTRASEÑA (Más robusto) ===
    toggle.style.cursor = "pointer";
    toggle.style.pointerEvents = "all";
    toggle.style.zIndex = "30";

    toggle.addEventListener("click", () => {
        console.log("👁 Click en el ojo detectado"); // Para debug

        if (password.type === "password") {
            password.type = "text";
            toggle.textContent = "🙈";
        } else {
            password.type = "password";
            toggle.textContent = "👁";
        }
    });

    // Backup por si el click falla en algunos dispositivos
    toggle.addEventListener("mousedown", () => {
        console.log("👁 Click (mousedown) detectado");
    });

    // === LOGIN ===
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
            const cred = await signInWithEmailAndPassword(
                auth, 
                email.value.trim(), 
                password.value.trim()
            );

            if (cred?.user) {
                localStorage.setItem("uid", cred.user.uid);
                window.location.href = "panel-cliente.html";
            }
        } catch (error) {
            console.error(error);
            let msg = "Error al iniciar sesión";
            if (error.code === "auth/user-not-found") msg = "Usuario no existe";
            if (error.code === "auth/wrong-password") msg = "Contraseña incorrecta";
            if (error.code === "auth/invalid-email") msg = "Correo inválido";
            alert(msg);
        }
    });
});
