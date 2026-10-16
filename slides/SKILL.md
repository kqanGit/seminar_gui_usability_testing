---
name: seminar-slides
description: Viết hoặc sửa slide HTML (reveal.js) cho seminar T1 GUI & Usability Testing của Nhóm 09 trong repo gui-usability-testing. Dùng khi cần thêm nội dung vào slides/sections/*.md, làm slide mở đầu phần, bảng, thang mức độ, link clip demo, hoặc kiểm tra slide có đạt yêu cầu môn học.
---

# Slide seminar T1 (reveal.js + Markdown)

Slide là một trang HTML (`slides/index.html`) tự nạp các phần từ `slides/sections/*.md` theo thứ tự trong `slides/sections.json`. Giao diện chung nằm trong `slides/theme.css`. Mỗi người chỉ sửa file `.md` của phần mình.

## Yêu cầu bắt buộc của môn (không được phá)

- **Nền trắng, chữ đen, chữ to rõ** (phòng chiếu ánh sáng mạnh). Không đổi màu nền, màu chữ, cỡ chữ trong từng phần; không dùng ảnh nền tối.
- Slide là nguồn tài liệu GV đọc đầu tiên: **trình bày đầy đủ**, không làm 5–10 trang sơ sài. Mỗi công cụ cần: lý thuyết và thuật ngữ, chức năng chính, nguyên lý hoạt động, **3 demo** (cài đặt / cơ bản / luồng phức tạp), chỉ rõ **Record & Playback, Data-driven, Checkpoints** nằm ở đâu, và **điểm yếu** của công cụ.
- Mỗi clip demo phải có **link YouTube ghi rõ trong slide** (dùng khối `clip`).
- Phải thể hiện **công sức và các bước làm**, không chỉ kết quả: có ảnh minh chứng từ `evidence/`, số liệu thật của nhóm.
- **Chính chủ:** nội dung do nhóm tự trải nghiệm. Nếu dùng AI soạn, ghi một dòng vào `AI_DISCLOSURE.md` và người phụ trách phần đó phải review.
- Thuật ngữ theo bảng mục 6 của `docs/proposal/Proposal.md`; severity chỉ dùng thang Nielsen 0–4.

## Cấu trúc một file phần

```markdown
<!-- Phụ trách: <tên>. Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">06</p>

## Playwright + axe-core

- 3–5 ý chính của phần (hiện như mục lục của phần)

Note: ghi chú người nói

---

## Tiêu đề slide nội dung

- ý 1
- ý 2

Note: ghi chú người nói
```

- Slide đầu mỗi phần **luôn** là slide `divider`: số phần 2 chữ số trong `<p class="part">` (trùng thứ tự trong `sections.json`) + `## Tên phần`. Header chạy "Phần NN · Tên phần" ở các slide sau được gắn tự động từ slide này.
- Dòng `---` đứng riêng, có dòng trống trước và sau = sang slide mới.
- Mỗi slide nội dung có đúng một `##` tiêu đề. Không dùng `#` (chỉ slide tiêu đề có `h1`).
- Ghi chú người nói đặt sau `Note:` ở cuối slide; phím `S` để xem khi trình chiếu.

## Khối dựng sẵn trong theme.css

| Cần | Viết |
| --- | --- |
| Câu chốt (nền vàng dạ quang) | `<p class="key">…</p>` — tối đa 1 câu mỗi slide |
| Ghi chú nhỏ, nguồn tham khảo | `<p class="small">…</p>` |
| Luồng thao tác | `<p class="flow">Trang chủ → Giỏ hàng → Thanh toán</p>` |
| Link clip demo | `<p class="clip">▶ Clip Demo 2 — Record & Playback: <a href="https://youtu.be/...">youtu.be/...</a></p>` |
| Thang 5 mức (severity, mức độ) | `<div class="scale"><div><b>0</b>mô tả</div> … 5 ô … </div>` |
| Hai cột | `<div class="cols"><div>…HTML…</div><div>…HTML…</div></div>` (bên trong dùng HTML, không dùng Markdown) |
| Ảnh minh chứng | `![mô tả ngắn](../evidence/gui-bugs/20261016-cart-xoa-khong-xac-nhan.png)` |
| Code | khối ```` ```js ```` — tối đa ~8 dòng, chỉ phần quan trọng |

Bảng Markdown tự có hàng tiêu đề đen, hàng xen kẽ, cột đầu in đậm.

## Giới hạn để chữ vẫn to (khung 1280 × 720)

- Gạch đầu dòng: **tối đa 6 dòng hiển thị**, mỗi ý ≤ 2 dòng. Nhiều hơn thì tách slide.
- Bảng: **tối đa 6 hàng dữ liệu, 3–4 cột**. Bảng dài thì chia "(1/2)", "(2/2)".
- Ảnh: một ảnh chính mỗi slide, crop vùng cần xem (ảnh < 1 MB).
- Không thu nhỏ chữ bằng `style="font-size…"` để nhồi thêm nội dung.
- Không dùng emoji trang trí, không thêm màu mới; màu nhấn duy nhất là xanh `--focus` đã có trong theme.

## Kiểm tra trước khi commit

1. Chạy `npx serve -l 8080` ở thư mục gốc repo, mở `http://localhost:8080/slides/`, lướt hết phần của mình (phím `Esc` xem lưới).
2. Không slide nào bị tràn chữ xuống dưới footer; tiếng Việt hiện đủ dấu.
3. Mọi lỗi/số liệu trên EShop phải khớp `ground-truth/bugs.md` hoặc có ảnh trong `evidence/`.
4. Có link clip cho từng demo (hoặc ghi rõ "clip: đang quay").
5. Ghi `AI_DISCLOSURE.md` nếu có dùng AI; commit bằng tài khoản git của chính mình, ví dụ `slides: phần 06 Playwright — demo 2`.

Xuất PDF: `http://localhost:8080/slides/?print-pdf` → Chrome In (Ctrl+P) → Lưu PDF, khổ ngang, lề Không, bật Đồ họa nền.
