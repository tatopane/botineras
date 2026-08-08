// Botineras — Data
const chars = [
  { name: "Wonda Nara", trait: "Negocio y escándalo", img: "images/pixel/webp/wanda-pixel.webp", bonus: { fame: 8, rep: 4 } },
  { name: "La China Suáres", trait: "Química explosiva", img: "images/pixel/webp/china-pixel.webp", bonus: { chem: 12, fame: 5 } },
  { name: "Sasha Ferra", trait: "Todo se hace viral", img: "images/pixel/webp/sasha-pixel.webp", bonus: { fame: 12, contacts: 4 } },
  { name: "Bri Marcas", trait: "Acceso VIP", img: "images/pixel/webp/bri-pixel.webp", bonus: { contacts: 12, rep: 3 } },
  { name: "Jaz Peraltaa", trait: "Carisma impredecible", img: "images/pixel/webp/jaz-pixel.webp", bonus: { chem: 8, rep: 7 } },
  { name: "Clari Cremaschi", trait: "Las marcas la bancan", img: "images/pixel/webp/clari-pixel.webp", bonus: { rep: 10, fame: 4 } }
];

const tiers = [
  { name: "Barrio", need: 0, players: ["El 9 de Lugano", "El arquero streamer", "La figura del futsal", "El entrenador de Dock Sud"] },
  { name: "Ascenso", need: 25, players: ["El goleador de Chacarita", "La promesa de Atlanta", "El lateral de Temperley", "El 4 de Ferro"] },
  { name: "Primera", need: 55, players: ["Valentin Carbon", "Jose Sasa", "Juanfer Quintino", "Milton Delgade"] },
  { name: "Latam", need: 90, players: ["La figura de Flamengo", "Ronaldinho", "Rodrigo DiPaúl", "Sergio Canales"] },
  { name: "Europa", need: 130, players: ["Vinícius Júniorr", "Jude Bellinghan", "Rafael Leãu", "Dani Olme", "Nico Willian", "Lautaro Martines"] },
  { name: "Champions", need: 175, players: ["Erling Håland", "Kylian M'Bapé", "Lamine Yamall", "Rodrig", "Julián Álvares", "Harry Kane"] }
];

const eventTypes = [
  {
    id: "E1",
    title: "Primera salida",
    img: "images/pixel/webp/event-bar.webp",
    text: "{player} te invita a tomar algo después del partido.",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Aceptar sin subir nada", 0.72, "La charla fluye y acuerdan una segunda salida.", "La conversación se muere a los veinte minutos.", { chem: 18, rep: 7, relProgress: 18 }, { chem: -5, relProgress: -8 }],
      ["Subir una historia misteriosa", 0.53, "El rumor crece y {player} sigue el juego.", "Se enoja por la exposición y te deja en visto.", { fame: 13, rumors: 1, chem: 14, relProgress: 14 }, { rep: -8, chem: -8, rumors: 1, relProgress: -10 }],
      ["Pedirle a Guillote que arme el encuentro", 0.64, "Guillote consigue mesa privada y todo sale perfecto.", "Guillote aparece con ocho personas más.", { contacts: 11, chem: 14, relProgress: 15 }, { rep: -5, relProgress: -6 }]
    ]
  },
  {
    id: "E2",
    title: "Después del boliche",
    img: "images/pixel/webp/event-boliche.webp",
    text: "Salís del boliche con {player}. Afuera hay fotógrafos.",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Salir juntos", 0.56, "Las fotos disparan el primer rumor serio.", "{player} se tapa la cara y el gesto queda horrible.", { fame: 16, rumors: 1, chem: 14, relProgress: 15 }, { rep: -9, rumors: 1, relProgress: -10 }],
      ["Salir por separado", 0.74, "La discreción fortalece el vínculo.", "Te vas sola y él termina en otro after.", { rep: 11, chem: 16, relProgress: 18 }, { chem: -8, relProgress: -8 }],
      ["Escapar por la cocina", 0.61, "La aventura los hace reír y suma química.", "Terminás encerrada en el depósito.", { chem: 20, contacts: 5, relProgress: 15 }, { rep: -6, relProgress: -7 }]
    ]
  },
  {
    id: "E3",
    title: "Viaje sorpresa",
    img: "images/pixel/webp/event-viaje.webp",
    text: "{player} te invita a viajar por dos días.",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    actions: [
      ["Ir sin avisar a nadie", 0.63, "El viaje sale perfecto y aparece un romance.", "La reserva estaba a nombre de otra persona.", { chem: 24, rep: 8, relProgress: 20 }, { rep: -10, chem: -7, relProgress: -12 }],
      ["Contárselo a una amiga", 0.49, "La amiga guarda el secreto y te ayuda con todo.", "La amiga se lo cuenta a otra amiga.", { contacts: 8, chem: 16, relProgress: 14 }, { rumors: 2, rep: -8, relProgress: -12 }],
      ["Pedir ubicación en vivo", 0.70, "Evitás sorpresas y el viaje funciona.", "{player} interpreta la cautela como desconfianza.", { rep: 10, chem: 14, relProgress: 16 }, { chem: -5, relProgress: -8 }]
    ]
  },
  {
    id: "E4",
    title: "La foto filtrada",
    img: "images/pixel/webp/event-restaurant.webp",
    text: "Aparece una foto tuya con {player} en un restaurante.",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    actions: [
      ["Confirmar que se están conociendo", 0.58, "El público compra la historia y el vínculo avanza.", "{player} niega todo en una entrevista.", { fame: 20, chem: 20, rumors: 1, relProgress: 18 }, { rep: -18, chem: -12, rumors: 2, relProgress: -18 }],
      ["Negarlo con elegancia", 0.72, "La intriga crece sin dañar la relación.", "La negación suena demasiado ensayada.", { rep: 15, fame: 9, chem: 6, relProgress: 15 }, { rep: -6, rumors: 1, relProgress: -8 }],
      ["No decir nada", 0.64, "El silencio les permite seguir viéndose.", "El rumor crece más de lo esperado.", { chem: 16, rep: 8, relProgress: 14 }, { rumors: 2, rep: -5, relProgress: -10 }]
    ]
  },
  {
    id: "E5",
    title: "Formalizar",
    img: "images/pixel/webp/event-exclusividad.webp",
    text: "{player} te pregunta si querés dejar de verte con otras personas.",
    stage: 2,
    minProgress: 76,
    maxProgress: 100,
    failBreaks: true,
    actions: [
      ["Aceptar", 0.67, "Empieza un noviazgo confirmado.", "A los pocos días descubre que no estaban entendiendo lo mismo.", { chem: 28, rep: 12, relProgress: 30 }, { chem: -15, rep: -7, relProgress: -20 }],
      ["Pedir tiempo", 0.55, "La honestidad fortalece el vínculo.", "{player} decide seguir adelante sin vos.", { rep: 13, chem: 14, relProgress: 14 }, { chem: -12, relProgress: -15 }],
      ["Responder con un meme", 0.45, "Le causa gracia y terminan formalizando igual.", "No entiende el meme y te bloquea.", { fame: 8, chem: 24, relProgress: 22 }, { chem: -18, rep: -5, relProgress: -20 }]
    ]
  },
  {
    id: "E6",
    title: "Salida en barco",
    img: "images/pixel/webp/event-bar.webp",
    text: "{player} te invita a dar una vuelta en su lancha.",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Aceptar sin preguntar", 0.65, "La charla fluye mientras navegan y el día sale increíble.", "Se descompone en el viaje y el plan termina mal.", { chem: 14, relProgress: 15 }, { chem: -5, relProgress: -8 }],
      ["Preguntar quién más va", 0.55, "Valora tu cautela y van solos en plan íntimo.", "Piensa que estás desconfiada y cancela la salida.", { rep: 6, relProgress: 14 }, { rep: -4, relProgress: -12 }],
      ["Subir historia en biquini", 0.50, "El posteo se vuelve viral y {player} reacciona encantado.", "La prensa hace un escándalo y te critica duramente.", { fame: 12, rumors: 1, relProgress: 10 }, { rep: -8, chem: -5, relProgress: -10 }]
    ]
  },
  {
    id: "E7",
    title: "Ir a su casa a escondidas",
    img: "images/pixel/webp/event-boliche.webp",
    text: "{player} te pide que vayas a su country sin que nadie se entere.",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    actions: [
      ["Ir sin avisar", 0.45, "Llegás de sorpresa, cenan juntos y la química explota.", "La guardia del country no te deja entrar y te graba un vecino.", { chem: 22, relProgress: 22 }, { rep: -10, rumors: 2, relProgress: -15 }],
      ["Decirle a una amiga la dirección", 0.60, "Tu amiga te cubre las espaldas y la noche es un éxito.", "Tu amiga le pasa el dato a un periodista y se arma quilombo.", { contacts: 8, chem: 6, relProgress: 16 }, { rumors: 2, rep: -6, relProgress: -10 }],
      ["Pedir que venga él/ella a tu casa", 0.70, "Acepta sin vueltas y demuestra que va en serio.", "Pone excusas y te deja esperando toda la noche.", { rep: 8, chem: 6, relProgress: 12 }, { chem: -5, relProgress: -5 }]
    ]
  },
  {
    id: "E8",
    title: "Rumor de infidelidad",
    img: "images/pixel/webp/event-restaurant.webp",
    text: "En los programas de chimentos dicen que {player} anda con otra persona.",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    actions: [
      ["Enfrentarlo y aclarar", 0.60, "Tienen una charla honesta, desmiente todo y se unen más.", "Se pone a la defensiva y la discusión se vuelve amarga.", { rep: 10, chem: 14, relProgress: 14 }, { rep: -8, chem: -10, relProgress: -15 }],
      ["Hacerte la desentendida", 0.55, "Tu indiferencia lo intriga y te busca con más ganas.", "El rumor sigue creciendo y quedás como que no te enterás de nada.", { fame: 8, chem: 6, relProgress: 10 }, { rumors: 2, chem: -8, relProgress: -12 }],
      ["Publicar una indirecta en redes", 0.50, "La indirecta explota en Twitter y salís ganando en imagen.", "Quedás como despechada y te llenan de memes.", { fame: 15, contacts: 5, chem: 6, relProgress: 8 }, { rep: -12, rumors: 3, relProgress: -18 }]
    ]
  },
  {
    id: "E9",
    title: "Infidelidad confirmada",
    img: "images/pixel/webp/event-restaurant.webp",
    text: "Filtran chats y fotos comprometedoras de {player} con otra persona.",
    stage: 2,
    minProgress: 76,
    maxProgress: 100,
    failBreaks: true,
    actions: [
      ["Perdonar y seguir", 0.40, "Te pide disculpas públicas y te regala un auto de lujo.", "Reincide a las dos semanas y la relación se rompe.", { rep: 10, chem: 18, relProgress: 10 }, { rep: -15, chem: -20, relProgress: -30 }],
      ["Terminar con dignidad", 0.85, "Salís fortalecida, con la frente en alto y respeto general.", "La separación es dolorosa y te afecta anímicamente.", { rep: 15, fame: 8, chem: 8, relProgress: -15 }, { rep: -10, chem: -10, relProgress: -20 }],
      ["Exponerlo todo en redes", 0.50, "Tu descargo bate récords de visualizaciones y te consagrás reina mediática.", "Se filtra una contradicción y el escándalo te salpica de lleno.", { fame: 25, contacts: 10, relProgress: -20 }, { rep: -20, rumors: 5, relProgress: -30 }]
    ]
  },
  {
    id: "E10",
    title: "Mudanza exprés",
    img: "images/pixel/webp/event-viaje.webp",
    text: "{player} te propone irte a vivir con él/ella a su mansión.",
    stage: 2,
    minProgress: 76,
    maxProgress: 100,
    failBreaks: true,
    actions: [
      ["Mudarse juntos", 0.50, "La convivencia es un sueño y la relación se consolida al máximo.", "La rutina y los choques de ego arruinan la magia.", { chem: 26, relProgress: 26 }, { rep: -10, chem: -15, relProgress: -20 }],
      ["Pedir tiempo para pensarlo", 0.65, "Tu madurez le da seguridad y respeta tus tiempos.", "Lo toma como un rechazo y se enfría la pasión.", { rep: 10, chem: 8, relProgress: 10 }, { chem: -8, relProgress: -12 }],
      ["Mudarse pero con contrato", 0.55, "Asegurás tu patrimonio e independencia con mucha clase.", "Sus abogados ponen trabas y se genera desconfianza.", { rep: 12, chem: 6, relProgress: 14 }, { chem: -5, relProgress: -8 }]
    ]
  },
  {
    id: "E11",
    title: "Transferencia a Rusia",
    img: "images/pixel/webp/event-viaje.webp",
    text: "A {player} le ofrecen un pase millonario a un club de Rusia.",
    stage: 2,
    minProgress: 76,
    maxProgress: 100,
    failBreaks: true,
    actions: [
      ["Irse juntos a Rusia", 0.45, "Vivís como una zarina entre pieles, diamantes y amor total.", "El frío y el aislamiento destruyen el romance.", { chem: 28, relProgress: 28, fame: -10 }, { rep: -15, chem: -18, relProgress: -25 }],
      ["Intentar relación a distancia", 0.55, "Los pasajes en primera y las videollamadas mantienen la llama.", "La distancia enfría todo y se apaga el fuego.", { rep: 8, chem: 12, relProgress: 10 }, { chem: -12, relProgress: -15 }],
      ["Terminar antes del viaje", 0.80, "Cerrás la historia en el mejor momento y conservás tu prestigio.", "Queda la sensación de lo que pudo haber sido.", { rep: 12, chem: 6, relProgress: -15 }, { fame: -8, chem: -5, relProgress: -10 }]
    ]
  },
  {
    id: "E12",
    title: "Matrimonio",
    img: "images/pixel/webp/event-exclusividad.webp",
    text: "{player} te pidió que se case con él/ella. Vestido blanco, cura, todo.",
    stage: 2,
    minProgress: 76,
    maxProgress: 100,
    failBreaks: true,
    actions: [
      ["Aceptar emocionada", 0.55, "El casamiento es un evento de la farándula. Salís en todas las tapas.", "El día de la boda {player} llega tarde y los rumores arruinan la fiesta.", { chem: 32, fame: 20, rep: 10, relProgress: 26 }, { rep: -15, chem: -12, rumors: 3, relProgress: -20 }],
      ["Hacerlo en secreto", 0.65, "Una ceremonia íntima en Punta del Este. Solo los más cercanos.", "Te filtran las fotos igual y el secreto se vuelve escándalo.", { chem: 24, rep: 12, relProgress: 20 }, { rep: -8, rumors: 2, relProgress: -12 }],
      ["Pedir un acuerdo prenupcial", 0.60, "{player} acepta sin dramas y demuestra madurez.", "Los abogados convierten el amor en un contrato frío.", { rep: 14, contacts: 8, chem: 6, relProgress: 12 }, { chem: -8, relProgress: -8 }]
    ]
  },
  {
    id: "E13",
    title: "Tener hijos",
    img: "images/pixel/webp/event-viaje.webp",
    text: "{player} quiere hablar de formar una familia. No es una pregunta casual.",
    stage: 2,
    minProgress: 76,
    maxProgress: 100,
    failBreaks: true,
    actions: [
      ["Sí, quiero ser madre", 0.50, "La noticia del embarazo es portada de todas las revistas. Felicidad total.", "La presión mediática y las dudas personales generan una crisis inesperada.", { chem: 35, fame: 15, rep: 8, relProgress: 24 }, { chem: -18, rep: -10, rumors: 2, relProgress: -20 }],
      ["Esperar un poco más", 0.60, "{player} respeta tus tiempos y el vínculo se fortalece.", "El 'esperar' se interpreta como un 'no' y la relación se enfría.", { rep: 10, chem: 16, relProgress: 12 }, { chem: -10, relProgress: -12 }],
      ["Ser sincera y decir que no", 0.55, "La honestidad duele pero sienta las bases de una relación madura.", "{player} no supera la noticia y la relación se desmorona.", { rep: 12, chem: 6, relProgress: 10 }, { chem: -20, relProgress: -25 }]
    ]
  }
];

const actions = [
  {
    id: "A1",
    name: "🕵️ Infidelidad con compañero de equipo",
    desc: "Te enganchás con un compañero de {player}.",
    successRate: 0.45,
    reward: { fame: 30, contacts: 20, rep: -5, relProgress: -5 },
    fail: { rep: -40, chem: -30, rumors: 3, relProgress: -30 },
    failBreaks: true,
    once: true
  },
  {
    id: "A2",
    name: "📱 Insultar al DT en Instagram",
    desc: "Publicás una historia matando al director técnico de su equipo.",
    successRate: 0.50,
    reward: { fame: 35, contacts: 15, rep: -10, relProgress: -3 },
    fail: { rep: -35, chem: -15, rumors: 5, relProgress: -10 },
    once: true
  },
  {
    id: "A3",
    name: "📢 Hacer escándalo",
    desc: "Armás una escena a la salida de un boliche para las cámaras.",
    successRate: 0.60,
    reward: { fame: 25, contacts: 12, rumors: 8, relProgress: -5 },
    fail: { rep: -25, chem: -10, rumors: 2, relProgress: -8 },
    once: true
  },
  {
    id: "A4",
    name: "🚪 Terminar relación",
    desc: "Cortás la relación actual por decisión propia.",
    successRate: 1.0,
    reward: {},
    fail: {},
    once: false
  }
];

const boosters = [
  {
    id: "B1",
    name: "🌿 Curso de ayahuasca",
    desc: "Una amiga te invita a una ceremonia espiritual en Tigre.",
    optionA: {
      text: "Ir a la ceremonia",
      rate: 0.55,
      reward: { chem: 25, fame: 10, relProgress: 15 },
      fail: { rep: -20, rumors: 5, relProgress: -10 },
      msgSuccess: "La experiencia te conecta y te llena de energía positiva.",
      msgFail: "El viaje te sienta mal y salís desorientada en las noticias."
    },
    optionB: {
      text: "No ir",
      rate: 0.45,
      reward: { rep: 5, relProgress: 2 },
      fail: { rep: -20, rumors: 5, relProgress: -10 },
      msgSuccess: "Decidís quedarte en casa descansando tranquila.",
      msgFail: "Tu amiga se ofende y filtra que la dejaste plantada."
    }
  },
  {
    id: "B2",
    name: "🔪 Cirugía estética",
    desc: "Un cirujano famoso de la farándula te ofrece un retoque de canje.",
    optionA: {
      text: "Hacerse el retoque",
      rate: 0.60,
      reward: { fame: 20, relProgress: 5 },
      fail: { rep: -15, relProgress: -10 },
      msgSuccess: "El cambio queda impecable y todos halagan tu nuevo look.",
      msgFail: "El posoperatorio se complica y te saca de circulación."
    },
    optionB: {
      text: "No hacerse nada",
      rate: 0.40,
      reward: { rep: 8, relProgress: 2 },
      fail: { rep: -15, relProgress: -10 },
      msgSuccess: "Apostás a tu belleza natural y la gente lo valora.",
      msgFail: "El cirujano despechado habla de tus consultas en la tele."
    }
  },
  {
    id: "B3",
    name: "🧴 Tratamiento facial",
    desc: "Te convocan de un spa top para un tratamiento rejuvenecedor.",
    optionA: {
      text: "Hacerse el tratamiento",
      rate: 0.65,
      reward: { rep: 10, chem: 5, relProgress: 8 },
      fail: { fame: -10, relProgress: -5 },
      msgSuccess: "Tu piel luce radiante y deslumbrás en la próxima cena.",
      msgFail: "Te da una leve alergia que te hace suspender planes."
    },
    optionB: {
      text: "Rechazar la propuesta",
      rate: 0.35,
      reward: { rep: 3, relProgress: 1 },
      fail: { fame: -10, relProgress: -5 },
      msgSuccess: "Agradecés con educación y mantenés tu agenda libre.",
      msgFail: "La marca dice que sos poco accesible para eventos."
    }
  },
  {
    id: "B4",
    name: "📚 Curso de idiomas",
    desc: "Te ofrecen beca para estudiar inglés y oratoria para prensa internacional.",
    optionA: {
      text: "Anotarse en el curso",
      rate: 0.60,
      reward: { rep: 10, contacts: 8, relProgress: 5 },
      fail: { chem: -5, relProgress: -3 },
      msgSuccess: "Tu pronunciación deslumbra en entrevistas internacionales.",
      msgFail: "Los horarios del curso le quitan tiempo a tus citas con {player}."
    },
    optionB: {
      text: "No anotarse",
      rate: 0.40,
      reward: { fame: 4, relProgress: 1 },
      fail: { chem: -5, relProgress: -3 },
      msgSuccess: "Seguís manejándote con tu simpatía y carisma natural.",
      msgFail: "Cometés un error de traducción en una conferencia."
    }
  },
  {
    id: "B5",
    name: "₿ Promocionar cripto",
    desc: "Una empresa fintech te ofrece una fortuna por promocionar su token.",
    optionA: {
      text: "Promocionar el token",
      rate: 0.40,
      reward: { fame: 30, contacts: 10, relProgress: 3 },
      fail: { rep: -40, relProgress: -15 },
      msgSuccess: "La campaña es un boom viral y facturás en dólares.",
      msgFail: "La moneda cae a cero y te denuncian en redes por estafa."
    },
    optionB: {
      text: "No promocionar",
      rate: 0.60,
      reward: { rep: 15, relProgress: 2 },
      fail: { rep: -40, relProgress: -15 },
      msgSuccess: "Evitás el riesgo y tu credibilidad queda intacta.",
      msgFail: "Filtran chats diciendo que pedías cifras exorbitantes."
    }
  },
  {
    id: "B6",
    name: "👥 Comprar seguidores",
    desc: "Una agencia digital te ofrece sumar 500k seguidores al instante.",
    optionA: {
      text: "Comprar el pack",
      rate: 0.50,
      reward: { fame: 20, relProgress: 3 },
      fail: { rep: -25, relProgress: -8 },
      msgSuccess: "Tus números vuelan y atraés nuevos sponsors de inmediato.",
      msgFail: "Cuentas bot te dejan comentarios sospechosos y te descubren."
    },
    optionB: {
      text: "Crecer orgánico",
      rate: 0.50,
      reward: { rep: 10, relProgress: 2 },
      fail: { rep: -25, relProgress: -8 },
      msgSuccess: "Tu comunidad real te apoya con engagement genuino.",
      msgFail: "Tus métricas se estancan temporalmente frente a tus rivales."
    }
  },
  {
    id: "B7",
    name: "🧴 Promocionar crema",
    desc: "Una marca de cosmética premium te propone ser su embajadora.",
    optionA: {
      text: "Aceptar campaña",
      rate: 0.60,
      reward: { chem: 8, relProgress: 5 },
      fail: { rep: -5, relProgress: -3 },
      msgSuccess: "Las fotos de la campaña son elegantes y suman prestigio.",
      msgFail: "La crema mancha la ropa de {player} y se arma discusión."
    },
    optionB: {
      text: "Declinar con respeto",
      rate: 0.40,
      reward: { rep: 5, relProgress: 1 },
      fail: { rep: -5, relProgress: -3 },
      msgSuccess: "Elegís exclusividad y cuidás tus colaboraciones.",
      msgFail: "La marca contrata a tu rival directa con gran éxito."
    }
  },
  {
    id: "B8",
    name: "💬 Insulto de otra botinera",
    desc: "Una botinera rival te tira una indirecta picante en un programa de TV.",
    optionA: {
      text: "Responder con todo",
      rate: 0.50,
      reward: { fame: 10, contacts: 5, relProgress: 3 },
      fail: { rep: -15, relProgress: -5 },
      msgSuccess: "Tu respuesta es tan filosa que todos te aplauden en redes.",
      msgFail: "Quedás metida en un barro mediático poco elegante."
    },
    optionB: {
      text: "Ignorar por completo",
      rate: 0.50,
      reward: { rep: 10, relProgress: 2 },
      fail: { rep: -15, relProgress: -5 },
      msgSuccess: "El silencio marca categoría y quedás como una dama.",
      msgFail: "Dicen que te achicaste y no tenías respuesta."
    }
  }
];

const statInfo = {
  fame: { title: "⭐ Fama", desc: "Tu alcance mediático, nivel de notoriedad y presencia en prensa y redes sociales." },
  rep: { title: "🧠 Reputación", desc: "Tu prestigio e imagen pública. Una alta reputación genera confianza y aumenta tus probabilidades de éxito en cada salida." },
  contacts: { title: "🤝 Contactos", desc: "Tu red de influencias y accesos VIP en la farándula para organizar mejores encuentros." },
  chem: { title: "🔥 Química", desc: "La atracción y conexión romántica con tu pareja actual. Si cae demasiado, la relación puede terminar de golpe." },
  rumors: { title: "💬 Rumores", desc: "Escándalos y chismes mediáticos sin controlar. Perjudican tu estatus y aumentan el riesgo de ser dejada en visto." },
  couples: { title: "❤️ Noviazgos", desc: "Relaciones confirmadas y formalizadas exitosamente a lo largo de tu carrera." }
};