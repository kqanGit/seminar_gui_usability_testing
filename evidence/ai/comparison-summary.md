# Người vs AI — kết quả AI Heuristic Reviewer

- Website: EShop SUT · Lần chạy: run-1, run-2, run-3 · Model reviewer: claude-opus-4-6
- Ground truth: 11 lỗi (`ground-truth/bugs.md`)
- Nhãn: subagent `finding-labeler` gán nháp; **người đã duyệt 0/105 dòng**, sửa 0 dòng. **Số liệu dưới đây CHƯA được người duyệt hết.**

| Chỉ số | run-1 | run-2 | run-3 | Gộp 3 lần | Bài CHI 2024 (GPT-4) |
| --- | --- | --- | --- | --- | --- |
| Số phát hiện | 37 | 32 | 36 | 105 | — |
| Precision | 0,73 (27/37) | 0,78 (25/32) | 0,78 (28/36) | 0,76 (TB) | 0,60 (người 0,83) |
| Recall trên 11 lỗi GT | 0,45 (5/11) | 0,45 (5/11) | 0,45 (5/11) | 0,45 (5/11, hợp) | 0,38 (1 chuyên gia 0,34) |
| Chỉ người / cả hai / chỉ AI | 32% / 26% / 42% | 30% / 25% / 45% | 30% / 25% / 45% | 29% / 24% / 48% (6 / 5 / 10 lỗi) | 62% / 29% / 9% |
| Lệch severity TB (so GT) | 0,50 | 0,50 | 1,00 | 0,67 | — |
| Báo nhầm | 10 | 7 | 8 | 25 | — |
| Thời gian chụp → kiểm schema (phút) | 6,8 | 6,6 | 6,0 | 6,5 | — |
| Token | — | — | — | — | — |

Độ ổn định: 13/15 lỗi đúng (GT + mới) xuất hiện ở cả 3 lần chạy.

## Lỗi ground truth AI bỏ sót ở mọi lần chạy

- G01 (Giỏ hàng): Nhãn "Tổng tạm tính" thay vì "Tổng cộng"
- G02 (Giỏ hàng): Bấm "Xóa" xóa ngay, không có dialog xác nhận
- G04 (Giỏ hàng): Nút "Tiến hành thanh toán" màu xanh lá (đặc tả: xanh dương)
- G05 (Giỏ hàng / Checkout): Tiêu đề dùng `<h2>`, không có `<h1>`
- G07 (Header): Nút "Thoát" thay vì "Đăng xuất"
- G10 (Chi tiết sản phẩm): Nút "Thêm vào giỏ" phải bấm 2 lần mới ăn

## Lỗi mới chỉ AI thấy (cần người xác nhận)

- N01 (cart, H8): Bố cục bảng 5 cột bị ép quá hẹp trên màn hình di động khiến các cột chữ và số tiền dính sát nhau, ngắt dòng vụn vặt và rất khó đọc. — xuất hiện ở 3/3 lần
- N02 (checkout, H3): Trang thanh toán không có nút quay lại giỏ hàng hoặc hủy bỏ để người dùng dễ dàng điều chỉnh lại đơn hàng trước khi xác nhận. — xuất hiện ở 3/3 lần
- N03 (product, H3): Trang chi tiết sản phẩm không có thanh điều hướng phân cấp (breadcrumb) hoặc nút quay lại danh sách sản phẩm, khiến người dùng thiếu lối thoát rõ ràng trên giao diện. — xuất hiện ở 3/3 lần
- N04 (checkout, H4): Định dạng số tiền không có dấu phân cách hàng nghìn và không đồng nhất với các vị trí hiển thị giá khác ngay trên cùng màn hình. — xuất hiện ở 3/3 lần
- N05 (checkout, H8): Nút áp dụng mã giảm giá có màu cam nhạt với chữ trắng độ tương phản thấp, làm giảm khả năng nhìn rõ và trông giống như nút đang bị vô hiệu hóa. — xuất hiện ở 3/3 lần
- N06 (home, H8): Tiêu đề trang và thanh tìm kiếm bị đặt chung trên một hàng ngang chật hẹp của màn hình di động khiến tiêu đề bị ép gãy thành 4 dòng rất khó đọc. — xuất hiện ở 3/3 lần
- N07 (login, H5): Trường nhập mật khẩu không có nút ẩn/hiện mật khẩu, khiến người dùng không thể kiểm tra lại các ký tự đã gõ để phòng tránh lỗi nhập sai. — xuất hiện ở 3/3 lần
- N08 (product, H7): Trường chọn số lượng chỉ là một ô nhập đơn giản không có nút cộng/trừ hiển thị trực quan để người dùng điều chỉnh nhanh bằng chuột. — xuất hiện ở 3/3 lần
- N09 (checkout, H8): Thông tin tổng tiền bị lặp lại hai lần trong cùng một khung nhỏ mà không phân biệt rõ đâu là tạm tính (trước mã giảm giá) và đâu là tổng thanh toán cuối cùng. — xuất hiện ở 1/3 lần
- N10 (checkout, H6): Trang xác nhận đơn hàng thiếu hoàn toàn thông tin địa chỉ giao hàng, người nhận và phương thức thanh toán trước khi người dùng bấm nút chốt đơn cuối cùng. — xuất hiện ở 1/3 lần

## Định nghĩa

- Precision = (phát hiện khớp GT + phát hiện là lỗi mới đúng) / tổng phát hiện.
- Recall = số lỗi GT khác nhau được ít nhất một phát hiện trỏ tới / tổng lỗi GT.
- Chỉ người / cả hai / chỉ AI tính trên tập GT + lỗi mới đúng. Nhãn cuối = `human_label` nếu có, ngược lại `ai_label`.
- Mỗi viewport tính là một phát hiện riêng, nên cùng một lỗi trên mobile và desktop được đếm 2 lần trong precision.
