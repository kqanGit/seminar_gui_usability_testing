# Phần 05 — Khảo sát & So sánh Công cụ Kiểm thử GUI & Usability

> Phụ trách: **Cả nhóm** (Phúc đóng góp chuyên sâu nhóm công cụ Usability: **Maze, UXtweak, Clarity, Hotjar**; Quang đóng góp nhóm GUI; Quân đóng góp nhóm AI & tổng hợp) · Trạng thái: **Đã hoàn thiện**

---

## 1. Bảng so sánh đa chiều các công cụ đã khảo sát

Nhóm 09 tiến hành khảo sát **10 công cụ tiêu biểu** chia thành 3 nhóm: **(1) Kiểm thử GUI tự động**, **(2) Kiểm thử Usability & Phân tích hành vi người dùng**, và **(3) Đánh giá giao diện tăng cường bằng AI (AI-augmented)**.

| Công cụ | Phân nhóm chính | Chi phí (Gói khả dụng cho SV) | Độ khó học | Mức độ tự động hóa | Năng lực AI tích hợp | Cộng đồng & Tài liệu | Độ phù hợp với SUT EShop | Quyết định của Nhóm 09 |
| :--- | :--- | :--- | :---: | :--- | :--- | :---: | :---: | :---: |
| **Playwright (+ axe-core)** | GUI Testing, Visual Regression, Accessibility | **Miễn phí 100%** (Mã nguồn mở Apache-2.0) | Trung bình (JS/TS) | **Fully automated** *(Tự động hoàn toàn)* | Kết nối tốt qua Playwright MCP với các LLM | Rất lớn (Microsoft hậu thuẫn, tài liệu chuẩn) | **Rất cao:** Chạy trực tiếp trên `localhost:5173`, hỗ trợ `codegen`, `toHaveScreenshot`, quét WCAG | **Chọn làm công cụ chính (Vai A)** |
| **Maze** | Unmoderated Task-based Usability Testing | **Gói Free:** 1 Study/tháng, đầy đủ Mission, SEQ, Multiple Choice | Thấp (Kéo thả khối trên giao diện web) | **Semi-automated** *(Tự động thu thập & chấm Path/Heatmap)* | Maze AI (gợi ý câu hỏi, tóm tắt phản hồi ở gói trả phí) | Trung bình – Lớn (Maze Help Center, cộng đồng UX) | **Cao (khi đã deploy):** Đo chính xác tỷ lệ hoàn thành nhiệm vụ, Time on Task, Misclick, SEQ & SUS | **Chọn làm công cụ chính (Vai B)** |
| **AI Heuristic Reviewer** *(Node.js + Playwright + LLM Vision)* | Đánh giá 10 Heuristic Nielsen & So sánh Người vs AI | Chi phí API theo lượt chạy (rất thấp, vài cent/lần chạy) | Trung bình | **Fully automated** *(Tự dựng trạng thái, chụp ảnh, chấm JSON)* | **Là hệ thống AI cốt lõi** (Vision LLM phân tích ảnh chụp màn hình) | Dựa trên chuẩn nghiên cứu CHI 2024 & hệ sinh thái Agent Skills | **Rất cao:** Chạy trên `localhost`, đổi `config.json` là tái sử dụng được cho website khác | **Chọn làm công cụ chính (Vai C)** |
| **UXtweak** | Task-based Usability Testing, Card Sorting, Tree Testing | Gói Free (Starter): giới hạn 1 study nhỏ, tối đa 15 phản hồi | Thấp | Semi-automated | Có phân tích thông minh cơ bản | Nhỏ hơn Maze | **Trung bình – Cao:** Tính năng Website Testing tương tự Maze nhưng giao diện báo cáo Path kém trực quan hơn | **Phương án dự phòng cho Maze** |
| **Microsoft Clarity** | Session Recording & Heatmap thụ động | **Miễn phí hoàn toàn** (Không giới hạn lưu lượng truy cập) | Rất thấp (Chỉ cần gắn 1 đoạn script) | Semi-automated (Tự động ghi hình và vẽ Heatmap) | **Clarity Copilot** tự động tóm tắt phiên ghi hình & nhóm lỗi | Lớn (Microsoft Learn) | **Thấp cho quy mô lớp học:** Không giao được nhiệm vụ (Mission), không chấm được Success Rate hay SUS/SEQ | **Đã khảo sát — Không chọn làm demo chính** |
| **Hotjar (by Contentsquare)** | Heatmap, Session Recording, Feedback Poll | Gói Basic miễn phí (giới hạn 35 phiên/ngày) | Thấp | Semi-automated | Hotjar AI hỗ trợ tạo khảo sát & tóm tắt | Rất lớn | **Trung bình:** Mạnh về quan sát dài hạn trên production nhưng thiếu cơ chế kiểm thử theo đường đi kỳ vọng (Expected Path) | **Đã khảo sát — Không chọn làm demo chính** |
| **BackstopJS** | Visual Regression Testing chuyên biệt | Miễn phí (Mã nguồn mở MIT) | Thấp (Cấu hình qua file JSON) | Fully automated | Không có | Trung bình | **Trung bình:** Chỉ so sánh ảnh chụp màn hình, không kiểm tra được thuộc tính DOM/a11y linh hoạt như Playwright | **So sánh đối chiếu với Playwright** |
| **Lighthouse / axe DevTools** | Accessibility & Web Vitals Audit | Miễn phí (Tích hợp sẵn trong Chrome / Extension) | Rất thấp | Fully / Semi-automated | Không có | Rất lớn (Google & Deque) | **Cao:** Nhóm đã tích hợp trực tiếp lõi `@axe-core/playwright` vào script tự động hóa của Playwright | **Dùng tích hợp trong Playwright** |
| **Applitools Eyes** | Visual AI Regression Testing | Chỉ có Free Trial ngắn hạn, gói thương mại rất đắt | Trung bình | Fully automated | **Visual AI** (so sánh ảnh theo thị giác con người, lọc nhiễu pixel) | Trung bình | **Cao về kỹ thuật nhưng vướng chi phí:** SDK gắn tốt vào Playwright nhưng giới hạn tài khoản miễn phí | **Tham khảo lý thuyết Visual AI** |
| **BrowserStack Live** | Compatibility Testing trên thiết bị thật | Free Trial 30 phút (tối đa 1 phút/thiết bị ở bản miễn phí) | Thấp | Thủ công (Tương tác trực tiếp trên thiết bị đám mây) | Không có | Rất lớn | **Trung bình:** Có BrowserStack Local cho `localhost`, nhưng thời lượng trial 1 phút quá ngắn để quay luồng phức tạp | **Tham khảo phần Compatibility** |

---

## 2. Phân tích chuyên sâu nhóm công cụ Usability Testing (Đóng góp của Vai B — Phúc)

Trong quá trình lựa chọn công cụ đại diện cho mảng **Usability Testing**, câu hỏi lớn nhất mà nhóm đặt ra là: **"Nên chọn nhóm công cụ kiểm thử theo nhiệm vụ (Task-based Testing như Maze, UXtweak) hay nhóm công cụ quan sát thụ động (Passive Analytics như Microsoft Clarity, Hotjar)?"**

### 2.1. So sánh trực tiếp: Maze vs UXtweak vs Microsoft Clarity vs Hotjar

| Tiêu chí đối chiếu | Maze | UXtweak | Microsoft Clarity | Hotjar |
| :--- | :--- | :--- | :--- | :--- |
| **Triết lý kiểm thử** | **Chủ động theo nhiệm vụ (Task-driven):** Giao đề bài cụ thể, đo xem người dùng có tới được đích không. | **Chủ động theo nhiệm vụ (Task-driven):** Tương tự Maze, mạnh thêm về kiến trúc thông tin (Tree test). | **Quan sát thụ động (Passive Observation):** Gắn mã lên web thật, ngồi chờ khách tự vào dùng để xem lại. | **Quan sát thụ động kết hợp Poll ngắn:** Ghi lại phiên truy cập và bật hộp thoại hỏi nhanh góc màn hình. |
| **Đo Task Success Rate & Expected Path** | **Có (Tự động phân loại Direct / Indirect / Give-up).** | **Có** (Cấu hình phức tạp hơn Maze ở bước gắn snippet). | **Không có** (Không biết người dùng vào web đang định làm nhiệm vụ gì). | **Không có** (Chỉ xem được phễu chuyển đổi Conversion Funnel thô). |
| **Tích hợp câu hỏi SEQ & bảng SUS trong cùng luồng** | **Rất tốt:** Đặt Block SEQ ngay sau Mission và Block SUS ở cuối Study trên cùng 1 link. | **Tốt:** Hỗ trợ bảng hỏi trước và sau nhiệm vụ. | **Không có:** Phải dùng Google Forms bên ngoài, không khớp nối được phiên click với phiếu trả lời. | **Hạn chế:** Có Survey nhưng tách rời với nhiệm vụ cụ thể. |
| **Bản đồ nhiệt (Heatmap) & Misclick / Rage Click** | **Có:** Vẽ Heatmap gắn liền với từng bước trong nhiệm vụ. | **Có:** Vẽ Click Heatmap theo URL nhiệm vụ. | **Rất mạnh:** Tự động phát hiện Rage Click, Dead Click, Excessive Scrolling trên quy mô lớn. | **Rất mạnh:** Click, Move và Scroll Heatmap trực quan. |
| **Yêu cầu cỡ mẫu người tham gia tối thiểu** | **Chỉ cần 5–8 người tham gia** là đã thu được biểu đồ đường đi và điểm SUS có ý nghĩa (theo quy luật Jakob Nielsen). | **5–10 người tham gia.** | **Cần hàng trăm đến hàng nghìn lượt truy cập** mới đủ mật độ dữ liệu để phân tích có ý nghĩa. | **Cần hàng trăm lượt truy cập** để Heatmap không bị rời rạc. |

### 2.2. Lý do chọn **Maze** và không chọn **Microsoft Clarity / Hotjar** làm công cụ demo chính
1. **Phù hợp hoàn hảo với quy mô $\sim 5$ người tham gia của Seminar:** Theo nghiên cứu kinh điển của Jakob Nielsen, chỉ cần **5 người tham gia (participants)** thực hiện cùng một nhiệm vụ cụ thể là đã phát hiện được khoảng 85% vấn đề khả dụng chính. Maze được thiết kế tối ưu cho đúng mô hình này: giao nhiệm vụ *"Mua phụ kiện trong ngân sách 5 triệu đồng với mã VIP100"* $\rightarrow$ chấm tự động ai thành công trực tiếp, ai đi vòng, ai bỏ cuộc $\rightarrow$ thu ngay điểm SEQ và SUS.
2. **Vì sao Clarity và Hotjar không phù hợp làm công cụ chính cho EShop:** SUT EShop là ứng dụng phục vụ môn học (không phải trang thương mại điện tử đang có hàng nghìn khách truy cập mỗi ngày). Nếu chỉ gắn Clarity với 5–6 người vào xem tự do mà không có khung giao nhiệm vụ (Mission Frame), dữ liệu thu được sẽ tản mạn, không tính được **Task Success Rate** hay **Time on Task** cho một kịch bản chuẩn.
3. **Giá trị bổ sung của Clarity/Hotjar trong bài báo cáo:** Dù không chọn làm công cụ demo chính, nhóm vẫn đưa Clarity và Hotjar vào Phần 04 (Lý thuyết) và Phần 08 (Giới hạn của AI) để minh họa một góc nhìn quan trọng: **quan sát hành vi người dùng thật dài hạn trên môi trường Production là thứ mà không một AI Agent giả lập nào có thể thay thế được**.

---

## 3. Tổng kết 3 lý do Nhóm 09 chọn bộ ba: Playwright + Maze + AI Heuristic Reviewer

1. **Bao phủ trọn vẹn hai nửa của đề tài T1 (GUI & Usability):**
   - **Playwright + axe-core (Vai A):** Đại diện cho kiểm thử giao diện đối chiếu đặc tả kỹ thuật (*Specification-based GUI Testing*) — kiểm tra chính xác từng thẻ `<h1>`, mã màu RGB, thuộc tính `alt`, `readonly` và chuẩn WCAG.
   - **Maze (Vai B):** Đại diện cho kiểm thử khả dụng lấy con người làm trung tâm (*Human-centered Usability Testing*) — đo lường hiệu quả, hiệu suất và sự hài lòng (ISO 9241-11) của người thật.
   - **AI Heuristic Reviewer (Vai C):** Đặt công nghệ AI Vision lên bàn cân thực nghiệm cùng một bộ trang EShop để đo đạc khách quan *Precision*, *Recall* và độ lệch *Severity* giữa Con người và AI.
2. **Thể hiện rõ ràng bộ ba kỹ thuật cốt lõi của môn học:**
   - Cả 3 công cụ đều được nhóm thiết kế kịch bản minh họa đầy đủ 3 khía cạnh: **Record & Playback**, **Data-driven Testing** và **Checkpoints**.
3. **Tính thực tiễn và khả năng tái sử dụng cao:**
   - Toàn bộ bộ công cụ đều có thể chạy miễn phí hoặc chi phí cực thấp cho sinh viên, mã nguồn kiểm thử và cấu hình đều được đóng gói sạch sẽ trong repository của nhóm để các bạn trong lớp có thể tải về thực hành ngay qua 3 bài tập áp dụng.

---

## 4. Nguồn tham khảo
- Playwright Documentation — https://playwright.dev/docs/intro
- Maze Help Center — *Live Website Testing & Pricing Plans*: https://help.maze.co/
- UXtweak Documentation — *Website Usability Testing Tool*: https://www.uxtweak.com/website-usability-testing-tool
- Microsoft Learn — *Microsoft Clarity Documentation & Copilot*: https://learn.microsoft.com/en-us/clarity/
- Nielsen, J. (2000) — *Why You Only Need to Test with 5 Users*: https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/
