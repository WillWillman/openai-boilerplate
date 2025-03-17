import { readFileSync } from 'fs';
import { join } from 'path';
import { RequestHandler } from 'express';

const readFile = (filePath) => {
  try {
    console.log('filePath', filePath);
    const file = join(process.cwd(), 'src', 'public', filePath);
    console.log('file', file);
    return readFileSync(file).toString();
  } catch (err) {
    return null;
  }
};

export const servePublic: RequestHandler = (req, res, next) => {

  if (req.path.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');

  const result = readFile(req.path) || readFile('index.html');
  res.statusCode = 200;
  res.end(result);
};
