/* PROJECT: TERROR — 40 original Mystery Box weapon concepts.
   Dedicated visual profiles enable distinct first-person sprites; stable IDs preserve saves. */
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
const rows=[["Revolver .38","rare","precision","crit","revolver","firearm"],["Senapang Tuil","rare","precision","pierce","lever","firearm"],["Pistol .45","common","rapid","none","pistol","firearm"],["Shotgun Dua Laras","epic","scatter","splash","doublebarrel","firearm"],["Revolver Magnum","rare","precision","push","magnum","firearm"],["Rifle Bolt-Action","rare","precision","crit","boltrifle","firearm"],["SMG Kompak","common","rapid","ricochet","smg","firearm"],["Pelancar Grenad","epic","heavy","splash","grenade","firearm"],["Crossbow Taktikal","rare","precision","stun","crossbow","firearm"],["Rifle Arka","mythic","beam","chain","arcrifle","relic"],["Paip Besi","common","melee","push","pipe","improvised"],["Penyembur Racun","rare","rapid","poison","sprayer","improvised"],["Sabit Getah","common","melee","bleed","sickle","improvised"],["Obor Minyak","rare","beam","burn","torch","improvised"],["Nail Gun","rare","rapid","pierce","nailgun","improvised"],["Cangkul Besi","common","melee","stun","hoe","improvised"],["Bom Api Biru","epic","heavy","burn","firebomb","improvised"],["Kapak Penyelamat","rare","melee","crit","axe","improvised"],["Tukul Besi","common","melee","stun","hammer","improvised"],["Lampu Suluh UV","epic","beam","stun","uvtorch","relic"],["Selipar Getah","common","melee","push","slipper","novelty"],["Senduk Besi","common","melee","stun","ladle","novelty"],["Pelancar Durian","epic","heavy","splash","durian","novelty"],["Penyembur Teh Tarik","rare","rapid","heal","teh","novelty"],["Kipas Angin Turbo","rare","beam","push","fan","novelty"],["Katapel Besi","rare","precision","ricochet","slingshot","improvised"],["Penyapu Lidi","common","melee","bleed","broom","improvised"],["Megafon","epic","beam","stun","megaphone","improvised"],["Botol Sambal Api","rare","heavy","burn","sambal","novelty"],["Ayam Mainan","mythic","melee","chaos","chicken","novelty"],["Keris Pusaka","rare","melee","curse","keris","relic"],["Tombak Keramat","epic","precision","pierce","spear","relic"],["Pelita Penunggu","rare","beam","burn","lantern","relic"],["Kitab Ribut","epic","beam","chain","grimoire","relic"],["Sumpit Bunian","rare","precision","poison","blowgun","relic"],["Azimat Penyembuh","mythic","beam","heal","amulet","relic"],["Pedang Bayang","epic","melee","curse","shadowblade","relic"],["Lembing Petir","mythic","beam","chain","lightningspear","relic"],["Tali Kafan","rare","melee","stun","cloth","relic"],["Seruling Bunian","mythic","beam","chaos","flute","relic"]];
const catalog=rows.map(([name,tier,family,perk,visual,category],i)=>({
 id:'bonus_'+String(i+1).padStart(2,'0'),
 name:name.toUpperCase(),tier,family,perk,visual,category,
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