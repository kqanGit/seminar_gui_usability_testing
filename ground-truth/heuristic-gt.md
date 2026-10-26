# Ground truth heuristic (chính thức)

- **Phạm vi:** vấn đề usability **nhìn thấy được** trên 10 ảnh `ground-truth/shots/*.png` (sao từ `ai-reviewer/out/run-1/shots/` lúc chốt, vì thư mục `out/` không được commit) (5 trang × 2 viewport), chấm theo 10 heuristic Nielsen, severity 0–4.
- **Cách tạo:** AI (Claude) soạn nháp 28 dòng → 3 thành viên (Quân, Quang, Phúc) duyệt độc lập theo quy tắc ≥ 2/3 đồng ý, severity = trung vị. Quá trình duyệt lưu ở `heuristic-gt-draft.md`.
- **Kết quả duyệt:** giữ 28/28 dòng (U04 có 1 người bác, giữ theo 2/3). Không ai thêm lỗi mới. Severity của cả 3 người trùng severity đề xuất ở 28/28 dòng.
- **Chốt ngày:** 2026-10-26, trước khi chạy lại AI Reviewer. Không sửa file này sau khi đã chạy AI.
- **Dùng cho:** chấm AI Reviewer (precision, recall, lệch severity). Lỗi đặc tả/HTML/tương tác vẫn chấm bằng `bugs.md` (Playwright, checklist).
- Bản máy đọc: `heuristic-gt.json`.

## Giới hạn (ghi trên slide)

- Bản nháp do AI soạn; người soạn đã từng thấy kết quả AI Reviewer cũ → không hoàn toàn độc lập với AI.
- Người duyệt không chuyên UX; severity cả 3 người trùng đề xuất nên chỉ số lệch severity phản ánh AI so với severity do AI đề xuất và nhóm chấp nhận.

## Danh sách

| ID | Trang | Viewport | H | Phần tử | Vấn đề | Sev | Trùng `bugs.md` |
|---|---|---|---|---|---|---|---|
| U01 | mọi trang | cả hai | H1 | Link "Giỏ hàng" | Không có số lượng/badge, không biết giỏ đang có gì nếu không bấm vào | 2 | G08 |
| U02 | mọi trang | cả hai | H1 | Thanh điều hướng | Không có dấu hiệu trang hiện tại; gạch chân thấy trên ảnh login/cart chỉ là hover của chuột (Quân đã kiểm tra trên site) | 1 | G09 |
| U03 | Checkout | cả hai | H2, H4 | Nút "Thoát" | Dùng "Thoát" (cảm giác đóng ứng dụng) thay cho "Đăng xuất"; lại là nút đỏ đặc, nổi nhất thanh header dù không phải hành động chính | 1 | G07 |
| U04 | Checkout | mobile | H8 | Logo "EShop" + "Giỏ hàng" | Logo dính sát chữ "Giỏ hàng" (đọc thành "EShopGiỏ hàng"), header chật | 1 | — |
| U05 | Home, Product, Cart, Checkout | cả hai | H4 | Định dạng tiền | Không thống nhất: home "30,000,000 VND", product/cart "30,000,000 đ", ô checkout "30000000" không phân cách; dùng dấu phẩy thay vì dấu chấm theo thói quen VN | 2 | — |
| U06 | Home, Product, Cart | cả hai | H2 | Giá tiền | Mọi giá đều tô đỏ — đỏ thường mang nghĩa lỗi/cảnh báo/giảm giá, dễ hiểu nhầm | 1 | — |
| U07 | Home | mobile | H8 | Tiêu đề "Danh sách sản phẩm" | Tiêu đề bị ép chung hàng với ô tìm kiếm, gãy thành 4 dòng | 1 | — |
| U08 | Home | cả hai | H8 | "Hiển thị 5 sản phẩm" | Chữ xám nhạt trên nền xám rất nhạt, tương phản thấp | 1 | — |
| U09 | Home, Product | cả hai | H4 | Nút thêm giỏ | Cùng một hành động nhưng home là nút xanh dương "Thêm vào giỏ", trang chi tiết là nút xanh lá "Thêm vào giỏ hàng" — khác màu, khác chữ | 2 | — |
| U10 | Product | desktop | H8 | Khối thông tin sản phẩm | Mô tả chỉ 1 dòng, khoảng trống lớn đẩy "Số lượng" và nút thêm giỏ xuống xa tiêu đề/giá | 1 | — |
| U11 | Product | cả hai | H3 | Điều hướng | Không có breadcrumb hay nút quay lại danh sách; chỉ còn logo/nút Back của trình duyệt | 1 | — |
| U12 | Product | cả hai | H7 | Ô "Số lượng" | Ô nhập trơn, không thấy nút +/- để chỉnh nhanh | 1 | — |
| U13 | Login | cả hai | H4 | Tiêu đề form | Trang đăng nhập (nav đang ở "Đăng nhập", nút "Sign In") nhưng tiêu đề ghi "Đăng Ký" | 3 | G11 |
| U14 | Login | cả hai | H4 | Nhãn "Username", nút "Sign In" | Trộn tiếng Anh vào giao diện tiếng Việt ("Mật khẩu", "Quên mật khẩu?" lại là tiếng Việt) | 2 | G11 |
| U15 | Cart | cả hai | H3 | Cột "Số lượng" | Số lượng là chữ tĩnh, không sửa được; muốn đổi phải xóa rồi thêm lại | 2 | G03 |
| U16 | Cart | cả hai | H5 | Liên kết "Xóa" | Hành động xóa chỉ là chữ đỏ nhỏ sát dòng dữ liệu, không biểu tượng, dễ bấm nhầm (ảnh tĩnh không cho biết có hỏi lại hay không) | 1 | — |
| U17 | Cart | cả hai | H2 | Nhãn "Tổng tạm tính" | Đây là tổng duy nhất trên trang nhưng ghi "tạm tính" — người dùng không biết còn phí nào nữa không | 1 | G01 |
| U18 | Cart, Checkout | cả hai | H4 | Nút hành động chính | "Tiến hành thanh toán" và "Xác Nhận Thanh Toán" màu xanh lá, trong khi các nút chính khác (Tìm, Thêm vào giỏ, Sign In) đều xanh dương | 2 | G04 |
| U19 | Cart | cả hai | H8 | Nút "← Mua tiếp" | Chữ xám nhạt, viền mờ, trông như nút bị vô hiệu | 1 | — |
| U20 | Cart | cả hai | H6 | Dòng sản phẩm | Chỉ có tên, không ảnh thu nhỏ hay thuộc tính — phải tự nhớ đã chọn gì | 1 | — |
| U21 | Cart | mobile | H8 | Bảng giỏ hàng + nút | Bảng 5 cột bị ép: tên SP 3 dòng, "30,000,000 / đ" gãy dòng, tiêu đề cột gãy chữ; hai nút cuối gãy 3–4 dòng | 2 | — |
| U22 | Checkout | cả hai | H5 | Ô "Tổng tiền thanh toán (VND)" | Tổng tiền phải trả nằm trong ô nhập liệu trông như sửa được | 3 | G06 |
| U23 | Checkout | cả hai | H4, H8 | Hai chỗ hiện tổng | Tổng hiện 2 lần, 2 định dạng ("30000000" trong ô và "Tổng thanh toán: 30,000,000 đ"), không rõ số nào là số cuối | 2 | — |
| U24 | Checkout | cả hai | H8, H1 | Nút "Áp dụng" | Cam nhạt chữ trắng, tương phản thấp, trông như đang bị vô hiệu; trên mobile gãy 2 dòng | 2 | — |
| U25 | Checkout | cả hai | H3 | Khung xác nhận | Không có nút quay lại giỏ / hủy ngay trong khung (chỉ còn link "Giỏ hàng" trên header) | 1 | — |
| U26 | Checkout | cả hai | H6 | Khung xác nhận | Bấm "Xác Nhận Thanh Toán" mà không thấy địa chỉ giao hàng, người nhận, phương thức thanh toán để kiểm tra lại | 2 | — |
| U27 | Cart, Checkout | cả hai | H4 | Kiểu viết hoa | Lẫn lộn Title Case ("Xác Nhận Đơn Hàng", "Mã Giảm Giá", "Giỏ Hàng") với viết hoa đầu câu ("Danh sách sản phẩm", "Tiến hành thanh toán") | 1 | — |
| U28 | Checkout | cả hai | H4 | Ô mã giảm giá | Placeholder viết hoa toàn bộ "NHẬP MÃ GIẢM GIÁ..." khác hẳn các ô khác; trên mobile bị cắt chữ | 1 | — |

**Tổng:** 28 vấn đề · severity 3: 2 · 2: 10 · 1: 16 · trùng lỗi G: 9 (G01, G03, G04, G06, G07, G08, G09, G11)

**Theo heuristic:** H1: 3 · H2: 3 · H3: 3 · H4: 9 · H5: 2 · H6: 2 · H7: 1 · H8: 8

## Ngoài phạm vi ảnh tĩnh

G02 (Xóa không hỏi lại — Quân đã xác nhận trên site), G05 (`<h1>`), G10 (bấm 2 lần), phần `type="text"` của G11: chỉ thấy khi thao tác hoặc đọc HTML → không tính vào ground truth này.
