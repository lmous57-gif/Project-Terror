import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { Script, createContext } from 'node:vm';
const lib=readFileSync('arsenal.js','utf8');
new Script(lib,{filename:'arsenal.js'});
const memory=new Map(), window={};
const ctx=createContext({window,localStorage:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)},Math,Number,Array,Object,JSON,Set,String});
new Script(lib).runInContext(ctx);
const arm=window.PT_ARMORY;
assert.equal(arm.catalog.length,40,'Exactly forty bonus weapons');
assert.equal(new Set(arm.catalog.map(w=>w.id)).size,40);
assert.equal(new Set(arm.catalog.map(w=>w.perk)).size,14,'Fourteen effects');
assert.equal(new Set(arm.catalog.map(w=>w.visual)).size,40,'One visual profile per weapon');
assert.equal(arm.catalog[0].name,'REVOLVER .38');
assert.equal(arm.catalog[32].name,'PELITA PENUNGGU');
assert.ok(!arm.catalog.some(w=>/USANG|KARAT/.test(w.name)),'Avoid weak placeholder names');
for(const w of arm.catalog){
 assert.ok(w.name && w.damage>0 && w.range>0 && w.rate>0);
 assert.ok(w.family && ['common','rare','epic','mythic'].includes(w.tier));
 assert.ok(Number.isFinite(w.clip)&&Number.isFinite(w.reload));
}
const chosen=arm.roll([]);
assert.ok(arm.byId[chosen.id]);
const saved=arm.write({base:['parang','pistol'],bonus:[chosen.id],cleared:[1]});
assert.equal(saved.bonus[0],chosen.id);assert.equal(arm.read().cleared[0],1);
for(const page of ['index.html','kampung.html','bukit.html','loji.html']){
 const html=readFileSync(page,'utf8'),stage=page==='index.html'?1:page==='kampung.html'?2:page==='bukit.html'?3:4;
 assert.ok(html.includes('<script src="./weapon-art.js"></script>'),page+': sprite workshop script');
 assert.ok(html.indexOf('<script src="./arsenal.js"></script>')<html.indexOf('<script>\n'));
 const a=html.indexOf('<script>\n'),b=html.indexOf('</script>',a);
 assert.ok(a>=0&&b>a);
 new Script(html.slice(a+8,b),{filename:page});
 for(const token of ['const STAGE='+stage+';', 'type:\'mystery_box\'', 'function grantWeapon', 'function onToyolDown','function campaignPlayer','corePickup','coreReset','coreRestore','weapon=function()','Digit5','data-w="bonus"','data-w="fist"'])assert.ok(html.includes(token),page+': missing '+token);
 const mapSource=html.match(/const MAP=\[([\s\S]*?)\];/)?.[1]||'';
 const rows=[...mapSource.matchAll(/'([123.DK]+)'/g)].map(m=>m[1]);
 assert.ok(rows.length>=15,page+' map rows missing');
 const cells=page==='index.html'?[[2,2],[15,1]]:page==='kampung.html'?[[2,2],[8,3]]:[[2,2],[8,3],[12,7]];
 for(const [x,y] of cells)assert.equal(rows[y][x],'.',page+': pickup spawned inside wall');
}
console.log('PASS: 40 unique mystery weapons, fourteen perks, persistent catalog, four-level integration, level pickup locations and JS syntax');