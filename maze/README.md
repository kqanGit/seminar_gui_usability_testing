# Usability Testing (UXtweak + Microsoft Clarity) — phụ trách: Phúc (B)

> **Lưu ý chuyển đổi công cụ:** Trong Proposal ban đầu, nhóm chọn **Maze** và đặt **UXtweak** làm phương án dự phòng. Khi triển khai thực tế, Maze đã khóa khối **Live Website Testing** ở gói Free/Trial (yêu cầu gói trả phí ~\$99/tháng), nên nhóm kích hoạt phương án dự phòng **UXtweak** (thu thập Task, SEQ, SUS, Session Replay) kết hợp **Microsoft Clarity** (thu thập Click Heatmap & Rage Click).

Thứ tự việc:
1. Sửa URL API cứng trong `sut/eshop/frontend-web` → `VITE_API_URL`; deploy frontend (Vercel) + backend (Render) ra URL public (ghi vào `sut/README.md`).
2. Thêm tài khoản `p1…p6@eshop.com` vào seed `backend/database.js`.
3. Gắn **UXtweak Snippet** và **Microsoft Clarity Script** vào `sut/eshop/frontend-web/index.html`.
4. Hoàn thiện `study-design.md` → chạy Pilot 1 lượt kiểm tra kết nối.
5. Chạy study với ~5 người ngoài nhóm; đánh thức server Render trước mỗi đợt.
6. Export kết quả vào `results/`, ảnh dashboard/heatmap vào `evidence/maze/`.

| Demo | Nội dung | Thành phần |
| --- | --- | --- |
| 1. Cài đặt | Tạo study trên UXtweak & project trên Clarity, gắn snippet vào `index.html` trên Vercel, xác thực kết nối | — |
| 2. Cơ bản | Tạo 1 Task + Success URL (`/checkout`) + câu hỏi SEQ, tự làm thử 1 lượt, xem Session Replay & kết quả | Record & Playback, Checkpoint |
| 3. Phức tạp | Study Checkout đầy đủ (~5 người) + SUS 10 câu (`Radio button grid`); đọc Lostness, SUS/SEQ trên UXtweak & Click Heatmap / Rage Click trên Clarity | Data-driven, Checkpoint |
