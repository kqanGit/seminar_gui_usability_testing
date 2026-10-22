# Phần 07 — Hướng dẫn & Thực nghiệm Công cụ Maze (Usability Testing)

> Phụ trách: **Bửu Huỳnh Vĩnh Phúc (`23120328` — Vai B)** · Trạng thái: **Đã hoàn thiện nội dung & kịch bản 3 Demo**

---

## 1. Giới thiệu tổng quan về Maze

Nếu như **Playwright + axe-core** (Phần 06) trả lời câu hỏi *"Giao diện được xây dựng có đúng đặc tả kỹ thuật (FR-21…24) hay không?"*, thì **Maze** (https://maze.co) được Nhóm 09 lựa chọn làm công cụ chủ lực để trả lời câu hỏi cốt lõi thứ hai của đề tài T1: **"Người dùng thật có thực sự hiểu và sử dụng được giao diện đó để hoàn thành mục tiêu mua hàng một cách hiệu quả, nhanh chóng và hài lòng hay không?"**

Maze là nền tảng kiểm thử khả dụng không có người điều phối (**Unmoderated Usability Testing**) hoạt động trực tiếp trên trình duyệt. Thay vì yêu cầu người điều phối (facilitator) phải ngồi cạnh từng người tham gia (participant), Maze đóng gói toàn bộ kịch bản kiểm thử thành một đường dẫn (URL) duy nhất. Người tham gia tự mở link, đọc nhiệm vụ và tương tác trực tiếp với trang web thật (**Live Website Testing**), trong khi Maze tự động ghi nhận hành trình chuyển trang, vị trí click chuột, thời gian hoàn thành và thu thập câu trả lời khảo sát định lượng (**SEQ**, **SUS**).

---

## 2. Hệ thống thuật ngữ & Nguyên lý hoạt động của Maze

### 2.1. Các thuật ngữ cốt lõi trong Maze

| Thuật ngữ | Cách gọi trong nhóm | Giải thích chi tiết trong ngữ cảnh Maze & EShop |
| :--- | :--- | :--- |
| **Study (Maze)** | Bài nghiên cứu / Đợt kiểm thử | Một phiên khảo sát hoàn chỉnh gửi tới người tham gia qua một đường dẫn chia sẻ (`t.maze.co/...`), bên trong gồm chuỗi các **Block** nối tiếp nhau. |
| **Block** | Khối thành phần | Đơn vị cấu tạo nên một Study, bao gồm: *Welcome Screen* (màn hình chào), *Website Test / Mission* (nhiệm vụ tương tác trên web), *Opinion Scale* (thang đo SEQ 1–7), *Multiple Choice* (câu hỏi trắc nghiệm SUS 1–5) và *Thank You Screen*. |
| **Mission (Task)** | Nhiệm vụ | Bài toán mục tiêu giao cho người tham gia thực hiện trên trang web EShop (ví dụ: tìm mua phụ kiện trong ngân sách 5 triệu đồng và áp mã giảm giá). |
| **Task Scenario** | Kịch bản nhiệm vụ | Đoạn văn mô tả bối cảnh và mục tiêu cần đạt viết theo ngôn ngữ đời thường của người dùng, **tuyệt đối không lộ tên nút bấm hay đường dẫn** trên giao diện. |
| **Maze Universal Snippet** | Đoạn mã theo dõi Maze | Đoạn mã JavaScript (`maze-universal-loader.js`) gắn vào thẻ `<head>` của `index.html` trên SUT EShop để kết nối website với máy chủ Maze. |
| **Expected Path** | Đường đi kỳ vọng | Chuỗi các URL chuyển tiếp chuẩn mực mà người thiết kế định nghĩa trước cho một Mission (ví dụ: `/` $\rightarrow$ `/product/6` $\rightarrow$ `/cart` $\rightarrow$ `/checkout`). |
| **Direct Success** | Thành công trực tiếp | Người tham gia hoàn thành nhiệm vụ và đi từ trang bắt đầu đến trang đích khớp chính xác với **Expected Path** đã định nghĩa. |
| **Indirect Success** | Thành công gián tiếp | Người tham gia vẫn đến được trang đích hoàn thành nhiệm vụ nhưng đi đường vòng (ví dụ: ghé nhầm sản phẩm vượt ngân sách `/product/5` hoặc quay lại trang trước do lỗi nút bấm) trước khi tới đích. |
| **Give-up / Bounce** | Bỏ cuộc / Thoát giữa chừng | Người tham gia chủ động bấm nút *"Stop task"* / *"Give up"* trên thanh công cụ Maze hoặc đóng trình duyệt trước khi tới trang đích. |
| **Misclick Rate** | Tỷ lệ click nhầm | Tỷ lệ phần trăm các cú click chuột rơi vào ngoài các vùng tương tác kỳ vọng chuyển sang bước tiếp theo trên trang. |
| **Heatmap** | Bản đồ nhiệt | Lớp phủ màu sắc trực quan hóa mật độ vị trí click chuột của toàn bộ người tham gia trên ảnh chụp từng màn hình (màu đỏ/vàng đậm thể hiện vùng bị click lặp đi lặp lại). |

---

### 2.2. Nguyên lý hoạt động của Live Website Testing

Khác với kiểm thử trên bản vẽ tĩnh (Figma Prototype Testing), tính năng **Live Website Testing** của Maze hoạt động trên ứng dụng web thực tế theo cơ chế 4 bước:

```
┌────────────────────────────────────────────────────────────────────────────┐
│ 1. NHÚNG SNIPPET (SUT EShop)                                               │
│    index.html nạp script `maze-universal-loader.js?apiKey=...`             │
└─────────────────────────────────────┬──────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ 2. KHỞI TẠO PHIÊN (Participant mở link t.maze.co/<study-id>)               │
│    Maze hiển thị đề bài Mission, sau đó mở EShop kèm Floating Widget       │
└─────────────────────────────────────┬──────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ 3. GHI NHẬN HÀNH VI (Event & Navigation Tracking)                          │
│    - Theo dõi biến động URL (History API `pushState` / `popstate` của SPA) │
│    - Ghi tọa độ click `(x, y)`, kích thước viewport, thời gian dừng (ms)   │
│    - Tự động kết thúc Mission khi URL khớp Checkpoint đích (`/checkout`)   │
└─────────────────────────────────────┬──────────────────────────────────────┘
                                      │
                                      ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ 4. TỔNG HỢP CHỈ SỐ & BÁO CÁO (Maze Analytics Dashboard)                    │
│    Phân loại Direct/Indirect Success, vẽ Path Analysis, Heatmap, SEQ & SUS │
└────────────────────────────────────────────────────────────────────────────┘
```

### 2.3. Ánh xạ 3 khái niệm cốt lõi của môn học trong công cụ Maze

Theo yêu cầu đề cương Seminar T1, mỗi công cụ cần làm rõ sự hiện diện của bộ ba **Record & Playback**, **Data-driven** và **Checkpoints**. Trong Maze, ba thành phần này thể hiện dưới góc độ kiểm thử khả dụng hướng hành vi người dùng:

| Khái niệm | Cách thể hiện trong Playwright (GUI) | Cách thể hiện tương ứng trong Maze (Usability) | Vị trí minh họa |
| :--- | :--- | :--- | :---: |
| **Record & Playback** *(Ghi & phát lại)* | Công cụ `codegen` ghi thao tác của kiểm thử viên thành mã script để máy chạy lại. | **Maze Snippet tự động ghi (Record)** toàn bộ hành trình URL, chuỗi click chuột, thời gian trên từng màn hình của người tham gia thật và **tái hiện lại (Playback)** dưới dạng *Path Visualization* & *Click Heatmap*. | **Demo 2 & Demo 3** |
| **Data-driven** *(Hướng dữ liệu)* | Một hàm test chạy lặp qua mảng dữ liệu cấu hình (`pages.json` $\times$ `viewports`). | **Cùng một kịch bản Study/Mission cố định** được phát cho **nhiều người tham gia độc lập** ($\sim 5$ participants với bộ tài khoản `p1`…`p5` riêng biệt), thu thập dữ liệu hành vi đa chiều để thống kê định lượng. | **Demo 3** |
| **Checkpoints** *(Điểm kiểm tra)* | Câu lệnh `expect(...)` kiểm tra thuộc tính DOM/CSS/Screenshot tại một thời điểm. | **Goal URL & Expected Path:** Maze đối chiếu URL đích thực tế người tham gia đạt tới (`/checkout` sau khi đặt hàng) với chuỗi đường đi kỳ vọng để tự động chấm trạng thái *Direct Success*, *Indirect Success* hay *Bounce*. | **Demo 2 & Demo 3** |

---

## 3. Chuẩn bị kỹ thuật trên SUT EShop trước khi chạy Maze

Vì Maze yêu cầu trang web kiểm thử phải truy cập được qua Internet công cộng (HTTPS) và mỗi người tham gia cần một môi trường dữ liệu sạch để không làm hỏng phiên làm bài của nhau, Nhóm 09 (Vai B phối hợp cùng Vai C) đã thực hiện **03 bước chuẩn bị kỹ thuật bắt buộc** (tuân thủ nghiêm ngặt quy tắc **không sửa bất kỳ lỗi GUI/Usability cố ý nào** từ `G01` đến `G11`):

1. **Chuyển đổi 13 vị trí gọi cứng `http://localhost:3000` sang biến môi trường (`ed85e81`):**
   - Trong mã nguồn gốc của EShop (`AuthContext.jsx`, `Home.jsx`, `ProductDetail.jsx`, `Checkout.jsx`, `Profile.jsx`, `Register.jsx`, `ForgotPassword.jsx`), toàn bộ lệnh gọi API đều viết cứng `http://localhost:3000`. Nếu đưa nguyên bản lên Vercel, trình duyệt trên máy người tham gia sẽ gọi vào `localhost` của chính máy họ và gây lỗi trắng trang.
   - Giải pháp: Đổi đồng loạt 13 vị trí sang `import.meta.env.VITE_API_URL || 'http://localhost:3000'`, giúp vừa chạy được trên máy cục bộ vừa kết nối thông suốt tới Backend trên Render khi deploy.
2. **Bổ sung 6 tài khoản người tham gia độc lập `p1@eshop.com` … `p6@eshop.com` (`267311a`):**
   - Trong `sut/eshop/backend/database.js`, thêm 6 tài khoản người tham gia vào phần seed dữ liệu (mật khẩu chung `Test1234!`).
   - **Lý do kỹ thuật:** Mã giảm giá `VIP100` trong CSDL có giới hạn `max_uses_per_user = 2`. Nếu cả 5 người tham gia dùng chung tài khoản `test@eshop.com`, từ người thứ 3 trở đi hệ thống sẽ báo lỗi *"Bạn đã hết lượt sử dụng mã này"*, làm hỏng hoàn toàn kết quả đo usability.
3. **Lựa chọn mã giảm giá `VIP100` thay vì `SAVE10` và nhúng Maze Snippet (`ec9c6ec`):**
   - Mã `SAVE10` (giảm theo %) ở backend EShop cố ý bị cài lỗi công thức tính toán. Để người tham gia không bị phân tâm bởi lỗi nghiệp vụ backend (thuộc phạm vi đề tài T2), kịch bản thống nhất dùng mã **`VIP100`** (giảm cố định `100.000 ₫`, đơn tối thiểu `300.000 ₫`).
   - Gắn đoạn mã **Maze Universal Snippet** vào thẻ `<head>` của [`sut/eshop/frontend-web/index.html`](../sut/eshop/frontend-web/index.html) thông qua biến môi trường `%VITE_MAZE_API_KEY%`.

---

## 4. Kịch bản chi tiết 3 Demo của công cụ Maze

### 4.1. Demo 1 — Cài đặt & Xác thực Live Website Testing trên EShop
- **Mục tiêu:** Minh họa quy trình từ lúc tạo Project trên Maze, lấy đoạn mã theo dõi (Tracking Snippet), tích hợp vào mã nguồn Frontend EShop và xác thực kết nối thành công trên URL public.
- **Các bước thực hiện trong clip:**
  1. Đăng nhập vào Maze Dashboard (`app.maze.co`), tạo Project mới và chọn mục **Project Settings $\rightarrow$ Install Maze Snippet**.
  2. Sao chép đoạn mã JavaScript kèm khóa định danh `apiKey` của project.
  3. Mở file [`sut/eshop/frontend-web/index.html`](../sut/eshop/frontend-web/index.html), kiểm tra đoạn script `maze-universal-loader.js` đã được gắn trong thẻ `<head>` và cấu hình biến `VITE_MAZE_API_KEY` trên môi trường deploy Vercel.
  4. Mở trang EShop trên URL public, bật Chrome DevTools (**Network tab**) xác nhận gói tin `maze-universal-loader.js` trả về trạng thái `200 OK` và biến `window.mazeUniversalSnippetApiKey` đã được khởi tạo.
  5. Quay lại giao diện Maze, nhập tên miền EShop và bấm nút **Verify** $\rightarrow$ Hệ thống báo **Connected / Verified** màu xanh lá.
- **Link clip demo:** Xem tại [`videos/README.md`](../videos/README.md) (Clip #4 — Maze Cài đặt).

---

### 4.2. Demo 2 — Cơ bản: Thiết kế 1 Mission đơn giản + Câu hỏi SEQ
- **Mục tiêu:** Minh họa cách tạo một nhiệm vụ kiểm thử khả dụng cơ bản, thiết lập đường đi kỳ vọng (**Checkpoint**), tự chạy thử 1 lượt (**Record**) và đọc các chỉ số cơ bản trên báo cáo.
- **Thành phần kỹ thuật minh họa:** **Record** (Maze tự động ghi nhận đường đi và vị trí click) + **Checkpoint** (xác định điều kiện hoàn thành nhiệm vụ qua URL đích).
- **Các bước thực hiện trong clip:**
  1. Trong Maze Study mới, thêm một khối **Website Test (Mission)** cơ bản: *"Tìm xem thông tin chi tiết của sản phẩm Bàn phím cơ Keychron Q1 và thêm sản phẩm vào giỏ hàng"*.
  2. Thiết lập **Start URL** là trang chủ `/` và định nghĩa **Expected Path (Checkpoint)**: `/` $\rightarrow$ `/product/6` $\rightarrow$ `/cart`.
  3. Thêm ngay phía sau một khối **Opinion Scale (1–7)** đóng vai trò câu hỏi **SEQ (Single Ease Question)**: *"Nhiệm vụ vừa rồi dễ hay khó thực hiện?"* (`1 = Rất khó`, `7 = Rất dễ`).
  4. Mở chế độ **Preview / Live Link**, đóng vai người dùng thực hiện nhiệm vụ (tại đây bắt đầu quan sát thấy hiện tượng phải bấm nút *"Thêm vào giỏ"* 2 lần ở `/product/6` mới có hàng trong `/cart`) và chấm điểm SEQ.
  5. Quay lại Maze Dashboard mở tab **Results**: đọc sơ đồ đường đi (*Path Analysis*), thời gian hoàn thành (*Time on Task*) và điểm SEQ vừa ghi nhận.
- **Link clip demo:** Xem tại [`videos/README.md`](../videos/README.md) (Clip #5 — Maze Cơ bản).

---

### 4.3. Demo 3 — Luồng phức tạp: Study Checkout EShop với ~5 người tham gia + Bảng SUS
- **Mục tiêu:** Triển khai một đợt kiểm thử khả dụng hoàn chỉnh từ đầu đến cuối trên luồng Checkout có bẫy logic ngân sách, thu thập dữ liệu từ **$\sim 5$ người tham gia ngoài nhóm**, tính điểm **SUS** và phân tích sâu **Heatmap / Misclick Rate**.
- **Thành phần kỹ thuật minh họa:** **Data-driven** (cùng bộ kịch bản chạy qua nhiều người tham gia độc lập `p1`…`p5`) + **Record** (thu thập bản đồ nhiệt và chuỗi đường đi) + **Checkpoint** (so khớp Expected Path toàn luồng mua hàng).
- **Cấu trúc 4 Block trong Study chính thức (chi tiết tại [`maze/study-design.md`](../maze/study-design.md)):**
  1. **Welcome Screen:** Chào mừng, giải thích nguyên tắc *"Kiểm thử trang web chứ không kiểm tra kỹ năng của bạn"*, cấp tài khoản `pX@eshop.com` / `Test1234!`.
  2. **Block 1 — Mission Checkout có ràng buộc ngân sách & mã giảm giá:**
     - **Kịch bản nhiệm vụ (Task Scenario):**
       > *"Bạn đã đăng nhập vào EShop. Hiện bạn có ngân sách tối đa **5.000.000 ₫** và muốn mua **một món phụ kiện cho máy tính**. Hãy tìm sản phẩm phù hợp với ngân sách, thêm vào giỏ và hoàn tất đặt hàng có sử dụng mã giảm giá **VIP100**."*
     - **Thiết kế bẫy tư duy tự nhiên:** Danh mục *Phụ kiện* có 2 món là `Tai nghe AirPods Pro 2` (`6.000.000 ₫` — vượt ngân sách) và `Bàn phím cơ Keychron Q1` (`4.000.000 ₫` — vừa ngân sách). Người tham gia phải tự tìm lọc và so sánh giá thay vì bấm máy móc.
     - **Expected Path (Checkpoints):** `/` $\rightarrow$ `/product/6` $\rightarrow$ `/cart` $\rightarrow$ `/checkout`.
  3. **Block 2 — Câu hỏi SEQ (Thang 1–7):** Đo độ dễ/khó ngay sau khi đặt hàng xong.
  4. **Block 3 — Bảng khảo sát SUS 10 câu (Thang Likert 1–5):** Đánh giá tổng thể cảm nhận về EShop sau phiên thử nghiệm.
- **Link clip demo:** Xem tại [`videos/README.md`](../videos/README.md) (Clip #6 — Maze Phức tạp).

---

## 5. Phân tích kết quả Study (~5 người tham gia) & Đối chiếu Ground Truth

> **Lưu ý minh bạch:** Toàn bộ file xuất dữ liệu thô được lưu tại [`maze/results/`](../maze/results/) và ảnh chụp màn hình Dashboard/Heatmap lưu tại [`evidence/maze/`](../evidence/maze/).

### 5.1. Bảng tổng hợp chỉ số định lượng (5 người tham gia: P1 – P5)

| Mã người tham gia | Tài khoản | Kết quả đường đi (Path Outcome) | Thời gian làm bài (Time on Task) | Số lần click trên `/product/6` | Điểm SEQ (1–7) | Điểm SUS quy đổi (0–100) | Hành vi chính quan sát được qua Maze |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **P1** | `p1@eshop.com` | **Indirect Success** *(Thành công gián tiếp)* | $\sim 95\text{ s}$ | 3 clicks | $4 / 7$ | $57.5$ | Ghé xem AirPods Pro 2 (`6.000.000 ₫`) trước rồi mới quay ra chọn Keychron Q1; bấm "Thêm vào giỏ" lần 1 không thấy badge nên mở `/cart` thấy trống phải quay lại bấm lần 2. |
| **P2** | `p2@eshop.com` | **Direct Success** *(Thành công trực tiếp)* | $\sim 68\text{ s}$ | 2 clicks | $5 / 7$ | $65.0$ | Chọn đúng ngay Keychron Q1; nhận ra nút "Thêm vào giỏ" không phản hồi nên bấm đúp 2 lần liên tiếp trước khi sang `/cart` và `/checkout`. |
| **P3** | `p3@eshop.com` | **Indirect Success** *(Thành công gián tiếp)* | $\sim 112\text{ s}$ | 4 clicks | $4 / 7$ | $52.5$ | Bấm "Thêm vào giỏ" 1 lần rồi vào `/cart` thấy giỏ trống, quay lại `/product/6` bấm thêm 3 lần (rage click); tại `/checkout` dừng lại lâu vì bối rối ở ô "Tổng tiền thanh toán" cho sửa. |
| **P4** | `p4@eshop.com` | **Direct Success** *(Thành công trực tiếp)* | $\sim 74\text{ s}$ | 2 clicks | $5 / 7$ | $62.5$ | Đi đúng luồng `/` $\rightarrow$ `/product/6` $\rightarrow$ `/cart` $\rightarrow$ `/checkout`; áp mã `VIP100` thành công nhưng phản ánh nhãn "Tổng tạm tính" và thiếu thông báo xác nhận. |
| **P5** | `p5@eshop.com` | **Indirect Success** *(Thành công gián tiếp)* | $\sim 104\text{ s}$ | 3 clicks | $4 / 7$ | $55.0$ | Lỡ tay bấm nút "Xóa" trong `/cart` làm mất trắng sản phẩm mà không có hộp thoại hỏi lại (`G02`), buộc phải quay lại `/product/6` thêm lại từ đầu. |
| **Trung bình / Tổng hợp** | **5 người** | **100% hoàn thành** *(40% Direct · 60% Indirect · 0% Give-up)* | **$\approx 90.6\text{ s}$** | **TB $2.8\text{ clicks}$** *(Misclick/Rage click cao)* | **TB $4.4 / 7$** *(Mức trung bình)* | **TB $58.5 / 100$** *(Hạng D — Dưới chuẩn 68)* | 100% người tham gia hoàn thành đơn hàng nhưng **60% bị đi vòng (Indirect)** do tổ hợp lỗi `G10` + `G08` + `G02`. |

---

### 5.2. Giải mã các phát hiện đắt giá từ Heatmap & Path Analysis trên Maze

Kết quả thu được từ Maze minh chứng rõ nét giá trị bổ trợ giữa **Usability Testing** và **GUI Testing**: có những lỗi trong code tưởng chừng nhỏ nhưng khi người thật sử dụng lại gây đứt gãy luồng thao tác nghiêm trọng:

1. **Hiện tượng "Vòng lặp Giỏ hàng rỗng" (Tổ hợp lỗi `G10` + `G08` — Vi phạm H1):**
   - **Quan sát trên Maze Path:** Có tới 60% người tham gia phát sinh luồng đi vòng `/product/6` $\rightarrow$ `/cart` $\rightarrow$ `/product/6` $\rightarrow$ `/cart`.
   - **Quan sát trên Click Heatmap trang `/product/6`:** Vùng nhiệt đỏ rực tập trung dày đặc tại nút **"Thêm vào giỏ"** với trung bình $2.8\text{ lần click/người}$ (trong khi lẽ ra chỉ cần $1\text{ click}$).
   - **Giải thích nguyên nhân:** Do lỗi `G10` (phải bấm 2 lần nút mới gọi hàm thêm giỏ) kết hợp với lỗi `G08` (Header không có badge số lượng giỏ hàng và không có thông báo toast). Khi người dùng bấm 1 lần, giao diện im lìm không phản hồi; họ tưởng đã thêm xong nên bấm sang Giỏ hàng, thấy giỏ trống rỗng nên hoang mang quay lại bấm liên tục (Rage Click).
2. **Tai nạn mất sản phẩm tại trang Giỏ hàng (Lỗi `G02` — Vi phạm H3 & H5):**
   - Người tham gia P5 muốn thử chỉnh sửa giỏ hàng nhưng không có nút `+/-` (`G03`) và vô tình bấm vào nút **"Xóa"**. Vì thiếu hộp thoại xác nhận (`G02`), sản phẩm biến mất ngay lập tức, đẩy thời gian hoàn thành nhiệm vụ của P5 vọt lên $104\text{ giây}$.
3. **Sự sụt giảm điểm tự tin trên bảng hỏi SUS (Điểm trung bình $58.5 / 100$ — Hạng D):**
   - Điểm SUS trung bình của 5 người tham gia chỉ đạt **$58.5$** (thấp hơn đáng kể so với mốc chuẩn quốc tế **$68.0$**, xếp hạng **D — Marginal / OK–Poor**).
   - Phân tích chi tiết từng câu hỏi SUS cho thấy điểm bị kéo tụt mạnh nhất ở **Câu 6** (*"có quá nhiều sự thiếu nhất quán"* — do nhãn *"Tổng tạm tính"* `G01`, nút xanh lá `G04`, nút *"Thoát"* `G07`) và **Câu 9** (*"cảm thấy tự tin khi sử dụng"* — do ô *"Tổng tiền thanh toán"* ở `/checkout` cho phép người dùng tự gõ sửa số tiền `G06`).

---

## 6. Điểm yếu & Giới hạn thực tế của công cụ Maze

Qua quá trình trực tiếp triển khai trên SUT EShop, nhóm đúc kết **04 điểm yếu và giới hạn kỹ thuật quan trọng** của Maze:

| # | Điểm yếu / Giới hạn | Biểu hiện cụ thể khi chạy trên EShop | Cách nhóm khắc phục / Bù đắp |
| :---: | :--- | :--- | :--- |
| **1** | **Giới hạn theo dõi thao tác nội trang trên SPA (URL-based Tracking)** | Maze xác định các bước trên đường đi (*Path Step*) chủ yếu dựa vào **sự thay đổi đường dẫn URL**. Trên trang `/checkout` của EShop, thao tác nhập mã `VIP100` và bấm nút **"Áp dụng"** diễn ra ngay trong cùng một URL `/checkout` (chỉ cập nhật React state chứ không đổi URL). Do đó, Maze **không tự tách bước "Áp mã giảm giá" thành một node riêng trên sơ đồ Path**, mà chỉ ghi nhận qua vùng click trên Heatmap. | Kết hợp kiểm tra điểm click trên Heatmap tại nút *"Áp dụng"* ở trang `/checkout` và đối chiếu trạng thái đơn hàng trong CSDL Backend. |
| **2** | **Đặc thù Unmoderated: Biết "Cái gì" (What) nhưng thiếu "Tại sao" (Why)** | Khi người tham gia dừng lại rất lâu ở trang `/checkout` (như P3 mất $112\text{ s}$), số liệu Maze chỉ cho biết thời gian tăng vọt và vị trí click, nhưng không tự cho biết người dùng đang suy nghĩ gì hay bối rối vì nhãn chữ nào nếu không hỏi lại. | Bổ sung câu hỏi tự luận ngắn hoặc thực hiện phỏng vấn ngắn / **Think-aloud** có điều phối (Moderated) với 1–2 người tham gia sau khi làm xong. |
| **3** | **Giới hạn khắt khe của gói Free (Quota Limit)** | Tài khoản Maze Free chỉ cho phép tạo **tối đa 1 Study hoạt động/tháng**, giới hạn số lượng Block (tối đa ~7–10 blocks tùy cấu hình) và khóa một số tính năng nâng cao như quay video màn hình/khuôn mặt trực tiếp hay xuất CSV thô trên gói miễn phí. | Phải thiết kế và duyệt kỹ kịch bản trên giấy ([`maze/study-design.md`](../maze/study-design.md)), kiểm thử Pilot nội bộ trước khi phát link chính thức cho 5 người tham gia. |
| **4** | **Phụ thuộc hạ tầng mạng & Dễ bị chặn bởi AdBlocker** | Bắt buộc SUT phải có URL HTTPS public ổn định. Ngoài ra, nếu trình duyệt của người tham gia cài tiện ích chặn quảng cáo/tracker mạnh (như *uBlock Origin*, *Brave Shields*), script `snippet.maze.co/maze-universal-loader.js` sẽ bị chặn, khiến Maze không ghi nhận được đường đi. | Dặn trước người tham gia mở link bằng cửa sổ thường đã tắt AdBlock trên domain EShop trong thời gian làm bài (~5 phút). |

---

## 7. Tài liệu tham khảo

1. Maze Help Center — *Website Test: Run usability tests on your live websites*: https://help.maze.co/articles/2471284614-website-test-run-usability-tests-on-your-live-websites
2. Maze Help Center — *Installing the Maze snippet on your website*: https://help.maze.co/
3. Brooke, J. (1996) — *SUS: A 'Quick and Dirty' Usability Scale*. In P. W. Jordan et al. (Eds.), *Usability Evaluation in Industry* (pp. 189–194). Taylor & Francis.
4. Bangor, A., Kortum, P., & Miller, J. (2009) — *Determining What Individual SUS Scores Mean: Adding an Adjective Rating Scale*. Journal of Usability Studies, 4(3), 114–123.
5. Sauro, J., & Lewis, J. R. (2016) — *Quantifying the User Experience: Practical Statistics for User Research* (2nd ed.). Morgan Kaufmann.
6. Nielsen, J. (1994) — *10 Usability Heuristics for User Interface Design*: https://www.nngroup.com/articles/ten-usability-heuristics/
