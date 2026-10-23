<!-- Phụ trách: Quân. Bản 30 phút: bảng khảo sát bài báo và skill đã chuyển sang 11-phu-luc. Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">08</p>

## Ứng dụng AI: Heuristic Reviewer Skill

- Bài báo gốc và nhóm làm khác ở đâu
- Kiến trúc Skill và thiết kế Prompt
- 3 demo, so sánh người vs AI
- Giới hạn của AI

Note: Thời gian: 6 phút (Quân). Câu mở: "Heuristic evaluation cần 3–5 chuyên gia. AI có làm thay được không?".

---

## Bài chính: LLM đánh giá heuristic (CHI 2024)

- **Cách làm:** plugin Figma gửi cấu trúc giao diện (JSON) + 10 heuristic Nielsen cho GPT-4 → danh sách vi phạm + gợi ý sửa
- **So với 12 chuyên gia:** 62% lỗi chỉ người thấy · 29% cả hai · 9% chỉ AI thấy
- **Precision:** AI 0,60 · người 0,83 — **Recall:** AI 0,38 · người 0,34
- **Giới hạn:** không thấy hình hiển thị thật, áp dụng nguyên tắc quá mức, chất lượng giảm qua các vòng sửa

<p class="small">Còn 7 bài rank A*/A/Q1 khác (GPTDroid, AutoE2E, UICrit…): Phụ lục và <code>docs/khao-sat/bai-bao.md</code>.</p>

<p class="key">Nhóm làm cùng câu hỏi, nhưng đóng gói thành Agent Skill: agent tự xem ảnh chụp màn hình thật và đo lại trên EShop.</p>

Note: Nguồn: Duan, Warner, Li, Hartmann, CHI 2024, DOI 10.1145/3613904.3642782. Số liệu nhóm đặt cạnh số liệu này ở slide kết quả.

---

## Nhóm làm khác ở đâu?

| | Skill cộng đồng (Anthropic, Vercel) | Skill `nielsen-heuristic-reviewer` (Nhóm) |
| --- | --- | --- |
| Đầu vào | Code nguồn (`Cart.jsx`) hoặc trình duyệt | Ảnh chụp màn hình thực tế từng bước |
| Tiêu chí | Quy tắc web chung, WCAG | **10 heuristic Nielsen + severity 0–4** |
| Đo độ chính xác AI | Không có | **Người vs AI:** precision, recall, lệch severity, độ ổn định |
| Tái sử dụng | Cài skill vào agent | Có `SKILL.md` + đổi `config.json` là chạy website khác |

<p class="key">Chưa thấy skill phổ biến nào chấm heuristic theo Nielsen và đo độ chính xác thực nghiệm so với người.</p>

Note: Danh sách 6 skill cộng đồng (webapp-testing ~180k star, ui-ux-pro-max ~137k star, web-design-guidelines ~32.6k star…) nằm ở Phụ lục.

---

## Kiến trúc Skill `nielsen-heuristic-reviewer`

<p class="flow">Agent: chụp ảnh → subagent chấm ảnh → kiểm schema → subagent gán nhãn → người duyệt → tính chỉ số</p>

| Thành phần | Việc |
| --- | --- |
| `SKILL.md` · `config.json` | Quy trình cho agent; URL, trang, viewport, cách dựng trạng thái |
| `capture.js` · `setups.js` | Đăng nhập, thêm giỏ (xử lý G10), chụp từng trang × viewport |
| Subagent `heuristic-reviewer` | Tự xem ảnh, chấm H1–H10; **chỉ được đọc ảnh và rubric** |
| `validate.js` · `report.js` | Kiểm JSON theo `schema.json`; gộp báo cáo |
| Subagent `finding-labeler` | Gán nhãn nháp: khớp G01–G11, lỗi mới, hay báo nhầm |
| `labels.csv` · `compare.js` | Người duyệt nhãn; tính precision, recall, lệch severity, độ ổn định |

Note: Không gọi API LLM riêng, không cần API key: model chính là model của agent (Claude Code). Subagent chấm ảnh được tách riêng để không đọc được ground truth trong repo; mỗi lần chạy là một subagent mới. Đổi config.json là chạy website khác.

---

## Rubric trong Skill: ép AI không bịa

- Chỉ báo vấn đề **nhìn thấy trên ảnh**, không đoán chức năng ẩn
- Mỗi vấn đề: **H1–H10 · phần tử · vị trí · severity 0–4 · cách sửa**
- Không báo trùng, tối đa 5 vấn đề mỗi ảnh
- Rubric **không có ví dụ nào từ EShop** → không mớm đáp án
- Sai schema → `validate.js` báo lỗi, gọi lại subagent

```json
{ "heuristic": "H3", "element": "Nút Xóa", "severity": 3,
  "problem": "Xóa ngay, không hỏi lại", "fix": "Thêm dialog xác nhận" }
```

Note: Các luật này rút từ điểm yếu mà bài CHI 2024 ghi nhận: AI lặp gợi ý và áp nguyên tắc quá mức. Rubric để tiếng Anh cho agent đọc ít token; nội dung lỗi AI viết bằng tiếng Việt.

---

## Demo 1 — Cài đặt Skill & Smoke Test

1. `npm install` và `npx playwright install chromium` trong `ai-reviewer/`
2. Chép 2 subagent và skill vào `.claude/` (lệnh trong README)
3. Mở Claude Code ở gốc repo: *"chạy skill nielsen-heuristic-reviewer, smoke test"*
4. Agent chụp Trang chủ → subagent chấm → `npm run validate`

- **Checkpoint:** `VALID` — JSON đúng `schema.json`

<p class="clip">▶ Clip AI-1 — Cài đặt: (đang quay)</p>

Note: Không cần API key: model là model của agent.

---

## Demo 2 — Trang Giỏ hàng

Agent chạy skill với `--only cart --viewport desktop` → thêm sản phẩm, chụp Giỏ, subagent chấm:

| Lỗi trên Giỏ hàng | Heuristic | Dự đoán | Kết quả AI |
| --- | --- | --- | --- |
| G02 Xóa không xác nhận | H3 · 3 | Thấy được trên ảnh | _(sau khi chạy)_ |
| G03 Thiếu nút `+/-` | H3 · 2 | Thấy được trên ảnh | _(sau khi chạy)_ |
| G01 "Tổng tạm tính" | H4 · 2 | Có thể | _(sau khi chạy)_ |
| G04 Nút xanh lá | H4 · 2 | Khó: AI không biết đặc tả | _(sau khi chạy)_ |
| G05 Không có `<h1>` | FR-21 | Không: không thấy trên ảnh | _(sau khi chạy)_ |

<p class="clip">▶ Clip AI-2 — Giỏ hàng: (đang quay)</p>

Note: Cột "Dự đoán" là giả thuyết trước khi chạy; cột cuối điền từ report.md của lần chạy thật.

---

## Demo 3 — Toàn luồng, người vs AI, đổi website

- **Data-driven:** 5 trang × 2 viewport, đọc từ `config.json`; chạy 3 lần, mỗi lần một subagent mới
- **Record & Playback:** đăng nhập, thêm giỏ, vào Checkout ghi bằng `playwright codegen` (`setups.js`)
- **Checkpoint:** kiểm schema; subagent gán nhãn so 11 lỗi ground truth; **người duyệt `labels.csv`**; `npm run compare`
- **Tái sử dụng:** `config.todomvc.json` chạy trên TodoMVC không sửa code

<p class="clip">▶ Clip AI-3 — Toàn luồng: (đang quay)</p>

Note: AI gán nhãn nháp để luồng tự động không bị ngắt; người duyệt lại toàn bộ sau. Bản tóm tắt ghi rõ đã duyệt bao nhiêu dòng.

---

## Kết quả người vs AI

| Chỉ số | EShop (3 lần chạy) | Bài CHI 2024 (GPT-4) |
| --- | --- | --- |
| Precision | _(sau khi chạy)_ | AI 0,60 · người 0,83 |
| Recall trên 11 lỗi GT | _(sau khi chạy)_ | AI 0,38 · người 0,34 |
| Chỉ người / cả hai / chỉ AI | _(sau khi chạy)_ | 62% / 29% / 9% |
| Lệch severity | _(sau khi chạy)_ | — |
| Ổn định qua 3 lần chạy | _(sau khi chạy)_ | — |
| Nhãn đã được người duyệt | _(… / … dòng)_ | — |

Note: Điền từ evidence/ai/comparison-summary.md sau khi chạy npm run compare và người đã duyệt hết labels.csv.

---

## Giới hạn của AI (dự kiến kiểm chứng)

| Điểm yếu | Lỗi EShop minh họa |
| --- | --- |
| Không thấy cấu trúc HTML | G05 thiếu `<h1>` |
| Không biết đặc tả | G04 xanh lá thay vì xanh dương |
| Không thấy lỗi cần nhiều bước | G10 bấm 2 lần mới thêm giỏ |
| Severity lệch, kết quả đổi giữa các lần, có thể bịa | Đo ở Demo 3 |
| AI gán nhãn cho AI có thể sai | Người duyệt `labels.csv` |

<p class="key">AI là trợ lý tăng tốc; con người duyệt cuối.</p>

Note: Khớp kết luận tài liệu T01 của môn: human-in-the-loop. Sau khi chạy, sửa tiêu đề thành "đã kiểm chứng" và thay cột phải bằng kết quả thật.
