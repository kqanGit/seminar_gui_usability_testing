// Step 1: build UI state with Playwright and take full-page screenshots.
// Usage: node src/capture.js --run <name> [--config <file>] [--only <page>] [--viewport <name>]
// Fails (exit 1) if the site or any setup fails. Never substitutes other images.
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';
import * as setups from './setups.js';
import { parseArgs, loadConfig, runDirOf, updateMeta } from './common.js';

async function launchBrowser() {
  for (const channel of [undefined, 'chrome', 'msedge']) {
    try {
      return await chromium.launch({ headless: true, ...(channel ? { channel } : {}) });
    } catch { /* try next channel */ }
  }
  throw new Error('No Chromium/Chrome/Edge available. Run: npx playwright install chromium');
}

async function resolveBaseUrl(browser, config) {
  const page = await browser.newPage();
  try {
    for (const url of [config.baseUrl, config.fallbackUrl].filter(Boolean)) {
      try {
        // Free hosting may cold-start: allow 60 s
        const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
        if (res && res.ok()) return url;
      } catch { /* try next url */ }
    }
  } finally {
    await page.close();
  }
  throw new Error(`Site unreachable: ${[config.baseUrl, config.fallbackUrl].filter(Boolean).join(', ')}`);
}

async function main() {
  const args = parseArgs();
  const config = loadConfig(args.config);
  const runDir = runDirOf(config, args.run);
  const shotsDir = path.join(runDir, 'shots');
  if (fs.existsSync(shotsDir) && fs.readdirSync(shotsDir).length) {
    throw new Error(`${shotsDir} is not empty. Use a new --run name.`);
  }
  fs.mkdirSync(shotsDir, { recursive: true });

  const pages = config.pages.filter((p) => !args.only || p.name === args.only);
  const viewports = config.viewports.filter((v) => !args.viewport || v.name === args.viewport);
  if (!pages.length || !viewports.length) throw new Error('No page/viewport matches --only/--viewport');

  updateMeta(runDir, {
    run: args.run,
    site: config.siteName,
    config: path.basename(config._file),
    started_at: new Date().toISOString()
  });

  const browser = await launchBrowser();
  const shots = [];
  try {
    const baseUrl = await resolveBaseUrl(browser, config);
    console.log(`Site: ${baseUrl}`);
    for (const vp of viewports) {
      for (const p of pages) {
        const file = `${p.name}-${vp.name}.png`;
        const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
        const page = await context.newPage();
        try {
          if (p.setup) {
            if (typeof setups[p.setup] !== 'function') throw new Error(`Unknown setup "${p.setup}"`);
            await setups[p.setup](page, baseUrl);
          } else {
            await page.goto(`${baseUrl.replace(/\/$/, '')}${p.path}`, { waitUntil: 'networkidle', timeout: 30000 });
          }
          await page.waitForLoadState('networkidle').catch(() => {});
          await page.screenshot({ path: path.join(shotsDir, file), fullPage: true });
          console.log(`OK ${file} (${vp.width}x${vp.height}) url=${page.url()}`);
          shots.push({ page: p.name, viewport: vp.name, file, url: page.url() });
        } catch (err) {
          throw new Error(`Capture failed for ${file}: ${err.message}`);
        } finally {
          await context.close();
        }
      }
    }
    updateMeta(runDir, { base_url: baseUrl, shots, captured_at: new Date().toISOString() });
  } finally {
    await browser.close();
  }
  console.log(`Captured ${shots.length} screenshots -> ${shotsDir}`);
}

main().catch((err) => {
  console.error(`ERROR: ${err.message}`);
  process.exit(1);
});
