<!-- Phụ trách: Cả nhóm (Quân ghép, Phúc trình bày). Bản nháp do Quân soạn (có dùng Claude) từ bảng so sánh mục 3 của docs/proposal/Proposal.md. Mỗi slide ngăn cách bằng một dòng chỉ có --- -->

<!-- .slide: class="divider" -->

<p class="part">05</p>

## Khảo sát và chọn công cụ

- So sánh 11 công cụ theo chi phí, độ khó, tự động hóa, AI
- Vì sao chọn Playwright, UXtweak (thay cho Maze) và AI Heuristic Reviewer

Note: Thời gian: 1,5 phút. Bảng đầy đủ 11 công cụ × 8 tiêu chí ở mục 3 của Proposal và Phụ lục.

---

## So sánh công cụ (rút gọn)

| Công cụ | Chi phí | Tự động hóa | Vai trò |
| --- | --- | --- | --- |
| **Playwright** + axe-core | Miễn phí, open-source | Fully automated | Chính: GUI |
| **UXtweak** | Gói Free: 1 active study, 1 task | Semi-automated | Chính: usability (thay Maze) |
| **AI Heuristic Reviewer** | Trả theo lượt gọi API | Fully automated | Chính: AI |
| Maze | Khoá Live Website Test ở bản Free | Semi-automated | Khảo sát → chuyển sang UXtweak |
| BackstopJS · Hotjar · Clarity | Miễn phí / Free giới hạn | Auto / Semi-auto | So sánh / Bổ trợ |

<p class="key">Playwright trả lời "đúng đặc tả không", UXtweak trả lời "dùng được không", AI làm lại cả hai để so với người.</p>

Note: Proposal ban đầu chọn Maze và đặt UXtweak làm dự phòng; khi triển khai thực tế, Maze loại khối Website Test khỏi bản Free/Trial (~$99/tháng) nên nhóm chuyển sang UXtweak. UXtweak cần EShop có URL public nên nhóm đã deploy (Vercel + Render). Chuyển ý sang Quang, phần 06.
