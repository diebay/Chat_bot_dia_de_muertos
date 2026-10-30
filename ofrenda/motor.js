/*
 * MOTOR DE BÚSQUEDA · Guía de Ofrenda (versión sin IA)
 *
 * No aprende ni genera texto: compara tu pregunta con la base de conocimiento
 * (conocimiento.js) usando técnicas clásicas de búsqueda:
 *   1. Normaliza el texto (minúsculas, sin acentos ni signos).
 *   2. Reduce cada palabra a su raíz aproximada ("ofrendas" -> "ofren").
 *   3. Aplica sinónimos y corrige faltas de ortografía de una letra.
 *   4. Puntúa cada entrada con BM25 y premia las frases características.
 *   5. Si la puntuación es baja, no inventa nada: sugiere preguntas parecidas.
 */
var Motor = (function () {
  "use strict";

  var STOP = ("a al algo ante aqui asi aun cada como con contra cual cuales cuanto cuantos de del desde dos " +
    "el ella ellos en entre era eres es esa ese eso esta estas este esto estos fue ha han hay la las le les lo " +
    "los me mi mis mucho muy no nos nosotros o para pero poco por porque pues que quien quienes se ser si sin " +
    "sobre son su sus te tiene tienen tu tus un una uno unos y ya yo puedo puede pueden podria podrias quiero " +
    "quisiera saber dime decir hablame cuentame explicame explica favor ayudame dame dar significa significan " +
    "significado representa representan tambien tan tanto mas menos ver vez").split(" ");
  var STOPSET = {};
  STOP.forEach(function (w) { STOPSET[w] = true; });

  var CHARLA = {};
  ("hola buenas buenos tardes noches oye porfa porfavor necesito necesitamos gustaria duda dudas pregunta " +
   "preguntas quisiera maestra maestro profe profesora profesor amigo amiga bot guia " +
   "ayuda ayudas ayudar ayudame ayudan tarea tareas").split(" ")
    .forEach(function (w) { CHARLA[w] = true; });

  var SUFIJOS = ["aciones", "amiento", "acion", "amos", "aron", "ando", "iendo", "ado", "ido",
    "ar", "er", "ir", "an", "en", "as", "es", "os", "a", "e", "o", "s"];

  var K1 = 1.2, B = 0.4;
  var BONO_FRASE = 3.5;      // la pregunta contiene una frase característica de la entrada
  var BONO_EXACTO = 12;      // la pregunta coincide con la pregunta o una variante de la entrada
  var MIN_PUNTAJE = 2.2;     // por debajo de esto el bot prefiere decir "no sé"
  var IDF_MIN = 1.6;         // al menos una palabra clave con valor temático suficiente
  var COBERTURA_MIN = 0.6;    // proporción mínima de la pregunta que debe quedar explicada
  var IDF_DESCONOCIDO = 2.5;  // peso de las palabras que la base no conoce (cuentan como "no entendidas")
  var PESO_FUERTE = 3;       // pregunta, variantes y claves pesan 3 veces más que la respuesta

  function normalizar(texto) {
    return String(texto || "")
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function raiz(palabra) {
    var w = palabra;
    if (/^\d+$/.test(w)) return w;
    for (var pasada = 0; pasada < 2; pasada++) {
      if (w.length <= 3) break;
      if (pasada === 1 && w.length <= 5) break;
      for (var i = 0; i < SUFIJOS.length; i++) {
        var suf = SUFIJOS[i];
        var minimo = (suf === "aciones" || suf === "acion" || suf === "amiento") ? 4 : 3;
        if (w.length - suf.length >= minimo && w.slice(-suf.length) === suf) {
          w = w.slice(0, -suf.length);
          break;
        }
      }
    }
    return w.slice(0, 5);
  }

  function distanciaMax1(a, b) {
    // ¿a y b difieren en una sola letra (cambio, falta, sobra o dos letras intercambiadas)?
    if (a === b) return true;
    var la = a.length, lb = b.length;
    if (Math.abs(la - lb) > 1) return false;
    var i = 0;
    while (i < la && i < lb && a[i] === b[i]) i++;
    if (la === lb) {
      if (a.slice(i + 1) === b.slice(i + 1)) return true;
      return a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2);
    }
    return la > lb ? a.slice(i + 1) === b.slice(i) : b.slice(i + 1) === a.slice(i);
  }

  function crear(kb) {
    var sinonimos = {};
    Object.keys(kb.sinonimos || {}).forEach(function (k) { sinonimos[normalizar(k)] = normalizar(kb.sinonimos[k]); });
    var frases = (kb.frases || []).map(function (par) { return [new RegExp("\\b(" + par[0] + ")\\b", "g"), par[1]]; });

    function limpiar(texto) {
      var t = normalizar(texto);
      frases.forEach(function (par) { t = t.replace(par[0], par[1]); });
      return t;
    }

    /* ---------- Vocabulario conocido (para corregir faltas de ortografía) ---------- */
    var frecuencia = {};
    function registrarPalabras(texto, peso) {
      limpiar(texto).split(" ").forEach(function (w) {
        if (w.length >= 5) frecuencia[w] = (frecuencia[w] || 0) + peso;   // se conocen desde 5 letras; se corrigen desde 6
      });
    }
    kb.entradas.forEach(function (e) {
      registrarPalabras(e.pregunta, 3);
      (e.variantes || []).forEach(function (v) { registrarPalabras(v, 3); });
      (e.clave || []).forEach(function (c) { registrarPalabras(c, 3); });
      registrarPalabras(e.respuesta, 1);
    });
    Object.keys(sinonimos).forEach(function (k) { registrarPalabras(k, 3); registrarPalabras(sinonimos[k], 3); });
    var palabrasConocidas = Object.keys(frecuencia);

    function corregirPalabra(w) {
      if (w.length < 6 || STOPSET[w] || frecuencia[w] || /\d/.test(w)) return w;
      var mejor = null;
      for (var i = 0; i < palabrasConocidas.length; i++) {
        var v = palabrasConocidas[i];
        if (distanciaMax1(w, v) && (mejor === null || frecuencia[v] > frecuencia[mejor])) mejor = v;
      }
      return mejor || w;
    }

    /* ---------- Preparación del texto ---------- */
    function preparar(texto, corregir) {
      var salida = [];
      limpiar(texto).split(" ").forEach(function (w) {
        if (!w) return;
        if (corregir) w = corregirPalabra(w);
        (sinonimos[w] || w).split(" ").forEach(function (x) { if (x) salida.push(x); });
      });
      return salida;
    }
    function raices(texto, corregir) {
      return preparar(texto, corregir).filter(function (w) { return !STOPSET[w] && !CHARLA[w]; }).map(raiz);
    }
    function secuencia(texto, corregir) {
      return preparar(texto, corregir).map(function (w) { return STOPSET[w] ? w : raiz(w); }).join(" ");
    }

    function sinPlural(w) { return w.length > 4 && w.charAt(w.length - 1) === "s" ? w.slice(0, -1) : w; }

    /* ---------- Índice ---------- */
    var porId = {};
    var docs = kb.entradas.map(function (e) {
      porId[e.id] = e;
      var tf = {}, fuertes = {}, largo = 0;
      function sumar(texto, peso, esFuerte) {
        raices(texto, false).forEach(function (r) {
          tf[r] = (tf[r] || 0) + peso;
          largo += peso;
          if (esFuerte) fuertes[r] = true;
        });
      }
      sumar(e.pregunta, PESO_FUERTE, true);
      (e.variantes || []).forEach(function (v) { sumar(v, PESO_FUERTE, true); });
      (e.clave || []).forEach(function (c) { sumar(c, PESO_FUERTE, true); });
      sumar(e.respuesta, 1, false);
      return {
        entrada: e, tf: tf, fuertes: fuertes, largo: largo,
        exactos: [e.pregunta].concat(e.variantes || []).map(function (t) { return secuencia(t, false); }),
        frases: (e.clave || []).filter(function (c) { return normalizar(c).indexOf(" ") !== -1; })
          .map(function (c) { return secuencia(c, false); }),
        palabrasClave: (e.clave || []).filter(function (c) {
          var n = normalizar(c);
          return n.indexOf(" ") === -1 && n.length > 4;
        }).map(function (c) { return sinPlural(preparar(c, false).join(" ")); })
      };
    });

    var N = docs.length;
    var promedio = docs.reduce(function (acc, d) { return acc + d.largo; }, 0) / N;
    var df = {}, dfFuerte = {};
    docs.forEach(function (d) {
      Object.keys(d.tf).forEach(function (r) { df[r] = (df[r] || 0) + 1; });
      Object.keys(d.fuertes).forEach(function (r) { dfFuerte[r] = (dfFuerte[r] || 0) + 1; });
    });

    function idfDe(n) { return Math.log(1 + (N - n + 0.5) / (n + 0.5)); }
    function idf(r) { return idfDe(df[r] || 0); }
    function idfFuerte(r) { return idfDe(dfFuerte[r] || 0); }
    // Cuánto "pesa" una palabra de la pregunta al decidir si fue entendida
    function pesoTema(r) {
      if (dfFuerte[r]) return idfFuerte(r);
      if (df[r]) return idf(r);
      return IDF_DESCONOCIDO;
    }

    /* ---------- Búsqueda ---------- */
    function buscar(texto) {
      var terminos = [];
      raices(texto, true).forEach(function (r) {
        if (terminos.indexOf(r) === -1) terminos.push(r);
      });
      if (!terminos.length) return [];

      var consulta = secuencia(texto, true);
      var marco = " " + consulta + " ";
      var palabrasConsulta = {};
      preparar(texto, true).forEach(function (w) { palabrasConsulta[sinPlural(w)] = true; });
      var masaTotal = 0;
      terminos.forEach(function (r) { if (!/^\d+$/.test(r)) masaTotal += pesoTema(r); });

      var resultados = docs.map(function (d) {
        var puntaje = 0, coincidenciasFuertes = 0, masaFuerte = 0, mejorIdf = 0;
        terminos.forEach(function (r) {
          var tf = d.tf[r];
          if (!tf) return;
          var peso = idf(r);
          if (d.fuertes[r]) {
            coincidenciasFuertes++;
            if (!/^\d+$/.test(r)) {          // los números solos no cuentan como tema
              var pf = idfFuerte(r);
              masaFuerte += pf;
              if (pf > mejorIdf) mejorIdf = pf;
            }
          }
          puntaje += peso * (tf * (K1 + 1)) / (tf + K1 * (1 - B + B * d.largo / promedio));
        });
        var porFrase = false;
        d.frases.forEach(function (f) {
          if (marco.indexOf(" " + f + " ") !== -1) { puntaje += BONO_FRASE; porFrase = true; }
        });
        d.palabrasClave.forEach(function (w) {
          if (palabrasConsulta[w]) { puntaje += BONO_FRASE; porFrase = true; }
        });
        if (d.exactos.indexOf(consulta) !== -1) { puntaje += BONO_EXACTO; porFrase = true; }
        return {
          entrada: d.entrada, puntaje: puntaje, fuertes: coincidenciasFuertes, porFrase: porFrase,
          mejorIdf: mejorIdf, cobertura: masaTotal ? masaFuerte / masaTotal : 0
        };
      }).filter(function (r) { return r.puntaje > 0; });

      resultados.sort(function (x, y) { return y.puntaje - x.puntaje; });
      return resultados;
    }

    /* ---------- Intenciones ---------- */
    var intenciones = (kb.intenciones || []).map(function (i) {
      var set = null;
      if (i.palabras) { set = {}; i.palabras.forEach(function (p) { set[normalizar(p)] = true; }); }
      return {
        def: i, set: set,
        regex: (i.patrones || []).map(function (p) { return new RegExp(p); })
      };
    });

    function detectarIntencion(q) {
      var palabras = q.split(" ").filter(Boolean);
      var utiles = palabras.filter(function (w) { return !STOPSET[w]; });
      for (var k = 0; k < intenciones.length; k++) {
        var it = intenciones[k];
        for (var j = 0; j < it.regex.length; j++) {
          if (it.regex[j].test(q)) return it.def;
        }
        if (it.set && utiles.length > 0 && utiles.every(function (w) { return it.set[w]; })) return it.def;
      }
      return null;
    }

    /* ---------- Respuesta pública ---------- */
    function chipsDe(ids, excluir) {
      return (ids || []).filter(function (id) { return porId[id] && id !== excluir; })
        .map(function (id) { return { id: id, pregunta: porId[id].pregunta }; });
    }

    function deEntrada(e, extra) {
      var chips = chipsDe(e.relacionadas, e.id);
      if (extra && !chips.some(function (c) { return c.id === extra.id; }) && extra.id !== e.id) {
        chips.push({ id: extra.id, pregunta: extra.pregunta });
      }
      return { tipo: "respuesta", id: e.id, texto: e.respuesta, chips: chips.slice(0, 4), etiqueta: "Te puede interesar:" };
    }

    function responder(texto) {
      var q = normalizar(texto);
      if (!q) return { tipo: "vacio" };

      var it = detectarIntencion(q);
      if (it) {
        return {
          tipo: "intencion", id: it.id, accion: it.accion || null, texto: it.respuesta,
          chips: chipsDe(it.relacionadas), etiqueta: "Puedes probar con:"
        };
      }

      var res = buscar(q);
      var mejor = res[0];
      var segundoPuntaje = res[1] ? res[1].puntaje : 0;
      var victoriaClara = mejor && mejor.puntaje >= 6 && mejor.puntaje >= segundoPuntaje * 1.5 &&
        mejor.fuertes >= 2 && mejor.mejorIdf >= IDF_MIN && mejor.cobertura >= 0.4;
      var confiable = mejor && mejor.puntaje >= MIN_PUNTAJE && mejor.fuertes >= 1 &&
        (mejor.porFrase || victoriaClara || (mejor.mejorIdf >= IDF_MIN && mejor.cobertura >= COBERTURA_MIN));
      if (confiable) {
        var segundo = res[1];
        var cercano = segundo && segundo.fuertes >= 1 && segundo.puntaje >= mejor.puntaje * 0.8 ? segundo.entrada : null;
        return deEntrada(mejor.entrada, cercano);
      }

      var sugeridas = res.filter(function (r) { return r.fuertes >= 1; }).slice(0, 3);
      if (sugeridas.length) {
        return {
          tipo: "sugerencias", texto: kb.sinRespuestaConSugerencias,
          chips: sugeridas.map(function (r) { return { id: r.entrada.id, pregunta: r.entrada.pregunta }; }),
          etiqueta: ""
        };
      }
      return {
        tipo: "nada", texto: kb.sinRespuesta,
        chips: kb.temas.map(function (t) { return { tema: t.id, pregunta: t.nombre }; }),
        etiqueta: ""
      };
    }

    function respuestaPorId(id) {
      var e = porId[id];
      return e ? deEntrada(e) : { tipo: "vacio" };
    }

    function preguntasDeTema(idTema) {
      return kb.entradas.filter(function (e) { return e.tema === idTema; })
        .map(function (e) { return { id: e.id, pregunta: e.pregunta }; });
    }

    return {
      responder: responder,
      respuestaPorId: respuestaPorId,
      preguntasDeTema: preguntasDeTema,
      buscar: function (t) { return buscar(t); },
      temas: kb.temas,
      sugerencias: chipsDe(kb.sugerencias),
      PREGUNTA: function (id) { return porId[id] ? porId[id].pregunta : ""; }
    };
  }

  return { crear: crear, normalizar: normalizar, raiz: raiz, MIN_PUNTAJE: MIN_PUNTAJE };
})();

if (typeof module !== "undefined" && module.exports) { module.exports = Motor; }
