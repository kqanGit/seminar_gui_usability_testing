# Labeling guide

Input: `to-label.json` (findings from several runs, each with a `finding_id`)
and the ground-truth table (default `heuristic-gt.md`, issues U01..Unn; each row lists its pages and viewports).

For EVERY finding output one label:

| label | Use when |
| --- | --- |
| `Uxx` | The finding describes the same problem as ground-truth issue Uxx (same page area, same underlying issue; wording and heuristic may differ) **and** the finding's page and viewport are covered by that row. Several issues: `U01;U02`. |
| `new-valid` | Not in ground truth, but a real, visible usability problem on that screenshot. |
| `false-positive` | Not a real problem, not visible in the image, out of scope, or a heuristic applied too strictly. |

Rules:

- Judge the problem, not the heuristic code. A finding filed under H1 can
  still match an issue listed under H4.
- Open the screenshot (`shot` path in the input) when unsure.
- For `new-valid`, give `new_issue_id` (`N01`, `N02`, ...). Reuse the same id
  for the same issue across runs and viewports.
- `confidence`: `high` or `low`. Use `low` for any judgement call; humans
  review those first.
- `reason`: one short sentence, Vietnamese.
- Do not change, merge or drop findings. Do not compute metrics.

Output file (JSON array, one object per finding, same order as input):

```json
[
  { "finding_id": "run-1:cart-desktop#1", "label": "U15", "new_issue_id": null,
    "confidence": "high", "reason": "..." }
]
```
