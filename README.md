# Shoulder Guide

A source-linked GitHub Pages guide for shoulder and shoulder-blade (“wing”) pain, built around the user's stated context: a male adult aged about 36–40, left-side sleeping, possible workout injury, prolonged computer use and limited room space.

**Site:** https://buffedlizard55-lab.github.io/ShoulderPain/

**Educational information, not diagnosis or a personalized rehabilitation plan.** Emergency/urgent warning signs take priority over exercises, furniture or symptom logging. No sign-in or symptom entry is required.

## What changed in this review

The existing repository already contained a substantial static research site. This revision replaces blanket verification/completeness claims with a narrower, auditable source register, simplifies the UI and corrects unsafe or unverified assumptions. The previous site remains in Git history.

- Ten organized pages: start, medical advice, treatment, exercises, desk/room, furniture/prices, care costs, optional log, sources/audit and next steps.
- 20 directly opened official sources (2026-09-20). `data/sources.json` records source section, short excerpt, scope and check date. Government/medical-society guidance is separated from commercial product information.
- `data/claims.json` maps source-bearing content units to references and source-file lines. This is a review aid, **not an automated truth certificate**.
- Five furniture listings, with exact variant/price boundaries and folding trade-offs. No product is claimed to fit an unmeasured room or treat shoulder pain.
- Official provider PT price example ($135 self-pay per visit at Luna), not a nationwide average. Other unverified medical costs are explicitly unpriced.
- Mobile-friendly navigation, keyboard/focus support, responsive tables, print styles and optional product filters; all research content works without JavaScript.
- Optional local-only symptom log: v1 data compatibility, validation, backup/import, CSV formula mitigation, deletion and storage-failure protection. It does not diagnose or recommend waiting based on averages.

## Content and build

Edit `content/*.html` (body fragments), `data/sources.json`, `css/style.css` and `js/*`. The shared page layout is in `tools/build.py`.

```sh
npm ci                        # test/format dependencies only; no runtime dependencies
npm run build                 # claim ledger + ten static root HTML pages
npm run check                 # local targets/fragments, metadata, references and nav
npm test                      # pure log-validation tests
npx playwright install --with-deps chromium
npm run test:browser           # desktop/mobile/keyboard/accessibility/log scenarios
npm run serve                 # local preview, 0.0.0.0:8000
```

`PLAYWRIGHT_CHROMIUM_EXECUTABLE=/path/to/chromium npm run test:browser` allows an existing compatible Chromium binary. No third-party scripts, fonts, images, analytics or APIs load in the site itself. Following an external source link leaves the site and is subject to the destination's policies. Hosting providers may process ordinary HTTP requests; “local-only” refers to the log application's data handling, not a claim about hosting logs.

The site is served from the repository root. Relative URLs work at the `/ShoulderPain/` Pages project path. Python 3 and Node 22 are used in validation; visitors need neither.

## Verification policy

1. Read the relevant passage on the official page, not only a search excerpt.
2. Keep condition-specific advice condition-specific; possibilities are not a diagnosis.
3. Put a source by medical, exercise, ergonomic, price and specification claims. Label editorial application/safety suggestions separately.
4. Quote prices only for the checked variant; distinguish discount, list price, sale price, tax/shipping and availability.
5. Unknown or conflicting facts stay visibly unresolved. No claim of independent clinical verification or zero errors.
6. Run the build and tests after edits. Automated checks cannot establish medical accuracy.

## Deployment

At session start, the GitHub Pages API reported a built site with HTTPS and legacy publication from `main` at `/`. Root HTML is committed so that this configuration needs no runtime build. `.github/workflows/validate.yml` validates changes; it does not change the Pages publishing source. The requested PR targets `main` from the fixed session branch `arena/01a0bcb6-shoulderpain`; see `REVIEW.md` and the PR for the actual publishing outcome.

## Optional log and privacy

Storage key: `shoulderpain-log-v1` (retained from the old site). Prior entries can still be read/imported if valid. The clinical “improving/worsening” classifier and calendar-based advice were removed: sparse logs should not reassure someone or postpone assessment. The summary is descriptive only.

No input is transmitted by the application. This is not encrypted or HIPAA-certified storage. Other users of the browser, browser extensions and exported files are privacy risks. Export before clearing browser data. Import validates numbers, booleans, calendar dates and shape; invalid entries are counted, never rounded or silently converted. Invalid persisted data blocks edits rather than overwriting it. Raw JSON export is available for recovery. Cross-tab changes block saves until reload.

## Open limitations / next session

- No clinician exam or clinical peer review; no systematic/exhaustive literature review.
- Actual room fit, safe removal route and body/desk measurements unknown.
- No checked chair meets both folding and adjustable long-day-workstation criteria.
- Product stock, prices and return policies change; Lillipad has contradictory page content.
- Personal care/medicine costs, country and insurance remain unknown.
- Further manual screen-reader testing and source rechecks are still valuable.

See `next-steps.html` for the prioritized backlog and `REVIEW.md` for the three-pass audit.
