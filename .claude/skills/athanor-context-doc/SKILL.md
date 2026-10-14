---
name: athanor-context-doc
description: Co-create a context document with the user. Use when the user says "help me draft the user personas document", "draft the personas", "create a context document", or "use the Athanor workshop skill to draft personas". Workshop edition supports personas only. Do NOT use to write issues, code, or any other document type.
---

WORKSHOP EDITION: a condensed subset of a larger method. For workshop use only.

# Co-create the personas document

Goal: a Draft `.athanor/context/business/personas.md`, built together with the user in about 10 minutes. Never write the whole document in one shot. Template: [personas.md](personas.md), the same format the full Athanor method uses. ID codes (P-1, J-1, ...) follow [context-doc-coding-scheme.md](context-doc-coding-scheme.md). Use the template headings exactly; do not add or rename sections.

Rules for this skill:
- Ask at most 3 questions per round and at most 3 rounds. For each question, say why you ask and give a recommended answer from the sources, so the user can reply "yes".
- Offer once, at the start of the question rounds: "Say **accept all** and I will take every recommendation as a labeled assumption."
- Cite a source file for every claim: `(source: <path>)` or `(assumption)`.
- A skipped question becomes a labeled assumption that takes your recommendation (who decided, when). The document has no open questions.

## Steps

### 0. Preflight
Read every file in `.athanor/docs/discovery/` and every doc under `.athanor/context/`. List each doc with its `Status` (front matter line `Status: Draft | Under Review | Approved`). Then find the next document yourself. The business sequence, in order, is:

problem-statement → vision → personas → journeys → features → user-stories (all in `.athanor/context/business/`)

The **next** document is the first one in that sequence that is missing or not Approved. Do not assume it is personas.
- If the next document is personas, continue with this skill.
- If personas is Approved, say so and offer to review or refine it. Never overwrite without consent.
- If an earlier document (problem statement or vision) is missing or Draft, stop and say which one. Workshop edition cannot draft it.
- If the user asks for another document type, say it is outside the workshop edition. Name the next document and say it is out of scope here.

### 1. Orient (teach)
Say what you are about to make, why, and how it feeds the next step. Show the sequence from step 0, with ✔ on each Approved doc, **bold** on the next one, and no mark on the rest. Example when only the first two are Approved:

problem statement ✔ → vision ✔ → **personas** → journeys → features → user stories

Explain in 3 sentences: personas are the people we build for; they come before journeys and stories so that every story names a real user; later documents refer to them by name. Then show the template sections in a table, one line of purpose each (read them from the template).

### 2. Evidence pass
Summarize what `.athanor/docs/discovery/*` already says about the people involved, with file references. Propose 2 to 3 candidate personas. **Question round 1:** confirm or adjust the list. Remind the user they can say "accept all".

### 3. Question rounds
At most 3 rounds of at most 3 questions. Cover: goals and frustrations per persona; context of use (device, environment); where personas conflict; who is out of scope.

### 4. Proactive suggestions
Flag conflicts and gaps in the sources and propose how to handle each:
- typed code versus QR code (who wants what);
- "valid until" with no statement about the end date;
- the single mention of domestic staff;
- who may revoke a pass.
Suggest at least one anti-persona. Resolve each flag with the user now: propose the recommended option (the easy or logical one) with its consequence, and record the result in the persona it affects (Pain Points, Behaviors or Constraints). Do not leave open questions in the document.

### 5. Draft
Fill the template. Code personas `P-1`, `P-2`, ... in order. Set **Confidence** to `Proto-persona` (built from discovery notes, not validated). Write `none drafted yet` under Related Journeys. Cite sources inline as `(source: <path>)` or `(assumption)`. Drop the HTML comments from the saved text. Show the full document in chat and ask what to change or whether to approve. Default: at most 2 revision rounds, more if the user wants.

### 6. Save
After the user agrees, write `.athanor/context/business/personas.md` with the front matter `Status: Draft` (no other front matter keys: the Athanor format has one). Set `Status: Approved` only after the user says explicitly that they approve. Offer to run `git add` and `git commit` (message: `docs: add personas`). Never push.

### 7. Wrap up
Summarize the decisions and assumptions, and what this unlocks next. Say: "To go on, commit this file, run `git switch checkpoint-2`, then ask me: lets spec the issues for feature 3." Note that checkpoint-2 already has its own approved personas, so this step was practice.
