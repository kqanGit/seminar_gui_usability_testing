# Khảo sát Agent Skills trên GitHub — GUI, UI/UX & Usability Testing

> Người khảo sát: **Quân** · Ngày: 19/10/2026 · Soạn có dùng Claude (tìm và tóm tắt), Quân đọc lại.
> Số star lấy từ trang GitHub của từng repo **ngày 19/10/2026**, sẽ thay đổi theo thời gian.

## Agent Skill là gì (nhắc lại)

Một **skill** là thư mục có file `SKILL.md` (mô tả + hướng dẫn) kèm script / tài nguyên, đóng gói một quy trình để coding agent (Claude Code, Codex, Copilot, Gemini CLI…) tự nạp khi gặp việc phù hợp. Khảo sát này tìm các skill phổ biến liên quan tới kiểm thử giao diện và đánh giá UI/UX, để so với cách nhóm làm AI Heuristic Reviewer.

## Bảng tổng hợp

| # | Repo / skill | Star | Loại | Làm gì | Gần phần nào của nhóm |
| --- | --- | --- | --- | --- | --- |
| S1 | [anthropics/skills](https://github.com/anthropics/skills) → `webapp-testing` | ~180k | Skill chính thức (Anthropic) | Agent viết script Playwright (Python) để kiểm thử web app local: tự bật server, chụp ảnh, đọc DOM, xem console | Playwright + phần AI |
| S2 | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | ~137k | Skill cộng đồng | "Design intelligence": 119 UX guideline, 192 bảng màu, 79 style, checklist trước khi giao (tương phản 4.5:1, focus bàn phím, kiểm 375/768/1024/1440 px) | Checklist GUI, heuristic |
| S3 | [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) (+ Playwright CLI with SKILLS) | ~38k | Công cụ chính thức (Microsoft) | Cho agent điều khiển trình duyệt qua cây accessibility; README khuyên dùng **CLI + SKILLS** cho coding agent để tiết kiệm token | Nền của browser agent |
| S4 | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) → `web-design-guidelines` | ~32.6k | Skill chính thức (Vercel) | Rà **code UI** theo hơn 100 quy tắc (accessibility, focus, form, animation, typography, điều hướng, dark mode…), báo lỗi dạng `file:line`; luật tải mới mỗi lần chạy | Checklist GUI, accessibility |
| S5 | [lackeyjb/playwright-skill](https://github.com/lackeyjb/playwright-skill) | ~3k | Skill cộng đồng (MIT) | Agent tự viết và chạy code Playwright, trình duyệt hiện ra để xem; test responsive bằng ảnh nhiều viewport, test form, link gãy, ảnh không tải | Playwright |
| S6 | [community-access/accessibility-agents](https://github.com/community-access/accessibility-agents) | ~400 | Bộ agent + skill cộng đồng | Agent và skill audit **WCAG 2.2 AA** cho Claude Code, Copilot, Gemini CLI, Codex; xuất SARIF, VPAT | Accessibility |
| S7 | [uxuiprinciples/agent-skills](https://github.com/uxuiprinciples/agent-skills) | < 10 | Skill cộng đồng | 5 skill: đánh giá giao diện theo 168 nguyên tắc UX, phát hiện "UX smell", kiểm flow | Heuristic evaluation (ít người dùng — chỉ tham khảo) |

## Nhận xét chi tiết

### S1 — `webapp-testing` (Anthropic)
- Quy trình **"trinh sát rồi hành động"**: chụp ảnh và đọc DOM trước → chọn selector → mới thao tác. Có script `with_server.py` tự chạy backend + frontend (ví dụ cổng 3000 và 5173 — giống EShop).
- Mạnh: kiểm thử chức năng/giao diện bằng code thật, tái dùng cho mọi web app local.
- Không có: tiêu chí usability hay heuristic; không chấm severity.

### S2 — `ui-ux-pro-max`
- Thiên về **sinh thiết kế mới** đúng chuẩn; phần "review" chỉ là checklist trước khi giao, không có quy trình audit giao diện có sẵn.
- Checklist của nó trùng nhiều với checklist GUI của nhóm (tương phản, focus, viewport) → có thể dẫn làm ví dụ "cộng đồng đóng gói checklist GUI thành skill".

### S4 — `web-design-guidelines` (Vercel)
- Gần nhất với "AI làm GUI review": đọc **mã nguồn** và đối chiếu bộ quy tắc giao diện.
- Khác AI Reviewer của nhóm: Vercel soi **code**, nhóm soi **ảnh chụp màn hình** — hai cách bổ sung nhau (code thấy thuộc tính ẩn như `alt`, ảnh thấy cái người dùng thật nhìn thấy).

### S5 — `playwright-skill`
- Cho thấy xu hướng: thay vì người viết test Playwright, agent tự viết test theo yêu cầu bằng lời → tương ứng ý tưởng gui-agent trong proposal.

### S6 — `accessibility-agents`
- Chính repo ghi rõ **AI vẫn bỏ sót lỗi, vẫn phải thử bằng screen reader và bàn phím thật** — khớp với giới hạn của axe-core trong phần lý thuyết.

## So sánh với AI Heuristic Reviewer của nhóm

| Tiêu chí | Skill cộng đồng (S1–S6) | AI Heuristic Reviewer (nhóm) |
| --- | --- | --- |
| Đầu vào | Code nguồn (S4) hoặc trình duyệt do agent điều khiển (S1, S3, S5) | Ảnh chụp màn hình từng bước (Playwright) |
| Tiêu chí | Quy tắc web/UI, WCAG | **10 heuristic Nielsen + severity 0–4** |
| Đầu ra | Danh sách lỗi theo file/dòng, kết quả test | JSON theo schema → báo cáo Markdown |
| Đo chất lượng AI | Không có | **So người vs AI**: precision, recall, lệch severity, độ ổn định |
| Tái sử dụng | Cài skill vào agent | Đổi `config.json` là chạy website khác |

**Kết luận:**
1. Chưa thấy skill phổ biến nào làm đúng **heuristic evaluation theo Nielsen có chấm severity** và **đo độ chính xác so với người** — đây là điểm khác biệt của phần AI của nhóm.
2. Có thể **tái dùng ý tưởng**: quy trình "trinh sát rồi hành động" (S1), bộ quy tắc checklist (S2, S4) làm đầu vào bổ sung cho prompt.
3. Có thể đóng gói AI Reviewer thành một `SKILL.md` để agent khác dùng lại — tăng điểm "tổng quát hóa, tái sử dụng" mà đề yêu cầu.

## Cách cập nhật số star

Mở trang GitHub của từng repo, xem số cạnh nút **Star**, ghi kèm ngày. Không lấy số từ trang tổng hợp bên thứ ba.
