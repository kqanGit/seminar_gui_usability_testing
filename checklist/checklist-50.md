# Checklist 50 câu — kết quả trên EShop

- Người thực hiện: Quang · Ngày chạy: **2026-10-15** (bắt đầu) · cập nhật **2026-10-23** (Demo 3) · SUT: commit `867b8d9` (init trên `main`)
- Luồng: Home → Product → Cart → Checkout (+ Login khi cần)
- Kết quả: **Pass 12 / Fail 28 / N/A 10**
- Tự động hóa: Tự động 22 / Bán tự động 12 / Thủ công 16

Nguồn: đặc tả FR-21…24 EShop + checklist control môn / `guichecklist.pdf` (rút gọn web).

| # | Câu hỏi | Nhóm control | Trang | Kết quả (Pass/Fail/N/A) | Ảnh | FR / Heuristic | Tự động hóa | Ghi chú |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Mỗi trang có đúng 1 thẻ `<h1>` | Tiêu đề | Cart | Fail | `evidence/checklist/20261015-fail-mot-h1.png` | FR-21 | Tự động | h1=0, dùng h2 — Demo 3 confirm |
| 2 | Mỗi trang có đúng 1 thẻ `<h1>` | Tiêu đề | Checkout | Fail | `evidence/checklist/20261015-fail-tong-tien-readonly.png` | FR-21 | Tự động | h1=0 |
| 3 | Ngôn ngữ giao diện nhất quán tiếng Việt | Nhãn | Login | Fail | `evidence/checklist/20261015-fail-login-label-type.png` | FR-21 · H4 | Thủ công | "Username", "Sign In", tiêu đề "Đăng Ký" |
| 4 | Nút hành động tích cực dùng màu xanh dương | Button | Cart | Fail | `evidence/checklist/20261015-fail-nhan-tong-cong.png` | FR-21 · H4 | Tự động | "Tiến hành thanh toán" xanh lá |
| 5 | Đơn vị tiền dùng `₫` và phân cách hàng nghìn | Nhãn | Cart | Pass | — | FR-21 | Tự động | Dạng `… ₫` |
| 6 | Tab order đi trên→dưới, trái→phải | Focus | Login | Pass | — | FR-21 | Bán tự động | Tab Email → Password → Sign In (đo tay) |
| 7 | Trường bắt buộc có dấu `*` bên nhãn | Text box | Login | Fail | `evidence/checklist/20261015-fail-login-label-type.png` | FR-22 | Tự động | Không thấy `*` |
| 8 | Trường email dùng `type="email"` | Text box | Login | Fail | `evidence/checklist/20261015-fail-login-label-type.png` | FR-22 | Tự động | `type="text"` |
| 9 | Trường mật khẩu dùng `type="password"` | Text box | Login | Fail | `evidence/checklist/20261015-fail-login-label-type.png` | FR-22 | Tự động | `type="text"` |
| 10 | Thông báo lỗi form xuất hiện **trên** nút submit | Feedback | Login | Fail | `evidence/checklist/20261015-fail-login-label-type.png` | FR-22 · H9 | Bán tự động | Lỗi dưới nút |
| 11 | Form ≥2 bước có Step Indicator | Navigation | Checkout | Fail | `evidence/checklist/20261015-fail-tong-tien-readonly.png` | FR-22 · H1 | Thủ công | Không có |
| 12 | Navbar highlight trang đang chọn | Navigation | Cart | Fail | `evidence/checklist/20261015-fail-header-nav.png` | FR-23 · H1 | Tự động | Không đổi style active |
| 13 | Link Giỏ hàng có badge số lượng | Navigation | Header | Fail | `evidence/checklist/20261015-fail-header-nav.png` | FR-23 · H1 | Tự động | Chỉ text |
| 14 | Nút đăng xuất nhãn "Đăng xuất" | Button | Header | Fail | `evidence/checklist/20261015-fail-header-nav.png` | FR-23 · H4 | Tự động | "Thoát" |
| 15 | Có breadcrumb ở trang con | Navigation | Cart | Fail | `evidence/checklist/20261015-fail-mot-h1.png` | FR-23 | Thủ công | Không có |
| 16 | Sau "Thêm vào giỏ" có phản hồi trực quan | Feedback | Product | Fail | `evidence/gui-bugs/20261015-product-them-vao-gio-lan-2.png` | FR-24 · H1 | Bán tự động | Không toast/badge |
| 17 | Xóa item có dialog xác nhận | Dialog | Cart | Fail | `evidence/checklist/20261015-fail-xoa-khong-dialog.png` | FR-24 · H3,H5 | Tự động | Xóa ngay |
| 18 | Empty state giỏ trống thân thiện | Empty state | Cart | Pass | — | FR-24 | Thủ công | Có message + link |
| 19 | Ảnh sản phẩm có `alt` không rỗng | Image | Home | Pass | — | FR-24 | Tự động | Demo 3: Home không fail C2 alt |
| 20 | Nhãn tổng giỏ là "Tổng cộng" | Nhãn | Cart | Fail | `evidence/checklist/20261015-fail-nhan-tong-cong.png` | FR-07 · H4 | Tự động | "Tổng tạm tính" |
| 21 | Có nút +/- đổi số lượng | Button | Cart | Fail | `evidence/checklist/20261015-fail-thieu-cong-tru.png` | FR-07 · H3 | Tự động | Chỉ hiện số |
| 22 | Ô tổng tiền Checkout readonly/disabled | Text box | Checkout | Fail | `evidence/checklist/20261015-fail-tong-tien-readonly.png` | FR-08 · H5 | Tự động | Sửa được |
| 23 | Nút primary/secondary phân biệt rõ | Button | Cart | Pass | — | Button | Thủ công | Khác style |
| 24 | Nút nguy hiểm (Xóa) màu đỏ / cảnh báo | Button | Cart | Pass | — | FR-21 | Tự động | `text-red-500` |
| 25 | Placeholder ô mã giảm giá rõ ràng | Text box | Checkout | Pass | — | Text box | Thủ công | Có placeholder |
| 26 | Nút "Áp dụng" disabled khi ô trống | Button | Checkout | Fail | — | Button | Tự động | Vẫn bấm được khi trống |
| 27 | Con trỏ I-beam khi hover ô nhập | Text box | Login | Pass | — | Text box | Thủ công | Cursor text mặc định |
| 28 | Không gõ tràn / maxlength hợp lý | Text box | Login | Fail | — | Text box | Bán tự động | Không maxlength rõ |
| 29 | Link "Quên mật khẩu?" dẫn đúng trang | Link | Login | Pass | — | Link | Tự động | → `/forgot-password` |
| 30 | Trang 404 thân thiện | Error page | URL lạ | Fail | — | Link | Bán tự động | React Router trắng / không trang 404 riêng |
| 31 | Focus ring nhìn thấy được | Focus | Login | Pass | — | Focus | Thủ công | Outline trình duyệt |
| 32 | Submit bằng Enter trong form | Button | Login | Pass | — | Button | Bán tự động | Enter gửi form |
| 33 | Label gắn với control | Text box | Login | Fail | — | Text box | Tự động | Không `htmlFor` / click nhãn không focus |
| 34 | Giá hiển thị nhất quán mọi trang | Nhãn | Home/Cart | Pass | — | FR-21 | Tự động | Cùng format ₫ |
| 35 | Không double-submit / có loading | Button | Checkout | Fail | — | Button · H1 | Bán tự động | Không disable/loading rõ |
| 36 | Dialog có nút Hủy / Esc | Dialog | Cart | N/A | — | Dialog | — | Không có dialog (#17 Fail) |
| 37 | Checkbox/radio bấm label đổi state | Check box | — | N/A | — | Check box | — | Không dùng trên luồng chính |
| 38 | Dropdown mở/đóng bằng chuột | Dropdown | — | N/A | — | Dropdown | — | Không dùng |
| 39 | Tab bỏ qua control disabled | Focus | Checkout | N/A | — | FR-21 | Bán tự động | Ít control disabled để đo |
| 40 | `<title>` có ý nghĩa | Window | Mọi trang | Fail | — | Aesthetic | Tự động | `frontend-web` |
| 41 | Căn lề nhãn / ô nhập thẳng hàng | Aesthetic | Login | Pass | — | Aesthetic | Thủ công | Cột đơn giản, thẳng |
| 42 | Màu nền / chữ đủ tương phản | Aesthetic | Header | Fail | — | a11y | Bán tự động | Demo 3 axe có violation trên form |
| 43 | Ảnh decorative vs informative (alt) | Image | Home | Pass | — | FR-24 | Tự động | SP có alt; không ảnh deco rõ |
| 44 | Thông báo lỗi chính tả / dễ hiểu | Feedback | Login | Pass | — | H9 | Thủ công | Thông báo ngắn, đọc được |
| 45 | Không che control bằng overlay | Layout | Home | Pass | — | Button | Thủ công | Không overlay |
| 46 | Responsive layout ổn 375px | Layout | Home | Pass | — | Visual | Tự động | Demo 3 baseline mobile |
| 47 | Responsive layout ổn 768px | Layout | Cart | Pass | — | Visual | Tự động | Demo 3 baseline tablet |
| 48 | Responsive layout ổn 1440px | Layout | Checkout | Pass | — | Visual | Tự động | Demo 3 baseline desktop |
| 49 | "Thêm vào giỏ" OK sau 1 lần bấm | Button | Product | Fail | `evidence/gui-bugs/20261015-product-them-vao-gio-lan-1.png` | H1 · G10 | Bán tự động | Cần 2 lần (Product) |
| 50 | Screenshot Cart khớp baseline | Visual | Cart | Pass | Demo 3 snapshots | Visual | Tự động | `cart-*-chromium-darwin.png` đã commit |

## Tóm tắt cho slide

- **Fail đắt giá:** thiếu h1 (#1–2), nhãn Tổng cộng (#20), nút primary xanh lá (#4), login type/label (#3,#7–9), xóa không dialog (#17), G10 hai lần click (#49).
- **Demo 3** tự động hóa #1–2, #19, #42, #46–48, #50.
