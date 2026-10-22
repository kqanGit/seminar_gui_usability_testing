# Đáp án & Hướng dẫn chấm Bài 3 — Usability Mission & SUS

> Người soạn: **Phúc (B)** · **Lưu ý bảo mật đề:** File này là đáp án mẫu dành cho nhóm thuyết trình và GVTH, **không phát cho lớp trước khi thu bài tập**.

---

## Đáp án Phần A — Thực hiện nhiệm vụ (Usability Mission) & SEQ (3.0 điểm)

### 1. Kết quả thực hiện nhiệm vụ chuẩn (1.0 điểm)
- **Phân tích lựa chọn sản phẩm (0.5 đ):**
  - Trong danh mục **Phụ kiện** có 2 sản phẩm:
    - `Tai nghe AirPods Pro 2`: giá `6.000.000 ₫` $\rightarrow$ **Loại** vì vượt ngân sách tối đa `5.000.000 ₫`.
    - `Bàn phím cơ Keychron Q1`: giá `4.000.000 ₫` $\rightarrow$ **Chọn** vì nằm trong ngân sách `5.000.000 ₫`.
- **Tổng tiền thanh toán cuối cùng (0.5 đ):**
  - Giá gốc sản phẩm: `4.000.000 ₫`.
  - Áp dụng mã giảm giá `VIP100`: giảm cố định `100.000 ₫` (đủ điều kiện đơn tối thiểu `300.000 ₫`).
  - **Tổng tiền thanh toán sau giảm:** **`3.900.000 ₫`**.

### 2. Nhật ký ma sát giao diện — Friction Log (1.0 điểm)
Sinh viên nêu được **ít nhất 02 hiện tượng** trong danh sách lỗi thực tế dưới đây (mỗi ý đúng được **0.5 đ**):
1. **Trang Chi tiết sản phẩm (`/product/6`):** Nút **"Thêm vào giỏ"** bấm lần thứ nhất không hoạt động, phải bấm đến lần thứ hai mới thêm được hàng vào giỏ (lỗi `G10`), đồng thời không có thông báo phản hồi (toast) nào xuất hiện.
2. **Thanh điều hướng Header (`App.jsx`):** Link **"Giỏ hàng"** không có số đếm (badge) hiển thị số lượng sản phẩm đã thêm (`G08`), cũng không làm nổi bật (highlight) trang hiện tại (`G09`), khiến người dùng không biết thao tác thêm giỏ đã thành công hay chưa.
3. **Trang Giỏ hàng (`/cart`):**
   - Không có nút `+/-` để tăng giảm số lượng sản phẩm (`G03`).
   - Bấm nút **"Xóa"** là xóa mất sản phẩm ngay lập tức mà không có hộp thoại xác nhận (confirmation dialog) hay nút Hoàn tác (`G02`).
   - Nhãn tổng tiền ghi **"Tổng tạm tính"** thay vì **"Tổng cộng"** (`G01`); nút **"Tiến hành thanh toán"** tô màu xanh lá thay vì màu xanh dương chuẩn của nút hành động chính (`G04`).
4. **Trang Thanh toán (`/checkout`):** Ô **"Tổng tiền thanh toán"** là một ô `input type="number"` không bị khóa (`readonly`/`disabled`), cho phép người dùng tự ý gõ sửa số tiền thanh toán (`G06`).

### 3. Đánh giá chỉ số SEQ — Single Ease Question (1.0 điểm)
- **Mức điểm kỳ vọng:** Từ **`4/7`** đến **`5/7`** *(chấp nhận mọi mức điểm từ `3` đến `6` nếu sinh viên giải thích logic dựa trên trải nghiệm thực tế)*.
- **Giải thích mẫu:** Mặc dù luồng mua hàng ngắn và dễ tìm được sản phẩm vừa ngân sách, việc nút *"Thêm vào giỏ"* không ăn ở lần bấm đầu tiên kèm theo việc không có badge số lượng trên giỏ hàng gây lúng túng rõ rệt cho người dùng mới.

---

## Đáp án Phần B — Tính điểm khảo sát SUS 10 câu (5.0 điểm)

### 1. Bảng tính điểm quy đổi từng câu của Người tham gia P1 (2.5 điểm)
*Mỗi dòng quy đổi đúng được **0.25 điểm** ($10 \times 0.25 = 2.5\text{ đ}$):*

| Câu (#) | Loại câu | Điểm thô $R_i$ | Công thức áp dụng | Điểm quy đổi (0–4) |
| :---: | :---: | :---: | :---: | :---: |
| **1** | Lẻ (Tích cực) | 3 | $R_1 - 1 = 3 - 1$ | **2** |
| **2** | Chẵn (Tiêu cực) | 2 | $5 - R_2 = 5 - 2$ | **3** |
| **3** | Lẻ (Tích cực) | 3 | $R_3 - 1 = 3 - 1$ | **2** |
| **4** | Chẵn (Tiêu cực) | 1 | $5 - R_4 = 5 - 1$ | **4** |
| **5** | Lẻ (Tích cực) | 3 | $R_5 - 1 = 3 - 1$ | **2** |
| **6** | Chẵn (Tiêu cực) | 4 | $5 - R_6 = 5 - 4$ | **1** |
| **7** | Lẻ (Tích cực) | 4 | $R_7 - 1 = 4 - 1$ | **3** |
| **8** | Chẵn (Tiêu cực) | 3 | $5 - R_8 = 5 - 3$ | **2** |
| **9** | Lẻ (Tích cực) | 2 | $R_9 - 1 = 2 - 1$ | **1** |
| **10** | Chẵn (Tiêu cực) | 2 | $5 - R_{10} = 5 - 2$ | **3** |

### 2. Tổng điểm quy đổi và Điểm SUS cuối cùng (1.5 điểm)
- **Tổng điểm quy đổi các câu lẻ ($X$):** (0.5 đ)
  $$X = (R_1 - 1) + (R_3 - 1) + (R_5 - 1) + (R_7 - 1) + (R_9 - 1) = 2 + 2 + 2 + 3 + 1 = 10$$
- **Tổng điểm quy đổi các câu chẵn ($Y$):** (0.5 đ)
  $$Y = (5 - R_2) + (5 - R_4) + (5 - R_6) + (5 - R_8) + (5 - R_{10}) = 3 + 4 + 1 + 2 + 3 = 13$$
- **Tổng điểm quy đổi 10 câu ($S$):**
  $$S = X + Y = 10 + 13 = 23\text{ (trên thang tối đa 40)}$$
- **Điểm SUS chuẩn hóa (thang `0–100`):** (0.5 đ)
  $$\text{SUS Score} = S \times 2.5 = 23 \times 2.5 = \mathbf{57.5\text{ điểm}}$$

### 3. Phân loại & Đánh giá theo chuẩn quốc tế (1.0 điểm)
- **So với chuẩn trung bình (Benchmark = $68.0$):** Điểm SUS đạt **$57.5 < 68.0$** $\rightarrow$ **Dưới mức trung bình** (0.5 đ).
- **Xếp hạng (Grade & Adjective Rating):** (0.5 đ)
  - **Grade:** **Hạng D** (nằm trong khoảng $51.0 \text{ – } 67.9$).
  - **Mức độ chấp nhận (Acceptability):** *Marginal (Cận biên / Cần cải thiện nghiêm túc)*.
  - **Adjective Rating:** *OK / Poor (Tạm được thiên về Kém)* — hệ thống vẫn dùng để hoàn thành được tác vụ nhưng tồn tại nhiều lỗi thiết kế gây khó chịu và thiếu tin cậy.

---

## Đáp án Phần C — Liên hệ kết quả SUS với lỗi Usability thực tế (2.0 điểm)

### 1. Giải thích nguyên nhân Câu 6 và Câu 9 bị điểm kém (0.5 điểm)
- **Câu 6 ($R_6 = 4 \rightarrow \text{quy đổi } = 1/4$):** Người tham gia đồng ý rằng hệ thống *thiếu nhất quán* vì thuật ngữ, nhãn nút bấm và màu sắc thay đổi lộn xộn giữa các trang (tiếng Anh lẫn tiếng Việt, nhãn sai chuẩn).
- **Câu 9 ($R_9 = 2 \rightarrow \text{quy đổi } = 1/4$):** Người tham gia *không cảm thấy tự tin và an tâm* vì hệ thống thiếu phản hồi trạng thái khi thao tác và thiếu cơ chế phòng ngừa lỗi ở các bước nhạy cảm (xóa giỏ hàng, sửa tiền thanh toán).

### 2. Chỉ ra $\ge 3$ lỗi cụ thể gắn với Heuristic Nielsen & Severity (1.5 điểm)
*Mỗi lỗi nêu đúng hiện tượng + đúng mã Heuristic + mức Severity hợp lý được **0.5 điểm** (tối đa 1.5 điểm):*

| Mã lỗi | Hiện tượng trên EShop | Heuristic vi phạm | Severity (0–4) | Tác động tới Câu 6 / Câu 9 trong SUS |
| :---: | :--- | :--- | :---: | :--- |
| **G11** | Trang Đăng nhập có tiêu đề ghi **"Đăng Ký"**, nhãn **"Username"**, nút **"Sign In"** trộn lẫn Anh–Việt, ô mật khẩu hiện rõ chữ (`type="text"`). | **H4 — Consistency and standards** *(Tính nhất quán và tiêu chuẩn)* & **H5 — Error prevention** | **3 (Lớn)** | Làm tăng điểm tiêu cực ở **Câu 6** (thiếu nhất quán nghiêm trọng) và giảm **Câu 9** (lộ mật khẩu gây mất an tâm). |
| **G01, G04, G07** | Giỏ hàng ghi **"Tổng tạm tính"** thay vì "Tổng cộng" (`G01`); nút thanh toán màu **xanh lá** thay vì xanh dương (`G04`); nút đăng xuất ghi **"Thoát"** (`G07`). | **H4 — Consistency and standards** *(Tính nhất quán và tiêu chuẩn)* | **1–2 (Thẩm mỹ / Nhỏ)** | Trực tiếp khiến người dùng đánh giá hệ thống rời rạc, thiếu chuẩn mực ở **Câu 6**. |
| **G10, G08** | Nút **"Thêm vào giỏ"** phải bấm 2 lần mới ăn (`G10`), không có thông báo toast và không có badge số lượng trên Header (`G08`). | **H1 — Visibility of system status** *(Hiển thị trạng thái hệ thống)* | **3 (Lớn)** | Làm giảm mạnh sự tự tin ở **Câu 9** và tăng cảm giác rườm rà ở **Câu 8** vì người dùng không biết hệ thống đã nhận lệnh hay chưa. |
| **G02** | Bấm nút **"Xóa"** trong giỏ hàng xóa ngay lập tức mà không có hộp thoại xác nhận (confirmation dialog). | **H3 — User control and freedom** & **H5 — Error prevention** | **3 (Lớn)** | Khiến người dùng sợ bấm nhầm mất sản phẩm, làm giảm điểm tự tin ở **Câu 9**. |
| **G06** | Ô **"Tổng tiền thanh toán"** ở trang Checkout cho phép người dùng tự gõ sửa số tiền. | **H5 — Error prevention** *(Phòng ngừa lỗi)* | **3 (Lớn)** | Gây hoang mang về độ tin cậy của hệ thống thanh toán, kéo tụt điểm **Câu 9**. |
