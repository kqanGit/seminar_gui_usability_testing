# Playwright + axe

> Phụ trách: **Quang** · Trạng thái: Demo 1–3 + 3 clip YouTube xong

## Thuật ngữ nhanh

| Thuật ngữ | Ý nghĩa trong seminar |
| --- | --- |
| Record & Playback | Ghi thao tác (`codegen`) rồi phát lại |
| Data-driven | Cùng bộ checkpoint, dữ liệu trang/viewport từ JSON |
| Checkpoint | Assertion thuộc tính GUI (nhãn, h1, alt, ảnh, axe) — **không** assert nghiệp vụ |
| Visual regression | `toHaveScreenshot` so với baseline |
| a11y scan | `@axe-core/playwright` quét WCAG 2 A/AA |

## Phân biệt T1 vs T2

Nhóm kiểm **giao diện đúng đặc tả** (T1). Click/điền form chỉ để đưa trang về trạng thái cần soi. Không chấm “giảm giá đúng %”, “đơn lưu DB”.

## 3 demo (minh chứng trong repo)

| Demo | Thành phần | File / lệnh |
| --- | --- | --- |
| 1. Cài đặt | init + axe + report | `tests/playwright/` · `npx playwright test` · `show-report` |
| 2. Cơ bản | R&P + Checkpoint “Tổng cộng” | `tests/demo2-cart-tong-cong.spec.js` (fail = G01) |
| 3. Phức tạp | Data-driven × 3 viewport: h1, alt, screenshot, axe | `data/pages.json`, `setups.js`, `tests/demo3-gui-rules.spec.js` |

Chi tiết plan: `tests/playwright/scenarios-plan.md`.

### Chạy Demo 3

```bash
# Terminal 1–2: EShop backend :3000 + frontend :5173
cd tests/playwright
npx playwright test demo3-gui-rules --project=chromium
npx playwright show-report
```

Phần lớn soft-assert **fail** trên EShop cố ý lỗi — đó là kết quả mong muốn.

## Điểm yếu (để nói trên slide)

- Không đo “dễ dùng” (cần Maze/UXtweak).
- Screenshot lệch font/OS giữa máy → false positive.
- axe không bắt hết lỗi a11y.
- Locator theo text/role (EShop không `data-testid`) dễ gãy khi đổi nhãn.

## Clip YouTube

| Demo | Link |
| --- | --- |
| 1. Cài đặt | https://youtu.be/1o4PLV0NB64 |
| 2. Cơ bản (R&P + Checkpoint) | https://youtu.be/xcXshuYuiY8 |
| 3. Phức tạp (data-driven + visual + a11y) | https://youtu.be/JA4xz1wKk0g |

Kịch bản quay: `videos/clip-scripts-playwright.md`. Bảng đủ nhóm: `videos/README.md`.
