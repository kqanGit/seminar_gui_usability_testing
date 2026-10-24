# Kịch bản Quay Video Demo & Cẩm nang Chi tiết: AI Heuristic Reviewer (Vai C)
> **Phiên bản:** v2.1 — Quy trình Tương tác Ngôn ngữ Tự nhiên với Agent (Natural Language Agentic Workflow)  
> **Người thực hiện:** Bùi Minh Quân (`23120337` — Trưởng nhóm Nhóm 09)  
> **Môn học:** Software Testing (FIT@HCMUS) — **GVTH:** Thầy Hồ Tuấn Thanh  
> **Đề tài Seminar:** T1 — GUI & Usability Testing  
> **Repository:** https://github.com/kqanGit/seminar_gui_usability_testing  

---

## PHẦN 1: BẢN CHẤT CỐT LÕI & CÁC KHÁI NIỆM QUAN TRỌNG

Để quay video tự nhiên, tự tin và giải thích lưu loát khi thầy cô hoặc người xem theo dõi, bạn cần nắm vững các nguyên lý sau:

### 1.1. AI Heuristic Reviewer là gì?
- Là công cụ tự động đánh giá **khả dụng giao diện (Usability Testing)** đóng vai một **chuyên gia UX**, soi từng màn hình để tìm các điểm gây khó khăn, bối rối hoặc dễ làm người dùng thao tác nhầm.
- Dựa trên **10 nguyên tắc khả dụng kinh điển của Jakob Nielsen** kết hợp thang điểm nghiêm trọng chuẩn công nghiệp **Severity 0–4** (từ 0: Không lỗi, 1: Thẩm mỹ nhỏ, 2: Nhẹ, 3: Nghiêm trọng, đến 4: Chặn luồng người dùng).
- **Phân biệt với GUI Functional Testing (Playwright):**
  - **GUI Testing:** Kiểm tra đúng/sai theo code (nút bấm có click được không, selector có tồn tại không, đúng mã màu `#007bff` không).
  - **AI Usability Reviewer:** Đánh giá góc độ tâm lý và nhận thức người dùng (nút Xóa màu đỏ có hộp thoại xác nhận để tránh bấm nhầm không, bảng dữ liệu có bị tràn ép chữ trên điện thoại không, nhãn chữ có bắt người dùng phải nhớ trong đầu không).

### 1.2. Tại sao gọi là "Bộ Agent Skill Độc Lập, Dùng Chung" (Architecture v2.0)?
- **Không phải script gọi API đơn thuần:** Thay vì viết code Node.js gọi thẳng API OpenAI/Gemini bằng API key cá nhân với các prompt đóng cứng, giải pháp được đóng gói thành một **Agent Skill chuẩn (`ai-reviewer/SKILL.md`)** dành cho các AI Coding Agent hiện đại (như Claude Code hoặc Google Antigravity).
- **Tính độc lập & dùng chung (General-purpose & Data-driven):**
  - Skill hoàn toàn **không phụ thuộc** vào website EShop hay bất kỳ ứng dụng cụ thể nào.
  - Toàn bộ tham số (địa chỉ web `baseUrl`, danh sách trang cần duyệt, kích thước màn hình `viewports`) đều được cấu hình động qua file JSON (như `config.example.json` hay `config.todomvc.json`).
  - Muốn đánh giá một website bất kỳ (ví dụ TodoMVC, Tiki, Shopee), chỉ cần đổi cấu hình, **không sửa một dòng code hay một từ nào trong prompt**.
- **Cơ chế 2 tầng Subagent độc lập (Chống nhiễm ngữ cảnh / Contamination):**
  - **Main Agent (Agent điều phối):** Tiếp nhận câu lệnh ngôn ngữ tự nhiên từ người dùng trong khung chat, phân tích ý định, điều khiển Playwright chụp ảnh, gọi kiểm tra schema và gộp báo cáo. Main Agent **tuyệt đối không tự chấm ảnh** để tránh mang thiên kiến từ mã nguồn SUT hay danh sách lỗi có sẵn trong repo.
  - **Subagent 1 — `heuristic-reviewer` (Chấm ảnh cô lập):** Được sinh ra trong một ngữ cảnh hoàn toàn sạch (fresh isolated context). Nó chỉ nhận đúng 3 tham số: thư mục ảnh PNG, file rubric 10 tiêu chí Nielsen (hoàn toàn trung lập, không có từ khóa EShop) và thư mục lưu kết quả JSON. Subagent này bị cấm đọc code SUT, cấm đọc Ground Truth, cấm truy cập web.
  - **Subagent 2 — `finding-labeler` (Gán nhãn đối chiếu Ground Truth):** Chuyên trách đọc các phát hiện của Subagent 1 đối chiếu với `ground-truth/bugs.md` để gán nhãn nháp (`G01`..`G11`, `new-valid` $\rightarrow$ `N01`.., hoặc `false-positive`) phục vụ quy trình Human-in-the-loop (con người kiểm duyệt).

### 1.3. Giải thích các thuật ngữ kỹ thuật cốt lõi:
1. **`baseUrl` (Địa chỉ web gốc):**
   - URL trang chủ của website cần kiểm thử (localhost:5173, link Vercel, hoặc TodoMVC).
   - Đảm bảo tính Data-driven: thay đổi đối tượng kiểm thử bằng file cấu hình mà không đụng chạm mã nguồn.
2. **`5 trang × 2 viewport = 10 ảnh / lần chạy`:**
   - **5 trang:** Bao quát trọn vẹn luồng mua hàng thực tế: Trang chủ (`home`), Chi tiết sản phẩm (`product`), Đăng nhập (`login`), Giỏ hàng (`cart`), Thanh toán (`checkout`).
   - **2 viewport:** Màn hình Desktop (`1440×900`) và Màn hình Mobile điện thoại (`375×812`).
   - **Mục đích:** Bắt các lỗi vỡ layout hoặc chèn ép giao diện khi người dùng chuyển đổi thiết bị (như bảng giỏ hàng 5 cột trên mobile bị ép dính chữ vào nhau).
3. **Cách dựng trạng thái tự động (Automated State Setup trong `src/setups.js`):**
   - Khi mở trình duyệt lên là trắng trơn. Nếu gõ thẳng URL `/cart` thì giỏ rỗng, gõ `/checkout` thì bị chặn bắt đăng nhập.
   - Hàm `addFirstProductToCart` tự động đóng vai người dùng: đăng nhập tài khoản mẫu, thêm sản phẩm vào giỏ, tự động vượt qua bẫy **lỗi G10 (phải bấm nút "Thêm vào giỏ" 2 lần mới ăn)** trước khi bấm chụp ảnh màn hình.
4. **Tại sao cần chạy thực nghiệm 3 lần (3 Runs)?**
   - Mô hình ngôn ngữ lớn (LLM) có tính ngẫu nhiên (non-determinism).
   - Chạy 3 lần độc lập (`run-1`, `run-2`, `run-3`) với tổng cộng 30 ảnh chụp (105 vi phạm) giúp đo lường **độ ổn định và tính nhất quán (Consistency / Stability)** của AI. Kết quả thực nghiệm cho thấy độ ổn định đạt **86.7%** (13/15 lỗi hợp lệ lặp lại bền bỉ ở cả 3 runs).
5. **Bốn luật chống bịa đặt (Anti-hallucination Rules):**
   - Chỉ báo lỗi nhìn thấy trực quan trên ảnh tĩnh.
   - Mỗi phát hiện bắt buộc đủ 6 trường dữ liệu: `heuristic`, `element`, `problem`, `severity`, `evidence`, `fix`.
   - Không được đoán chức năng ẩn hoặc cấu trúc HTML DOM không hiển thị.
   - Bắt buộc vượt qua kiểm tra JSON schema (`schema.json`).

---

## PHẦN 2: CHUẨN BỊ KỸ THUẬT TRƯỚC KHI BẤM QUAY

1. **Giao diện quay màn hình:**
   - Đặt Theme sáng cho VS Code: `File` $\rightarrow$ `Preferences` $\rightarrow$ `Theme` $\rightarrow$ `Color Theme` chọn **Light+ (default light)** hoặc **GitHub Light**.
   - Cỡ chữ: Phóng to vừa mắt (`Ctrl + =`).
   - **Bố cục màn hình lý tưởng:** Chia đôi màn hình:
     - **Bên trái:** Khung Chat của Coding Agent (Antigravity hoặc Claude Code) — nơi bạn gõ các câu lệnh bằng ngôn ngữ tự nhiên và xem Agent phản hồi.
     - **Bên phải:** Cây thư mục VS Code và trình xem ảnh / xem file Markdown để người xem thấy rõ sản phẩm sinh ra theo thời gian thực.
2. **Môi trường chạy:**
   - Mặc định hệ thống trỏ tới bản online Vercel `https://seminar-gui-usability-testing.vercel.app` (cấu hình trong `config.example.json`), không cần khởi động localhost.

---

## PHẦN 3: KỊCH BẢN CHI TIẾT 3 VIDEO CLIP DEMO

---

### 🎬 CLIP AI-1: Nạp Bộ Skill Độc Lập & Chạy Smoke Test Bằng Ngôn Ngữ Tự Nhiên (~3 phút)
- **Tên clip đề xuất:** `Clip_AI1_Setup_Skill_Smoke_Test.mp4`
- **Link YouTube:** https://youtu.be/d2Rigi9dbls
- **Thông điệp chính:** Trình diễn bộ skill khả dụng độc lập, cơ chế tự động nạp skill (Auto-discovery), tương tác hoàn toàn bằng câu lệnh chat tự nhiên, và quy trình Main Agent điều phối Subagent chấm ảnh cô lập.

#### Bảng kịch bản từng giây:

| Thời lượng | Thao tác trên màn hình (Hành động) | Lời thoại thuyết minh (Quân nói) |
| :---: | :--- | :--- |
| **0:00 – 0:40** | - Mở cây thư mục VS Code.<br>- Mở file `.agents/skills/nielsen-heuristic-reviewer/SKILL.md` (hoặc `.claude/skills/`).<br>- Mở tiếp `ai-reviewer/SKILL.md` và `schema.json`. | *"Xin chào thầy và các bạn, em là Bùi Minh Quân, đại diện Nhóm 09 phụ trách phân hệ AI Heuristic Reviewer. Trong video đầu tiên này, em sẽ trình diễn cách nạp bộ kỹ năng đánh giá khả dụng độc lập vào Coding Agent và ra lệnh bằng ngôn ngữ tự nhiên để chạy bài kiểm tra Smoke test."*<br><br>*"Thay vì viết các đoạn mã gọi API cứng nhắc, nhóm đã đóng gói toàn bộ quy trình đánh giá 10 nguyên tắc Nielsen thành một Agent Skill chuẩn. Nhờ cơ chế tự động khám phá (Auto-discovery), ngay khi mở dự án, Agent đã tự nạp kỹ năng `nielsen-heuristic-reviewer` vào bộ nhớ và sẵn sàng nhận lệnh từ người dùng."* |
| **0:40 – 1:25** | - Chuyển sang **Khung Chat với Agent**.<br>- Gõ câu lệnh ngôn ngữ tự nhiên:<br>```text<br>Hãy dùng skill nielsen-heuristic-reviewer để chạy smoke test kiểm tra khả dụng trang chủ (home) ở màn hình desktop của website EShop giúp tôi.<br>```<br>- Nhấn Enter.<br>- Quan sát Agent phân tích ý định và bắt đầu thực thi. | *"Bây giờ, em tương tác với Agent hoàn toàn bằng ngôn ngữ tự nhiên. Em yêu cầu: 'Hãy dùng skill nielsen-heuristic-reviewer để chạy smoke test kiểm tra khả dụng trang chủ ở màn hình desktop'.*<br><br>*Ngay lập tức, Agent chính đóng vai trò điều phối viên: nó tự động kích hoạt Playwright chạy ở chế độ headless, truy cập trang chủ theo cấu hình, chụp lại bức ảnh ở độ phân giải Desktop 1440x900 và lưu vào thư mục `out/smoke/shots/` kèm metadata."* |
| **1:25 – 2:10** | - Trên màn hình hiển thị Agent kích hoạt subagent con `heuristic-reviewer`.<br>- Mở cây thư mục: mở ảnh `out/smoke/shots/home-desktop.png` và file JSON sinh ra `out/smoke/findings/home-desktop.json`. | *"Điểm đặc biệt trong kiến trúc của nhóm là cơ chế cách ly Subagent để chống nhiễm ngữ cảnh (Anti-contamination). Agent chính không tự chấm ảnh, mà khởi tạo một Subagent chuyên trách tên là `heuristic-reviewer` trong một môi trường hoàn toàn sạch.*<br><br>*Subagent này chỉ được cung cấp bức ảnh PNG và file rubric 10 tiêu chí Nielsen trung lập; nó hoàn toàn bị cấm đọc mã nguồn hay danh sách lỗi Ground Truth. Subagent phân tích từng thành phần trực quan và xuất ra file JSON đúng cấu trúc 6 trường dữ liệu."* |
| **2:10 – 2:50** | - Quan sát Agent tự động thực hiện bước xác thực JSON schema và xuất báo cáo:<br>- Agent in ra kết quả: `VALID 1 files` và sinh ra `out/smoke/report.md`. | *"Sau khi Subagent hoàn thành, Agent chính tự động chạy bước kiểm tra tính hợp lệ theo `schema.json` để đảm bảo không có trường dữ liệu nào bị thiếu và Severity nằm đúng thang điểm 0–4. Khi xác thực hợp lệ, Agent tổng hợp tất cả phát hiện thành một báo cáo Markdown hoàn chỉnh."* |
| **2:50 – 3:15** | - Mở file `out/smoke/report.md` dạng Preview (hoặc chỉ vào bảng kết quả Agent render trực tiếp trong khung chat). | *"Như thầy và các bạn thấy, báo cáo Markdown đã được tạo ra rõ ràng với tiêu chí vi phạm, mức độ nghiêm trọng, vị trí trên màn hình và giải pháp đề xuất. Smoke test đã thành công, chứng minh toàn bộ quy trình Agent Skill tự động đã sẵn sàng!"* |

---

### 🎬 CLIP AI-2: Đánh giá Chuyên sâu Giỏ hàng & Đối thoại Phản biện Chất vấn AI (~3–4 phút)
- **Tên clip đề xuất:** `Clip_AI2_Deep_Dive_Cart_Interactive.mp4`
- **Link YouTube:** https://youtu.be/wXIQ4o7bVi8
- **Thông điệp chính:** Trình diễn khả năng tự động dựng trạng thái giỏ hàng (Automated State Setup), nhập câu lệnh tự nhiên để đánh giá trang `/cart`, và thực hiện **hỏi đáp trực tiếp trong Chat để chất vấn AI về các lỗi nó bỏ sót**, từ đó nêu bật giới hạn cốt lõi của Vision AI khi đối chiếu với Ground Truth.

#### Bảng kịch bản từng giây:

| Thời lượng | Thao tác trên màn hình (Hành động) | Lời thoại thuyết minh (Quân nói) |
| :---: | :--- | :--- |
| **0:00 – 0:45** | - Mở file `src/setups.js`, cuộn đến hàm `addFirstProductToCart`.<br>- Chỉ vào đoạn code xử lý click nút 'Thêm vào giỏ' 2 lần và chuyển hướng sang giỏ hàng. | *"Trong video thứ hai, em tiến hành đánh giá chuyên sâu trên trang Giỏ hàng (`/cart`). Đây là màn hình đòi hỏi phải có trạng thái dữ liệu trước: giỏ hàng phải có sản phẩm thì mới đánh giá được.*<br><br>*Trong `src/setups.js`, nhóm đã định nghĩa hàm `addFirstProductToCart`. Hàm này đóng vai người dùng, tự động vượt qua bẫy lỗi cố ý G10 của ứng dụng—đó là nút thêm vào giỏ phải bấm hai lần mới nhận—sau đó mới điều hướng vào giỏ hàng để chụp ảnh."* |
| **0:45 – 1:30** | - Chuyển sang Khung Chat Agent.<br>- Gõ câu lệnh tự nhiên:<br>```text<br>Dùng skill nielsen-heuristic-reviewer để rà soát khả dụng trang Giỏ hàng (/cart) của EShop trên màn hình desktop giúp tôi.<br>```<br>- Nhấn Enter.<br>- Quan sát Agent tự chạy setup, chụp ảnh `cart-desktop.png`, gọi subagent và xuất báo cáo. | *"Bây giờ, em gõ lệnh tự nhiên vào khung chat: 'Dùng skill nielsen-heuristic-reviewer để rà soát khả dụng trang Giỏ hàng của EShop trên màn hình desktop'.*<br><br>*Agent tự động hiểu cần kích hoạt kịch bản setup giỏ hàng, mở Playwright chụp ảnh `cart-desktop.png`, chuyển bức ảnh vào Subagent cách ly để chấm điểm và trả về kết quả rà soát ngay trong khung chat."* |
| **1:30 – 2:20** | - Mở song song ảnh `out/cart-demo/shots/cart-desktop.png` bên trái và bảng kết quả báo cáo bên phải.<br>- Chỉ chuột vào các phát hiện UX nổi bật. | *"Quan sát kết quả, AI nắm bắt rất sắc bén các lỗi khả dụng trực quan:<br>1. Nút 'Xóa' màu đỏ đặt cạnh sản phẩm xóa thẳng tay mà không hề có hộp thoại xác nhận hay nút hoàn tác Undo—vi phạm nghiêm trọng nguyên tắc H3 Tự do cho người dùng và H5 Phòng ngừa lỗi (Severity 3).<br>2. Cột số lượng chỉ là con số tĩnh, thiếu nút cộng trừ tăng giảm nhanh (vi phạm H3/H7).<br>3. Thiếu nút quay lại tiếp tục mua sắm."* |
| **2:20 – 3:30** | - **Hành động tương tác độc đáo:** Trong khung Chat, gõ câu hỏi phản biện chất vấn Agent:<br>```text<br>Trên trang giỏ hàng này có 2 lỗi: Nút "Tiến hành thanh toán" màu xanh lá trong khi tài liệu dự án yêu cầu màu xanh dương (lỗi G04), và tiêu đề trang dùng thẻ h2 thay vì h1 (lỗi G05). Tại sao AI của bạn không báo hai lỗi này?<br>```<br>- Chờ 5 giây xem Agent phân tích và trả lời trực tiếp trong chat. | *"Để làm rõ tính chất của AI Reviewer, em gõ một câu hỏi chất vấn trực tiếp Agent ngay trong khung chat: 'Tại sao AI không báo lỗi nút thanh toán màu xanh lá và lỗi thẻ h2 thay vì h1?'.*<br><br>*Câu trả lời của Agent đã vạch rõ 2 giới hạn cốt lõi của Vision AI khi đối chiếu với Ground Truth:<br>- Thứ nhất là **Specification-blindness (Không có tài liệu đặc tả nghiệp vụ):** AI chỉ đánh giá dựa trên 10 nguyên tắc phổ quát. Nhìn trên ảnh, nút màu xanh lá cây tương phản tốt, nổi bật và thân thiện, nên AI thấy hoàn toàn hợp lý. AI không thể biết tài liệu FR-21 quy định nút phải màu xanh dương nếu không được cấp bản đặc tả.<br>- Thứ hai là **Visual-only constraint (Chỉ nhìn ảnh rendered pixels):** AI chỉ nhìn vào bức ảnh tĩnh bên ngoài, hoàn toàn không đọc mã nguồn HTML DOM bên dưới nên không thể biết chữ tiêu đề là thẻ h1 hay h2."* |
| **3:30 – 4:00** | - Mở file `ground-truth/bugs.md` chỉ vào mã `G04`, `G05`, `G10`.<br>- Kết luận ngắn gọn. | *"Đồng thời, lỗi G10 nút bấm 2 lần là lỗi tương tác đa bước, ảnh chụp tĩnh không thể ghi nhận được. Điều này khẳng định kết luận quan trọng của nhóm: AI Reviewer là công cụ hỗ trợ rà soát UX thị giác cực kỳ mạnh mẽ, nhưng con người và kiểm thử tự động Playwright vẫn là bắt buộc để kiểm soát logic đặc tả và cấu trúc mã nguồn!"* |

---

### 🎬 CLIP AI-3: Thực nghiệm Toàn luồng 3 Lần, Đối chiếu Ground Truth & Tái sử dụng trên TodoMVC (~5–6 phút)
- **Tên clip đề xuất:** `Clip_AI3_Full_Flow_3Runs_GroundTruth_TodoMVC.mp4`
- **Link YouTube:** https://youtu.be/8I4n31fuWNc
- **Thông điệp chính:** Đánh giá toàn luồng mua sắm (5 trang $\times$ 2 viewports) lặp lại **3 lần độc lập (3 runs)** để đo độ ổn định; dùng Subagent gán nhãn nháp đối chiếu Ground Truth; phân tích bảng so sánh CHI 2024; và chứng minh tính độc lập, dùng chung (Data-driven) khi chạy trên ứng dụng TodoMVC.

#### Bảng kịch bản từng giây:

| Thời lượng | Thao tác trên màn hình (Hành động) | Lời thoại thuyết minh (Quân nói) |
| :---: | :--- | :--- |
| **0:00 – 1:00** | - Mở file `config.example.json` (chỉ rõ 5 trang: `home`, `product`, `login`, `cart`, `checkout` và 2 viewport: Desktop 1440, Mobile 375).<br>- Mở thư mục `evidence/ai/runs/` hiển thị 3 thư mục: `run-1`, `run-2`, `run-3`. | *"Trong video thứ ba, em tiến hành kịch bản thực nghiệm toàn diện nhất: Đánh giá toàn bộ luồng mua sắm gồm 5 trang chính trên cả 2 độ phân giải Desktop và Mobile, lặp lại qua 3 lần chạy độc lập (`run-1`, `run-2`, `run-3`).*<br><br>*Tại sao cần chạy 3 lần? Do mô hình LLM có tính ngẫu nhiên (non-determinism), việc chạy lặp lại 3 lần với 30 bức ảnh chụp giúp chúng ta đo lường chính xác độ ổn định và tính nhất quán của AI. Toàn bộ 3 lần chạy đã thu về tổng cộng 105 vi phạm khả dụng."* |
| **1:00 – 1:50** | - Trong khung Chat, gõ câu lệnh yêu cầu Agent gán nhãn:<br>```text<br>Hãy gom 105 phát hiện từ 3 lần chạy, dùng subagent finding-labeler đối chiếu với Ground Truth trong ground-truth/bugs.md để gán nhãn nháp và xuất bảng so sánh tổng hợp.<br>```<br>- Agent chạy lệnh gom nhãn, kích hoạt Subagent `finding-labeler` và chạy `compare`. | *"Bây giờ, em yêu cầu Agent điều phối Subagent thứ hai mang tên `finding-labeler`. Subagent này nhận danh sách 105 phát hiện từ `to-label.json`, đọc file `ground-truth/bugs.md` và cẩm nang `labeling-guide.md` để gán nhãn nháp từng dòng lỗi: xác định lỗi nào trùng Ground Truth G01–G11, lỗi nào là phát hiện mới hợp lệ N01, N02, và lỗi nào là dương tính giả (false-positive)."* |
| **1:50 – 3:20** | - Mở file `evidence/ai/comparison-summary.md` (chế độ Preview Markdown).<br>- Chỉ chuột vào bảng đối chiếu số liệu với bài báo khoa học CHI 2024. | *"Đây là bảng tổng kết thực nghiệm của nhóm khi đặt cạnh công trình nghiên cứu công bố tại hội nghị quốc tế CHI 2024:<br>- **Độ chuẩn xác (Precision):** Đạt trung bình **0,76** (trong đó run-1 đạt 0,77; run-2 đạt 0,81; run-3 đạt 0,69), vượt trội so với mức trung bình 0,60 của bài báo CHI 2024 sử dụng GPT-4.<br>- **Độ phủ (Recall):** Đạt **0,45**, phát hiện được 5 trên 11 lỗi Ground Truth trực quan.<br>- **Độ ổn định qua 3 lần chạy (Consistency):** Đạt **86,7%** (13/15 lỗi hợp lệ xuất hiện bền bỉ ở cả 3 lần chạy).<br>- Đặc biệt, AI phát hiện thêm các lỗi mới rất thực tế ngoài Ground Truth ban đầu, tiêu biểu là lỗi N01: bảng giỏ hàng 5 cột bị tràn và dính chữ nghiêm trọng trên màn hình điện thoại 375px."* |
| **3:20 – 4:10** | - Mở file `evidence/ai/labels.csv`.<br>- Cuộn qua các cột: `finding_id`, `run`, `ai_label`, `confidence`, `human_label`, `human_note`. | *"Để đảm bảo chuẩn mực khoa học và tính liêm chính học thuật, nhóm tuân thủ nghiêm ngặt quy trình Human-in-the-loop: Nhãn của AI chỉ mang tính tham khảo (Draft). Nhóm mở file `labels.csv` và rà soát thủ công lại từng dòng, đặc biệt là 16 trường hợp AI đánh dấu độ tự tin thấp ('low') để đưa ra nhãn kiểm duyệt chính thức cuối cùng."* |
| **4:10 – 5:15** | - Mở file cấu hình `config.todomvc.json`.<br>- Trong khung Chat, gõ câu lệnh tự nhiên:<br>```text<br>Để chứng minh tính độc lập và dùng chung của skill, hãy áp dụng skill nielsen-heuristic-reviewer sang ứng dụng web TodoMVC với cấu hình config.todomvc.json.<br>```<br>- Mở ảnh `evidence/ai/runs/todomvc/shots/todomvc-desktop.png` và file `report.md`. | *"Cuối cùng, để chứng minh đây là một **bộ Agent Skill độc lập, dùng chung (Data-driven)** chứ không bị gắn chết vào mã nguồn EShop, em chỉ cần đổi file cấu hình sang `config.todomvc.json` trỏ tới ứng dụng TodoMVC.<br><br>Không cần sửa bất kỳ dòng code engine hay file rubric nào, Agent tự động mở Playwright chụp ảnh TodoMVC có sẵn việc cần làm và phân tích. AI đã phát hiện 4 vấn đề khả dụng thực tế trên TodoMVC, ví dụ như độ tương phản chữ xám mờ trên nền trắng vi phạm chuẩn WCAG H8, và thiếu nút xóa trực quan trên từng đầu việc (H3)."* |
| **5:15 – 5:45** | - Chuyển sang slide tổng kết hoặc mở trang GitHub repository của nhóm. | *"Tổng kết lại, qua 3 lần thực nghiệm và kiểm chứng trên cả EShop lẫn TodoMVC, nhóm đã chứng minh AI Heuristic Reviewer là một phương pháp kiểm thử khả dụng tự động nhanh chóng, có độ ổn định cao và dễ dàng mở rộng cho mọi ứng dụng web. Em xin trân trọng cảm ơn thầy và các bạn đã lắng nghe!"* |

---

## PHẦN 4: BẢNG TRA CỨU CÂU LỆNH NHANH (CHAT & TERMINAL)

Khi quay video, bạn có thể **gõ trực tiếp câu lệnh ngôn ngữ tự nhiên vào khung chat với Agent**, hoặc nếu cần thao tác nhanh ở hậu trường, bạn có thể gõ các dòng lệnh Terminal tương ứng bên dưới (tại thư mục `ai-reviewer`):

### 4.1. Bảng đối chiếu Câu lệnh Chat & Lệnh Terminal:

| Mục đích | Câu lệnh Chat tự nhiên với Agent (Khuyên dùng khi quay) | Lệnh Terminal tương ứng |
| :--- | :--- | :--- |
| **Clip 1: Smoke Test** | `"Hãy dùng skill nielsen-heuristic-reviewer để chạy smoke test kiểm tra khả dụng trang chủ (home) ở màn hình desktop của website EShop giúp tôi."` | `npm run capture -- --run smoke --only home --viewport desktop`<br>`npm run validate -- --run smoke --model "claude-opus-4-6"`<br>`npm run report -- --run smoke` |
| **Clip 2: Giỏ hàng (/cart)** | `"Dùng skill nielsen-heuristic-reviewer để rà soát khả dụng trang Giỏ hàng (/cart) của EShop trên màn hình desktop giúp tôi."` | `npm run capture -- --run cart-demo --only cart --viewport desktop`<br>`npm run validate -- --run cart-demo --model "claude-opus-4-6"`<br>`npm run report -- --run cart-demo` |
| **Clip 2: Câu hỏi chất vấn** | `"Trên trang giỏ hàng này có 2 lỗi: Nút 'Tiến hành thanh toán' màu xanh lá (yêu cầu màu xanh dương - G04), và tiêu đề dùng thẻ h2 thay vì h1 (G05). Tại sao AI của bạn không báo hai lỗi này?"` | *(Tương tác trực tiếp trong Chat để Agent phân tích lý do)* |
| **Clip 3: Chạy 3 lần độc lập** | `"Dùng skill nielsen-heuristic-reviewer chạy toàn luồng 5 trang qua 3 lần độc lập (run-1, run-2, run-3) để đánh giá độ ổn định của AI."` | *(Đã chạy sẵn tạo ra `evidence/ai/runs/run-1`, `run-2`, `run-3`)* |
| **Clip 3: Gán nhãn & So sánh** | `"Hãy gom 105 phát hiện từ 3 lần chạy, dùng subagent finding-labeler đối chiếu với Ground Truth để gán nhãn nháp và xuất bảng so sánh tổng hợp."` | `npm run labels:prepare -- --runs run-1,run-2,run-3`<br>`npm run labels:merge`<br>`npm run compare -- --runs run-1,run-2,run-3` |
| **Clip 3: Thử nghiệm TodoMVC** | `"Để chứng minh tính độc lập và dùng chung, hãy áp dụng skill nielsen-heuristic-reviewer sang ứng dụng web TodoMVC với file cấu hình config.todomvc.json."` | `npm run capture -- --config config.todomvc.json --run todomvc`<br>`npm run validate -- --config config.todomvc.json --run todomvc --model "claude-opus-4-6"`<br>`npm run report -- --config config.todomvc.json --run todomvc` |

---

## PHẦN 5: BÍ QUYẾT QUAY VIDEO ĂN ĐIỂM CAO

1. **Giọng nói dõng dạc, tốc độ vừa phải:** Không đọc như trả bài; hãy nhấn mạnh vào các từ khóa kỹ thuật như *"Subagent cô lập"*, *"Anti-contamination"*, *"Human-in-the-loop"*, *"Data-driven"*, *"Specification-blindness"*.
2. **Thao tác chuột có chủ đích:** Khi nói đến con số hay tiêu chí nào (ví dụ độ chuẩn xác 0,76, lỗi Severity 3, nút Xóa màu đỏ), hãy rê chuột khoanh tròn nhẹ vào vị trí đó trên màn hình để người xem dễ theo dõi.
3. **Tận dụng dữ liệu có sẵn:** Toàn bộ dữ liệu 3 runs (`run-1`, `run-2`, `run-3`), file `labels.csv`, `comparison-summary.md` và `todomvc` đã được sinh và lưu trữ đầy đủ trong thư mục `evidence/ai/`. Bạn có thể mở trực tiếp các file này ra để thuyết minh mượt mà mà không lo bị lỗi mạng hay hết quota API trong lúc quay.
