// Run template validation without a browser; browser layout QA remains separate.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const s=fs.readFileSync('case.js','utf8');
const prefix=s.slice(0,s.indexOf('const slug = document.body.dataset.project;'));
const keys=['platform','tbm','dashboard','designsystem','intranet','kanvan','responsive','psc','skyautonet','pet'];
const images=new Set();
for(const key of keys){
 const {html,p}=vm.runInNewContext(prefix+`\nconst slug=${JSON.stringify(key)};({html:renderStudy(caseStudies[slug]),p:projects[slug]})`);
 assert.ok(!html.includes('undefined'),key+' undefined output');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);assert.equal(new Set(ids).size,ids.length,key+' duplicate IDs');
 for(const m of html.matchAll(/src="([^"]+)"/g)){assert.ok(fs.existsSync(m[1].split(/[?#]/)[0]),key+' missing '+m[1]);images.add(m[1]);}
 for(const m of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(m[1]),key+' broken section '+m[1]);
 assert.ok(p.period&&p.role&&p.stage,key+' missing scope');
}
for(const file of ['index.html',...keys.map(k=>'project-'+k+'.html')]){
 const h=fs.readFileSync(file,'utf8');
 for(const m of h.matchAll(/(?:src|href)="([^"#]+)"/g)){
  const url=m[1];if(/^(https?:|mailto:|tel:|data:)/.test(url))continue;
  assert.ok(fs.existsSync(url.split(/[?#]/)[0]),file+' missing '+url);
 }
 assert.ok(h.includes('portfolio.pdf?v=20261024-reviewed'),file+' stale PDF');
}
console.log('PASS: 10 project templates, 11 HTML files, '+images.size+' rendered image paths, section targets and PDF versions');
