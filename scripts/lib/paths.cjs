const path=require('node:path');
const root=path.resolve(__dirname,'../..');
module.exports={root,src:path.join(root,'src'),dist:path.join(root,'dist'),build:path.join(root,'.build'),assets:path.join(root,'src/assets')};
