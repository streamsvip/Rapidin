let map;
let markerRepartidor;

// UI elements
const estado = document.getElementById("estado");
const estadoPedido = document.getElementById("estadoPedido");
const repartidor = document.getElementById("repartidor");
const infoRepartidor = document.getElementById("infoRepartidor");

// CHAT
const mensajes = document.getElementById("mensajes");
const input = document.getElementById("texto");

// datos del pedido (desde ofertas)
const data = JSON.parse(localStorage.getItem("ofertaSeleccionada")) || {
    nombre: "Repartidor demo",
    tiempo: 15,
    precio: 40
};

// -------------------------
// MAPA
// -------------------------
function initMap() {

    map = L.map('map').setView([-16.409, -71.537], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    markerRepartidor = L.marker([-16.409, -71.537])
        .addTo(map)
        .bindPopup("Repartidor")
        .openPopup();
}

initMap();

// -------------------------
// INFO REPARTIDOR
// -------------------------
repartidor.innerText = data.nombre;
infoRepartidor.innerText = `Llegará en ~${data.tiempo} min | Pago S/ ${data.precio}`;

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
        estadoPedido.innerText = "Pedido finalizado";
        estado.innerText = "Entregado";
        return;
    }

    estadoPedido.innerText = estados[index];
    estado.innerText = estados[index];

    moverRepartidor();

    index++;
}

// movimiento simulado
function moverRepartidor() {

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
    alert("Chat activo abajo 👇");
}

// -------------------------
// CHAT
// -------------------------
let chat = [];

function enviar() {

    const texto = input.value.trim();
    if (texto === "") return;

    chat.push({
        tipo: "cliente",
        texto
    });

    input.value = "";

    renderChat();

    setTimeout(() => {

        chat.push({
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

    return respuestas[Math.floor(Math.random() * respuestas.length)];
}

function renderChat() {

    mensajes.innerHTML = "";

    chat.forEach(m => {

        const div = document.createElement("div");
        div.classList.add("msg", m.tipo);
        div.innerText = m.texto;

        mensajes.appendChild(div);

    });

    mensajes.scrollTop = mensajes.scrollHeight;
}

// -------------------------
// LOOP SIMULACIÓN
// -------------------------
setInterval(avanzarEstado, 4000);
avanzarEstado();
