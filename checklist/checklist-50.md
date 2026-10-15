# Checklist 50 câu — kết quả trên EShop

- Người thực hiện: Quang · Ngày chạy: **2026-10-16** (bắt đầu; chưa đủ 50) · Phiên bản SUT: commit `1cd0c0f`
- Luồng: Home → Product → Cart → Checkout (+ Login khi cần)
- Kết quả tạm (đã chấm): Pass 4 / Fail 14 / N/A 0 · Chưa chạy: 32
- Tự động hóa (sơ bộ trên câu đã chấm): Tự động 10 / Bán tự động 4 / Thủ công 4

Nguồn câu hỏi: đặc tả FR-21…24 EShop + checklist control (text box, button, link, feedback) trong tài liệu môn / `guichecklist.pdf` (rút gọn cho web).

| # | Câu hỏi | Nhóm control | Trang | Kết quả (Pass/Fail/N/A) | Ảnh | FR / Heuristic | Tự động hóa | Ghi chú |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Mỗi trang có đúng 1 thẻ `<h1>` | Tiêu đề | Cart | Fail | `evidence/checklist/20261015-fail-mot-h1.png` | FR-21 | Tự động | h1=0, dùng h2 |
| 2 | Mỗi trang có đúng 1 thẻ `<h1>` | Tiêu đề | Checkout | Fail | `evidence/checklist/20261015-fail-tong-tien-readonly.png` | FR-21 | Tự động | h1=0, dùng h2 |
| 3 | Ngôn ngữ giao diện nhất quán tiếng Việt | Nhãn | Login | Fail | `evidence/checklist/20261015-fail-login-label-type.png` | FR-21 · H4 | Thủ công | "Username", "Sign In", tiêu đề "Đăng Ký" |
| 4 | Nút hành động tích cực dùng màu xanh dương | Button | Cart | Fail | `evidence/checklist/20261015-fail-nhan-tong-cong.png` | FR-21 · H4 | Tự động | "Tiến hành thanh toán" xanh lá (`bg-green-500`) |
| 5 | Đơn vị tiền dùng `₫` và phân cách hàng nghìn | Nhãn | Cart | Pass | — | FR-21 | Tự động | Hiển thị dạng `… ₫` |
| 6 | Tab order đi trên→dưới, trái→phải | Focus | Login | | | FR-21 | Bán tự động | Chưa đo chi tiết tuần này |
| 7 | Trường bắt buộc có dấu `*` bên nhãn | Text box | Login | Fail | `evidence/checklist/20261015-fail-login-label-type.png` | FR-22 | Tự động | Không thấy `*` |
| 8 | Trường email dùng `type="email"` | Text box | Login | Fail | `evidence/checklist/20261015-fail-login-label-type.png` | FR-22 | Tự động | `type="text"` |
| 9 | Trường mật khẩu dùng `type="password"` | Text box | Login | Fail | `evidence/checklist/20261015-fail-login-label-type.png` | FR-22 | Tự động | `type="text"` (hiện rõ) |
| 10 | Thông báo lỗi form xuất hiện **trên** nút submit | Feedback | Login | Fail | `evidence/checklist/20261015-fail-login-label-type.png` | FR-22 · H9 | Bán tự động | Lỗi render dưới nút (`mt-4` sau button) |
| 11 | Form ≥2 bước có Step Indicator | Navigation | Checkout | Fail | `evidence/checklist/20261015-fail-tong-tien-readonly.png` | FR-22 · H1 | Thủ công | Không có step indicator |
| 12 | Navbar highlight trang đang chọn | Navigation | Cart | Fail | `evidence/checklist/20261015-fail-header-nav.png` | FR-23 · H1 | Tự động | Link không đổi style khi active |
| 13 | Link Giỏ hàng có badge số lượng | Navigation | Header | Fail | `evidence/checklist/20261015-fail-header-nav.png` | FR-23 · H1 | Tự động | Chỉ text "Giỏ hàng" |
| 14 | Nút đăng xuất nhãn "Đăng xuất" | Button | Header | Fail | `evidence/checklist/20261015-fail-header-nav.png` | FR-23 · H4 | Tự động | Nhãn "Thoát" |
| 15 | Có breadcrumb ở trang con (Cart/Checkout/Product) | Navigation | Cart | Fail | `evidence/checklist/20261015-fail-mot-h1.png` | FR-23 | Thủ công | Không thấy breadcrumb |
| 16 | Sau "Thêm vào giỏ" có phản hồi trực quan (toast/badge) | Feedback | Product | Fail | `evidence/gui-bugs/20261015-product-them-vao-gio-lan-2.png` | FR-24 · H1 | Bán tự động | Không toast; không badge |
| 17 | Xóa item khỏi giỏ có dialog xác nhận | Dialog | Cart | Fail | `evidence/checklist/20261015-fail-xoa-khong-dialog.png` | FR-24 · H3,H5 | Tự động | Xóa ngay, sawDialog=false |
| 18 | Empty state giỏ trống có icon/message thân thiện | Empty state | Cart | Pass | — | FR-24 | Thủ công | Có message + link mua tiếp (thiếu icon — tạm Pass message) |
| 19 | Ảnh sản phẩm có `alt` không rỗng | Image | Home | | | FR-24 | Tự động | Để đo khi chạy Demo 3 |
| 20 | Nhãn tổng giỏ là "Tổng cộng" | Nhãn | Cart | Fail | `evidence/checklist/20261015-fail-nhan-tong-cong.png` | FR-07 · H4 | Tự động | Đang là "Tổng tạm tính" |
| 21 | Có nút +/- để đổi số lượng trong giỏ | Button | Cart | Fail | `evidence/checklist/20261015-fail-thieu-cong-tru.png` | FR-07 · H3 | Tự động | Chỉ hiện số |
| 22 | Ô tổng tiền Checkout không cho sửa (readonly/disabled) | Text box | Checkout | Fail | `evidence/checklist/20261015-fail-tong-tien-readonly.png` | FR-08 · H5 | Tự động | `type=number`, sửa được |
| 23 | Nút primary/secondary phân biệt rõ | Button | Cart | Pass | — | Button | Thủ công | Primary vs link "Mua tiếp" khác style |
| 24 | Nút nguy hiểm (Xóa) dùng màu đỏ / cảnh báo | Button | Cart | Pass | — | FR-21 | Tự động | `text-red-500` |
| 25 | Placeholder ô mã giảm giá rõ ràng | Text box | Checkout | | | Text box | Thủ công | |
| 26 | Nút "Áp dụng" mã disabled khi ô trống | Button | Checkout | | | Button | Tự động | |
| 27 | Con trỏ I-beam khi hover ô nhập | Text box | Login | | | Text box | Thủ công | |
| 28 | Không gõ tràn / có maxlength hợp lý | Text box | Login | | | Text box | Bán tự động | |
| 29 | Link "Quên mật khẩu?" dẫn đúng trang | Link | Login | | | Link | Tự động | |
| 30 | Trang 404 thân thiện (không raw dump) | Error page | N/A URL | | | Link | Bán tự động | |
| 31 | Focus ring / trạng thái focus nhìn thấy được | Focus | Login | | | Focus | Thủ công | |
| 32 | Nút submit kích hoạt bằng Enter trong form | Button | Login | | | Button | Bán tự động | |
| 33 | Label gắn với control (click label focus input) | Text box | Login | | | Text box | Tự động | |
| 34 | Giá hiển thị nhất quán mọi trang | Nhãn | Home/Cart | | | FR-21 | Tự động | |
| 35 | Không double-submit / có loading khi đang gửi | Button | Checkout | | | Button · H1 | Bán tự động | |
| 36 | Dialog (nếu có) có nút Hủy / Esc | Dialog | Cart | N/A | — | Dialog | — | Chưa có dialog để chấm — ghi Fail ở #17 |
| 37 | Checkbox/radio (nếu có) bấm label cũng đổi state | Check box | — | | | Check box | Thủ công | |
| 38 | Dropdown (nếu có) mở/đóng bằng chuột | Dropdown | — | | | Dropdown | Thủ công | |
| 39 | Thứ tự Tab bỏ qua control disabled | Focus | Checkout | | | FR-21 | Bán tự động | |
| 40 | Tiêu đề / caption cửa sổ hoặc `<title>` có ý nghĩa | Window | Mọi trang | | | Aesthetic | Tự động | Hiện `frontend-web` |
| 41 | Căn lề nhãn / ô nhập thẳng hàng | Aesthetic | Login | | | Aesthetic | Thủ công | |
| 42 | Màu nền / chữ đủ tương phản | Aesthetic | Header | | | a11y | Bán tự động | axe sau |
| 43 | Ảnh decorative vs informative phân biệt (alt) | Image | Home | | | FR-24 | Tự động | |
| 44 | Thông báo lỗi chính tả / dễ hiểu | Feedback | Login | | | H9 | Thủ công | |
| 45 | Không che control bằng overlay trong suốt | Layout | Home | | | Button | Thủ công | |
| 46 | Responsive: layout không vỡ ở 375px | Layout | Home | | | Visual | Tự động | Demo 3 |
| 47 | Responsive: layout không vỡ ở 768px | Layout | Cart | | | Visual | Tự động | Demo 3 |
| 48 | Responsive: layout ổn ở 1440px | Layout | Checkout | | | Visual | Tự động | Demo 3 |
| 49 | "Thêm vào giỏ" phản hồi đúng sau 1 lần bấm | Button | Product | Fail | `evidence/gui-bugs/20261015-product-them-vao-gio-lan-1.png` | H1 · G10 | Bán tự động | Cần 2 lần bấm |
| 50 | Checkpoint visual: screenshot Cart khớp baseline mong đợi | Visual | Cart | | | Visual | Tự động | Baseline tạo ở Demo 3 |

## Việc còn lại (tuần 18–20/10 — không làm trong commit tuần trước)
- Chấm nốt cột trống (#6, #19, #25–#48, #50).
- Phân loại lại toàn bộ 50 câu + đưa câu "Tự động" vào `tests/playwright/data/`.
- Slide tóm tắt Pass/Fail → `content/03-checklist.md`.
