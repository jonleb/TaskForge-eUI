# BUG-001: Login Page Renders Inside App Shell Layout

## Problem

The login page (`/login`) currently renders inside the `eui-app` layout shell, which includes the toolbar (logo, user profile, notifications, language selector) and the sidebar navigation. This is incorrect — the login page should be a standalone full-screen page without any app chrome.

## Current Behavior

When navigating to `/login`, the login form appears inside the `<eui-app>` wrapper, meaning:
- The top toolbar is visible (with user profile, notifications, etc.)
- The sidebar navigation is visible
- The login form renders in the content area alongside these elements

This happens because `app.component.html` wraps everything in `<eui-app>` and the `<router-outlet>` sits inside that layout. All routes, including `/login`, render within the shell.

## Expected Behavior

The `/login` route should render as a standalone full-page view:
- No toolbar
- No sidebar
- No app chrome
- Just the login form centered on the page (as currently designed in `login.component.html`)

Authenticated pages (`/screen/*`) should continue to render inside the `eui-app` layout with toolbar and sidebar.

## Root Cause

`app.component.html` unconditionally renders the `<eui-app>` shell around the `<router-outlet>`. There is no conditional logic to hide the shell for unauthenticated routes like `/login`.

## Proposed Fix

Restructure the routing/layout so that:

1. `app.component.html` uses a top-level `<router-outlet>` without the `eui-app` wrapper
2. Create a `LayoutComponent` (or `ShellComponent`) that wraps the `eui-app` shell + its own `<router-outlet>`
3. Move all authenticated routes (`/screen/*`) under the layout component as children
4. Keep `/login` at the top level, rendering directly without the shell

### Route structure after fix:

```
/login              → LoginComponent (no shell)
/screen/home        → LayoutComponent > HomeComponent (with shell)
/screen/module1     → LayoutComponent > Module1Component (with shell)
/screen/module2     → LayoutComponent > Module2Component (with shell)
```

### Files to modify:
- `src/app/app.component.html` — remove `eui-app` shell, keep only `<router-outlet>`
- `src/app/app.component.ts` — simplify imports (remove layout/toolbar/sidebar imports)
- `src/app/app.routes.ts` — restructure routes with layout wrapper
- Create `src/app/layout/layout.component.ts` — new shell component with `eui-app` markup
- Create `src/app/layout/layout.component.html` — moved shell template
- Update tests accordingly

## Acceptance Criteria

- [ ] `/login` renders as a full-page standalone form (no toolbar, no sidebar)
- [ ] `/screen/*` routes render inside the eUI app shell (toolbar + sidebar)
- [ ] All existing tests pass after restructuring
- [ ] Build passes
