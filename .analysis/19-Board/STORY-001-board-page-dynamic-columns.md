# STORY-001 — Board Page with Dynamic Columns

## Goal
Create the board page component with workflow-driven columns, ticket cards, and a sprint filter dropdown.

## Acceptance Criteria
- [ ] New route `board` under `:projectId` children, lazy-loaded.
- [ ] `BoardComponent` uses `eui-page` > `eui-page-header` > `eui-page-content` structure.
- [ ] On init, loads workflows via `ProjectService.getWorkflows(projectId)` and backlog via `ProjectService.getBacklog(projectId, { _limit: 1000 })`.
- [ ] Computes unique ordered columns from the union of all workflow statuses (preserving order: first occurrence wins).
- [ ] Each column displays its status label (formatted: `TO_DO` → `To Do`) and a ticket count badge.
- [ ] Tickets are rendered as cards within their status column, showing: ticket number (`#N`), type badge (`eui-chip`), title, priority, assignee name.
- [ ] Sprint filter dropdown in `eui-page-header-action-items`: "All sprints" (default, shows all tickets) + one option per non-CLOSED sprint. Filtering re-groups tickets by status.
- [ ] Loading state uses `eui-loader`. Error state shows retry button.
- [ ] Empty columns show a subtle "No tickets" placeholder.
- [ ] Columns scroll independently when content overflows.

## Technical Notes
- Lazy-load: `loadComponent: () => import('./board/board.component').then(m => m.BoardComponent)`
- Column order: iterate all workflows, collect statuses in insertion order (Set), convert to array.
- Sprint filter: `ProjectService.getSprints(projectId)` to populate dropdown. Filter `allTickets` by `sprint_id` when a sprint is selected.
- Ticket assignee name: load `ProjectService.getProjectMembers(projectId)` and build a `Map<userId, displayName>`.
- Format status labels: replace underscores with spaces, title-case each word.
- Use `PermissionService.hasProjectRole()` to determine `canManage` (needed by STORY-002).

## a11y
- [ ] Each column is a `<section>` with `aria-label` = status name.
- [ ] Each ticket card has `aria-label` = "Ticket #N: title".
- [ ] Sprint filter has associated `<label>`.
- [ ] `aria-live="polite"` region announces ticket count after filter change.
- [ ] Keyboard navigable: Tab through cards, Enter to navigate to ticket detail.

## eUI Components
- `eui-page`, `eui-page-header`, `eui-page-content`, `eui-page-header-action-items`
- `select[euiSelect]` for sprint filter
- `eui-chip` for type badge
- `eui-loader` for loading state
- `EuiGrowlService` for error feedback

## Files
- `src/app/features/projects/board/board.component.ts` (new)
- `src/app/features/projects/board/board.component.html` (new)
- `src/app/features/projects/board/board.component.scss` (new)
- `src/app/features/projects/board/board.component.spec.ts` (new)
- `src/app/features/projects/projects.routes.ts` (add board route)
- `src/assets/i18n/en.json` (board i18n keys)
- `src/assets/i18n/fr.json` (board i18n keys)
