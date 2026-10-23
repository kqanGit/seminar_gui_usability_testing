// Human vs AI metrics from evidence/ai/labels.csv + ground-truth/bugs.md.
// Usage: node src/compare.js --runs run-1,run-2,run-3 [--config <file>]
// Writes evidence/ai/comparison-summary.md and archives the runs to evidence/ai/runs/<run>/.
import fs from 'fs';
import path from 'path';
import { EVIDENCE_AI_DIR, parseArgs, loadConfig, runDirOf, readJson, readCsvFile, readGroundTruth } from './common.js';
import { LABEL_RE } from './labels.js';

const PAPER = { precision: '0,60 (người 0,83)', recall: '0,38 (1 chuyên gia 0,34)', overlap: '62% / 29% / 9%' };
const fmt = (x, d = 2) => (x === null || Number.isNaN(x) ? '—' : x.toFixed(d).replace('.', ','));
const pct = (a, b) => (b ? `${Math.round((100 * a) / b)}%` : '—');

function finalLabel(r) {
  const h = (r.human_label || '').trim();
  return !h || h.toLowerCase() === 'ok' ? r.ai_label : h;
}

function runMetrics(rows, gt) {
  const gtSev = new Map(gt.map((g) => [g.id, g.severity]));
  const gtFound = new Set();
  const newFound = new Set();
  let correct = 0;
  const sevDiffs = [];
  for (const r of rows) {
    const l = r.final;
    if (l.startsWith('G')) {
      correct++;
      const ids = l.split(';');
      ids.forEach((id) => gtFound.add(id));
      const known = ids.filter((id) => gtSev.has(id)).map((id) => gtSev.get(id));
      if (known.length) sevDiffs.push(Math.abs(Number(r.ai_severity) - known.reduce((a, b) => a + b, 0) / known.length));
    } else if (l.startsWith('N')) {
      correct++;
      newFound.add(l);
    }
  }
  return {
    n: rows.length,
    correct,
    fp: rows.length - correct,
    precision: rows.length ? correct / rows.length : null,
    gtFound,
    newFound,
    recall: gtFound.size / gt.length,
    mae: sevDiffs.length ? sevDiffs.reduce((a, b) => a + b, 0) / sevDiffs.length : null
  };
}

function copyDir(src, dst) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dst, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    const s = path.join(src, f), d = path.join(dst, f);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function main() {
  const args = parseArgs();
  if (!args.runs || args.runs === true) throw new Error('Missing --runs run-1,run-2,...');
  const runs = String(args.runs).split(',').map((s) => s.trim()).filter(Boolean);
  const config = loadConfig(args.config);
  const gt = readGroundTruth();
  const all = readCsvFile(path.join(EVIDENCE_AI_DIR, 'labels.csv'));

  const errors = [];
  for (const r of all) {
    r.final = finalLabel(r);
    if (!LABEL_RE.test(r.final)) errors.push(`${r.finding_id}: invalid label "${r.final}"`);
    for (const id of r.final.startsWith('G') ? r.final.split(';') : []) {
      if (!gt.some((g) => g.id === id)) errors.push(`${r.finding_id}: ${id} not in ground truth`);
    }
  }
  if (errors.length) {
    console.error(`Fix labels.csv (${errors.length}):`);
    errors.forEach((e) => console.error(`- ${e}`));
    process.exit(1);
  }

  const per = runs.map((run) => {
    const metaFile = path.join(runDirOf(config, run), 'meta.json');
    const meta = fs.existsSync(metaFile) ? readJson(metaFile) : {};
    const minutes = meta.started_at && meta.validated_at ? (new Date(meta.validated_at) - new Date(meta.started_at)) / 60000 : null;
    return { run, meta, minutes, ...runMetrics(all.filter((r) => r.run === run), gt) };
  });

  // Union over runs
  const gtUnion = new Set(per.flatMap((p) => [...p.gtFound]));
  const newUnion = new Set(per.flatMap((p) => [...p.newFound]));
  const universe = gt.length + newUnion.size;
  const issues = [...gtUnion, ...newUnion];
  const inAll = issues.filter((id) => per.every((p) => p.gtFound.has(id) || p.newFound.has(id)));
  const mean = (k) => {
    const v = per.map((p) => p[k]).filter((x) => x !== null);
    return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null;
  };

  const used = all.filter((r) => runs.includes(r.run));
  const reviewed = used.filter((r) => (r.human_label || '').trim()).length;
  const changed = used.filter((r) => {
    const h = (r.human_label || '').trim();
    return h && h.toLowerCase() !== 'ok' && h !== r.ai_label;
  }).length;
  const models = [...new Set(per.map((p) => p.meta.model).filter(Boolean))];

  const head = `| Chỉ số | ${runs.join(' | ')} | Gộp ${runs.length} lần | Bài CHI 2024 (GPT-4) |`;
  const sep = `| --- | ${runs.map(() => '---').join(' | ')} | --- | --- |`;
  const row = (name, f, agg, paper = '—') => `| ${name} | ${per.map(f).join(' | ')} | ${agg} | ${paper} |`;

  const lines = [
    '# Người vs AI — kết quả AI Heuristic Reviewer',
    '',
    `- Website: ${config.siteName} · Lần chạy: ${runs.join(', ')} · Model reviewer: ${models.join(', ') || 'chưa ghi'}`,
    `- Ground truth: ${gt.length} lỗi (\`ground-truth/bugs.md\`)`,
    `- Nhãn: subagent \`finding-labeler\` gán nháp; **người đã duyệt ${reviewed}/${used.length} dòng**, sửa ${changed} dòng.` +
      (reviewed < used.length ? ' **Số liệu dưới đây CHƯA được người duyệt hết.**' : ''),
    '',
    head,
    sep,
    row('Số phát hiện', (p) => p.n, used.length),
    row('Precision', (p) => `${fmt(p.precision)} (${p.correct}/${p.n})`, `${fmt(mean('precision'))} (TB)`, PAPER.precision),
    row(`Recall trên ${gt.length} lỗi GT`, (p) => `${fmt(p.recall)} (${p.gtFound.size}/${gt.length})`, `${fmt(gtUnion.size / gt.length)} (${gtUnion.size}/${gt.length}, hợp)`, PAPER.recall),
    row('Chỉ người / cả hai / chỉ AI', (p) => {
      const u = gt.length + p.newFound.size;
      return `${pct(gt.length - p.gtFound.size, u)} / ${pct(p.gtFound.size, u)} / ${pct(p.newFound.size, u)}`;
    }, `${pct(gt.length - gtUnion.size, universe)} / ${pct(gtUnion.size, universe)} / ${pct(newUnion.size, universe)} (${gt.length - gtUnion.size} / ${gtUnion.size} / ${newUnion.size} lỗi)`, PAPER.overlap),
    row('Lệch severity TB (so GT)', (p) => fmt(p.mae), fmt(mean('mae'))),
    row('Báo nhầm', (p) => p.fp, used.length - per.reduce((a, p) => a + p.correct, 0)),
    row('Thời gian chụp → kiểm schema (phút)', (p) => fmt(p.minutes, 1), fmt(mean('minutes'), 1)),
    row('Token', (p) => p.meta.tokens ?? '—', '—'),
    '',
    `Độ ổn định: ${inAll.length}/${issues.length} lỗi đúng (GT + mới) xuất hiện ở cả ${runs.length} lần chạy.`,
    '',
    '## Lỗi ground truth AI bỏ sót ở mọi lần chạy',
    '',
    ...gt.filter((g) => !gtUnion.has(g.id)).map((g) => `- ${g.id} (${g.page}): ${g.description}`),
    '',
    '## Lỗi mới chỉ AI thấy (cần người xác nhận)',
    '',
    ...[...newUnion].sort().map((id) => {
      const ex = used.find((r) => r.final === id);
      return `- ${id} (${ex.page}, ${ex.heuristic}): ${ex.problem} — xuất hiện ở ${per.filter((p) => p.newFound.has(id)).length}/${runs.length} lần`;
    }),
    '',
    '## Định nghĩa',
    '',
    '- Precision = (phát hiện khớp GT + phát hiện là lỗi mới đúng) / tổng phát hiện.',
    '- Recall = số lỗi GT khác nhau được ít nhất một phát hiện trỏ tới / tổng lỗi GT.',
    '- Chỉ người / cả hai / chỉ AI tính trên tập GT + lỗi mới đúng. Nhãn cuối = `human_label` nếu có, ngược lại `ai_label`.',
    '- Mỗi viewport tính là một phát hiện riêng, nên cùng một lỗi trên mobile và desktop được đếm 2 lần trong precision.',
    ''
  ];
  fs.writeFileSync(path.join(EVIDENCE_AI_DIR, 'comparison-summary.md'), lines.join('\n'), 'utf-8');

  for (const run of runs) {
    const src = runDirOf(config, run);
    const dst = path.join(EVIDENCE_AI_DIR, 'runs', run);
    for (const item of ['shots', 'findings']) copyDir(path.join(src, item), path.join(dst, item));
    for (const f of ['meta.json', 'report.md', 'findings-all.json']) {
      if (fs.existsSync(path.join(src, f))) fs.copyFileSync(path.join(src, f), path.join(dst, f));
    }
  }
  console.log(`Summary: ${path.join(EVIDENCE_AI_DIR, 'comparison-summary.md')} · human-reviewed ${reviewed}/${used.length}`);
}

try { main(); } catch (err) { console.error(`ERROR: ${err.message}`); process.exit(1); }
