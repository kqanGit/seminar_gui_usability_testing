# SUT — EShop

`sut/eshop/` là bản sao EShop của môn học (upstream: `ttbhanh/eshop-sut`), chép vào đây để cả nhóm dùng cùng một phiên bản.

**Quy tắc:**
- EShop **cố ý có lỗi GUI/usability** — đó là đối tượng kiểm thử. Không sửa các lỗi này.
- Thay đổi được phép (để chạy/deploy/test), mỗi thay đổi ghi vào bảng dưới:
  - đổi URL API cứng `http://localhost:3000` sang biến môi trường `VITE_API_URL` (B — để deploy),
  - thêm tài khoản người tham gia `p1…p6@eshop.com` vào seed của `backend/database.js` (B — cho Maze).

| Ngày | Người | File | Thay đổi | Lý do |
| --- | --- | --- | --- | --- |
| 2026-10-14 | Phúc (B) | `sut/eshop/frontend-web/src/{context/AuthContext,pages/Checkout,pages/ForgotPassword,pages/Home,pages/ProductDetail,pages/Profile,pages/Register}.jsx`, `.env.example` | Đổi 13 chỗ gọi cứng `http://localhost:3000` sang `import.meta.env.VITE_API_URL \|\| 'http://localhost:3000'` | Hỗ trợ cấu hình URL backend public khi deploy phục vụ study Maze |
| 2026-10-15 | Phúc (B) | `sut/eshop/backend/database.js` | Thêm 6 tài khoản `p1@eshop.com` … `p6@eshop.com` (mật khẩu `Test1234!`) vào phần seed | Cấp tài khoản riêng cho từng người tham gia (participant) làm nhiệm vụ trên Maze |
| 2026-10-17 | Phúc (B) | `sut/eshop/frontend-web/index.html`, `.env.example` | Gắn Maze Universal Snippet (`%VITE_MAZE_API_KEY%`) | Cho phép Maze Live Website Testing thu thập click/heatmap/path qua URL public trên Vercel |

