// HTML meta policies work on static hosting; header-only protections are applied by our preview server.
const csp=[
 "default-src 'self'",
 "script-src 'self' https://www.googletagmanager.com",
 "script-src-attr 'none'",
 // Existing project theme variables, zoom dimensions and the 404 stylesheet use inline styles.
 "style-src 'self' 'unsafe-inline'",
 "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com",
 "font-src 'self'",
 "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com",
 "object-src 'none'",
 "base-uri 'none'",
 "form-action 'none'",
 "frame-src 'none'",
 "worker-src 'none'"
].join('; ');
const headers={
 'Content-Security-Policy':csp+"; frame-ancestors 'none'",
 'X-Content-Type-Options':'nosniff',
 'X-Frame-Options':'DENY',
 'Referrer-Policy':'strict-origin-when-cross-origin',
 'Permissions-Policy':'camera=(), microphone=(), geolocation=()',
 'Cache-Control':'no-cache'
};
function addSecurityMeta(html){
 html=html.replace(/\s*<meta\s+(?:http-equiv="Content-Security-Policy"|name="referrer")[^>]*>/gi,'');
 return html.replace(/(<meta\s+charset="[^"]+"\s*\/?>)/i,`$1\n    <meta http-equiv="Content-Security-Policy" content="${csp}">\n    <meta name="referrer" content="strict-origin-when-cross-origin">`);
}
module.exports={csp,headers,addSecurityMeta};
