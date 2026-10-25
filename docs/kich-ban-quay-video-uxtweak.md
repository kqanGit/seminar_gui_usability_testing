# Kịch bản Quay Video Demo Chi tiết: UXtweak & Microsoft Clarity (Vai B)

> **Người thực hiện:** Bửu Huỳnh Vĩnh Phúc (`23120328` — Vai B: Usability Testing)  
> **Môn học:** Software Testing (FIT@HCMUS) — **Seminar:** T1 — GUI & Usability Testing (Nhóm 09)  
> **Bộ công cụ:** UXtweak (Website Testing) kết hợp Microsoft Clarity trên SUT EShop (Vercel)  
> **Cấu trúc clip:** Mỗi video đều có **màn hình Slide tóm tắt mở đầu (10–15s)** để định vị nội dung, sau đó thao tác thực tế và kết luận đối chiếu lý thuyết.

---

## 📋 TỔNG QUAN CHUẨN BỊ TRƯỚC KHI BẤM QUAY

### 1. Chuẩn bị 4 Tab trình duyệt & 1 Cửa sổ ẩn danh:
- **Tab 0 (Màn hình slide tóm tắt):** Mở Slide 34 (hoặc Slide 33) trên trình chiếu reveal.js (`http://localhost:8080/slides/` hoặc file local) ở chế độ toàn màn hình (`F`).
- **Tab 1 (VS Code):** Mở sẵn file `sut/eshop/frontend-web/index.html` (dòng 8–20) và `.env.example`. Đổi sang **Theme sáng** (Light+), phóng to chữ (`Ctrl + +`).
- **Tab 2 (UXtweak Dashboard):** `app.uxtweak.com` — Mở sẵn study *EShop Checkout Usability Study*.
- **Tab 3 (Microsoft Clarity):** `clarity.microsoft.com` — Mở sẵn project *EShop Seminar T1*, mục Setup và tab Dashboard/Heatmaps.
- **Tab 4 (EShop Production):** `https://seminar-gui-usability-testing.vercel.app` (đã tắt AdBlock).
- **Cửa sổ ẩn danh (Incognito):** Chuẩn bị sẵn link tham gia study (`study.uxtweak.com/...`) cho Demo 2.

---

## 🎬 CLIP #4 (DEMO 1): CÀI ĐẶT & XÁC THỰC 2 SNIPPET TRÊN ESHOP (VERCEL)
- **Tên clip đề xuất:** `Clip_UXtweak1_Setup_Snippets_Verify.mp4`
- **Link YouTube:** https://youtu.be/OuBjSEdTORQ
- **Thời lượng:** ~2 phút 30 giây
- **Mục tiêu:** Trình diễn quy trình tạo study, lấy mã định danh snippet từ UXtweak và Clarity, nhúng vào mã nguồn `index.html` của EShop, và kiểm tra xác thực trực tiếp trên môi trường Vercel production.

### Kịch bản từng giây:

| Thời gian | Thao tác trên màn hình (Hành động) | Lời thoại thuyết minh (Đọc theo) |
| :---: | :--- | :--- |
| **0:00 – 0:25**<br>*(Tóm tắt mở đầu trên Slide)* | - Chiếu toàn màn hình **Slide 34** (3 demo UXtweak + Clarity).<br>- Rê chuột chỉ vào dòng **Demo 1 — Cài đặt**. | *"Xin chào thầy và các bạn, mình là Vĩnh Phúc, phụ trách kiểm thử khả năng sử dụng của Nhóm 09. Như hiển thị trên slide tổng quan, phân hệ Usability Testing được nhóm chia thành 3 kịch bản demo: Cài đặt snippet, Kịch bản cơ bản một người, và Kịch bản phức tạp 5 người kết hợp bản đồ nhiệt Clarity.<br><br>Trong đề cương ban đầu nhóm chọn Maze và đặt UXtweak làm dự phòng, nhưng khi triển khai thực tế thì Maze đã khóa tính năng Live Website Testing ở bản miễn phí, đòi hỏi gói 99 đô mỗi tháng. Vì vậy nhóm kích hoạt phương án dự phòng là UXtweak kết hợp Microsoft Clarity hoàn toàn miễn phí. Ở Demo 1 này, mình sẽ hướng dẫn cài đặt và nhúng đồng thời 2 đoạn mã theo dõi lên EShop."* |
| **0:25 – 0:55** | - Bấm `Alt + Tab` sang **Tab 2 (UXtweak)**: Chỉ vào study *EShop Checkout Usability Study* → tab **General**.<br>- Bấm vào mục **Snippet / Setup** để hiện đoạn mã JavaScript có ID `0726db60-cf63-4364-af4e-82923f22dbfe`. | *"Đầu tiên trên UXtweak, nhóm tạo một bài kiểm thử Website Testing trỏ vào địa chỉ EShop đã deploy trên Vercel và bật tính năng quay màn hình người tham gia. Tại mục Snippet, UXtweak cung cấp một đoạn mã JavaScript định danh duy nhất cho study để theo dõi luồng chuyển trang và thao tác chuột."* |
| **0:55 – 1:25** | - Chuyển sang **Tab 3 (Microsoft Clarity)**: Vào `Settings` → `Setup`.<br>- Chỉ vào đoạn mã tracking có Project ID `z27wxp2oeb`. | *"Song song đó, trên Microsoft Clarity, nhóm tạo project EShop Seminar T1 và lấy đoạn mã theo dõi thứ hai. Mục đích của việc nhúng thêm Clarity là để tự động vẽ bản đồ nhiệt Click Heatmap và phát hiện hành vi bấm lặp Rage Click hoàn toàn miễn phí, bù đắp cho giới hạn phân tích của gói UXtweak Free."* |
| **1:25 – 1:55** | - Chuyển sang **Tab 1 (VS Code)**.<br>- Mở file `sut/eshop/frontend-web/index.html` (dòng 8–20) và `.env.example`.<br>- Dùng chuột bôi đen/tô sáng 2 khối `<script>` nằm bên trong thẻ `<head>`. | *"Tiếp theo trong mã nguồn Frontend của EShop, nhóm mở file `index.html` và gắn cả hai đoạn script của UXtweak và Microsoft Clarity vào bên trong thẻ `<head>`. Nhờ cách nhúng song song này, chỉ với một lượt làm bài duy nhất của người tham gia, hệ thống vừa thu được kết quả nhiệm vụ, câu hỏi khảo sát trên UXtweak, vừa tự động ghi nhận Heatmap trên Clarity mà không sửa bất kỳ lỗi giao diện cố ý nào của EShop."* |
| **1:55 – 2:30**<br>*(Xác thực & Kết luận)* | - Chuyển sang **Tab 4 (EShop Vercel)**: Bấm chuột phải → `View Page Source` (hoặc `Ctrl + U`), chỉ vào 2 khối script đã có trên bản live.<br>- Quay lại **Tab 2 (UXtweak)**: Bấm nút **Verify snippet** → Màn hình hiện thông báo tích xanh xác thực thành công (*Snippet is active*). | *"Sau khi đẩy code lên GitHub để Vercel tự động triển khai, mình mở trang public của EShop và xem mã nguồn trang. Cả hai đoạn script của UXtweak và Clarity đều đã hiện diện trên môi trường thực tế. Quay lại UXtweak và bấm nút kiểm tra kết nối, hệ thống lập tức xác nhận snippet đã hoạt động. Bước cài đặt nền tảng đã hoàn tất, sẵn sàng cho việc thiết lập kịch bản kiểm thử."* |

---

## 🎬 CLIP #5 (DEMO 2): KỊCH BẢN CƠ BẢN — 1 TASK + CHECKPOINT + SEQ & REPLAY
- **Tên clip đề xuất:** `Clip_UXtweak2_Basic_Task_SEQ_Replay.mp4`
- **Link YouTube:** https://youtu.be/Nq31Rxb6lIk
- **Thời lượng:** ~3 phút
- **Mục tiêu:** Trình diễn cách thiết lập kịch bản kiểm thử gồm Checkpoint bằng Success URL (`/checkout`), câu hỏi hậu nhiệm vụ SEQ, đóng vai 1 người tham gia làm bài (Record), và xem lại phiên phát lại video thao tác (Playback).

### Kịch bản từng giây:

| Thời gian | Thao tác trên màn hình (Hành động) | Lời thoại thuyết minh (Đọc theo) |
| :---: | :--- | :--- |
| **0:00 – 0:20**<br>*(Tóm tắt mở đầu trên Slide)* | - Chiếu toàn màn hình **Slide 34**.<br>- Rê chuột chỉ vào dòng **Demo 2 — Chức năng cơ bản** và dòng ghi chú: *Record & Playback ≈ Session Replay, Checkpoint ≈ Success URL*. | *"Chào thầy và các bạn, ở Demo 2 này mình sẽ minh họa kịch bản kiểm thử cơ bản gồm hai kỹ thuật cốt lõi trong môn học: thiết lập điểm kiểm tra Checkpoint bằng Success URL và ghi phát lại phiên thao tác Record & Playback trên công cụ UXtweak."* |
| **0:20 – 1:00** | - Bấm `Alt + Tab` sang **Tab 2 (UXtweak)** → tab **Tasks**.<br>- Chỉ chuột vào các trường cấu hình:<br>  + Task text (Nhiệm vụ mua phụ kiện ngân sách 5 triệu, mã VIP100).<br>  + Start URL (`https://seminar-gui-usability-testing.vercel.app/`).<br>  + Success URL (`Simple URL match` → `/checkout`).<br>  + Optimal number of pages = `4`. | *"Trên tab Tasks của UXtweak, nhóm tạo nhiệm vụ: 'Mua một món phụ kiện máy tính trong ngân sách 5 triệu đồng và áp mã giảm giá VIP100'. Lưu ý quan trọng trong kiểm thử khả năng sử dụng là đề bài tuyệt đối không nhắc tên nút bấm hay tên sản phẩm, để đo lường người dùng có tự tìm được đường đi hay không.<br><br>Về mặt kỹ thuật, nhóm thiết lập Checkpoint với Start URL là trang chủ, Success URL là trang thanh toán `/checkout`, và số trang tối ưu là 4 trang để hệ thống tự phân loại hoàn thành trực tiếp hay gián tiếp."* |
| **1:00 – 1:20** | - Nhìn sang cột bên phải tab Tasks: Mục **Ask questions after each task**.<br>- Chỉ vào câu hỏi **SEQ (Single Ease Question)** thang điểm 1–7: *"Nhìn chung, nhiệm vụ vừa rồi dễ hay khó thực hiện?"*. | *"Ngay sau khi người tham gia hoàn thành nhiệm vụ, UXtweak sẽ tự động kích hoạt câu hỏi hậu nhiệm vụ SEQ theo thang điểm Likert 7 mức, từ 1 là rất khó đến 7 là rất dễ, nhằm đo độ khó cảm nhận tức thì ngay tại thời điểm vừa thao tác xong."* |
| **1:20 – 2:20**<br>*(Thực hiện Record luồng làm bài)* | - Mở **Cửa sổ Ẩn danh (Incognito Window)** dán link làm bài của study (`study.uxtweak.com/...`).<br>1. Bấm Bắt đầu nhiệm vụ.<br>2. Đăng nhập tài khoản `p1@eshop.com` / mật khẩu `Test1234!`.<br>3. Chọn danh mục Phụ kiện: Lướt qua AirPods (giá 6 triệu, quá ngân sách) → bấm chọn bàn phím cơ **Keychron Q1** (giá 4 triệu).<br>4. Tại trang chi tiết: **Bấm nút 'Thêm vào giỏ' lần 1** (web đứng im - lỗi G10 + G08), **bấm tiếp lần 2** mới thấy thông báo thành công.<br>5. Vào Giỏ hàng → Bấm 'Tiến hành thanh toán' chuyển sang trang `/checkout` → Nhập mã `VIP100` bấm Áp dụng.<br>6. Hệ thống nhận diện đúng URL đích `/checkout`, báo hoàn thành Task → Chọn điểm SEQ (ví dụ 4/7) và hoàn tất. | *"Bây giờ mình sẽ đóng vai một người tham gia mở link khảo sát trong cửa sổ ẩn danh để hệ thống Record lại toàn bộ phiên làm bài.<br><br>Sau khi đăng nhập tài khoản p1 và lọc danh mục Phụ kiện, vì ngân sách tối đa là 5 triệu nên mình chọn bàn phím cơ Keychron giá 4 triệu thay vì AirPods 6 triệu. Tại trang chi tiết, khi mình bấm 'Thêm vào giỏ' lần đầu tiên, giao diện hoàn toàn không phản hồi và giỏ hàng không hiện số đếm—đây chính là lỗi cố ý G10 và G08 của EShop khiến người dùng phải bấm lặp lại lần thứ hai.<br><br>Tiếp theo mình vào giỏ hàng, chuyển tới trang thanh toán `/checkout` và áp mã VIP100. Ngay khi tới đúng trang đích `/checkout`, Checkpoint của UXtweak ghi nhận hoàn thành nhiệm vụ và hiện câu hỏi SEQ."* |
| **2:20 – 3:00**<br>*(Playback & Kết luận)* | - Tắt cửa sổ ẩn danh, quay lại **Tab 2 (UXtweak)**.<br>- Vào `Results` → `Respondents`, chọn lượt làm bài của `p1`.<br>- Bấm nút **Play** phát đoạn video **Session Replay**.<br>- Chỉ chuột vào dòng timeline: hành trình chuyển trang URL và đoạn con trỏ chuột bấm lặp 2 lần tại nút 'Thêm vào giỏ'. | *"Cuối cùng ở bước Playback, mình mở mục Results để xem lại bản ghi phiên làm việc vừa rồi. Hệ thống đã tự động ghi lại toàn bộ video màn hình, hành trình chuyển trang, thời gian thao tác và đánh dấu nhiệm vụ hoàn thành trực tiếp.<br><br>Qua video phát lại, ta quan sát rất rõ khoảnh khắc người dùng bối rối bấm chuột hai lần liên tiếp vào nút Thêm vào giỏ. Kịch bản cơ bản một người đã thành công trọn vẹn!"* |

---

## 🎬 CLIP #6 (DEMO 3): KỊCH BẢN PHỨC TẠP — DATA-DRIVEN 5 NGƯỜI + SUS 10 CÂU & CLARITY HEATMAP
- **Tên clip đề xuất:** `Clip_UXtweak3_Complex_5Users_SUS_Heatmap.mp4`
- **Link YouTube:** https://youtu.be/7HmEv2DnVJw
- **Thời lượng:** ~4 phút đến 4 phút 30 giây
- **Mục tiêu:** Trình diễn thiết kế bảng hỏi SUS 10 câu dạng Radio Grid trên UXtweak, quy trình Data-driven gửi link cho 5 người tham gia độc lập (`p1`–`p5`), phân tích các chỉ số định lượng (Task Success, Lostness, SEQ, SUS), và đối chiếu bản đồ nhiệt Click Heatmap / Rage Click trên Microsoft Clarity để bắt lỗi Ground Truth G10, G08, G06.

### Kịch bản từng giây:

| Thời gian | Thao tác trên màn hình (Hành động) | Lời thoại thuyết minh (Đọc theo) |
| :---: | :--- | :--- |
| **0:00 – 0:30**<br>*(Tóm tắt mở đầu trên Slide)* | - Chiếu toàn màn hình **Slide 33** (Study của nhóm: flow Welcome → Task 1 → SEQ → SUS) kết hợp **Slide 34** (dòng Demo 3).<br>- Chỉ vào mục: *5–6 người tham gia ngoài nhóm (p1..p6)* và *Ánh xạ Data-driven*. | *"Chào thầy và các bạn, ở Demo 3 nâng cao này, mình sẽ trình bày quy trình chạy Usability Study hoàn chỉnh theo hướng dữ liệu Data-driven với 5 người tham gia độc lập, kết hợp bảng khảo sát chuẩn SUS 10 câu và phân tích bản đồ nhiệt trên Microsoft Clarity.<br><br>Cùng một kịch bản kiểm thử cố định được gửi cho 5 người tham gia ngoài nhóm, mỗi người sử dụng một tài khoản độc lập từ p1 đến p5 để đảm bảo tính độc lập dữ liệu, không bị chồng chéo giỏ hàng hay lượt áp mã giảm giá."* |
| **0:30 – 1:15** | - Bấm `Alt + Tab` sang **Tab 2 (UXtweak)** → tab **Questionnaire**.<br>- Cuộn đến câu hỏi Q1 kiểu **Radio button grid**: Chỉ rõ 10 hàng (10 câu SUS chuẩn của John Brooke) $\times$ 5 cột thang Likert (1 - Rất không đồng ý đến 5 - Rất đồng ý).<br>- Mở nhanh file `sut/eshop/backend/database.js` (dòng 94–99) chỉ vào danh sách seed tài khoản `p1`…`p5`. | *"Để vượt qua giới hạn số lượng câu hỏi rời của gói miễn phí trên UXtweak, tại tab Questionnaire, nhóm thiết kế một câu hỏi dạng lưới Radio button grid gom trọn 10 câu hỏi SUS chuẩn của John Brooke trên thang Likert 5 mức. Cách thiết kế thông minh này vừa giữ đúng nguyên bản thang đo SUS quốc tế, vừa tối ưu hoàn hảo trên nền tảng miễn phí."* |
| **1:15 – 2:20**<br>*(Phân tích số liệu UXtweak)* | - Trên UXtweak, chuyển sang tab **Results** → **Overview / Tasks**:<br>  + Chỉ vào biểu đồ tỷ lệ hoàn thành (Task Success: Direct vs Indirect).<br>  + Chỉ vào thời gian trung bình (Time on Task) và chỉ số lạc đường (**Lostness**).<br>- Chuyển sang tab **Questionnaire**: Chỉ vào bảng phân bố 10 câu SUS và điểm SUS trung bình quy đổi so với mốc chuẩn 68 điểm. | *"Sau khi cả 5 người tham gia hoàn thành khảo sát, chúng ta mở tab Results trên UXtweak để đọc các chỉ số định lượng.<br><br>Tại mục Task Overview, hệ thống thống kê tỷ lệ hoàn thành nhiệm vụ, thời gian trung bình và đặc biệt là chỉ số độ lạc đường Lostness khi người dùng phải chuyển qua lại giữa các trang để tìm danh mục phù hợp. Ở phần khảo sát SUS 10 câu, các câu lẻ tích cực được tính bằng điểm chọn trừ 1, câu chẵn tiêu cực tính bằng 5 trừ điểm chọn, nhân tổng với 2,5 để quy về thang 100 và đối chiếu trực tiếp với mốc chuẩn công nghiệp là 68 điểm."* |
| **2:20 – 3:45**<br>*(Phân tích Clarity Heatmap & Rage Click)* | - Chuyển sang **Tab 3 (Microsoft Clarity)**:<br>1. Vào `Dashboard`: Chỉ vào ô thống kê **Rage clicks** và **Dead clicks**.<br>2. Vào tab `Heatmaps`, chọn trang chi tiết bàn phím Keychron (`/product/5`): Chỉ vào **vùng nhiệt đỏ rực tập trung ngay trên nút 'Thêm vào giỏ'**.<br>3. Mở tiếp Heatmap hoặc Session Recording trang `/checkout`: Chỉ vào vùng click chuột ở ô **Tổng tiền thanh toán** và ô nhập mã `VIP100`. | *"Tiếp theo, để hiểu sâu hơn hành vi trực quan của cả 5 người, chúng ta chuyển sang Microsoft Clarity. Trên Dashboard, Clarity tự động cảnh báo chỉ số Rage Clicks—tức những vị trí người dùng ức chế bấm chuột liên tiếp nhiều lần trong thời gian ngắn.<br><br>Khi mở bản đồ nhiệt Click Heatmap của trang chi tiết bàn phím Keychron, ta thấy một vùng nhiệt đỏ rực tập trung chính xác tại nút 'Thêm vào giỏ'. Điều này chứng minh trực quan tác động của cặp lỗi cố ý G10 và G08: nút bấm chỉ nhận ở lần click thứ hai và thanh điều hướng không nhảy số đếm giỏ hàng, khiến tất cả người tham gia đều tưởng web bị đơ và phải bấm lặp lại nhiều lần.<br><br>Tương tự trên trang `/checkout`, Heatmap và Session Replay cũng ghi nhận người dùng khựng lại ở ô Tổng tiền thanh toán do ô này cho phép tự sửa số tiền—tương ứng với lỗi G06."* |
| **3:45 – 4:25**<br>*(Tổng kết & Chuyển tiếp)* | - Quay lại màn hình tổng quan, kết luận ngắn gọn, chỉ vào sự kết hợp giữa định lượng và định tính. | *"Tổng kết lại, sự kết hợp giữa UXtweak và Microsoft Clarity đã giúp nhóm định lượng rõ ràng người dùng gặp khó khăn ở đâu thông qua tỷ lệ hoàn thành, độ lạc đường Lostness, điểm SEQ, SUS và bản đồ nhiệt Rage Click.<br><br>Tuy nhiên, vì đây là kiểm thử không điều phối từ xa, công cụ chỉ cho thấy người dùng bị kẹt ở chỗ nào chứ không hỏi trực tiếp được vì sao họ bối rối, và cỡ mẫu 5 người chủ yếu mang tính chất phát hiện lỗi định tính. Đó là lý do ở phần tiếp theo, nhóm kết hợp thêm đánh giá chuyên gia Heuristic Evaluation bằng AI để bổ sung góc nhìn nguyên nhân. Cảm ơn thầy và các bạn đã theo dõi!"* |

---

## 💡 MẸO QUAY VIDEO CHUẨN ĐẸP & TRÁNH LỖI

1. **Âm thanh:** Dùng micro có lọc ồn (tai nghe điện thoại hoặc mic rời), nói to rõ, nhịp nhàng theo các mốc giây trong bảng.
2. **Thao tác chuột:** Rê chuột dứt khoát, khi nói đến nút nào hoặc chỉ số nào (như *Rage Click*, *Lostness*, *Keychron Q1*, *Verify snippet*) thì dừng con trỏ chuột hoặc khoanh nhẹ 1 vòng tròn quanh vị trí đó để người xem chú ý.
3. **Mở đầu bằng Slide:** Luôn để màn hình Slide 34 ở 15 giây đầu mỗi clip trước khi `Alt + Tab` sang trình duyệt, giúp người xem video nắm trọn bức tranh tổng quan.
