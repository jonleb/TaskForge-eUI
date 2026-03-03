# BUG-002: Login Page Not Properly Styled and Centered

## Problem

The login page form renders with unstyled/plain HTML appearance instead of proper eUI styling. The inputs look like native browser inputs (no eUI theming), the labels are not positioned correctly, and the overall centering/layout is off. The "Sign in" button also appears unstyled.

## Screenshot Evidence

- Labels appear inline next to inputs instead of above them
- Inputs have plain browser styling (no eUI borders, padding, focus states)
- Button appears as a plain grey rectangle without eUI primary styling
- Form is not properly centered vertically on the page

## Root Cause

After BUG-001, the login page now renders outside the `<eui-app>` shell. The `eui-app` component applies global eUI theming (the `eui-21` class on `<html>`) and initializes CSS custom properties that eUI components depend on. Without the `eui-app` wrapper, eUI utility classes (`eui-u-*`) and component styles may not render correctly.

Additionally, the current template uses a plain `<div>` wrapper with eUI utility classes for centering. There is no eUI card/panel component available, but we can use `eui-page` structure to provide proper page semantics and styling.

## Proposed Fix

### Option A: Wrap login in a minimal `eui-app` shell (no sidebar, no toolbar)

The `EuiAppComponent` supports `[isSidebarHidden]="true"` to render without sidebar. We can use a minimal `eui-app` wrapper around the login page to get the eUI theming applied, without showing any navigation chrome:

```html
<eui-app [isSidebarHidden]="true">
    <!-- login form content centered with eui-page -->
    <eui-page>
        <eui-page-content>
            <!-- centered login form here -->
        </eui-page-content>
    </eui-page>
</eui-app>
```

This ensures:
- eUI global styles and CSS custom properties are initialized
- eUI utility classes work correctly
- eUI components (inputs, buttons, labels) render with proper theming
- No sidebar or toolbar visible — clean login page

### Option B: Use `eui-page` without `eui-app` + manual theme class

Add the `eui-21` theme class manually and use `eui-page` > `eui-page-header` > `eui-page-content` for structure. Less reliable since `eui-app` initializes more than just a CSS class.

## Recommended Approach: Option A

Use a minimal `eui-app [isSidebarHidden]="true"` wrapper in the login component. This is the cleanest solution because:
- eUI components get their full theming context
- No custom CSS hacks needed
- Follows eUI's own pattern for pages without navigation
- `eui-page` + `eui-page-content` provides proper semantic structure

### Template structure:

```html
<eui-app [isSidebarHidden]="true">
    <eui-page>
        <eui-page-content>
            <main class="eui-u-d-flex eui-u-flex-align-items-center eui-u-flex-justify-center eui-u-height-100">
                <div class="eui-u-width-20">
                    <h1 class="eui-u-text-center eui-u-mb-l">TaskForge</h1>
                    <!-- form content -->
                </div>
            </main>
        </eui-page-content>
    </eui-page>
</eui-app>
```

### Files to modify:
- `src/app/features/login/login.component.html` — wrap form in `eui-app [isSidebarHidden]` + `eui-page` structure
- `src/app/features/login/login.component.ts` — add `EUI_LAYOUT` and `EUI_PAGE` imports

## Acceptance Criteria

- [ ] Login page renders with proper eUI styling (themed inputs, labels, buttons)
- [ ] Login form is vertically and horizontally centered on the page
- [ ] No toolbar or sidebar visible on the login page
- [ ] eUI utility classes apply correctly (spacing, typography)
- [ ] All existing login tests still pass
- [ ] Build passes
