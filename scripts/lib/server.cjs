const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {dist}=require('./paths.cjs');
const {headers}=require('./security.cjs');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.map':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.woff2':'font/woff2','.pdf':'application/pdf','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
module.exports=async function serve(port=0){
 if(!fs.existsSync(path.join(dist,'index.html')))throw Error('dist/ is missing. Run npm run build first.');
 const root=fs.realpathSync(dist);
 const inside=file=>file===root||file.startsWith(root+path.sep);
 const server=http.createServer((request,response)=>{
  for(const [name,value]of Object.entries(headers))response.setHeader(name,value);
  const finish=status=>{response.writeHead(status).end();};
  const expectedPort=server.address().port;
  if(!new Set(['127.0.0.1:'+expectedPort,'localhost:'+expectedPort]).has(request.headers.host?.toLowerCase())){finish(403);return;}
  if(!['GET','HEAD'].includes(request.method)){response.setHeader('Allow','GET, HEAD');finish(405);return;}
  let decoded;
  try{
   if(!request.url.startsWith('/')||request.url.startsWith('//'))throw Error('Invalid target');
   decoded=decodeURIComponent(new URL(request.url,'http://localhost').pathname);
   if(decoded.includes('\0')||decoded.includes('\\'))throw Error('Invalid path');
  }catch{finish(400);return;}
  if(decoded.split('/').some(part=>part.startsWith('.')&&part!=='.'&&part!=='..')){finish(404);return;}
  let file=path.resolve(root,'.'+decoded),status=200;
  if(!inside(file)){finish(403);return;}
  try{
   // Follow and validate every path, including symlinked directories, before reading files.
   if(fs.existsSync(file)){
    file=fs.realpathSync(file);if(!inside(file)){finish(403);return;}
    if(fs.statSync(file).isDirectory())file=path.join(file,'index.html');
   }
   if(!fs.existsSync(file)||!fs.statSync(file).isFile()){file=path.join(root,'404.html');status=404;}
   file=fs.realpathSync(file);if(!inside(file)){finish(403);return;}
   const type=types[path.extname(file).toLowerCase()];if(!type){finish(404);return;}
   const descriptor=fs.openSync(file,fs.constants.O_RDONLY|fs.constants.O_NOFOLLOW);
   const stat=fs.fstatSync(descriptor);
   if(!stat.isFile()){fs.closeSync(descriptor);finish(404);return;}
   if(path.extname(file).toLowerCase()!=='.html')response.removeHeader('Content-Security-Policy');
   response.writeHead(status,{'Content-Type':type,'Content-Length':stat.size});
   if(request.method==='HEAD'){fs.closeSync(descriptor);response.end();}
   else fs.createReadStream(file,{fd:descriptor,autoClose:true}).on('error',()=>response.destroy()).pipe(response);
  }catch{if(!response.headersSent)finish(404);else response.destroy();}
 });
 server.requestTimeout=10000;server.headersTimeout=10000;
 await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(port,'127.0.0.1',resolve);});
 return {url:'http://127.0.0.1:'+server.address().port,close:()=>new Promise(resolve=>server.close(resolve))};
};
