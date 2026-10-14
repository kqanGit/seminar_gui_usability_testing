# AI Heuristic Reviewer — phụ trách: Quân (C)

Script Node.js: Playwright chụp màn hình các bước trên EShop → gửi ảnh + prompt 10 heuristic Nielsen cho LLM có vision → nhận JSON theo schema → xuất báo cáo Markdown. Đổi `config.json` là chạy được trên website khác (tính tái sử dụng).

```text
ai-reviewer/
├── config.example.json   URL + danh sách trang/bước + viewport (copy thành config.json)
├── prompts/
│   └── heuristic-review.md   prompt cố định
├── schema.json           định dạng JSON output
├── src/                  code script
└── out/                  output tạm (không commit; bản cuối copy sang evidence/ai/)
```

API key để trong `.env` (đã gitignore), tham khảo `.env.example`.

**So sánh người vs AI** (dùng `ground-truth/bugs.md`):
- Đếm: trùng nhau / chỉ người thấy / chỉ AI thấy / AI báo sai / lệch severity.
- Precision = (đúng trong danh sách + đúng ngoài danh sách đã ≥2 người xác nhận) / tổng AI báo.
- Recall = đúng trong danh sách / tổng lỗi trong danh sách.
- Chạy 3 lần để đo độ ổn định; ghi token + thời gian mỗi lần.
