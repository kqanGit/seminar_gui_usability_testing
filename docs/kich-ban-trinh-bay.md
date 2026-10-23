# Kịch bản trình bày seminar T1 — 30 phút

> Người soạn: Quân (có dùng Claude) · Ngày soạn: 23/10/2026 · Dùng cùng bản slide 30 phút (`slides/`, 52 slide chính + phụ lục).
> Mục đích: cả nhóm đọc qua để hình dung buổi trình bày từ lúc vào lớp đến lúc trả lời câu hỏi. Lời thoại là gợi ý, mỗi người tự nói lại theo giọng mình, **không đọc thuộc lòng**.
> Chỗ có `[…]` là số liệu điền sau khi chạy demo / study.

---

## 0. Những điều cần chốt với thầy trước ngày trình bày

| Câu hỏi | Vì sao cần hỏi |
| --- | --- |
| 30 phút đã gồm hỏi đáp chưa? | Nếu chưa gồm: giữ nguyên kịch bản. Nếu đã gồm: cắt theo mục 6 để còn 5 phút hỏi đáp. |
| 30 phút đã gồm phần bài tập cho lớp chưa? | Kịch bản hiện chỉ có Showdown 90 giây; bản 20–25 phút đã chuyển thành bài về nhà. |
| Demo chiếu clip được không, hay bắt buộc chạy live? | Kịch bản mặc định chiếu đoạn trích clip (an toàn); live chỉ là phương án thêm. |
| Máy chiếu dùng laptop nhóm hay máy lớp? | Quyết định có cần mang file PDF + video offline hay không. |

---

## 1. Chuẩn bị trước

### 3 ngày trước (T-3)

- [ ] Đủ link YouTube cho mọi clip: PW-1, PW-2, PW-3, UXtweak-1, UXtweak-2, UXtweak-3, AI-1, AI-2, AI-3. Thay hết chữ "(đang quay)" trên slide.
- [ ] Mỗi clip có **một đoạn trích 30–60 giây** để chiếu trên lớp (cắt sẵn, tải file `.mp4` về máy, không phụ thuộc mạng).
- [ ] Điền số liệu thật vào slide: kết quả Demo 3 Playwright, kết quả study UXtweak, bảng người vs AI.
- [ ] Checklist chấm đủ 50 câu, cập nhật slide "Kết quả và mức tự động hóa".
- [ ] Chạy AI Reviewer trước trên ảnh Giỏ hàng, lưu kết quả JSON và 1 slide/ảnh kết quả để dùng ở phần Showdown.
- [ ] Mỗi người **tập riêng phần mình có bấm giờ**, ghi lại số phút thật.

### 1 ngày trước (T-1)

- [ ] **Tổng duyệt cả nhóm một lần, bấm giờ đủ 30 phút**, đổi người nói đúng như thật.
- [ ] Xuất PDF slide (`/slides/?print-pdf`) làm bản dự phòng; chép PDF + các file clip vào USB.
- [ ] Kiểm tra slide mở được khi **không có mạng** (reveal.js nạp từ CDN: nếu phòng không có mạng thì dùng PDF).
- [ ] Sạc đầy laptop, mang sạc, cổng chuyển HDMI.

### Sáng hôm đó, 15 phút trước giờ

1. Cắm máy chiếu, mở slide ở tab 1 (`npx serve -l 8080` ở thư mục gốc repo → `http://localhost:8080/slides/`), bấm `F` để toàn màn hình.
2. Mở sẵn các file clip ở trình phát video, tua về đầu đoạn trích.
3. (Nếu demo live) chạy EShop: backend `:3000`, frontend `:5173`; mở terminal ở `tests/playwright/` và `ai-reviewer/`, chữ terminal phóng to (Ctrl + `+`).
4. Tắt thông báo máy, tắt Zalo/Messenger trên laptop chiếu.
5. Phân vai ngoài lề:
   - **Người bấm giờ:** người không đang nói, giơ tay ra hiệu khi còn 30 giây của mỗi phần.
   - **Người bấm slide:** ai nói thì người đó bấm (đỡ phải ra hiệu "next").

---

## 2. Dòng thời gian tổng

| Phút | Phần | Người nói | Slide | Trên màn hình |
| --- | --- | --- | --- | --- |
| 0:00 – 2:00 | 01 Mở đầu | Quân | 1–6 | Slide |
| 2:00 – 4:00 | 02 Lý thuyết GUI | Quang | 7–11 | Slide |
| 4:00 – 6:00 | 03 Checklist 50 câu | Quang | 12–15 | Slide + ảnh minh chứng |
| 6:00 – 8:30 | 04 Lý thuyết Usability | Phúc | 16–21 | Slide |
| 8:30 – 10:00 | 05 Chọn công cụ | Phúc | 22–23 | Slide |
| 10:00 – 16:00 | 06 Playwright + axe | Quang | 24–30 | Slide + 3 đoạn clip |
| 16:00 – 20:00 | 07 UXtweak | Phúc | 31–36 | Slide + clip + heatmap |
| 20:00 – 26:00 | 08 AI Heuristic Reviewer | Quân | 37–46 | Slide + 2 đoạn clip |
| 26:00 – 28:00 | 09 Bài tập | Quân | 47–49 | Slide, lớp tham gia |
| 28:00 – 30:00 | 10 Tổng kết | Quân | 50–52 | Slide → hỏi đáp |

**Mốc kiểm tra giờ:** hết phần 05 phải ở khoảng **10:00**; hết phần 07 ở khoảng **20:00**. Nếu trễ hơn 1 phút ở mốc nào thì áp dụng mục 6.

---

## 3. Kịch bản chi tiết

### 0:00 — Slide tiêu đề + Phần 01 Mở đầu (Quân, 2 phút)

**Slide 1 — Tiêu đề** (khoảng 10 giây)

> "Em chào thầy và các bạn. Nhóm 09 gồm Quang, Phúc và em là Quân. Đề tài của nhóm là T1: kiểm thử giao diện và tính khả dụng, làm trên luồng mua hàng của EShop."

**Slide 2 — divider 01:** bấm qua luôn.

**Slide 3 — Chạy đúng ≠ dùng được** (khoảng 40 giây)

> "Trên EShop, người dùng vẫn đặt được hàng. Mọi test chức năng đều pass. Nhưng: bấm Xóa là mất sản phẩm ngay, không hỏi lại. Ô tổng tiền ở trang thanh toán thì… sửa được bằng tay. Và bấm Thêm vào giỏ lần đầu không thấy gì xảy ra.
> Hệ thống đúng về kỹ thuật, nhưng người dùng bối rối, thao tác nhầm, rồi bỏ đi. Đó là lý do có đề tài này."

**Slide 4 — Hai câu hỏi của đề tài T1** (khoảng 25 giây)

> "Đề tài có hai câu hỏi. GUI testing hỏi: giao diện có đúng đặc tả không. Usability testing hỏi: người dùng có dùng được không. Nhóm dùng Playwright cho câu thứ nhất, UXtweak cho câu thứ hai, và một AI Heuristic Reviewer tự xây để thử làm cả hai, rồi so với con người."

**Slide 5 — SUT** (khoảng 25 giây)

> "Mọi thứ hôm nay chạy trên cùng một luồng: đăng nhập, chọn sản phẩm, giỏ hàng, thanh toán. EShop có sẵn đặc tả giao diện từ FR-21 đến FR-24, nên đúng hay sai là đo được."

**Slide 6 — Lộ trình 30 phút** (khoảng 15 giây)

> "Nhóm sẽ đi từ lý thuyết, sang kiểm thử bằng tay với checklist, rồi tự động bằng công cụ, rồi tới AI, và cuối cùng là một bài tập nhỏ cho lớp. Mời Quang."

---

### 2:00 — Phần 02 Lý thuyết GUI (Quang, 2 phút)

**Slide 7 — divider:** bấm qua.

**Slide 8 — GUI Testing là gì?** (khoảng 30 giây)

> "GUI testing là kiểm tra giao diện hiển thị và phản hồi đúng đặc tả. Có hai mảng: visuals là trông có đúng không (màu, chữ, bố cục), và controls là bấm, nhập vào có phản hồi đúng không."

**Slide 9 — Lỗi giao diện hay nằm ở đâu?** (khoảng 40 giây)

> "Lỗi giao diện ít khi nằm ở màn hình mặc định. Nó nằm ở phản hồi sau thao tác, ở hành động nguy hiểm như xóa, ở ô nhập liệu, ở sự nhất quán, và cả ở những thứ không nhìn thấy như thẻ h1. Cả năm dòng này đều là lỗi thật trên EShop mà nhóm đã xác nhận."

**Slide 10 — Tự động cái gì?** (khoảng 25 giây)

> "Không phải cái gì cũng nên tự động. Quy tắc lặp lại mọi trang, hồi quy sau mỗi lần sửa, nhiều kích thước màn hình: cho máy làm. Còn đánh giá đẹp hay dễ dùng: vẫn cần người."

**Slide 11 — Bộ kỹ thuật nhóm dùng** (khoảng 25 giây)

> "Nhóm dùng năm kỹ thuật: ghi lại thao tác rồi viết thành Page Object, chụp ảnh so sánh, quét accessibility bằng axe, chạy trên ba kích thước màn hình, và LLM đọc ảnh. Nhưng trước khi tự động, nhóm làm bằng tay trước, với checklist."

---

### 4:00 — Phần 03 Checklist 50 câu (Quang, 2 phút)

**Slide 12 — divider:** bấm qua.

**Slide 13 — Checklist: câu hỏi có/không** (khoảng 45 giây)

> "Checklist là cách kiểm thử GUI truyền thống: đi qua từng loại control và trả lời câu hỏi có hoặc không. Bộ câu hỏi dùng chung cho mọi giao diện; nhóm áp dụng trên luồng mua hàng.
> Ví dụ câu 9: ô mật khẩu có ẩn ký tự không? EShop Fail: mật khẩu hiện rõ. Câu 17: xóa có hỏi xác nhận không? Fail. Câu 22: ô tổng tiền có khóa không? Cũng Fail."

**Slide 14 — Câu 22 Fail (ảnh)** (khoảng 20 giây)

> *(chỉ vào ô tổng tiền trên ảnh)* "Đây là ô tổng tiền. Người dùng sửa được số tiền mình phải trả. Lỗi này vi phạm H5, phòng ngừa lỗi, nhóm chấm severity 3."

**Slide 15 — Kết quả và mức tự động hóa** (khoảng 45 giây)

> "Trong [50] câu, có [..] câu Fail. Nhưng điều nhóm muốn nhấn mạnh là cột thứ hai: mỗi câu được phân loại máy có kiểm được không. Câu như 'mỗi trang có đúng một thẻ h1' thì máy kiểm 100%. Câu như 'ngôn ngữ có nhất quán không' thì vẫn cần người nhìn.
> Câu máy kiểm được thì đưa sang Playwright. Câu chỉ người làm được thì là chỗ nhóm thử AI. Trước đó, Phúc sẽ nói về câu hỏi thứ hai: người dùng có dùng được không."

---

### 6:00 — Phần 04 Lý thuyết Usability (Phúc, 2,5 phút)

**Slide 16 — divider:** bấm qua.

**Slide 17 — Usability là gì?** (khoảng 30 giây)

> "Theo ISO 9241-11, usability gồm ba thứ: hiệu quả, tức có làm xong việc không; hiệu suất, tức tốn bao nhiêu công sức; và hài lòng, tức cảm thấy thế nào."

**Slide 18 — 10 heuristic của Nielsen** (khoảng 35 giây)

> "Để đánh giá, giới UX dùng 10 heuristic của Nielsen. Không đọc hết, chỉ bốn cái in đậm là EShop vi phạm rõ: H1 thêm vào giỏ không có phản hồi, H3 xóa không hoàn tác được, H4 lúc ghi 'Thoát' lúc ghi 'Đăng xuất', H5 ô tổng tiền sửa được."

**Slide 19 — Thang severity 0–4** (khoảng 20 giây)

> "Mỗi vi phạm được chấm từ 0 đến 4. Ví dụ xóa không hỏi lại: mất dữ liệu, ai cũng gặp, nên là 3. Cả nhóm và AI đều chấm theo đúng thang này để so được với nhau."

**Slide 20 — Hai cách đánh giá** (khoảng 30 giây)

> "Có hai cách. Heuristic evaluation: chuyên gia soi theo 10 nguyên tắc, rẻ và nhanh. Usability testing: cho người dùng thật làm nhiệm vụ, đắt hơn nhưng thấy được chỗ họ thật sự bị kẹt. Nhóm làm cả hai."

**Slide 21 — Đo usability bằng gì?** (khoảng 25 giây)

> "Khi cho người dùng làm, nhóm đo tỷ lệ hoàn thành, độ lạc đường, thời gian, và hai bảng hỏi: SEQ một câu sau nhiệm vụ, SUS mười câu quy ra điểm trên 100, mốc trung bình là 68."

---

### 8:30 — Phần 05 Chọn công cụ (Phúc, 1,5 phút)

**Slide 22 — divider:** bấm qua.

**Slide 23 — So sánh công cụ** (khoảng 1 phút 20 giây)

> "Nhóm khảo sát 11 công cụ, bảng đầy đủ nằm trong proposal và phụ lục. Nhóm chọn ba: Playwright vì miễn phí, tự động hoàn toàn và có đủ bộ ba record-playback, data-driven, checkpoint. Về usability, ban đầu nhóm chọn Maze và đặt UXtweak làm dự phòng, nhưng khi triển khai thật thì Maze khóa tính năng Live Website Testing ở bản miễn phí (đòi gói 99 đô mỗi tháng), nên nhóm chuyển sang UXtweak và đã deploy EShop lên mạng. Thứ ba là AI Heuristic Reviewer do nhóm tự xây.
> Tóm lại: Playwright hỏi đúng đặc tả không, UXtweak hỏi dùng được không, AI làm lại cả hai để so với người. Mời Quang với Playwright."

> **Mốc giờ: lúc này phải khoảng 10:00.**

---

### 10:00 — Phần 06 Playwright + axe (Quang, 6 phút)

**Slide 24 — divider:** bấm qua.

**Slide 25 — Playwright là gì?** (khoảng 45 giây)

> "Playwright là framework kiểm thử web mã nguồn mở của Microsoft, chạy được trên Chromium, WebKit và Firefox. Ba điểm quan trọng: tìm phần tử theo vai trò và tên chứ không theo CSS dài; tự đợi phần tử sẵn sàng; và assertion tự thử lại, nên test ít chập chờn. axe-core chạy kèm để quét lỗi accessibility."

**Slide 26 — Bộ ba bắt buộc** (khoảng 40 giây)

> "Thầy yêu cầu mỗi công cụ có record-playback, data-driven và checkpoint. Trong Playwright: codegen ghi thao tác thành code; một test chạy qua file dữ liệu 5 trang nhân 3 kích thước; và checkpoint là expect, toHaveCSS, so ảnh, quét axe. Lưu ý: checkpoint của nhóm luôn là thuộc tính giao diện, không kiểm kết quả nghiệp vụ, vì đó là đề T2."

**Slide 27 — Demo 1 Cài đặt** (khoảng 40 giây, gồm clip 20 giây)

> "Cài đặt chỉ cần một lệnh npm init playwright." *(chiếu 20 giây cuối clip PW-1: báo cáo HTML)* "Test mẫu chạy, báo cáo HTML mở ra. Clip đầy đủ có link trên slide."

**Slide 28 — Demo 2 Record & Playback** (khoảng 1 phút 15 giây, gồm clip 45 giây)

> "Demo 2: dùng codegen ghi lại thao tác: vào trang chủ, thêm vào giỏ, mở giỏ hàng. Sau đó thêm một checkpoint: trang phải có chữ 'Tổng cộng' theo đặc tả." *(chiếu clip PW-2)* "Test fail. EShop ghi 'Tổng tạm tính'. Đây đúng là lỗi G01. Test fail ở đây là tin tốt: công cụ đã bắt được lỗi."

**Slide 29 — Demo 3 Data-driven** (khoảng 1 phút 45 giây, gồm clip 60 giây)

> "Demo 3 là phần chính. Một file test, đọc danh sách 5 trang, chạy trên 3 kích thước màn hình, mỗi vòng kiểm 4 checkpoint: đúng một thẻ h1, ảnh có alt, so ảnh với baseline, và quét axe." *(chiếu clip PW-3: báo cáo nhiều fail)* "Kết quả: [..] lượt chạy, [..] fail. Ví dụ checkpoint h1 fail ở Giỏ hàng và Thanh toán, đúng lỗi G05. axe tìm được [..] vi phạm WCAG.
> Một bẫy nhóm gặp: giỏ hàng của EShop chỉ lưu trong bộ nhớ, nên không thể nhảy thẳng vào trang giỏ; test phải thêm hàng trong cùng phiên."

**Slide 30 — Điểm yếu** (khoảng 50 giây)

> "Điểm yếu: Playwright không biết giao diện có dễ dùng không. So ảnh dễ báo nhầm khi khác font hay hệ điều hành. axe chỉ bắt được một phần lỗi accessibility. EShop không có data-testid nên đổi nhãn là test gãy. Và người dùng phải biết code.
> Playwright trả lời được 'đúng đặc tả không'. Còn 'dùng được không' thì cần người dùng thật. Mời Phúc với UXtweak."

---

### 16:00 — Phần 07 UXtweak (Phúc, 4 phút)

**Slide 31 — divider:** bấm qua.

**Slide 32 — UXtweak là gì?** (khoảng 40 giây)

> "UXtweak là nền tảng usability testing từ xa, không cần người điều phối: người tham gia tự làm qua một đường link. Trong công cụ Website Testing, nhóm gắn UXtweak Snippet lên trang EShop, giao nhiệm vụ (Task) kèm trang đích (/checkout) và đường đi tối ưu 4 trang. UXtweak tự ghi lại video thao tác, chia kết quả thành thành công trực tiếp, gián tiếp hoặc bỏ cuộc, và tự tính độ lạc đường (Lostness)."

**Slide 33 — Study của nhóm** (khoảng 50 giây)

> "Nhiệm vụ của nhóm: 'Bạn có tối đa 5 triệu, muốn mua một phụ kiện máy tính, hãy mua và dùng mã VIP100.' Kịch bản không nhắc tên nút nào, để đo được người dùng có tự tìm ra đường không. Nhóm chọn VIP100 thay vì SAVE10 vì mã phần trăm của EShop cố ý tính sai, sẽ làm nhiễu kết quả. [5–6] bạn ngoài nhóm tham gia, mỗi bạn một tài khoản riêng."

**Slide 34 — 3 demo UXtweak** (khoảng 1 phút, gồm clip 30 giây)

> "Ba demo: gắn UXtweak Snippet lên bản deploy Vercel; tạo Task với Success URL và câu hỏi SEQ rồi chạy thử 1 lượt xem Session Replay; và luồng đầy đủ gồm Welcome, Task, SEQ, bảng SUS 10 câu gửi cho 5 người tham gia, kèm Session Recording để lấy Heatmap." *(chiếu đoạn clip UXtweak-2 hoặc UXtweak-3)*

**Slide 35 — Kết quả study** (khoảng 50 giây)

> "Kết quả: [..]% hoàn thành, [..] thành công trực tiếp, [..] đi vòng. SEQ trung bình [..] trên 7, SUS [..], [dưới/trên] mốc 68." *(chỉ vào heatmap / replay)* "Chỗ click lặp nhiều nhất là [..], khớp với lỗi [G10: phải bấm Thêm vào giỏ hai lần]."

**Slide 36 — Điểm yếu** (khoảng 40 giây)

> "Điểm yếu: gói miễn phí của UXtweak chỉ cho 1 study đang chạy, tối đa 1 task mỗi study và chỉ giữ kết quả 14 ngày. Cần URL public. Và vì không có người điều phối, công cụ cho thấy người dùng kẹt ở đâu nhưng không hỏi được vì sao. Muốn biết vì sao thì cần heuristic evaluation, tức là cần chuyên gia. Vậy AI có làm thay chuyên gia được không? Mời Quân."

> **Mốc giờ: lúc này phải khoảng 20:00.**

---

### 20:00 — Phần 08 AI Heuristic Reviewer (Quân, 6 phút)

**Slide 37 — divider** (khoảng 10 giây)

> "Heuristic evaluation cần 3 đến 5 chuyên gia. Câu hỏi của phần này: AI có làm thay được không?"

**Slide 38 — Bài chính CHI 2024** (khoảng 1 phút)

> "Câu này đã có người hỏi. Bài báo ở CHI 2024, hội nghị hạng A*, cho GPT-4 đánh giá giao diện theo 10 heuristic Nielsen rồi so với 12 chuyên gia. Kết quả: trong tất cả lỗi tìm được, 62% chỉ người thấy, 29% cả hai cùng thấy, chỉ 9% là AI thấy mà người bỏ sót. Precision của AI là 0,60, tức cứ 10 lỗi AI báo thì 4 cái là báo nhầm; người là 0,83.
> Nhưng bài này dùng GPT-4 năm 2023 và chỉ đọc file JSON, không nhìn hình. Nhóm làm lại cùng câu hỏi với model mới, gửi ảnh chụp màn hình thật, và đo trên EShop."

**Slide 39 — Nhóm làm khác ở đâu?** (khoảng 30 giây)

> "Nhóm cũng khảo sát các skill AI phổ biến trên GitHub. Các skill đó đọc code hoặc điều khiển trình duyệt, nhưng chưa thấy cái nào chấm theo Nielsen và đo độ chính xác so với người. Đó là phần nhóm tự xây dựng thêm."

**Slide 40 — Kiến trúc** (khoảng 30 giây)

> "Kiến trúc gồm bốn bước: Playwright dựng trạng thái và chụp ảnh từng trang; gửi ảnh kèm prompt 10 heuristic cho LLM có vision; nhận JSON; rồi so với người và ground truth. Muốn chạy website khác chỉ cần đổi file config."

**Slide 41 — Prompt** (khoảng 30 giây)

> "Bài báo chỉ ra AI hay bịa và lặp. Nên prompt ép bốn luật: chỉ báo cái nhìn thấy trên ảnh, mỗi lỗi phải có heuristic, vị trí, severity, cách sửa; không báo trùng; và chỉ trả JSON đúng schema, sai là gọi lại."

**Slide 42 — Demo 1 Cài đặt** (khoảng 15 giây)

> "Cài đặt: npm install, điền API key, chạy smoke test ra JSON hợp lệ. Clip có link trên slide." *(không chiếu clip)*

**Slide 43 — Demo 2 Giỏ hàng** (khoảng 1 phút, gồm clip 30 giây)

> "Demo 2 chạy trên trang Giỏ hàng." *(chiếu clip AI-2)* "AI thấy [lỗi Xóa không hỏi lại, nhãn Tổng tạm tính]. Nhưng nó không thấy [thiếu thẻ h1], vì h1 không hiện trên ảnh; và [không biết nút xanh lá là sai], vì nó không có đặc tả."

**Slide 44 — Demo 3 Toàn luồng** (khoảng 40 giây, gồm clip 20 giây)

> "Demo 3 chạy toàn luồng: 5 trang, 2 kích thước, mỗi cấu hình 3 lần để đo độ ổn định. Cả ba thành viên chấm heuristic bằng tay **trước** khi xem kết quả AI, để không bị ảnh hưởng." *(chiếu đoạn clip AI-3 đổi config sang website khác)* "Và đổi config là chạy được trên website khác, không sửa code."

**Slide 45 — Kết quả người vs AI** (khoảng 50 giây)

> "Đặt cạnh bài báo: precision của AI trên EShop là [..], bài báo là 0,60. Recall [..]. Chỉ người thấy [..]%, cả hai [..]%, chỉ AI [..]%. Severity AI chấm lệch trung bình [..] mức. Qua 3 lần chạy, [..]% lỗi lặp lại ổn định.
> Kết luận của nhóm: [model mới tốt hơn ở …, nhưng vẫn …]."

**Slide 46 — Giới hạn** (khoảng 30 giây)

> "AI không thấy cấu trúc HTML, không biết đặc tả, không thấy lỗi cần nhiều bước như phải bấm hai lần, và kết quả thay đổi giữa các lần chạy. Nên AI là trợ lý tăng tốc, con người duyệt cuối."

---

### 26:00 — Phần 09 Bài tập (Quân, 2 phút)

**Slide 47 — divider:** bấm qua.

**Slide 48 — Heuristic Showdown** (khoảng 1 phút 30 giây)

> "Giờ tới lượt các bạn. Đây là trang Giỏ hàng của EShop. Các bạn có 60 giây, tìm càng nhiều vi phạm heuristic càng tốt. Bắt đầu."
> *(bấm giờ 60 giây; người bấm giờ đếm to 10 giây cuối)*
> "Hết giờ. Bạn nào tìm được nhiều nhất?" *(hỏi nhanh 2–3 bạn, mỗi bạn nói 1 lỗi)*
> *(mở ảnh/kết quả AI đã chạy sẵn)* "Còn AI tìm được [..] lỗi: […]. Các bạn thấy [lỗi nút xanh lá] mà AI không thấy, còn AI thấy […] mà ít bạn để ý."

> Nếu lớp im lặng: Quân tự gợi ý "có ai thấy nút Xóa không?" để mở đầu.

**Slide 49 — Bài tập về nhà** (khoảng 20 giây)

> "Bản đầy đủ của trò này và hai bài nữa là bài về nhà, có gợi ý trong repo: viết một test Playwright, làm Showdown cả luồng, và tính điểm SUS."

---

### 28:00 — Phần 10 Tổng kết (Quân, 2 phút)

**Slide 50 — divider:** bấm qua.

**Slide 51 — 4 cách, cùng một luồng** (khoảng 1 phút 15 giây)

> "Tóm lại, nhóm đã kiểm cùng một luồng mua hàng bằng bốn cách. Checklist bằng tay: đủ ý nhưng chậm. Playwright: chạy lặp được trên nhiều màn hình nhưng không biết dễ dùng hay không. UXtweak: thấy hành vi người dùng thật nhưng ít người và không hỏi được vì sao. AI: nhanh và tái dùng được, nhưng bỏ sót, báo nhầm, cần người duyệt.
> Bài học của nhóm: con người đặt tiêu chí, máy chạy lặp, AI giúp tăng tốc, và con người duyệt cuối."

**Slide 52 — Cảm ơn** (khoảng 15 giây)

> "Toàn bộ slide, clip, bài tập nằm trong repo trên slide. Nhóm em cảm ơn thầy và các bạn đã lắng nghe. Nhóm sẵn sàng nhận câu hỏi."

*(để nguyên slide này trong lúc hỏi đáp)*

---

## 4. Phương án dự phòng

| Sự cố | Cách xử lý |
| --- | --- |
| Không có mạng, slide không nạp | Mở bản PDF trong USB. Clip phát từ file `.mp4` đã tải sẵn. |
| Clip không phát được | Nói kết quả theo ảnh/bảng trên slide, đọc link clip cho thầy. Không loay hoay quá 15 giây. |
| Máy chiếu không nhận laptop | Dùng máy lớp + PDF + file clip trong USB. |
| Demo live lỗi (nếu có chạy live) | Dừng ngay, chuyển sang clip: "Nhóm có clip đã quay sẵn của bước này." |
| Lớp không ai tham gia Showdown | Quân tự gợi ý một lỗi, rồi chiếu kết quả AI luôn. |
| Một thành viên vắng | Người ngồi kề đọc phần đó theo kịch bản này; mọi người nên đọc qua phần của nhau. |

---

## 5. Câu hỏi thầy và lớp có thể hỏi

| Câu hỏi | Gợi ý trả lời | Ai trả lời |
| --- | --- | --- |
| Bài báo dùng GPT-4, giờ model mạnh hơn nhiều thì còn đúng không? | Con số cụ thể đã cũ, nhưng câu hỏi và cách đo vẫn dùng được. Nghiên cứu 2025 với GPT-4o vẫn cho thấy AI báo nhầm nhiều và kém ở lỗi xuyên nhiều màn hình (phụ lục). Chính vì vậy nhóm đo lại với model mới trên EShop. | Quân |
| Checklist này chỉ dùng cho EShop hay dùng chung? | Câu hỏi theo control là dùng chung (ví dụ `type="password"`); một số câu lấy từ đặc tả riêng EShop (nhãn "Tổng cộng"). Nhóm áp dụng trên một luồng để vừa thời gian. | Quang |
| GUI testing của nhóm khác đề T2 (web automation) chỗ nào? | Click và nhập chỉ để đưa trang về đúng trạng thái; điểm kiểm tra luôn là thuộc tính giao diện, không kiểm giảm giá đúng hay đơn có lưu vào CSDL không. | Quang |
| Precision và recall tính thế nào? | Precision: trong số lỗi đã báo, bao nhiêu lỗi là thật. Recall: trong tất cả lỗi thật, tìm ra bao nhiêu. "Lỗi thật" lấy theo ground truth G01–G11 và kết quả người chấm. | Quân |
| Làm sao biết AI không bịa? | Prompt bắt chỉ báo cái nhìn thấy trên ảnh, ép JSON theo schema; mọi lỗi AI báo được đối chiếu với ground truth, lỗi không khớp tính là báo nhầm. Chạy 3 lần để đo độ ổn định. | Quân |
| Vì sao UXtweak chỉ 5–6 người, có đủ tin cậy không? | 5 người đủ để tìm phần lớn vấn đề (Nielsen & Landauer), nhưng không đủ cho thống kê; SUS của nhóm chỉ để tham khảo. | Phúc |
| Vì sao Proposal ghi Maze mà nhóm lại demo UXtweak? | Khi triển khai thực tế, Maze khóa khối Live Website Testing ở bản Free/Trial (yêu cầu gói trả phí ~\$99/tháng). Trong Proposal nhóm đã đặt sẵn UXtweak làm phương án dự phòng nên chuyển sang UXtweak. | Phúc |
| Ground truth ở đâu ra, có khách quan không? | Lấy từ đặc tả FR-21–24 của EShop, đối chiếu mã nguồn, Quang chạy và chụp ảnh xác nhận ngày 15/10; có file `ground-truth/bugs.md`. | Quang |
| Nhóm có dùng AI để làm seminar không? | Có, ghi rõ trong `AI_DISCLOSURE.md`: dùng gì, cho phần nào, ai review. Số liệu, demo, clip do nhóm tự chạy. | Quân |
| Vì sao không dùng Applitools / BrowserStack? | Chỉ có bản dùng thử, giới hạn thời gian; nhóm dừng ở mức miễn phí, có ghi trong bảng so sánh. | Phúc |

---

## 6. Nếu trễ giờ: cắt theo thứ tự này

1. **Phần 04:** bỏ slide "Hai cách đánh giá" (nói một câu ở slide severity). Tiết kiệm khoảng 30 giây.
2. **Phần 08:** bỏ chiếu clip Demo 3, chỉ nói kết quả. Tiết kiệm khoảng 20 giây.
3. **Phần 06:** Demo 1 chỉ nói một câu, không chiếu clip. Tiết kiệm khoảng 20 giây.
4. **Phần 09:** Showdown còn 30 giây, không hỏi lớp, chiếu kết quả AI luôn. Tiết kiệm khoảng 45 giây.
5. **Phần 02:** gộp slide "Tự động cái gì" và "Bộ kỹ thuật" thành một câu. Tiết kiệm khoảng 30 giây.

Không cắt: bảng người vs AI (phần 08), kết quả Demo 3 Playwright, kết quả UXtweak. Đây là phần thể hiện công sức của nhóm.
