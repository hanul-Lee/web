// Conservatively remove selectors whose classes never occur in built pages or runtime code.
const fs=require('node:fs'),path=require('node:path'),scss=require('postcss-scss');
const {src,dist}=require('../lib/paths.cjs');
const htmlDir=process.env.PRUNE_HTML_DIR||dist;
let corpus=fs.readdirSync(htmlDir).filter(f=>f.endsWith('.html')).map(f=>fs.readFileSync(path.join(htmlDir,f),'utf8')).join('\n');
const runtime=fs.readdirSync(path.join(src,'scripts')).map(f=>fs.readFileSync(path.join(src,'scripts',f),'utf8')).join('\n');
corpus+='\n'+runtime+'\n'+fs.readFileSync(path.join(__dirname,'../render-project.js'),'utf8');
const used=new Set();
for(const match of corpus.matchAll(/class=["']([^"']+)["']/g))match[1].split(/\s+/).forEach(c=>used.add(c));
for(const match of corpus.matchAll(/\.className\s*=\s*["']([^"']+)["']/g))match[1].split(/\s+/).forEach(c=>used.add(c));
for(const match of corpus.matchAll(/classList\.\w+\(([^)]+)\)/g))for(const name of match[1].matchAll(/["']([\w-]+)["']/g))used.add(name[1]);
for(const match of runtime.matchAll(/\.([A-Za-z_][\w-]*)/g))used.add(match[1]);
const imageSources=[...corpus.matchAll(/src=["']([^"']+)["']/g)].map(m=>m[1]);
const write=process.argv.includes('--write');
let count=0;
for(const name of ['shared','portfolio','case']){
 const file=path.join(src,'styles',name+'.scss'),tree=scss.parse(fs.readFileSync(file,'utf8'));
 tree.walkRules(rule=>{
  if(rule.selector.includes('.impact-flow strong'))return;
  const keep=rule.selectors.filter(selector=>{
   if(/:(?:is|not|has|where)\(/.test(selector))return true;
   const image=selector.match(/\[src\^?=["']([^"']+)/)?.[1];if(image&&!imageSources.some(src=>src.startsWith(image)))return false;
   return [...selector.matchAll(/\.([A-Za-z_][\w-]*)/g)].every(m=>used.has(m[1]));
  });
  count+=rule.selectors.length-keep.length;
  if(!keep.length)rule.remove();else if(keep.length!==rule.selectors.length)rule.selectors=keep;
 });
 tree.walkAtRules(rule=>{if(rule.nodes&&!rule.nodes.length)rule.remove();});
 if(write)fs.writeFileSync(file,tree.toString());
}
console.log((write?'Removed':'Found')+' '+count+' unused legacy selectors. Protected impact rules were retained.');
