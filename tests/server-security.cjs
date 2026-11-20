const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {dist,build}=require('../scripts/lib/paths.cjs');
const serve=require('../scripts/lib/server.cjs');
const {findSecrets}=require('../scripts/security-audit.cjs');
(async()=>{
 const outside=path.join(build,'preview-security-probe.txt'),link=path.join(dist,'preview-security-link.txt'),hidden=path.join(dist,'.env');
 fs.mkdirSync(build,{recursive:true});fs.writeFileSync(outside,'outside-public-root-marker');fs.symlinkSync(outside,link);fs.writeFileSync(hidden,'hidden-file-probe');
 let server;
 try{
  server=await serve();
  const request=(target,options={})=>new Promise((resolve,reject)=>{const r=http.request(server.url+target,options,response=>{let text='';response.setEncoding('utf8');response.on('data',chunk=>text+=chunk);response.on('end',()=>resolve({status:response.statusCode,headers:response.headers,text}));});r.on('error',reject);r.end();});
  const normal=await request('/index.html');assert.equal(normal.status,200);assert.match(normal.headers['content-security-policy'],/frame-ancestors 'none'/);assert.equal(normal.headers['x-content-type-options'],'nosniff');assert.equal(normal.headers['x-frame-options'],'DENY');
  assert.equal((await request('/index.html',{method:'HEAD'})).text,'');
  const pdf=await request('/assets/portfolio.pdf',{method:'HEAD'});assert.equal(pdf.status,200);assert.equal(pdf.headers['content-type'],'application/pdf');assert.equal(pdf.headers['content-security-policy'],undefined,'HTML object restrictions must not interfere with the native PDF viewer');
  assert.equal((await request('/index.html',{method:'POST'})).status,405);
  assert.equal((await request('/index.html',{headers:{Host:'untrusted.example'}})).status,403);
  for(const target of ['/.env','/.git/config','/src/content/projects.json','/%2e%2e%2fREADME.md','/preview-security-link.txt','/%00','/%zz']){
   const response=await request(target);assert.ok(response.status>=400,target+' must be blocked');assert.ok(!response.text.includes('outside-public-root-marker')&&!response.text.includes('hidden-file-probe'),target+' leaked content');
  }
  const missing=await request('/missing/deep/page');assert.equal(missing.status,404);assert.ok(missing.text.includes('페이지를 찾을 수 없습니다.'));
  assert.equal(findSecrets('ghp_'+'A'.repeat(36),'probe').length,1);assert.equal(findSecrets(JSON.stringify({private_key:'-----BEGIN '+'PRIVATE KEY-----'}),'embedded-key-probe').length,1);assert.equal(findSecrets('G-WD9CM53DY0','public-measurement-id').length,0);
  console.log('PASS: symlink escape, traversal, hidden files, hostile Host, unsafe methods, response headers and secret-scan probes');
 }finally{await server?.close();for(const file of [link,hidden,outside])fs.rmSync(file,{force:true});}
})().catch(e=>{console.error(e);process.exitCode=1;});
