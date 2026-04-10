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
  let filePath = '.' + request.url;
  if (filePath == './') filePath = './index.html';
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if(error.code == 'ENOENT') {
        response.writeHead(404);
        response.end('404 Not Found');
      } else {
        response.writeHead(500);
        response.end('500 Internal Server Error: ' + error.code);
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
