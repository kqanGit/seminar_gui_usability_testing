<!-- Phụ trách: Cả nhóm (Quân ghép, Phúc trình bày). Bản nháp do Quân soạn (có dùng Claude) từ bảng so sánh mục 3 của docs/proposal/Proposal.md. Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">05</p>

## Khảo sát và chọn công cụ

- So sánh 11 công cụ theo chi phí, độ khó, tự động hóa, AI
- Vì sao chọn Playwright, Maze và AI Heuristic Reviewer

Note: Thời gian: 1,5 phút. Bảng đầy đủ 11 công cụ × 8 tiêu chí ở mục 3 của Proposal và Phụ lục.

---

## So sánh công cụ (rút gọn)

| Công cụ | Chi phí | Tự động hóa | Vai trò |
| --- | --- | --- | --- |
| **Playwright** + axe-core | Miễn phí, open-source | Fully automated | Chính: GUI |
| **Maze** | Gói Free: 1 study/tháng | Semi-automated | Chính: usability |
| **AI Heuristic Reviewer** | Trả theo lượt gọi API | Fully automated | Chính: AI |
| BackstopJS | Miễn phí | Fully automated | So sánh |
| Hotjar · Clarity | Free có giới hạn | Semi-automated | Không chọn |

<p class="key">Playwright trả lời "đúng đặc tả không", Maze trả lời "dùng được không", AI làm lại cả hai để so với người.</p>

Note: AI Heuristic Reviewer = Playwright chụp ảnh + LLM có vision. Applitools, BrowserStack chỉ có trial nên chỉ làm demo phụ nếu còn trial. Lý do chọn Playwright: có đủ bộ ba Record & Playback (codegen), Data-driven (test tham số hóa), Checkpoint (expect, toHaveScreenshot). Maze cần EShop có URL public nên nhóm đã deploy (Vercel + Render). Chuyển ý sang Quang, phần 06.
