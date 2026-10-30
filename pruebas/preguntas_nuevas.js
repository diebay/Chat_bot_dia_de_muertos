const Motor = require("../motor.js"), kb = require("../conocimiento.js");
const m = Motor.crear(kb);
// Preguntas nuevas, escritas como las escribiría un alumno. [pregunta, id esperado | null = "no sé" | "~algo" = aceptable que sugiera]
const casos = [
  ["porque los mexicanos celebran a los muertos si es algo triste", "porque-se-celebra"],
  ["cuales son las partes de un altar", "elementos"],
  ["que significa cada cosa que ponen en el altar de muertos", "elementos"],
  ["para que ponen fotos de los muertos", "foto"],
  ["que es el pan que se come en noviembre", "pan-muerto"],
  ["por que se ponen flores amarillas", "cempasuchil"],
  ["que es el incienso que queman", "copal"],
  ["que representan las calaveritas de dulce", "calaveras-azucar"],
  ["que se hace el primero de noviembre", "fechas"],
  ["cuantos dias se celebra", "fechas"],
  ["como era antes de que llegaran los españoles", "origen|sincretismo"],
  ["que creian los aztecas sobre la muerte", "mictlan"],
  ["diferencias entre halloween y el dia de muertos para mi tarea", "halloween"],
  ["que pais celebra tambien a sus muertos", "otros-paises"],
  ["como festejan en guatemala", "guatemala"],
  ["quien es la señora calavera elegante con sombrero", "catrina"],
  ["quien dibujo las calaveras famosas", "posada"],
  ["que pelicula habla del dia de muertos", "coco"],
  ["historia de mexico para mi tarea", null],
  ["cuantos planetas hay", null],
  ["que es un volcan", null],
  ["como se juega futbol", null],
  ["me puedes ayudar con mi tarea", null],
  ["donde puedo ir a ver ofrendas grandes", "donde-ver"],
  ["pueblos famosos por el dia de muertos", "donde-ver"],
  ["como es el dia de muertos en puebla", "huaquechula"],
  ["que se hace en campeche con los huesos", "pomuch"],
  ["como festejan los mayas a sus difuntos", "yucatan"],
  ["que significa velar a los muertos", "panteon"],
  ["como hacer un altar para mi escuela", "armar-ofrenda|ofrenda-escuela"],
  ["me puedes dar un poema de calavera", "ejemplo-calaverita"],
  ["como se escribe una calaverita", "escribir-calaverita"],
  ["que debo evitar al visitar un panteon", "respeto"],
  ["como presento mi trabajo sobre el dia de muertos", "exposicion"],
  ["es de mala educacion pintarse de calavera", "maquillaje-catrina"],
  ["que es una ofrenda para ninos", "ofrenda-ninos"],
  ["como recuerdo a mi abuelita que ya murio", "honrar"],
  ["que significa calaca", "vocabulario"],
  ["que es el fiambre", "guatemala"],
  ["mixquic donde queda", "mixquic"],
  ["que son los angelitos", "angelitos"],
  // Del tema pero que la base NO cubre: lo ideal es sugerir o decir que no sabe, no inventar
  ["como se celebra el dia de muertos en chiapas", "~"],
  ["que cancion se canta en dia de muertos", "~"],
  ["quien es la llorona", "~"],
  ["que es el tzompantli", "~"],
  ["cuanto cuesta un altar", "~"],
  // Fuera de tema
  ["quien es el mejor futbolista", null],
  ["me ayudas con mi tarea de matematicas", null],
  ["cuentame un chiste", null],
  ["cual es la capital de españa", null],
];
let ok = 0, sugOk = 0; const raros = [];
for (const [q, esp] of casos) {
  const r = m.responder(q);
  const obt = r.tipo === "respuesta" ? r.id : (r.tipo === "intencion" ? "intent:" + r.id : null);
  const bien = esp === "~" ? (r.tipo !== "respuesta") : (typeof esp === "string" ? esp.split("|").includes(obt) : obt === esp);
  const sug = (r.tipo === "sugerencias" && typeof esp === "string" && esp !== "~") ? r.chips.map(c => c.id) : [];
  const sugBien = !bien && sug.some(id => esp.split("|").includes(id));
  if (bien) ok++; else if (sugBien) sugOk++; else raros.push([q, esp, obt, r.tipo, m.buscar(q).slice(0,3).map(x=>x.entrada.id+":"+x.puntaje.toFixed(1)+(x.porFrase?"*":"")).join(" | ")]);
}
console.log(`Respuesta correcta: ${ok}/${casos.length} | sugerencia con la respuesta correcta: ${sugOk} | fallos reales: ${raros.length}`);
raros.forEach(x => console.log("✗", JSON.stringify(x[0]), "→ esperado", x[1], "| obtenido", x[2], `(${x[3]})`, "|", x[4]));
