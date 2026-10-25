# Bài 1 — Viết test Playwright kiểm tra FR-21

> Người soạn: **Quang (A)** · Hình thức: **Về nhà** · Ước lượng: **20–30 phút**

---

## 1. Mục tiêu

Sau bài này bạn:
1. Viết được **một checkpoint GUI** bằng Playwright (`expect`) theo đặc tả **FR-21**.
2. Phân biệt được: **test fail vì EShop cố ý lỗi** vẫn là kết quả đúng (bắt được bug).
3. Không assert nghiệp vụ (giá giảm %, đơn lưu DB…) — chỉ thuộc tính giao diện.

---

## 2. Chuẩn bị

1. Clone / mở repo nhóm (hoặc chỉ cần thư mục `tests/playwright` + `sut/eshop`).
2. Chạy EShop:
   ```bash
   # Terminal 1
   cd sut/eshop/backend && node server.js
   # Terminal 2
   cd sut/eshop/frontend-web && npm run dev
   ```
3. Mở http://localhost:5173 — đăng nhập nếu cần: `test@eshop.com` / `Test1234!`
4. Trong `tests/playwright`:
   ```bash
   cd tests/playwright
   npm install
   npx playwright install chromium
   ```

Tham khảo mẫu có sẵn: `tests/demo2-cart-tong-cong.spec.js`, `tests/demo3-gui-rules.spec.js`.

---

## 3. Đề bài

**FR-21 (rút từ đặc tả EShop):** mỗi trang có **đúng một** thẻ `<h1>`.

### Yêu cầu

1. Viết file test mới, ví dụ `tests/homework-fr21-h1.spec.js` (tên khác cũng được).
2. Test phải:
   - Mở **trang Giỏ hàng có ít nhất 1 sản phẩm** (không `goto('/cart')` khi giỏ trống — giỏ EShop chỉ lưu trong state React).
   - Assert: `page.locator('h1')` có **đúng 1** phần tử (`toHaveCount(1)`).
3. Chạy:
   ```bash
   npx playwright test homework-fr21-h1 --project=chromium
   ```
4. Nộp: file `.spec.js` + **1 dòng ghi kết quả** (Pass hay Fail) + giải thích ngắn *vì sao* (liên hệ lỗi thiếu `<h1>` / dùng `<h2>` nếu fail).

### Phần cộng (không bắt buộc, +0.5)

Thêm `expect.soft` thứ hai trên cùng trang Cart: nhãn tổng tiền phải là **"Tổng cộng"** (không phải "Tổng tạm tính") — giống ý Demo 2.

---

## 4. Gợi ý thực hiện

- Thêm hàng vào giỏ: vào trang chủ → mở 1 sản phẩm → bấm **"Thêm vào giỏ"** (có thể cần **2 lần**) → vào **Giỏ hàng**. Có thể copy helper từ `setups.js` (`addFirstProductToCart`).
- Checkpoint mẫu:
  ```js
  await expect(page.locator('h1')).toHaveCount(1);
  ```
- Nếu muốn xem report HTML: `npx playwright show-report`.
- **Không** cần data-driven / axe / screenshot cho bài về nhà này.

---

## 5. Cách chấm (thang 10)

| Tiêu chí | Điểm |
| --- | --- |
| Test chạy được trên Chromium, đúng trang Cart có hàng | 3 |
| Assert FR-21 (`h1` count = 1) đúng ý | 3 |
| Giải thích Pass/Fail khớp thực tế EShop | 2 |
| Code rõ, không assert nghiệp vụ (T2) | 2 |
| Cộng: thêm checkpoint "Tổng cộng" | +0.5 |

Đáp án mẫu (GVTH / nhóm): [`answers/bai-1-dap-an.md`](answers/bai-1-dap-an.md) — **không phát cho lớp trước khi thu bài**.
