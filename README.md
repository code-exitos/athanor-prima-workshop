# Athanor Prima Workshop: Neighborhood Access

A hands-on workshop repo. You will use a spec-driven, AI-assisted method to build part of a small product, **Neighborhood Access**: visitor passes for a gated community (*Residencial Los Pinos*).

A resident creates a pass. The app signs it and shows a QR code that holds a link. A guard opens the link and sees a full-screen green **ACCESS GRANTED** or red **ACCESS DENIED**. There is no backend.

## Branches

- `checkpoint-1` (default): discovery material and two approved docs. No code. You start here and write the personas.
- `checkpoint-2`: all context docs approved and the app built, except guard verification. You spec and build that feature.

## Demo data notice

**All data and keys in this repo are demo data and demo keys, not for production.** Names, units, the blocklist, and the signing key pair are fake. Never put real personal data or real keys in this repo.

## Workshop infrastructure

The folders `.devcontainer/` and `.claude/` are **workshop infrastructure**. They set up GitHub Codespaces and the Claude Code skill used in the session. They are not part of the product.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm test           # runs once and exits
npm run build
```

Routes: `#/` resident form, `#/log` entry log, `#/verify?p=<token>` verify page (not built yet on this branch).

## Getting started

1. Click **Use this template**, then **Create a new repository**.
2. Open your new repo in a GitHub Codespace.
3. In the terminal, run `claude` and sign in.
4. Ask: `Use the Athanor workshop skill to draft personas`.

## Layout

- `docs/discovery/`: what the client told us.
- `docs/context/`: approved business, design, and engineering context.
- `.claude/skills/athanor-workshop/`: the workshop skill (placeholder).
