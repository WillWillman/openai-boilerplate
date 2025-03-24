import { readFileSync } from 'fs';
import { join } from 'path';
import { RequestHandler } from 'express';

const readFile = (filePath) => {
  try {
    const file = join(process.cwd(), 'src', 'public', filePath);
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
