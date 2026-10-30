// Prueba de la interfaz con un DOM simulado (sin navegador)
const fs = require("fs"), vm = require("vm");

class El {
  constructor(tag) { this.tag = tag; this.children = []; this.className = ""; this.listeners = {}; this.style = {}; this.hidden = false;
    this._html = ""; this._text = ""; this.value = ""; this.scrollTop = 0; this.scrollHeight = 1000; this.clientHeight = 500; this.offsetHeight = 60; this.parent = null; this.type = ""; }
  set innerHTML(v) { this._html = v; this.children = []; } get innerHTML() { return this._html; }
  set textContent(v) { this._text = v; } get textContent() { return this._text; }
  appendChild(c) { c.parent = this; this.children.push(c); return c; }
  remove() { if (this.parent) this.parent.children = this.parent.children.filter(x => x !== this); }
  addEventListener(t, f) { (this.listeners[t] ||= []).push(f); }
  click() { (this.listeners.click || []).forEach(f => f({})); }
  keydown(key, shift = false) { let prevented = false; (this.listeners.keydown || []).forEach(f => f({ key, shiftKey: shift, isComposing: false, preventDefault() { prevented = true; } })); return prevented; }
  focus() {} getBoundingClientRect() { return { top: 0 }; }
  querySelectorAll(sel) { const cls = sel.replace(".", ""); const out = []; (function walk(n) { n.children.forEach(c => { if ((" " + c.className + " ").includes(" " + cls + " ")) out.push(c); walk(c); }); })(this); return out; }
  all() { const out = []; (function walk(n) { n.children.forEach(c => { out.push(c); walk(c); }); })(this); return out; }
  get scrollHeightFix() { return 0; }
}
const ids = {};
["log","thread","hero","input","send","reset","btn-temas","banner","sugerencias","temas"].forEach(i => ids[i] = new El(i === "input" ? "textarea" : "div"));
ids.reset.hidden = true;
ids.log.appendChild(ids.thread); ids.thread.appendChild(ids.hero);
const document = { getElementById: i => ids[i], createElement: t => new El(t) };
const ctx = { document, console, Array, Math, Object, String, RegExp };
vm.createContext(ctx);
for (const f of ["conocimiento.js", "motor.js", "app.js"]) vm.runInContext(fs.readFileSync(__dirname + "/../" + f, "utf8").replace(/^var (CONOCIMIENTO|Motor)/m, "var $1"), ctx, { filename: f });

let fallos = 0;
const check = (cond, msg) => { console.log((cond ? "✓ " : "✗ ") + msg); if (!cond) fallos++; };
const mensajes = () => ids.thread.querySelectorAll("msg");
const ultimo = () => { const m = mensajes(); return m[m.length - 1]; };
const textoDe = (m) => m.all().filter(n => n.className === "text").map(n => n.innerHTML).join(" ");
const chipsDe = (m) => m.all().filter(n => (" " + n.className + " ").includes(" chip "));

check(ids.sugerencias.children.length === 6, "inicio: 6 preguntas sugeridas");
check(ids.temas.children.length === 8, "inicio: 8 temas");
check(ids.banner.innerHTML.includes("<svg"), "banner de papel picado generado");

// 1) Escribir una pregunta y enviarla
ids.input.value = "que es el cempasuchil";
ids.send.click();
check(ids.hero.hidden === true && ids.reset.hidden === false, "al preguntar se oculta el inicio y aparece 'Nueva conversación'");
check(mensajes().length === 2, "se agregan pregunta y respuesta");
check(textoDe(ultimo()).includes("Tagetes erecta") && textoDe(ultimo()).includes("<em>"), "respuesta correcta con cursivas");
check(chipsDe(ultimo()).length >= 2, "la respuesta trae preguntas relacionadas: " + chipsDe(ultimo()).map(c => c.textContent).join(" | "));
check(ids.input.value === "", "el cuadro de texto se limpia");

// 2) Tocar una pregunta relacionada
const antes = mensajes().length;
chipsDe(ultimo())[0].click();
check(mensajes().length === antes + 2, "tocar una pregunta relacionada agrega pregunta y respuesta");

// 3) Enter envía; Shift+Enter no
ids.input.value = "hola";
check(ids.input.keydown("Enter", true) === false, "Shift+Enter no envía");
check(ids.input.keydown("Enter") === true, "Enter envía");
check(textoDe(ultimo()).includes("Guía de Ofrenda"), "saludo respondido");

// 4) Tema desde "Temas"
const n0 = mensajes().length;
ids["btn-temas"].click();
check(mensajes().length === n0 + 1 && chipsDe(ultimo()).length === 8, "botón Temas muestra los 8 temas");
chipsDe(ultimo())[0].click();
check(chipsDe(ultimo()).length === 7 || chipsDe(ultimo()).length > 3, "elegir un tema muestra sus preguntas (" + chipsDe(ultimo()).length + ")");

// 5) Casos sensibles
ids.input.value = "me quiero morir"; ids.send.click();
check(textoDe(ultimo()).includes("800 911 2000") && textoDe(ultimo()).includes("911"), "mensaje de apoyo con Línea de la Vida");
ids.input.value = "extraño a mi abuelo"; ids.send.click();
check(textoDe(ultimo()).includes("Lamento mucho"), "mensaje de duelo");

// 6) Pregunta sin respuesta
ids.input.value = "cual es la capital de francia"; ids.send.click();
check(textoDe(ultimo()).includes("No encontré") && chipsDe(ultimo()).length === 8, "sin respuesta: lo dice y ofrece los temas");

// 7) Seguridad: el texto del usuario no se interpreta como HTML
ids.input.value = "<img src=x onerror=alert(1)> catrina"; ids.send.click();
const burbuja = mensajes().filter(m => m.className.includes("user")).pop().children[0];
check(burbuja.textContent.includes("<img") && burbuja.innerHTML === "", "el texto del usuario se muestra como texto, no como HTML");

// 8) Entrada vacía y reinicio
const n1 = mensajes().length; ids.input.value = "   "; ids.send.click();
check(mensajes().length === n1, "una pregunta vacía no hace nada");
ids.reset.click();
check(mensajes().length === 0 && ids.hero.hidden === false && ids.reset.hidden === true, "Nueva conversación limpia todo y vuelve al inicio");

console.log(fallos ? `\n${fallos} fallo(s)` : "\nTodo bien");
