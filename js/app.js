/**
 * app.js -- Aplicacion de Tienda eCommerce BALENCIAGA VOID
 * ============================================================
 * Version: 4.0.0
 * Diseno: Moda negra contemporanea, Streetwear minimalista, Cyberpunk
 * Ultima actualizacion: Mayo 2026
 *
 * Modulos:
 *   1. Products    - Base de datos de productos (9 items)
 *   2. Cart        - Logica de datos y persistencia (localStorage)
 *   3. UI          - Renderizado dinamico e interaccion DOM
 *   4. Init        - Inicializacion en DOMContentLoaded
 *
 * Caracteristicas:
 *   - Carrito persistente con localStorage
 *   - Interfaz responsiva con Bootstrap 5
 *   - Navegacion entre home, detalle y carrito
 *   - Toast notifications en tiempo real
 *   - Contador dinamico del carrito en navbar
 *   - Selector de cantidad en detalle de producto
 *   - Formulario de contacto con validacion
 *   - Calculo automatico de subtotal y total
 * ============================================================
 */

/* ============================================================
   1. PRODUCTS -- Base de datos de productos
   Cada objeto contiene: id, titulo, precio (string formateado),
   precioNum (valor numerico para calculos), img (ruta local),
   resumen (texto corto para cards) y detalle (texto largo).
   ============================================================ */
const Products = (() => {
  const PRODUCTOS = [
    {
      id: 1,
      titulo: "PANTALON NEUROMANCER",
      precio: "$89.000",
      precioNum: 89000,
      img: "images/pantalon.png",
      resumen: "Pantalon tecnico oscuro con cortes asimetricos.",
      detalle: "Construccion en nylon resistente. Diseno pensado para la movilidad en entornos urbanos. Bolsillos utilitarios invisibles."
    },
    {
      id: 2,
      titulo: "CAMISETA OVERSIZE VOID",
      precio: "$45.000",
      precioNum: 45000,
      img: "images/polera.png",
      resumen: "Algodon pesado, caida estructurada, ausencia de logos.",
      detalle: "El minimalismo en su maxima expresion. Silueta holgada que distorsiona las proporciones corporales."
    },
    {
      id: 3,
      titulo: "CHAQUETA MATRIX LEATHER",
      precio: "$150.000",
      precioNum: 150000,
      img: "images/chaqueta.png",
      resumen: "Cuero sintetico de alto gramaje con acabado mate.",
      detalle: "Proteccion contra los elementos. Cuello alto estructurado y cierre frontal sellado."
    },
    {
      id: 4,
      titulo: "BUFANDA CONCEALMENT",
      precio: "$35.000",
      precioNum: 35000,
      img: "images/bufanda.png",
      resumen: "Knit denso y oscuro para cobertura total.",
      detalle: "Accesorio funcional que proporciona calidez. Longitud exagerada para multiples capas."
    },
    {
      id: 5,
      titulo: "GAFAS CORTAFUEGOS",
      precio: "$120.000",
      precioNum: 120000,
      img: "images/lentes.png",
      resumen: "Lentes polarizados negros con montura angular.",
      detalle: "Proteccion ocular total. Estructura de titanio ultraligero con filtro UV400."
    },
    {
      id: 6,
      titulo: "BUCKET HAT PROTOCOL",
      precio: "$55.000",
      precioNum: 55000,
      img: "images/sombrero.png",
      resumen: "Silueta clasica alterada con proporciones exageradas.",
      detalle: "Proteccion superior. Tejido repelente al agua con acabado mate."
    },
    {
      id: 7,
      titulo: "ZAPATILLAS GLITCH",
      precio: "$95.000",
      precioNum: 95000,
      img: "images/zapatillas.png",
      resumen: "Calzado tactico con suela sobredimensionada.",
      detalle: "Amortiguacion reactiva. Diseno chunky que contrasta con la estetica stealth."
    },
    {
      id: 8,
      titulo: "DERBY CONSTRUCCION",
      precio: "$125.000",
      precioNum: 125000,
      img: "images/zapatos.png",
      resumen: "Calzado formal deconstruido con suela track.",
      detalle: "La colision entre el mundo corporativo y el underground. Puntera reforzada y cordones gruesos."
    },
    {
      id: 9,
      titulo: "TOTE BAG ENCRYPTED",
      precio: "$185.000",
      precioNum: 185000,
      img: "images/cartera.png",
      resumen: "Bolso de gran capacidad con materiales balisticos.",
      detalle: "Estructura rigida, interior modular. Cierres magneticos silenciosos para acceso rapido."
    }
  ];

  /** Retorna el array completo de productos */
  function getAll() {
    return PRODUCTOS;
  }

  /** Busca un producto por su ID numerico */
  function getById(id) {
    return PRODUCTOS.find(p => p.id === parseInt(id));
  }

  return { getAll, getById };
})();


/* ============================================================
   2. CART -- Logica de datos del carrito
   Utiliza localStorage para persistir el carrito entre sesiones.
   Clave de almacenamiento: "bv_carrito"
   ============================================================ */
const Cart = (() => {
  const KEY = "bv_carrito";

  /** Carga el carrito desde localStorage, retorna array vacio si falla */
  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch (err) {
      return [];
    }
  }

  /** Guarda el array del carrito en localStorage */
  function save(carrito) {
    try {
      localStorage.setItem(KEY, JSON.stringify(carrito));
    } catch (err) {
      // Fallo silencioso si localStorage no esta disponible
    }
  }

  /** Retorna todos los items del carrito */
  function getAll() {
    return load();
  }

  /** Cuenta el total de unidades en el carrito */
  function getItemCount() {
    return load().reduce((total, item) => total + item.cantidad, 0);
  }

  /** Calcula el monto total del carrito */
  function getCartTotal() {
    return load().reduce((total, item) => total + (item.precioNum * item.cantidad), 0);
  }

  /**
   * Agrega un producto al carrito.
   * Si ya existe (mismo titulo), incrementa la cantidad.
   * Retorna true si es nuevo, false si ya existia.
   */
  function addToCart(producto, cantidad) {
    if (!producto || !producto.titulo || !producto.precio) {
      return false;
    }

    const cant = cantidad || 1;
    const carrito = load();
    const existente = carrito.find(i => i.titulo === producto.titulo);

    if (existente) {
      existente.cantidad += cant;
      save(carrito);
      return false;
    }

    const nuevoItem = {
      id: Date.now(),
      titulo: producto.titulo,
      precio: producto.precio,
      precioNum: producto.precioNum,
      img: producto.img || "",
      cantidad: cant
    };
    carrito.push(nuevoItem);
    save(carrito);
    return true;
  }

  /** Elimina un item del carrito por su ID unico */
  function removeFromCart(id) {
    const carrito = load();
    save(carrito.filter(i => i.id !== id));
  }

  /**
   * Modifica la cantidad de un item.
   * Si la cantidad resultante es menor o igual a 0, elimina el item.
   */
  function updateQuantity(id, delta) {
    const carrito = load();
    const item = carrito.find(i => i.id === id);
    if (!item) return;

    item.cantidad += delta;
    if (item.cantidad <= 0) {
      removeFromCart(id);
    } else {
      save(carrito);
    }
  }

  /** Vacia completamente el carrito */
  function clearCart() {
    save([]);
  }

  /** Formatea un numero como precio chileno (ej: $89.000) */
  function formatPrice(valor) {
    return "$" + Math.round(valor).toLocaleString("es-CL");
  }

  return {
    getAll,
    getItemCount,
    getCartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    formatPrice
  };
})();


/* ============================================================
   3. UI -- Interaccion con el DOM
   Todas las funciones de renderizado y manipulacion visual.
   ============================================================ */
const UI = (() => {

  /**
   * Actualiza todos los badges del carrito en la navbar.
   * Usa querySelectorAll con clase en vez de ID para evitar
   * IDs duplicados en el DOM.
   */
  function updateCounter() {
    const count = Cart.getItemCount();
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(badge => {
      badge.textContent = count;
    });
  }

  /**
   * Renderiza la grilla de productos en la pagina Home.
   * Genera cards con Bootstrap usando el array de Products.
   * Tambien actualiza el contador de piezas.
   */
  function renderProducts() {
    const container = document.querySelector("#productosContainer");
    if (!container) return;

    // El estilo y tamano del contenedor se controlan ahora 100% mediante variables CSS en :root
    // Ver configuraciones en style.css (ej: --grid-max-width)

    const productos = Products.getAll();

    // Actualizar contador de piezas
    const countEl = document.querySelector("#productCount");
    if (countEl) {
      countEl.textContent = productos.length + " PIEZAS";
    }

    container.innerHTML = productos.map(prod => `
      <div class="col-12 col-lg-4 product-card-wrapper">
        <div class="bv-card product-card">
          <div class="bv-card-img-wrapper">
            <img src="${prod.img}" alt="${prod.titulo}" class="bv-card-img">
          </div>
          <div class="bv-card-body">
            <h3 class="bv-card-name">${prod.titulo}</h3>
            <p class="bv-card-desc">${prod.resumen}</p>
            <p class="bv-card-price">${prod.precio}</p>
            
            <!-- 1. Selector de talla -->
            <select class="form-select form-select-sm mb-2 size-select-grid">
              <option value="S">Talla S</option>
              <option value="M" selected>Talla M</option>
              <option value="L">Talla L</option>
              <option value="XL">Talla XL</option>
            </select>
            
            <!-- 2. Selector de cantidad (1 a 10) -->
            <input type="number" class="form-control form-control-sm mb-3 qty-select-grid" value="1" min="1" max="10">

            <div class="bv-card-actions mt-auto">
              <!-- 3. Boton Agregar al carrito -->
              <button class="bv-card-btn-cart btn-add-cart"
                data-id="${prod.id}"
                data-titulo="${prod.titulo}"
                data-precio="${prod.precio}"
                data-precio-num="${prod.precioNum}"
                data-img="${prod.img}">
                AGREGAR AL CARRITO
              </button>
              <a href="product.html?id=${prod.id}" class="bv-card-link">VER DETALLE</a>
            </div>
          </div>
        </div>
      </div>
    `).join("");
  }

  /**
   * Renderiza el detalle de un producto individual.
   * Lee el parametro "id" de la URL para buscar el producto.
   */
  function renderProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) return;

    const prod = Products.getById(id);
    if (!prod) {
      const main = document.querySelector("main");
      if (main) {
        main.innerHTML = '<div class="bv-container py-5 text-center"><p class="text-muted">PRODUCTO NO ENCONTRADO</p><a href="index.html" class="btn btn-outline-dark mt-3">VOLVER AL INICIO</a></div>';
      }
      return;
    }

    const img = document.querySelector("#detail-img");
    const name = document.querySelector("#detail-name");
    const price = document.querySelector("#detail-price");
    const desc = document.querySelector("#detail-description");
    const btn = document.querySelector("#add-to-cart");

    if (img) { img.src = prod.img; img.alt = prod.titulo; }
    if (name) name.textContent = prod.titulo;
    if (price) price.textContent = prod.precio;
    if (desc) desc.innerHTML = '<p>' + prod.resumen + '</p><p>' + prod.detalle + '</p>';

    // Guardar datos del producto en el boton para el evento de agregar
    if (btn) {
      btn.dataset.titulo = prod.titulo;
      btn.dataset.precio = prod.precio;
      btn.dataset.precioNum = prod.precioNum;
      btn.dataset.img = prod.img;
    }
  }

  /**
   * Renderiza el carrito completo.
   * Muestra items, subtotales, total y acciones.
   * Si el carrito esta vacio, muestra el estado vacio.
   */
  function renderCart() {
    const container = document.querySelector("#cartItems");
    const empty = document.querySelector("#cartEmpty");
    const summary = document.querySelector("#orderSummary");
    const actions = document.querySelector("#cartActions");
    const itemCountEl = document.querySelector("#cartItemCount");
    const subtotalEl = document.querySelector("#subtotalMonto");
    const totalEl = document.querySelector("#totalMonto");

    if (!container) return;

    const carrito = Cart.getAll();

    // Estado vacio
    if (carrito.length === 0) {
      container.style.display = "none";
      if (summary) summary.style.display = "none";
      if (actions) actions.style.display = "none";
      if (empty) empty.style.display = "block";
      if (itemCountEl) itemCountEl.textContent = "0 PIEZAS SELECCIONADAS";
      return;
    }

    // Estado con items
    if (empty) empty.style.display = "none";
    if (summary) summary.style.display = "block";
    if (actions) actions.style.display = "flex";
    container.style.display = "block";

    container.innerHTML = carrito.map(item => `
      <div class="bv-cart-item" data-cart-id="${item.id}">
        <div class="bv-cart-item-img">
          <img src="${item.img}" alt="${item.titulo}">
        </div>
        <div class="bv-cart-item-info">
          <h4>${item.titulo}</h4>
          <p>${item.precio}</p>
        </div>
        <div class="bv-cart-item-qty">
          <button class="btn-qty btn-qty-minus" aria-label="Disminuir cantidad">-</button>
          <span>${item.cantidad}</span>
          <button class="btn-qty btn-qty-plus" aria-label="Aumentar cantidad">+</button>
        </div>
        <div class="bv-cart-item-subtotal">
          ${Cart.formatPrice(item.precioNum * item.cantidad)}
        </div>
        <button class="btn-remove btn-remove-item" aria-label="Eliminar ${item.titulo}">ELIMINAR</button>
      </div>
    `).join("");

    // Registrar eventos en los botones del carrito via addEventListener
    container.querySelectorAll(".bv-cart-item").forEach(row => {
      const cartId = parseInt(row.dataset.cartId);

      row.querySelector(".btn-qty-minus").addEventListener("click", function () {
        Cart.updateQuantity(cartId, -1);
        renderCart();
        updateCounter();
      });

      row.querySelector(".btn-qty-plus").addEventListener("click", function () {
        Cart.updateQuantity(cartId, 1);
        renderCart();
        updateCounter();
      });

      row.querySelector(".btn-remove-item").addEventListener("click", function () {
        Cart.removeFromCart(cartId);
        renderCart();
        updateCounter();
        showToast("Producto eliminado del carrito");
      });
    });

    // Actualizar totales
    const totalAmount = Cart.getCartTotal();
    const totalItems = Cart.getItemCount();
    if (itemCountEl) itemCountEl.textContent = totalItems + " PIEZAS SELECCIONADAS";
    if (subtotalEl) subtotalEl.textContent = Cart.formatPrice(totalAmount);
    if (totalEl) totalEl.textContent = Cart.formatPrice(totalAmount);

    updateCounter();
  }

  /**
   * Muestra una notificacion toast temporal.
   * Se elimina automaticamente despues de 2.5 segundos.
   */
  function showToast(mensaje) {
    const container = document.querySelector("#toastContainer") || (() => {
      const div = document.createElement("div");
      div.id = "toastContainer";
      div.className = "bv-toast-container";
      document.body.appendChild(div);
      return div;
    })();

    const toast = document.createElement("div");
    toast.className = "bv-toast";
    toast.textContent = mensaje;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  }

  return {
    updateCounter,
    renderProducts,
    renderProductDetail,
    renderCart,
    showToast
  };
})();


/* ============================================================
   4. INIT -- Inicializacion en DOMContentLoaded
   Registra todos los event listeners y ejecuta los renderizados
   necesarios segun la pagina actual.
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {

  // -- Actualizar badge del carrito en todas las paginas --
  UI.updateCounter();

  // -- Renderizar grilla de productos (solo en index.html) --
  UI.renderProducts();

  // -- Renderizar detalle de producto (solo en product.html) --
  UI.renderProductDetail();

  // -- Renderizar carrito (solo en cart.html) --
  UI.renderCart();

  // ==========================================================
  // Botones "Agregar al carrito" en la grilla del Home
  // ==========================================================
  document.querySelectorAll(".btn-add-cart").forEach(btn => {
    btn.addEventListener("click", function () {
      const titulo = this.dataset.titulo;
      const precio = this.dataset.precio;
      const precioNum = parseInt(this.dataset.precioNum);
      const img = this.dataset.img;

      Cart.addToCart({ titulo, precio, precioNum, img });
      UI.showToast(titulo + " agregado al carrito");
      UI.updateCounter();

      // Feedback visual en el boton
      this.textContent = "AGREGADO";
      this.disabled = true;
      const self = this;
      setTimeout(function () {
        self.textContent = "AGREGAR AL CARRITO";
        self.disabled = false;
      }, 1500);
    });
  });

  // ==========================================================
  // Selector de cantidad en pagina de detalle
  // ==========================================================
  let detailQty = 1;
  const qtyDisplay = document.querySelector("#qtyDisplay");
  const qtyMinus = document.querySelector("#qtyMinus");
  const qtyPlus = document.querySelector("#qtyPlus");

  if (qtyMinus && qtyPlus && qtyDisplay) {
    qtyMinus.addEventListener("click", function () {
      if (detailQty > 1) {
        detailQty--;
        qtyDisplay.textContent = detailQty;
      }
    });

    qtyPlus.addEventListener("click", function () {
      if (detailQty < 10) {
        detailQty++;
        qtyDisplay.textContent = detailQty;
      }
    });
  }

  // ==========================================================
  // Boton agregar al carrito en pagina de detalle
  // ==========================================================
  const btnAddDetail = document.querySelector("#add-to-cart");
  if (btnAddDetail) {
    btnAddDetail.addEventListener("click", function () {
      const titulo = this.dataset.titulo;
      const precio = this.dataset.precio;
      const precioNum = parseInt(this.dataset.precioNum);
      const img = this.dataset.img;
      const size = document.querySelector("#size-select");
      const sizeVal = size ? size.value : "M";

      Cart.addToCart(
        { titulo: titulo + " (" + sizeVal + ")", precio, precioNum, img },
        detailQty
      );
      UI.showToast(titulo + " x" + detailQty + " agregado al carrito");
      UI.updateCounter();

      // Feedback visual
      this.textContent = "AGREGADO";
      this.disabled = true;
      const self = this;
      setTimeout(function () {
        self.textContent = "AGREGAR AL CARRITO";
        self.disabled = false;
      }, 1500);
    });
  }

  // ==========================================================
  // Boton vaciar carrito
  // ==========================================================
  const btnClear = document.querySelector("#btnLimpiarCarrito");
  if (btnClear) {
    btnClear.addEventListener("click", function () {
      if (confirm("Vaciar el carrito?")) {
        Cart.clearCart();
        UI.renderCart();
        UI.updateCounter();
        UI.showToast("Carrito vaciado");
      }
    });
  }

  // ==========================================================
  // Boton finalizar compra (pagar)
  // ==========================================================
  const btnPagar = document.querySelector("#btnPagar");
  if (btnPagar) {
    btnPagar.addEventListener("click", function () {
      alert("Funcion de pago no disponible en esta demo.");
    });
  }

  // ==========================================================
  // Menu hamburger mobile (desliza desde la derecha)
  // ==========================================================
  const menuToggle = document.querySelector("#menuToggle");
  const mobileMenu = document.querySelector("#mobileMenu");

  if (menuToggle && mobileMenu) {
    // Crear fondo oscuro (overlay) para cerrar el menu al tocar fuera
    const overlay = document.createElement("div");
    overlay.className = "bv-menu-overlay";
    document.body.appendChild(overlay);

    // Funcion para abrir/cerrar el menu lateral
    function toggleMenu() {
      menuToggle.classList.toggle("open");
      mobileMenu.classList.toggle("open");
      overlay.classList.toggle("active");
      const isOpen = menuToggle.classList.contains("open");
      menuToggle.setAttribute("aria-expanded", isOpen);
      mobileMenu.setAttribute("aria-hidden", !isOpen);
    }

    menuToggle.addEventListener("click", toggleMenu);

    // Cerrar menu al tocar el fondo oscuro
    overlay.addEventListener("click", toggleMenu);
  }

  // ==========================================================
  // Formulario de contacto con validacion
  // ==========================================================
  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = document.querySelector("#contactName");
      const emailInput = document.querySelector("#contactEmail");
      const msgInput = document.querySelector("#contactMessage");
      const errorName = document.querySelector("#errorName");
      const errorEmail = document.querySelector("#errorEmail");
      const errorMsg = document.querySelector("#errorMessage");

      let valid = true;

      // Validar nombre
      if (!nameInput.value.trim()) {
        errorName.classList.add("visible");
        valid = false;
      } else {
        errorName.classList.remove("visible");
      }

      // Validar email con expresion regular basica
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        errorEmail.classList.add("visible");
        valid = false;
      } else {
        errorEmail.classList.remove("visible");
      }

      // Validar mensaje
      if (!msgInput.value.trim()) {
        errorMsg.classList.add("visible");
        valid = false;
      } else {
        errorMsg.classList.remove("visible");
      }

      // Si todo es valido, mostrar confirmacion y limpiar
      if (valid) {
        UI.showToast("Mensaje enviado correctamente");
        contactForm.reset();
      }
    });
  }

  // ==========================================================
  // Boton Flotante de Navegacion (Arriba / Abajo)
  // ==========================================================
  const scrollBtn = document.createElement("button");
  scrollBtn.id = "scrollBtn";
  scrollBtn.innerHTML = "↓";
  scrollBtn.className = "scroll-btn";
  document.body.appendChild(scrollBtn);

  // Verificar si estamos al final de la pagina para cambiar la flecha
  function checkScroll() {
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50;
    scrollBtn.innerHTML = isAtBottom ? "↑" : "↓";
  }

  window.addEventListener("scroll", checkScroll);
  window.addEventListener("resize", checkScroll);

  // Navegacion suave hacia arriba o abajo
  scrollBtn.addEventListener("click", () => {
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50;
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  });

});
