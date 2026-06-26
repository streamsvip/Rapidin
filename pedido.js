// =====================================
// RAPIDÍN - pedido.js
// =====================================

const boton = document.getElementById("publicar");

boton.addEventListener("click", publicarPedido);

function publicarPedido() {

    const campos = document.querySelectorAll(
        "input[type=text], textarea"
    );

    const pedido = campos[0].value.trim();
    const descripcion = campos[1].value.trim();
    const origen = campos[2].value.trim(); // OPCIONAL
    const destino = campos[3].value.trim();

    if (pedido === "") {

        alert("Escribe qué necesitas.");
        return;

    }

    if (descripcion === "") {

        alert("Agrega una descripción.");
        return;

    }

    if (destino === "") {

        alert("Indica la dirección de entrega.");
        return;

    }

    boton.disabled = true;

    boton.innerHTML = "📦 Publicando pedido...";

    localStorage.setItem("pedido", pedido);
    localStorage.setItem("descripcion", descripcion);

    // OPCIONAL
    localStorage.setItem("origen", origen || "");

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
