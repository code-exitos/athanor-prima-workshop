## US-#: <Title>

<!-- Code: this issue is that story operationalized, not a fresh draft of it, so it carries the
code from .athanor/context/business/user-stories.md unchanged rather than starting a new number.
Implements: cite the requirement IDs, comma-separated if this story satisfies more than one,
not just the document, so a PRD change can be traced to the stories it invalidates. -->

- **Code:** US-# (from `.athanor/context/business/user-stories.md`)
- **Parent Feature:** F-# (<link>)
- **Implements:** `.athanor/context/engineering/prd-<increment>.md` §Requirements: <R-#>
- **Priority:** P1 / P2 / P3 (within this feature; P1 ships first if the feature must be split) — the card's `Priority` field gets High / Medium / Low

---

### Why This Priority

<!-- One or two sentences: why this story ranks where it does relative to its siblings, and
what breaks or degrades if it slips. -->

### Story Statement

- **As a** P-# <persona>,
- **I want** <capability>,
- **so that** <benefit>.

### Independent Test

<!-- Describe how this story alone can be verified as working, without depending on any
sibling story in the same feature also being done. This field is about isolation: the
acceptance criteria are the contract, and the Test Plan identifies which pyramid level covers
them. If this genuinely can't be tested independently, say so and note the dependency
instead. -->

### Technical Context

<!-- What the developer or agent needs to know to build this: platform notes, API references,
existing patterns to follow. -->

### Acceptance Criteria

<!-- The observable contract for this story. Numbered, because every criterion must be cited
by at least one test; the IDs are what make that mapping checkable instead of a matter of
prose. -->

- **AC-1:** Given <context>, when <action>, then <expected outcome>
- **AC-2:** Error/alternate/edge case behavior explicitly covered

### Edge Cases

- **<Specific edge case>:** <expected behavior>

### Non-Functional Requirements

<!-- Only when this story carries a measurable non-functional constraint: latency budget,
accessibility level, throughput, data residency. Delete this section entirely when it doesn't;
an invented threshold is worse than no threshold, and the performance/security reviewers would
rather see nothing than a number nobody stands behind. -->

- **<Constraint>:** <measurable target, and where it is measured>

### Dependencies

- No dependencies / <list of other issues>

### Out of Scope

- <What this story deliberately does not cover, so a reviewer doesn't expect it>

### Assumptions

- _Populated by `log-assumption` as work proceeds._

### Test Plan

<!-- Which pyramid level covers which criteria; cite the AC IDs. -->

- **Unit:** <AC-# covered>
- **Integration:** <AC-# covered>
- **E2E (if applicable):** <AC-# covered>
