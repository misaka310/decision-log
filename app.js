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
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
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
