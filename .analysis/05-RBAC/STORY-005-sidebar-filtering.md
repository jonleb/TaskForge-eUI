# STORY-005: Frontend — Role-Based Sidebar Filtering

## Goal

Filter sidebar navigation items based on the user's global role so that users only see menu entries they have access to. Admin-only items (e.g. "Users") should be invisible to regular users.

## Prerequisites

- STORY-003 (PermissionService) — done
- STORY-004 (roleGuard) — done
- `LayoutComponent` already injects `PermissionService` and calls `setUser()` in `ngOnInit()`
- `EuiMenuItem` from `@eui/base` has a generic `metadata?: METADATA` field — we can use `EuiMenuItem<{ roles?: GlobalRole[] }>` to attach role requirements without extending the interface

## Current State

- `LayoutComponent.sidebarItems` is a static `EuiMenuItem[]` defined at class level
- All sidebar items are visible to all authenticated users
- No filtering logic exists

## EuiMenuItem Interface (relevant fields)

```typescript
interface EuiMenuItem<METADATA = unknown> {
    label?: string;
    url?: string;
    children?: EuiMenuItem[];
    metadata?: METADATA;
    // ... other fields
}
```

The `metadata` generic is the official eUI way to attach custom data to menu items.

## Implementation Plan

### 1. Define sidebar metadata type

In `LayoutComponent` (or a shared model file), define:

```typescript
interface SidebarItemMetadata {
    roles?: GlobalRole[];
}
```

### 2. Update `LayoutComponent.sidebarItems` type and data

Change the type from `EuiMenuItem[]` to `EuiMenuItem<SidebarItemMetadata>[]`.

Add `metadata: { roles: ['SUPER_ADMIN'] }` to items that require role gating. Items without `metadata.roles` remain visible to everyone.

Current sidebar items:
```typescript
sidebarItems: EuiMenuItem[] = [
    { label: 'Home', url: 'screen/home' },
    { label: 'Module 1', url: 'screen/module1', children: [...] },
    { label: 'Module 2', url: 'screen/module2' },
];
```

No items currently need role gating — that will happen in STORY-007 when the "Users" admin entry is added. But the filtering infrastructure must be in place.

### 3. Add filtering method to `LayoutComponent`

```typescript
private allSidebarItems: EuiMenuItem<SidebarItemMetadata>[] = [ ... ];
sidebarItems: EuiMenuItem<SidebarItemMetadata>[] = [];

private filterSidebarItems(): void {
    this.sidebarItems = this.allSidebarItems.filter(item => {
        const roles = item.metadata?.roles;
        if (!roles || roles.length === 0) {
            return true; // no restriction
        }
        return this.permissionService.hasGlobalRole(...roles);
    });
}
```

### 4. Call `filterSidebarItems()` after user profile is loaded

In `ngOnInit()`, after `permissionService.setUser(profile)`:

```typescript
ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
        next: profile => {
            this.userRole = profile.role;
            this.permissionService.setUser(profile);
            this.filterSidebarItems();
        },
        error: () => {
            this.userRole = '';
            this.filterSidebarItems(); // show only unrestricted items
        },
    });
}
```

### 5. Tests — update `layout.component.spec.ts`

- SUPER_ADMIN user sees all sidebar items (including those with `metadata.roles: ['SUPER_ADMIN']`)
- Regular user does not see items with `metadata.roles: ['SUPER_ADMIN']`
- Items without `metadata.roles` are visible to all users
- Sidebar is filtered after `ngOnInit()` completes
- Error case: sidebar shows only unrestricted items

## Files to Modify
- `src/app/layout/layout.component.ts` — add metadata type, filtering logic, split static items into `allSidebarItems` / `sidebarItems`
- `src/app/layout/layout.component.spec.ts` — add filtering tests

## Files NOT modified
- No new files created — this is a modification to existing `LayoutComponent`
- No backend changes

## Acceptance Criteria

- [ ] Sidebar items with `metadata.roles` are only visible to users with matching global role
- [ ] Sidebar items without `metadata.roles` are visible to all authenticated users
- [ ] SUPER_ADMIN sees all sidebar items
- [ ] Regular users do not see admin-only sidebar items
- [ ] Sidebar is filtered after login (not stale from previous session)
- [ ] Error case: only unrestricted items shown
- [ ] All existing tests still pass: `npm run ng test`
- [ ] Build passes: `npx ng build --configuration=development`
