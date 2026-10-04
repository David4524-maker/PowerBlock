// PowerBlock - Service Worker
const DEFAULT_STATE = { enabled: true, blockedCount: 0, customFilters: [] };

// Inicialización
chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get(["enabled", "blockedCount", "customFilters"]);
  if (data.enabled === undefined) {
    await chrome.storage.local.set(DEFAULT_STATE);
  }
  updateBadge();
  applyCustomRules();
});

// Contador de bloqueos (solo funciona en modo desarrollador / extensión desempaquetada)
if (chrome.declarativeNetRequest.onRuleMatchedDebug) {
  chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(async (info) => {
    const { blockedCount = 0 } = await chrome.storage.local.get("blockedCount");
    const newCount = blockedCount + 1;
    await chrome.storage.local.set({ blockedCount: newCount });
    updateBadge(newCount);
  });
}

// Actualiza el badge con el contador
async function updateBadge(countOverride) {
  const { enabled, blockedCount } = await chrome.storage.local.get(["enabled", "blockedCount"]);
  const count = countOverride ?? blockedCount ?? 0;
  const text = enabled === false ? "OFF" : count > 999 ? "999+" : String(count);
  const color = enabled === false ? "#888888" : "#e63946";

  try {
    await chrome.action.setBadgeBackgroundColor({ color });
    await chrome.action.setBadgeText({ text });
  } catch (e) {
    // Algunos navegadores sin icono pueden rechazar el badge; se ignora
  }
}

// Maneja mensajes del popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  (async () => {
    if (msg.type === "GET_STATE") {
      const state = await chrome.storage.local.get(["enabled", "blockedCount", "customFilters"]);
      sendResponse(state);
    }

    if (msg.type === "TOGGLE") {
      const { enabled } = await chrome.storage.local.get("enabled");
      const newEnabled = !enabled;
      await chrome.storage.local.set({ enabled: newEnabled });

      // Activar/desactivar el ruleset estático
      await chrome.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: newEnabled ? ["ruleset_ads"] : [],
        disableRulesetIds: newEnabled ? [] : ["ruleset_ads"]
      });

      // Activar/desactivar reglas dinámicas
      const dynRules = await chrome.declarativeNetRequest.getDynamicRules();
      const removeIds = dynRules.map((r) => r.id);
      if (!newEnabled && removeIds.length) {
        await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: removeIds });
      } else if (newEnabled) {
        await applyCustomRules();
      }

      updateBadge();
      sendResponse({ enabled: newEnabled });
    }

    if (msg.type === "RESET_COUNTER") {
      await chrome.storage.local.set({ blockedCount: 0 });
      updateBadge(0);
      sendResponse({ ok: true });
    }

    if (msg.type === "ADD_FILTER") {
      const { customFilters = [] } = await chrome.storage.local.get("customFilters");
      if (!customFilters.includes(msg.filter)) {
        customFilters.push(msg.filter);
        await chrome.storage.local.set({ customFilters });
        await applyCustomRules();
      }
      sendResponse({ ok: true });
    }

    if (msg.type === "REMOVE_FILTER") {
      let { customFilters = [] } = await chrome.storage.local.get("customFilters");
      customFilters = customFilters.filter((f) => f !== msg.filter);
      await chrome.storage.local.set({ customFilters });
      await applyCustomRules();
      sendResponse({ ok: true });
    }
  })();
  return true; // canal asíncrono
});

// Convierte los filtros personalizados en reglas dinámicas
async function applyCustomRules() {
  const { enabled, customFilters = [] } = await chrome.storage.local.get(["enabled", "customFilters"]);
  if (enabled === false) return;

  const existing = await chrome.declarativeNetRequest.getDynamicRules();
  const removeRuleIds = existing.map((r) => r.id);

  // IDs dinámicos empiezan en 1000
  const addRules = customFilters.map((filter, i) => ({
    id: 1000 + i,
    priority: 2,
    action: { type: "block" },
    condition: {
      urlFilter: filter,
      resourceTypes: ["script","image","xmlhttprequest","sub_frame","media","font","stylesheet","ping","other"]
    }
  }));

  await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds, addRules });
}

// Aplica las reglas al arrancar el navegador
chrome.runtime.onStartup.addListener(() => {
  applyCustomRules();
  updateBadge();
});