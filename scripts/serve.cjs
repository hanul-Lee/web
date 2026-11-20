require('./lib/server.cjs')(Number(process.env.PORT)||4173).then(server=>console.log('Serving dist/ at '+server.url)).catch(e=>{console.error(e);process.exitCode=1;});
