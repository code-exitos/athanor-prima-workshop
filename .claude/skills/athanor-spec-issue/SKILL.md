---
name: athanor-spec-issue
description: Spec a Feature plus up to 3 User Story sub-issues in the user's own GitHub repo, co-created with the user. Use when the user says "spec the feature", "write the issues for ...", or "use the Athanor workshop skill to spec ...". Do NOT use to implement code (use athanor-work-review) or to draft personas.
---

WORKSHOP EDITION: a condensed subset of a larger method. For workshop use only.

# Spec a feature as GitHub issues

Goal: one Feature issue and at most 3 User Story sub-issues, so well written that someone else can build and test them. Templates: [issue-templates.md](issue-templates.md).

Rules for this skill:
- Ask at most 3 questions at a time. Each has a reason and a recommended answer. Offer "accept all recommendations" once.
- Cite source paths. Never invent facts; a gap is an open question or a labeled assumption (who decided, when).
- Pin the target: `REPO=<owner>/<name>` from `git remote get-url origin`. Pass `--repo "$REPO"` on every `gh` command.
- Before any write: the owner must equal `gh api user -q .login` or an org the user belongs to (`gh api user/orgs -q '.[].login'`). If not, STOP. Say: the Codespace was probably opened on the facilitator's repo; create your own copy with "Use this template" (tick "Include all branches"). Do not write anything.
- Nothing is created on GitHub until the user says an explicit yes in step 6.

## Steps

### 0. Preflight
- Every doc under `docs/context/` must have `status: Approved`. If any is not, name the missing or Draft ones, stop, and suggest `git switch checkpoint-2`.
- `gh auth status`; resolve `REPO`; apply the owner check above.
- Issues enabled: `gh repo view "$REPO" --json hasIssuesEnabled -q .hasIssuesEnabled`. If false, tell the user: Settings → General → Features → tick Issues.

### 1. Orient (teach)
In a few lines: a Feature is the outcome; a User Story sub-issue is one slice a person can build and test; specs come before code because the tests are written from them. "Well specified" means: traceable (cites docs), testable (Given/When/Then), unambiguous, sized, ordered.

### 2. Locate the feature
Find it in `docs/context/business/features.md`. Read the PRD, personas, journeys, data model, architecture, brand guidelines and `docs/adr/`. Check for duplicates: `gh issue list --repo "$REPO" --state all --search "<keywords>"`. If one exists, offer to refine it instead of creating a new one.

### 3. Decision round
List the PRD "Open questions and assumptions" that affect this feature (for example: is the end date inclusive; who can revoke; behavior with no signal; typed code versus QR; domestic staff). For each give 2 options, a recommendation, and its consequences. Batches of at most 3. Record each decision with rationale, who decided, and the date.

### 4. Metadata round
Ask for: start date and target date (defaults: today and today + 7 days), priority (high, medium, low), size (S, M, L), assignee (default `@me`). Explain labels and the milestone in one line each.

### 5. Draft everything, then show it all
Write one Feature issue plus at most 3 stories using `issue-templates.md`. Show every draft in full as rendered markdown, plus a table: title, labels, milestone, assignee, start and target dates, parent-child links, dependency order. Ask for edits or approval; iterate. Issues must be concrete, descriptive and testable. For F-03 a plausible split is: (1) token parsing and signature verification; (2) decision policy: blocklist, validity window, one-time ledger; (3) result screen and log entry. Derive the final split from the docs.

### 6. Create (only after an explicit yes)
1. Labels: ensure these exist, creating missing ones with `gh label create --repo "$REPO" <name> --color <hex>`: `feature`, `user-story`, `priority:high`, `priority:medium`, `priority:low`, `size:S`, `size:M`, `size:L`, `area:verification`, `workshop-demo`.
2. Milestone with a due date: `gh api repos/$REPO/milestones -f title="<title>" -f due_on="<YYYY-MM-DD>T23:59:59Z"` (reuse an existing milestone with the same title).
3. Create the Feature issue, then each story. Every story body has a `Part of #<N>` line. Apply labels, milestone and assignee.
4. Link each story as a sub-issue. The endpoint needs the story's numeric id, not its number:
   `ID=$(gh api repos/$REPO/issues/<story-number> -q .id)`
   `gh api repos/$REPO/issues/<parent-number>/sub_issues -X POST -F sub_issue_id=$ID`
   If this fails, fall back to a task list in the parent body (`- [ ] #<story>`) and tell the user.
5. Dates: native issue date fields exist only as an organization feature (public preview), so on a personal account use this: a `Schedule` block (start and target) at the top of every issue body, plus the milestone due date. Optional, only with user approval: if `gh project list --owner "@me"` works, offer a Projects v2 board with Start date and Target date fields. If access is missing (common with the Codespaces token), mention it as optional and move on. Do not try to repair auth in the room.

### 7. Verify and report
Re-read the created issues (`gh issue view --repo "$REPO"`) and print a table: number, URL, labels, milestone, parent-child links. Hand off: "Next: work the feature."
