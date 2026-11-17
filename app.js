
const USER='wahidsites';
const known={
  'papafries':{title:'Papa Fries × Mexicano',category:'Food & hospitality',description:'A restaurant-focused web presence for a local food brand, designed to make the menu and brand easy to discover.',live:'https://wahidsites.github.io/papafries/'},
  'faces':{title:'FACES Aesthetics',category:'Beauty & wellness',description:'A digital presence for an aesthetics brand, with a visual direction suited to beauty and personal-care services.',live:'https://wahidsites.github.io/faces'},
  'haroonghous':{title:"Haroon Chitrali's Law Association",category:'Professional services',description:'A professional website for a legal practice, built to present legal services and make office contact easier.',live:'https://haroonghous.site'},
  'platecount':{title:'PlateCount',category:'Web application',description:'A food and calorie-tracking web app concept with an AI-assisted food-estimation workflow.',live:'https://wahiidhassan.pythonanywhere.com/'},
  'finflow':{title:'FinFlow',category:'Finance application',description:'A personal-finance project focused on presenting money-management tools in a clean digital interface.',live:'https://wahidsites.github.io/finflow/'},
  'wahidsites.github.io':{title:'WahidSites',category:'Portfolio & studio',description:'The portfolio and digital studio website showcasing web projects and services.',live:'https://wahidsites.github.io/'}
};
function esc(s=''){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function card(repo){
 const k=known[repo.name]||{};
 const title=k.title||repo.name.replace(/[-_]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
 const desc=k.description||repo.description||'A project in the WahidSites GitHub portfolio. Explore the repository for its implementation and latest details.';
 const live=k.live||repo.homepage||'';
 const lang=repo.language||'Web project';
 return `<article class="card project-card" data-search="${esc((title+' '+desc+' '+lang+' '+repo.name).toLowerCase())}">
 <div class="project-top"><span class="tag">${esc(k.category||lang)}</span><span class="project-icon">${esc(title.slice(0,2).toUpperCase())}</span></div>
 <h3>${esc(title)}</h3><p>${esc(desc)}</p>
 <div class="card-foot"><a href="${esc(repo.html_url)}" target="_blank" rel="noopener">GitHub repository ↗</a>${live?`<a href="${esc(live)}" target="_blank" rel="noopener">Live project ↗</a>`:''}</div></article>`;
}
async function loadProjects(){
 const grid=document.querySelector('#projectGrid'); if(!grid)return;
 const status=document.querySelector('#projectStatus');
 try{
  const res=await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`);
  if(!res.ok)throw new Error('GitHub API unavailable');
  const repos=(await res.json()).filter(r=>!r.fork);
  repos.sort((a,b)=>(known[b.name]?1:0)-(known[a.name]?1:0)||new Date(b.updated_at)-new Date(a.updated_at));
  grid.innerHTML=repos.map(card).join('')||'<div class="empty">No public repositories found.</div>';
  if(status)status.textContent=`Showing ${repos.length} public repositories · Synced from GitHub`;
  const count=document.querySelector('#repoCount');if(count)count.textContent=repos.length;
  const input=document.querySelector('#projectSearch');
  input?.addEventListener('input',()=>{const q=input.value.toLowerCase();document.querySelectorAll('.project-card').forEach(c=>c.hidden=!c.dataset.search.includes(q));});
 }catch(e){
  const fallback=Object.entries(known).map(([name,k])=>({name,html_url:`https://github.com/${USER}/${name}`,homepage:k.live,language:k.category,description:k.description,updated_at:0}));
  grid.innerHTML=fallback.map(card).join('');
  if(status)status.textContent='Showing known portfolio projects · GitHub live sync is temporarily unavailable';
  const input=document.querySelector('#projectSearch');
  input?.addEventListener('input',()=>{const q=input.value.toLowerCase();document.querySelectorAll('.project-card').forEach(c=>c.hidden=!c.dataset.search.includes(q));});
 }
}
document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('.menu'),links=document.querySelector('.navlinks');
 menu?.addEventListener('click',()=>links.classList.toggle('open'));
 const page=location.pathname.split('/').pop()||'index.html';
 document.querySelectorAll('.navlinks a').forEach(a=>{if(a.getAttribute('href')===page)a.classList.add('active')});
 loadProjects();
});
