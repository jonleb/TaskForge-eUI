# BUG-003: Login Page Renders Blank

## Problem

After BUG-002 fix wrapped the login form in `<eui-app [isSidebarHidden]="true">`, navigating to `/login` shows a completely blank page. The form is not visible at all.

## Root Cause

The `EuiAppComponent` (`<eui-app>`) uses content projection with specific named slots: `eui-app-sidebar`, `eui-app-toolbar`, and `<router-outlet>`. It expects a `<router-outlet>` to render child route content — it does not project arbitrary content like `<eui-page>` directly.

When we placed `<eui-page>` inside `<eui-app>` without a `<router-outlet>`, the content was not projected into any visible slot, resulting in a blank page.

Additionally, nesting a second `<eui-app>` inside a route that's already a child of the root `AppComponent` creates conflicts — `eui-app` is designed to be the single root layout shell, not a nestable wrapper.

## Fix Applied

1. Removed `<eui-app>` wrapper from the login component template entirely
2. Added `class="eui-21"` to `<html>` in `src/index.html` so eUI theming is always active, even when `eui-app` hasn't initialized (direct navigation to `/login`)
3. Used a component-scoped SCSS stylesheet (`login.component.scss`) for centering:
   - `:host` set to `display: block; height: 100vh` for full viewport height
   - `.login-container` uses flexbox centering with a light grey background
   - `.login-form-wrapper` provides a white card-like container with padding, border-radius, and box-shadow
4. Removed `EUI_LAYOUT` and `EUI_PAGE` imports from the login component (not needed)

## Why Not `eui-app` in Login?

- `eui-app` is a root shell component, not a nestable layout wrapper
- It uses named content projection slots (`eui-app-sidebar`, `eui-app-toolbar`, `router-outlet`)
- Arbitrary content placed inside it without matching these slots is not rendered
- The eUI theme class (`eui-21`) can be set statically on `<html>` in `index.html` instead

## Files Modified

- `src/index.html` — added `class="eui-21"` to `<html>`
- `src/app/features/login/login.component.html` — removed `eui-app` wrapper, uses simple semantic HTML with eUI form components
- `src/app/features/login/login.component.ts` — removed `EUI_LAYOUT`/`EUI_PAGE` imports, added `styleUrl`
- `src/app/features/login/login.component.scss` — new file, centering and card-like styling

## Acceptance Criteria

- [ ] `/login` renders the login form (not blank)
- [ ] Form is vertically and horizontally centered
- [ ] eUI component styling is applied (themed inputs, labels, button)
- [ ] No toolbar or sidebar visible
- [ ] Build passes
- [ ] All existing tests pass
