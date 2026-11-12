import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Script,createContext} from 'node:vm';

const noop=()=>{};
const painter=new Proxy({},{
 get(obj,key){if(key==='createLinearGradient'||key==='createRadialGradient')return ()=>({addColorStop:noop});
 if(key==='measureText')return ()=>({width:10});
 return key in obj?obj[key]:noop
 },
 set(obj,key,value){obj[key]=value;return true}
});
let made=0;
const document={createElement(tag){
 assert.equal(tag,'canvas');
 made++;return {width:96,height:128,getContext(type){assert.equal(type,'2d');return painter}}
}};
const context=createContext({window:{},document,localStorage:{getItem:()=>null,setItem:noop},Math,Set,Map,Array,Object,JSON,Number,String});
const armSource=readFileSync('arsenal.js','utf8');
const artSource=readFileSync('weapon-art.js','utf8');
new Script(armSource,{filename:'arsenal.js'}).runInContext(context);
new Script(artSource,{filename:'weapon-art.js'}).runInContext(context);
const catalog=context.window.PT_ARMORY.catalog,art=context.window.PT_WEAPON_ART;
assert.equal(art.models,40);
assert.deepEqual([...art.poses],['idle','attack','recover','reload']);
assert.equal(new Set(catalog.map(w=>w.visual)).size,40);
for(const w of catalog){
 assert.ok(artSource.includes("case '"+w.visual+"':"),w.id+' missing custom silhouette');
 const states=art.frames(w);
 assert.equal(states.length,4);
 for(let pose=0;pose<4;pose++)assert.ok(art.preview(w.id,pose),'No sprite: '+w.name+' frame '+pose);
 assert.ok(art.draw(painter,{id:w.id,spec:w,attack:0.25,reload:0,width:480,height:270,time:1,moving:0}));
 assert.ok(art.draw(painter,{id:w.id,spec:w,attack:0,reload:1,width:480,height:270,time:1,moving:0}));
}
assert.equal(made,160,'Lazy cache should generate exactly four frames for each of forty weapons');
const gallery=readFileSync('weapon-gallery.html','utf8');
assert.ok(gallery.includes('weapon-art.js')&&gallery.includes('data-pose="3"')&&gallery.includes('art.preview'));
const codes=gallery.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(codes);new Script(codes[1],{filename:'weapon-gallery.html'});
console.log('PASS: 40 unique silhouettes and 160 cached pixel-art frames, attack/reload draws, preview gallery');
