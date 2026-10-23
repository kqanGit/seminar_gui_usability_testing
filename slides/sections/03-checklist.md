<!-- Phụ trách: Quang. Bản nháp do Quân soạn (có dùng Claude) theo checklist/checklist-50.md ngày 15/10; Quang cập nhật số liệu khi đủ 50 câu. Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">03</p>

## Checklist 50 câu trên EShop

- Checklist dùng chung, áp dụng trên luồng mua hàng
- Câu hỏi tiêu biểu và lỗi tìm được
- Câu nào máy kiểm được → chuyển sang Playwright

Note: Thời gian: 2 phút (Quang). Đây là cách kiểm thử GUI truyền thống, làm thủ công, theo tài liệu môn (guichecklist).

---

## Checklist: câu hỏi có/không theo từng control

- Câu hỏi **dùng chung cho mọi giao diện**, nhóm áp dụng trên **luồng mua hàng** của EShop
- Mỗi câu ghi: kết quả · ảnh minh chứng · FR / heuristic · **máy kiểm được không**

| # | Câu hỏi | Trang | Kết quả |
| --- | --- | --- | --- |
| 5 | Giá dùng `₫` và phân cách hàng nghìn | Giỏ hàng | Pass |
| 9 | Ô mật khẩu dùng `type="password"` | Đăng nhập | **Fail** |
| 17 | Xóa sản phẩm có dialog xác nhận | Giỏ hàng | **Fail** |
| 22 | Ô tổng tiền không cho sửa | Thanh toán | **Fail** |

Note: Câu 9: mật khẩu hiện rõ. Câu 17: bấm là xóa luôn, vi phạm H3, H5. Câu 22: ô tổng tiền sửa được, vừa lỗi giao diện vừa rủi ro nghiệp vụ. Nếu bị hỏi: có câu chung (type=password) và câu theo đặc tả riêng EShop (nhãn "Tổng cộng", FR-07).

---

## Câu 22 Fail: ô tổng tiền sửa được (H5)

![Trang Thanh toán: ô Tổng tiền thanh toán nhập tay được](../evidence/checklist/20261015-fail-tong-tien-readonly.png)

Note: Câu 22 · FR-08 · H5 Error prevention · ground truth G06 · severity 3. Chỉ vào ô tổng tiền trên ảnh. Một câu: "người dùng sửa được số tiền mình phải trả".

---

## Kết quả và mức tự động hóa

| | Số câu |
| --- | --- |
| Đã chấm | 18 / 50 (Pass 4 · **Fail 14**) |
| Máy kiểm được hoàn toàn (Tự động) | 10 |
| Cần người hỗ trợ (Bán tự động) | 4 |
| Chỉ người làm được (Thủ công) | 4 |

<p class="small">Số liệu tạm ngày 15/10/2026, cập nhật khi chấm đủ 50 câu. Bảng đầy đủ: <code>checklist/checklist-50.md</code>.</p>

<p class="key">Câu "Tự động" thành dữ liệu cho Playwright; câu "Thủ công" là chỗ thử AI ở phần 08.</p>

Note: Ví dụ: "mỗi trang có 1 thẻ h1" máy kiểm 100%; "ngôn ngữ giao diện có nhất quán không" vẫn cần người nhìn. Chuyển ý sang phần 04 (Phúc).
