# Playwright + axe — phụ trách: Quang (A)

Thư mục này **cố ý để trống**: Demo 1 (cài đặt) cần quay lại quá trình khởi tạo. Khi quay demo:

```bash
cd tests/playwright
npm init playwright@latest      # chọn JavaScript, thư mục tests
npm i -D @axe-core/playwright
npx playwright test && npx playwright show-report
```

| Demo | Nội dung | Thành phần |
| --- | --- | --- |
| 1. Cài đặt | init, cài axe, chạy test mẫu, mở report | — |
| 2. Cơ bản | `npx playwright codegen http://localhost:5173` → thêm `expect` nhãn "Tổng cộng" | Record & Playback, Checkpoint |
| 3. Phức tạp | `data/pages.json` × 3 viewport: `<h1>`, `alt`, `toHaveScreenshot`, axe | Data-driven, Checkpoint |

**2 bẫy của EShop:** giỏ hàng chỉ nằm trong React state (`goto('/cart')` luôn ra giỏ trống → dựng trạng thái qua UI, trường `setup` trong `pages.json`); nút "Thêm vào giỏ" phải bấm 2 lần. Dùng `expect.soft` vì phần lớn test sẽ fail — đó là kết quả mong muốn.

Ranh giới với T2: checkpoint chỉ kiểm thuộc tính giao diện, không kiểm nghiệp vụ (giảm giá đúng %, lưu đơn…).
