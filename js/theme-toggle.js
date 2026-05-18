/**
 * theme-toggle.js -- Cambio de tema oscuro/claro
 * ============================================================
 * Funcionalidad:
 *   - Alterna entre modo oscuro (por defecto) y modo claro
 *   - Guarda la preferencia del usuario en localStorage
 *   - Cambia la imagen del boton segun el tema activo:
 *     - Modo oscuro: muestra boton-dia.png (para cambiar a dia)
 *     - Modo claro: muestra boton-noche.png (para cambiar a noche)
 * ============================================================
 */
document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar ambos botones (desktop y mobile)
  const themeToggles = [
    document.getElementById('themeToggle'),
    document.getElementById('themeToggleMobile')
  ];
  const body = document.body;

  // Recuperar preferencia guardada o usar 'dark' por defecto
  const currentTheme = localStorage.getItem('theme') || 'dark';

  /**
   * Actualiza las imagenes de los botones de tema
   * segun el tema actualmente activo
   */
  function updateIcons(theme) {
    themeToggles.forEach(btn => {
      if (!btn) return;
      const icon = btn.querySelector('img');
      if (icon) {
        // En modo claro se muestra el boton de noche (para volver a oscuro)
        // En modo oscuro se muestra el boton de dia (para cambiar a claro)
        icon.src = theme === 'light'
          ? 'diseno/boton-noche.png'
          : 'diseno/boton-dia.png';
      }
    });
  }

  // Aplicar tema guardado al cargar la pagina
  if (currentTheme === 'light') {
    body.classList.add('light-mode');
  }
  updateIcons(currentTheme);

  // Registrar evento click en ambos botones de tema
  themeToggles.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      body.classList.toggle('light-mode');

      const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
      updateIcons(theme);
    });
  });
});
