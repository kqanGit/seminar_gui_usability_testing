# Kịch bản demo — AI Heuristic Reviewer (Quân · C)

Bám `docs/proposal/Proposal.md` §5, `docs/phan-cong-tasks.html` (vai C) và khảo sát `docs/khao-sat/`.
Định dạng giống `tests/playwright/scenarios-plan.md` để ghép slide/báo cáo cho thống nhất.

> Trạng thái (19/10): **kịch bản dự kiến** — code `src/` chưa viết, chưa chạy, chưa quay clip.
> Mọi số liệu "kỳ vọng" bên dưới là giả thuyết để kiểm chứng, không phải kết quả.

---

## 1. Mục tiêu phần AI

Trả lời câu hỏi của đề T1 (Heuristic Showdown): **LLM có vision đánh giá usability theo 10 heuristic Nielsen tốt đến đâu so với người?**

- **Tự động hóa:** chụp màn hình → LLM đánh giá → báo cáo, không cần người can thiệp (fully automated); bước chấm đúng/sai do người duyệt (semi-automated, human-in-the-loop).
- **Tổng quát hóa / tái sử dụng:** đổi `config.json` là chạy được website khác.
- **Đo được:** precision, recall, lệch severity, độ ổn định, chi phí — cùng thước đo bài CHI 2024 (Duan et al.) để đặt số liệu cạnh nhau.

## 2. Kiến trúc

```text
config.json ──► capture.js ──► review.js ──► report.js ──► out/<run>/report.md + report.json
 (URL, trang,    (Playwright:    (ảnh + prompt     (gộp, bỏ trùng,        │
  viewport,       setup trạng     10 heuristic →    xếp theo severity,     ▼
  setup)          thái, chụp)     LLM vision →      token, thời gian)   labels.csv (người gán nhãn)
                                  JSON theo schema)                         │
                                                                            ▼
                                                     compare.js ──► bảng người vs AI (precision, recall, lệch severity)
```

| Thành phần | Việc | Ghi chú |
| --- | --- | --- |
| `config.json` | URL gốc, danh sách trang, viewport, tên hàm setup, model | Sẵn khung trong `config.example.json` |
| `src/capture.js` | Mở trình duyệt, dựng trạng thái từng trang, chụp ảnh `out/<run>/shots/<trang>-<viewport>.png` | Dùng lại helper setup của Playwright (A) nếu có |
| `src/setups.js` | `login`, `addFirstProductToCart`, `goToCheckout` | Ghi bằng `playwright codegen` rồi chỉnh tay (Record & Playback) |
| `prompts/heuristic-review.md` | Prompt cố định: 10 heuristic, thang 0–4, luật chống bịa | Sẵn bản nháp |
| `schema.json` | Định dạng JSON: `heuristic`, `element`, `problem`, `severity`, `evidence`, `fix` | Sẵn |
| `src/review.js` | Gửi ảnh + prompt cho LLM, kiểm JSON theo schema, sai thì gọi lại 1 lần | Provider chọn qua `.env` |
| `src/report.js` | Gộp các trang, bỏ trùng, xuất Markdown; ghi token + thời gian | |
| `src/compare.js` | Đọc `labels.csv` do người gán nhãn → tính chỉ số | |

**Chọn LLM:** mô hình có vision, trả JSON được. Mặc định **Gemini** (có gói miễn phí); có thể đổi sang GPT hoặc Claude bằng biến `LLM_PROVIDER` trong `.env`. API key chỉ để trong `.env` (đã gitignore).

**Luật trong prompt (chống AI bịa — rút từ điểm yếu bài CHI 2024):**
1. Chỉ báo vấn đề **nhìn thấy trên ảnh**; không đoán chức năng ẩn.
2. Mỗi vấn đề ghi rõ heuristic H1–H10, phần tử, vị trí trên ảnh, severity 0–4, cách sửa.
3. Không báo trùng; không áp một heuristic cho mọi phần tử.
4. Chỉ trả JSON đúng schema.

## 3. Bộ trang × viewport (dữ liệu cho Demo 3)

| `name` | Cách vào | `setup` |
| --- | --- | --- |
| `home` | `/` | — |
| `product` | `/product/5` | — |
| `login` | `/login` | — |
| `cart` | thêm SP từ Home → `/cart` | `addFirstProductToCart` |
| `checkout` | đăng nhập → thêm SP → Giỏ → "Tiến hành thanh toán" | `login` + `goToCheckout` |

Viewport: **mobile 375×812**, **desktop 1440×900** → 5 trang × 2 viewport = **10 ảnh / lần chạy**.

**Bẫy của EShop khi dựng trạng thái** (giống Playwright):
- Giỏ hàng chỉ nằm trong React state → không `goto('/cart')` trực tiếp, không reload trang giữa chừng.
- "Thêm vào giỏ" có thể phải bấm 2 lần (G10) → helper kiểm tra badge/số lượng rồi mới đi tiếp.
- Bấm "Tiến hành thanh toán" khi chưa đăng nhập → bật `alert()` rồi chuyển sang Login → **đăng nhập trước** (`test@eshop.com` / `Test1234!`).

## 4. Ba demo

### Demo 1 — Cài đặt (~3 phút clip)

| Bước | Thao tác | Kết quả nhìn thấy |
| --- | --- | --- |
| 1 | Chạy EShop (backend `:3000`, frontend `:5173`) | Trang chủ EShop mở được |
| 2 | `cd ai-reviewer` → `npm install` → `npx playwright install chromium` (nếu chưa có) | Cài xong không lỗi |
| 3 | Copy `.env.example` → `.env`, điền `LLM_API_KEY`, `LLM_PROVIDER=gemini` | (che key khi quay) |
| 4 | Copy `config.example.json` → `config.json` | |
| 5 | `npm run smoke` — chụp **1 trang Home desktop** và gửi LLM | `out/<run>/report.md` có ít nhất 1 finding đúng schema |

- **Checkpoint:** JSON trả về hợp lệ theo `schema.json` (script báo `schema OK`).
- **Evidence:** `evidence/setup/2026MMDD-ai-reviewer-smoke.png`.

### Demo 2 — Chức năng cơ bản: 1 trang Giỏ hàng (~4 phút clip)

| Bước | Thao tác | Kết quả nhìn thấy |
| --- | --- | --- |
| 1 | Mở `config.json`, giữ trang `cart`, viewport `desktop` | |
| 2 | `npm run review -- --only cart --viewport desktop` | Trình duyệt tự thêm SP, vào Giỏ, chụp ảnh |
| 3 | Mở `out/<run>/report.md` | Danh sách vi phạm H1–H10 + severity |
| 4 | Đối chiếu từng dòng với `ground-truth/bugs.md` | Đánh dấu đúng / sai |

**Kỳ vọng kiểm chứng trên trang Giỏ** (ground truth đã xác nhận):

| Lỗi | Heuristic | Severity nhóm | AI nên thấy vì |
| --- | --- | --- | --- |
| G02 Xóa không xác nhận | H3, H5 | 3 | Nút "Xóa" nằm cạnh từng dòng, không có hoàn tác |
| G01 "Tổng tạm tính" | H4 | 2 | Nhãn nhìn thấy trên ảnh |
| G04 Nút thanh toán xanh lá | H4 | 2 | Màu nhìn thấy, nhưng AI **không biết đặc tả** nên có thể không coi là lỗi |
| G03 Không có +/- | H3 | 2 | Cột số lượng chỉ có số |
| G05 Không có `<h1>` | FR-21 | 2 | **Không thấy được trên ảnh** → AI gần như chắc chắn bỏ sót |

- **Checkpoint:** so với ground truth — đếm đúng / sai / bỏ sót.
- **Trên clip chỉ ra:** 1–2 chỗ AI đúng (kỳ vọng G02) và 1 chỗ AI sai hoặc bịa (nếu có) hoặc bỏ sót (G05).
- **Ý nghĩa cho lớp:** AI chỉ thấy cái hiển thị; lỗi nằm ở cấu trúc HTML hay ở đặc tả thì cần Playwright hoặc người.

### Demo 3 — Luồng phức tạp: cả luồng Checkout, so người vs AI, đổi website (~6 phút clip)

**3a. Chạy toàn luồng, lặp 3 lần**

| Bước | Thao tác | Kết quả |
| --- | --- | --- |
| 1 | Mở `config.json`: 5 trang × 2 viewport | Cho thấy đây là **dữ liệu**, không sửa code |
| 2 | `npm run review -- --runs 3` | 3 thư mục `out/run-1..3`, mỗi lần 10 ảnh |
| 3 | Mở báo cáo gộp: lỗi theo trang, theo severity; token + thời gian mỗi lần | |

**3b. So người vs AI** (dùng bảng heuristic thủ công của 3 người, làm **trước** khi xem AI)

| Bước | Việc | Ai làm |
| --- | --- | --- |
| 1 | Gom danh sách heuristic thủ công của Quang, Phúc, Quân | Cả nhóm (Quang đã có: `ground-truth/heuristic-manual-quang-2026-10-16.md`) |
| 2 | Gán nhãn từng finding của AI vào `evidence/ai/<run>/labels.csv`: `G01…G11` / `moi-dung` / `sai` | Quân gán, 1 người khác kiểm |
| 3 | Lỗi `moi-dung` chỉ được tính khi **≥ 2 người** xác nhận → thêm vào ground truth (nguồn `AI-confirmed`) | 2 người |
| 4 | `npm run compare` | Bảng kết quả |

Bảng kết quả (điền sau khi chạy):

| Chỉ số | Cách tính | Run 1 | Run 2 | Run 3 | Bài CHI 2024 |
| --- | --- | --- | --- | --- | --- |
| Precision | (đúng trong GT + mới-đúng) / tổng AI báo | | | | AI 0,60 · người 0,83 |
| Recall (trên GT) | đúng trong GT / 11 lỗi GT | | | | AI 0,38 · người 0,34 |
| Chỉ người thấy / cả hai / chỉ AI | đếm theo lỗi | | | | 62% / 29% / 9% |
| Lệch severity trung bình | \|AI − nhóm\| trên các lỗi trùng | | | | — |
| Ổn định giữa các lần | lỗi xuất hiện ở cả 3 lần / tổng lỗi | | | | — |
| Token · thời gian | từ log | | | | — |

**3c. Đổi website (tái sử dụng)**

| Bước | Thao tác | Kết quả |
| --- | --- | --- |
| 1 | Copy `config.json` → `config.todomvc.json`, đổi `baseUrl` sang `https://demo.playwright.dev/todomvc/`, 1–2 trang, bỏ setup | Không sửa dòng code nào |
| 2 | `npm run review -- --config config.todomvc.json` | Báo cáo cho website khác |

- **Record & Playback:** các hàm setup (đăng nhập, thêm giỏ, vào Checkout) được **ghi bằng `npx playwright codegen`** rồi dán vào `setups.js`; log từng bước + ảnh lưu lại trong `out/<run>/` (có thể bật Playwright trace).
- **Data-driven:** trang × viewport × số lần chạy đọc từ `config.json`; đổi file config là đổi website.
- **Checkpoint:** JSON đúng schema (tự động) + so ground truth / so người (`compare.js`).

### Demo phụ (tuỳ chọn, nếu còn thời gian) — AI soi code vs AI soi ảnh

Cài skill `web-design-guidelines` (vercel-labs/agent-skills, xem `docs/khao-sat/agent-skills.md`) vào một coding agent, cho rà `sut/eshop/frontend-web/src/pages/Cart.jsx`, `Checkout.jsx`.

- Kỳ vọng: skill soi code bắt được lỗi **không nhìn thấy trên ảnh** (thiếu `<h1>`, `type="text"` cho mật khẩu ở G11) nhưng không chấm theo heuristic/severity.
- So 3 phía: **người** · **AI soi ảnh (nhóm)** · **AI soi code (Vercel)** → bảng lỗi nào phía nào bắt được.

## 5. Điểm yếu dự kiến (để kiểm chứng và nói trên slide)

| Điểm yếu | Vì sao | Lỗi EShop minh họa |
| --- | --- | --- |
| Không thấy cấu trúc HTML | Chỉ có ảnh | G05 thiếu `<h1>` |
| Không biết đặc tả | Không đọc FR-21…24 | G04 xanh lá vs xanh dương |
| Không thấy lỗi cần nhiều bước | Ảnh tĩnh, một thời điểm | G10 bấm 2 lần mới thêm giỏ |
| Severity lệch | Không biết bối cảnh nghiệp vụ | G06 ô tổng tiền sửa được (người chấm 3) |
| Kết quả khác nhau giữa các lần chạy | LLM không tất định | Đo ở Demo 3a |
| Có thể bịa lỗi | Hallucination | Đếm nhóm "sai" trong `labels.csv` |
| Tốn token, phụ thuộc nhà cung cấp | Gọi API mỗi ảnh | Ghi token/thời gian |

Kết luận dự kiến: AI là **trợ lý tăng tốc** (dựng khung báo cáo, bắt lỗi bề mặt), con người **duyệt cuối** — khớp kết luận tài liệu T01 của môn.

## 6. Clip

| Clip | Nội dung | Thời lượng | Link |
| --- | --- | --- | --- |
| AI-1 | Demo 1 cài đặt + smoke | ~3' | _(chưa quay)_ |
| AI-2 | Demo 2 Giỏ hàng: 1 đúng, 1 sai/bỏ sót | ~4' | _(chưa quay)_ |
| AI-3 | Demo 3 toàn luồng + bảng người vs AI + đổi website | ~6' | _(chưa quay)_ |

Quy ước quay (yêu cầu môn): nền trắng, chữ đen (VS Code theme sáng, terminal nền trắng), phóng chữ to, **có thuyết minh**; che API key.

## 7. Thứ tự làm

1. `capture.js` + `setups.js` (ghi bằng codegen) — chụp được 10 ảnh.
2. `review.js` + prompt + kiểm schema — chạy được Demo 2.
3. Cả nhóm làm heuristic thủ công độc lập **trước khi xem output AI** (Phúc, Quân còn thiếu).
4. `report.js` + `compare.js` + `labels.csv` — Demo 3a, 3b.
5. Config website khác — Demo 3c.
6. Quay 3 clip, điền link vào bảng mục 6 và slide phần 08.
