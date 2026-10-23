// Step 3: check the reviewer subagent's findings against schema.json.
// Usage: node src/validate.js --run <name> [--config <file>] [--model "<model id>"]
// Exit 1 with a list of errors if anything is wrong. Never edits findings.
import fs from 'fs';
import path from 'path';
import { ROOT_DIR, parseArgs, loadConfig, runDirOf, readJson, readFindings, updateMeta } from './common.js';

// Minimal JSON Schema check for the keywords used in schema.json
function check(value, schema, at, errors) {
  const t = schema.type;
  const typeOk =
    !t ||
    (t === 'object' && value !== null && typeof value === 'object' && !Array.isArray(value)) ||
    (t === 'array' && Array.isArray(value)) ||
    (t === 'string' && typeof value === 'string') ||
    (t === 'integer' && Number.isInteger(value)) ||
    (t === 'number' && typeof value === 'number');
  if (!typeOk) return errors.push(`${at}: expected ${t}`);
  if (schema.enum && !schema.enum.includes(value)) errors.push(`${at}: "${value}" not in ${schema.enum.join(',')}`);
  if (schema.minimum !== undefined && value < schema.minimum) errors.push(`${at}: < ${schema.minimum}`);
  if (schema.maximum !== undefined && value > schema.maximum) errors.push(`${at}: > ${schema.maximum}`);
  if (t === 'string' && schema.minLength && value.trim().length < schema.minLength) errors.push(`${at}: empty`);
  if (t === 'object') {
    for (const k of schema.required || []) if (!(k in value)) errors.push(`${at}.${k}: missing`);
    if (schema.additionalProperties === false) {
      for (const k of Object.keys(value)) if (!(k in (schema.properties || {}))) errors.push(`${at}.${k}: not allowed`);
    }
    for (const [k, s] of Object.entries(schema.properties || {})) if (k in value) check(value[k], s, `${at}.${k}`, errors);
  }
  if (t === 'array' && schema.maxItems !== undefined && value.length > schema.maxItems) errors.push(`${at}: more than ${schema.maxItems} items`);
  if (t === 'array' && schema.items) value.forEach((v, i) => check(v, schema.items, `${at}[${i}]`, errors));
}

function main() {
  const args = parseArgs();
  const config = loadConfig(args.config);
  const runDir = runDirOf(config, args.run);
  const schema = readJson(path.join(ROOT_DIR, 'schema.json'));
  const shotsDir = path.join(runDir, 'shots');
  if (!fs.existsSync(shotsDir)) throw new Error(`No screenshots in ${shotsDir}. Run capture first.`);

  const shots = fs.readdirSync(shotsDir).filter((f) => f.endsWith('.png')).map((f) => f.replace(/\.png$/, '')).sort();
  const findings = readFindings(runDir);
  const byName = new Map(findings.map((f) => [f.name, f]));
  const errors = [];

  for (const name of shots) if (!byName.has(name)) errors.push(`${name}.json: missing (screenshot has no findings file)`);
  for (const f of findings) {
    if (!shots.includes(f.name)) errors.push(`${f.name}.json: no matching screenshot`);
    check(f.data, schema, f.name, errors);
    const cut = f.name.lastIndexOf('-');
    const [page, viewport] = [f.name.slice(0, cut), f.name.slice(cut + 1)];
    if (f.data.page !== page || f.data.viewport !== viewport) {
      errors.push(`${f.name}: page/viewport must be "${page}"/"${viewport}"`);
    }
  }

  if (errors.length) {
    console.error(`INVALID (${errors.length} errors):`);
    errors.forEach((e) => console.error(`- ${e}`));
    process.exit(1);
  }
  const total = findings.reduce((n, f) => n + f.data.findings.length, 0);
  updateMeta(runDir, {
    validated_at: new Date().toISOString(),
    ...(args.model && args.model !== true ? { model: args.model } : {}),
    files: findings.length,
    findings: total
  });
  console.log(`VALID: ${findings.length} files, ${total} findings`);
}

try { main(); } catch (err) { console.error(`ERROR: ${err.message}`); process.exit(1); }
