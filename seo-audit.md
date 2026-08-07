# 🔍 Auditoría SEO — Botineras (index.html)

**Fecha:** Agosto 2026  
**Proyecto:** [botineras.com.ar](https://botineras.com.ar)  
**Score general:** 4/10 🟡  

---

## Resumen Ejecutivo

El HTML es sólido en rendimiento y semántica estructural (16KB, todo inline, buen uso de HTML semántico), pero falla en lo que más importa para descubrimiento: no hay meta description, no hay OG tags, no hay alt text en imágenes. Para un juego diseñado para ser viral y compartible, la ausencia de Open Graph mata la capacidad de que los enlaces se vean bien en WhatsApp, Instagram, Telegram y X.

---

## 1. Meta Tags — 🔴 Crítico

| Elemento | Estado | Nota |
|---|---|---|
| `<html lang="es">` | ✅ OK | Correcto |
| `<meta charset="utf-8">` | ✅ OK | Correcto |
| `<meta name="viewport">` | ✅ OK | Correcto |
| `<title>` | ⚠️ Débil | "Botineras — Carrera de Romances" — correcto pero sin diferenciación por página |
| `<meta name="description">` | ❌ **AUSENTE** | No existe. Google la usa para el snippet en resultados. Priority #1 |
| `<link rel="canonical">` | ❌ **AUSENTE** | En SPA de una página es redundante, pero recomendado |
| `<meta name="robots">` | ❌ **AUSENTE** | Por defecto "index, follow", mejor explicitarlo |
| `<meta name="keywords">` | ✅ Irrelevante | Google no lo usa desde 2009 |

---

## 2. Open Graph / Redes Sociales — 🔴 Crítico

| Tag | Estado | Impacto |
|---|---|---|
| `og:title` | ❌ Ausente | Sin preview al compartir en redes |
| `og:description` | ❌ Ausente | Sin preview al compartir en redes |
| `og:image` | ❌ Ausente | Sin thumbnail — **mata la viralidad** |
| `og:url` | ❌ Ausente | |
| `og:type` | ❌ Ausente | |
| `twitter:card` | ❌ Ausente | Sin preview en X/Twitter |

---

## 3. Heading Structure — 🟡 Regular

- ✅ Un solo H1 — correcto
- ✅ Jerarquía H1 → H2 → H3 — correcta
- ⚠️ Headings del juego inyectados por JS — Googlebot puede renderizar JS, pero no es garantizado
- ❌ El final usa `<h1 id="finalTitle">` (segundo H1 en DOM aunque oculto)

---

## 4. Imágenes — 🔴 Crítico

- ❌ **Todos los `<img>` carecen de `alt`** — personajes y escenas
- ❌ Sin fallback si las URLs de Unsplash se rompen
- ❌ Sin lazy loading
- ⚠️ Imágenes Unsplash sin parámetros de tamaño/calidad (ej: `?w=400&q=75`)

---

## 5. Schema / Datos Estructurados — ❌ Ausente

Sin Schema.org. Se recomienda `WebApplication` o `Game` para rich snippets.

---

## 6. Rendimiento (Análisis Estático)

| Aspecto | Estado | Nota |
|---|---|---|
| CSS inline | ✅ | Zero requests extra |
| JS inline | ✅ | Zero requests extra |
| Sin dependencias externas | ✅ | Sin CDN de fonts, librerías, etc. |
| Imágenes externas (Unsplash) | ⚠️ | URLs pueden cambiar. Sin fallback. |
| Sin render-blocking | ✅ | Todo inline |
| Tamaño total (~16KB) | ✅ | Carga instantánea |
| Imágenes sin optimizar | ⚠️ | ~5-8MB en descargas totales |

---

## 7. Contenido y Keywords

| Aspecto | Estado |
|---|---|
| Keyword "Botineras" en título | ✅ |
| Keyword en H1 | ✅ |
| Propuesta de valor clara | ✅ |
| CTA principal | ✅ |
| Disclaimer legal | ✅ |

---

## 8. Aspectos Técnicos

| Aspecto | Estado |
|---|---|
| Sin errores JS evidentes | ✅ |
| HTML semántico (`<section>`) | ✅ |
| Responsive | ✅ |
| Favicon | ❌ **AUSENTE** |
| Touch-friendly | ✅ |

---

## 🎯 Action Items Priorizados

### 🟥 Críticos (implementar YA)

| # | Acción | Archivo/Línea | Esfuerzo | Impacto |
|---|---|---|---|---|
| 1 | Agregar `<meta name="description">` con descripción atractiva (150-160 chars) | `<head>` | 1 min | Alto |
| 2 | Agregar OG tags completas (title, description, image, url, type) | `<head>` | 5 min | **Altísimo** |
| 3 | Agregar `alt=""` a imágenes de personajes y escenas | JS lines 132, 150 | 5 min | Alto |
| 4 | Agregar Twitter Card tags (`summary_large_image`) | `<head>` | 2 min | Alto |

### 🟡 Alta Prioridad

| # | Acción | Esfuerzo | Impacto |
|---|---|---|---|
| 5 | Agregar favicon (favicon.ico + link tag) | 5 min | Medio |
| 6 | Agregar Schema.org `WebApplication` markup | 10 min | Medio |
| 7 | Optimizar URLs de Unsplash (`?w=400&q=75`) en personajes y escenas | 5 min | Medio |

### 🟢 Mejora Continua

| # | Acción | Esfuerzo | Impacto |
|---|---|---|---|
| 8 | Agregar `loading="lazy"` en imágenes JS | 2 min | Bajo |
| 9 | Agregar `<meta name="robots" content="index, follow">` | 1 min | Bajo |
| 10 | Agregar manejo de error `onerror` en imágenes (fallback) | 3 min | Bajo |

---

*Auditoría generada por Tatobot. Para volver a auditar tras implementar cambios, pedilo.*
