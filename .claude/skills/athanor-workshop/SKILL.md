---
name: athanor-workshop
description: Workshop skill for the Athanor Prima demo. Use when the user says "Use the Athanor workshop skill to draft personas", "Use the Athanor workshop skill to spec a feature", "Use the Athanor workshop skill to work and review", or "Run the workshop review". Three short modes, each about 2 to 3 minutes.
---

# Athanor workshop skill

**WORKSHOP EDITION. Placeholder draft; to be replaced with the condensed skill.**

Pick the mode that matches the request. Keep each mode to 2 to 3 minutes. Be brief. Never invent facts: if a fact is not in the docs, say so and put it in "Open questions".

## Mode 1: Draft personas

Trigger: "Use the Athanor workshop skill to draft personas".

1. Read every file in `docs/discovery/` and the approved business docs in `docs/context/business/`.
2. Ask at most 2 clarifying questions, and only if the docs cannot answer them. Wait for the answers.
3. Write `docs/context/business/personas.md`:
   - Front matter: `title`, `status: Draft`, `owner`, `last_updated`.
   - At most 3 personas. Each has: role, goals, frustrations, how they use the product.
   - Use only facts from the docs. No invented names, ages, or quotes.
   - End with an "Open questions" section.
4. Tell the user the file is a Draft and a human must approve it. Do not set `status: Approved`.

## Mode 2: Spec a feature

Trigger: "Use the Athanor workshop skill to spec a feature".

1. Read all files in `docs/context/`, `docs/discovery/`, and `docs/adr/` if present.
2. Propose, in chat only:
   - One Feature issue (title, goal, scope, out of scope).
   - At most 3 User Story sub-issues. Each has acceptance criteria in Given/When/Then form.
3. Name the single biggest unresolved decision. Ask the user to answer it. Wait.
4. Update the proposal with the answer. Ask for approval.
5. Only after the user approves, create the issues with the `gh` CLI:
   - Create labels `feature` and `user-story` if they are missing.
   - Create the Feature issue first.
   - Create each story and link it to the parent. Use the sub-issues API if it is available. If not, write "Parent: #<number>" in the story body.
6. Print the issue URLs.

## Mode 3: Work and review

Trigger: "Use the Athanor workshop skill to work and review" or "Run the workshop review".

1. Ask which issue to build if it is not clear. Create a feature branch `feat/<issue>-<slug>`.
2. Write failing tests first. Run `npm test` and show the failures.
3. Implement the smallest change that makes the tests pass. Keep functions small and pure. Pass time in as a parameter.
4. Run `npm run typecheck` and `npm test`. Show the results.
5. Do one review pass of your own diff. Report the top 3 findings, each with a severity (High, Medium, Low) and a file reference. Cover security, correctness, and missing tests.
6. Do not open a pull request. Stop and let the user decide.
