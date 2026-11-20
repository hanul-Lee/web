const {spawnSync}=require('node:child_process');
const fs=require('node:fs'),path=require('node:path');
const {root}=require('./lib/paths.cjs');
module.exports=function buildFonts(){
 const local=path.join(root,'.venv-fonts/bin/python');
 const python=process.env.FONT_PYTHON||(fs.existsSync(local)?local:'python3');
 const result=spawnSync(python,[path.join(__dirname,'subset-fonts.py')],{stdio:'inherit'});
 if(result.error)throw result.error;
 if(result.status!==0)throw Error('Font subsetting failed. Install scripts/font-requirements.txt and set FONT_PYTHON.');
};
if(require.main===module)module.exports();
