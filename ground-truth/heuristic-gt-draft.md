# Ground truth heuristic — BẢN ĐÃ DUYỆT (Chốt)

> **Nguồn gốc:** bản nháp do AI (Claude) soạn ngày 2026-10-26, chỉ dựa trên 10 ảnh chụp
> `ground-truth/shots/*.png` (sao từ `ai-reviewer/out/run-1/shots/` lúc chốt, vì thư mục `out/` không được commit) (5 trang × 2 viewport; ảnh của run-1, run-2, run-3 giống hệt nhau từng byte)
> và 10 heuristic Nielsen. 
> **Trạng thái:** Đã hoàn thành duyệt bởi cả 3 thành viên (2026-10-26):
> - **Quân:** đồng ý 27/28, bác U04.
> - **TV2 (Quang):** đồng ý 28/28 theo đề xuất của AI.
> - **TV3 (Phúc):** đồng ý 28/28 theo đề xuất của AI.
> - **Kết quả chốt:** Cả 28/28 lỗi đều được thông qua (≥ 2/3 người đồng ý). Severity chốt lấy theo trung vị 3 người.
> Người soạn đã từng thấy kết quả AI Reviewer cũ (N01–N10), nên bản nháp không hoàn toàn độc lập — ghi vào phần giới hạn.
> Phải khai trong `AI_DISCLOSURE.md` trước khi dùng.

## Cách duyệt (mỗi người làm riêng, chưa xem cột của người khác)

1. Mở ảnh tương ứng trong `ground-truth/shots/`.
2. Với mỗi dòng, ghi vào cột của mình:
   - `Đ` = đồng ý đây là vấn đề usability thật, nhìn thấy được trên ảnh
   - `K` = không đồng ý (ghi lý do ngắn ở cột Ghi chú duyệt)
   - `S` = đồng ý nhưng sửa mô tả / heuristic
3. Ghi trong ô của mình theo dạng `quyết định/severity`, ví dụ `Đ/2`, `K`, `S/3`. Severity là số **của mình** (0–4), không chép số đề xuất.
4. Lỗi bạn thấy mà bảng thiếu → thêm dòng mới ở mục "Lỗi người duyệt thêm".
5. **Chốt:** giữ dòng có ≥ 2/3 người `Đ` hoặc `S`. Severity chốt = trung vị 3 người.
6. Commit bản đã chốt **trước** khi chạy lại AI Reviewer. Sau đó không sửa nữa.

### Chấm severity cho người không chuyên

Hỏi 3 câu: **Nhiều người gặp không?** · **Gặp rồi có tự vượt qua được không?** · **Lần nào cũng gặp hay chỉ lần đầu?**

| Sev | Khi nào chọn |
| --- | --- |
| 0 | Không phải vấn đề usability |
| 1 | Chỉ thẩm mỹ, không cản trở gì — sửa khi rảnh |
| 2 | Gây khựng/nhầm nhẹ nhưng tự vượt qua được |
| 3 | Dễ gây sai lầm thật (mất dữ liệu, sai tiền, bỏ cuộc) hoặc ai cũng vấp |
| 4 | Không thể hoàn thành nhiệm vụ / hậu quả nghiêm trọng |

## Bảng lỗi đề xuất (28 dòng)

Cột **G** = trùng lỗi nào trong `bugs.md` (nếu có). Cột **Độ chắc**: `cao` = thấy rõ trên ảnh · `vừa` = có thể tranh luận · `thấp` = cần kiểm tra trên site thật.

| ID | Trang · viewport | H | Phần tử | Vấn đề nhìn thấy trên ảnh | Sev đề xuất | G | Độ chắc | Quân | TV2 (Quang) | TV3 (Phúc) | Sev chốt | Ghi chú duyệt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| U01 | Header · mọi trang · cả hai | H1 | Link "Giỏ hàng" | Không có số lượng/badge, không biết giỏ đang có gì nếu không bấm vào | 2 | G08 | cao | Đ/2 | Đ/2 | Đ/2 | 2 | |
| U02 | Header · home, product · cả hai | H1 | Thanh điều hướng | Không có dấu hiệu trang hiện tại; gạch chân thấy trên ảnh login/cart chỉ là hover của chuột (Quân đã kiểm tra trên site) | 1 | G09 | cao | Đ/1 | Đ/1 | Đ/1 | 1 | Quân: đã kiểm tra, gạch chân là hover |
| U03 | Header · checkout · cả hai | H2, H4 | Nút "Thoát" | Dùng "Thoát" (cảm giác đóng ứng dụng) thay cho "Đăng xuất"; lại là nút đỏ đặc, nổi nhất thanh header dù không phải hành động chính | 1 | G07 | vừa | Đ/1 | Đ/1 | Đ/1 | 1 | |
| U04 | Header · checkout · mobile | H8 | Logo "EShop" + "Giỏ hàng" | Logo dính sát chữ "Giỏ hàng" (đọc thành "EShopGiỏ hàng"), header chật | 1 | — | cao | K | Đ/1 | Đ/1 | 1 | Quân: khoảng cách logo – "Giỏ hàng" vẫn đủ đọc; Quang & Phúc: đồng ý với AI (chốt giữ theo 2/3) |
| U05 | Mọi trang có giá · cả hai | H4 | Định dạng tiền | Không thống nhất: home "30,000,000 VND", product/cart "30,000,000 đ", ô checkout "30000000" không phân cách; dùng dấu phẩy thay vì dấu chấm theo thói quen VN | 2 | — | cao | Đ/2 | Đ/2 | Đ/2 | 2 | |
| U06 | Home, product, cart · cả hai | H2 | Giá tiền | Mọi giá đều tô đỏ — đỏ thường mang nghĩa lỗi/cảnh báo/giảm giá, dễ hiểu nhầm | 1 | — | vừa | Đ/1 | Đ/1 | Đ/1 | 1 | |
| U07 | Home · mobile | H8 | Tiêu đề "Danh sách sản phẩm" | Tiêu đề bị ép chung hàng với ô tìm kiếm, gãy thành 4 dòng | 1 | — | cao | Đ/1 | Đ/1 | Đ/1 | 1 | |
| U08 | Home · cả hai | H8 | "Hiển thị 5 sản phẩm" | Chữ xám nhạt trên nền xám rất nhạt, tương phản thấp | 1 | — | vừa | Đ/1 | Đ/1 | Đ/1 | 1 | |
| U09 | Product vs Home · cả hai | H4 | Nút thêm giỏ | Cùng một hành động nhưng home là nút xanh dương "Thêm vào giỏ", trang chi tiết là nút xanh lá "Thêm vào giỏ hàng" — khác màu, khác chữ | 2 | — | cao | Đ/2 | Đ/2 | Đ/2 | 2 | |
| U10 | Product · desktop | H8 | Khối thông tin sản phẩm | Mô tả chỉ 1 dòng, khoảng trống lớn đẩy "Số lượng" và nút thêm giỏ xuống xa tiêu đề/giá | 1 | — | vừa | Đ/1 | Đ/1 | Đ/1 | 1 | |
| U11 | Product · cả hai | H3 | Điều hướng | Không có breadcrumb hay nút quay lại danh sách; chỉ còn logo/nút Back của trình duyệt | 1 | — | vừa | Đ/1 | Đ/1 | Đ/1 | 1 | |
| U12 | Product · cả hai | H7 | Ô "Số lượng" | Ô nhập trơn, không thấy nút +/- để chỉnh nhanh | 1 | — | vừa | Đ/1 | Đ/1 | Đ/1 | 1 | |
| U13 | Login · cả hai | H4 | Tiêu đề form | Trang đăng nhập (nav đang ở "Đăng nhập", nút "Sign In") nhưng tiêu đề ghi "Đăng Ký" | 3 | G11 | cao | Đ/3 | Đ/3 | Đ/3 | 3 | |
| U14 | Login · cả hai | H4 | Nhãn "Username", nút "Sign In" | Trộn tiếng Anh vào giao diện tiếng Việt ("Mật khẩu", "Quên mật khẩu?" lại là tiếng Việt) | 2 | G11 | cao | Đ/2 | Đ/2 | Đ/2 | 2 | |
| U15 | Cart · cả hai | H3 | Cột "Số lượng" | Số lượng là chữ tĩnh, không sửa được; muốn đổi phải xóa rồi thêm lại | 2 | G03 | cao | Đ/2 | Đ/2 | Đ/2 | 2 | |
| U16 | Cart · cả hai | H5 | Liên kết "Xóa" | Hành động xóa chỉ là chữ đỏ nhỏ sát dòng dữ liệu, không biểu tượng, dễ bấm nhầm (ảnh tĩnh không cho biết có hỏi lại hay không) | 1 | — | vừa | Đ/1 | Đ/1 | Đ/1 | 1 | Quân: đã thử trên site, bấm Xóa không có xác nhận (G02 có thật, nhưng phần "không hỏi lại" vẫn ngoài phạm vi ảnh) |
| U17 | Cart · cả hai | H2 | Nhãn "Tổng tạm tính" | Đây là tổng duy nhất trên trang nhưng ghi "tạm tính" — người dùng không biết còn phí nào nữa không | 1 | G01 | vừa | Đ/1 | Đ/1 | Đ/1 | 1 | |
| U18 | Cart, checkout · cả hai | H4 | Nút hành động chính | "Tiến hành thanh toán" và "Xác Nhận Thanh Toán" màu xanh lá, trong khi các nút chính khác (Tìm, Thêm vào giỏ, Sign In) đều xanh dương | 2 | G04 | cao | Đ/2 | Đ/2 | Đ/2 | 2 | |
| U19 | Cart · cả hai | H8 | Nút "← Mua tiếp" | Chữ xám nhạt, viền mờ, trông như nút bị vô hiệu | 1 | — | vừa | Đ/1 | Đ/1 | Đ/1 | 1 | |
| U20 | Cart · cả hai | H6 | Dòng sản phẩm | Chỉ có tên, không ảnh thu nhỏ hay thuộc tính — phải tự nhớ đã chọn gì | 1 | — | vừa | Đ/1 | Đ/1 | Đ/1 | 1 | |
| U21 | Cart · mobile | H8 | Bảng giỏ hàng + nút | Bảng 5 cột bị ép: tên SP 3 dòng, "30,000,000 / đ" gãy dòng, tiêu đề cột gãy chữ; hai nút cuối gãy 3–4 dòng | 2 | — | cao | Đ/2 | Đ/2 | Đ/2 | 2 | |
| U22 | Checkout · cả hai | H5 | Ô "Tổng tiền thanh toán (VND)" | Tổng tiền phải trả nằm trong ô nhập liệu trông như sửa được | 3 | G06 | cao | Đ/3 | Đ/3 | Đ/3 | 3 | |
| U23 | Checkout · cả hai | H4, H8 | Hai chỗ hiện tổng | Tổng hiện 2 lần, 2 định dạng ("30000000" trong ô và "Tổng thanh toán: 30,000,000 đ"), không rõ số nào là số cuối | 2 | — | cao | Đ/2 | Đ/2 | Đ/2 | 2 | |
| U24 | Checkout · cả hai | H8, H1 | Nút "Áp dụng" | Cam nhạt chữ trắng, tương phản thấp, trông như đang bị vô hiệu; trên mobile gãy 2 dòng | 2 | — | cao | Đ/2 | Đ/2 | Đ/2 | 2 | |
| U25 | Checkout · cả hai | H3 | Khung xác nhận | Không có nút quay lại giỏ / hủy ngay trong khung (chỉ còn link "Giỏ hàng" trên header) | 1 | — | vừa | Đ/1 | Đ/1 | Đ/1 | 1 | |
| U26 | Checkout · cả hai | H6 | Khung xác nhận | Bấm "Xác Nhận Thanh Toán" mà không thấy địa chỉ giao hàng, người nhận, phương thức thanh toán để kiểm tra lại | 2 | — | vừa | Đ/2 | Đ/2 | Đ/2 | 2 | |
| U27 | Checkout, cart · cả hai | H4 | Kiểu viết hoa | Lẫn lộn Title Case ("Xác Nhận Đơn Hàng", "Mã Giảm Giá", "Giỏ Hàng") với viết hoa đầu câu ("Danh sách sản phẩm", "Tiến hành thanh toán") | 1 | — | vừa | Đ/1 | Đ/1 | Đ/1 | 1 | |
| U28 | Checkout · cả hai | H4 | Ô mã giảm giá | Placeholder viết hoa toàn bộ "NHẬP MÃ GIẢM GIÁ..." khác hẳn các ô khác; trên mobile bị cắt chữ | 1 | — | vừa | Đ/1 | Đ/1 | Đ/1 | 1 | |

## Lỗi người duyệt thêm

| ID | Trang · viewport | H | Phần tử | Vấn đề | Người thêm | Quân | TV2 (Quang) | TV3 (Phúc) | Sev chốt |
|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | |

## Đã cân nhắc nhưng không đưa vào

- **Ảnh sản phẩm là khung xám có chữ** — dữ liệu mẫu của SUT, không phải lỗi giao diện.
- **Trang login không có dấu * cho trường bắt buộc** — đây là yêu cầu đặc tả FR-22, với form 2 ô thì heuristic không coi là vấn đề rõ.
- **Chữ "Chào, Test User" màu vàng trên nền xanh** — tương phản chấp nhận được trên ảnh.

## Ngoài phạm vi ảnh tĩnh (không tính vào ground truth heuristic)

Các lỗi này vẫn nằm trong `bugs.md` để chấm Playwright/checklist, nhưng **không thể thấy trên 10 ảnh**:

| G | Vì sao không thấy |
|---|---|
| G02 Xóa không hỏi lại | Phải bấm "Xóa" mới biết có dialog hay không |
| G05 Không có `<h1>` | Nằm trong HTML; trên ảnh tiêu đề vẫn trông như tiêu đề |
| G10 Thêm giỏ phải bấm 2 lần | Phải thao tác mới thấy |
| G11 (phần mật khẩu `type="text"`) | Ô mật khẩu trên ảnh đang trống |

## Đối chiếu nhanh với `bugs.md`

8/11 lỗi G có mặt ở dạng heuristic (G01, G03, G04, G06, G07, G08, G09, G11). 20 dòng còn lại là vấn đề chỉ nhìn được bằng heuristic, không có trong đặc tả.
