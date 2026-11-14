/* Project: Terror pixel weapon workshop — original first-person procedural sprites.
   40 bespoke silhouettes; four poses generated lazily per equipped weapon.
   No external images, font assets or DOOM assets. */
(function(global){
'use strict';
const SIZE=[96,128],CACHE=new Map(),POSE_NAMES=['idle','attack','recover','reload'];
const col={outline:'#10151b',steel:'#6c7b86',steelHi:'#c4d0cf',stock:'#684933',wood:'#b38b5a',skin:'#b87a5a',skinHi:'#e0a889',amber:'#f4c881',blue:'#8edbed',green:'#8be9b9',violet:'#ad8bdf',gold:'#dcc58a',red:'#e3876b'};
function box(g,x,y,w,h,c){g.fillStyle=c;g.fillRect(x|0,y|0,w|0,h|0)}
function poly(g,pts,c){g.fillStyle=c;g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)g.lineTo(pts[i][0],pts[i][1]);g.closePath();g.fill()}
function rod(g,x1,y1,x2,y2,w,c){g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()}
function circ(g,x,y,r,c){g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.fill()}
function ring(g,x,y,r,c,n=3){g.strokeStyle=c;g.lineWidth=n;g.beginPath();g.arc(x,y,r,0,Math.PI*2);g.stroke()}
function spike(g,x,y,c){poly(g,[[x,y-8],[x-5,y+5],[x+5,y+5]],c)}
function blade(g,x1,y1,x2,y2,w=10,c=col.steelHi){rod(g,x1,y1,x2,y2,w,col.outline);rod(g,x1+1,y1,x2+1,y2,w-4,c);rod(g,x1-2,y1,x2-2,y2,2,'#f0efe5')}
function hand(g,x,y){box(g,x-12,y-9,24,28,col.outline);box(g,x-10,y-7,20,25,col.skin);box(g,x-8,y-5,14,8,col.skinHi)}
function grip(g,x,y,w=24,h=38){box(g,x,y,w,h,col.outline);box(g,x+3,y+2,w-6,h-4,col.stock);box(g,x+5,y+5,w-10,4,col.wood);box(g,x+5,y+12,w-10,3,col.wood)}
function gun(g,o){
 const x=o.x||44,y=o.y||65,l=o.length||35,bar=o.bar||14,near=bar*.67,far=Math.max(4,bar*.26);
 // Tapering receiver/barrel: the muzzle is distant, not a top-down vertical rectangle.
 poly(g,[[x-near-6,y+19],[x+near+7,y+19],[x+near+1,y-4],[x-near+2,y-4]],col.outline);
 poly(g,[[x-near-2,y+14],[x+near+3,y+14],[x+near-1,y],[x-near+2,y]],o.dark||col.steel);
 poly(g,[[x-near,y+1],[x+near,y+1],[x+far,y-l],[x-far,y-l]],col.outline);
 poly(g,[[x-near+3,y-2],[x+near-3,y-2],[x+far-1,y-l+3],[x-far+1,y-l+3]],o.light||col.steelHi);
 rod(g,x-4,y+5,x-1,y-l+5,2,'#eef0da');
 box(g,x-far-1,y-l,far*2+2,4,col.outline);
 box(g,x-far,y-l-3,far*2,3,col.steelHi);
 if(o.stock!==false){poly(g,[[x-9,y+19],[x+11,y+19],[x+14,y+58],[x-5,y+55]],col.outline);poly(g,[[x-6,y+22],[x+8,y+22],[x+11,y+53],[x-2,y+51]],col.stock)}
}
function glow(g,x,y,c,r=15){circ(g,x,y,r+6,c+'20');ring(g,x,y,r,c,3);circ(g,x,y,Math.max(3,r/3),c)}
function magic(g,x,y,c){ring(g,x,y,18,c,2);for(let n=0;n<6;n++){const a=n*Math.PI/3;circ(g,x+Math.cos(a)*23,y+Math.sin(a)*23,2,c)}}
function shell(g){box(g,43,100,11,23,col.steel);box(g,46,99,5,10,col.steelHi)}
function holdingHand(g,x,y,angle){
 g.save();g.translate(x,y);g.rotate(angle);
 poly(g,[[-13,10],[-11,-7],[-5,-13],[8,-13],[14,-5],[14,13]],col.outline);
 poly(g,[[-10,9],[-9,-5],[-3,-10],[6,-10],[11,-3],[11,10]],col.skin);
 poly(g,[[-7,-7],[3,-9],[9,-5],[8,0],[-7,0]],col.skinHi);
 for(let i=0;i<3;i++)box(g,-7+i*5,3,2,7,'#8e5946');
 g.restore();
}
function handsFor(g,w,pose){
 const c=w.visual;
 const two=['lever','doublebarrel','boltrifle','smg','grenade','arcrifle','crossbow','slingshot','grimoire','lantern','sprayer','megaphone'].includes(c);
 const casting=w.category==='relic';
 // Sleeves connect to the viewport bottom; palms wrap around the actual grip.
 if(two){
  poly(g,[[0,128],[22,128],[38,104],[28,94],[15,99]],col.outline);
  poly(g,[[4,128],[19,128],[35,104],[28,100],[18,103]],'#3b4548');
  holdingHand(g,c==='crossbow'?39:32,c==='crossbow'?91:99,-.22);
 }
 poly(g,[[73,128],[96,128],[77,95],[58,97]],col.outline);
 poly(g,[[78,128],[94,128],[74,100],[62,102]],'#3d424a');
 if(c==='grimoire')holdingHand(g,68,103,.20);
 else if(c==='amulet'||casting)holdingHand(g,56,111,.15);
 else holdingHand(g,c==='crossbow'?63:59,107+(pose===3?3:0),.18);
}
function oil(g,x,y,c=col.amber){poly(g,[[x,y-25],[x-9,y-6],[x-4,y+4],[x+6,y+8],[x+10,y-6]],c);circ(g,x,y-3,5,'#fff5ba')}
function drawModel(g,w,pose){
const c=w.visual,active=pose===1,reload=pose===3,accent=w.category==='relic'?col.violet:w.category==='novelty'?col.amber:w.category==='firearm'?col.steelHi:col.wood;
g.save();
const longGun=['lever','doublebarrel','boltrifle','smg','grenade','arcrifle'].includes(c);
const sidearm=['revolver','pistol','magnum','nailgun'].includes(c);
const bladeGrip=['keris','sickle','hoe','axe','hammer','shadowblade','cloth','slipper','pipe','broom','spear','lightningspear'].includes(c);
if(c==='crossbow'){
 // Angled slightly towards the centre of aim, keeping both bow limbs visible.
 g.translate(52,113);g.rotate(-.105);g.scale(.90,.95);g.translate(-52,-113);
}
if(longGun||sidearm||bladeGrip){
 g.translate(48,110);
 g.rotate(longGun?-.16:sidearm?-.24:-.13);
 g.scale(longGun?.94:sidearm?.92:.96,longGun?.95:1);
 g.translate(-48,-110);
}
if(pose===2){g.translate(47,74);g.rotate(w.family==='melee'?.09:-.045);g.translate(-47,-74)}
switch(c){
 case 'revolver':gun(g,{length:33,bar:15});circ(g,44,70,11,col.outline);circ(g,44,70,8,col.steelHi);for(let i=0;i<5;i++){const a=i*Math.PI*2/5;circ(g,44+Math.cos(a)*5,70+Math.sin(a)*5,1,col.outline)}if(reload){ring(g,56,83,11,col.steelHi)}break;
 case 'lever':gun(g,{x:50,y:69,length:59,bar:11});rod(g,17,108,35,75,13,col.wood);ring(g,49,91,13,col.gold,4);box(g,42,23,19,5,col.steelHi);break;
 case 'pistol':gun(g,{x:48,y:64,length:28,bar:17});box(g,28,56,42,8,col.outline);box(g,30,58,38,4,col.steelHi);if(reload)box(g,51,111,12,18,col.steelHi);break;
 case 'doublebarrel':gun(g,{x:46,y:73,length:61,bar:24});box(g,34,16,11,57,col.steelHi);box(g,49,16,11,57,col.steelHi);box(g,34,16,26,7,col.outline);box(g,37,17,8,3,col.steel);box(g,51,17,8,3,col.steel);if(reload){ring(g,35,75,9,col.gold)}break;
 case 'magnum':gun(g,{x:48,y:65,length:43,bar:21});circ(g,48,72,13,col.outline);circ(g,48,72,9,col.steel);ring(g,48,72,5,col.steelHi);break;
 case 'boltrifle':gun(g,{x:47,y:73,length:69,bar:11});rod(g,45,27,45,10,8,col.outline);box(g,36,27,22,6,col.outline);box(g,40,23,13,3,col.steelHi);rod(g,52,65,70,61,5,col.gold);break;
 case 'smg':gun(g,{x:46,y:68,length:33,bar:17});box(g,25,53,42,28,col.outline);box(g,30,57,32,18,col.steel);box(g,34,83,15,31,col.outline);box(g,37,84,9,28,col.steelHi);break;
 case 'grenade':gun(g,{x:48,y:71,length:40,bar:28});ring(g,48,30,17,col.outline,7);ring(g,48,30,12,col.steel,5);circ(g,48,30,7,'#1e2226');box(g,22,74,50,12,col.gold);break;
 case 'crossbow':
 // Crossbow seen from the stock: horizontal recurve limbs in the distance,
 // bolt/rail converging towards the aim point, grip nearest the camera.
 poly(g,[[49,122],[74,122],[58,56],[47,53],[43,77]],col.outline);
 poly(g,[[55,114],[68,114],[54,58],[49,58]],col.wood);
 poly(g,[[44,84],[57,84],[53,32],[47,32]],col.outline);
 poly(g,[[47,81],[53,81],[51,31],[49,31]],col.steelHi);
 poly(g,[[49,43],[28,36],[10,28],[5,39],[23,49],[46,52]],col.outline);
 poly(g,[[52,43],[71,35],[86,29],[92,40],[72,49],[54,52]],col.outline);
 rod(g,10,34,47,54,3,col.steel);rod(g,88,34,53,54,3,col.steel);
 rod(g,10,35,50,68,2,col.amber);rod(g,88,35,50,68,2,col.amber);
 rod(g,49,78,50,21,4,col.steelHi);spike(g,50,18,col.steelHi);
 box(g,44,47,14,6,col.gold);box(g,50,65,4,18,col.outline);
 if(active)rod(g,50,42,50,4,3,col.amber);
 break;
 case 'arcrifle':gun(g,{x:48,y:74,length:56,bar:20,light:'#4b9eb4'});for(let i=0;i<4;i++)ring(g,48,23+i*13,9,i%2?col.blue:col.violet,2);glow(g,48,23,col.blue,9);break;
 case 'pipe':rod(g,25,117,64,15,18,col.outline);rod(g,25,117,64,15,11,col.steel);ring(g,64,15,8,col.steelHi,4);break;
 case 'sprayer':box(g,22,70,48,47,col.outline);box(g,27,73,38,37,'#50826d');box(g,34,78,24,23,col.green);rod(g,47,81,65,25,9,col.steel);box(g,57,18,24,10,col.steelHi);if(active)glow(g,77,20,col.green,7);break;
 case 'sickle':rod(g,41,122,46,56,12,col.wood);g.strokeStyle=col.steelHi;g.lineWidth=12;g.beginPath();g.arc(55,45,28,2.9,5.75);g.stroke();blade(g,37,70,43,35,4);break;
 case 'torch':rod(g,48,124,48,51,14,col.stock);box(g,38,40,21,18,col.outline);box(g,42,45,12,13,col.gold);oil(g,48,39,active?'#bbfaff':col.amber);break;
 case 'nailgun':box(g,27,48,45,32,col.outline);box(g,30,51,39,23,col.gold);box(g,57,45,28,9,col.steel);grip(g,42,79,22,35);box(g,18,55,14,8,col.steelHi);break;
 case 'hoe':rod(g,39,119,57,21,11,col.wood);poly(g,[[48,22],[72,16],[81,40],[53,45]],col.steel);poly(g,[[55,24],[73,21],[76,28],[55,32]],col.steelHi);break;
 case 'firebomb':poly(g,[[36,52],[60,52],[67,110],[29,110]],col.outline);poly(g,[[40,57],[56,57],[62,104],[34,104]],'#3f78a2');box(g,43,39,11,20,col.wood);oil(g,48,28,col.blue);break;
 case 'axe':rod(g,47,125,51,19,12,col.wood);poly(g,[[48,22],[25,18],[13,39],[26,57],[50,48]],col.steel);poly(g,[[26,23],[18,39],[28,51],[39,43]],col.steelHi);break;
 case 'hammer':rod(g,48,120,48,42,15,col.wood);box(g,18,26,59,21,col.outline);box(g,21,29,53,15,col.steel);box(g,22,29,20,5,col.steelHi);break;
 case 'uvtorch':box(g,37,70,22,52,col.outline);box(g,39,73,18,45,col.steel);poly(g,[[27,61],[69,61],[63,76],[33,76]],col.steelHi);circ(g,48,57,17,col.blue);circ(g,48,56,9,'#e1ffff');if(active)glow(g,48,41,col.blue,16);break;
 case 'slipper':poly(g,[[19,111],[26,53],[48,36],[65,43],[74,100],[50,121]],'#64472f');poly(g,[[23,107],[31,53],[48,40],[60,48],[68,101],[49,114]],'#cb9a66');rod(g,31,68,48,84,7,'#31556a');rod(g,62,69,48,84,7,'#31556a');break;
 case 'ladle':rod(g,43,125,48,51,11,col.wood);circ(g,48,35,24,col.outline);circ(g,48,35,18,col.steelHi);circ(g,52,30,12,col.steel);break;
 case 'durian':gun(g,{x:47,y:82,length:26,bar:19});circ(g,47,35,27,'#556933');for(let j=0;j<12;j++){const a=j*Math.PI/6;spike(g,47+Math.cos(a)*26,35+Math.sin(a)*26,col.gold)}circ(g,47,36,15,'#8ea85a');break;
 case 'teh':poly(g,[[29,42],[62,42],[65,94],[25,94]],col.outline);poly(g,[[33,46],[59,46],[61,90],[29,90]],'#c28b5f');ring(g,69,63,17,col.steelHi,5);box(g,37,35,18,10,col.steel);if(active)rod(g,49,33,55,9,5,'#fff0c7');break;
 case 'fan':box(g,36,98,24,27,col.steel);rod(g,47,100,47,45,9,col.outline);ring(g,48,43,35,col.steel,5);for(let j=0;j<3;j++){const a=j*Math.PI*2/3+(active?1:.2);poly(g,[[48,43],[48+Math.cos(a-.45)*12,43+Math.sin(a-.45)*12],[48+Math.cos(a)*29,43+Math.sin(a)*29],[48+Math.cos(a+.4)*12,43+Math.sin(a+.4)*12]],col.steelHi)}circ(g,48,43,7,col.amber);break;
 case 'slingshot':rod(g,48,124,48,57,13,col.wood);rod(g,48,62,29,18,11,col.wood);rod(g,48,62,69,18,11,col.wood);rod(g,29,18,50,45,3,col.amber);rod(g,69,18,50,45,3,col.amber);circ(g,50,45,6,col.steel);break;
 case 'broom':rod(g,47,118,52,19,10,col.wood);poly(g,[[39,61],[62,61],[71,113],[26,113]],'#b89451');for(let j=0;j<8;j++)rod(g,34+j*4,64,30+j*5,113,2,col.gold);break;
 case 'megaphone':poly(g,[[28,86],[38,52],[75,17],[87,66],[44,79]],col.outline);poly(g,[[36,78],[44,53],[75,27],[81,62],[44,73]],col.steelHi);ring(g,78,42,19,col.blue,3);grip(g,29,88,17,28);if(active)magic(g,81,42,col.blue);break;
 case 'sambal':poly(g,[[37,49],[61,49],[65,117],[30,117]],col.outline);poly(g,[[40,57],[58,57],[61,110],[34,110]],'#c33b30');box(g,41,40,16,12,col.gold);if(active)oil(g,51,33,'#f9a03c');break;
 case 'chicken':poly(g,[[26,80],[38,47],[57,36],[71,57],[65,91],[54,114],[38,105]],'#efc75d');circ(g,58,40,16,'#f4d967');poly(g,[[69,42],[86,51],[68,56]],'#db873d');for(let j=0;j<3;j++)circ(g,47+j*8,23-j%2*5,6,col.red);circ(g,61,37,2,col.outline);break;
 case 'keris':rod(g,48,124,48,87,15,col.wood);rod(g,24,86,70,86,7,col.gold);poly(g,[[48,82],[39,65],[51,56],[40,47],[53,35],[44,25],[48,7],[54,26],[46,36],[59,49],[46,60],[58,72]],col.steelHi);if(active)magic(g,50,37,col.violet);break;
 case 'spear':rod(g,48,126,48,37,11,col.wood);poly(g,[[48,5],[32,41],[48,54],[64,41]],col.steelHi);rod(g,48,40,48,15,4,col.gold);break;
 case 'lantern':rod(g,48,123,48,77,9,col.wood);ring(g,48,29,13,col.gold,4);box(g,24,39,48,66,col.outline);box(g,29,46,38,50,col.gold);box(g,34,48,28,44,'#386e7b');box(g,45,44,6,54,col.outline);oil(g,49,79,col.blue);if(active)glow(g,49,69,col.blue,23);break;
 case 'grimoire':poly(g,[[48,52],[19,32],[13,105],[48,116]],'#6b446a');poly(g,[[48,52],[77,32],[83,105],[48,116]],'#7d5184');poly(g,[[46,55],[24,45],[20,101],[46,109]],'#eee0bf');poly(g,[[50,55],[72,45],[77,101],[50,109]],'#eee0bf');rod(g,48,52,48,115,3,col.gold);for(let j=0;j<3;j++)rod(g,25,65+j*11,44,71+j*10,2,'#8d728b');magic(g,48,29,col.violet);break;
 case 'blowgun':rod(g,48,119,48,7,12,col.wood);rod(g,48,119,48,7,4,col.green);ring(g,48,9,8,col.gold,3);if(active)glow(g,48,8,col.green,6);break;
 case 'amulet':rod(g,27,16,48,42,5,col.gold);rod(g,69,16,48,42,5,col.gold);poly(g,[[48,40],[70,59],[63,95],[48,108],[33,95],[26,59]],col.gold);poly(g,[[48,48],[63,63],[57,91],[48,97],[39,90],[33,63]],'#4b8e9b');glow(g,48,72,col.blue,15);break;
 case 'shadowblade':rod(g,48,125,48,74,14,'#52365b');rod(g,20,78,75,78,10,col.violet);poly(g,[[46,80],[29,51],[42,18],[48,1],[55,18],[68,51],[53,80]],'#29203d');poly(g,[[47,66],[38,47],[48,9],[56,47]],col.violet);if(active)magic(g,48,37,col.violet);break;
 case 'lightningspear':rod(g,48,122,48,31,10,col.gold);poly(g,[[48,7],[35,42],[46,48],[55,33]],col.blue);rod(g,24,46,63,25,5,col.blue);rod(g,63,25,45,65,5,col.blue);if(active)magic(g,48,27,col.blue);break;
 case 'cloth':rod(g,44,116,51,31,8,col.wood);poly(g,[[35,33],[65,36],[57,62],[72,83],[62,114],[47,99],[28,118],[25,87],[39,63]],'#d8cfc3');rod(g,35,41,61,46,3,'#7b7a7d');if(active)glow(g,48,62,col.violet,11);break;
 case 'flute':rod(g,27,120,69,16,13,col.wood);rod(g,27,120,69,16,6,col.gold);for(let j=0;j<5;j++)circ(g,34+j*8,104-j*17,2,col.outline);if(active){for(let j=0;j<4;j++)ring(g,64,20+j*10,7+j*4,col.blue,2)}break;
 default:gun(g,{x:48,y:65,length:36,bar:16});break;
}
if(reload && w.clip>0){box(g,57,103,16,19,col.outline);box(g,60,104,10,15,col.gold)}
if(reload && w.clip===0){
 if(w.category==='relic'){ring(g,49,54,29,col.violet,3);circ(g,49,54,4,col.gold)}
 else{rod(g,21,37,70,15,3,col.steelHi);circ(g,70,15,3,col.amber)}
}
if(pose===2){rod(g,18,117,34,104,2,w.category==='relic'?col.violet:col.steelHi)}
if(active){if(w.category==='relic'){for(let i=0;i<4;i++)circ(g,24+i*16,11+i%2*13,3,accent)}
 else if(w.family==='melee'){rod(g,13,23,80,6,4,'#e4e7f1')}
 else if(!['chicken','lantern','torch','firebomb','sambal'].includes(c)){poly(g,[[48,3],[36,17],[41,12],[31,24],[52,18],[61,23],[57,12],[67,17]],col.amber)}
}
handsFor(g,w,pose);
g.restore();
}
function sprite(w,pose){
 const canvas=document.createElement('canvas');canvas.width=SIZE[0];canvas.height=SIZE[1];const g=canvas.getContext('2d');g.imageSmoothingEnabled=false;
 // Original per-model sprite painting at low resolution, no common weapon billboard.
 drawModel(g,w,pose);return canvas
}
function frames(w){
 if(!CACHE.has(w.id))CACHE.set(w.id,POSE_NAMES.map((_,i)=>sprite(w,i)));
 return CACHE.get(w.id)
}
function draw(ctx,opt){
 const w=opt.spec||global.PT_ARMORY?.byId[opt.id];if(!w)return false;
 const atk=Math.max(0,Math.min(1,(opt.attack||0)/.3)),reload=(opt.reload||0)>0;
 const state=reload?3:atk>.47?1:atk>.02?2:0;
 const images=frames(w);
 const category=w.category,visual=w.visual,melee=w.family==='melee';
 const crossbow=visual==='crossbow',longGun=['lever','doublebarrel','boltrifle','smg','grenade','arcrifle'].includes(visual);
 const dw=crossbow?183:longGun?171:melee?153:158,dh=crossbow?196:longGun?213:melee?196:201;
 const time=opt.time||0,motion=opt.moving||0,action=atk>0?Math.sin((1-atk)*Math.PI):0;
 const sway=(category==='relic'?Math.sin(time*2.3)*1.4:Math.sin(time*5)*.7)+motion*Math.sin(time*7)*2.3;
 const px=(opt.width||480)/2-dw/2+(crossbow?7:longGun?23:melee?29:22)+sway;
 const py=(opt.height||270)-dh+22-(melee?14:8)*action+(reload?7:0)+motion*Math.cos(time*7)*2.1;
 ctx.save();ctx.imageSmoothingEnabled=false;
 if(melee&&atk>.02){
  // Single continuous slash arc; no double rotation of the blade itself.
  ctx.translate(px+dw*.55,py+dh*.88);
  ctx.rotate(-.33*action);
  ctx.drawImage(images[state],-dw*.55,-dh*.88,dw,dh);
 }else ctx.drawImage(images[state],px,py,dw,dh);
 ctx.restore();return true
}
function preview(id,pose=0){
 const w=global.PT_ARMORY?.byId[id];if(!w)return null;
 return frames(w)[Math.max(0,Math.min(3,pose|0))]
}
global.PT_WEAPON_ART=Object.freeze({draw,preview,frames,poses:POSE_NAMES,models:40});
})(window);