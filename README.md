# 🛡️ PowerBlock

> Bloqueador de anuncios ligero y potente para navegadores basados en Chromium (Chrome, Edge, Brave, Opera, Vivaldi).

![Manifest](https://img.shields.io/badge/Manifest-V3-blue)
![Chrome](https://img.shields.io/badge/Chrome-%E2%9C%94-green)
![Edge](https://img.shields.io/badge/Edge-%E2%9C%94-green)
![Brave](https://img.shields.io/badge/Brave-%E2%9C%94-orange)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

PowerBlock combina **bloqueo a nivel de red** con **filtrado cosmético** en tiempo real para eliminar anuncios, rastreadores y elementos molestos de cualquier página web. Sin dependencias, sin telemetría, sin cuentas.

---

##  Características

-  **Bloqueo de red** con `declarativeNetRequest` (Manifest V3) — los anuncios ni siquiera llegan a descargarse.
-  **Filtrado cosmético** por CSS + `MutationObserver` para eliminar banners, overlays y anuncios dinámicos.
-  **Optimizado para YouTube** — auto-skip de pre-rolls, mid-rolls y overlays.
-  **Contador en vivo** de anuncios bloqueados sobre el icono de la extensión.
-  **Toggle on/off** desde el popup.
-  **Filtros personalizados** con sintaxis Adblock (`||dominio^`, `/ruta/`, etc.).
-  **Ultra ligero** — sin frameworks, sin dependencias externas.
-  **Privacidad total** — todo el procesamiento es local, no envía datos a ningún servidor.

---

##  Captura

<img width="399" height="347" alt="Captura de pantalla 2026-10-04 152327" src="https://github.com/user-attachments/assets/8efa3c30-fb3d-4769-a66d-2f609239efea" />

---

##  Instalación

### Modo desarrollador (recomendado para probar)

1. Clona el repositorio:
   ```bash
   git clone https://github.com/david4524-maker/powerblock.git
   cd powerblock
   ```
   ##  Añadir un icono (opcional)

PowerBlock funciona **sin icono personalizado** — Chromium mostrará el placeholder genérico del navegador. Si quieres darle identidad visual, sigue estos pasos.

### 1. Crea los iconos

Necesitas **3 archivos PNG** en estos tamaños:

| Archivo | Tamaño | Uso |
|---------|--------|-----|
| `icons/icon16.png` | 16×16 px | Barra de herramientas |
| `icons/icon48.png` | 48×48 px | Página de extensiones |
| `icons/icon128.png` | 128×128 px | Chrome Web Store |

### 2. Genera los iconos rápidamente

**Opción A — Desde el navegador (sin instalar nada)**

Abre cualquier web, pulsa `F12` → pestaña **Console** y pega:

```javascript
// Genera un icono rojo con un escudo (128x128)
const c = document.createElement('canvas');
c.width = c.height = 128;
const ctx = c.getContext('2d');
ctx.fillStyle = '#e63946';
ctx.fillRect(0, 0, 128, 128);
ctx.fillStyle = '#fff';
ctx.font = 'bold 80px sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('🛡', 64, 70);

const a = document.createElement('a');
a.href = c.toDataURL('image/png');
a.download = 'icon128.png';
a.click();
```

## Otras alternativas

· uBlock Origin

· AdBlock

· AdGuard

## Icono

<img width="189" height="191" alt="Captura de pantalla 2026-10-04 152808" src="https://github.com/user-attachments/assets/41a82f56-6b7d-44a3-b32f-eb5ee4360e8c" />
