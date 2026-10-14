---
name: athanor-work-review
description: Implement a whole Feature (parent issue plus all its sub-issues) test-first, review it, and open a PR in the user's own repo. Use when the user says "work on the issue for feature 3", "work on feature 3", "work the feature", "implement the feature", "work issue #N", or "use the Athanor workshop skill to work ...". Do NOT use to write specs (use athanor-spec-issue) or when no issues exist yet.
---

WORKSHOP EDITION: a condensed subset of a larger method. For workshop use only.

# Work a feature, review it, open the PR

Goal: all stories of one Feature built test-first on one branch, reviewed once or twice, then a PR the user can merge. Review lenses: [review-checklist.md](review-checklist.md).

Rules for this skill:
- Pin the target: `REPO=<owner>/<name>` from `git remote get-url origin`; `--repo "$REPO"` on every `gh` command; explicit `--base` and `--head` on the PR. Owner must equal `gh api user -q .login` or an org the user belongs to; otherwise STOP and tell the user to create their own copy from the template.
- The approval in step 2 covers local commits only. The push and the PR need a separate yes in step 7, after the user has seen the title, body and review result.
- Never close issues (the merge does). Never merge the PR. Never force-push.
- If an acceptance criterion is ambiguous or conflicts with a context doc or ADR: STOP, show the conflict, ask. Log the user's decision as an assumption comment on the issue.

## Steps

### 0. Preflight
- `gh auth status`; resolve `REPO`; owner check.
- Working tree must be clean (`git status --short`). If not, ask before stashing.
- `git fetch origin`. Base branch is `checkpoint-2` unless the user names another. If `origin/checkpoint-2` is missing, tell the user to run `bash scripts/workshop-check.sh`.
- `npm ci` (fall back to `npm install`), then `npm run typecheck && npm test`. If the baseline is not green, stop and explain.

### 1. Locate and read
"Feature 3" means F-03 in `docs/context/business/features.md`, not GitHub issue #3: find the Feature issue by its title or `F-03`. Use an issue number only when the user writes one with `#`. Find the parent by number or keywords (`gh issue view <n> --repo "$REPO"`, or `gh issue list --repo "$REPO" --search ...`). Fetch sub-issues: `gh api repos/$REPO/issues/<n>/sub_issues`; if that fails, parse the task list in the parent body. If there are none, stop and suggest the spec skill. Read the parent, every story, all `docs/context/` docs, `docs/adr/` and `CLAUDE.md`.

### 2. Plan and approval
Present: branch name `feature/<n>-<slug>`; story order (by dependency); per story the files to touch, tests to write, and risks. Say that all stories are worked before any PR, and that you will ask again before pushing. Ask for go-ahead to start building.

### 3. Branch
`git switch -c feature/<n>-<slug> origin/<base>`.

### 4. Per story, in order
1. Restate its acceptance criteria (AC-1, AC-2, ...).
2. Write failing tests first, named or commented with their AC id. Run them and SHOW the red output. Confirm they fail for the right reason (missing behavior, not a typo).
3. Implement the minimum. Run tests (green), `npm run typecheck`, then a small refactor.
4. Commit: `feat(<scope>): <summary> (#<story>)`.
5. Comment on the story: `gh issue comment <story> --repo "$REPO" --body "<AC status> <commit sha>"`. Do NOT close it.
6. Update the running progress table in chat (story, AC done/total, commit).

### 5. Gate
Only after ALL sub-issues are done: run `npm run typecheck`, `npm test`, `npm run build`. Print an AC-to-test traceability table (AC id, test name, file). Any AC without a test goes back to step 4.

### 6. Internal review
Apply `review-checklist.md` to `git diff origin/<base>...HEAD`. Report findings, top first: severity (Critical, High, Medium, Low), `file:line`, why it matters, suggested fix. Fix Critical and High (and cheap Mediums the user agrees to) with new tests; re-run the gate. At most 2 rounds. Leftover Medium and Low items go into the PR description.

### 7. Open the PR
1. Show the diff summary, review result, PR title, body preview, and target (`--repo`, `--base`, `--head`). Ask for an explicit yes before pushing.
2. `git push -u origin <branch>`, then `gh pr create --repo "$REPO" --base <base> --head <branch> --title "<title>" --body-file <file>`.
3. Body: Summary; `Closes #<parent>` and `Closes #<story>` per story; AC traceability table; test results; review summary and finding status; decisions and assumptions; how to demo (`npm run dev`, route, steps).
4. Say: GitHub auto-closes issues only when a PR merges into the DEFAULT branch. In workshop copies the default is `checkpoint-1` and this PR targets `checkpoint-2`, so offer to close the issues by hand after the user merges.
5. Never merge. Print the PR URL, then `gh pr checks <n> --repo "$REPO"`.

### 8. Wrap up
Tell the user how to demo the feature (`npm run dev`, open the verify link) and what remains.
