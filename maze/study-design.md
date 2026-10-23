# Thiết kế Study Usability (UXtweak + Microsoft Clarity) — Checkout EShop

> Trạng thái: **Đã hoàn thiện thiết kế & triển khai trên Vercel** · Người phụ trách: **Phúc (B)** · Người duyệt: Quang ☑ · Quân ☑
> **Ghi chú chuyển đổi công cụ:** Proposal ban đầu chọn Maze và đặt UXtweak làm dự phòng. Khi triển khai thực tế, Maze loại khối *Website test* khỏi bản Free/Trial (đòi gói trả phí ~\$99/tháng), nên nhóm chuyển sang **UXtweak** (Website Testing) kết hợp **Microsoft Clarity** (Click Heatmap & Rage Click).

## 1. Thông tin chung & Môi trường kiểm thử

| Hạng mục | Chi tiết cấu hình |
| --- | --- |
| **Hệ thống được kiểm thử (SUT)** | EShop Frontend Web (React + Vite) kết nối EShop Backend (Express + SQLite) |
| **URL Frontend public (Vercel)** | `https://seminar-gui-usability-testing.vercel.app` |
| **URL Backend API (`VITE_API_URL`)** | `https://eshop-api-nhom09.onrender.com` *(đã thay 13 chỗ gọi cứng `http://localhost:3000`)* |
| **Mã nhúng (Tracking Snippets)** | **UXtweak Snippet** (`56e349e0-e437-4d32-8fad-c6c12bc486b3`) + **Microsoft Clarity** (`z27wxp2oeb`) trong `sut/eshop/frontend-web/index.html` |
| **Số lượng người tham gia** | 5–6 người tham gia (participant) ngoài nhóm (sinh viên lớp khác / bạn bè chưa từng biết mã nguồn EShop) |
| **Tài khoản cấp riêng** | `p1@eshop.com` … `p6@eshop.com` · Mật khẩu chung: `Test1234!` (mỗi người tham gia dùng 1 tài khoản độc lập) |
| **Quy trình chuẩn bị DB** | Mở `https://eshop-api-nhom09.onrender.com/api/products` để đánh thức backend Render (tự động seed lại SQLite DB) trước mỗi đợt test |

---

## 2. Cấu trúc 4 phần trong UXtweak Website Testing Study

Study trên UXtweak (`EShop Checkout Usability Study`) được thiết kế gồm **4 phần** nối tiếp nhau:

1. **Welcome Message (Lời chào mở đầu):**
   - Giới thiệu ngắn gọn mục đích khảo sát trải nghiệm mua sắm trên EShop (nhấn mạnh: *"Chúng tôi kiểm thử mức độ dễ dùng của trang web, không kiểm tra kỹ năng của bạn"*).
   - Cung cấp thông tin tài khoản đăng nhập được phân bổ riêng (`p1@eshop.com` … `p6@eshop.com` / `Test1234!`).
2. **Task 1 (`T1` — Website Testing): Mua phụ kiện máy tính trong ngân sách và áp mã giảm giá `VIP100`.**
   - Bật tùy chọn `Record respondent's screen` (quay lại màn hình thao tác) và `Allow respondents to skip tasks` (cho phép bỏ cuộc nếu bị kẹt).
3. **After-task Question — Câu hỏi SEQ (7-point Likert scale 1–7):** Đánh giá độ dễ/khó ngay sau khi thực hiện xong Task 1.
4. **Post-study Questionnaire — Bảng hỏi SUS (10 câu dạng `Radio button grid` thang 1–5):** Đánh giá tổng thể tính khả dụng (Usability) của EShop sau buổi thử nghiệm.

---

## 3. Chi tiết Task 1 — Mua hàng có mã giảm giá

### 3.1. Kịch bản nhiệm vụ (Task Text)
- **Nội dung hiển thị cho người tham gia (viết theo ngôn ngữ mục tiêu của người dùng, tuyệt đối không lộ tên nút hay đường dẫn):**
  > *"Hãy đăng nhập vào EShop bằng tài khoản được cấp cho bạn (Mật khẩu: Test1234!). Hiện bạn có ngân sách tối đa **5.000.000 ₫** và muốn mua **một món phụ kiện cho máy tính**. Hãy tìm sản phẩm phù hợp với ngân sách, thêm vào giỏ và hoàn tất đặt hàng có sử dụng mã giảm giá **VIP100**."*

### 3.2. Thiết kế dữ liệu & Bẫy logic tự nhiên
- **Phân tích sản phẩm trong danh mục Phụ kiện (`category_id = 3`):**
  - `Tai nghe AirPods Pro 2` — giá `6.000.000 ₫` *(vượt ngân sách 5.000.000 ₫)*.
  - `Bàn phím cơ Keychron Q1` — giá `4.000.000 ₫` *(vừa ngân sách 5.000.000 ₫ — sản phẩm mục tiêu)*.
  - Các sản phẩm khác (iPhone 15 Pro Max `30.000.000 ₫`, Galaxy S24 Ultra `28.000.000 ₫`, MacBook Pro M3 `45.000.000 ₫`) đều vượt xa ngân sách.
- **Lý do chọn mã `VIP100` (không dùng `SAVE10`):**
  - `VIP100`: giảm cố định `100.000 ₫` cho đơn từ `300.000 ₫`, giới hạn tối đa `2` lần/tài khoản (`max_uses_per_user = 2`). Khi áp cho Keychron Q1 (`4.000.000 ₫`), tổng thanh toán còn `3.900.000 ₫`.
  - **Không dùng `SAVE10`:** Công thức tính giảm giá theo phần trăm (`percent`) ở backend EShop cố ý bị lỗi logic nghiệp vụ, dễ làm người tham gia bối rối vì số tiền sai và gây nhiễu kết quả đo usability.

### 3.3. Cấu hình Đường đi (Start URL, Success URL & Optimal Path)
- **Start URL address:** `https://seminar-gui-usability-testing.vercel.app/` (hoặc `/login`)
- **Success URL address (Simple URL match):** `https://seminar-gui-usability-testing.vercel.app/checkout`
- **Lostness metric — Optimal number of pages:** **`4`** (Trang chủ `/` $\rightarrow$ Chi tiết Keychron Q1 `/product/5` $\rightarrow$ Giỏ hàng `/cart` $\rightarrow$ Thanh toán `/checkout`).
- **Tiêu chí hoàn thành (Success Checkpoint):**
  - **Direct Success:** Người tham gia đi thẳng tới `/checkout` theo đường đi tối ưu và hoàn tất đơn hàng.
  - **Indirect Success:** Người tham gia đi vòng qua nhiều trang hơn mức tối ưu (ví dụ bấm nhầm vào AirPods Pro 2 `/product/4` hoặc phải quay lại `/product/5` do lỗi nút *Thêm vào giỏ* `G10`) nhưng vẫn tới được `/checkout`. Chỉ số **Lostness** sẽ tăng cao.
  - **Skip / Abandon:** Người tham gia bấm *Skip task* hoặc đóng trình duyệt trước khi đến `/checkout`.

### 3.4. Các vấn đề Usability (Ground Truth) kỳ vọng quan sát được qua UXtweak & Clarity
| Mã lỗi | Vị trí | Hiện tượng giao diện trên EShop | Dấu hiệu trên UXtweak (Replay / Lostness) & Clarity (Heatmap) |
| --- | --- | --- | --- |
| **G10** | `/product/5` | Nút `"Thêm vào giỏ hàng"` bấm lần đầu không có tác dụng (`clickCount === 0`), phải bấm lần thứ 2 mới thêm vào giỏ (vi phạm **H1**) | **Clarity Heatmap** đỏ rực và báo **Rage Click** trên nút `"Thêm vào giỏ hàng"`; **UXtweak Session Replay** quay lại cảnh người dùng bấm lặp nhiều lần |
| **G08, G09** | Header (`App.jsx`) | Link `"Giỏ hàng"` trên thanh điều hướng không có badge số lượng sản phẩm và không highlight trang hiện tại (vi phạm **H1**) | Người tham gia không chắc sản phẩm đã vào giỏ hay chưa, phải bấm đi bấm lại giữa `/product/5` và `/cart` làm tăng chỉ số **Lostness** trên UXtweak |
| **G01, G02, G03, G04** | `/cart` | Nhãn ghi `"Tổng tạm tính"` thay vì `"Tổng cộng"` (**H4**); thiếu nút `+/-` chỉnh số lượng (**H3**); bấm `"Xóa"` mất ngay không hỏi (**G02** - **H3, H5**) | Nếu lỡ bấm thêm nhiều lần ở `G10` dẫn đến số lượng > 1 (vượt 5.000.000 ₫), người tham gia không giảm số lượng được mà phải bấm `"Xóa"` rồi thêm lại từ đầu |
| **G06** | `/checkout` | Ô `"Tổng tiền thanh toán (VND)"` là `<input type="number">` cho phép sửa tay (vi phạm **H5 — Error prevention**) | **Clarity Heatmap** và **UXtweak Replay** ghi nhận click/dừng chuột bất thường vào ô tổng tiền |

---

## 4. Câu hỏi sau nhiệm vụ — SEQ (Single Ease Question)

Ngay sau khi kết thúc Task 1, hiển thị câu hỏi **7-point Likert scale (1–7)**:
> **Câu hỏi:** *"Nhìn chung, nhiệm vụ vừa rồi dễ hay khó thực hiện?"*
> - **Thang đo:** `1` = Rất khó (Very Difficult) … `4` = Trung bình … `7` = Rất dễ (Very Easy).
> - **Mốc tham khảo (Benchmark):** Điểm SEQ trung bình ở các hệ thống thông thường là khoảng **5,3 – 5,5 / 7**.

---

## 5. Cuối study — Bảng hỏi SUS (System Usability Scale)

Thiết lập trong mục **Post-study questions** dưới dạng **`Radio button grid`** (10 hàng $\times$ 5 cột từ `1 - Rất không đồng ý` đến `5 - Rất đồng ý`):

| # | Câu hỏi (Rows) | Loại câu | Công thức quy đổi (0–4) |
| --- | --- | --- | --- |
| 1 | 1. Tôi nghĩ rằng tôi sẽ muốn dùng website này thường xuyên. | Lẻ (Tích cực) | $\text{Điểm} - 1$ |
| 2 | 2. Tôi thấy website phức tạp một cách không cần thiết. | Chẵn (Tiêu cực) | $5 - \text{Điểm}$ |
| 3 | 3. Tôi thấy website dễ sử dụng. | Lẻ (Tích cực) | $\text{Điểm} - 1$ |
| 4 | 4. Tôi nghĩ tôi cần người hỗ trợ kỹ thuật mới dùng được website này. | Chẵn (Tiêu cực) | $5 - \text{Điểm}$ |
| 5 | 5. Tôi thấy các chức năng của website được kết hợp tốt với nhau. | Lẻ (Tích cực) | $\text{Điểm} - 1$ |
| 6 | 6. Tôi thấy website có quá nhiều điểm không nhất quán. | Chẵn (Tiêu cực) | $5 - \text{Điểm}$ |
| 7 | 7. Tôi nghĩ hầu hết mọi người sẽ học cách dùng website này rất nhanh. | Lẻ (Tích cực) | $\text{Điểm} - 1$ |
| 8 | 8. Tôi thấy website rất rườm rà, khó dùng. | Chẵn (Tiêu cực) | $5 - \text{Điểm}$ |
| 9 | 9. Tôi cảm thấy rất tự tin khi dùng website. | Lẻ (Tích cực) | $\text{Điểm} - 1$ |
| 10 | 10. Tôi cần học nhiều thứ trước khi có thể dùng được website này. | Chẵn (Tiêu cực) | $5 - \text{Điểm}$ |

- **Công thức tính tổng điểm SUS của mỗi người tham gia:**
  $$\text{SUS} = \left( \sum_{\text{câu lẻ } i \in \{1,3,5,7,9\}} (X_i - 1) + \sum_{\text{câu chẵn } j \in \{2,4,6,8,10\}} (5 - X_j) \right) \times 2,5 \quad \in [0, 100]$$
- **Ngưỡng tham chiếu (Industry Benchmark):**
  - **$\ge 80,3$ (Hạng A):** Xuất sắc.
  - **$68,0$ (Hạng C — Mốc trung bình):** Chấp nhận được.
  - **$< 68,0$ (Hạng D/F):** Dưới mức trung bình, tồn tại vấn đề usability đáng kể.
