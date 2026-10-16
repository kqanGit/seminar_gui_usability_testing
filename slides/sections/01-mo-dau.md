<!-- Phụ trách: Quân. Mỗi slide ngăn cách bằng một dòng chỉ có ---  -->

<!-- .slide: class="divider" -->

<p class="part">01</p>

## Mở đầu

- Vì sao cần kiểm thử giao diện và tính khả dụng?
- SUT: luồng Checkout của EShop
- Lỗi giao diện thật nhóm tìm thấy
- Lộ trình buổi seminar

Note: Phần mở đầu khoảng 3 phút. Mục tiêu: cho lớp thấy phần mềm chạy đúng vẫn có thể thất bại, rồi giới thiệu SUT dùng xuyên suốt buổi.

---

## Chạy đúng ≠ dùng được

- Người dùng **vẫn đặt được hàng** trên EShop, nhưng:
  - Bấm "Xóa" là mất sản phẩm ngay, không hỏi lại
  - Ô "Tổng tiền thanh toán" **sửa được** bằng tay
  - Bấm "Thêm vào giỏ" lần đầu không thấy phản hồi gì
- Kiểm thử chức năng **pass**, nhưng người dùng bối rối, thao tác nhầm, bỏ đi

<p class="key">Một hệ thống đúng về kỹ thuật vẫn thất bại nếu người dùng không dùng được nó.</p>

Note: Cả 3 ví dụ đều là lỗi có thật trong mã nguồn EShop, xem slide sau. Nhấn mạnh: không có test chức năng nào fail ở đây.

---

## Hai câu hỏi của đề tài T1

| | GUI Testing | Usability Testing |
| --- | --- | --- |
| Câu hỏi | Giao diện có **đúng đặc tả** không? | Người dùng có **dùng được** không? |
| Đối chiếu với | Đặc tả GUI (FR-21 → FR-24), checklist | Mục tiêu và cảm nhận của người dùng |
| Ai đánh giá | Tester, script tự động | Người dùng thật, chuyên gia UX |
| Ví dụ lỗi | Nút "Thanh toán" màu xanh lá thay vì xanh dương | Không ai tìm thấy ô nhập mã giảm giá |
| Công cụ nhóm demo | Playwright + axe-core | Maze |

<p class="small">Phần AI (AI Heuristic Reviewer) hỗ trợ cả hai câu hỏi và được so sánh với kết quả của con người.</p>

Note: Hai nửa của đề tài bổ sung cho nhau: giao diện đúng đặc tả chưa chắc đã dễ dùng, và ngược lại.

---

## SUT: EShop — luồng Checkout

- Website bán hàng mẫu của môn học: React + Vite, backend Node.js + SQLite

<p class="flow">Trang chủ → Chi tiết sản phẩm → Giỏ hàng → Thanh toán (mã giảm giá)</p>

| Đặc tả GUI có sẵn | Ví dụ yêu cầu |
| --- | --- |
| **FR-21** Chung | Đúng 1 `<h1>`, giá dạng `₫`, nút tích cực xanh dương |
| **FR-22** Form | Trường bắt buộc có `*`, lỗi hiện trên nút submit |
| **FR-23** Điều hướng | Highlight trang hiện tại, badge giỏ hàng |
| **FR-24** Phản hồi | Toast khi thêm vào giỏ, dialog khi xóa |

Note: FR-21 đến FR-24 nằm ở mục 8 của README EShop. Đây là "tiêu chí đúng/sai" cho GUI testing; usability thì không có đặc tả, phải đo trên người dùng.

---

## Lỗi giao diện thật trong EShop

| Trang | Hiện tại | Đặc tả yêu cầu |
| --- | --- | --- |
| Giỏ hàng | Nhãn "Tổng tạm tính" | "Tổng cộng" (FR-07) |
| Giỏ hàng | Bấm "Xóa" xóa ngay | Có dialog xác nhận (FR-24) |
| Giỏ hàng | Nút "Tiến hành thanh toán" màu xanh lá | Nút tích cực màu xanh dương (FR-21) |
| Giỏ hàng, Thanh toán | Tiêu đề là `<h2>`, không có `<h1>` | Đúng 1 `<h1>` mỗi trang (FR-21) |
| Thanh toán | Ô "Tổng tiền thanh toán" sửa được | Không cho sửa (FR-08) |
| Header | Nút "Thoát", không có badge giỏ hàng | "Đăng xuất", có badge (FR-23) |

<p class="small">Đối chiếu từ mã nguồn (<code>Cart.jsx</code>, <code>Checkout.jsx</code>, <code>App.jsx</code>). Danh sách này là <b>ground truth</b> (đáp án) để chấm Playwright, AI và bài tập.</p>

Note: Mỗi lỗi sẽ có ảnh chụp minh chứng trong evidence/gui-bugs. Các phần sau đều quay lại bảng này.

---

## Lộ trình seminar

| Lý thuyết | Công cụ, AI và thực hành |
| --- | --- |
| 1. Mở đầu | 5. Khảo sát & so sánh công cụ |
| 2. Lý thuyết GUI Testing | 6. Playwright + axe-core (3 demo) |
| 3. Checklist 50 câu trên EShop | 7. Maze (3 demo) |
| 4. Lý thuyết Usability Testing | 8. AI Heuristic Reviewer: người vs AI |
| | 9. Bài tập: Heuristic Showdown |
| | 10. Tổng kết |

Note: Đi từ lý thuyết → công cụ → AI → cho lớp thực hành.

---

## Phạm vi

| Trong phạm vi | Ngoài phạm vi |
| --- | --- |
| Bố cục, control, trạng thái giao diện | Kiểm thử chức năng E2E (thuộc đề T2) |
| Visual regression, accessibility (WCAG) | Performance, security, API |
| Heuristic evaluation, test theo nhiệm vụ, SUS/SEQ | Ứng dụng mobile (Expo) |
| Compatibility mức nhẹ: 3 viewport, 2–3 trình duyệt | Device farm trả phí |

Note: Ranh giới với T2: nhóm chỉ thao tác để đưa trang về đúng trạng thái cần soi; điểm kiểm tra luôn là thuộc tính giao diện, không phải kết quả nghiệp vụ.
