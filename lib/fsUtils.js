import fs from 'fs';
import path from 'path';

function readJSON(filename) {
  const filepath = path.join(process.cwd(), filename);
  const content = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(content);
}

export { readJSON };