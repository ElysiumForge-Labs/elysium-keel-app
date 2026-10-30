// The forest/mint palette is retired. These hexes must not come back into the app source.
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
const banned = /141b14|b4e6d2|6f9a8a|e0574f|2e4237|18211a|--coral|\bcoral\b/i
const hits = []
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (/\.(ts|css|html)$/.test(f)) check(p) } }
function check(p) {
  readFileSync(p, 'utf8').split('\n').forEach((line, i) => {
    if (banned.test(line)) hits.push(`${p}:${i + 1}: ${line.trim()}`)
  })
}
walk('src'); check('index.html')
if (hits.length) { console.error('Retired palette still in source:\n' + hits.join('\n')); process.exit(1) }
console.log('theme check: ok (night indigo)')
