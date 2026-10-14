# Danh sách lỗi đã xác nhận

Severity theo thang Nielsen 0–4. Trạng thái: `cần xác nhận` → `đã xác nhận` (có ảnh).

| ID | Trang | Mô tả lỗi | Đặc tả / heuristic | Vị trí code | Severity | Nguồn | Ảnh | Trạng thái |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| G01 | Giỏ hàng | Nhãn "Tổng tạm tính" thay vì "Tổng cộng" | FR-07 · H4 | `Cart.jsx:63` | | proposal | | cần xác nhận |
| G02 | Giỏ hàng | Bấm "Xóa" xóa ngay, không có dialog xác nhận | FR-07, FR-24 · H3, H5 | `Cart.jsx:50-55` | | proposal | | cần xác nhận |
| G03 | Giỏ hàng | Không có nút +/- số lượng | FR-07 · H3 | `Cart.jsx:47` | | proposal | | cần xác nhận |
| G04 | Giỏ hàng | Nút "Tiến hành thanh toán" màu xanh lá (đặc tả: xanh dương) | FR-21 · H4 | `Cart.jsx:71` | | proposal | | cần xác nhận |
| G05 | Giỏ hàng / Checkout | Tiêu đề dùng `<h2>`, không có `<h1>` | FR-21 | `Cart.jsx:31`, `Checkout.jsx:80` | | proposal | | cần xác nhận |
| G06 | Checkout | Ô "Tổng tiền thanh toán" sửa được | FR-08 · H5 | `Checkout.jsx:92-93` | | proposal | | cần xác nhận |
| G07 | Header | Nút "Thoát" thay vì "Đăng xuất" | FR-23 · H4 | `App.jsx:23,29` | | proposal | | cần xác nhận |
| G08 | Header | Link Giỏ hàng không có badge số lượng | FR-23 · H1 | `App.jsx` | | proposal | | cần xác nhận |
| G09 | Header | Không highlight trang hiện tại | FR-23 · H1 | `App.jsx` | | proposal | | cần xác nhận |
| G10 | Chi tiết sản phẩm | Nút "Thêm vào giỏ" phải bấm 2 lần mới ăn | H1 | `ProductDetail.jsx` / `CartContext.jsx` | | proposal | | cần xác nhận |
