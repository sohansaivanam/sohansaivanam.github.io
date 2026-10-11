// Site-wide content comes from assets/content.js.
const profile=window.PORTFOLIO;
const base=document.body.dataset.base || '';
if(profile){
 document.querySelectorAll('[data-profile]').forEach(el=>{const value=profile[el.dataset.profile];if(typeof value==='string')el.textContent=value;});
 document.querySelectorAll('[data-portrait], img[src$="portrait.svg"]').forEach(img=>{img.src=base+profile.portrait;img.alt=profile.portraitAlt;});
 document.querySelectorAll('[data-portrait-caption]').forEach(el=>{el.hidden=!profile.portraitIsPlaceholder;});
 const grid=document.querySelector('[data-project-grid]');
 const make=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text)el.textContent=text;return el;};
 if(grid){grid.replaceChildren();profile.projects.forEach(p=>{
  const card=make('a','project');card.href=base+'projects/'+p.slug+'.html';card.dataset.category=p.category;
  const visual=make('div','card-visual');const img=make('img');img.src=base+p.image;img.alt='Illustrative concept for '+p.title;img.width=800;img.height=560;img.loading='lazy';visual.append(img,make('span','badge',p.status));
  const title=make('div','card-title');const arrow=make('span','arrow','↗');arrow.setAttribute('aria-hidden','true');title.append(make('h3','',p.title),arrow);
  card.append(visual,title,make('div','meta',p.skills),make('p','card-text',p.summary),make('p','evidence-note',p.evidence));grid.append(card);
 });}
 const contact=document.querySelector('#contact-links');
 if(contact){contact.replaceChildren();[['Email',profile.email,'mailto:'],['LinkedIn',profile.linkedin,'']].forEach(([label,value,prefix])=>{
  const row=make('div','contact-row');row.append(make('span','label',label));
  if(value){const link=make('a','',label==='Email'?value:'Connect on LinkedIn ↗');link.href=prefix+value;if(label==='LinkedIn'){link.target='_blank';link.rel='noopener noreferrer';}row.append(link);}
  else row.append(make('p','contact-pending',label==='Email'?'Your preferred email will be added here.':'Your LinkedIn profile will be added here.'));
  contact.append(row);
 });}
 const resume=document.querySelector('#resume-content');
 if(resume && profile.resume){resume.replaceChildren();const actions=make('div','resume-actions');const open=make('a','button-primary','Open resume ↗');open.href=base+profile.resume;open.target='_blank';open.rel='noopener noreferrer';const download=make('a','button-secondary','Download PDF ↓');download.href=base+profile.resume;download.download='Sohan-Sai-Vanam-Resume.pdf';actions.append(open,download);const frame=make('object','resume-frame');frame.data=base+profile.resume;frame.type='application/pdf';frame.setAttribute('aria-label','Sohan Sai Vanam’s resume');frame.append(make('p','','If the PDF does not display, use Open resume or Download PDF above.'));resume.append(actions,frame);}
}
const menu=document.querySelector('.menu');const links=document.querySelector('.nav-links');
function closeMenu(){if(menu && links){menu.setAttribute('aria-expanded','false');links.classList.remove('open');}}
menu?.addEventListener('click',()=>{const opened=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!opened));links.classList.toggle('open',!opened);});
links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape' && menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
const filters=document.querySelectorAll('.filter');
function updateCount(){const el=document.querySelector('#filter-status');if(el)el.textContent=`${document.querySelectorAll('.project[data-category]:not([hidden])').length} projects shown`;}
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('.project[data-category]').forEach(card=>{card.hidden=button.dataset.filter!=='all' && card.dataset.category!==button.dataset.filter;});updateCount();}));updateCount();

// PDF viewer for project reports and certificate files.
let pdfDialog=null;
let pdfOpener=null;
function documentUrl(path){
 const url=new URL(base+path,window.location.href);
 if(!['http:','https:','file:'].includes(url.protocol))return null;
 return url.href;
}
function makePdfDialog(){
 const dialog=document.createElement('dialog');dialog.className='pdf-dialog';dialog.setAttribute('aria-labelledby','pdf-dialog-title');
 const toolbar=document.createElement('div');toolbar.className='pdf-toolbar';
 const title=document.createElement('h2');title.id='pdf-dialog-title';
 const links=document.createElement('div');links.className='pdf-tools';
 const open=document.createElement('a');open.dataset.pdfOpen='';open.textContent='Open in new tab ↗';open.target='_blank';open.rel='noopener noreferrer';
 const download=document.createElement('a');download.dataset.pdfDownload='';download.textContent='Download ↓';
 const close=document.createElement('button');close.type='button';close.className='pdf-close';close.textContent='Close ×';close.setAttribute('aria-label','Close document viewer');close.autofocus=true;
 links.append(open,download,close);toolbar.append(title,links);
 const hint=document.createElement('p');hint.className='pdf-hint';hint.textContent='If the PDF does not display on your device, use Open in new tab or Download.';
 const holder=document.createElement('div');holder.className='pdf-holder';
 dialog.append(toolbar,hint,holder);document.body.append(dialog);
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{holder.replaceChildren();document.body.classList.remove('pdf-open');if(pdfOpener?.isConnected)pdfOpener.focus();});
 return dialog;
}
function openPdf(path,title,opener){
 const url=documentUrl(path);if(!url)return;
 if(typeof HTMLDialogElement==='undefined' || typeof HTMLDialogElement.prototype.showModal!=='function'){window.open(url,'_blank','noopener,noreferrer');return;}
 pdfOpener=opener;pdfDialog ||= makePdfDialog();
 pdfDialog.querySelector('#pdf-dialog-title').textContent=title;
 const open=pdfDialog.querySelector('[data-pdf-open]');open.href=url;
 const download=pdfDialog.querySelector('[data-pdf-download]');download.href=url;download.download=path.split('/').pop();
 const object=document.createElement('object');object.data=url;object.type='application/pdf';object.setAttribute('aria-label',title);object.className='pdf-object';
 const fallback=document.createElement('a');fallback.href=url;fallback.target='_blank';fallback.rel='noopener noreferrer';fallback.textContent='Open the PDF document ↗';object.append(fallback);
 pdfDialog.querySelector('.pdf-holder').replaceChildren(object);pdfDialog.showModal();document.body.classList.add('pdf-open');
}
if(profile){
 document.querySelectorAll('[data-report-for]').forEach(panel=>{
  const project=profile.projects.find(p=>p.slug===panel.dataset.reportFor);if(!project?.report)return;
  const action=panel.querySelector('.report-action');action.replaceChildren();
  const button=document.createElement('button');button.type='button';button.className='button-primary';button.textContent='Read technical report ↗';button.addEventListener('click',()=>openPdf(project.report,project.reportTitle || project.title,button));action.append(button);
  if(project.reportUpdated){const date=document.createElement('p');date.className='caption';date.textContent='Updated '+project.reportUpdated;action.append(date);}
 });
 const certificates=document.querySelector('#certification-list');
 if(certificates && profile.certifications?.length){certificates.replaceChildren();profile.certifications.forEach(cert=>{
  const card=document.createElement('article');card.className='cert-card';
  const issuer=document.createElement('p');issuer.className='label';issuer.textContent=cert.issuer;
  const title=document.createElement('h3');title.textContent=cert.title;
  const date=document.createElement('p');date.className='cert-date';date.textContent=[cert.date,cert.expires?'Expires '+cert.expires:null].filter(Boolean).join(' · ');
  card.append(issuer,title,date);
  if(cert.skills){const skills=document.createElement('p');skills.className='cert-skills';skills.textContent=cert.skills;card.append(skills);}
  const actions=document.createElement('div');actions.className='cert-actions';
  if(cert.credentialUrl){try{const url=new URL(cert.credentialUrl);if(['https:','http:'].includes(url.protocol)){const link=document.createElement('a');link.href=url.href;link.target='_blank';link.rel='noopener noreferrer';link.className='link';link.textContent='Verify credential ↗';actions.append(link);}}catch{}}
  if(cert.pdf){const button=document.createElement('button');button.type='button';button.className='cert-button';button.textContent='View certificate ↗';button.addEventListener('click',()=>openPdf(cert.pdf,cert.title,button));actions.append(button);}
  card.append(actions);certificates.append(card);
 });}
}
