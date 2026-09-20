# ShoulderPain

A personal, research-backed project for dealing with **left shoulder + scapular "wing" pain** (healthy male, 36–40),
caused (suspected) by: sleeping on the left side, a possible gym strain, and 12+ hours/day of slouched or static
desk work in a small room.

## The website

Published on GitHub Pages (main branch, repo root): **https://buffedlizard55-lab.github.io/ShoulderPain/**

Organized sections:

| Page | Contents |
|---|---|
| `index.html` | Overview, how to use, verified bottom line, honesty policy |
| `causes.html` | Medical causes for each suspected trigger + red flags + self-triage table |
| `treatment.html` | Escalation ladder: self-care → exercise/PT → injection → surgery, with real evidence quality |
| `exercises.html` | Daily routine, band work, wing-specific program, desk break schedule (every move sourced) |
| `ergonomics.html` | OSHA/NIOSH setup checklist for a small room, measurement worksheet + desk footprints, 12-hour-static-posture fixes |
| `products.html` | Foldable desks, chairs, monitor arm, pillows, rehab tools — official-page prices, 3 budget builds |
| `pain-log.html` | Private offline tracker (pain, sleep side, desk hours, exercise adherence) with 2-week/6-week checkpoint reminders + JSON/CSV export |
| `sources.html` | Master source list with trust tiers + verification log (two passes, Sep 19, 2026) |
| `next-steps.html` | Remaining work, limitations, and every irregularity flagged during verification |

## Requirements honored

- **Small space** — all desk options are compact or fold-flat; chairs chosen for small footprint.
- **Foldable / quick-removal** — desk requirement met (fold-flat portable desk, wall-mount folding desk, or fully
  foldable electric desk). Chairs can't fold flat at 12 h/day quality — flagged as a trade-off in `next-steps.html`.
- **Pricing + official verified sources** — every product price was read from the official manufacturer page (retailer
  sources are explicitly badged), most recently on 2026-09-19 in two passes.
- **No hallucinations / line-by-line verification** — every claim carries a source chip linking to `sources.html`;
  the verification log records how and when each entry was checked; irregularities are flagged, not hidden. A second
  independent pass (session 2) re-read every load-bearing claim and price, found and fixed 3 inaccuracies plus 1
  same-day price drift — the full correction log is at the bottom of `sources.html`.

## Verification policy

- Medical claims: paraphrased from .gov (OSHA/NIOSH/MedlinePlus), medical-center (Mayo, Cleveland Clinic, AAOS,
  Mass General Brigham, Texas Children's, OUMC), peer-reviewed (Cochrane, PubMed/PMC), or flagged commercial sources.
- Product prices: read from official pages; re-checked in a second pass on 2026-09-19 — they change, so re-check
  before buying (one price moved within the same day).
- Known irregularities from verification: see `next-steps.html` (flagged table, rows 1–11).

## Maintenance

- Site is plain static HTML/CSS/JS (no build step, no dependencies, no backend; the pain log uses browser
  `localStorage` only). Push to `main` and GitHub Pages (source: main branch, repo root) redeploys automatically.
- Note: the Pages source was set to the repo root (not a `docs/` subfolder) because the CI token lacks permission to
  change Pages settings (403 “Resource not accessible by integration”); the site files were placed at the repo root
  to match that setting.
- Suggested next-session work (re-verify remaining sources, exercise videos with verified links, deeper evidence
  layer, price re-checks): `next-steps.html`.
