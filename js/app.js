/* ==========================================================================
   DFK40063 SERVER ADMINISTRATION - MAIN INTERACTIVE APPLICATION CONTROLLER
   ========================================================================== */

(function () {
  const state = {
    activeView: "topik-1", // "topik-1".."topik-5", "terminal-lab", "course-info"
    activeTab: "notes",    // "notes", "labs", "sim", "quiz"
    activeSubtopic: "ALL",
    activeLabIndex: 0,
    searchQuery: "",
    xp: parseInt(localStorage.getItem("dfk40063_xp") || "0", 10),
    quizScores: JSON.parse(localStorage.getItem("dfk40063_scores") || "{}"),
    presentationMode: false
  };

  function addXP(points) {
    state.xp += points;
    localStorage.setItem("dfk40063_xp", String(state.xp));
    updateProgressUI();
  }

  function saveQuizScore(topicId, score, total) {
    state.quizScores[topicId] = { score, total };
    localStorage.setItem("dfk40063_scores", JSON.stringify(state.quizScores));
    updateProgressUI();
    renderSidebarNav();
  }

  function updateProgressUI() {
    const xpEl = document.getElementById("xp-badge-val");
    const barEl = document.getElementById("overall-progress-fill");
    const textEl = document.getElementById("progress-completed-text");
    if (xpEl) xpEl.textContent = `${state.xp} XP`;

    const topics = window.COURSE_TOPICS || [];
    const completedCount = topics.filter(t => state.quizScores[t.id] && state.quizScores[t.id].score >= Math.ceil(state.quizScores[t.id].total * 0.5)).length;
    const missions = window.LinuxSimulator ? window.LinuxSimulator.getMissions() : [];
    const doneMissions = missions.filter(m => m.done).length;

    const pct = Math.min(100, Math.round(((completedCount * 15) + (doneMissions * 4)) / 99 * 100));
    if (barEl) barEl.style.width = `${pct}%`;
    if (textEl) textEl.textContent = `${completedCount}/5 Topik Kuiz | ${doneMissions}/6 Misi CLI`;
  }

  // ========================================================================
  // SIDEBAR NAVIGATION
  // ========================================================================
  function renderSidebarNav() {
    const navContainer = document.getElementById("topic-nav-list");
    if (!navContainer) return;

    const topics = window.COURSE_TOPICS || [];
    let html = "";

    topics.forEach((t, idx) => {
      const isActive = state.activeView === t.id;
      const isDone = state.quizScores[t.id] && state.quizScores[t.id].score >= Math.ceil(state.quizScores[t.id].total * 0.5);
      html += `
        <li class="nav-item">
          <button class="nav-btn ${isActive ? "active" : ""} ${isDone ? "completed" : ""}" data-view="${t.id}">
            <span class="nav-num">${idx + 1}.0</span>
            <span class="nav-text">
              <span class="nav-title">${t.shortTitle}</span>
              <span class="nav-subtitle">${t.clo} • ${t.notes.length} Subtopik</span>
            </span>
            <span class="nav-check">✓</span>
          </button>
        </li>
      `;
    });

    // Special Interactive Modules
    html += `
      <li class="nav-section-label" style="padding-left:8px; margin-top:10px;">MAKMAL & PENILAIAN</li>
      <li class="nav-item">
        <button class="nav-btn ${state.activeView === "terminal-lab" ? "active" : ""}" data-view="terminal-lab">
          <span class="nav-num">💻</span>
          <span class="nav-text">
            <span class="nav-title">Simulator Terminal Linux</span>
            <span class="nav-subtitle">6 Misi Amali Interaktif CLI</span>
          </span>
        </button>
      </li>
      <li class="nav-item">
        <button class="nav-btn ${state.activeView === "course-info" ? "active" : ""}" data-view="course-info">
          <span class="nav-num">📋</span>
          <span class="nav-text">
            <span class="nav-title">Info Kursus & Penilaian</span>
            <span class="nav-subtitle">CLO, PLO, SLT & Agihan PB/PA</span>
          </span>
        </button>
      </li>
    `;

    navContainer.innerHTML = html;

    navContainer.querySelectorAll(".nav-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetView = btn.getAttribute("data-view");
        state.activeView = targetView;
        state.activeTab = "notes";
        state.activeSubtopic = "ALL";
        state.activeLabIndex = 0;
        state.searchQuery = "";
        const searchInput = document.getElementById("global-search-input");
        if (searchInput) searchInput.value = "";
        document.getElementById("sidebar")?.classList.remove("open");
        renderSidebarNav();
        renderMainContent();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  // ========================================================================
  // MAIN CONTENT RENDERER
  // ========================================================================
  function renderMainContent() {
    const container = document.getElementById("main-content-container");
    if (!container) return;

    if (state.searchQuery.trim().length > 1) {
      renderSearchResults(container, state.searchQuery.trim());
      return;
    }

    if (state.activeView === "terminal-lab") {
      renderFullTerminalView(container);
      return;
    }

    if (state.activeView === "course-info") {
      renderCourseInfoView(container);
      return;
    }

    const topic = (window.COURSE_TOPICS || []).find(t => t.id === state.activeView) || window.COURSE_TOPICS[0];
    if (!topic) return;

    const savedScore = state.quizScores[topic.id];
    const scoreBadge = savedScore ? `${savedScore.score}/${savedScore.total}` : `${topic.quizzes.length} Soalan`;

    let html = `
      <!-- BERFEST HERO CARD -->
      <section class="berfest-hero">
        <div class="hero-left">
          <div class="berfest-corner-tag">
            <span class="dot"></span>
            <span>DFK40063 SERVER ADMINISTRATION • ${topic.code}</span>
          </div>
          <h2>${topic.title.replace(/^(\d+\.\d+)\s*/, '<span class="accent-text">$1</span> ')}</h2>
          <p>${topic.summary}</p>
          <div class="hero-badges">
            <div class="clo-pill"><span>CLO</span> ${topic.clo}</div>
            <div class="clo-pill"><span>SLT</span> ${topic.slt}</div>
          </div>
        </div>
        <div class="hero-right">
          ${topic.heroStats.map(st => `
            <div class="berfest-floating-stat">
              <div class="stat-ring">
                <div class="stat-ring-inner">${st.percent}</div>
              </div>
              <div class="stat-info">
                <h4>${st.title}</h4>
                <p>${st.desc}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </section>

      <!-- MODE TABS -->
      <nav class="mode-tabs">
        <button class="mode-tab-btn ${state.activeTab === "notes" ? "active" : ""}" data-tab="notes">
          📖 Nota & Penerangan Jelas <span class="mode-tab-badge">${topic.notes.length} Unit</span>
        </button>
        <button class="mode-tab-btn ${state.activeTab === "labs" ? "active" : ""}" data-tab="labs">
          🛠️ Jalan Kerja Step-by-Step <span class="mode-tab-badge">${topic.labs.length} Amali</span>
        </button>
        <button class="mode-tab-btn ${state.activeTab === "sim" ? "active" : ""}" data-tab="sim">
          ⚡ Simulasi Interaktif <span class="mode-tab-badge">Hands-On</span>
        </button>
        <button class="mode-tab-btn ${state.activeTab === "quiz" ? "active" : ""}" data-tab="quiz">
          🎯 Soalan Latihan Topik <span class="mode-tab-badge">${scoreBadge}</span>
        </button>
      </nav>

      <div id="topic-tab-stage"></div>
    `;

    container.innerHTML = html;

    container.querySelectorAll(".mode-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        state.activeTab = btn.getAttribute("data-tab");
        renderMainContent();
      });
    });

    const stage = document.getElementById("topic-tab-stage");
    if (state.activeTab === "notes") renderTopicNotes(stage, topic);
    else if (state.activeTab === "labs") renderTopicLabs(stage, topic);
    else if (state.activeTab === "sim") renderTopicSimulator(stage, topic);
    else if (state.activeTab === "quiz") renderTopicQuiz(stage, topic);
  }

  // ========================================================================
  // 1. NOTA LENGKAP & PENERANGAN JELAS
  // ========================================================================
  function renderTopicNotes(stage, topic) {
    const subtopics = ["ALL", ...new Set(topic.notes.map(n => n.subtopic))];
    const filteredNotes = state.activeSubtopic === "ALL"
      ? topic.notes
      : topic.notes.filter(n => n.subtopic === state.activeSubtopic);

    let html = `
      <div class="subtopic-filter-bar">
        ${subtopics.map(st => `
          <button class="subtopic-chip ${state.activeSubtopic === st ? "active" : ""}" data-sub="${st}">
            ${st === "ALL" ? "Semua Subtopik (" + topic.notes.length + ")" : "Subtopik " + st}
          </button>
        `).join("")}
      </div>
      <div class="notes-grid">
        ${filteredNotes.map(note => renderSingleNoteCard(note)).join("")}
      </div>
    `;

    stage.innerHTML = html;

    stage.querySelectorAll(".subtopic-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        state.activeSubtopic = chip.getAttribute("data-sub");
        renderTopicNotes(stage, topic);
      });
    });
  }

  function formatInlineCode(str) {
    if (!str) return "";
    return str
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, '<code class="cmd-inline">$1</code>');
  }

  function renderSingleNoteCard(note) {
    let tableHtml = "";
    if (note.tableHeaders && note.tableRows) {
      tableHtml = `
        <h4 style="margin-top:22px; margin-bottom:10px; font-size:0.95rem; color:var(--berfest-crimson);">
          📊 ${note.tableTitle || "Jadual Rujukan Pantas"}
        </h4>
        <div class="berfest-table-wrap">
          <table class="berfest-table">
            <thead>
              <tr>${note.tableHeaders.map(th => `<th>${th}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${note.tableRows.map(row => `
                <tr>${row.map(cell => `<td>${formatInlineCode(cell)}</td>`).join("")}</tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    }

    return `
      <article class="berfest-note-card">
        <div class="note-card-header">
          <div class="note-title-group">
            <h3>${note.title}</h3>
            <p>${note.subtitle}</p>
          </div>
          <span class="note-code-badge">Silibus ${note.code}</span>
        </div>
        <div class="note-card-body">
          <div class="concept-explanation-box">
            <h4>💡 Penerangan Konsep & Analogi Mudah Faham</h4>
            <p>${formatInlineCode(note.concept)}</p>
          </div>
          <div class="berfest-feature-grid">
            ${(note.features || []).map(f => `
              <div class="berfest-mini-card">
                <div class="mini-card-icon">${f.icon}</div>
                <h5>${f.title}</h5>
                <p>${formatInlineCode(f.desc)}</p>
                ${f.bullets ? `
                  <ul>
                    ${f.bullets.map(b => `<li>${formatInlineCode(b)}</li>`).join("")}
                  </ul>
                ` : ""}
              </div>
            `).join("")}
          </div>
          ${tableHtml}
        </div>
      </article>
    `;
  }

  // ========================================================================
  // 2. JALAN KERJA STEP-BY-STEP (HANDS-ON LABS)
  // ========================================================================
  function renderTopicLabs(stage, topic) {
    const activeLab = topic.labs[state.activeLabIndex] || topic.labs[0];

    stage.innerHTML = `
      <div class="step-player-container">
        <aside class="step-lab-selector">
          <h4>Pilih Modul Jalan Kerja</h4>
          ${topic.labs.map((lab, idx) => `
            <button class="lab-list-btn ${idx === state.activeLabIndex ? "active" : ""}" data-lab-idx="${idx}">
              <span class="lab-badge-num">${idx + 1}</span>
              <span class="lab-btn-info">
                <strong>${lab.title}</strong>
                <span>${lab.steps.length} Langkah Lengkap</span>
              </span>
            </button>
          `).join("")}
          <div style="margin-top:16px; padding:14px; background:var(--bg-soft); border-radius:14px; border:1px solid var(--border-warm); font-size:0.8rem;">
            <strong style="color:var(--berfest-crimson); display:block; margin-bottom:6px;">🚀 Cuba Terus di Browser!</strong>
            <p style="color:var(--text-secondary); margin-bottom:10px;">Anda boleh menyalin arahan di sebelah dan mengujinya terus di dalam Simulator Terminal Linux.</p>
            <button class="btn-pill btn-pill-primary" id="open-sim-from-lab" style="width:100%; justify-content:center;">
              Buka Simulator Terminal
            </button>
          </div>
        </aside>

        <div class="step-stage-card">
          <div class="step-stage-header">
            <span style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.08em; opacity:0.9; font-weight:800;">
              PANDUAN AMALI LANGKAH DEMI LANGKAH • ${topic.code}
            </span>
            <h3 style="font-size:1.35rem; margin-top:4px;">${activeLab.title}</h3>
            <p style="font-size:0.86rem; opacity:0.92; margin-top:4px;">${activeLab.subtitle}</p>
          </div>
          <div class="step-stage-body">
            <div class="step-timeline">
              ${activeLab.steps.map((step, sIdx) => `
                <div class="step-item-card">
                  <div class="step-item-top">
                    <div class="step-circle">${sIdx + 1}</div>
                    <h4>Langkah ${sIdx + 1}: ${step.title}</h4>
                  </div>
                  <p class="step-desc">${formatInlineCode(step.desc)}</p>
                  <div class="terminal-code-box">
                    <div class="terminal-bar">
                      <div class="terminal-dots"><span></span><span></span><span></span></div>
                      <span>Terminal / Arahan Konfigurasi</span>
                      <button class="copy-cmd-btn" data-cmd="${encodeURIComponent(step.cmd)}">📋 Salin Arahan</button>
                    </div>
                    <pre class="terminal-pre">${escapeHtml(step.cmd)}</pre>
                  </div>
                  <div class="step-why-note">
                    <span>💡</span>
                    <div><strong>Kenapa langkah ini penting?</strong> ${formatInlineCode(step.why)}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;

    stage.querySelectorAll(".lab-list-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        state.activeLabIndex = parseInt(btn.getAttribute("data-lab-idx"), 10);
        renderTopicLabs(stage, topic);
      });
    });

    stage.querySelectorAll(".copy-cmd-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const raw = decodeURIComponent(btn.getAttribute("data-cmd"));
        navigator.clipboard?.writeText(raw);
        btn.textContent = "✓ Berjaya Disalin!";
        addXP(5);
        setTimeout(() => { btn.textContent = "📋 Salin Arahan"; }, 1800);
      });
    });

    document.getElementById("open-sim-from-lab")?.addEventListener("click", () => {
      state.activeView = "terminal-lab";
      renderSidebarNav();
      renderMainContent();
    });
  }

  // ========================================================================
  // 3. SIMULASI INTERAKTIF MENGIKUT TOPIK
  // ========================================================================
  function renderTopicSimulator(stage, topic) {
    if (topic.id === "topik-3") {
      renderChmodAndFhsSimulator(stage);
    } else if (topic.id === "topik-4") {
      renderWindowsSharePermissionSimulator(stage);
    } else if (topic.id === "topik-5") {
      renderBackupStrategySimulator(stage);
    } else {
      // Topics 1 & 2 get embedded live terminal + interactive quick cards
      renderEmbeddedTerminalSimulator(stage, topic);
    }
  }

  // Interactive Widget A: Linux chmod Calculator + FHS Explorer (Topic 3)
  function renderChmodAndFhsSimulator(stage) {
    stage.innerHTML = `
      <div class="interactive-widget-card">
        <div class="widget-header">
          <div>
            <h3 style="font-size:1.2rem;">🔐 Kalkulator & Visualiser Keizinan Linux (chmod Octal & Symbolic)</h3>
            <p style="font-size:0.83rem; opacity:0.9;">Tandakan kotak Read (4), Write (2), Execute (1) atau Special Bits untuk melihat arahan chmod secara langsung!</p>
          </div>
          <span class="xp-badge">Subtopik 3.7 Interaktif</span>
        </div>
        <div class="widget-body">
          <div class="chmod-grid">
            <div class="chmod-col">
              <h5>👤 Owner / User (u) <span id="chmod-u-oct">7</span></h5>
              <label class="chmod-check-label"><span>Read (r = 4)</span><input type="checkbox" class="chmod-cb" data-grp="u" data-val="4" checked></label>
              <label class="chmod-check-label"><span>Write (w = 2)</span><input type="checkbox" class="chmod-cb" data-grp="u" data-val="2" checked></label>
              <label class="chmod-check-label"><span>Execute (x = 1)</span><input type="checkbox" class="chmod-cb" data-grp="u" data-val="1" checked></label>
              <label class="chmod-check-label" style="background:#FEF3C7;"><span>SUID (4000 / u+s)</span><input type="checkbox" id="cb-suid"></label>
            </div>
            <div class="chmod-col">
              <h5>👥 Group (g) <span id="chmod-g-oct">5</span></h5>
              <label class="chmod-check-label"><span>Read (r = 4)</span><input type="checkbox" class="chmod-cb" data-grp="g" data-val="4" checked></label>
              <label class="chmod-check-label"><span>Write (w = 2)</span><input type="checkbox" class="chmod-cb" data-grp="g" data-val="2"></label>
              <label class="chmod-check-label"><span>Execute (x = 1)</span><input type="checkbox" class="chmod-cb" data-grp="g" data-val="1" checked></label>
              <label class="chmod-check-label" style="background:#FEF3C7;"><span>SGID (2000 / g+s)</span><input type="checkbox" id="cb-sgid"></label>
            </div>
            <div class="chmod-col">
              <h5>🌍 Others (o) <span id="chmod-o-oct">0</span></h5>
              <label class="chmod-check-label"><span>Read (r = 4)</span><input type="checkbox" class="chmod-cb" data-grp="o" data-val="4"></label>
              <label class="chmod-check-label"><span>Write (w = 2)</span><input type="checkbox" class="chmod-cb" data-grp="o" data-val="2"></label>
              <label class="chmod-check-label"><span>Execute (x = 1)</span><input type="checkbox" class="chmod-cb" data-grp="o" data-val="1"></label>
              <label class="chmod-check-label" style="background:#FEF3C7;"><span>Sticky Bit (1000 / +t)</span><input type="checkbox" id="cb-sticky"></label>
            </div>
          </div>

          <div class="chmod-result-banner">
            <div>
              <div style="font-size:0.75rem; color:#94A3B8; text-transform:uppercase;">Arahan Oktal Linux</div>
              <div class="chmod-big-octal" id="chmod-cmd-display">chmod 750 skrip_pelayan.sh</div>
            </div>
            <div>
              <div style="font-size:0.75rem; color:#94A3B8; text-transform:uppercase;">Paparan ls -l (Simbolik)</div>
              <div class="chmod-big-sym" id="chmod-sym-display">-rwxr-x---</div>
            </div>
            <div>
              <button class="btn-pill btn-pill-primary" id="chmod-preset-755">Preset 755</button>
              <button class="btn-pill btn-pill-outline" id="chmod-preset-644" style="margin-left:6px;">Preset 644</button>
              <button class="btn-pill btn-pill-outline" id="chmod-preset-1777" style="margin-left:6px;">/tmp (1777)</button>
            </div>
          </div>
        </div>
      </div>

      <div id="embedded-term-holder"></div>
    `;

    function updateChmodCalc() {
      let u = 0, g = 0, o = 0, sp = 0;
      stage.querySelectorAll('.chmod-cb[data-grp="u"]:checked').forEach(cb => u += parseInt(cb.dataset.val));
      stage.querySelectorAll('.chmod-cb[data-grp="g"]:checked').forEach(cb => g += parseInt(cb.dataset.val));
      stage.querySelectorAll('.chmod-cb[data-grp="o"]:checked').forEach(cb => o += parseInt(cb.dataset.val));

      if (document.getElementById("cb-suid")?.checked) sp += 4;
      if (document.getElementById("cb-sgid")?.checked) sp += 2;
      if (document.getElementById("cb-sticky")?.checked) sp += 1;

      document.getElementById("chmod-u-oct").textContent = u;
      document.getElementById("chmod-g-oct").textContent = g;
      document.getElementById("chmod-o-oct").textContent = o;

      const octStr = (sp > 0 ? String(sp) : "") + `${u}${g}${o}`;
      const symMap = ["---", "--x", "-w-", "-wx", "r--", "r-x", "rw-", "rwx"];
      let chars = ("-" + symMap[u] + symMap[g] + symMap[o]).split("");
      if (sp & 4) chars[3] = chars[3] === "x" ? "s" : "S";
      if (sp & 2) chars[6] = chars[6] === "x" ? "s" : "S";
      if (sp & 1) chars[9] = chars[9] === "x" ? "t" : "T";

      document.getElementById("chmod-cmd-display").textContent = `chmod ${octStr} skrip_pelayan.sh`;
      document.getElementById("chmod-sym-display").textContent = chars.join("");
    }

    stage.querySelectorAll(".chmod-cb, #cb-suid, #cb-sgid, #cb-sticky").forEach(el => {
      el.addEventListener("change", () => {
        updateChmodCalc();
        addXP(2);
      });
    });

    function applyPreset(uVal, gVal, oVal, sticky) {
      stage.querySelectorAll(".chmod-cb").forEach(cb => {
        const grp = cb.dataset.grp;
        const bit = parseInt(cb.dataset.val);
        const target = grp === "u" ? uVal : grp === "g" ? gVal : oVal;
        cb.checked = Boolean(target & bit);
      });
      document.getElementById("cb-suid").checked = false;
      document.getElementById("cb-sgid").checked = false;
      document.getElementById("cb-sticky").checked = Boolean(sticky);
      updateChmodCalc();
    }

    document.getElementById("chmod-preset-755")?.addEventListener("click", () => applyPreset(7, 5, 5, false));
    document.getElementById("chmod-preset-644")?.addEventListener("click", () => applyPreset(6, 4, 4, false));
    document.getElementById("chmod-preset-1777")?.addEventListener("click", () => applyPreset(7, 7, 7, true));

    renderEmbeddedTerminalSimulator(document.getElementById("embedded-term-holder"), { code: "TOPIK 3.0" });
  }

  // Interactive Widget B: Windows Server Share vs NTFS Permission Simulator (Topic 4)
  function renderWindowsSharePermissionSimulator(stage) {
    stage.innerHTML = `
      <div class="interactive-widget-card">
        <div class="widget-header">
          <div>
            <h3 style="font-size:1.2rem;">🪟 Simulator Keizinan Perkongsian Fail Windows Server (Share vs NTFS Permissions)</h3>
            <p style="font-size:0.83rem; opacity:0.9;">Uji bagaimana Peraturan 'Most Restrictive' menentukan Effective Permission apabila pengguna mengakses \\\\SVR-JTMK\\BahanKuliah</p>
          </div>
          <span class="xp-badge">Subtopik 4.3 Interaktif</span>
        </div>
        <div class="widget-body">
          <div class="chmod-grid">
            <div class="chmod-col">
              <h5>1. Pilih Share Permission (SMB)</h5>
              <select id="win-share-sel" style="width:100%; padding:10px; border-radius:10px; border:1.5px solid var(--border-warm); font-weight:700;">
                <option value="3">Full Control (Baca, Tulis, Ubah, Padam)</option>
                <option value="2" selected>Change (Baca, Tulis, Ubah, Padam)</option>
                <option value="1">Read (Baca & Lihat Sahaja)</option>
              </select>
              <p style="font-size:0.78rem; color:var(--text-secondary); margin-top:10px;">
                Ditetapkan pada tab <em>Sharing -> Advanced Sharing -> Permissions</em>.
              </p>
            </div>
            <div class="chmod-col">
              <h5>2. Pilih NTFS Permission (Security)</h5>
              <select id="win-ntfs-sel" style="width:100%; padding:10px; border-radius:10px; border:1.5px solid var(--border-warm); font-weight:700;">
                <option value="3">Full Control</option>
                <option value="2">Modify (Baca, Tulis, Ubah, Padam)</option>
                <option value="1" selected>Read & Execute (Baca Sahaja)</option>
                <option value="0">Explicit Deny (Sekat Akses)</option>
              </select>
              <p style="font-size:0.78rem; color:var(--text-secondary); margin-top:10px;">
                Ditetapkan pada tab <em>Security (NTFS ACL)</em>.
              </p>
            </div>
            <div class="chmod-col" style="background:#0F172A; color:#fff;">
              <h5 style="color:#FBBF24;">3. Keizinan Berkuat Kuasa (Effective)</h5>
              <div id="win-eff-result" style="font-size:1.35rem; font-weight:900; color:#34D399; margin:8px 0;">
                READ SAHAJA
              </div>
              <p id="win-eff-reason" style="font-size:0.8rem; color:#CBD5E1;">
                Kerana antara Share (Change) dan NTFS (Read), tahap READ adalah lebih ketat (Most Restrictive).
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    function calcWinPerm() {
      const sVal = parseInt(document.getElementById("win-share-sel").value, 10);
      const nVal = parseInt(document.getElementById("win-ntfs-sel").value, 10);
      const resEl = document.getElementById("win-eff-result");
      const reasonEl = document.getElementById("win-eff-reason");

      if (nVal === 0) {
        resEl.textContent = "TIADA AKSES (DENIED)";
        resEl.style.color = "#F87171";
        reasonEl.textContent = "Peraturan Explicit Deny sentiasa mengatasi sebarang kebenaran Allow!";
        return;
      }
      const eff = Math.min(sVal, nVal);
      const names = ["TIADA", "READ SAHAJA (Baca)", "CHANGE / MODIFY (Baca, Tulis & Padam)", "FULL CONTROL (Kawalan Penuh)"];
      resEl.textContent = names[eff];
      resEl.style.color = eff === 1 ? "#FBBF24" : "#34D399";
      reasonEl.textContent = `Peraturan Most Restrictive memilih tahap yang lebih ketat antara Share dan NTFS untuk akses rangkaian UNC.`;
    }

    document.getElementById("win-share-sel")?.addEventListener("change", calcWinPerm);
    document.getElementById("win-ntfs-sel")?.addEventListener("change", calcWinPerm);
  }

  // Interactive Widget C: Backup Strategy & Restore Simulator (Topic 5)
  function renderBackupStrategySimulator(stage) {
    stage.innerHTML = `
      <div class="interactive-widget-card">
        <div class="widget-header">
          <div>
            <h3 style="font-size:1.2rem;">🛡️ Simulator Strategi Backup & Pemulihan Bencana (Full vs Differential vs Incremental)</h3>
            <p style="font-size:0.83rem; opacity:0.9;">Pilih jenis sandaran harian (Isnin–Jumaat) dan hari berlakunya kerosakan pelayan untuk melihat set sandaran yang diperlukan semasa Restore!</p>
          </div>
          <span class="xp-badge">Subtopik 5.1 Interaktif</span>
        </div>
        <div class="widget-body">
          <div style="display:flex; gap:16px; flex-wrap:wrap; margin-bottom:20px;">
            <div style="flex:1; min-width:240px;">
              <label style="font-weight:800; font-size:0.85rem; display:block; margin-bottom:6px;">Jenis Backup Harian (Selepas Full Backup Ahad):</label>
              <select id="bkp-type-sel" style="width:100%; padding:11px; border-radius:12px; border:1.5px solid var(--border-warm); font-weight:700;">
                <option value="diff">Differential Backup (Kumulatif sejak Ahad)</option>
                <option value="inc">Incremental Backup (Perubahan sejak semalam)</option>
              </select>
            </div>
            <div style="flex:1; min-width:240px;">
              <label style="font-weight:800; font-size:0.85rem; display:block; margin-bottom:6px;">Hari Pelayan Mengalami Kerosakan Cakera:</label>
              <select id="bkp-day-sel" style="width:100%; padding:11px; border-radius:12px; border:1.5px solid var(--border-warm); font-weight:700;">
                <option value="2">Selasa Pagi (Data sehingga Isnin Malam)</option>
                <option value="4" selected>Khamis Pagi (Data sehingga Rabu Malam)</option>
                <option value="6">Sabtu Pagi (Data sehingga Jumaat Malam)</option>
              </select>
            </div>
          </div>
          <div class="chmod-result-banner" id="bkp-sim-output"></div>
        </div>
      </div>
      <div id="embedded-term-holder-5"></div>
    `;

    function updateBkpSim() {
      const type = document.getElementById("bkp-type-sel").value;
      const day = parseInt(document.getElementById("bkp-day-sel").value, 10);
      const dayNames = ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat"];
      const lastNight = dayNames[day - 1];
      const out = document.getElementById("bkp-sim-output");

      if (type === "diff") {
        out.innerHTML = `
          <div>
            <div style="font-size:0.75rem; color:#94A3B8;">BILANGAN SET UNTUK RESTORE</div>
            <div class="chmod-big-octal">2 Set Sahaja</div>
            <div style="color:#34D399; font-size:0.88rem; margin-top:4px;">
              1. <strong>Full Backup (Ahad)</strong> + 2. <strong>Differential Backup (${lastNight})</strong>
            </div>
          </div>
          <div style="max-width:420px; font-size:0.83rem; color:#E2E8F0;">
            💡 <strong>Kenapa?</strong> Kerana Differential Backup pada malam <strong>${lastNight}</strong> sudah mengandungi semua perubahan sejak Full Backup hari Ahad! Masa pemulihan (RTO) adalah pantas.
          </div>
        `;
      } else {
        const neededDays = dayNames.slice(1, day).map(d => `Incremental (${d})`).join(" + ");
        out.innerHTML = `
          <div>
            <div style="font-size:0.75rem; color:#94A3B8;">BILANGAN SET UNTUK RESTORE</div>
            <div class="chmod-big-octal">${day} Set Berturut-turut</div>
            <div style="color:#FBBF24; font-size:0.88rem; margin-top:4px;">
              <strong>Full Backup (Ahad)</strong> + ${neededDays}
            </div>
          </div>
          <div style="max-width:420px; font-size:0.83rem; color:#E2E8F0;">
            💡 <strong>Kenapa?</strong> Incremental Backup hanya menyimpan perubahan harian. Anda mesti memulihkan Full Backup Ahad diikuti <strong>SETIAP</strong> Incremental mengikut urutan hari tanpa tertinggal!
          </div>
        `;
      }
    }

    document.getElementById("bkp-type-sel")?.addEventListener("change", updateBkpSim);
    document.getElementById("bkp-day-sel")?.addEventListener("change", updateBkpSim);
    updateBkpSim();
    renderEmbeddedTerminalSimulator(document.getElementById("embedded-term-holder-5"), { code: "TOPIK 5.0" });
  }

  // Embedded or Full Live Linux Terminal Simulator
  function renderEmbeddedTerminalSimulator(stage, topic) {
    if (!stage) return;
    const missions = window.LinuxSimulator.getMissions();

    stage.innerHTML = `
      <div class="live-terminal-layout">
        <div class="mission-panel">
          <h4 style="color:var(--berfest-crimson); font-size:0.95rem; margin-bottom:6px;">🎯 6 Misi Amali CLI Linux</h4>
          <p style="font-size:0.78rem; color:var(--text-secondary); margin-bottom:14px;">
            Klik mana-mana misi untuk menyalin petunjuk arahan atau taip sendiri di dalam terminal!
          </p>
          <div id="mission-list-box">
            ${missions.map(m => `
              <div class="mission-item ${m.done ? "done" : ""}" data-hint="${m.hintCmd}">
                <div class="mission-item-header">
                  <span>${m.title}</span>
                  <span>${m.done ? "✅ Selesai" : m.topic}</span>
                </div>
                <div style="color:var(--text-secondary); font-size:0.77rem;">${formatInlineCode(m.desc)}</div>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="terminal-window">
          <div class="terminal-window-header">
            <div class="terminal-dots"><span></span><span></span><span></span></div>
            <span class="terminal-title">student@ubuntu-svr: ~ (DFK40063 Interactive Linux Bash Simulator)</span>
            <button class="copy-cmd-btn" id="term-reset-btn">Reset FS</button>
          </div>
          <div class="terminal-quick-cmds">
            <span style="color:#94A3B8; font-size:0.74rem; align-self:center; margin-right:4px;">Klik Pantas:</span>
            ${["help", "pwd", "ls -la", "ip a", "cat /etc/passwd", "grep -i error /var/log/syslog", "ps aux", "lsof", "parted -l", "clear"].map(c => `
              <button class="quick-cmd-chip" data-qcmd="${c}">${c}</button>
            `).join("")}
          </div>
          <div class="terminal-output-screen" id="term-screen">
            <div class="term-line" style="color:#FBBF24; font-weight:700;">Selamat Datang ke Simulator Pelayan Linux DFK40063 (Ubuntu 22.04 LTS)!</div>
            <div class="term-line" style="color:#94A3B8;">Taip 'help' dan tekan Enter, atau klik butang arahan pantas di atas untuk memulakan amali.</div>
          </div>
          <form class="term-input-row" id="term-form">
            <span class="term-prompt-label" id="term-prompt-span">${window.LinuxSimulator.getPrompt()}</span>
            <input type="text" class="term-input-field" id="term-input" placeholder="Taip arahan Linux di sini (contoh: ls -la, chmod 755 semak.sh, ps aux)..." autocomplete="off" />
          </form>
        </div>
      </div>
    `;

    const screen = document.getElementById("term-screen");
    const input = document.getElementById("term-input");
    const promptSpan = document.getElementById("term-prompt-span");
    const form = document.getElementById("term-form");

    function execTermCommand(cmdText) {
      const promptNow = window.LinuxSimulator.getPrompt();
      const res = window.LinuxSimulator.runCommand(cmdText);

      if (res.clear) {
        screen.innerHTML = "";
      } else {
        const cmdDiv = document.createElement("div");
        cmdDiv.className = "term-line";
        cmdDiv.innerHTML = `<span style="color:#34D399; font-weight:700;">${escapeHtml(promptNow)}</span> <span style="color:#FBBF24; font-weight:700;">${escapeHtml(cmdText)}</span>`;
        screen.appendChild(cmdDiv);

        if (res.output) {
          const outDiv = document.createElement("div");
          outDiv.className = "term-line";
          outDiv.textContent = res.output;
          screen.appendChild(outDiv);
        }
      }

      if (res.missionUnlocked) {
        addXP(25);
        const mDiv = document.createElement("div");
        mDiv.className = "term-line";
        mDiv.style.color = "#34D399";
        mDiv.style.fontWeight = "800";
        mDiv.textContent = `🎉 TAHNIAH! Anda telah menyelesaikan [${res.missionUnlocked.title}] (+25 XP)!`;
        screen.appendChild(mDiv);
        refreshMissionPanel();
      }

      promptSpan.textContent = window.LinuxSimulator.getPrompt();
      screen.scrollTop = screen.scrollHeight;
    }

    function refreshMissionPanel() {
      const box = document.getElementById("mission-list-box");
      if (!box) return;
      box.innerHTML = window.LinuxSimulator.getMissions().map(m => `
        <div class="mission-item ${m.done ? "done" : ""}" data-hint="${m.hintCmd}">
          <div class="mission-item-header">
            <span>${m.title}</span>
            <span>${m.done ? "✅ Selesai" : m.topic}</span>
          </div>
          <div style="color:var(--text-secondary); font-size:0.77rem;">${formatInlineCode(m.desc)}</div>
        </div>
      `).join("");
      bindMissionClicks();
    }

    function bindMissionClicks() {
      stage.querySelectorAll(".mission-item").forEach(item => {
        item.addEventListener("click", () => {
          const hint = item.getAttribute("data-hint");
          if (input && hint) {
            input.value = hint;
            input.focus();
          }
        });
      });
    }

    bindMissionClicks();

    form?.addEventListener("submit", e => {
      e.preventDefault();
      const val = input.value;
      input.value = "";
      execTermCommand(val);
    });

    stage.querySelectorAll(".quick-cmd-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        execTermCommand(chip.getAttribute("data-qcmd"));
      });
    });

    document.getElementById("term-reset-btn")?.addEventListener("click", () => {
      execTermCommand("reset");
    });
  }

  function renderFullTerminalView(container) {
    container.innerHTML = `
      <section class="berfest-hero" style="padding:28px 36px; margin-bottom:22px;">
        <div class="hero-left">
          <div class="berfest-corner-tag"><span class="dot"></span><span>MAKMAL MAYA INTERAKTIF</span></div>
          <h2>Simulator <span class="accent-text">Terminal Linux</span> DFK40063</h2>
          <p>Uji semua arahan Linux Server Administration (FHS, ls, grep, chmod, chown, useradd, tar, ps, lsof, parted, kill) secara langsung di dalam pelayar tanpa risiko merosakkan sistem sebenar!</p>
        </div>
        <div class="hero-right">
          <div class="berfest-floating-stat">
            <div class="stat-ring"><div class="stat-ring-inner">CLI</div></div>
            <div class="stat-info">
              <h4>Ubuntu 22.04 Server Sandbox</h4>
              <p>Lengkap dengan sistem fail maya /etc, /home, /var/log & 6 Misi</p>
            </div>
          </div>
        </div>
      </section>
      <div id="full-term-stage"></div>
    `;
    renderEmbeddedTerminalSimulator(document.getElementById("full-term-stage"), { code: "SEMUA TOPIK" });
  }

  // ========================================================================
  // 4. SOALAN LATIHAN MENGIKUT TOPIK (INTERACTIVE QUIZ)
  // ========================================================================
  function renderTopicQuiz(stage, topic) {
    let answeredCount = 0;
    let correctCount = 0;
    const totalQ = topic.quizzes.length;
    const letters = ["A", "B", "C", "D"];

    stage.innerHTML = `
      <div class="quiz-header-card">
        <div>
          <span style="font-size:0.76rem; font-weight:800; text-transform:uppercase; letter-spacing:0.08em;">
            PENILAIAN KENDIRI & LATIHAN TOPIK • ${topic.code}
          </span>
          <h3 style="font-size:1.5rem; margin-top:4px;">Uji Kefahaman: ${topic.shortTitle}</h3>
          <p style="font-size:0.88rem; opacity:0.92; margin-top:4px;">
            Pilih jawapan yang paling tepat. Penerangan terperinci akan dipaparkan serta-merta selepas anda menjawab setiap soalan.
          </p>
        </div>
        <div class="quiz-score-circle">
          <strong id="live-quiz-score">0 / ${totalQ}</strong>
          <span style="font-size:0.75rem;">Markah Semasa</span>
        </div>
      </div>

      <div id="quiz-questions-list">
        ${topic.quizzes.map((qItem, qIdx) => `
          <div class="quiz-question-card" data-qidx="${qIdx}">
            <div class="quiz-q-top">
              <div class="quiz-q-num">S${qIdx + 1}</div>
              <div class="quiz-q-text">${formatInlineCode(qItem.q)}</div>
            </div>
            <div class="quiz-options-grid">
              ${qItem.options.map((opt, oIdx) => `
                <button class="quiz-opt-btn" data-qidx="${qIdx}" data-oidx="${oIdx}">
                  <span class="quiz-opt-letter">${letters[oIdx]}</span>
                  <span>${formatInlineCode(opt)}</span>
                </button>
              `).join("")}
            </div>
            <div class="quiz-explanation" id="quiz-exp-${qIdx}">
              <strong>📘 Ulasan & Penerangan Jawapan:</strong><br/>
              ${formatInlineCode(qItem.explanation)}
            </div>
          </div>
        `).join("")}
      </div>

      <div style="text-align:center; margin-top:24px;">
        <button class="btn-pill btn-pill-primary" id="reset-quiz-btn">🔄 Cuba Semula Soalan Latihan Ini</button>
      </div>
    `;

    stage.querySelectorAll(".quiz-opt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const qIdx = parseInt(btn.getAttribute("data-qidx"), 10);
        const oIdx = parseInt(btn.getAttribute("data-oidx"), 10);
        const qData = topic.quizzes[qIdx];
        const card = btn.closest(".quiz-question-card");

        // Disable all buttons in this question
        card.querySelectorAll(".quiz-opt-btn").forEach((b, idx) => {
          b.disabled = true;
          if (idx === qData.answer) b.classList.add("correct");
        });

        answeredCount++;
        if (oIdx === qData.answer) {
          correctCount++;
          addXP(10);
        } else {
          btn.classList.add("wrong");
        }

        document.getElementById(`quiz-exp-${qIdx}`)?.classList.add("visible");
        const scoreEl = document.getElementById("live-quiz-score");
        if (scoreEl) scoreEl.textContent = `${correctCount} / ${totalQ}`;

        if (answeredCount === totalQ) {
          saveQuizScore(topic.id, correctCount, totalQ);
        }
      });
    });

    document.getElementById("reset-quiz-btn")?.addEventListener("click", () => {
      renderTopicQuiz(stage, topic);
      window.scrollTo({ top: 220, behavior: "smooth" });
    });
  }

  // ========================================================================
  // 5. INFO KURSUS, CLO, SLT & AGIHAN PENILAIAN (SYLLABUS PAGE 1-8)
  // ========================================================================
  function renderCourseInfoView(container) {
    container.innerHTML = `
      <section class="berfest-hero">
        <div class="hero-left">
          <div class="berfest-corner-tag"><span class="dot"></span><span>MAKLUMAT RASMI KURSUS JPPKK</span></div>
          <h2>DFK40063 <span class="accent-text">Server Administration</span></h2>
          <p>Kursus ini direka untuk memberi pemahaman menyeluruh serta kemahiran praktikal (hands-on) dalam mentadbir, mengkonfigurasi, dan menyelenggara sistem pengoperasian pelayan Linux dan Windows Server.</p>
          <div class="hero-badges">
            <div class="clo-pill"><span>Kredit</span> 3.0 Nilai Kredit</div>
            <div class="clo-pill"><span>Semester</span> Semester 4 / Tahun 2</div>
            <div class="clo-pill"><span>Prasyarat</span> Tiada (None)</div>
            <div class="clo-pill"><span>Jumlah SLT</span> 120 Jam</div>
          </div>
        </div>
        <div class="hero-right">
          <div class="berfest-floating-stat">
            <div class="stat-ring"><div class="stat-ring-inner">70%</div></div>
            <div class="stat-info">
              <h4>Penilaian Berterusan (CA)</h4>
              <p>Practical Work, PBA, Presentation & Case Study</p>
            </div>
          </div>
          <div class="berfest-floating-stat">
            <div class="stat-ring"><div class="stat-ring-inner">30%</div></div>
            <div class="stat-info">
              <h4>Penilaian Akhir (FA / FE)</h4>
              <p>Amali / Peperiksaan Akhir Semester (Topik 1–4)</p>
            </div>
          </div>
        </div>
      </section>

      <div class="berfest-note-card" style="margin-bottom:26px;">
        <div class="note-card-header">
          <div class="note-title-group">
            <h3>Hasil Pembelajaran Kursus (Course Learning Outcomes - CLO)</h3>
            <p>Pemetaan CLO kepada PLO, Kaedah Pengajaran & Kaedah Penilaian</p>
          </div>
          <span class="note-code-badge">Item 7 & 8 Silibus</span>
        </div>
        <div class="note-card-body">
          <div class="berfest-feature-grid">
            <div class="berfest-mini-card">
              <div class="mini-card-icon">CLO1</div>
              <h5>Construct Graphical & CLI Utilities (P3, PLO3)</h5>
              <p>Membina pelbagai utiliti grafik (GUI) dan baris perintah (CLI) dalam Windows Server dan Linux bagi memastikan operasi sistem berjalan lancar.</p>
              <ul>
                <li><strong>Penilaian:</strong> Practical Work (20%) & Final Assessment (30%)</li>
              </ul>
            </div>
            <div class="berfest-mini-card">
              <div class="mini-card-icon">CLO2</div>
              <h5>Perform Server Services (P4, PLO6)</h5>
              <p>Melaksanakan pelbagai jenis perkhidmatan pelayan (services) menggunakan Windows Server dan Linux.</p>
              <ul>
                <li><strong>Penilaian:</strong> Problem Based Assignment / PBA (15%)</li>
              </ul>
            </div>
            <div class="berfest-mini-card">
              <div class="mini-card-icon">CLO3</div>
              <h5>Demonstrate Good Ethical Practices (A3, PLO11)</h5>
              <p>Mempamerkan amalan beretika yang baik semasa melaksanakan pelbagai fungsi autonomi untuk pelayan sistem.</p>
              <ul>
                <li><strong>Penilaian:</strong> Presentation PBA (10%) & Case Study (25%)</li>
              </ul>
            </div>
          </div>

          <h4 style="margin-top:24px; margin-bottom:10px; color:var(--berfest-crimson);">📊 Jadual Agihan Penilaian Kursus (Continuous Assessment 70% + Final Assessment 30%)</h4>
          <div class="berfest-table-wrap">
            <table class="berfest-table">
              <thead>
                <tr>
                  <th>Jenis Penilaian</th>
                  <th>Bilangan</th>
                  <th>Pemberatan (%)</th>
                  <th>CLO Dinilai</th>
                  <th>Topik Disarankan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Practical Work (Kerja Amali)</strong></td>
                  <td>3 Amali</td>
                  <td><strong>20%</strong></td>
                  <td>CLO 1 (P3)</td>
                  <td>Topik 3 & Topik 4</td>
                </tr>
                <tr>
                  <td><strong>Problem Based Assignment (PBA)</strong></td>
                  <td>1 Tugasan</td>
                  <td><strong>15%</strong></td>
                  <td>CLO 2 (P4)</td>
                  <td>Topik 3, Topik 4 & Topik 5</td>
                </tr>
                <tr>
                  <td><strong>Presentation (Problem Based Assignment)</strong></td>
                  <td>1 Pembentangan</td>
                  <td><strong>10%</strong></td>
                  <td>CLO 3 (A3)</td>
                  <td>Topik 3, Topik 4 & Topik 5</td>
                </tr>
                <tr>
                  <td><strong>Case Study (Kajian Kes)</strong></td>
                  <td>1 Kajian Kes</td>
                  <td><strong>25%</strong></td>
                  <td>CLO 3 (A3)</td>
                  <td>Topik 4 & Topik 5</td>
                </tr>
                <tr>
                  <td><strong>Final Assessment (Penilaian Akhir)</strong></td>
                  <td>1 Penilaian Akhir</td>
                  <td><strong>30%</strong></td>
                  <td>CLO 1 (P3)</td>
                  <td>Topik 1, Topik 2, Topik 3 & Topik 4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // ========================================================================
  // GLOBAL SEARCH FILTER
  // ========================================================================
  function renderSearchResults(container, query) {
    const q = query.toLowerCase();
    const results = [];

    (window.COURSE_TOPICS || []).forEach(topic => {
      topic.notes.forEach(note => {
        const hay = `${note.code} ${note.title} ${note.subtitle} ${note.concept} ${JSON.stringify(note.features)} ${JSON.stringify(note.tableRows || [])}`.toLowerCase();
        if (hay.includes(q)) {
          results.push({ topic, note });
        }
      });
    });

    container.innerHTML = `
      <div style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
        <h3>🔍 Hasil Carian untuk "${escapeHtml(query)}" (${results.length} nota ditemui)</h3>
        <button class="btn-pill btn-pill-outline" id="clear-search-btn">✕ Padam Carian</button>
      </div>
      <div class="notes-grid">
        ${results.length
          ? results.map(r => renderSingleNoteCard(r.note)).join("")
          : `<div class="berfest-note-card" style="padding:32px; text-align:center;">Tiada nota sepadan ditemui. Cuba kata kunci seperti <code>chmod</code>, <code>Active Directory</code>, <code>SSH</code>, <code>tar</code>, atau <code>grep</code>.</div>`
        }
      </div>
    `;

    document.getElementById("clear-search-btn")?.addEventListener("click", () => {
      state.searchQuery = "";
      const inp = document.getElementById("global-search-input");
      if (inp) inp.value = "";
      renderMainContent();
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // ========================================================================
  // INITIALIZE APP
  // ========================================================================
  document.addEventListener("DOMContentLoaded", () => {
    renderSidebarNav();
    renderMainContent();
    updateProgressUI();

    const searchInput = document.getElementById("global-search-input");
    searchInput?.addEventListener("input", e => {
      state.searchQuery = e.target.value;
      renderMainContent();
    });

    document.getElementById("btn-toggle-presentation")?.addEventListener("click", () => {
      state.presentationMode = !state.presentationMode;
      document.body.classList.toggle("presentation-mode", state.presentationMode);
      const btn = document.getElementById("btn-toggle-presentation");
      if (btn) {
        btn.innerHTML = state.presentationMode
          ? "🖥️ Keluar Mod Slide"
          : "📽️ Mod Pembentangan Kelas";
      }
    });

    document.getElementById("btn-open-terminal-top")?.addEventListener("click", () => {
      state.activeView = "terminal-lab";
      renderSidebarNav();
      renderMainContent();
    });

    document.getElementById("mobile-menu-toggle")?.addEventListener("click", () => {
      document.getElementById("sidebar")?.classList.toggle("open");
    });
  });
})();
