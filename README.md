# Athanor Prima Workshop: Neighborhood Access

A 45-minute hands-on workshop. You use Claude Code along with a trimmed down version of the Athanor Method, a context-aware spec-driven SDLC meta-framework to build part of a small product, **Neighborhood Access**: visitor passes for a gated community.

A resident creates a pass. The app signs it and shows a QR code that holds a link. A guard opens the link and sees a full-screen green **ACCESS GRANTED** or red **ACCESS DENIED**. There is no backend.

> **Demo data notice:** all data and keys in this repo are demo data and demo keys, not for production. Names, units, the blocklist and the signing key pair are fake. Never put real personal data or real keys in this repo.

## Quick start

1. Open <https://github.com/code-exitos/athanor-prima-workshop> and sign in with a **personal** GitHub account (not an employer-managed one).
2. Click **Use this template** → **Create a new repository**.
3. Set **Owner** to your account, name it `prima-access`, choose **Private**, and **tick "Include all branches."** Click **Create repository**.
4. In your new repo, click **Code → Codespaces → Create codespace on checkpoint-1**. Wait 1 to 2 minutes.
5. In the terminal run `bash scripts/workshop-check.sh` and fix any ✘ it shows. Then type `claude` and log in with your Claude account.
6. Type the three prompts, in order:
   1. `Use the Athanor workshop skill to draft the personas document.`
   2. Commit your personas (`git add -A && git commit -m "docs: personas"`), run `git switch checkpoint-2`, then type: `Use the Athanor workshop skill to spec the feature "Guard verifies a pass from the QR link".`
   3. `Use the Athanor workshop skill to work the feature "Guard verifies a pass from the QR link".`
7. To see the app: `npm install && npm run dev`, then click **Open in Browser** (Ports tab → globe icon if you missed the popup).
8. When you finish, delete your codespace at <https://github.com/codespaces>.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| No `checkpoint-2` branch | You skipped "Include all branches". Run `bash scripts/workshop-check.sh`. It restores the branch. |
| `gh` is not logged in | Run `gh auth login` and follow the prompts. |
| "Blocked request. This host is not allowed" page | Open the app from the **Ports** tab (globe icon), not by typing the address. The dev server allows `*.app.github.dev` only. |
| No browser popup | Open the **Ports** tab, find port 5173, and click the globe icon. |
| Codespace is blocked or out of free hours | Use a personal account, check <https://github.com/settings/billing>, or use **Running locally** below. |
| Script says you opened the facilitator's repo | Create your own copy with **Use this template** (steps 1 to 3). |
| Issues are disabled | Your repo → Settings → General → Features → tick **Issues**. |

## Running locally (fallback)

Needs Git, Node 20 or newer, and a GitHub account. Replace `YOUR-USER` with your GitHub user name. Do these steps after you create your own copy (quick start steps 1 to 3).

**Mac or Linux (Terminal) and Windows (Git Bash):**

```bash
git clone https://github.com/YOUR-USER/prima-access.git
cd prima-access
git fetch --all
git switch checkpoint-2
node --version
npm install -g @anthropic-ai/claude-code
gh auth login
npm install
npm run dev
```

On Windows you can also use PowerShell with the same commands. Install Git, Node and the GitHub CLI first (`winget install Git.Git OpenJS.NodeJS.LTS GitHub.cli`). On Mac you can use `brew install node gh`. Start on `checkpoint-1` (`git switch checkpoint-1`) for the first prompt. Run `bash scripts/workshop-check.sh` before you type `claude`. Open <http://localhost:5173>.

## Branches

- `checkpoint-1` (default): discovery packet and two approved docs. No app code. You write the personas here.
- `checkpoint-2`: all context docs approved and the app built, except guard verification (feature F-03). You spec and build it here.

## Workshop infrastructure

The files `.devcontainer/`, `.claude/`, `CLAUDE.md` and `scripts/workshop-check.sh` are **workshop infrastructure**. They set up GitHub Codespaces, the Claude Code skills and the setup check. They are not part of the product.

The skills are a workshop edition: a condensed subset of a larger method, for workshop use only.

## Layout

- `docs/discovery/`: what the client told us.
- `docs/context/`: approved business, design and engineering context.
- `docs/adr/`: architecture decisions.
- `.claude/skills/`: `athanor-context-doc`, `athanor-spec-issue`, `athanor-work-review`.

## Facilitator note

- The repo must be **public** and marked as a template (Settings → General → Template repository).
- `checkpoint-1` must be the default branch.
- `WORKSHOP_UPSTREAM` in `scripts/workshop-check.sh` must match this repo's URL. Update it if the repo is renamed.
- Do a timed dry run on a fresh personal account before the session.

## License

See [LICENSE.md](LICENSE.md). All rights reserved; visible for educational purposes and personal review only.
