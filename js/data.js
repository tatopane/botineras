// Botineras — Data
const chars=[
{name:"Wonda Nara",trait:"Negocio y escándalo",img:"images/pixel/webp/wanda-pixel.webp",bonus:{fame:8,rep:4}},
{name:"La China Suáres",trait:"Química explosiva",img:"images/pixel/webp/china-pixel.webp",bonus:{chem:12,fame:5}},
{name:"Sasha Ferra",trait:"Todo se hace viral",img:"images/pixel/webp/sasha-pixel.webp",bonus:{fame:12,contacts:4}},
{name:"Bri Marcas",trait:"Acceso VIP",img:"images/pixel/webp/bri-pixel.webp",bonus:{contacts:12,rep:3}},
{name:"Jaz Peraltaa",trait:"Carisma impredecible",img:"images/pixel/webp/jaz-pixel.webp",bonus:{chem:8,rep:7}},
{name:"Clari Cremaschi",trait:"Las marcas la bancan",img:"images/pixel/webp/clari-pixel.webp",bonus:{rep:10,fame:4}}
];

const tiers=[
{name:"Barrio",need:0,players:["El 9 de Lugano","El arquero streamer","La figura del futsal","El entrenador de Dock Sud"]},
{name:"Ascenso",need:25,players:["El goleador de Chacarita","La promesa de Atlanta","El lateral de Temperley","El 4 de Ferro"]},
{name:"Primera",need:55,players:["Valentin Carbon","Jose Sasa","Juanfer Quintino","Milton Delgade"]},
{name:"Latam",need:90,players:["La figura de Flamengo","Ronaldinho","Rodrigo DiPaúl","Sergio Canales"]},
{name:"Europa",need:130,players:["Vinícius Júniorr","Jude Bellinghan","Rafael Leãu","Dani Olme","Nico Willian","Lautaro Martines"]},
{name:"Champions",need:175,players:["Erling Håland","Kylian M'Bapé","Lamine Yamall","Rodrig","Julián Álvares","Harry Kane"]}
];

const eventTypes=[
{title:"Primera salida",img:"images/pixel/webp/event-bar.webp",text:"{player} te invita a tomar algo después del partido.",actions:[
["Aceptar sin subir nada",.72,"La charla fluye y acuerdan una segunda salida.","La conversación se muere a los veinte minutos.",{chem:12,rep:7},{chem:-5}],
["Subir una historia misteriosa",.53,"El rumor crece y {player} sigue el juego.","Se enoja por la exposición y te deja en visto.",{fame:13,rumors:1,chem:7},{rep:-8,chem:-8,rumors:1}],
["Pedirle a Guillote que arme el encuentro",.64,"Guillote consigue mesa privada y todo sale perfecto.","Guillote aparece con ocho personas más.",{contacts:11,chem:8},{rep:-5}]
]},
{title:"Después del boliche",img:"images/pixel/webp/event-boliche.webp",text:"Salís del boliche con {player}. Afuera hay fotógrafos.",actions:[
["Salir juntos",.56,"Las fotos disparan el primer rumor serio.","{player} se tapa la cara y el gesto queda horrible.",{fame:16,rumors:1,chem:8},{rep:-9,rumors:1}],
["Salir por separado",.74,"La discreción fortalece el vínculo.","Te vas sola y él termina en otro after.",{rep:11,chem:10},{chem:-8}],
["Escapar por la cocina",.61,"La aventura los hace reír y suma química.","Terminás encerrada en el depósito.",{chem:14,contacts:5},{rep:-6}]
]},
{title:"Viaje sorpresa",img:"images/pixel/webp/event-viaje.webp",text:"{player} te invita a viajar por dos días.",actions:[
["Ir sin avisar a nadie",.63,"El viaje sale perfecto y aparece un romance.","La reserva estaba a nombre de otra persona.",{chem:18,rep:8},{rep:-10,chem:-7}],
["Contárselo a una amiga",.49,"La amiga guarda el secreto y te ayuda con todo.","La amiga se lo cuenta a otra amiga.",{contacts:8,chem:10},{rumors:2,rep:-8}],
["Pedir ubicación en vivo",.7,"Evitás sorpresas y el viaje funciona.","{player} interpreta la cautela como desconfianza.",{rep:10,chem:8},{chem:-5}]
]},
{title:"La foto filtrada",img:"images/pixel/webp/event-restaurant.webp",text:"Aparece una foto tuya con {player} en un restaurante.",actions:[
["Confirmar que se están conociendo",.58,"El público compra la historia y el vínculo avanza.","{player} niega todo en una entrevista.",{fame:20,chem:12,rumors:1},{rep:-18,chem:-12,rumors:2}],
["Negarlo con elegancia",.72,"La intriga crece sin dañar la relación.","La negación suena demasiado ensayada.",{rep:15,fame:9},{rep:-6,rumors:1}],
["No decir nada",.64,"El silencio les permite seguir viéndose.","El rumor crece más de lo esperado.",{chem:10,rep:8},{rumors:2,rep:-5}]
]},
{title:"Exclusividad",img:"images/pixel/webp/event-exclusividad.webp",text:"{player} te pregunta si querés dejar de verse con otras personas.",actions:[
["Aceptar",.67,"Empieza un noviazgo confirmado.","A los pocos días descubre que no estaban entendiendo lo mismo.",{chem:22,rep:12},{chem:-15,rep:-7}],
["Pedir tiempo",.55,"La honestidad fortalece el vínculo.","{player} decide seguir adelante sin vos.",{rep:13,chem:7},{chem:-12}],
["Responder con un meme",.45,"Le causa gracia y terminan formalizando igual.","No entiende el meme y te bloquea.",{fame:8,chem:18},{chem:-18,rep:-5}]
]}
];

const statInfo = {
 fame: { title: "⭐ Fama", desc: "Tu alcance mediático, nivel de notoriedad y presencia en prensa y redes sociales." },
 rep: { title: "🧠 Reputación", desc: "Tu prestigio e imagen pública. Una alta reputación genera confianza y aumenta tus probabilidades de éxito en cada salida." },
 contacts: { title: "🤝 Contactos", desc: "Tu red de influencias y accesos VIP en la farándula para organizar mejores encuentros." },
 chem: { title: "🔥 Química", desc: "La atracción y conexión romántica con tu pareja actual. Si cae demasiado, la relación puede terminar de golpe." },
 rumors: { title: "💬 Rumores", desc: "Escándalos y chismes mediáticos sin controlar. Perjudican tu estatus y aumentan el riesgo de ser dejada en visto." },
 couples: { title: "❤️ Noviazgos", desc: "Relaciones confirmadas y formalizadas exitosamente a lo largo de tu carrera." }
};
