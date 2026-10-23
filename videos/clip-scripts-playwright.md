# Kịch bản quay 3 clip Playwright — Quang

Yêu cầu GVTH: nền trắng / chữ đen trên slide intro nếu có; thuyết minh rõ; YouTube Unlisted OK.

Chuẩn bị: EShop `:3000` + `:5173`; `cd tests/playwright`.

## Clip 1 — Cài đặt (~2–3 phút)

1. Mở terminal, kể: init project + cài `@axe-core/playwright`.
2. Chạy `npx playwright test example --project=chromium`.
3. `npx playwright show-report` — chỉ HTML report xanh.

## Clip 2 — Cơ bản R&P + Checkpoint (~3–4 phút)

1. Giải thích: `codegen` ghi thêm giỏ → Cart; thêm `expect` “Tổng cộng”.
2. (Tuỳ chọn) chạy nhanh `npx playwright codegen http://localhost:5173` vài giây.
3. Chạy `npx playwright test demo2-cart-tong-cong --project=chromium`.
4. Chỉ fail G01 (“Tổng tạm tính”) = bắt lỗi GUI — **đó là điểm demo**.

## Clip 3 — Data-driven + visual + a11y (~4–5 phút)

1. Mở `data/pages.json` + nói 3 viewport.
2. Mở `tests/demo3-gui-rules.spec.js` — `expect.soft` h1 / alt / screenshot / axe.
3. Chạy `npx playwright test demo3-gui-rules --project=chromium`.
4. `show-report`: nhiều fail = EShop cố ý lỗi; baseline trong `*-snapshots/`.

Sau khi đăng: dán link vào `videos/README.md` cột Link.
