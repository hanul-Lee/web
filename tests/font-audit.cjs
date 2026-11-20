const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const path=require('node:path');
const {dist}=require('./helpers/site.cjs');
const manifest=require('../.build/font-manifest.json');
const expand=value=>{const set=new Set();for(const range of value.split(',')){const [lo,hi]=range.replace(/^U\+/,'').split('-').map(n=>parseInt(n,16));for(let n=lo;n<=(hi??lo);n++)set.add(n);}return set;};
const supported=expand(manifest.sourceSupportedRanges),covered=expand(manifest.coveredRanges);
const decode=s=>s.replace(/&#x([\da-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replace(/&(amp|lt|gt|quot|apos|nbsp);/g,(_,n)=>({amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:'\u00a0'})[n]);
let corpus=Array.from({length:95},(_,i)=>String.fromCodePoint(i+32)).join('');
for(const file of fs.readdirSync(dist).filter(f=>f.endsWith('.html'))){
 const html=fs.readFileSync(path.join(dist,file),'utf8').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'');
 corpus+=decode(html.replace(/<[^>]*>/g,''));
 for(const attribute of html.matchAll(/\b(?:alt|aria-label|title|content)="([^"]*)"/g))corpus+=decode(attribute[1]);
}
for(const file of ['case.js','components.js'])corpus+=fs.readFileSync(path.join(dist,file),'utf8');
for(const file of ['shared.css','portfolio.css','case.css'])for(const match of fs.readFileSync(path.join(dist,file),'utf8').matchAll(/content:\s*["']([^"']*)["']/g))corpus+=match[1];
const missing=[...new Set([...corpus].map(c=>c.codePointAt(0)))].filter(n=>supported.has(n)&&!covered.has(n));
assert.deepEqual(missing,[],'Font subsets need rebuilding for: '+missing.map(n=>String.fromCodePoint(n)).join('')+'; run npm run build with FONT_PYTHON set.');
for(const font of manifest.fonts){const buffer=fs.readFileSync(path.join(dist,font.src));assert.equal(buffer.toString('ascii',0,4),'wOF2',font.src);assert.ok(font.src.includes(crypto.createHash('sha256').update(buffer).digest('hex').slice(0,12)),font.src+' content hash mismatch');assert.equal(buffer.length,font.bytes);assert.ok(font.axes.some(([axis])=>axis==='wght'),'variable weight axis must be retained');}
const css=fs.readFileSync(path.join(dist,'assets/fonts/fonts.css'),'utf8');
assert.ok(Buffer.byteLength(css)<20000,'font CSS budget exceeded');
assert.equal((css.match(/@font-face/g)||[]).length,manifest.fonts.length);
for(const match of css.matchAll(/url\('([^']+)'\)/g))assert.ok(fs.existsSync(path.join(dist,'assets/fonts',match[1])));
console.log('PASS: font glyph coverage, variable weights, hashes and CSS budget ('+manifest.fonts.length+' subsets)');
