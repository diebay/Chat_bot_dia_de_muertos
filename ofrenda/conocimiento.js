/*
 * BASE DE CONOCIMIENTO · Guía de Ofrenda (versión sin IA)
 *
 * Aquí vive TODO lo que sabe el bot. Para ampliarlo basta con agregar entradas
 * al arreglo "entradas" (no hace falta tocar nada más). Cada entrada tiene:
 *
 *   id            nombre único, sin espacios (se usa en "relacionadas")
 *   tema          uno de los ids de "temas"
 *   pregunta      la pregunta principal (también se muestra como botón)
 *   variantes     otras formas en que la gente puede preguntar lo mismo
 *   clave         frases características; si aparecen en la pregunta, suben la puntuación
 *   respuesta     texto de la respuesta (admite **negritas**, *cursivas* y listas con "- " o "1. ")
 *   relacionadas  ids de otras entradas que se sugieren después de responder
 *
 * Consejo: mientras más variantes escribas (con las palabras que usan tus alumnos),
 * mejor entenderá el bot. Los acentos y mayúsculas no importan.
 */
var CONOCIMIENTO = {

  temas: [
    { id: "origen",    nombre: "Origen e historia" },
    { id: "ofrenda",   nombre: "La ofrenda" },
    { id: "elementos", nombre: "Flores, comida y objetos" },
    { id: "fechas",    nombre: "Fechas y panteón" },
    { id: "regiones",  nombre: "Tradiciones por región" },
    { id: "arte",      nombre: "Arte y cultura popular" },
    { id: "mundo",     nombre: "Comparaciones y otros países" },
    { id: "practico",  nombre: "Tareas y participación" }
  ],

  // Preguntas que aparecen como botones en la pantalla de inicio
  sugerencias: ["elementos", "halloween", "janitzio", "catrina", "escribir-calaverita", "unesco"],

  // Palabras que significan lo mismo (todo en minúsculas y sin acentos)
  sinonimos: {
    altar: "ofrenda", altares: "ofrenda",
    difunto: "muerto", difuntos: "muerto", difunta: "muerto", difuntas: "muerto",
    finado: "muerto", finados: "muerto", fallecido: "muerto", fallecidos: "muerto", fallecida: "muerto",
    veladora: "vela", veladoras: "vela",
    catrin: "catrina", catrines: "catrina",
    calaca: "calavera", calacas: "calavera", esqueleto: "calavera", esqueletos: "calavera",
    cementerio: "panteon", cementerios: "panteon", tumba: "panteon", tumbas: "panteon", camposanto: "panteon",
    papalote: "barrilete", papalotes: "barrilete", cometa: "barrilete",
    comer: "comida", come: "comida", comen: "comida", comemos: "comida", comiendo: "comida", alimento: "comida", alimentos: "comida",
    platillo: "comida", platillos: "comida", comidas: "comida", guisado: "comida",
    bebidas: "bebida", tomar: "bebida", beben: "bebida", trago: "bebida", tragos: "bebida",
    cuando: "fecha", fechas: "fecha", calendario: "fecha",
    donde: "lugar", lugares: "lugar", estados: "lugar", ciudades: "lugar",
    inicio: "origen", origenes: "origen", surgio: "origen", nacio: "origen", empezo: "origen",
    xolo: "xoloitzcuintle", xoloitzcuintles: "xoloitzcuintle",
    ninos: "nino", ninas: "nino", infantes: "nino", chiquitos: "nino", pequenos: "nino",
    bebe: "nino", bebes: "nino",
    gato: "mascota", gatos: "mascota", perros: "mascota", mascotas: "mascota",
    velar: "velacion", velan: "velacion", velando: "velacion", velamos: "velacion", velatorio: "velacion",
    velada: "velacion", veladas: "velacion", velaciones: "velacion",
    maquillarse: "maquillaje", disfrazarme: "maquillaje", disfraz: "maquillaje", disfrazarse: "maquillaje",
    pintarse: "maquillaje",
    tarea: "tarea", trabajo: "tarea", exponer: "exposicion", presentacion: "exposicion", expo: "exposicion",
    concurso: "concurso", concursos: "concurso",
    poema: "verso", poemas: "verso", versos: "verso", rima: "verso", rimas: "verso", rimar: "verso",
    escribo: "escribir", redactar: "escribir", componer: "escribir",
    armo: "armar", montar: "armar", montaje: "armar", construir: "armar", preparar: "armar",
    instalar: "armar", decorar: "armar",
    disney: "coco", pixar: "coco",
    respetar: "respeto", respetuoso: "respeto", comportarme: "respeto", comportar: "respeto",
    recordar: "honrar", recuerdo: "honrar", homenaje: "honrar", homenajear: "honrar",
    mixquic: "mixquic", janitzio: "janitzio", patzcuaro: "janitzio",
    yucatan: "yucatan", maya: "yucatan", mayas: "yucatan", hanal: "yucatan", pixan: "yucatan",
    quintana: "yucatan", campeche: "yucatan", merida: "yucatan"
  },

  // Correcciones de escritura frecuentes (expresiones regulares sobre texto sin acentos)
  frases: [
    ["z?empa[sz]u?[ck]h?[iy]l|cempoalxochitl|zempoalxochitl|sempasuchil|cempaxuchitl|cempasuchitl", "cempasuchil"],
    ["jalowin|jaloguin|jalowen|jaloween|hallowen|haloween", "halloween"],
    ["dia de los muertos|dia de muertos|dia de los fieles difuntos", "dia de muertos"],
    ["(el )?(primero|uno) de noviembre", "1 de noviembre"],
    ["(el )?(segundo|dos) de noviembre", "2 de noviembre"],
    ["(el )?treinta y uno de octubre", "31 de octubre"]
  ],

  entradas: [

    /* ====================== ORIGEN E HISTORIA ====================== */
    {
      id: "que-es", tema: "origen",
      pregunta: "¿Qué es el Día de Muertos?",
      variantes: ["¿De qué trata el Día de Muertos?", "Explícame el Día de Muertos", "¿En qué consiste esta celebración?", "definición del día de muertos", "¿Qué es esta tradición mexicana?", "Cuéntame sobre el Día de Muertos", "Háblame del Día de Muertos", "Dame información sobre el Día de Muertos"],
      clave: ["que es el dia de muertos", "que es dia de muertos", "de que trata", "en que consiste", "informacion del dia de muertos", "informacion sobre el dia de muertos", "sobre el dia de muertos", "hablame del dia de muertos", "algo del dia de muertos"],
      respuesta: "El **Día de Muertos** es una celebración mexicana en la que las familias recuerdan a sus seres queridos que ya fallecieron. Se cree que durante estos días las almas pueden volver a visitar a sus familias, por eso se les prepara una **ofrenda** con flores, velas, comida y objetos que disfrutaban en vida.\n\nNo es una fiesta triste: mezcla recuerdo, cariño y hasta humor. Se celebra principalmente del **31 de octubre al 2 de noviembre**, y la UNESCO la reconoce como Patrimonio Cultural Inmaterial de la Humanidad.",
      relacionadas: ["origen", "porque-se-celebra", "que-es-ofrenda"]
    },
    {
      id: "origen", tema: "origen",
      pregunta: "¿Cuál es el origen del Día de Muertos?",
      variantes: ["¿De dónde viene el Día de Muertos?", "¿Cómo surgió esta tradición?", "historia del día de muertos", "¿Desde cuándo existe?", "¿Es prehispánico o español?", "¿Quién inventó el Día de Muertos?"],
      clave: ["origen del dia de muertos", "de donde viene", "como surgio", "historia del dia de muertos", "es prehispanico", "desde cuando existe"],
      respuesta: "Tiene **raíces prehispánicas y europeas**. Pueblos mesoamericanos, como los mexicas, ya tenían rituales y ofrendas para honrar a sus muertos. Con la llegada de los españoles, en el siglo XVI, esas costumbres se mezclaron con el calendario católico (Todos los Santos y Fieles Difuntos), y de esa fusión nació la celebración que conocemos.\n\nLos historiadores todavía discuten cuánto aporta cada tradición, y hoy cada región y comunidad la vive a su manera.",
      relacionadas: ["mictlan", "sincretismo", "todos-santos"]
    },
    {
      id: "mictlan", tema: "origen",
      pregunta: "¿Qué es el Mictlán y cómo veían la muerte los mexicas?",
      variantes: ["¿Qué es el Mictlán?", "¿Adónde iban los muertos para los mexicas?", "¿Quién es Mictlantecuhtli?", "¿Quién es Mictecacíhuatl?", "inframundo azteca", "¿Cuántos niveles tiene el Mictlán?", "viaje de las almas"],
      clave: ["mictlan", "mictlantecuhtli", "mictecacihuatl", "inframundo", "viaje del alma", "aztecas", "mexicas"],
      respuesta: "El **Mictlán** era, para los mexicas, el lugar de los muertos, gobernado por **Mictlantecuhtli** y **Mictecacíhuatl**. Según la tradición, el alma debía atravesar **nueve niveles** con pruebas y peligros, un viaje que se contaba de unos **cuatro años**, hasta llegar al descanso final.\n\nNo todos iban allá: el destino dependía de cómo moría la persona. Quienes morían en combate o de parto, por ejemplo, tenían otros destinos, y quienes morían por causas relacionadas con el agua iban al Tlalocan.\n\nLa idea de que el alma hace un viaje largo es una de las raíces de elementos como el agua, la sal y la comida en la ofrenda.",
      relacionadas: ["xolo", "sal-agua", "origen"]
    },
    {
      id: "sincretismo", tema: "origen",
      pregunta: "¿Cómo se mezcló con las tradiciones católicas?",
      variantes: ["¿Qué es el sincretismo en el Día de Muertos?", "¿Qué influencia tuvo la Conquista?", "¿Qué aportaron los españoles?", "religión y día de muertos", "mezcla de culturas indígena y española", "¿Es una fiesta católica?"],
      clave: ["sincretismo", "conquista", "los espanoles", "mezcla de culturas", "catolic", "religion"],
      respuesta: "Cuando llegaron los españoles trajeron las celebraciones católicas de **Todos los Santos (1 de noviembre)** y **Fieles Difuntos (2 de noviembre)**. Las costumbres indígenas para honrar a los muertos y las católicas se fueron combinando: las fechas se acercaron al calendario católico y aparecieron cruces, imágenes de santos y rezos junto a elementos como el cempasúchil, el copal y la comida.\n\nA esta mezcla de culturas se le llama **sincretismo**. Algunas fuentes señalan que, antes de la Conquista, los rituales para los muertos se hacían en otras épocas del calendario.",
      relacionadas: ["todos-santos", "origen", "unesco"]
    },
    {
      id: "todos-santos", tema: "origen",
      pregunta: "¿Qué es el Día de Todos los Santos y de los Fieles Difuntos?",
      variantes: ["¿Qué se celebra el 1 de noviembre?", "¿Qué se celebra el 2 de noviembre?", "diferencia entre todos los santos y fieles difuntos", "¿Qué son los fieles difuntos?"],
      clave: ["todos los santos", "fieles difuntos", "fiel difunto"],
      respuesta: "Son dos fechas del calendario católico. El **1 de noviembre** es el **Día de Todos los Santos**, en que la Iglesia honra a los santos. El **2 de noviembre** es la **Conmemoración de los Fieles Difuntos**, dedicada a rezar por quienes han fallecido.\n\nEn México estas fechas se encontraron con las tradiciones indígenas sobre los muertos y dieron forma al Día de Muertos actual.",
      relacionadas: ["sincretismo", "fechas", "angelitos"]
    },
    {
      id: "porque-se-celebra", tema: "origen",
      pregunta: "¿Por qué se celebra el Día de Muertos?",
      variantes: ["¿Cuál es el significado del Día de Muertos?", "¿Para qué sirve esta celebración?", "¿Qué se cree que pasa con las almas?", "¿Por qué los mexicanos celebran la muerte?", "¿Las almas regresan?", "sentido de la tradición", "¿Por qué celebramos a los muertos si es algo triste?", "¿Por qué los mexicanos celebran a los muertos?"],
      clave: ["por que se celebra", "por que celebramos", "para que se celebra", "las almas regresan", "regresan las almas", "significado del dia de muertos", "relacion con la muerte"],
      respuesta: "Porque en esta tradición el vínculo con quienes murieron **no se corta**: se cree que sus almas regresan a visitar a la familia. Celebrar es una manera de **recordarlos, agradecerles y mantenerlos presentes** con comida, música, historias y flores.\n\nTambién refleja una relación cercana con la muerte: se la enfrenta con cariño y a veces con humor, como en las calaveritas. La tradición no pide olvidar el dolor, sino acompañarlo con memoria y comunidad.",
      relacionadas: ["que-es-ofrenda", "honrar", "calaveras-literarias"]
    },
    {
      id: "unesco", tema: "origen",
      pregunta: "¿Por qué la UNESCO lo reconoce como patrimonio?",
      variantes: ["¿Es Patrimonio de la Humanidad?", "¿Cuándo lo declaró la UNESCO?", "patrimonio cultural inmaterial", "¿Qué dijo la UNESCO del Día de Muertos?"],
      clave: ["unesco", "patrimonio", "patrimonio cultural inmaterial", "patrimonio de la humanidad"],
      respuesta: "En **2008** la UNESCO inscribió la «festividad indígena dedicada a los muertos» de México en la **Lista Representativa del Patrimonio Cultural Inmaterial de la Humanidad**. Antes, en 2003, ya la había proclamado Obra Maestra del Patrimonio Oral e Intangible.\n\nSe reconoció porque es una **tradición viva**: se transmite de generación en generación, une a las comunidades y combina raíces indígenas con otras influencias. El reconocimiento no significa que sea igual en todo el país; se valora precisamente su diversidad.",
      relacionadas: ["origen", "diferencias-regiones", "que-es"]
    },
    {
      id: "xolo", tema: "origen",
      pregunta: "¿Qué papel tiene el xoloitzcuintle (el perro)?",
      variantes: ["¿Por qué hay perros en la ofrenda?", "¿Qué es un xoloitzcuintle?", "¿El perro guía a las almas?", "perro sin pelo mexicano", "¿Quién es Dante en Coco?"],
      clave: ["xoloitzcuintle", "perro en la ofrenda", "perro guia"],
      respuesta: "El **xoloitzcuintle** es una raza de perro mexicano, sin pelo. En la tradición prehispánica se asocia con el viaje al Mictlán: se creía que un perro **acompañaba y ayudaba al alma** a cruzar un río del inframundo.\n\nPor eso a veces se ponen figuras de perritos en la ofrenda. También aparece en la película *Coco*, donde Dante es un xoloitzcuintle.",
      relacionadas: ["mictlan", "coco", "ofrenda-mascotas"]
    },

    /* ====================== LA OFRENDA ====================== */
    {
      id: "que-es-ofrenda", tema: "ofrenda",
      pregunta: "¿Qué es una ofrenda?",
      variantes: ["¿Qué es un altar de muertos?", "¿Para qué sirve la ofrenda?", "¿Qué se hace con la ofrenda?", "definición de ofrenda", "¿A quién se le pone ofrenda?"],
      clave: ["que es una ofrenda", "que es la ofrenda", "que es un altar", "para que sirve la ofrenda"],
      respuesta: "La **ofrenda** (o altar de muertos) es el espacio donde la familia **recibe a sus difuntos** durante estos días. Lleva fotografías, flores, velas, comida, bebida y objetos que a la persona le gustaban.\n\nEs sobre todo un acto de **memoria y cariño**: se prepara con tiempo y se comparte en familia. Cada familia y región la arma a su manera, y no hay una forma única correcta.",
      relacionadas: ["elementos", "niveles", "armar-ofrenda"]
    },
    {
      id: "elementos", tema: "ofrenda",
      pregunta: "¿Qué elementos lleva una ofrenda?",
      variantes: ["¿Qué se pone en la ofrenda?", "¿Qué significa cada elemento de la ofrenda?", "partes de la ofrenda", "¿Qué lleva un altar de muertos?", "lista de cosas para la ofrenda", "elementos de la ofrenda y su significado"],
      clave: ["elementos de la ofrenda", "que lleva una ofrenda", "que se pone en la ofrenda", "cada elemento", "partes de la ofrenda", "que lleva el altar"],
      respuesta: "Una ofrenda tradicional suele incluir:\n- **Fotografías** de los difuntos\n- **Flores** (cempasúchil y otras)\n- **Velas o veladoras**\n- **Copal o incienso**\n- **Agua y sal**\n- **Papel picado**\n- **Pan de muerto**\n- **Comida y bebida** favoritas del difunto\n- **Calaveras de azúcar**\n- Objetos personales, juguetes (en altares de niños) y un petate\n\nPregúntame por cualquiera de ellos para conocer su significado.",
      relacionadas: ["cempasuchil", "velas", "comida-ofrenda"]
    },
    {
      id: "niveles", tema: "ofrenda",
      pregunta: "¿Qué significan los niveles de la ofrenda?",
      variantes: ["¿Cuántos niveles tiene una ofrenda?", "¿Por qué la ofrenda tiene escalones?", "ofrenda de dos, tres o siete niveles", "pisos del altar"],
      clave: ["niveles", "escalones", "pisos", "siete niveles", "tres niveles"],
      respuesta: "Hay ofrendas de **uno, dos, tres, siete** o más niveles, y el significado depende de la región y la familia. Algunas explicaciones comunes:\n- **Dos niveles:** cielo y tierra.\n- **Tres niveles:** cielo, tierra e inframundo (o, en versiones católicas, cielo, purgatorio y tierra).\n- **Siete niveles:** los pasos o pruebas que el alma debe superar para llegar al descanso.\n\nNo hay una sola respuesta correcta; es una tradición con muchas interpretaciones.",
      relacionadas: ["elementos", "mictlan", "armar-ofrenda"]
    },
    {
      id: "cuatro-elementos", tema: "ofrenda",
      pregunta: "¿Qué representan los cuatro elementos en la ofrenda?",
      variantes: ["tierra, aire, agua y fuego en la ofrenda", "¿Qué representa el fuego en la ofrenda?", "los cuatro elementos de la naturaleza"],
      clave: ["cuatro elementos", "tierra agua fuego", "agua fuego aire"],
      respuesta: "Una interpretación muy extendida dice que la ofrenda reúne los **cuatro elementos**:\n- **Tierra:** frutas, comida y semillas.\n- **Aire:** el papel picado, que se mueve con el viento.\n- **Agua:** el vaso de agua para las almas.\n- **Fuego:** las velas.\n\nEs una explicación popular, no una regla universal: en cada comunidad puede variar.",
      relacionadas: ["papel-picado", "velas", "sal-agua"]
    },
    {
      id: "foto", tema: "ofrenda",
      pregunta: "¿Por qué se pone la foto del difunto?",
      variantes: ["¿Para qué sirve la fotografía en la ofrenda?", "¿Dónde se coloca la foto?", "retrato en el altar"],
      clave: ["la foto", "fotografia", "retrato"],
      respuesta: "La **fotografía** identifica a quién se recuerda y suele ser el centro de la ofrenda: es una forma de **invitar a la persona a volver** y de tenerla presente con su rostro. Se coloca en un lugar visible, a veces acompañada de sus objetos favoritos o de una vela.",
      relacionadas: ["elementos", "honrar", "armar-ofrenda"]
    },
    {
      id: "arco", tema: "ofrenda",
      pregunta: "¿Qué es el arco de flores de la ofrenda?",
      variantes: ["¿Para qué sirve el arco en el altar?", "¿Qué significa el arco de cempasúchil?", "puerta de flores de la ofrenda"],
      clave: ["arco", "arco de flores", "puerta"],
      respuesta: "El **arco de flores** (a veces de carrizo o varas adornadas) se interpreta como una **puerta o entrada** por la que pasan las almas del mundo de los muertos al de los vivos. Suele hacerse con cempasúchil y otras flores. No todas las ofrendas lo llevan.",
      relacionadas: ["cempasuchil", "niveles", "elementos"]
    },
    {
      id: "ofrenda-ninos", tema: "ofrenda",
      pregunta: "¿Cómo es la ofrenda para los niños (angelitos)?",
      variantes: ["¿Qué se pone en la ofrenda de un niño?", "ofrenda infantil", "¿Qué juguetes se ponen en el altar?", "ofrenda para un bebé"],
      clave: ["ofrenda de ninos", "ofrenda para ninos", "ofrenda infantil", "juguetes"],
      respuesta: "La ofrenda para los **niños fallecidos** (los *angelitos*) suele ser más colorida y dulce: se ponen **juguetes, dulces, pan, frutas, atole** y flores blancas, como alhelí o nube, además del cempasúchil. Muchas veces se instala antes y se les recibe primero, alrededor del 31 de octubre o el 1 de noviembre.",
      relacionadas: ["angelitos", "fechas", "elementos"]
    },
    {
      id: "ofrenda-mascotas", tema: "ofrenda",
      pregunta: "¿Se puede poner ofrenda a las mascotas?",
      variantes: ["¿Puedo poner ofrenda a mi perro?", "ofrenda para mi gato", "¿Los animales también tienen ofrenda?", "¿Qué se le pone a una mascota que murió?"],
      clave: ["mascota", "mi perro", "mi gato"],
      respuesta: "Sí. Hoy muchas familias dedican un lugar a sus **mascotas**, con su foto, su comida o un juguete. Es una práctica más reciente y personal, pero la tradición es **viva**: cada familia decide cómo honrar a quienes quiso.",
      relacionadas: ["xolo", "elementos", "honrar"]
    },
    {
      id: "animas-solas", tema: "ofrenda",
      pregunta: "¿Qué son las ánimas solas?",
      variantes: ["¿Para quién es la vela de las ánimas solas?", "¿Qué se hace por las almas olvidadas?", "ánimas olvidadas"],
      clave: ["animas solas", "anima sola", "almas olvidadas"],
      respuesta: "En algunos lugares se acostumbra poner una vela, agua o comida para las **ánimas solas**: las almas de personas que ya nadie recuerda o que no tienen quién les ponga ofrenda. Es una forma de **solidaridad** con quienes no tienen a quién los honre. La costumbre varía según la comunidad.",
      relacionadas: ["velas", "yucatan", "que-es-ofrenda"]
    },

    /* ====================== FLORES, COMIDA Y OBJETOS ====================== */
    {
      id: "cempasuchil", tema: "elementos",
      pregunta: "¿Qué es el cempasúchil y por qué se usa?",
      variantes: ["¿Por qué la flor de muerto es naranja?", "¿Qué significa la flor de cempasúchil?", "¿Cómo se dice cempasúchil en náhuatl?", "flores de la ofrenda", "¿Qué flores se usan en el Día de Muertos?", "camino de pétalos", "¿Cuál es la flor del Día de Muertos?", "¿Qué flor se pone en los altares?", "¿Cuál es la flor de las ofrendas?", "flor naranja de la ofrenda", "¿Por qué se ponen flores amarillas?", "¿Por qué las flores son de color amarillo y naranja?"],
      clave: ["cempasuchil", "flor de muerto", "flores de muerto", "flor de veinte", "petalos", "tagetes"],
      respuesta: "El **cempasúchil** (*Tagetes erecta*) es la flor anaranjada y amarilla del Día de Muertos. Su nombre viene del náhuatl y suele traducirse como «flor de veinte pétalos» o «veinte flores». También se le llama «flor de muerto».\n\nSe cree que su color intenso y su aroma **guían a las almas** hacia la ofrenda, por eso se hacen caminos de pétalos desde la calle hasta el altar. Además se usan otras flores, como el alhelí, la nube y la cresta de gallo.",
      relacionadas: ["arco", "copal", "elementos"]
    },
    {
      id: "copal", tema: "elementos",
      pregunta: "¿Para qué sirve el copal?",
      variantes: ["¿Qué es el copal?", "¿Por qué se quema incienso en la ofrenda?", "sahumerio", "humo en el altar"],
      clave: ["copal", "incienso", "sahumerio", "humo"],
      respuesta: "El **copal** es una resina aromática de ciertos árboles que se quema como incienso desde la época prehispánica. En la ofrenda se usa en un **sahumerio** o incensario para **limpiar y purificar el espacio** y para que el humo y el aroma ayuden a **guiar a las almas**. Hoy también se usa incienso comercial.",
      relacionadas: ["cempasuchil", "velas", "otros-objetos"]
    },
    {
      id: "velas", tema: "elementos",
      pregunta: "¿Qué significan las velas y veladoras?",
      variantes: ["¿Para qué se ponen velas en la ofrenda?", "¿De qué color deben ser las velas?", "significado de la luz en el altar", "¿Cuántas velas se ponen?"],
      clave: ["vela", "velas", "luz", "veladora", "fuego"],
      respuesta: "Las **velas y veladoras** representan la **luz que guía a las almas** de regreso a casa y el elemento fuego. A menudo se pone una por cada difunto, y a veces cuatro en forma de cruz apuntando a los puntos cardinales.\n\nEl color puede tener significado según la región (por ejemplo, blanco para la pureza o morado para el luto). Recuerda usarlas con cuidado, lejos del papel y de las cortinas.",
      relacionadas: ["cuatro-elementos", "copal", "armar-ofrenda"]
    },
    {
      id: "sal-agua", tema: "elementos",
      pregunta: "¿Por qué se pone agua y sal en la ofrenda?",
      variantes: ["¿Para qué es el vaso de agua?", "¿Qué significa la sal en el altar?", "agua para las almas"],
      clave: ["agua y sal", "vaso de agua", "la sal"],
      respuesta: "El **agua** se ofrece para que las almas **calmen la sed** después de su largo viaje. La **sal** se asocia con la **purificación** y, según algunas explicaciones, evita que el cuerpo se corrompa durante el camino. Como casi todo en la tradición, hay varias interpretaciones.",
      relacionadas: ["mictlan", "cuatro-elementos", "elementos"]
    },
    {
      id: "papel-picado", tema: "elementos",
      pregunta: "¿Qué significa el papel picado?",
      variantes: ["¿Para qué sirve el papel picado?", "¿Qué es el papel picado?", "banderitas de colores", "¿Por qué el papel picado se mueve?"],
      clave: ["papel picado", "banderitas", "papel de china"],
      respuesta: "El **papel picado** son hojas de papel de colores con figuras recortadas. En la ofrenda representa el **aire** y suele asociarse con la **fragilidad de la vida**; su movimiento con el viento también se relaciona con la presencia de las almas. Además de la ofrenda, adorna calles, casas y panteones.",
      relacionadas: ["cuatro-elementos", "artesanias", "elementos"]
    },
    {
      id: "pan-muerto", tema: "elementos",
      pregunta: "¿Qué es el pan de muerto y qué significa?",
      variantes: ["¿Por qué se come pan de muerto?", "¿Qué representan los huesitos del pan?", "origen del pan de muerto", "¿Cómo es el pan de muerto?", "pan de yema", "¿Qué es el pan que se come en noviembre?", "¿Qué pan se come en Día de Muertos?"],
      clave: ["pan de muerto", "pan de muertos", "huesitos", "pan de yema"],
      respuesta: "El **pan de muerto** es un pan dulce que se come y se ofrenda en estas fechas. Suele llevar **«huesitos»** de masa en cruz y una bolita al centro, y se cubre con azúcar o ajonjolí. Se interpreta como el cuerpo del difunto: las tiras son los huesos y la bolita representa el cráneo.\n\nSu origen se debate, porque mezcla ideas de ofrendas prehispánicas y del pan europeo. Cambia según la región; en Oaxaca, por ejemplo, es común el **pan de yema**.",
      relacionadas: ["comida-ofrenda", "calaveras-azucar", "oaxaca"]
    },
    {
      id: "calaveras-azucar", tema: "elementos",
      pregunta: "¿Qué son las calaveras de azúcar?",
      variantes: ["¿Por qué se ponen nombres en las calaveritas de azúcar?", "calaveritas de dulce", "¿Para qué sirven las calaveras de azúcar?", "dulces del Día de Muertos"],
      clave: ["calaveras de azucar", "calaveritas de azucar", "calavera de azucar", "calaveras de dulce", "dulces"],
      respuesta: "Las **calaveras de azúcar** son figuras de azúcar decoradas con colores, brillos y papel de colores. Se acostumbra escribir un **nombre en la frente**, ya sea de un difunto o de una persona viva, como regalo o broma cariñosa. Se ponen en la ofrenda, se regalan y también se comen. Reflejan la idea de aceptar la muerte con **humor y dulzura**.",
      relacionadas: ["pan-muerto", "calaveras-literarias", "elementos"]
    },
    {
      id: "comida-ofrenda", tema: "elementos",
      pregunta: "¿Qué comida se pone en la ofrenda?",
      variantes: ["¿Qué platillos se ponen en el altar?", "¿Qué bebidas se ponen en la ofrenda?", "¿Los muertos comen la comida de la ofrenda?", "comida favorita del difunto", "¿Se pone mezcal o cerveza?", "calabaza en tacha", "¿Qué se come en el Día de Muertos?", "¿Qué comida típica hay en el Día de Muertos?"],
      clave: ["comida de la ofrenda", "que comida", "que se come", "comida favorita", "calabaza en tacha", "mole", "tamales", "bebida", "mezcal"],
      respuesta: "Se pone lo que la persona **disfrutaba en vida**: platillos como **mole, tamales, arroz o frijoles**; fruta (naranja, mandarina, caña, jícama), **calabaza en tacha, pan de muerto, atole y chocolate**. También bebidas, como refresco, cerveza, mezcal o tequila, si le gustaban.\n\nSe cree que las almas aprovechan el **aroma y la esencia** de los alimentos; después, la familia suele compartir la comida. Los platillos cambian mucho de una región a otra.",
      relacionadas: ["pan-muerto", "otros-objetos", "elementos"]
    },
    {
      id: "otros-objetos", tema: "elementos",
      pregunta: "¿Qué otros objetos se ponen en el altar?",
      variantes: ["¿Para qué sirve el petate?", "¿Se ponen objetos personales en la ofrenda?", "cruz y santos en la ofrenda", "¿Qué más se pone en la ofrenda?"],
      clave: ["petate", "objetos personales", "otros objetos", "cruz", "santos"],
      respuesta: "Además de lo básico se agregan **objetos personales** (un sombrero, un instrumento, lentes, herramientas), **juguetes** para los niños, un **petate** (tejido de palma) para que las almas descansen, el **sahumerio** con copal y a veces **cruces o imágenes religiosas**.\n\nLa idea es que el difunto se sienta recibido, así que cada ofrenda es muy personal.",
      relacionadas: ["foto", "elementos", "ofrenda-ninos"]
    },

    /* ====================== FECHAS Y PANTEÓN ====================== */
    {
      id: "fechas", tema: "fechas",
      pregunta: "¿Cuándo se celebra el Día de Muertos?",
      variantes: ["¿En qué fecha es el Día de Muertos?", "¿Qué días son?", "¿Cuántos días dura?", "fecha del día de muertos", "¿Es el 1 o el 2 de noviembre?", "¿Qué se hace el 31 de octubre?", "¿Qué día es el Día de Muertos?", "¿Qué día se celebra?", "¿Qué se hace el primero de noviembre?", "¿Qué se hace el 2 de noviembre?"],
      clave: ["cuando se celebra", "en que fecha", "que dias son", "cuantos dias", "1 de noviembre", "2 de noviembre", "31 de octubre", "fecha del dia de muertos"],
      respuesta: "Los días principales son el **1 y 2 de noviembre**, aunque en muchos lugares las actividades empiezan desde el **31 de octubre**. Una idea muy común es que el **1 de noviembre** se recibe a los **niños** (angelitos) y el **2 de noviembre** a los **adultos**.\n\nLas fechas y el orden pueden variar según la región y la comunidad.",
      relacionadas: ["angelitos", "panteon", "todos-santos"]
    },
    {
      id: "angelitos", tema: "fechas",
      pregunta: "¿Qué es el Día de los Angelitos?",
      variantes: ["¿Cuándo se recuerda a los niños?", "¿Qué se hace el 1 de noviembre?", "día de los niños muertos"],
      clave: ["angelitos", "angelito", "dia de los angelitos"],
      respuesta: "El **Día de los Angelitos** es cuando se recuerda a los **niños fallecidos**. Se celebra sobre todo el **1 de noviembre**, y en algunos lugares empieza la noche del 31 de octubre. Su ofrenda es más colorida y dulce, con juguetes, dulces, fruta y flores blancas. A los adultos se les recuerda después, el 2 de noviembre.",
      relacionadas: ["ofrenda-ninos", "fechas", "elementos"]
    },
    {
      id: "panteon", tema: "fechas",
      pregunta: "¿Qué se hace en el panteón?",
      variantes: ["¿Por qué se visita el cementerio?", "¿Qué se hace en las tumbas?", "velada en el panteón", "visita a las tumbas"],
      clave: ["panteon", "el cementerio", "las tumbas", "velada", "velacion"],
      respuesta: "Muchas familias visitan el **panteón** para **limpiar y adornar las tumbas** con flores y velas, y pasar tiempo con sus difuntos; a veces con música, comida y una velada nocturna. En lugares como Mixquic y Janitzio estas veladas son muy conocidas.\n\nEl ambiente suele ser de **respeto y convivencia**, no siempre de fiesta ruidosa; depende de cada lugar.",
      relacionadas: ["mixquic", "janitzio", "respeto"]
    },

    /* ====================== TRADICIONES POR REGIÓN ====================== */
    {
      id: "diferencias-regiones", tema: "regiones",
      pregunta: "¿Se celebra igual en todo México?",
      variantes: ["¿Cambia la tradición según la región?", "diferencias entre estados", "¿Todos los pueblos lo celebran igual?", "¿Los pueblos indígenas lo celebran distinto?"],
      clave: ["igual en todo mexico", "todo mexico", "segun la region", "diferencias entre"],
      respuesta: "No: la celebración **cambia mucho** según la región, la comunidad y la familia. En unos lugares es sobre todo una velada silenciosa en el panteón; en otros hay desfiles, música y comparsas. Cambian los platillos, las flores, la forma de la ofrenda y hasta las fechas. Los pueblos indígenas y las comunidades rurales conservan formas propias.",
      relacionadas: ["donde-ver", "unesco", "oaxaca"]
    },
    {
      id: "donde-ver", tema: "regiones",
      pregunta: "¿Dónde se celebra de forma más famosa?",
      variantes: ["¿Qué lugares visitar para el Día de Muertos?", "¿Dónde puedo ver las mejores celebraciones?", "mejores lugares para el día de muertos", "¿En qué estados es más famoso?", "¿Dónde puedo ver ofrendas grandes?", "pueblos famosos por el Día de Muertos", "¿Dónde ir a ver ofrendas?"],
      clave: ["donde se celebra", "mejores lugares", "lugares para visitar", "mas famoso"],
      respuesta: "Algunos de los lugares más conocidos son:\n- **Janitzio y Pátzcuaro** (Michoacán)\n- **San Andrés Mixquic** (Ciudad de México)\n- **Oaxaca** y sus pueblos\n- **Yucatán, Campeche y Quintana Roo** (Hanal Pixán)\n- **Huaquechula** (Puebla)\n- **Pomuch** (Campeche)\n- **Aguascalientes** (Festival de Calaveras)\n\nPregúntame por cualquiera. Si visitas alguno, recuerda que son tradiciones vivas de comunidades: se visita con respeto.",
      relacionadas: ["janitzio", "mixquic", "respeto"]
    },
    {
      id: "janitzio", tema: "regiones",
      pregunta: "¿Cómo se celebra en Janitzio y Pátzcuaro?",
      variantes: ["Noche de Muertos en Michoacán", "¿Qué es Janitzio?", "celebración en el lago de Pátzcuaro", "purépechas y día de muertos"],
      clave: ["janitzio", "patzcuaro", "michoacan", "purepecha", "lago"],
      respuesta: "**Janitzio** es una isla del **lago de Pátzcuaro**, en **Michoacán**, famosa por su **Noche de Muertos**: las familias purépechas velan en el panteón con velas, flores y comida durante la noche, y se llega a la isla en lancha.\n\nEs una tradición de comunidades **purépechas** (p'urhépecha) que hoy también atrae a muchos visitantes, por lo que conviene comportarse con mucho respeto.",
      relacionadas: ["panteon", "respeto", "mixquic"]
    },
    {
      id: "mixquic", tema: "regiones",
      pregunta: "¿Qué pasa en San Andrés Mixquic?",
      variantes: ["¿Dónde queda Mixquic?", "velación en Mixquic", "Día de Muertos en Tláhuac", "¿Qué es Mixquic?"],
      clave: ["mixquic", "tlahuac"],
      respuesta: "**San Andrés Mixquic**, en la alcaldía Tláhuac de la **Ciudad de México**, es famoso por su **velación en el panteón** la noche del **1 al 2 de noviembre**, con miles de velas y flores, y por sus arcos y altares. Conserva un fuerte carácter de pueblo originario y recibe muchos visitantes.",
      relacionadas: ["panteon", "donde-ver", "cdmx"]
    },
    {
      id: "oaxaca", tema: "regiones",
      pregunta: "¿Cómo se celebra en Oaxaca?",
      variantes: ["Día de Muertos en Oaxaca", "comparsas y muerteadas", "tapetes de arena", "¿Qué se come en Oaxaca en Día de Muertos?"],
      clave: ["oaxaca", "comparsas", "muerteada", "tapetes de arena"],
      respuesta: "En **Oaxaca** la tradición es muy variada: hay **comparsas** y desfiles con disfraces y música (llamadas *muerteadas* en algunos pueblos), **tapetes de arena** en algunos lugares, ofrendas con **mole, chocolate y pan de yema**, y visitas a panteones iluminados. Cada pueblo y región tiene sus propias costumbres.",
      relacionadas: ["pan-muerto", "diferencias-regiones", "donde-ver"]
    },
    {
      id: "yucatan", tema: "regiones",
      pregunta: "¿Qué es el Hanal Pixán en Yucatán?",
      variantes: ["Día de Muertos en la península de Yucatán", "tradición maya de los muertos", "¿Qué es el mucbipollo?", "Día de Muertos en Mérida", "Día de Muertos en Campeche o Quintana Roo"],
      clave: ["hanal pixan", "mucbipollo", "pibipollo", "yucatan", "maya"],
      respuesta: "En la **península de Yucatán** (Yucatán, Campeche y Quintana Roo) se llama **Hanal Pixán**, que en maya significa algo como «comida de las ánimas». Se prepara un platillo central, el **mucbipollo** (o *pibipollo*), un gran tamal cocido bajo tierra, y se colocan altares con velas, flores y alimentos.\n\nEn muchas comunidades se recuerda a los niños, a los adultos y a las ánimas en distintos momentos.",
      relacionadas: ["animas-solas", "diferencias-regiones", "comida-ofrenda"]
    },
    {
      id: "huaquechula", tema: "regiones",
      pregunta: "¿Qué son las ofrendas de Huaquechula?",
      variantes: ["Día de Muertos en Puebla", "ofrendas monumentales", "altares gigantes", "¿Dónde queda Huaquechula?"],
      clave: ["huaquechula", "ofrendas monumentales", "monumentales", "puebla"],
      respuesta: "**Huaquechula**, en **Puebla**, es conocido por sus **ofrendas monumentales**: altares enormes y muy elaborados que las familias levantan para quienes **fallecieron en el último año** y que se abren a los visitantes. Son una forma de recibir a las almas «nuevas» y de compartir el duelo con la comunidad.",
      relacionadas: ["donde-ver", "niveles", "que-es-ofrenda"]
    },
    {
      id: "pomuch", tema: "regiones",
      pregunta: "¿Qué es la limpieza de huesos de Pomuch?",
      variantes: ["¿Por qué limpian los huesos en Campeche?", "costumbre de Pomuch", "Día de Muertos en Campeche", "¿Se limpian los restos de los difuntos?"],
      clave: ["pomuch", "limpieza de huesos", "limpiar huesos", "huesos"],
      respuesta: "En **Pomuch, Campeche**, existe la costumbre de **limpiar los restos** de los difuntos en el panteón cada año antes de las fechas y colocarlos de nuevo con cuidado, como un acto de cariño y de convivencia con los antepasados. Es una tradición particular de ciertos pueblos; puede sorprender a quien no la conoce, pero se vive con mucho respeto.",
      relacionadas: ["yucatan", "panteon", "respeto"]
    },
    {
      id: "aguascalientes", tema: "regiones",
      pregunta: "¿Qué es el Festival de Calaveras de Aguascalientes?",
      variantes: ["Día de Muertos en Aguascalientes", "festival de calaveras", "¿Por qué Aguascalientes celebra a las calaveras?"],
      clave: ["aguascalientes", "festival de calaveras"],
      respuesta: "**Aguascalientes** organiza cada año el **Festival de Calaveras**, con desfiles, exposiciones y actividades culturales. Es la tierra de **José Guadalupe Posada**, el creador de la Calavera Garbancera, por eso las calaveras tienen un papel especial. Las fechas cambian cada año, así que conviene revisar la información oficial.",
      relacionadas: ["posada", "catrina", "donde-ver"]
    },
    {
      id: "cdmx", tema: "regiones",
      pregunta: "¿Qué es el desfile de Día de Muertos de la Ciudad de México?",
      variantes: ["desfile de catrinas en la CDMX", "¿Cuándo empezó el desfile?", "¿Qué tiene que ver James Bond con el Día de Muertos?", "película Spectre y el desfile", "ofrenda del Zócalo"],
      clave: ["desfile", "spectre", "james bond", "zocalo", "ciudad de mexico", "cdmx"],
      respuesta: "En la **Ciudad de México** hay un gran **desfile de Día de Muertos**, con carros alegóricos, catrinas y música, que se realiza desde **2016**. Se ha contado ampliamente que se inspiró en una escena de la película de James Bond *Spectre* (2015), que mostraba un desfile imaginario.\n\nEs una creación **reciente**, no una tradición antigua. Además, cada año se instalan ofrendas monumentales en el Zócalo y otros espacios.",
      relacionadas: ["coco", "mixquic", "diferencias-regiones"]
    },

    /* ====================== ARTE Y CULTURA POPULAR ====================== */
    {
      id: "catrina", tema: "arte",
      pregunta: "¿Quién creó a La Catrina?",
      variantes: ["¿Cuál es el origen de la Catrina?", "historia de la Catrina", "¿Qué es la Calavera Garbancera?", "¿Quién le puso el nombre de Catrina?", "¿Quién pintó a La Catrina?", "Diego Rivera y la Catrina", "¿Quién es la calavera elegante con sombrero?", "¿Quién es la señora calavera?"],
      clave: ["la catrina", "catrina", "calavera garbancera", "garbancera", "diego rivera"],
      respuesta: "**La Catrina** nació como la **Calavera Garbancera**, un grabado de **José Guadalupe Posada** hecho hacia 1910, que criticaba a quienes presumían un estatus que no tenían y negaban sus raíces indígenas.\n\nDécadas después, **Diego Rivera** la pintó de cuerpo completo en su mural «Sueño de una tarde dominical en la Alameda Central» (1947) y la llamó **Catrina** (*catrín* significa elegante). Con el tiempo se volvió símbolo del Día de Muertos.",
      relacionadas: ["posada", "maquillaje-catrina", "calaveras-literarias"]
    },
    {
      id: "posada", tema: "arte",
      pregunta: "¿Quién fue José Guadalupe Posada?",
      variantes: ["¿Quién fue Posada?", "grabador de calaveras", "biografía de José Guadalupe Posada", "¿Qué hizo Posada?", "¿Quién dibujó las calaveras famosas?", "¿Quién hizo los grabados de calaveras?"],
      clave: ["posada", "jose guadalupe posada", "grabador", "grabados"],
      respuesta: "**José Guadalupe Posada** (Aguascalientes, 1852 – Ciudad de México, 1913) fue un grabador mexicano famoso por sus **calaveras**, con las que criticaba con humor a la sociedad y a los políticos de su época. Sus grabados ilustraban periódicos y hojas populares. Creó la **Calavera Garbancera**, que más tarde se conocería como La Catrina.",
      relacionadas: ["catrina", "aguascalientes", "calaveras-literarias"]
    },
    {
      id: "calaveras-literarias", tema: "arte",
      pregunta: "¿Qué son las calaveras literarias?",
      variantes: ["¿Qué es una calaverita?", "¿Para qué sirven las calaveritas?", "versos del Día de Muertos", "origen de las calaveras literarias", "¿Qué es una calavera literaria?"],
      clave: ["calaveras literarias", "calavera literaria", "calaverita", "calaveritas"],
      respuesta: "Las **calaveras literarias** son versos humorísticos que hablan de una persona viva como si ya hubiera muerto, **usando la muerte para burlarse con cariño** de sus defectos, costumbres o profesión. Surgieron en periódicos del siglo XIX y hoy se escriben y se leen en escuelas, familias y concursos. Casi siempre riman y cierran con un toque ingenioso.",
      relacionadas: ["escribir-calaverita", "ejemplo-calaverita", "posada"]
    },
    {
      id: "coco", tema: "arte",
      pregunta: "¿La película Coco es fiel a la tradición?",
      variantes: ["¿Coco muestra bien el Día de Muertos?", "película de Pixar sobre el Día de Muertos", "¿Qué elementos reales aparecen en Coco?", "¿Existe el mundo de los muertos como en Coco?"],
      clave: ["coco", "pixar", "pelicula coco"],
      respuesta: "La película **Coco** (Pixar, 2017) se inspiró en el Día de Muertos y ayudó a que mucha gente lo conociera. Retoma elementos reales: la ofrenda, el cempasúchil, los alebrijes, el xoloitzcuintle y, sobre todo, el valor de **recordar a los antepasados**.\n\nPero es una historia de **fantasía**: el «mundo de los muertos» con puentes de flores y trámites no es una creencia tradicional, y la idea de que se muere del todo cuando nadie te recuerda es parte de la ficción. Es una buena puerta de entrada, no un documento histórico.",
      relacionadas: ["xolo", "que-es", "cdmx"]
    },
    {
      id: "artesanias", tema: "arte",
      pregunta: "¿Qué artesanías se hacen para el Día de Muertos?",
      variantes: ["¿Qué es la cartonería?", "catrinas de barro", "alebrijes y día de muertos", "artesanías mexicanas de calaveras"],
      clave: ["artesanias", "carton", "cartoneria", "cartoneria", "alebrijes", "capula"],
      respuesta: "Hay muchas artesanías ligadas a estas fechas: **papel picado, calaveras y catrinas de barro o cartonería**, calaveras de azúcar y **alebrijes**. La **cartonería** (figuras de papel y engrudo) es muy popular, y también hay catrinas de cerámica, como las de **Capula, Michoacán**. Cada pieza muestra el estilo de su región.",
      relacionadas: ["papel-picado", "calaveras-azucar", "catrina"]
    },

    /* ====================== COMPARACIONES Y OTROS PAÍSES ====================== */
    {
      id: "halloween", tema: "mundo",
      pregunta: "¿En qué se diferencia del Halloween?",
      variantes: ["¿Es lo mismo que Halloween?", "Halloween vs Día de Muertos", "¿Por qué no es Halloween?", "¿Cuál es la diferencia entre Halloween y Día de Muertos?"],
      clave: ["halloween", "diferencia con halloween", "es lo mismo"],
      respuesta: "Son tradiciones **distintas**, con orígenes diferentes.\n- **Halloween** suele relacionarse con el Samhain celta y con la víspera de Todos los Santos en el mundo anglosajón; hoy se centra en disfraces, dulces y sustos.\n- **Día de Muertos** tiene raíces mesoamericanas y católicas, y se centra en **recordar y honrar** a los difuntos queridos con ofrendas, no en asustar.\n\nCoinciden en fechas cercanas y en el tema de la muerte, y en algunos lugares se mezclan, pero su sentido es distinto.",
      relacionadas: ["origen", "otros-paises", "que-es"]
    },
    {
      id: "otros-paises", tema: "mundo",
      pregunta: "¿Hay tradiciones parecidas en otros países?",
      variantes: ["¿Otros países celebran a sus muertos?", "Día de Muertos en América Latina", "celebraciones de difuntos en el mundo", "¿Cómo se celebra en otros países?"],
      clave: ["otros paises", "otro pais", "latinoamerica", "america latina", "en el mundo"],
      respuesta: "Sí, muchos países recuerdan a sus difuntos por estas fechas, cada uno a su manera:\n- **Guatemala:** barriletes gigantes y fiambre.\n- **Ecuador:** colada morada y guaguas de pan.\n- **Bolivia:** Todos Santos, tantawawas y el Día de las Ñatitas.\n- **Perú, España** y otros países de tradición católica también honran a sus muertos en estos días.\n\nTodos comparten la idea de recordar, aunque la **ofrenda mexicana** tiene rasgos muy propios.",
      relacionadas: ["guatemala", "ecuador", "bolivia"]
    },
    {
      id: "guatemala", tema: "mundo",
      pregunta: "¿Cómo se celebra en Guatemala?",
      variantes: ["barriletes gigantes de Sumpango", "¿Qué es el fiambre?", "Día de Todos los Santos en Guatemala"],
      clave: ["guatemala", "barrilete", "sumpango", "fiambre"],
      respuesta: "En **Guatemala**, el **1 de noviembre** (Día de Todos los Santos) se elevan **barriletes gigantes** (papalotes) en lugares como **Sumpango** y **Santiago Sacatepéquez**, y se cree que sirven para comunicarse con los difuntos. También se come **fiambre**, un platillo frío con verduras, embutidos y quesos.",
      relacionadas: ["otros-paises", "ecuador", "bolivia"]
    },
    {
      id: "ecuador", tema: "mundo",
      pregunta: "¿Cómo se celebra en Ecuador?",
      variantes: ["¿Qué es la colada morada?", "guaguas de pan", "Día de los Difuntos en Ecuador"],
      clave: ["ecuador", "colada morada", "guaguas de pan"],
      respuesta: "En **Ecuador**, el **2 de noviembre** es el **Día de los Difuntos**. Se prepara **colada morada** (bebida espesa de frutas y harina de maíz morado) y **guaguas de pan** (panes con forma de bebé; *guagua* significa bebé en quechua), y las familias visitan los cementerios.",
      relacionadas: ["otros-paises", "guatemala", "bolivia"]
    },
    {
      id: "bolivia", tema: "mundo",
      pregunta: "¿Cómo se celebra en Bolivia?",
      variantes: ["¿Qué son las ñatitas?", "¿Qué son las tantawawas?", "Todos Santos en Bolivia"],
      clave: ["bolivia", "natitas", "tantawawas", "tanta wawa"],
      respuesta: "En **Bolivia**, durante **Todos Santos** (1 y 2 de noviembre) se arma una mesa con **tantawawas** (panes con forma de bebé o de figuras), frutas y comida para recibir a las almas.\n\nPocos días después, en La Paz, se celebra el **Día de las Ñatitas**: las familias adornan y bendicen **cráneos** que conservan en casa como protectores.",
      relacionadas: ["otros-paises", "ecuador", "guatemala"]
    },

    /* ====================== TAREAS Y PARTICIPACIÓN ====================== */
    {
      id: "armar-ofrenda", tema: "practico",
      pregunta: "¿Cómo armo una ofrenda paso a paso?",
      variantes: ["¿Cómo hacer una ofrenda en casa?", "¿Cómo se monta un altar de muertos?", "guía para hacer una ofrenda", "¿Cómo poner una ofrenda en la escuela?", "pasos para armar una ofrenda"],
      clave: ["armar una ofrenda", "hacer una ofrenda", "como armo", "como poner una ofrenda", "paso a paso", "montar una ofrenda"],
      respuesta: "Una forma sencilla de armarla:\n1. **Decide a quién honrar** y reúne su foto y algo que le gustaba.\n2. **Elige el lugar** y arma una mesa o niveles con cajas; cúbrelos con tela o papel.\n3. Coloca la **fotografía** en un lugar visible.\n4. Agrega **flores** (cempasúchil) y, si quieres, un camino de pétalos.\n5. Pon **velas** con cuidado y **copal o incienso**.\n6. Coloca **agua, sal, pan de muerto** y la **comida y bebida** favoritas.\n7. Decora con **papel picado** y objetos personales.\n\nNo hay una forma única: lo importante es el significado que tenga para ti y tu familia. Si la haces en la escuela, usa luces LED en lugar de velas.",
      relacionadas: ["elementos", "niveles", "ofrenda-escuela"]
    },
    {
      id: "escribir-calaverita", tema: "practico",
      pregunta: "¿Cómo escribo una calaverita literaria?",
      variantes: ["¿Cómo se hace una calavera literaria?", "ayuda para escribir una calaverita", "¿Cómo componer versos de calaverita?", "tarea de calaveritas", "pasos para escribir una calaverita", "¿Cómo hago una calavera literaria?", "¿Cómo hago una calaverita?"],
      clave: ["escribir una calaverita", "como escribo una calaverita", "hacer una calaverita", "escribir una calavera", "como hacer una calavera", "como hago una calavera", "como hago una calaverita", "hacer una calavera literaria"],
      respuesta: "Una forma sencilla de escribirla:\n1. **Elige a la persona** (un amigo, un maestro o tú mismo) y piensa en rasgos divertidos y respetuosos: su carácter, manías o gustos.\n2. Imagina que **ya murió** y que la Muerte «se la llevó» por una de esas razones.\n3. Escribe en **versos con rima**; por ejemplo, cuatro líneas con rima en la segunda y la cuarta.\n4. **Cierra con un remate ingenioso**.\n\nLa burla debe ser **cariñosa, nunca hiriente**. Si quieres ver cómo suena, pídeme un ejemplo.",
      relacionadas: ["ejemplo-calaverita", "calaveras-literarias", "exposicion"]
    },
    {
      id: "ejemplo-calaverita", tema: "practico",
      pregunta: "Dame un ejemplo de calaverita literaria",
      variantes: ["Muéstrame una calaverita", "ejemplo de calavera literaria", "una calaverita de ejemplo", "calaverita para un maestro", "Dame un poema de calavera", "un poema de calaverita", "Dame una calaverita"],
      clave: ["ejemplo de calaverita", "ejemplo de calavera", "muestrame una calaverita", "una calaverita de ejemplo"],
      respuesta: "Aquí van dos ejemplos escritos para esta guía:\n\n*Llegó la Calaca flaca*\n*buscando al profe de inglés;*\n*le dijo: «Ven, que te llevo»*\n*y él contestó: «¡Yes, yes, yes!»*\n\n*La Muerte llegó a la escuela*\n*buscando al más dormilón;*\n*lo encontró en la última banca*\n*y le dijo: «¡Presente, campeón!»*\n\nObserva cómo riman la 2.ª y la 4.ª línea y cómo termina con un remate. ¡Ahora intenta escribir la tuya!",
      relacionadas: ["escribir-calaverita", "calaveras-literarias", "calaveras-azucar"]
    },
    {
      id: "respeto", tema: "practico",
      pregunta: "¿Cómo comportarme con respeto en una ofrenda o panteón?",
      variantes: ["¿Qué no se debe hacer en el panteón?", "reglas para visitar una ofrenda", "¿Puedo tomar fotos en el panteón?", "etiqueta en una velación", "¿Cómo visitar Janitzio con respeto?", "¿Qué no debo hacer en el panteón?", "¿Qué no se debe hacer en una ofrenda?"],
      clave: ["con respeto", "no se debe hacer", "reglas", "tomar fotos", "etiqueta", "comportamiento"],
      respuesta: "Algunas ideas básicas:\n- **Pide permiso** antes de fotografiar a personas o ofrendas privadas, y no uses flash en las veladas.\n- **No toques ni muevas** objetos de la ofrenda, y no tomes comida sin que te inviten.\n- **Guarda silencio** y habla en voz baja: para muchas familias es un momento íntimo.\n- No te subas a las tumbas ni las uses como escenario.\n- Viste de forma sobria y sigue las indicaciones de la comunidad.\n- No te burles de la tradición ni la uses como simple disfraz.\n\nLa regla de oro: recuerda que estás en un espacio de **duelo y memoria** de otras personas.",
      relacionadas: ["panteon", "janitzio", "maquillaje-catrina"]
    },
    {
      id: "exposicion", tema: "practico",
      pregunta: "¿Cómo preparo una exposición o tarea sobre el Día de Muertos?",
      variantes: ["ideas para una exposición del Día de Muertos", "¿Qué temas incluir en mi tarea?", "estructura para presentar el Día de Muertos", "¿Cómo organizar mi trabajo?", "ideas para mi proyecto"],
      clave: ["exposicion", "tarea sobre el dia de muertos", "proyecto sobre el dia de muertos", "presentar mi trabajo"],
      respuesta: "Una estructura posible para una exposición de 5 a 7 minutos:\n1. **¿Qué es y cuándo se celebra?**\n2. **Origen:** raíces prehispánicas y católicas.\n3. **La ofrenda** y el significado de sus elementos.\n4. **Dos tradiciones regionales** (por ejemplo, Janitzio y Hanal Pixán).\n5. **Arte y cultura:** La Catrina y Posada.\n6. **Reconocimiento de la UNESCO** y por qué es una tradición viva.\n7. **Conclusión:** qué significa hoy para tu familia o tu comunidad.\n\nPuedes apoyarte con una mini ofrenda o una calaverita. Cita tus fuentes: tu libro de texto, la UNESCO o la Secretaría de Cultura.",
      relacionadas: ["unesco", "elementos", "ofrenda-escuela"]
    },
    {
      id: "ofrenda-escuela", tema: "practico",
      pregunta: "¿Qué ideas hay para un concurso de ofrendas en la escuela?",
      variantes: ["ideas para una ofrenda escolar", "concurso de altares", "¿Cómo hacer una ofrenda creativa?", "ofrenda para la escuela con material reciclado"],
      clave: ["concurso de ofrendas", "ofrenda escolar", "ofrenda en la escuela", "ofrenda creativa", "reciclado"],
      respuesta: "Algunas ideas:\n- Dedicarla a un **personaje histórico**, a un oficio o a un miembro querido de la comunidad escolar.\n- Usar **materiales reciclados**: cajas para los niveles, papel picado hecho a mano, flores de papel.\n- Incluir una **explicación escrita** del significado de cada elemento.\n- Sumar **calaveritas literarias** de los compañeros.\n- Usar **luces LED** en lugar de velas, por seguridad.\n\nConfirma con tu maestra o maestro las reglas del concurso.",
      relacionadas: ["armar-ofrenda", "exposicion", "calaveras-literarias"]
    },
    {
      id: "honrar", tema: "practico",
      pregunta: "¿Cómo puedo recordar a un ser querido que ya no está?",
      variantes: ["¿Cómo honrar a mi abuelo?", "¿Qué puedo hacer para recordar a alguien que murió?", "ideas para un homenaje familiar", "¿Cómo hago una ofrenda para mi abuela?"],
      clave: ["recordar a un ser querido", "honrar a", "homenaje", "ser querido", "mi abuelo", "mi abuela"],
      respuesta: "Hay muchas formas de recordar a alguien que ya no está: poner una **ofrenda sencilla** con su foto, una vela y algo que le gustaba; **cocinar su platillo favorito**; escuchar su música; **contar sus historias** en familia; visitar su tumba o escribirle una carta.\n\nSi extrañas mucho a alguien, es normal sentir tristeza. Hablar con tu familia o con una persona de confianza ayuda.",
      relacionadas: ["armar-ofrenda", "porque-se-celebra", "foto"]
    },
    {
      id: "maquillaje-catrina", tema: "practico",
      pregunta: "¿Puedo maquillarme de Catrina?",
      variantes: ["¿Es una falta de respeto disfrazarse de Catrina?", "¿Puedo pintarme la cara de calavera?", "maquillaje de calavera", "¿Se puede usar disfraz de catrina?", "¿Es de mala educación pintarse de calavera?", "¿Es una falta de respeto maquillarse de calavera?"],
      clave: ["maquillarme de catrina", "disfrazarme de catrina", "disfraz de catrina", "falta de respeto", "pintarme la cara"],
      respuesta: "Muchas personas se maquillan de **Catrina o Catrín** en estas fechas, y en general es una forma de participar y celebrar. Para hacerlo con respeto:\n- Conoce el **significado** de la Catrina y de la tradición.\n- Evita usarlo como **burla** o como disfraz sin contexto.\n- No lo hagas en lugares donde se realiza una **ceremonia solemne** sin permiso.\n\nSi lo haces en la escuela, puedes aprovechar para explicar a tus compañeros qué representa.",
      relacionadas: ["catrina", "respeto", "halloween"]
    },
    {
      id: "vocabulario", tema: "practico",
      pregunta: "¿Qué significan las palabras propias del Día de Muertos?",
      variantes: ["glosario del Día de Muertos", "vocabulario de la ofrenda", "¿Qué es un panteón?", "¿Qué significa panteón?", "¿Qué significa ánimas?", "¿Qué es una calaca?", "¿Qué significa calaca?", "diccionario de día de muertos"],
      clave: ["glosario", "vocabulario", "que es un panteon", "que significa animas", "que es una calaca", "diccionario"],
      respuesta: "Un mini glosario:\n- **Ánimas:** almas de los difuntos.\n- **Ofrenda:** altar con que se recibe a los difuntos.\n- **Panteón:** cementerio.\n- **Calaca:** forma popular de llamar a la Muerte o a una calavera.\n- **Calaverita:** verso humorístico sobre alguien, como si hubiera muerto.\n- **Velación:** vigilia nocturna en el panteón.\n- **Sahumerio:** recipiente donde se quema copal o incienso.\n- **Petate:** tejido de palma que sirve de base o cama.\n- **Sincretismo:** mezcla de tradiciones de distintas culturas.",
      relacionadas: ["elementos", "calaveras-literarias", "sincretismo"]
    }
  ],

  /* ====================== INTENCIONES (saludos, ayuda, casos sensibles) ====================== */
  intenciones: [
    {
      id: "crisis",
      patrones: [
        "quiero (morir|morirme|matarme)", "(me )?quiero (morir|matar)", "suicid",
        "no quiero (vivir|seguir viviendo)", "(quitarme|quitarse) la vida",
        "(acabar|terminar) con mi vida", "(hacerme|hacerse) dano", "lastimarme",
        "autolesion", "ojala (me )?muriera", "mejor (estar )?(muerto|muerta)"
      ],
      respuesta: "Gracias por contármelo. Lo que sientes importa, y **no tienes que pasar por esto solo o sola**.\n\nSoy una guía con respuestas preparadas y no puedo acompañarte como lo haría una persona. Por favor, habla **hoy** con un adulto de confianza (familia, maestra o maestro, orientación escolar) y cuéntale cómo te sientes.\n\nTambién puedes llamar a la **Línea de la Vida: 800 911 2000**, gratuita y con atención las 24 horas, todos los días. Si estás en peligro o piensas hacerte daño en este momento, llama al **911**.",
      relacionadas: []
    },
    {
      id: "duelo",
      patrones: [
        "(murio|fallecio|murieron|fallecieron) (mi|mis)\\b",
        "(perdi|extrano|extranamos) a (mi|mis)\\b",
        "acaba de (morir|fallecer)"
      ],
      respuesta: "Lamento mucho esa pérdida. Extrañar a alguien que quisimos duele, y es normal sentir tristeza, enojo o confusión.\n\nEl Día de Muertos nace justamente de la idea de que **seguimos en contacto con quienes ya no están** a través del recuerdo. Puedes poner una pequeña ofrenda con su foto, una vela y algo que le gustaba, o contar sus historias en familia.\n\nHablar con tu familia o con alguien de confianza ayuda. Si el dolor se vuelve muy fuerte, la **Línea de la Vida (800 911 2000)** atiende gratis las 24 horas.",
      relacionadas: ["honrar", "armar-ofrenda", "porque-se-celebra"]
    },
    {
      id: "saludo",
      palabras: ["hola", "holi", "holis", "buenas", "buenos", "buen", "dias", "dia", "tardes", "noches", "hey", "saludos", "tal", "ola", "hello", "hi", "estas", "como"],
      respuesta: "¡Hola! Soy la **Guía de Ofrenda**. Puedes preguntarme sobre el origen del Día de Muertos, la ofrenda, las tradiciones de cada región, La Catrina, las calaveritas y más. También puedes elegir un tema con el botón **Temas**.",
      relacionadas: ["que-es", "elementos", "catrina"]
    },
    {
      id: "gracias",
      palabras: ["gracias", "muchas", "mil", "amable", "genial", "excelente", "perfecto", "vale", "ok", "okey", "listo", "super", "chido", "padre", "buena", "buenisima", "muy", "bien"],
      respuesta: "¡Con gusto! Si quieres seguir explorando, aquí tienes algunas ideas.",
      relacionadas: ["halloween", "catrina", "escribir-calaverita"]
    },
    {
      id: "despedida",
      palabras: ["adios", "bye", "chao", "chau", "hasta", "luego", "pronto", "nos", "vemos", "manana", "despido"],
      respuesta: "¡Hasta pronto! Gracias por interesarte en esta tradición. Cuando quieras, aquí estaré. 🌼",
      relacionadas: []
    },
    {
      id: "quien-eres",
      patrones: [
        "quien eres", "que eres", "que puedes hacer", "que sabes", "como funcionas",
        "eres (una |un )?(ia|robot|bot|persona|humano|humana)", "inteligencia artificial", "que haces"
      ],
      respuesta: "Soy la **Guía de Ofrenda**, un asistente con respuestas preparadas sobre el Día de Muertos. **No uso inteligencia artificial**: busco tu pregunta en una base de preguntas y respuestas hecha de antemano, así que puedo no entenderte bien o no tener la respuesta.\n\nPrueba con palabras clave (por ejemplo, «cempasúchil», «Catrina» u «Oaxaca») o elige un tema con el botón **Temas**.",
      relacionadas: ["que-es", "elementos", "catrina"]
    },
    {
      id: "temas",
      palabras: ["temas", "tema", "menu", "opciones", "categorias", "indice", "ayuda", "ayudame", "help"],
      patrones: ["de que (puedes )?hablar", "que temas"],
      accion: "temas",
      respuesta: "Estos son los temas disponibles:",
      relacionadas: []
    }
  ],

  // Mensajes cuando no se encuentra una respuesta
  sinRespuesta: "No encontré una respuesta para eso en mi base. Prueba con otras palabras (por ejemplo, el nombre de una flor, un lugar o un personaje) o elige un tema.",
  sinRespuestaConSugerencias: "No estoy seguro de haberte entendido. ¿Alguna de estas preguntas se acerca a lo que buscas?"
};

if (typeof module !== "undefined" && module.exports) { module.exports = CONOCIMIENTO; }
