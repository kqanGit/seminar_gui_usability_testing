// UI state builders used by capture.js (recorded with `npx playwright codegen`, then cleaned up).
// EShop traps:
// 1. The cart lives in React state only: never page.goto('/cart'); navigate through the UI.
// 2. "Thêm vào giỏ" on the product page may need two clicks (bug G10).
// 3. Checkout requires login (test@eshop.com / Test1234!).

const trim = (url) => url.replace(/\/$/, '');

export async function openLoginPage(page, baseUrl) {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  const link = page.locator('a[href="/login"], a:has-text("Đăng nhập")').first();
  if (await link.count()) {
    await link.click();
  } else {
    await page.goto(`${trim(baseUrl)}/login`, { waitUntil: 'networkidle' });
  }
  await page.locator('form input').first().waitFor({ state: 'visible', timeout: 10000 });
}

export async function openProductDetail(page, baseUrl) {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  const link = page.locator('a[href^="/product/"], a:has-text("Xem chi tiết")').first();
  await link.waitFor({ state: 'visible', timeout: 10000 });
  await link.click();
  await page.locator('button:has-text("Thêm vào giỏ")').first().waitFor({ state: 'visible', timeout: 10000 });
}

export async function login(page, baseUrl) {
  await openLoginPage(page, baseUrl);
  const form = page.locator('form').first();
  const user = form.locator('input:not([type="hidden"])').nth(0);
  const pass = form.locator('input:not([type="hidden"])').nth(1);
  await user.fill('test@eshop.com');
  await pass.fill('Test1234!');
  await form.locator('button[type="submit"], button:has-text("Sign In"), button:has-text("Đăng nhập")').first().click();
  await page.locator('button:has-text("Thoát"), a:has-text("Thoát")').first().waitFor({ state: 'visible', timeout: 10000 });
}

async function cartCount(page) {
  // Number of rows with a "Xóa" button on the cart page
  return page.locator('button:has-text("Xóa")').count();
}

export async function addFirstProductToCart(page, baseUrl) {
  await openProductDetail(page, baseUrl);
  const add = page.locator('button:has-text("Thêm vào giỏ")').first();
  await add.waitFor({ state: 'visible', timeout: 10000 });
  // G10: ProductDetail requires 2 clicks within the same mount before adding to cart
  await add.click();
  await page.waitForTimeout(300);
  await add.click();
  await page.waitForTimeout(400);
  const cartLink = page.locator('a[href="/cart"], a:has-text("Giỏ hàng")').first();
  await cartLink.click();
  await page.locator('button:has-text("Xóa")').first().waitFor({ state: 'visible', timeout: 10000 });
  if ((await cartCount(page)) === 0) throw new Error('Cart is still empty after adding a product');
}

export async function goToCheckout(page, baseUrl) {
  page.on('dialog', (dialog) => dialog.accept());
  await login(page, baseUrl);
  await addFirstProductToCart(page, baseUrl);
  const btn = page.locator('button:has-text("Tiến hành thanh toán"), a:has-text("Tiến hành thanh toán")').first();
  await btn.waitFor({ state: 'visible', timeout: 10000 });
  await btn.click();
  await page.locator('button:has-text("Xác Nhận Thanh Toán")').first().waitFor({ state: 'visible', timeout: 10000 });
}
