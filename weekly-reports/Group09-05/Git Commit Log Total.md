# Git Commit Log Total — Group 09

- **Repo:** https://github.com/kqanGit/seminar_gui_usability_testing  
- **Kỳ báo cáo:** **17/10/2026 – 23/10/2026**  
- **WeekID:** 05 (LT W06 → TH = W06−1)  
- **Phạm vi:** AuthorDate trong 17/10 – 23/10 (trên `main` + nhánh Quang merge trong kỳ)  
- **Thời điểm xuất log:** 2026-10-23  

## 0. Ánh xạ Git → MSSV

| Git Author | Email | MSSV | Họ tên | Vai |
| --- | --- | --- | --- | --- |
| `ducquang2` | `nducquangg@gmail.com` | 20120359 | Nguyễn Đức Quang | A |
| `kqanGit` | `bmquan.gd@gmail.com` | 23120337 | Bùi Minh Quân | C |
| `23120328` | `buuhuynhvinhphuc@gmail.com` | 23120328 | Bửu Huỳnh Vĩnh Phúc | B |

## 1. Tổng hợp (17–23/10 trên `main` trước merge Demo 3)

| Thành viên | Số commit |
| --- | --- |
| kqanGit (Quân) | 5 |
| 23120328 (Phúc) | 5 |
| ducquang2 (Quang) | 0 trên `main` trước PR Demo 3 → **+1** sau merge nhánh `quang/demo3` |
| **Tổng trên main (đã pull)** | **10** (+ Demo 3 khi merge) |

## 2. Log `main` 17–23/10 (mới → cũ)

| Hash | Author | Date | Message |
| --- | --- | --- | --- |
| `2e58bbe` | kqanGit | 2026-10-23 20:59 | docs(usability): update study design and 3-demo script for UXtweak and Microsoft Clarity |
| `248bcea` | kqanGit | 2026-10-23 20:18 | feat(sut): integrate Microsoft Clarity tracking snippet alongside UXtweak |
| `0653b5a` | kqanGit | 2026-10-23 20:16 | feat(usability): switch from Maze to UXtweak snippet and update slides, script, and AI disclosure |
| `6df47bb` | 23120328 | 2026-10-23 01:02 | content(tools): bo sung khao sat va so sanh nhom cong cu Usability |
| `a522194` | 23120328 | 2026-10-23 01:02 | content+slides(maze): hoan thien bao cao va slide phan 07 |
| `18b8efa` | 23120328 | 2026-10-23 01:02 | exercises(usability): soan de bai va dap an Bai tap 3 |
| `68cd5fb` | kqanGit | 2026-10-23 12:08 | slides: rút về bản trình bày 30 phút |
| `d9f0ef6` | 23120328 | 2026-10-23 00:34 | docs(ai): AI_DISCLOSURE + AI Usage Declaration Vai B |
| `ec9c6ec` | 23120328 | 2026-10-23 00:18 | sut(frontend): tich hop Maze Universal Snippet |
| `59d4f86` | kqanGit | 2026-10-21 23:36 | sut: prepare deploy (PORT / vercel.json) |

## 3. Quang — việc kỳ này (nhánh `quang/demo3`)

Commit Demo 3 + checklist + content + kịch bản clip `49b89f7`. File chính:

- `tests/playwright/setups.js`, `tests/demo3-gui-rules.spec.js`, baselines `*-snapshots/`
- `checklist/checklist-50.md` (đủ 50)
- `content/03-checklist.md`, `content/06-playwright.md`
- `videos/clip-scripts-playwright.md`, `videos/README.md`

## 4. Lệnh tái tạo

```bash
git log origin/main --format='%h|%an|%ae|%ad|%s' \
  --date=format:'%Y-%m-%d %H:%M:%S %z' \
  --since='2026-10-17 00:00:00 +0700' \
  --until='2026-10-24 00:00:00 +0700'
```
