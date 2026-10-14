# Slide (reveal.js)

- Mỗi phần là một file Markdown trong `sections/`, **tên trùng với file trong `content/`** và do cùng người phụ trách. Mỗi người chỉ sửa file của mình → không đụng nhau khi merge.
- Thứ tự các phần: `sections.json`. Giao diện chung: `theme.css` (nền trắng, chữ đen, chữ to — theo yêu cầu môn). Không tự đổi màu nền/cỡ chữ trong từng phần.

## Viết slide

```markdown
## Tiêu đề slide

- Ý 1
- Ý 2

<p class="clip">▶ Clip Demo 2: <a href="https://youtu.be/...">youtu.be/...</a></p>

Note: ghi chú người nói, không hiện trên slide

---

## Slide tiếp theo
```

Dòng `---` đứng riêng (có dòng trống trước và sau) = sang slide mới. Ảnh: `![mô tả](../evidence/gui-bugs/ten-anh.png)`.

## Xem và xuất PDF

```bash
npx serve -l 8080     # chạy ở thư mục gốc repo (để slide đọc được ảnh trong evidence/)
```

- Xem: http://localhost:8080/slides/ · Phím `S` mở ghi chú người nói.
- PDF: http://localhost:8080/slides/?print-pdf → Chrome In (Ctrl+P) → Lưu dưới dạng PDF, khổ ngang, lề "Không", bật "Đồ họa nền".

Phải mở qua server (không mở file trực tiếp) vì trình duyệt chặn nạp file `.md` từ `file://`.

> Nếu GVTH yêu cầu nộp **PPTX theo template**, phần nội dung ở đây vẫn dùng lại được — chỉ đổi khâu trình bày.
