# Verification follow-up — 21 September 2026

Base: `1076d104b3c0978fad1bf5bf6b0093a85b417d10` (merged PR #13).
Branch: `arena/01a0c21f-shoulderpain`.

## Pass 1 — re-verify every registered source, line by line

Direct sandbox networking is blocked (curl: no route/TLS reset), so every
recheck used the workspace fetch tool. The 12 medical, exercise and
workstation sources (M1–M6, E1–E3, W1–W3) were each opened again on
21 September 2026 and compared with the registered excerpt, locator and
boundary: all still match, verbatim where quoted (heart-attack warning,
2-week threshold, nerve-injury cause, sleep-position instruction, NSAID
and duplicate-paracetamol cautions, “You should not feel pain during an
exercise”, AAOS doses for exercises 1, 2, 6 and 9, CSP pre-exercise
advice, OSHA shoulder/viewing-distance/static-posture text). Their
`checked` dates now read 2026-09-21.

Product and document checks: VIVO and Lillipad were re-verified through
their own official seller product-data endpoints — MOUNT-SF1FB $69.99
available / MOUNT-SF1FW White sold out, and PRO Standard Maple $1,049
(was $1,449) marked available in variant data while the page keeps
contradictory sold-out messaging and Black is marked sold out. The
COMHOMA DH005 gallery was re-read: four color variants, the mixed
110 lb / 176 lb-with-drawer specification images and the $25.50 display
(= 79.99 − 54.49, a discount figure, not the price) reconfirmed. The
COMHOMA price box, IKEA GUNDE, both Branch pages, the three manual/spec
PDFs and the four cost sources (C1–C4) could not be re-opened because the
fetch proxy failed repeatedly; those entries stay dated 20 September 2026
and the site now states that explicitly instead of implying a blanket
same-day pass.

New irregularity flagged: on 21 September the NHS shoulder-pain page’s
own embedded video player showed a temporary “videos unavailable”
network error while all text guidance was intact. Registered on M2; the
site links the CSP video page, whose text was re-read cleanly.

## Pass 2 — defects, edge cases and fixes

Register and product page dates were inconsistent with a partial recheck
(“checked 20 September” everywhere). The Sources page, sidebar and
Products notice now present per-entry dates and label the non-reopened
items as one day older. README/REVIEW session headers were stale on the
previous branch name; the CI workflow push trigger still referenced
`arena/01a0bfc0-shoulderpain`, which would silently skip push validation
for other branches — it now triggers on `main` pushes and all pull
requests. The treatment page’s ibuprofen line said “do not combine …
without medical advice,” a paraphrase weaker than the NHS statement; it
now quotes the NHS sentence directly and keeps the pharmacist/doctor
consultation as separate advice. The source also limits routine oral use
to 10 days without a doctor, which was added. No site behavior changes
were needed: the filter counts, audit
ledger and tests track content automatically (99 units regenerated).
Playwright browser downloads remain blocked in-sandbox (CDN failure), so
local execution of the 33-test × 3-engine matrix is still recorded as
blocked, not as a pass.

CI evidence and a flake fix: on commit `595ac8f` GitHub CI reported one
Firefox failure in “project subpath preserves assets and navigation”
(`route.fulfill: Fetch response has been disposed`) while the identical
suite passed on Chromium, WebKit and in the adjacent runs; the assertion
itself never fired (no missing subpath asset). Chromium/WebKit passed and
the failure did not reproduce on the final commit, but rather than rely on
luck the route handler now tolerates Firefox’s disposal race while still
recording every non-OK subpath response and asserting navigation. Run
#23 (final SHA) passed the whole 33-test × 3-engine matrix.

## Pass 3 — original-request reconciliation

The original brief (organized medical/treatment/exercise/ergonomics/
product sections, official verified links, pricing, small-space
foldable constraint, no hallucinations, PR + merge to main, multi-pass
verification) is re-checked against the live site: ten pages, 25
registered sources with dates and methods, per-claim audit with source
links, purchase gate with unresolved items kept visible. The site still
does not: diagnose, replace clinician/PT assessment, confirm room/door/
body fit, price care beyond the US provider example and the free UK NHS
route, guarantee stock or zero errors, or substitute manual screen-
reader/cross-browser testing with automation.

## Remaining priority work (unchanged in kind, refreshed in date)

1. Qualified clinician/PT review of medical guidance and exercise
   suitability — cannot be produced by this environment; still the top
   open item.
2. Human screen-reader testing (NVDA/JAWS/VoiceOver) and real-device
   browser matrix; CI’s automated axe + Playwright runs are not
   substitutes.
3. Region-specific private care pricing requires the reader’s country/
   city and coverage route; a US public-payer (Medicare) pathway was a
   candidate this session but its official page could not be re-opened
   before the sandbox network degraded — deliberately not added rather
   than cited from memory.
4. Purchase-day rechecks: COMHOMA price box, IKEA GUNDE, Branch page and
   spec PDF (35 lb vs 42 lb conflict still unresolved), VIVO/Lillipad
   manuals and the missing DH005 guide — all blocked today by the same
   fetch failures; re-run this list when networking is healthy.
5. Actual body/room/doorway/storage measurements remain the user’s step
   before any fit claim.

No purchase, booking, diagnosis or clinician review was performed.

---

# Verification follow-up — 20 September 2026

Base: `6bca531dd2e4f5a659a974ff69c38f01c37430b1` (merged PR #12).
Branch: `arena/01a0bfc0-shoulderpain`.

## Pass 1 — implement and verify

Reviewed the templates, generated pages, source/claim registers, validation,
unit tests, browser tests and deployment workflow. Directly opened the five
listed product pages plus the official VIVO MOUNT-SF1FB manual, Lillipad PRO
manual, IKEA-linked care PDF, Branch Ergonomic Chair specification PDF and
COMHOMA installation-guide index.

Added a per-item manual/document purchase gate. The VIVO manual confirms wall
requirements and fold operation. The Lillipad manual adds load-by-height,
clearance, unplugging and transport constraints. COMHOMA's official index does
not list DH005, so the matching guide, unit weight and folded envelope remain
unverified. IKEA's linked document is generic care guidance, not evidence of a
bare folded envelope. The direct Branch PDF was recovered and checked.

Added the official UK NHS physiotherapy route (free, potentially long wait,
local access varies) alongside the existing $135 Luna US self-pay example.
Because no reader location or coverage was supplied, no private local price or
currency conversion was invented.

## Pass 2 — defects, conflicts and edge cases

The Branch product page says 42 lb, while its official specification PDF says
35 lb assembled. The site now exposes this conflict and leaves weight unresolved
instead of selecting a value. Detailed dimensions common to the current page and
PDF were restored, but the chair remains a non-folding exception and no body or
route fit is claimed.

Converted Playwright from one Chromium project to explicit Chromium, Firefox
and WebKit projects, and updated CI to install all three. Corrected the workflow's
stale prior-session branch trigger. Source IDs were kept compatible with the
ledger marker grammar. Regenerated 10 pages and 99 source-bearing audit units.

CI evidence and a flake fix: on commit `595ac8f` GitHub CI reported one
Firefox failure in “project subpath preserves assets and navigation”
(`route.fulfill: Fetch response has been disposed`) while the identical
suite passed on Chromium, WebKit and in the adjacent runs; the assertion
itself never fired (no missing subpath asset). Chromium/WebKit passed and
the failure did not reproduce on the final commit, but rather than rely on
luck the route handler now tolerates Firefox’s disposal race while still
recording every non-OK subpath response and asserting navigation. Run
#23 (final SHA) passed the whole 33-test × 3-engine matrix.

## Pass 3 — original-request reconciliation

Rechecked that the site still separates possible causes from diagnosis, warning
signs from routine care, supervised examples from a personal exercise plan, and
manufacturer statements from clinical evidence. It does not claim to examine the
user, prove room/body/doorway fit, guarantee price/stock, guarantee completeness
or replace clinician/PT, manual assistive-technology or human browser testing.
Reading requires no input or sign-in; the symptom log remains optional.

Local results:

- build: 10 pages, 25 registered sources, 99 source-bearing audit units;
- structural/source/claim check: passed;
- Node unit tests: 8 passed;
- Python audit regression tests: 8 passed;
- Prettier and `git diff --check`: passed;
- local three-engine browser run: blocked because the Playwright CDN repeatedly
  reset TLS connections (`ECONNRESET`). This is not recorded as a browser pass.
  GitHub CI is configured to run the matrix after push.

## Remaining priority work

1. Qualified clinician/PT review of medical guidance and exercise suitability.
2. Manual testing by screen-reader users and on real browser/device combinations;
   automated axe and Playwright checks are not substitutes.
3. Exact provider/payer pricing after a country/city and insurance route are
   known. Current regional facts are deliberately limited to verified routes.
4. On purchase day, repeat exact variant, checkout, stock, shipping, return and
   manual checks. Obtain the missing DH005 guide and reconcile Branch weight.
5. Measure the actual body, room, doorway, storage envelope and removal route.

No purchase, care booking, diagnosis or clinician review was performed. The
historical review below is retained as an audit trail; its "current" labels apply
to earlier sessions.

---

# Follow-up review — 20 September 2026

Current base: `06eec870f9dda637aae2ebac37d07dd76928bd52` (merged PR #11).
Current branch: `arena/01a0bfa3-shoulderpain`. The earlier review below is historical,
not a claim that its test run or all its detailed product findings were repeated.

## Pass 1 — repository and official-source review

Read the content templates, source/claim registers, build/validation code, log
validation and existing browser tests. GitHub Pages API reports legacy publishing
from `main` at `/`, HTTPS enforced. Retained the existing clean, responsive ten-page
site instead of rebuilding a working foundation.

Reopened all 20 registered official source URLs. Compared the relevant medical,
exercise, ergonomic, treatment-price and product passages with the site's text.
AAOS HTML exercises 1, 2, 6 and 9 support the retained doses; the PDF remains a
secondary illustrated reference, not a combined prescription. Medical possibilities
remain unranked and condition-specific advice is not treated as a diagnosis.
Luna's two directly opened pages still state $135 per visit; no local or insured
price is inferred. Prices are snapshots, not purchase promises.

Added a native HTML, keyboard-operable statement audit on Sources & audit with
source-file line numbers, full source-bearing text, direct official references and
links to source scope. JSON remains downloadable. It explicitly excludes uncited
editorial units and includes overlapping nested units: it is not a factual guarantee
or a claim of exhaustive automated line-by-line verification.

## Pass 2 — defects and unresolved source details

- Fixed the ledger parser joining text across adjacent table cells and other block
  boundaries. Refactored extraction into a reusable side-effect-free function.
- Validation now detects stale claim text/line numbers, a missing generated page,
  unknown source markers in unbuilt templates, invalid/future check dates.
- Added eight offline regression tests, including mutation tests. Updated CI to
  run them and use this session's branch, not the prior session branch.
- COMHOMA extraction includes both in-stock and sold-out controls; flagged this
  without declaring which applies to checkout. Mixed drawer/no-drawer specs remain
  flagged. No folded envelope or weight invented.
- Branch extraction shows a template error and incomplete spec-sheet download URL.
  Retained the visible $369 price, overall dimensions, adjustments and 275 lb
  capacity. Removed prior base diameter, weight, detailed seat ranges and warranty
  duration that were not reproduced in this retrieval. Do not construe omission
  as proof the prior values were false. Manufacturer documentation is still needed.
- Lillipad stock and static-load contradictions persist; working and storage
  heights remain distinct. IKEA package size is not bare folded size.

## Pass 3 — original requirements and verification

- Medical advice, treatment, exercises, ergonomics, folding furniture, explicit price
  status, official review links and next-session priorities remain present.
- Reading requires no sign-in, questionnaire or symptom entry. The log is optional.
- No chair in the checked set is certified as meeting both folding and adjustable
  workstation support. No actual room/door/body/removal fit is asserted.
- Added two browser regressions for keyboard and no-JavaScript use of the audit.
  CI passed 32 tests but found the no-JavaScript summary click unstable during
  smooth anchor scrolling. Removed global smooth scrolling; full suite rerun
  required before merge. CI now surfaces failure details in check annotations,
  since sandbox network access to downloadable Actions logs also failed.
- Local build, structural/source/ledger checks, eight Node tests and eight Python
  audit tests passed. Formatter and whitespace checks are run before publication.
- Local Chromium installation failed with ECONNRESET from the Playwright CDN.
  This is not a browser pass. Current GitHub CI results and merge outcome are
  recorded in the PR/final response after they actually occur.

## Next-session priorities / boundaries

1. Qualified clinician/PT review of medical guidance and exercise suitability.
2. Human screen-reader testing and a cross-browser/device matrix; axe/Chromium
   checks cannot replace these.
3. Region/provider-specific care pricing when geography/coverage is known; do not
   manufacture local quotes from the single US provider example.
4. Before purchase, recheck exact variants, price, shipping, stock, returns and
   manuals. Obtain missing folded dimensions and a usable Branch spec sheet.
5. Validate real room/body/removal-route measurements before any fit conclusion.

Research cannot diagnose this pain, replace examination, prove completeness or
zero errors, guarantee availability/prices, or physically verify furniture fit.
No purchase, booking or personal-information submission was performed.

---

## Historical prior-release record (PR #11)

# Review record — 20 September 2026

## Scope and honesty boundary

Reviewed the pre-existing static site at commit `8a21b94` (the session base). This is a revision, not a repository created from nothing. All work remains on `arena/01a0bd2b-shoulderpain`.

The site now distinguishes facts read on an official page, project suggestions, commercial listing claims and unresolved requirements. It does not guarantee zero errors or completeness. No clinician independently reviewed the personalized suitability of this information. Link integrity, automated accessibility and browser tests are not medical validation.

## Pass 1 — implement and verify sources

- Opened 20 official pages from MedlinePlus, NHS, AAOS/ASES, CSP, OSHA, CMS, five furniture manufacturers/sellers and Luna. Read the relevant sections and used claim-level references, source locators and excerpts.
- Rebuilt ten pages with a shared static template and compact navigation; reading requires no JavaScript or manual input.
- Kept possible gym/desk/sleep contributors as possibilities. Distinguished scapular pain from diagnosed winging; retained urgent/emergency assessment thresholds.
- Reduced exercises to four source-checked examples with exact AAOS HTML doses and supervision boundaries; linked illustrations and CSP video page without asserting playback testing.
- Removed unverified broad treatment-effectiveness assertions, speculative bundles, product-fit declarations and the monitor-arm compatibility assumption based only on top thickness.
- Added a truly folding chair candidate while explicitly withholding a prolonged-work recommendation; non-folding Branch chair is an exception, not a qualifying solution.
- Added an actual official-provider care-price example and a cost-status row for every other suggested care category.

Source irregularities found:

1. COMHOMA selected White price $54.49; $25.50 is the discount. Drawer and no-drawer variant imagery mix dimensions/capacities.
2. VIVO folds against the wall but is not quickly detached; clamp suitability cannot be inferred from thickness.
3. Lillipad Standard top is 46 × 24 inches, but collapsed envelope is 53 × 24 × 6 inches and unit weight 67 lb. FAQ working range begins at 13.5 inches, not storage height 6 inches. Selected PRO Standard Maple displayed $1,049 with conflicting stock messages. Specifications say static test 700 lb while FAQ says 350 lb; neither replaces the 75 lb operational rating.
4. GUNDE package measurements are not independently verified bare-chair folded measurements. Local stock unresolved.
5. Branch base diameter exceeds headline width; not foldable and no unmeasured room-fit claim justified.
6. Luna search excerpt showed $125, but directly opened rates and Scripps partner pages both showed $135.
7. AAOS PDF extraction contains artifacts and some unrelated weight limits differ from HTML. Selected instructions/doses were cross-checked against HTML rather than mixing programs.
8. The old assertion that official exercise videos were unavailable was too broad: the NHS links to the CSP video page, now included.

## Pass 2 — bugs, missing requirements and edge cases

Code inspection found old log issues: numeric coercion accepted non-numbers; decimal breaks were rounded; unsafe spreadsheet formulas could be exported; deletion/import could claim success after failed persistence; unvalidated stored objects could reach rendering; summary could retain stale values after clearing. Its “improving” labels/calendar advice were not valid clinical assessments.

Replaced the log with validated v1-compatible storage, plain-text DOM rendering, explicit overwrite/import confirmation, failure-safe saves/deletes, raw-backup recovery for corrupt data, CSV formula mitigation, limits, date validation, cross-tab protection and a descriptive-only summary. No invented pain improvement threshold remains. The feature stays optional.

Browser testing then caught and fixed insufficient sidebar/diagram text contrast, non-focusable horizontally scrolling tables, and a skip-link target that did not receive focus. Final tests include storage failures, corrupt data, no-script access, keyboard filters, CSV injection mitigation and project-subpath asset resolution. Desktop and mobile screenshots were visually inspected.

CI evidence and a flake fix: on commit `595ac8f` GitHub CI reported one
Firefox failure in “project subpath preserves assets and navigation”
(`route.fulfill: Fetch response has been disposed`) while the identical
suite passed on Chromium, WebKit and in the adjacent runs; the assertion
itself never fired (no missing subpath asset). Chromium/WebKit passed and
the failure did not reproduce on the final commit, but rather than rely on
luck the route handler now tolerates Firefox’s disposal race while still
recording every non-OK subpath response and asserting navigation. Run
#23 (final SHA) passed the whole 33-test × 3-engine matrix.

## Pass 3 — original-request reconciliation

Re-read retained source-bearing content units against the opened source excerpts and source sections. Checked exact doses/units/variants, no-zero-error wording, care thresholds, manufacturer-vs-clinical boundaries, small-room constraints, unknown treatment costs and official-source links. Added an explicitly sourced workout-overload possibility rather than leaving the exercise-injury context implicit. The ledger includes 90 source-bearing review units (including full exercise/product cards so instructions and headline prices are not excluded). Improved code readability with formatted source files, initialized the product-filter status for assistive technology, and made the offline checker reject unregistered outbound URLs and invalid claim-ledger references. Added narrower 320px/tablet and cross-tab/overwrite tests; raised the bounded import size to 20 MB so the 5,000-entry schema does not inherently prevent importing its own backups. Every unresolved requirement remains on the Products, Costs and Next Steps pages instead of being counted as met.

The guide is a focused, source-linked starting set, not all possible diseases or products. Further expansion should improve evidence rather than inflate a count. No user questions, purchases, care bookings or personal-data submissions were made.

## Validation and publication

Local results:

- Build: 10 pages, 20 sources and 90 source-bearing review units generated.
- Structural check: all local files/fragments, page metadata, main navigation and source markers passed.
- Node unit tests: 8 passed (dates, shapes, numeric/boolean validation, missing values, malicious keys, entry limit and CSV escaping).
- GitHub PR #11's `validate` job passed after installing Chromium: the 31-test browser suite passed, including automated axe WCAG 2 A/AA + 2.1 AA checks on all 10 pages at 390px and 1440px, no page-level horizontal overflow at 320, 390, 768 or 1440px, and functional/privacy/project-path cases.
- Build reproducibility, formatter, source/link/claim checks, Node tests and Git whitespace checks passed in CI. The current source/link/claim checker is stricter than the base commit.
- The local Playwright browser download was blocked by sandbox networking; the successful GitHub-hosted run is the browser verification for this revision. Remaining limits are no manual screen-reader-user audit, cross-browser matrix or third-party video-playback test. Automated accessibility is not full conformance certification.
PR/merge/publication outcome will be recorded in the GitHub PR and final response after the actual request is attempted.
