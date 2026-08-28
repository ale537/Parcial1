const KEY = "clase_a_clase_cursos_v6";

function getCourses(){ return JSON.parse(localStorage.getItem(KEY)||"[]"); }
function setCourses(courses){ localStorage.setItem(KEY,JSON.stringify(courses)); }
function escapeHtml(value){ const e=document.createElement("div"); e.textContent=value||""; return e.innerHTML; }
function requireSession(){ if(!sessionStorage.getItem("clase_a_clase_session")) location.href="inicio_sesion.html"; }

function setupMenu(){
  const button=document.getElementById("menuToggle"), nav=document.getElementById("nav");
  if(!button||!nav)return;
  button.onclick=()=>{ nav.classList.toggle("open"); button.textContent=nav.classList.contains("open")?"×":"☰"; };
}

function setupLogout(){
  const btn=document.getElementById("logoutBtn"), modal=document.getElementById("logoutModal");
  if(!btn||!modal)return;
  btn.onclick=e=>{e.preventDefault();modal.classList.add("show");};
  document.getElementById("cancelLogout").onclick=()=>modal.classList.remove("show");
  document.getElementById("confirmLogout").onclick=()=>{sessionStorage.removeItem("clase_a_clase_session");location.href="inicio_sesion.html";};
  modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show");};
}

function defaultUnits(){ return ["Introducción","Entidades Primitivas","Técnicas para la Formulación de Algoritmos","Estructuras Algorítmicas","Arreglos","Manejo de Módulos"]; }

function officialExample(){
  const units=defaultUnits();
  const rows=[
    [1,"02","04",units[0],"Los computadores, evolución, partes, periféricos; programación, conceptos básicos, algoritmo y Python","Clase presencial. Explicación magistral utilizando presentación. Actividad de conocimiento publicada en Moodle. RA 1",4],
    [2,"02","11",units[0],"Programación, conceptos básicos, algoritmo, tipos y representación de algoritmos; lenguaje Python","Clase presencial. Actividades de conocimiento y desempeño. Ejercicios prácticos en clase. RA 1",4],
    [3,"02","18",units[1],"Tipos de datos, variables y constantes, expresiones, operadores, operandos y jerarquía de operadores","Clase presencial. Actividades de conocimiento y desempeño. Ejercicios prácticos en clase. RA 2",4],
    [4,"02","25",units[2],"Diagrama de flujo, diagrama estructurado Nassi-Schneiderman y pseudocódigo","Clase presencial. Actividades en Moodle y ejercicios prácticos. RA 2",4],
    [5,"03","04",units[3],"Estructuras secuenciales: asignación, entrada y salida","Clase presencial. Actividades de conocimiento y desempeño en Moodle. Ejercicios prácticos. RA 2",4],
    [6,"03","11","Evaluación","PRIMER EXAMEN PARCIAL","Examen presencial utilizando la plataforma Moodle para el desarrollo del mismo.",4],
    [7,"03","18",units[3],"Estructuras secuenciales: asignación, entrada y salida","Clase presencial. Actividades y ejercicios prácticos. RA 3",4],
    [8,"03","25",units[3],"Estructuras secuenciales: asignación, entrada y salida","Clase presencial. Actividades y ejercicios prácticos de forma independiente. RA 3",4],
    [9,"04","08",units[3],"Estructuras condicionales: simples y múltiples","Clase presencial. Actividades en Moodle y ejercicios prácticos. RA 2 y RA 3",4],
    [10,"04","15",units[3],"Ciclos repetitivos: For y While","Clase presencial. Actividades en Moodle y ejercicios prácticos. RA 2 y RA 3",4],
    [11,"04","22","Evaluación","SEGUNDO EXAMEN PARCIAL","Examen presencial utilizando la plataforma Moodle para el desarrollo del mismo.",4],
    [12,"04","29",units[3],"Ciclos repetitivos: For y While","Clase presencial. Actividades y ejercicios prácticos. RA 2 y RA 3",4],
    [13,"05","06",units[3],"Ciclos repetitivos: For y While","Clase presencial. Actividades y ejercicios prácticos. RA 2 y RA 3",4],
    [14,"05","13",units[4],"Arreglos: definición, vectores y matrices","Clase presencial. Actividades en Moodle y ejercicios prácticos.",4],
    [15,"05","20",units[4],"Arreglos: definición, vectores y matrices","Clase presencial. Actividades en Moodle y ejercicios prácticos.",4],
    [16,"05","27",units[5],"Manejo de módulos: definición, funciones y manipulación","Clase presencial. Actividades en Moodle y ejercicios prácticos.",4],
    [17,"06","03","Evaluación","EXAMEN FINAL","Examen presencial utilizando la plataforma Moodle para el desarrollo del mismo.",0]
  ];
  const weeks={};
  rows.forEach(([n,m,d,unit,topic,methodology,hours])=>weeks[n]={month:m,day:d,unit,topic,objective:"Desarrollar las competencias y resultados de aprendizaje correspondientes a la unidad.",content:topic,methodology,activity:"Actividad de conocimiento y desempeño según la planeación.",resources:"Presentación, ejercicios prácticos y Moodle.",observations:"",directHours:String(hours)});
  return {id:"oficial-"+Date.now(),name:"Fundamentos de Programación",code:"70560-4C - 0117",faculty:"Ingenierías",program:"Ingeniería Química (C730)",semester:"I",period:"2026-I",credits:"4",presentialHours:"64",independentHours:"128",professorName:"Ronald Martelo Ching",professorEmail:"ronald.martelo@usbctg.edu.co",ra1:"Especificar las entradas y salidas requeridas de acuerdo con la información recolectada.",ra2:"Construir algoritmos de acuerdo a los requerimientos del sistema, utilizando herramientas de representación.",ra3:"Codificar los módulos del sistema y el programa principal utilizando la herramienta de desarrollo para algoritmos seleccionada.",description:"Planeación académica de Fundamentos de Programación.",units,weeks};
}

function renderCourses(){
  const container=document.getElementById("courses"); if(!container)return;
  const courses=getCourses(); document.getElementById("courseCount").textContent=courses.length;
  container.innerHTML=courses.map(c=>`<article class="course-card"><span class="tag">${escapeHtml(c.code||"CURSO")}</span><h2>${escapeHtml(c.name)}</h2><p>${escapeHtml(c.description||"Sin descripción")}</p><p class="course-meta">${escapeHtml(c.faculty||"Facultad no especificada")}<br>${escapeHtml(c.program||"Programa no especificado")} · Semestre ${escapeHtml(c.semester||"-")}</p><div class="card-actions"><button class="secondary" onclick="enterCourse('${c.id}')">Gestionar semanas</button><button class="edit" onclick="editCourse('${c.id}')">Editar</button><button class="edit" onclick="deleteCourse('${c.id}')">Eliminar</button></div></article>`).join("");
  document.getElementById("empty").style.display=courses.length?"none":"block";
}
function enterCourse(id){location.href=`curso.html?id=${encodeURIComponent(id)}`;}
function openCourseModal(course=null){
  document.getElementById("courseModal").classList.add("show");
  document.getElementById("courseModalTitle").textContent=course?"Editar curso":"Crear nuevo curso";
  const ids=["courseId","courseName","courseCode","faculty","program","semester","period","credits","presentialHours","independentHours","professorName","professorEmail","ra1","ra2","ra3","description","unit1","unit2","unit3","unit4","unit5","unit6"];
  ids.forEach(id=>document.getElementById(id).value="");
  if(course){
    const map={courseId:"id",courseName:"name",courseCode:"code",faculty:"faculty",program:"program",semester:"semester",period:"period",credits:"credits",presentialHours:"presentialHours",independentHours:"independentHours",professorName:"professorName",professorEmail:"professorEmail",ra1:"ra1",ra2:"ra2",ra3:"ra3",description:"description"};
    Object.entries(map).forEach(([id,key])=>document.getElementById(id).value=course[key]||"");
    (course.units||defaultUnits()).forEach((u,i)=>document.getElementById("unit"+(i+1)).value=u);
  }else defaultUnits().forEach((u,i)=>document.getElementById("unit"+(i+1)).value=u);
}
function editCourse(id){const c=getCourses().find(x=>x.id===id);if(c)openCourseModal(c);}
function deleteCourse(id){if(!confirm("¿Deseas eliminar este curso y toda su planeación semanal?"))return;setCourses(getCourses().filter(c=>c.id!==id));renderCourses();}
function saveCourseFromForm(){
  const courses=getCourses(), id=document.getElementById("courseId").value||Date.now().toString(), existing=courses.find(c=>c.id===id);
  const units=[1,2,3,4,5,6].map(n=>document.getElementById("unit"+n).value.trim()).filter(Boolean);
  const c={id,name:courseName.value.trim(),code:courseCode.value.trim(),faculty:faculty.value.trim(),program:program.value.trim(),semester:semester.value.trim(),period:period.value.trim(),credits:credits.value.trim(),presentialHours:presentialHours.value.trim(),independentHours:independentHours.value.trim(),professorName:professorName.value.trim(),professorEmail:professorEmail.value.trim(),ra1:ra1.value.trim(),ra2:ra2.value.trim(),ra3:ra3.value.trim(),description:description.value.trim(),units,weeks:existing?.weeks||{}};
  const i=courses.findIndex(x=>x.id===id); if(i>=0)courses[i]=c;else courses.push(c);setCourses(courses);document.getElementById("courseModal").classList.remove("show");renderCourses();
}
function initCourses(){
  renderCourses();newCourse.onclick=()=>openCourseModal();emptyNew.onclick=()=>openCourseModal();
  const modal=document.getElementById("courseModal");modal.querySelector(".close").onclick=()=>modal.classList.remove("show");modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show");};
  courseForm.onsubmit=e=>{e.preventDefault();saveCourseFromForm();};
}

function getCourseFromUrl(){return getCourses().find(c=>c.id===new URLSearchParams(location.search).get("id"));}
function saveCurrentCourse(course){const cs=getCourses(),i=cs.findIndex(c=>c.id===course.id);if(i>=0){cs[i]=course;setCourses(cs);}}
function specialTitle(n){return n===6?"PRIMER EXAMEN PARCIAL":n===11?"SEGUNDO EXAMEN PARCIAL":n===17?"EXAMEN FINAL":"";}
function specialWeek(n){return [6,11,17].includes(n);}
function weekDetails(w){const details=[["Mes",w.month],["Día",w.day],["Unidad",w.unit],["Tema",w.topic],["Objetivo",w.objective],["Contenido",w.content],["Actividad o evaluación",w.activity],["Recursos",w.resources],["Observaciones",w.observations],["Horas de trabajo directo",w.directHours]];return details.filter(([,v])=>v!==undefined&&v!=="").map(([t,v])=>`<div class="detail"><strong>${t}</strong><span>${escapeHtml(v)}</span></div>`).join("");}

function renderUnitNav(course){
  const nav=document.getElementById("unitNav"); if(!nav)return;
  const units=course.units||defaultUnits();
  nav.innerHTML=units.map((u,i)=>`<button data-unit="${escapeHtml(u)}">Unidad ${i+1}: ${escapeHtml(u)}</button>`).join("");
  nav.querySelectorAll("button").forEach(b=>b.onclick=()=>{
    const target=[...document.querySelectorAll(".week")].find(w=>w.dataset.unit===b.dataset.unit);
    if(target){target.scrollIntoView({behavior:"smooth",block:"center"});target.classList.add("flash");setTimeout(()=>target.classList.remove("flash"),1200);}
  });
}

function renderWeeks(){
  const course=getCourseFromUrl();if(!course){location.href="index.html";return;}course.weeks=course.weeks||{};
  courseTitle.textContent=course.name;courseMeta.textContent=[course.code,course.program,course.semester?"Semestre "+course.semester:"",course.period].filter(Boolean).join(" · ");
  const completed=Object.keys(course.weeks).length;document.getElementById("completed").textContent=completed;document.getElementById("progress").style.width=`${completed/17*100}%`;
  document.getElementById("courseInfo").innerHTML=`<div><strong>Facultad</strong><span>${escapeHtml(course.faculty||"-")}</span></div><div><strong>Programa</strong><span>${escapeHtml(course.program||"-")}</span></div><div><strong>Créditos</strong><span>${escapeHtml(course.credits||"-")}</span></div><div><strong>Horas</strong><span>${escapeHtml(course.presentialHours||"-")} presencial · ${escapeHtml(course.independentHours||"-")} independiente</span></div><div><strong>Profesor</strong><span>${escapeHtml(course.professorName||"-")}<br>${escapeHtml(course.professorEmail||"")}</span></div>`;
  document.getElementById("raList").innerHTML=[course.ra1,course.ra2,course.ra3].filter(Boolean).map((ra,i)=>`<li><b>RA ${i+1}.</b> ${escapeHtml(ra)}</li>`).join("")||"<li>No se han registrado resultados de aprendizaje.</li>";
  renderUnitNav(course);
  weeksList.innerHTML="";
  for(let n=1;n<=17;n++){
    const w=course.weeks[n]||{}, special=specialWeek(n), title=w.topic||specialTitle(n)||"Pendiente de planeación";
    const article=document.createElement("article");article.className=`week ${Object.keys(w).length?"completed":""} ${special?"priority-week":""}`;article.dataset.unit=w.unit||"";
    article.innerHTML=`<button class="week-header"><span class="num">${String(n).padStart(2,"0")}</span><span class="week-info"><b>Semana ${n}${special?" · "+specialTitle(n):""}</b><small>${escapeHtml(title)} · ${w.directHours??(n===17?0:4)} horas directas</small></span><span class="plus">+</span></button><div class="week-body">${Object.keys(w).length?weekDetails(w):`<p>Aún no hay información registrada para esta semana.</p>`}${w.methodology?`<button class="methodology-btn">Ver metodología</button>`:""}<div class="week-buttons"><button class="manage">${Object.keys(w).length?"Editar información":"Agregar información"}</button>${Object.keys(w).length?'<button class="remove-week">Eliminar</button>':""}</div></div>`;
    article.querySelector(".week-header").onclick=()=>{article.classList.toggle("active");article.querySelector(".plus").textContent=article.classList.contains("active")?"−":"+";};
    article.querySelector(".manage").onclick=e=>{e.stopPropagation();openWeekModal(n);};
    const rm=article.querySelector(".remove-week");if(rm)rm.onclick=e=>{e.stopPropagation();removeWeek(n);};
    const mb=article.querySelector(".methodology-btn");if(mb)mb.onclick=()=>openMethodologyModal(n,w.methodology);
    weeksList.appendChild(article);
  }
}

function openWeekModal(n){
  const course=getCourseFromUrl(),w=course.weeks?.[n]||{};weekTitle.textContent=`Semana ${n} · ${course.name}`;week.value=n;
  const fields=["month","day","unit","topic","objective","content","methodology","activity","resources","observations","directHours"];
  fields.forEach(f=>document.getElementById(f).value=w[f]??(f==="directHours"?(n===17?0:4):""));
  const select=document.getElementById("unit");select.innerHTML=`<option value="">Selecciona una unidad</option>`+(course.units||defaultUnits()).map(u=>`<option value="${escapeHtml(u)}">${escapeHtml(u)}</option>`).join("")+`<option value="Evaluación">Evaluación</option>`;
  select.value=w.unit||"";
  if(specialWeek(n)&&!w.topic)topic.value=specialTitle(n);
  deleteWeek.style.display=course.weeks?.[n]?"block":"none";weekModal.classList.add("show");
}
function removeWeek(n){if(!confirm(`¿Deseas eliminar la información de la Semana ${n}?`))return;const c=getCourseFromUrl();delete c.weeks[n];saveCurrentCourse(c);renderWeeks();}
function openMethodologyModal(n,text){document.getElementById("methodologyTitle").textContent=`Metodología · Semana ${n}`;document.getElementById("methodologyText").textContent=text;document.getElementById("methodologyModal").classList.add("show");}
function initCourse(){
  renderWeeks();
  ["weekModal","methodologyModal"].forEach(id=>{const m=document.getElementById(id);m.querySelector(".close").onclick=()=>m.classList.remove("show");m.onclick=e=>{if(e.target===m)m.classList.remove("show");};});
  weekForm.onsubmit=e=>{e.preventDefault();const c=getCourseFromUrl(),n=week.value;const fields=["month","day","unit","topic","objective","content","methodology","activity","resources","observations","directHours"],w={};fields.forEach(f=>w[f]=document.getElementById(f).value.trim());c.weeks[n]=w;saveCurrentCourse(c);weekModal.classList.remove("show");renderWeeks();};
  deleteWeek.onclick=()=>{const n=week.value;removeWeek(n);weekModal.classList.remove("show");};
}

requireSession();setupMenu();setupLogout();if(document.getElementById("courses"))initCourses();if(document.getElementById("weeksList"))initCourse();
