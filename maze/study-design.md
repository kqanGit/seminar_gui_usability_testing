# Thiết kế study Maze — Checkout EShop

> Trạng thái: **nháp** · Người duyệt: Quang ☐ · Quân ☐ (tick khi đã duyệt)

## Thông tin chung
- URL website: …
- Thời gian mở URL: … (chỉ mở trong khung giờ test — EShop cố ý có lỗ hổng bảo mật)
- Người tham gia: ~5 người ngoài nhóm, mỗi người 1 tài khoản `pX@eshop.com` / mật khẩu: …
- Reset DB trước mỗi đợt: ☐

## Mission 1 — Mua hàng có mã giảm giá
**Kịch bản (không ghi tên nút):**
> Bạn có 5.000.000 ₫ và muốn mua một món phụ kiện cho máy tính. Hãy mua một sản phẩm và dùng mã giảm giá VIP100 khi thanh toán.

- Dữ liệu: Phụ kiện = AirPods Pro 2 (6.000.000 ₫) và Keychron Q1 (4.000.000 ₫) → chỉ Keychron vừa ngân sách.
- VIP100: giảm cố định 100.000 ₫, đơn tối thiểu 300.000 ₫, tối đa 2 lần/tài khoản. **Không dùng SAVE10** (công thức % ở backend lỗi).
- Expected path: Home → Chi tiết Keychron → Thêm vào giỏ → Giỏ hàng → Thanh toán → nhập VIP100 → Xác nhận
- Thành công khi: xác nhận đơn ở trang Thanh toán (URL đích: …)
- Câu hỏi sau mission — SEQ: "Nhiệm vụ này dễ hay khó?" (1 = rất khó … 7 = rất dễ)

## Cuối study — SUS (10 câu, thang 1–5)
1. Tôi nghĩ rằng tôi sẽ muốn dùng website này thường xuyên.
2. Tôi thấy website phức tạp một cách không cần thiết.
3. Tôi thấy website dễ sử dụng.
4. Tôi nghĩ tôi cần người hỗ trợ kỹ thuật mới dùng được website này.
5. Tôi thấy các chức năng của website được kết hợp tốt với nhau.
6. Tôi thấy website có quá nhiều điểm không nhất quán.
7. Tôi nghĩ hầu hết mọi người sẽ học cách dùng website này rất nhanh.
8. Tôi thấy website rất rườm rà, khó dùng.
9. Tôi cảm thấy rất tự tin khi dùng website.
10. Tôi cần học nhiều thứ trước khi có thể dùng được website này.

Cách tính: câu lẻ (điểm − 1), câu chẵn (5 − điểm), cộng lại × 2,5 → 0–100.

## Cần kiểm chứng trước khi tạo study
- [ ] Maze Free còn hỗ trợ Website test / live website?
- [ ] Thao tác trong cùng một trang (bấm "Áp dụng" coupon) có đo thành bước riêng được không? (Maze Help)
- [ ] Pilot 1 lượt trên URL public chạy trơn tru
