# STORY-007: Frontend — Session Persistence & Restore

## Goal

Ensure the project context survives page refreshes. When the user refreshes the browser, the app should restore the previously selected project so the sidebar and breadcrumbs reflect the correct state immediately.

## Current State

- `ProjectContextService` already has `restoreProject()` which reads `selectedProjectId` from `sessionStorage`, fetches the project via API, and updates the `BehaviorSubject`. On failure it clears storage silently.
- `ProjectShellComponent` already fetches the project from the `:projectId` route param and calls `setProject()`. This means on refresh within a project route, the shell will re-fetch and set context anyway.
- `LayoutComponent` subscribes to `currentProject$` and switches sidebar accordingly.
- **Gap**: Nobody calls `restoreProject()` on app startup. The sidebar flickers from global → project-scoped because the shell component loads after the layout.

## Implementation Plan

### 1. `AppStarterService` — Chain restore after user init

Add `ProjectContextService.restoreProject()` to the `start()` pipeline so the project context is available before components render.

```typescript
start(): Observable<EuiServiceStatus> {
    return this.initUserService().pipe(
        switchMap(() => this.i18nService.init()),
        switchMap(status => this.projectContext.restoreProject().pipe(map(() => status))),
    );
}
```

This ensures:
- User profile is loaded first (auth context)
- i18n is initialized
- Project context is restored from sessionStorage (if any)
- If restore fails, it returns `null` silently (existing behavior)

### 2. Tests

Update `AppStarterService` spec to cover:
- Restore called during startup when sessionStorage has a project ID
- Restore returns null when no stored project (no-op)
- Restore failure doesn't break the startup chain

## Acceptance Criteria

- [x] Page refresh preserves project context
- [x] Sidebar shows correct items after refresh (no flicker)
- [x] Breadcrumbs show correct path after refresh
- [x] Invalid stored project is handled gracefully (cleared silently)
- [x] Revoked access is handled gracefully (cleared silently)
- [x] All existing tests still pass
- [x] Build passes
