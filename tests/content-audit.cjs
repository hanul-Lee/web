const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const {root,src,dist,build,projects,pages,readBuilt,readSource}=require('./helpers/site.cjs');
const renderer=fs.readFileSync(path.join(root,'scripts/render-project.js'),'utf8');
const prefix=renderer.slice(0,renderer.indexOf('const slug = document.body.dataset.project;'));
for(const key of Object.keys(projects.projects)){
 const html=vm.runInNewContext(`const {projects,caseStudies,projectOrder}=${JSON.stringify(projects)};\n`+prefix+`\nconst slug=${JSON.stringify(key)};renderStudy(caseStudies[slug])`);
 assert.ok(!html.includes('undefined'),key+' undefined output');
 if(key==='platform')assert.ok(html.indexOf('id="solution"')<html.indexOf('id="decision"'));
 if(key==='tbm')assert.ok(html.includes('사용 규모와 작성 시간 변화는 운영 중 현장 의견을 기준으로 정리했습니다.'));
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);assert.equal(new Set(ids).size,ids.length,key+' duplicate IDs');
 for(const m of html.matchAll(/src="([^"]+)"/g))assert.ok(fs.existsSync(path.join(dist,m[1].split(/[?#]/)[0])),key+' missing '+m[1]);
 for(const m of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(m[1]),key+' broken section '+m[1]);
 const built=readBuilt('project-'+key+'.html'),p=projects.projects[key];
 assert.ok(built.includes(p.lead)&&built.includes(p.problem)&&built.includes('data-prerendered="true"'),key+' missing static body');
 assert.equal((built.match(/id="brief"/g)||[]).length,1,key+' duplicate brief');
 assert.ok(built.includes('class="next-preview"')&&built.includes('class="next-copy"'),key+' missing next case preview');
 assert.ok(!built.includes('render-project.js')&&!built.includes('projects.json'),'build-only data must not be delivered');
}
for(const file of pages){
 const html=readBuilt(file);
 for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
  const url=m[1];if(/^(https?:|mailto:|tel:|data:)/.test(url))continue;
  assert.ok(fs.existsSync(path.join(dist,url.split(/[?#]/)[0])),file+' missing '+url);
 }
 const pdfLinks=[...(html+readSource('scripts/components.js')).matchAll(/assets\/portfolio\.pdf(?:\?[^"'\s<>]*)?/g)].map(m=>m[0]);
 assert.ok(pdfLinks.length);assert.equal(new Set(pdfLinks).size,1,file+' inconsistent PDF versions');
 assert.ok(html.includes('srcset=')&&html.includes('rel="canonical"')&&html.includes('property="og:image"'));
 assert.ok(html.indexOf('shared.css?')<html.indexOf(file==='index.html'?'portfolio.css?':'case.css?'));
 if(file!=='index.html')assert.ok(!html.includes('portfolio.css?'));
}
const manifest=require('../src/content/image-manifest.json');
for(const entry of Object.values(manifest)){
 // Only referenced assets are copied to dist.
 if(fs.existsSync(path.join(dist,entry.src)))for(const v of entry.variants)assert.ok(fs.existsSync(path.join(dist,v.src)));
}
const home=readBuilt('index.html');assert.equal((home.match(/fetchpriority="high"/g)||[]).length,1);
assert.match(home,/<a class="work-visual[^>]*>[\s\S]*?<img[^>]*loading="lazy"/);
assert.ok(Buffer.byteLength(readSource('scripts/case.js'))<14000,'project runtime exceeded budget');
for(const [name,blocks]of Object.entries(require('./fixtures/impact-strong.json'))){const data=name.endsWith('.scss')?readSource('styles/'+name):readBuilt(name);assert.deepEqual(data.match(/\.impact-flow strong\s*\{[^}]*\}/g),blocks,'Protected styles changed: '+name);}
assert.ok(!/@import\b/.test(readBuilt('case.css')));
assert.ok(!fs.existsSync(path.join(dist,'src'))&&!fs.existsSync(path.join(dist,'scripts'))&&!fs.existsSync(path.join(dist,'docs')),'source or archive leaked into output');
assert.equal(fs.readdirSync(path.join(src,'templates')).filter(f=>f==='project.html').length,1);
console.log('PASS: one project template, 11 static pages, public assets, next previews, metadata, priorities and protected styles');
// Analytics stay testable without contacting GA.
const listeners={},events=[];
const window={location:{protocol:'https:',hostname:'hanul-lee.github.io',href:'https://hanul-lee.github.io/web/'},navigator:{doNotTrack:'0'}};
const document={referrer:'',body:{dataset:{project:'tbm'}},createElement:()=>({}),head:{appendChild(){}},addEventListener:(name,fn)=>listeners[name]=fn};
vm.runInNewContext(readSource('scripts/analytics.js'),{window,document,URL,URLSearchParams,Date});window.gtag=(...a)=>events.push(a);
for(const [href,next]of [['project-platform.html',false],['project-designsystem.html',true],['mailto:example@example.com',false]]){const link={getAttribute:()=>href,closest:s=>s==='.next'?next:s.includes('.work-case')};listeners.click({target:{closest:()=>link}});}
assert.deepEqual(events.map(e=>e[1]),['project_click','next_project_click','contact_click']);assert.ok(!JSON.stringify(events).includes('example@'));
console.log('PASS: analytics event names and privacy');
