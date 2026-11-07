# 🏋️‍♂️ TitanFit - Tienda Deportiva Virtual (Evidencia SENA)

Este proyecto es una plataforma web de comercio electrónico (E-commerce) deportiva desarrollada como evidencia formativa para el **SENA (Servicio Nacional de Aprendizaje)**.

---

## 🚀 Características del Proyecto

- **Estructura Semántica (HTML5):** Uso de etiquetas modernas como `<header>`, `<nav>`, `<section>`, `<main>`, `<aside>` y `<footer>`.
- **Diseño Visual & Responsivo (CSS3):**
  - Paleta de colores atlética y moderna (modo oscuro con acentos naranja deportivo y verde neón).
  - Maquetación flexible con **Flexbox** y **CSS Grid**.
  - 100% adaptable a teléfonos móviles, tabletas y computadores.
- **Interactividad y Lógica (JavaScript Vanilla ES6):**
  - **Catálogo Dinámico:** Renderizado automático de productos deportivos (pesas, ropa, accesorios).
  - **Filtro de Categorías:** Filtrado instantáneo por tipo de producto sin recargar la página.
  - **Carrito de Compras Completo:**
    - Contador interactivo en el botón de navegación.
    - Suma y resta de unidades con recálculo automático del total en pesos colombianos ($ COP).
    - Eliminación de productos y opción de vaciar carrito.
    - Persistencia de datos con **`localStorage`** (si recargas la página, tu carrito no se borra).
  - **Pedido Automatizado por WhatsApp:** Genera un mensaje formateado con los productos seleccionados y el total a pagar listo para enviar.
  - **Notificaciones Toast:** Feedback visual al agregar productos.

---

## 📁 Estructura de Archivos

```text
PAGINA_PERSONAL/
├── index.html       # Estructura principal y contenido semántico
├── styles.css       # Estilos visuales, animaciones y diseño responsivo
├── app.js           # Lógica del catálogo, filtros y carrito de compras
└── README.md        # Documentación técnica del proyecto
```

---

## 🎯 Cómo Personalizar tus Datos para la Entrega del SENA

1. **Tu Nombre y Ficha:**
   - Abre `index.html`.
   - Busca la sección con el id `aprendiz` (línea ~120 aprox).
   - Reemplaza `[Tu Nombre Completo Aquí]` y `[Número de Ficha SENA]`.

2. **Tu Número de WhatsApp para recibir pedidos:**
   - Abre `app.js`.
   - Busca la función `finalizarPedidoWhatsApp()` (línea ~180 aprox).
   - Cambia `const numeroWhatsApp = "573000000000";` por tu número real con el indicativo de Colombia (`57` seguido de tus 10 dígitos).

3. **Modificar o Agregar Productos:**
   - En `app.js`, al inicio encontrarás el arreglo `productos`. Puedes cambiar los nombres, precios, fotos o agregar nuevos artículos fácilmente.

---

## 💡 Cómo Abrir y Probar la Tienda

1. Ve a la carpeta `c:\Users\ESTUDIANTE\Downloads\PAGINA_PERSONAL`.
2. Haz doble clic en el archivo **`index.html`** para abrirlo en tu navegador favorito (Chrome, Edge, Firefox, etc.).
3. ¡Listo! Ya puedes interactuar con el catálogo, filtrar por categorías y probar el carrito de compras.
