# Đánh giá heuristic thủ công (độc lập) — Quang

- Ngày: 2026-10-15
- Bộ ảnh: Checkout / Cart trên EShop (localhost) — xem `evidence/gui-bugs/20261015-*.png`
- Làm **trước** khi xem output AI Reviewer

| # | Trang | Heuristic | Severity (0–4) | Mô tả | Evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | Cart | H3 User control and freedom | 3 | Xóa item không có xác nhận / Undo | `20261015-cart-xoa-khong-xac-nhan.png` |
| 2 | Cart | H4 Consistency and standards | 2 | Nhãn "Tổng tạm tính" ≠ "Tổng cộng"; nút primary xanh lá | `20261015-cart-tong-tam-tinh-va-nut-xanh-la.png` |
| 3 | Cart | H3 / H7 | 2 | Không có +/- số lượng | `20261015-cart-thieu-nut-cong-tru.png` |
| 4 | Checkout | H5 Error prevention | 3 | Ô tổng tiền sửa được → dễ đặt sai số tiền | `20261015-checkout-tong-tien-sua-duoc.png` |
| 5 | Header | H1 Visibility of system status | 2 | Không badge giỏ; không highlight trang hiện tại | `20261015-header-thoat-thieu-badge.png` |
| 6 | Header | H4 Consistency | 1 | "Thoát" thay vì "Đăng xuất" | `20261015-header-thoat-thieu-badge.png` |
| 7 | Product | H1 Visibility of system status | 3 | Thêm giỏ phải bấm 2 lần; thiếu toast/badge | `20261015-product-them-vao-gio-lan-1.png` |
| 8 | Login | H4 Consistency | 3 | Tiêu đề "Đăng Ký", nút "Sign In", mật khẩu hiện rõ | `20261015-login-sai-tieu-de-va-type.png` |
| 9 | Cart/Checkout | (FR-21 / cấu trúc) | 2 | Không có `<h1>` | `20261015-cart-thieu-h1.png` |

Ghi chú: severity tự chấm; sẽ đối chiếu với Phúc/Quân và với AI ở bước sau.
