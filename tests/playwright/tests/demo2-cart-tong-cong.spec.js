// @ts-check
/**
 * Demo 2 — Cơ bản (Record & Playback + Checkpoint)
 *
 * Cách làm trên clip/seminar:
 *   npx playwright codegen http://localhost:5173
 *   → ghi: Thêm vào giỏ → mở Giỏ hàng
 *   → dán vào file này, thêm expect nhãn "Tổng cộng"
 *
 * Checkpoint theo FR-07: nhãn phải là "Tổng cộng".
 * EShop đang ghi "Tổng tạm tính" (lỗi G01) → test FAIL là kết quả mong muốn.
 */
import { test, expect } from '@playwright/test';

test('thêm sản phẩm vào giỏ — nhãn Tổng cộng (checkpoint GUI)', async ({ page }) => {
  // --- Record & Playback (kiểu output codegen) ---
  await page.goto('/');
  // Home gọi API :3000 — chờ nút sẵn sàng rồi thêm (1 lần từ Home là đủ)
  const addBtn = page.getByRole('button', { name: 'Thêm vào giỏ' }).first();
  await expect(addBtn).toBeVisible({ timeout: 15000 });
  await addBtn.click();
  await page.getByRole('link', { name: 'Giỏ hàng' }).click();

  // Xác nhận đã vào trang giỏ có hàng (playback ổn)
  await expect(page.getByRole('heading', { name: 'Giỏ Hàng' })).toBeVisible();

  // --- Checkpoint: đúng nhãn theo đặc tả ---
  // EShop đang hiện "Tổng tạm tính" (G01) → expect này FAIL = kết quả demo mong muốn
  await expect(page.getByText('Tổng cộng')).toBeVisible();
});
