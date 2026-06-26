const contenedor = document.getElementById("listaOfertas");
const estado = document.getElementById("estado");

// Simulación de repartidores entrando en tiempo real
const repartidores = [
    { nombre: "Carlos Delivery", rating: 4.9 },
    { nombre: "José Express", rating: 5.0 },
    { nombre: "Luis Delivery", rating: 4.8 },
    { nombre: "Andrés Rápido", rating: 4.7 },
    { nombre: "Miguel Moto", rating: 4.6 }
];

let contador = 0;

function generarOferta() {

    if (contador >= repartidores.length) {
        estado.innerText = "Todas las ofertas recibidas";
        return;
    }

    const r = repartidores[contador];

    const precio = (35 + Math.random() * 15).toFixed(2);
    const tiempo = Math.floor(10 + Math.random() * 15);

    const oferta = document.createElement("div");
    oferta.classList.add("oferta");

    oferta.innerHTML = `
        <h3>🛵 ${r.nombre}</h3>
        <p class="detalles">Calificación: ⭐ ${r.rating}</p>

        <div class="info">
            <span>⏱ ${tiempo} min</span>
            <span>💰 S/ ${precio}</span>
        </div>

        <button class="btn">Aceptar oferta</button>
    `;

    const boton = oferta.querySelector("button");

    boton.addEventListener("click", () => {

        localStorage.setItem("ofertaSeleccionada", JSON.stringify({
            nombre: r.nombre,
            precio,
            tiempo
        }));

        estado.innerText = "Oferta aceptada";

        window.location.href = "tracking.html";
    });

    contenedor.prepend(oferta);

    estado.innerText = "Recibiendo ofertas...";

    contador++;

}

// Simula llegada en tiempo real
setInterval(generarOferta, 2500);

// primera oferta inmediata
generarOferta();
