# Bài tập 2 — Heuristic Showdown: Đánh giá Khả dụng Thủ công vs. AI (Nielsens' 10 Heuristics)

> **Người biên soạn:** Bùi Minh Quân (`23120337` — Vai C) · **Thời lượng làm bài:** 15–20 phút (Bản trên lớp: 60 giây cho trang Giỏ hàng)

---

## 1. Mục tiêu bài tập

Sau khi hoàn thành bài tập này, bạn sẽ nắm được:
1. Cách vận dụng **10 Usability Heuristics của Jakob Nielsen (`H1`–`H10`)** và thang điểm **Severity (`0`–`4`)** để tìm lỗi giao diện trên một luồng thương mại điện tử thực tế.
2. Cách đọc hiểu đầu ra JSON/Markdown của công cụ **AI Heuristic Reviewer (`nielsen-heuristic-reviewer`)** và thực hiện gán nhãn đối chiếu (**Human-in-the-loop**).
3. Cách tính hai chỉ số đánh giá chất lượng của AI: **Precision (Độ chuẩn xác)** và **Recall (Độ phủ)**, từ đó nhận diện rõ những loại lỗi nào **chỉ con người mới thấy** và những lỗi nào **AI có thể hỗ trợ phát hiện nhanh**.

---

## 2. Chuẩn bị ngữ liệu

Bạn được cung cấp bộ 3 ảnh chụp màn hình trên luồng mua hàng của **EShop** (nằm trong thư mục [`evidence/gui-bugs/`](../evidence/gui-bugs/)):
1. **Ảnh 1 — Trang Đăng nhập (`/login`):** `evidence/gui-bugs/20261015-login-sai-tieu-de-va-type.png`
2. **Ảnh 2 — Trang Giỏ hàng (`/cart`):** `evidence/gui-bugs/20261015-cart-tong-tam-tinh-va-nut-xanh-la.png`
3. **Ảnh 3 — Trang Thanh toán (`/checkout`):** `evidence/gui-bugs/20261015-checkout-tong-tien-sua-duoc.png`

> **Tóm tắt nhanh 10 Heuristic của Nielsen & Thang Severity 0–4:**
> - **H1:** Hiển thị trạng thái hệ thống · **H2:** Khớp với thế giới thực · **H3:** Quyền kiểm soát & tự do (Undo/Hủy) · **H4:** Tính nhất quán & chuẩn mực · **H5:** Phòng ngừa lỗi · **H6:** Nhận diện thay vì phải nhớ · **H7:** Linh hoạt & hiệu quả · **H8:** Thiết kế tối giản · **H9:** Giúp nhận biết & sửa lỗi · **H10:** Trợ giúp & tài liệu.
> - **Severity:** `0` = Không phải lỗi · `1` = Thẩm mỹ · `2` = Lỗi nhỏ · `3` = Lỗi lớn · `4` = Thảm họa khả dụng.

---

## 3. Đề bài

### Phần A — Đánh giá bằng mắt thường (Thực hiện TRƯỚC khi xem kết quả AI)
Quan sát 3 bức ảnh chụp màn hình (`/login`, `/cart`, `/checkout`) và tìm **ít nhất 5 vi phạm Heuristic**. Điền vào bảng theo mẫu sau:

| # | Trang | Mã Heuristic (`H1`–`H10`) | Severity (`0`–`4`) | Phần tử giao diện | Mô tả vấn đề khả dụng & Gợi ý sửa |
| :---: | :--- | :---: | :---: | :--- | :--- |
| 1 | `cart` | ... | ... | ... | ... |
| 2 | ... | ... | ... | ... | ... |
| 3 | ... | ... | ... | ... | ... |
| 4 | ... | ... | ... | ... | ... |
| 5 | ... | ... | ... | ... | ... |

---

### Phần B — Kiểm duyệt kết quả của AI & Tính Precision / Recall
Giả sử trên riêng **trang Giỏ hàng (`/cart`) và Thanh toán (`/checkout`)**, tập Ground Truth chuẩn của dự án có **6 lỗi thực tế** sau:
- **`G01`:** Nhãn ghi *"Tổng tạm tính"* thay vì *"Tổng cộng"* (`H4`, Severity 2).
- **`G02`:** Nút *"Xóa"* xóa ngay lập tức mà không có hộp thoại xác nhận (`H3`/`H5`, Severity 3).
- **`G03`:** Cột *"Số lượng: 1"* chỉ hiện số tĩnh, không có nút `+/-` chỉnh số lượng (`H3`, Severity 2).
- **`G04`:** Nút *"Tiến hành thanh toán"* có màu xanh lá thay vì màu xanh dương theo đặc tả `FR-21` (`H4`, Severity 2).
- **`G05`:** Tiêu đề trang dùng thẻ `<h2>`, thiếu thẻ `<h1>` theo đặc tả `FR-21` (Severity 2).
- **`G06`:** Ô *"Tổng tiền thanh toán (VND)"* ở trang `/checkout` là `<input type="number">` cho phép người dùng tự gõ sửa số tiền (`H5`, Severity 3).

Giả sử khi chạy Skill **`nielsen-heuristic-reviewer`** trên 2 bức ảnh `/cart` và `/checkout`, AI trả về **6 phát hiện (`AI-1` đến `AI-6`)** như bảng dưới đây. *(Bảng do nhóm soạn để minh họa cho bài tập, không phải kết quả chạy thật; kết quả thật xem ở `evidence/ai/` sau khi nhóm chạy Demo 3.)*

| Mã AI | Trang | AI chấm | Nội dung phát hiện do AI báo cáo | Nhãn của bạn (`G01`..`G06` / `moi-dung` / `sai`) |
| :---: | :--- | :---: | :--- | :---: |
| **AI-1** | `cart` | `H3` · Sev 3 | Nút *"Xóa"* màu đỏ đặt cạnh sản phẩm không có hộp thoại xác nhận hoặc hoàn tác. | ? |
| **AI-2** | `cart` | `H3` · Sev 2 | Dòng *"Số lượng: 1"* chỉ là văn bản tĩnh, thiếu nút tăng/giảm (`+`/`-`). | ? |
| **AI-3** | `cart` | `H4` · Sev 2 | Nhãn *"Tổng tạm tính"* gây hiểu nhầm, không rõ đã phải tổng tiền cuối cùng chưa. | ? |
| **AI-4** | `checkout` | `H5` · Sev 4 | Ô *"Tổng tiền thanh toán (VND)"* là ô input số mở, cho phép khách tự sửa số tiền phải trả. | ? |
| **AI-5** | `checkout` | `H6` · Sev 2 | Trang Thanh toán không hiển thị lại danh sách tên sản phẩm và số lượng đang mua, bắt người dùng phải tự nhớ từ trang trước. | ? |
| **AI-6** | `checkout` | `H10` · Sev 1 | Ô nhập *"Mã giảm giá"* không có đường link dẫn tới trang Điều khoản & Chính sách khuyến mãi. | ? |

**Yêu cầu:**
1. Hãy gán nhãn cho từng dòng từ `AI-1` đến `AI-6` vào một trong 3 loại: khớp mã Ground Truth (`G01`–`G06`), lỗi mới có thật (`moi-dung`), hoặc báo nhầm (`sai`).
2. Tính **Precision** của AI trên 6 phát hiện trên:
   $$\text{Precision} = \frac{\text{Số phát hiện khớp GT} + \text{Số phát hiện } \text{moi-dung}}{\text{Tổng số phát hiện AI báo (6)}}$$
3. Tính **Recall** của AI trên 6 lỗi Ground Truth (`G01`–`G06`):
   $$\text{Recall} = \frac{\text{Số lỗi trong } G01..G06 \text{ mà AI tìm được}}{6}$$
4. Giải thích ngắn gọn: **Vì sao AI chỉ nhìn ảnh chụp màn hình lại bỏ sót lỗi `G04` và `G05`?**

---

## 4. Gợi ý thực hiện

- Ở **Phần A**: Hãy chú ý quan sát kỹ các nhãn chữ trên trang `/login` (tiêu đề trang có khớp với nút bấm không? Ô mật khẩu có che ký tự không?), các nút bấm trên trang `/cart` và các ô nhập liệu trên trang `/checkout`.
- Ở **Phần B**:
  - Mở ảnh `20261015-checkout-tong-tien-sua-duoc.png` để kiểm tra xem phát hiện **AI-5** (*không hiển thị lại tên sản phẩm đang mua*) có đúng với thực tế giao diện không $\rightarrow$ Nếu đúng thực tế và hợp lý theo nguyên tắc `H6`, hãy gán nhãn `moi-dung`.
  - Với **AI-6**, hãy xét xem một form thanh toán đơn giản có bắt buộc phải có link sang trang Điều khoản khuyến mãi không (hay AI đang áp dụng nguyên tắc `H10` quá mức?).

---

## 5. Đáp án & Biểu điểm

Xem đáp án chi tiết tại [`exercises/answers/bai-2-dap-an.md`](answers/bai-2-dap-an.md).
