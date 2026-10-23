# Đáp án Bài tập 2 — Heuristic Showdown: Đánh giá Khả dụng Thủ công vs. AI

> **Người biên soạn:** Bùi Minh Quân (`23120337` — Vai C)

---

## 1. Đáp án Phần A — Các vi phạm Heuristic phát hiện bằng mắt thường trên 3 ảnh

Người học chỉ cần nêu đúng **tối thiểu 5 lỗi** trong danh sách chuẩn dưới đây (chấp nhận chênh lệch $\pm 1$ bậc ở cột Severity nếu lập luận hợp lý):

| # | Trang | Mã Heuristic | Severity chuẩn | Phần tử giao diện | Mô tả vấn đề khả dụng & Gợi ý sửa |
| :---: | :--- | :---: | :---: | :--- | :--- |
| 1 | `login` | **H4** Consistency & standards | **3** | Tiêu đề `"Đăng Ký"`, nhãn `"Username"`, nút `"Sign In"` | Trang đăng nhập nhưng tiêu đề lại ghi `"Đăng Ký"`, pha trộn tiếng Anh và tiếng Việt thiếu nhất quán (`G11`). **Cách sửa:** Đổi tiêu đề thành `"Đăng Nhập"`, nhãn `"Email"`, nút `"Đăng nhập"`. |
| 2 | `login` | **H5** Error prevention | **3** | Ô nhập mật khẩu (`Password`) | Ô mật khẩu dùng `type="text"` làm hiển thị rõ toàn bộ ký tự mật khẩu trên màn hình (`G11`). **Cách sửa:** Đổi thành `type="password"`. |
| 3 | `cart` | **H3** User control · **H5** Error prevention | **3** | Nút `"Xóa"` màu đỏ | Bấm `"Xóa"` làm mất sản phẩm ngay lập tức mà không có hộp thoại xác nhận (Confirm Dialog) hoặc nút Hoàn tác (`G02`). **Cách sửa:** Thêm hộp thoại xác nhận trước khi xóa. |
| 4 | `cart` | **H3** User control · **H7** Flexibility | **2** | Dòng chữ `"Số lượng: 1"` | Số lượng chỉ hiển thị số tĩnh, không có nút `+` / `-` để tăng giảm số lượng sản phẩm ngay trong giỏ (`G03`). **Cách sửa:** Thêm cụm nút `-` / `+`. |
| 5 | `cart` | **H4** Consistency & standards | **2** | Nhãn `"Tổng tạm tính"` & nút `"Tiến hành thanh toán"` | Dùng nhãn `"Tổng tạm tính"` thay vì `"Tổng cộng"` (`G01`); nút chính màu xanh lá thay vì màu xanh dương nhất quán của hệ thống (`G04`). |
| 6 | `checkout` | **H5** Error prevention | **3–4** | Ô `"Tổng tiền thanh toán (VND)"` | Trường tổng tiền là `<input type="number">` cho phép người dùng tự ý gõ sửa số tiền phải trả (`G06`). **Cách sửa:** Đặt `readonly`/`disabled` hoặc đổi thành văn bản tĩnh. |
| 7 | `checkout` | **H6** Recognition rather than recall | **2** | Khung thông tin đơn hàng | Không hiển thị lại danh sách tên sản phẩm và số lượng đang mua trên màn hình thanh toán, bắt người dùng phải tự nhớ từ trang giỏ hàng. |
| 8 | `header` | **H1** Visibility of system status · **H4** | **1–2** | Thanh điều hướng phía trên | Nút đăng xuất ghi `"Thoát"` thay vì `"Đăng xuất"` (`G07`); liên kết `"Giỏ hàng"` không có badge hiển thị số lượng món hàng (`G08`) và không highlight trang hiện tại (`G09`). |

---

## 2. Đáp án Phần B — Gán nhãn kết quả AI & Tính Precision / Recall

### 2.1. Bảng gán nhãn chuẩn

| Mã AI | Trang | AI chấm | Nội dung phát hiện | Nhãn đúng | Giải thích lý do |
| :---: | :--- | :---: | :--- | :---: | :--- |
| **AI-1** | `cart` | `H3` · Sev 3 | Nút *"Xóa"* không có xác nhận / hoàn tác | **`G02`** | Trùng khớp hoàn toàn với lỗi `G02` trong Ground Truth. |
| **AI-2** | `cart` | `H3` · Sev 2 | *"Số lượng: 1"* tĩnh, thiếu nút `+/-` | **`G03`** | Trùng khớp hoàn toàn với lỗi `G03` trong Ground Truth. |
| **AI-3** | `cart` | `H4` · Sev 2 | Nhãn *"Tổng tạm tính"* gây hiểu nhầm | **`G01`** | Trùng khớp hoàn toàn với lỗi `G01` trong Ground Truth. |
| **AI-4** | `checkout` | `H5` · Sev 4 | Ô *"Tổng tiền thanh toán"* cho phép sửa số | **`G06`** | Trùng khớp với lỗi `G06` (AI chấm Severity 4, nhóm chấm 3). |
| **AI-5** | `checkout` | `H6` · Sev 2 | Không hiển thị lại danh sách tên sản phẩm đang mua | **`moi-dung`** | **Lỗi mới có thật (True Positive ngoài GT):** Nhìn ảnh `/checkout` xác nhận đúng là thiếu bảng tóm tắt mặt hàng, vi phạm rõ nguyên tắc `H6`. |
| **AI-6** | `checkout` | `H10` · Sev 1 | Ô mã giảm giá thiếu link sang trang Điều khoản khuyến mãi | **`sai`** | **Báo nhầm (False Positive):** AI áp dụng nguyên tắc `H10` quá mức cần thiết cho một form thanh toán cơ bản. |

---

### 2.2. Kết quả tính Precision và Recall

1. **Tính Precision (Độ chuẩn xác của AI):**
   - Số phát hiện đúng của AI = $4 \text{ (khớp GT: } G01, G02, G03, G06\text{)} + 1 \text{ (lỗi mới đúng: AI-5)} = 5$.
   - Tổng số phát hiện AI báo = $6$.
   $$\text{Precision} = \frac{4 + 1}{6} = \frac{5}{6} \approx \mathbf{0,833} \text{ (hay } \mathbf{83,3\%}\text{)}$$

2. **Tính Recall (Độ phủ của AI trên 6 lỗi Ground Truth `G01`–`G06`):**
   - Trong 6 lỗi Ground Truth (`G01` đến `G06`), AI tìm ra được **4 lỗi** (`G01`, `G02`, `G03`, `G06`) và bỏ sót **2 lỗi** (`G04`, `G05`).
   $$\text{Recall} = \frac{4}{6} \approx \mathbf{0,667} \text{ (hay } \mathbf{66,7\%}\text{)}$$

3. **Độ lệch điểm Severity trung bình trên 4 lỗi trùng Ground Truth (`G01`, `G02`, `G03`, `G06`):**
   $$\text{MAE}_{\text{Severity}} = \frac{|2 - 2| + |3 - 3| + |2 - 2| + |4 - 3|}{4} = \frac{1}{4} = \mathbf{0,25 \text{ bậc}}$$

---

### 2.3. Giải thích vì sao Vision AI bỏ sót lỗi `G04` và `G05`

- **Vì sao bỏ sót `G04` (Nút *"Tiến hành thanh toán"* màu xanh lá thay vì màu xanh dương)?**
  - Vì AI chỉ nhìn bức ảnh chụp màn hình độc lập mà **không được cung cấp tài liệu đặc tả thiết kế riêng (`FR-21`)** của dự án EShop. Trong thiết kế web nói chung, nút hành động tích cực màu xanh lá cây là hoàn toàn hợp lệ, nên AI không coi đó là lỗi.
- **Vì sao bỏ sót `G05` (Tiêu đề trang dùng thẻ `<h2>`, không có thẻ `<h1>`)?**
  - Vì AI đánh giá dựa trên **ảnh chụp màn hình (pixel)** chứ không đọc cây cấu trúc **DOM / HTML** bên dưới. Bằng mắt thường trên ảnh, một dòng chữ tiêu đề được bọc bằng thẻ `<h2>` có cỡ chữ to nhìn giống hệt thẻ `<h1>`. Để bắt lỗi `G05`, cần kết hợp **Playwright (`page.locator('h1')`)**, **axe-core** hoặc một Skill rà mã nguồn như **`web-design-guidelines` của Vercel**.
