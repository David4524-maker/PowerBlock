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
    li.textContent = "Sin filtros personalizados";
    li.style.color = "#666";
    filterList.appendChild(li);
    return;
  }
  filters.forEach((f) => {
    const li = document.createElement("li");
    li.textContent = f;
    const btn = document.createElement("button");
    btn.textContent = "×";
    btn.title = "Eliminar";
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
  toggle.checked = state.enabled !== false;
  blockedEl.textContent = state.blockedCount || 0;
  statusEl.textContent = state.enabled !== false ? "Activo" : "Desactivado";
  statusEl.style.color = state.enabled !== false ? "#4caf50" : "#e63946";
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