# Playwright + axe — phụ trách: Quang (A)

**Demo 1 (cài đặt): đã xong** — project init, browser Chromium/Firefox/WebKit, `@axe-core/playwright`, test mẫu chạy được.

Lệnh đã dùng (để quay clip / nhắc lại trên slide):

```bash
cd tests/playwright
npm init playwright@latest      # chọn JavaScript, thư mục tests
npm i -D @axe-core/playwright
npx playwright test && npx playwright show-report
```

| Demo | Nội dung | Thành phần | Trạng thái |
| --- | --- | --- | --- |
| 1. Cài đặt | init, cài axe, chạy test mẫu, mở report | — | xong |
| 2. Cơ bản | `npx playwright codegen http://localhost:5173` → thêm `expect` nhãn "Tổng cộng" | Record & Playback, Checkpoint | xong — `tests/demo2-cart-tong-cong.spec.js` (fail = bắt G01) |
| 3. Phức tạp | `data/pages.json` × 3 viewport: `<h1>`, `alt`, `toHaveScreenshot`, axe | Data-driven, Checkpoint | chưa code — **đã có plan** `scenarios-plan.md` |

Plan chi tiết scenarios (S0–S1 đã có, Demo 3 + S2–S8): xem [`scenarios-plan.md`](./scenarios-plan.md).

Chạy Demo 2 (cần EShop :5173 + backend :3000):

```bash
npx playwright test demo2-cart-tong-cong --project=chromium
npx playwright show-report
```

**2 bẫy của EShop:** giỏ hàng chỉ nằm trong React state (`goto('/cart')` luôn ra giỏ trống → dựng trạng thái qua UI, trường `setup` trong `pages.json`); nút "Thêm vào giỏ" phải bấm 2 lần. Dùng `expect.soft` vì phần lớn test sẽ fail — đó là kết quả mong muốn.

Ranh giới với T2: checkpoint chỉ kiểm thuộc tính giao diện, không kiểm nghiệp vụ (giảm giá đúng %, lưu đơn…).
