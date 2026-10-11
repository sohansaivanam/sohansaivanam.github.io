// Theme preference only; this does not store personal content.
(() => {
 const key='sohan-portfolio-theme';
 const root=document.documentElement;
 let preference=null;
 try{const saved=window.localStorage.getItem(key);if(saved==='light'||saved==='dark')preference=saved;}catch{}
 function apply(theme){
  root.dataset.theme=theme;root.style.colorScheme=theme;
  const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=theme==='dark'?'#1b1e23':'#f6f6f3';
  syncButton();
  window.dispatchEvent(new CustomEvent('portfolio-theme-change',{detail:theme}));
 }
 // New visitors see the preferred dark design; an explicit choice still wins.
 function effective(){return preference || 'dark';}
 function syncButton(){
  const button=document.querySelector('.theme-toggle');if(!button)return;
  const dark=root.dataset.theme==='dark';
  const label=dark?'Light mode':'Dark mode';
  button.setAttribute('aria-pressed',String(dark));
  button.setAttribute('aria-label','Switch to '+label.toLowerCase());
  button.title='Switch to '+label.toLowerCase();
  const text=button.querySelector('.theme-label');if(text)text.textContent=label;
 }
 function bindButton(){
  const button=document.querySelector('.theme-toggle');if(!button || button.dataset.themeBound)return;
  button.dataset.themeBound='true';
  button.addEventListener('click',()=>window.PortfolioTheme.toggle());
  syncButton();
 }
 window.PortfolioTheme={current:()=>root.dataset.theme,toggle:()=>{
  preference=root.dataset.theme==='dark'?'light':'dark';
  try{window.localStorage.setItem(key,preference);}catch{}
  apply(preference);return preference;
 }};
 apply(effective());
 // Keep the theme control independent of editable portfolio content.
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindButton,{once:true});
 else bindButton();
 window.addEventListener('storage',event=>{if(event.key===key || event.key===null){preference=event.newValue==='dark'||event.newValue==='light'?event.newValue:null;apply(effective());}});
})();
