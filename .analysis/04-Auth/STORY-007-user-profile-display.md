# STORY-007: User Profile Display with Session Data

## Goal

Display the authenticated user's name and role in the toolbar user profile component, leveraging eUI's built-in `UserService` integration.

## Prerequisites

- STORY-003 (AuthService with `getCurrentUser()`) — done
- STORY-005 (AppStarterService fetches user details on auth) — done
- STORY-006 (Logout & session expiry) — done

## Current State Analysis

### What already exists:
- `eui-user-profile` component in `layout.component.html` with `isShowAvatarInitials` — **shows avatar initials from UserService**
- `AppStarterService.fetchUserDetails()` — **calls `AuthService.getCurrentUser()` when authenticated, initializes `UserService` with `userId`, `firstName`, `lastName`, `fullName`**
- `GET /api/auth/me` — **returns full profile including `role`**
- `UserProfile` interface — **has `userId`, `firstName`, `lastName`, `email`, `role`**
- `UserDetails` interface (eUI core) — **only has `userId`, `firstName`, `lastName`, `fullName`** (no `role` field)

### How `eui-user-profile` works:
- Automatically reads user data from `UserService` (injected internally)
- Displays user name and avatar initials based on `UserService` state
- `subInfos` input: displays additional text below the user name (ideal for role)
- `welcomeLabel` input: greeting text (default: `'Welcome'`)
- `isShowAvatarInitials`: shows initials when no avatar image (already set)
- `isShowUserInfos`: controls text visibility (default: `true`)
- `eui-user-profile-card`: richer card with function/organization, auto-fetches from `UserService`

### What's missing:
1. Role is not passed to `eui-user-profile` — the `subInfos` input is not set
2. `LayoutComponent` does not fetch or store the user's role
3. No role display anywhere in the toolbar

## Implementation Plan

### 1. Update `src/app/layout/layout.component.ts`

- Inject `AuthService`
- On init, call `AuthService.getCurrentUser()` to get the user profile (including role)
- Store the role as a component property for binding to `subInfos`
- Implement `OnInit` lifecycle hook

```typescript
userRole = '';

ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(profile => {
        this.userRole = profile.role;
    });
}
```

### 2. Update `src/app/layout/layout.component.html`

Bind `subInfos` to display the user's role:

```html
<eui-user-profile isShowAvatarInitials [subInfos]="userRole">
```

### 3. No backend changes needed

`GET /api/auth/me` already returns the `role` field in the user profile response.

### 4. No changes to `AppStarterService`

`AppStarterService` already initializes `UserService` with `firstName`, `lastName`, `fullName`. The `eui-user-profile` component reads these automatically. We only need to separately fetch the role for `subInfos` since `UserDetails` doesn't have a role field.

### Alternative considered: Extending `UserDetails`

We could extend `UserDetails` with a custom interface adding `role`, but this would fight against eUI's type system. Using `subInfos` is the idiomatic eUI approach for displaying additional user info like role/department.

## eUI Components Used

| Component | Input | Purpose |
|-----------|-------|---------|
| `eui-user-profile` | `isShowAvatarInitials` | Shows user initials in avatar (already set) |
| `eui-user-profile` | `subInfos` | Displays role below user name |
| `eui-user-profile` | `welcomeLabel` | Greeting text (keep default `'Welcome'`) |

Consulted via `eui-compodoc` MCP: `EuiUserProfileComponent` inputs, `EuiUserProfileCardComponent` inputs, `UserDetails` interface from `@eui/base`.

## Unit Tests

### `layout.component.spec.ts` (update)
- Should fetch current user on init
- Should set `userRole` from profile response
- Should handle error when fetching user profile (graceful fallback)

## Files to Modify
- `src/app/layout/layout.component.ts` — add `OnInit`, fetch role, expose `userRole`
- `src/app/layout/layout.component.html` — bind `[subInfos]="userRole"` on `eui-user-profile`
- `src/app/layout/layout.component.spec.ts` — add tests for user profile fetch

## Acceptance Criteria

- [ ] Toolbar shows authenticated user's name (via `UserService` integration, already working)
- [ ] User role is visible below the user name via `subInfos`
- [ ] When user profile fetch fails, component degrades gracefully (no error, empty role)
- [ ] Anonymous/unauthenticated state shows no role (login page has no toolbar)
- [ ] All existing tests still pass
- [ ] Build passes: `npx ng build --configuration=development`
- [ ] Screen reader announces user profile content meaningfully (a11y)
