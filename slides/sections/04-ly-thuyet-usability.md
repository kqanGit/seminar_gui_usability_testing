<!-- Phụ trách: Phúc. Bản nháp do Quân soạn (có dùng Claude), Phúc review và chỉnh trước khi trình bày. Bản 30 phút: slide chi tiết ở 11-phu-luc. Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">04</p>

## Lý thuyết Usability Testing

- Usability là gì (ISO 9241-11)
- 10 heuristic của Nielsen, thang severity 0–4
- Heuristic evaluation và usability testing
- Chỉ số đo: success rate, SEQ, SUS

Note: Thời gian: 2,5 phút (Phúc). Phần này trả lời câu hỏi "người dùng có dùng được không".

---

## Usability là gì?

**ISO 9241-11:2018:** mức độ một hệ thống có thể được **người dùng cụ thể** sử dụng để đạt **mục tiêu cụ thể** với **hiệu quả, hiệu suất và sự hài lòng** trong một **bối cảnh sử dụng** cụ thể.

| Thành phần | Câu hỏi | Đo bằng |
| --- | --- | --- |
| Effectiveness (hiệu quả) | Có làm xong nhiệm vụ không? | Tỷ lệ hoàn thành, số lỗi |
| Efficiency (hiệu suất) | Tốn bao nhiêu công sức? | Thời gian, số click |
| Satisfaction (hài lòng) | Cảm thấy thế nào? | SUS, SEQ |

Note: Ba thành phần này là gốc của mọi chỉ số ở cuối phần.

---

## 10 heuristic của Nielsen

<div class="cols"><div>
<table>
<tr><th>#</th><th>Heuristic</th></tr>
<tr><td><b>H1</b></td><td><b>Visibility of system status</b></td></tr>
<tr><td>H2</td><td>Match with the real world</td></tr>
<tr><td><b>H3</b></td><td><b>User control and freedom</b></td></tr>
<tr><td><b>H4</b></td><td><b>Consistency and standards</b></td></tr>
<tr><td><b>H5</b></td><td><b>Error prevention</b></td></tr>
</table>
</div><div>
<table>
<tr><th>#</th><th>Heuristic</th></tr>
<tr><td>H6</td><td>Recognition rather than recall</td></tr>
<tr><td>H7</td><td>Flexibility and efficiency</td></tr>
<tr><td>H8</td><td>Aesthetic and minimalist design</td></tr>
<tr><td>H9</td><td>Recover from errors</td></tr>
<tr><td>H10</td><td>Help and documentation</td></tr>
</table>
</div></div>

<p class="small">In đậm: heuristic EShop vi phạm rõ — H1 thêm giỏ không phản hồi · H3 xóa không hoàn tác · H4 "Thoát"/"Đăng xuất" · H5 tổng tiền sửa được.</p>

Note: Nielsen 1994, NN/g vẫn dùng. Không đọc hết 10 dòng, chỉ chỉ vào 4 dòng in đậm kèm ví dụ EShop. Bảng có ví dụ từng heuristic và các bộ nguyên lý khác (Shneiderman, Norman): Phụ lục.

---

## Thang severity 0–4 (Nielsen)

<div class="scale">
<div><b>0</b>Không phải lỗi usability</div>
<div><b>1</b>Lỗi thẩm mỹ, sửa khi có thời gian</div>
<div><b>2</b>Lỗi nhỏ, ưu tiên thấp</div>
<div><b>3</b>Lỗi lớn, ưu tiên cao</div>
<div><b>4</b>Thảm họa, phải sửa trước khi phát hành</div>
</div>

- Căn cứ chấm: **tần suất** gặp · **tác động** (có vượt qua được không) · **tính lặp lại** (gặp mãi hay chỉ lần đầu)
- Ví dụ: "Xóa không hỏi lại" (H3) → mất dữ liệu, ai cũng gặp → **3**

Note: Cả nhóm và AI đều chỉ dùng thang này, để so sánh được với nhau.

---

## Hai cách đánh giá usability

| | Heuristic evaluation | Usability testing |
| --- | --- | --- |
| Ai làm | Chuyên gia, 3–5 người đánh giá độc lập | Người dùng đại diện |
| Dựa vào | Bộ nguyên lý (10 heuristic) | Hành vi thật khi làm nhiệm vụ |
| Chi phí | Thấp, nhanh | Cao hơn: tuyển người, tổ chức |
| Tìm được | Vi phạm nguyên lý, kể cả lỗi hiếm | Chỗ người dùng thật sự bị kẹt |
| Điểm yếu | Có thể báo lỗi mà người dùng không gặp | Ít người tham gia, khó bao phủ hết |

<p class="small">Nên kết hợp: heuristic evaluation trước để dọn lỗi rõ ràng, usability testing sau.</p>

Note: Phần 8 dùng AI làm "người đánh giá heuristic" và so với người đánh giá thật.

---

## Đo usability bằng gì?

| Chỉ số | Cách tính | Thuộc |
| --- | --- | --- |
| Task success rate | % người hoàn thành nhiệm vụ | Hiệu quả |
| Misclick rate | Số click sai / tổng click | Hiệu quả |
| Time on task | Thời gian làm xong hoặc bỏ cuộc | Hiệu suất |
| **SEQ** | 1 câu sau mỗi nhiệm vụ, thang 1–7 | Hài lòng |
| **SUS** | 10 câu, quy ra điểm 0–100; trung bình khoảng 68 | Hài lòng |

<p class="small">Khoảng 5 người mỗi vòng đã tìm được phần lớn vấn đề (Nielsen &amp; Landauer). Cách tính SUS, viết task scenario, test plan 9 phần: Phụ lục.</p>

Note: Ba nhóm chỉ số ứng với ba thành phần ISO 9241-11. Maze ở phần 07 đo đúng các chỉ số này.
