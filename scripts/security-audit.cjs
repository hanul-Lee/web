const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {root,dist}=require('./lib/paths.cjs');
const {csp}=require('./lib/security.cjs');
const patterns=[
 ['private key',/-----BEGIN (?:RSA |EC |OPENSSH |DSA |ENCRYPTED )?PRIVATE KEY-----/g],
 ['GitHub token',/\b(?:gh[pousr]_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{50,})\b/g],
 ['AWS access key',/\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g],
 ['Google API key',/\bAIza[0-9A-Za-z_-]{35}\b/g]
];
function findSecrets(text,file){const findings=[];for(const [kind,pattern]of patterns){pattern.lastIndex=0;for(const match of text.matchAll(pattern))findings.push({file,line:text.slice(0,match.index).split('\n').length,kind});}return findings;}
function files(folder){const result=[];for(const item of fs.readdirSync(folder,{withFileTypes:true})){const name=path.join(folder,item.name);if(item.isSymbolicLink())throw Error('Symlink in published output: '+path.relative(root,name));if(item.isDirectory())result.push(...files(name));else result.push(name);}return result;}
function audit(){
 const findings=[];
 const ignore=new Set(['.git','node_modules','.history','.local','.build','.venv-fonts','dist','output']);
 const scan=folder=>{for(const item of fs.readdirSync(folder,{withFileTypes:true})){if(ignore.has(item.name))continue;const file=path.join(folder,item.name);if(item.isSymbolicLink())continue;if(item.isDirectory())scan(file);else if(/\.(?:[cm]?js|json|ya?ml|md|html|scss|css|txt|py|swift)$/.test(item.name)&&fs.statSync(file).size<2000000)findings.push(...findSecrets(fs.readFileSync(file,'utf8'),path.relative(root,file)));}};
 scan(root);
 for(const file of files(dist)){
  const relative=path.relative(dist,file);
  assert.ok(!relative.split(path.sep).some(p=>p.startsWith('.')&&p!=='.nojekyll'),'Hidden public file: '+relative);
  assert.ok(!/\.(?:pem|key|p12|pfx|py|swift|scss|ya?ml)$/i.test(relative),'Non-public source or key in output: '+relative);
  if(!/\.(?:html|js|css|svg|json|txt|map)$/.test(file))continue;
  const text=fs.readFileSync(file,'utf8');findings.push(...findSecrets(text,'dist/'+relative));
  if(file.endsWith('.svg'))assert.ok(!/<script\b|<foreignObject\b|\son\w+\s*=|(?:href|src)\s*=\s*["'](?:https?:|javascript:)/i.test(text),'Active SVG content: '+relative);
  if(!file.endsWith('.html'))continue;
  assert.ok(text.includes(`<meta http-equiv="Content-Security-Policy" content="${csp}">`),'Missing CSP: '+relative);
  assert.ok(text.indexOf('Content-Security-Policy')<text.indexOf('<link'),'CSP must precede resources: '+relative);
  assert.ok(text.includes('<meta name="referrer" content="strict-origin-when-cross-origin">'),'Missing referrer policy: '+relative);
  for(const tag of text.matchAll(/<[^>]+>/g))assert.ok(!/\son[a-z]+\s*=/i.test(tag[0]),'Inline event handler in '+relative);
  for(const script of text.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi))assert.ok(/\bsrc=/.test(script[1])&&!script[2].trim(),'Inline script in '+relative);
  for(const link of text.matchAll(/<a\b([^>]+)>/gi)){
   const href=link[1].match(/\bhref="([^"]*)"/i)?.[1]||'';
   assert.ok(!/^\s*(?:javascript|data|vbscript):|^\/\//i.test(href),'Unsafe link in '+relative);
   if(/target="_blank"/.test(link[1])){const rel=link[1].match(/rel="([^"]*)"/)?.[1].split(/\s+/)||[];assert.ok(rel.includes('noopener')&&rel.includes('noreferrer'),'Unsafe new-tab link: '+relative);}
  }
 }
 const workflow=fs.readFileSync(path.join(root,'.github/workflows/verify.yml'),'utf8');
 for(const action of workflow.matchAll(/uses:\s+([^\s#]+)/g))assert.match(action[1],/@[a-f0-9]{40}$/,'GitHub Action must use an immutable commit');
 assert.ok(!/pull_request_target:|permissions:\s*write-all/.test(workflow),'Unsafe CI execution permissions');
 assert.equal(findings.length,0,'Potential credentials found (values omitted): '+JSON.stringify(findings));
 console.log('PASS: source credential-pattern scan, public-file boundaries, CSP, links and static script policy');
}
module.exports={findSecrets,audit};
if(require.main===module)audit();
