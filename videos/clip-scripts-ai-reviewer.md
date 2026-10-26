# Kịch bản quay 3 clip AI Heuristic Reviewer (Vai C)

> **Phiên bản:** v3.0 (2026-10-26). Viết lại toàn bộ sau khi đổi ground truth và bỏ TodoMVC.
> **Người thực hiện:** Bùi Minh Quân (`23120337`)
> **Agent dùng khi quay:** Claude Code, model **Claude Opus 5.5**. Mã model ghi vào `meta.json`: `claude-opus-5-5`
> **Cách làm:** quay màn hình trước (không nói), dựng và **lồng tiếng sau**.
> Lời thoại có chỗ `{…}` là **chỗ để trống**: chỉ điền sau khi xem output thật. Không đọc trước kết quả AI.

---

## 0. Ba nguyên tắc rút ra từ lần quay trước

1. **Chỉ nói những gì hiện trên màn hình.** Lần trước, kịch bản viết sẵn "AI phát hiện nút Xóa không xác nhận" nhưng report thật không có. Lần này mọi con số và phát hiện đều điền sau khi chạy.
2. **Ground truth đã chốt trước khi chạy AI.** Đáp án là `ground-truth/heuristic-gt.md` (28 lỗi U01–U28), commit `9f574a9`. Không sửa sau khi chạy.
3. **Cùng một model cho mọi bước:** 3 lần chạy, gán nhãn, smoke và cart-demo đều dùng Claude Opus 5.5.

## 1. Bốn yêu cầu video của thầy và clip tương ứng

| Yêu cầu (bài đăng 24/10) | Clip · đoạn |
| --- | --- |
| Setup | AI-1 · S1–S2 |
| Khái niệm cơ bản trong tool | AI-1 · S3, AI-2 · S1 |
| Demo đơn giản | AI-1 · S4–S5 (smoke 1 ảnh), AI-2 · S2–S3 (1 trang có trạng thái) |
| Demo phức tạp có **data-driven** | AI-3 (5 trang × 2 viewport × 3 lần chạy) |
| Ca công cụ **không xử lý được** | AI-2 · S4 |
| Bộ ba Record & Playback / Data-driven / Checkpoint | R&P: AI-2 · S1 · Data-driven: AI-3 · S1–S2 · Checkpoint: AI-1 · S5, AI-3 · S2, S5 |

---

## 2. Chuẩn bị trước khi bấm quay

- [ ] `git pull`, `git log --oneline -5` thấy commit `ground-truth: chot 28 loi…`.
- [ ] VS Code theme sáng (Light+), cỡ chữ to (`Ctrl + =` 2–3 lần). Ẩn thanh thông báo, tắt chat/Zalo.
- [ ] Bố cục: **trái** là khung chat Claude Code, **phải** là cây thư mục + trình xem file.
- [ ] Trong `ai-reviewer/`: `npm install` và `npx playwright install chromium` đã chạy được.
- [ ] Mở thử `https://seminar-gui-usability-testing.vercel.app` xem site còn sống.
- [ ] Xóa các thư mục cũ để người xem thấy chúng được tạo mới (giữ `out/.gitkeep`; ảnh đáp án đã có bản sao trong `ground-truth/shots/`): `rm -rf out/smoke out/cart-demo out/run-1 out/run-2 out/run-3`
- [ ] Phần mềm quay: OBS hoặc Xbox Game Bar, 1080p, **không thu tiếng**.

**Mẹo cho quay trước, lồng tiếng sau:**
- Mỗi đoạn ghi "giữ cảnh ≥ X giây": đó là độ dài lời thoại. Thao tác chậm, dừng tay đúng chỗ để sau còn đủ thời gian nói.
- Lúc agent chạy lâu (chụp ảnh, subagent chấm), **cứ quay liền**, khi dựng thì tua nhanh 4–8× và ghi chữ "tua nhanh ×8" ở góc màn hình.
- Rê chuột khoanh nhẹ vào chỗ sẽ nhắc tới trong lời thoại.
- Quay xong mỗi clip, ghi lại mốc thời gian thật vào mục 6 để cập nhật slide 47.

---

## 3. CLIP AI-1 · Cài đặt, khái niệm, smoke test (~3 phút)

**Thông điệp:** skill cài thế nào, gồm những gì, và chạy được một vòng đầy đủ trên 1 ảnh.

| Đoạn | Thao tác trên màn hình | Lời thoại (lồng sau) | Giữ cảnh |
| --- | --- | --- | --- |
| **S1 · Giới thiệu & cấu trúc** | Mở cây thư mục `ai-reviewer/`. Lần lượt click: `SKILL.md`, `agents/`, `prompts/`, `schema.json`, `config.example.json`, `src/`. | "Em là Quân, Nhóm 09. Clip này giới thiệu AI Heuristic Reviewer: một Agent Skill để AI đánh giá giao diện theo 10 heuristic của Nielsen. Skill gồm: `SKILL.md` là quy trình cho agent, thư mục `agents` chứa hai subagent, `prompts` chứa rubric, `schema.json` quy định định dạng kết quả, `config` khai báo website cần chấm, và `src` là các script Playwright và Node." | ≥ 30 s |
| **S2 · Cài đặt** | Terminal ở `ai-reviewer/`: `npm install` → `npx playwright install chromium`. Mở `.claude/skills/nielsen-heuristic-reviewer/SKILL.md` và `.claude/agents/`. | "Cài đặt chỉ cần hai lệnh: cài thư viện và trình duyệt Chromium cho Playwright. Để Claude Code nhận skill, nhóm đặt một file `SKILL.md` ngắn trong `.claude/skills` và hai subagent trong `.claude/agents`. Mở dự án là agent tự nạp skill. Skill không gọi API riêng và không cần API key: model chấm chính là model của agent, ở đây là Claude Opus 5.5." | ≥ 30 s |
| **S3 · Khái niệm** | Mở `config.example.json`, khoanh `baseUrl`, `viewports`, `pages`, `setup`. Mở `prompts/heuristic-review.md`, cuộn qua 10 heuristic và thang severity. Mở `schema.json`. | "Ba khái niệm chính. Một: `config` là dữ liệu đầu vào, gồm địa chỉ website, 5 trang và 2 kích thước màn hình. Hai: rubric 10 heuristic và thang severity 0–4. Rubric viết chung, không có ví dụ nào của EShop, để không mớm đáp án. Ba: mỗi phát hiện phải đủ các trường theo `schema.json`, gồm heuristic, phần tử, vấn đề, severity, bằng chứng và cách sửa." | ≥ 35 s |
| **S4 · Chạy smoke test** | Chat: `Dùng skill nielsen-heuristic-reviewer chạy smoke test trang home, viewport desktop, tên lần chạy là smoke.` Quay agent: chạy capture → gọi subagent `heuristic-reviewer` → chạy validate → report. *(Tua nhanh lúc chờ.)* | "Em ra lệnh bằng ngôn ngữ tự nhiên. Agent chính chỉ điều phối: chạy Playwright chụp trang chủ, rồi giao ảnh cho subagent `heuristic-reviewer`. Subagent này chạy trong ngữ cảnh mới, chỉ được đọc ảnh và rubric, không được đọc mã nguồn hay danh sách lỗi. Nhờ vậy kết quả không bị nhiễm thông tin có sẵn trong repo." | ≥ 35 s |
| **S5 · Checkpoint & report** | Khoanh dòng kết quả validate trong chat (`VALID …`). Mở `out/smoke/report.md` ở chế độ Preview, **bấm link ở cột Ảnh** để mở ảnh. Mở `out/smoke/findings/home-desktop.json`. | "Checkpoint đầu tiên: kết quả phải đúng `schema.json`, ở đây báo `{VALID / số file}`. Report gom các phát hiện. Mỗi dòng có link tới ảnh đã chấm. Lần này subagent báo `{số}` vấn đề, ví dụ `{đọc 1 dòng trên màn hình: heuristic, phần tử, severity}`." | ≥ 30 s |

---

## 4. CLIP AI-2 · Trang có trạng thái và ca không xử lý được (~4 phút)

**Thông điệp:** Record & Playback dựng trạng thái; AI thấy gì trên giỏ hàng; và những lỗi nó **không thể** thấy.

| Đoạn | Thao tác trên màn hình | Lời thoại (lồng sau) | Giữ cảnh |
| --- | --- | --- | --- |
| **S1 · Record & Playback** | Mở `src/setups.js`. Khoanh dòng 1 (ghi chú `recorded with npx playwright codegen`), hàm `login`, rồi `addFirstProductToCart` (đoạn click 2 lần có ghi chú G10). *(Tùy chọn: chạy `npx playwright codegen https://seminar-gui-usability-testing.vercel.app` 10–15 s cho thấy công cụ ghi thao tác.)* | "Giỏ hàng chỉ có dữ liệu khi người dùng đã thêm sản phẩm, nên phải dựng trạng thái trước khi chụp. Các bước đăng nhập, thêm giỏ, vào thanh toán được ghi bằng `playwright codegen`, tức Record & Playback, rồi chỉnh lại trong `setups.js`. Hàm thêm giỏ phải bấm hai lần, vì EShop có lỗi G10: bấm lần đầu không ăn." | ≥ 35 s |
| **S2 · Chạy trên giỏ hàng** | Chat: `Dùng skill nielsen-heuristic-reviewer rà soát trang cart, viewport desktop, tên lần chạy là cart-demo.` *(Tua nhanh.)* Mở `out/cart-demo/shots/cart-desktop.png`. | "Em yêu cầu chấm riêng trang giỏ hàng. Agent dựng trạng thái, chụp ảnh, rồi giao cho subagent chấm như ở clip trước." | ≥ 20 s |
| **S3 · Đọc kết quả** | Mở `out/cart-demo/report.md` (Preview) cạnh ảnh. Rê chuột vào từng phát hiện **đúng như đang hiện**. | "AI báo `{số}` vấn đề trên giỏ hàng: `{đọc lần lượt 2–3 phát hiện nổi bật trên màn hình}`. Những vấn đề này đều nhìn thấy được trên ảnh." | ≥ 30 s |
| **S4a · Ca không xử lý được: phải thao tác** | Mở site trên trình duyệt. Thêm 1 sản phẩm (bấm "Thêm vào giỏ" **1 lần**, cho thấy giỏ chưa có gì; bấm lần 2 mới ăn). Vào giỏ, bấm **"Xóa"** → sản phẩm mất ngay, không hỏi lại. | "Có những lỗi AI không thể thấy vì chỉ được xem ảnh tĩnh. Ví dụ G10: bấm thêm vào giỏ lần đầu không có tác dụng. Hay G02: bấm Xóa là mất luôn, không có hộp thoại xác nhận. Cả hai chỉ lộ ra khi thao tác, còn trên ảnh, nút Xóa trông hoàn toàn bình thường." | ≥ 35 s |
| **S4b · Phải đọc HTML / phải biết đặc tả** | F12 trên trang giỏ, khoanh thẻ `<h2>Giỏ Hàng</h2>` (không có `<h1>`). Mở `ground-truth/bugs.md`, khoanh G04 và G05. | "G05: tiêu đề dùng thẻ `h2`, không có `h1`. Trên ảnh, nó vẫn trông như tiêu đề. G04: đặc tả FR-21 yêu cầu nút chính màu xanh dương. AI không được đọc đặc tả, vì skill mô phỏng heuristic evaluation, vốn đánh giá theo nguyên lý chung. Những lỗi này là phần việc của Playwright và checklist." | ≥ 35 s |
| **S4c · Chốt** | Mở `ground-truth/heuristic-gt.md`, cuộn tới mục "Ngoài phạm vi ảnh tĩnh". | "Vì vậy nhóm tách hai thước đo: `bugs.md` cho lỗi đặc tả và tương tác, chấm bằng Playwright; còn AI được chấm trên `heuristic-gt.md`, gồm các vấn đề nhìn thấy được trên ảnh." | ≥ 20 s |

> **Có thể thêm (tùy chọn):** hỏi agent trong chat: `Vì sao reviewer không thể phát hiện G02, G05 và G10 từ ảnh cart-desktop.png?` và quay câu trả lời. Khi lồng tiếng, chỉ tóm tắt **đúng những gì agent trả lời trên màn hình**.

---

## 5. CLIP AI-3 · Toàn luồng 3 lần chạy, so với ground truth (~6 phút)

**Thông điệp:** data-driven trên 5 trang × 2 viewport, lặp 3 lần để đo độ ổn định, gán nhãn có người duyệt, và so sánh với ground truth do nhóm duyệt.

> **Quay thành 2 buổi:** buổi 1 gồm S1–S3. Sau đó **tạm dừng quay** để nhóm duyệt `labels.csv` (S4). Buổi 2 gồm S4–S6.

| Đoạn | Thao tác trên màn hình | Lời thoại (lồng sau) | Giữ cảnh |
| --- | --- | --- | --- |
| **S1 · Data-driven & đáp án chốt trước** | Mở `config.example.json`, khoanh 5 `pages` × 2 `viewports`. Terminal: `git log --oneline -- ground-truth` khoanh commit `ground-truth: chot 28 loi…`. Mở `ground-truth/heuristic-gt.md` lướt bảng. | "Clip cuối chấm toàn luồng mua hàng. Danh sách trang và màn hình đọc từ `config`, tức data-driven: 5 trang nhân 2 viewport là 10 ảnh mỗi lần chạy. Đáp án là 28 vấn đề heuristic trên đúng 10 ảnh này. Bản nháp do AI soạn, 3 thành viên duyệt, và được commit **trước** khi chạy AI." | ≥ 35 s |
| **S2 · Chạy 3 lần** | Chat: `Dùng skill nielsen-heuristic-reviewer chạy toàn luồng 3 lần độc lập: run-1, run-2, run-3. Mỗi lần dùng một subagent mới. Ghi model là claude-opus-5-5.` *(Tua nhanh ×8.)* Sau run-1, terminal chạy lệnh kiểm tra ảnh (mục 7), khoanh 10 dòng `OK`. | "Mỗi lần chạy dùng một subagent mới, không nhớ gì lần trước. Chạy 3 lần vì mô hình ngôn ngữ có tính ngẫu nhiên, cần đo độ ổn định. Checkpoint: 10 ảnh mới chụp trùng từng byte với 10 ảnh làm đáp án, nên AI và người chấm trên cùng một đầu vào." | ≥ 35 s |
| **S3 · Gán nhãn nháp** | Chat: `Gán nhãn cho run-1, run-2, run-3 theo bước Labeling and comparison trong SKILL.md, dùng ground truth heuristic-gt.md.` Quay: `labels:prepare` → subagent `finding-labeler` → `labels:merge`. Mở `evidence/ai/labels.csv`, khoanh cột `ai_label`, `confidence`. | "Subagent thứ hai, `finding-labeler`, so từng phát hiện với 28 vấn đề trong đáp án và gán nhãn: trùng U nào, là vấn đề mới hợp lệ, hay báo nhầm. Một phát hiện chỉ được tính trùng khi đúng cả trang lẫn viewport. Nhãn này chỉ là bản nháp." | ≥ 30 s |
| *(dừng quay)* | Nhóm duyệt `labels.csv`: điền `human_label` (`ok` nếu đồng ý, hoặc nhãn đúng) và `human_note`. Ưu tiên dòng `confidence = low`. | — | — |
| **S4 · Người duyệt** | Mở lại `labels.csv` đã duyệt, khoanh cột `human_label`, `human_note`, vài dòng người sửa nhãn AI. | "Nhóm duyệt cả `{số}` dòng, sửa `{số}` dòng nhãn của AI. Ví dụ: `{đọc 1 dòng người đã sửa}`." | ≥ 25 s |
| **S5 · So sánh** | Chat: `Chạy compare cho run-1, run-2, run-3.` Mở `evidence/ai/comparison-summary.md` (Preview). Khoanh từng dòng: precision, recall, chỉ người/cả hai/chỉ AI, độ ổn định, lỗi bỏ sót. | "Kết quả trên 28 vấn đề: precision `{…}`, recall `{…}`. Có `{…}` vấn đề cả người và AI cùng thấy, `{…}` vấn đề chỉ người thấy, `{…}` vấn đề chỉ AI thấy. `{…}` trên `{…}` vấn đề đúng lặp lại ở cả 3 lần chạy. AI bỏ sót cả 3 lần các vấn đề như `{đọc 2–3 dòng trong mục bỏ sót}`. Bài CHI 2024 dùng GPT-4 đạt precision 0,60 và recall 0,38. Số của nhóm chỉ để tham khảo, vì cách xây ground truth khác." | ≥ 50 s |
| **S6 · Kết luận** | Mở slide 49 hoặc repo GitHub. | "AI làm tốt với vấn đề nhìn thấy được, chạy nhanh và lặp lại được. Nhưng nó mù với lỗi đặc tả, lỗi HTML và lỗi phải thao tác, và vẫn có báo nhầm. Giới hạn của thực nghiệm: đáp án do AI soạn nháp và chỉ một nhóm duyệt. Vì vậy AI là trợ lý tăng tốc, Playwright giữ đặc tả, người dùng thật đo trải nghiệm, và con người duyệt cuối." | ≥ 35 s |

---

## 6. Ghi mốc thời gian sau khi dựng (để cập nhật slide 7, 46, 47)

| Clip | Link YouTube | Thời lượng | Mốc S1 | S2 | S3 | S4 | S5 | S6 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AI-1 | | | | | | | | — |
| AI-2 | | | | | | | — | — |
| AI-3 | | | | | | | | |

---

## 7. Lệnh tra cứu (chạy ở `ai-reviewer/`)

Câu lệnh chat ở trên là cách quay chính. Bảng dưới là lệnh mà agent sẽ chạy, dùng khi cần chạy tay hoặc kiểm tra.

| Việc | Lệnh |
| --- | --- |
| Smoke (AI-1) | `npm run capture -- --run smoke --only home --viewport desktop` → *(subagent chấm)* → `npm run validate -- --run smoke --model "claude-opus-5-5"` → `npm run report -- --run smoke` |
| Giỏ hàng (AI-2) | `npm run capture -- --run cart-demo --only cart --viewport desktop` → *(subagent)* → `npm run validate -- --run cart-demo --model "claude-opus-5-5"` → `npm run report -- --run cart-demo` |
| 1 lần toàn luồng (AI-3) | `npm run capture -- --run run-1` → *(subagent mới)* → `npm run validate -- --run run-1 --model "claude-opus-5-5"` → `npm run report -- --run run-1`. Lặp với `run-2`, `run-3`. |
| Kiểm tra ảnh trùng đáp án | `for f in ../ground-truth/shots/*.png; do cmp -s "$f" "out/run-1/shots/$(basename $f)" && echo "OK  $(basename $f)" \|\| echo "KHAC $(basename $f)"; done` (Git Bash). Có dòng `KHAC` thì **dừng**, site đã đổi. |
| Gán nhãn | `npm run labels:prepare -- --runs run-1,run-2,run-3` → *(subagent `finding-labeler` với `../ground-truth/heuristic-gt.md`)* → `npm run labels:merge` |
| So sánh | `npm run compare -- --runs run-1,run-2,run-3` (ground truth mặc định `../ground-truth/heuristic-gt.json`) |

## 8. Sau khi quay xong

1. Commit `evidence/ai/` (labels.csv, comparison-summary.md, runs/) để có bằng chứng.
2. Điền link và mốc thời gian vào `videos/README.md` và mục 6 ở trên.
3. Gửi `comparison-summary.md` để cập nhật slide 39–49, 54.
