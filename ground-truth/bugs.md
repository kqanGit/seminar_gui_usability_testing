# Danh sách lỗi đã xác nhận

Severity theo thang Nielsen 0–4. Trạng thái: `cần xác nhận` → `đã xác nhận` (có ảnh).

Xác nhận lần 1: **2026-10-15** · Quang · SUT commit `d876fd4` · localhost:5173.

| ID | Trang | Mô tả lỗi | Đặc tả / heuristic | Vị trí code | Severity | Nguồn | Ảnh | Trạng thái |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| G01 | Giỏ hàng | Nhãn "Tổng tạm tính" thay vì "Tổng cộng" | FR-07 · H4 | `Cart.jsx:63` | 2 | proposal | `evidence/gui-bugs/20261015-cart-tong-tam-tinh-va-nut-xanh-la.png` | đã xác nhận |
| G02 | Giỏ hàng | Bấm "Xóa" xóa ngay, không có dialog xác nhận | FR-07, FR-24 · H3, H5 | `Cart.jsx:50-55` | 3 | proposal | `evidence/gui-bugs/20261015-cart-xoa-khong-xac-nhan.png` (+ `…-xoa-khong-dialog.txt`: before=1 after=0 sawDialog=false) | đã xác nhận |
| G03 | Giỏ hàng | Không có nút +/- số lượng | FR-07 · H3 | `Cart.jsx:47` | 2 | proposal | `evidence/gui-bugs/20261015-cart-thieu-nut-cong-tru.png` | đã xác nhận |
| G04 | Giỏ hàng | Nút "Tiến hành thanh toán" màu xanh lá (đặc tả: xanh dương) | FR-21 · H4 | `Cart.jsx:71` | 2 | proposal | `evidence/gui-bugs/20261015-cart-tong-tam-tinh-va-nut-xanh-la.png` | đã xác nhận |
| G05 | Giỏ hàng / Checkout | Tiêu đề dùng `<h2>`, không có `<h1>` | FR-21 | `Cart.jsx:31`, `Checkout.jsx:80` | 2 | proposal | `evidence/gui-bugs/20261015-cart-thieu-h1.png` (+ `…-cart-h1-count.txt`: cart/checkout h1=0 h2=1) | đã xác nhận |
| G06 | Checkout | Ô "Tổng tiền thanh toán" sửa được | FR-08 · H5 | `Checkout.jsx:92-93` | 3 | proposal | `evidence/gui-bugs/20261015-checkout-tong-tien-sua-duoc.png` (+ `…-checkout-inputs.json`: input number, không disabled/readonly) | đã xác nhận |
| G07 | Header | Nút "Thoát" thay vì "Đăng xuất" | FR-23 · H4 | `App.jsx:29` | 1 | proposal | `evidence/gui-bugs/20261015-header-thoat-thieu-badge.png` | đã xác nhận |
| G08 | Header | Link Giỏ hàng không có badge số lượng | FR-23 · H1 | `App.jsx:23` | 2 | proposal | `evidence/gui-bugs/20261015-header-thoat-thieu-badge.png` | đã xác nhận |
| G09 | Header | Không highlight trang hiện tại | FR-23 · H1 | `App.jsx` | 2 | proposal | `evidence/gui-bugs/20261015-header-thoat-thieu-badge.png` | đã xác nhận |
| G10 | Chi tiết sản phẩm | Nút "Thêm vào giỏ" phải bấm 2 lần mới ăn | H1 | `ProductDetail.jsx` / `CartContext.jsx` | 3 | proposal | `evidence/gui-bugs/20261015-product-them-vao-gio-lan-1.png`, `…-lan-2.png` | đã xác nhận |
| G11 | Login | Tiêu đề trang ghi "Đăng Ký"; nút "Sign In"; nhãn "Username"; mật khẩu `type="text"` | FR-21, FR-22 · H4 | `Login.jsx:24-45` | 3 | phát hiện khi xác nhận | `evidence/gui-bugs/20261015-login-sai-tieu-de-va-type.png` | đã xác nhận |
