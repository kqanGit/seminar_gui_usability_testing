# Đánh giá heuristic thủ công (độc lập) — Phúc (Vai B)

- **Ngày thực hiện:** 2026-10-16
- **Người đánh giá:** Bửu Huỳnh Vĩnh Phúc (`23120328` — phụ trách Usability Testing)
- **Bộ ảnh đối chiếu:** Luồng Checkout / Cart / Product / Login trên EShop (`evidence/gui-bugs/20261015-*.png`)
- **Nguyên tắc:** Thực hiện **độc lập trước khi xem kết quả của AI Heuristic Reviewer**, dùng thang Severity `0–4` của Jakob Nielsen để làm dữ liệu đối chiếu "Người vs AI".

| # | Trang | Heuristic vi phạm | Severity (0–4) | Mô tả vấn đề dưới góc độ Usability | Evidence |
| :---: | :--- | :--- | :---: | :--- | :--- |
| 1 | Product Detail | **H1** Visibility of system status | **3** | Bấm nút "Thêm vào giỏ" lần đầu không có tác dụng, phải bấm lần thứ 2 mới thêm được sản phẩm; sau khi bấm cũng không có thông báo (toast) xác nhận. Người tham gia rất dễ tưởng trang bị treo hoặc chưa bấm trúng. | `20261015-product-them-vao-gio-lan-1.png`, `20261015-product-them-vao-gio-lan-2.png` |
| 2 | Header (Toàn trang) | **H1** Visibility of system status | **2** | Liên kết "Giỏ hàng" trên thanh điều hướng không có badge hiển thị số lượng mặt hàng hiện có; đồng thời không làm nổi bật (highlight) mục menu của trang đang đứng. | `20261015-header-thoat-thieu-badge.png` |
| 3 | Cart | **H3** User control and freedom · **H5** Error prevention | **3** | Bấm nút "Xóa" sẽ xóa thẳng sản phẩm khỏi giỏ hàng ngay lập tức mà không có hộp thoại xác nhận (confirmation dialog) và không có nút Hoàn tác (Undo). | `20261015-cart-xoa-khong-xac-nhan.png` |
| 4 | Cart | **H3** User control and freedom · **H7** Flexibility and efficiency of use | **2** | Cột số lượng trong giỏ hàng chỉ hiển thị số tĩnh, thiếu nút tăng/giảm (`+`/`-`) hoặc ô nhập số lượng trực tiếp, khiến người dùng muốn mua 2 món phải quay lại trang sản phẩm. | `20261015-cart-thieu-nut-cong-tru.png` |
| 5 | Cart | **H4** Consistency and standards | **2** | Nhãn dòng tổng tiền cuối cùng ghi là "Tổng tạm tính" thay vì "Tổng cộng" theo đặc tả; nút hành động chính "Tiến hành thanh toán" dùng màu xanh lá thay vì màu xanh dương nhất quán của hệ thống. | `20261015-cart-tong-tam-tinh-va-nut-xanh-la.png` |
| 6 | Checkout | **H5** Error prevention | **4** | Ô "Tổng tiền thanh toán" cho phép người dùng tự ý chỉnh sửa giá trị số tiền trước khi bấm đặt hàng (không đặt `readonly`/`disabled`), tiềm ẩn rủi ro sai lệch giao dịch nghiêm trọng. | `20261015-checkout-tong-tien-sua-duoc.png` |
| 7 | Login | **H4** Consistency and standards · **H5** Error prevention | **3** | Trang đăng nhập nhưng tiêu đề lớn lại ghi "Đăng Ký", nhãn "Username" và nút "Sign In" pha trộn tiếng Anh – tiếng Việt thiếu nhất quán; ô mật khẩu để `type="text"` làm lộ rõ ký tự mật khẩu trên màn hình. | `20261015-login-sai-tieu-de-va-type.png` |
| 8 | Header | **H2** Match between system and real world · **H4** Consistency | **1** | Nút đăng xuất tài khoản dùng từ "Thoát" (mang sắc thái đóng ứng dụng desktop) thay vì thuật ngữ web chuẩn là "Đăng xuất". | `20261015-header-thoat-thieu-badge.png` |
| 9 | Cart / Checkout | **H4** Consistency and standards (Cấu trúc phân cấp FR-21) | **1** | Trang Giỏ hàng và Thanh toán sử dụng thẻ `<h2>` làm tiêu đề chính mà thiếu thẻ `<h1>`, làm giảm tính chuẩn mực về phân cấp thị giác và khả năng đọc của trình đọc màn hình. | `20261015-cart-thieu-h1.png` |

### Nhận xét tổng hợp của người đánh giá (Phúc)
- **Các lỗi ảnh hưởng nặng nhất đến hành vi người tham gia trên Maze:** Lỗi **#1 (`G10` — bấm 2 lần mới thêm vào giỏ)** kết hợp với lỗi **#2 (`G08` — thiếu badge giỏ hàng)** sẽ là nguyên nhân chính gây ra **Misclick / Rage Click** ở trang Chi tiết sản phẩm và làm người tham gia đi vòng lại giữa trang Sản phẩm và Giỏ hàng.
- **Điểm khác biệt nhỏ khi chấm độc lập (để thảo luận nhóm):** Ở lỗi ô tổng tiền sửa được (`G06`), tôi chấm **Severity = 4 (Thảm họa khả dụng)** vì liên quan trực tiếp đến bước thanh toán tiền, trong khi ở lỗi thiếu `<h1>` (`G05`), dưới góc nhìn Usability thuần túy người dùng mắt thường ít nhận ra nên tôi chấm **Severity = 1** (còn dưới góc độ đặc tả GUI/a11y là mức 2).
