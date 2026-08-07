# Botineras — AGENTS.md

## 📋 Descripción del proyecto

**Botineras** es un juego de navegador web tipo "novela interactiva / dating sim" con temática de farándula futbolística argentina. **Objetivo principal: viralidad.** Parodia ficticia donde el jugador elige un personaje y navega por eventos, toma decisiones, acumula stats (fama, reputación, contactos, química, rumores, noviazgos) y escala desde "Barrio" hasta "Champions".

### 👥 Equipo
| Rol | Quién | 
| :--- | :--- |
| **Co-creador / Producto** | Tato |
| **Co-creador / Colaborador** | Papu |

- **URL:** https://botineras.com.ar
- **Dominio:** botineras.com.ar (CNAME a GitHub Pages)
- **Repositorio:** github.com/tatopane/botineras (SSH: git@github.com:tatopane/botineras.git)

---

## 🧱 Stack tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Hosting** | GitHub Pages (CDN global, HTTPS automático) |
| **Frontend** | HTML5 + CSS3 + Vanilla JS (sin frameworks) |
| **Assets** | Imágenes WebP locales optimizadas |
| **Dominio** | CNAME → botineras.com.ar |
| **Control de versiones** | Git + GitHub (SSH, usuario tatopane-openclaw) |

> **Filosofía:** mantenerlo 100% estático, sin backend, sin build step, sin dependencias. Cada archivo debe poder servirse directo desde GitHub Pages.

---

## 🎮 Mecánicas del juego

### Personajes
- **Wonda Nara** — Negocio y escándalo (fame+8, rep+4)
- **La China Suáres** — Química explosiva (chem+12, fame+5)
- **Sasha Ferra** — Todo se hace viral (fame+12, contacts+4)
- **Bri Marcas** — Acceso VIP (contacts+12, rep+3)
- **Jaz Peraltaa** — Carisma impredecible (chem+8, rep+7)
- **Clari Cremaschi** — Las marcas la bancan (rep+10, fame+4)

### Stats
- ⭐ **Fama** — visibilidad pública
- 🧠 **Reputación** — cómo te perciben
- 🤝 **Contactos** — networking
- 🔥 **Química** — conexión romántica
- 💬 **Rumores** — penaliza el score (-5 c/u)
- ❤️ **Noviazgos** — contador de relaciones exitosas

### Tiers
| Tier | Score mínimo | Ejemplo de jugadores |
| :--- | :--- | :--- |
| Barrio | 0 | El 9 de Lugano, El arquero streamer |
| Ascenso | 25 | El goleador de Chacarita, La promesa de Atlanta |
| Primera | 55 | Julián Álvares, Lautaro Martines, Rodrigo De Paúl |
| Latam | 90 | La figura de Flamengo, El goleador de Monterrey |
| Europa | 130 | Vinícius Júniorr, Jude Bellinghan, Rafael Leãu |
| Champions | 175 | Erling Håland, Kylian M'Bapé, Lamine Yamall |

### Eventos
1. **Primera salida** → Rumor fuerte
2. **Después del boliche** → Romance
3. **Viaje sorpresa** → Romance confirmado
4. **La foto filtrada** → Noviazgo
5. **Formalizar** → Noviazgo (+1) y reinicia stage

### Finales
| Condición | Título |
| :--- | :--- |
| 3+ noviazgos | 👑 REINA INTERNACIONAL |
| 1+ noviazgos | ❤️ CARRERA CONSOLIDADA |
| 0 noviazgos | 🍸 MUCHO RUMOR, POCO NOVIAZGO |

---

## 📐 Reglas de desarrollo (para mí, el agente)

### Generales
1. **Todo en un solo HTML.** Sin build steps, sin bundlers, sin npm. El juego debe funcionar abriendo index.html localmente o desde GitHub Pages.
2. **CSS y JS inline.** Si el proyecto crece, se puede separar en archivos, pero siempre servidos estáticamente.
3. **Sin backend.** Cero llamadas a servidores propios, cero APIs con key, cero base de datos. Todo el estado es local (en memoria, localStorage, o sessionStorage).
4. **GitHub Pages friendly.** Cada commit a `main` se deploya automáticamente. No hay branches de deploy separadas.
5. **Responsive.** Funciona en mobile (viewport, touch events, sin hover dependency).
6. **Sin nombres reales.** Todos los personajes y referencias deben ser ficticios. Usar nombres cercanos a la realidad pero inventados (ej: no "Wanda Nara", sí algo como "Wonda Nara").

### Código
- **ES6+** sin transpilación. Usar `const`/`let`, arrow functions, template literals, destructuring, spread.
- **CSS Grid + Flexbox.** Nada de floats, nada de tables para layout.
- **CSS custom properties** para el theme (colores, spacing).
- **Nombres en inglés** para variables y funciones, **contenido en español** para el usuario.
- **Comentarios mínimos.** El código debe ser autoexplicativo.
- **Sin console.log en producción.** Si se necesita debug, usar flag `DEBUG` en el scope.

### UX
- **Feedback inmediato.** Cada acción del usuario debe tener respuesta visual < 100ms.
- **Estados vacíos.** Siempre mostrar algo cuando no hay datos (ej: "Todavía nada confirmado").
- **Estados de error.** Si algo falla (carga de imagen, etc.), mostrar fallback.

### Analytics y Eventos
- **Tracking obligatorio:** Para cada nueva funcionalidad, pantalla, botón o cambio que se agregue o modifique, se debe incluir/actualizar su correspondiente rastreo de eventos tanto en PostHog como en Google Analytics (`trackEvent` / `gtag`).

### Git
- Commits en **español**, descriptivos, en presente del indicativo.
- Prefijo opcional pero bienvenido: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`.
- **Aprobación obligatoria:** Ningún cambio se sube (push / merge) a `main` hasta que el usuario apruebe explícitamente el cambio.
- PRs a `main` con squash merge.
- `CNAME` y `AGENTS.md` se commitean.

---

## 🗺️ Roadmap / próximos pasos

### Prioridades actuales (por definir con Tato)
- [ ] Más eventos (diversificar escenarios)
- [ ] Más personajes jugables
- [ ] Sistema de logros
- [ ] Compartir resultado en redes
- [ ] Sonido / música ambiente
- [ ] Modo oscuro (ya está oscuro, pero refinar)
- [ ] Tests de juego (QA manual)
- [ ] Analytics sin backend (plausible, goatcounter, o similar por DNS)

---

## 🧠 Cómo trabajo yo (TatoBot)

- **Git:** `gh repo clone tatopane/botineras`, `gh pr create`, commits via `git add/commit/push`. **Nunca hacer push a main sin aprobación previa de Tato.**
- **Frontend:** Siempre que toque el HTML, mantengo la estructura de game state (objeto `g`), personajes (`chars`), eventos (`eventTypes`), tiers (`tiers`).
- **Tracking:** Cada cambio o agregado en la app exige actualizar/añadir la instrumentación de eventos en PostHog y Google Analytics (`trackEvent`).
- **Decisiones de producto:** Consulto con Tato antes de cambios mayores.
- **Aprobación de cambios:** Muestro los cambios o resumo la implementación y espero a que Tato apruebe antes de subir a `main`.
- **Estilo:** Directo, pragmático, sin vueltas. Si algo no escala o es overengineering, lo digo.
- **Archivos que siempre leo primero en este proyecto:** `AGENTS.md`, `index.html`.

---

> **Última actualización:** Agosto 2026
> **Creado por:** TatoBot para Tato