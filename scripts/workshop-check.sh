#!/usr/bin/env bash
# Workshop setup check. Run it once after you open your Codespace:  bash scripts/workshop-check.sh
# Prints a check mark or a cross per check, with the exact fix, and exits non-zero on failure.
# Works in Codespaces, macOS, Linux and Git Bash.

# HTTPS clone URL of the facilitator's template repo.
# Update this if the template repo is renamed or moved.
WORKSHOP_UPSTREAM="https://github.com/code-exitos/athanor-prima-workshop.git"
# Older names of the same repo (GitHub redirects renamed repos, so origin may show either one).
WORKSHOP_UPSTREAM_ALIASES="code-exitos/athanor-prima-demo"

FAILED=0
ok()   { printf '✔ %s\n' "$1"; }
bad()  { printf '✘ %s\n' "$1"; shift; for line in "$@"; do printf '    %s\n' "$line"; done; FAILED=1; }
note() { printf '  %s\n' "$1"; }

# "https://github.com/o/r.git", "git@github.com:o/r.git", ... -> "o/r" (lower case)
to_slug() {
  printf '%s' "$1" | sed -E 's#^(https?://([^@/]+@)?|ssh://git@|git@)github\.com[:/]##; s#\.git$##; s#/$##' | tr '[:upper:]' '[:lower:]'
}

# 1. Git repo and fetch ---------------------------------------------------------------
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  bad "Not inside a git repository." "cd into your repo folder (for example: cd /workspaces/prima-access)"
  exit 1
fi
ORIGIN_URL=$(git remote get-url origin 2>/dev/null)
if [ -z "$ORIGIN_URL" ]; then
  bad "No 'origin' remote." "Open your own copy of the template in a Codespace (see README step 4)."
  exit 1
fi
if git fetch origin --prune >/dev/null 2>&1; then
  ok "Git repo found and 'git fetch origin' works"
else
  bad "'git fetch origin' failed." "Check your network, then run: git fetch origin --prune"
fi

# 2. Whose repo is this? --------------------------------------------------------------
SLUG=$(to_slug "$ORIGIN_URL")
OWNER=${SLUG%%/*}
UPSTREAM_SLUG=$(to_slug "$WORKSHOP_UPSTREAM")
IS_UPSTREAM=0
[ "$SLUG" = "$UPSTREAM_SLUG" ] && IS_UPSTREAM=1
for alias in $WORKSHOP_UPSTREAM_ALIASES; do
  [ "$SLUG" = "$(printf '%s' "$alias" | tr '[:upper:]' '[:lower:]')" ] && IS_UPSTREAM=1
done
if [ "$IS_UPSTREAM" = 1 ]; then
  bad "You opened the facilitator's repo ($SLUG), not your own copy." \
      "Nothing was changed. Create your own copy first:" \
      "1. Open ${WORKSHOP_UPSTREAM%.git} in your browser." \
      "2. Click 'Use this template' > 'Create a new repository'." \
      "3. Owner = your account, Private, and tick 'Include all branches'." \
      "4. Open that new repo in a Codespace and run this script again."
  exit 1
fi

if ! command -v gh >/dev/null 2>&1; then
  bad "GitHub CLI (gh) is not installed." "Install it from https://cli.github.com, then run: gh auth login"
  exit 1
fi
if ! gh auth status >/dev/null 2>&1; then
  bad "gh is not logged in." "Run: gh auth login"
  exit 1
fi
LOGIN=$(gh api user -q .login 2>/dev/null)
[ -z "$LOGIN" ] && LOGIN=${GITHUB_USER:-}
OWNER_OK=0
if [ -n "$LOGIN" ] && [ "$(printf '%s' "$LOGIN" | tr '[:upper:]' '[:lower:]')" = "$OWNER" ]; then
  OWNER_OK=1
elif gh api user/orgs -q '.[].login' 2>/dev/null | tr '[:upper:]' '[:lower:]' | grep -qx "$OWNER"; then
  OWNER_OK=1
fi
if [ "$OWNER_OK" = 1 ]; then
  ok "gh is logged in as ${LOGIN:-unknown} and owns $SLUG"
else
  bad "Repo owner '$OWNER' is not your account (${LOGIN:-unknown})." \
      "Open your own copy of the template, not someone else's repo."
  exit 1
fi

# 3. Branches (self-heal when 'Include all branches' was skipped) ---------------------
# Safe: this only runs after check 2, so it can never push to the facilitator's repo.
ADDED_REMOTE=0
for branch in checkpoint-1 checkpoint-2; do
  if git rev-parse --verify -q "refs/remotes/origin/$branch" >/dev/null; then
    ok "Branch $branch exists on origin"
    continue
  fi
  note "Branch $branch is missing. You probably skipped 'Include all branches'. Repairing..."
  if ! git remote get-url workshop >/dev/null 2>&1; then
    git remote add workshop "$WORKSHOP_UPSTREAM" && ADDED_REMOTE=1
  fi
  if git fetch workshop "$branch" >/dev/null 2>&1 && git push origin "FETCH_HEAD:refs/heads/$branch" >/dev/null 2>&1; then
    git fetch origin --prune >/dev/null 2>&1
  fi
  if git rev-parse --verify -q "refs/remotes/origin/$branch" >/dev/null; then
    ok "Branch $branch restored on origin"
  else
    bad "Could not restore $branch. Run these by hand:" \
        "git remote add workshop $WORKSHOP_UPSTREAM" \
        "git fetch workshop $branch" \
        "git push origin FETCH_HEAD:refs/heads/$branch" \
        "git fetch origin"
  fi
done
# Remove the helper remote so 'git switch <branch>' is not ambiguous between two remotes.
[ "$ADDED_REMOTE" = 1 ] && git remote remove workshop >/dev/null 2>&1
# Make sure local branches exist so 'git switch' always works.
for branch in checkpoint-1 checkpoint-2; do
  if git rev-parse --verify -q "refs/remotes/origin/$branch" >/dev/null && ! git rev-parse --verify -q "refs/heads/$branch" >/dev/null; then
    git branch --track "$branch" "origin/$branch" >/dev/null 2>&1
  fi
done

# 4. Issues enabled -------------------------------------------------------------------
ISSUES=$(gh repo view "$SLUG" --json hasIssuesEnabled -q .hasIssuesEnabled 2>/dev/null)
if [ "$ISSUES" = "false" ]; then
  gh repo edit "$SLUG" --enable-issues >/dev/null 2>&1
  ISSUES=$(gh repo view "$SLUG" --json hasIssuesEnabled -q .hasIssuesEnabled 2>/dev/null)
fi
if [ "$ISSUES" = "true" ]; then
  ok "Issues are enabled on $SLUG"
else
  bad "Issues are not enabled on $SLUG." \
      "On github.com open your repo > Settings > General > Features, and tick 'Issues'."
fi

# 5. Tools (report only) --------------------------------------------------------------
if command -v node >/dev/null 2>&1 && [ "$(node -p 'process.versions.node.split(".")[0]')" -ge 20 ] 2>/dev/null; then
  ok "Node $(node -v) is installed (20 or newer)"
else
  bad "Node 20 or newer is required." "Install from https://nodejs.org (Codespaces already has it)."
fi
if command -v claude >/dev/null 2>&1; then
  ok "Claude Code is installed"
else
  bad "Claude Code is not installed." "Run: npm install -g @anthropic-ai/claude-code"
fi

# 6. Summary --------------------------------------------------------------------------
echo
if [ "$FAILED" = 0 ]; then
  CURRENT=$(git branch --show-current)
  echo "Ready. You are on branch '${CURRENT:-unknown}'. Type 'claude', then:"
  if [ "$CURRENT" = "checkpoint-2" ]; then
    echo '  Use the Athanor workshop skill to spec the feature "Guard verifies a pass from the QR link".'
  else
    echo '  Use the Athanor workshop skill to draft the personas document.'
  fi
  exit 0
fi
echo "Not ready. Fix the items marked ✘ above, then run this script again."
exit 1
