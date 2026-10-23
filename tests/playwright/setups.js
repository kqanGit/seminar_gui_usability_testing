// @ts-check
/**
 * Setup trạng thái UI cho Demo 3 (data-driven).
 * Giỏ chỉ nằm trong React state → không dùng goto('/cart') khi cần có hàng.
 * G10: nút "Thêm vào giỏ" trên Product đôi khi cần 2 lần; từ Home 1 lần thường đủ.
 */
import { expect } from '@playwright/test';

/**
 * @param {import('@playwright/test').Page} page
 */
export async function addFirstProductToCart(page) {
  await page.goto('/');
  const addBtn = page.getByRole('button', { name: 'Thêm vào giỏ' }).first();
  await expect(addBtn).toBeVisible({ timeout: 15000 });
  await addBtn.click();
  // Nếu badge/giỏ vẫn trống, bấm lần 2 (lỗi G10 trên một số luồng Product)
  await page.getByRole('link', { name: 'Giỏ hàng' }).click();
  const empty = page.getByText(/đang trống|trống/i);
  if (await empty.isVisible().catch(() => false)) {
    await page.goto('/');
    const again = page.getByRole('button', { name: 'Thêm vào giỏ' }).first();
    await expect(again).toBeVisible({ timeout: 15000 });
    await again.click();
    await again.click();
    await page.getByRole('link', { name: 'Giỏ hàng' }).click();
  }
  await expect(page.getByRole('heading', { name: /Giỏ/i })).toBeVisible();
}

/**
 * Đăng nhập user seed (checkout yêu cầu đã login).
 * @param {import('@playwright/test').Page} page
 */
export async function loginAsTestUser(page) {
  await page.goto('/login');
  await page.locator('input').nth(0).fill('test@eshop.com');
  await page.locator('input').nth(1).fill('Test1234!');
  await page.getByRole('button', { name: /Sign In|Đăng nhập/i }).click();
  await page.waitForURL((url) => !url.pathname.includes('/login'), { timeout: 15000 }).catch(() => {});
}

/**
 * @param {import('@playwright/test').Page} page
 */
export async function goToCheckout(page) {
  await loginAsTestUser(page);
  await addFirstProductToCart(page);
  page.once('dialog', async (d) => {
    await d.accept();
  });
  const checkoutBtn = page.getByRole('button', { name: /Tiến hành thanh toán/i });
  await expect(checkoutBtn).toBeVisible({ timeout: 10000 });
  await checkoutBtn.click();
  await expect(page).toHaveURL(/checkout/i, { timeout: 15000 });
}
