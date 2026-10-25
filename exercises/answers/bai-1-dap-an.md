# Đáp án Bài 1 — Playwright / FR-21

> Quang (A) · **Không phát cho lớp trước khi thu bài.**

---

## Kết quả kỳ vọng trên EShop

Trang **Giỏ hàng** (có hàng): **không có** `<h1>` (thường chỉ có `<h2>` "Giỏ hàng") → assert `toHaveCount(1)` **Fail**.

Fail ở đây = **đúng**: test bắt được lỗi GUI (G05 / checklist #1), không phải test viết sai.

Phần cộng — nhãn **"Tổng cộng"**: cũng **Fail** vì UI hiện **"Tổng tạm tính"** (G01).

---

## Code mẫu (tham khảo)

```js
// tests/homework-fr21-h1.spec.js
import { test, expect } from '@playwright/test';
import { addFirstProductToCart } from '../setups.js';

test('FR-21: Cart có đúng 1 h1', async ({ page }) => {
  await addFirstProductToCart(page);

  await expect(page.locator('h1'), 'FR-21 đúng 1 h1').toHaveCount(1);

  // Cộng (tuỳ chọn)
  // await expect(page.getByText('Tổng cộng')).toBeVisible();
});
```

Nếu không import `setups.js`: tự `goto` home → mở SP → bấm "Thêm vào giỏ" 1–2 lần → vào Giỏ hàng.

---

## Rubric nhanh

| Sai thường gặp | Xử lý |
| --- | --- |
| `goto('/cart')` giỏ trống rồi assert | Trừ điểm phần “đúng trang có hàng” |
| Assert giá / mã giảm giá | Trừ điểm “không assert T2” |
| Báo “test fail nên em sửa expect cho pass” | Không chấp nhận — mục tiêu là bắt lỗi |
