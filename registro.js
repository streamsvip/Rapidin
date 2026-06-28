import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// SweetAlert2 (Asegúrate de tener el script en tu HTML)
window.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registerForm");
    const nombre = document.getElementById("nombre");
    const telefono = document.getElementById("telefono");
    const correo = document.getElementById("email");
    const clave = document.getElementById("password");
    const confirmar = document.getElementById("confirmPassword");
    const boton = document.getElementById("registroBtn");
    const toggle = document.getElementById("togglePass");

    if (!form || !boton) {
        console.error("❌ No se encontró el formulario");
        return;
    }

    // Solo números en teléfono
    if (telefono) {
        telefono.addEventListener("input", () => {
            telefono.value = telefono.value.replace(/\D/g, "");
        });
    }

    // Toggle ojo
    if (toggle) {
        toggle.addEventListener("click", () => {
            const isHidden = clave.type === "password";
            clave.type = isHidden ? "text" : "password";
            if (confirmar) confirmar.type = isHidden ? "text" : "password";
            toggle.textContent = isHidden ? "🙈" : "👁";
        });
    }

    // SUBMIT FORM
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombreValor = nombre.value.trim();
        const telefonoValor = telefono.value.trim();
        const correoValor = correo.value.trim();
        const claveValor = clave.value.trim();
        const confirmarValor = confirmar.value.trim();

        // Validaciones
        if (!nombreValor) return Swal.fire({ title: "Error", text: "Ingresa tu nombre.", icon: "warning" });
        if (!telefonoValor || telefonoValor.length !== 9) return Swal.fire({ title: "Error", text: "Ingresa un número válido de 9 dígitos.", icon: "warning" });
        if (!correoValor) return Swal.fire({ title: "Error", text: "Ingresa tu correo.", icon: "warning" });
        if (claveValor.length < 6) return Swal.fire({ title: "Error", text: "La contraseña debe tener al menos 6 caracteres.", icon: "warning" });
        if (claveValor !== confirmarValor) return Swal.fire({ title: "Error", text: "Las contraseñas no coinciden.", icon: "warning" });

        // Desactivar botón
        boton.disabled = true;
        boton.textContent = "Creando cuenta...";

        try {
            const credencial = await createUserWithEmailAndPassword(auth, correoValor, claveValor);

            // Guardar datos en Firestore
            await setDoc(doc(db, "usuarios", credencial.user.uid), {
                uid: credencial.user.uid,
                nombre: nombreValor,
                telefono: "+51" + telefonoValor,
                correo: correoValor,
                fechaRegistro: Date.now(),
                tipo: "cliente"
            });

            // Notificación de éxito
            Swal.fire({
                title: "¡Cuenta creada exitosamente!",
                text: "Bienvenido a Rapidín",
                icon: "success",
                confirmButtonText: "Ir al Panel",
                confirmButtonColor: "#e53935",
                showConfirmButton: true
            }).then(() => {
                window.location.href = "panel-cliente.html";
            });

        } catch (error) {
            console.error(error);
            let msg = "Error al crear la cuenta";

            if (error.code === "auth/email-already-in-use") msg = "Este correo ya está registrado";
            if (error.code === "auth/weak-password") msg = "La contraseña es muy débil";
            if (error.code === "auth/invalid-email") msg = "El correo no es válido";

            Swal.fire({
                title: "Error",
                text: msg,
                icon: "error",
                confirmButtonColor: "#e53935"
            });
        } finally {
            boton.disabled = false;
            boton.textContent = "Crear cuenta";
        }
    });
});
