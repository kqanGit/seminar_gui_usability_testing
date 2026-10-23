// Step 4: merge one run's findings into report.md + findings-all.json.
// Usage: node src/report.js --run <name> [--config <file>]
import fs from 'fs';
import path from 'path';
import { parseArgs, loadConfig, runDirOf, readJson, readFindings, writeJson } from './common.js';

const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');

function main() {
  const args = parseArgs();
  const config = loadConfig(args.config);
  const runDir = runDirOf(config, args.run);
  const metaFile = path.join(runDir, 'meta.json');
  const meta = fs.existsSync(metaFile) ? readJson(metaFile) : {};
  if (!meta.validated_at) throw new Error('Run validate first.');

  const rows = [];
  for (const f of readFindings(runDir)) {
    f.data.findings.forEach((x, i) => {
      rows.push({ finding_id: `${args.run}:${f.name}#${i + 1}`, run: args.run, page: f.data.page, viewport: f.data.viewport, shot: `shots/${f.name}.png`, ...x });
    });
  }
  rows.sort((a, b) => b.severity - a.severity || a.page.localeCompare(b.page));
  writeJson(path.join(runDir, 'findings-all.json'), rows);

  const bySev = [4, 3, 2, 1, 0].map((s) => `${s}: ${rows.filter((r) => r.severity === s).length}`).join(' · ');
  const minutes = meta.started_at && meta.validated_at
    ? ((new Date(meta.validated_at) - new Date(meta.started_at)) / 60000).toFixed(1)
    : 'không rõ';
  const lines = [
    `# Báo cáo heuristic — ${config.siteName} (${args.run})`,
    '',
    `- Model reviewer: \`${meta.model ?? 'chưa ghi'}\` · Token: ${meta.tokens ?? 'không ghi nhận'}`,
    `- Thời gian từ lúc chụp đến lúc kiểm schema xong: ${minutes} phút`,
    `- Số ảnh: ${meta.files ?? '?'} · Số phát hiện: ${rows.length} (severity ${bySev})`,
    '',
    '| # | Trang | Viewport | Heuristic | Sev | Phần tử | Vấn đề | Vị trí trên ảnh | Gợi ý sửa |',
    '| --- | --- | --- | --- | --- | --- | --- | --- | --- |',
    ...rows.map((r, i) => `| ${i + 1} | ${r.page} | ${r.viewport} | ${r.heuristic} | ${r.severity} | ${cell(r.element)} | ${cell(r.problem)} | ${cell(r.evidence)} | ${cell(r.fix)} |`),
    '',
    '_Sinh tự động từ findings của subagent `heuristic-reviewer`. Chưa qua người duyệt._',
    ''
  ];
  fs.writeFileSync(path.join(runDir, 'report.md'), lines.join('\n'), 'utf-8');
  console.log(`Report: ${path.join(runDir, 'report.md')} (${rows.length} findings)`);
}

try { main(); } catch (err) { console.error(`ERROR: ${err.message}`); process.exit(1); }
