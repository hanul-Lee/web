// Compare full-page geometry and key computed styles across a stylesheet refactor.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const assert=require('node:assert/strict');
const {fileURLToPath}=require('node:url');
const {withChrome,pages,navigate}=require('./helpers/site.cjs');
const snapshot=process.env.STYLE_SNAPSHOT||path.join(os.tmpdir(),'portfolio-styles-before.json');
const write=process.argv.includes('--write');
const existing=process.argv.includes('--existing-content');
const comparable=elements=>{if(!existing)return elements;const next=elements.findIndex(e=>e.element==='DIV.next');return next<0?elements:elements.slice(0,next);};
const before=write?null:JSON.parse(fs.readFileSync(snapshot,'utf8'));
(async()=>{const result={};await withChrome(async({send,evaluate,on})=>{
 const requestedFonts=new Set();on('Network.responseReceived',({type,response})=>{if(type==='Font')requestedFonts.add(response.url);});await send('Network.enable');
 for(const width of [390,801,1280]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false});
  for(const file of pages){
   requestedFonts.clear();
   await navigate({send,evaluate},file);
   const key=file+':'+width;
   result[key]=await evaluate(`({elements:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().width&&e.getBoundingClientRect().height&&getComputedStyle(e).visibility!=='hidden').map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {element:e.tagName+'.'+(e.getAttribute('class')||''),rect:[r.x,r.y,r.width,r.height],style:['display','position','fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color','backgroundColor','padding','margin','borderRadius'].map(p=>s[p])}}),fonts:performance.getEntriesByType('resource').map(r=>r.name).filter(n=>n.includes('.woff2'))})`);
   result[key].fonts=[...requestedFonts];
   if(!write){const a=comparable(before[key].elements),b=comparable(result[key].elements);assert.equal(b.length,a.length,key+' element count');for(let i=0;i<a.length;i++){assert.equal(b[i].element,a[i].element,key+' element '+i);/* Auto margins may be reported before or after flex layout resolution; compare actual geometry below. */assert.deepEqual(b[i].style.filter((_,j)=>j!==10),a[i].style.filter((_,j)=>j!==10),key+' '+a[i].element+' style');for(let j=0;j<4;j++){if(existing&&j===3&&['MAIN.case-main','SECTION.case-body'].includes(a[i].element))continue;assert.ok(Math.abs(b[i].rect[j]-a[i].rect[j])<1,key+' '+a[i].element+' geometry '+j+': '+a[i].rect[j]+' → '+b[i].rect[j]);}}}
  }
  console.log('PASS: '+width+'px '+(write?'recorded':'preserved')+' styles and geometry, 11 pages');
 }
 });
 if(write)fs.writeFileSync(snapshot,JSON.stringify(result));
 for(const width of [390,1280]){const fonts=[...new Set(result['index.html:'+width].fonts)];const bytes=fonts.reduce((n,url)=>n+fs.statSync(fileURLToPath(url)).size,0);console.log('Home font requests '+width+'px: '+fonts.length+' files, '+bytes+' bytes');}
})().catch(e=>{console.error(e);process.exitCode=1;});
