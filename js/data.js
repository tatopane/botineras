// Botineras — Data
const chars = [
  { name: "Wonda Nara", trait: "Negocio y escándalo", img: "images/pixel/webp/wanda-pixel.webp", bonus: { fame: 15, rep: 5 } },
  { name: "La China Suáres", trait: "Química explosiva", img: "images/pixel/webp/china-pixel.webp", bonus: { chem: 12, fame: 13 } },
  { name: "Sasha Ferra", trait: "Todo se hace viral", img: "images/pixel/webp/sasha-pixel.webp", bonus: { fame: 10, contacts: 4 } },
  { name: "Bri Marcas", trait: "Acceso VIP", img: "images/pixel/webp/bri-pixel.webp", bonus: { contacts: 12, rep: 3 } },
  { name: "Jaz Paralta", trait: "Carisma impredecible", img: "images/pixel/webp/jaz-pixel.webp", bonus: { chem: 8, rep: 7 } },
  { name: "Clari Crimaschi", trait: "Las marcas la bancan", img: "images/pixel/webp/clari-pixel.webp", bonus: { rep: 10, fame: 4 } }
];

const tiers = [
  { name: "Barrio", need: 0, players: ["El 9 de Lugano", "El arquero streamer", "La figura del futsal", "El entrenador de Dock Sud"] },
  { name: "Ascenso", need: 30, players: ["El goleador de Chacarita", "La promesa de Atlanta", "El lateral de Temperley", "El 4 de Ferro"] },
  { name: "Primera", need: 80, players: ["Valentin Carbon", "Jose Sasa", "Juanfer Quintino", "Milton Delgade"] },
  { name: "Latam", need: 120, players: ["La figura de Flamengo", "Ronaldinho", "Rodrigo DiPaúl", "Sergio Canales"] },
  { name: "Europa", need: 210, players: ["Vinícius Júniorr", "Jude Bellinghan", "Rafael Leãu", "Dani Olme", "Nico Willian", "Lautaro Martines"] },
  { name: "Champions", need: 320, players: ["Erling Håland", "Kylian M'Bapé", "Lamine Yamall", "Rodrig", "Julián Álvares", "Harry Kane"] }
];

const eventTypes = [
  {
    id: "E1",
    title: "Van a un bar",
    img: "images/pixel/webp/event-bar.webp",
    text: "{player} te invita a tomar algo después del partido.",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Aceptar sin subir nada", 0.72, "La charla fluye y acuerdan una segunda salida.", "La conversación se muere a los veinte minutos.", { chem: 18, rep: 12, relProgress: 18 }, { chem: -5, relProgress: -8 }],
      ["Subir una historia misteriosa", 0.53, "El rumor crece y {player} sigue el juego.", "Se enoja por la exposición y te deja en visto.", { fame: 18, rumors: 1, chem: 14, relProgress: 14 }, { rep: -8, chem: -8, rumors: 1, relProgress: -10 }],
      ["Pedirle a Guillote que arme el encuentro", 0.64, "Guillote consigue mesa privada y todo sale perfecto.", "Guillote aparece con ocho personas más.", { contacts: 16, chem: 14, relProgress: 15 }, { rep: -5, relProgress: -6 }]
    ]
  },
  {
    id: "E2",
    title: "Salida del boliche",
    img: "images/pixel/webp/event-boliche.webp",
    text: "Salís del boliche con {player}. Afuera hay fotógrafos.",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Salir juntos", 0.56, "Las fotos disparan el primer rumor serio.", "{player} se tapa la cara y el gesto queda horrible.", { fame: 22, rumors: 1, chem: 14, relProgress: 15 }, { rep: -9, rumors: 1, relProgress: -10 }],
      ["Salir por separado", 0.74, "La discreción fortalece el vínculo.", "Te vas sola y él termina en otro after.", { rep: 16, chem: 16, relProgress: 18 }, { chem: -8, relProgress: -8 }],
      ["Escapar por la cocina", 0.61, "La aventura los hace reír y suma química.", "Terminás encerrada en el depósito.", { chem: 20, contacts: 10, relProgress: 15 }, { rep: -6, relProgress: -7 }]
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
      ["Ir sin avisar a nadie", 0.63, "El viaje sale perfecto y aparece un romance.", "La reserva estaba a nombre de otra persona.", { chem: 24, rep: 14, relProgress: 20 }, { rep: -10, chem: -7, relProgress: -12 }],
      ["Contárselo a una amiga", 0.49, "La amiga guarda el secreto y te ayuda con todo.", "La amiga se lo cuenta a otra amiga.", { contacts: 14, chem: 16, relProgress: 14 }, { rumors: 2, rep: -8, relProgress: -12 }],
      ["Pedir ubicación en vivo", 0.70, "Evitás sorpresas y el viaje funciona.", "{player} interpreta la cautela como desconfianza.", { rep: 16, chem: 14, relProgress: 16 }, { chem: -5, relProgress: -8 }]
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
      ["Confirmar que se están conociendo", 0.58, "El público compra la historia y el vínculo avanza.", "{player} niega todo en una entrevista.", { fame: 28, chem: 20, rumors: 1, relProgress: 18 }, { rep: -18, chem: -12, rumors: 2, relProgress: -18 }],
      ["Negarlo con elegancia", 0.72, "La intriga crece sin dañar la relación.", "La negación suena demasiado ensayada.", { rep: 22, fame: 14, chem: 6, relProgress: 15 }, { rep: -6, rumors: 1, relProgress: -8 }],
      ["No decir nada", 0.64, "El silencio les permite seguir viéndose.", "El rumor crece más de lo esperado.", { chem: 16, rep: 14, relProgress: 14 }, { rumors: 2, rep: -5, relProgress: -10 }]
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
      ["Aceptar", 0.67, "Empieza un noviazgo confirmado.", "A los pocos días descubre que no estaban entendiendo lo mismo.", { chem: 28, rep: 18, relProgress: 30 }, { chem: -15, rep: -7, relProgress: -20 }],
      ["Pedir tiempo", 0.55, "La honestidad fortalece el vínculo.", "{player} decide seguir adelante sin vos.", { rep: 20, chem: 14, relProgress: 14 }, { chem: -12, relProgress: -15 }],
      ["Responder con un meme", 0.45, "Le causa gracia y terminan formalizando igual.", "No entiende el meme y te bloquea.", { fame: 14, chem: 24, relProgress: 22 }, { chem: -18, rep: -5, relProgress: -20 }]
    ]
  },
  {
    id: "E6",
    title: "Salida en barco",
    img: "images/pixel/webp/event-yatch.webp",
    text: "{player} te invita a dar una vuelta en su lancha.",
    stage: 1,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Aceptar sin preguntar", 0.65, "La charla fluye mientras navegan y el día sale increíble.", "Se descompone en el viaje y el plan termina mal.", { chem: 14, relProgress: 15 }, { chem: -5, relProgress: -8 }],
      ["Preguntar quién más va", 0.55, "Valora tu cautela y van solos en plan íntimo.", "Piensa que estás desconfiada y cancela la salida.", { rep: 12, relProgress: 14 }, { rep: -4, relProgress: -12 }],
      ["Subir historia en biquini", 0.50, "El posteo se vuelve viral y {player} reacciona encantado.", "La prensa hace un escándalo y te critica duramente.", { fame: 18, rumors: 1, relProgress: 10 }, { rep: -8, chem: -5, relProgress: -10 }]
    ]
  },
  {
    id: "E7",
    title: "Ir a su casa a escondidas",
    img: "images/pixel/webp/event-hotel-backdoor.webp",
    text: "{player} te pide que vayas a su country sin que nadie se entere.",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    actions: [
      ["Ir sin avisar", 0.45, "Llegás de sorpresa, cenan juntos y la química explota.", "La guardia del country no te deja entrar y te graba un vecino.", { chem: 22, relProgress: 22 }, { rep: -10, rumors: 2, relProgress: -15 }],
      ["Decirle a una amiga la dirección", 0.60, "Tu amiga te cubre las espaldas y la noche es un éxito.", "Tu amiga le pasa el dato a un periodista y se arma quilombo.", { contacts: 14, chem: 6, relProgress: 16 }, { rumors: 2, rep: -6, relProgress: -10 }],
      ["Pedir que venga él/ella a tu casa", 0.70, "Acepta sin vueltas y demuestra que va en serio.", "Pone excusas y te deja esperando toda la noche.", { rep: 14, chem: 6, relProgress: 12 }, { chem: -5, relProgress: -5 }]
    ]
  },
  {
    id: "E8",
    title: "Rumor de infidelidad",
    img: "images/pixel/webp/event-infidelidad.webp",
    text: "En los programas de chimentos dicen que {player} anda con otra persona.",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    actions: [
      ["Enfrentarlo y aclarar", 0.60, "Tienen una charla honesta, desmiente todo y se unen más.", "Se pone a la defensiva y la discusión se vuelve amarga.", { rep: 16, chem: 14, relProgress: 14 }, { rep: -8, chem: -10, relProgress: -15 }],
      ["Hacerte la desentendida", 0.55, "Tu indiferencia lo intriga y te busca con más ganas.", "El rumor sigue creciendo y quedás como que no te enterás de nada.", { fame: 14, chem: 6, relProgress: 10 }, { rumors: 2, chem: -8, relProgress: -12 }],
      ["Publicar una indirecta en redes", 0.50, "La indirecta explota en Twitter y salís ganando en imagen.", "Quedás como despechada y te llenan de memes.", { fame: 22, contacts: 10, chem: 6, relProgress: 8 }, { rep: -12, rumors: 3, relProgress: -18 }]
    ]
  },
  {
    id: "E9",
    title: "Infidelidad confirmada",
    img: "images/pixel/webp/event-infidelidad.webp",
    text: "Filtran chats y fotos comprometedoras de {player} con otra persona.",
    stage: 2,
    minProgress: 76,
    maxProgress: 100,
    failBreaks: true,
    actions: [
      ["Perdonar y seguir", 0.40, "Te pide disculpas públicas y te regala un auto de lujo.", "Reincide a las dos semanas y la relación se rompe.", { rep: 16, chem: 18, relProgress: 10 }, { rep: -15, chem: -20, relProgress: -30 }],
      ["Terminar con dignidad", 0.85, "Salís fortalecida, con la frente en alto y respeto general.", "La separación es dolorosa y te afecta anímicamente.", { rep: 22, fame: 14, chem: 8, relProgress: -15 }, { rep: -10, chem: -10, relProgress: -20 }],
      ["Exponerlo todo en redes", 0.50, "Tu descargo bate récords de visualizaciones y te consagrás reina mediática.", "Se filtra una contradicción y el escándalo te salpica de lleno.", { fame: 35, contacts: 15, relProgress: -20 }, { rep: -20, rumors: 5, relProgress: -30 }]
    ]
  },
  {
    id: "E10",
    title: "Mudanza exprés",
    img: "images/pixel/webp/event-mudanza.webp",
    text: "{player} te propone irte a vivir con él/ella a su mansión.",
    stage: 2,
    minProgress: 76,
    maxProgress: 100,
    failBreaks: true,
    actions: [
      ["Mudarse juntos", 0.50, "La convivencia es un sueño y la relación se consolida al máximo.", "La rutina y los choques de ego arruinan la magia.", { chem: 26, relProgress: 26 }, { rep: -10, chem: -15, relProgress: -20 }],
      ["Pedir tiempo para pensarlo", 0.65, "Tu madurez le da seguridad y respeta tus tiempos.", "Lo toma como un rechazo y se enfría la pasión.", { rep: 16, chem: 8, relProgress: 10 }, { chem: -8, relProgress: -12 }],
      ["Mudarse pero con contrato", 0.55, "Asegurás tu patrimonio e independencia con mucha clase.", "Sus abogados ponen trabas y se genera desconfianza.", { rep: 18, chem: 6, relProgress: 14 }, { chem: -5, relProgress: -8 }]
    ]
  },
  {
    id: "E11",
    title: "Transferencia a Rusia",
    img: "images/pixel/webp/event-rusia.webp",
    text: "A {player} le ofrecen un pase millonario a un club de Rusia.",
    stage: 2,
    minProgress: 76,
    maxProgress: 100,
    failBreaks: true,
    actions: [
      ["Irse juntos a Rusia", 0.45, "Vivís como una zarina entre pieles, diamantes y amor total.", "El frío y el aislamiento destruyen el romance.", { chem: 28, relProgress: 28, fame: 0 }, { rep: -15, chem: -18, relProgress: -25 }],
      ["Intentar relación a distancia", 0.55, "Los pasajes en primera y las videollamadas mantienen la llama.", "La distancia enfría todo y se apaga el fuego.", { rep: 14, chem: 12, relProgress: 10 }, { chem: -12, relProgress: -15 }],
      ["Terminar antes del viaje", 0.80, "Cerrás la historia en el mejor momento y conservás tu prestigio.", "Queda la sensación de lo que pudo haber sido.", { rep: 18, chem: 6, relProgress: -15 }, { fame: -8, chem: -5, relProgress: -10 }]
    ]
  },
  {
    id: "E12",
    title: "Matrimonio",
    img: "images/pixel/webp/event-wedding.webp",
    text: "{player} te pidió que se case con él/ella. Vestido blanco, cura, todo.",
    stage: 2,
    minProgress: 76,
    maxProgress: 100,
    failBreaks: true,
    actions: [
      ["Aceptar emocionada", 0.55, "El casamiento es un evento de la farándula. Salís en todas las tapas.", "El día de la boda {player} llega tarde y los rumores arruinan la fiesta.", { chem: 32, fame: 30, rep: 15, relProgress: 26 }, { rep: -15, chem: -12, rumors: 3, relProgress: -20 }],
      ["Hacerlo en secreto", 0.65, "Una ceremonia íntima en Punta del Este. Solo los más cercanos.", "Te filtran las fotos igual y el secreto se vuelve escándalo.", { chem: 24, rep: 18, relProgress: 20 }, { rep: -8, rumors: 2, relProgress: -12 }],
      ["Pedir un acuerdo prenupcial", 0.60, "{player} acepta sin dramas y demuestra madurez.", "Los abogados convierten el amor en un contrato frío.", { rep: 20, contacts: 12, chem: 6, relProgress: 12 }, { chem: -8, relProgress: -8 }]
    ]
  },
  {
    id: "E13",
    title: "Tener hijos",
    img: "images/pixel/webp/event-pregnant.webp",
    text: "{player} quiere hablar de formar una familia. No es una pregunta casual.",
    stage: 2,
    minProgress: 76,
    maxProgress: 100,
    failBreaks: true,
    actions: [
      ["Sí, quiero ser madre", 0.50, "La noticia del embarazo es portada de todas las revistas. Felicidad total.", "La presión mediática y las dudas personales generan una crisis inesperada.", { chem: 35, fame: 22, rep: 14, relProgress: 24 }, { chem: -18, rep: -10, rumors: 2, relProgress: -20 }],
      ["Esperar un poco más", 0.60, "{player} respeta tus tiempos y el vínculo se fortalece.", "El 'esperar' se interpreta como un 'no' y la relación se enfría.", { rep: 16, chem: 16, relProgress: 12 }, { chem: -10, relProgress: -12 }],
      ["Ser sincera y decir que no", 0.55, "La honestidad duele pero sienta las bases de una relación madura.", "{player} no supera la noticia y la relación se desmorona.", { rep: 18, chem: 6, relProgress: 10 }, { chem: -20, relProgress: -25 }]
    ]
  },
  {
    id: "E14",
    title: "Embarazo no buscado",
    img: "images/pixel/webp/event-pregnant.webp",
    text: "El test dio positivo. No estaba en los planes. {player} reacciona como puede.",
    stage: 1,
    minProgress: 41,
    maxProgress: 75,
    failBreaks: true,
    actions: [
      ["Afrontarlo juntos", 0.55, "{player} te da la mano y juntos enfrentan la noticia con madurez.", "El miedo puede más y empiezan a echarse culpas.", { chem: 20, rep: 15, relProgress: 15 }, { chem: -15, rep: -10, relProgress: -20 }],
      ["Ocultarlo y seguir", 0.45, "Lo mantienen en secreto y el rumor las convierte en reinas del misterio.", "Los filtran todo y el escándalo mediático destruye la confianza.", { fame: 25, rumors: 2, relProgress: 8 }, { rep: -18, chem: -12, rumors: 4, relProgress: -20 }],
      ["Hablar con Guillote para manejarlo", 0.60, "Guillote negocia un acuerdo de confidencialidad y salen fortalecidos.", "Guillote se va de boca en un programa y el quilombo es total.", { rep: 12, contacts: 10, relProgress: 10 }, { rep: -15, rumors: 3, relProgress: -15 }]
    ]
  },
  {
    id: "E15",
    title: "El asado del plantel",
    img: "images/pixel/webp/event-asado.webp",
    text: "{player} te invita a un asado informal al mediodía con compañeros del equipo en una quinta.",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Llevar el postre y charlar con todos", 0.70, "Te ganás la simpatía del grupo y {player} valora tu buena onda.", "Hacés un comentario desafortunado sobre el último partido y se corta el clima.", { rep: 14, contacts: 12, chem: 12, relProgress: 15 }, { rep: -6, relProgress: -6 }],
      ["Copar los mates y quedarte a solas con él", 0.65, "Pasan la tarde entre risas, anécdotas íntimas y mucha química.", "Se pone a jugar al truco con los pibes y te deja colgada toda la tarde.", { chem: 18, rep: 10, relProgress: 18 }, { chem: -8, relProgress: -8 }],
      ["Caer con dos amigas influencers", 0.48, "El asado se vuelve fiesta viral y sos el centro de atención de todos.", "Una de tus amigas sube historias indiscretas y el DT llama para putear.", { fame: 20, contacts: 14, chem: 10, relProgress: 12 }, { rep: -10, rumors: 2, relProgress: -12 }]
    ]
  },
  {
    id: "E16",
    title: "Invitación al palco VIP",
    img: "images/pixel/webp/event-estadio.webp",
    text: "{player} te deja dos accesos exclusivos en el palco del estadio para verlo jugar el clásico.",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Ir con look sobrio y perfil bajo", 0.72, "La prensa no te quema y {player} te agradece la discreción al salir.", "Te aburrís en el palco y las cámaras captan tus gestos de disgusto.", { rep: 16, chem: 14, relProgress: 16 }, { chem: -5, relProgress: -6 }],
      ["Gritar los goles con outfit de marca", 0.54, "La transmisión oficial te enfoca varias veces y explotan tus redes sociales.", "Te enfocan justo bostezando en una jugada clave: meme nacional instantáneo.", { fame: 22, chem: 12, rumors: 1, relProgress: 14 }, { rep: -8, relProgress: -8 }],
      ["Hacer sociales con dirigentes y sponsors", 0.62, "Pegás contactos de primer nivel corporativo para futuros contratos.", "{player} siente que fuiste a hacer negocios y no a verlo a él en la cancha.", { contacts: 18, rep: 8, relProgress: 10 }, { chem: -10, relProgress: -8 }]
    ]
  },
  {
    id: "E17",
    title: "Fueguito a las 3 AM",
    img: "images/pixel/webp/event-mobile.webp",
    text: "{player} te reacciona con tres fueguitos a una historia en bikini en la madrugada.",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Clavarle el visto hasta la tarde", 0.68, "Hacerte desear funciona: te manda un mensaje buscando charla en serio.", "Piensa que no hay interés mutuo y se va a chamuyar a otra por DM.", { rep: 14, chem: 16, relProgress: 15 }, { chem: -8, relProgress: -8 }],
      ["Responderle con una selfie al instante", 0.50, "El ida y vuelta nocturno enciende la química al máximo.", "Te responde con un sticker genérico y te deja pagando toda la noche.", { chem: 22, fame: 10, relProgress: 18 }, { chem: -8, rep: -6, relProgress: -10 }],
      ["Subir captura tapándole el nombre", 0.52, "El misterio explota en redes y todos intentan adivinar quién es el jugador.", "Se reconoce su foto de perfil pixelada y se enoja por ventilar el chat privado.", { fame: 18, rumors: 1, chem: 10, relProgress: 12 }, { rep: -10, rumors: 2, relProgress: -12 }]
    ]
  },
  {
    id: "E18",
    title: "Aparición en el stream",
    img: "images/pixel/webp/event-mobile.webp",
    text: "{player} está prendiendo directo en Twitch con amigos y te insinúa que te sumes a la llamada.",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Sumarte con carisma y chistes", 0.60, "El chat enloquece con el shippeo en vivo y sumás miles de seguidores.", "Hacés un comentario desafortunado y te clipéan en TikTok para la burla.", { fame: 22, chem: 14, relProgress: 16 }, { rep: -10, rumors: 2, relProgress: -10 }],
      ["Pasar por atrás 'sin querer' bien producida", 0.65, "El chat lo nota al instante; misterio, glamour y elegancia total.", "Tropezás con los cables y volteás la luz del setup en plena transmisión.", { fame: 16, rep: 14, relProgress: 12 }, { rep: -6, chem: -6, relProgress: -8 }],
      ["Rechazar el stream y pedir llamada privada", 0.70, "Corta el stream temprano para hablar con vos a solas toda la noche.", "Prefiere seguir jugando con la comunidad y se olvida de escribirte.", { chem: 18, rep: 12, relProgress: 16 }, { chem: -8, relProgress: -6 }]
    ]
  },
  {
    id: "E19",
    title: "Cita incógnita en Puerto Madero",
    img: "images/pixel/webp/event-restaurant.webp",
    text: "{player} te propone una merienda tranquila en una terraza privada para conocerse lejos de la noche.",
    stage: 0,
    minProgress: 0,
    maxProgress: 40,
    actions: [
      ["Charla íntima sobre proyectos de vida", 0.75, "Conectan desde un lugar genuino y la química entre los dos vuela.", "La conversación se vuelve un interrogatorio denso y aburrido.", { chem: 16, rep: 16, relProgress: 18 }, { chem: -6, relProgress: -6 }],
      ["Foto estética con el reloj de él asomando", 0.55, "En redes reconocen su reloj de lujo y se dispara tu cotización mediática.", "{player} se da cuenta del encuadre forzado y te pide que bajes la foto.", { fame: 20, rumors: 1, chem: 12, relProgress: 14 }, { rep: -10, chem: -8, relProgress: -10 }],
      ["Llevarle un detalle personalizado", 0.62, "El gesto lo descoloca para bien y queda completamente fascinado.", "El regalo le parece exagerado e invasivo para una primera salida.", { chem: 18, contacts: 10, relProgress: 16 }, { rep: -6, relProgress: -8 }]
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
    img: "images/pixel/webp/event-viaje.webp",
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
      reward: { chem: 25, fame: 18, relProgress: 15 },
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
      reward: { fame: 40, contacts: 15, relProgress: 3 },
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
      reward: { fame: 30, relProgress: 3 },
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
      reward: { fame: 16, contacts: 10, relProgress: 3 },
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