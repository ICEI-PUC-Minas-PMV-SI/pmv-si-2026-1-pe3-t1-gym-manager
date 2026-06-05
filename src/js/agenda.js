

// ── Helpers de data ──
const todayISO = new Date().toISOString().slice(0, 10);

function nextDay(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

// ── Dados iniciais ──
let eventos = [
  { id: 1, nome: "Aula de Spinning",        data: todayISO,   hora: "07:00", tipo: "Aula",       instrutor: "Carlos",   cor: "purple", obs: "" },
  { id: 2, nome: "Avaliação Física",         data: todayISO,   hora: "09:00", tipo: "Avaliação",  instrutor: "Fernanda", cor: "blue",   obs: "" },
  { id: 3, nome: "Aula de Crossfit",         data: nextDay(1), hora: "18:00", tipo: "Aula",       instrutor: "Pedro",    cor: "orange", obs: "" },
  { id: 4, nome: "Manutenção Equipamentos",  data: nextDay(2), hora: "10:00", tipo: "Manutenção", instrutor: "",         cor: "red",    obs: "" },
];
let proximoEvId = 5;

// ── Estado do modal ──
let evModoEdicao     = false;
let evIdEditando     = null;
let evCorSelecionada = "purple";

// ── Estado do calendário ──
let calYear, calMonth, selectedDate;

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// ─────────────────────────────────────
//  CALENDÁRIO
// ─────────────────────────────────────
function initCal() {
  const now  = new Date();
  calYear    = now.getFullYear();
  calMonth   = now.getMonth();
  selectedDate = todayISO;
}

function navMes(dir) {
  calMonth += dir;
  if (calMonth < 0)  { calMonth = 11; calYear--; }
  if (calMonth > 11) { calMonth = 0;  calYear++; }
  renderCal();
}

function renderCal() {
  document.getElementById("calTitle").textContent = `${MESES[calMonth]} ${calYear}`;

  const grid = document.getElementById("calGrid");
  grid.innerHTML = "";

  const firstWeekday = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth  = new Date(calYear, calMonth + 1, 0).getDate();
  const prevMonthEnd = new Date(calYear, calMonth, 0).getDate();

  // dias do mês anterior (padding)
  for (let i = firstWeekday - 1; i >= 0; i--) {
    const div = document.createElement("div");
    div.className   = "cal-day other-month";
    div.textContent = prevMonthEnd - i;
    grid.appendChild(div);
  }

  // dias do mês atual
  const today  = new Date();
  const todayY = today.getFullYear();
  const todayM = today.getMonth();
  const todayD = today.getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const div = document.createElement("div");
    div.className = "cal-day";

    if (calYear === todayY && calMonth === todayM && d === todayD) div.classList.add("today");
    if (iso === selectedDate) div.classList.add("selected");

    const hasEv = eventos.some(e => e.data === iso);
    div.innerHTML = `<span>${d}</span>${hasEv ? '<span class="event-dot"></span>' : ""}`;
    if (hasEv) div.classList.add("has-events");

    div.addEventListener("click", () => {
      selectedDate = iso;
      renderCal();
      renderEventos();
    });

    grid.appendChild(div);
  }

  // dias do próximo mês (padding)
  const total    = firstWeekday + daysInMonth;
  const trailing = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let d = 1; d <= trailing; d++) {
    const div = document.createElement("div");
    div.className   = "cal-day other-month";
    div.textContent = d;
    grid.appendChild(div);
  }

  renderEventos();
}

// ─────────────────────────────────────
//  LISTA DE EVENTOS DO DIA
// ─────────────────────────────────────
function renderEventos() {
  const label = document.getElementById("eventosDataLabel");
  const list  = document.getElementById("eventosList");

  if (selectedDate) {
    const [y, m, d] = selectedDate.split("-").map(Number);
    label.textContent = new Date(y, m - 1, d).toLocaleDateString("pt-BR", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    });
  }

  const evsDia = eventos
    .filter(e => e.data === selectedDate)
    .sort((a, b) => (a.hora || "").localeCompare(b.hora || ""));

  list.innerHTML = "";

  if (evsDia.length === 0) {
    list.innerHTML = `
      <div class="empty-events">
        <svg viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8"  y1="2" x2="8"  y2="6"/>
          <line x1="3"  y1="10" x2="21" y2="10"/>
        </svg>
        Nenhum evento neste dia
      </div>`;
    return;
  }

  evsDia.forEach(ev => {
    const div = document.createElement("div");
    div.className = "event-item";
    div.innerHTML = `
      <div class="event-color ec-${ev.cor}"></div>
      <div class="event-info">
        <div class="event-name">${ev.nome}</div>
        <div class="event-meta">
          ${ev.hora ? ev.hora + " · " : ""}${ev.tipo}${ev.instrutor ? " · " + ev.instrutor : ""}
        </div>
      </div>
      <div class="event-actions">
        <button class="event-btn" title="Editar" onclick="editarEvento(${ev.id})">
          <svg viewBox="0 0 24 24">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button class="event-btn danger" title="Excluir" onclick="confirmarExcluirEvento(${ev.id})">
          <svg viewBox="0 0 24 24">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
          </svg>
        </button>
      </div>`;
    list.appendChild(div);
  });
}

// ─────────────────────────────────────
//  MODAL EVENTO — ABRIR / FECHAR
// ─────────────────────────────────────
function selectColor(el) {
  document.querySelectorAll("#colorOptions .color-opt").forEach(o => o.classList.remove("selected"));
  el.classList.add("selected");
  evCorSelecionada = el.dataset.color;
}

function abrirModalEvento(data) {
  evModoEdicao = false;
  evIdEditando = null;
  document.getElementById("modalEventoTitulo").textContent = "Novo Evento";
  document.getElementById("evNome").value      = "";
  document.getElementById("evData").value      = data || selectedDate || todayISO;
  document.getElementById("evHora").value      = "";
  document.getElementById("evTipo").value      = "Aula";
  document.getElementById("evInstrutor").value = "";
  document.getElementById("evObs").value       = "";
  evCorSelecionada = "purple";
  document.querySelectorAll("#colorOptions .color-opt").forEach(o => {
    o.classList.toggle("selected", o.dataset.color === "purple");
  });
  document.getElementById("modalEvento").classList.add("open");
  document.getElementById("evNome").focus();
}

function editarEvento(id) {
  const ev = eventos.find(x => x.id === id);
  if (!ev) return;
  evModoEdicao = true;
  evIdEditando = id;
  document.getElementById("modalEventoTitulo").textContent = "Editar Evento";
  document.getElementById("evNome").value      = ev.nome;
  document.getElementById("evData").value      = ev.data;
  document.getElementById("evHora").value      = ev.hora       || "";
  document.getElementById("evTipo").value      = ev.tipo;
  document.getElementById("evInstrutor").value = ev.instrutor  || "";
  document.getElementById("evObs").value       = ev.obs        || "";
  evCorSelecionada = ev.cor;
  document.querySelectorAll("#colorOptions .color-opt").forEach(o => {
    o.classList.toggle("selected", o.dataset.color === ev.cor);
  });
  document.getElementById("modalEvento").classList.add("open");
  document.getElementById("evNome").focus();
}

// ─────────────────────────────────────
//  SALVAR (criar ou editar)
// ─────────────────────────────────────
function salvarEvento() {
  const nome = document.getElementById("evNome").value.trim();
  if (!nome) {
    document.getElementById("evNome").focus();
    showToast("Informe o título do evento.");
    return;
  }
  const data = document.getElementById("evData").value;
  if (!data) {
    document.getElementById("evData").focus();
    showToast("Selecione a data.");
    return;
  }

  const hora      = document.getElementById("evHora").value;
  const tipo      = document.getElementById("evTipo").value;
  const instrutor = document.getElementById("evInstrutor").value.trim();
  const obs       = document.getElementById("evObs").value.trim();
  const cor       = evCorSelecionada;

  if (evModoEdicao) {
    const idx = eventos.findIndex(x => x.id === evIdEditando);
    if (idx !== -1) {
      eventos[idx] = { id: evIdEditando, nome, data, hora, tipo, instrutor, cor, obs };
    }
    showToast("Evento atualizado.");
  } else {
    eventos.push({ id: proximoEvId++, nome, data, hora, tipo, instrutor, cor, obs });
    showToast("Evento adicionado.");
  }

  selectedDate = data;
  fecharModal("modalEvento");
  renderCal();
}

// ─────────────────────────────────────
//  EXCLUIR
// ─────────────────────────────────────
function confirmarExcluirEvento(id) {
  const ev = eventos.find(x => x.id === id);
  if (!ev) return;
  abrirConfirm(
    "Excluir evento",
    `Tem certeza que deseja excluir "${ev.nome}"?`,
    () => {
      eventos = eventos.filter(x => x.id !== id);
      renderCal();
      showToast("Evento removido.");
    }
  );
}

// ─────────────────────────────────────
//  HELPERS COMPARTILHADOS
// ─────────────────────────────────────
function fecharModal(id) {
  document.getElementById(id).classList.remove("open");
}

function fecharModalFora(e, id) {
  if (e.target === document.getElementById(id)) fecharModal(id);
}

// Confirm dialog
let confirmCallback = null;

function abrirConfirm(title, msg, cb) {
  document.getElementById("confirmTitle").textContent = title;
  document.getElementById("confirmMsg").textContent   = msg;
  confirmCallback = cb;
  document.getElementById("confirmOverlay").classList.add("open");
}

function fecharConfirm() {
  document.getElementById("confirmOverlay").classList.remove("open");
  confirmCallback = null;
}

document.getElementById("confirmBtn").addEventListener("click", () => {
  if (confirmCallback) confirmCallback();
  fecharConfirm();
});

// Toast
let toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2800);
}

// ESC fecha modais
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    fecharModal("modalEvento");
    fecharConfirm();
  }
});

// ── Init ──
initCal();
renderCal();
