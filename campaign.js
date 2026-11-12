/* PROJECT: TERROR v1.9 — read-only campaign overview.
   All save writes remain owned by the individual mission engines. */
(function(g){
'use strict';
const missions=[
 {id:1,name:'HOSPITAL LAMA',night:'MALAM PERTAMA',file:'index.html',boss:'PONTIANAK',objective:'3 fius · generator · keluar',saveKey:'project-terror-v1-save'},
 {id:2,name:'KAMPUNG BERHANTU',night:'MALAM KEDUA',file:'kampung.html',boss:'HANTU RAYA',objective:'3 jalur · tiang pendinding · keluar',saveKey:'project-terror-kampung-v1-save'},
 {id:3,name:'BUKIT MERANTI',night:'MALAM KETIGA',file:'bukit.html',boss:'PENANGGAL',objective:'3 modul · pemancar · keluar',saveKey:'project-terror-bukit-v1-save'}
];
function safeSave(key){
 try{
  const raw=localStorage.getItem(key);
  if(!raw)return null;
  const data=JSON.parse(raw);
  if(!data||data.v!==1||!data.game||!data.game.player||!data.game.objective
     ||!Number.isFinite(data.game.player.x)||!Number.isFinite(data.game.player.y)
     ||!Array.isArray(data.game.items)||!Array.isArray(data.game.enemies))return null;
  const obj=data.game.objective;
  const amount=Number.isFinite(obj.fuses)?Math.max(0,Math.min(3,obj.fuses)):0;
  return {fuses:amount,boss:!!obj.boss,hasCheckpoint:!!data.checkpoint};
 }catch(_){return null}
}
function progress(){
 let arm={base:[],bonus:[],cleared:[]};
 try{const result=g.PT_ARMORY&&g.PT_ARMORY.read();if(result)arm=result}catch(_){}
 const cleared=[...new Set((arm.cleared||[]).filter(i=>missions.some(m=>m.id===i)))];
 return {
  base:(arm.base||[]).filter(v=>['parang','pistol','shotgun','smg'].includes(v)),
  bonus:(arm.bonus||[]).filter(v=>/^bonus_(0[1-9]|[1-3][0-9]|40)$/.test(v)),
  cleared,
  missions:missions.map(m=>({...m,cleared:cleared.includes(m.id),save:safeSave(m.saveKey)}))
 };
}
function setText(id,value){const el=document.getElementById(id);if(el)el.textContent=value}
function render(){
 if(!document.getElementById('campaign'))return;
 const data=progress();
 setText('clearedCount',data.cleared.length+' / 3');
 setText('bonusCount',data.bonus.length+' / 40');
 setText('baseCount',data.base.length+' / 4');
 const bar=document.getElementById('overallBar');
 if(bar)bar.style.width=Math.round(data.cleared.length/3*100)+'%';
 const list=document.getElementById('missionList');
 if(list){
  list.textContent='';
  data.missions.forEach(m=>{
   const card=document.createElement('article');
   card.className='mission'+(m.cleared?' is-cleared':'');
   const top=document.createElement('div');top.className='mission-top';
   const num=document.createElement('span');num.className='mission-num';num.textContent='0'+m.id;
   const status=document.createElement('span');status.className='mission-status';
   status.textContent=m.cleared?'✓ MISI SELESAI':m.save?'● SIMPANAN DIKESAN':'○ BELUM SELESAI';
   top.append(num,status);
   const name=document.createElement('h2');name.textContent=m.name;
   const meta=document.createElement('p');meta.className='mission-meta';meta.textContent=m.night+' // '+m.objective;
   const boss=document.createElement('p');boss.className='boss';boss.textContent='ANCAMAN: '+m.boss;
   const foot=document.createElement('div');foot.className='mission-foot';
   const note=document.createElement('span');note.className='mission-note';
   note.textContent=m.save?('Simpanan: '+m.save.fuses+'/3 item misi'+(m.save.hasCheckpoint?' · checkpoint aktif':'')):(m.cleared?'Misi boleh diulang semula':'Cari petunjuk dan terus hidup');
   const link=document.createElement('a');link.className='enter';link.href='./'+m.file;
   link.textContent=m.save?'BUKA MENU SIMPANAN':m.cleared?'MAIN SEMULA':'MASUK MISI';
   link.setAttribute('aria-label',link.textContent+' '+m.name);
   foot.append(note,link);
   card.append(top,name,meta,boss,foot);
   list.append(card);
  });
 }
 const loadout=document.getElementById('loadout');
 if(loadout){
  loadout.textContent='';
  const names={parang:'PARANG',pistol:'PISTOL',shotgun:'SHOTGUN',smg:'SMG'};
  for(const id of ['parang','pistol','shotgun','smg']){
   const el=document.createElement('span');el.className='weapon'+(data.base.includes(id)?' unlocked':'');
   el.textContent=(data.base.includes(id)?'✓ ':'◇ ')+names[id];loadout.append(el);
  }
 }
 setText('saveHelp',data.missions.some(m=>m.save)?
 'Untuk sambung, buka menu level yang ada simpanan dan tekan SAMBUNG PERMAINAN DISIMPAN.':
 'Simpanan dan koleksi disimpan dalam browser/peranti ini sahaja.');
}
g.PT_CAMPAIGN=Object.freeze({missions,progress,safeSave});
if(typeof document!=='undefined'){
 document.addEventListener('DOMContentLoaded',render);
 g.addEventListener&&g.addEventListener('pageshow',render);
}
})(window);
