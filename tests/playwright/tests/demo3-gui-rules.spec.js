// @ts-check
/**
 * Demo 3 — Luồng phức tạp (Data-driven + visual + a11y)
 *
 * pages.json × 3 viewport; mỗi vòng: h1, alt, screenshot, axe.
 * expect.soft: liệt kê đủ vi phạm (EShop cố ý lỗi → fail hàng loạt là kết quả mong muốn).
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createRequire } from 'module';
import * as setups from '../setups.js';

const require = createRequire(__filename);
/** @type {{ name: string, path: string, setup?: string }[]} */
const pages = require('../data/pages.json');

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

for (const p of pages) {
  for (const vp of viewports) {
    test(`${p.name} @ ${vp.name} — GUI rules`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      if (p.setup) {
        const fn = setups[p.setup];
        if (!fn) throw new Error(`Unknown setup: ${p.setup}`);
        await fn(page);
      } else {
        await page.goto(p.path);
        // Home/product cần API — chờ nội dung ổn định
        await page.waitForLoadState('networkidle').catch(() => {});
      }

      // FR-21: đúng một <h1>
      await expect.soft(page.locator('h1'), 'FR-21: đúng 1 h1').toHaveCount(1);

      // FR-24: mọi ảnh có alt không rỗng
      await expect
        .soft(page.locator('img:not([alt]), img[alt=""]'), 'FR-24: img thiếu alt')
        .toHaveCount(0);

      // Visual checkpoint
      await expect
        .soft(page)
        .toHaveScreenshot(`${p.name}-${vp.name}.png`, {
          maxDiffPixelRatio: 0.02,
          fullPage: true,
        });

      // Accessibility (WCAG 2 A/AA)
      const a11y = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
      expect.soft(a11y.violations, 'axe wcag2a/aa').toEqual([]);
    });
  }
}
