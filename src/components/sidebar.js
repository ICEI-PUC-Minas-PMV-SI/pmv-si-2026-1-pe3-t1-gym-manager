const MENU_ITEMS = [
  { label: "Alunos", href: "dashboard-alunos.html", section: "dashboard" },
  { label: "Treinos", href: "dashboard_treinos.html", section: "dashboard" },
  { label: "Agenda", href: "agenda.html", section: "dashboard" },
  { label: "Histórico e Relatórios", href: "historico_relatorio.html", section: "dashboard" },
  { label: "Check-in's por Categoria", href: "analise-categoria.html", section: "analise" },
  { label: "Check-in's por Dia", href: "analise-dia.html", section: "analise" },
  { label: "Editar Cadastro", href: "perfil.html", section: "config" },
  { label: "Editar Treinos", href: "editar-treinos.html", section: "config" }
];

const paginaAtual = window.location.pathname.split('/').pop();

function gerarItensDeSecao(section) {
  const itensDaSecao = MENU_ITEMS.filter(item => item.section === section);
  const htmlDosItens = itensDaSecao.map(item => {
    const estaAtivo = paginaAtual === item.href;
    const classeAtivo = estaAtivo ? "ativo" : "";
    return `
      <li>
        <a href="${item.href}" class="sb-subitem ${classeAtivo}">
          <span class="sb-radio"></span>
          ${item.label}
        </a>
      </li>
    `;
  });
  return htmlDosItens.join('');
}

function secaoTemItemAtivo(section) {
  return MENU_ITEMS.some(item => item.section === section && paginaAtual === item.href);
}

function gerarHTMLSidebar() {
  const dashAtivo = secaoTemItemAtivo("dashboard") ? "secao-ativa" : "";
  const analiseAtivo = secaoTemItemAtivo("analise")  ? "secao-ativa" : "";
  const configAtivo = secaoTemItemAtivo("config") ? "secao-ativa" : "";

  return `
    <nav class="gym-sidebar" id="gymSidebar" aria-label="Menu de navegação">
      <div class="sb-header">
        <div class="sb-logo">
          <span class="sb-logo-fit">GYM</span>
          <span class="sb-logo-clube">MANAGER</span>
        </div>
        <button class="sb-toggle" id="sbToggle" title="Recolher menu" aria-label="Recolher menu">
          <svg viewBox="0 0 24 24" class="icon-fechar"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>
          <svg viewBox="0 0 24 24" class="icon-abrir"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
        </button>
      </div>
      
      <div class="sb-user" id="sbUser">
        <div class="sb-avatar" id="sbUserAvatar">?</div>
        <button class="sb-username" id="sbUserName" title="Ver perfil">Perfil</button>
      </div>
      
      <div class="sb-nav">
        <div class="sb-section" style="margin-bottom: 12px; padding: 0 8px;">
          <button class="sb-mural-btn" id="sbBtnMural" title="Ver Mural de Avisos">
            <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span class="sb-section-label">Mural de Avisos</span>
          </button>
        </div>

        <div class="sb-section">
          <button class="sb-section-header ${dashAtivo}" data-section="sec-dashboard">
            <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span class="sb-section-label">Dashboard</span>
            <svg viewBox="0 0 24 24" class="sb-chevron"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <ul class="sb-subitems" id="sec-dashboard">${gerarItensDeSecao("dashboard")}</ul>
        </div>
        
        <div class="sb-section">
          <button class="sb-section-header ${analiseAtivo}" data-section="sec-analise">
            <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            <span class="sb-section-label">Análise de Dados</span>
            <svg viewBox="0 0 24 24" class="sb-chevron"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <ul class="sb-subitems" id="sec-analise">${gerarItensDeSecao("analise")}</ul>
        </div>
        
        <div class="sb-section">
          <button class="sb-section-header ${configAtivo}" data-section="sec-config">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            <span class="sb-section-label">Configurações</span>
            <svg viewBox="0 0 24 24" class="sb-chevron"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <ul class="sb-subitems" id="sec-config">${gerarItensDeSecao("config")}</ul>
        </div>
      </div>
      
      <div class="sb-footer">
        <a href="../index.html" class="sb-sair">
          <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          <span class="sb-section-label">Sair</span>
        </a>
      </div>
    </nav>

    <div class="mural-overlay" id="muralGlobalOverlay">
      <div class="mural-modal">
        <div class="mural-header">
          <h2>Mural de Avisos</h2>
          <div style="display:flex; gap:10px; align-items:center;">
            <button id="btnNovoAvisoGlobal" class="mural-btn-novo" style="display:none;">+ Novo Aviso</button>
            <button class="mural-close" id="btnFecharMural"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
          </div>
        </div>
        
        <div class="mural-body" id="muralListaAvisos"></div>
        
        <div class="mural-form" id="muralFormAviso" style="display:none;">
          <label>Mensagem do Comunicado</label>
          <textarea id="muralInpTexto" placeholder="Digite o aviso para a equipa..."></textarea>
          <label>Data de Expiração</label>
          <input type="date" id="muralInpData" />
          <div class="mural-form-actions">
            <button class="mural-btn-cancel" id="btnCancelarAvisoGlobal">Cancelar</button>
            <button class="mural-btn-save" id="btnSalvarAvisoGlobal">Publicar</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

const CSS_SIDEBAR = `
  :root {
    --sb-w-aberta: 240px; --sb-w-fechada: 56px;
    --sb-accent: #3B3A96; --sb-accent-bg: #EEEDFE;
    --sb-orange: #E65100; --sb-text: #1A1918;
    --sb-muted: #7A786F;  --sb-border: #E2E0D8;
    --sb-surface: #FFFFFF; --sb-bg: #F4F3EF;
    --sb-transition: 0.25s ease;
  }
  
  /* ESTILOS DA BARRA LATERAL (Inalterados) */
  .gym-sidebar { width: var(--sb-w-aberta); min-height: 100vh; background: var(--sb-surface); border-right: 1px solid var(--sb-border); display: flex; flex-direction: column; flex-shrink: 0; overflow: hidden; transition: width var(--sb-transition); position: relative; z-index: 100; font-family: 'DM Sans', sans-serif; }
  .gym-sidebar.fechada { width: var(--sb-w-fechada); }
  .sb-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 12px 12px; min-height: 64px; border-bottom: 1px solid var(--sb-border); flex-shrink: 0; overflow: hidden; white-space: nowrap; }
  .sb-logo { display: flex; flex-direction: column; line-height: 1; font-weight: 700; font-size: 18px; min-width: 0; opacity: 1; transition: opacity var(--sb-transition); }
  .gym-sidebar.fechada .sb-logo { opacity: 0; width: 0; pointer-events: none; }
  .gym-sidebar.fechada .sb-header { justify-content: center; padding-left: 0; padding-right: 0; }
  .sb-logo-fit { color: var(--sb-accent); } .sb-logo-clube { color: var(--sb-orange); }
  .sb-toggle { width: 32px; height: 32px; border: none; background: none; cursor: pointer; color: var(--sb-muted); display: flex; align-items: center; justify-content: center; border-radius: 6px; flex-shrink: 0; position: relative; z-index: 2; transition: background 0.15s, color 0.15s; }
  .sb-toggle:hover { background: var(--sb-bg); color: var(--sb-text); }
  .sb-toggle svg { width: 18px; height: 18px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; }
  .sb-user { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 12px; border-bottom: 1px solid var(--sb-border); flex-shrink: 0; background: var(--sb-surface); }
  .sb-avatar { width: 48px; height: 48px; border-radius: 50%; background: #DDDBE8; display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--sb-accent); font-size: 18px; }
  .sb-username { background: none; border: none; padding: 0; margin: 0; color: var(--sb-text); font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; }
  .gym-sidebar.fechada .sb-username { opacity: 0; width: 0; height: 0; padding: 0; margin: 0; pointer-events: none; }
  .gym-sidebar .icon-abrir { display: none; } .gym-sidebar .icon-fechar { display: block; }
  .gym-sidebar.fechada .icon-abrir { display: block; } .gym-sidebar.fechada .icon-fechar { display: none; }
  .sb-nav { flex: 1; overflow-y: auto; overflow-x: hidden; padding: 8px 0; }
  .sb-nav::-webkit-scrollbar { width: 4px; } .sb-nav::-webkit-scrollbar-thumb { background: var(--sb-border); border-radius: 2px; }
  .sb-section { margin-bottom: 2px; }
  .sb-section-header { width: 100%; display: flex; align-items: center; gap: 10px; padding: 9px 12px; border: none; background: none; cursor: pointer; color: var(--sb-text); font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; text-align: left; border-radius: 6px; margin: 0 4px; width: calc(100% - 8px); transition: background 0.15s; white-space: nowrap; overflow: hidden; }
  .sb-section-header:hover { background: var(--sb-bg); }
  .sb-section-header.secao-ativa { color: var(--sb-accent); }
  .sb-section-header > svg:first-child { width: 18px; height: 18px; stroke: currentColor; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; flex-shrink: 0; }
  .sb-section-label { flex: 1; transition: opacity var(--sb-transition); }
  .gym-sidebar.fechada .sb-section-label { opacity: 0; }
  .sb-chevron { width: 14px !important; height: 14px !important; stroke: currentColor; fill: none; stroke-width: 2; transition: transform 0.2s; }
  .sb-section-header.aberta .sb-chevron { transform: rotate(180deg); }
  .gym-sidebar.fechada .sb-chevron { opacity: 0; }
  .sb-subitems { list-style: none; padding: 0; margin: 0; max-height: 500px; overflow: hidden; transition: max-height 0.25s ease; }
  .sb-subitems.recolhida { max-height: 0; } .gym-sidebar.fechada .sb-subitems { max-height: 0; }
  .sb-subitem { display: flex; align-items: center; gap: 10px; padding: 8px 14px 8px 40px; font-size: 13px; color: var(--sb-muted); text-decoration: none; border-radius: 6px; margin: 1px 4px; transition: background 0.15s, color 0.15s; white-space: nowrap; overflow: hidden; }
  .sb-subitem:hover { background: var(--sb-bg); color: var(--sb-text); }
  .sb-subitem.ativo { background: var(--sb-accent-bg); color: var(--sb-accent); font-weight: 600; }
  .sb-radio { width: 8px; height: 8px; border-radius: 50%; border: 2px solid currentColor; flex-shrink: 0; transition: background 0.15s; }
  .sb-subitem.ativo .sb-radio { background: var(--sb-accent); }
  .sb-footer { border-top: 1px solid var(--sb-border); padding: 12px 8px; flex-shrink: 0; }
  .sb-sair { display: flex; align-items: center; gap: 10px; padding: 9px 12px; color: var(--sb-muted); text-decoration: none; border-radius: 8px; font-size: 13px; font-weight: 500; font-family: 'DM Sans', sans-serif; transition: background 0.15s, color 0.15s; white-space: nowrap; overflow: hidden; }
  .sb-sair:hover { background: #FFF0EC; color: #C0392B; }
  .sb-sair svg { width: 18px; height: 18px; stroke: currentColor; fill: none; stroke-width: 1.8; stroke-linecap: round; flex-shrink: 0; }

  /* BOTÃO DO MURAL NA BARRA LATERAL */
  .sb-mural-btn {
    width: calc(100% - 8px); display: flex; align-items: center; gap: 10px; margin: 0 4px;
    padding: 9px 12px; border: 1px dashed var(--sb-accent); background: var(--sb-accent-bg); 
    cursor: pointer; color: var(--sb-accent); font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600; text-align: left;
    border-radius: 6px; transition: background 0.15s; white-space: nowrap; overflow: hidden;
  }
  .sb-mural-btn:hover { background: #E0DEFD; }
  .sb-mural-btn svg { width: 18px; height: 18px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; flex-shrink: 0; }
  .gym-sidebar.fechada .sb-mural-btn { padding: 9px; justify-content: center; }

  /* ESTILOS DO MODAL GLOBAL DO MURAL */
  .mural-overlay {
    display: none; position: fixed; inset: 0; background: rgba(26,25,24,0.4); 
    z-index: 9999; align-items: center; justify-content: center; font-family: 'DM Sans', sans-serif;
  }
  .mural-overlay.open { display: flex; }
  .mural-modal {
    background: var(--sb-surface); border-radius: 12px; width: 440px; max-width: 95vw;
    box-shadow: 0 12px 40px rgba(0,0,0,0.15); animation: muralIn 0.2s ease; overflow: hidden;
    display: flex; flex-direction: column; max-height: 85vh;
  }
  @keyframes muralIn { from { opacity: 0; transform: scale(0.96) translateY(10px); } to { opacity: 1; transform: none; } }
  
  .mural-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; border-bottom: 1px solid var(--sb-border); background: #FAFAF8; }
  .mural-header h2 { font-size: 16px; font-weight: 600; color: var(--sb-text); margin: 0; }
  
  .mural-btn-novo { background: none; border: none; color: var(--sb-accent); font-size: 12px; font-weight: 600; cursor: pointer; transition: opacity 0.15s; font-family: inherit; }
  .mural-btn-novo:hover { opacity: 0.7; text-decoration: underline; }
  .mural-close { width: 28px; height: 28px; border: none; background: none; cursor: pointer; border-radius: 6px; color: var(--sb-muted); display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
  .mural-close:hover { background: var(--sb-bg); }
  .mural-close svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; stroke-linecap: round; }

  .mural-body { padding: 24px; overflow-y: auto; flex: 1; }
  .mural-item { margin-bottom: 18px; padding-bottom: 18px; border-bottom: 1px dashed var(--sb-border); }
  .mural-item:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
  .mural-meta { display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--sb-muted); margin-bottom: 8px; }
  .mural-autor { font-weight: 600; color: var(--sb-text); }
  .mural-data { background: #FDECEA; color: #C0392B; padding: 3px 8px; border-radius: 4px; font-weight: 600; }
  .mural-texto { font-size: 13.5px; color: var(--sb-text); line-height: 1.5; }
  .mural-vazio { text-align: center; color: var(--sb-muted); font-size: 13px; margin: 20px 0; }

  .mural-form { display: flex; flex-direction: column; gap: 12px; padding: 24px; }
  .mural-form label { font-size: 11px; font-weight: 600; color: var(--sb-muted); text-transform: uppercase; letter-spacing: 0.05em; }
  .mural-form textarea, .mural-form input { width: 100%; border: 1px solid var(--sb-border); border-radius: 8px; font-family: inherit; font-size: 13px; padding: 12px; outline: none; background: var(--sb-surface); }
  .mural-form textarea { height: 90px; resize: none; }
  .mural-form textarea:focus, .mural-form input:focus { border-color: var(--sb-accent); }
  .mural-form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; }
  
  .mural-btn-cancel { height: 36px; padding: 0 16px; border: 1px solid var(--sb-border); border-radius: 8px; background: none; font-family: inherit; font-size: 13px; color: var(--sb-muted); cursor: pointer; transition: background 0.15s; }
  .mural-btn-cancel:hover { background: var(--sb-bg); }
  .mural-btn-save { height: 36px; padding: 0 20px; background: var(--sb-accent); color: #fff; border: none; border-radius: 8px; font-family: inherit; font-size: 13px; font-weight: 500; cursor: pointer; transition: opacity 0.15s; }
  .mural-btn-save:hover { opacity: 0.88; }
`;

function inicializarInteratividade() {
  // --- ORIGINAL DA SIDEBAR ---
  const sidebar = document.getElementById('gymSidebar');
  const btnToggle = document.getElementById('sbToggle');

  if (btnToggle && sidebar) {
    btnToggle.addEventListener('click', function() {
      sidebar.classList.toggle('fechada');
      try { localStorage.setItem('sidebarFechada', sidebar.classList.contains('fechada')); } catch (e) {}
    });
    if (localStorage.getItem('sidebarFechada') === 'true') sidebar.classList.add('fechada');
  }

  const elAvatar = document.getElementById('sbUserAvatar');
  const elNome   = document.getElementById('sbUserName');
  let perfilFunc = 'Gestão';
  try {
    const perfil = JSON.parse(localStorage.getItem('gymmanager_perfil') || '{}');
    if (perfil.funcao) perfilFunc = perfil.funcao;
    const nome = perfil.nome ? perfil.nome : '';
    const iniciais = nome.trim() ? nome.trim().split(' ').filter(Boolean).slice(0,2).map(p => p[0]).join('').toUpperCase() : '?';
    if (elAvatar) elAvatar.textContent = iniciais;
    if (elNome) {
      elNome.textContent = nome || 'Perfil';
      elNome.addEventListener('click', () => window.location.href = 'perfil.html');
    }
  } catch (e) {}

  const botoesSecao = document.querySelectorAll('.sb-section-header');
  botoesSecao.forEach(function(botao) {
    const idSecao = botao.getAttribute('data-section');
    const listaSubitens = document.getElementById(idSecao);
    if (!listaSubitens) return;

    if (listaSubitens.querySelector('.ativo')) {
      botao.classList.add('aberta');
    } else {
      listaSubitens.classList.add('recolhida');
    }
    
    botao.addEventListener('click', function() {
      const estaAberta = botao.classList.contains('aberta');
      if (estaAberta) {
        botao.classList.remove('aberta');
        listaSubitens.classList.add('recolhida');
      } else {
        botao.classList.add('aberta');
        listaSubitens.classList.remove('recolhida');
      }
    });
  });

  // --- MURAL DE AVISOS GLOBAL ---
  const muralOverlay = document.getElementById('muralGlobalOverlay');
  const btnAbrirMural = document.getElementById('sbBtnMural');
  const btnFecharMural = document.getElementById('btnFecharMural');
  const listaAvisos = document.getElementById('muralListaAvisos');
  const formAviso = document.getElementById('muralFormAviso');
  const btnNovoAviso = document.getElementById('btnNovoAvisoGlobal');

  // permissão para criar avisos
  if (perfilFunc === 'Gerente' || perfilFunc === 'Admin') {
    btnNovoAviso.style.display = 'block';
  }

  function carregarAvisos() {
    const avisos = JSON.parse(localStorage.getItem('gymmanager_avisos') || '[]');
    if (avisos.length === 0 && !localStorage.getItem('gymmanager_avisos_init')) {
      avisos.push({ id: 1, autor: "Gestão", expira: "2026-06-10", texto: "Reunião de alinhamento com todos os instrutores nesta sexta-feira às 14h. Presença obrigatória." });
      avisos.push({ id: 2, autor: "Manutenção", expira: "2026-06-06", texto: "A catraca 2 passará por manutenção preventiva amanhã durante o período da manhã." });
      localStorage.setItem('gymmanager_avisos', JSON.stringify(avisos));
      localStorage.setItem('gymmanager_avisos_init', 'true');
    }

    listaAvisos.innerHTML = '';
    if (avisos.length === 0) {
      listaAvisos.innerHTML = '<div class="mural-vazio">Não existem avisos ativos neste momento.</div>';
    } else {
      avisos.forEach(a => {
        const dataFmt = new Date(a.expira + "T12:00:00").toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        listaAvisos.innerHTML += `
          <div class="mural-item">
            <div class="mural-meta"><span class="mural-autor">${a.autor}</span><span class="mural-data">Até ${dataFmt}</span></div>
            <div class="mural-texto">${a.texto}</div>
          </div>
        `;
      });
    }
  }

  function abrirMural() {
    carregarAvisos();
    muralOverlay.classList.add('open');
    formAviso.style.display = 'none';
    listaAvisos.style.display = 'block';
    if (perfilFunc === 'Gerente' || perfilFunc === 'Admin') btnNovoAviso.style.display = 'block';
  }

  btnAbrirMural.addEventListener('click', abrirMural);
  btnFecharMural.addEventListener('click', () => muralOverlay.classList.remove('open'));
  muralOverlay.addEventListener('click', (e) => { if (e.target === muralOverlay) muralOverlay.classList.remove('open'); });

  btnNovoAviso.addEventListener('click', () => {
    listaAvisos.style.display = 'none';
    formAviso.style.display = 'flex';
    btnNovoAviso.style.display = 'none';
  });

  document.getElementById('btnCancelarAvisoGlobal').addEventListener('click', () => {
    formAviso.style.display = 'none';
    listaAvisos.style.display = 'block';
    btnNovoAviso.style.display = 'block';
  });

  document.getElementById('btnSalvarAvisoGlobal').addEventListener('click', () => {
    const texto = document.getElementById('muralInpTexto').value.trim();
    const expira = document.getElementById('muralInpData').value;

    if (!texto || !expira) {
      alert('Por favor, preencha a mensagem e a data de expiração.');
      return;
    }

    const avisos = JSON.parse(localStorage.getItem('gymmanager_avisos') || '[]');
    avisos.unshift({ id: Date.now(), autor: perfilFunc, expira, texto });
    localStorage.setItem('gymmanager_avisos', JSON.stringify(avisos));

    document.getElementById('muralInpTexto').value = '';
    document.getElementById('muralInpData').value = '';
    
    formAviso.style.display = 'none';
    listaAvisos.style.display = 'block';
    btnNovoAviso.style.display = 'block';
    carregarAvisos();
  });

  // --- O CONTROLO DE SESSAO  ---
  // verifica se e o primeiro acesso  nessa aba
  if (!sessionStorage.getItem('mural_visto_sessao')) {
    sessionStorage.setItem('mural_visto_sessao', 'true');
    //  delay
    setTimeout(abrirMural, 300);
  }
}

function mountSidebar() {
  const tagEstilo = document.createElement('style');
  tagEstilo.textContent = CSS_SIDEBAR;
  document.head.appendChild(tagEstilo);
  
  const container = document.getElementById('sidebar-container');
  if (!container) return;
  
  container.innerHTML = gerarHTMLSidebar();
  inicializarInteratividade();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountSidebar);
} else {
  mountSidebar();
}