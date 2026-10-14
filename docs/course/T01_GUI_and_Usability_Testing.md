# T01: GUI & Usability Testing — In-Class Seminar Guide

**Môn học**: CS423 / CSC15003 — Software Testing (2026 AI-First Edition)  
**Đơn vị**: FIT @ HCMUS — Bộ môn Công nghệ Phần mềm  
**Giảng viên**: Dr. Lâm Quang Vũ  

---

## Slide 1: Title Slide
* **Tên bài giảng**: T01 — GUI & Usability Testing
* **Chủ đề**: Human vs AI Usability Testing Seminar (Heuristic Showdown)
* **Bối cảnh thử nghiệm**: Luồng thanh toán EShop (EShop Checkout Journey)
* **Chương trình**: 2026 AI-First Edition, CS423/CSC15003

---

## Slide 2: Why This Matters & Learning Outcomes
* **Tầm quan trọng (Why This Matters)**:
  * Phần mềm hoạt động đúng về mặt kỹ thuật vẫn có thể thất bại nếu trải nghiệm người dùng kém.
  * Đánh giá khả dụng giúp phát hiện rào cản thao tác trước khi phát hành sản phẩm.
* **Đối tượng thử nghiệm (SUT - System Under Test)**:
  * Luồng thanh toán EShop (EShop Checkout Journey): Giỏ hàng (Cart) → Mã giảm giá (Coupon) → Địa chỉ (Address) → Thanh toán (Payment).
* **Mục tiêu học tập (Learning Outcomes)**:
  1. Nắm vững kỹ thuật **Remote Usability Testing** với 5 người dùng (dựa trên kịch bản và phương pháp Think-Aloud).
  2. Áp dụng **10 Nielsen's Usability Heuristics** để đánh giá thủ công giao diện.
  3. Sử dụng công cụ AI (ChatGPT vision, Claude) để lập báo cáo heuristic tự động và thực hiện kiểm tra chéo (Audit) với đánh giá thủ công.

---

## Slide 3: Traditional vs AI-Augmented Usability Tools
* **Công cụ truyền thống (Traditional Tools)**:
  * **Maze**: Kiểm thử khả dụng từ xa không điều phối, đo tỷ lệ thành công, đường dẫn nhấp chuột và heatmap.
  * **Hotjar**: Ghi lại phiên làm việc (session recordings), bản đồ nhiệt (heatmaps), khảo sát trực tiếp.
  * **BrowserStack Live**: Kiểm thử khám phá trên nhiều trình duyệt và thiết bị thực tế.
* **Công cụ tích hợp AI (AI-Augmented Tools)**:
  * **ChatGPT / Claude Vision**: Phân tích ảnh chụp màn hình giao diện để tự động dự thảo báo cáo vi phạm heuristic.
  * **Hotjar AI Summaries**: Tự động phân nhóm và tổng hợp các chủ đề phản hồi từ người dùng.
  * **UXTweak AI**: Phân tích bản đồ nhiệt tự động và hỗ trợ viết báo cáo đánh giá.

---

## Slide 4: In-Class Activity — Heuristic Showdown (~25 phút)
* **Hình thức**: Làm việc theo nhóm 3–4 sinh viên.
* **Chuẩn bị**:
  * Môi trường EShop chạy cục bộ hoặc máy chủ thử nghiệm.
  * Trình soạn thảo văn bản / Markdown editor.
  * Ảnh chụp màn hình luồng thanh toán EShop.
  * Công cụ AI tùy chọn (ChatGPT, Claude, v.v.).
* **Lịch trình thực hiện (Timeline)**:
  * **0:00–0:03**: Nhận ảnh chụp màn hình luồng thanh toán EShop.
  * **0:03–0:13 (Human Evaluation)**: Đánh giá thủ công, ghi lại ≥ 5 vi phạm heuristic kèm mức độ nghiêm trọng (Severity rating).
  * **0:13–0:18 (AI Generation & Audit)**: Tải ảnh lên AI, tạo báo cáo tự động, đối chiếu điểm trùng lặp và điểm AI bỏ sót.
  * **0:18–0:23 (Discussion)**: Thảo luận so sánh lỗi chỉ con người phát hiện (ngữ cảnh nghiệp vụ) vs lỗi chỉ AI phát hiện (bề nổi/độ tương phản).
  * **0:23–0:25 (Submission)**: Chia sẻ kết quả và nộp Minute Paper để điểm danh.

---

## Slide 5: Key Takeaways & Human vs AI Trade-offs
* **Thế mạnh của AI**:
  * Tốc độ xử lý cực nhanh, tự động hóa dựng khung báo cáo.
  * Phát hiện tốt các lỗi bề nổi (surface-level) như độ tương phản màu sắc, kích thước phông chữ, nhãn hiển thị chưa rõ ràng.
* **Hạn chế của AI**:
  * Bỏ sót các lỗi phụ thuộc vào ngữ cảnh nghiệp vụ (context-dependent logic) và tâm lý hành vi người dùng.
  * Đánh giá mức độ nghiêm trọng (Severity rating) thường không chính xác (miscalibrated).
* **Kết luận cốt lõi**: AI đóng vai trò làm trợ lý hỗ trợ tăng tốc, con người giữ vai trò quyết định và kiểm định cuối cùng (Human-in-the-loop).

---

## Slide 6: Further Reading & References
* **Nielsen Norman Group (NN/g)**: *10 Usability Heuristics for User Interface Design*.
* **Steve Krug**: *Rocket Surgery Made Easy* (Chương 1–3).
* **BS EN ISO 9241-11:2018**: *Ergonomics of human-system interaction — Usability: Definitions and concepts*.
* **NN/g Article (2024)**: *Can AI Replace Usability Testers?*
