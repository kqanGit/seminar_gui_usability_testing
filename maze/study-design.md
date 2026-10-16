# Thiết kế study Maze — Checkout EShop

> Trạng thái: **đã hoàn thiện thiết kế (chờ duyệt)** · Người phụ trách: **Phúc (B)** · Người duyệt: Quang ☐ · Quân ☐ (tick khi đã duyệt)

## 1. Thông tin chung & Môi trường kiểm thử

| Hạng mục | Chi tiết cấu hình |
| --- | --- |
| **Hệ thống được kiểm thử (SUT)** | EShop Frontend Web (React + Vite) kết nối EShop Backend (Express + SQLite) |
| **URL Frontend public** | `https://eshop-seminar-t1.vercel.app` *(hoặc URL Cloudflare Tunnel trong khung giờ mở test)* |
| **URL Backend API (`VITE_API_URL`)** | `https://eshop-seminar-t1-api.onrender.com` *(đã thay 13 chỗ gọi cứng `http://localhost:3000`)* |
| **Khung giờ mở URL** | Chỉ mở server trong khung giờ người tham gia làm bài (tránh rủi ro bảo mật vì EShop cố ý có lỗ hổng SQLi/XSS) |
| **Số lượng người tham gia** | 5–6 người tham gia (participant) ngoài nhóm (sinh viên lớp khác / bạn bè chưa từng biết mã nguồn EShop) |
| **Tài khoản cấp riêng** | `p1@eshop.com` … `p6@eshop.com` · Mật khẩu chung: `Test1234!` (mỗi người tham gia dùng 1 tài khoản độc lập) |
| **Quy trình chuẩn bị DB** | Chạy `node database.js` để reset SQLite DB và đánh thức backend Render trước mỗi đợt test |

---

## 2. Cấu trúc các Block trong Maze Study

Study trên Maze được thiết kế gồm **4 Block** theo thứ tự:

1. **Welcome Screen (Màn hình chào mừng):**
   - Giới thiệu ngắn gọn mục đích khảo sát trải nghiệm mua sắm trên EShop (nhấn mạnh: *"Chúng tôi kiểm thử mức độ dễ dùng của trang web, không kiểm tra kỹ năng của bạn"*).
   - Cung cấp thông tin tài khoản đăng nhập được phân bổ riêng (`pX@eshop.com` / `Test1234!`).
2. **Block 1 — Mission 1 (Website Test): Mua phụ kiện máy tính trong ngân sách và áp mã giảm giá.**
3. **Block 2 — Câu hỏi SEQ (Opinion Scale 1–7):** Đánh giá độ dễ/khó ngay sau khi thực hiện Mission 1.
4. **Block 3 — Bảng hỏi SUS (10 câu Multiple Choice / Scale 1–5):** Đánh giá tổng thể tính khả dụng (Usability) của EShop sau buổi thử nghiệm.

---

## 3. Chi tiết Mission 1 — Mua hàng có mã giảm giá

### 3.1. Tiêu đề & Kịch bản nhiệm vụ (Task Scenario)
- **Tiêu đề hiển thị cho người tham gia:** Mua phụ kiện máy tính với mã ưu đãi
- **Kịch bản nhiệm vụ (viết theo ngôn ngữ mục tiêu của người dùng, tuyệt đối không lộ tên nút hay đường dẫn):**
  > *"Bạn đã đăng nhập vào EShop. Hiện bạn có ngân sách tối đa **5.000.000 ₫** và muốn mua **một món phụ kiện cho máy tính**. Hãy tìm sản phẩm phù hợp với ngân sách, thêm vào giỏ và hoàn tất đặt hàng có sử dụng mã giảm giá **VIP100**."*

### 3.2. Thiết kế dữ liệu & Bẫy logic tự nhiên
- **Phân tích sản phẩm trong danh mục Phụ kiện (`category_id = 3`):**
  - `Tai nghe AirPods Pro 2` — giá `6.000.000 ₫` *(vượt ngân sách 5.000.000 ₫)*.
  - `Bàn phím cơ Keychron Q1` — giá `4.000.000 ₫` *(vừa ngân sách 5.000.000 ₫ — sản phẩm mục tiêu)*.
  - Các sản phẩm khác (iPhone 15 Pro Max `30.000.000 ₫`, Galaxy S24 Ultra `28.000.000 ₫`, MacBook Pro M3 `45.000.000 ₫`) đều vượt xa ngân sách.
- **Lý do chọn mã `VIP100` (không dùng `SAVE10`):**
  - `VIP100`: giảm cố định `100.000 ₫` cho đơn từ `300.000 ₫`, giới hạn tối đa `2` lần/tài khoản (`max_uses_per_user = 2`). Khi áp cho Keychron Q1 (`4.000.000 ₫`), tổng thanh toán còn `3.900.000 ₫`.
  - **Không dùng `SAVE10`:** Công thức tính giảm giá theo phần trăm (`percent`) ở backend EShop cố ý bị lỗi logic nghiệp vụ, dễ làm người tham gia bối rối vì số tiền sai và gây nhiễu kết quả đo usability.

### 3.3. Đường đi kỳ vọng (Expected Path) & Checkpoint
- **URL bắt đầu (Start URL):** `/` (Trang chủ sau khi đã đăng nhập hoặc `/login` → `/`)
- **Luồng đường đi chuẩn (Expected Path):**
  1. **Path 1 (Đi qua trang Chi tiết sản phẩm — luồng chuẩn):**
     `/` (Home) → `/product/5` (Chi tiết Bàn phím cơ Keychron Q1) → Bấm thêm vào giỏ → `/cart` (Giỏ hàng) → `/checkout` (Xác nhận đơn hàng: nhập `VIP100`, bấm áp dụng, bấm xác nhận thanh toán).
  2. **Path 2 (Thêm trực tiếp từ Trang chủ — luồng thay thế hợp lệ):**
     `/` (Home: bấm thêm vào giỏ trực tiếp trên thẻ Keychron Q1) → `/cart` → `/checkout`.
- **Tiêu chí hoàn thành (Success Checkpoint):**
  - **Direct Success:** Người tham gia đi theo đúng Expected Path đến `/checkout` và hoàn tất xác nhận đơn hàng.
  - **Indirect Success:** Người tham gia đi vòng qua các sản phẩm khác (ví dụ bấm nhầm vào AirPods Pro 2 `/product/4` rồi quay lại `/` chọn Keychron Q1 `/product/5`) nhưng vẫn hoàn tất thanh toán ở `/checkout`.
  - **Bounce / Give Up:** Người tham gia rời bỏ nhiệm vụ trước khi đến bước hoàn tất trên `/checkout`.

### 3.4. Các vấn đề Usability (Ground Truth) kỳ vọng quan sát được qua Maze
| Mã lỗi | Vị trí | Hiện tượng giao diện trên EShop | Dấu hiệu kỳ vọng trên Maze (Metrics / Heatmap) |
| --- | --- | --- | --- |
| **G10** | `/product/5` | Nút `"Thêm vào giỏ hàng"` bấm lần đầu không có tác dụng (`clickCount === 0`), phải bấm lần thứ 2 mới thêm vào giỏ (vi phạm **H1**) | **Misclick / Rage Click** tăng cao trên vùng nút `"Thêm vào giỏ hàng"`; thời gian dừng ở `/product/5` kéo dài |
| **G08, G09** | Header (`App.jsx`) | Link `"Giỏ hàng"` trên thanh điều hướng không có badge số lượng sản phẩm và không highlight trang hiện tại (vi phạm **H1**) | Người tham gia không chắc sản phẩm đã vào giỏ hay chưa, phải bấm đi bấm lại giữa `/product/5` và `/cart` |
| **G01, G03, G04** | `/cart` | Nhãn ghi `"Tổng tạm tính"` thay vì `"Tổng cộng"` (**H4**); thiếu nút `+/-` chỉnh số lượng (**H3**); nút tích cực màu xanh lá thay vì xanh dương (**H4**) | Nếu lỡ bấm thêm nhiều lần ở `G10` dẫn đến số lượng > 1 (vượt 5.000.000 ₫), người tham gia không giảm số lượng được mà phải bấm `"Xóa"` (**G02** xóa ngay không hỏi) rồi thêm lại |
| **G06** | `/checkout` | Ô `"Tổng tiền thanh toán (VND)"` là `<input type="number">` cho phép sửa tay (vi phạm **H5 — Error prevention**) | Heatmap ghi nhận click bất thường vào ô tổng tiền hoặc người tham gia thắc mắc về việc tổng tiền có thể tự gõ lại |

---

## 4. Câu hỏi sau nhiệm vụ — SEQ (Single Ease Question)

Ngay sau khi kết thúc Mission 1, hiển thị câu hỏi **Opinion Scale (1–7)**:
> **Câu hỏi:** *"Nhìn chung, nhiệm vụ vừa rồi dễ hay khó thực hiện?"*
> - **Thang đo:** `1` = Rất khó (Very Difficult) · `2` · `3` · `4` = Trung bình · `5` · `6` · `7` = Rất dễ (Very Easy).
> - **Mốc tham khảo (Benchmark):** Điểm SEQ trung bình kỳ vọng ở các hệ thống thông thường là khoảng **5,3 – 5,5 / 7**. Với các lỗi cố ý của EShop (`G10`, `G08`, `G03`), dự kiến SEQ trung bình sẽ thấp hơn mốc chuẩn (khoảng 3,5 – 4,8).

---

## 5. Cuối study — Bảng hỏi SUS (System Usability Scale)

Gồm **10 câu tiêu chuẩn của John Brooke (1996)**, mỗi câu chấm trên thang Likert **1–5** (`1 = Rất không đồng ý` … `5 = Rất đồng ý`):

| # | Câu hỏi (Bản tiếng Việt chuẩn hóa trong nhóm) | Loại câu | Công thức quy đổi (0–4) |
| --- | --- | --- | --- |
| 1 | Tôi nghĩ rằng tôi sẽ muốn dùng website này thường xuyên. | Lẻ (Tích cực) | $\text{Điểm} - 1$ |
| 2 | Tôi thấy website phức tạp một cách không cần thiết. | Chẵn (Tiêu cực) | $5 - \text{Điểm}$ |
| 3 | Tôi thấy website dễ sử dụng. | Lẻ (Tích cực) | $\text{Điểm} - 1$ |
| 4 | Tôi nghĩ tôi cần người hỗ trợ kỹ thuật mới dùng được website này. | Chẵn (Tiêu cực) | $5 - \text{Điểm}$ |
| 5 | Tôi thấy các chức năng của website được kết hợp tốt với nhau. | Lẻ (Tích cực) | $\text{Điểm} - 1$ |
| 6 | Tôi thấy website có quá nhiều điểm không nhất quán. | Chẵn (Tiêu cực) | $5 - \text{Điểm}$ |
| 7 | Tôi nghĩ hầu hết mọi người sẽ học cách dùng website này rất nhanh. | Lẻ (Tích cực) | $\text{Điểm} - 1$ |
| 8 | Tôi thấy website rất rườm rà, khó dùng. | Chẵn (Tiêu cực) | $5 - \text{Điểm}$ |
| 9 | Tôi cảm thấy rất tự tin khi dùng website. | Lẻ (Tích cực) | $\text{Điểm} - 1$ |
| 10 | Tôi cần học nhiều thứ trước khi có thể dùng được website này. | Chẵn (Tiêu cực) | $5 - \text{Điểm}$ |

- **Công thức tính tổng điểm SUS của mỗi người tham gia:**
  $$\text{SUS} = \left( \sum_{\text{câu lẻ } i \in \{1,3,5,7,9\}} (X_i - 1) + \sum_{\text{câu chẵn } j \in \{2,4,6,8,10\}} (5 - X_j) \right) \times 2,5 \quad \in [0, 100]$$
- **Ngưỡng tham chiếu (Industry Benchmark):**
  - **$\ge 80,3$ (Hạng A):** Xuất sắc, người dùng sẵn sàng giới thiệu sản phẩm.
  - **$68,0$ (Hạng C — Mốc trung bình):** Chấp nhận được nhưng cần cải thiện.
  - **$< 68,0$ (Hạng D/F):** Dưới mức trung bình, tồn tại vấn đề usability đáng kể cần ưu tiên khắc phục.

---

## 6. Kết quả kiểm chứng kỹ thuật trước khi tạo Study thật

- [x] **Kiểm chứng 1 — Maze Free còn hỗ trợ Website Test / Live Website Testing không?**
  - **Kết quả:** Có. Tài khoản Maze Free cho phép tạo **1 study/tháng** (giới hạn số lượng blocks trong 1 study), hỗ trợ khối **Live Website Testing** khi cài đặt đoạn mã **Maze Snippet** vào thẻ `<head>` của `sut/eshop/frontend-web/index.html` trên bản deploy.
- [x] **Kiểm chứng 2 — Thao tác trong cùng một trang (bấm nút `"Áp dụng"` mã giảm giá hoặc bấm `"Xác Nhận Thanh Toán"`) có đo thành bước riêng trên Path của Maze không?**
  - **Kết quả (đối chiếu Maze Help Center):** Maze Live Website Test theo dõi bước đi (Path) dựa trên **sự thay đổi URL (Page URL / `history.pushState`)**. Trên EShop:
    - Khi bấm `"Áp dụng"` mã `VIP100` hoặc khi bấm `"Xác Nhận Thanh Toán"` (`setSuccess(true)` trong `Checkout.jsx`), ứng dụng chỉ cập nhật React state tại chỗ mà **không đổi URL** (vẫn ở `/checkout`).
    - Do đó, trên biểu đồ đường đi (Path), Maze chỉ ghi nhận người dùng đã đến trang đích `/checkout`, chứ **không tách hành động bấm nút `"Áp dụng"` thành một node URL riêng biệt**.
    - **Cách khắc phục & phân tích:** Sử dụng **Click Heatmap** trên màn hình `/checkout` để xác minh toạ độ click vào ô nhập mã giảm giá, nút `"Áp dụng"` và nút `"Xác Nhận Thanh Toán"`, đồng thời đối chiếu với bảng `orders` / `coupon_usage` trong SQLite DB. Đây cũng là một **điểm yếu thực tế của Maze** sẽ được trình bày trong Slide Phần 7.
- [ ] **Kiểm chứng 3 — Chạy thử (Pilot) 1 lượt trên URL public:**
  - Chạy thử 1 lượt nội bộ sau khi gắn snippet để xác nhận Maze nhận domain và ghi được heatmap trước khi gửi link cho 5 người tham gia thật.
