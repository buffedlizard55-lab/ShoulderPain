# ShoulderPain

A source-linked, static GitHub Pages research project for a healthy male adult around age 36–40 with left shoulder/scapular (“wing”) pain in the context of left-side sleeping, gym loading/possible injury, and up to 12 hours/day of slouched or static computer work.

## Live site

GitHub Pages (repository root, built from `main`): **https://buffedlizard55-lab.github.io/ShoulderPain/**

This is information organization, not diagnosis or medical advice. Emergency symptoms and urgent-care thresholds are visible on the Home, Causes, Treatment, and Next Steps pages.

## Page map

| Page | Contents |
|---|---|
| `index.html` | Scope, disclaimer, navigation, cautious bottom line, and how to use the project |
| `causes.html` | Desk exposure, side sleeping, gym loading, scapular winging/dyskinesis, red flags, and referral patterns |
| `treatment.html` | Activity modification, source-specific ice/heat, medication safety, PT/exercise, injection/surgery escalation, and checkpoints |
| `exercises.html` | Pain-free rules, AAOS general conditioning options/doses, visible-wing limits, resistance-band safety, and a practical desk-break schedule |
| `ergonomics.html` | Federal OSHA/NIOSH and Oregon OSHA workstation guidance, small-room strategies, depth caveats, and a measurement worksheet |
| `products.html` | Foldable/quick-removal desks, non-folding chair trade-offs, monitor mount, sleep aids, rehab tools, prices, and budget builds |
| `pain-log.html` | Offline `localStorage` tracker for pain, sleep side, desk exposure, breaks, exercise, irregularity flags, notes, summaries, import/export, and checkpoints |
| `sources.html` | Claim ledger, direct medical/ergonomics/product links, trust tiers, price snapshots, and three-pass verification/correction log |
| `next-steps.html` | Recommended next actions, irregularity flags, assumptions, limitations, and future improvements |

## Requirements covered

- **No diagnosis by assumption:** “wing” is treated as an ambiguous description. Visible winging, weakness, neurologic symptoms, trauma, chest symptoms, and major loss of function are escalated rather than self-treated.
- **Trusted source preference:** load-bearing medical claims use MedlinePlus/NIH, OSHA/NIOSH/CDC, Mayo Clinic, Cleveland Clinic, Mass General Brigham, AAOS/ASES, NCBI, Cochrane, and a PubMed-indexed trial. Lower-tier/affiliate/product sources are labelled and are not used to carry the medical pathway.
- **Direct manual-review links:** source chips lead to `sources.html`, whose rows contain direct URLs and a narrow “used for” description.
- **Line-by-line claim boundaries:** the source ledger records what each source supports and what the site deliberately does not claim. Generic AAOS exercise doses are labelled as general conditioning guidance rather than a winging prescription.
- **Small space and foldability:** desks are selected for fold-flat, wall-folding, or quick-removal use. Chairs are explicitly marked as non-folding trade-offs; no chair is falsely presented as meeting the fold-flat requirement.
- **Prices and caveats:** product snapshots are dated September 20, 2026, use manufacturer pages where available, label retailer/distributor prices, show variant/stock irregularities, and say that price, shipping, tax, returns, and availability change.
- **Privacy-safe tracking:** the pain log makes no network request and uses browser `localStorage`; it provides JSON/CSV export and deletion. Device/browser access and exported files are still privacy risks and are disclosed.
- **Three explicit review passes:** implementation/verification, bug + missing-requirement + assumption review, and final full accuracy/completeness/code-quality review are recorded in `sources.html#pass1`, `#pass2`, and `#pass3`.

## Verification policy

1. Medical statements are paraphrased from a cited source or clearly marked as a project suggestion/limitation. If a source is condition-specific, the page keeps that condition-specific boundary.
2. Exercise dosing comes from the AAOS general conditioning program where shown; otherwise no exact number is invented. Every exercise page says to stop for pain and seek clinician/PT input for visible winging, weakness, neurologic symptoms, trauma, or persistent/worsening symptoms.
3. Federal OSHA’s monitor distance and Oregon OSHA’s separate work-surface-depth/viewing-distance details are kept separate. The site does not call a 24-inch depth rule “federal OSHA.”
4. Product specifications and prices are snapshots, not endorsements or medical efficacy evidence. Re-open the direct page before buying.
5. If a source or product page conflicts with the project’s earlier wording, the correction is recorded in the source log instead of silently hidden.

## Technical notes

- Plain static HTML/CSS/JavaScript; no build step, package manager, third-party runtime, analytics, backend, or external script dependency.
- GitHub Pages serves the repository root from `main`; deployment is automatic after changes reach `main`.
- The pain log’s storage key is `shoulderpain-log-v1`. Clearing site data deletes the entries; export a backup before clearing or moving browsers.
- Styling is shared in `css/style.css`; tables are horizontally scrollable on narrow screens, navigation can scroll on mobile, and pages include skip links, focus styles, and print-friendly basics.

## Maintenance / remaining work

Price and stock checks must be repeated before purchase. The remaining limitations and optional work—such as a dependency-free pain trend chart, a printable clinician report, region-specific pricing, and deeper primary research on computer exposure—are listed on `next-steps.html`.
