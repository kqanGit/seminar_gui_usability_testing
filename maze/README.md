# Maze — phụ trách: Phúc (B)

**Gói Free chỉ có 1 study/tháng** → thiết kế xong trong `study-design.md`, cả nhóm duyệt (PR có review của Quang + Quân) rồi mới tạo study thật.

Thứ tự việc:
1. Sửa URL API cứng trong `sut/eshop/frontend-web` → `VITE_API_URL`; deploy frontend + backend ra URL public (ghi vào `sut/README.md`).
2. Thêm tài khoản `p1…p6@eshop.com` vào seed `backend/database.js`.
3. Hoàn thiện `study-design.md` → review → pilot 1 lượt với thành viên nhóm (không tính kết quả).
4. Chạy study với ~5 người ngoài nhóm; reset DB (`node database.js`) trước mỗi đợt.
5. Export kết quả vào `results/`, ảnh dashboard/heatmap vào `evidence/maze/`.

| Demo | Nội dung | Thành phần |
| --- | --- | --- |
| 1. Cài đặt | Tạo project, gắn snippet vào bản deploy | — |
| 2. Cơ bản | 1 mission + SEQ, tự làm thử, đọc kết quả | Record, Checkpoint |
| 3. Phức tạp | Study Checkout ~5 người + SUS; heatmap, path, Maze AI | Data-driven, Checkpoint |
