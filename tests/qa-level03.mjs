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

const html=readFileSync('bukit.html','utf8');
assert.ok(html.includes('Penanggal')&&html.includes('BUKIT MERANTI'));
assert.ok(html.includes("const STAGE=3;")&&html.includes("project-terror-bukit-v1-save"));
const level=prepare('bukit.html');
level.reset();
let state=level.state();
assert.equal(state.STAGE,3);
assert.equal(state.player.weapon,'fist','Fresh Level 03 starts with fists (old unlocks remain selectable)');
assert.ok(!state.player.ownedWeapons.includes('smg'),'SMG cannot be pre-equipped in a fresh campaign');
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
const smg=state.items.find(i=>i.type==='smg_unlock'&&!i.taken);
assert.ok(smg,'Level03 must contain SMG unlock');
assert.ok(accessible(smg.x,smg.y,false),'SMG must be reachable before key gate');
assert.equal(smg.x,12.5);assert.equal(smg.y,7.5);
level.go(smg.x,smg.y);
assert.doesNotThrow(()=>level.update(.02),'SMG pickup must be safe through normal movement');
state=level.state();
assert.ok(smg.taken);assert.ok(state.player.ownedWeapons.includes('smg'));
assert.equal(state.player.weapon,'smg','SMG equips immediately');
assert.ok(JSON.parse(storage.get('pt-campaign-armory-v1')).base.includes('smg'),'SMG must carry to other levels');
assert.ok(state.player.ammo.smg>0);
assert.doesNotThrow(()=>level.shoot(),'SMG firing should work');
assert.doesNotThrow(()=>level.render(),'SMG first-person sprite should render');
const box=state.items.find(i=>i.type==='mystery_box'&&!i.taken);
assert.ok(box,'One Mystery Box at Level 03');
level.go(box.x,box.y);level.update(.02); // zone-entry tip may take priority on first frame
level.expireTip();
assert.doesNotThrow(()=>level.update(.02),'No freeze in Level03 proximity trigger');
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
assert.equal(save.player.ownedWeapons.includes('smg'),true);
level.restoreState(save);
state=level.state();
assert.ok(state.player.ownedWeapons.includes('smg'),'SMG survives save/restore');
assert.ok(state.items.find(i=>i.type==='mystery_box').taken,'Used Mystery Box survives save/restore');
for(const f of state.items.filter(i=>i.type==='fuse'&&!i.taken))level.pickup(f);
const keyItem=state.items.find(i=>i.type==='key'&&!i.taken);
assert.ok(keyItem);level.pickup(keyItem);
assert.equal(state.objective.fuses,3);assert.equal(state.objective.key,true);
level.go(state.generator.x,state.generator.y);
assert.doesNotThrow(()=>level.interact(),'Main antenna console interaction should work');
assert.equal(state.objective.generator,true,'Three modules and key activate transmitter');
const boss=state.enemies.find(e=>e.type==='penanggal'&&e.alive);
assert.ok(boss,'Penanggal must spawn after transmitter activation');
assert.ok(state.WEAPONS.smg.damage>0);
boss.attack=0;boss.ai='chase';
level.go(boss.x+3,boss.y);
assert.doesNotThrow(()=>level.update(.03),'Penanggal combat AI should not crash');
assert.ok(['chase','cast','slam','recover'].includes(boss.ai));
level.damageEnemy(boss,999,'smg');
assert.equal(state.objective.boss,true,'Defeating Penanggal unlocks exit');
level.go(state.portal.x,state.portal.y);
level.update(.02);
assert.ok(JSON.parse(storage.get('pt-campaign-armory-v1')).cleared.includes(3),'Level03 completion persists in campaign progression');
assert.ok(!storage.has('project-terror-bukit-v1-save'),'Victory clears only Level03 checkpoint');
console.log('PASS: Level 03 map/reachability, SMG pickup+fire+save, Mystery Box anti-freeze, 3 modules, Penanggal boss AI, victory');
