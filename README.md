# Seminar T1 — GUI & Usability Testing (Nhóm 09)

Repo chung của Nhóm 09 cho seminar môn Software Testing (FIT@HCMUS). Toàn bộ nội dung seminar nằm ở đây: code test, kết quả, minh chứng, slide, báo cáo. **Lịch sử commit là minh chứng phân công**, nên mỗi người tự commit phần việc của mình.

| Vai | Thành viên | MSSV | Phụ trách |
| --- | --- | --- | --- |
| A | Nguyễn Đức Quang | 20120359 | GUI Testing · Playwright + axe · Checklist 50 câu · Bài tập 1 |
| B | Bửu Huỳnh Vĩnh Phúc | 23120328 | Usability Testing · Maze · Deploy EShop · Bài tập 3 |
| C | Bùi Minh Quân | 23120337 | AI Heuristic Reviewer · so sánh người vs AI · ghép slide/báo cáo · Bài tập 2 |

Chi tiết từng bước: mở [`docs/phan-cong-tasks.html`](docs/phan-cong-tasks.html) bằng trình duyệt.

## Cấu trúc thư mục

```text
.
├── sut/eshop/            SUT EShop (bản sao từ repo môn học). KHÔNG sửa lỗi GUI cố ý trong code.
├── docs/
│   ├── proposal/         Proposal đã nộp (md + pdf + hình)
│   ├── course/           Yêu cầu seminar của GVTH + tài liệu môn
│   ├── meetings/         Biên bản họp (minh chứng) — đặt tên YYYY-MM-DD.md
│   └── phan-cong-tasks.html
├── ground-truth/         Danh sách lỗi GUI/usability đã xác nhận (đáp án để chấm Playwright, AI, bài tập)
├── checklist/            [A] Checklist 50 câu: kết quả Pass/Fail + phân loại tự động/thủ công
├── tests/playwright/     [A] Project Playwright + axe (Demo 1–3)
├── maze/                 [B] Thiết kế study, mission, SUS/SEQ, kết quả export
├── ai-reviewer/          [C] Script AI Heuristic Reviewer (config.json, prompts, output)
├── content/              Nội dung từng phần seminar dạng Markdown — nguồn để làm slide + báo cáo
├── slides/               Slide HTML (reveal.js), mỗi phần một file trong slides/sections/
├── report/               Báo cáo chi tiết
├── exercises/            Bài tập áp dụng cho lớp (đề + gợi ý; đáp án để riêng)
├── evidence/             Ảnh chụp minh chứng (lỗi GUI, checklist, Maze, AI, cài đặt)
├── videos/               Danh sách link YouTube các clip demo (không commit file video)
└── AI_DISCLOSURE.md      Ghi lại chỗ nào dùng AI và ai đã review
```

Mỗi thư mục con có `README.md` riêng ghi người phụ trách và cần nộp gì.

## Chạy EShop trên máy

Cần Node.js 18+. Chi tiết: [`sut/eshop/setup_guide.md`](sut/eshop/setup_guide.md).

```bash
# Terminal 1 — backend (http://localhost:3000)
cd sut/eshop/backend
npm install
node database.js      # tạo/reset DB với dữ liệu mẫu
node server.js

# Terminal 2 — frontend web (http://localhost:5173)
cd sut/eshop/frontend-web
npm install
npm run dev
```

Tài khoản mẫu: `test@eshop.com` / `Test1234!` (user), `admin@eshop.com` / `Admin123!` (admin).

## Xem slide

```bash
npx serve -l 8080      # chạy ở thư mục gốc repo, mở http://localhost:8080/slides/ (không dùng cổng 3000 vì trùng backend EShop)
```

Xuất PDF: mở `http://localhost:8080/slides/?print-pdf` trong Chrome → In → Lưu dưới dạng PDF. Xem thêm [`slides/README.md`](slides/README.md).

## Quy ước làm việc

- **Nhánh:** mỗi người làm trên nhánh của mình (`quang/...`, `phuc/...`, `quan/...`), mở Pull Request vào `main`, ít nhất 1 người khác review rồi mới merge.
- **Commit:** viết rõ việc gì, ví dụ `checklist: chạy xong nhóm Button (12 câu)`. Không gộp việc của người khác vào commit của mình.
- **Task board:** GitHub Projects (To do / Doing / Review / Done). Mỗi task có người làm + deadline; PR ghi `Closes #<issue>`.
- **Minh chứng:** ảnh để trong `evidence/<mục>/`, đặt tên `YYYYMMDD-<trang>-<mô-tả>.png`.
- **Thuật ngữ:** theo bảng mục 6 của proposal (`docs/proposal/Proposal.md`). Severity chỉ dùng thang Nielsen 0–4.
- **Không commit:** `node_modules/`, file `.env`, API key, video `.mp4`, DB `.sqlite`.
- **AI:** được dùng, nhưng phải review lại và ghi vào `AI_DISCLOSURE.md`.

## Mốc thời gian

| Ngày | Việc |
| --- | --- |
| 15/10 – 17/10 | EShop chạy được, repo, deploy URL public, thiết kế study Maze, khung Reviewer; đánh giá heuristic thủ công |
| 18/10 – 20/10 | Demo + clip mỗi công cụ; checklist 50 câu; study Maze với ~5 người; bảng người vs AI |
| 21/10 – 22/10 | Mỗi người viết phần slide + báo cáo của mình; ghép nháp |
| 23/10 – 24/10 | Review chéo, **nộp ≥ 90%** (xác nhận hạn với GVTH) |
| Trước tuần seminar | Trình bày thử với GVTH (bắt buộc) |
| W12 | Nộp bản hoàn chỉnh |
