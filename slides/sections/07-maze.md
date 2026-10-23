<!-- Phụ trách: Phúc. Khung slide 30 phút do Quân soạn (có dùng Claude) theo thiết kế study UXtweak; Phúc kiểm lại thuật ngữ UXtweak, điền kết quả, ảnh và link clip. Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">07</p>

## UXtweak: Usability Testing

- UXtweak là gì, thuật ngữ chính
- Study của nhóm trên EShop
- 3 demo và kết quả
- Điểm yếu

Note: Thời gian: 4 phút (Phúc). Lưu ý: Proposal ban đầu chọn Maze và đặt UXtweak làm dự phòng; khi triển khai thực tế, Maze loại khối Live Website Testing khỏi bản Free/Trial (yêu cầu gói trả phí ~$99/tháng) nên nhóm kích hoạt phương án dự phòng UXtweak.

---

## UXtweak là gì?

- Nền tảng **usability testing từ xa, không điều phối** (unmoderated, remote): người tham gia tự làm qua link
- **Study:** một bài khảo sát, gồm lời chào, **Task** (nhiệm vụ) và **Questionnaire** (bảng hỏi)
- **Website Testing:** người tham gia thực hiện nhiệm vụ trực tiếp trên website thật (qua **UXtweak Snippet**)
- **Success URL & Optimal Path:** đối chiếu trang đích (`/checkout`) và số trang tối ưu → chia kết quả **Direct success · Indirect success · Fail / Skip** và tính độ lạc đường (**Lostness**)
- Tự động quay lại màn hình (**Session Replay**), vẽ **Click Heatmap** (qua Session Recording) và thu câu hỏi **SEQ**, **SUS**

Note: Nhấn mạnh UXtweak dùng chung một đoạn UXtweak Snippet trong thẻ `<head>` cho cả Website Testing và Session Recording (Heatmap).

---

## Study của nhóm: mua hàng có mã giảm giá

<p class="flow">Welcome → Task 1 (Mua phụ kiện + VIP100) → SEQ (1–7) → SUS (10 câu)</p>

> "Bạn có ngân sách tối đa 5.000.000 ₫ và muốn mua một món phụ kiện cho máy tính. Hãy tìm sản phẩm phù hợp, thêm vào giỏ và hoàn tất đặt hàng có dùng mã giảm giá VIP100."

- 5–6 người ngoài nhóm, mỗi người một tài khoản `p1`…`p6@eshop.com`
- Đường đi tối ưu (4 trang): Trang chủ → Keychron Q1 → Giỏ hàng → Thanh toán (`/checkout`)
- Kịch bản **không lộ tên nút**; chọn VIP100 vì mã % của EShop cố ý tính sai, gây nhiễu

Note: EShop deploy public (Vercel + Render) chỉ trong khung giờ test vì cố ý có lỗ hổng bảo mật.

---

## 3 demo UXtweak

| Demo | Nội dung | Clip |
| --- | --- | --- |
| 1 — Cài đặt | Tạo study, gắn UXtweak Snippet vào `index.html` trên Vercel, xác thực kết nối | UXtweak-1: (đang quay) |
| 2 — Chức năng cơ bản | Tạo Task + Success URL (`/checkout`) + câu hỏi SEQ, chạy thử 1 lượt và xem Session Replay | UXtweak-2: (đang quay) |
| 3 — Luồng phức tạp | Đủ luồng (Welcome + Task + SEQ + SUS 10 câu), gửi link cho 5–6 người, đọc báo cáo & Heatmap | UXtweak-3: (đang quay) |

<p class="small">Ánh xạ bộ ba: ghi lại phiên thao tác (Session Replay) ≈ Record & Playback · nhiều người cùng một study ≈ Data-driven · Success URL, Optimal Path ≈ Checkpoint.</p>

<p class="clip">▶ Clip UXtweak 1–3: (đang quay)</p>

Note: Phúc thay "(đang quay)" bằng link YouTube từng clip.

---

## Kết quả study

| Chỉ số | Kết quả |
| --- | --- |
| Task success (direct / indirect / bỏ cuộc) | _(sau khi chạy)_ |
| Độ lạc đường (Lostness) & số click tại nút Thêm vào giỏ | _(sau khi chạy)_ |
| Thời gian trung bình | _(sau khi chạy)_ |
| SEQ trung bình (1–7) | _(sau khi chạy)_ |
| SUS (0–100, mốc 68) | _(sau khi chạy)_ |

<p class="small">Kèm 1 heatmap / session replay trang có nhiều click lặp nhất (ảnh trong <code>evidence/maze/</code>).</p>

Note: Nối kết quả với ground truth: ví dụ người tham gia kẹt ở "Thêm vào giỏ" (G10) thì UXtweak thấy được qua Session Replay, Lostness và Heatmap.

---

## Điểm yếu của UXtweak (và lý do đổi từ Maze)

| Điểm yếu | Ảnh hưởng tới nhóm |
| --- | --- |
| **Maze** khóa Live Website Testing ở bản Free/Trial (~$99/tháng) | Nhóm phải chuyển sang phương án dự phòng **UXtweak** đã ghi trong Proposal |
| Gói Free của **UXtweak** giới hạn 1 active study, 1 task/study, giữ kết quả 14 ngày | Phải thiết kế kỹ trước; chạy Website Testing và Session Recording (Heatmap) nối tiếp nhau |
| Cần URL public | Phải deploy EShop (Vercel + Render), mở trong khung giờ test |
| Unmoderated: không hỏi lại được | Biết người dùng kẹt ở đâu, khó biết vì sao |
| Ít người tham gia (5–6 người) | Điểm SUS chỉ để tham khảo, chưa đủ cỡ mẫu thống kê |

<p class="key">UXtweak cho thấy người dùng kẹt ở đâu; muốn biết vì sao vẫn cần heuristic evaluation → phần AI.</p>

Note: Chuyển ý sang Quân, phần 08: "heuristic evaluation cần chuyên gia, vậy AI có làm thay được không?".
