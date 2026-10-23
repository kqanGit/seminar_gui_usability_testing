<!-- Phụ trách: Quân. Bản 30 phút: bảng khảo sát bài báo và skill đã chuyển sang 11-phu-luc. Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">08</p>

## Ứng dụng AI: Heuristic Reviewer

- Bài báo gốc và nhóm làm khác ở đâu
- Kiến trúc và prompt
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

<p class="key">Nhóm làm cùng câu hỏi, nhưng dùng model mới, gửi ảnh chụp màn hình thật và đo lại trên EShop.</p>

Note: Nguồn: Duan, Warner, Li, Hartmann, CHI 2024, DOI 10.1145/3613904.3642782. Số liệu nhóm sẽ đặt cạnh số liệu này ở slide kết quả.

---

## Nhóm làm khác ở đâu?

| | Skill cộng đồng | AI Heuristic Reviewer |
| --- | --- | --- |
| Đầu vào | Code nguồn hoặc trình duyệt | Ảnh chụp màn hình từng bước |
| Tiêu chí | Quy tắc web, WCAG | 10 heuristic Nielsen + severity 0–4 |
| Đo độ chính xác AI | Không có | Người vs AI: precision, recall, lệch severity |
| Tái sử dụng | Cài skill vào agent | Đổi `config.json` là chạy website khác |

<p class="key">Chưa thấy skill phổ biến nào chấm heuristic theo Nielsen và đo độ chính xác so với người.</p>

Note: Danh sách 6 skill cộng đồng (webapp-testing, playwright-mcp, web-design-guidelines…) nằm ở Phụ lục. Ý tưởng tái dùng: quy trình "trinh sát rồi hành động" của webapp-testing, checklist của Vercel và ui-ux-pro-max làm đầu vào bổ sung cho prompt.

---

## Kiến trúc AI Heuristic Reviewer

<p class="flow">config.json → Playwright chụp ảnh → ảnh + prompt 10 heuristic → LLM vision → JSON → báo cáo</p>

| Thành phần | Việc |
| --- | --- |
| `config.json` | URL, trang, viewport, cách dựng trạng thái |
| `capture.js` | Dựng trạng thái (đăng nhập, thêm giỏ) rồi chụp từng trang |
| `review.js` | Gửi ảnh + prompt, kiểm JSON theo schema |
| `report.js` · `compare.js` | Gộp báo cáo; so với người và ground truth |

Note: Đổi config.json là chạy website khác: đây là điểm tái sử dụng. Chi tiết: ai-reviewer/scenarios-plan.md.

---

## Prompt: ép AI không bịa

- Chỉ báo vấn đề **nhìn thấy trên ảnh**, không đoán chức năng ẩn
- Mỗi vấn đề: **H1–H10 · phần tử · vị trí · severity 0–4 · cách sửa**
- Không báo trùng, không áp một heuristic cho mọi phần tử
- Chỉ trả **JSON đúng schema** → sai thì gọi lại

```json
{ "heuristic": "H3", "element": "Nút Xóa", "severity": 3,
  "problem": "Xóa ngay, không hỏi lại", "fix": "Thêm dialog xác nhận" }
```

Note: Các luật này rút từ điểm yếu mà bài CHI 2024 ghi nhận: AI lặp gợi ý và áp nguyên tắc quá mức.

---

## Demo 1 — Cài đặt

1. Chạy EShop (`:3000`, `:5173`)
2. `npm install` trong `ai-reviewer/`
3. Điền API key vào `.env`, copy `config.example.json` → `config.json`
4. `npm run smoke`: chụp Trang chủ, gửi LLM, nhận JSON

- **Checkpoint:** JSON hợp lệ theo `schema.json`

<p class="clip">▶ Clip AI-1 — Cài đặt: (đang quay)</p>

Note: Che API key khi quay.

---

## Demo 2 — Trang Giỏ hàng

`npm run review -- --only cart` → tự thêm sản phẩm, chụp Giỏ, đánh giá; đối chiếu với ground truth:

| Lỗi | Heuristic | AI có thấy được? |
| --- | --- | --- |
| G02 Xóa không xác nhận | H3 · 3 | Có, nhìn thấy trên ảnh |
| G01 "Tổng tạm tính" | H4 · 2 | Có thể |
| G04 Nút xanh lá | H4 · 2 | Khó: AI không biết đặc tả |
| G05 Không có `<h1>` | FR-21 | Không: không thấy trên ảnh |

<p class="clip">▶ Clip AI-2 — Giỏ hàng: (đang quay)</p>

Note: Cột cuối là giả thuyết; clip sẽ cho thấy kết quả thật.

---

## Demo 3 — Toàn luồng, người vs AI, đổi website

- **Data-driven:** 5 trang × 2 viewport × 3 lần chạy, đọc từ `config.json`
- **Record & Playback:** bước đăng nhập, thêm giỏ, vào Checkout ghi bằng `playwright codegen`
- **Checkpoint:** so ground truth (11 lỗi) và so heuristic thủ công của 3 thành viên
- **Tái sử dụng:** đổi `config.json` sang website khác, chạy lại không sửa code

<p class="clip">▶ Clip AI-3 — Toàn luồng: (đang quay)</p>

Note: Người đánh giá heuristic thủ công trước khi xem kết quả AI.

---

## Kết quả người vs AI

| Chỉ số | EShop (nhóm) | Bài CHI 2024 |
| --- | --- | --- |
| Precision | _(sau khi chạy)_ | AI 0,60 · người 0,83 |
| Recall | _(sau khi chạy)_ | AI 0,38 · người 0,34 |
| Chỉ người / cả hai / chỉ AI | _(sau khi chạy)_ | 62% / 29% / 9% |
| Lệch severity | _(sau khi chạy)_ | — |
| Ổn định qua 3 lần chạy | _(sau khi chạy)_ | — |

Note: Điền từ npm run compare sau Demo 3.

---

## Giới hạn của AI (dự kiến kiểm chứng)

| Điểm yếu | Lỗi EShop minh họa |
| --- | --- |
| Không thấy cấu trúc HTML | G05 thiếu `<h1>` |
| Không biết đặc tả | G04 xanh lá thay vì xanh dương |
| Không thấy lỗi cần nhiều bước | G10 bấm 2 lần mới thêm giỏ |
| Severity lệch, kết quả đổi giữa các lần, có thể bịa | Đo ở Demo 3 |

<p class="key">AI là trợ lý tăng tốc; con người duyệt cuối.</p>

Note: Khớp kết luận tài liệu T01 của môn: human-in-the-loop.
