const fs=require('node:fs'),path=require('node:path');
const paths=require('../../scripts/lib/paths.cjs');
const projects=require('../../src/content/projects.json');
const withChrome=require('../../scripts/lib/chrome.cjs');
const {pathToFileURL}=require('node:url');
const pages=['index.html',...Object.keys(projects.projects).sort().map(s=>'project-'+s+'.html')];
const readBuilt=file=>fs.readFileSync(path.join(paths.dist,file),'utf8');
const readSource=file=>fs.readFileSync(path.join(paths.src,file),'utf8');
async function ready(evaluate,file){
 const expected=file==='index.html'?'home':file.slice(8,-5);
 for(let n=0;n<200;n++){
  if(await evaluate(`location.pathname.endsWith(${JSON.stringify('/'+file)})&&document.readyState==='complete'&&(document.body.dataset.project||'home')===${JSON.stringify(expected)}&&!!document.querySelector('#primary-nav')`))return;
  await new Promise(r=>setTimeout(r,25));
 }
 throw Error('Page did not become ready: '+file);
}
const settle=evaluate=>evaluate(`(async()=>{for(const image of document.images)image.loading='eager';await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));})()`);
async function navigate(client,file,{loadImages=true}={}){await client.send('Page.navigate',{url:pathToFileURL(path.join(paths.dist,file)).href});await ready(client.evaluate,file);if(loadImages)await settle(client.evaluate);}
module.exports={...paths,projects,pages,readBuilt,readSource,withChrome,ready,settle,navigate};
