const Motor = require("../motor.js"), kb = require("../conocimiento.js");
const m = Motor.crear(kb);

// [pregunta, id esperado]  (null = debe decir "no sé"; "intent:xxx" = intención)
const casos = [
  // Preguntas directas
  ["¿Qué es el Día de Muertos?", "que-es"],
  ["que es dia de muertos", "que-es"],
  ["de donde viene el dia de muertos", "origen"],
  ["¿es una tradicion prehispanica o espanola?", "origen"],
  ["que es el mictlan", "mictlan"],
  ["quien es mictlantecuhtli", "mictlan"],
  ["¿por que se celebra el dia de muertos?", "porque-se-celebra"],
  ["las almas regresan a casa?", "porque-se-celebra"],
  ["que dijo la unesco", "unesco"],
  ["es patrimonio de la humanidad?", "unesco"],
  ["que es el xoloitzcuintle", "xolo"],
  ["por que hay perros en la ofrenda", "xolo"],
  // Ofrenda
  ["que es una ofrenda", "que-es-ofrenda"],
  ["para que sirve un altar de muertos", "que-es-ofrenda"],
  ["que cosas se ponen en la ofrenda", "elementos"],
  ["que significa cada elemento de la ofrenda", "elementos"],
  ["cuantos niveles tiene la ofrenda", "niveles"],
  ["para que es el arco de flores", "arco"],
  ["que se le pone a un niño en la ofrenda", "ofrenda-ninos"],
  ["puedo ponerle ofrenda a mi gato", "ofrenda-mascotas"],
  ["que son las animas solas", "animas-solas"],
  // Elementos
  ["que es el cempasuchil", "cempasuchil"],
  ["por que la flor de muerto es naranja", "cempasuchil"],
  ["¿que flores se usan en dia de muertos?", "cempasuchil"],
  ["para que sirve el copal", "copal"],
  ["que significan las veladoras", "velas"],
  ["por que se pone sal en el altar", "sal-agua"],
  ["que significa el papel picado", "papel-picado"],
  ["que representa el pan de muerto", "pan-muerto"],
  ["que son las calaveras de azucar", "calaveras-azucar"],
  ["que comida se pone en el altar", "comida-ofrenda"],
  ["se pone mezcal en la ofrenda?", "comida-ofrenda"],
  ["para que sirve el petate", "otros-objetos"],
  // Fechas
  ["cuando se celebra el dia de muertos", "fechas"],
  ["que dia es el dia de muertos", "fechas"],
  ["que es el dia de los angelitos", "angelitos"],
  ["que se hace en el panteon", "panteon"],
  // Regiones
  ["como se celebra en janitzio", "janitzio"],
  ["dia de muertos en michoacan", "janitzio"],
  ["que pasa en mixquic", "mixquic"],
  ["como celebran en oaxaca", "oaxaca"],
  ["que es hanal pixan", "yucatan"],
  ["dia de muertos en mérida", "yucatan"],
  ["ofrendas monumentales de huaquechula", "huaquechula"],
  ["limpieza de huesos en pomuch", "pomuch"],
  ["festival de calaveras aguascalientes", "aguascalientes"],
  ["desfile de la ciudad de mexico", "cdmx"],
  ["se celebra igual en todo mexico?", "diferencias-regiones"],
  ["donde se celebra mas el dia de muertos", "donde-ver"],
  // Arte
  ["quien creo a la catrina", "catrina"],
  ["quien pinto a la catrina", "catrina"],
  ["quien fue jose guadalupe posada", "posada"],
  ["que es una calaverita literaria", "calaveras-literarias"],
  ["la pelicula coco es real?", "coco"],
  ["que artesanias hay", "artesanias"],
  // Mundo
  ["diferencia entre halloween y dia de muertos", "halloween"],
  ["es lo mismo que jalogüin", "halloween"],
  ["otros paises celebran a sus muertos?", "otros-paises"],
  ["que son los barriletes de guatemala", "guatemala"],
  ["que es la colada morada", "ecuador"],
  ["que son las natitas", "bolivia"],
  // Práctico
  ["como armo una ofrenda", "armar-ofrenda"],
  ["como hacer una ofrenda en casa", "armar-ofrenda"],
  ["ayudame a escribir una calaverita", "escribir-calaverita"],
  ["como hago una calavera literaria", "escribir-calaverita"],
  ["dame un ejemplo de calaverita", "ejemplo-calaverita"],
  ["que no debo hacer en el panteon", "respeto"],
  ["puedo tomar fotos en un panteon", "respeto"],
  ["ideas para mi exposicion de dia de muertos", "exposicion"],
  ["ideas para un concurso de ofrendas", "ofrenda-escuela"],
  ["como puedo honrar a mi abuelo", "honrar"],
  ["puedo maquillarme de catrina", "maquillaje-catrina"],
  ["que significa panteon", "vocabulario"],
  // Faltas de ortografía
  ["que es el sempasuchil", "cempasuchil"],
  ["quien creo a la katrina", "catrina"],
  ["que es una ofrena", "que-es-ofrenda"],
  ["calavera literaria", "calaveras-literarias"],
  ["caravera literaria", "calaveras-literarias"],
  ["QUE ES EL DIA DE MUERTOS???", "que-es"],
  ["catrina", "catrina"],
  ["cempasuchil", "cempasuchil"],
  ["oaxaca", "oaxaca"],
  ["pan de muerto", "pan-muerto"],
  // Intenciones
  ["hola", "intent:saludo"],
  ["buenos dias", "intent:saludo"],
  ["gracias", "intent:gracias"],
  ["muchas gracias", "intent:gracias"],
  ["adios", "intent:despedida"],
  ["hasta luego", "intent:despedida"],
  ["quien eres", "intent:quien-eres"],
  ["eres una ia?", "intent:quien-eres"],
  ["temas", "intent:temas"],
  ["ayuda", "intent:temas"],
  ["me quiero morir", "intent:crisis"],
  ["a veces pienso en suicidarme", "intent:crisis"],
  ["murio mi abuelo hace poco", "intent:duelo"],
  ["extraño a mi papa", "intent:duelo"],
  // Debe decir "no sé"
  ["cual es la capital de francia", null],
  ["quien gano el mundial", null],
  ["que dia es hoy", null],
  ["cuanto es 2 mas 2", null],
  ["recomiendame una pelicula de terror", null],
  ["como hacer un pastel de chocolate", null],
  ["hola que es la ofrenda", "que-es-ofrenda"],
  // Preguntas largas y con lenguaje natural
  ["oye y me puedes decir por favor que significa la sal que ponen en los altares", "sal-agua"],
  ["tengo que hacer una tarea sobre la catrina, quien la invento?", "catrina"],
  ["mi maestra nos dejo investigar por que se pone papel picado", "papel-picado"],
  ["cuentame algo del dia de muertos", "que-es"],
  ["quiero saber como se celebra el dia de muertos en yucatan", "yucatan"],
  ["necesito ideas para el altar de mi escuela", "ofrenda-escuela"],
  ["cual es la flor que se pone en los altares", "cempasuchil"],
  ["en que se parece el dia de muertos a halloween", "halloween"],
  ["que es lo que se come en dia de muertos", "comida-ofrenda"],
  ["porque ponen velas en las ofrendas", "velas"],
  ["quien es la catrina", "catrina"],
  ["que fechas son el dia de muertos", "fechas"],
  ["me puedes explicar que es mixquic", "mixquic"],
  ["que significa que los muertos regresen", "porque-se-celebra"],
  // Más fuera de tema
  ["cual es tu color favorito", null],
  ["dame la receta de tacos al pastor", null],
  ["cuantos habitantes tiene mexico", null],
  ["como se llama el presidente", null],
  ["que clima hace hoy", null],
];

let ok = 0, fallos = [];
for (const [q, esperado] of casos) {
  const r = m.responder(q);
  let obtenido;
  if (r.tipo === "intencion") obtenido = "intent:" + r.id;
  else if (r.tipo === "respuesta") obtenido = r.id;
  else obtenido = null;
  const bien = obtenido === esperado;
  if (bien) ok++; else fallos.push({ q, esperado, obtenido, tipo: r.tipo, top: m.buscar(q).slice(0,3).map(x=>x.entrada.id+":"+x.puntaje.toFixed(1)).join(" | ") });
}
console.log(`Aciertos: ${ok}/${casos.length}`);
fallos.forEach(f => console.log("✗", JSON.stringify(f.q), "→ esperado", f.esperado, "| obtenido", f.obtenido, `(${f.tipo})`, "|", f.top));
