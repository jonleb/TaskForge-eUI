# {BRANCH_ID} — {Feature Title}

## What this branch does

{One paragraph summarizing the feature scope, who it affects, and what capabilities it adds. Mention any bugfixes bundled in the branch.}

## Step-by-step walkthrough

{For each story/bugfix, a subsection with:}

### {N}. {Story or bugfix title} ({STORY-ID or BUG-ID})

{2–5 bullet points describing what was done, key implementation details, patterns used, and files touched.}

Files: `{path/to/file1}`, `{path/to/file2}`

{Repeat for each story/bugfix in implementation order.}

## Working method

Each story followed the same pattern:
1. **Analysis first** — story `.md` files in `.analysis/{feature-folder}/` describing the plan, eUI components, and acceptance criteria.
2. **Review** — developer reviews and approves before code.
3. **Implementation** — code changes following eUI-first component policy and a11y steering rules.
4. **Tests** — unit tests for every new component/service (vitest), integration tests for backend (Jest + supertest), e2e tests (Playwright) if applicable.
5. **Verification** — all tests pass, build passes.
6. **Commit** — one commit per story.

## Key technical decisions

{Bullet list of architectural choices, workarounds, and "why we did X instead of Y" notes. Focus on decisions that would be non-obvious to a new developer reading the code. Include eUI-specific gotchas discovered during implementation.}

- **{Decision title}**: {Explanation}.

## Git history

```
{hash} {commit message}
{hash} {commit message}
...
```

## Test summary

- Frontend: {N} unit tests (vitest) — all passing
- Backend: {N} integration tests (Jest + supertest) — all passing {if applicable}
- E2E: {N} Playwright tests — all passing {if applicable}
- Build: `npx ng build --configuration=development` — passes

---

## Prompt to reproduce this feature on a new project

Use the following prompt with an AI assistant to reproduce the full {feature name} feature on a fresh eUI Angular project that already has {list prerequisites}. Adapt project-specific names, roles, and routes as needed.

---

**Prompt:**

> {A self-contained prompt that another AI assistant could follow to reproduce the entire feature from scratch. Include:}
> - Prerequisites / existing state of the app
> - Each story in order with detailed implementation instructions
> - Backend endpoints with request/response shapes, status codes, and validation rules
> - Frontend components with eUI component names, patterns, and accessibility requirements
> - Important constraints and eUI-specific gotchas discovered during implementation
> - Test expectations (vitest for frontend, Jest+supertest for backend, Playwright for e2e)
> - Build/test commands
