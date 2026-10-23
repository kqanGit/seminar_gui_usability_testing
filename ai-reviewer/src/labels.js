// Labeling helpers.
//   node src/labels.js prepare --runs run-1,run-2,run-3 [--config <file>]
//       -> evidence/ai/to-label.json (input for the finding-labeler subagent)
//   node src/labels.js merge
//       -> evidence/ai/labels.csv from to-label.json + labels-ai.json,
//          keeping human_label / human_note already filled in.
//
// Label values in labels.csv: Gxx (or Gxx;Gyy) | Nxx (new valid issue) | false-positive
// human_label: empty = not reviewed · ok = agree with ai_label · otherwise the corrected label
import fs from 'fs';
import path from 'path';
import { EVIDENCE_AI_DIR, parseArgs, loadConfig, runDirOf, readJson, writeJson, toCsv, readCsvFile } from './common.js';

const TO_LABEL = path.join(EVIDENCE_AI_DIR, 'to-label.json');
const AI_LABELS = path.join(EVIDENCE_AI_DIR, 'labels-ai.json');
const CSV = path.join(EVIDENCE_AI_DIR, 'labels.csv');
export const LABEL_RE = /^(G\d{2}(;G\d{2})*|N\d{2}|false-positive)$/;

const COLUMNS = ['finding_id', 'run', 'page', 'viewport', 'heuristic', 'ai_severity', 'element', 'problem',
  'ai_label', 'confidence', 'ai_reason', 'human_label', 'human_note'];

function prepare(args) {
  if (!args.runs || args.runs === true) throw new Error('Missing --runs run-1,run-2,...');
  const config = loadConfig(args.config);
  const items = [];
  for (const run of String(args.runs).split(',').map((s) => s.trim()).filter(Boolean)) {
    const runDir = runDirOf(config, run);
    const file = path.join(runDir, 'findings-all.json');
    if (!fs.existsSync(file)) throw new Error(`${file} missing. Run validate + report for ${run}.`);
    for (const f of readJson(file)) {
      items.push({
        finding_id: f.finding_id, run, page: f.page, viewport: f.viewport, heuristic: f.heuristic,
        severity: f.severity, element: f.element, problem: f.problem, evidence: f.evidence,
        shot: path.join(runDir, f.shot)
      });
    }
  }
  writeJson(TO_LABEL, { config: path.basename(config._file), runs: String(args.runs).split(','), items });
  console.log(`to-label.json: ${items.length} findings -> ${TO_LABEL}`);
}

function merge() {
  const { items } = readJson(TO_LABEL);
  const ai = readJson(AI_LABELS);
  const byId = new Map(ai.map((a) => [a.finding_id, a]));
  const errors = [];
  if (ai.length !== items.length) errors.push(`labels-ai.json has ${ai.length} entries, expected ${items.length}`);

  const old = fs.existsSync(CSV) ? new Map(readCsvFile(CSV).map((r) => [r.finding_id, r])) : new Map();
  const rows = items.map((it) => {
    const a = byId.get(it.finding_id);
    let label = '';
    if (!a) errors.push(`${it.finding_id}: no AI label`);
    else {
      label = a.label === 'new-valid' ? a.new_issue_id : a.label;
      if (!LABEL_RE.test(label || '')) errors.push(`${it.finding_id}: bad label "${a.label}" / "${a.new_issue_id}"`);
    }
    const prev = old.get(it.finding_id) || {};
    return {
      finding_id: it.finding_id, run: it.run, page: it.page, viewport: it.viewport, heuristic: it.heuristic,
      ai_severity: it.severity, element: it.element, problem: it.problem,
      ai_label: label, confidence: a?.confidence ?? '', ai_reason: a?.reason ?? '',
      human_label: prev.human_label ?? '', human_note: prev.human_note ?? ''
    };
  });
  if (errors.length) {
    console.error(`INVALID labels-ai.json (${errors.length}):`);
    errors.forEach((e) => console.error(`- ${e}`));
    process.exit(1);
  }
  fs.writeFileSync(CSV, toCsv(rows, COLUMNS), 'utf-8');
  const reviewed = rows.filter((r) => r.human_label).length;
  console.log(`labels.csv: ${rows.length} rows, ${reviewed} human-reviewed, ${rows.filter((r) => r.confidence === 'low').length} low-confidence -> ${CSV}`);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]).endsWith(path.join('src', 'labels.js'));
if (isMain) {
  try {
    const args = parseArgs();
    const cmd = args._[0];
    if (cmd === 'prepare') prepare(args);
    else if (cmd === 'merge') merge();
    else throw new Error('Usage: labels.js prepare --runs ... | merge');
  } catch (err) { console.error(`ERROR: ${err.message}`); process.exit(1); }
}
