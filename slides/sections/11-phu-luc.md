<!-- Phụ lục: slide chi tiết của các phần 01, 02, 04, 08, giữ nguyên nội dung để GVTH đọc và để trả lời câu hỏi; không trình bày trong 30 phút. Người phụ trách giữ như phần gốc. Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">PL</p>

## Phụ lục

- A · Ground truth và phạm vi
- B · Lý thuyết GUI Testing chi tiết
- C · Lý thuyết Usability Testing chi tiết
- D · Khảo sát bài báo và skill cộng đồng

Note: Không trình bày trên lớp. Dùng khi GVTH đọc slide hoặc khi cần trả lời câu hỏi.

---

## Lỗi giao diện thật trong EShop

| Trang | Hiện tại | Đặc tả yêu cầu |
| --- | --- | --- |
| Giỏ hàng | Nhãn "Tổng tạm tính" | "Tổng cộng" (FR-07) |
| Giỏ hàng | Bấm "Xóa" xóa ngay | Có dialog xác nhận (FR-24) |
| Giỏ hàng | Nút "Tiến hành thanh toán" màu xanh lá | Nút tích cực màu xanh dương (FR-21) |
| Giỏ hàng, Thanh toán | Tiêu đề là `<h2>`, không có `<h1>` | Đúng 1 `<h1>` mỗi trang (FR-21) |
| Thanh toán | Ô "Tổng tiền thanh toán" sửa được | Không cho sửa (FR-08) |
| Header | Nút "Thoát", không có badge giỏ hàng | "Đăng xuất", có badge (FR-23) |

<p class="small">Đối chiếu từ mã nguồn (<code>Cart.jsx</code>, <code>Checkout.jsx</code>, <code>App.jsx</code>). Danh sách này là <b>ground truth</b> (đáp án) để chấm Playwright, AI và bài tập.</p>

Note: Mỗi lỗi sẽ có ảnh chụp minh chứng trong evidence/gui-bugs. Các phần sau đều quay lại bảng này.

---

## Phạm vi

| Trong phạm vi | Ngoài phạm vi |
| --- | --- |
| Bố cục, control, trạng thái giao diện | Kiểm thử chức năng E2E (thuộc đề T2) |
| Visual regression, accessibility (WCAG) | Performance, security, API |
| Heuristic evaluation, test theo nhiệm vụ, SUS/SEQ | Ứng dụng mobile (Expo) |
| Compatibility mức nhẹ: 3 viewport, 2–3 trình duyệt | Device farm trả phí |

Note: Ranh giới với T2: nhóm chỉ thao tác để đưa trang về đúng trạng thái cần soi; điểm kiểm tra luôn là thuộc tính giao diện, không phải kết quả nghiệp vụ.

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

## Usability, UX và Accessibility

| Khái niệm | Phạm vi |
| --- | --- |
| **Usability** | Dùng có hiệu quả, nhanh, dễ chịu khi làm một nhiệm vụ cụ thể |
| **UX** (trải nghiệm người dùng) | Toàn bộ cảm nhận trước, trong và sau khi dùng; rộng hơn usability |
| **Accessibility** | Người khuyết tật (khiếm thị, chỉ dùng bàn phím…) vẫn dùng được |

<p class="small">Một trang có thể đạt chuẩn WCAG mà vẫn khó dùng, và ngược lại.</p>

Note: Accessibility đã nói ở phần 2; phần này tập trung vào usability.

---

## Nguyên lý: 10 heuristic của Nielsen (1/2)

| # | Heuristic | Ví dụ trên EShop |
| --- | --- | --- |
| H1 | Visibility of system status — cho biết hệ thống đang làm gì | Thêm vào giỏ không có toast hay badge |
| H2 | Match between system and the real world — dùng ngôn ngữ người dùng | Thuật ngữ quen thuộc như "Giỏ hàng", "Thanh toán" |
| H3 | User control and freedom — có lối thoát, hoàn tác | Bấm "Xóa" không hoàn tác được |
| H4 | Consistency and standards — nhất quán | "Thoát" và "Đăng xuất"; nút thanh toán xanh lá |
| H5 | Error prevention — ngăn lỗi trước khi xảy ra | Ô tổng tiền cho sửa tay |

Note: Bộ 10 heuristic của Jakob Nielsen (1994), vẫn được NN/g dùng đến nay. Mỗi heuristic là một nguyên lý chung, không phải quy tắc cứng.

---

## Nguyên lý: 10 heuristic của Nielsen (2/2)

| # | Heuristic | Ý chính |
| --- | --- | --- |
| H6 | Recognition rather than recall | Hiện sẵn lựa chọn, đừng bắt người dùng nhớ |
| H7 | Flexibility and efficiency of use | Có lối tắt cho người dùng thành thạo |
| H8 | Aesthetic and minimalist design | Chỉ hiện thông tin cần thiết |
| H9 | Help users recognize, diagnose, and recover from errors | Lỗi nói rõ sai gì, sửa thế nào |
| H10 | Help and documentation | Có hướng dẫn khi cần |

Note: Khi đánh giá, ghi rõ vi phạm heuristic nào (H1–H10), ở đâu, nghiêm trọng mức nào.

---

## Các bộ nguyên lý khác

- **Shneiderman — 8 golden rules:** nhất quán, có lối tắt, phản hồi thông tin, hộp thoại có kết thúc rõ, ngăn lỗi, cho hoàn tác, để người dùng làm chủ, giảm tải trí nhớ
- **Don Norman — nguyên lý thiết kế:** affordance (gợi ý cách dùng), signifier (dấu hiệu), feedback (phản hồi), mapping (ánh xạ), constraint (ràng buộc)
- Các bộ này **chồng lấn nhiều** với Nielsen; nhóm chọn **Nielsen** làm chuẩn chung vì phổ biến nhất và có sẵn thang severity

Note: Ví dụ chồng lấn: "cho hoàn tác" của Shneiderman tương ứng H3; "feedback" của Norman tương ứng H1.

---

## Quy trình heuristic evaluation

1. Chọn **3–5 người đánh giá**, làm **độc lập**
2. Mỗi người đi qua giao diện **2 lượt**: lượt đầu làm quen luồng, lượt sau soi từng phần tử
3. Ghi mỗi vấn đề: **heuristic · vị trí · mô tả · đề xuất sửa**
4. Gộp danh sách, bỏ trùng
5. Chấm **severity** cho từng vấn đề

- Một người đánh giá thường chỉ tìm được khoảng **35%** vấn đề → cần nhiều người (NN/g)

Note: Đây cũng là quy trình của hoạt động Heuristic Showdown ở phần 9.

---

## Usability testing: 6 thành phần (Rubin)

1. **Mục tiêu cụ thể:** câu hỏi cần trả lời, viết thành test plan
2. **Người dùng đại diện:** đúng nhóm người dùng mục tiêu
3. **Môi trường thật:** gần với điều kiện sử dụng thật
4. **Quan sát:** xem người dùng làm, nghe họ nói
5. **Dữ liệu định lượng + định tính:** số đo và cảm nhận
6. **Phân tích và đề xuất:** danh sách vấn đề có ưu tiên

Note: Theo Rubin & Chisnell, Handbook of Usability Testing.

---

## Phương pháp usability testing

| Cách chia | Lựa chọn |
| --- | --- |
| Có người điều phối? | **Moderated:** facilitator dẫn trực tiếp, hỏi lại được · **Unmoderated:** người tham gia tự làm qua link, dễ mở rộng |
| Ở đâu? | In-lab · Remote đồng bộ (gọi video) · Remote bất đồng bộ (tự làm) |
| Thu dữ liệu gì? | **Định tính:** think-aloud, phỏng vấn · **Định lượng:** tỷ lệ hoàn thành, thời gian, SUS |
| Chi phí thấp | **Guerrilla / hallway:** nhờ người qua đường thử nhanh |

- **Think-aloud:** người tham gia vừa làm vừa nói ra suy nghĩ

Note: Maze (phần 7) là unmoderated, remote bất đồng bộ, thiên về định lượng.

---

## Cần bao nhiêu người tham gia?

- Nielsen & Landauer: **5 người** đã tìm được khoảng **85%** vấn đề usability
- Thêm người thì mỗi người mới phát hiện ít vấn đề mới hơn
- Tốt hơn: **nhiều vòng nhỏ** (5 người → sửa → 5 người) thay vì một vòng lớn
- Lưu ý: cần nhiều người hơn khi muốn **số liệu thống kê** (ví dụ so sánh điểm SUS) hoặc có nhiều nhóm người dùng khác nhau

Note: Nhóm chọn khoảng 5 người ngoài nhóm cho study Maze; thành viên nhóm không làm người tham gia vì đã biết rõ website.

---

## Viết kịch bản nhiệm vụ (task scenario)

- Bối cảnh thật + mục tiêu rõ + **không lộ tên nút / đường đi**

| Viết chưa tốt | Viết tốt |
| --- | --- |
| "Bấm Thêm vào giỏ rồi bấm Tiến hành thanh toán, nhập mã VIP100." | "Bạn có 5.000.000 ₫ và muốn mua một phụ kiện máy tính. Hãy mua một sản phẩm và dùng mã giảm giá VIP100 khi thanh toán." |

- Định nghĩa trước **thế nào là thành công**: ví dụ đến được trang xác nhận đơn hàng

Note: Kịch bản lộ tên nút sẽ biến bài test thành bài đọc hướng dẫn, không đo được usability.

---

## SUS: cách tính điểm

- 10 câu, thang 5 mức (1 = rất không đồng ý … 5 = rất đồng ý); câu lẻ nói tích cực, câu chẵn nói tiêu cực
- **Câu lẻ:** điểm − 1 · **Câu chẵn:** 5 − điểm
- Cộng 10 câu (0–40) rồi **× 2.5** → điểm SUS 0–100
- Mốc tham khảo: điểm trung bình khoảng **68**; dưới 68 là dưới trung bình

<p class="small">Ví dụ: tổng sau quy đổi = 26 → SUS = 26 × 2.5 = <b>65</b> (dưới trung bình).</p>

- SUS **không phải phần trăm** và không chỉ ra lỗi cụ thể nằm ở đâu

Note: SUS do John Brooke đề xuất năm 1996. Bài tập 3 cho lớp tự tính SUS.

---

## Usability test plan: 9 phần

| # | Phần | # | Phần |
| --- | --- | --- | --- |
| 1 | Mục đích và phạm vi | 6 | Vai trò: facilitator, người ghi chép |
| 2 | Hồ sơ người dùng, cách tuyển | 7 | Chỉ số định lượng, ngưỡng đạt |
| 3 | Thiết kế và phương pháp | 8 | Bảng hỏi sau test (SUS, SEQ) |
| 4 | Kịch bản nhiệm vụ | 9 | Định dạng báo cáo |
| 5 | Môi trường, thiết bị | | |

Note: Phần 7 (Maze) trình bày test plan thật của nhóm theo đúng 9 phần này.

---

## Công cụ usability testing

| Mục đích | Công cụ |
| --- | --- |
| Test từ xa không điều phối | **Maze**, Lyssna, UXtweak |
| Heatmap, ghi lại phiên dùng | Microsoft Clarity, Hotjar, FullStory |
| Ghi hình, phỏng vấn | UserTesting, Lookback |
| AI hỗ trợ phân tích | Maze AI, Attention Insight; **LLM có vision** để đánh giá heuristic |

Note: Nhóm chọn Maze cho usability testing và tự xây AI Heuristic Reviewer cho phần AI; lý do chọn ở phần 5.

---

## Nghiên cứu liên quan (2022–2025)

| Bài báo | Nơi đăng | Ý chính |
| --- | --- | --- |
| Duan et al. — UI feedback | CHI'24 · A\* | GPT-4 đánh giá UI theo 10 heuristic Nielsen |
| Liu et al. — GPTDroid | ICSE'24 · A\* | LLM tự khám phá và kiểm thử GUI như người dùng |
| Alian et al. — AutoE2E | ICSE'25 · A\* | LLM sinh test E2E cho web app |
| Mansur et al. — AidUI | ICSE'23 · A\* | Nhận diện dark pattern từ ảnh chụp, F1 0,65 |
| Liu et al. — Nighthawk | TSE'22 · Q1 | Phát hiện lỗi hiển thị UI từ ảnh, P/R ≈ 0,84 |

<p class="small">Hạng theo bảng CORE. Thêm: UICrit (UIST 2024), Groundhog (ASE 2022). Đầy đủ: <code>docs/khao-sat/bai-bao.md</code>.</p>

Note: Hai hướng chính: AI đánh giá giao diện (CHI, UIST, AidUI, Nighthawk) và AI tự thao tác giao diện để kiểm thử (GPTDroid, AutoE2E).

---

## Skill cộng đồng trên GitHub

| Repo / skill | Star | Làm gì |
| --- | --- | --- |
| anthropics/skills · `webapp-testing` | ~180k | Agent viết script Playwright test web app |
| ui-ux-pro-max-skill | ~137k | Quy tắc UX + checklist (tương phản, focus, viewport) |
| microsoft/playwright-mcp | ~38k | Agent điều khiển trình duyệt qua cây a11y |
| vercel-labs · `web-design-guidelines` | ~32.6k | Rà code UI theo 100+ quy tắc, báo `file:line` |
| lackeyjb/playwright-skill | ~3k | Agent tự viết test, chụp nhiều viewport |
| accessibility-agents | ~400 | Audit WCAG 2.2 AA cho nhiều coding agent |

<p class="small">Số star ngày 19/10/2026. Chi tiết: <code>docs/khao-sat/agent-skills.md</code>.</p>

Note: Agent Skill là thư mục có SKILL.md đóng gói một quy trình để agent tự nạp khi cần.

---

## Nghiên cứu mới hơn với model mạnh hơn (2025)

| Nghiên cứu (preprint arXiv) | Model, đầu vào | Kết quả chính |
| --- | --- | --- |
| *Can GPT-4o Evaluate Usability Like Human Experts?* (2506.16345) | GPT-4o, ảnh chụp web | Chỉ trùng 21,2% lỗi chuyên gia; thêm 27 lỗi mới, nhiều báo nhầm |
| *Synthetic Heuristic Evaluation* (2507.02306) | GPT-4 (thử thêm Gemini, Claude), ảnh mobile | Phủ 73–77% lỗi, hơn 5 chuyên gia gộp lại; kém ở lỗi xuyên nhiều màn hình |

<p class="small">Preprint, chưa có hạng: chỉ minh họa xu hướng, không tính vào yêu cầu rank ≥ B.</p>

Note: Dùng khi bị hỏi "model bây giờ mạnh hơn GPT-4 thì bài CHI 2024 còn đúng không?". Kết quả phụ thuộc nhiều vào prompt, loại giao diện và cách đo; điểm yếu chung vẫn còn.
