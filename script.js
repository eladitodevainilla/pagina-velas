const productos = [
  { id: 1, nombre: "Vela personalizada rosa (oso y corazón)", stock: 5, precio: 5000, img: "./fotonina1.png" },
  { id: 2, nombre: "Vela personalizada mano hamsa", stock: 3, precio: 6000, img: "./fotonina2.png" },
  { id: 3, nombre: "Pack personalizado en caja (oso + corazón)", stock: 4, precio: 7500, img: "./fotonina3.png" }
];

const catalogo = document.getElementById("catalogo");
const carritoLista = document.getElementById("carrito-lista");
const pagarBtn = document.getElementById("pagar-btn");
const pago = document.getElementById("pago");

const carrito = [];

function renderCatalogo() {
  catalogo.innerHTML = "";
  productos.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>Precio: $${p.precio}</p>
      <p>Stock: ${p.stock}</p>
      <button onclick="agregarAlCarrito(${p.id})" ${p.stock === 0 ? "disabled" : ""}>Agregar al carrito</button>
    `;
    catalogo.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (producto && producto.stock > 0) {
    producto.stock--;
    carrito.push(producto);
    actualizarCarrito();
    renderCatalogo();
  }
}

function actualizarCarrito() {
  carritoLista.innerHTML = "";
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.nombre} - $${item.precio} <button onclick="eliminarDelCarrito(${index})">❌</button>`;
    carritoLista.appendChild(li);
  });
}

function eliminarDelCarrito(index) {
  const producto = carrito[index];
  const original = productos.find(p => p.id === producto.id);
  if (original) original.stock++;
  carrito.splice(index, 1);
  actualizarCarrito();
  renderCatalogo();
}

pagarBtn.addEventListener("click", () => {
  if (carrito.length > 0) {
    pago.innerHTML = `
      Contáctanos para finalizar tu compra: <br>
      <strong><a href="https://wa.me/56927793726" target="_blank">📞 WhatsApp: +56 9 2779 3726</a></strong>
    `;
    pago.style.display = "block";
  } else {
    alert("Tu carrito está vacío.");
  }
});

renderCatalogo();


