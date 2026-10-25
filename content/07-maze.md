# Phần 07 — Hướng dẫn & Thực nghiệm Công cụ UXtweak & Microsoft Clarity (Usability Testing)

> Phụ trách: **Bửu Huỳnh Vĩnh Phúc (`23120328` — Vai B)** · Phối hợp kỹ thuật: **Bùi Minh Quân (`23120337` — Vai C)**
> Trạng thái: **Đã hoàn thiện nội dung & xuất bản đủ 3 Video Demo YouTube**

## Danh sách Clip YouTube Demo (Phúc thực hiện)
| Demo | Kịch bản trình diễn | Link YouTube | Thời lượng | Trạng thái |
| :---: | :--- | :--- | :---: | :---: |
| **1** | Cài đặt & Xác thực Snippet trên EShop (Vercel) | https://youtu.be/OuBjSEdTORQ | ~2:30 | **Đã xuất bản** |
| **2** | Kịch bản cơ bản: 1 Task + Checkpoint + SEQ & Session Replay | https://youtu.be/Nq31Rxb6lIk | ~3:00 | **Đã xuất bản** |
| **3** | Luồng phức tạp: Study ~5 người + SUS 10 câu & Clarity Heatmap | https://youtu.be/7HmEv2DnVJw | ~4:15 | **Đã xuất bản** |

---

## 1. Giới thiệu tổng quan & Lý do chuyển đổi từ Maze sang UXtweak

Nếu như **Playwright + axe-core** (Phần 06) trả lời câu hỏi *"Giao diện được xây dựng có đúng đặc tả kỹ thuật (FR-21…24) hay không?"*, thì ở Phần 07, Nhóm 09 giải quyết câu hỏi cốt lõi thứ hai của đề tài T1: **"Người dùng thật có thực sự hiểu và sử dụng được giao diện đó để hoàn thành mục tiêu mua hàng một cách hiệu quả, nhanh chóng và hài lòng hay không?"**

* **Bài học thực tế khi triển khai công cụ:** Trong Proposal ban đầu, nhóm chọn **Maze** làm công cụ chính và đặt **UXtweak** làm phương án dự phòng. Khi trực tiếp triển khai study trên website thật, nhóm phát hiện Maze đã loại khối **Live Website Testing** khỏi gói Free và gói dùng thử (yêu cầu nâng cấp gói trả phí ~\$99/tháng).
* **Giải pháp của nhóm:** Nhóm kích hoạt phương án dự phòng **UXtweak** (công cụ *Website Testing* để giao nhiệm vụ, quay lại màn hình *Session Replay*, tính độ lạc đường *Lostness* và thu bảng hỏi *SEQ/SUS*), đồng thời nhúng song song **Microsoft Clarity** (miễn phí hoàn toàn) để tự động thu thập **Click Heatmap** và phát hiện **Rage Click / Dead Click** trong cùng một phiên làm bài của người tham gia.

---

## 2. Hệ thống thuật ngữ & Nguyên lý hoạt động

### 2.1. Các thuật ngữ cốt lõi trong UXtweak & Clarity

| Thuật ngữ | Cách gọi trong nhóm | Giải thích chi tiết trong ngữ cảnh kiểm thử EShop |
| :--- | :--- | :--- |
| **Study (Website Testing)** | Bài nghiên cứu / Đợt kiểm thử | Một phiên khảo sát không điều phối (Unmoderated) gửi tới người tham gia qua đường dẫn chia sẻ (`study.uxtweak.com/webusability/...`). |
| **Task (`T1`) & Task Text** | Nhiệm vụ & Kịch bản | Bài toán mục tiêu giao cho người tham gia thực hiện trên trang web EShop, viết theo ngôn ngữ đời thường, **tuyệt đối không lộ tên nút bấm hay đường dẫn**. |
| **UXtweak Snippet** | Đoạn mã theo dõi UXtweak | Đoạn mã JavaScript gắn vào thẻ `<head>` của `index.html` trên SUT EShop để kết nối website với máy chủ UXtweak. |
| **Start URL & Success URL** | Trang bắt đầu & Trang đích | URL khởi đầu (`/`) và URL xác nhận hoàn thành nhiệm vụ (`/checkout`). |
| **Optimal Path & Lostness** | Đường đi tối ưu & Độ lạc đường | Số trang tối thiểu cần đi qua (`4` trang: `/` $\rightarrow$ `/product/5` $\rightarrow$ `/cart` $\rightarrow$ `/checkout`). Từ đó UXtweak tự tính chỉ số **Lostness** $\in [0, 1]$ theo công thức của Smith (1996): càng gần $0$ là đi thẳng, càng gần $1$ là bị lạc đường nặng. |
| **Session Replay** | Video tái hiện phiên | Video quay lại toàn bộ màn hình, thao tác di chuột và click của từng người tham gia trong lúc làm nhiệm vụ. |
| **Rage Click & Dead Click** | Click điên cuồng & Click vô hiệu | Chỉ số trên **Microsoft Clarity** tự động phát hiện khi người dùng bấm liên tiếp nhiều lần vào một phần tử không phản hồi (như lỗi `G10` ở nút *"Thêm vào giỏ"*). |
| **Click Heatmap** | Bản đồ nhiệt click chuột | Lớp phủ màu sắc từ xanh $\rightarrow$ vàng $\rightarrow$ đỏ trực quan hóa mật độ vị trí click chuột của người tham gia trên từng trang EShop. |

---

### 2.2. Ánh xạ bộ ba kỹ thuật bắt buộc của môn học

Theo yêu cầu đề cương Seminar T1, mỗi công cụ cần làm rõ sự hiện diện của bộ ba **Record & Playback**, **Data-driven** và **Checkpoints**:

| Khái niệm | Cách thể hiện trong Playwright (GUI) | Cách thể hiện tương ứng trong UXtweak + Clarity (Usability) | Vị trí minh họa |
| :--- | :--- | :--- | :---: |
| **Record & Playback** *(Ghi & phát lại)* | Công cụ `codegen` ghi thao tác của kiểm thử viên thành mã script để máy chạy lại. | **UXtweak & Clarity tự động ghi (Record)** toàn bộ màn hình, hành trình URL, chuỗi click chuột của người tham gia thật và **phát lại (Playback)** dưới dạng *Session Replay Video*, *Page Transitions* & *Click Heatmap*. | **Demo 2 & Demo 3** |
| **Data-driven** *(Hướng dữ liệu)* | Một hàm test chạy lặp qua mảng dữ liệu cấu hình (`pages.json` $\times$ `viewports`). | **Cùng một kịch bản Study/Task cố định** được phát cho **nhiều người tham gia độc lập** ($\sim 5$ participants với bộ tài khoản `p1`…`p5` riêng biệt) để thống kê định lượng. | **Demo 3** |
| **Checkpoints** *(Điểm kiểm tra)* | Câu lệnh `expect(...)` kiểm tra thuộc tính DOM/CSS/Screenshot. | **Success URL (`/checkout`) & Optimal Path (`4` trang):** UXtweak tự động đối chiếu trang đích và số bước chuyển trang để chấm *Success / Skip* và tính chỉ số *Lostness*. | **Demo 2 & Demo 3** |

---

## 3. Chuẩn bị kỹ thuật trên SUT EShop trước khi chạy Study

Để ~5 người tham gia từ xa làm bài độc lập mà **không sửa bất kỳ lỗi GUI/Usability cố ý nào** (`G01`–`G11`), nhóm đã thực hiện 3 bước chuẩn bị:

1. **Chuyển đổi 13 vị trí gọi cứng `http://localhost:3000` sang `VITE_API_URL` (`ed85e81`):** Giúp bản deploy trên Vercel (`https://seminar-gui-usability-testing.vercel.app`) kết nối thông suốt với Backend trên Render (`https://eshop-api-nhom09.onrender.com`).
2. **Bổ sung 6 tài khoản người tham gia độc lập `p1@eshop.com` … `p6@eshop.com` (`267311a`):** Tránh đụng giỏ hàng và tránh vượt quá giới hạn 2 lần sử dụng/tài khoản của mã giảm giá `VIP100`.
3. **Chọn mã `VIP100` (thay vì `SAVE10`) và nhúng bộ đôi UXtweak Snippet + Microsoft Clarity vào `index.html`:**
   - Mã `SAVE10` bị lỗi tính phần trăm ở backend sẽ gây nhiễu kết quả usability, nên nhóm dùng `VIP100` (giảm cố định `100.000 ₫`).
   - Nhúng cả **UXtweak Snippet** và **Microsoft Clarity** vào thẻ `<head>` của [`sut/eshop/frontend-web/index.html`](../sut/eshop/frontend-web/index.html) để 1 lượt làm bài của người tham gia đồng thời sinh ra cả báo cáo Task/SEQ/SUS trên UXtweak lẫn Heatmap/Rage Click trên Clarity.

---

## 4. Kịch bản chi tiết 3 Demo (Dùng để quay Clip & Trình bày)

### 4.1. Demo 1 — Cài đặt & Xác thực Snippet trên EShop (~2–3 phút)
- **Mục tiêu:** Minh họa quy trình tạo Study trên UXtweak, tạo Project trên Microsoft Clarity, lấy mã nhúng gắn vào mã nguồn Frontend EShop và xác thực hoạt động trên URL Vercel.
- **Các bước thực hiện trong clip:**
  1. Trên **UXtweak Dashboard** (`app.uxtweak.com`), bấm **Create a new study $\rightarrow$ Unmoderated study $\rightarrow$ Website Testing**. Đặt tên `EShop Checkout Usability Study`, điền domain `seminar-gui-usability-testing.vercel.app`, bật `Record respondent's screen`.
  2. Bấm **Launch / Snippet** để lấy đoạn mã JavaScript **UXtweak Snippet** (`0726db60-cf63-4364-af4e-82923f22dbfe`).
  3. Trên **Microsoft Clarity** (`clarity.microsoft.com`), tạo project `EShop Seminar T1` và lấy đoạn mã `<script>` (`z27wxp2oeb`).
  4. Mở VS Code tại file [`sut/eshop/frontend-web/index.html`](../sut/eshop/frontend-web/index.html), cho thấy cả 2 đoạn script đã được đặt trong thẻ `<head>` và push lên GitHub để Vercel tự động deploy.
  5. Mở `https://seminar-gui-usability-testing.vercel.app`, bấm `Ctrl + U` (View Source) xác nhận 2 đoạn mã đã có mặt trên bản production, và bấm **Verify** trên UXtweak báo xanh lá.
- **Link clip demo:** https://youtu.be/OuBjSEdTORQ (~2:30, xem chi tiết tại [`videos/README.md`](../videos/README.md)).

---

### 4.2. Demo 2 — Cơ bản: Tạo 1 Task + Checkpoint URL + Câu hỏi SEQ & Chạy thử (~3 phút)
- **Mục tiêu:** Minh họa cách thiết lập một nhiệm vụ kiểm thử (**Task**), gắn điều kiện hoàn thành (**Success URL Checkpoint**), tự đóng vai người tham gia chạy thử 1 lượt (**Record**) và xem lại video thao tác (**Playback**).
- **Thành phần kỹ thuật minh họa:** **Record & Playback** (Session Replay) + **Checkpoint** (Success URL `/checkout` & Optimal Path `4` trang).
- **Các bước thực hiện trong clip:**
  1. Mở tab **Tasks** trên UXtweak, tạo nhiệm vụ `T1` với đề bài mua phụ kiện máy tính trong ngân sách `5.000.000 ₫` và áp mã `VIP100`.
  2. Điền **Start URL** (`https://seminar-gui-usability-testing.vercel.app/`), **Success URL** (`Simple URL match`: `.../checkout`), và **Optimal number of pages** = `4`.
  3. Ở cột bên phải, tích chọn `Allow respondents to skip tasks` và `Ask questions after each task` để gắn câu hỏi **SEQ** thang 1–7 (*"Nhìn chung, nhiệm vụ vừa rồi dễ hay khó thực hiện?"*).
  4. Mở link Study (`study.uxtweak.com/...`), đăng nhập tài khoản `test@eshop.com`, thực hiện mua bàn phím Keychron Q1 (tại đây thấy rõ lỗi `G10`: bấm *"Thêm vào giỏ"* lần 1 không ăn, phải bấm lần 2), vào giỏ hàng, thanh toán với mã `VIP100` và chấm điểm SEQ.
  5. Mở tab **Results** trên UXtweak và tab **Recordings** trên Clarity: phát lại đoạn **Video Session Replay** ghi rõ cảnh con trỏ chuột bấm lặp vào nút *"Thêm vào giỏ"*.
- **Link clip demo:** https://youtu.be/Nq31Rxb6lIk (~3:00, xem chi tiết tại [`videos/README.md`](../videos/README.md)).

---

### 4.3. Demo 3 — Luồng phức tạp: Study Checkout ~5 người + Bảng SUS 10 câu + Phân tích Heatmap (~5 phút)
- **Mục tiêu:** Triển khai Study hoàn chỉnh gồm cả bảng khảo sát **SUS 10 câu**, gửi link cho **~5 người tham gia độc lập** (`p1`…`p5`), tổng hợp điểm **SUS/SEQ/Lostness** trên UXtweak và phân tích **Click Heatmap / Rage Click** trên Microsoft Clarity.
- **Thành phần kỹ thuật minh họa:** **Data-driven** (cùng kịch bản chạy qua 5 người tham gia với 5 tài khoản độc lập) + **Record & Playback** (Heatmap & Session Replay) + **Checkpoint** (Success Rate & Lostness).
- **Các bước thực hiện trong clip:**
  1. Mở tab **Questionnaire** trên UXtweak, tích chọn `Include Post-study questions`, tạo câu hỏi `Q1` kiểu **`Radio button grid`** gồm **10 hàng** (10 câu SUS chuẩn của John Brooke) $\times$ **5 cột** (`1 - Rất không đồng ý` $\rightarrow$ `5 - Rất đồng ý`).
  2. Trước khi gửi link: mở `https://eshop-api-nhom09.onrender.com/api/products` để đánh thức server Render và reset dữ liệu sạch.
  3. Gửi link Study cho 5 người tham gia ngoài nhóm (mỗi người dùng 1 tài khoản `p1@eshop.com` … `p5@eshop.com`).
  4. Mở tab **Results** trên UXtweak:
     - Xem tỷ lệ hoàn thành nhiệm vụ (**Task Success Rate**), thời gian làm bài trung bình và chỉ số lạc đường (**Lostness**).
     - Xuất kết quả câu hỏi **SEQ** và bảng **10 câu SUS**, tính điểm SUS quy đổi trên thang 100 và so với mốc chuẩn **68**.
  5. Mở tab **Dashboard & Heatmaps** trên Microsoft Clarity:
     - Chỉ vào cảnh báo **Rage Clicks** và tấm ảnh **Click Heatmap** đỏ rực tại nút *"Thêm vào giỏ"* trên trang chi tiết sản phẩm (khớp lỗi `G10` + `G08`).
     - Xem điểm click bất thường vào ô *"Tổng tiền thanh toán"* sửa được ở trang `/checkout` (khớp lỗi `G06`).
- **Link clip demo:** https://youtu.be/7HmEv2DnVJw (~4:15, xem chi tiết tại [`videos/README.md`](../videos/README.md)).

---

## 5. Điểm yếu & Giới hạn thực tế của bộ công cụ (Trình bày trên Slide 36)

| # | Điểm yếu / Giới hạn | Biểu hiện cụ thể khi nhóm triển khai | Cách nhóm khắc phục |
| :---: | :--- | :--- | :--- |
| **1** | **Maze khóa Live Website Testing ở bản Free** | Tài khoản Free/Trial của Maze loại bỏ hoàn toàn khối *Website test* (đòi gói trả phí ~\$99/tháng). | Chuyển sang phương án dự phòng **UXtweak** đã đăng ký trong Proposal. |
| **2** | **Giới hạn gói Free của UXtweak** | Chỉ cho phép **1 active study**, tối đa **1 task/study**, giới hạn số câu hỏi rời và chỉ giữ kết quả **14 ngày**. | Gom 10 câu SUS vào 1 bảng `Radio button grid` duy nhất; kết hợp **Microsoft Clarity** miễn phí để lưu trữ lâu dài Heatmap & Recording. |
| **3** | **Đặc thù Unmoderated: Biết "Ở đâu" nhưng thiếu "Vì sao"** | Nhìn Replay và Heatmap thấy người dùng dừng lâu ở `/checkout` hoặc click lặp, nhưng không hỏi trực tiếp được suy nghĩ trong đầu họ lúc đó. | Kết hợp đánh giá chuyên gia (**Heuristic Evaluation**) ở Phần 08. |
| **4** | **Độ trễ tổng hợp Heatmap & Rủi ro AdBlocker** | Clarity giữ trạng thái `LIVE` ~20–30 phút sau khi đóng tab mới chốt phiên để vẽ Heatmap; trình chặn quảng cáo (*uBlock*, *Brave*) có thể chặn script tracker. | Nhắc người tham gia tắt AdBlock trên domain EShop trong 5 phút làm bài. |

---

## 6. Tài liệu tham khảo

1. UXtweak Documentation — *Website Testing & Snippet Installation*: https://www.uxtweak.com/help/website-testing
2. Microsoft Clarity Documentation — *Heatmaps & Rage Clicks*: https://learn.microsoft.com/en-us/clarity/
3. Smith, P. A. (1996) — *Towards a practical measure of hypertext usability (Lostness metric)*. Interacting with Computers, 8(4), 365–381.
4. Brooke, J. (1996) — *SUS: A 'Quick and Dirty' Usability Scale*. In *Usability Evaluation in Industry* (pp. 189–194).
5. Nielsen, J. (1994) — *10 Usability Heuristics for User Interface Design*: https://www.nngroup.com/articles/ten-usability-heuristics/
