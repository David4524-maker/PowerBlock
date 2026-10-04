// PowerBlock - Content Script (filtrado cosmético)

const AD_SELECTORS = [
  // Genéricos
  '[class*="ad-banner"]',
  '[class*="ad-container"]',
  '[class*="ad-wrapper"]',
  '[class*="advertisement"]',
  '[class*="advertisment"]',
  '[class*="adsbygoogle"]',
  '[id*="google_ads"]',
  '[id*="div-gpt-ad"]',
  '[id^="google_ads_iframe"]',
  '[class*="sponsored"]',
  '[class*="sponsor"]',
  '[class*="promoted"]',
  '[class*="taboola"]',
  '[class*="outbrain"]',
  '[class*="trc_related_container"]',
  '[data-ad]',
  '[data-ad-slot]',
  '[data-adsbygoogle-status]',
  'iframe[src*="doubleclick.net"]',
  'iframe[src*="googlesyndication.com"]',
  'iframe[src*="adservice.google"]',
  'iframe[id^="aswift"]',
  'iframe[title*="advertisement" i]',
  'iframe[title*="ad" i]',
  'ins.adsbygoogle',
  'div[class*="adsbygoogle"]',
  'div[id*="banner-ad"]',
  'div[class*="popup-ad"]',
  'div[class*="overlay-ad"]',
  'div[class*="sticky-ad"]',
  'div[class*="ad-overlay"]',
  'aside[class*="ad"]',
  'section[class*="ad-"]',
  // Específicos de sitios comunes
  '.ad-slot',
  '.ad-unit',
  '.ad-placeholder',
  '.ads-wrapper',
  '.ad-holder',
  '.google-ad',
  '.advertisement-block',
  '.ad__container',
  '#ad-container',
  '#ad-wrapper',
  '#ad-top',
  '#ad-bottom',
  '#ad-sidebar',
  '#ads-container',
  '#sidebar-ads',
  '#banner-ads',
  '.ytp-ad-module',
  '.video-ads',
  '.ytp-ad-overlay-container',
  '.ytp-ad-text-overlay'
];

const HIDE_STYLE_ID = "powerblock-hide-style";

function injectHideStyle() {
  if (document.getElementById(HIDE_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = HIDE_STYLE_ID;
  style.textContent = `${AD_SELECTORS.join(",")} { display: none !important; visibility: hidden !important; height: 0 !important; width: 0 !important; }`;
  (document.head || document.documentElement).appendChild(style);
}

function removeAds(root = document) {
  for (const sel of AD_SELECTORS) {
    try {
      const nodes = root.querySelectorAll ? root.querySelectorAll(sel) : [];
      nodes.forEach((n) => {
        // Evita eliminar contenedores vacíos con contenido real
        if (n && n.parentNode) n.style.setProperty("display", "none", "important");
      });
    } catch (e) {
      // Selector inválido -> ignorar
    }
  }
}

// Bloquea los anuncios de YouTube: salta los pre-rolls automáticamente
function handleYouTube() {
  if (!location.hostname.includes("youtube.com")) return;
  const skip = () => {
    const btn = document.querySelector(".ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-skip-ad-button");
    if (btn) btn.click();
    const ad = document.querySelector(".ad-showing video");
    if (ad) {
      ad.currentTime = ad.duration || 0;
      ad.muted = true;
    }
  };
  setInterval(skip, 500);
}

// Punto de entrada
injectHideStyle();
removeAds();
handleYouTube();

// Observa cambios en el DOM (SPAs, scroll infinito, etc.)
const observer = new MutationObserver((mutations) => {
  for (const m of mutations) {
    m.addedNodes.forEach((node) => {
      if (node.nodeType === 1) removeAds(node);
    });
  }
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});

// Re-inyecta el style por si el sitio lo elimina
setInterval(() => {
  if (!document.getElementById(HIDE_STYLE_ID)) injectHideStyle();
}, 3000);