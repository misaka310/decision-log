const decisionEl = document.getElementById("decision");
const medicineEl = document.getElementById("medicine");
const logsEl = document.getElementById("logs");
const saveBtn = document.getElementById("save");

const KEY = "decision-log-v1";

function load() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}

function store(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

function today() {
  // 例: 2025-12-16
  return new Date().toISOString().slice(0, 10);
}

function render() {
  const items = load();
  logsEl.innerHTML = "";
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = `${item.date} | 薬:${item.medicine ? "○" : "×"} | ${item.text || "(空)"}`;
    logsEl.appendChild(li);
  }
}

saveBtn.addEventListener("click", () => {
  const items = load();
  items.unshift({
    date: today(),
    text: decisionEl.value.trim(),
    medicine: medicineEl.checked
  });
  store(items);

  // 次の日も続けやすいようにリセット
  decisionEl.value = "";
  medicineEl.checked = false;

  render();
});

render();
