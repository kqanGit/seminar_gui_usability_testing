import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const REPO_ROOT = path.resolve(ROOT_DIR, '..');
export const EVIDENCE_AI_DIR = path.join(REPO_ROOT, 'evidence', 'ai');

// --key value / --flag  ->  { key: value, flag: true }
export function parseArgs(argv = process.argv.slice(2)) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) out[key] = true;
      else { out[key] = next; i++; }
    } else out._.push(a);
  }
  return out;
}

export function loadConfig(configArg) {
  const candidates = configArg
    ? [path.resolve(ROOT_DIR, configArg)]
    : [path.join(ROOT_DIR, 'config.json'), path.join(ROOT_DIR, 'config.example.json')];
  const file = candidates.find((f) => fs.existsSync(f));
  if (!file) throw new Error(`Config not found: ${candidates.join(' | ')}`);
  const config = JSON.parse(fs.readFileSync(file, 'utf-8'));
  config._file = file;
  config.outDir = path.resolve(ROOT_DIR, config.outDir || 'out');
  return config;
}

export function runDirOf(config, run) {
  if (!run || run === true) throw new Error('Missing --run <name>');
  return path.join(config.outDir, run);
}

export function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

export function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

export function updateMeta(runDir, patch) {
  const file = path.join(runDir, 'meta.json');
  const meta = fs.existsSync(file) ? readJson(file) : {};
  writeJson(file, { ...meta, ...patch });
}

// Findings files of one run, sorted: [{ name, file, data }]
export function readFindings(runDir) {
  const dir = path.join(runDir, 'findings');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .map((f) => ({ name: f.replace(/\.json$/, ''), file: path.join(dir, f), data: readJson(path.join(dir, f)) }));
}

// ---------- CSV (RFC 4180, UTF-8 with BOM so Excel shows Vietnamese) ----------
export function toCsv(rows, columns) {
  const esc = (v) => {
    const s = v === null || v === undefined ? '' : String(v);
    return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return '﻿' + [columns.join(','), ...rows.map((r) => columns.map((c) => esc(r[c])).join(','))].join('\r\n') + '\r\n';
}

export function parseCsv(text) {
  text = text.replace(/^﻿/, '');
  const rows = [];
  let row = [], field = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some((x) => x !== '')) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== '' || row.length) { row.push(field); if (row.some((x) => x !== '')) rows.push(row); }
  const [head, ...body] = rows;
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? '').trim()])));
}

export function readCsvFile(file) {
  let text = fs.readFileSync(file, 'utf-8');
  const firstLine = text.replace(/^﻿/, '').split(/\r?\n/)[0];
  if (!firstLine.includes(',') && firstLine.includes(';')) {
    throw new Error(`${file} was saved with ';' separators. Save it as "CSV UTF-8 (Comma delimited)".`);
  }
  return parseCsv(text);
}

// Ground truth. Default: ground-truth/heuristic-gt.json (U01..Unn, visible usability issues, human-reviewed).
// Also accepts the spec bug table ground-truth/bugs.md: | G01 | page | description | spec/heuristic | code | severity | ...
export const DEFAULT_GT = path.join(REPO_ROOT, 'ground-truth', 'heuristic-gt.json');
export function readGroundTruth(file = DEFAULT_GT) {
  if (file.endsWith('.json')) {
    const rows = JSON.parse(fs.readFileSync(file, 'utf-8'));
    if (!rows.length) throw new Error(`No ground-truth rows found in ${file}`);
    return rows.map((r) => ({ id: r.id, page: r.pages.join(', '), viewports: r.viewports, description: r.problem, heuristic: r.heuristics.join(', '), severity: r.severity }));
  }
  const bugs = [];
  for (const line of fs.readFileSync(file, 'utf-8').split(/\r?\n/)) {
    const cells = line.split('|').map((c) => c.trim());
    if (cells.length > 7 && /^G\d{2}$/.test(cells[1])) {
      bugs.push({ id: cells[1], page: cells[2], description: cells[3], heuristic: cells[4], severity: Number(cells[6]) });
    }
  }
  if (!bugs.length) throw new Error(`No ground-truth rows found in ${file}`);
  return bugs;
}
