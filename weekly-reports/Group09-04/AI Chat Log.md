# AI Chat Log — Quang (20120359) · WeekID 04

- **Kỳ:** 14/10/2026 – 16/10/2026  
- **Công cụ:** Cursor (Agent)  
- **Hình thức:** tóm tắt phiên (mục tiêu → AI trả gì → Quang sửa gì). Không dump raw chat.  
- Disclosure dài hạn (cả nhóm): `AI_DISCLOSURE.md` ở gốc repo.

---

## Phiên 1 — 14/10 – 15/10/2026 · Evidence + checklist

**Mục tiêu:** EShop chạy được; chụp Evidence lỗi GUI; bắt đầu checklist 50 câu.

| Bước | Nội dung |
| --- | --- |
| Quang hỏi | Chạy `sut/eshop`, chụp setup/login; liệt kê lỗi theo proposal; khoanh đỏ ảnh Fail; điền checklist. |
| AI trả | Gợi ý lệnh FE/BE; khung bảng bugs/checklist; gợi ý highlight ảnh. |
| Quang làm | Xác nhận trên localhost:5173; chỉnh Evidence; điền ~18/50; commit. |

**File:** `evidence/`, `ground-truth/bugs.md`, `checklist/checklist-50.md`.

---

## Phiên 2 — 15/10/2026 · Biên bản + heuristic

**Mục tiêu:** biên bản họp + heuristic thủ công độc lập.

| Bước | Nội dung |
| --- | --- |
| Quang hỏi | Nháp biên bản và phiếu heuristic (trước khi xem AI Reviewer). |
| AI trả | Khung biên bản + bảng severity Nielsen. |
| Quang làm | Sửa đúng nội dung nhóm; commit. |

**File:** `docs/meetings/2026-10-16.md`, `ground-truth/heuristic-manual-quang-2026-10-16.md`.

---

## Phiên 3 — 16/10/2026 · Playwright Demo 1–2 + plan Demo 3

**Mục tiêu:** init Playwright + axe; checkpoint “Tổng cộng”; plan scenarios Demo 3.

| Bước | Nội dung |
| --- | --- |
| Quang hỏi | Cài Playwright/axe; test Cart nhãn Tổng cộng; outline data-driven Demo 3. |
| AI trả | Lệnh init; skeleton `demo2-cart-tong-cong.spec.js`; `scenarios-plan.md`. |
| Quang làm | Chạy test thật (fail = G01); sửa locator; review plan rồi push. |

**File:** `tests/playwright/` (kể cả `scenarios-plan.md`, README).

---

## Phiên 4 — 16/10/2026 · Hash SUT + ngày Evidence

**Mục tiêu:** sửa text ngày / hash SUT cho khớp Evidence 15/10.

| Bước | Nội dung |
| --- | --- |
| Quang hỏi | Chỗ nào đang sai hash/ngày so với ảnh `20261015-*`. |
| AI trả | Diff đề xuất trên bugs/checklist/heuristic. |
| Quang làm | Review và commit sửa hash/ngày. |

**File:** `ground-truth/bugs.md`, `checklist/checklist-50.md`, heuristic manual.

---

## Ghi chú

- AI chỉ hỗ trợ nháp/gợi ý; checkpoint GUI do Quang chạy và xác nhận trên EShop.  
- Các thành viên khác tự khai AI (nếu có) — file này **chỉ phần Quang**.
