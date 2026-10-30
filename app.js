/* Interfaz del chat · Guía de Ofrenda (versión sin IA). Necesita conocimiento.js y motor.js */
(function () {
  "use strict";

  var motor = Motor.crear(CONOCIMIENTO);

  var $ = function (id) { return document.getElementById(id); };
  var logEl = $("log"), thread = $("thread"), hero = $("hero");
  var input = $("input"), sendBtn = $("send"), resetBtn = $("reset"), temasBtn = $("btn-temas");

  /* ---------- Banner de papel picado ---------- */
  (function () {
    var html = "";
    for (var i = 0; i < 48; i++) {
      html += '<svg class="flag" style="--i:' + i + '" viewBox="0 0 64 80" aria-hidden="true"><use href="#papel"></use></svg>';
    }
    $("banner").innerHTML = html;
  })();

  /* ---------- Markdown mínimo y seguro ---------- */
  function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function inline(s) {
    s = esc(s);
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
    return s;
  }
  function md(text) {
    var lines = text.replace(/\r/g, "").split("\n");
    var html = "", list = null, para = [], m;
    function flushPara() { if (para.length) { html += "<p>" + inline(para.join("\n")).replace(/\n/g, "<br>") + "</p>"; para = []; } }
    function closeList() { if (list) { html += "</" + list + ">"; list = null; } }
    lines.forEach(function (raw) {
      var line = raw.replace(/\s+$/, "");
      if (!line.trim()) { flushPara(); closeList(); return; }
      if ((m = line.match(/^\s*[-*•]\s+(.*)$/))) {
        flushPara();
        if (list !== "ul") { closeList(); html += "<ul>"; list = "ul"; }
        html += "<li>" + inline(m[1]) + "</li>";
        return;
      }
      if ((m = line.match(/^\s*\d+[.)]\s+(.*)$/))) {
        flushPara();
        if (list !== "ol") { closeList(); html += "<ol>"; list = "ol"; }
        html += "<li>" + inline(m[1]) + "</li>";
        return;
      }
      closeList();
      para.push(line.trim());
    });
    flushPara(); closeList();
    return html;
  }

  /* ---------- Desplazamiento ---------- */
  function scrollDown() { logEl.scrollTop = logEl.scrollHeight; }
  function scrollTo(el) {
    var top = el.getBoundingClientRect().top - logEl.getBoundingClientRect().top + logEl.scrollTop - 8;
    logEl.scrollTop = Math.max(0, top);
  }
  // Si la respuesta es larga, muestra el inicio de la pregunta; si es corta, baja hasta el final
  function mostrar(userEl, guideEl) {
    var altura = guideEl.offsetHeight + (userEl ? userEl.offsetHeight : 0);
    if (userEl && altura > logEl.clientHeight - 24) scrollTo(userEl);
    else if (!userEl && guideEl.offsetHeight > logEl.clientHeight - 24) scrollTo(guideEl);
    else scrollDown();
  }

  /* ---------- Elementos de la conversación ---------- */
  function crearChip(texto, clase, alClic) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (clase ? " " + clase : "");
    b.textContent = texto;
    b.addEventListener("click", alClic);
    return b;
  }
  function chipDe(item) {
    if (item.tema) return crearChip(item.pregunta, "tema", function () { mostrarTema(item.tema); });
    return crearChip(item.pregunta, "", function () { preguntar(item.pregunta, item.id); });
  }

  function agregarUsuario(texto) {
    var wrap = document.createElement("div");
    wrap.className = "msg user";
    var bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = texto;
    wrap.appendChild(bubble);
    thread.appendChild(wrap);
    return wrap;
  }

  function agregarGuia(html, chips, etiqueta, userEl) {
    var wrap = document.createElement("div");
    wrap.className = "msg guide";
    var body = document.createElement("div");
    body.className = "text";
    body.innerHTML = html;
    wrap.appendChild(body);

    if (chips && chips.length) {
      if (etiqueta) {
        var nota = document.createElement("p");
        nota.className = "note";
        nota.textContent = etiqueta;
        wrap.appendChild(nota);
      }
      var caja = document.createElement("div");
      caja.className = "followups";
      chips.forEach(function (c) { caja.appendChild(chipDe(c)); });
      wrap.appendChild(caja);
    }
    thread.appendChild(wrap);
    mostrar(userEl, wrap);
    return wrap;
  }

  function mostrarConversacion(hay) {
    hero.hidden = hay;
    resetBtn.hidden = !hay;
  }

  /* ---------- Acciones ---------- */
  function preguntar(texto, id) {
    texto = (texto || "").trim();
    if (!texto) return;
    mostrarConversacion(true);
    var u = agregarUsuario(texto);
    var r = id ? motor.respuestaPorId(id) : motor.responder(texto);
    if (r.tipo === "vacio") return;
    if (r.accion === "temas") {
      agregarGuia(md(r.texto), motor.temas.map(function (t) { return { tema: t.id, pregunta: t.nombre }; }), "", u);
      return;
    }
    agregarGuia(md(r.texto), r.chips, r.etiqueta, u);
  }

  function mostrarTemas() {
    mostrarConversacion(true);
    agregarGuia(md("Elige un tema para ver sus preguntas:"),
      motor.temas.map(function (t) { return { tema: t.id, pregunta: t.nombre }; }), "", null);
  }

  function mostrarTema(id) {
    var tema = motor.temas.filter(function (t) { return t.id === id; })[0];
    if (!tema) return;
    mostrarConversacion(true);
    var u = agregarUsuario(tema.nombre);
    agregarGuia(md("Preguntas sobre **" + tema.nombre + "**:"), motor.preguntasDeTema(id), "", u);
  }

  function enviar() {
    var texto = input.value;
    if (!texto.trim()) return;
    input.value = "";
    autosize();
    preguntar(texto);
    input.focus({ preventScroll: true });
  }

  function autosize() {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight + 2, 152) + "px";
  }

  /* ---------- Pantalla de inicio ---------- */
  motor.sugerencias.forEach(function (c) { $("sugerencias").appendChild(chipDe(c)); });
  motor.temas.forEach(function (t) { $("temas").appendChild(chipDe({ tema: t.id, pregunta: t.nombre })); });

  /* ---------- Eventos ---------- */
  sendBtn.addEventListener("click", enviar);
  input.addEventListener("keydown", function (ev) {
    if (ev.key === "Enter" && !ev.shiftKey && !ev.isComposing) { ev.preventDefault(); enviar(); }
  });
  input.addEventListener("input", autosize);
  temasBtn.addEventListener("click", mostrarTemas);
  resetBtn.addEventListener("click", function () {
    Array.prototype.slice.call(thread.querySelectorAll(".msg")).forEach(function (n) { n.remove(); });
    mostrarConversacion(false);
    logEl.scrollTop = 0;
    input.focus({ preventScroll: true });
  });
})();
