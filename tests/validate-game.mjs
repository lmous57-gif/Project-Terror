import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';

const pages = ['index.html', 'kampung.html'];
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const inlineScripts = [...html.matchAll(/<script(?:\\s[^>]*)?>([\\s\\S]*?)<\\/script>/gi)];
  if (inlineScripts.length < 1) throw new Error(`${file}: no inline game JavaScript`);
  for (const [index, match] of inlineScripts.entries()) {
    new Script(match[1], { filename: `${file}:inline-${index + 1}` });
  }
  for (const required of [
    'function shoot()',
    'function throwSalt()',
    'function damageEnemy(',
    'function restoreState(',
    'data-w="smg"',
    'id="salt"',
    'v1.4',
  ]) {
    if (!html.includes(required)) throw new Error(`${file}: missing ${required}`);
  }
  console.log(`OK ${file}: parsed ${inlineScripts.length} inline script(s), combat controls present`);
}
