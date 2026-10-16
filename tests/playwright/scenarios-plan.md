# Plan scenarios Playwright — Quang (A)

Bám `docs/proposal/Proposal.md` §4.1 + bảng demo trong `README.md` cùng thư mục.  
Checkpoint chỉ thuộc tính GUI (T1), không assert nghiệp vụ (T2).

## Đã có

| ID | Scenario | File | Demo | Ghi chú |
| --- | --- | --- | --- | --- |
| S0 | Smoke cài đặt (title Playwright) | `tests/example.spec.js` | 1 | Init + report |
| S1 | Cart — nhãn “Tổng cộng” | `tests/demo2-cart-tong-cong.spec.js` | 2 | codegen + checkpoint; fail = G01 |

## Demo 3 — suite data-driven (làm tiếp)

Một file × `data/pages.json` × 3 viewport; mỗi vòng cùng bộ checkpoint. Dùng `expect.soft`.

### Trang (`data/pages.json`)

| `name` | Vào trang | `setup` |
| --- | --- | --- |
| `home` | `goto('/')` | — |
| `login` | path Login thật của EShop | — |
| `product` | Home → mở SP đầu | optional |
| `cart` | thêm SP → Giỏ | `addFirstProductToCart` |
| `checkout` | như cart → thanh toán | setup + click “Tiến hành thanh toán” |
| `cart-empty` (tuỳ chọn) | `goto('/cart')` không setup | — |

### Viewport

- mobile 375×812 · tablet 768×1024 · desktop 1440×900

### Checkpoint mỗi lần chạy

| # | Checkpoint | Map | Kỳ vọng EShop |
| --- | --- | --- | --- |
| C1 | đúng 1 `<h1>` | FR-21 · checklist #1–2 | Fail nhiều trang (đang h2) |
| C2 | mọi `img` có `alt` ≠ rỗng | FR-24 · #19 | Đo lần đầu ở Demo 3 |
| C3 | `toHaveScreenshot` | #46–48, #50 | Baseline lần đầu; lệch font/OS giải thích được |
| C4 | axe `wcag2a` + `wcag2aa` | #42 | Có violations → liệt kê soft |

### Setup (`setups.js`) — 2 bẫy EShop

1. Giỏ chỉ trong React state → không `goto('/cart')` khi cần có hàng.  
2. “Thêm vào giỏ” có thể cần 2 lần (G10) — ghi rõ trong helper / clip.

### File sẽ thêm

```
tests/playwright/
  data/pages.json
  setups.js
  tests/demo3-gui-rules.spec.js
```

## Scenario phụ (không bắt buộc Demo 3)

| ID | Scenario | Checkpoint | Map |
| --- | --- | --- | --- |
| S2 | Cart có hàng | primary button màu xanh dương (`toHaveCSS`) | #4 |
| S3 | Cart có hàng | có nút +/- | #21 |
| S4 | Cart — bấm Xóa | có dialog | #17 |
| S5 | Header (đã login) | nhãn “Đăng xuất” | #14 |
| S6 | Login | `type=email` / `password`, nhãn có `*` | #7–9 |
| S7 | Checkout | ô tổng `readonly`/`disabled` | #22 |
| S8 | Home sau 1 click thêm giỏ | toast / badge (soft) | #16, #49 |

Seminar tối thiểu: **Demo 3 + S1**. S2–S8 chỉ khi còn giờ / bài về nhà.

## Thứ tự làm (clip)

1. `pages.json` + `addFirstProductToCart` — thử C1 trên Cart.  
2. Thêm C2 → C4 → cuối cùng C3 (screenshot + commit baseline).  
3. Clip: mở data → chạy test → `show-report` (nhiều fail = điểm nhấn).  
4. (Tuỳ chọn) 1–2 scenario S2–S8 cho slide.

## Ranh giới bảo vệ

- Fail hàng loạt là kết quả mong muốn (EShop cố ý lỗi).  
- Không assert giảm giá %, đơn lưu DB, khóa tài khoản…
