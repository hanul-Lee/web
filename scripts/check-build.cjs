const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {spawnSync}=require('node:child_process');
const {root,dist,build}=require('./lib/paths.cjs');
function snapshot(){
 const hashes={};
 const visit=folder=>{for(const item of fs.readdirSync(folder,{withFileTypes:true})){const file=path.join(folder,item.name);if(item.isDirectory())visit(file);else hashes[path.relative(root,file)]=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');}};
 visit(dist);hashes['.build/font-manifest.json']=crypto.createHash('sha256').update(fs.readFileSync(path.join(build,'font-manifest.json'))).digest('hex');
 return hashes;
}
const before=snapshot();
const result=spawnSync(process.execPath,[path.join(__dirname,'build-site.cjs')],{cwd:root,stdio:'inherit'});
if(result.error)throw result.error;if(result.status!==0)process.exit(result.status||1);
assert.deepEqual(snapshot(),before,'Build output changed on an identical rebuild');
console.log('PASS: deterministic rebuild, '+Object.keys(before).length+' generated files');
