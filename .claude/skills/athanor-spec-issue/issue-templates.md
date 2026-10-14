# Issue templates

Fill every section with concrete content. If a section does not apply, write "None" and why. Cite doc paths.

## Feature issue

```markdown
## Schedule
- Start: <YYYY-MM-DD>
- Target: <YYYY-MM-DD>

## Summary
<Value in 2 to 3 sentences: who gets what, and why it matters.>

## Background and sources
- <docs/context/... path>: <what it says that matters here>

## Personas affected
- <persona>: <how they are affected>

## Scope
**In:** <list>
**Out:** <list>

## Decisions
| Decision | Choice | Rationale | Decided by |
| --- | --- | --- | --- |
| <e.g. end date inclusive?> | <choice> | <why> | <name, date> |

## Functional requirements
1. FR-1: <testable statement>
2. FR-2: ...

## Non-functional requirements
- **Security:** <e.g. signature checked before anything else; tampered tokens denied>
- **Privacy:** <e.g. alias only; no personal data in logs or URLs>
- **Performance:** <e.g. result shown in under 1 second on an older phone>
- **Accessibility:** <e.g. text plus icon, never color alone; WCAG AA contrast>

## Data and interfaces
<Types, function signatures (for example verifyPass(token, now, ledger, blocklist, publicKey)), routes, storage keys.>

## Edge cases and error states
- <case>: <expected behavior>

## Test strategy
<Unit tests for pure functions, boundary tests, component or integration tests, what is not tested and why.>

## User stories
- [ ] #<story 1>
- [ ] #<story 2>
- [ ] #<story 3>

## Definition of done
- [ ] All stories done and their acceptance criteria covered by tests
- [ ] `npm run typecheck`, `npm test`, `npm run build` pass
- [ ] Review findings of severity High or above fixed
- [ ] Docs updated if a decision changed

## Risks and open questions
- <risk or question, with owner>
```

## User Story issue

```markdown
## Schedule
- Start: <YYYY-MM-DD>
- Target: <YYYY-MM-DD>

## Story
As a <persona>, I want <goal>, so that <reason>.

## Context and sources
- <path>: <relevant point>

## Acceptance criteria
At least 4, including boundary and negative cases.
- **AC-1:** Given <state>, when <action>, then <result>.
- **AC-2:** Given ..., when ..., then ...
- **AC-3 (boundary):** Given <value exactly at a limit>, when ..., then ...
- **AC-4 (negative):** Given <invalid input or failure>, when ..., then ...

## Implementation notes
- Modules: <files to create or change>
- Signatures: <function names and types>
- Constraints: pure functions; time is a parameter (no Date.now() or new Date() without an argument in src/domain); user text via textContent only.

## Test notes
- <specific case with concrete values, including boundaries, for example "now equals validUntil exactly">

## Edge cases
- <case>: <expected behavior>

## Out of scope
- <what this story does not do>

## Dependencies
- <other stories or modules, or "None">

## Definition of done
- [ ] Each AC has at least one test
- [ ] Tests written first and seen failing
- [ ] `npm run typecheck`, `npm test`, `npm run build` pass

Part of #<parent number>
```
