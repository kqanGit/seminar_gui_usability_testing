<!-- Phụ trách: Quang. Khung slide do Quân soạn (có dùng Claude) theo tests/playwright/scenarios-plan.md; Quang điền kết quả, ảnh và link clip. Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">06</p>

## Playwright + axe-core

- Playwright là gì, nguyên lý hoạt động
- Record & Playback, Data-driven, Checkpoint nằm ở đâu
- 3 demo trên EShop
- Điểm yếu

Note: Thời gian: 6 phút (Quang). Demo trên lớp bằng đoạn trích clip 30–60 giây, không chạy live toàn bộ.

---

## Playwright là gì?

- Framework kiểm thử web **open-source** của Microsoft; chạy trên 3 engine: Chromium, WebKit, Firefox
- **Locator** tìm phần tử theo role và tên (`getByRole`), không phụ thuộc CSS dài
- **Auto-wait:** tự đợi phần tử sẵn sàng trước khi thao tác → ít test chập chờn
- **Web-first assertion** `expect(...)` tự thử lại đến khi đúng hoặc hết giờ
- Báo cáo HTML, trace, ảnh chụp khi fail
- **axe-core:** thư viện quét lỗi accessibility theo WCAG, chạy trong cùng test

Note: Nguyên lý: Playwright điều khiển trình duyệt qua giao thức riêng của từng engine, test viết bằng JS/TS.

---

## Bộ ba bắt buộc nằm ở đâu?

| Thành phần | Trong Playwright | Demo |
| --- | --- | --- |
| **Record & Playback** | `npx playwright codegen` ghi thao tác thành code | Demo 2 |
| **Data-driven** | 1 test × `data/pages.json` × 3 viewport | Demo 3 |
| **Checkpoint** | `expect` · `toHaveCSS` · `toHaveScreenshot` · axe | Demo 2, 3 |

<p class="small">Checkpoint luôn là thuộc tính giao diện (đề T1), không kiểm kết quả nghiệp vụ (đề T2).</p>

Note: Nhấn mạnh ranh giới T1/T2 vì thầy hay hỏi.

---

## Demo 1 — Cài đặt

1. `npm init playwright@latest` trong `tests/playwright/`
2. Chạy test mẫu: `npx playwright test`
3. Xem báo cáo: `npx playwright show-report`

- **Checkpoint:** test mẫu pass, báo cáo HTML mở được

<p class="clip">▶ Clip PW-1 — Cài đặt: (đang quay)</p>

Note: Trên lớp chỉ chiếu khoảng 20 giây cuối clip: báo cáo HTML màu xanh.

---

## Demo 2 — Record & Playback + checkpoint

<p class="flow">codegen ghi: Trang chủ → Thêm vào giỏ → Giỏ hàng → kiểm nhãn "Tổng cộng"</p>

```js
await expect(page.getByText('Tổng cộng')).toBeVisible();
```

- Kết quả: **Fail** — EShop hiển thị "Tổng tạm tính" → đúng lỗi **G01**
- File: `tests/demo2-cart-tong-cong.spec.js`

<p class="clip">▶ Clip PW-2 — codegen + checkpoint: (đang quay)</p>

Note: Quang kiểm lại dòng code cho khớp file thật trước khi chiếu. Test fail ở đây là kết quả mong muốn: tool bắt được lỗi.

---

## Demo 3 — Data-driven: 5 trang × 3 viewport

| # | Checkpoint mỗi vòng | Kỳ vọng trên EShop |
| --- | --- | --- |
| C1 | Đúng 1 `<h1>` | Fail ở Giỏ hàng, Thanh toán (G05) |
| C2 | Mọi ảnh có `alt` | Đo lần đầu ở demo |
| C3 | `toHaveScreenshot` so baseline | Baseline lần đầu |
| C4 | axe `wcag2a` + `wcag2aa` | Có vi phạm, liệt kê bằng `expect.soft` |

<p class="small">Trang: home · product · cart · checkout · login · Viewport: 375 · 768 · 1440 px. Kết quả: _(sau khi chạy)_</p>

<p class="clip">▶ Clip PW-3 — Data-driven: (đang quay)</p>

Note: Điểm nhấn của clip: báo cáo có nhiều fail, mỗi fail ứng với một lỗi trong ground truth. Bẫy EShop: giỏ chỉ lưu trong state nên phải thêm hàng trong cùng phiên, và "Thêm vào giỏ" có thể phải bấm 2 lần (G10).

---

## Điểm yếu của Playwright

| Điểm yếu | Ví dụ trên EShop |
| --- | --- |
| Không đánh giá được "dễ dùng" | Không biết người dùng có tìm thấy ô mã giảm giá không |
| Screenshot dễ báo nhầm | Khác font, hệ điều hành → baseline lệch |
| axe chỉ bắt một phần lỗi a11y | Vẫn phải kiểm bàn phím, screen reader bằng tay |
| Locator phụ thuộc chữ | EShop không có `data-testid`, đổi nhãn là test gãy |
| Cần biết lập trình JS/TS | Tester không code khó tự viết |

<p class="key">Playwright trả lời "đúng đặc tả không"; câu "dùng được không" cần người dùng thật → Maze.</p>

Note: Chuyển ý sang Phúc, phần 07.
