let map;
let markerRepartidor;

const estado = document.getElementById("estado");
const estadoPedido = document.getElementById("estadoPedido");
const repartidor = document.getElementById("repartidor");
const infoRepartidor = document.getElementById("infoRepartidor");

// Simulación de datos (luego vendrá Firebase)
const data = JSON.parse(localStorage.getItem("ofertaSeleccionada")) || {
    nombre: "Repartidor demo",
    tiempo: 15,
    precio: 40
};

// Inicializar mapa
function initMap() {

    map = L.map('map').setView([-16.409, -71.537], 13); // Arequipa base

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    // marcador inicial del repartidor
    markerRepartidor = L.marker([-16.409, -71.537]).addTo(map)
        .bindPopup("Repartidor")
        .openPopup();
}

initMap();

// cargar datos
repartidor.innerText = data.nombre;
infoRepartidor.innerText = `Llegará en ~${data.tiempo} min | Pago S/ ${data.precio}`;

// estados del pedido
const estados = [
    "Buscando ruta óptima...",
    "Repartidor aceptó el pedido",
    "Comprando / recogiendo pedido",
    "En camino hacia ti",
    "A 5 minutos de entrega",
    "Entregado 🎉"
];

let index = 0;

// simula avance del pedido
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

// simula movimiento del repartidor
function moverRepartidor() {

    const lat = -16.409 + (Math.random() * 0.01);
    const lng = -71.537 + (Math.random() * 0.01);

    markerRepartidor.setLatLng([lat, lng]);

    map.panTo([lat, lng]);
}

// botones simulados
function llamar() {
    alert("Llamando al repartidor: " + data.nombre);
}

function chat() {
    alert("Chat abierto (próximamente)");
}

// cada 4 segundos avanza estado
setInterval(avanzarEstado, 4000);

// inicio inmediato
avanzarEstado();
