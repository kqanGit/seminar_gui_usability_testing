# Phần 08 — Ứng dụng AI: Xây dựng Skill `nielsen-heuristic-reviewer` & Thực nghiệm "Người vs. AI"

> Phụ trách: **Bùi Minh Quân (`23120337` — Vai C)** · Trạng thái: **Đã viết lại Skill cho agent chạy (23/10/2026); chưa chạy thực nghiệm — số liệu điền sau khi chạy**

---

## 1. Động lực nghiên cứu & Khoảng trống từ các công trình trước

Đánh giá khả dụng theo nguyên tắc chuyên gia (**Heuristic Evaluation** của Jakob Nielsen, 1994) là phương pháp kinh điển để tìm lỗi giao diện, nhưng đòi hỏi từ **3 đến 5 chuyên gia UX** làm việc độc lập rồi họp tổng hợp kết quả. Câu hỏi nghiên cứu đặt ra cho Phần 08 của đề tài T1 là: **"Liệu các mô hình ngôn ngữ lớn đa phương thức (Vision LLM) được đóng gói dưới dạng Agent Skill có thể thay thế hoặc hỗ trợ chuyên gia con người đến mức độ nào?"**

### 1.1. Kế thừa từ bài báo gốc tại hội nghị CHI 2024 (Rank A*)
Nghiên cứu nền tảng của **Duan, Warner, Li & Hartmann (CHI 2024)** — *"Generating Automatic Feedback on UI Mockups with Large Language Models"* — đã thử nghiệm dùng **GPT-4** chấm giao diện theo 10 Heuristic của Nielsen và đối chiếu với **12 chuyên gia UX**:
* **Độ giao thoa lỗi:** Trong tổng số các vấn đề khả dụng thực tế, **62%** chỉ con người nhìn thấy, **29%** cả người và AI cùng thấy, và **9%** chỉ AI phát hiện ra mà con người bỏ sót.
* **Độ chính xác:** **Precision của AI đạt `0,60`** (cứ báo 10 lỗi thì có 4 lỗi báo nhầm / áp nguyên tắc quá đà), thấp hơn mức **`0,83`** của chuyên gia con người; **Recall của AI đạt `0,38`** so với **`0,34`** của một chuyên gia đơn lẻ.
* **Hạn chế lớn của bài báo CHI 2024:** Nghiên cứu năm 2023–2024 chỉ gửi **mô tả cấu trúc giao diện dạng văn bản JSON** trích xuất từ Figma cho GPT-4 chứ **không gửi ảnh chụp màn hình thực tế**.

### 1.2. Đối chiếu với các bộ Agent Skills nhiều Star trên GitHub
Qua khảo sát 7 bộ Agent Skills phổ biến nhất trên GitHub (chi tiết tại [`docs/khao-sat/agent-skills.md`](../docs/khao-sat/agent-skills.md)):
* **`anthropics/skills` $\rightarrow$ `webapp-testing` (~180k ⭐):** Rất mạnh về quy trình *"Trinh sát rồi hành động"* (tự bật server, dùng Playwright chụp ảnh màn hình và đọc DOM), nhưng không có bộ tiêu chí chấm điểm khả dụng theo Nielsen.
* **`nextlevelbuilder/ui-ux-pro-max-skill` (~137k ⭐):** Cung cấp 119 UX guidelines và checklist thiết kế, nhưng thiên về sinh giao diện mới hơn là audit giao diện sẵn có.
* **`vercel-labs/agent-skills` $\rightarrow$ `web-design-guidelines` (~32.6k ⭐):** Rà soát **mã nguồn (code)** theo hơn 100 quy tắc HTML/CSS/WCAG và chỉ ra vị trí `file:line`, nhưng không nhìn ảnh hiển thị thực tế và không chấm mức độ nghiêm trọng (Severity 0–4).

$\Rightarrow$ **Đóng góp của Nhóm 09:** Xây dựng Agent Skill **`nielsen-heuristic-reviewer`** (tại [`ai-reviewer/SKILL.md`](../ai-reviewer/SKILL.md)) cho coding agent (Claude Code): Playwright dựng trạng thái và chụp ảnh, **subagent tự xem ảnh** và chấm theo **10 Heuristic Nielsen + Severity 0–4** với **4 luật chống bịa lỗi**, một subagent khác **gán nhãn nháp** so với ground truth, **người duyệt lại nhãn**, rồi script đo **Precision, Recall, Độ lệch Severity, Độ ổn định** trên SUT EShop. Skill không gọi API LLM riêng: model đánh giá chính là model của agent.

---

## 2. Kiến trúc Skill `nielsen-heuristic-reviewer` & Thiết kế Rubric

### 2.1. Luồng tự động hóa

```text
Agent chính (đọc SKILL.md)
  │ 1. npm run capture        → out/<run>/shots/*.png          (Playwright, setups.js)
  │ 2. subagent heuristic-reviewer  ← chỉ nhận thư mục ảnh + rubric
  │                           → out/<run>/findings/<trang>-<viewport>.json
  │ 3. npm run validate       → kiểm từng file theo schema.json (sai: gọi lại subagent, tối đa 2 lần)
  │ 4. npm run report         → out/<run>/report.md
  │   (lặp 1–4 cho run-1, run-2, run-3; mỗi lần một subagent mới)
  │ 5. npm run labels:prepare → evidence/ai/to-label.json
  │ 6. subagent finding-labeler ← findings + ground-truth/bugs.md
  │                           → evidence/ai/labels-ai.json
  │ 7. npm run labels:merge   → evidence/ai/labels.csv   (nhãn AI, cột human_label để người duyệt)
  │ 8. npm run compare        → evidence/ai/comparison-summary.md + lưu các lần chạy vào evidence/ai/runs/
  ▼
Người duyệt labels.csv (ok / sửa nhãn) → chạy lại npm run compare
```

| Thành phần | File | Chức năng chính | Ánh xạ bộ ba kỹ thuật |
| :--- | :--- | :--- | :--- |
| **Định nghĩa Skill** | [`SKILL.md`](../ai-reviewer/SKILL.md), [`agents/`](../ai-reviewer/agents/) | Quy trình cho agent (tiếng Anh, ít token); định nghĩa 2 subagent | Khả năng tái sử dụng |
| **Dữ liệu cấu hình** | [`config.example.json`](../ai-reviewer/config.example.json), [`config.todomvc.json`](../ai-reviewer/config.todomvc.json) | `baseUrl`, 5 trang × 2 viewport, cách dựng trạng thái | **Data-driven** |
| **Dựng trạng thái & chụp ảnh** | [`src/setups.js`](../ai-reviewer/src/setups.js), [`src/capture.js`](../ai-reviewer/src/capture.js) | Đăng nhập, thêm giỏ (bấm lại nếu gặp G10), vào Checkout, chụp ảnh. Lỗi là dừng, không thay ảnh khác | **Record & Playback** |
| **Rubric & kiểm schema** | [`prompts/heuristic-review.md`](../ai-reviewer/prompts/heuristic-review.md), [`schema.json`](../ai-reviewer/schema.json), [`src/validate.js`](../ai-reviewer/src/validate.js) | Rubric cho subagent; kiểm JSON đầu ra | **Checkpoint tự động** |
| **Gán nhãn & so sánh** | [`prompts/labeling-guide.md`](../ai-reviewer/prompts/labeling-guide.md), [`src/labels.js`](../ai-reviewer/src/labels.js), [`src/compare.js`](../ai-reviewer/src/compare.js) | AI gán nhãn nháp, người duyệt, script tính chỉ số | **Checkpoint thực nghiệm** |

### 2.2. Bốn quy tắc chống AI "bịa lỗi" trong rubric
1. **Chỉ báo vấn đề nhìn thấy trên ảnh:** cấm đoán tính năng ẩn, trang khác, cấu trúc HTML hay thuộc tính không nhìn thấy.
2. **Đủ 6 trường cho mỗi lỗi:** `heuristic`, `element`, `problem`, `severity`, `evidence` (vị trí trên ảnh), `fix`.
3. **Không trùng lặp, tối đa 5 lỗi mỗi ảnh**, mỗi vấn đề gán vào 1 heuristic phù hợp nhất.
4. **JSON đúng `schema.json`**; `validate.js` kiểm, sai thì gọi lại subagent.

Ngoài ra, rubric **chỉ định nghĩa heuristic một cách chung**, không có ví dụ nào lấy từ EShop, để không mớm đáp án cho AI.

### 2.3. Cách ly để AI không đọc đáp án
- Subagent chấm ảnh chỉ có công cụ đọc/ghi file, chỉ được đưa thư mục ảnh và rubric; định nghĩa subagent cấm mở file khác (mã nguồn, ground truth, slide, báo cáo cũ).
- Mỗi lần chạy là một subagent mới, không mang ngữ cảnh của lần trước → đo được độ ổn định.
- Subagent gán nhãn chạy **sau** khi đã chấm xong cả 3 lần.
- Giới hạn: lệnh cấm đọc file là chỉ dẫn cho agent, không phải quyền của hệ thống.

---

## 3. Kịch bản 3 Demo của Phần AI

### 3.1. Demo 1 — Cài đặt Skill & Smoke Test
* **Thao tác:** `npm install`, `npx playwright install chromium`; chép 2 subagent và skill vào `.claude/` (lệnh trong [`ai-reviewer/README.md`](../ai-reviewer/README.md)); mở Claude Code ở gốc repo và yêu cầu chạy smoke test.
* **Kết quả mong đợi:** agent chụp `home-desktop.png`, subagent viết `findings/home-desktop.json`, `npm run validate` in `VALID`. Không cần API key.

### 3.2. Demo 2 — Trang Giỏ hàng
* **Thao tác:** yêu cầu agent chạy skill với `--only cart --viewport desktop`, mở `out/cart-demo/report.md`.
* **Giả thuyết trước khi chạy:** AI thấy được G02 (xóa không xác nhận), G03 (thiếu nút +/-), có thể thấy G01 (nhãn "Tổng tạm tính"); khó thấy G04 (cần đặc tả màu) và không thấy G05 (thẻ `<h1>` không hiện trên ảnh).
* **Kết quả thật:** _(điền sau khi chạy)_

### 3.3. Demo 3 — Toàn luồng 3 lần, người vs AI, đổi website
* **3a.** Agent chạy skill 3 lần (`run-1`, `run-2`, `run-3`), mỗi lần 10 ảnh và một subagent chấm mới.
* **3b.** Subagent `finding-labeler` gán nhãn nháp → `evidence/ai/labels.csv`; agent chạy `npm run compare`. Người duyệt từng dòng trong `labels.csv` (ghi `ok` hoặc nhãn đúng), rồi chạy lại `compare`.
* **3c.** Agent chạy skill với `--config config.todomvc.json` trên TodoMVC, không sửa code.

---

## 4. Kết quả Thực nghiệm: Con người vs. AI trên EShop

_(Chưa chạy. Điền từ [`evidence/ai/comparison-summary.md`](../evidence/ai/comparison-summary.md) sau khi chạy Demo 3 và người đã duyệt hết `labels.csv`.)_

| Chỉ số đánh giá | Cách tính | Run 1 | Run 2 | Run 3 | Gộp | Bài báo CHI 2024 (GPT-4) |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Precision** | (khớp GT + lỗi mới đúng) / tổng AI báo | | | | | AI `0,60` · Người `0,83` |
| **Recall** | số lỗi GT AI tìm được / 11 | | | | | AI `0,38` · Người `0,34` |
| **Chỉ người / Cả hai / Chỉ AI** | trên tập GT + lỗi mới đúng | | | | | `62% / 29% / 9%` |
| **Lệch severity TB** | \|AI − GT\| trên các lỗi khớp GT | | | | | — |
| **Độ ổn định** | lỗi đúng xuất hiện ở cả 3 lần / tổng lỗi đúng | | | | | — |
| **Nhãn đã người duyệt** | số dòng có `human_label` / tổng | | | | | — |

---

## 5. Giới hạn dự kiến của AI (kiểm chứng ở Demo 3)

| # | Giới hạn | Lỗi EShop dự kiến minh họa | Công cụ bù đắp trong Seminar |
| :---: | :--- | :--- | :--- |
| **1** | **Không thấy cấu trúc DOM / HTML** | **`G05`** (thiếu `<h1>`), thuộc tính `alt` của ảnh | **Playwright + axe-core** (Phần 06) |
| **2** | **Không biết đặc tả riêng** | **`G04`** (nút thanh toán xanh lá thay vì xanh dương) | **Checklist 50 câu** (Phần 03), **Playwright `toHaveCSS`** (Phần 06) |
| **3** | **Không thấy lỗi tương tác nhiều bước trên ảnh tĩnh** | **`G10`** (nút "Thêm vào giỏ" phải bấm 2 lần) | **UXtweak + Microsoft Clarity** với người dùng thật (Phần 07) |
| **4** | **Bất định, áp quy tắc quá đà** | Đo qua 3 lần chạy | Người duyệt cuối |
| **5** | **AI gán nhãn cho AI có thể sai** | Đo bằng số dòng người phải sửa trong `labels.csv` | Người duyệt toàn bộ nhãn |

$\Rightarrow$ **Kết luận dự kiến:** AI Heuristic Reviewer là trợ lý tăng tốc, không thay thế được Playwright, kiểm thử với người dùng thật và bước duyệt cuối của con người. Kết luận chính thức viết lại sau khi có số liệu.

---

## 6. Tài liệu tham khảo

1. Duan, P., Warner, J., Li, Y., & Hartmann, B. (2024). *Generating Automatic Feedback on UI Mockups with Large Language Models*. In Proceedings of the CHI Conference on Human Factors in Computing Systems (**CHI '24**, CORE Rank A*). DOI: `10.1145/3613904.3642782`.
2. Anthropic. (2025). *Agent Skills Repository — `webapp-testing` skill*. GitHub: https://github.com/anthropics/skills
3. Vercel Labs. (2025). *Agent Skills — `web-design-guidelines` skill*. GitHub: https://github.com/vercel-labs/agent-skills
4. Nielsen, J. (1994). *Enhancing the explanatory power of usability heuristics*. In Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (pp. 152–158).
