import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

window.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const toggle = document.getElementById("togglePass");

    if (!form || !email || !password || !toggle) {
        console.error("❌ Faltan elementos en el DOM");
        console.table({ form: !!form, email: !!email, password: !!password, toggle: !!toggle });
        return;
    }

    console.log("✅ Elementos cargados correctamente");

    // TOGGLE CONTRASEÑA
    toggle.style.cursor = "pointer";
    toggle.style.userSelect = "none";

    toggle.addEventListener("click", () => {
        if (password.type === "password") {
            password.type = "text";
            toggle.textContent = "🙈";
        } else {
            password.type = "password";
            toggle.textContent = "👁";
        }
    });

    console.log("✅ Toggle de contraseña activado");

    // LOGIN
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        try {
            const cred = await signInWithEmailAndPassword(auth, email.value.trim(), password.value.trim());
            if (!cred?.user) throw new Error("Auth failed");

            localStorage.setItem("uid", cred.user.uid);
            window.location.href = "panel-cliente.html";
        } catch (error) {
            console.log(error);
            let msg = "Error al iniciar sesión";
            if (error.code === "auth/user-not-found") msg = "Usuario no existe";
            if (error.code === "auth/wrong-password") msg = "Contraseña incorrecta";
            if (error.code === "auth/invalid-email") msg = "Correo inválido";
            alert(msg);
        }
    });
});
