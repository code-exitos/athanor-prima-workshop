# Personas template

Copy this structure into `docs/context/business/personas.md`. Keep each persona short. Every claim ends with `(source: <file>)` or `(assumption)`.

```markdown
---
title: Personas
status: Draft
owner: <git config user.name>
last_updated: <YYYY-MM-DD>
---

# Personas

## Purpose and scope
<2 to 3 sentences: who we build for, and what this document is used for.>

## Persona summary
| Persona | Role | Main goal | Main frustration |
| --- | --- | --- | --- |
| <name> | <role> | <goal> | <frustration> |

## <Persona name>, <role>
- **Goals:** <list> (source: ...)
- **Frustrations:** <list> (source: ...)
- **Context of use:** <device, connectivity, environment, time pressure> (source: ...)
- **Key behaviors:** <list> (source: ...)
- **What success looks like:** <one or two sentences> (source: ...)
- **Evidence:** <file paths and what each says>

<Repeat the block for each persona. At most 3.>

## Anti-personas and out of scope
<Who we do NOT design for, and why.>

## Conflicts between personas and how to handle them
| Conflict | Who disagrees | Proposed handling | Status |
| --- | --- | --- | --- |
| <e.g. typed code vs QR> | <personas> | <proposal> | Open / Decided by <who>, <date> |

## Open questions and assumptions
- **Open question:** <question> (raised from <file>)
- **Assumption:** <statement>. Decided by <who>, <date>.

## Sources
- <file path>
```
