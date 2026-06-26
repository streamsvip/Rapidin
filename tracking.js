alert("TRACKING JS CARGADO");

document.getElementById("repartidor").innerHTML = "REPARTIDOR TEST";
document.getElementById("infoRepartidor").innerHTML = "FUNCIONANDO";

const map = L.map("map").setView([-16.409, -71.537], 13);

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: "© OpenStreetMap"
  }
).addTo(map);

L.marker([-16.409, -71.537]).addTo(map);
