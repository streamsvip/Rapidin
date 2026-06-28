import { auth, db } from "./firebase.js";
import { 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { 
    doc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// SweetAlert2 (Asegúrate de tener el script en tu HTML)
const usuarioLabel = document.getElementById("usuario");
const salir = document.getElementById("salir");

// =====================================
// VERIFICAR SESIÓN
// =====================================
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    try {
        const usuarioRef = doc(db, "usuarios", user.uid);
        const usuarioSnap = await getDoc(usuarioRef);

        if (usuarioSnap.exists()) {
            const datos = usuarioSnap.data();
            const nombreCompleto = datos.nombre || "Usuario";
            const primerNombre = nombreCompleto.split(" ")[0];
            usuarioLabel.textContent = primerNombre;
        } else {
            usuarioLabel.textContent = "Usuario";
        }
    } catch (error) {
        console.error(error);
        usuarioLabel.textContent = "Usuario";
    }
});

// =====================================
// CERRAR SESIÓN (Con SweetAlert2)
// =====================================
salir.addEventListener("click", async () => {

    Swal.fire({
        title: "¿Cerrar sesión?",
        text: "Se cerrará tu sesión actual",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#e53935",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Sí, cerrar sesión",
        cancelButtonText: "Cancelar"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await signOut(auth);
                
                Swal.fire({
                    title: "Sesión cerrada",
                    text: "Hasta pronto",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = "login.html";
                });

            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: "Error",
                    text: "No se pudo cerrar sesión",
                    icon: "error"
                });
            }
        }
    });
});

// =====================================
// ANIMACIÓN TARJETAS
// =====================================
const cards = document.querySelectorAll(".card");
cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(25px)";
    setTimeout(() => {
        card.style.transition = ".4s";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
    }, index * 150);
});
