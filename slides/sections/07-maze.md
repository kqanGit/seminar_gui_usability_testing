<!-- Phụ trách: Phúc (B). Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">07</p>

## Công cụ Maze: Usability Testing

- Thuật ngữ và nguyên lý Live Website Testing
- Chuẩn bị môi trường SUT EShop cho người tham gia
- 3 Demo: Cài đặt · Cơ bản (SEQ) · Study Checkout (SUS)
- Phân tích kết quả ~5 người tham gia và điểm yếu của Maze

Note: Phần 06 đã kiểm tra giao diện đúng đặc tả bằng Playwright; phần 07 dùng Maze để đo xem người dùng thật có thực hiện được nhiệm vụ mua hàng trên EShop hay không.

---

## Maze là gì & Thuật ngữ cốt lõi

**Maze** là nền tảng kiểm thử khả dụng không điều phối (**Unmoderated Usability Testing**), thu thập hành vi người tham gia trực tiếp qua đường dẫn web.

| Thuật ngữ | Ý nghĩa trong kiểm thử EShop |
| --- | --- |
| **Study & Block** | Một đợt khảo sát gồm chuỗi khối: Welcome → Mission → SEQ → SUS |
| **Mission & Task Scenario** | Nhiệm vụ giao cho người tham gia, viết theo mục tiêu người dùng |
| **Expected Path** | Chuỗi URL chuẩn: `/` → `/product/6` → `/cart` → `/checkout` |
| **Direct / Indirect Success** | Tới trang đích đúng đường đi kỳ vọng / tới đích nhưng đi vòng |
| **Give-up / Bounce** | Bỏ cuộc giữa chừng hoặc đóng trang trước khi tới đích |
| **Misclick Rate & Heatmap** | Tỷ lệ click ngoài vùng kỳ vọng và bản đồ nhiệt mật độ click |

Note: Nhấn mạnh quy tắc viết Task Scenario: không bao giờ lộ tên nút bấm trên giao diện như "Hãy bấm nút Tiến hành thanh toán".

---

## Nguyên lý hoạt động: Live Website Testing

<p class="flow">Nhúng Maze Snippet (index.html) → Mở link Study (t.maze.co) → Ghi URL & tọa độ click → Chạm Goal URL (/checkout) → Báo cáo Path, Heatmap, SEQ, SUS</p>

```html
<!-- sut/eshop/frontend-web/index.html -->
<script>
  (function (m, a, z, e) {
    /* ... nạp script theo dõi phiên của Maze ... */
    s = a.createElement('script');
    s.src = z + '?apiKey=' + e;
    a.getElementsByTagName('head')[0].appendChild(s);
  })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', '%VITE_MAZE_API_KEY%');
</script>
```

<p class="small">Snippet theo dõi sự kiện chuyển trang của React SPA (History API) và ghi nhận tọa độ click theo viewport.</p>

Note: Khác với kiểm thử trên Figma prototype, Live Website Testing chạy thẳng trên ứng dụng EShop đã deploy.

---

## Bộ ba kỹ thuật kiểm thử trong Maze

| Kỹ thuật | Trong Playwright (GUI) | Trong Maze (Usability) | Demo |
| --- | --- | --- | --- |
| **Record & Playback** | `codegen` ghi thao tác thành code chạy lại | Snippet **ghi (Record)** hành trình URL, click chuột và **tái hiện (Playback)** thành sơ đồ Path & Heatmap | Demo 2, 3 |
| **Data-driven** | Lặp test qua mảng `pages.json` × `viewports` | Cùng một kịch bản Mission chạy qua **~5 người tham gia độc lập** (`p1`…`p5`) để thống kê | Demo 3 |
| **Checkpoints** | `expect(...)` kiểm tra DOM, CSS, ảnh chụp | Đối chiếu **Goal URL (`/checkout`)** và **Expected Path** để chấm Direct / Indirect Success | Demo 2, 3 |

<p class="key">Playwright kiểm chứng thuộc tính kỹ thuật của giao diện; Maze kiểm chứng hành trình đạt mục tiêu của con người.</p>

Note: Slide này trả lời trực tiếp yêu cầu của môn học: chỉ rõ Record & Playback, Data-driven và Checkpoints nằm ở đâu trong Maze.

---

## Chuẩn bị SUT EShop trước khi chạy Study

Để ~5 người tham gia từ xa làm bài độc lập mà **không sửa bất kỳ lỗi GUI cố ý nào (G01–G11)**, nhóm thực hiện 3 chuẩn bị kỹ thuật:

| Hạng mục | Vấn đề trên SUT gốc | Cách xử lý của nhóm |
| --- | --- | --- |
| **1. URL API cứng** | 13 chỗ gọi `http://localhost:3000` làm máy người tham gia bị trắng trang | Đổi sang `import.meta.env.VITE_API_URL` (commit `ed85e81`), deploy Vercel + Render |
| **2. Tài khoản test** | DB chỉ có 1 user `test@eshop.com`, dùng chung sẽ đụng giỏ hàng & hết lượt mã | Seed thêm 6 tài khoản `p1@eshop.com` … `p6@eshop.com` trong `database.js` (`267311a`) |
| **3. Mã giảm giá** | Mã `SAVE10` lỗi công thức tính % ở backend, gây nhiễu kết quả usability | Dùng mã **`VIP100`** (giảm cố định `100.000 ₫`, tối đa 2 lần/user) |

<p class="small">Mọi thay đổi kỹ thuật trên SUT đều được ghi nhật ký minh bạch tại <code>sut/README.md</code>.</p>

Note: Giải thích kỹ vì sao không dùng SAVE10: chúng ta đang đo Usability (T1), nếu để lỗi tính tiền backend (T2) làm người dùng hoang mang thì kết quả SUS/SEQ sẽ bị nhiễu.

---

## Demo 1 — Cài đặt & Xác thực Live Website

1. Tạo Project trên Maze Dashboard → lấy khóa định danh `apiKey` trong mục **Install Snippet**
2. Gắn **Maze Universal Snippet** vào thẻ `<head>` của `sut/eshop/frontend-web/index.html`
3. Cấu hình biến `VITE_API_URL` và `VITE_MAZE_API_KEY` trên bản deploy public (Vercel)
4. Mở Chrome DevTools (**Network**) kiểm tra `maze-universal-loader.js` trả về `200 OK`
5. Bấm **Verify** trên Maze Dashboard → trạng thái báo **Connected / Verified**

<p class="clip">▶ Clip Demo 4 — Maze Cài đặt & Xác thực Snippet: (đang cập nhật link YouTube trong videos/README.md)</p>

Note: Trong clip Demo 1 có quay rõ bước kiểm tra gói tin mạng và màn hình xác nhận kết nối xanh lá của Maze.

---

## Demo 2 — Cơ bản: 1 Mission + Câu hỏi SEQ

- **Mục tiêu:** Tạo 1 nhiệm vụ đơn giản, gắn **Checkpoint** trang đích, tự làm thử (**Record**) và đọc kết quả
- **Mission:** *"Tìm xem chi tiết sản phẩm Bàn phím cơ Keychron Q1 và thêm sản phẩm vào giỏ hàng"*
- **Expected Path (Checkpoint):** `/` (Trang chủ) → `/product/6` (Chi tiết SP) → `/cart` (Giỏ hàng)
- **Khối đánh giá ngay sau Mission:** Câu hỏi **SEQ (Single Ease Question)** thang 1–7 (*"Rất khó"* → *"Rất dễ"*)
- **Quan sát đầu tiên khi chạy thử:** Tại `/product/6`, bấm *"Thêm vào giỏ"* lần 1 không ăn (lỗi `G10`), phải bấm lần 2 mới sang `/cart` có hàng

<p class="clip">▶ Clip Demo 5 — Maze Cơ bản (1 Mission + SEQ): (đang cập nhật link YouTube trong videos/README.md)</p>

Note: Demo 2 giúp kiểm tra luồng kỹ thuật (Pilot test) trước khi xuất bản Study chính thức vì gói Free chỉ cho 1 study/tháng.

---

## Demo 3 — Study Checkout đầy đủ (~5 người) + SUS

<p class="flow">Block 1: Welcome (cấp p1..p5) → Block 2: Mission Checkout (ngân sách 5 triệu + mã VIP100) → Block 3: Câu hỏi SEQ (1–7) → Block 4: Bảng SUS 10 câu (1–5)</p>

- **Kịch bản nhiệm vụ (Task Scenario):**
  *"Bạn có ngân sách tối đa **5.000.000 ₫** và muốn mua **một món phụ kiện cho máy tính**. Hãy tìm sản phẩm phù hợp, thêm vào giỏ và hoàn tất đặt hàng có dùng mã **VIP100**."*
- **Bẫy logic tự nhiên:** Danh mục *Phụ kiện* có `AirPods Pro 2` (`6.000.000 ₫` — vượt ngân sách) và `Keychron Q1` (`4.000.000 ₫` — vừa ngân sách, sau giảm còn `3.900.000 ₫`)
- **Data-driven:** 5 người tham gia ngoài nhóm làm độc lập trên 5 tài khoản `p1`…`p5`

<p class="clip">▶ Clip Demo 6 — Maze Study Checkout & Phân tích SUS/Heatmap: (đang cập nhật link YouTube trong videos/README.md)</p>

Note: Thiết kế study đầy đủ nằm tại file maze/study-design.md trong repo.

---

## Kết quả Study (~5 người tham gia): Đường đi & Chỉ số

| Người tham gia | Kết quả đường đi | Thời gian | Click ở `/product/6` | SEQ (1–7) | SUS (0–100) |
| --- | --- | --- | --- | --- | --- |
| **P1** (`p1@eshop.com`) | Indirect Success | ~95s | 3 clicks | 4 / 7 | 57,5 |
| **P2** (`p2@eshop.com`) | Direct Success | ~68s | 2 clicks | 5 / 7 | 65,0 |
| **P3** (`p3@eshop.com`) | Indirect Success | ~112s | 4 clicks | 4 / 7 | 52,5 |
| **P4** (`p4@eshop.com`) | Direct Success | ~74s | 2 clicks | 5 / 7 | 62,5 |
| **P5** (`p5@eshop.com`) | Indirect Success | ~104s | 3 clicks | 4 / 7 | 55,0 |
| **Trung bình** | **100% xong (40% Direct · 60% Indirect)** | **~90,6s** | **2,8 clicks** | **4,4 / 7** | **58,5 (Hạng D)** |

<p class="small">Chi tiết dữ liệu xuất tại <code>maze/results/</code> và ảnh minh chứng tại <code>evidence/maze/</code>.</p>

Note: Chú ý: Dù 100% hoàn thành đơn hàng, có tới 60% người dùng bị đi đường vòng (Indirect Success) và điểm SUS trung bình 58,5 thấp hơn chuẩn 68.

---

## Phát hiện đắt giá từ Heatmap & Path Analysis

- **1. "Vòng lặp Giỏ hàng rỗng" (Tổ hợp lỗi `G10` + `G08` — H1):**
  - 60% người tham gia đi vòng: `/product/6` → `/cart` (thấy trống) → quay lại `/product/6` → `/cart`
  - **Heatmap `/product/6`:** vùng đỏ rực tại nút *"Thêm vào giỏ"* (trung bình **2,8 clicks/người**, có hiện tượng **Rage Click**) do bấm lần 1 không ăn và Header không có badge số lượng (`G08`)
- **2. Mất sản phẩm do thiếu xác nhận xóa (Lỗi `G02` — H3, H5):**
  - P5 bấm nhầm nút *"Xóa"* trong giỏ hàng làm mất ngay sản phẩm mà không có dialog hỏi lại, tốn thêm ~30 giây làm lại từ đầu
- **3. Khựng lại ở bước Thanh toán (Lỗi `G06` — H5):**
  - P3 dừng rất lâu tại `/checkout` vì thấy ô *"Tổng tiền thanh toán"* cho phép tự gõ sửa số tiền

<p class="key">Heatmap và Path chỉ ra chính xác lỗi giao diện nào thực sự làm người dùng bị kẹt và tốn thời gian.</p>

Note: Đây là điểm mạnh nhất của Usability Testing so với kiểm thử tĩnh: thấy được tác động dây chuyền giữa lỗi G10 và G08 lên hành vi người thật.

---

## Đánh giá điểm SEQ & SUS của EShop

<div class="scale">
  <div><b>F (&lt;51)</b>Rất kém</div>
  <div><b>D (51–67,9)</b>EShop: 58,5</div>
  <div><b>C (68–73,9)</b>Trung bình (68)</div>
  <div><b>B (74–80,2)</b>Tốt</div>
  <div><b>A (≥80,3)</b>Xuất sắc</div>
</div>

- **Điểm SEQ trung bình = 4,4 / 7:** Nhiệm vụ không quá phức tạp về mặt nghiệp vụ nhưng gây khựng ở thao tác thêm giỏ
- **Điểm SUS trung bình = 58,5 / 100 (Hạng D — Marginal / Dưới mức chuẩn 68):**
  - **Câu 6 bị mất điểm nặng nhất:** người dùng nhận thấy sự thiếu nhất quán (`G01` *"Tổng tạm tính"*, `G04` nút xanh lá, `G07` nút *"Thoát"*)
  - **Câu 9 (Sự tự tin) đạt điểm thấp:** người dùng bất an khi nút bấm không phản hồi (`G10`), xóa không hỏi lại (`G02`) và ô tổng tiền sửa được (`G06`)

Note: Bảng tính điểm SUS chi tiết này cũng chính là ngữ liệu thực tế dùng cho Bài tập về nhà số 3 của lớp.

---

## Điểm yếu & Giới hạn thực tế của Maze

| Giới hạn của Maze | Biểu hiện thực tế trên EShop | Cách nhóm khắc phục |
| --- | --- | --- |
| **1. Theo dõi theo URL (URL-based tracking)** | Thao tác nhập mã `VIP100` và bấm *"Áp dụng"* diễn ra ngay trong `/checkout` (không đổi URL) nên Maze không tách thành bước riêng trên Path | Kiểm tra qua điểm click trên **Heatmap** trang `/checkout` và đối chiếu dữ liệu đơn hàng ở Backend |
| **2. Unmoderated thiếu câu trả lời "Tại sao"** | Thấy người dùng dừng 40 giây ở `/checkout` nhưng không biết họ đang đọc gì hay bối rối chỗ nào | Kết hợp câu hỏi khảo sát sau nhiệm vụ hoặc phỏng vấn ngắn **Think-aloud** (Moderated) |
| **3. Giới hạn gói Free (Quota)** | Chỉ cho phép **1 Study/tháng**, giới hạn số block và tính năng xuất CSV/quay clip màn hình | Thiết kế kỹ trên giấy (`maze/study-design.md`) và chạy Pilot trước khi mở chính thức |
| **4. Xung đột với AdBlocker** | Trình chặn quảng cáo (*uBlock*, *Brave*) có thể chặn script `snippet.maze.co` làm mất dữ liệu đường đi | Nhắc người tham gia tắt AdBlock trên domain EShop trong ~5 phút làm bài |

<p class="key">Maze rất mạnh để đo định lượng đường đi và vùng click, nhưng cần kết hợp Think-aloud để hiểu sâu nguyên nhân tâm lý.</p>

Note: Kết thúc phần 07, chuyển sang phần 08 để xem AI (user-sim-agent và heuristic-agent) có tìm ra được những vấn đề tương tự 5 người thật trên Maze hay không.
