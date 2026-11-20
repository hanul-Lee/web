const sass=require('sass');
const fs=require('node:fs');
const path=require('node:path');
const {fileURLToPath}=require('node:url');
for(const name of ['shared','portfolio']){
 const result=sass.compile(name+'.scss',{sourceMap:true,style:'expanded'});
 const map={...result.sourceMap,sources:result.sourceMap.sources.map(url=>path.relative(process.cwd(),fileURLToPath(url)).split(path.sep).join('/'))};
 fs.writeFileSync(name+'.css',result.css+'\n\n/*# sourceMappingURL='+name+'.css.map */\n');
 fs.writeFileSync(name+'.css.map',JSON.stringify(map));
}
