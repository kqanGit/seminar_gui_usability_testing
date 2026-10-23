<!-- Phụ trách: Quang. Bản nháp do Quân soạn (có dùng Claude), Quang review và chỉnh trước khi trình bày. Bản 30 phút: slide chi tiết ở 11-phu-luc. Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">02</p>

## Lý thuyết GUI Testing

- GUI Testing là gì, kiểm tra những gì
- Lỗi giao diện hay nằm ở đâu
- Tự động hóa cái gì, bằng kỹ thuật nào

Note: Thời gian: 2 phút cho cả phần 02 (Quang). Phần này trả lời câu hỏi "giao diện có đúng đặc tả không".

---

## GUI Testing là gì?

- **GUI Testing (kiểm thử giao diện):** kiểm tra giao diện **hiển thị** và **phản hồi** đúng đặc tả trên mọi thành phần nhìn thấy được
- Đối chiếu với: đặc tả giao diện, style guide, **checklist**

| Visuals (hiển thị) | Controls (điều khiển) |
| --- | --- |
| Màu, font, cỡ chữ, bố cục | Ô nhập liệu, nút bấm |
| Chính tả, nhãn, thuật ngữ thống nhất | Dropdown, checkbox, link, menu |
| Định dạng số và tiền | Thông báo lỗi, dialog |

Note: Định nghĩa theo tài liệu môn (GUI, Usability & Compatibility Testing, Part 1). Visuals là "trông có đúng không", controls là "bấm/nhập vào có phản hồi đúng không". Chi tiết từng loại control: Phụ lục.

---

## Lỗi giao diện hay nằm ở đâu?

| Chỗ hay có lỗi | Ví dụ thật trên EShop |
| --- | --- |
| Phản hồi sau thao tác | "Thêm vào giỏ" không có toast, phải bấm 2 lần |
| Hành động nguy hiểm | Bấm "Xóa" là mất luôn, không hỏi lại |
| Ô nhập liệu | Mật khẩu hiện rõ; ô tổng tiền sửa được |
| Tính nhất quán | "Thoát" thay vì "Đăng xuất"; nút thanh toán xanh lá |
| Cấu trúc không nhìn thấy | Trang không có thẻ `<h1>` |

<p class="key">GUI testing khó vì người dùng bấm bất kỳ đâu, theo bất kỳ thứ tự nào, và giao diện đổi liên tục.</p>

Note: Cả 5 dòng là lỗi đã xác nhận trong ground-truth/bugs.md (G10, G02, G11, G06, G07, G04, G05). Lý do GUI testing khó (event-driven, phụ thuộc ẩn, đa nền tảng): Phụ lục.

---

## Chiến lược tự động hóa: tự động cái gì?

- **Nguyên lý Pareto:** khoảng 80% lợi ích đến từ 20% số test

| Nên tự động | Nên giữ thủ công |
| --- | --- |
| Quy tắc lặp lại mọi trang (`<h1>`, `alt`, định dạng giá) | Kiểm thử khám phá (exploratory) |
| Hồi quy giao diện sau mỗi lần sửa code | Đánh giá "đẹp / dễ dùng" |
| Chạy cùng kiểm tra trên nhiều viewport | Giao diện còn thay đổi liên tục |
| Quét accessibility tự động | Tương tác phức tạp, kéo thả, animation |

Note: Phần 3 sẽ phân loại từng câu checklist thành tự động / bán tự động / thủ công theo đúng tiêu chí này.

---

## Bộ kỹ thuật nhóm dùng

| Kỹ thuật | Bắt được gì | Demo ở |
| --- | --- | --- |
| Record & Playback → **Page Object Model** | Test bền khi giao diện đổi | Phần 06 |
| **Visual regression** (`toHaveScreenshot`) | Lệch bố cục, mất phần tử, sai màu | Phần 06 |
| **Accessibility** WCAG 2.2 (axe-core) | Thiếu `alt`, tương phản kém, thiếu nhãn | Phần 06 |
| **Nhiều viewport** 375 · 768 · 1440 | Vỡ bố cục trên mobile, tablet | Phần 06 |
| **LLM có vision** | Vi phạm heuristic nhìn thấy trên ảnh | Phần 08 |

Note: Mỗi kỹ thuật chỉ nói một câu, chi tiết (POM, visual regression, WCAG POUR, compatibility 4 bậc) nằm ở Phụ lục. Chuyển ý: "trước khi tự động, nhóm làm bằng tay với checklist".
