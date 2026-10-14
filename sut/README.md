# SUT — EShop

`sut/eshop/` là bản sao EShop của môn học (upstream: `ttbhanh/eshop-sut`), chép vào đây để cả nhóm dùng cùng một phiên bản.

**Quy tắc:**
- EShop **cố ý có lỗi GUI/usability** — đó là đối tượng kiểm thử. Không sửa các lỗi này.
- Thay đổi được phép (để chạy/deploy/test), mỗi thay đổi ghi vào bảng dưới:
  - đổi URL API cứng `http://localhost:3000` sang biến môi trường `VITE_API_URL` (B — để deploy),
  - thêm tài khoản người tham gia `p1…p6@eshop.com` vào seed của `backend/database.js` (B — cho Maze).

| Ngày | Người | File | Thay đổi | Lý do |
| --- | --- | --- | --- | --- |
| | | | | |
