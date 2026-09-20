# ShoulderPain

A source-linked static GitHub Pages research project for a healthy male adult around age 36–40 with left shoulder /
scapular (“wing”) pain in the context of left-side sleeping, gym loading (possible strain), and up to 12 hours/day of
slouched or static computer work in a small room.

**Live site:** https://buffedlizard55-lab.github.io/ShoulderPain/ (GitHub Pages, repository root, built from `main`)

This is information organization, not diagnosis or medical advice. Emergency symptoms and urgent-care thresholds are
visible on the Home, Causes, Treatment and Next Steps pages.

## Page map

| Page | Contents |
|---|---|
| `index.html` | Scope, disclaimer, a “first 72 hours, no purchases” starter table, card navigation, cautious bottom line |
| `causes.html` | Desk exposure, side sleeping, gym loading, scapular winging/dyskinesis, red flags, referral patterns, self-triage table |
| `treatment.html` | Activity modification, source-specific ice/heat, medication safety, PT/exercise, evidence table for TENS/laser/massage/injections, injection/surgery escalation, checkpoints |
| `exercises.html` | Daily routine, band work, wing-specific program, AAOS doses, resistance-band safety, and a practical desk-break schedule (every move sourced) |
| `ergonomics.html` | Federal OSHA/NIOSH and Oregon OSHA workstation guidance, small-room strategy, depth caveats, measurements + desk footprints, 12-hour-static-posture fixes |
| `products.html` | Foldable/quick-removal desks, non-folding chair trade-offs, clamp-on monitor mount, pillows, rehab tools, official-page prices, 3 budget builds, visible pass-3/4 corrections |
| `costs.html` | **Added pass 4.** How to price treatment with official tools — ACA/Medicare coverage rules, the Medicare procedure price lookup, FAIR Health, and the No Surprises Act good-faith estimate. Deliberately prints no invented prices |
| `pain-log.html` | Offline `localStorage` tracker (pain, sleep side, desk exposure, breaks, exercise, irregularity flags, notes) with an inline-SVG pain chart, 2-week/6-week checkpoints, print/save-as-PDF, JSON/CSV export |
| `sources.html` | Master source list (S1–S56) with trust tiers, a claim ledger, a source-tier audit, and four verification/correction logs (32 logged corrections) |
| `next-steps.html` | Person-facing next actions, remaining work, assumptions, limitations, and every irregularity flagged during verification |

## Requirements covered

- **No diagnosis by assumption:** “wing” is treated as an ambiguous description. Visible winging, weakness, neurologic
  symptoms, trauma, chest symptoms and major loss of function are escalated rather than self-treated.
- **Trusted source preference:** load-bearing medical claims use MedlinePlus/NIH, OSHA/NIOSH/CDC, Mayo Clinic,
  Mayo Clinic Health System, Cleveland Clinic, Mass General Brigham, AAOS/ASES, NCBI/StatPearls, Cochrane and a
  PubMed-indexed trial. Lower-tier/affiliate/product sources are labelled and do not carry the medical pathway.
- **Direct manual-review links:** source chips lead to `sources.html`, whose rows contain direct URLs and a narrow
  “used for” description; a claim ledger records what each load-bearing claim stands on.
- **Line-by-line claim boundaries:** generic AAOS exercise doses are labelled general conditioning guidance, not a
  winging prescription; where no source states a dose, it is marked † as a project default.
- **Small space and foldability:** desks are selected for fold-flat, wall-folding or quick-removal use. Chairs are
  explicitly marked as non-folding trade-offs; no chair is falsely presented as meeting the fold-flat requirement.
- **Pricing:** product snapshots are dated September 20, 2026, use manufacturer pages where available, label
  retailer/distributor prices and mark unverified figures. Treatment pricing has no official national list, so
  `costs.html` gives the official coverage rules and price tools instead of numbers, and says so on the page.
- **Privacy-safe tracking:** the pain log makes no network request and uses browser `localStorage`; it provides
  JSON/CSV export and deletion. Device/browser access and exported files are still privacy risks and are disclosed.
- **Four explicit review passes** (implementation/verification, bug + missing-requirement review, full re-check, and a
  final source-by-source pass with the site text open beside it) are recorded in `sources.html` (`#pass2`, `#pass3`,
  `#pass4`; pass 2 and 3 logs also carry the pass-2/pass-3 correction tables).

## Verification policy

1. Medical statements are paraphrased from a cited source or clearly marked as a project suggestion/limitation. If a
   source is condition-specific, the page keeps that condition-specific boundary.
2. Exercise dosing comes from the AAOS general conditioning program or the cited handout where shown; otherwise no
   exact number is invented. Every exercise page says to stop for pain and seek clinician/PT input for visible
   winging, weakness, neurologic symptoms, trauma, or persistent/worsening symptoms.
3. Federal OSHA’s monitor distance and Oregon OSHA’s separate work-surface-depth/viewing-distance details are kept
   separate. The site does not call a 24-inch depth rule “federal OSHA.”
4. Product specifications and prices are snapshots, not endorsements or medical-efficacy evidence. Re-open the direct
   page before buying — one price moved within the same day and one chair variant changed overnight during checks.
5. If a source or product page conflicts with the project’s earlier wording, the correction is recorded in the source
   log instead of silently hidden. Known irregularities are listed on `next-steps.html`.

## Technical notes

- Plain static HTML/CSS/JavaScript; no build step, package manager, third-party runtime, analytics, backend or
  external script dependency.
- GitHub Pages serves the repository root from `main`; deployment is automatic after changes reach `main`. The Pages
  source is the repository root (not a `docs/` subfolder) because the CI token lacks permission to change Pages
  settings (403 “Resource not accessible by integration”).
- The pain log’s storage key is `shoulderpain-log-v1`. Clearing site data deletes the entries; export a backup before
  clearing or moving browsers. Imports are validated: invalid or future dates, and out-of-range pain/desk/breaks
  values, are skipped and counted — never silently clamped or guessed.
- Styling is shared in `css/style.css`; tables scroll horizontally on narrow screens, navigation can scroll on mobile,
  and pages include skip links, focus styles and print-friendly basics (the pain log also prints chart + table).

## Maintenance / remaining work

Price and stock checks must be repeated before purchase. Remaining limitations and optional work — monitor-arm fit
against the chosen desk’s tilting/lipped top, IKEA US price checks if those chair alternatives are of interest,
pricing your own treatment with the `costs.html` tools, region-specific pricing, deeper primary research on computer
exposure, and official exercise *videos* (none exist on the cited pages, so illustrated official handouts are linked
instead) — are listed on `next-steps.html`.
