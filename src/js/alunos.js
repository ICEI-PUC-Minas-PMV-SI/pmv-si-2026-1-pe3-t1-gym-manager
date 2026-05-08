// ═══════════════════════════════════════
//  alunos.js — Lógica de Gerenciamento
//  de Alunos (CRUD)
// ═══════════════════════════════════════

// ── Dados iniciais ──
let alunos = [
    { id:1,  nome:"Ana Paula Silva",   tel:"(31) 99801-2345", email:"ana@email.com",    plano:"Mensal",     vcto:"2025-06-01", status:"Ativo",   fcm:"Sim", obs:"" },
    { id:2,  nome:"Carlos Mendes",     tel:"(31) 98732-9876", email:"carlos@email.com", plano:"Trimestral", vcto:"2025-04-15", status:"Inativo", fcm:"Não", obs:"" },
    { id:3,  nome:"Fernanda Costa",    tel:"(31) 99112-4567", email:"fe@email.com",     plano:"Anual",      vcto:"2026-01-20", status:"Ativo",   fcm:"Sim", obs:"" },
    { id:4,  nome:"João Oliveira",     tel:"(31) 97654-3210", email:"joao@email.com",   plano:"Mensal",     vcto:"2025-05-28", status:"Ativo",   fcm:"Sim", obs:"" },
    { id:5,  nome:"Mariana Rocha",     tel:"(31) 99023-8765", email:"mari@email.com",   plano:"Semestral",  vcto:"2025-03-10", status:"Inativo", fcm:"Não", obs:"" },
    { id:6,  nome:"Pedro Alves",       tel:"(31) 98456-6543", email:"pedro@email.com",  plano:"Mensal",     vcto:"2025-06-05", status:"Ativo",   fcm:"Sim", obs:"" },
    { id:7,  nome:"Sofia Teixeira",    tel:"(31) 99345-1234", email:"sofia@email.com",  plano:"Anual",      vcto:"2026-03-15", status:"Ativo",   fcm:"Sim", obs:"" },
    { id:8,  nome:"Rafael Lima",       tel:"(31) 98901-5678", email:"rafa@email.com",   plano:"Trimestral", vcto:"2025-04-01", status:"Inativo", fcm:"Não", obs:"" },
    { id:9,  nome:"Camila Nunes",      tel:"(31) 99678-3456", email:"cami@email.com",   plano:"Mensal",     vcto:"2025-06-10", status:"Ativo",   fcm:"Sim", obs:"" },
    { id:10, nome:"Lucas Ferreira",    tel:"(31) 97890-2345", email:"lucas@email.com",  plano:"Semestral",  vcto:"2025-09-01", status:"Ativo",   fcm:"Sim", obs:"" },
  ];
  
  let proximoId  = 11;
  let modoEdicao = false;
  let idEditando = null;
  
  // ─────────────────────────────────────
  //  RENDER TABELA
  // ─────────────────────────────────────
  function renderizar() {
    const busca   = document.getElementById("searchInput").value.toLowerCase();
    const filtro  = document.getElementById("filterStatus").value;
    const filtroP = document.getElementById("filterPlano").value;
  
    const filtrados = alunos.filter(a => {
      const buscaOk  = a.nome.toLowerCase().includes(busca) || a.tel.includes(busca);
      const statusOk = !filtro  || a.status === filtro;
      const planoOk  = !filtroP || a.plano  === filtroP;
      return buscaOk && statusOk && planoOk;
    });
  
    const tbody = document.getElementById("tabelaBody");
    tbody.innerHTML = "";
  
    if (filtrados.length === 0) {
      tbody.innerHTML = `<tr class="empty-row"><td colspan="7">Nenhum aluno encontrado.</td></tr>`;
    } else {
      filtrados.forEach(a => {
        const tr = document.createElement("tr");
        const vctoFmt = a.vcto
          ? new Date(a.vcto + "T12:00:00").toLocaleDateString("pt-BR")
          : "—";
        tr.innerHTML = `
          <td title="${a.nome}">${a.nome}</td>
          <td>${a.tel || "—"}</td>
          <td>${a.plano}</td>
          <td>${vctoFmt}</td>
          <td>
            <span class="badge ${a.status === "Ativo" ? "badge-ativo" : "badge-inativo"}">
              ${a.status}
            </span>
          </td>
          <td>
            <span class="fcm-dot ${a.fcm === "Sim" ? "sim" : "nao"}" title="${a.fcm}"></span>
          </td>
          <td>
            <div class="actions">
              <button class="btn-action" title="Editar" onclick="editarAluno(${a.id})">
                <svg viewBox="0 0 24 24">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button class="btn-action danger" title="Excluir" onclick="confirmarExcluirAluno(${a.id})">
                <svg viewBox="0 0 24 24">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6"/>
                  <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
                </svg>
              </button>
            </div>
          </td>`;
        tbody.appendChild(tr);
      });
    }
  
    // contador
    const total = filtrados.length;
    document.getElementById("contador").textContent =
      total === 1 ? "1 aluno" : `${total} alunos`;
  
    // cards de estatísticas (sempre sobre a lista completa)
    document.getElementById("stat-total").textContent    = alunos.length;
    document.getElementById("stat-ativos").textContent   = alunos.filter(a => a.status === "Ativo").length;
    document.getElementById("stat-inativos").textContent = alunos.filter(a => a.status === "Inativo").length;
    document.getElementById("stat-fcm").textContent      = alunos.filter(a => a.fcm === "Sim").length;
  }
  
  // ─────────────────────────────────────
  //  MODAL — ABRIR / FECHAR
  // ─────────────────────────────────────
  function abrirModal() {
    modoEdicao = false;
    idEditando = null;
    document.getElementById("modalTitulo").textContent = "Novo Aluno";
    ["inputNome", "inputTel", "inputEmail", "inputObs"].forEach(id =>
      (document.getElementById(id).value = "")
    );
    document.getElementById("inputPlano").value  = "Mensal";
    document.getElementById("inputStatus").value = "Ativo";
    document.getElementById("inputFcm").value    = "Sim";
    document.getElementById("inputVcto").value   = "";
    document.getElementById("modalAluno").classList.add("open");
    document.getElementById("inputNome").focus();
  }
  
  function editarAluno(id) {
    const a = alunos.find(x => x.id === id);
    if (!a) return;
    modoEdicao = true;
    idEditando = id;
    document.getElementById("modalTitulo").textContent = "Editar Aluno";
    document.getElementById("inputNome").value   = a.nome;
    document.getElementById("inputTel").value    = a.tel;
    document.getElementById("inputEmail").value  = a.email || "";
    document.getElementById("inputPlano").value  = a.plano;
    document.getElementById("inputVcto").value   = a.vcto  || "";
    document.getElementById("inputStatus").value = a.status;
    document.getElementById("inputFcm").value    = a.fcm;
    document.getElementById("inputObs").value    = a.obs   || "";
    document.getElementById("modalAluno").classList.add("open");
    document.getElementById("inputNome").focus();
  }
  
  // ─────────────────────────────────────
  //  SALVAR (criar ou editar)
  // ─────────────────────────────────────
  function salvarAluno() {
    const nome = document.getElementById("inputNome").value.trim();
    if (!nome) {
      document.getElementById("inputNome").focus();
      showToast("Informe o nome do aluno.");
      return;
    }
  
    const tel    = document.getElementById("inputTel").value.trim();
    const email  = document.getElementById("inputEmail").value.trim();
    const plano  = document.getElementById("inputPlano").value;
    const vcto   = document.getElementById("inputVcto").value;
    const status = document.getElementById("inputStatus").value;
    const fcm    = document.getElementById("inputFcm").value;
    const obs    = document.getElementById("inputObs").value.trim();
  
    if (modoEdicao) {
      const idx = alunos.findIndex(x => x.id === idEditando);
      if (idx !== -1) {
        alunos[idx] = { id: idEditando, nome, tel, email, plano, vcto, status, fcm, obs };
      }
      showToast("Aluno atualizado com sucesso.");
    } else {
      alunos.push({ id: proximoId++, nome, tel, email, plano, vcto, status, fcm, obs });
      showToast("Aluno adicionado com sucesso.");
    }
  
    fecharModal("modalAluno");
    renderizar();
  }
  
  // ─────────────────────────────────────
  //  EXCLUIR
  // ─────────────────────────────────────
  function confirmarExcluirAluno(id) {
    const a = alunos.find(x => x.id === id);
    if (!a) return;
    abrirConfirm(
      "Excluir aluno",
      `Tem certeza que deseja excluir "${a.nome}"? Esta ação não pode ser desfeita.`,
      () => {
        alunos = alunos.filter(x => x.id !== id);
        renderizar();
        showToast("Aluno removido.");
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
      fecharModal("modalAluno");
      fecharConfirm();
    }
  });
  
  // Filtros em tempo real
  document.getElementById("searchInput").addEventListener("input",  renderizar);
  document.getElementById("filterStatus").addEventListener("change", renderizar);
  document.getElementById("filterPlano").addEventListener("change",  renderizar);
  
  // ── Render inicial ──
  renderizar();