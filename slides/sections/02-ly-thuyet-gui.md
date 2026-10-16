<!-- Phụ trách: Quang. Bản nháp do Quân soạn (có dùng Claude), Quang review và chỉnh trước khi trình bày. Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">02</p>

## Lý thuyết GUI Testing

- GUI Testing là gì, kiểm tra những gì
- Checklist theo từng loại control
- Lỗi giao diện hay gặp và vì sao GUI testing khó
- Chiến lược tự động hóa: POM, visual regression, accessibility

Note: Phần này trả lời câu hỏi "giao diện có đúng đặc tả không".

---

## GUI Testing là gì?

- **GUI (Graphical User Interface):** phần người dùng nhìn thấy và thao tác: màu, chữ, bố cục, control
- **GUI Testing (kiểm thử giao diện):** kiểm tra giao diện **hiển thị** và **phản hồi** đúng đặc tả trên mọi thành phần nhìn thấy được
- Đối chiếu với: đặc tả giao diện, style guide, checklist
- Tinh thần: *"Think as a user, not as a tester"* — giao diện làm người dùng bối rối thì họ không quay lại

Note: Định nghĩa theo tài liệu môn (GUI, Usability & Compatibility Testing, Part 1).

---

## Kiểm tra những gì? Visuals và Controls

| Visuals (hiển thị) | Controls (điều khiển) |
| --- | --- |
| Màu sắc, font chữ, cỡ chữ | Ô nhập liệu (text box) |
| Căn lề, khoảng cách, bố cục | Nút bấm (button) |
| Chính tả, nhãn, thuật ngữ thống nhất | Dropdown, checkbox, radio |
| Icon, hình ảnh, video | Link, menu, breadcrumb |
| Bảng, định dạng số và tiền | Date picker, bảng dữ liệu |
| | Thông báo lỗi, validation |

<p class="small">EShop: giá phải dạng <code>1.250.000 ₫</code> (visual) · nút "Xóa" phải mở dialog xác nhận (control).</p>

Note: Visuals là "trông có đúng không", controls là "bấm/nhập vào có phản hồi đúng không".

---

## Checklist theo control (1/2)

| Control | Cần kiểm tra |
| --- | --- |
| **Text box** | Giới hạn ký tự, giá trị biên, placeholder rõ nghĩa, che mật khẩu (`type="password"`), tự cắt khoảng trắng, nhãn và dấu `*` cho trường bắt buộc |
| **Button** | Phân biệt nút chính/phụ, màu đúng quy ước, trạng thái hover / focus / disabled, có loading khi đang xử lý, không submit hai lần |
| **Dropdown / radio / checkbox** | Giá trị mặc định hợp lý, thứ tự dễ tìm, chọn được bằng bàn phím, nhãn bấm được |

Note: Đây là khung để Quang xây checklist 50 câu ở phần 3.

---

## Checklist theo control (2/2)

| Control | Cần kiểm tra |
| --- | --- |
| **Link / điều hướng** | Không có link gãy, highlight trang hiện tại, breadcrumb ở trang con, mở đúng nơi |
| **Thông báo lỗi** | Dễ hiểu, nói cách sửa, đặt gần chỗ sai (EShop: **trên** nút submit) |
| **Trang lỗi** | 404 / 500 thân thiện, có đường quay lại, không lộ thông tin hệ thống |
| **Bảng / danh sách** | Đúng định dạng số, căn lề, có trạng thái rỗng (empty state) |

Note: Trang lỗi để lộ stack trace vừa là lỗi giao diện vừa là lỗi bảo mật.

---

## Trạng thái giao diện cũng phải kiểm tra

| Trạng thái | Ví dụ trên EShop |
| --- | --- |
| Mặc định / hover / focus | Nút có đổi màu khi rê chuột, có viền focus khi bấm Tab |
| Disabled | Nút "Áp dụng" mã giảm giá nên bị khóa khi ô mã còn trống |
| Loading | Khi đang gửi đơn hàng, nút phải khóa và báo đang xử lý |
| Empty state | Giỏ hàng trống phải có hình minh họa và thông điệp thân thiện |
| Lỗi | Mã giảm giá sai: thông báo hiện ở đâu, nói gì |
| Thành công / phản hồi | Thêm vào giỏ phải có toast hoặc badge (FR-24) |

Note: Lỗi giao diện hay nằm ở trạng thái hiếm gặp chứ không ở màn hình mặc định.

---

## Lỗi giao diện hay gặp

- **Lớp phủ chồng nhau (z-index):** nút bị một lớp trong suốt che, bấm không được
- **Trạng thái không được xử lý:** hiển thị `NaN ₫`, `undefined`, ảnh vỡ
- **Double-submit:** bấm hai lần gửi hai đơn hàng
- **Thiếu phản hồi:** bấm mà không thấy gì thay đổi
  - EShop: "Thêm vào giỏ" phải bấm 2 lần mới ăn
- **Thiếu nhất quán:** cùng một hành động, mỗi nơi một nhãn, một màu
  - EShop: "Thoát" và "Đăng xuất", nút thanh toán xanh lá

Note: Ba lỗi đầu lấy từ tài liệu môn, hai lỗi sau là lỗi thật trên EShop.

---

## Vì sao GUI testing khó?

- **Hướng sự kiện (event-driven):** người dùng bấm bất kỳ đâu, theo bất kỳ thứ tự nào → không gian đầu vào gần như vô hạn
- **Sự kiện ngoài ý muốn:** mất mạng, thông báo hệ điều hành, đổi kích thước cửa sổ giữa chừng
- **Phụ thuộc ẩn:** một nút bấm kéo theo nhiều trạng thái phía sau (EShop: giỏ hàng chỉ lưu trong bộ nhớ, tải lại trang là mất)
- **Đa nền tảng:** cùng mã nhưng mỗi trình duyệt, mỗi màn hình hiển thị khác
- **Giao diện đổi liên tục:** test dễ gãy khi đổi nhãn, đổi bố cục

Note: Điểm cuối dẫn sang chiến lược tự động hóa: tự động cái gì và viết test sao cho bền.

---

## GUI testing khác kiểm thử chức năng

| | T1 — GUI Testing (nhóm mình) | T2 — Web Automation (không làm) |
| --- | --- | --- |
| Mục tiêu | Giao diện đúng đặc tả, nhất quán, truy cập được | Nghiệp vụ cho kết quả đúng |
| Checkpoint | Đúng 1 `<h1>`, nhãn "Tổng cộng", màu nút, giá có `₫`, ảnh có `alt` | Mã SAVE10 giảm đúng 10%, đơn lưu đúng vào CSDL |
| Kỹ thuật | Visual regression, axe, `toHaveCSS`, nhiều viewport, bàn phím | Assertion trên dữ liệu, API |

<p class="small">Click và điền form chỉ để đưa trang về đúng trạng thái; điểm kiểm tra luôn là thuộc tính giao diện.</p>

Note: Giúp lớp phân biệt rõ đề T1 và đề T2 vì cùng dùng Playwright.

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

## Page Object Model: test dễ bảo trì

- **Record & Playback** (`playwright codegen`): nhanh nhưng khó bảo trì
- **Page Object Model (POM):** mỗi trang là một class chứa locator và thao tác → đổi giao diện chỉ sửa một chỗ

```js
class CartPage {
  constructor(page) { this.page = page; }
  checkoutButton() { return this.page.getByRole('button', { name: 'Tiến hành thanh toán' }); }
  removeButtons()  { return this.page.getByRole('button', { name: 'Xóa' }); }
}
// test: await expect(cart.checkoutButton()).toHaveCSS('background-color', BLUE);
```

- Ưu tiên locator theo **role và tên**, tránh CSS selector dài dễ gãy

Note: Thực tế nên ghi bằng codegen rồi chuyển sang POM. EShop không có data-testid nên phải dựa vào role/text.

---

## Visual regression testing

1. Chụp ảnh giao diện đã duyệt → lưu làm **baseline**
2. Mỗi lần chạy lại: chụp ảnh mới, so từng pixel với baseline
3. Khác quá ngưỡng → test fail, xuất **ảnh diff** đánh dấu vùng khác

```js
await expect(page).toHaveScreenshot('cart-desktop.png', { maxDiffPixelRatio: 0.01 });
```

- Bắt lỗi lệch bố cục, mất phần tử, sai màu mà assertion thường bỏ sót
- Điểm yếu: khác font, hệ điều hành, animation → **false positive** (báo nhầm)

Note: Baseline phải chụp trên cùng môi trường (cùng OS, cùng trình duyệt) thì mới so được.

---

## Accessibility (a11y): giao diện cho mọi người

- **WCAG 2.2** (W3C): 3 mức A / AA / AAA; 4 nguyên tắc **POUR**:
  - **P**erceivable: nhận biết được (ảnh có `alt`, chữ đủ tương phản)
  - **O**perable: thao tác được (dùng được bằng bàn phím)
  - **U**nderstandable: hiểu được (nhãn rõ, lỗi dễ hiểu)
  - **R**obust: tương thích công nghệ hỗ trợ (screen reader)
- Ví dụ mức AA: chữ thường tương phản ít nhất **4.5:1** với nền
- Công cụ: **axe-core**, Lighthouse, WAVE; công cụ tự động chỉ bắt được **một phần** lỗi, phần còn lại phải kiểm tra thủ công

Note: FR-24 của EShop (ảnh phải có alt) chính là một tiêu chí WCAG.

---

## Compatibility ở mức nhẹ

- 3 engine: **Blink** (Chrome, Edge) · **WebKit** (Safari, mọi trình duyệt iOS) · **Gecko** (Firefox)
- Nhóm kiểm tra 3 viewport: 375 · 768 · 1440 px; công cụ chia 4 bậc từ rẻ đến đắt:

| Bậc | Cách làm | Ví dụ |
| --- | --- | --- |
| 1 | Visual regression trên máy | Playwright, BackstopJS |
| 2 | Giả lập trên trình duyệt | Chrome DevTools |
| 3 | Chụp ảnh online nhiều cấu hình | Percy, BrowserStack Screenshots |
| 4 | Thiết bị thật trên cloud | BrowserStack Live, AWS Device Farm |

Note: Nhóm dừng ở bậc 1–2 vì bậc 3–4 cần trả phí.

---

## AI trong GUI testing (2024–2026)

- **Visual AI:** so sánh bố cục bằng học máy, bỏ qua nhiễu nhỏ (Applitools Eyes, Percy)
- **Self-healing locator:** tự tìm lại phần tử khi locator gãy
- **Browser agent:** LLM điều khiển trình duyệt qua cây accessibility (Playwright MCP)
- **LLM có vision:** đọc ảnh chụp màn hình và nhận xét giao diện → phần 8 của nhóm

Note: Chỉ giới thiệu, phần 8 sẽ demo cụ thể.

---

## Tóm tắt phần 2

- GUI testing = kiểm tra **visuals + controls + trạng thái** so với đặc tả
- Khó vì event-driven, phụ thuộc ẩn, đa nền tảng, giao diện đổi liên tục
- Tự động phần lặp lại (quy tắc, hồi quy, nhiều viewport, a11y); giữ thủ công phần cần con người
- Bộ kỹ thuật: **POM** · **visual regression** · **accessibility (WCAG)** · viewport

Note: Chuyển sang phần 3: áp dụng checklist 50 câu trên EShop.
