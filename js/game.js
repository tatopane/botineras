// Botineras — Game logic
let selected=0,g={},activeScreen="setup";

function score(){return g.fame+g.rep+g.contacts+g.chem-g.rumors*5}

function updateTier(){for(let i=tiers.length-1;i>=0;i--)if(score()>=tiers[i].need){g.tier=i;break}}

function startGame(){
 let c=chars[selected],img=document.getElementById("img"+selected).src;
 g={name:c.name,img,age:18,tier:0,turn:0,fame:4,rep:6,contacts:6,chem:5,rumors:0,couples:0,relations:[],stage:0,player:null,event:null};
 Object.entries(c.bonus).forEach(([k,v])=>g[k]+=v);
 hideStatInfo();
 document.getElementById("stickyHeader")?.classList.remove("visible");
 showScreen("game");next();
 setTimeout(()=>{
  const target=document.getElementById("statsCard")||document.getElementById("game");
  if(target)target.scrollIntoView({behavior:"smooth",block:"start"});
 },60);
}

function next(){
 updateTier();
 if(!g.player)g.player=tiers[g.tier].players[Math.floor(Math.random()*tiers[g.tier].players.length)];
 g.stage=Math.min(4,g.stage);g.event=eventTypes[g.stage];
 const rankText=`${tiers[g.tier].name.toUpperCase()} — ${g.player}`;
 const ageText=`${g.name}, ${g.age} años`;
 document.getElementById("rank").textContent=rankText;
 document.getElementById("c_rank").textContent=rankText;
 document.getElementById("age").textContent=ageText;
 document.getElementById("c_age").textContent=ageText;
 document.getElementById("scene").src=g.event.img;
 document.getElementById("title").textContent=g.event.title;
 document.getElementById("story").textContent=g.event.text.replaceAll("{player}",g.player);
 document.getElementById("mentor").innerHTML=Math.random()<.45?`<div class="mentor">🕴️ <b>Guillote Coppolo:</b> “${["Primero la segunda salida, después la portada.","Un rumor bien llevado vale por dos contactos.","Nunca confirmes antes del postre.","Si te bloquea, era una prueba de carácter."][Math.floor(Math.random()*4)]}”</div>`:"";
 document.getElementById("choices").innerHTML=g.event.actions.map((a,i)=>`<button class="choice" onclick="resolve(${i})"><strong>${a[0]}</strong>Puede avanzar la relación o hacerla retroceder.</button>`).join("");
 document.getElementById("result").innerHTML="";upd();
}

function resolve(i){
 let a=g.event.actions[i],p=a[1]+Math.min(.1,g.rep/500)+Math.min(.08,g.chem/500)-Math.min(.1,g.rumors*.02),ok=Math.random()<p,eff=ok?a[4]:a[5],msg=(ok?a[2]:a[3]).replaceAll("{player}",g.player);
 if(typeof trackEvent==='function'){
  trackEvent('click_game_choice',{choice_index:i,choice_text:a[0],event_title:g.event.title,stage:g.stage,player:g.player,tier_name:tiers[g.tier].name});
  trackEvent('game_event_outcome',{outcome:ok?'success':'failure',event_title:g.event.title,player:g.player});
 }
 Object.entries(eff).forEach(([k,v])=>g[k]=Math.max(0,g[k]+v));
 if(ok){
   if(g.stage===0)g.relations.push({player:g.player,status:"Primera salida"});
   if(g.stage===1)upRel("Rumor fuerte");
   if(g.stage===2)upRel("Romance");
   if(g.stage===3)upRel("Romance confirmado");
   if(g.stage===4){upRel("Noviazgo");g.couples++;g.stage=0;g.player=null}
   else g.stage++;
 }else{
   if(g.chem<5||Math.random()<.25){upRel("Terminó mal");g.stage=0;g.player=null}
 }
 document.getElementById("result").innerHTML=`<div class="result ${ok?'ok':'bad'}"><div class="big">${ok?'✅':'❌'}</div><b>${ok?'Te salió bien':'Mala jugada'}</b><p>${msg}</p><button onclick="continueGame()">Seguir</button></div>`;
 document.getElementById("choices").innerHTML="";
 document.getElementById("log").innerHTML=`<p class="${ok?'green':'red'}">${ok?'🟢':'🔴'} ${msg}</p>`+document.getElementById("log").innerHTML;
 upd();
}

function upRel(status){
 let r=[...g.relations].reverse().find(x=>x.player===g.player&&x.status!=="Terminó mal");
 if(r)r.status=status;else g.relations.push({player:g.player,status});
}

function continueGame(){g.turn++;if(g.turn%3===0)g.age++;if(g.turn>=24){finish();return}next()}

function finish(){
 showScreen("final");
 const finalTitle=g.couples>=3?"👑 REINA INTERNACIONAL":g.couples>=1?"❤️ CARRERA CONSOLIDADA":"🍸 MUCHO RUMOR, POCO NOVIAZGO";
 document.getElementById("finalTitle").textContent=finalTitle;
 document.getElementById("finalText").innerHTML=`<b>${g.name}</b> terminó su carrera a los <b>${g.age} años</b> en categoría <b>${tiers[g.tier].name}</b> con <b>${g.couples} noviazgos</b> y <b>${g.relations.length} historias sentimentales</b>.<br><br>` +
  `⭐ Fama: ${g.fame} · 🧠 Reputación: ${g.rep} · 🤝 Contactos: ${g.contacts}<br>` +
  `🔥 Química: ${g.chem} · 💬 Rumores: ${g.rumors} · ❤️ Noviazgos: ${g.couples}`;
 if(typeof trackEvent==='function'){
  trackEvent('game_finish',{final_title:finalTitle,final_tier:tiers[g.tier].name,total_couples:g.couples,total_fame:g.fame,total_rep:g.rep,total_contacts:g.contacts,total_chem:g.chem,total_rumors:g.rumors,final_age:g.age});
 }
}

function end(){
 g={
  name:g.name||"Wonda Nara",
  img:g.img||chars[0].img,
  age:26,tier:5,turn:24,fame:185,rep:95,contacts:90,chem:80,rumors:1,couples:3,
  relations:[
   {player:"El 9 de Lugano",status:"Noviazgo"},
   {player:"Julián Álvares",status:"Noviazgo"},
   {player:"Erling Håland",status:"Noviazgo"}
  ],
  stage:4,player:"Erling Håland",event:eventTypes[4]
 };
 finish();
}
window.end=end;
