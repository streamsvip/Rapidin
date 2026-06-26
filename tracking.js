let map = null;
let markerRepartidor = null;

// UI
const estado = document.getElementById("estado");
const estadoPedido = document.getElementById("estadoPedido");
const repartidor = document.getElementById("repartidor");
const infoRepartidor = document.getElementById("infoRepartidor");

// CHAT
const mensajes = document.getElementById("mensajes");
const input = document.getElementById("texto");

// DATOS DEL PEDIDO
let data = {
    nombre: "Repartidor demo",
    tiempo: 15,
    precio: 40
};

try {

    const guardado = localStorage.getItem("ofertaSeleccionada");

    if (guardado) {

        const json = JSON.parse(guardado);

        data = {
            nombre: json.nombre || "Repartidor demo",
            tiempo: json.tiempo || 15,
            precio: json.precio || 40
        };
    }

} catch (error) {

    console.log("Error leyendo ofertaSeleccionada:", error);

}

// -------------------------
// MAPA
// -------------------------
function initMap() {

    if (typeof L === "undefined") {
        document.getElementById("map").innerHTML =
            "Error cargando el mapa";
        return;
    }

    map = L.map("map").setView([-16.409, -71.537], 13);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap"
        }
    ).addTo(map);

    markerRepartidor = L.marker([-16.409, -71.537])
        .addTo(map)
        .bindPopup(data.nombre);

    setTimeout(() => {
        map.invalidateSize();
    }, 300);

}

// -------------------------
// INFO REPARTIDOR
// -------------------------
function cargarInfo() {

    repartidor.textContent = data.nombre;

    infoRepartidor.textContent =
        `Llegará en ~${data.tiempo} min | Pago S/ ${data.precio}`;

}

// -------------------------
// ESTADOS DEL PEDIDO
// -------------------------
const estados = [
    "Buscando ruta óptima...",
    "Repartidor aceptó el pedido",
    "Comprando / recogiendo pedido",
    "En camino hacia ti",
    "A 5 minutos de entrega",
    "Entregado 🎉"
];

let index = 0;

function avanzarEstado() {

    if (index >= estados.length) {

        estadoPedido.textContent = "Pedido finalizado";
        estado.textContent = "Entregado";

        return;
    }

    estadoPedido.textContent = estados[index];
    estado.textContent = estados[index];

    moverRepartidor();

    index++;

}

function moverRepartidor() {

    if (!markerRepartidor || !map) return;

    const lat = -16.409 + (Math.random() * 0.01);
    const lng = -71.537 + (Math.random() * 0.01);

    markerRepartidor.setLatLng([lat, lng]);

    map.panTo([lat, lng]);

}

// -------------------------
// BOTONES
// -------------------------
function llamar() {

    alert("Llamando a " + data.nombre);

}

function chat() {

    input.focus();

}

// -------------------------
// CHAT
// -------------------------
let chatData = [];

function enviar() {

    const texto = input.value.trim();

    if (!texto) return;

    chatData.push({
        tipo: "cliente",
        texto
    });

    input.value = "";

    renderChat();

    setTimeout(() => {

        chatData.push({
            tipo: "repartidor",
            texto: respuestaRandom()
        });

        renderChat();

    }, 1200);

}

function respuestaRandom() {

    const respuestas = [
        "Ok, voy en camino 🚀",
        "Estoy comprando tu pedido 🛒",
        "Ya casi llego 📍",
        "Confirmo ubicación 👍",
        "Entendido ✔️"
    ];

    return respuestas[
        Math.floor(Math.random() * respuestas.length)
    ];

}

function renderChat() {

    mensajes.innerHTML = "";

    chatData.forEach(m => {

        const div = document.createElement("div");

        div.className = "msg " + m.tipo;
        div.textContent = m.texto;

        mensajes.appendChild(div);

    });

    mensajes.scrollTop = mensajes.scrollHeight;

}

// -------------------------
// INICIO
// -------------------------
window.onload = () => {

    cargarInfo();

    initMap();

    avanzarEstado();

    setInterval(() => {
        avanzarEstado();
    }, 4000);

};
