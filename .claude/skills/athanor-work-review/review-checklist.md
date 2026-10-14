# Review checklist

Review the whole diff against the base branch. Report each finding as: severity, `file:line`, why it matters, suggested fix.

## Lenses

1. **Correctness and spec conformance**
   - Each acceptance criterion is met, including boundaries (equal start and end, exactly at `validUntil`, 1 ms either side).
   - The verification order is exactly: signature, blocklist (overrides everything), validity window, one-time ledger, then grant or deny with a specific reason. Every attempt is logged.
   - Reasons are specific, not generic.
2. **Security and privacy**
   - Tampered or malformed tokens are denied, never thrown at the user.
   - Signature is checked before the payload is trusted.
   - All user-provided text reaches the DOM through `textContent`. No `innerHTML` with input.
   - Blocklist matching is normalized (case, whitespace).
   - No secrets or personal data in logs, URLs, or the repo. Fake names only.
   - Errors do not leak internals.
3. **Tests**
   - Boundary, negative and error cases exist.
   - Tests would fail if the code were wrong (not only happy paths, no assertions that always pass).
   - Each AC maps to at least one test.
   - Corrupted or missing storage is handled and tested where the new code reads it.
4. **Maintainability and readability**
   - Clear names; small pure functions; time passed as a parameter; no `Date.now()` or bare `new Date()` in `src/domain`.
   - No dead code, no speculative abstractions, no duplicated logic.
   - Conventional commits, one logical change per commit.
5. **Performance and accessibility (UI)**
   - Result is shown fast on an older phone; no needless re-renders or large dependencies.
   - Result is never color alone: text plus icon. WCAG AA contrast. Large text. Touch targets at least 44px.

## Severity rubric

| Severity | Meaning | Action |
| --- | --- | --- |
| Critical | Grants access wrongly, bypasses the blocklist or signature, leaks data, or crashes the main flow | Must fix before the PR |
| High | Wrong result at a boundary, XSS risk, missing log entry, AC not met | Must fix before the PR |
| Medium | Missing test for an edge case, unclear error, maintainability issue | Fix if cheap; otherwise list in the PR |
| Low | Naming, style, minor duplication | List in the PR |
