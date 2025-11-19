// list-routes.js
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DOCUS_AURUS_DIR = path.join(ROOT, '.docusaurus');

if (!fs.existsSync(DOCUS_AURUS_DIR)) {
  console.error('Could not find .docusaurus directory.');
  console.error('Run `npm run start` or `npm run build` first.');
  process.exit(1);
}

const jsonFiles = [];

// Recursively collect all JSON files under .docusaurus
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      jsonFiles.push(full);
    }
  }
}

walk(DOCUS_AURUS_DIR);

const mappings = [];

function visit(obj, file) {
  if (!obj || typeof obj !== 'object') return;

  if (Object.prototype.hasOwnProperty.call(obj, 'source') &&
      Object.prototype.hasOwnProperty.call(obj, 'permalink')) {
    mappings.push({
      source: obj.source,
      permalink: obj.permalink,
      metaFile: file.replace(ROOT + path.sep, ''),
    });
  }

  for (const value of Object.values(obj)) {
    if (value && typeof value === 'object') {
      visit(value, file);
    }
  }
}

for (const file of jsonFiles) {
  try {
    const text = fs.readFileSync(file, 'utf8');
    if (!text.includes('"source"') || !text.includes('"permalink"')) continue;
    const json = JSON.parse(text);
    visit(json, file);
  } catch {
    // ignore JSON we can't parse
  }
}

if (!mappings.length) {
  console.log('No source/permalink mappings found in .docusaurus/*.json');
  process.exit(0);
}

console.log('Source file → Permalink (plus metadata file)');
console.log('-------------------------------------------');
for (const m of mappings) {
  console.log(`${m.source}  →  ${m.permalink}  [${m.metaFile}]`);
}

 //Optional: write CSV
 const csv = ['"source","permalink","metaFile"']
   .concat(mappings.map(m =>
     `"${m.source}","${m.permalink}","${m.metaFile}"`
   ))
   .join('\n');
 fs.writeFileSync('route-map.csv', csv);
 console.log('\nWrote route-map.csv');