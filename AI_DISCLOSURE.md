# AI Disclosure

Theo yêu cầu "chính chủ" của môn: nhóm được dùng AI hỗ trợ nhưng phải review lại, đảm bảo đúng và chịu trách nhiệm về nội dung. Mỗi lần dùng AI cho nội dung nộp bài, thêm một dòng vào bảng dưới.

| Ngày | Người | Công cụ AI | Dùng cho việc gì | File / phần bị ảnh hưởng | Người review | Đã sửa gì sau review |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-09-28 | Cả nhóm | Claude | Tóm tắt tài liệu công cụ, rà soát proposal | `docs/proposal/Proposal.md` | Cả nhóm | Đối chiếu giá/tính năng với trang chính thức |
| 2026-10-15 | Quân | Claude | Dựng khung repo, README, template | Toàn bộ khung repo | Quân | — |
| 2026-10-14 → 16 | Quang | Cursor (Agent) | Evidence EShop/GUI, checklist bắt đầu, biên bản, heuristic nháp, chia commit; hỗ trợ init Playwright + Demo 2 | `evidence/`, `checklist/`, `ground-truth/`, `docs/meetings/`, `tests/playwright/` | Quang | Khoanh đỏ Evidence; sửa nhãn; review test trước push |

Lưu ý:
- Kết quả do **AI Heuristic Reviewer** sinh ra là *dữ liệu thí nghiệm*, không phải nội dung nhóm viết — ghi ở `evidence/ai/`, không cần khai báo ở đây.
- Mọi số liệu, giá, tính năng công cụ trong slide/báo cáo phải dẫn nguồn gốc (trang chính thức), không dẫn "theo ChatGPT/Claude".
