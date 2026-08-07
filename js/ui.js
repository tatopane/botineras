// Botineras — UI render
function build(){
 document.getElementById("people").innerHTML=chars.map((c,i)=>`<div class="person ${i===0?'sel':''}" onclick="pick(${i},this)">
 <img id="img${i}" src="${c.img}" alt="${c.name}" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22230%22><rect fill=%22%232d2f3b%22 width=%22400%22 height=%22230%22/><text x=%22200%22 y=%22130%22 text-anchor=%22middle%22 fill=%22%23bbb%22 font-size=%2230%22 font-family=%22sans-serif%22>Sin foto</text></svg>'"><div class="info"><h3>${c.name}</h3><div class="trait">${c.trait}</div></div></div>`).join("");
}

function showScreen(screenId){
 ["setup","game","final","guide"].forEach(id=>{
  const el=document.getElementById(id);
  if(el)el.classList.add("hidden");
 });
 document.getElementById(screenId).classList.remove("hidden");
 if(screenId!=="guide")activeScreen=screenId;
 if(screenId!=="game")document.getElementById("stickyHeader")?.classList.remove("visible");
 if(typeof trackEvent==='function')trackEvent('screen_view',{screen_name:screenId});
}

function toggleGuide(){
 const guide=document.getElementById("guide");
 const isOpening=guide.classList.contains("hidden");
 if(typeof trackEvent==='function')trackEvent('click_toggle_guide',{action:isOpening?'open':'close',from_screen:activeScreen});
 if(isOpening){showScreen("guide")}else{showScreen(activeScreen)}
}

function showStatInfo(key){
 const info = statInfo[key];
 if(!info) return;
 if(typeof trackEvent==='function')trackEvent('click_stat_info',{stat_key:key});
 document.getElementById("statTooltipTitle").textContent = info.title;
 document.getElementById("statTooltipText").textContent = info.desc;
 document.getElementById("statTooltip").classList.remove("hidden");
}

function hideStatInfo(){
 document.getElementById("statTooltip").classList.add("hidden");
}

function initStickyObserver(){
 const card=document.getElementById("statsCard");
 const header=document.getElementById("stickyHeader");
 if(!card||!header)return;
 const obs=new IntersectionObserver(([e])=>{
  const isGameActive=activeScreen==="game";
  const scrolledPast=e.boundingClientRect.top<=60;
  header.classList.toggle("visible",isGameActive&&!e.isIntersecting&&scrolledPast);
 },{rootMargin:"-60px 0px 0px 0px",threshold:[0]});
 obs.observe(card);
}

function pick(i,e){
 selected=i;
 if(typeof trackEvent==='function')trackEvent('click_select_character',{character_name:chars[i].name,trait:chars[i].trait});
 document.querySelectorAll(".person").forEach(x=>x.classList.remove("sel"));if(e)e.classList.add("sel");startGame()
}

function upd(){
 document.getElementById("fame").textContent=g.fame;document.getElementById("rep").textContent=g.rep;document.getElementById("contacts").textContent=g.contacts;document.getElementById("chem").textContent=g.chem;document.getElementById("rumors").textContent=g.rumors;document.getElementById("couples").textContent=g.couples;
 document.getElementById("c_fame").textContent=g.fame;document.getElementById("c_rep").textContent=g.rep;document.getElementById("c_contacts").textContent=g.contacts;document.getElementById("c_chem").textContent=g.chem;document.getElementById("c_rumors").textContent=g.rumors;document.getElementById("c_couples").textContent=g.couples;
 if(g.name&&g.age)document.getElementById("c_age").textContent=`${g.name}, ${g.age} años`;
 if(g.tier!==undefined&&g.player)document.getElementById("c_rank").textContent=`${tiers[g.tier].name.toUpperCase()} — ${g.player}`;
 const barWidth=Math.min(100,score()/2.1)+"%";
 document.getElementById("bar").style.width=barWidth;
 const cBar=document.getElementById("c_bar");if(cBar)cBar.style.width=barWidth;
 document.getElementById("relations").innerHTML=g.relations.length?g.relations.map(r=>`<div class="rel"><div class="face">⚽</div><div><b>${r.status}</b><br>${r.player}</div></div>`).join(""):'<span style="color:#999">Todavía nada confirmado.</span>';
}

function shareWhatsApp(){
 const origin=window.location.origin;
 const shareUrl=`${origin}/desafiame`;
 const finalTitle=document.getElementById("finalTitle").textContent;
 const tierName=tiers[g.tier].name;
 const text=`${finalTitle}\n`+
  `Jugué como ${g.name} en Botineras 👠\n`+
  `Categoría alcanzada: ${tierName}\n\n`+
  `Métricas de mi carrera:\n`+
  `⭐ Fama: ${g.fame}\n`+
  `🧠 Reputación: ${g.rep}\n`+
  `🤝 Contactos: ${g.contacts}\n`+
  `🔥 Química: ${g.chem}\n`+
  `💬 Rumores: ${g.rumors}\n`+
  `❤️ Noviazgos: ${g.couples}\n\n`+
  `Probá tu carrera de botinera: ${shareUrl}`;
 if(typeof trackEvent==='function'){
  trackEvent('click_share_whatsapp',{final_title:finalTitle,final_tier:tierName,character_name:g.name,final_age:g.age,utm_source:'whatsapp'});
 }
 const waUrl=`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
 window.open(waUrl,'_blank');
}

// Init
build();
initStickyObserver();
