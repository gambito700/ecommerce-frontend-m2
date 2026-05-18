# BALENCIAGA VOID -- E-commerce Frontend MVP

Prototipo de e-commerce minimalista y de alto contraste inspirado en la estética de moda contemporánea de lujo de Balenciaga. Entregable correspondiente al **Módulo 2 (Ecommerce)** del Bootcamp.

## 🔗 Enlace al Repositorio

[Repositorio Oficial en GitHub](https://github.com/gambito700/ecommerce-frontend-m2)

---

## 📐 Estructura del Proyecto

El desarrollo es **frontend puro** (no requiere bases de datos ni backend) estructurado bajo las directrices del profesor:

* **HTML5 Semántico:** Contiene etiquetas `header`, `nav`, `main`, `section`, `article` y `footer` para máxima accesibilidad y SEO.
* **Estilos Centralizados (`css/style.css`):** Diseño parametrizado en su totalidad mediante variables CSS en `:root`. Soporta transiciones de escala al pasar el cursor por los productos, modo oscuro y claro de alto contraste, e imágenes de fondo fluidas.
* **Componentes Bootstrap 5:** Incorpora grillas responsivas nativas (`col-12 col-lg-4` para grilla 3x3 en escritorio y 1 columna en tablet/móvil) con integración de Bootstrap 5.3.3.
* **Lógica JavaScript (`js/app.js`, `js/theme-toggle.js`):** Modularizado en IIFE. Maneja la carga dinámica de 9 productos, carrito de compras persistente en `localStorage`, selectores de talla y cantidad, y validación en tiempo real del formulario de contacto.

---

## 📂 Directorio de Archivos

```
ecommerce-frontend-m2/
├── index.html          # Inicio, Hero animado, Grid 3x3 y Contacto
├── product.html        # Vista detallada con selectores de talla/cantidad
├── cart.html           # Vista del carrito, cálculos de subtotales y total
├── css/
│   └── style.css       # Variables de diseño y adaptabilidad de temas
├── js/
│   ├── app.js          # Negocio del carrito, renderizado dinámico y scroll
│   └── theme-toggle.js # Control e iconografía para cambio de tema
├── images/             # Fotografías oficiales de productos
└── diseno/             # Recursos de diseño (paletas, ejemplos y PDF)
```

---

## 🚀 Instrucciones de Ejecución

1. **Clonar o descargar** este repositorio:

   ```bash
   git clone https://github.com/gambito700/ecommerce-frontend-m2
   cd ecommerce-frontend-m2
   ```

2. **Abrir** el archivo `index.html` directamente en tu navegador favorito, o utilizar la extensión **Live Server** de Visual Studio Code para habilitar recarga en tiempo real.
