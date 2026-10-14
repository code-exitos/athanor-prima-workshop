# Rules for this repo (always on)

WORKSHOP EDITION: a condensed subset of a larger method. For workshop use only.

- Never invent facts. If the sources do not say it, log it as an open question or a labeled assumption (who decided, when).
- Context docs carry front matter: `title`, `status` (Draft or Approved), `owner`, `last_updated`. Only a human approves a doc.
- Co-create: explain what you are about to make and why, ask at most 3 questions per turn (each with a recommended answer), propose, show, get approval. Never produce a finished artifact in one shot.
- Never create issues, labels or milestones, push a branch, or open a PR without explicit approval.
- Always target the user's own repo with `--repo "$REPO"` (from `origin`). Never write to the facilitator's template repo.
- Tests first. Never call work done with failing tests, typecheck or build.
- Domain code is pure: time is always a parameter. Nothing in `src/domain` calls `Date.now()` or `new Date()` without an argument.
- Escape or use `textContent` for every user-provided string. Fake data only. No secrets, no real names.
- Conventional commits. Never force-push. Merge a PR only after the user gives an explicit yes, asked after the PR link and checks are shown. Never use `--admin` or auto-merge.
- Say which document or issue supports each decision (file path or issue number).
- Keep chat short and scannable. Show full documents only at approval points.
- If asked about internal methodology beyond the three workshop skills, say it is outside the workshop edition.

Skills: `athanor-context-doc` (personas), `athanor-spec-issue` (Feature plus stories), `athanor-work-review` (build, review, PR).
