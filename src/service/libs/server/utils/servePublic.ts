import { readFileSync } from 'fs';
import { join } from 'path';
import { RequestHandler } from 'express';

const readFile = (filePath) => {
  try {
    return readFileSync(filePath);
  } catch (err) {
    return null;
  }
};

export const servePublic: RequestHandler = (req, res, next) => {
  const file = req.path.replace(/^\/$/, 'index.html');

  const filePath = join(process.cwd(), 'src', 'public', file);
  if (req.path.endsWith('.js')) res.setHeader('Content-Type', 'application/javascript');

  const result = readFile(filePath);
  if (result) {
    res.statusCode = 200;
    return res.end(result);
  }
  res.statusCode = 404;
  res.json({ error: 'Not found', path: req.path, file, headers: req.headers });
  next();
};
