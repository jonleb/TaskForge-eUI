# STORY-007: Integration — Demo Admin Route with Full RBAC Stack

## Goal

Wire up a concrete example route that exercises the full RBAC stack end-to-end: a "Users" admin page accessible only to SUPER_ADMIN. This story validates that all previous RBAC stories (seed data, authorization middleware, permission service, role guard, sidebar filtering, access-denied feedback) work together correctly.

## Prerequisites

- STORY-001 (seed data) — done
- STORY-002 (authorization middleware) — done
- STORY-003 (PermissionService) — done
- STORY-004 (roleGuard) — done
- STORY-005 (sidebar filtering) — done
- STORY-006 (access-denied feedback) — done

## Current State

- `app.routes.ts` has `authGuard` on the layout shell but no role-gated routes
- `LayoutComponent.allSidebarItems` has Home, Module 1, Module 2 — no admin entries
- `roleGuard` exists and is exported from `src/app/core/auth/index.ts` but is not wired to any route
- No `src/app/features/admin/` folder exists

## Implementation Plan

### 1. Create `src/app/features/admin/users/users.component.ts`

Minimal standalone component using `eui-page` / `eui-page-header`:

```typescript
import { Component } from '@angular/core';
import { EUI_PAGE } from '@eui/components/eui-page';

@Component({
    selector: 'app-users',
    template: `
        <eui-page>
            <eui-page-header label="User Administration" />
            <eui-page-content>
                <p>User management features will be implemented in a future story.</p>
            </eui-page-content>
        </eui-page>
    `,
    imports: [...EUI_PAGE],
})
export class UsersComponent {}
```

#### Design decisions
- Standalone component (no NgModule) — consistent with the rest of the app
- Uses `eui-page` > `eui-page-header` > `eui-page-content` for proper landmark regions (a11y)
- Single `<h1>` via `eui-page-header label` — meets heading hierarchy requirement
- Placeholder content — the actual user management UI is a future feature

### 2. Create `src/app/features/admin/users/users.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';

export const USERS_ROUTES: Routes = [
    { path: '', component: UsersComponent },
];
```

### 3. Update `src/app/app.routes.ts`

Add the admin/users route inside the layout children, protected by both `authGuard` and `roleGuard`:

```typescript
import { authGuard, roleGuard } from './core/auth';

// Inside the layout children array:
{
    path: 'screen/admin/users',
    loadChildren: () => import('./features/admin/users/users.routes').then(m => m.USERS_ROUTES),
    data: { roles: ['SUPER_ADMIN'] },
    canActivate: [authGuard, roleGuard],
}
```

Note: `authGuard` is already on the parent layout route, but adding it here too is defensive — if the route is ever moved outside the layout shell, it remains protected.

### 4. Update `src/app/layout/layout.component.ts`

Add a "Users" entry to `allSidebarItems` with role gating:

```typescript
private readonly allSidebarItems: EuiMenuItem<SidebarItemMetadata>[] = [
    { label: 'Home', url: 'screen/home' },
    { label: 'Module 1', url: 'screen/module1', children: [
        { label: 'page 1', url: 'screen/module1/page1' },
        { label: 'page 2', url: 'screen/module1/page2' },
    ] },
    { label: 'Module 2', url: 'screen/module2' },
    { label: 'Users', url: 'screen/admin/users', metadata: { roles: ['SUPER_ADMIN'] } },
];
```

The existing `filterSidebarItems()` logic (STORY-005) will automatically hide this entry for non-SUPER_ADMIN users.

### 5. Tests

#### `src/app/features/admin/users/users.component.spec.ts`

- Component creates successfully
- Template renders `eui-page-header` with label "User Administration"
- Template renders placeholder content

#### `src/app/layout/layout.component.spec.ts` — update existing tests

- SUPER_ADMIN user sees "Users" in sidebar items
- Regular user does not see "Users" in sidebar items

(The existing sidebar filtering tests already cover the generic pattern. We just need to verify the new item is present in `allSidebarItems`.)

## Files to Create

- `src/app/features/admin/users/users.component.ts`
- `src/app/features/admin/users/users.component.spec.ts`
- `src/app/features/admin/users/users.routes.ts`

## Files to Modify

- `src/app/app.routes.ts` — add admin/users route with `roleGuard`
- `src/app/layout/layout.component.ts` — add "Users" sidebar entry with `metadata.roles`

## No Backend Changes

The page is a placeholder — no new API endpoints needed.

## Accessibility

- `eui-page` > `eui-page-header` > `eui-page-content` provides proper landmark regions
- Single `<h1>` via `eui-page-header label="User Administration"`
- No heading level skips
- Denied navigation triggers a growl notification (via `roleGuard` from STORY-004) which uses `aria-live="polite"`

## Acceptance Criteria

- [ ] SUPER_ADMIN can navigate to `/screen/admin/users` and sees the "User Administration" page
- [ ] Non-SUPER_ADMIN users do not see "Users" in the sidebar
- [ ] Non-SUPER_ADMIN users navigating directly to `/screen/admin/users` are redirected to `/screen/home` with a growl notification
- [ ] Page uses `eui-page` / `eui-page-header` / `eui-page-content` structure
- [ ] Route is lazy-loaded via `loadChildren`
- [ ] Unit tests pass for the new component
- [ ] All existing tests still pass: `npm run ng test`
- [ ] Build passes: `npx ng build --configuration=development`
