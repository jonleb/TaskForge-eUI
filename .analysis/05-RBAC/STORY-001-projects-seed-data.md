# STORY-001: Mock Backend — Projects & Project Members Seed Data

## Goal

Create the `projects` and `project-members` collections in the mock DB so that project-scoped RBAC has data to work with. Also create the corresponding model files following existing patterns.

## Prerequisites

- `04-AUTH-LOGIN` branch complete (users collection with `global_role` field exists)

## Current State

- `mock/db/db.json` has a `users` collection with 80+ users, each having `role` and `global_role` fields
- No `projects` or `project-members` collections exist
- Model files follow a simple field-schema pattern (see `mock/app/models/auth-user.js`)

## Implementation Plan

### 1. Create `mock/app/models/project.js`

Field schema:
```javascript
module.exports = {
    id: '',
    key: '',          // short code, e.g. 'TF', 'DEMO', 'INFRA'
    name: '',
    description: '',
    created_by: '',   // userId of the creator
    created_at: '',
    updated_at: '',
    is_active: true,
};
```

### 2. Create `mock/app/models/project-member.js`

Field schema:
```javascript
module.exports = {
    id: '',
    projectId: '',
    userId: '',
    role: '',         // project role: PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER, REPORTER, VIEWER
    joined_at: '',
};
```

### 3. Add `projects` collection to `mock/db/db.json`

3 seed projects:

| id | key | name | created_by | is_active |
|----|-----|------|------------|-----------|
| 1 | TF | TaskForge Core | 1 (superadmin) | true |
| 2 | DEMO | Demo Project | 2 (projectadmin) | true |
| 3 | INFRA | Infrastructure | 1 (superadmin) | false |

### 4. Add `project-members` collection to `mock/db/db.json`

Seed memberships using existing non-SUPER_ADMIN active users. SUPER_ADMIN users (ids 1, 8, 14, 20) are NOT added — they bypass via global role.

**Project TF (id: 1) — TaskForge Core:**

| id | userId | username | role |
|----|--------|----------|------|
| 1 | 2 | projectadmin | PROJECT_ADMIN |
| 2 | 3 | productowner | PRODUCT_OWNER |
| 3 | 4 | developer | DEVELOPER |
| 4 | 5 | reporter | REPORTER |
| 5 | 6 | viewer | VIEWER |
| 6 | 11 | diana.brown | DEVELOPER |
| 7 | 15 | hector.davis | PROJECT_ADMIN |

**Project DEMO (id: 2) — Demo Project:**

| id | userId | username | role |
|----|--------|----------|------|
| 8 | 2 | projectadmin | PROJECT_ADMIN |
| 9 | 10 | charlie.williams | PRODUCT_OWNER |
| 10 | 17 | jack.martinez | DEVELOPER |
| 11 | 12 | eve.jones | REPORTER |
| 12 | 13 | frank.garcia | VIEWER |
| 13 | 4 | developer | REPORTER |

Note: user `4` (developer) is a DEVELOPER in project TF but a REPORTER in project DEMO — this tests different roles across projects.

**Project INFRA (id: 3) — Infrastructure (inactive):**

| id | userId | username | role |
|----|--------|----------|------|
| 14 | 15 | hector.davis | PROJECT_ADMIN |
| 15 | 16 | iris.rodriguez | PRODUCT_OWNER |
| 16 | 23 | paul.thomas | DEVELOPER |

### Design decisions

- SUPER_ADMIN users have no entries in `project-members` — they bypass membership checks at the middleware level (STORY-002)
- A user can appear in multiple projects with different roles (e.g. user 4 is DEVELOPER in TF, REPORTER in DEMO)
- A user can appear in the same project only once (one role per project)
- The inactive project (INFRA) has members for testing that inactive projects are excluded from listings

## Files to Create
- `mock/app/models/project.js`
- `mock/app/models/project-member.js`

## Files to Modify
- `mock/db/db.json` — add `projects` and `project-members` collections

## Acceptance Criteria

- [ ] `mock/db/db.json` contains 3 projects (2 active, 1 inactive)
- [ ] `mock/db/db.json` contains 16 project-member entries
- [ ] Each active project has at least one member per project role (PROJECT_ADMIN, PRODUCT_OWNER, DEVELOPER, REPORTER, VIEWER)
- [ ] At least one user appears in multiple projects with different roles
- [ ] SUPER_ADMIN users have no project-member entries
- [ ] Model files follow existing pattern (`mock/app/models/`)
- [ ] Mock server starts without errors: `npm run start-mock-server`
- [ ] All existing tests still pass: `npm run test:mock`
