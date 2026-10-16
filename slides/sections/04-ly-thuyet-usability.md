<!-- Phụ trách: Phúc. Bản nháp do Quân soạn (có dùng Claude), Phúc review và chỉnh trước khi trình bày. Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">04</p>

## Lý thuyết Usability Testing

- Usability là gì (ISO 9241-11)
- Nguyên lý thiết kế: 10 heuristic của Nielsen, thang severity
- Heuristic evaluation và usability testing
- Phương pháp, chỉ số (SUS, SEQ) và test plan

Note: Phần này trả lời câu hỏi "người dùng có dùng được không".

---

## Usability là gì?

**ISO 9241-11:2018:** mức độ một hệ thống có thể được **người dùng cụ thể** sử dụng để đạt **mục tiêu cụ thể** với **hiệu quả, hiệu suất và sự hài lòng** trong một **bối cảnh sử dụng** cụ thể.

| Thành phần | Câu hỏi | Đo bằng |
| --- | --- | --- |
| Effectiveness (hiệu quả) | Có làm xong nhiệm vụ không? | Tỷ lệ hoàn thành, số lỗi |
| Efficiency (hiệu suất) | Tốn bao nhiêu công sức? | Thời gian, số click |
| Satisfaction (hài lòng) | Cảm thấy thế nào? | SUS, SEQ |

Note: Ba thành phần này là gốc của mọi chỉ số ở cuối phần.

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

## Thang severity 0–4 (Nielsen)

<div class="scale">
<div><b>0</b>Không phải lỗi usability</div>
<div><b>1</b>Lỗi thẩm mỹ, sửa khi có thời gian</div>
<div><b>2</b>Lỗi nhỏ, ưu tiên thấp</div>
<div><b>3</b>Lỗi lớn, ưu tiên cao</div>
<div><b>4</b>Thảm họa, phải sửa trước khi phát hành</div>
</div>

- Căn cứ chấm: **tần suất** gặp · **tác động** (có vượt qua được không) · **tính lặp lại** (gặp mãi hay chỉ lần đầu)
- Ví dụ: "Xóa không hỏi lại" (H3) → mất dữ liệu, ai cũng gặp → **3**

Note: Cả nhóm và AI đều chỉ dùng thang này, để so sánh được với nhau.

---

## Hai cách đánh giá usability

| | Heuristic evaluation | Usability testing |
| --- | --- | --- |
| Ai làm | Chuyên gia, 3–5 người đánh giá độc lập | Người dùng đại diện |
| Dựa vào | Bộ nguyên lý (10 heuristic) | Hành vi thật khi làm nhiệm vụ |
| Chi phí | Thấp, nhanh | Cao hơn: tuyển người, tổ chức |
| Tìm được | Vi phạm nguyên lý, kể cả lỗi hiếm | Chỗ người dùng thật sự bị kẹt |
| Điểm yếu | Có thể báo lỗi mà người dùng không gặp | Ít người tham gia, khó bao phủ hết |

<p class="small">Nên kết hợp: heuristic evaluation trước để dọn lỗi rõ ràng, usability testing sau.</p>

Note: Phần 8 dùng AI làm "người đánh giá heuristic" và so với người đánh giá thật.

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

## Chỉ số đo usability

| Chỉ số | Cách tính | Thuộc |
| --- | --- | --- |
| Task success rate | % người hoàn thành nhiệm vụ | Hiệu quả |
| Error rate / misclick rate | Số thao tác sai / tổng thao tác | Hiệu quả |
| Time on task | Thời gian từ lúc bắt đầu đến lúc xong hoặc bỏ cuộc | Hiệu suất |
| **SEQ** (Single Ease Question) | 1 câu sau mỗi nhiệm vụ: "Dễ hay khó?" thang 1–7 | Hài lòng |
| **SUS** (System Usability Scale) | 10 câu sau cả buổi, quy ra điểm 0–100 | Hài lòng |

Note: Ba nhóm chỉ số ứng với ba thành phần của ISO 9241-11.

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

## Tóm tắt phần 4

- Usability = **hiệu quả + hiệu suất + hài lòng** trong bối cảnh cụ thể (ISO 9241-11)
- Nguyên lý chung: **10 heuristic Nielsen**, chấm **severity 0–4**
- **Heuristic evaluation** (chuyên gia, rẻ) bổ sung cho **usability testing** (người dùng thật)
- Khoảng **5 người** cho mỗi vòng test; đo bằng success rate, time on task, **SEQ**, **SUS**

Note: Chuyển sang phần 5: khảo sát và so sánh công cụ.
