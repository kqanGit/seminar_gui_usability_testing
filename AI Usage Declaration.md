# BẢN KHAI BÁO SỬ DỤNG TRÍ TUỆ NHÂN TẠO (AI USAGE DECLARATION)
**Học phần:** Software Testing — FIT@HCMUS (Năm học 2026–2027)  
**Đề tài Seminar:** T1 — GUI & Usability Testing (Nhóm 09)  
**Thành viên thực hiện:** Bửu Huỳnh Vĩnh Phúc  
**MSSV:** `23120328`  
**Vai trò trong nhóm:** Vai B — Usability Testing, Công cụ UXtweak (thay thế Maze), Host/Deploy SUT EShop, Bài tập 3  
**Giai đoạn / Tuần khai báo:** Tuần chuẩn bị kỹ thuật & triển khai kịch bản kiểm thử (14/10/2026 – 23/10/2026)  

---

## 1. Danh sách các công cụ AI đã sử dụng trong tuần

| Tên công cụ AI | Nhà phát triển / Nền tảng | Phiên bản / Model | Mục đích sử dụng cụ thể |
| :--- | :--- | :--- | :--- |
| **Google Antigravity Agent** | Google DeepMind | Gemini 4 Argon & Gemini 3.8 Flash | Hỗ trợ phân tích mã nguồn SUT EShop, thiết lập bộ luật kiểm thử (Project Harness), tích hợp UXtweak Snippet (sau khi kiểm chứng Maze khóa tính năng Live Website Testing ở bản Free), tạo kịch bản nhiệm vụ Usability Study và sinh khung bài tập SUS. |
| **Claude** | Anthropic | Claude 3.5 Sonnet & Claude Opus | Hỗ trợ tra cứu, đối chiếu chuẩn ISO 9241-11, hệ thống 10 nguyên lý Heuristic của Jakob Nielsen và rà soát tính khả thi của kịch bản nhiệm vụ (Task Scenarios). |

---

## 2. Quá trình sử dụng AI & Quy trình Kiểm soát của Con người (Human-in-the-Loop)

Mọi nội dung do AI hỗ trợ đều tuân thủ nghiêm ngặt **Quy định AI Category 5 (AI-Integrated Work)** của FIT@HCMUS: *Không sao chép nguyên văn không qua kiểm chứng; con người chịu hoàn toàn trách nhiệm về tính chính xác của mã nguồn, số liệu và lập luận*.

```
   [Yêu cầu / Prompt từ Người thực hiện]
                 │
                 ▼
     [AI sinh phản hồi / đề xuất]
                 │
                 ▼
[Con người Fact-check & Review mã nguồn]
  - Đối chiếu mã nguồn SUT EShop
  - Đối chiếu tài liệu chuẩn ISO 9241-11, Nielsen Norman Group, UXtweak & Maze Docs
  - Trực tiếp chạy thử nghiệm & tính toán kiểm chứng
                 │
                 ▼
    [Chấp nhận / Hiệu chỉnh & Áp dụng]
```

### Các can thiệp và hiệu chỉnh trọng tâm của con người:
1. **Bảo toàn tính toàn vẹn của SUT EShop (Guardrails):** AI ban đầu có xu hướng tự động "sửa lỗi" giúp người dùng (như sửa nhãn "Tổng tạm tính", đổi màu nút hay fix sự kiện click đúp). Người thực hiện đã can thiệp thiết lập hàng rào bảo vệ (Guardrail) nghiêm ngặt để đảm bảo các lỗi GUI/Usability cố ý (`G01–G10`) phục vụ kiểm thử không bị thay đổi.
2. **Kiểm chứng và chuẩn hóa công thức toán học SUS:** Khi AI sinh bảng dữ liệu khảo sát và tính điểm System Usability Scale (SUS), người thực hiện đã trực tiếp tính lại từng bước bằng tay theo công thức của John Brooke (câu lẻ: $X = R_i - 1$; câu chẵn: $Y = 5 - R_i$; tổng điểm nhân 2.5), sửa các sai lệch làm tròn để đảm bảo bài tập đạt chuẩn sư phạm.
3. **Kiểm chứng giới hạn thực tế của Maze & chuyển đổi sang UXtweak:** AI ban đầu gợi ý Maze Free cho phép chạy Live Website Testing. Khi trực tiếp tạo study trên Maze và đối chiếu tài liệu chính thức (*Maze free trials*), nhóm phát hiện khối *Website test* bị loại khỏi gói Free/Trial (yêu cầu gói trả phí ~\$99/tháng). Nhóm đã chủ động kích hoạt phương án dự phòng trong Proposal là **UXtweak**, thay thế Maze Snippet bằng **UXtweak Snippet** trên bản deploy Vercel + Render và cấu hình bảng SUS 10 câu dạng `Radio button grid` để vượt qua giới hạn số lượng câu hỏi của gói Free.

---

## 3. Bảng tổng hợp các tác vụ có sự hỗ trợ của AI

| Ngày | Tác vụ thực hiện | Công cụ AI | File ảnh hưởng | Đánh giá & Hiệu chỉnh của con người |
| :--- | :--- | :--- | :--- | :--- |
| **14/10/2026** | Quét và chuyển đổi 13 chỗ gọi cứng `localhost:3000` sang `VITE_API_URL` | Antigravity (Gemini) | `sut/eshop/frontend-web/src/**/*.jsx`, `.env.example` | Kiểm tra từng file JSX, đảm bảo giữ nguyên fallback `http://localhost:3000` để chạy local không bị lỗi. |
| **15/10/2026** | Thêm tài khoản seed `p1..p6` và cập nhật nhật ký SUT | Antigravity (Gemini) | `sut/eshop/backend/database.js`, `sut/README.md` | Chạy lệnh `node database.js` kiểm tra CSDL SQLite tạo đủ 6 tài khoản người tham gia với mật khẩu chuẩn. |
| **16/10/2026** | Hoàn thiện bản thiết kế Usability Study & phân tích kỹ thuật | Claude & Antigravity | `maze/study-design.md` | Xác định rõ mã giảm giá `VIP100` (giảm cố định), loại bỏ mã `SAVE10` vì backend bị lỗi tính phần trăm. |
| **16/10/2026** | Soạn thảo nội dung lý thuyết Usability Testing | Claude & Antigravity | `content/04-ly-thuyet-usability.md` | Bổ sung bảng ánh xạ 10 Heuristic Nielsen trực tiếp với các lỗi `G01–G10` trên EShop; chuẩn hóa công thức tính SUS của John Brooke. |
| **17/10/2026** | Soạn đề bài Bài tập 3 (Usability + SUS) & đáp án mẫu | Antigravity (Gemini) | `exercises/bai-3-maze-sus.md`, `exercises/answers/bai-3-dap-an.md` | Kiểm tra tính toán từng bước của bảng SUS 10 câu, phân định rõ công thức câu lẻ $(R_i - 1)$ và câu chẵn $(5 - R_i)$. |
| **19–23/10/2026** | Kiểm chứng Maze, chuyển sang tích hợp UXtweak Snippet & đồng bộ môi trường deploy | Antigravity (Gemini) | `sut/eshop/frontend-web/index.html`, `.env.example`, `slides/sections/07-maze.md` | Phát hiện Maze khóa Website Test ở bản Free; chuyển sang nhúng UXtweak Snippet trên Vercel, thiết lập Task + SEQ + SUS trên UXtweak. |

---

## 4. Nhật ký tương tác & Chat Log trích dẫn (Prompt & Response Log)

Dưới đây là các đoạn tương tác tiêu biểu thể hiện quá trình trao đổi học thuật, thiết kế kịch bản kiểm thử và phân tích lỗi cùng AI:

### Log 1: Phân tích kiến trúc SUT EShop và thiết lập nguyên tắc bảo vệ lỗi kiểm thử
* **Thời gian:** 14/10/2026
* **Prompt (User):**
  > *"Phân tích cấu trúc thư mục SUT EShop (frontend-web, backend). Tìm tất cả các vị trí API đang bị gọi cứng `http://localhost:3000` để chuyển sang biến môi trường khi deploy. Lưu ý tuyệt đối không được sửa các lỗi GUI/Usability có sẵn trong `ground-truth/bugs.md`."*
* **Phản hồi của AI (Tóm tắt):**
  > AI quét toàn bộ source code `frontend-web/src/`, định vị chính xác 13 vị trí hardcode trong các component React (`Navbar.jsx`, `Cart.jsx`, `ProductDetail.jsx`, `Checkout.jsx`, `OrderSuccess.jsx`...). AI đề xuất thay thế bằng `import.meta.env.VITE_API_URL || 'http://localhost:3000'` và thiết lập quy tắc bảo vệ: không đụng chạm đến màu sắc nút bấm, nhãn hiển thị hoặc sự kiện click đã được nhóm cài cắm có chủ đích làm bug test.
* **Đánh giá / Can thiệp của con người:**
  > Đối chiếu từng file thay đổi, đảm bảo ứng dụng vừa chạy được trên môi trường deploy vừa giữ nguyên 100% các lỗi kiểm thử phục vụ bài thực hành.

---

### Log 2: Thiết kế kịch bản Usability Study (Study Design & Task Scenarios)
* **Thời gian:** 16/10/2026
* **Prompt (User):**
  > *"Tư vấn cách xây dựng một Usability Study hoàn chỉnh cho EShop, gồm kịch bản nhiệm vụ (Task/Mission), câu hỏi đánh giá độ khó đơn nhiệm (SEQ - Single Ease Question) và câu hỏi khảo sát người dùng (SUS). Cần lưu ý các bẫy nghiệp vụ nào của EShop?"*
* **Phản hồi của AI (Tóm tắt):**
  > AI đề xuất kịch bản nhiệm vụ: "Tìm sản phẩm phụ kiện máy tính trong ngân sách 5.000.000 ₫, thêm vào giỏ và tiến hành thanh toán với mã giảm giá VIP100". AI đưa ra cảnh báo quan trọng:
  > - Không dùng mã `SAVE10` vì backend bị lỗi chia phần trăm khiến giỏ hàng bị trừ tiền sai. Nên dùng mã `VIP100` (giảm cố định 100.000đ).
  > - Lưu ý bẫy nhận thức giá giữa AirPods Pro 2 (6.000.000đ) và Keychron Q1 (4.000.000đ) để kiểm tra khả năng tìm đúng sản phẩm của người tham gia.
  > - Tích hợp câu hỏi SEQ 7 mức điểm (1: Rất khó – 7: Rất dễ) ngay sau khi hoàn thành nhiệm vụ theo khuyến nghị của Sauro & Dumas.
* **Đánh giá / Can thiệp của con người:**
  > Tiếp nhận đề xuất, tinh chỉnh từ ngữ trong kịch bản để tự nhiên, gần gũi với người dùng Việt Nam và lưu vào file `maze/study-design.md`.

---

### Log 3: Tổng hợp lý thuyết Usability Testing & Ánh xạ 10 Heuristic của Jakob Nielsen
* **Thời gian:** 16/10/2026
* **Prompt (User):**
  > *"Hệ thống hóa lý thuyết Usability Testing theo tiêu chuẩn ISO 9241-11 (Hiệu quả, Hiệu năng, Mức độ hài lòng). Lập bảng đối chiếu 10 nguyên lý Heuristic của Jakob Nielsen với các lỗi thực tế trên hệ thống SUT EShop, giải thích thang đánh giá mức độ nghiêm trọng Severity 0–4."*
* **Phản hồi của AI (Tóm tắt):**
  > AI hệ thống hóa 3 trụ cột của ISO 9241-11; phân tích chi tiết từng nguyên lý từ H1 đến H10 và ánh xạ tương ứng vào các lỗi EShop:
  > - **H1 (Visibility of system status):** Lỗi G10 (click thêm giỏ lần 1 không phản hồi) và G08 (giỏ hàng không hiện badge số lượng).
  > - **H4 (Consistency and standards):** Lỗi G01 (dùng sai nhãn "Tổng tạm tính" thay vì "Tổng cộng").
  > - **H5 (Error prevention):** Lỗi G02 (bấm Xóa sản phẩm bị xóa ngay lập tức không có hộp thoại xác nhận) và G06 (ô tổng tiền cho phép sửa tay).
  > Trình bày thang đo Severity 0–4 chuẩn của Nielsen Norman Group.
* **Đánh giá / Can thiệp của con người:**
  > Kiểm tra tính học thuật của các khái niệm, bổ sung thêm ví dụ thực tế và tích hợp vào tài liệu `content/04-ly-thuyet-usability.md`.

---

### Log 4: Thiết kế đề bài và đáp án chi tiết cho Bài tập 3 (Usability & Đo lường SUS)
* **Thời gian:** 17/10/2026
* **Prompt (User):**
  > *"Thiết kế đề bài và đáp án chi tiết cho Bài tập 3 phục vụ seminar. Yêu cầu: Người học phải phân tích kết quả một Usability Study và tính toán điểm System Usability Scale (SUS) từ bảng dữ liệu khảo sát 10 câu hỏi của 5 người tham gia."*
* **Phản hồi của AI (Tóm tắt):**
  > AI soạn thảo cấu trúc bài tập 2 phần:
  > 1. Phân tích chỉ số định lượng: Tỷ lệ hoàn thành nhiệm vụ (Completion Rate), độ lạc đường (Lostness) / tỷ lệ click sai, Thời gian trung bình (Avg Duration), phân tích Heatmap / Session Replay và hiện tượng "Rage click" do lỗi G10.
  > 2. Đo lường thang điểm SUS: Trình bày bảng dữ liệu 10 câu hỏi của 5 người tham gia ($P_1 \dots P_5$). Hướng dẫn chi tiết công thức chuyển đổi điểm của John Brooke:
  >    - Điểm đóng góp câu lẻ: $X_i = R_i - 1$
  >    - Điểm đóng góp câu chẵn: $Y_i = 5 - R_i$
  >    - Điểm tổng SUS: $\text{SUS} = 2.5 \times (\sum X + \sum Y)$
  >    - Đối chiếu thang xếp loại chữ (Grade Scale) và phân vị (Percentile) theo Sauro.
* **Đánh giá / Can thiệp của con người:**
  > Trực tiếp thực hiện tính toán độc lập từng bước trên bảng tính để kiểm tra tính chính xác của đáp án mẫu trong `exercises/answers/bai-3-dap-an.md`, đảm bảo bài tập có tính sư phạm cao.

---

### Log 5: Chuyển đổi từ Maze sang UXtweak cho Live Website Testing trên Vercel
* **Thời gian:** 23/10/2026
* **Prompt (User):**
  > *"Phần usability tôi không sử dụng Maze nữa vì phải trả phí để dùng được tính năng web testing, bây giờ tôi dự định sẽ đổi sang UXtweak thì có ổn không và đủ thực hiện tất cả các chức năng tôi mong muốn trong demo?"*
* **Phản hồi của AI (Tóm tắt):**
  > AI tra cứu giới hạn gói Free (Starter Plan) của UXtweak và hướng dẫn:
  > 1. UXtweak hỗ trợ công cụ **Website Testing** và **Session Recording** dùng chung 1 đoạn mã **UXtweak Snippet** dán trong thẻ `<head>` của `index.html`.
  > 2. Thiết lập Task với `Start URL`, `Success URL (/checkout)`, `Optimal path (4 pages)` để đo tự động chỉ số **Lostness**, kèm câu hỏi **SEQ (7-point Likert scale)** sau nhiệm vụ và bảng **SUS 10 câu** dạng `Radio button grid` ở phần Post-study questionnaire.
  > 3. Có thể chạy nối tiếp *Website Testing* (đo Task/SEQ/SUS/Session Replay) và *Session Recording* (vẽ Click Heatmap) trên cùng đoạn snippet đã gắn trên Vercel.
* **Đánh giá / Can thiệp của con người:**
  > Trực tiếp tạo study trên UXtweak, lấy mã UXtweak Snippet (`56e349e0-e437-4d32-8fad-c6c12bc486b3`) tích hợp vào `sut/eshop/frontend-web/index.html` thay cho Maze, và ghi nhận rõ giới hạn của cả Maze lẫn UXtweak vào phần điểm yếu công cụ.

---

## 5. Cam kết liêm chính học thuật (Academic Integrity Statement)

Tôi xin cam đoan:
1. Mọi nội dung khai báo trên đây phản ánh trung thực 100% quá trình sử dụng các công cụ AI trong quá trình hoàn thành seminar.
2. Các công cụ AI chỉ đóng vai trò trợ lý hỗ trợ kỹ thuật (tra cứu cú pháp, rà soát văn bản, gợi ý cấu trúc kịch bản). Toàn bộ mã nguồn, cấu hình hệ thống, việc chạy thử nghiệm thực tế trên SUT EShop và việc phân tích đánh giá lỗi khả dụng đều do tôi trực tiếp kiểm soát, chạy thử và chịu trách nhiệm.
3. Không có sự giả mạo dữ liệu người tham gia hay bịa đặt kết quả kiểm thử.

*TP. Hồ Chí Minh, ngày 23 tháng 10 năm 2026*  
**Người khai báo**  
*(Đã ký)*  
**Bửu Huỳnh Vĩnh Phúc** (`23120328`)
