const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
};

const server = http.createServer((request, response) => {
  const basePath = path.resolve('.');
  let filePath = '.' + request.url;
  if (filePath == './') filePath = './index.html';

  // Normalize and validate path to prevent directory traversal
  const resolvedPath = path.normalize(path.resolve(filePath));
  if (!resolvedPath.startsWith(basePath)) {
    response.writeHead(403);
    response.end('403 Forbidden');
    return;
  }

  // Strict extension allowlist check
  const extname = String(path.extname(resolvedPath)).toLowerCase();
  if (!mimeTypes.hasOwnProperty(extname)) {
    response.writeHead(403);
    response.end('403 Forbidden: File type not allowed');
    return;
  }

  const contentType = mimeTypes[extname];

  fs.readFile(resolvedPath, (error, content) => {
    if (error) {
      if(error.code == 'ENOENT') {
        response.writeHead(404);
        response.end('404 Not Found');
      } else {
        response.writeHead(500);
        response.end('500 Internal Server Error');
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType });
      response.end(content, 'utf-8');
    }
  });
});

server.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000/');
});
