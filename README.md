# Guía de Ofrenda (versión sin IA)

Chatbot sobre el Día de Muertos para estudiantes de secundaria en adelante que **no depende de ninguna inteligencia artificial, API ni servidor**. Todo corre en el navegador de quien lo abre.

- **Costo por pregunta: cero.** No hay API keys, saldo ni límites de uso.
- **Privacidad:** las preguntas no salen del dispositivo. (La única conexión externa es la de las tipografías de Google Fonts; si no quieres ni eso, borra las líneas `<link ... fonts.googleapis.com ...>` de `index.html` y se usarán las tipografías del sistema.)
- **Respuestas controladas:** el bot solo dice lo que está escrito en `conocimiento.js`. Tú decides qué contenido hay y puedes revisarlo con tu maestra o maestro.

## Cómo funciona

No genera texto. Compara la pregunta con una base de 58 preguntas y respuestas ya escritas, usando técnicas clásicas de búsqueda:

1. Quita acentos, mayúsculas y signos.
2. Reduce las palabras a su raíz (`ofrendas` y `ofrenda` se tratan igual) y aplica sinónimos (`altar` = `ofrenda`).
3. Corrige faltas de ortografía de una letra en palabras de 6 letras o más (`sempasuchil` → `cempasuchil`).
4. Puntúa cada entrada (algoritmo BM25) y premia las frases características.
5. Si ninguna entrada es suficientemente confiable, **no inventa**: sugiere preguntas parecidas o muestra los temas.

También detecta saludos, agradecimientos y dos casos sensibles: si alguien escribe que perdió a un ser querido, responde con empatía; si escribe frases de crisis emocional, muestra un mensaje de apoyo con la **Línea de la Vida (800 911 2000, gratuita, 24 horas)** y el 911 para emergencias. Ese número se verificó en octubre de 2026; revísalo de vez en cuando.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La página. Carga los tres archivos `.js` de abajo |
| `guia-de-ofrenda-un-solo-archivo.html` | Lo mismo, todo en un solo archivo (fácil de compartir por USB o correo) |
| `conocimiento.js` | **La base de conocimiento: aquí se edita el contenido** |
| `motor.js` | El buscador (normalmente no hay que tocarlo) |
| `app.js` | La interfaz del chat |
| `pruebas/` | Pruebas automáticas (opcionales, requieren Node.js) |

## Cómo usarlo

**En tu computadora:** abre `index.html` (o el archivo de un solo archivo) con doble clic.

**Para que cualquiera lo use por internet:** sube la carpeta a cualquier hosting de sitios estáticos (por ejemplo GitHub Pages, Netlify o Cloudflare Pages; revisa sus planes gratuitos vigentes) o al servidor web de tu escuela. No necesita Python, base de datos ni configuración.

**En GitHub Pages (este repositorio):** en GitHub ve a *Settings → Pages*, en *Build and deployment* elige *Source: Deploy from a branch*, rama `main` y carpeta `/ (root)`, y guarda. En uno o dos minutos la página queda en `https://diebay.github.io/Chat_bot_dia_de_muertos/`. Cada vez que hagas `git push` a `main`, la página se actualiza sola.

**En la escuela sin internet:** copia la carpeta a las computadoras o a una USB y abre `index.html`.

## Cómo agregar o corregir contenido

Abre `conocimiento.js` y agrega una entrada al arreglo `entradas`:

```js
{
  id: "alebrijes", tema: "arte",
  pregunta: "¿Qué son los alebrijes?",
  variantes: ["¿Qué es un alebrije?", "animales fantásticos de colores", "alebrijes de Oaxaca"],
  clave: ["alebrije", "alebrijes"],
  respuesta: "Los **alebrijes** son figuras fantásticas de colores vivos...",
  relacionadas: ["artesanias", "coco"]
}
```

- **`variantes`:** escribe las formas distintas en que tus alumnos harían la misma pregunta. Es lo que más mejora los resultados.
- **`clave`:** palabras o frases muy específicas del tema. Si aparecen en la pregunta, la entrada sube de puntaje. Evita frases demasiado generales.
- **`respuesta`:** admite `**negritas**`, `*cursivas*`, listas con `- ` y numeradas con `1. `.
- **`sinonimos`:** si los alumnos usan una palabra distinta (por ejemplo `cementerio` por `panteón`), agrégala ahí.
- Un `id` no puede repetirse, y los `id` de `relacionadas` deben existir.

### Cómo mejorarlo con preguntas reales

Pídele a un grupo que lo pruebe y anota las preguntas a las que respondió mal o dijo «no encontré». Cada una es una entrada nueva (o una variante nueva) que le falta a la base. Esta versión no guarda las preguntas de los usuarios, así que esa recolección se hace a mano (por ejemplo, con una hoja de papel o un formulario aparte).

### Probarlo

Con Node.js instalado, desde la carpeta `pruebas/`:

```bash
node preguntas_de_ajuste.js     # preguntas con las que se afinó el buscador
node preguntas_nuevas.js        # preguntas distintas, para medir cómo generaliza
node interfaz.js                # recorrido de la interfaz con un navegador simulado
```

Agrega tus propias preguntas a esos archivos cada vez que amplíes la base.

## Límites que conviene conocer

- **Solo sabe lo que está escrito.** Las 58 entradas cubren lo más común, pero habrá preguntas válidas del tema sin respuesta (por ejemplo, tradiciones de un estado que no está en la base). En esos casos lo dice y sugiere otras preguntas.
- **No entiende contexto ni combina ideas.** Una pregunta de seguimiento como «¿y en Oaxaca?» no se interpreta; cada pregunta se responde por separado.
- **Puede equivocarse al interpretar.** En mis pruebas: acertó 123 de 123 preguntas usadas para ajustarlo, y 48 de 50 preguntas nuevas (en una más mostró la respuesta correcta entre las sugerencias y en otra dio una respuesta poco precisa a una pregunta fuera de tema: «historia de México» la contesta con el origen del Día de Muertos). Con estudiantes reales habrá más casos; no es una garantía.
- **El contenido necesita revisión humana.** Las respuestas fueron redactadas para este proyecto con información general ampliamente difundida, y donde hay variaciones lo indican. Antes de usarlo en una escuela, que una maestra o maestro lo revise y lo adapte a su región y a su programa.
