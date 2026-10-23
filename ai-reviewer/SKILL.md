---
name: nielsen-heuristic-reviewer
description: Agent-run heuristic evaluation of a web UI against Nielsen's 10 heuristics (H1-H10, severity 0-4). Works with any coding agent that can run shell commands, view images and start subagents. Playwright captures screenshots; an isolated reviewer subagent inspects them; a labeler subagent matches findings to ground truth; scripts validate, report and compute human-vs-AI metrics. Use when asked to run the AI heuristic review, a smoke/cart/full-flow demo, or the human-vs-AI comparison.
---

# nielsen-heuristic-reviewer

You (the main agent) orchestrate. You do NOT judge the UI yourself: the
`heuristic-reviewer` subagent does, so its judgement is not contaminated by
anything you have read in this repo.

Requirements on the agent: run shell commands, read/write files, view PNG
images, and start a subagent (child agent) with a fresh context. This skill
does not call any LLM API; the model doing the review is your own.

All commands run from `ai-reviewer/`. Run outputs go to `<outDir>/<run>/`
(`outDir` comes from the config; default `out`).

## Files

| Path | Role |
| --- | --- |
| `config.example.json` / `config.json` | Site, base URL, pages, viewports, state setups (EShop) |
| `config.todomvc.json` | Second site, proves reuse without code changes |
| `prompts/heuristic-review.md` | Rubric given to the reviewer subagent (generic, no site-specific hints) |
| `prompts/labeling-guide.md` | Rules for the labeler subagent |
| `schema.json` | Schema of one findings file (one screenshot) |
| `src/capture.js` | Playwright: build UI state, take full-page screenshots |
| `src/validate.js` | Check every findings file against `schema.json` |
| `src/report.js` | Merge one run into `report.md` + `findings-all.json` |
| `src/labels.js` | `prepare`: list findings to label · `merge`: build `labels.csv` |
| `src/compare.js` | Metrics from `labels.csv` + ground truth; archive runs to `evidence/ai/` |
| `agents/heuristic-reviewer.md` | Reviewer subagent (sees screenshots + rubric only) |
| `agents/finding-labeler.md` | Labeler subagent (sees findings + ground truth) |

## Starting the subagents

- If your agent has these subagents installed by name (`heuristic-reviewer`,
  `finding-labeler`; see README for install paths), use them.
- Otherwise start a generic subagent with a fresh context and give it the full
  text of the matching file in `agents/` as its instructions, plus the paths
  listed below.
- If you cannot start a subagent with a fresh context, STOP and tell the user
  to open a new, separate agent session and paste the instructions from
  `agents/heuristic-reviewer.md` with the paths. Never do the reviewer's job in
  the main conversation.

## Workflow for one run

1. `npm run capture -- --run <run> [--config <file>] [--only <page>] [--viewport <name>]`
   - Writes `<outDir>/<run>/shots/<page>-<viewport>.png` and `meta.json`.
   - If capture fails (site down, setup error) it exits non-zero. Stop and
     report to the user. Never substitute other images.
2. Invoke the `heuristic-reviewer` subagent with ONLY:
   - the absolute path of `<outDir>/<run>/shots/`
   - the absolute path of `prompts/heuristic-review.md`
   - the absolute path of `<outDir>/<run>/findings/` (output folder)
   Do not paste ground truth, earlier findings, page source or your own
   opinions into the request. One fresh subagent call per run.
3. `npm run validate -- --run <run> [--config <file>] --model "<model id of the reviewer>"`
   - On failure: send the error list back to a NEW reviewer call for the
     failing files only (max 2 retries), then stop and report.
4. `npm run report -- --run <run> [--config <file>]` → `report.md`.

## Demos

| Demo | Steps |
| --- | --- |
| 1 Smoke | Run workflow with `--run smoke --only home --viewport desktop` |
| 2 Cart | Run workflow with `--run cart-demo --only cart --viewport desktop`; show `report.md` |
| 3 Full flow | Run workflow 3 times: `run-1`, `run-2`, `run-3` (all pages × viewports), then "Labeling and comparison" below; then run workflow once with `--config config.todomvc.json --run todomvc` |

## Labeling and comparison (Demo 3)

1. `npm run labels:prepare -- --runs run-1,run-2,run-3` → `../evidence/ai/to-label.json`
2. Invoke the `finding-labeler` subagent with the absolute paths of
   `to-label.json`, `../ground-truth/bugs.md`, `prompts/labeling-guide.md`
   and the output file `../evidence/ai/labels-ai.json`.
3. `npm run labels:merge` → `../evidence/ai/labels.csv`
   (keeps any `human_label` / `human_note` already filled in).
4. `npm run compare -- --runs run-1,run-2,run-3`
   → `../evidence/ai/comparison-summary.md` + archived runs in `../evidence/ai/runs/`.
5. Tell the user: labels are AI-made and must be reviewed. Humans fill
   `human_label` (only where they disagree, or `ok` to confirm) and
   `human_note` in `labels.csv`, then re-run step 4. The summary states how
   many rows were human-reviewed.

## Hard rules

- Never invent, edit or "fix" findings, labels, times or token counts.
  Every number in a report must come from a file produced in this workflow.
- Never fall back to cached or example data when a step fails. Stop and report.
- Do not read `../ground-truth/`, `../sut/`, `../slides/`, `../content/` or
  `../evidence/` before the reviewer subagent has finished all runs.
- Use the same agent and model for all runs and for labeling, so runs are
  comparable. Record the exact model id with `--model`.
- Token usage: record it in `meta.json` (`tokens` field) only if your
  interface shows it for the reviewer call; otherwise leave `null`.
