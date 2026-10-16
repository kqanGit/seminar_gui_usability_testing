# Khảo sát bài báo khoa học — Automated GUI & Usability Testing

> Người khảo sát: **Quân** · Ngày: 19/10/2026 · Soạn có dùng Claude (tìm và tóm tắt), Quân đọc lại và đối chiếu nguồn.
> Yêu cầu của GVTH: paper **rank ≥ B**, **5 năm gần đây** (2021–2026), về automation GUI / usability testing.

## Tiêu chí chọn

- Đăng ở hội nghị xếp hạng **CORE (ICORE) A\* / A / B** hoặc tạp chí Q1, năm **2021 trở đi**.
- Đề tài gần với seminar: kiểm thử giao diện tự động, đánh giá usability / heuristic bằng AI, accessibility.
- Hạng hội nghị ghi theo bảng CORE hiện hành; **cần đối chiếu lại** trên [portal.core.edu.au](https://portal.core.edu.au/conf-ranks/) trước khi đưa vào slide chính thức (trang này chặn công cụ tự động nên chưa kiểm tra máy được).

## Bảng tổng hợp

| # | Bài báo | Nơi đăng | Hạng | Chủ đề | Liên quan tới nhóm |
| --- | --- | --- | --- | --- | --- |
| P1 | Duan, Warner, Li, Hartmann — *Generating Automatic Feedback on UI Mockups with Large Language Models* | CHI 2024 | A\* | LLM đánh giá giao diện theo **10 heuristic Nielsen** | **Trực tiếp** — cùng ý tưởng với AI Heuristic Reviewer |
| P2 | Duan, Chen, Li, Hartmann, Li — *UICrit: Enhancing Automated Design Evaluation with a UI Critique Dataset* | UIST 2024 | A | Bộ dữ liệu phê bình UI để cải thiện LLM đánh giá giao diện | Cách cải thiện prompt (few-shot, visual prompting) |
| P3 | Liu et al. — *Make LLM a Testing Expert: Bringing Human-like Interaction to Mobile GUI Testing via Functionality-aware Decisions* (GPTDroid) | ICSE 2024 | A\* | LLM tự khám phá và kiểm thử GUI | AI điều khiển giao diện như người dùng |
| P4 | Chen et al. — *Beyond Static GUI Agent: Evolving LLM-based GUI Testing via Dynamic Memory* (MemoDroid) | ASE 2025 | A\* | GUI agent có bộ nhớ động | Agent kiểm thử GUI thế hệ mới |
| P5 | Alian, Nashid, Shahbandeh, Shabani, Mesbah — *Feature-Driven End-To-End Test Generation* (AutoE2E) | ICSE 2025 | A\* | LLM sinh test E2E cho **web app** | Gần công cụ Playwright của nhóm (web) |
| P6 | Mansur, Salma, Awofisayo, Moran — *AidUI: Toward Automated Recognition of Dark Patterns in User Interfaces* | ICSE 2023 | A\* | Tự động nhận diện dark pattern trên ảnh UI (mobile + web) | Lỗi usability "cố ý", đánh giá trên ảnh chụp |
| P7 | Liu et al. — *Nighthawk: Fully Automated Localizing UI Display Issues via Visual Understanding* | IEEE TSE (2022) | Tạp chí Q1 | Phát hiện lỗi hiển thị UI (chữ đè, thiếu ảnh…) từ ảnh chụp | Visual GUI testing bằng học sâu |
| P8 | Salehnamadi, Mehralian, Malek — *Groundhog: An Automated Accessibility Crawler for Mobile Apps* | ASE 2022 | A\* | Crawler tự động tìm lỗi accessibility | Phần accessibility của GUI testing |

Tham khảo thêm (chưa có hạng — preprint, không tính vào yêu cầu): Zhong, McDonald, Hsieh — *Synthetic Heuristic Evaluation: A Comparison between AI- and Human-Powered Usability Evaluation* (arXiv 2507.02306, 2025).

---

## P1 — Generating Automatic Feedback on UI Mockups with LLMs (CHI 2024) ★ bài chính

- **Nguồn:** [arXiv 2403.13139](https://arxiv.org/abs/2403.13139) · [PDF tác giả](https://people.eecs.berkeley.edu/~bjoern/papers/duan-heuristic-chi2024.pdf) · DOI 10.1145/3613904.3642782
- **Bài toán:** heuristic evaluation cần chuyên gia, tốn thời gian → dùng LLM đánh giá giao diện tự động.
- **Cách làm:** plugin Figma gửi cho GPT-4 cấu trúc giao diện dạng JSON (các lớp, chữ, vị trí, kích thước, màu) kèm bộ nguyên tắc (10 heuristic Nielsen, nguyên tắc thiết kế thị giác, nguyên tắc nhóm phần tử). GPT-4 trả về các vi phạm; lần gọi thứ hai viết lại thành gợi ý sửa.
- **Thí nghiệm:** 3 designer chấm gợi ý trên 51 giao diện mobile; 12 chuyên gia tự tìm vi phạm rồi so với GPT-4; 12 designer dùng công cụ sửa giao diện qua 2–3 vòng.
- **Kết quả chính:**
  - 52% gợi ý được chấm là đúng, 49% hữu ích.
  - So với chuyên gia trên cùng 12 giao diện: 62% vi phạm **chỉ người** tìm ra, 29% cả hai cùng thấy, 9% **chỉ GPT-4** thấy.
  - GPT-4: precision 0,603 (người: 0,829), recall 0,380 (người: 0,336).
  - Chất lượng gợi ý **giảm qua các vòng sửa** (39% đúng ở các vòng sau).
- **Điểm yếu tác giả nêu:** chỉ đọc JSON nên không thấy hình hiển thị thật → báo nhầm (chồng lớp không nhìn thấy); áp dụng nguyên tắc quá mức, lặp gợi ý; chỉ xử lý một màn hình tĩnh.
- **Liên hệ với nhóm:**
  - Cùng câu hỏi với phần AI của nhóm: *LLM có thay được người đánh giá heuristic không?* Cách so sánh người vs AI (precision, recall, chỉ người thấy / chỉ AI thấy) của nhóm đi theo đúng hướng paper.
  - Khác biệt: nhóm gửi **ảnh chụp màn hình thật** (Playwright) cho LLM có vision thay vì JSON → tránh được lỗi "không thấy hình hiển thị" mà paper nêu, nhưng có thể gặp lỗi đọc ảnh.
  - Kỳ vọng tương tự trên EShop: AI bỏ sót nhiều lỗi người thấy, precision thấp hơn người.

## P2 — UICrit (UIST 2024)

- **Nguồn:** [arXiv 2407.08850](https://arxiv.org/abs/2407.08850) · DOI 10.1145/3654777.3676381
- **Đóng góp:** bộ dữ liệu 3.059 nhận xét và điểm chất lượng cho 983 giao diện mobile, do 7 designer có kinh nghiệm viết.
- **Kết quả:** dùng bộ dữ liệu làm ví dụ (few-shot) và visual prompting giúp chất lượng nhận xét của LLM tăng 55%.
- **Liên hệ:** gợi ý cải tiến prompt của AI Reviewer — thêm vài ví dụ lỗi đã xác nhận (từ ground truth) vào prompt.

## P3 — GPTDroid (ICSE 2024)

- **Nguồn:** [trang ICSE 2024](https://conf.researchr.org/details/icse-2024/icse-2024-research-track/180/Make-LLM-a-Testing-Expert-Bringing-Human-like-Interaction-to-Mobile-GUI-Testing-via-) · [arXiv 2310.15780](https://arxiv.org/abs/2310.15780)
- **Cách làm:** biến kiểm thử GUI thành hỏi–đáp với LLM: đưa thông tin màn hình, LLM chọn thao tác tiếp theo, có bộ nhớ theo chức năng để khám phá có mục tiêu.
- **Kết quả:** thử trên 93 app Google Play; activity coverage hơn baseline tốt nhất 32%, tìm được nhiều hơn 31% lỗi; phát hiện 53 lỗi mới, 35 đã được xác nhận và sửa.
- **Liên hệ:** cơ sở cho ý tưởng "AI đóng vai người dùng" (tương ứng user-sim trong proposal).

## P4 — MemoDroid (ASE 2025)

- **Nguồn:** [trang ASE 2025](https://conf.researchr.org/details/ase-2025/ase-2025-papers/62/Beyond-Static-GUI-Agent-Evolving-LLM-based-GUI-Testing-via-Dynamic-Memory)
- **Ý chính:** GUI agent học từ các lần chạy trước bằng bộ nhớ động thay vì chiến lược cố định.
- **Kết quả:** so với 5 phương pháp khác: activity coverage tăng 79–96%, phát hiện lỗi tăng 57–198%; tìm 49 lỗi mới trên 200 app.
- **Liên hệ:** cho thấy hướng nghiên cứu mới nhất của GUI testing là **agent có bộ nhớ**.

## P5 — AutoE2E (ICSE 2025)

- **Nguồn:** [trang ICSE 2025](https://conf.researchr.org/details/icse-2025/icse-2025-research-track/61/Feature-Driven-End-To-End-Test-Generation) · [arXiv 2408.01894](https://arxiv.org/abs/2408.01894)
- **Ý chính:** LLM suy ra các **tính năng** của web app rồi sinh kịch bản test E2E chạy được; đề xuất benchmark E2EBench.
- **Kết quả:** độ phủ tính năng trung bình 79%, hơn baseline tốt nhất 558%.
- **Liên hệ:** cùng nền web như EShop; là hướng "AI viết test Playwright" để so với test nhóm tự viết. Lưu ý: thiên về kiểm thử chức năng (gần đề T2), nhóm chỉ dùng làm tham khảo.

## P6 — AidUI (ICSE 2023)

- **Nguồn:** [trang ICSE 2023](https://conf.researchr.org/details/icse-2023/icse-2023-technical-track/192/AidUI-Toward-Automated-Recognition-of-Dark-Patterns-in-User-Interfaces) · [arXiv 2303.06782](https://arxiv.org/abs/2303.06782)
- **Ý chính:** nhận diện 10 loại dark pattern (giao diện lừa người dùng) từ ảnh chụp màn hình; bộ dữ liệu 301 mẫu trên 175 ảnh mobile và 83 ảnh web.
- **Kết quả:** precision 0,66, recall 0,67, F1 0,65.
- **Liên hệ:** đánh giá usability tự động **từ ảnh chụp** giống AI Reviewer; số liệu ~0,65 cho thấy nhận diện vấn đề giao diện từ ảnh vẫn còn khó.

## P7 — Nighthawk (IEEE TSE)

- **Nguồn:** [arXiv 2205.13945](https://arxiv.org/abs/2205.13945) · DOI 10.1109/TSE.2022.3150876
- **Ý chính:** mô hình thị giác phát hiện và khoanh vùng lỗi hiển thị (chữ bị cắt, chồng phần tử, thiếu ảnh) trên ảnh chụp.
- **Kết quả:** precision ≈ 0,84, recall ≈ 0,84 khi phát hiện màn hình lỗi; tìm 151 lỗi hiển thị mới, 75 đã xác nhận / sửa.
- **Liên hệ:** dạng "visual GUI testing" bằng học sâu, bổ sung cho visual regression bằng so pixel (Playwright `toHaveScreenshot`).

## P8 — Groundhog (ASE 2022)

- **Nguồn:** [trang ASE 2022](https://conf.researchr.org/details/ase-2022/ase-2022-research-papers/19/Groundhog-An-Automated-Accessibility-Crawler-for-Mobile-Apps) · [PDF](https://seal.ics.uci.edu/publications/2022_ASE_Groundhog.pdf)
- **Ý chính:** crawler tự động đi qua app, thử bằng công nghệ hỗ trợ (screen reader…) để tìm lỗi accessibility mà công cụ quét tĩnh bỏ sót.
- **Liên hệ:** minh họa giới hạn của quét tĩnh (axe-core) mà phần lý thuyết GUI đã nêu.

---

## Rút ra cho seminar

1. **AI đánh giá heuristic là hướng nghiên cứu thật** (CHI 2024, UIST 2024), nhưng kết quả hiện tại: AI bắt được một phần, precision thấp hơn chuyên gia, chất lượng không ổn định → con người vẫn duyệt cuối (human-in-the-loop).
2. **Đánh giá từ ảnh chụp** (AidUI, Nighthawk) đạt khoảng 0,65–0,84 → hợp lý khi nhóm kỳ vọng AI Reviewer bắt tốt lỗi bề mặt, kém lỗi phụ thuộc nghiệp vụ.
3. **GUI agent** (GPTDroid, MemoDroid, AutoE2E) là hướng tự động hóa thế hệ mới: LLM tự thao tác giao diện như người dùng.
4. Cách đo của nhóm (precision, recall, chỉ người / chỉ AI, lệch severity) **khớp với cách đo trong P1**, nên có thể đặt kết quả nhóm cạnh số liệu paper để so sánh.

Bài đề xuất trình bày kỹ trong seminar: **P1** (khớp nhất với phần AI), có thể kèm **P6** hoặc **P5**.
