# Lý thuyết Usability Testing

> Phụ trách: **Phúc (B)** · Trạng thái: **hoàn thành**

## 1. Định nghĩa Usability theo chuẩn ISO 9241-11:2018

Theo tiêu chuẩn quốc tế **ISO 9241-11:2018 (*Ergonomics of human-system interaction — Part 11: Usability: Definitions and concepts*)**, **Usability (Tính khả dụng)** được định nghĩa là:

> *"Mức độ mà một hệ thống, sản phẩm hoặc dịch vụ có thể được sử dụng bởi những **người dùng cụ thể** để đạt được các **mục tiêu cụ thể** với **hiệu quả (effectiveness)**, **hiệu suất (efficiency)** và **sự hài lòng (satisfaction)** trong một **bối cảnh sử dụng (context of use)** xác định."*

Định nghĩa này nhấn mạnh rằng tính khả dụng không phải là một thuộc tính nội tại cố định của giao diện, mà luôn phụ thuộc vào **bối cảnh sử dụng** (người dùng là ai, nhiệm vụ của họ là gì, thiết bị và môi trường thao tác ra sao). Ba trụ cột cốt lõi của ISO 9241-11 là gốc rễ của toàn bộ hệ thống chỉ số đo lường trong kiểm thử khả dụng:

| Thành phần cốt lõi | Câu hỏi trọng tâm | Ý nghĩa thực tế trên EShop | Chỉ số đo lường điển hình |
| --- | --- | --- | --- |
| **Effectiveness (Hiệu quả)** | Người dùng có hoàn thành đúng và đầy đủ mục tiêu không? | Người tham gia có tìm đúng phụ kiện trong ngân sách `5.000.000 ₫`, áp được mã `VIP100` và đặt hàng thành công không? | **Task Success Rate** (Tỷ lệ hoàn thành), **Error Rate / Misclick Rate** (Tỷ lệ lỗi / click nhầm) |
| **Efficiency (Hiệu suất)** | Người dùng tốn bao nhiêu nguồn lực (thời gian, thao tác, công sức) để đạt mục tiêu đó? | Người tham gia mất bao nhiêu giây và bao nhiêu cú click để đi từ Trang chủ đến bước Xác nhận thanh toán? | **Time on Task** (Thời gian làm nhiệm vụ), số bước điều hướng, tỷ lệ đi đường vòng (Indirect Path) |
| **Satisfaction (Sự hài lòng)** | Cảm nhận chủ quan của người dùng có thoải mái, tự tin và không bị ức chế không? | Sau khi gặp lỗi bấm 2 lần mới thêm được vào giỏ (`G10`), người tham gia đánh giá độ dễ và mức hài lòng bao nhiêu điểm? | **SEQ** (Single Ease Question, thang 1–7), **SUS** (System Usability Scale, thang 0–100) |

### Phân biệt Usability, UX và Accessibility (a11y)

Trong kiểm thử phần mềm, ba khái niệm này thường xuất hiện cùng nhau nhưng có phạm vi khác biệt rõ rệt:

| Khái niệm | Phạm vi & Mục tiêu | Quan hệ với nhau |
| --- | --- | --- |
| **Usability (Tính khả dụng)** | Tập trung vào khả năng thao tác **dễ dàng, hiệu quả, ít lỗi** khi người dùng thực hiện một nhiệm vụ cụ thể trên giao diện. | Là phần lõi thực thi nhiệm vụ nằm bên trong UX. |
| **UX — User Experience (Trải nghiệm người dùng)** | Bao gồm toàn bộ cảm xúc, nhận thức và phản ứng của người dùng **trước, trong và sau** khi tương tác với sản phẩm (thương hiệu, giá cả, tốc độ giao hàng, dịch vụ CSKH, giao diện). | Rộng hơn Usability. Giao diện dễ dùng (Usability tốt) nhưng giá hiển thị không đáng tin cậy vẫn làm hỏng UX. |
| **Accessibility — a11y (Khả năng truy cập)** | Đảm bảo người dùng khuyết tật (khiếm thị dùng trình đọc màn hình, người chỉ dùng bàn phím, người mù màu…) vẫn tiếp cận và thao tác được theo chuẩn **WCAG (A / AA / AAA)**. | Giao thoa với Usability. Một trang có thể đạt chuẩn tương phản WCAG nhưng luồng mua hàng vẫn rườm rà khó hiểu, hoặc ngược lại. |

---

## 2. Sáu thành phần của Usability Testing theo Rubin & Chisnell

Trong tác phẩm kinh điển *Handbook of Usability Testing* (Jeffrey Rubin & Dana Chisnell), **Usability Testing (Kiểm thử khả dụng)** được định nghĩa là quá trình quan sát những người dùng đại diện thực hiện các nhiệm vụ điển hình trên sản phẩm nhằm phát hiện các điểm nghẽn thiết kế. Một quy trình Usability Testing chuẩn mực gồm **6 thành phần bắt buộc**:

1. **Thiết lập mục tiêu kiểm thử cụ thể (Development of test objectives):** Xác định rõ câu hỏi nghiên cứu và mục tiêu cần kiểm chứng trước khi bắt đầu (thể hiện qua Usability Test Plan), thay vì chỉ bảo người dùng *"dùng thử xem sao"*.
2. **Mẫu người dùng đại diện (Use of a representative sample of end-users):** Tuyển chọn **Participant (Người tham gia)** thuộc đúng nhóm đối tượng mục tiêu của sản phẩm và **không tham gia phát triển hệ thống** (trong seminar, các thành viên nhóm không đóng vai người tham gia vì đã biết trước cấu trúc và lỗi của EShop).
3. **Môi trường sử dụng thực tế (Representation of the actual work environment):** Đặt người tham gia vào điều kiện thiết bị, trình duyệt và bối cảnh gần nhất với thực tế sử dụng.
4. **Quan sát người dùng thực hiện nhiệm vụ (Observation of end-users):** Ghi nhận hành vi thực tế (họ bấm vào đâu, khựng lại ở đâu, đi nhầm sang trang nào) kết hợp lắng nghe suy nghĩ của họ.
5. **Thu thập dữ liệu định lượng và định tính (Collection of quantitative and qualitative performance and preference measures):** Kết hợp số đo khách quan (tỷ lệ hoàn thành, thời gian, số lần misclick) với cảm nhận chủ quan (SEQ, SUS, nhận xét trực tiếp).
6. **Phân tích dữ liệu và đề xuất cải tiến (Recommendation of improvements to the design of the product):** Mục đích cuối cùng không chỉ là chấm điểm mà là chỉ ra nguyên nhân gốc rễ trên giao diện, xếp hạng mức độ nghiêm trọng và đề xuất hướng sửa cụ thể.

---

## 3. Nguyên lý thiết kế: 10 Usability Heuristics của Jakob Nielsen & Thang Severity 0–4

### 3.1. Bộ 10 nguyên lý Heuristic của Nielsen (H1–H10)

Được Jakob Nielsen công bố năm 1994 và cập nhật bởi Nielsen Norman Group (NN/g), **10 Usability Heuristics** là bộ nguyên tắc tổng quát (rules of thumb) phổ biến nhất để thực hiện **Heuristic Evaluation (Đánh giá heuristic)**. Dưới đây là chi tiết 10 nguyên lý kèm ánh xạ trực tiếp vào các lỗi thực tế trên SUT EShop (`ground-truth/bugs.md`):

| Mã | Tên nguyên lý (Heuristic) | Nội dung cốt lõi | Ví dụ vi phạm thực tế trên SUT EShop |
| --- | --- | --- | --- |
| **H1** | **Visibility of system status** *(Hiển thị trạng thái hệ thống)* | Hệ thống phải luôn thông báo cho người dùng biết chuyện gì đang xảy ra thông qua phản hồi (feedback) rõ ràng trong thời gian hợp lý. | - **G08 (`App.jsx`):** Link `"Giỏ hàng"` trên thanh Header không có badge hiển thị số lượng sản phẩm hiện có.<br>- **G09 (`App.jsx`):** Thanh điều hướng không làm nổi bật (highlight) trang hiện tại.<br>- **G10 (`ProductDetail.jsx`):** Nút `"Thêm vào giỏ hàng"` bấm lần đầu không có bất kỳ phản hồi nào, phải bấm lần thứ 2 mới hoạt động. |
| **H2** | **Match between system and the real world** *(Tương thích giữa hệ thống và thế giới thực)* | Sử dụng ngôn ngữ, khái niệm và quy ước quen thuộc với người dùng đời thực thay vì thuật ngữ kỹ thuật nội bộ. | EShop sử dụng các từ ngữ quen thuộc trong thương mại điện tử Việt Nam (`"Giỏ hàng"`, `"Thanh toán"`, `"Mã giảm giá"`), nhưng ở trang chủ lại hiển thị giá bằng hậu tố `VND` trong khi trang chi tiết và giỏ hàng dùng ký hiệu `₫`. |
| **H3** | **User control and freedom** *(Quyền kiểm soát và tự do của người dùng)* | Người dùng thường xuyên thao tác nhầm; họ cần một "lối thoát khẩn cấp" rõ ràng (Undo / Redo / Hủy bỏ / Chỉnh sửa) mà không phải đi qua quy trình phức tạp. | - **G02 (`Cart.jsx:50-55`):** Bấm nút `"Xóa"` trong giỏ hàng là xóa mất sản phẩm ngay lập tức, không có hộp thoại xác nhận cũng không có nút Hoàn tác (Undo).<br>- **G03 (`Cart.jsx:47`):** Giỏ hàng chỉ hiển thị số lượng tĩnh, không có nút `+/-` để người dùng tăng/giảm số lượng sản phẩm. |
| **H4** | **Consistency and standards** *(Tính nhất quán và tiêu chuẩn)* | Người dùng không phải tự hỏi liệu các từ ngữ, màu sắc hay hành động khác nhau có cùng một ý nghĩa hay không. Tuân thủ quy ước chung của nền tảng. | - **G01 (`Cart.jsx:63`):** Giỏ hàng dùng nhãn `"Tổng tạm tính"` trong khi đặc tả yêu cầu `"Tổng cộng"`.<br>- **G04 (`Cart.jsx:71`):** Nút tích cực `"Tiến hành thanh toán"` dùng màu xanh lá (`bg-green-600`) thay vì màu xanh dương chuẩn toàn hệ thống (FR-21).<br>- **G07 (`App.jsx:23,29`):** Dùng nhãn `"Thoát"` thay vì `"Đăng xuất"`. |
| **H5** | **Error prevention** *(Ngăn ngừa lỗi)* | Thiết kế ngăn không cho lỗi xảy ra ngay từ đầu tốt hơn nhiều so với một thông báo lỗi hay. Loại bỏ các điều kiện dễ gây lỗi hoặc yêu cầu xác nhận trước hành động rủi ro cao. | - **G06 (`Checkout.jsx:92-93`):** Ô `"Tổng tiền thanh toán (VND)"` ở trang Checkout được render bằng thẻ `<input type="number">` cho phép người dùng tự ý sửa tổng tiền đơn hàng.<br>- **G02 (`Cart.jsx`):** Thiếu dialog xác nhận trước hành động xóa dữ liệu khỏi giỏ. |
| **H6** | **Recognition rather than recall** *(Nhận diện thay vì phải nhớ lại)* | Giảm tải trí nhớ ngắn hạn của người dùng bằng cách hiển thị trực quan các đối tượng, tùy chọn và thông tin cần thiết ngay tại nơi thao tác. | Trên trang Checkout, danh sách sản phẩm và số lượng được liệt kê lại giúp người dùng nhận diện đơn hàng, nhưng không hiển thị gợi ý các mã khuyến mãi khả dụng hoặc điều kiện đơn tối thiểu của mã. |
| **H7** | **Flexibility and efficiency of use** *(Tính linh hoạt và hiệu quả sử dụng)* | Cung cấp các lối tắt (accelerators) hỗ trợ người dùng thành thạo thao tác nhanh hơn mà vẫn giữ giao diện đơn giản cho người mới. | Ở Trang chủ (`/`), mỗi thẻ sản phẩm có sẵn nút `"Thêm vào giỏ"` giúp người dùng mua nhanh mà không bắt buộc phải vào trang Chi tiết sản phẩm; tuy nhiên giỏ hàng thiếu phím tắt hoặc ô nhập số lượng nhanh. |
| **H8** | **Aesthetic and minimalist design** *(Thiết kế thẩm mỹ và tối giản)* | Giao diện không nên chứa thông tin không liên quan hoặc hiếm khi cần đến. Mỗi đơn vị thông tin dư thừa đều cạnh tranh sự chú ý với thông tin quan trọng. | Trang chủ có thêm dòng chữ `<h1>Hiển thị 5 sản phẩm</h1>` ở cuối trang (vừa dư thừa thẻ `<h1>` vi phạm FR-21, vừa không đóng góp giá trị điều hướng). |
| **H9** | **Help users recognize, diagnose, and recover from errors** *(Giúp người dùng nhận biết, chẩn đoán và khôi phục khỏi lỗi)* | Thông báo lỗi phải diễn đạt bằng ngôn ngữ dễ hiểu (không xuất mã lỗi thô), chỉ rõ vấn đề là gì và hướng dẫn cách khắc phục cụ thể. | Ở trang Đăng ký và Quên mật khẩu (`Register.jsx`, `ForgotPassword.jsx`), thông báo lỗi báo *"Mật khẩu phải gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT"*, nhưng biểu thức chính quy (regex) bên dưới lại kiểm tra khoảng trắng (`\s`), khiến người dùng làm đúng hướng dẫn vẫn không qua được bước kiểm tra. |
| **H10** | **Help and documentation** *(Trợ giúp và tài liệu hướng dẫn)* | Tốt nhất là hệ thống dùng được ngay không cần tài liệu; nhưng khi cần, thông tin trợ giúp phải dễ tìm, gắn với bước thao tác của người dùng và ngắn gọn. | Luồng Quên mật khẩu 2 bước và phần nhập Mã giảm giá chưa có chú thích ngắn (tooltip/helper text) giải thích quy tắc áp dụng mã (ví dụ chỉ áp dụng 1 mã cho mỗi đơn). |

### 3.2. Liên hệ với các bộ nguyên lý khác
Bên cạnh 10 Heuristics của Nielsen, ngành HCI còn có:
- **8 Golden Rules of Interface Design của Ben Shneiderman:** (1) Strive for consistency, (2) Cater to universal usability, (3) Offer informative feedback, (4) Design dialogs to yield closure, (5) Prevent errors, (6) Permit easy reversal of actions, (7) Keep users in control, (8) Reduce short-term memory load.
- **Nguyên lý thiết kế của Don Norman (*The Design of Everyday Things*):** *Affordance* (khả năng gợi ý thao tác), *Signifiers* (dấu hiệu chỉ dẫn), *Feedback* (phản hồi tức thời), *Mappings* (ánh xạ tự nhiên), *Constraints* (ràng buộc chống thao tác sai).

Các bộ nguyên lý này chồng lấn mạnh với Nielsen (ví dụ: *Feedback* của Norman $\leftrightarrow$ **H1**; *Permit easy reversal of actions* của Shneiderman $\leftrightarrow$ **H3**; *Constraints* $\leftrightarrow$ **H5**). Nhóm thống nhất chọn **10 Heuristics của Nielsen** làm chuẩn chung xuyên suốt seminar vì tính phổ biến rộng rãi và đi kèm sẵn thang điểm mức độ nghiêm trọng.

### 3.3. Thang điểm Severity Rating `0–4` của Nielsen

Để ưu tiên nguồn lực sửa lỗi, Jakob Nielsen định nghĩa thang **Severity Rating (Mức nghiêm trọng)** từ `0` đến `4` dựa trên sự kết hợp của **3 yếu tố**:
1. **Frequency (Tần suất):** Lỗi xảy ra thường xuyên hay hiếm gặp?
2. **Impact (Tác động):** Khi lỗi xảy ra, người dùng có dễ dàng vượt qua hay bị chặn đứng?
3. **Persistence (Tính lặp lại):** Người dùng chỉ bỡ ngỡ lần đầu rồi tự biết cách tránh, hay sẽ liên tục bị làm phiền mỗi lần sử dụng?

| Mức điểm | Phân loại (Nielsen Severity Scale) | Ý nghĩa & Mức độ ưu tiên xử lý | Ví dụ minh họa trên EShop |
| --- | --- | --- | --- |
| **0** | **Not a usability problem** *(Không phải lỗi khả dụng)* | Không ảnh hưởng đến trải nghiệm thực thi nhiệm vụ của người dùng (hoặc là ý kiến cá nhân không có căn cứ). | — |
| **1** | **Cosmetic problem only** *(Lỗi thẩm mỹ đơn thuần)* | Chỉ liên quan đến hình thức nhỏ, không cản trở thao tác; chỉ cần sửa khi còn dư thời gian dự án. | Khoảng cách lề nhỏ giữa các phần tử không ảnh hưởng đến khả năng đọc. |
| **2** | **Minor usability problem** *(Lỗi khả dụng nhỏ)* | Gây bối rối nhẹ hoặc thiếu nhất quán nhỏ nhưng người dùng dễ dàng vượt qua ngay; ưu tiên sửa mức thấp. | **G01:** Nhãn `"Tổng tạm tính"` thay vì `"Tổng cộng"` ở giỏ hàng; **G07:** Nút `"Thoát"` thay vì `"Đăng xuất"`. |
| **3** | **Major usability problem** *(Lỗi khả dụng lớn)* | Gây khó khăn đáng kể, làm tăng thời gian thao tác, gây mất dữ liệu hoặc khiến người dùng hiểu sai trạng thái; **ưu tiên sửa cao**. | **G02:** Bấm `"Xóa"` xóa ngay không hỏi xác nhận; **G03:** Không có nút `+/-` số lượng; **G10:** Nút `"Thêm vào giỏ"` phải bấm 2 lần mới ăn. |
| **4** | **Usability catastrophe** *(Thảm họa khả dụng)* | Ngăn cản người dùng hoàn thành nhiệm vụ hoặc gây hậu quả nghiêm trọng về dữ liệu/nghiệp vụ; **bắt buộc phải sửa trước khi phát hành**. | **G06:** Ô `"Tổng tiền thanh toán"` ở Checkout cho phép người dùng gõ sửa số tiền thanh toán tùy ý; lỗi regex mật khẩu ở `Register.jsx` chặn hoàn toàn người dùng đăng ký hợp lệ. |

---

## 4. So sánh Heuristic Evaluation và Usability Testing

Hai phương pháp này tiếp cận bài toán khả dụng từ hai góc độ bổ trợ nhau:

| Tiêu chí | Heuristic Evaluation (Đánh giá theo nguyên lý) | Usability Testing (Kiểm thử với người dùng) |
| --- | --- | --- |
| **Người thực hiện** | 3–5 chuyên gia/người đánh giá độc lập (Evaluators) hoặc AI Agent đóng vai chuyên gia | Người dùng đại diện thật (Participants — tối thiểu ~5 người/vòng) |
| **Cơ sở phát hiện lỗi** | Đối chiếu giao diện với bộ 10 nguyên lý của Nielsen (H1–H10) | Quan sát hành vi thực tế, đường đi click, chỗ bị kẹt khi làm nhiệm vụ |
| **Quy trình chuẩn** | (1) Đánh giá độc lập 2 lượt → (2) Ghi nhận vi phạm → (3) Gộp & khử trùng → (4) Chấm Severity 0–4 | (1) Lập Test Plan & Kịch bản → (2) Tuyển người → (3) Chạy phiên test (Maze / Moderated) → (4) Phân tích chỉ số & Heatmap |
| **Chi phí & Tốc độ** | Nhanh, chi phí thấp, thực hiện được ngay từ giai đoạn sớm | Tốn thời gian thiết kế study, chuẩn bị môi trường public và tuyển người tham gia |
| **Ưu điểm nổi bật** | Bắt tốt các lỗi không nhất quán, vi phạm chuẩn thiết kế hoặc các trường hợp biên | Phản ánh chính xác mô hình tư duy (mental model) và điểm nghẽn thật của người dùng |
| **Hạn chế chính** | Dễ sinh **False Positive (Báo nhầm)** — báo các vấn đề lý thuyết mà người dùng thực tế không bận tâm; 1 người đánh giá đơn lẻ chỉ tìm được khoảng **35%** số lỗi (theo nghiên cứu của NN/g) | Phụ thuộc vào kịch bản nhiệm vụ được giao; với cỡ mẫu nhỏ khó phủ hết toàn bộ các nhánh chức năng phụ |

> **Chiến lược kết hợp tối ưu:** Thực hiện **Heuristic Evaluation** trước để quét sạch các lỗi bề mặt rõ ràng ("low-hanging fruit"), sau đó tổ chức **Usability Testing** với người tham gia thật để kiểm chứng luồng nhiệm vụ trọng tâm.

---

## 5. Phân loại phương pháp & Quy mô mẫu trong Usability Testing

### 5.1. Các chiều phân loại phương pháp Usability Testing

1. **Theo mức độ điều phối (Moderation):**
   - **Moderated Usability Testing (Có điều phối):** Có **Facilitator (Người điều phối)** trực tiếp hướng dẫn, quan sát theo thời gian thực (trực tiếp tại phòng lab hoặc qua Google Meet/Zoom) và đặt câu hỏi đào sâu ngay khi người tham gia nhíu mày hay khựng lại. Phù hợp khi cần dữ liệu định tính sâu sắc thông qua kỹ thuật **Think-aloud (Nói to suy nghĩ)** — người tham gia vừa thao tác vừa nói ra những gì họ đang nghĩ và kỳ vọng.
   - **Unmoderated Usability Testing (Không điều phối):** Người tham gia tự mở đường dẫn kiểm thử (như link **Maze**) trên thiết bị của mình vào thời gian linh hoạt mà không có người điều phối đi kèm. Công cụ tự động ghi lại đường đi, thời gian, toạ độ click và câu trả lời khảo sát. Ưu điểm là thu thập dữ liệu nhanh, khách quan, không bị ảnh hưởng bởi sự có mặt của người quan sát; nhược điểm là không hỏi lại được lý do tại sao người tham gia bỏ cuộc hay bấm nhầm.
2. **Theo địa điểm và thời gian:**
   - **In-lab (Tại phòng thí nghiệm):** Kiểm soát chặt chẽ thiết bị và môi trường, nhưng chi phí cao.
   - **Remote Synchronous (Từ xa đồng bộ):** Gọi video chia sẻ màn hình trực tiếp.
   - **Remote Asynchronous (Từ xa bất đồng bộ):** Người tham gia tự làm qua nền tảng như Maze, UXtweak, Lyssna.
   - **Guerrilla / Hallway Testing:** Nhờ nhanh người xung quanh (sinh viên sảnh trường, quán cà phê) dùng thử 5–10 phút để lấy phản hồi tức thì với chi phí gần như bằng không.

### 5.2. Quy tắc 5 người tham gia của Nielsen & Landauer (1993)

Theo mô hình toán học của Jakob Nielsen và Thomas K. Landauer (1993), tỷ lệ vấn đề khả dụng tìm được khi kiểm thử với $n$ người tham gia được tính theo công thức:

$$\text{Tỷ lệ lỗi phát hiện} = 1 - (1 - L)^n$$

Trong đó $L \approx 31\%$ là xác suất trung bình một người tham gia phát hiện ra một lỗi khả dụng trong một nhiệm vụ. Từ công thức này:
- Với $n = 1$ người: tìm được $\approx 31\%$ vấn đề.
- Với $n = 3$ người: tìm được $\approx 67\%$ vấn đề.
- Với **$n = 5$ người**: tìm được **$1 - (1 - 0,31)^5 \approx 84,6\% \approx 85\%$** vấn đề usability phổ biến.
- Với $n = 15$ người: tiến gần tới $99\%$, nhưng hiệu suất biên giảm mạnh từ người thứ 6 trở đi.

Do đó, trong kiểm thử khả dụng hướng phát hiện lỗi (formative usability testing), **5 người tham gia cho mỗi vòng lặp** là con số tối ưu về chi phí – hiệu quả (thực hiện 3 vòng × 5 người sau mỗi lần sửa lỗi hiệu quả hơn nhiều so với chạy 1 vòng duy nhất 15 người). Lưu ý: chỉ khi cần kiểm định thống kê định lượng chặt chẽ (ví dụ so sánh A/B testing điểm SUS giữa hai phiên bản) mới cần cỡ mẫu lớn hơn ($\ge 20$ người).

---

## 6. Thiết kế Kịch bản Nhiệm vụ (Task Scenario) & Bộ Chỉ số Đo lường (Metrics)

### 6.1. Nguyên tắc viết Kịch bản Nhiệm vụ (Task Scenario)

Một **Task Scenario (Kịch bản nhiệm vụ)** tốt phải cung cấp bối cảnh thực tế và mục tiêu cuối cùng, nhưng **tuyệt đối không dẫn dắt từng bước hay dùng đúng từ khóa trên nhãn nút (button label)** của giao diện. Nếu kịch bản chứa tên nút, bài kiểm thử sẽ biến thành bài kiểm tra khả năng đọc chữ và khớp từ thay vì kiểm tra thiết kế giao diện:

| Kịch bản kém (Lộ tên nút & đường đi) | Kịch bản chuẩn (Áp dụng trong Study Maze của nhóm) |
| --- | --- |
| *"Vào trang chủ, bấm vào sản phẩm Bàn phím cơ Keychron Q1, bấm nút 'Thêm vào giỏ hàng', bấm menu 'Giỏ hàng' rồi bấm 'Tiến hành thanh toán', gõ VIP100 vào ô 'Mã Giảm Giá' rồi bấm 'Xác Nhận Thanh Toán'."* | *"Bạn có ngân sách 5.000.000 ₫ và muốn mua một món phụ kiện cho máy tính. Hãy tìm sản phẩm phù hợp, mua sản phẩm đó và dùng mã giảm giá VIP100 khi thanh toán."* |

### 6.2. Hệ thống Chỉ số Đo lường (Usability Metrics)

Các chỉ số trong Usability Testing được chia thành hai nhóm: **chỉ số hành vi (Behavioral / Performance metrics)** và **chỉ số thái độ/cảm nhận (Attitudinal / Satisfaction metrics)**:

1. **Task Success Rate (Tỷ lệ hoàn thành nhiệm vụ — Effectiveness):**
   $$\text{Task Success Rate} = \frac{\text{Số người tham gia hoàn thành đúng mục tiêu}}{\text{Tổng số người tham gia thực hiện nhiệm vụ}} \times 100\%$$
   Trên Maze, chỉ số này được tách chi tiết thành **Direct Success** (hoàn thành đúng theo đường đi chuẩn `Expected Path`) và **Indirect Success** (hoàn thành mục tiêu nhưng đi đường vòng qua các trang khác).
2. **Time on Task (Thời gian làm nhiệm vụ — Efficiency):**
   Khoảng thời gian tính bằng giây từ lúc người tham gia bắt đầu màn hình nhiệm vụ đến khi đạt trang đích hoặc bỏ cuộc. Thời gian kéo dài bất thường ở một màn hình báo hiệu sự ngập ngừng hoặc khó hiểu trong thiết kế.
3. **Error Rate & Misclick Rate (Tỷ lệ lỗi & Tỷ lệ click nhầm — Effectiveness/Efficiency):**
   - **Misclick Rate (trong Maze):** Tỷ lệ phần trăm các cú click rơi vào vùng không phải là điểm chuyển tiếp hợp lệ trên trang.
   - **Rage Click / Dead Click:** Hiện tượng người dùng bấm liên tục nhiều lần vào cùng một vị trí do bực bội hoặc do nút bấm không phản hồi (điển hình là lỗi **`G10`** trên trang Chi tiết sản phẩm của EShop).
4. **SEQ — Single Ease Question (Câu hỏi đơn đánh giá độ dễ — Satisfaction cấp độ nhiệm vụ):**
   - Đặt ngay sau khi kết thúc mỗi nhiệm vụ: *"Nhìn chung, nhiệm vụ vừa rồi dễ hay khó thực hiện?"* trên thang **1 đến 7** (`1 = Rất khó`, `7 = Rất dễ`).
   - Ưu điểm: ngắn gọn, thực hiện ngay khi trải nghiệm vừa diễn ra nên phản ánh chính xác điểm nghẽn của từng nhiệm vụ riêng lẻ (mốc trung bình chuẩn khoảng **5,5 / 7**).
5. **SUS — System Usability Scale (Thang đo khả dụng hệ thống — Satisfaction cấp độ toàn hệ thống):**
   - Do **John Brooke (1996)** xây dựng, gồm **10 câu hỏi** theo thang Likert 5 mức (`1 = Rất không đồng ý` … `5 = Rất đồng ý`), xen kẽ **5 câu lẻ mang ý nghĩa tích cực** và **5 câu chẵn mang ý nghĩa tiêu cực** để chống tâm lý đánh dấu máy móc một phía (acquiescence bias).
   - **Quy tắc tính điểm SUS:**
     - Với các câu lẻ ($i \in \{1, 3, 5, 7, 9\}$): Điểm đóng góp $= X_i - 1$ (nhận giá trị từ $0$ đến $4$).
     - Với các câu chẵn ($j \in \{2, 4, 6, 8, 10\}$): Điểm đóng góp $= 5 - X_j$ (nhận giá trị từ $0$ đến $4$).
     - Cộng tổng điểm đóng góp của cả 10 câu (tối đa $40$), sau đó nhân với hệ số **$2,5$** để quy đổi về thang **$0 - 100$**:
       $$\text{SUS} = 2,5 \times \left( \sum_{\text{lẻ}} (X_i - 1) + \sum_{\text{chẵn}} (5 - X_j) \right)$$
   - **Lưu ý quan trọng khi diễn giải SUS:** Điểm SUS nằm trong đoạn $[0, 100]$ nhưng **không phải là phần trăm**. Theo nghiên cứu tổng hợp của Jeff Sauro (*MeasuringU*), điểm SUS trung bình của hàng nghìn sản phẩm phần mềm là **68 điểm** (tương ứng phân vị thứ 50 — hạng C). Điểm từ **80,3 trở lên** đạt hạng A; điểm **dưới 68** cho thấy giao diện tồn tại vấn đề khả dụng cần khắc phục; điểm **dưới 50** là mức không chấp nhận được (hạng F).

---

## 7. Cấu trúc Usability Test Plan 9 phần (Áp dụng cho EShop)

Trước khi triển khai kiểm thử khả dụng trên Maze, nhóm lập **Usability Test Plan (Kế hoạch kiểm thử khả dụng)** gồm 9 phần chuẩn mực:

| # | Hạng mục trong Test Plan | Nội dung cụ thể áp dụng cho Seminar Nhóm 09 (SUT EShop) |
| --- | --- | --- |
| **1** | **Mục đích & Phạm vi (Purpose & Scope)** | Đánh giá khả năng người dùng tìm mua sản phẩm theo ngân sách và áp dụng mã giảm giá trên luồng Checkout của EShop (`Home` → `ProductDetail` → `Cart` → `Checkout`). |
| **2** | **Hồ sơ người tham gia & Tuyển chọn (Participants)** | 5–6 sinh viên/người dùng ngoài nhóm, quen thuộc với mua sắm trực tuyến cơ bản nhưng chưa từng xem mã nguồn hay danh sách lỗi của EShop. |
| **3** | **Phương pháp & Thiết kế (Methodology)** | Kiểm thử từ xa không điều phối (**Remote Unmoderated Usability Testing**) qua nền tảng **Maze** (Live Website Testing), bổ sung quan sát trực tiếp (Think-aloud) với 1–2 người nếu cần làm rõ nguyên nhân. |
| **4** | **Danh sách Nhiệm vụ & Kịch bản (Task Scenarios)** | Mission mua một phụ kiện máy tính trong ngân sách `5.000.000 ₫` (bàn phím Keychron Q1 giá `4.000.000 ₫`) và áp dụng mã giảm giá `VIP100` khi thanh toán. |
| **5** | **Môi trường, Thiết bị & Dữ liệu (Environment & Data)** | EShop Frontend + Backend được deploy ra URL public; mỗi người tham gia được cấp 1 tài khoản riêng (`p1@eshop.com` … `p6@eshop.com` / `Test1234!`); reset DB trước mỗi đợt. |
| **6** | **Vai trò thực hiện (Roles)** | **Phúc (B):** thiết kế study, chuẩn bị môi trường & dữ liệu, điều phối đợt chạy và tổng hợp chỉ số; **Quang (A) & Quân (C):** rà soát kịch bản, chạy pilot kỹ thuật và đối chiếu với kết quả AI Reviewer. |
| **7** | **Chỉ số định lượng & Ngưỡng kỳ vọng (Metrics)** | Thu thập **Task Success Rate** (Direct / Indirect), **Time on Task**, **Misclick Rate**, **Click Heatmap** trên từng màn hình. |
| **8** | **Bảng hỏi sau kiểm thử (Post-test Questionnaires)** | Câu hỏi **SEQ (thang 1–7)** ngay sau Mission 1 và bảng hỏi **SUS (10 câu, thang 1–5)** ở cuối study. |
| **9** | **Định dạng Báo cáo & Đề xuất (Reporting)** | Tổng hợp bảng số liệu, ảnh chụp Heatmap/Path vào `evidence/maze/`, đối chiếu với danh sách lỗi `ground-truth/bugs.md` và bảng so sánh Người vs AI. |

---

## 8. Nguồn tham khảo

- ISO 9241-11:2018 — *Ergonomics of human-system interaction — Part 11: Usability: Definitions and concepts*, International Organization for Standardization (2018).
- Jakob Nielsen — *[10 Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/)*, Nielsen Norman Group (1994, cập nhật 2024).
- Jakob Nielsen — *[Severity Ratings for Usability Problems](https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/)*, Nielsen Norman Group (1994).
- Jakob Nielsen & Thomas K. Landauer — *A mathematical model of the finding of usability problems*, Proceedings of ACM INTERCHI'93 (1993) — *[Why You Only Need to Test with 5 Users](https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/)*.
- Jeffrey Rubin & Dana Chisnell — *Handbook of Usability Testing: How to Plan, Design, and Conduct Effective Tests* (2nd Edition), Wiley (2008).
- Steve Krug — *Don't Make Me Think, Revisited* (2014) & *Rocket Surgery Made Easy* (2009).
- John Brooke — *SUS: A 'Quick and Dirty' Usability Scale*, trong *Usability Evaluation in Industry*, Taylor & Francis (1996).
- Jeff Sauro — *[Measuring Usability with the System Usability Scale (SUS)](https://measuringu.com/sus/)*, MeasuringU (2011).
