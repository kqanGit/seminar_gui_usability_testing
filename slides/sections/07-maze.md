<!-- Phụ trách: Phúc. Khung slide 30 phút do Quân soạn (có dùng Claude) theo thiết kế study UXtweak + Microsoft Clarity; Phúc kiểm lại thuật ngữ, điền kết quả, ảnh và link clip. Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">07</p>

## UXtweak & Microsoft Clarity

- UXtweak & Clarity là gì, thuật ngữ chính
- Study của nhóm trên EShop
- 3 demo và kết quả
- Điểm yếu (và lý do đổi từ Maze)

Note: Thời gian: 4 phút (Phúc). Lưu ý: Proposal ban đầu chọn Maze và đặt UXtweak làm dự phòng; khi triển khai thực tế, Maze loại khối Live Website Testing khỏi bản Free/Trial (yêu cầu gói trả phí ~$99/tháng) nên nhóm kích hoạt phương án dự phòng UXtweak kết hợp Microsoft Clarity.

---

## UXtweak & Microsoft Clarity là gì?

- **UXtweak (Website Testing):** nền tảng **usability testing từ xa, không điều phối** (unmoderated, remote) — người tham gia tự làm qua link
- **Study:** một bài khảo sát gồm lời chào, **Task** (nhiệm vụ) trên web thật (qua **UXtweak Snippet**) và **Questionnaire** (**SEQ**, **SUS**)
- **Success URL & Optimal Path:** đối chiếu trang đích (`/checkout`) và số trang tối ưu (`4` trang) → chia kết quả **Direct · Indirect · Skip** và tính độ lạc đường (**Lostness**)
- **Session Replay:** tự động quay lại màn hình, hành trình URL và thao tác chuột của người tham gia
- **Microsoft Clarity (nhúng song song, miễn phí):** tự động vẽ **Click Heatmap** và phát hiện **Rage Click / Dead Click** trong cùng phiên làm bài

Note: Giải thích rõ: Gói Free của UXtweak chỉ cho 1 active study tại một thời điểm, nên nhóm nhúng song song cả UXtweak Snippet và Microsoft Clarity vào thẻ `<head>` của `index.html`. Người tham gia chỉ cần làm bài 1 lần là thu được đồng thời Task/SEQ/SUS/Replay trên UXtweak và Click Heatmap/Rage Click trên Clarity.

---

## Study của nhóm: mua hàng có mã giảm giá

<p class="flow">Welcome → Task 1 (Mua phụ kiện + VIP100) → SEQ (1–7) → SUS (10 câu)</p>

> "Bạn có ngân sách tối đa 5.000.000 ₫ và muốn mua một món phụ kiện cho máy tính. Hãy tìm sản phẩm phù hợp, thêm vào giỏ và hoàn tất đặt hàng có dùng mã giảm giá VIP100."

- 5–6 người tham gia ngoài nhóm, mỗi người một tài khoản độc lập `p1`…`p6@eshop.com`
- Đường đi tối ưu (`4` trang): Trang chủ `/` → Keychron Q1 `/product/5` → Giỏ hàng `/cart` → Thanh toán `/checkout`
- Kịch bản **không lộ tên nút**; chọn `VIP100` (giảm cố định `100.000 ₫`) vì mã `SAVE10` của EShop cố ý tính % sai, gây nhiễu

Note: EShop đã đổi 13 chỗ gọi cứng `localhost:3000` sang `VITE_API_URL`, seed 6 tài khoản `p1..p6` và deploy public (Vercel + Render), nhúng sẵn UXtweak Snippet và Microsoft Clarity.

---

## 3 demo UXtweak + Microsoft Clarity

| Demo | Nội dung | Clip |
| --- | --- | --- |
| 1 — Cài đặt | Tạo study UXtweak + project Clarity, gắn 2 snippet vào `index.html` trên Vercel, xác thực kết nối | UXtweak-1: (đang quay) |
| 2 — Chức năng cơ bản | Tạo Task + Success URL (`/checkout`) + câu hỏi SEQ, chạy thử 1 lượt và xem Session Replay | UXtweak-2: (đang quay) |
| 3 — Luồng phức tạp | Đủ luồng (Welcome + Task + SEQ + SUS 10 câu `Radio button grid`), gửi link ~5 người, đọc báo cáo UXtweak & Heatmap / Rage Click trên Clarity | UXtweak-3: (đang quay) |

<p class="small">Ánh xạ bộ ba: ghi lại phiên thao tác (Session Replay &amp; Heatmap) ≈ Record &amp; Playback · nhiều người cùng một study (<code>p1</code>…<code>p5</code>) ≈ Data-driven · Success URL, Optimal Path ≈ Checkpoint.</p>

<p class="clip">▶ Clip UXtweak + Clarity 1–3: (đang quay)</p>

Note: Phúc thay "(đang quay)" bằng link YouTube từng clip.

---

## Kết quả study

| Chỉ số | Kết quả |
| --- | --- |
| Task success (direct / indirect / bỏ cuộc) — UXtweak | _(sau khi chạy)_ |
| Độ lạc đường (Lostness) & Rage Click tại nút Thêm vào giỏ — UXtweak + Clarity | _(sau khi chạy)_ |
| Thời gian hoàn thành trung bình — UXtweak | _(sau khi chạy)_ |
| SEQ trung bình (1–7, mốc ~5,5) — UXtweak | _(sau khi chạy)_ |
| SUS trung bình (0–100, mốc 68) — UXtweak | _(sau khi chạy)_ |

<p class="small">Kèm ảnh Click Heatmap / Rage Click (Clarity) và Session Replay (UXtweak) tại trang có nhiều click lặp nhất (<code>evidence/maze/</code>).</p>

Note: Nối kết quả với ground truth: người tham gia kẹt ở nút "Thêm vào giỏ" (`G10` kết hợp `G08` không có badge giỏ hàng) thể hiện qua Lostness tăng trên UXtweak, cảnh báo Rage Click và vùng đỏ rực trên Clarity Heatmap; khựng lại ở ô "Tổng tiền thanh toán" sửa được (`G06`) tại `/checkout`.

---

## Điểm yếu của bộ công cụ (và lý do đổi từ Maze)

| Điểm yếu / Giới hạn | Ảnh hưởng & Cách nhóm xử lý |
| --- | --- |
| **Maze** khóa Live Website Testing ở bản Free/Trial (~$99/tháng) | Chuyển sang phương án dự phòng **UXtweak** đã đăng ký trong Proposal |
| Gói Free của **UXtweak** giới hạn 1 active study, 1 task/study, lưu 14 ngày | Gom 10 câu SUS vào 1 bảng `Radio button grid`; nhúng kèm **Microsoft Clarity** miễn phí để lấy Heatmap & Rage Click |
| **Clarity** có độ trễ tổng hợp Heatmap (~20–30 phút) & dễ bị AdBlocker chặn | Nhắc người tham gia tắt AdBlock trên domain EShop trong 5 phút làm bài |
| Cần URL public để chạy từ xa | Đổi 13 chỗ `localhost:3000` sang `VITE_API_URL`, deploy EShop lên Vercel + Render |
| Unmoderated (không hỏi lại được) & cỡ mẫu nhỏ (5–6 người) | Biết người dùng kẹt ở đâu nhưng khó biết vì sao; điểm SUS chỉ để tham khảo |

<p class="key">UXtweak + Clarity cho thấy người dùng kẹt ở đâu; muốn biết vì sao vẫn cần heuristic evaluation → phần AI.</p>

Note: Chuyển ý sang Quân, phần 08: "heuristic evaluation cần chuyên gia, vậy AI có làm thay được không?".
