# Bài 3 — Usability Mission & Đánh giá điểm SUS trên EShop

> Người soạn: **Phúc (B)** · Hình thức: **Bài tập về nhà (Homework)** · Thời lượng ước tính: **20–25 phút**

---

## 1. Mục tiêu
Sau khi hoàn thành bài tập này, sinh viên có thể:
1. Trải nghiệm đóng vai **người tham gia (participant)** thực hiện một nhiệm vụ kiểm thử khả dụng không có điều phối (**Unmoderated Usability Testing**) theo kịch bản nhiệm vụ (**Task Scenario**) trên hệ thống EShop.
2. Thực hành chấm điểm hai chỉ số định lượng quan trọng nhất trong Usability Testing:
   - **SEQ (Single Ease Question):** Đánh giá độ dễ/khó ngay sau khi hoàn thành nhiệm vụ (thang 1–7).
   - **SUS (System Usability Scale):** Đánh giá mức độ khả dụng tổng thể của hệ thống qua bảng hỏi 10 câu tiêu chuẩn của John Brooke (thang Likert 1–5).
3. Tính toán chính xác điểm số SUS quy đổi (thang `0–100`), phân hạng mức độ khả dụng (Grade A–F) và liên hệ các điểm trừ với các vi phạm **Nielsen's 10 Heuristics** thực tế trên EShop.

---

## 2. Chuẩn bị
1. **Môi trường hệ thống được kiểm thử (SUT — EShop):**
   - **Cách 1 (Khuyến nghị):** Truy cập URL EShop public của Nhóm 09 (hoặc link Maze Study do nhóm cung cấp trên lớp).
   - **Cách 2 (Chạy cục bộ trên máy cá nhân):** Khởi chạy Backend (`http://localhost:3000`) và Frontend (`http://localhost:5173`) theo hướng dẫn tại [`README.md`](../README.md).
2. **Tài khoản đăng nhập dùng cho bài tập:**
   - Email: `test@eshop.com` (hoặc tài khoản `p1@eshop.com` … `p6@eshop.com`)
   - Mật khẩu: `Test1234!`

---

## 3. Đề bài

### Phần A — Thực hiện nhiệm vụ (Usability Mission) & Chấm điểm SEQ (3.0 điểm)

Hãy đăng nhập vào EShop và thực hiện nhiệm vụ theo đúng kịch bản người dùng sau đây:

> **Kịch bản nhiệm vụ (Task Scenario):**  
> *"Bạn đang có ngân sách tối đa **5.000.000 ₫** và muốn mua **một món phụ kiện cho máy tính** trên EShop. Hãy tìm sản phẩm phù hợp với ngân sách của bạn, thêm sản phẩm vào giỏ hàng và hoàn tất đặt hàng có áp dụng mã giảm giá **`VIP100`**."*

**Yêu cầu ghi nhận sau khi hoàn thành nhiệm vụ:**
1. **Kết quả thực hiện:** Bạn đã chọn mua sản phẩm nào? Tổng số tiền thanh toán cuối cùng sau khi áp dụng mã `VIP100` là bao nhiêu?
2. **Nhật ký ma sát giao diện (Friction Log):** Ghi lại ít nhất **02 điểm bất tiện hoặc gây bối rối** mà bạn gặp phải trong quá trình thực hiện từ lúc chọn sản phẩm đến lúc đặt hàng xong (kèm tên trang và mô tả hiện tượng).
3. **Điểm SEQ (Single Ease Question):** Trả lời câu hỏi sau trên thang điểm từ `1` (Rất khó) đến `7` (Rất dễ) và giải thích ngắn gọn (1–2 câu) lý do bạn chọn mức điểm đó:
   > *"Nhìn chung, nhiệm vụ vừa rồi dễ hay khó thực hiện?"*  
   > `[ 1 - Rất khó ]  [ 2 ]  [ 3 ]  [ 4 ]  [ 5 ]  [ 6 ]  [ 7 - Rất dễ ]`

---

### Phần B — Khảo sát SUS 10 câu & Tính điểm chuẩn hóa (5.0 điểm)

Dựa trên trải nghiệm thực tế vừa rồi với EShop, bạn hãy:

1. **Tự đánh giá (hoặc sử dụng bộ phiếu trả lời mẫu dưới đây để kiểm tra công thức):**  
   Chấm điểm 10 câu hỏi **System Usability Scale (SUS)** theo thang Likert 5 mức, từ `1` (*Hoàn toàn phản đối*) đến `5` (*Hoàn toàn đồng ý*).

   Để thống nhất kết quả tính toán cho phần bài tập nộp, hãy tính điểm SUS cho **Người tham gia P1** với phiếu trả lời thực tế thu được sau buổi test EShop như sau:

| Câu (#) | Nội dung câu hỏi chuẩn SUS (John Brooke, 1996) | Loại câu | Điểm thô $R_i$ (1–5) của P1 | Điểm quy đổi (0–4) |
| :---: | :--- | :---: | :---: | :---: |
| **1** | Tôi nghĩ rằng tôi sẽ muốn sử dụng hệ thống EShop này thường xuyên. | Tích cực (Lẻ) | **3** | ? |
| **2** | Tôi thấy hệ thống EShop phức tạp một cách không cần thiết. | Tiêu cực (Chẵn) | **2** | ? |
| **3** | Tôi thấy hệ thống EShop dễ sử dụng. | Tích cực (Lẻ) | **3** | ? |
| **4** | Tôi nghĩ rằng tôi sẽ cần sự hỗ trợ của người có chuyên môn kỹ thuật để có thể sử dụng hệ thống này. | Tiêu cực (Chẵn) | **1** | ? |
| **5** | Tôi thấy các chức năng khác nhau trong hệ thống này được tích hợp tốt. | Tích cực (Lẻ) | **3** | ? |
| **6** | Tôi nghĩ rằng có quá nhiều sự thiếu nhất quán trong hệ thống EShop này. | Tiêu cực (Chẵn) | **4** | ? |
| **7** | Tôi hình dung rằng hầu hết mọi người sẽ học cách sử dụng hệ thống này rất nhanh. | Tích cực (Lẻ) | **4** | ? |
| **8** | Tôi thấy hệ thống này rất rườm rà, bất tiện khi sử dụng. | Tiêu cực (Chẵn) | **3** | ? |
| **9** | Tôi cảm thấy rất tự tin và an tâm khi sử dụng hệ thống này. | Tích cực (Lẻ) | **2** | ? |
| **10** | Tôi cần phải học rất nhiều thứ trước khi có thể bắt đầu sử dụng hệ thống này. | Tiêu cực (Chẵn) | **2** | ? |

2. **Yêu cầu tính toán:**
   - Điền cột **Điểm quy đổi (0–4)** cho từng câu từ 1 đến 10.
   - Tính tổng điểm quy đổi của các câu lẻ ($X$), tổng điểm quy đổi của các câu chẵn ($Y$) và **Tổng điểm SUS cuối cùng** (thang `0–100`).
   - Dựa trên ngưỡng chuẩn quốc tế (**68 điểm**), hãy phân loại mức độ khả dụng của EShop theo kết quả của P1 (Đạt hay dưới trung bình? Xếp hạng chữ cái A/B/C/D/F và mức Adjective Rating tương ứng là gì?).

---

### Phần C — Liên hệ kết quả SUS với lỗi Usability thực tế (2.0 điểm)

Quan sát phiếu trả lời của **P1** ở Phần B:
- Vì sao **Câu 6** (*"có quá nhiều sự thiếu nhất quán"*) lại bị đánh điểm thô cao ($R_6 = 4$) và **Câu 9** (*"cảm thấy tự tin và an tâm"*) lại chỉ đạt điểm thấp ($R_9 = 2$)?
- Hãy chỉ ra **ít nhất 03 lỗi GUI/Usability cụ thể trên EShop** (gắn kèm mã nguyên lý Heuristic `H1–H10` của Nielsen và mức độ nghiêm trọng `Severity 0–4`) đã trực tiếp dẫn đến cảm nhận trên của người tham gia.

---

## 4. Gợi ý thực hiện

1. **Gợi ý cho Phần A (Mission):**
   - Trong danh mục **Phụ kiện** của EShop có 2 sản phẩm: hãy chú ý so sánh giá bán của từng sản phẩm với ngân sách `5.000.000 ₫` trong đề bài.
   - Chú ý quan sát phản hồi của trang web khi bạn bấm nút **"Thêm vào giỏ"** lần đầu tiên tại trang Chi tiết sản phẩm, cũng như các control tại trang Giỏ hàng và Thanh toán.

2. **Gợi ý công thức tính điểm SUS cho Phần B:**
   - Vì bảng SUS xen kẽ câu hỏi tích cực (câu lẻ) và tiêu cực (câu chẵn), **tuyệt đối không cộng trực tiếp điểm thô $R_i$**.
   - **Bước 1 — Quy đổi từng câu về thang `0–4`:**
     - Với các **câu số lẻ** ($i \in \{1, 3, 5, 7, 9\}$ — mang nghĩa tích cực):
       $$\text{Điểm quy đổi}_i = R_i - 1$$
     - Với các **câu số chẵn** ($i \in \{2, 4, 6, 8, 10\}$ — mang nghĩa tiêu cực):
       $$\text{Điểm quy đổi}_i = 5 - R_i$$
   - **Bước 2 — Tính tổng điểm quy đổi (tối đa $40$):**
     $$S = X + Y = \sum_{i \text{ lẻ}} (R_i - 1) + \sum_{i \text{ chẵn}} (5 - R_i)$$
   - **Bước 3 — Nhân hệ số $2.5$ để đưa về thang `0–100`:**
     $$\text{SUS Score} = S \times 2.5$$
   - **Gợi ý thang phân loại SUS (Bangor et al., 2009; Sauro & Lewis, 2016):**
     - Điểm trung bình chuẩn (Benchmark): **$68.0$**
     - $\ge 80.3$: Hạng **A** (*Excellent* — Xuất sắc)
     - $68.0 \text{ – } 80.2$: Hạng **B/C** (*Good / OK* — Tốt / Chấp nhận được)
     - $51.0 \text{ – } 67.9$: Hạng **D** (*Marginal / OK–Poor* — Kém, cần cải thiện)
     - $< 51.0$: Hạng **F** (*Poor / Unacceptable* — Rất kém, không chấp nhận được)

---

## 5. Cách chấm (Thang điểm 10.0)

| Phần | Tiêu chí chấm chi tiết | Điểm tối đa |
| :---: | :--- | :---: |
| **Phần A** | - Xác định đúng sản phẩm mục tiêu trong ngân sách (`Bàn phím cơ Keychron Q1` — `4.000.000 ₫`) và tổng tiền sau mã `VIP100` (`3.900.000 ₫`). | **1.0 đ** |
| | - Nêu được $\ge 2$ điểm ma sát thực tế trên luồng làm nhiệm vụ (ví dụ: bấm "Thêm vào giỏ" 2 lần, không có badge giỏ hàng, nút xóa không hỏi xác nhận, ô tổng tiền sửa được...). | **1.0 đ** |
| | - Chấm điểm SEQ (1–7) kèm lập luận hợp lý gắn với trải nghiệm thực hiện nhiệm vụ. | **1.0 đ** |
| **Phần B** | - Tính đúng điểm quy đổi (0–4) cho cả 5 câu lẻ ($X$) và 5 câu chẵn ($Y$). | **2.5 đ** |
| | - Tính đúng tổng điểm SUS cuối cùng ($\text{SUS} = S \times 2.5$). | **1.5 đ** |
| | - Đối chiếu đúng với mốc chuẩn $68$ và phân hạng chính xác (Grade & Adjective Rating). | **1.0 đ** |
| **Phần C** | - Giải thích hợp lý nguyên nhân Câu 6 và Câu 9 bị mất điểm thông qua $\ge 3$ lỗi thật trên EShop, gắn đúng mã Heuristic (`H1`, `H3`, `H4`, `H5`...) và `Severity 0–4`. | **2.0 đ** |
| **Tổng** | | **10.0 đ** |
