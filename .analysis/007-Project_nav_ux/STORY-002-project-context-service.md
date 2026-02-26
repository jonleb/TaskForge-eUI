# STORY-002: Frontend — Project Context Service

## Goal

Create a service that manages the currently selected project context. This is the single source of truth for "which project am I working in?" across the entire app. It drives sidebar switching, breadcrumb updates, and session persistence.

## Current State

- `ProjectService` exists (STORY-001) with `getProjects()`, `getProject()`, `getProjectMembers()`.
- No concept of "active project" exists in the frontend — every page is global-scoped.
- `PermissionService` tracks the user's global role and can check project roles, but does not track which project is selected.
- `sessionStorage` is not used anywhere in the app currently.

## Analysis

### Why a dedicated context service?

The project context is consumed by multiple parts of the app:
- `LayoutComponent` — switches sidebar items between global and project-scoped
- `ProjectShellComponent` (STORY-004) — sets/clears context on route enter/leave
- Breadcrumb service (STORY-006) — includes project name in the trail
- Future project-scoped pages — read the active project for API calls

A `BehaviorSubject<Project | null>` provides a reactive stream that all consumers can subscribe to. `sessionStorage` provides tab-scoped persistence across page refreshes.

### Why sessionStorage over localStorage?

- `sessionStorage` is tab-scoped: different browser tabs can have different active projects.
- `sessionStorage` clears when the tab is closed, which is the expected behavior (no stale project context on next visit).
- `localStorage` would share context across tabs and persist indefinitely, which could lead to confusing navigation.

### Service API design

```typescript
class ProjectContextService {
    // Reactive state
    currentProject$: Observable<Project | null>;

    // Setters
    setProject(project: Project): void;
    clearProject(): void;

    // Synchronous accessors
    getProjectId(): string | null;
    getCurrentProject(): Project | null;

    // Session restore (called on app init)
    restoreProject(): Observable<Project | null>;
}
```

- `setProject()` — pushes the project into the BehaviorSubject and writes `project.id` to `sessionStorage` under key `selectedProjectId`.
- `clearProject()` — pushes `null` into the BehaviorSubject and removes `selectedProjectId` from `sessionStorage`.
- `getProjectId()` — synchronous read from the BehaviorSubject's current value. Returns `null` if no project is active.
- `getCurrentProject()` — synchronous read of the full `Project` object from the BehaviorSubject.
- `restoreProject()` — reads `selectedProjectId` from `sessionStorage`, calls `projectService.getProject(id)` to fetch the full project, pushes it into the BehaviorSubject, and returns it. If no stored ID, or if the API call fails (project deleted, access revoked), returns `null` and clears storage silently.

### Interaction with other services

- Depends on `ProjectService` (for `getProject()` in `restoreProject()`).
- Does NOT depend on `PermissionService` — access checks are the responsibility of the project shell component and route guards, not the context service.
- `LayoutComponent` will subscribe to `currentProject$` (in STORY-004) to switch sidebar items.

### Edge cases

1. `restoreProject()` called with no stored ID → returns `of(null)`, no API call.
2. `restoreProject()` called with stored ID but API returns 404 → clears storage, returns `of(null)`.
3. `restoreProject()` called with stored ID but API returns 403 → clears storage, returns `of(null)`.
4. `setProject()` called multiple times → each call overwrites the previous value.
5. `clearProject()` called when no project is active → no-op (already null).

## Implementation Plan

1. Create `src/app/core/project/project-context.service.ts` with the API described above.
2. Create `src/app/core/project/project-context.service.spec.ts` with unit tests covering:
   - `setProject()` updates the BehaviorSubject and writes to sessionStorage
   - `clearProject()` resets state and removes from sessionStorage
   - `getProjectId()` returns current project ID or null
   - `getCurrentProject()` returns current project or null
   - `restoreProject()` with valid stored ID → fetches and sets project
   - `restoreProject()` with no stored ID → returns null, no HTTP call
   - `restoreProject()` with stored ID but 404 → clears storage, returns null
   - `restoreProject()` with stored ID but 403 → clears storage, returns null
3. Export from `src/app/core/project/index.ts`.
4. Verify build passes and all existing tests still pass.

## Files Changed

- `src/app/core/project/project-context.service.ts` (new)
- `src/app/core/project/project-context.service.spec.ts` (new)
- `src/app/core/project/index.ts` (add export)

## Acceptance Criteria

- [ ] `setProject()` updates the BehaviorSubject and persists project ID to sessionStorage
- [ ] `clearProject()` resets BehaviorSubject to null and removes from sessionStorage
- [ ] `getProjectId()` returns the current project ID synchronously, or null
- [ ] `getCurrentProject()` returns the current Project object synchronously, or null
- [ ] `restoreProject()` fetches the project from API using stored sessionStorage ID
- [ ] `restoreProject()` returns `null` gracefully if no stored ID
- [ ] `restoreProject()` clears storage and returns `null` if API returns 404 or 403
- [ ] Barrel export includes `ProjectContextService`
- [ ] Unit tests cover all methods and edge cases (8+ tests)
- [ ] Build passes: `npx ng build --configuration=development`
- [ ] All existing tests still pass: `npm run ng test`
