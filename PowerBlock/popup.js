// ===== i18n =====
function t(key) {
  return chrome.i18n.getMessage(key) || key;
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const msg = t(key);
    if (msg) el.textContent = msg;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const msg = t(key);
    if (msg) el.placeholder = msg;
  });
}

applyI18n();
// =================

const toggle = document.getElementById("toggle");
const blockedEl = document.getElementById("blocked");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const addFilterBtn = document.getElementById("addFilter");
const newFilterInput = document.getElementById("newFilter");
const filterList = document.getElementById("filterList");

async function send(msg) {
  return new Promise((resolve) => chrome.runtime.sendMessage(msg, resolve));
}

function renderList(filters) {
  filterList.innerHTML = "";
  if (!filters.length) {
    const li = document.createElement("li");
    li.textContent = t("noFilters");
    li.style.color = "#666";
    filterList.appendChild(li);
    return;
  }
  filters.forEach((f) => {
    const li = document.createElement("li");
    li.textContent = f;
    const btn = document.createElement("button");
    btn.textContent = "×";
    btn.title = t("deleteFilter");
    btn.addEventListener("click", async () => {
      await send({ type: "REMOVE_FILTER", filter: f });
      refresh();
    });
    li.appendChild(btn);
    filterList.appendChild(li);
  });
}

async function refresh() {
  const state = await send({ type: "GET_STATE" });
  const enabled = state.enabled !== false;

  toggle.checked = enabled;
  blockedEl.textContent = state.blockedCount || 0;

  statusEl.textContent = t(enabled ? "statusActive" : "statusDisabled");
  statusEl.style.color = enabled ? "#4caf50" : "#e63946";

  renderList(state.customFilters || []);
}

toggle.addEventListener("change", async () => {
  await send({ type: "TOGGLE" });
  refresh();
});

resetBtn.addEventListener("click", async () => {
  await send({ type: "RESET_COUNTER" });
  refresh();
});

addFilterBtn.addEventListener("click", async () => {
  const value = newFilterInput.value.trim();
  if (!value) return;
  await send({ type: "ADD_FILTER", filter: value });
  newFilterInput.value = "";
  refresh();
});

newFilterInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addFilterBtn.click();
});

refresh();