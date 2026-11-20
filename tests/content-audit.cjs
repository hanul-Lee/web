// Run template validation without a browser; browser layout QA remains separate.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const s=fs.readFileSync('case.js','utf8');
const prefix=s.slice(0,s.indexOf('const slug = document.body.dataset.project;'));
const keys=['platform','tbm','dashboard','designsystem','intranet','kanvan','responsive','psc','skyautonet','pet'];
const images=new Set();
for(const key of keys){
 const {html,p}=vm.runInNewContext(prefix+`\nconst slug=${JSON.stringify(key)};({html:renderStudy(caseStudies[slug]),p:projects[slug]})`);
 assert.ok(!html.includes('undefined'),key+' undefined output');
 if(key==='platform') assert.ok(html.indexOf('id="solution"')<html.indexOf('id="decision"'),'platform workflow must precede menu comparison');
 if(key==='tbm') assert.ok(html.includes('class="impact-note"') && html.includes('사용 규모와 작성 시간 변화는 운영 중 현장 의견을 기준으로 정리했습니다.'),'TBM field feedback attribution must remain visible');
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
 const shared = fs.readFileSync('components.js','utf8');
 const pdfLinks = [...(h + shared).matchAll(/assets\/portfolio\.pdf(?:\?[^"'\s<>]*)?/g)].map(m=>m[0]);
 assert.ok(pdfLinks.length, file+' missing PDF link');
 assert.equal(new Set(pdfLinks).size, 1, file+' inconsistent PDF links');
}
console.log('PASS: 10 project templates, 11 HTML files, '+images.size+' rendered image paths, section targets and PDF versions');

const manifest=JSON.parse(fs.readFileSync('tools/image-manifest.json','utf8'));
for(const image of Object.values(manifest))for(const variant of image.variants)assert.ok(fs.existsSync(variant.src),'missing responsive image '+variant.src);
for(const key of keys){
 const html=fs.readFileSync('project-'+key+'.html','utf8');
 assert.ok(html.includes('data-prerendered="true"'),key+' missing static rendering');
 const project=vm.runInNewContext(prefix+`\nprojects[${JSON.stringify(key)}]`);
 assert.ok(html.includes(project.lead)&&html.includes(project.problem),key+' missing project body');
 for(const selector of ['case-lead','gallery','brief-facts'])assert.ok(html.includes(selector),key+' missing static content '+selector);
 assert.ok(!/<p class="case-lead"><\/p>/.test(html),key+' empty static lead');
 assert.ok(html.includes('srcset=')&&html.includes('rel="canonical"')&&html.includes('property="og:image"'),key+' missing image or SEO metadata');
 assert.equal((html.match(/id="brief"/g)||[]).length,1,key+' duplicate brief');
}
console.log('PASS: responsive image variants and static project content / sharing metadata');

// Verify click events without contacting GA or sending personal contact values.
const listeners={},events=[];
const window={location:{protocol:'https:',hostname:'hanul-lee.github.io',href:'https://hanul-lee.github.io/web/'},navigator:{doNotTrack:'0'}};
const document={referrer:'',body:{dataset:{project:'tbm'}},createElement:()=>({}),head:{appendChild(){}},addEventListener:(name,fn)=>listeners[name]=fn};
vm.runInNewContext(fs.readFileSync('analytics.js','utf8'),{window,document,URL,URLSearchParams,Date});
window.gtag=(...args)=>events.push(args);
for(const [href,next]of [['project-platform.html',false],['project-designsystem.html',true],['mailto:example@example.com',false]]){
 const link={getAttribute:()=>href,closest:selector=>selector==='.next'?next:selector.includes('.work-case')};
 listeners.click({target:{closest:()=>link}});
}
assert.deepEqual(events.map(e=>e[1]),['project_click','next_project_click','contact_click']);
assert.equal(events[0][2].project_id,'platform');assert.equal(events[1][2].source_project,'tbm');
assert.ok(!JSON.stringify(events).includes('example@'));
console.log('PASS: project, next-project and contact analytics events');
