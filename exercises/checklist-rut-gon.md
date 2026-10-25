# Checklist GUI rút gọn (12 câu) — tự chấm EShop

> Người soạn: **Quang (A)** · Rút từ `checklist/checklist-50.md` + FR-21…24 · Dùng trên lớp / về nhà (~15 phút)

---

## 1. Mục tiêu

Chấm nhanh vài thuộc tính GUI trên EShop; ghi **Pass / Fail / N/A** và phân loại **Tự động** (Playwright làm được) vs **Thủ công**.

---

## 2. Chuẩn bị

- EShop local (`:5173`) hoặc URL deploy nhóm.
- Tài khoản: `test@eshop.com` / `Test1234!`
- (Tuỳ chọn) DevTools → Elements để đếm `h1`, xem `type` của input.

---

## 3. Đề bài

Điền bảng (trang gợi ý có thể đổi nếu bạn chứng minh được):

| # | Câu hỏi (rút gọn) | Trang gợi ý | P/F/N/A | Tự động / Thủ công | Ghi chú ngắn |
| --- | --- | --- | --- | --- | --- |
| 1 | Đúng 1 thẻ `<h1>`? | Cart | | Tự động | |
| 2 | Đúng 1 thẻ `<h1>`? | Checkout | | Tự động | |
| 3 | Nhãn tổng giỏ là **"Tổng cộng"**? | Cart | | Tự động | |
| 4 | Nút thanh toán màu **xanh dương** (không xanh lá)? | Cart | | Tự động / bán | |
| 5 | Có nút `+` / `-` đổi số lượng? | Cart | | Tự động | |
| 6 | Xóa item có **dialog xác nhận**? | Cart | | Tự động | |
| 7 | Ô tổng tiền Checkout **readonly/disabled**? | Checkout | | Tự động | |
| 8 | Ô mật khẩu `type="password"`? | Login | | Tự động | |
| 9 | Trường bắt buộc có dấu `*`? | Login | | Tự động | |
| 10 | Ảnh sản phẩm có `alt` không rỗng? | Home / Product | | Tự động | |
| 11 | Link Giỏ hàng có **badge** số lượng? | Header | | Tự động | |
| 12 | Ngôn ngữ nhãn nhất quán tiếng Việt? | Login | | Thủ công | |

**Yêu cầu nộp:** bảng đã điền + **3 ảnh** minh họa cho các câu Fail (khoanh đỏ nếu được).

---

## 4. Gợi ý

- Cart trống ≠ Cart có hàng: thêm SP trước khi chấm câu 1, 3–6.
- Câu 12: để ý "Username", "Sign In", tiêu đề "Đăng Ký"…
- Muốn tự động hóa: xem Demo 2–3 trong `tests/playwright/`.

---

## 5. Cách chấm

| Tiêu chí | Điểm |
| --- | --- |
| Điền đủ 12 câu (P/F/N/A + loại) | 4 |
| Ít nhất 5 câu Fail đúng với EShop thật | 3 |
| 3 ảnh minh chứng khớp câu Fail | 2 |
| Phân loại Tự động / Thủ công hợp lý | 1 |

Đáp án tham chiếu: cột kết quả trong `checklist/checklist-50.md` (câu tương ứng) — nhóm/GVTH giữ; không bắt buộc file `answers/` riêng.
