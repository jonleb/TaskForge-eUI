# STORY-002: Backend — Bootstrap Service (post-creation hook)

## Goal

Create a reusable `bootstrapProject(db, projectId)` function that provisions default workflows and a maintenance epic, then integrate it into `POST /api/projects` so every new project is automatically bootstrapped.

## Existing Code

- `mock/app/routes/project_routes.js` — `POST /api/projects` creates a project and returns 201. No post-creation side effects.
- `mock/db/db.json` — now has `workflows` and `backlog-items` collections (from STORY-001).
- Pattern reference: `generateProjectKey()` is a module-level helper in `project_routes.js`.

## Implementation Plan

### 1. Create `mock/app/services/bootstrap.js`

Extract bootstrap logic into a dedicated module for testability and reuse.

```javascript
/**
 * bootstrapProject(db, projectId)
 *
 * Provisions default agile assets for a project:
 * - 4 workflows (STORY, BUG, TASK, EPIC)
 * - 1 maintenance epic in backlog-items
 *
 * Idempotent: skips if workflows/backlog already exist for the project.
 * Returns: { workflows: number, backlogItems: number, skipped: boolean }
 */
```

#### Workflow templates

| Ticket Type | Statuses | Transitions |
|-------------|----------|-------------|
| STORY | TO_DO, IN_PROGRESS, IN_REVIEW, DONE | Standard 4-step |
| BUG | TO_DO, IN_PROGRESS, IN_REVIEW, DONE | Standard 4-step |
| TASK | TO_DO, IN_PROGRESS, IN_REVIEW, DONE | Standard 4-step |
| EPIC | TO_DO, IN_PROGRESS, DONE | 3-step (no review) |

#### Idempotency check

Before creating, check if `workflows` collection already has records for this `projectId`. If yes, return `{ skipped: true }`.

#### ID generation

Use the same auto-increment pattern as other collections:
```javascript
const maxId = collection.value().reduce((max, r) => Math.max(max, parseInt(r.id, 10) || 0), 0);
```

### 2. Integrate into `POST /api/projects`

After `db.get('projects').push(newProject).write()`:

```javascript
const bootstrap = require('../services/bootstrap');

// ... inside POST handler, after project creation:
let bootstrapWarning = null;
try {
    bootstrap.bootstrapProject(db, newProject.id);
} catch (err) {
    bootstrapWarning = 'Project created but agile bootstrap failed. Default workflows may be missing.';
}

const response = { ...newProject };
if (bootstrapWarning) {
    response.bootstrapWarning = bootstrapWarning;
}
return res.status(201).json(response);
```

Key design decision: bootstrap failure does NOT fail project creation. The project is always returned with 201. A `bootstrapWarning` field signals partial failure.

### 3. Unit tests for bootstrap service

Create `mock/app/services/bootstrap.test.js`:

| # | Test | Expected |
|---|------|----------|
| 1 | Creates 4 workflows for a new project | 4 records in `workflows` |
| 2 | Creates 1 maintenance epic for a new project | 1 record in `backlog-items` |
| 3 | STORY workflow has 4 statuses with review | Correct statuses and transitions |
| 4 | EPIC workflow has 3 statuses without review | Correct statuses and transitions |
| 5 | Idempotent — skips if workflows already exist | `skipped: true`, no duplicates |
| 6 | Generated IDs are unique and auto-incremented | IDs are sequential strings |

### 4. Integration tests for POST /api/projects (bootstrap side effects)

Add to existing `project_routes.test.js`:

| # | Test | Expected |
|---|------|----------|
| 1 | New project has 4 workflows after creation | GET workflows returns 4 records |
| 2 | New project has 1 backlog item after creation | GET backlog returns 1 record |
| 3 | Response does not include `bootstrapWarning` on success | Field absent |

## Files Changed

| File | Change |
|------|--------|
| `mock/app/services/bootstrap.js` | New — `bootstrapProject()` function |
| `mock/app/services/bootstrap.test.js` | New — 6 unit tests |
| `mock/app/routes/project_routes.js` | Integrate bootstrap call in `POST /api/projects` |
| `mock/app/routes/project_routes.test.js` | Add 3 integration tests for bootstrap side effects |

## Acceptance Criteria

- [ ] `bootstrapProject()` creates 4 workflows (STORY, BUG, TASK, EPIC) for a project
- [ ] `bootstrapProject()` creates 1 maintenance epic in `backlog-items`
- [ ] Bootstrap is idempotent (no duplicates on retry)
- [ ] `POST /api/projects` triggers bootstrap automatically
- [ ] Project creation succeeds even if bootstrap throws (graceful degradation)
- [ ] `bootstrapWarning` field present in response only on bootstrap failure
- [ ] All unit tests pass (`mock/app/services/bootstrap.test.js`)
- [ ] All integration tests pass (`npm run test:mock`)
- [ ] DB restored after test run (`git checkout mock/db/db.json`)
