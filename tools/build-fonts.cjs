const {spawnSync}=require('node:child_process');
const path=require('node:path');
const result=spawnSync(process.env.FONT_PYTHON||'python3',[path.join(__dirname,'subset-fonts.py')],{stdio:'inherit'});
if(result.error)throw result.error;
if(result.status!==0)throw Error('Font subsetting failed. Install tools/font-requirements.txt and set FONT_PYTHON.');
