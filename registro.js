import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

window.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registerForm");
    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const correo = document.getElementById("email");
    const clave = document.getElementById("password");
    const confirmar = document.getElementById("confirmPassword");
    const boton = document.getElementById("registroBtn");
    const toggle = document.getElementById("togglePass");

    // Elementos para mostrar errores
    const errorCorreo = document.getElementById("error-correo") || document.createElement("div");
    const errorClave = document.getElementById("error-clave") || document.createElement("div");

    if (!form) return;

    // Toggle ojo
    if (toggle) {
        toggle.addEventListener("click", () => {
            const isHidden = clave.type === "password";
            clave.type = isHidden ? "text" : "password";
            if (confirmar) confirmar.type = isHidden ? "text" : "password";
            toggle.textContent = isHidden ? "🙈" : "👁";
        });
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Limpiar errores anteriores
        errorCorreo.textContent = "";
        errorClave.textContent = "";

        const nombreValor = nombre.value.trim();
        const telefonoValor = telefono.value.trim();
        const correoValor = correo.value.trim();
        const claveValor = clave.value.trim();
        const confirmarValor = confirmar.value.trim();

        let hayError = false;

        if (!nombreValor) { alert("Ingresa tu nombre."); hayError = true; }
        if (!telefonoValor || telefonoValor.length !== 9) { alert("Número inválido."); hayError = true; }
        if (!correoValor) { errorCorreo.textContent = "Ingresa tu correo electrónico"; hayError = true; }
        if (claveValor.length < 6) { errorClave.textContent = "La contraseña debe tener mínimo 6 caracteres"; hayError = true; }
        if (claveValor !== confirmarValor) {
            errorClave.textContent = "Las contraseñas no coinciden";
            hayError = true;
        }

        if (hayError) return;

        boton.disabled = true;
        boton.textContent = "Creando cuenta...";

        try {
            const credencial = await createUserWithEmailAndPassword(auth, correoValor, claveValor);

            await setDoc(doc(db, "usuarios", credencial.user.uid), {
                uid: credencial.user.uid,
                nombre: nombreValor,
                telefono: "+51" + telefonoValor,
                correo: correoValor,
                fechaRegistro: Date.now(),
                tipo: "cliente"
            });

            Swal.fire({
                title: "¡Cuenta creada!",
                text: "Bienvenido a Rapidín",
                icon: "success",
                confirmButtonColor: "#e53935"
            }).then(() => {
                window.location.href = "panel-cliente.html";
            });

        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                errorCorreo.textContent = "Este correo electrónico ya está registrado";
            } else {
                Swal.fire({ title: "Error", text: "Ocurrió un error al crear la cuenta", icon: "error" });
            }
        } finally {
            boton.disabled = false;
            boton.textContent = "Crear cuenta";
        }
    });
});
