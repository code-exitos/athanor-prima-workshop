## Feature: <Name>

<!-- Code: this issue doesn't get its own number scheme, it carries the code from
.athanor/context/business/features.md. Implements: cite the requirement IDs, comma-separated if the
feature delivers more than one (for example R-1, R-3), so a PRD change can be traced to what it
invalidates. -->

- **Code:** F-# (from `.athanor/context/business/features.md`)
- **Business Goal:** <why this exists, and what the client or end user gets from it. Serves: G-#>
- **Implements:** `.athanor/context/engineering/prd-<increment>.md` §Requirements: <R-#>
- **Linked PRD/Increment:** <link>
- **Priority:** Must / Should / Could Have (source) — the card's `Priority` field gets High / Medium / Low

---

### Sub-Issues (User Stories)

<!-- Don't restate the story list here. The hierarchy lives in GitHub's own sub-issue
relationship (generate-github-issues creates it), which renders live and carries each story's
real status; a copy in this body goes stale the moment a story is renamed, added, or closed. -->

### Task Issues (if any)

<!-- Infra/setup work this feature depends on but that isn't itself a user story (e.g.
"provision uat DB", "add feature flag scaffold"). GitHub has no built-in relationship for
this, so list it here, but link, don't duplicate the task's own contents. -->

- [ ] TASK-01 <title>

### Success Criteria

<!-- Measurable outcomes that prove the whole feature (not any one story) is done. Specific
and verifiable, not vague: "checkout completes in under 3s at p95," not "checkout is fast". -->

- **Outcome 1:** <what is observably true once this feature is done>
- **Outcome 2:** <what is observably true once this feature is done>

### Edge Cases

<!-- Cross-story edge cases that don't belong to any single user story but the feature as a
whole must handle (e.g. what happens if two stories' flows overlap). Story-specific edge cases
belong in that story's own issue. -->

- **<Cross-story edge case>:** <expected behavior>

### Key Entities

<!-- Only if this feature touches data: cite the E-# entities involved
(.athanor/context/engineering/data-model.md) rather than redefining fields here. -->

- **E-#:** <how this feature reads or writes it>

### Out of Scope

- <What this feature deliberately does not cover>

### Dependencies

- No dependencies / <list>

### Assumptions

- _Populated by `log-assumption` as work proceeds. Feature-level assumptions only; story-level assumptions live on the story issue._
