# STORY-005: Backend — Key Immutability on Update

## Goal

Add a `PATCH /api/projects/:projectId` endpoint that allows SUPER_ADMIN to update project name and description but rejects any attempt to change the project key.

## Context

- STORY-001 established `POST /api/projects` with key generation and uniqueness validation.
- Keys are intended to be permanent identifiers (used in URLs, references, etc.), so they must be immutable after creation.
- The endpoint follows the same auth pattern as POST: `authMiddleware` + `requireGlobalRole('SUPER_ADMIN')`.

## Endpoint Specification

### `PATCH /api/projects/:projectId`

**Auth:** `authMiddleware` → `requireGlobalRole('SUPER_ADMIN')`

**Request body:**
```json
{ "name"?: string, "description"?: string, "key"?: string }
```

**Logic:**
1. Find project by `projectId` → 404 if not found.
2. If `key` is present in body and differs from current key (case-insensitive) → 400 `"Project key cannot be changed"`.
3. If `key` is present and matches current key → silently ignore (no error, no update).
4. If `name` is provided:
   - Trim, validate non-empty and min 2 chars → 400 if invalid.
   - Check uniqueness (case-insensitive) excluding current project → 409 if duplicate.
5. Update allowed fields: `name`, `description`, `updated_at`.
6. Return 200 with updated project.

**Response codes:**
| Code | Condition |
|------|-----------|
| 200  | Update successful |
| 400  | Key change attempted / invalid name |
| 403  | Not SUPER_ADMIN |
| 404  | Project not found |
| 409  | Duplicate name |

## Implementation

### File: `mock/app/routes/project_routes.js`

Add after the existing `POST /api/projects` handler:

```javascript
app.patch('/api/projects/:projectId', authMiddleware, requireGlobalRole('SUPER_ADMIN'), (req, res) => {
    const project = db.get('projects').find({ id: req.params.projectId }).value();
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    const { name, description, key } = req.body;

    // Key immutability check
    if (key !== undefined && key !== null && key !== '') {
        if (String(key).toUpperCase().trim() !== project.key.toUpperCase()) {
            return res.status(400).json({ message: 'Project key cannot be changed' });
        }
    }

    const updates = { updated_at: new Date().toISOString() };

    // Name validation & uniqueness
    if (name !== undefined) {
        const trimmedName = (name || '').trim();
        if (!trimmedName || trimmedName.length < 2) {
            return res.status(400).json({ message: 'Project name is required (min 2 characters)' });
        }
        const duplicate = db.get('projects')
            .find(p => p.id !== req.params.projectId && p.name.toLowerCase() === trimmedName.toLowerCase())
            .value();
        if (duplicate) {
            return res.status(409).json({ message: 'A project with this name already exists' });
        }
        updates.name = trimmedName;
    }

    // Description update
    if (description !== undefined) {
        updates.description = (description || '').trim();
    }

    db.get('projects').find({ id: req.params.projectId }).assign(updates).write();
    const updated = db.get('projects').find({ id: req.params.projectId }).value();
    return res.status(200).json(updated);
});
```

### File: `mock/app/routes/project_routes.test.js`

Add a new `describe('PATCH /api/projects/:projectId')` block with tests:

| Test | Expected |
|------|----------|
| 200: update name and description | Fields updated, key unchanged |
| 200: send same key (no error) | Silently accepted |
| 400: attempt to change key | `"Project key cannot be changed"` |
| 400: empty name | Validation error |
| 409: duplicate name on update | Conflict error |
| 404: non-existent project | Not found |
| 403: non-SUPER_ADMIN | Forbidden |
| 401: no token | Unauthorized |

## Acceptance Criteria

- [ ] Name and description can be updated via PATCH
- [ ] Key change attempt returns 400 with clear message
- [ ] Sending the same key value is silently accepted (no error)
- [ ] Duplicate name on update returns 409
- [ ] Invalid/empty name returns 400
- [ ] Non-existent project returns 404
- [ ] Non-SUPER_ADMIN gets 403
- [ ] No token gets 401
- [ ] `updated_at` is refreshed on successful update
- [ ] Integration tests cover all branches
- [ ] `npm run test:mock` passes
