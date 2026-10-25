# Weekly Work Report — Group 09 · WeekID 06

- **Kỳ báo cáo:** **17/10/2026 – 23/10/2026** (Tuần thực hành 06 — Mốc nộp tiến độ $\ge 90\%$)
- **Môn học:** Software Testing (FIT@HCMUS) — **GVTH:** Thầy Hồ Tuấn Thanh
- **Đề tài Seminar:** **T1 — GUI & Usability Testing**
- **Repository:** https://github.com/kqanGit/seminar_gui_usability_testing

---

## 1. Thông tin thành viên & Phân công vai trò

| MSSV | Họ và tên | Git Username | Vai trò đảm nhiệm | Khối lượng hoàn thành |
| :---: | :--- | :--- | :--- | :---: |
| **20120359** | **Nguyễn Đức Quang** | `ducquang2` | **Vai A:** GUI Testing & Automation với Playwright | **$100\%$** |
| **23120328** | **Bửu Huỳnh Vĩnh Phúc** | `23120328` | **Vai B:** Usability Testing với UXtweak & Microsoft Clarity | **$95\%$** |
| **23120337** | **Bùi Minh Quân** *(Trưởng nhóm)* | `kqanGit` | **Vai C:** AI Heuristic Reviewer & Slide, Kịch bản, Tích hợp SUT | **$100\%$** |

---

## 2. Tiến độ chi tiết trong kỳ (17/10 – 23/10)

### 2.1. Vai A — Nguyễn Đức Quang (`ducquang2`) — GUI Testing & Playwright
- [x] **Xây dựng Playwright Demo 3 (Phức tạp):**
  - Viết `tests/playwright/setups.js` dựng trạng thái cho 5 trang EShop.
  - Viết `tests/demo3-gui-rules.spec.js` kiểm thử Data-driven (5 trang $\times$ 3 viewport: desktop, mobile, tablet) kết hợp Soft Assertions và Visual Regression (`*-snapshots/`).
- [x] **Chấm điểm trọn vẹn Checklist GUI 50 câu (`checklist/checklist-50.md`):** Đạt 12 Pass / 28 Fail / 10 N/A, kèm minh chứng khoanh đỏ và mã lỗi `G01`–`G11`.
- [x] **Hoàn thiện nội dung báo cáo & kịch bản:**
  - Hoàn thiện `content/03-checklist.md` và `content/06-playwright.md`.
  - Soạn kịch bản quay 3 clip Playwright tại `videos/clip-scripts-playwright.md`.
- [x] **Quay & Xuất bản 3 clip YouTube Playwright:**
  - Demo 1 (Cài đặt Playwright, 4:51): https://youtu.be/mx3exWqNlwg
  - Demo 2 (Cơ bản — Checkpoint, 2:56): https://youtu.be/YKiv_qQGFvk
  - Demo 3 (Phức tạp — Data-driven, 4:06): https://youtu.be/E4NwNmcJ3EI

---

### 2.2. Vai B — Bửu Huỳnh Vĩnh Phúc (`23120328`) — Usability Testing
- [x] **Chuyển đổi công cụ Usability từ Maze sang bộ đôi UXtweak + Microsoft Clarity:**
  - Do Maze khóa khối *Live Website Testing* ở gói Free/Trial, nhóm đã kích hoạt phương án dự phòng chuyển sang **UXtweak** (Website Testing: Task T1, SEQ 1–7, SUS 10 câu dạng Radio grid, Lostness) và **Microsoft Clarity** (Click Heatmap, Rage Click, Dead Click, Session Recording).
- [x] **Biên soạn tài liệu & nội dung lý thuyết:**
  - Viết nội dung lý thuyết Usability `content/04-ly-thuyet-usability.md` (ISO 9241-11, Nielsen 10 Heuristics, thang Severity 0–4, Test Plan).
  - Khảo sát & so sánh 4 công cụ Usability `content/05-khao-sat-cong-cu.md` (Maze, UXtweak, Clarity, Hotjar).
  - Hoàn thiện tài liệu thực hành `content/07-maze.md` và slide `slides/sections/07-maze.md`.
- [x] **Soạn đề & đáp án Bài tập 3:** Hoàn thành `exercises/bai-3-maze-sus.md` và `exercises/answers/bai-3-dap-an.md` (tính điểm SUS và phân tích hành vi misclick).
- [x] **Triển khai Study UXtweak:** Tạo study live `EShop Checkout Usability Study` và chạy thử nghiệm thu thập kết quả ban đầu.
- [x] **Quay & Xuất bản 3 clip YouTube Usability Testing (UXtweak + Clarity):**
  - Demo 1 (Cài đặt snippet & xác thực, ~2:30): https://youtu.be/OuBjSEdTORQ
  - Demo 2 (Cơ bản — 1 Task, Checkpoint, SEQ & Replay, ~3:00): https://youtu.be/Nq31Rxb6lIk
  - Demo 3 (Phức tạp — Data-driven 5 người, SUS & Heatmap, ~4:15): https://youtu.be/7HmEv2DnVJw

---

### 2.3. Vai C — Bùi Minh Quân (`kqanGit`) — AI Heuristic Reviewer & Tích hợp
- [x] **Triển khai hạ tầng SUT & Tích hợp Snippet:**
  - Cấu hình file `sut/eshop/frontend-web/vercel.json` và deploy ứng dụng lên Vercel: `https://seminar-gui-usability-testing.vercel.app`.
  - Tích hợp thành công UXtweak Tracking Snippet (`56e349e0-...`) và Microsoft Clarity Tracking Code (`z27wxp2oeb`) vào file `index.html` của SUT.
- [x] **Tinh giản Slide & Kịch bản thuyết trình 30 phút:**
  - Rút gọn toàn bộ hệ thống slide về bản trình bày chuẩn 30 phút (`slides/sections/*.md`), chuyển các slide chi tiết vào phụ lục.
  - Soạn kịch bản thuyết trình từng giây cho cả 3 thành viên: `docs/kich-ban-trinh-bay.md`.
- [x] **Xây dựng trọn bộ Agent Skill `nielsen-heuristic-reviewer` (v2.0):**
  - Đóng gói Agent Skill chuẩn `SKILL.md` kèm 2 Subagent cách ly (`heuristic-reviewer` và `finding-labeler`).
  - Viết 6 script Node.js trong `ai-reviewer/src/` (`capture.js`, `setups.js`, `validate.js`, `report.js`, `labels.js`, `compare.js`).
- [x] **Chạy thực nghiệm độc lập toàn luồng Demo 3:**
  - Playwright chụp 30 ảnh EShop (3 lần chạy `run-1..3`, 5 trang $\times$ 2 viewport) và 1 ảnh TodoMVC.
  - 3 Subagent `heuristic-reviewer` cách ly hoàn toàn đánh giá 105 vi phạm và vượt qua 100% kiểm tra `validate` theo `schema.json`.
  - Subagent `finding-labeler` gán nhãn nháp 105 phát hiện so với Ground Truth `G01`–`G11`.
  - Tính toán chỉ số: Precision TB **0,76**, Recall **0,45 (5/11)**, Độ ổn định **86,7% (13/15 lỗi lặp lại cả 3 lần)**, chỉ ra rõ lý do AI chỉ nhìn ảnh tĩnh nên bỏ sót các lỗi hành vi đa bước (`G02`, `G10`) và lỗi đặc tả (`G01`, `G04`).
- [x] **Biên soạn Báo cáo Phần 08 & Bài tập 2:**
  - Hoàn thiện `content/08-ai-reviewer.md` và `slides/sections/08-ai-reviewer.md`.
  - Soạn đề và đáp án Bài tập 2 (Heuristic Showdown): `exercises/bai-2-heuristic-showdown.md` và `exercises/answers/bai-2-dap-an.md`.
- [x] **Quay & Xuất bản 3 clip YouTube AI Heuristic Reviewer:**
  - Demo 1 (Cài đặt Skill & Smoke Test): https://youtu.be/d2Rigi9dbls
  - Demo 2 (Đánh giá Giỏ hàng & Phản biện AI): https://youtu.be/wXIQ4o7bVi8
  - Demo 3 (Toàn luồng 3 Runs, CHI 2024 & TodoMVC): https://youtu.be/8I4n31fuWNc

---

## 3. Tổng kết mức độ hoàn thành toàn bộ đề tài

| Hạng mục cam kết theo Proposal | Mức độ hoàn thành | Ghi chú minh chứng |
| :--- | :---: | :--- |
| **SUT EShop hoàn chỉnh** | $100\%$ | Backend SQLite `:3000` + Frontend React `:5173`, đã deploy live trên Vercel |
| **Checklist GUI 50 câu** | $100\%$ | Đủ 50 câu, có ảnh minh chứng lỗi khoanh đỏ |
| **Playwright Testing (3 Demo)** | $100\%$ | 3 script hoàn chỉnh + 3 video clip YouTube đã xuất bản |
| **Usability Testing (UXtweak + Clarity)** | $100\%$ | Study live, snippet ghi nhận dữ liệu, 3 video clip YouTube đã xuất bản |
| **AI Heuristic Reviewer (3 Demo)** | $100\%$ | Skill chuẩn, 2 subagents cách ly, thực nghiệm 3 runs + TodoMVC, 3 clip YouTube đã xuất bản |
| **Slide thuyết trình 30 phút** | $100\%$ | Đầy đủ 10 phần, đúng thời lượng, có kịch bản MC chi tiết |
| **Bài tập thực hành (Showdown + SUS)** | $100\%$ | 2 bài tập lớn kèm đáp án chi tiết và biểu điểm |
| **ĐÁNH GIÁ TỔNG THỂ ĐỀ TÀI** | **$100\%$** | **Hoàn thành 100% mọi hạng mục cam kết trong Proposal** |

---

## 4. Kế hoạch tuần tiếp theo (Tuần chuẩn bị thuyết trình)
1. Cả nhóm luyện tập thuyết trình khớp kịch bản thời gian 30 phút (Quang 10', Phúc 10', Quân 10').
2. Thu thập thêm các lượt phản hồi người dùng trên UXtweak Study để bổ sung vào slide kết quả.
3. Xuất slide bản PDF và chuẩn bị USB dự phòng trước buổi báo cáo trên lớp.
