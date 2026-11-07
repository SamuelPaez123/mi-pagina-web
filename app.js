/**
 * ========================================================
 * TITANFIT - LÓGICA JAVASCRIPT (APP.JS)
 * Proyecto Formativo SENA
 * ========================================================
 */

// 1. BASE DE DATOS LOCAL DE PRODUCTOS DEPORTIVOS
const productos = [
  {
    id: 1,
    nombre: "Kit de Mancuernas Ajustables 20kg",
    categoria: "pesas",
    precio: 185000,
    descripcion: "Discos de hierro fundido con maletín y barra extensora para entrenamiento en casa.",
    imagen: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    nombre: "Pesa Rusa (Kettlebell) 16kg",
    categoria: "pesas",
    precio: 95000,
    descripcion: "Hierro macizo recubierto de vinilo anti-impacto. Ideal para crossfit y fuerza.",
    imagen: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    nombre: "Barra Olímpica de 20kg con Topes",
    categoria: "pesas",
    precio: 240000,
    descripcion: "Acero cromado de 2.2 metros con rodamientos suaves y topes de seguridad incluidos.",
    imagen: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 4,
    nombre: "Camiseta Dry-Fit de Alto Rendimiento",
    categoria: "ropa",
    precio: 45000,
    descripcion: "Tejido ultra liviano y transpirable que absorbe el sudor para máxima comodidad.",
    imagen: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 5,
    nombre: "Short Deportivo con Lycra Interna",
    categoria: "ropa",
    precio: 48000,
    descripcion: "Short 2 en 1 con bolsillo oculto para el celular y tela elástica de 4 vías.",
    imagen: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 6,
    nombre: "Leggings Push-Up Sin Costuras",
    categoria: "ropa",
    precio: 55000,
    descripcion: "Cintura alta con control de abdomen y tela no translúcida para sentadillas profundas.",
    imagen: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 7,
    nombre: "Set de 5 Bandas de Resistencia",
    categoria: "accesorios",
    precio: 35000,
    descripcion: "Látex 100% natural con 5 niveles de resistencia progresiva y bolsa de transporte.",
    imagen: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 8,
    nombre: "Cinturón Lumbar de Levantamiento Pesado",
    categoria: "accesorios",
    precio: 85000,
    descripcion: "Soporte de cuero genuino y hebilla de acero inoxidable para sentadilla y peso muerto.",
    imagen: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 9,
    nombre: "Shaker / Botella Mezcladora 700ml",
    categoria: "accesorios",
    precio: 25000,
    descripcion: "Libre de BPA, con bola mezcladora de acero inoxidable y cierre hermético anti-fugas.",
    imagen: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=600&auto=format&fit=crop"
  }
];

// 2. ESTADO DEL CARRITO (Cargado desde LocalStorage si existe)
let carrito = JSON.parse(localStorage.getItem('titanfit_carrito')) || [];

// Elementos del DOM
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsList = document.getElementById('cartItemsList');
const cartCount = document.getElementById('cartCount');
const cartTotalItems = document.getElementById('cartTotalItems');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const clearCartBtn = document.getElementById('clearCartBtn');
const whatsappCheckoutBtn = document.getElementById('whatsappCheckoutBtn');
const toast = document.getElementById('toast');
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');

// Formato de moneda colombiana ($ COP)
function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(precio);
}

// 3. RENDERIZAR PRODUCTOS EN LA PÁGINA
function renderizarProductos(categoriaSeleccionada = 'todos') {
  productsGrid.innerHTML = '';

  const productosFiltrados = categoriaSeleccionada === 'todos'
    ? productos
    : productos.filter(p => p.categoria === categoriaSeleccionada);

  productosFiltrados.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image-container">
        <span class="product-category-tag">${prod.categoria}</span>
        <img src="${prod.imagen}" alt="${prod.nombre}" class="product-image" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-title">${prod.nombre}</h3>
        <p class="product-desc">${prod.descripcion}</p>
        <div class="product-bottom">
          <span class="product-price">${formatearPrecio(prod.precio)}</span>
          <button class="add-to-cart-btn" onclick="agregarAlCarrito(${prod.id})">
            <span>🛒</span> Agregar
          </button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

// 4. FUNCIONALIDADES DEL CARRITO
function guardarCarrito() {
  localStorage.setItem('titanfit_carrito', JSON.stringify(carrito));
  actualizarVistaCarrito();
}

function agregarAlCarrito(idProducto) {
  const producto = productos.find(p => p.id === idProducto);
  if (!producto) return;

  const itemExistente = carrito.find(item => item.id === idProducto);

  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }

  guardarCarrito();
  mostrarToast(`¡${producto.nombre} agregado!`);
}

function cambiarCantidad(idProducto, delta) {
  const item = carrito.find(i => i.id === idProducto);
  if (!item) return;

  item.cantidad += delta;
  if (item.cantidad <= 0) {
    eliminarDelCarrito(idProducto);
  } else {
    guardarCarrito();
  }
}

function eliminarDelCarrito(idProducto) {
  carrito = carrito.filter(item => item.id !== idProducto);
  guardarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
}

function actualizarVistaCarrito() {
  // Cantidad total de artículos
  const totalArticulos = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  cartCount.textContent = totalArticulos;
  cartTotalItems.textContent = totalArticulos;

  // Total en dinero
  const precioTotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  cartTotalPrice.textContent = `${formatearPrecio(precioTotal)} COP`;

  // Renderizar la lista
  if (carrito.length === 0) {
    cartItemsList.innerHTML = `<p class="empty-cart-msg">Tu carrito está vacío.<br>¡Añade productos para comenzar!</p>`;
    return;
  }

  cartItemsList.innerHTML = '';
  carrito.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.nombre}</h4>
        <div class="cart-item-price">${formatearPrecio(item.precio)} c/u</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="cambiarCantidad(${item.id}, -1)">-</button>
          <span>${item.cantidad}</span>
          <button class="qty-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="eliminarDelCarrito(${item.id})" title="Eliminar">&times;</button>
    `;
    cartItemsList.appendChild(itemElement);
  });
}

// 5. CHECKOUT DIRECTO POR WHATSAPP (Súper valorado en SENA)
function finalizarPedidoWhatsApp() {
  if (carrito.length === 0) {
    alert("Agrega al menos un producto a tu carrito antes de pedir por WhatsApp.");
    return;
  }

  // Puedes cambiar este número por el tuyo propio: Código país (57) + 10 dígitos
  const numeroWhatsApp = "573000000000";

  let mensaje = "¡Hola TitanFit! 👋 Deseo realizar el siguiente pedido:\n\n";

  let total = 0;
  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    mensaje += `▪ ${item.cantidad}x ${item.nombre} - ${formatearPrecio(subtotal)}\n`;
  });

  mensaje += `\n💰 *Total a Pagar:* ${formatearPrecio(total)} COP\n`;
  mensaje += "📍 ¿Cuáles son los pasos para coordinar el envío y el pago?";

  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}

// 6. NOTIFICACIÓN TOAST
function mostrarToast(mensaje) {
  toast.textContent = mensaje;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// 7. EVENT LISTENERS
// Filtro de categorías
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const categoria = btn.dataset.category;
    renderizarProductos(categoria);
  });
});

// Abrir / Cerrar Drawer del Carrito
openCartBtn.addEventListener('click', () => {
  cartOverlay.classList.add('active');
});

closeCartBtn.addEventListener('click', () => {
  cartOverlay.classList.remove('active');
});

cartOverlay.addEventListener('click', (e) => {
  if (e.target === cartOverlay) {
    cartOverlay.classList.remove('active');
  }
});

// Botones de acción del carrito
clearCartBtn.addEventListener('click', vaciarCarrito);
whatsappCheckoutBtn.addEventListener('click', finalizarPedidoWhatsApp);

// Menú Móvil Hamburguesa
mobileToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Cerrar menú móvil al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Formulario de contacto
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert("¡Gracias por tu mensaje! En un proyecto real se enviaría a tu base de datos o correo.");
  contactForm.reset();
});

// 8. INICIALIZACIÓN AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
  renderizarProductos();
  actualizarVistaCarrito();
});
