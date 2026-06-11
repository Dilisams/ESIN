window.addEventListener('scroll',()=>{
  const nav=document.getElementById('mainNav');
  if(nav) nav.classList.toggle('scrolled',window.scrollY>20);
});

const navToggle=document.getElementById('navToggle');
if(navToggle){
  navToggle.addEventListener('click',()=>{
    const links=document.querySelector('.nav-links');
    links?.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-links a').forEach(link=>{
  link.addEventListener('click',()=>{
    const links=document.querySelector('.nav-links');
    links?.classList.remove('open');
  });
});

const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      const countEls=e.target.querySelectorAll('[data-count]');
      countEls.forEach(animateCount);
    }
  });
},{threshold:.1});

document.querySelectorAll('.reveal,.problem-card,.hub-card,.stress-card,.supplier-card').forEach(el=>obs.observe(el));

document.querySelectorAll('.hero-stats [data-count]').forEach(el=>{
  setTimeout(()=>animateCount(el),1000);
});

function animateCount(el){
  const target=parseFloat(el.dataset.count);
  const isFloat=String(target).includes('.');
  const suffix=el.innerHTML.includes('M+')?' M+':el.innerHTML.includes('%')?' %':el.innerHTML.includes('M')?' M':'';
  const duration=1600;
  const start=performance.now();
  function update(now){
    const prog=Math.min((now-start)/duration,1);
    const ease=1-Math.pow(1-prog,3);
    const val=target*ease;
    el.innerHTML=(isFloat?val.toFixed(1):Math.round(val))+'<span>'+suffix+'</span>';
    if(prog<1)requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function animateDashCount(id,target,prefix='',suffix=''){
  const el=document.getElementById(id);if(!el)return;
  const dur=1200,start=performance.now();
  function upd(now){
    const p=Math.min((now-start)/dur,1),e=1-Math.pow(1-p,3);
    const v=Math.round(target*e);
    el.textContent=prefix+(v>999?v.toLocaleString():v)+suffix;
    if(p<1)requestAnimationFrame(upd);
  }
  requestAnimationFrame(upd);
}
setTimeout(()=>{
  animateDashCount('cnt1',2760000,'','');
  animateDashCount('cnt2',287,'','');
  animateDashCount('cnt3',23,'','');
  animateDashCount('cnt4',47,'','');
},600);

const impactObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('[data-count]').forEach(el=>{
        const t=parseFloat(el.dataset.count);
        const du=1800,st=performance.now();
        function u(n){
          const p=Math.min((n-st)/du,1),ease=1-Math.pow(1-p,3);
          const v=Math.round(t*ease);
          el.textContent=v>9999?v.toLocaleString():v;
          if(p<1)requestAnimationFrame(u);
        }
        requestAnimationFrame(u);
      });
    }
  });
},{threshold:.3});
if(document.querySelector('.impact-section'))impactObs.observe(document.querySelector('.impact-section'));

Chart.defaults.font.family = 'Poppins, sans-serif';
Chart.defaults.color = 'rgba(26,26,26,0.5)';

const heroCtx=document.getElementById('heroChart');
if(heroCtx){
  new Chart(heroCtx,{type:'line',data:{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],datasets:[{label:'Output (M L)',data:[2.1,2.4,2.2,2.6,2.5,2.8,2.76],borderColor:'#0F52BA',backgroundColor:'rgba(15,82,186,0.1)',fill:true,tension:.4,pointRadius:3,pointBackgroundColor:'#0F52BA'}]},options:{plugins:{legend:{display:false}},scales:{x:{display:false},y:{display:false}},animation:{duration:1000}}});
}

const solCtx=document.getElementById('solutionChart');
if(solCtx){
  new Chart(solCtx,{type:'doughnut',data:{labels:['Stable','Limited','Critical','Water-Rich'],datasets:[{data:[47,28,18,7],backgroundColor:['#00C48C','#F5A623','#E53E3E','#0F52BA'],borderWidth:0,hoverOffset:8}]},options:{plugins:{legend:{position:'bottom',labels:{padding:16,font:{size:12}}}},cutout:'68%'}});
}

const modalMainCtx=document.getElementById('modalMainChart');
if(modalMainCtx){
  new Chart(modalMainCtx,{type:'line',data:{labels:['Day 1','Day 2','Day 3','Day 4','Day 5','Day 6','Day 7','Day 8','Day 9','Day 10','Day 11','Day 12','Day 13','Day 14'],datasets:[{label:'Million Litres',data:[2.1,2.2,2.15,2.3,2.25,2.4,2.35,2.5,2.45,2.6,2.55,2.7,2.65,2.76],borderColor:'#0F52BA',backgroundColor:'rgba(15,82,186,0.12)',fill:true,tension:.35,pointRadius:3,pointBackgroundColor:'#0F52BA'}]},options:{plugins:{legend:{display:false}},scales:{x:{display:false},y:{beginAtZero:false}},animation:{duration:1000}}});
}

const modalZoneCtx=document.getElementById('modalZoneChart');
if(modalZoneCtx){
  new Chart(modalZoneCtx,{type:'doughnut',data:{labels:['Stable','Limited','Critical'],datasets:[{data:[8,5,4],backgroundColor:['#00C48C','#F5A623','#E53E3E'],borderWidth:0,hoverOffset:6}]},options:{plugins:{legend:{display:false}},cutout:'65%'}});
}

const modalLgaCtx=document.getElementById('modalLgaChart');
if(modalLgaCtx){
  new Chart(modalLgaCtx,{type:'bar',data:{labels:['E.North','E.South','E.East','Udi','Nkanu E','Nkanu W','Igbo-Eze','Awgu','Oji','Aninri'],datasets:[{label:'Supply %',data:[78,65,72,90,83,70,60,55,75,82],backgroundColor:'rgba(15,82,186,0.75)',borderRadius:4}]},options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,max:100,ticks:{callback:v=>v+'%'}},x:{ticks:{font:{size:10}}}}}});
}

const distCtx=document.getElementById('distChart');
if(distCtx){
  const d=[2.1,2.3,2.0,2.5,2.4,1.9,2.2,2.6,2.5,2.7,2.4,2.8,2.6,2.76];
  new Chart(distCtx,{type:'bar',data:{labels:['J1','J2','J3','J4','J5','J6','J7','J8','J9','J10','J11','J12','J13','J14'],datasets:[{label:'Million Litres',data:d,backgroundColor:d.map(v=>v<2.2?'rgba(229,62,62,0.7)':v<2.5?'rgba(245,166,35,0.7)':'rgba(15,82,186,0.7)'),borderRadius:6}]} ,options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:false,min:1.5,grid:{color:'rgba(255,255,255,0.08)'},ticks:{color:'rgba(255,255,255,0.5)',font:{size:10}}},x:{grid:{display:false},ticks:{color:'rgba(255,255,255,0.5)',font:{size:10}}}}}});
}

const zoneCtx=document.getElementById('zoneChart');
if(zoneCtx){
  new Chart(zoneCtx,{type:'doughnut',data:{labels:['Stable','Limited','Critical'],datasets:[{data:[8,5,4],backgroundColor:['#00C48C','#F5A623','#E53E3E'],borderWidth:0,hoverOffset:6}]},options:{plugins:{legend:{display:false}},cutout:'60%'}});
}

const lgaCtx=document.getElementById('lgaChart');
if(lgaCtx){
  new Chart(lgaCtx,{type:'bar',data:{labels:['E.North','E.South','E.East','Udi','Nkanu E','Nkanu W','Igbo-Eze','Awgu','Oji','Aninri'],datasets:[{label:'Supply',data:[22,78,14,96,38,67,44,42,83,70],backgroundColor:'rgba(15,82,186,0.7)',borderRadius:4},{label:'Demand',data:[100,85,100,40,75,70,60,65,50,55],backgroundColor:'rgba(229,62,62,0.3)',borderRadius:4}]},options:{plugins:{legend:{labels:{color:'rgba(255,255,255,0.6)',font:{size:11}}}},scales:{y:{max:100,grid:{color:'rgba(255,255,255,0.06)'},ticks:{color:'rgba(255,255,255,0.4)',font:{size:10},callback:v=>v+'%'}},x:{grid:{display:false},ticks:{color:'rgba(255,255,255,0.4)',font:{size:9}}}}}});
}

const meterCtx=document.getElementById('meterChart');
if(meterCtx){
  new Chart(meterCtx,{type:'line',data:{labels:Array.from({length:30},(_,i)=>'D'+(i+1)),datasets:[{label:'Litres/day',data:[88,92,85,95,102,89,94,88,96,91,85,93,97,90,88,95,101,87,93,96,89,92,88,95,98,91,87,94,90,95],borderColor:'#0BC5EA',backgroundColor:'rgba(11,197,234,0.1)',fill:true,tension:.5,pointRadius:0}]},options:{plugins:{legend:{display:false}},scales:{x:{display:false},y:{display:false}},animation:{duration:1500}}});
}

const meterObs=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting){
    const el=document.getElementById('meterCount');
    if(!el)return;
    let t=2847,d=1500,s=performance.now();
    function u(n){const p=Math.min((n-s)/d,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(t*e).toLocaleString();if(p<1)requestAnimationFrame(u);}
    requestAnimationFrame(u);
  }
},{threshold:.3});
const meterSec=document.getElementById('metering');
if(meterSec)meterObs.observe(meterSec);

document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    const panel=document.getElementById('tab-'+btn.dataset.tab);
    if(panel)panel.classList.add('active');
    if(btn.dataset.tab==='supply'){
      setTimeout(()=>{const c=document.getElementById('lgaChart');if(c&&c.chart)c.chart.update();},100);
    }
  });
});

const statusColors={critical:'#E53E3E',limited:'#F5A623',stable:'#00C48C',rich:'#0F52BA'};
const statusLabels={critical:'🔴 Critical Shortage',limited:'🟡 Limited Supply',stable:'🟢 Stable Supply',rich:'🔵 Water-Rich Source'};

document.querySelectorAll('.lga-node').forEach(node=>{
  node.addEventListener('mouseenter',()=>{
    const tt=document.getElementById('mapTooltip');
    if(!tt) return;
    const status=node.dataset.status;
    const lga=node.dataset.lga;
    const score=node.dataset.score;
    const supply=node.dataset.supply;
    tt.innerHTML=`<div class="tt-title">${lga}</div><div class="tt-status"><div class="tt-dot" style="background:${statusColors[status]}"></div>${statusLabels[status]}</div><div style="margin-top:6px;font-size:11px;opacity:.7;">Stress Score: ${score}/100 · Supply: ${supply}</div>`;
    tt.style.opacity='1';
  });
  node.addEventListener('mousemove',e=>{
    const tt=document.getElementById('mapTooltip');
    const container=document.querySelector('.enugu-map-container');
    if(!tt||!container) return;
    const rect=container.getBoundingClientRect();
    tt.style.left=(e.clientX-rect.left+14)+'px';
    tt.style.top=(e.clientY-rect.top-10)+'px';
  });
  node.addEventListener('mouseleave',()=>{const tt=document.getElementById('mapTooltip');if(tt)tt.style.opacity='0';});
});

function lgaClick(node){
  const lga=node.dataset.lga;const score=node.dataset.score;const supply=node.dataset.supply;const status=node.dataset.status;
  const msgs={critical:`🔴 ALERT: ${lga} — Water Stress Score: ${score}/100. Supply at ${supply}. Intervention recommended.`,limited:`🟡 ${lga} — Moderate stress. Supply at ${supply}. Monitor closely.`,stable:`🟢 ${lga} — Stable. Supply at ${supply}. No intervention needed.`,rich:`🔵 ${lga} — Water-rich source. Supply at ${supply}. Active distribution point.`};
  showNotif(msgs[status]||`${lga} selected`,'info');
}

function filterMap(type, el){
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
  el?.classList.add('active');
  document.querySelectorAll('.lga-node').forEach(n=>{
    const s=n.dataset.status;
    const show=type==='all'||(type==='green'&&s==='stable')||(type==='yellow'&&s==='limited')||(type==='red'&&s==='critical')||(type==='blue'&&s==='rich');
    n.style.opacity=show?'1':'0.2';
    n.style.pointerEvents=show?'all':'none';
  });
}

function scrollToMap(){
  const target=document.getElementById('map');
  if(target)target.scrollIntoView({behavior:'smooth'});
}

function openLogin(){document.getElementById('loginModal')?.classList.add('open');}
function openDashboard(){document.getElementById('govDashModal')?.classList.add('open');}
function openPPPPortal(){document.getElementById('pppModal')?.classList.add('open');}
function closeModal(id){document.getElementById(id)?.classList.remove('open');}
document.querySelectorAll('.modal-overlay').forEach(m=>{m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open');});});

let notifTimer=null;
function showNotif(msg,type='info'){
  const el=document.getElementById('notifEl');
  const icon=document.getElementById('notifIcon');
  const msgEl=document.getElementById('notifMsg');
  if(!el||!icon||!msgEl)return;
  const icons={success:'✅',info:'ℹ️',error:'❌'};
  icon.textContent=icons[type]||'ℹ️';
  msgEl.textContent=msg;
  el.classList.add('show');
  clearTimeout(notifTimer);
  notifTimer=setTimeout(()=>el.classList.remove('show'),4000);
}

function selectRole(el){document.querySelectorAll('.role-option').forEach(r=>r.classList.remove('selected'));el.classList.add('selected');}
function selectRadio(el,groupId){document.querySelectorAll('#'+groupId+' .radio-opt').forEach(r=>r.classList.remove('sel'));el.classList.add('sel');}
function handleLogin(){closeModal('loginModal');setTimeout(()=>openDashboard(),200);}

window.addEventListener('load',()=>{document.querySelectorAll('.hero-stats [data-count]').forEach(animateCount);});

// ==============================
// ESIN EXPANSION — JAVASCRIPT
// All new feature JS
// ==============================

function esinNotif(msg, type) {
  if (typeof showNotif === 'function') {
    showNotif(msg, type);
  } else {
    const el = document.getElementById('notifEl');
    if (el) {
      const icons = { success: '✅', info: 'ℹ️', error: '❌' };
      document.getElementById('notifIcon').textContent = icons[type] || 'ℹ️';
      document.getElementById('notifMsg').textContent = msg;
      el.classList.add('show');
      setTimeout(() => el.classList.remove('show'), 4000);
    }
  }
}

function selectRT(el) {
  document.querySelectorAll('#requestTypeGrid .rt-opt').forEach(o => o.classList.remove('rt-selected'));
  el.classList.add('rt-selected');
}

function selectNL(el) {
  document.querySelectorAll('#needLevelGrid .nl-opt').forEach(o => o.classList.remove('nl-selected'));
  el.classList.add('nl-selected');
}

function selectSeverity(el, level) {
  document.querySelectorAll('.sev-opt').forEach(o => o.classList.remove('sev-selected'));
  el.classList.add('sev-selected');
}

function detectGPS() {
  const btn = document.getElementById('gpsBtn');
  if (btn) {
    btn.innerHTML = '⏳ Detecting location...';
    setTimeout(() => {
      btn.innerHTML = '✅ Location Detected: 6.4698°N, 7.4985°E';
      btn.classList.add('detected');
      const coordSpan = document.getElementById('gpsCoords');
      if (coordSpan) coordSpan.textContent = 'GPS: 6.4698°N, 7.4985°E · Uwani, Enugu';
      esinNotif('📍 GPS location detected: Uwani, Enugu South', 'success');
    }, 1600);
  }
}

function detectTankerGPS() {
  const btn = document.getElementById('tankerGpsBtn');
  if (btn) {
    btn.innerHTML = '⏳ Detecting location...';
    setTimeout(() => {
      btn.innerHTML = '✅ GPS Detected: 6.4698°N, 7.4985°E';
      btn.style.borderColor = 'rgba(0,196,140,0.6)';
      btn.style.color = '#00C48C';
      btn.style.background = 'rgba(0,196,140,0.07)';
      esinNotif('📍 GPS location detected for tanker request', 'success');
    }, 1600);
  }
}

function generateCode(prefix) {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${new Date().getFullYear().toString().slice(2)}06-${n}`;
}

function submitReport() {
  const cat = document.getElementById('reportCategory');
  const lga = document.getElementById('reportLGA');
  if (cat && !cat.value) { esinNotif('⚠️ Please select a report category', 'error'); return; }
  if (lga && !lga.value) { esinNotif('⚠️ Please select your LGA', 'error'); return; }
  const code = generateCode('RPT');
  esinNotif(`✅ Report ${code} submitted successfully!`, 'success');
}

function submitTankerRequest() {
  const code = generateCode('TRQ');
  esinNotif(`✅ Tanker request ${code} submitted!`, 'success');
}

function toggleAnon() {
  const anonMode = !document.getElementById('anonToggle').classList.toggle('on');
  const fields = document.getElementById('identityFields');
  if (fields) fields.style.display = anonMode ? 'none' : 'block';
  esinNotif(anonMode ? '🎭 Anonymous mode enabled' : '👤 Identity mode enabled', 'info');
}

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}
  });
});
