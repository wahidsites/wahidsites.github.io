
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const menu=$('.menu'), nav=$('.navlinks');
if(menu&&nav) menu.addEventListener('click',()=>nav.classList.toggle('open'));
$$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

const knownProjects=[
 {name:'PlateCount',type:'Web application',description:'A calorie and food-tracking web app concept built to make everyday nutrition logging simpler.',url:'https://wahiidhassan.pythonanywhere.com/',tags:['Flask','Python','AI concept'],featured:true},
 {name:'Haroon Chitrali — Legal',type:'Professional website',description:'A legal practice website presenting services, professional information and contact routes.',url:'https://haroonchitrali.site/',tags:['Website','Professional']},
 {name:'WahidSites',type:'Portfolio',description:'The independent digital studio portfolio: selected work, services and project enquiries.',url:'https://wahidsites.github.io/',tags:['HTML','CSS','JavaScript']}
];
function projectCard(p){
 const tags=(p.tags||[]).slice(0,3).map(t=>`<span class="pill">${escapeHtml(t)}</span>`).join('');
 return `<article class="card"><div class="tag">${escapeHtml(p.type||'GitHub project')}</div><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.description||'A project from the WahidSites GitHub portfolio.')}</p><div class="project-meta">${tags}</div><a class="card-link" href="${safeUrl(p.url)}" target="_blank" rel="noopener">Explore project ↗</a></article>`;
}
function escapeHtml(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function safeUrl(u='https://github.com/wahidsites'){try{const x=new URL(u);return ['https:','http:'].includes(x.protocol)?x.href:'#'}catch{return '#'}}
async function loadProjects(){
 const grid=$('#projectGrid'); if(!grid)return;
 let items=[...knownProjects];
 try{
  const res=await fetch('https://api.github.com/users/wahidsites/repos?per_page=100&sort=updated');
  if(res.ok){
   const repos=await res.json();
   const filtered=repos.filter(r=>!r.fork&&!['wahidsites.github.io'].includes(r.name.toLowerCase()));
   for(const r of filtered){
    if(items.some(p=>p.name.toLowerCase()===r.name.toLowerCase()))continue;
    items.push({name:r.name,type:r.language||'GitHub repository',description:r.description||'A public project from the WahidSites GitHub account.',url:r.html_url,tags:[r.language||'GitHub',r.private?'Private':'Open source']});
   }
  }
 }catch(e){console.info('GitHub project sync unavailable; showing featured projects.');}
 const q=($('#projectSearch')?.value||'').toLowerCase();
 const visible=items.filter(p=>(p.name+' '+p.type+' '+p.description+' '+(p.tags||[]).join(' ')).toLowerCase().includes(q));
 grid.innerHTML=visible.length?visible.map(projectCard).join(''):'<div class="empty">No projects match that search.</div>';
 const count=$('#repoCount');if(count)count.textContent=items.length;
 const status=$('#projectStatus');if(status)status.textContent='Featured work and public repositories. New public repositories are added automatically when GitHub is reachable.';
}
if($('#projectGrid'))loadProjects();
$('#projectSearch')?.addEventListener('input',loadProjects);
const contactForm=$('#contactForm');
if(contactForm)contactForm.addEventListener('submit',e=>{
 e.preventDefault();
 const d=new FormData(contactForm);
 const subject=encodeURIComponent('WahidSites project enquiry — '+(d.get('name')||'New enquiry'));
 const body=encodeURIComponent(`Name: ${d.get('name')}\nEmail: ${d.get('email')}\nWhatsApp: ${d.get('phone')||'Not provided'}\nProject type: ${d.get('type')}\n\nProject details:\n${d.get('details')}`);
 window.location.href=`mailto:abdulwahiddd801@gmail.com?subject=${subject}&body=${body}`;
});
