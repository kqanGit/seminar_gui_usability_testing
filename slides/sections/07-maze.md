<!-- Phụ trách: Phúc. Khung slide do Quân soạn (có dùng Claude) theo maze/study-design.md; Phúc kiểm lại thuật ngữ Maze, điền kết quả, ảnh và link clip. Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">07</p>

## Maze

- Maze là gì, thuật ngữ chính
- Study của nhóm trên EShop
- 3 demo và kết quả
- Điểm yếu

Note: Thời gian: 4 phút (Phúc).

---

## Maze là gì?

- Nền tảng **usability testing từ xa, không điều phối** (unmoderated, remote): người tham gia tự làm qua link
- **Study:** một bài test, gồm nhiều **block** nối tiếp nhau
- **Mission:** nhiệm vụ cho người tham gia làm trên website thật
- **Expected path:** đường đi kỳ vọng → Maze chia kết quả **Direct success · Indirect success · Bounce/Give up**
- Tự đo success rate, misclick, thời gian, heatmap; có block câu hỏi cho **SEQ**, **SUS**

Note: Phúc đối chiếu lại tên gọi với giao diện Maze hiện tại trước khi quay clip.

---

## Study của nhóm: mua hàng có mã giảm giá

<p class="flow">Welcome → Mission 1 → SEQ (1–7) → SUS (10 câu)</p>

> "Bạn có ngân sách tối đa 5.000.000 ₫ và muốn mua một món phụ kiện cho máy tính. Hãy tìm sản phẩm phù hợp, thêm vào giỏ và hoàn tất đặt hàng có dùng mã giảm giá VIP100."

- 5–6 người ngoài nhóm, mỗi người một tài khoản `p1`…`p6@eshop.com`
- Expected path: Trang chủ → Keychron Q1 → Giỏ hàng → Thanh toán
- Kịch bản **không lộ tên nút**; chọn VIP100 vì mã % của EShop cố ý tính sai, gây nhiễu

Note: EShop deploy public (Vercel + Render) chỉ trong khung giờ test vì cố ý có lỗ hổng bảo mật.

---

## 3 demo Maze

| Demo | Nội dung | Clip |
| --- | --- | --- |
| 1 — Cài đặt | Tạo study, gắn URL public của EShop, thêm block | Maze-1: (đang quay) |
| 2 — Chức năng cơ bản | Tạo mission + expected path, chạy thử như người tham gia | Maze-2: (đang quay) |
| 3 — Luồng phức tạp | Đủ 4 block, gửi link cho 5–6 người, đọc báo cáo | Maze-3: (đang quay) |

<p class="small">Ánh xạ bộ ba: ghi lại phiên người dùng ≈ Record · nhiều người cùng một study ≈ Data-driven · expected path, success rate ≈ Checkpoint.</p>

<p class="clip">▶ Clip Maze 1–3: (đang quay)</p>

Note: Phúc thay "(đang quay)" bằng link YouTube từng clip. Ánh xạ bộ ba là cách nhóm hiểu; nói rõ đây là ánh xạ, không phải tên tính năng Maze.

---

## Kết quả study

| Chỉ số | Kết quả |
| --- | --- |
| Task success (direct / indirect / bỏ cuộc) | _(sau khi chạy)_ |
| Misclick rate | _(sau khi chạy)_ |
| Thời gian trung bình | _(sau khi chạy)_ |
| SEQ trung bình (1–7) | _(sau khi chạy)_ |
| SUS (0–100, mốc 68) | _(sau khi chạy)_ |

<p class="small">Kèm 1 heatmap trang có nhiều misclick nhất (ảnh trong <code>evidence/maze/</code>).</p>

Note: Nối kết quả với ground truth: ví dụ người tham gia kẹt ở "Thêm vào giỏ" (G10) thì Maze thấy được qua misclick.

---

## Điểm yếu của Maze

| Điểm yếu | Ảnh hưởng tới nhóm |
| --- | --- |
| Gói Free chỉ 1 study/tháng | Phải thiết kế kỹ trước, khó chạy lại |
| Cần URL public | Phải deploy EShop, mở trong khung giờ test |
| Unmoderated: không hỏi lại được | Biết người dùng kẹt ở đâu, khó biết vì sao |
| Ít người tham gia | SUS của 5–6 người chỉ để tham khảo, không thống kê |

<p class="key">Maze cho thấy người dùng kẹt ở đâu; muốn biết vì sao vẫn cần heuristic evaluation → phần AI.</p>

Note: Chuyển ý sang Quân, phần 08: "heuristic evaluation cần chuyên gia, vậy AI có làm thay được không?".
