<!-- Phụ trách: Quân. Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">08</p>

## Ứng dụng AI: Heuristic Reviewer

- Nghiên cứu liên quan: bài báo và skill cộng đồng
- Kiến trúc AI Heuristic Reviewer
- Demo và so sánh người vs AI
- Giới hạn của AI

Note: Phần AI mở đầu bằng khảo sát: giới học thuật và cộng đồng đã làm gì, nhóm làm khác ở đâu.

---

## Nghiên cứu liên quan (2022–2025)

| Bài báo | Nơi đăng | Ý chính |
| --- | --- | --- |
| Duan et al. — UI feedback | CHI'24 · A\* | GPT-4 đánh giá UI theo 10 heuristic Nielsen |
| Liu et al. — GPTDroid | ICSE'24 · A\* | LLM tự khám phá và kiểm thử GUI như người dùng |
| Alian et al. — AutoE2E | ICSE'25 · A\* | LLM sinh test E2E cho web app |
| Mansur et al. — AidUI | ICSE'23 · A\* | Nhận diện dark pattern từ ảnh chụp, F1 0,65 |
| Liu et al. — Nighthawk | TSE'22 · Q1 | Phát hiện lỗi hiển thị UI từ ảnh, P/R ≈ 0,84 |

<p class="small">Hạng theo bảng CORE. Thêm: UICrit (UIST 2024), Groundhog (ASE 2022). Đầy đủ: <code>docs/khao-sat/bai-bao.md</code>.</p>

Note: Hai hướng chính: AI đánh giá giao diện (CHI, UIST, AidUI, Nighthawk) và AI tự thao tác giao diện để kiểm thử (GPTDroid, AutoE2E).

---

## Bài chính: LLM đánh giá heuristic (CHI 2024)

- **Cách làm:** plugin Figma gửi cấu trúc giao diện (JSON) + 10 heuristic Nielsen cho GPT-4 → danh sách vi phạm + gợi ý sửa
- **So với 12 chuyên gia:** 62% lỗi chỉ người thấy · 29% cả hai · 9% chỉ AI thấy
- **Precision:** AI 0,60 · người 0,83 — **Recall:** AI 0,38 · người 0,34
- **Giới hạn:** không thấy hình hiển thị thật, áp dụng nguyên tắc quá mức, chất lượng giảm qua các vòng sửa

<p class="key">Nhóm làm cùng câu hỏi, nhưng gửi ảnh chụp màn hình thật và đo lại trên EShop.</p>

Note: Nguồn: Duan, Warner, Li, Hartmann, CHI 2024, DOI 10.1145/3613904.3642782. Số liệu nhóm sẽ đặt cạnh số liệu này ở slide kết quả.

---

## Skill cộng đồng trên GitHub

| Repo / skill | Star | Làm gì |
| --- | --- | --- |
| anthropics/skills · `webapp-testing` | ~180k | Agent viết script Playwright test web app |
| ui-ux-pro-max-skill | ~137k | Quy tắc UX + checklist (tương phản, focus, viewport) |
| microsoft/playwright-mcp | ~38k | Agent điều khiển trình duyệt qua cây a11y |
| vercel-labs · `web-design-guidelines` | ~32.6k | Rà code UI theo 100+ quy tắc, báo `file:line` |
| lackeyjb/playwright-skill | ~3k | Agent tự viết test, chụp nhiều viewport |
| accessibility-agents | ~400 | Audit WCAG 2.2 AA cho nhiều coding agent |

<p class="small">Số star ngày 19/10/2026. Chi tiết: <code>docs/khao-sat/agent-skills.md</code>.</p>

Note: Agent Skill là thư mục có SKILL.md đóng gói một quy trình để agent tự nạp khi cần.

---

## Nhóm làm khác ở đâu?

| | Skill cộng đồng | AI Heuristic Reviewer |
| --- | --- | --- |
| Đầu vào | Code nguồn hoặc trình duyệt | Ảnh chụp màn hình từng bước |
| Tiêu chí | Quy tắc web, WCAG | 10 heuristic Nielsen + severity 0–4 |
| Đo độ chính xác AI | Không có | Người vs AI: precision, recall, lệch severity |
| Tái sử dụng | Cài skill vào agent | Đổi `config.json` là chạy website khác |

<p class="key">Chưa thấy skill phổ biến nào chấm heuristic theo Nielsen và đo độ chính xác so với người.</p>

Note: Ý tưởng tái dùng: quy trình "trinh sát rồi hành động" của webapp-testing, checklist của Vercel và ui-ux-pro-max làm đầu vào bổ sung cho prompt.

---

## Kiến trúc AI Heuristic Reviewer

- _(nội dung slide)_

Note: ghi chú người nói (không hiện trên slide)
