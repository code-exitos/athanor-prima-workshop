# Context Document Coding Scheme

Every business, design, and engineering context document uses short, stable ID codes for the
items other documents need to point back to — a goal, a persona, a requirement. `AC-1`/`AC-2`
(acceptance criteria) and `TASK-01` (task issues) already existed before this scheme and keep
their existing meaning; this document extends the same discipline to the rest of the context
document set so cross-references are IDs, not paraphrased prose.

## Why codes, not names

A name can be reworded; a code can't without a deliberate decision to do so. When a User Story
says "Implements: F-3", a later rename of Feature 3's title doesn't silently break the link the
way "Implements: the checkout feature" would. This is the same reasoning behind `AC-1`/`AC-2` —
it's just been applied narrowly until now.

## The Prefixes

| Prefix | Item | Defined in | Referenced by |
|---|---|---|---|
| `G-#` | Goal | `.athanor/context/business/problem-statement.md` | `M-#` (metric measures it), `F-#` (feature serves it), PRD `R-#` |
| `M-#` | Success Metric | `problem-statement.md` — the single source of truth for the sequence, even for a metric a PRD first introduces | Progress reporting, release notes |
| `NG-#` | Non-Goal | `problem-statement.md` | Nothing — non-goals are terminal, they exist to close off scope, not to be built toward |
| `GP-#` | Guiding Principle | `.athanor/context/business/product-vision.md` | Engineering trade-off decisions (ADRs may cite a `GP-#` as rationale) |
| `P-#` | Persona | `.athanor/context/business/personas.md` | `J-#`, `US-#`, PRD "Primary personas affected" |
| `J-#` | User Journey | `.athanor/context/business/journeys.md` | `US-#`, PRD "Primary journeys supported", UI Design Prompt |
| `F-#` | Feature | `.athanor/context/business/features.md` | `US-#` (parent), GitHub Feature issues, PRD "Features in This Increment" |
| `US-#` | User Story | `.athanor/context/business/user-stories.md` | GitHub User Story issues (same code, not a new number), `AC-#` (nested) |
| `AC-#` | Acceptance Criterion | Nested under a `US-#`, numbered `AC-1`, `AC-2`, … starting over per story (pre-existing convention, unchanged) | Test files (`write-tests`), coverage-gap findings |
| `CP-#` | Component Principle | `.athanor/context/design/brand-guidelines.md` | UI Design Prompt |
| `PG-#` | Page | `.athanor/context/design/information-architecture.md` | UI Design Prompt, User Stories' Design/UX References |
| `UIP-#` | UI Design Prompt (one per generation pass) | `.athanor/context/design/ui/<slug>.md` | User Stories' Design/UX References |
| `C-#` | Infrastructure Component | `.athanor/context/engineering/infrastructure-architecture.md` | Data flows, `TASK-#` setup issues |
| `SC-#` | Security & compliance control (one per control) | `.athanor/context/engineering/infrastructure-architecture.md` § Security & Compliance | PRD compliance NFR `R-#` (*Compliance source*), `security-reviewer` |
| `E-#` | Entity | `.athanor/context/engineering/data-model.md` | `US-#` Technical Context, GitHub Feature issues' Key Entities |
| `R-#` | Requirement (functional or non-functional) | `.athanor/context/engineering/prd-<increment>.md` | `US-#` Implements field, `AC-#` |

`ADR-####` (`.athanor/docs/adr/`) and `TASK-##` (Task issues) predate this scheme and are unchanged.

## Rules

- **Assign once, never reuse or renumber.** If an item is deleted or superseded, its code is
  retired, not recycled — a stale reference should fail loudly (nothing found for `G-4`), not
  silently resolve to a different goal that reused the number.
- **Sequential per type, not global.** `F-1`, `F-2`, … in `features.md`; `P-1`, `P-2`, … in
  `personas.md`; `J-1`, `J-2`, … in `journeys.md`. Each of these prefixes has exactly one home
  document that holds every item of that type, in the order it was drafted, so "per document"
  and "per type" are the same thing. Before assigning a new code, check the highest number
  already used in that document and continue from there; never renumber or reuse one, even if
  an item is later dropped. Codes are unique within their own type, not across the whole
  context set: `F-3` and `P-3` are unrelated items that happen to share a number, but two `P-#`s
  always mean two different personas.

  The UI Design Prompt (`UIP-#`) is the one prefix that works differently: it's genuinely one
  file *per generation pass* (`.athanor/context/design/ui/<slug>.md`), because each pass is tied to a
  distinct run of an external generation tool, not a catalog entry like a persona or a feature.
  Its sequence is tracked across every file under `.athanor/context/design/ui/`, the same way the
  single-file prefixes track their sequence within one file.
- **Reference by code, not by paraphrase.** "Implements: F-3" is checkable; "implements the
  checkout feature" is not, once the feature gets renamed. Every field in these templates that
  currently reads as a link or a section reference should carry the code when one exists.
- **A code is assigned when the item is drafted, not when it's Approved.** Draft `G-2` can be
  referenced by a Draft `F-5` — the AKE rule still gates what's *buildable*, not what's
  *nameable*. Don't invent a numbering gap to route around a Draft item.
- **A PRD-introduced metric still gets its `M-#` from `problem-statement.md`, not a PRD-local
  count.** If an increment needs to measure something the original problem statement didn't
  name, that's a new goal/metric for the product, not a private number for that PRD — add it to
  `problem-statement.md`'s Success Metrics as a new `M-#` (superseding Draft if that document is
  Approved) before citing it in the PRD, so the sequence has exactly one owner.
- **New items append; they don't renumber existing ones.** Adding `F-9` to a features list that
  already runs `F-1`–`F-8` never touches `F-1`–`F-8`, even if `F-9` would read better inserted
  earlier alphabetically.
