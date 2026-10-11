// Edit content.js for text and files. This file controls behavior.
const profile=window.PORTFOLIO;
const base=document.body.dataset.base || '';
function make(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text)el.textContent=text;return el;}
if(profile){
 document.querySelectorAll('[data-profile]').forEach(el=>{const value=profile[el.dataset.profile];if(typeof value==='string')el.textContent=value;});
 document.querySelectorAll('[data-portrait]').forEach(img=>{img.src=base+profile.portrait;img.alt=profile.portraitAlt;});
 document.querySelectorAll('[data-portrait-caption]').forEach(el=>{el.hidden=!profile.portraitIsPlaceholder;});
 const about=document.querySelector('[data-about-text]');if(about && profile.about?.paragraphs){about.replaceChildren(...profile.about.paragraphs.map(text=>make('p','',text)));}
 const interests=document.querySelector('[data-about-interests]');if(interests && profile.about?.interests){interests.replaceChildren(...profile.about.interests.map(text=>make('span','',text)));}
 const awards=document.querySelector('[data-awards]');if(awards && Array.isArray(profile.awards)){awards.replaceChildren(...profile.awards.map(award=>{const row=make('article','award-row');row.append(make('h3','',award.title),make('p','',award.organization));return row;}));}
 const grid=document.querySelector('[data-project-grid]');
 if(grid){grid.replaceChildren();profile.projects.forEach((p,i)=>{
  const card=make('a','project project-row');card.href=base+'projects/'+p.slug+'.html';
  const index=make('span','project-index',String(i+1).padStart(2,'0'));index.setAttribute('aria-hidden','true');
  const visual=make('span','project-thumbnail');const img=make('img');img.src=base+p.image;img.alt=p.imageAlt || 'Project image for '+p.title;img.width=800;img.height=560;img.loading='lazy';visual.append(img);
  const info=make('span','project-description');info.append(make('span','project-title',p.title),make('span','project-meta',[p.context,p.status].filter(Boolean).join(' · ')),make('span','project-summary',p.summary));
  const arrow=make('span','project-arrow','↗');arrow.setAttribute('aria-hidden','true');card.append(index,visual,info,arrow);grid.append(card);
 });}
 const contact=document.querySelector('#contact-links');
 if(contact){contact.replaceChildren();[['Email',profile.email,'mailto:'],['LinkedIn',profile.linkedin,'']].forEach(([label,value,prefix])=>{
  const row=make('div','contact-row');row.append(make('span','label',label));
  if(value){const link=make('a','',label==='Email'?value:'Connect on LinkedIn ↗');link.href=prefix+value;if(label==='LinkedIn'){link.target='_blank';link.rel='noopener noreferrer';}row.append(link);}
  else row.append(make('p','contact-pending',label==='Email'?'Your preferred email will be added here.':'Your LinkedIn profile will be added here.'));
  contact.append(row);
 });}
 const evidence=document.querySelector('[data-resume-evidence]');
 if(evidence && Array.isArray(profile.resumeEvidence)){evidence.replaceChildren();profile.resumeEvidence.forEach(item=>{
  const row=make('article','capability-row');const title=make('div');title.append(make('h3','',item.title),make('p','capability-tools',item.tools));row.append(title,make('p','capability-description',item.description));
  const project=profile.projects.find(p=>p.slug===item.projectSlug);if(project){const link=make('a','link capability-link',(item.linkLabel || 'Explore the project')+' ↗');link.href=base+'projects/'+project.slug+'.html';row.append(link);}evidence.append(row);
 });}
 document.querySelectorAll('[data-resume-section]').forEach(section=>{const entries=profile[section.dataset.resumeSection];if(!Array.isArray(entries))return;section.replaceChildren();entries.forEach(entry=>{
  const article=make('article','resume-entry');const copy=make('div');copy.append(make('h3','',entry.title),make('p','resume-org',entry.organization));if(entry.description)copy.append(make('p','resume-description',entry.description));if(entry.href){const link=make('a','link resume-entry-link',(entry.linkLabel || 'Explore the work')+' ↗');link.href=base+entry.href;copy.append(link);}article.append(copy);if(entry.period)article.append(make('p','resume-period',entry.period));section.append(article);
 });});
 const skills=document.querySelector('[data-resume-skills]');if(skills && profile.resumeSkills){skills.replaceChildren();profile.resumeSkills.forEach(group=>{const article=make('article','skill-group');article.append(make('h3','',group.title),make('p','',group.items.join(' · ')));skills.append(article);});}
 const resume=document.querySelector('#resume-content');
 if(resume && profile.resume){resume.replaceChildren();const download=make('a','link resume-download','Download resume (PDF) ↓');download.href=base+profile.resume;download.download='Sohan-Sai-Vanam-Resume.pdf';const view=make('button','link secondary-link','View PDF ↗');view.type='button';view.addEventListener('click',()=>openPdf(profile.resume,'Sohan Sai Vanam — Resume',view));resume.append(download,view);}
}
const menu=document.querySelector('.menu');const links=document.querySelector('.nav-links');
function closeMenu(){if(menu && links){menu.setAttribute('aria-expanded','false');links.classList.remove('open');}}
menu?.addEventListener('click',()=>{const opened=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!opened));links.classList.toggle('open',!opened);});
links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape' && menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});

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
 const credential=document.querySelector('[data-resume-credential]');const highlighted=profile.certifications?.find(cert=>cert.credentialId===profile.resumeCredentialId);
 if(credential && highlighted){credential.replaceChildren();credential.append(make('span','label','Highlighted credential'),make('h3','',highlighted.title),make('p','',[highlighted.issuer,highlighted.date].filter(Boolean).join(' · ')));const actions=make('div','resume-credential-actions');if(highlighted.pdf){const button=make('button','link','View certificate ↗');button.type='button';button.addEventListener('click',()=>openPdf(highlighted.pdf,highlighted.title,button));actions.append(button);}const all=make('a','link secondary-link','All certifications ↗');all.href=base+'about.html#certifications';actions.append(all);credential.append(actions);}
 document.querySelectorAll('[data-report-for]').forEach(panel=>{
  const project=profile.projects.find(p=>p.slug===panel.dataset.reportFor);if(!project?.report)return;
  const action=panel.querySelector('.report-action');action.replaceChildren();
  const button=document.createElement('button');button.type='button';button.className='button-primary';button.textContent='Read technical report ↗';button.addEventListener('click',()=>openPdf(project.report,project.reportTitle || project.title,button));action.append(button);
  if(project.reportUpdated){const date=document.createElement('p');date.className='caption';date.textContent='Updated '+project.reportUpdated;action.append(date);}
 });
 const certificates=document.querySelector('#certification-list');
 if(certificates && profile.certifications?.length){certificates.replaceChildren();profile.certifications.forEach(cert=>{
  const card=document.createElement('article');card.className='cert-card cert-row';
  const copy=document.createElement('div');copy.className='cert-copy';
  const issuer=document.createElement('p');issuer.className='cert-issuer';issuer.textContent=cert.issuer;
  const title=document.createElement('h3');title.textContent=cert.title;
  const date=document.createElement('p');date.className='cert-date';date.textContent=[cert.date,cert.credentialId?'ID: '+cert.credentialId:null,cert.expires?'Expires '+cert.expires:null].filter(Boolean).join(' · ');
  copy.append(title,issuer,date);card.append(copy);
  if(cert.skills){const skills=document.createElement('p');skills.className='cert-skills';skills.textContent=cert.skills;copy.append(skills);}
  const actions=document.createElement('div');actions.className='cert-actions';
  if(cert.credentialUrl){try{const url=new URL(cert.credentialUrl);if(['https:','http:'].includes(url.protocol)){const link=document.createElement('a');link.href=url.href;link.target='_blank';link.rel='noopener noreferrer';link.className='link';link.textContent='Verify credential ↗';actions.append(link);}}catch{}}
  if(cert.pdf){const button=document.createElement('button');button.type='button';button.className='cert-button';button.textContent='View certificate ↗';button.addEventListener('click',()=>openPdf(cert.pdf,cert.title,button));actions.append(button);}
  card.append(actions);certificates.append(card);
 });}
}
