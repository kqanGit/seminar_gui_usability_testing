# AI Usage Declaration — Group 09 · WeekID 06

- **Kỳ báo cáo:** **17/10/2026 – 23/10/2026** (Tuần thực hành 06)
- **Môn học:** Software Testing (FIT@HCMUS) — **GVTH:** Thầy Hồ Tuấn Thanh
- **Đề tài Seminar:** T1 — GUI & Usability Testing
- **Repository:** https://github.com/kqanGit/seminar_gui_usability_testing

---

## 1. Tuyên bố sử dụng AI trong tuần

Theo đúng quy định "chính chủ" của môn học, Nhóm 09 tuyên bố: **Nhóm CÓ SỬ DỤNG AI** để hỗ trợ quá trình nghiên cứu, soạn thảo tài liệu, xây dựng kịch bản kiểm thử và hiện thực hóa Agent Skill. Tất cả kết quả do AI đề xuất đều được thành viên phụ trách **kiểm duyệt 100%, chạy thực tế trên máy, đối chiếu đặc tả và chịu hoàn toàn trách nhiệm về nội dung**.

---

## 2. Bảng tổng hợp công cụ AI đã sử dụng theo từng thành viên

| Thành viên | MSSV | Công cụ AI sử dụng | Tác vụ cụ thể trong tuần (17/10 – 23/10) | Người kiểm duyệt | Hành động kiểm duyệt & Sửa đổi |
| :--- | :---: | :--- | :--- | :---: | :--- |
| **Nguyễn Đức Quang** | 20120359 | **Cursor (Agent)** | Hỗ trợ sinh khung mã nguồn `tests/playwright/setups.js`, `demo3-gui-rules.spec.js`; soạn kịch bản quay 3 clip YouTube Playwright. | Quang | Tự chạy SUT EShop trên máy, tự cấu hình soft assertions, kiểm tra trực quan baseline visual snapshots và tự quay trực tiếp 3 clip YouTube. |
| **Bửu Huỳnh Vĩnh Phúc** | 23120328 | **Claude & Antigravity (Gemini)** | Tổng hợp lý thuyết Usability ISO 9241-11, khảo sát so sánh 4 công cụ (Maze, UXtweak, Clarity, Hotjar); soạn đề & đáp án Bài tập 3 (SUS). | Phúc | Kiểm chứng công thức tính điểm SUS; chuyển đổi giải pháp từ Maze sang UXtweak + Clarity do giới hạn Live Testing của gói Free; tự tạo study live. |
| **Bùi Minh Quân** | 23120337 | **Claude & Antigravity (Gemini)** | Rút gọn slide 30 phút; viết kịch bản trình bày chi tiết; thiết kế cấu trúc Agent Skill `nielsen-heuristic-reviewer` v2.0 (Playwright capture + 2 subagents cách ly); soạn đề & đáp án Bài tập 2. | Quân | Kiểm tra code Playwright setups (xử lý bẫy G10 bấm đúp, bẫy đăng nhập); kiểm tra schema JSON; kiểm duyệt gán nhãn đối chiếu Người vs AI. |

---

## 3. Quá trình sử dụng AI chi tiết

### 3.1. Đối với phần GUI Testing & Playwright (Quang)
- **Prompt định hướng:** Yêu cầu Cursor đề xuất script Playwright kiểm thử Data-driven cho 5 trang EShop $\times$ 3 viewport (Desktop, Mobile, Tablet) sử dụng Soft Assertions (`expect.soft`).
- **Kiểm soát chất lượng:** Quang chạy test thực tế trên máy, phát hiện một số assertion bị fail do độ trễ mạng khi tải trang nên đã bổ sung `waitForLoadState('networkidle')` và thiết lập ngưỡng dung sai pixel (maxDiffPixels) cho Visual Regression.
- **Minh chứng clip:** Quang tự quay màn hình kèm thuyết minh tiếng Việt, xuất bản lên kênh YouTube.

### 3.2. Đối với phần Usability Testing (Phúc)
- **Prompt định hướng:** Yêu cầu AI phân tích ma trận tính năng giữa Maze, UXtweak, Clarity và Hotjar; xây dựng kịch bản đo độ khó đơn tác vụ (SEQ) và thang đo độ khả dụng hệ thống (SUS 10 câu).
- **Kiểm soát chất lượng:** Phúc tự đăng ký tài khoản UXtweak và Microsoft Clarity, tự nhúng mã tracking vào SUT, tạo Study thật và thực hiện test thử nghiệm 1 lượt để kiểm tra luồng thu thập dữ liệu Session Recording và Heatmap.

### 3.3. Đối với phần AI Heuristic Reviewer (Quân)
- **Prompt định hướng & Kỹ thuật ngăn ngừa gian lận (Anti-contamination):**
  - Prompt ép 4 luật chống bịa đặt (Hallucination prevention): chỉ được báo cáo vấn đề nhìn thấy trên ảnh tĩnh, mỗi vi phạm bắt buộc có đủ 6 trường dữ liệu, không được suy đoán mã nguồn hay hành vi ẩn.
  - Phân tách **2 Subagent hoàn toàn độc lập với ngữ cảnh sạch (Fresh context)**:
    - `heuristic-reviewer`: Bị cấm đọc `ground-truth/bugs.md`, cấm đọc mã nguồn SUT, cấm truy cập web; chỉ được mở thư mục ảnh chụp và đọc file rubric tổng quát.
    - `finding-labeler`: Chuyên trách đối chiếu kết quả của AI với Ground Truth để làm dữ liệu thô cho con người kiểm duyệt (Human-in-the-loop).
- **Kiểm soát chất lượng:** Quân tự chạy pipeline trên máy thật, kiểm tra tính hợp lệ của từng file JSON qua `schema.json`, đối chiếu 105 dòng phát hiện trên `labels.csv` và trực tiếp viết báo cáo phân tích vì sao AI bỏ sót các lỗi tương tác đa bước (`G02`, `G10`).

---

## 4. Trích đoạn Chat Log tiêu biểu với AI

### Trích đoạn 1: Thiết kế Subagent cách ly chống nhìn trộm đáp án
```text
User (Quân): Làm sao để đảm bảo AI Heuristic Reviewer đánh giá khách quan 10 tiêu chí Nielsen mà không bị ảnh hưởng bởi danh sách lỗi Ground Truth G01–G11 đã có sẵn trong repo?

AI (Antigravity): Cần tách kiến trúc thành 2 tầng subagent độc lập:
1. Subagent 'heuristic-reviewer' chỉ được truyền 3 tham số duy nhất: đường dẫn thư mục ảnh PNG, đường dẫn file rubric chung (prompts/heuristic-review.md) và thư mục ghi kết quả findings/. Cấm hoàn toàn quyền đọc file source code, cấm đọc ground-truth/bugs.md, cấm truy cập internet.
2. Main Agent chỉ làm nhiệm vụ orchestrator (chạy Playwright chụp ảnh, kiểm tra schema.json, gộp báo cáo).
3. Một Subagent riêng biệt 'finding-labeler' mới được đọc ground-truth/bugs.md để gán nhãn nháp, và con người phải duyệt lại qua file labels.csv.
```

### Trích đoạn 2: Sửa lỗi Playwright khi điều hướng trang sản phẩm EShop
```text
User (Quân): Tại sao khi Playwright chụp trang product-mobile.png thì ảnh chụp lại bị dính chữ "Đang tải..." và script báo lỗi không tìm thấy nút "Thêm vào giỏ"?

AI (Antigravity): Vì EShop là Single Page Application (React Router). Khi bấm vào link "Xem chi tiết", React Router chuyển trang ở client-side nên page.waitForLoadState('networkidle') kết thúc ngay lập tức trước khi component hoàn tất việc fetch dữ liệu sản phẩm.
Giải pháp: Cần thay bằng waitFor selector cụ thể:
await page.locator('button:has-text("Thêm vào giỏ")').first().waitFor({ state: 'visible', timeout: 10000 });
Đồng thời, lỗi G10 của EShop bắt buộc phải click 2 lần trên cùng một phiên mount thì sản phẩm mới vào giỏ hàng.
```

---

## 5. Cam kết liêm chính học thuật
- Toàn bộ dữ liệu đo đạc (Playwright snapshot, số liệu UXtweak/Clarity, 30 ảnh chụp EShop, 105 vi phạm Heuristic) đều được sinh ra từ các công cụ và script chạy thực tế trên mã nguồn SUT của nhóm.
- Mọi nội dung báo cáo, slide thuyết trình và bài tập đều đã được 3 thành viên đọc kỹ, chỉnh sửa và chịu trách nhiệm trước Thầy hướng dẫn và Hội đồng seminar.
