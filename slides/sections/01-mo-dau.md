<!-- Phụ trách: Quân. Bản trình bày 30 phút: slide chi tiết đã chuyển sang 11-phu-luc. Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">01</p>

## Mở đầu

- Vì sao cần kiểm thử giao diện và tính khả dụng?
- SUT: luồng mua hàng của EShop
- Lộ trình 30 phút

Note: Thời gian: 2 phút cho cả phần 01 (Quân). Mục tiêu: cho lớp thấy phần mềm chạy đúng vẫn có thể thất bại, rồi giới thiệu SUT dùng xuyên suốt buổi.

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

## SUT: EShop — luồng mua hàng

- Website bán hàng mẫu của môn học: React + Vite, backend Node.js + SQLite

<p class="flow">Đăng nhập → Trang chủ → Chi tiết sản phẩm → Giỏ hàng → Thanh toán (mã giảm giá)</p>

| Đặc tả GUI có sẵn | Ví dụ yêu cầu |
| --- | --- |
| **FR-21** Chung | Đúng 1 `<h1>`, giá dạng `₫`, nút tích cực xanh dương |
| **FR-22** Form | Trường bắt buộc có `*`, lỗi hiện trên nút submit |
| **FR-23** Điều hướng | Highlight trang hiện tại, badge giỏ hàng |
| **FR-24** Phản hồi | Toast khi thêm vào giỏ, dialog khi xóa |

<p class="small">Phạm vi: checklist, Playwright, Maze và AI đều chạy trên <b>cùng một luồng</b> này. Phạm vi đầy đủ và 11 lỗi ground truth: Phụ lục.</p>

Note: FR-21 đến FR-24 nằm ở mục 8 của README EShop. Đây là tiêu chí đúng/sai cho GUI testing; usability thì không có đặc tả, phải đo trên người dùng. Không đọc bảng, chỉ nói "giao diện có đặc tả sẵn, nên đúng/sai đo được".

---

## Lộ trình 30 phút

<div class="cols"><div>
<table>
<tr><th>Phần</th><th>Phút</th><th>Người nói</th></tr>
<tr><td>01 Mở đầu</td><td>2</td><td>Quân</td></tr>
<tr><td>02 Lý thuyết GUI</td><td>2</td><td>Quang</td></tr>
<tr><td>03 Checklist 50 câu</td><td>2</td><td>Quang</td></tr>
<tr><td>04 Lý thuyết Usability</td><td>2,5</td><td>Phúc</td></tr>
<tr><td>05 Chọn công cụ</td><td>1,5</td><td>Phúc</td></tr>
</table>
</div><div>
<table>
<tr><th>Phần</th><th>Phút</th><th>Người nói</th></tr>
<tr><td>06 Playwright + axe</td><td>6</td><td>Quang</td></tr>
<tr><td>07 Maze</td><td>4</td><td>Phúc</td></tr>
<tr><td>08 AI Heuristic Reviewer</td><td>6</td><td>Quân</td></tr>
<tr><td>09 Bài tập</td><td>2</td><td>Quân</td></tr>
<tr><td>10 Tổng kết</td><td>2</td><td>Quân</td></tr>
</table>
</div></div>

<p class="small">Lý thuyết chi tiết, bảng so sánh đầy đủ và khảo sát nằm ở Phụ lục cuối slide.</p>

Note: Đi từ lý thuyết → checklist thủ công → công cụ tự động → AI → cho lớp thực hành. Nói nhanh, khoảng 15 giây.
