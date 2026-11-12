/* PROJECT: TERROR — 40-piece Mystery Box arsenal (original game content).
   Shared stat archetypes + 14 playable secondary effects; no external assets. */
(function(g){
'use strict';
const families={
 melee:{damage:3.3,range:1.32,rate:.48,clip:0,reload:0,spread:.29},
 precision:{damage:2.55,range:12,rate:.54,clip:8,reload:1.35,spread:.055},
 rapid:{damage:1.06,range:9.5,rate:.145,clip:28,reload:1.45,spread:.112},
 scatter:{damage:4.9,range:5.4,rate:.83,clip:5,reload:1.55,spread:.20},
 heavy:{damage:5.8,range:7.8,rate:1.14,clip:4,reload:1.65,spread:.12},
 beam:{damage:1.75,range:10.5,rate:.32,clip:16,reload:1.3,spread:.07}
};
const tiers={common:{weight:55,mult:1},rare:{weight:28,mult:1.18},epic:{weight:13,mult:1.39},mythic:{weight:4,mult:1.72}};
const rows=[["Revolver Tua","rare","precision","crit"],["Rifle Estet","rare","precision","pierce"],["Karbin Usang","common","rapid","none"],["Senapang Berkembar","epic","scatter","splash"],["Pistol Berat","rare","precision","push"],["Senapang Pemburu","rare","precision","crit"],["Rifle Karat","common","rapid","burn"],["Meriam Mini","epic","heavy","splash"],["Crossbow Malam","rare","precision","stun"],["Blaster Arka","mythic","beam","chain"],["Paip Besi","common","melee","push"],["Penyembur Racun","rare","rapid","poison"],["Pemotong Getah","common","melee","bleed"],["Obor Minyak","rare","rapid","burn"],["Paku Terbang","rare","precision","pierce"],["Cangkul Karat","common","melee","stun"],["Botol Api Biru","epic","heavy","burn"],["Gasing Besi","rare","rapid","ricochet"],["Wrench Generator","common","melee","chain"],["Lampu Suluh UV","epic","beam","stun"],["Selipar Mak","common","melee","push"],["Senduk Kenduri","common","melee","stun"],["Durian Launcher","epic","heavy","splash"],["Teh Tarik Blaster","rare","rapid","heal"],["Kipas Meja Turbo","rare","beam","push"],["Ketupat Cannon","rare","scatter","chaos"],["Penyapu Lidi","common","melee","bleed"],["Mic Karaoke","epic","beam","stun"],["Sambal Meletup","rare","heavy","burn"],["Ayam Getah","mythic","melee","chaos"],["Keris Malam","rare","melee","curse"],["Tombak Langit","epic","precision","pierce"],["Pelita Arwah","rare","beam","burn"],["Jampi Ribut","epic","beam","chain"],["Sumpit Bunian","rare","precision","poison"],["Cincin Senja","mythic","beam","heal"],["Pedang Bayang","epic","melee","curse"],["Kilat Keramat","mythic","beam","chain"],["Tali Pocong","rare","melee","stun"],["Seruling Penunggu","mythic","beam","chaos"]];
const catalog=rows.map(([name,tier,family,perk],i)=>({
 id:'bonus_'+String(i+1).padStart(2,'0'),
 name:name.toUpperCase(),tier,family,perk,
 ...families[family],
 damage:Number((families[family].damage*tiers[tier].mult*(.95+(i%4)*.035)).toFixed(2)),
 rate:Number((families[family].rate*(.97+(i%3)*.06)).toFixed(3)),
 bonus:true
}));
const byId=Object.fromEntries(catalog.map(w=>[w.id,w]));
const STORAGE_KEY='pt-campaign-armory-v1';
function read(){
 try{
  const c=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
  const ids=Array.isArray(c.bonus)?[...new Set(c.bonus.filter(id=>!!byId[id]))].slice(0,40):[];
  const base=Array.isArray(c.base)?[...new Set(c.base.filter(id=>['fist','parang','pistol','shotgun','smg'].includes(id)))]:[];
  return {base,bonus:ids,cleared:Array.isArray(c.cleared)?c.cleared.filter(v=>Number.isInteger(v)&&v>=1&&v<=40):[]};
 }catch(_){return {base:[],bonus:[],cleared:[]}}
}
function write(c){
 const clean={base:[...new Set(c.base||[])],bonus:[...new Set(c.bonus||[])],cleared:[...new Set(c.cleared||[])]};
 try{localStorage.setItem(STORAGE_KEY,JSON.stringify(clean))}catch(_){}
 return clean;
}
function roll(owned=[]){
 const remaining=catalog.filter(w=>!owned.includes(w.id));
 if(!remaining.length)return catalog[Math.floor(Math.random()*catalog.length)];
 let total=0;for(const w of remaining)total+=tiers[w.tier].weight;
 let n=Math.random()*total;
 for(const w of remaining){n-=tiers[w.tier].weight;if(n<=0)return w}
 return remaining[remaining.length-1];
}
g.PT_ARMORY=Object.freeze({catalog,byId,read,write,roll,STORAGE_KEY});
})(window);