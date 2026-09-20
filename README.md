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
| `products.html` | Foldable desks, chairs, clamp-on monitor mount, pillows, rehab tools — official-page prices, 3 budget builds, visible pass-3 and pass-4 corrections |
| `pain-log.html` | Private offline tracker (pain, sleep side, desk hours, exercise adherence) with an inline-SVG pain chart, 2-week/6-week checkpoints, print/save-as-PDF and JSON/CSV export |
| `costs.html` | **New (pass 4).** What treatment involves and how to price it with official tools — ACA/Medicare coverage rules, the Medicare procedure price lookup, FAIR Health, and the No Surprises Act good-faith estimate. Deliberately prints no invented prices |
| `sources.html` | Master source list (S1–S56) with trust tiers + verification logs (passes 2, 3 and 4; 28 logged corrections) |
| `next-steps.html` | Remaining work, limitations, and every irregularity flagged during verification |

## Requirements honored

- **Small space** — all desk options are compact or fold-flat; chairs chosen for small footprint.
- **Foldable / quick-removal** — desk requirement met (fold-flat portable desk, wall-mount folding desk, or fully
  foldable electric desk). Chairs can't fold flat at 12 h/day quality — flagged as a trade-off in `next-steps.html`.
- **Pricing + official verified sources** — every product price was read from the official manufacturer page (retailer
  sources are explicitly badged) on 2026-09-19 (two passes) and re-read on 2026-09-20 (passes 3 and 4). Treatment
  pricing has no official national list, so `costs.html` provides the official coverage rules and price tools instead
  of numbers, and says so on the page.
- **No hallucinations / line-by-line verification** — every claim carries a source chip linking to `sources.html`;
  the verification logs record how and when each entry was checked; irregularities are flagged, not hidden. Pass 2
  (session 2) re-read every load-bearing claim and price and fixed 8 items; pass 3 (session 3) re-opened **every**
  source and product page by direct retrieval and fixed 11 more — including one product that was the wrong part
  (an add-on monitor arm with no desk clamp), a chair pick with no listed ergonomic adjustments, an unsupported
  drug-safety claim, mis-attributed posture/sleep claims and exercise doses the sources never stated; pass 4
  (same day, later session) then re-read source-by-source with the site text open beside it and made 9 further
  corrections/additions, including removing four Branch-chair claims the product page does not contain, restoring the
  Branch Lite ($329) after a wrong pass-3 removal, marking the Staples figures unverified, and closing the
  treatment-pricing gap with `costs.html`. All three logs are at the bottom of `sources.html`; nothing is corrected
  silently.

## Verification policy

- Medical claims: paraphrased from (or quoted with attribution to) .gov (OSHA/NIOSH/MedlinePlus), medical-center
  (Mayo Clinic, Mayo Clinic Health System, Cleveland Clinic, AAOS OrthoInfo, Mass General Brigham, Texas Children's,
  OSU Wexner), peer-reviewed (Cochrane, PubMed/PMC), or flagged commercial sources. Exercise doses are quoted from the
  AAOS conditioning program or the cited handout, or marked † as defaults when no source states a number.
- Product prices: read from official pages on 2026-09-19 and 2026-09-20 — they change, so re-check before buying
  (one price moved within the same day; one chair variant price changed overnight).
- Known irregularities from verification: see `next-steps.html` (flagged table, rows 1–29).

## Maintenance

- Site is plain static HTML/CSS/JS (no build step, no dependencies, no backend; the pain log uses browser
  `localStorage` only). Push to `main` and GitHub Pages (source: main branch, repo root) redeploys automatically.
- Note: the Pages source was set to the repo root (not a `docs/` subfolder) because the CI token lacks permission to
  change Pages settings (403 “Resource not accessible by integration”); the site files were placed at the repo root
  to match that setting.
- Suggested next-session work (price re-checks before buying, monitor-arm fit check for the chosen desk, pricing your
  own treatment with the Costs-page tools, IKEA US price checks if either chair alternative interests you, deeper
  evidence layer): `next-steps.html`. No verified official exercise *videos* exist on the cited program pages, so the
  site links illustrated official handouts instead of third-party videos.
