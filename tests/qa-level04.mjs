import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,createContext} from 'node:vm';
const storage=new Map();
const localStorage={getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)};
const noop=()=>{};
function fakeCanvas(){
 const gradient={addColorStop:noop};
 const ctx=new Proxy({getImageData:()=>({data:new Uint8ClampedArray(4)}),createLinearGradient:()=>gradient,createRadialGradient:()=>gradient,measureText:()=>({width:50})},{
 get(obj,key){return key in obj?obj[key]:noop},set(obj,key,v){obj[key]=v;return true}});
 return {width:480,height:270,getContext:()=>ctx,style:{},getBoundingClientRect:()=>({left:0,top:0,width:480,height:270}),setPointerCapture:noop,requestPointerLock:noop,addEventListener:noop};
}
function prepare(file){
 const window={},nodeMap=new Map(),canvas=fakeCanvas(),useEvents=new Map(),joyEvents=new Map();
 const classes=()=>({add:noop,remove:noop,toggle:noop,contains:()=>false});
 const element=id=>{if(id==='game')return canvas;if(!nodeMap.has(id))nodeMap.set(id,{id,style:{},dataset:{},classList:classes(),textContent:'',disabled:false,offsetWidth:116,addEventListener:(type,fn)=>{if(id==='use')useEvents.set(type,fn);if(id==='joyZone')joyEvents.set(type,fn)},setAttribute:noop,getBoundingClientRect:()=>({left:0,top:0,width:480,height:270})});return nodeMap.get(id)};
 const buttons=['fist','parang','pistol','shotgun','smg','bonus'].map(w=>({...element('btn_'+w),dataset:{w}}));
 const document={getElementById:element,createElement:()=>fakeCanvas(),querySelectorAll:sel=>sel==='[data-w]'?buttons:[],addEventListener:noop,exitPointerLock:noop,hidden:false,pointerLockElement:null};
 const context=createContext({window,document,localStorage,performance:{now:()=>10240},requestAnimationFrame:noop,console,Date,Math,Uint8Array,Uint8ClampedArray,Int16Array});
 new Script(readFileSync('arsenal.js','utf8'),{filename:'arsenal.js'}).runInContext(context);
 const html=readFileSync(file,'utf8');
 const begin=html.indexOf('<script>\n'),end=html.indexOf('</script>',begin);
 assert.ok(begin>=0&&end>begin);
 const js=html.slice(begin+8,end);
 const marker='\n})();';
 assert.ok(js.lastIndexOf(marker)>0);
 const injected=js.slice(0,js.lastIndexOf(marker))+'\nwindow.__qa={reset,pickup,damageEnemy,equip,shoot,update,render,loop,keys,joy,getInteractable,interact,restoreState,snapshotGame,go:(x,y)=>{player.x=x;player.y=y},expireTip:()=>{tipTimer=0},currentTip:()=>tip,spin:()=>boxSpin,state:()=>({player,items,enemies,objective,STAGE,WEAPONS,MAP,FOE_SPAWNS,portal,generator,DOOR_DEFS,saveKey:SAVE_KEY})};'+js.slice(js.lastIndexOf(marker));
 new Script(injected,{filename:file+':instrumented'}).runInContext(context);
 return Object.assign(window.__qa,{clickUse:()=>{assert.ok(useEvents.get('click'),'Mobile GUNA click handler missing');useEvents.get('click')()},joyEvent:(type,event)=>{assert.ok(joyEvents.get(type),'Missing joy event '+type);joyEvents.get(type)(event)}});
}

const html=readFileSync('loji.html','utf8');
assert.ok(html.includes('Orang Minyak')&&html.includes('LOJI AIR HITAM'));
assert.ok(html.includes("const STAGE=4;")&&html.includes("project-terror-loji-v1-save"));
const level=prepare('loji.html');
level.reset();
let state=level.state();
assert.equal(state.STAGE,4);
assert.equal(state.player.weapon,'fist','Fresh Level 04 starts with fists (old unlocks remain selectable)');
assert.ok(!state.player.ownedWeapons.includes('bonus_20'),'UV cannot be pre-equipped in a fresh campaign');
assert.equal(state.MAP.length,15);
assert.ok(state.MAP.every(row=>row.length===21));
function accessible(x,y,allowKey){
 const map=state.MAP,seen=new Set(),q=[[2,1]],key=(a,b)=>a+','+b;
 for(let head=0;head<q.length;head++){
  const [xx,yy]=q[head],k=key(xx,yy);
  if(seen.has(k))continue;
  seen.add(k);
  for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
   const nx=xx+dx,ny=yy+dy,t=map[ny]?.[nx];
   if(t==='.'||t==='D'||(allowKey&&t==='K'))if(!seen.has(key(nx,ny)))q.push([nx,ny])
  }
 }
 return seen.has(key(Math.floor(x),Math.floor(y)))
}
for(const pickup of state.items){
 assert.equal(state.MAP[Math.floor(pickup.y)][Math.floor(pickup.x)],'.','Pickup must not spawn in wall: '+pickup.type);
 assert.ok(accessible(pickup.x,pickup.y,true),'Pickup must be reachable after unlocking gates: '+pickup.type);
}
for(const foe of state.FOE_SPAWNS){
 assert.equal(state.MAP[Math.floor(foe.y)][Math.floor(foe.x)],'.','Enemy in wall: '+foe.type);
}
assert.ok(accessible(3.5,9.5,false),'Key must be reachable before its own gate');
const uv=state.items.find(i=>i.type==='uv_unlock'&&!i.taken);
assert.ok(uv,'Level04 must contain guaranteed UV flashlight pickup');
assert.ok(accessible(uv.x,uv.y,false),'UV must be reachable without key gate');
assert.equal(uv.x,12.5);assert.equal(uv.y,7.5);
level.go(uv.x,uv.y);
assert.doesNotThrow(()=>level.update(.02),'UV pickup safe in normal movement');
state=level.state();
assert.ok(uv.taken,'UV is collected');
assert.ok(state.player.ownedWeapons.includes('bonus_20'));
assert.equal(state.player.weapon,'bonus_20','UV equips on pickup');
assert.ok(JSON.parse(storage.get('pt-campaign-armory-v1')).bonus.includes('bonus_20'),'UV persists across levels');
assert.ok(state.player.ammo.bonus_20>0,'UV can fire');
assert.doesNotThrow(()=>level.shoot(),'UV firing works');
assert.doesNotThrow(()=>level.render(),'UV first-person weapon art renders');
const beforeOil=state.player.hp;
level.go(5.5,3.5);
assert.doesNotThrow(()=>level.update(.05),'Oil-slick update cannot crash');
assert.ok(state.player.hp<beforeOil,'Oil patch must cause small periodic damage');
assert.doesNotThrow(()=>level.render(),'Oil slick render cannot crash');
const box=state.items.find(i=>i.type==='mystery_box'&&!i.taken);
assert.ok(box,'One Mystery Box at Level 04');
level.go(box.x,box.y);level.update(.02); // zone-entry tip may take priority on first frame
level.expireTip();
assert.doesNotThrow(()=>level.update(.02),'No freeze in Level04 proximity trigger');
assert.equal(box.taken,false,'Box cannot open from walking on it');
assert.ok(level.currentTip().includes('MYSTERY BOX'),'Safe box interaction hint');
assert.doesNotThrow(()=>level.render(),'Render near box must not freeze');
assert.equal(level.getInteractable()?.kind,'mystery_box');
level.clickUse();
assert.ok(level.spin(),'GUNA must trigger box');
const rolled=level.spin().gun.id;
level.spin().time=.01;level.update(.05);
assert.equal(box.taken,true);
assert.ok(state.player.ownedWeapons.includes(rolled),'Box prize must persist');
assert.ok(state.WEAPONS[rolled].bonus);
const save=level.snapshotGame();
assert.equal(save.player.ownedWeapons.includes('bonus_20'),true);
level.restoreState(save);
state=level.state();
assert.ok(state.player.ownedWeapons.includes('bonus_20'),'UV survives save/restore');
assert.ok(state.items.find(i=>i.type==='mystery_box').taken,'Used Mystery Box survives save/restore');
for(const f of state.items.filter(i=>i.type==='fuse'&&!i.taken))level.pickup(f);
const keyItem=state.items.find(i=>i.type==='key'&&!i.taken);
assert.ok(keyItem);level.pickup(keyItem);
assert.equal(state.objective.fuses,3);assert.equal(state.objective.key,true);
level.go(state.generator.x,state.generator.y);
assert.doesNotThrow(()=>level.interact(),'Main antenna console interaction should work');
assert.equal(state.objective.generator,true,'Three modules and key activate transmitter');
const boss=state.enemies.find(e=>e.type==='orangminyak'&&e.alive);
assert.ok(boss,'Orang Minyak must spawn after transmitter activation');
assert.ok(state.WEAPONS.bonus_20.damage>0);
boss.attack=0;boss.ai='chase';
level.go(boss.x+1.8,boss.y);
assert.doesNotThrow(()=>level.update(.03),'Orang Minyak combat AI should not crash');
assert.ok(['chase','vanish','dash','recover'].includes(boss.ai));
level.damageEnemy(boss,999,'bonus_20');
assert.equal(state.objective.boss,true,'Defeating Orang Minyak unlocks exit');
level.go(state.portal.x,state.portal.y);
level.update(.02);
assert.ok(JSON.parse(storage.get('pt-campaign-armory-v1')).cleared.includes(4),'Level04 completion persists in campaign progression');
assert.ok(!storage.has('project-terror-loji-v1-save'),'Victory clears only Level04 checkpoint');
console.log('PASS: Level 04 map/reachability, UV pickup+fire+save and oil hazard, Mystery Box anti-freeze, 3 modules, Orang Minyak boss AI, victory');
