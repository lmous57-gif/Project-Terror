import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';

for (const file of ['index.html', 'kampung.html']) {
  const html = readFileSync(file, 'utf8');
  const begin = html.indexOf('<script>');
  const end = html.indexOf('</script>', begin);
  if (begin < 0 || end < 0) throw new Error(file + ': inline game script missing');
  new Script(html.slice(begin + 8, end), { filename: file + ':game' });
  for (const required of ['function shoot()', 'function throwSalt()', 'function damageEnemy(', 'function restoreState(', 'data-w="smg"', 'id="salt"', 'v1.7']) {
    if (!html.includes(required)) throw new Error(file + ': missing ' + required);
  }
  if (!html.includes('<script src="./weapon-art.js"></script>') || !html.includes('PT_WEAPON_ART')) throw new Error(file+': missing weapon renderer integration');
  for (const needle of ["i.type!=='mystery_box'","boxSpin","selectedMysteryId","E / GUNA : BUKA MYSTERY BOX","touch-action:pan-x","$('use').addEventListener('click',()=>interact())"]) {if(!html.includes(needle))throw new Error(file+': v1.7 polish missing '+needle)}
  console.log('OK ' + file + ': game JavaScript syntax and controls valid');
}
