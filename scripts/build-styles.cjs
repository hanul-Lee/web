const sass=require('sass');
const fs=require('node:fs');
const path=require('node:path');
const {fileURLToPath}=require('node:url');
const {src,dist}=require('./lib/paths.cjs');
module.exports=function buildStyles(){
 fs.mkdirSync(dist,{recursive:true});
 for(const name of ['shared','portfolio','case']){
  const result=sass.compile(path.join(src,'styles',name+'.scss'),{sourceMap:true,style:'expanded'});
  const map={...result.sourceMap,sources:result.sourceMap.sources.map(url=>path.relative(dist,fileURLToPath(url)).split(path.sep).join('/'))};
  fs.writeFileSync(path.join(dist,name+'.css'),result.css+'\n\n/*# sourceMappingURL='+name+'.css.map */\n');
  fs.writeFileSync(path.join(dist,name+'.css.map'),JSON.stringify(map));
 }
};
if(require.main===module)module.exports();
