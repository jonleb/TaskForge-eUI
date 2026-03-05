# CR-23: User Search & Layout Alignment — Story Map

## Reference

- Change Request: [CR-23-User-Search-Alignment.md](./CR-23-User-Search-Alignment.md)
- Branch: `CR-23-User-Search-Alignment`
- Reference page: Tickets (`/screen/tickets`) — the target layout pattern

## Stories

| # | Story | Scope | Depends on |
|---|-------|-------|------------|
| 1 | Backend — role filter param | Mock server | — |
| 2 | Two-column layout & collapsible filter sidebar | Frontend template + TS | — |
| 3 | Filter chips & clear-all | Frontend TS + template | 2 |
| 4 | Sort controls in results header | Frontend TS + template | 2 |
| 5 | Paginator & loading state alignment | Frontend template + TS | 2 |
| 6 | Translations (EN + FR) | i18n JSON files | 2, 3, 4 |
| 7 | Test updates | Frontend spec | 2, 3, 4, 5 |

## Implementation order

Stories 1 and 2 can start in parallel. Story 2 is the structural foundation — stories 3, 4, 5 build on it. Story 6 adds translations once the keys are known. Story 7 updates the spec file last.
