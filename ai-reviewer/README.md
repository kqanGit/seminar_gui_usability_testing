# AI Heuristic Reviewer — phụ trách: Quân (C)

Skill `nielsen-heuristic-reviewer` cho coding agent bất kỳ (đã viết cho Claude Code và Google Antigravity; agent nào chạy được lệnh, xem được ảnh và tạo được subagent đều dùng được). Agent chạy script Playwright chụp ảnh các trang EShop, giao ảnh cho **subagent `heuristic-reviewer`** tự xem và chấm theo 10 heuristic Nielsen (severity 0–4), kiểm JSON theo schema, rồi giao cho **subagent `finding-labeler`** gán nhãn nháp so với ground truth. Người kiểm lại nhãn trong `labels.csv`; script tính precision, recall, lệch severity, độ ổn định. Không gọi API LLM riêng, không cần API key.

Hướng dẫn cho agent (tiếng Anh, để agent đọc ít token): [`SKILL.md`](SKILL.md).

```text
ai-reviewer/
├── SKILL.md                 quy trình cho agent
├── agents/
│   ├── heuristic-reviewer.md  subagent chấm ảnh (chỉ được đọc ảnh + rubric)
│   └── finding-labeler.md     subagent gán nhãn nháp (đọc findings + ground truth)
├── install/skill-pointer.md   bản SKILL.md ngắn để đặt vào thư mục skill của agent
├── config.example.json      EShop: URL, 5 trang × 2 viewport, cách dựng trạng thái
├── config.todomvc.json      website thứ hai: chứng minh tái sử dụng
├── prompts/
│   ├── heuristic-review.md  rubric cho reviewer (chung chung, không gợi ý lỗi EShop)
│   └── labeling-guide.md    luật gán nhãn cho labeler
├── schema.json              định dạng findings của 1 ảnh
├── src/
│   ├── capture.js           chụp ảnh (lỗi là dừng, không thay ảnh khác)
│   ├── setups.js            dựng trạng thái: đăng nhập, thêm giỏ (xử lý G10), vào checkout
│   ├── validate.js          kiểm findings theo schema
│   ├── report.js            gộp 1 lần chạy → report.md
│   ├── labels.js            prepare (danh sách cần gán) · merge (→ labels.csv)
│   └── compare.js           tính chỉ số → evidence/ai/comparison-summary.md
└── out/                     output tạm (gitignore); compare chép bản cuối sang evidence/ai/runs/
```

## Cách chạy

Chuẩn bị một lần (PowerShell, ở thư mục gốc repo):

```powershell
cd ai-reviewer; npm install; npx playwright install chromium; cd ..
```

Sau đó cài skill cho agent bạn dùng:

| Agent | Lệnh (PowerShell, ở gốc repo) |
| --- | --- |
| Claude Code | `$null = New-Item -ItemType Directory -Force .claude\agents, .claude\skills\nielsen-heuristic-reviewer; Copy-Item ai-reviewer\agents\*.md .claude\agents\; Copy-Item ai-reviewer\install\skill-pointer.md .claude\skills\nielsen-heuristic-reviewer\SKILL.md` |
| Google Antigravity | `$null = New-Item -ItemType Directory -Force .agents\skills\nielsen-heuristic-reviewer; Copy-Item ai-reviewer\install\skill-pointer.md .agents\skills\nielsen-heuristic-reviewer\SKILL.md` |

Mở agent ở **thư mục gốc repo** rồi yêu cầu, ví dụ: *"Chạy skill nielsen-heuristic-reviewer, Demo 3"*. Agent tự làm theo `SKILL.md`.

Về subagent:

- **Claude Code** nhận 2 subagent theo tên sau khi chép vào `.claude/agents/`; trường `tools` trong file giới hạn công cụ thật sự.
- **Agent khác (Antigravity…):** 2 file trong `ai-reviewer/agents/` đang theo định dạng của Claude Code. Nếu chưa khai báo subagent theo định dạng của agent đó, `SKILL.md` bảo agent tạo một subagent thường và đưa nội dung file làm hướng dẫn. Khi chạy, **kiểm tra có subagent được tạo ra** (ví dụ bảng `/agents` của Antigravity); nếu agent tự chấm ngay trong cuộc hội thoại chính thì kết quả không còn cách ly, phải chạy lại.
- Dùng **cùng một agent và model** cho cả 3 lần chạy và bước gán nhãn.

## Người cần làm gì

1. Mở `evidence/ai/labels.csv` (Excel, lưu lại dạng **CSV UTF-8**).
2. Với mỗi dòng, cột `human_label`: ghi `ok` nếu đồng ý `ai_label`; nếu không, ghi nhãn đúng (`G01`…`G11`, `N01`… cho lỗi mới, hoặc `false-positive`) và lý do ở `human_note`. Xem dòng `confidence = low` trước.
3. Chạy lại `npm run compare -- --runs run-1,run-2,run-3`. Bản tóm tắt ghi rõ đã duyệt bao nhiêu dòng.

## Cách ly để AI không xem đáp án

- Reviewer chỉ được đưa thư mục ảnh và rubric; định nghĩa subagent cấm đọc file khác, cấm chạy lệnh và truy cập web (Claude Code còn giới hạn công cụ bằng trường `tools`).
- Mỗi lần chạy là một lần gọi subagent mới, không mang ngữ cảnh của lần trước.
- Rubric không chứa ví dụ nào lấy từ EShop.
- Giới hạn: lệnh cấm đọc file là chỉ dẫn, không phải quyền hệ thống; nên ghi rõ điều này khi trình bày.
