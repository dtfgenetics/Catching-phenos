import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const PORT = Number(process.env.PORT ?? 4173);
const ROOT = process.cwd();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav'
};

function resolvePath(urlPath) {
  const cleanUrl = decodeURIComponent(urlPath.split('?')[0]);
  const requested = cleanUrl === '/' ? '/public/games/phenoquest/index.html' : cleanUrl;
  const safePath = normalize(requested).replace(/^\.\.(\/|\\|$)/, '');
  const absolute = join(ROOT, safePath);

  if (existsSync(absolute) && statSync(absolute).isDirectory()) {
    return join(absolute, 'index.html');
  }

  return absolute;
}

const server = createServer((request, response) => {
  const filePath = resolvePath(request.url ?? '/');

  if (!existsSync(filePath)) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end(`Not found: ${request.url}`);
    return;
  }

  const contentType = MIME_TYPES[extname(filePath)] ?? 'application/octet-stream';
  response.writeHead(200, { 'content-type': contentType });
  createReadStream(filePath).pipe(response);
});

server.listen(PORT, () => {
  console.log(`PhenoQuest dev server running at http://localhost:${PORT}/public/games/phenoquest/`);
});
