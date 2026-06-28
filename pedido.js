// =====================================
// RAPIDÍN - pedido.js
// =====================================

const boton = document.getElementById("publicar");

boton.addEventListener("click", publicarPedido);

function publicarPedido() {

    const pedido =
        document.getElementById("pedido").value.trim();

    const descripcion =
        document.getElementById("descripcion").value.trim();

    // OPCIONAL
    const origen =
        document.getElementById("origen").value.trim();

    const destino =
        document.getElementById("destino").value.trim();

    if (pedido === "") {

        alert("Escribe qué necesitas.");
        return;

    }

    if (descripcion === "") {

        alert("Agrega una descripción del pedido.");
        return;

    }

    if (destino === "") {

        alert("Indica la dirección de entrega.");
        return;

    }

    boton.disabled = true;

    boton.innerHTML = "📦 Publicando pedido...";

    // Guardar pedido
    localStorage.setItem("pedido", pedido);
    localStorage.setItem("descripcion", descripcion);
    localStorage.setItem("origen", origen); // puede estar vacío
    localStorage.setItem("destino", destino);

    setTimeout(() => {

        boton.innerHTML = "🔎 Buscando repartidores...";

    }, 1500);

    setTimeout(() => {

        boton.innerHTML = "🛵 Esperando ofertas...";

    }, 3500);

    setTimeout(() => {

        window.location.href = "ofertas.html";

    }, 6000);

}
