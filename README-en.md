# 🛡️ PowerBlock

> Lightweight and powerful ad blocker for Chromium-based browsers (Chrome, Edge, Brave, Opera, Vivaldi).

![Manifest](https://img.shields.io/badge/Manifest-V3-blue)
![Chrome](https://img.shields.io/badge/Chrome-%E2%9C%94-green)
![Edge](https://img.shields.io/badge/Edge-%E2%9C%94-green)
![Brave](https://img.shields.io/badge/Brave-%E2%9C%94-orange)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

PowerBlock combines **network-level blocking** with real-time **cosmetic filtering** to remove ads, trackers, and annoying elements from any webpage. No dependencies, no telemetry, no accounts.

---

## Features

- **Network blocking** with `declarativeNetRequest` (Manifest V3) — ads are not even downloaded.
- **Cosmetic filtering** via CSS + `MutationObserver` to remove banners, overlays, and dynamic ads.
- **Optimized for YouTube** — auto-skip for pre-rolls, mid-rolls, and overlays.
- **Live counter** of blocked ads on the extension icon.
- **Toggle on/off** from the popup.
- **Custom filters** with Adblock syntax (`||domain^`, `/path/`, etc.).
- **Ultra-lightweight** — no frameworks, no external dependencies.
- **Total privacy** — all processing is local, no data is sent to any server.
- **3 languages** — Detects the browser language thanks to `_locales` (ES, EN, and PT).

---

## Screenshot

<img width="399" height="347" alt="Screenshot 2026-10-04 152327" src="https://github.com/user-attachments/assets/8efa3c30-fb3d-4769-a66d-2f609239efea" />

---

## Installation

### Developer mode (recommended for testing)

1. Clone the repository:
   ```bash
   git clone [https://github.com/david4524-maker/powerblock.git](https://github.com/david4524-maker/powerblock.git)
   cd powerblock

## Add an icon (optional)

PowerBlock works without a custom icon — Chromium will show the browser's generic placeholder. If you want to give it a visual identity, follow these steps.

## 1. Create the icons

You need **3 PNG files** in these sizes:

| File | Size | Usage |
| :-- | :--: | --: |
| `icons/icon16.png | 16x16 px | ToolBar |
| `icons/icon48.png` | 48x48 px | Extensions page |
| `icons/icon128.png | 128x128 px | Chrome Web Store |

## 2. Generate te icons quickly

**Option A — From the browser (without installing anything)**

Open any website, press `F12` → **Console** tab and paste:

```bash
// Generates a red icon with a shield (128x128)
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

## Other alternatives

· uBlock Origin

· AdBlock

· AdGuard

## Icon

<img width="189" height="191" alt="Captura de pantalla 2026-10-04 152808" src="https://github.com/user-attachments/assets/6ded528a-a3ff-4293-a51d-de5d2880f37c" />
