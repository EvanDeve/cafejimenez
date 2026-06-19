# Prompt — Mejora UX/UI de Café Jiménez para el mercado de EE.UU.

> Úsalo como brief para ejecutar las mejoras detectadas en la auditoría UX/UI. Pégalo completo en una nueva conversación con el agente cuando quieras implementar los cambios.

## Contexto y objetivo

Café Jiménez es un sitio estático (HTML + CSS, sin framework, sin backend) de venta de café de especialidad costarricense, dirigido al **mercado de Estados Unidos**. El estándar de calidad debe ser el de una marca D2C americana real (piensa en sitios como Trade Coffee, Blue Bottle, Partake — pulidos, rápidos, con copy en inglés impecable y sin fricción).

**No quiero que el resultado se sienta "hecho por IA"**: nada de gradientes genéricos de plantilla, iconografía repetida sin criterio, copy genérico tipo "¡Compra ahora y descubre la diferencia!", ni componentes que parecen sacados de un theme sin pulir. Cada cambio debe verse intencional, con detalles de microinteracción, espaciado y copy que reflejen una marca real con personalidad propia (artesanal, cálida, premium, con raíces en Costa Rica y presencia en Montana).

Antes de tocar código:
- Lee `index.html`, `buy.html`, `gallery.html`, `contact.html` y los archivos en `styles/` (`base.css`, `home.css`, `buy.css`, `gallery.css`, `contact.css`) para entender la estructura actual.
- No reescribas todo desde cero. Mantén la arquitectura de estilos por página (`base.css` + archivo específico) ya establecida.
- Verifica cada cambio renderizando la página (Playwright/Chromium headless o el navegador) en desktop (1440px) y mobile (390px) antes de marcarlo como terminado — no asumas que un cambio de CSS se ve bien, compruébalo visualmente.

---

## Prioridad 1 — Crítico (bloquea conversión, hazlo primero)

### 1. Menú de navegación mobile inexistente
**Problema:** en `base.css`, `@media (max-width: 768px)` hace `display: none` a `.nav-links` sin dar ninguna alternativa. En mobile el usuario solo ve el logo, sin forma de navegar.

**Cómo resolverlo:**
- Agrega un botón hamburguesa (ícono de 3 líneas, sin librerías externas, con SVG inline o Font Awesome `fa-bars` ya que el sitio ya carga Font Awesome) dentro de `.nav-capsule`, visible solo en mobile.
- Al hacer clic, despliega un panel/drawer con los mismos links de `.nav-links` (Home, Buy, Gallery, Contact), con suficiente área de toque (mínimo 44x44px) y animación de entrada/salida suave (no instantánea, pero tampoco lenta — 250-300ms).
- Usa JavaScript vanilla mínimo (no hay framework ni bundler en este proyecto). Crea un único `<script>` al final del `<body>` de cada HTML, o un `scripts/nav.js` compartido enlazado desde las 4 páginas, que:
  - Togglee una clase (`.nav-open`) en el `<body>` o en el contenedor del menú.
  - Cierre el menú al hacer clic en un link o fuera del drawer.
  - Marque `aria-expanded` en el botón y `aria-hidden` en el panel cuando esté cerrado.
- El botón debe verse coherente con la estética glass/dorada del resto del navbar (mismo `--color-glass`, mismo radio de borde, acento `#dfa86c` en hover/focus).
- Verifica con captura mobile que el menú se vea y funcione en las 4 páginas (la navbar varía entre home y subpáginas — revisa ambos casos: `.navbar` suelto en hero vs `.subpage-nav-container`).

### 2. Formulario de contacto no envía nada real
**Problema:** `contact.html` usa `onsubmit="event.preventDefault(); alert('Message sent!...')"`. Es un mock, el mensaje se pierde.

**Cómo resolverlo:**
- Como es un sitio estático sin backend propio, usa un servicio de formularios sin servidor (Formspree, Web3Forms o Netlify Forms si el hosting final es Netlify — pregúntame cuál vamos a usar para producción si no es obvio por el hosting).
- Reemplaza el `onsubmit` inline por un `fetch()` real en JS hacia el endpoint del servicio, con:
  - Estado de carga en el botón "Send Message" (deshabilitado + texto "Sending..." + opcional spinner sutil) mientras se envía.
  - Mensaje de éxito inline (no `alert()` del navegador — un toast o un bloque que reemplace el formulario, con tono de marca, ej. "¡Gracias! Te responderemos en menos de 24 horas." en inglés para el mercado US).
  - Manejo de error real (si falla la red, mostrar mensaje de error sin perder los datos ya escritos).
- Si no tienes credenciales de ningún servicio todavía, deja el `fetch` apuntando a un placeholder claro (`YOUR_FORM_ENDPOINT`) y avísame explícitamente que falta configurar la cuenta del servicio antes de publicar — no lo dejes con el `alert()` mock sin decírmelo.

---

## Prioridad 2 — Importante (impacta conversión y percepción de calidad)

### 3. CTA "Buy Now" no lleva a comprar
**Problema:** en el hero de `index.html`, "Buy Now" hace scroll a `#about`, no a la compra. Promete una acción y entrega otra.

**Cómo resolverlo:**
- Cambia el `href` de "Buy Now" para que apunte a `buy.html` directamente (o a `buy.html#subscriptions` si quieres llevar de una vez a los planes).
- Revisa todo el sitio por otros casos de CTA con texto de compra que en realidad hacen scroll en vez de navegar, y corrígelos con el mismo criterio: el texto del botón debe describir exactamente lo que pasa al hacer clic.

### 4. Jerarquía visual del hero — "Buy Now" no domina sobre "Our Story"
**Problema:** ambos botones tienen peso visual similar pese a que "Buy Now" es la acción de negocio prioritaria.

**Cómo resolverlo:**
- Dale a `.btn-primary` (usado por "Buy Now") el color de acento de marca `#dfa86c` como fondo (con texto oscuro `#1e1311` para mantener contraste y legibilidad), en vez del marrón oscuro actual que se confunde con el fondo.
- Verifica el contraste de texto sobre el nuevo fondo dorado con una herramienta de contraste (mínimo AA, idealmente AAA para texto de botón).
- Deja `.btn-outline` ("Our Story") como acción secundaria, visualmente más discreta — esto ya funciona bien, no lo toques salvo que el nuevo primario choque con él.
- Aplica el mismo criterio de jerarquía en `buy.html`: el plan "Most Popular" ya tiene `.btn-primary`, pero confirma que el contraste de color se mantenga consistente tras el cambio.

### 5. Falta feedback al hacer clic en "Subscribe Now" (redirección a Stripe)
**Cómo resolverlo:**
- Añade un estado de "loading" breve al hacer clic (cambia el texto del botón a "Redirecting..." o muestra un pequeño spinner) antes de que el navegador navegue a Stripe — usa un listener de `click` en JS que aplique la clase visual y deje que la navegación normal del `<a>` continúe (no necesitas bloquear nada, solo dar señal visual inmediata).
- Asegúrate de que los links a Stripe tengan `rel="noopener noreferrer"` (ver punto 10).

### 6. Tarjeta "Most Popular" se corta visualmente
**Problema:** `.popular-tag` con `top: -14px` queda apretada contra el borde superior de la grilla de suscripciones.

**Cómo resolverlo:**
- Aumenta el `padding-top` o `margin-top` de `.subscription-grid` (o de `.subscription-card.popular` específicamente) lo suficiente para que el badge "Most Popular" tenga aire completo arriba sin tocar el header de la sección.
- Revisa en mobile también — la tarjeta popular no debe perder el badge ni recortarse al apilarse en 1 columna.

### 7. Video de YouTube sin placeholder
**Problema:** el iframe de YouTube-nocookie no tiene miniatura de respaldo; si tarda en cargar o falla, el usuario ve un rectángulo negro vacío.

**Cómo resolverlo:**
- Implementa el patrón "facade": muestra una imagen estática (thumbnail del video, puedes usar `https://img.youtube.com/vi/ksTG5ypLNI0/maxresdefault.jpg` o una miniatura propia en `img/`) con un botón de play superpuesto (ícono Font Awesome `fa-play` dentro de un círculo con el estilo glass del sitio).
- Solo cuando el usuario haga clic en el botón de play, inyecta el `<iframe>` real en el DOM (esto además mejora performance porque no carga el iframe de YouTube hasta que hay intención real de verlo).
- Asegúrate de que el botón de play tenga `aria-label="Play video"` y sea accesible por teclado.

### 8. Contraste de texto bajo (WCAG)
**Problema:** `.clients-label` (`opacity 0.28`), `.footer p` (`rgba(255,255,255,0.5)`), `.author-role` (`rgba(255,255,255,0.4)`) caen por debajo de AA sobre el fondo `#0d0907`.

**Cómo resolverlo:**
- Pasa cada uno de estos colores por un checker de contraste real (no a ojo) contra su fondo exacto.
- Sube la opacidad/luminosidad solo lo necesario para llegar a AA (4.5:1 para texto normal, 3:1 si decides tratarlos como texto grande) sin que pierdan su rol de jerarquía secundaria — el objetivo es legibilidad, no que todo el texto se vea con el mismo peso.
- Aplica el mismo chequeo a cualquier otro texto con opacidad reducida que encuentres mientras trabajas (`.clients-label`, `.cta-note`, `.stat-label`, etc.).

---

## Prioridad 3 — Pulido (detalles que separan "bueno" de "increíble")

### 9. Inconsistencia "CAFE JIMÉNEZ" vs "Café Jiménez"
- Decide una única forma de escribir el wordmark y aplícala consistentemente. Si el logo/footer en mayúsculas sin tilde es una decisión de marca (wordmark estilizado), está bien — pero entonces el `<title>` de cada página y cualquier mención en copy debe usar "Café Jiménez" (con tilde y capitalización normal) de forma consistente, reservando el estilo "CAFE JIMÉNEZ" solo para el wordmark/logo visual.

### 10. Links externos sin `rel="noopener noreferrer"`
- Todos los `<a target="_blank">` (links de Stripe en `buy.html`, link de website en `contact.html`, redes sociales del footer) deben llevar `rel="noopener noreferrer"` por seguridad y buenas prácticas.

### 11. Inputs sin estado de error visual propio
- Agrega estilos CSS para `:invalid`/`:user-invalid` y/o usa JS para mostrar mensajes de error con el mismo lenguaje visual del resto del sitio (no el tooltip nativo del navegador, que rompe la estética).
- El mensaje de error debe ser específico y útil ("Ingresa un email válido", no solo "Campo inválido").

### 12. Galería sin lightbox — falsa affordance
**Problema:** `.gallery-item` tiene `cursor: pointer` y hover interactivo, pero no pasa nada al hacer clic.

**Cómo resolverlo:**
- Implementa un lightbox simple en JS vanilla (sin librería pesada): al hacer clic en una imagen, ábrela en grande sobre un overlay oscuro, con navegación entre imágenes (flechas/teclado) y cierre con `Esc` o clic fuera.
- Si decides NO implementar lightbox por alcance/tiempo, entonces quita el `cursor: pointer` y el hover que sugiere interactividad — nunca dejes una affordance visual sin función real.

### 13. Foco no se mueve al hacer scroll a anchors
- Para los links que hacen `href="#about"`, `href="#subscriptions"`, etc., añade `tabindex="-1"` al elemento destino y muévele el foco vía JS al navegar, para que usuarios de teclado/lectores de pantalla no se queden "perdidos" visualmente.

### 14. Revisión de `alt` en imágenes
- Pasa por las 4 páginas y confirma que cada `<img>` tenga un `alt` descriptivo y específico al contexto en el que aparece (incluso si la misma imagen se reusa en otro lugar con otro alt, como ya pasa en `gallery.html` — confirma que ninguno haya quedado vacío o genérico tipo "imagen").

### 15. CSS huérfano de "stats row"
**Problema:** `.about-stats-row`, `.stat-item`, `.stat-number`, etc. existen en `home.css` pero no se usan en ningún HTML.

**Cómo resolverlo:**
- Decisión de producto, no solo de código: esa fila de estadísticas (ej. "15+ años de experiencia", "500+ familias felices", "1,200-2,000m altitud") es buen social proof para una marca premium en EE.UU. Recomiendo **agregarla** al final de la sección "Our Heritage & Mission" en `index.html`, con 3-4 datos reales o verificables de la marca (pídeme los números reales antes de inventar cifras — no hay que inventar estadísticas falsas de la empresa).
- Si decides no agregarla, elimina el CSS huérfano de `home.css` para no dejar código muerto.

---

## Qué NO tocar (ya funciona bien)
- La paleta de color (marrón espresso + dorado `#dfa86c`).
- La combinación tipográfica Playfair Display + DM Sans.
- Las transiciones y microinteracciones existentes en tarjetas de testimonios, logos y galería.
- La estructura de navbar sticky + footer consistente entre subpáginas.
- La arquitectura de `styles/base.css` + archivo por página — mantén esa separación al añadir CSS nuevo (JS de menú mobile y lightbox van en estilos compartidos si aplican a varias páginas).

## Estándar de copy (mercado US)
- Todo el copy visible debe estar en inglés, con tono cálido pero profesional — evita frases genéricas de marketing tipo "¡La mejor experiencia!" sin sustento. Usa los datos reales de la marca (Hacienda La Minita, Tarrazú Valley, Rainforest Alliance) como ya hace el sitio, que es lo que lo hace creíble.
- Antes de escribir copy nuevo (mensajes de error, estados de carga, confirmaciones de formulario), revisa el tono ya usado en el sitio actual para mantener consistencia de voz.

## Checklist final antes de dar por terminado cada punto
- [ ] Capturé screenshot desktop (1440px) y mobile (390px) del cambio.
- [ ] Probé la interacción real (clic, submit, teclado) y no solo el aspecto estático.
- [ ] Verifiqué que no rompí nada en las otras 3 páginas (la navbar y el footer son compartidos).
- [ ] El copy nuevo está en inglés y suena a marca real, no a placeholder de IA.
- [ ] No quedó código muerto ni comentarios de "TODO" sin resolver.
