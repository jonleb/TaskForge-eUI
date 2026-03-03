# STORY-001: Backend — Link Types Seed Data & CRUD Endpoints

## Objective

Seed default link types in `mock/db/db.json` and provide REST endpoints for link-type administration. Link types define the vocabulary of relationships (e.g., "blocks / is blocked by", "relates to / relates to", "duplicates / is duplicated by").

## Data Model

### `link_types` collection in db.json

```json
{
    "id": "1",
    "name": "BLOCKS",
    "inward": "is blocked by",
    "outward": "blocks",
    "scope": "GLOBAL",
    "created_at": "2025-01-01T00:00:00.000Z"
}
```

Fields:
- `id`: unique identifier
- `name`: machine-readable name (uppercase, unique), e.g. BLOCKS, RELATES_TO, DUPLICATES
- `inward`: human-readable label for the inverse direction ("is blocked by")
- `outward`: human-readable label for the forward direction ("blocks")
- `scope`: "GLOBAL" (available to all projects)
- `created_at`: ISO timestamp

### Seed data (4 default link types)

| name | outward | inward |
|------|---------|--------|
| BLOCKS | blocks | is blocked by |
| RELATES_TO | relates to | relates to |
| DUPLICATES | duplicates | is duplicated by |
| PARENT_OF | is parent of | is child of |

## Endpoints

### GET /api/link-types
- Returns all link types
- No auth required (read-only reference data)
- Response: `LinkType[]`

### POST /api/link-types (SUPER_ADMIN only)
- Creates a new link type
- Body: `{ name, inward, outward }`
- Validates: name format `/^[A-Z][A-Z0-9_]{0,29}$/`, uniqueness, inward/outward required
- Response: 201 with created link type
- Errors: 400 validation, 409 duplicate name

### DELETE /api/link-types/:id (SUPER_ADMIN only)
- Deletes a link type
- Checks: no existing ticket_links reference this type → 409 if in use
- Response: 204
- Errors: 404 not found, 409 in use

## Implementation Plan

1. Add `link_types` and `ticket_links` (empty) collections to `mock/db/db.json`
2. Add routes in `mock/app/routes/link_type_routes.js` (new file)
3. Register routes in `mock/server.js`
4. Write integration tests

## Unit Tests (~12)

| # | Test |
|---|------|
| 1 | GET /api/link-types returns all link types |
| 2 | GET /api/link-types returns 4 seeded types |
| 3 | POST /api/link-types creates a new type (SUPER_ADMIN) |
| 4 | POST /api/link-types rejects missing name |
| 5 | POST /api/link-types rejects invalid name format |
| 6 | POST /api/link-types rejects duplicate name (409) |
| 7 | POST /api/link-types rejects missing inward/outward |
| 8 | POST /api/link-types rejects non-SUPER_ADMIN (403) |
| 9 | DELETE /api/link-types/:id deletes a type |
| 10 | DELETE /api/link-types/:id returns 404 for unknown id |
| 11 | DELETE /api/link-types/:id returns 409 if in use |
| 12 | DELETE /api/link-types/:id rejects non-SUPER_ADMIN (403) |

## Files Modified

| File | Modification |
|------|-------------|
| `mock/db/db.json` | Add `link_types` (4 seeded) and `ticket_links` (empty) collections |
| `mock/app/routes/link_type_routes.js` | New file with GET/POST/DELETE endpoints |
| `mock/server.js` | Register link type routes |
| `mock/app/routes/link_type_routes.test.js` | New test file with ~12 tests |
