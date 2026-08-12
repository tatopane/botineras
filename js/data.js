// Botineras — Data
const chars = [
  { name: "Wonda Nara", trait: "Master en vivo, doctora en quilombo", img: "images/pixel/webp/wanda-pixel.webp", bonus: { fame: 15, rep: 5 } },
  { name: "La China Suáres", trait: "Química que derrite pingüinos", img: "images/pixel/webp/china-pixel.webp", bonus: { chem: 12, fame: 13 } },
  { name: "Sasha Ferra", trait: "Se prende una cosa y se arde Twitter", img: "images/pixel/webp/sasha-pixel.webp", bonus: { fame: 10, contacts: 4 } },
  { name: "Bri Marcas", trait: "Acceso VIP hasta al baño del Monumental", img: "images/pixel/webp/bri-pixel.webp", bonus: { contacts: 12, rep: 3 } },
  { name: "Jaz Paralta", trait: "Carisma impredecible (ella incluida)", img: "images/pixel/webp/jaz-pixel.webp", bonus: { chem: 8, rep: 7 } },
  { name: "Clari Crimaschi", trait: "Las marcas la bancan, los bancos la esquivan", img: "images/pixel/webp/clari-pixel.webp", bonus: { rep: 10, fame: 4 } }
];

const tiers = [
  { name: "Barrio", need: 0, players: ["El 9 de Lugano", "El arquero streamer", "La figura del futsal", "El entrenador de Dock Sud"] },
  { name: "Ascenso", need: 60, players: ["El goleador de Chacarita", "La promesa de Atlanta", "El lateral de Temperley", "El 9 de Ferro", "Caruso Lombardo"] },
  { name: "Primera", need: 110, players: ["Valentin Carbon", "Jose Sasa", "Juanfer Quintino", "Milton Delgade", "Marcos Cuña", "Kevin Lomanoco", "Nacho Fernindez", "Santiago Asca"] },
  { name: "Latam", need: 190, players: ["La figura de Flamengo", "Ronaldinho", "Rodrigo DiPaúl", "Sergio Canales", "Nico Otomandi", "Ángel di Mery", "Thiago Silvi", "Halk", "Felipe Mele", "Franco Armano", "Ángel Correo", "Thiago Almade"] },
  { name: "Europa", need: 250, players: ["Valentín Barca", "Gio Simone", "Rafael Leãu", "Dani Olme", "Nico Willian", "Lautaro Martines", "Marco Seneso", "Nico Domingo", "Juan Mussa", "Guido Rodrígue"] },
  { name: "Champions", need: 330, players: ["Erling Håland", "Kylian M'Bapé", "Lamine Yamall", "Rodri", "Julián Álvares", "Harry Kane", "Vinícius Júniorr", "Jude Bellinghan"] }
];

const eventTypes = [
  {
    id: "E1",
    title: "¿Love o fake?",
    img: "images/pixel/webp/event-bar.webp",
    text: "{player} te invita a un bar canchero. La pregunta es: ¿vas por el romance o por el contenido?",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Ir tranqui, sin el celu", 0.72, "Cero pantalla, toda conexión. Se declaran la segunda cita a los 20 minutos.", "Te la pasabas mirando el techo y {player} se durmió en el trago.", { chem: 18, rep: 12, relProgress: 18 }, { chem: -5, relProgress: -8 }],
      ["Subir historia con canción de amor", 0.53, "Los rumores vuelan solos y {player} le entra al jueguito.", "Pone la canción equivocada y te dejan en visto con el corazón roto.", { fame: 18, rumors: 1, chem: 14, relProgress: 14 }, { rep: -8, chem: -8, rumors: 1, relProgress: -10 }],
      ["Pedirle a Guillote que maneje la logística", 0.64, "Guillote consigue mesa VIP y hasta te deja servilleta con número de {player}.", "Guillote aparece con ocho personas más, un parlante y un asado improvisado.", { contacts: 16, chem: 14, relProgress: 15 }, { rep: -5, relProgress: -6 }]
    ]
  },
  {
    id: "E2",
    title: "Dos tiros: salida o escándalo",
    img: "images/pixel/webp/event-boliche.webp",
    text: "Salís del boliche con {player} y hay más flashes que en un recital de los redondos.",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Salir tipo power couple", 0.56, "Las fotos los muestran radiantes y el primer rumor nace solo.", "{player} se tapa la cara con la campera y parece que escapaban de un incendio.", { fame: 22, rumors: 1, chem: 14, relProgress: 15 }, { rep: -9, rumors: 1, relProgress: -10 }],
      ["Salir separados como buenos espías", 0.74, "La discreción los fortalece y nadie puede probar nada.", "Te vas sola y {player} termina en un after que no estaba en los planes.", { rep: 16, chem: 16, relProgress: 18 }, { chem: -8, relProgress: -8 }],
      ["Escapar por la cocina con glamour", 0.61, "La aventura los unifica más que una declaración de amor.", "Terminás encerrada en el depósito entre bolsas de papas fritas.", { chem: 20, contacts: 10, relProgress: 15 }, { rep: -6, relProgress: -7 }]
    ]
  },
  {
    id: "E3",
    title: "A la mierda todo (viajemos)",
    img: "images/pixel/webp/event-viaje.webp",
    text: "{player} te invita a un viaje sorpresa de 48 horas. ¿Te subís al avión o primero averiguás quién paga?",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    actions: [
      ["Subirse como si tuviéramos 20", 0.63, "El viaje soñado: habitación con vista y romance de película.", "Resulta que la reserva estaba a nombre de la ex. Bajón.", { chem: 24, rep: 14, relProgress: 20 }, { rep: -10, chem: -7, relProgress: -12 }],
      ["Contárselo a tu mejor amiga", 0.49, "La amiga guarda el secreto mejor que un confesor.", "La amiga se lo cuenta a otra amiga. Y esa a otra. Y a otra.", { contacts: 14, chem: 16, relProgress: 14 }, { rumors: 2, rep: -8, relProgress: -12 }],
      ["Compartir ubicación en vivo 'por seguridad'", 0.70, "Evitás sorpresas, llegan bien y hasta te regala un upgrade.", "{player} interpreta la cautela como desconfianza: '¿Pensás que te voy a vender?'", { rep: 16, chem: 14, relProgress: 16 }, { chem: -5, relProgress: -8 }]
    ]
  },
  {
    id: "E4",
    title: "La foto que no pediste",
    img: "images/pixel/webp/event-restaurant.webp",
    text: "Apareció una foto tuya con {player} en un restaurante caro. Los cronistas ya están armando el árbol genealógico.",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    actions: [
      ["Confirmar con cara de enamorada", 0.58, "La gente compra la historia y el rumor se convierte en portada.", "{player} lo niega todo por micrófono y te deja como intensa.", { fame: 28, chem: 20, rumors: 1, relProgress: 18 }, { rep: -18, chem: -12, rumors: 2, relProgress: -18 }],
      ["Negar con sonrisa de Mona Lisa", 0.72, "La intriga crece solita y nadie puede probar nada.", "La negación es tan teatral que parece sacada de una telenovela turca.", { rep: 22, fame: 14, chem: 6, relProgress: 15 }, { rep: -6, rumors: 1, relProgress: -8 }],
      ["Silencio de radio", 0.64, "El silencio es tan misterioso que hasta Guillote pide entrevista.", "El rumor crece más que el dólar blue.", { chem: 16, rep: 14, relProgress: 14 }, { rumors: 2, rep: -5, relProgress: -10 }]
    ]
  },
  {
    id: "E5",
    title: "¿Algo serio o algo serio?",
    img: "images/pixel/webp/event-exclusividad.webp",
    text: "{player} te suelta la pregunta incómoda: «¿Dejamos de ver a otras personas?»",
    stage: 2,
    minProgress: 76,
    maxProgress: 100,
    failBreaks: true,
    actions: [
      ["Decir que sí con emoción contenida", 0.67, "Noviazgo confirmado. Salen en todas las tapas.", "A los tres días se dan cuenta de que cada uno entendió algo distinto.", { chem: 28, rep: 18, relProgress: 30 }, { chem: -15, rep: -7, relProgress: -20 }],
      ["Pedir un tiempo (el clásico)", 0.55, "La honestidad duele menos que una infidelidad, dicen.", "{player} se cansa de esperar y aparece con otra en una revista.", { rep: 20, chem: 14, relProgress: 14 }, { chem: -12, relProgress: -15 }],
      ["Responder con un meme de Pug", 0.45, "Se caga de risa, el meme termina en su estado y formalizan igual.", "No entiende el meme, se ofende y te bloquea de todas las redes.", { fame: 14, chem: 24, relProgress: 22 }, { chem: -18, rep: -5, relProgress: -20 }]
    ]
  },
  {
    id: "E6",
    title: "Paseo en lancha (o naufragio)",
    img: "images/pixel/webp/event-yatch.webp",
    text: "{player} te invita a pasear en su lancha. La pregunta es: ¿aguantás el mareo o te la bancás?",
    stage: 1,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Aceptar sin hacer preguntas", 0.65, "Charla frente al mar, sol, vino blanco. Día soñado.", "Se descompone en altamar y el paseo termina en el hospital.", { chem: 14, relProgress: 15 }, { chem: -5, relProgress: -8 }],
      ["Preguntar quién más va (por las dudas)", 0.55, "Valora tu cautela y deciden ir solos. Íntimo y romántico.", "Piensa que desconfiás y cancela todo: «Entonces no vamos.»", { rep: 12, relProgress: 14 }, { rep: -4, relProgress: -12 }],
      ["Subir historia en biquini estratégico", 0.50, "La foto rompe Instagram y {player} se prende a comentar.", "Los haters atacan y los medios te ponen la etiqueta de siempre.", { fame: 18, rumors: 1, relProgress: 10 }, { rep: -8, chem: -5, relProgress: -10 }]
    ]
  },
  {
    id: "E7",
    title: "Operación encubierta",
    img: "images/pixel/webp/event-hotel-backdoor.webp",
    text: "{player} te pide que vayas a su country sin que nadie se entere. Modo sigilo ON.",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    actions: [
      ["Ir sin avisar vestida de ninja", 0.45, "Llegás en modo furtivo, cenan a escondidas y la química explota.", "La guardia del country te para, el vecino te graba y termina en Crónica TV.", { chem: 22, relProgress: 22 }, { rep: -10, rumors: 2, relProgress: -15 }],
      ["Pasarle la ubicación a tu amiga", 0.60, "Tu amiga te cubre como agente de la CIA y todo sale impecable.", "Tu amiga le pasa el dato a la prensa y te esperan en la puerta con cámaras.", { contacts: 14, chem: 6, relProgress: 16 }, { rumors: 2, rep: -6, relProgress: -10 }],
      ["Devolverle la invitación a tu casa", 0.70, "Acepta encantado, llega con vino y demuestra que va en serio.", "Pone siete excusas distintas y te deja mirando el techo toda la noche.", { rep: 14, chem: 6, relProgress: 12 }, { chem: -5, relProgress: -5 }]
    ]
  },
  {
    id: "E8",
    title: "Rumor explosivo (como siempre)",
    img: "images/pixel/webp/event-infidelidad.webp",
    text: "Dicen en la tele que {player} anda con otra. ¿Te lo tomás personal o lo manejás con clase?",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    actions: [
      ["Encararlo de una con el celu en mano", 0.60, "Hablan claro, lo niega todo y hasta te muestra el chat. Salís fortalecida.", "Se pone a la defensiva como abogado del diablo y se arma la de Troya.", { rep: 16, chem: 14, relProgress: 14 }, { rep: -8, chem: -10, relProgress: -15 }],
      ["Hacerte la que no te enteraste", 0.55, "Tu indiferencia lo pone nervioso y te busca el doble.", "El rumor crece y quedás como la última en enterarse de todo el país.", { fame: 14, chem: 6, relProgress: 10 }, { rumors: 2, chem: -8, relProgress: -12 }],
      ["Tirar una indirecta críptica en redes", 0.50, "La indirecta explota y todo el mundo se la pasa discutiendo.", "Quedás como una despechada nivel dios y te hacen un altar de memes.", { fame: 22, contacts: 10, chem: 6, relProgress: 8 }, { rep: -12, rumors: 3, relProgress: -18 }]
    ]
  },
  {
    id: "E9",
    title: "Lo confirmaron: hay otra",
    img: "images/pixel/webp/event-infidelidad.webp",
    text: "Filtran chats y fotos de {player} con otra persona. No hay vuelta atrás.",
    stage: 2,
    minProgress: 76,
    maxProgress: 100,
    failBreaks: true,
    actions: [
      ["Perdonar como reina del perdón", 0.40, "Te pide disculpas en público, te regala un auto y lloran juntos en la tele.", "Reincide a la semana y encima se olvida de borrar el historial.", { rep: 16, chem: 18, relProgress: 10 }, { rep: -15, chem: -20, relProgress: -30 }],
      ["Terminar con dignidad olímpica", 0.85, "Salís con la frente alta, el país te aplaude y te llueven propuestas.", "La separación duele como patada en los huevos, pero sanará.", { rep: 22, fame: 14, chem: 8, relProgress: -15 }, { rep: -10, chem: -10, relProgress: -20 }],
      ["Hacerle un descargo épico en redes", 0.50, "Tu descargo bate récords históricos y te convertís en reina de la denuncia.", "Sacan un chat donde decías otra cosa y te comés la volteada de tu vida.", { fame: 35, contacts: 15, relProgress: -20 }, { rep: -20, rumors: 5, relProgress: -30 }]
    ]
  },
  {
    id: "E10",
    title: "¿Nos vamos a vivir juntos? 🏠",
    img: "images/pixel/webp/event-mudanza.webp",
    text: "{player} te suelta la bomba: «¿Y si nos vamos a vivir juntos?» ¿Convivencia soñada o pesadilla asegurada?",
    stage: 2,
    minProgress: 76,
    maxProgress: 100,
    failBreaks: true,
    actions: [
      ["Mudarse ya mismo sin pensarlo", 0.50, "Convivencia soñada: desayuno en la cama, pileta y amor todos los días.", "La rutina y los egos chocan: no se ponen de acuerdo ni en el color de las sábanas.", { chem: 26, relProgress: 26 }, { rep: -10, chem: -15, relProgress: -20 }],
      ["Pedir un tiempo para pensarlo bien", 0.65, "Tu madurez le da tranquilidad y respeta tus tiempos de estrella.", "Lo interpreta como rechazo y se empieza a enfriar la cosa.", { rep: 16, chem: 8, relProgress: 10 }, { chem: -8, relProgress: -12 }],
      ["Mudarse con contrato firmado frente a escribano", 0.55, "Asegurás patrimonio e independencia. Él respeta tu visión de negocios.", "Sus abogados ponen peros y el amor empieza a oler a divorcio administrativo.", { rep: 18, chem: 6, relProgress: 14 }, { chem: -5, relProgress: -8 }]
    ]
  },
  {
    id: "E11",
    title: "Rusia te espera (y a tu relación)",
    img: "images/pixel/webp/event-rusia.webp",
    text: "A {player} le ofrecen un contrato millonario en Rusia. ¿Te subís al avión o te bajás del amor?",
    stage: 2,
    minProgress: 76,
    maxProgress: 100,
    failBreaks: true,
    actions: [
      ["Irse juntos a la tundra", 0.45, "Vivís como zarina entre pieles y caviar. Romance de película con bufanda.", "El frío siberiano congela hasta el amor más ardiente. Y el vodka no ayuda.", { chem: 28, relProgress: 28, fame: 0 }, { rep: -15, chem: -18, relProgress: -25 }],
      ["Intentar el amor a distancia (sí, ya sabemos)", 0.55, "Pasajes en primera y videollamadas. La tecnología puede salvar cualquier cosa.", "La distancia enfría más que el invierno ruso y el amor se apaga.", { rep: 14, chem: 12, relProgress: 10 }, { chem: -12, relProgress: -15 }],
      ["Terminar antes del vuelo", 0.80, "Cortás en el mejor momento, con estilo y dignidad de diva.", "Te quedás con la duda de qué hubiera pasado si te ibas.", { rep: 18, chem: 6, relProgress: -15 }, { fame: -8, chem: -5, relProgress: -10 }]
    ]
  },
  {
    id: "E12",
    title: "¿Nos casamos? (sin presión)",
    img: "images/pixel/webp/event-wedding.webp",
    text: "{player} te pidió la mano. Vestido blanco, cura y toda la pompa. ¿Decís que sí o salís corriendo?",
    stage: 2,
    minProgress: 76,
    maxProgress: 100,
    failBreaks: true,
    actions: [
      ["Aceptar emocionada hasta las lágrimas", 0.55, "La boda del año. Salís en todas las revistas. Felicidad absoluta.", "{player} llega tarde al altar y los rumores de arrepentimiento arruinan la fiesta.", { chem: 32, fame: 30, rep: 15, relProgress: 26 }, { rep: -15, chem: -12, rumors: 3, relProgress: -20 }],
      ["Casarse en secreto en Punta del Este", 0.65, "Ceremonia íntima con los justos y necesarios. Elegancia pura.", "Se filtran las fotos igual y el secreto se convierte en circo mediático.", { chem: 24, rep: 18, relProgress: 20 }, { rep: -8, rumors: 2, relProgress: -12 }],
      ["Pedir acuerdo prenupcial (no es amor, es negocio)", 0.60, "{player} acepta mostrando madurez y visión de futuro.", "Los abogados convierten el amor en un excel de 40 páginas.", { rep: 20, contacts: 12, chem: 6, relProgress: 12 }, { chem: -8, relProgress: -8 }]
    ]
  },
  {
    id: "E13",
    title: "¿La cigüeña o el preserving?",
    img: "images/pixel/webp/event-pregnant.webp",
    text: "{player} quiere hablar de tener hijos. Y no es para pedirte un perrito.",
    stage: 2,
    minProgress: 76,
    maxProgress: 100,
    failBreaks: true,
    actions: [
      ["Sí, quiero ser mamá", 0.50, "La noticia del embarazo es portada de todas las revistas. Felicidad total.", "La presión mediática y las inseguridades personales generan una crisis inesperada.", { chem: 35, fame: 22, rep: 14, relProgress: 24 }, { chem: -18, rep: -10, rumors: 2, relProgress: -20 }],
      ["Esperar un poco (o un mucho)", 0.60, "{player} respeta tus tiempos y el vínculo sale fortalecido.", "El 'esperar' se traduce como 'no quiero' y la relación se congela.", { rep: 16, chem: 16, relProgress: 12 }, { chem: -10, relProgress: -12 }],
      ["Ser honesta: 'No es mi momento'", 0.55, "La sinceridad duele pero construye una base de confianza real.", "{player} no procesa el no y la relación se desmorona como castillo de naipes.", { rep: 18, chem: 6, relProgress: 10 }, { chem: -20, relProgress: -25 }]
    ]
  },
  {
    id: "E14",
    title: "Test positivo (y no es del covid)",
    img: "images/pixel/webp/event-pregnant.webp",
    text: "El test dio positivo. No estaba en los planes. {player} reacciona como puede (o como quiere).",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    failBreaks: true,
    actions: [
      ["Afrontarlo juntos como adultos funcionales", 0.55, "{player} te da la mano y juntos planean el futuro. Madurez nivel dios.", "El miedo puede más y empiezan a echarse culpas de todo.", { chem: 20, rep: 15, relProgress: 15 }, { chem: -15, rep: -10, relProgress: -20 }],
      ["Ocultarlo y hacerse las misteriosas", 0.45, "El secreto las convierte en reinas del misterio mediático.", "Las filtran todo y el escándalo destruye la poca confianza que había.", { fame: 25, rumors: 2, relProgress: 8 }, { rep: -18, chem: -12, rumors: 4, relProgress: -20 }],
      ["Hablar con Guillote para manejo de crisis", 0.60, "Guillote negocia un acuerdo de confidencialidad y salen fortalecidos.", "Guillote se va de boca en un programa en vivo. La famosa 'embarazada filtración'.", { rep: 12, contacts: 10, relProgress: 10 }, { rep: -15, rumors: 3, relProgress: -15 }]
    ]
  },
  {
    id: "E15",
    title: "El asado del plantel (la prueba de fuego)",
    img: "images/pixel/webp/event-asado.webp",
    text: "{player} te invita a un asado con todo el equipo. Ahí te va a conocer la familia futbolera.",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Llevar un postre y caer bien parada", 0.70, "Te ganás al grupo entero. Hasta el técnico te pidió tu número (para la próxima cena).", "Hacés un comentario sobre el último partido y te miran como si hubieras insultado a Maradona.", { rep: 14, contacts: 12, chem: 12, relProgress: 15 }, { rep: -6, relProgress: -6 }],
      ["Copar los mates y quedarte con él", 0.65, "Pasan la tarde entre risas y anécdotas íntimas. Química al palo.", "Se pone a jugar al truco con los pibes y te deja hablando sola.", { chem: 18, rep: 10, relProgress: 18 }, { chem: -8, relProgress: -8 }],
      ["Caer con dos amigas influencers", 0.48, "El asado se convierte en evento y la prensa habla de vos todo el finde.", "Una de tus amigas sube algo que no debía y el técnico llama a la dirigencia.", { fame: 20, contacts: 14, chem: 10, relProgress: 12 }, { rep: -10, rumors: 2, relProgress: -12 }]
    ]
  },
  {
    id: "E16",
    title: "Palco VIP: cámaras, aguante y riesgos",
    img: "images/pixel/webp/event-estadio.webp",
    text: "{player} te deja dos pases de palco para el clásico. Vas a estar en la mira de todas las cámaras.",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Ir con look sobrio y perfil bajo", 0.72, "La prensa no te quema y {player} te lo agradece con un beso en el tunel.", "Te aburrís soberanamente en el palco y las cámaras te captan bostezando.", { rep: 16, chem: 14, relProgress: 16 }, { chem: -5, relProgress: -6 }],
      ["Look de gala con outfit de marca", 0.54, "Te enfocan siete veces en la transmisión oficial. Explotan las menciones.", "Te enfocan justo cuando te sacás un moco: meme nacional instantáneo.", { fame: 22, chem: 12, rumors: 1, relProgress: 14 }, { rep: -8, relProgress: -8 }],
      ["Socializar con sponsors y dirigentes", 0.62, "Pegás contactos de primer nivel para futuros contratos millonarios.", "{player} se calienta porque fuiste a hacer networking y no a verlo a él.", { contacts: 18, rep: 8, relProgress: 10 }, { chem: -10, relProgress: -8 }]
    ]
  },
  {
    id: "E17",
    title: "🔥 A las 3 AM: modo tentación",
    img: "images/pixel/webp/event-mobile.webp",
    text: "{player} te reacciona con tres fueguitos a una historia en bikini a las 3 de la mañana. Sabés lo que significa.",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Clavarle el visto hasta la tarde", 0.68, "Hacerte la difícil funciona: te escribe al otro día con todo el hambre.", "Piensa que no hay caso y se va a chamuyar a otra por DM.", { rep: 14, chem: 16, relProgress: 15 }, { chem: -8, relProgress: -8 }],
      ["Responder al toque con selfie", 0.50, "El ida y vuelta nocturno sube la temperatura a niveles récord.", "Te responde con un sticker y te deja en visto toda la santa noche.", { chem: 22, fame: 10, relProgress: 18 }, { chem: -8, rep: -6, relProgress: -10 }],
      ["Subir captura tapando el nombre", 0.52, "El misterio se vuelve viral y todos quieren adivinar quién te escribe.", "Se reconoce su foto de perfil pixelada y se enoja en serio.", { fame: 18, rumors: 1, chem: 10, relProgress: 12 }, { rep: -10, rumors: 2, relProgress: -12 }]
    ]
  },
  {
    id: "E18",
    title: "Aparecete en el vivo (o no)",
    img: "images/pixel/webp/event-mobile.webp",
    text: "{player} está en Twitch con los pibes y te tira un «sumate a la call» en medio de la transmisión.",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Sumarte con carisma y hacerte la canchera", 0.60, "El chat explota con el shippeo en vivo y ganás miles de seguidores.", "Decís algo fuera de contexto y te clipéan para toda la eternidad en TikTok.", { fame: 22, chem: 14, relProgress: 16 }, { rep: -10, rumors: 2, relProgress: -10 }],
      ["Pasar atrás 'sin querer' bien producida", 0.65, "El chat la nota al instante y se vuelve loco. Misterio, glamour, jugada perfecta.", "Tropezás con los cables y hacés cortocircuito justo cuando iban 2-0.", { fame: 16, rep: 14, relProgress: 12 }, { rep: -6, chem: -6, relProgress: -8 }],
      ["Decir que no y pedir llamada privada", 0.70, "Corta el stream al toque para hablar con vos a solas. Prioridades correctas.", "Prefiere seguir jugando con la comunidad y te deja en visto hasta el otro día.", { chem: 18, rep: 12, relProgress: 16 }, { chem: -8, relProgress: -6 }]
    ]
  },
  {
    id: "E19",
    title: "Merienda tranqui (¿o no tanto?)",
    img: "images/pixel/webp/event-restaurant.webp",
    text: "{player} te propone una merienda en una terraza privada en Puerto Madero. Sin joda, sin after, solo ustedes dos.",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Charla profunda de proyectos de vida", 0.75, "Conectan de verdad. Terminan planeando un viaje juntos para el mes que viene.", "La charla se vuelve un interrogatorio de trabajo social y te querés ir.", { chem: 16, rep: 16, relProgress: 18 }, { chem: -6, relProgress: -6 }],
      ["Foto estética mostrando el reloj de él", 0.55, "En redes reconocen el Rolex y se dispara tu cotización en el mercado del amor.", "{player} se da cuenta del encuadre forzado y te dice: «¿En serio?»", { fame: 20, rumors: 1, chem: 12, relProgress: 14 }, { rep: -10, chem: -8, relProgress: -10 }],
      ["Llevarle un regalito personalizado", 0.62, "El gesto lo deja seco: «Nadie había hecho esto por mí». Te come a besos.", "El regalo le parece demasiado para una primera merienda y se asusta.", { chem: 18, contacts: 10, relProgress: 16 }, { rep: -6, relProgress: -8 }]
    ]
  },
  {
    id: "E20",
    title: "El after clandestino",
    img: "images/pixel/webp/event-boliche.webp",
    text: "Cierra el boliche y {player} te dice de seguirla en un piso exclusivo con DJ privado en Palermo.",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Bailar pegados hasta las 9 AM", 0.60, "La química explota en la pista y terminan desayunando juntos al sol.", "El cansancio acumulado les juega en contra y terminan discutiendo.", { chem: 22, fame: 10, relProgress: 18 }, { chem: -8, relProgress: -8 }],
      ["Irte a dormir temprano marcando distancia", 0.70, "Marcás territorio y estatus; te busca desesperado al día siguiente.", "Se queda de joda con su grupo de amigos y se olvida de tu existencia.", { rep: 16, chem: 14, relProgress: 15 }, { chem: -6, relProgress: -6 }],
      ["Copar la música y manejar la fiesta", 0.50, "Sos el alma del after y pegás la mejor onda con todo su círculo íntimo.", "Se arma bardo con los vecinos, cae la policía y salís filmada en Crónica.", { contacts: 16, fame: 16, chem: 12, relProgress: 14 }, { rep: -14, rumors: 3, relProgress: -14 }]
    ]
  },
  {
    id: "E21",
    title: "Escapada secreta a Miami",
    img: "images/pixel/webp/event-miami.webp",
    text: "{player} te saca pasajes en primera clase para pasar 4 días a puro sol en un hotel 5 estrellas en South Beach.",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    actions: [
      ["Bikini diminuta y parador VIP", 0.58, "Los paparazzis internacionales te sacan fotos soñadas; tapa de revista.", "Te persiguen hasta la carpa y {player} se enoja por el asedio mediático.", { fame: 25, chem: 18, rumors: 1, relProgress: 18 }, { rep: -10, chem: -8, relProgress: -10 }],
      ["Quedarse encerrados en la suite presidencial", 0.75, "Desconexión total, mimos y romance al 100% frente al mar.", "Se la pasa jugando a la Play con amigos a distancia y te aburrís.", { chem: 22, rep: 16, relProgress: 20 }, { chem: -8, relProgress: -8 }],
      ["Cenar con celebridades en el parador", 0.65, "Pegás vínculos comerciales y contactos de primer nivel en Miami.", "{player} se siente ignorado en la mesa y se pone celoso de los invitados.", { contacts: 20, fame: 12, relProgress: 14 }, { chem: -10, relProgress: -8 }]
    ]
  },
  {
    id: "E22",
    title: "La 4x4 con moño de regalo",
    img: "images/pixel/webp/event-suv.webp",
    text: "{player} cae a tu cumpleaños con una camioneta importada de lujo estacionada en la puerta con un moño gigante.",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    actions: [
      ["Aceptar emocionada y subir video", 0.60, "El video rompe récords de likes y el gesto confirma que va en serio.", "En redes te tildan de interesada y te llenan de comentarios negativos.", { fame: 26, chem: 18, relProgress: 18 }, { rep: -12, rumors: 2, relProgress: -8 }],
      ["Exigir que los papeles salgan a tu nombre", 0.55, "Visión empresarial impecable: {player} respeta tu carácter firme.", "Lo toma como una actitud fría y calculadora; se tensa todo.", { rep: 20, contacts: 14, relProgress: 16 }, { chem: -12, relProgress: -12 }],
      ["Agradecer pero pedir algo más íntimo", 0.70, "Valora tu sencillez y madurez; se enamora todavía más de vos.", "Siente que rechazaste su gran sorpresa y se ofende.", { rep: 18, chem: 16, relProgress: 16 }, { chem: -8, relProgress: -8 }]
    ]
  },
  {
    id: "E23",
    title: "Tatuaje de la discordia",
    img: "images/pixel/webp/event-tatoo.webp",
    text: "En una noche apasionada, {player} te propone ir a un estudio top a tatuarse algo juntos en la piel.",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    actions: [
      ["Tatuarse sus iniciales en el cuello", 0.50, "La locura de amor los une con una pasión desmedida.", "El tatuador filtra la foto y la prensa se burla del diseño.", { chem: 26, fame: 16, relProgress: 20 }, { rep: -10, rumors: 2, relProgress: -10 }],
      ["Proponer un símbolo minimalista", 0.72, "El detalle queda fino, cómplice y sin quemarse públicamente.", "Le parece poco jugado y duda de tu compromiso sentimental.", { rep: 18, chem: 16, relProgress: 16 }, { chem: -6, relProgress: -6 }],
      ["Hacerte la dormida para zafar del turno", 0.65, "Evitás una marca permanente y al otro día se le pasa la idea.", "Descubre que te escapaste a propósito y te acusa de no jugártela.", { rep: 14, relProgress: 6 }, { chem: -10, relProgress: -8 }]
    ]
  },
  {
    id: "E24",
    title: "Infiltrada en la concentración",
    img: "images/pixel/webp/event-hotel-backdoor.webp",
    text: "{player} te pide que entres a escondidas a su habitación de hotel la noche previa al partido.",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    actions: [
      ["Entrar con gorra y camperón del club", 0.48, "La adrenalina prohibida enciende el romance como nunca.", "El cuerpo técnico te descubre en el pasillo: escándalo en el club.", { chem: 24, fame: 12, relProgress: 18 }, { rep: -16, rumors: 3, relProgress: -15 }],
      ["Negarte para cuidar su rendimiento", 0.75, "Al otro día la rompe en la cancha y te dedica el gol del triunfo.", "Se frustra, juega mal y te echa la culpa indirectamente.", { rep: 18, chem: 16, relProgress: 16 }, { chem: -8, relProgress: -8 }],
      ["Pedirle a Guillote que gestione el pase", 0.62, "Guillote arregla con el conserje y entrás como una reina por cocina.", "Guillote pide canje con el hotel y se entera toda la prensa.", { contacts: 16, chem: 16, relProgress: 15 }, { rep: -8, rumors: 2, relProgress: -10 }]
    ]
  },
  {
    id: "E25",
    title: "Móvil sorpresa de la tele",
    img: "images/pixel/webp/event-papparazi.webp",
    text: "Salís de la peluquería y te acorralan cronistas de chimentos en vivo con cámara prendida preguntando por {player}.",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    actions: [
      ["Tirar sonrisitas y frases enigmáticas", 0.68, "Manejás los tiempos de la tele a la perfección; rating por las nubes.", "Se te escapa un dato de más y desatás una polémica innecesaria.", { fame: 24, rep: 14, chem: 12, relProgress: 16 }, { rep: -8, rumors: 2, relProgress: -8 }],
      ["Desmentir todo: 'Somos solo amigos'", 0.60, "Cuidás la privacidad del vínculo con clase y prudencia absoluta.", "{player} siente que te avergonzás de él y se distancia dolido.", { rep: 18, chem: 10, relProgress: 14 }, { chem: -10, relProgress: -10 }],
      ["Apurar el paso tapándote con la cartera", 0.55, "Look de diva inalcanzable; la foto es tendencia en Twitter.", "Tropezás en el cordón y quedás como meme del año en redes.", { fame: 18, rep: 10, relProgress: 10 }, { rep: -12, relProgress: -8 }]
    ]
  },
  {
    id: "E26",
    title: "Ataque furioso de la ex",
    img: "images/pixel/webp/event-mobile.webp",
    text: "La ex de {player} sube indirectas venenosas a redes diciendo que te metiste en el medio de su relación.",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    actions: [
      ["Subir foto desayunando juntos", 0.55, "Mojada de oreja con estilo; {player} te banca públicamente.", "Se arma una guerra mediática interminable de chats cruzados.", { fame: 22, chem: 18, relProgress: 16 }, { rep: -12, rumors: 3, relProgress: -12 }],
      ["Meter bozal legal con tus abogados", 0.75, "Demostrás poder, categoría y la silenciás al instante.", "La cautelar se filtra y la gente se pone del lado de la ex.", { rep: 20, contacts: 16, relProgress: 15 }, { rep: -8, rumors: 1, relProgress: -6 }],
      ["Llamar a {player} para que ponga límites", 0.65, "{player} saca un comunicado aclarando todo y protegiéndote.", "{player} esquiva el conflicto y te pide que no te metas.", { chem: 18, rep: 16, relProgress: 18 }, { chem: -10, relProgress: -10 }]
    ]
  },
  {
    id: "E27",
    title: "Tarde de shopping de lujo",
    img: "images/pixel/webp/event-shopping.webp",
    text: "{player} te acompaña a un shopping exclusivo y te da su tarjeta sin límite para renovar el guardarropa.",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    actions: [
      ["Llenar el baúl con marcas importadas", 0.60, "Salís cargada de bolsas de diseño y {player} se enorgullece de verte espléndida.", "En la caja salta un rebote de la tarjeta y el papelón queda grabado por curiosos.", { fame: 24, chem: 18, relProgress: 18 }, { rep: -10, rumors: 2, relProgress: -8 }],
      ["Elegir un solo look sofisticado", 0.75, "Tu buen gusto y moderación lo deslumbran; quedás como una dama refinada.", "Le parece que fuiste demasiado tímida y que no aprovechaste su regalo.", { rep: 20, chem: 16, relProgress: 16 }, { chem: -8, relProgress: -6 }],
      ["Comprarle un regalo de autor a él", 0.68, "El gesto recíproco lo enamora por completo; destaca que no sos como las demás.", "La prenda elegida no le gusta nada y el momento se vuelve incómodo.", { chem: 20, contacts: 12, relProgress: 18 }, { rep: -6, relProgress: -8 }]
    ]
  }
];

const actions = [
  {
    id: "A1",
    name: "🕵️ Conflicto de intereses (compañero de equipo)",
    desc: "Te enganchás con un compañero de {player}. Spoiler: no termina bien.",
    successRate: 0.45,
    reward: { fame: 30, contacts: 20, rep: -5, relProgress: -5 },
    fail: { rep: -40, chem: -30, rumors: 3, relProgress: -30 },
    failBreaks: true,
    once: true
  },
  {
    id: "A2",
    name: "📱 Prender fuego el vestuario (vía Insta)",
    desc: "Publicás una historia rajando del técnico de su equipo. No apto para cardíacos.",
    successRate: 0.50,
    reward: { fame: 35, contacts: 15, rep: -10, relProgress: -3 },
    fail: { rep: -35, chem: -15, rumors: 5, relProgress: -10 },
    once: true
  },
  {
    id: "A3",
    name: "📢 Escándalo nivel Crónica TV",
    desc: "Armás una escena en la puerta del boliche con todas las cámaras presentes.",
    successRate: 0.60,
    reward: { fame: 25, contacts: 12, rumors: 8, relProgress: -5 },
    fail: { rep: -25, chem: -10, rumors: 2, relProgress: -8 },
    once: true
  },
  {
    id: "A4",
    name: "🚪 Cortar por lo sano (o no tan sano)",
    desc: "Decidís terminar la relación por tu cuenta. A veces es necesario, a veces es un error.",
    successRate: 1.0,
    reward: {},
    fail: {},
    once: false
  }
];

const boosters = [
  {
    id: "B1",
    name: "🌿 Ayahuasca modo discover",
    desc: "Una amiga iluminada te invita a una ceremonia espiritual en Tigre. Viaje astral o papelón asegurado.",
    optionA: {
      text: "Ir a la ceremonia",
      rate: 0.55,
      reward: { chem: 25, fame: 18, relProgress: 15 },
      fail: { rep: -20, rumors: 5, relProgress: -10 },
      msgSuccess: "La experiencia espiritual te conecta con el universo… y con {player}.",
      msgFail: "El viaje te sienta mal y salís desorientada en las noticias.",
      ctxSuccess: "Guillote comenta: «Esa conexión espiritual te va a salir más cara que un posoperatorio.»",
      ctxFail: "Crónica titula: «Botinera alucina y confunde un eucalipto con su ex.»"
    },
    optionB: {
      text: "No ir",
      rate: 0.45,
      reward: { rep: 5, relProgress: 2 },
      fail: { rep: -20, rumors: 5, relProgress: -10 },
      msgSuccess: "Te quedás en casa con tu mantita y tu té. La conciencia tranquila es el mejor plan.",
      msgFail: "Tu amiga se ofende y filtra que sos una amarrete espiritual.",
      ctxSuccess: "Guillote asiente: «A veces no hacer nada también es una decisión estratégica.»",
      ctxFail: "La amiga vende el chat a LAM y te bautizan «La plantadora serial.»"
    }
  },
  {
    id: "B2",
    name: "🔪 Retoque exprés (o desastre)",
    desc: "Un cirujano famoso de la farándula te ofrece un retoque de canje. Belleza o memes.",
    optionA: {
      text: "Hacerse el retoque",
      rate: 0.60,
      reward: { fame: 20, relProgress: 5 },
      fail: { rep: -15, relProgress: -10 },
      msgSuccess: "El resultado es espectacular. Todos quieren saber tu contacto.",
      msgFail: "El posoperatorio se complica y te saca de circulación.",
      ctxSuccess: "Los cirujanos te ponen de ejemplo… y las rivales de agenda.",
      ctxFail: "Los memes te comparan con un globo inflable en pleno rebote."
    },
    optionB: {
      text: "No hacerse nada",
      rate: 0.40,
      reward: { rep: 8, relProgress: 2 },
      fail: { rep: -15, relProgress: -10 },
      msgSuccess: "Decidís mantener tu carita tal cual. Autenticidad sobre diseño.",
      msgFail: "El cirujao despechado habla de tus consultas en la tele. Ay.",
      ctxSuccess: "Guillote: «Lo natural siempre gana… o al menos no se desinfla.»",
      ctxFail: "El cirujano filtró audio: «Vino, preguntó, no pagó, se fue.»"
    }
  },
  {
    id: "B3",
    name: "🧴 Skin care de diva",
    desc: "Un spa top te convoca para un tratamiento rejuvenecedor. Carita de porcelana o tomate.",
    optionA: {
      text: "Hacerse el tratamiento",
      rate: 0.65,
      reward: { rep: 10, chem: 5, relProgress: 8 },
      fail: { fame: -10, relProgress: -5 },
      msgSuccess: "Tu piel brilla tanto que hasta {player} te pidió tu rutina.",
      msgFail: "Te da una reacción alérgica. Parecés emoji de berenjena.",
      ctxSuccess: "Tu skincare routine ya es tendencia en TikTok.",
      ctxFail: "Parecés un tomate cherry en la cena con {player}."
    },
    optionB: {
      text: "Rechazar la propuesta",
      rate: 0.35,
      reward: { rep: 3, relProgress: 1 },
      fail: { fame: -10, relProgress: -5 },
      msgSuccess: "Rechazás con elegancia y te ahorrás el drama facial.",
      msgFail: "La marca se ofende y te pone en la lista negra de beautys.",
      ctxSuccess: "Guillote: «La exclusividad también es una marca registrada.»",
      ctxFail: "La marca te pone en la lista negra de influencers difíciles."
    }
  },
  {
    id: "B4",
    name: "📚 Inglés nivel: fame internacional",
    desc: "Te ofrecen una beca para estudiar inglés y oratoria. Para que cuando te entrevisten en la CNN no digas cualquier cosa.",
    optionA: {
      text: "Anotarse en el curso",
      rate: 0.60,
      reward: { rep: 10, contacts: 8, relProgress: 5 },
      fail: { chem: -5, relProgress: -3 },
      msgSuccess: "Tu inglés mejora tanto que hasta Guillote te pide clases.",
      msgFail: "Los horarios del curso coinciden con las citas con {player}. Algo se pierde.",
      ctxSuccess: "Guillote: «Ahora podés pelearte con {player} en dos idiomas.»",
      ctxFail: "{player} se queja: «Preferiría que aprendas a cocinar, no a declamar.»"
    },
    optionB: {
      text: "No anotarse",
      rate: 0.40,
      reward: { fame: 4, relProgress: 1 },
      fail: { chem: -5, relProgress: -3 },
      msgSuccess: "Seguís manejándote a los gritos y señas. El carisma lo compensa todo.",
      msgFail: "Te mandás una macana con la traducción en una conferencia. Meme instantáneo.",
      ctxSuccess: "Guillote: «El carisma tapa cualquier error de pronunciación.»",
      ctxFail: "El blooper se vuelve viral y te convierten en meme internacional."
    }
  },
  {
    id: "B5",
    name: "₿ Cripto: fortuna o fortuna (enemiga)",
    desc: "Una fintech te ofrece una fortuna por promocionar su token. ¿Lamborghini o estampida?",
    optionA: {
      text: "Promocionar el token",
      rate: 0.40,
      reward: { fame: 40, contacts: 15, relProgress: 3 },
      fail: { rep: -40, relProgress: -15 },
      msgSuccess: "El token explota al 500% y facturás en dólares. Todos contentos.",
      msgFail: "La moneda cae a cero y te denuncian en redes por estafa.",
      ctxSuccess: "Guillote: «Comprate algo lindo antes de que el fisco pregunte de dónde salió.»",
      ctxFail: "El token se llama «BotiCoin» y ya es un chiste nacional en los programas de chimentos."
    },
    optionB: {
      text: "No promocionar",
      rate: 0.60,
      reward: { rep: 15, relProgress: 2 },
      fail: { rep: -40, relProgress: -15 },
      msgSuccess: "Te mantenés al margen del quilombo cripto. Reputación blindada.",
      msgFail: "Filtran audios tuyos pidiendo cifras imposibles. Te venden como «la codiciosa».",
      ctxSuccess: "Guillote: «La reputación no se negocia ni en pesos ni en crypto.»",
      ctxFail: "Filtran un audio: «Quería 50 mil dólares, no un canje en criptomonedas.»"
    }
  },
  {
    id: "B6",
    name: "👥 Seguidores: ahora o nunca",
    desc: "Una agencia te ofrece 500k seguidores al instante. Todos lo hacen pero nadie lo dice.",
    optionA: {
      text: "Comprar el pack",
      rate: 0.50,
      reward: { fame: 30, relProgress: 3 },
      fail: { rep: -25, relProgress: -8 },
      msgSuccess: "Los números vuelan y los sponsors aparecen como moscas.",
      msgFail: "Cuentas bot te dejan comentarios sospechosos y te descubren.",
      ctxSuccess: "Guillote: «Comprados o no, los números mandan en esta industria.»",
      ctxFail: "Los bots te escriben en coreano y nadie entiende nada."
    },
    optionB: {
      text: "Crecer orgánico",
      rate: 0.50,
      reward: { rep: 10, relProgress: 2 },
      fail: { rep: -25, relProgress: -8 },
      msgSuccess: "Tu comunidad real te banca. Engagement genuino y sin bots truchos.",
      msgFail: "Tus rivales te pasan el trapo en métricas mientras vos contás likes de a uno.",
      ctxSuccess: "Guillote: «El engagement real no se compra, se conquista con carisma.»",
      ctxFail: "Tu competencia te pasa por todos los indicadores mientras vos tomas mate."
    }
  },
  {
    id: "B7",
    name: "🧴 Crema cara: embajadora de lujo",
    desc: "Una marca premium te ofrece ser su embajadora. ¿Te vas a bañar en crema o te hacés la exquisita?",
    optionA: {
      text: "Aceptar campaña",
      rate: 0.60,
      reward: { chem: 8, relProgress: 5 },
      fail: { rep: -5, relProgress: -3 },
      msgSuccess: "Las fotos son una obra de arte. Sumás prestigio y productos gratis de por vida.",
      msgFail: "La crema mancha la ropa de {player} y se arma discusión.",
      ctxSuccess: "Guillote: «Esa crema te va a abrir más puertas que un título de propiedad.»",
      ctxFail: "{player} se manchó el traje nuevo y te hizo dormir en el sillón."
    },
    optionB: {
      text: "Declinar con respeto",
      rate: 0.40,
      reward: { rep: 5, relProgress: 1 },
      fail: { rep: -5, relProgress: -3 },
      msgSuccess: "Te hacés la difícil. Exclusividad mata necesidad.",
      msgFail: "La marca contrata a tu rival directa. La tipa no para de tirarte flores falsas.",
      ctxSuccess: "Guillote: «Saber decir que no también es glamour, no lo hace cualquiera.»",
      ctxFail: "Tu rival factura en dólares mientras vos mirás la promo desde el living."
    }
  },
  {
    id: "B8",
    name: "💬 Guerra de botineras",
    desc: "Una botinera rival te tira una indirecta en pleno programa de televisión. La guerra está declarada.",
    optionA: {
      text: "Responder con todo",
      rate: 0.50,
      reward: { fame: 16, contacts: 10, relProgress: 3 },
      fail: { rep: -15, relProgress: -5 },
      msgSuccess: "Tu respuesta es tan filosa que hasta la producción te pidió autógrafos.",
      msgFail: "Quedás metida en un barro mediático poco elegante.",
      ctxSuccess: "Guillote: «Esa respuesta fue más filosa que un cuchillo de cocina. Te felicito.»",
      ctxFail: "El programa te invita todas las semanas… para reírse de vos en vivo."
    },
    optionB: {
      text: "Ignorar por completo",
      rate: 0.50,
      reward: { rep: 10, relProgress: 2 },
      fail: { rep: -15, relProgress: -5 },
      msgSuccess: "Te hacés la superior. El silencio es más letal que cualquier respuesta.",
      msgFail: "Dicen que te achicaste. Tu rival se agranda y la gente empieza a elegir bando.",
      ctxSuccess: "Guillote: «El silencio bien usado vale más que mil insultos mal dados.»",
      ctxFail: "Tu rival saca un tema musical y ponen velas en las redes por vos."
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