# Ground truth — danh sách lỗi đã xác nhận

File `bugs.md` là **đáp án chung** của nhóm, dùng để:
- chấm test Playwright (A) — test có bắt được lỗi không,
- chấm AI Heuristic Reviewer (C) — precision / recall,
- làm đáp án cho bài tập Heuristic Showdown và checklist.

Quy tắc: một lỗi chỉ được thêm khi đã **chạy EShop xác nhận + có ảnh trong `evidence/`**. Lỗi mới do AI phát hiện chỉ được thêm khi **≥ 2 thành viên** cùng xác nhận (cột "Nguồn" ghi `AI-confirmed`).
