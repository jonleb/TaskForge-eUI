# BUG-001: Edit Icon Not Visible in Portfolio Table

## Symptom

The edit icon button in the Actions column of the portfolio table renders as an empty square with a blue focus border. The pencil icon is not displayed — only the button container is visible.

## Root Cause

The `icon` input on `eui-icon-button` was set to `"edit"`, which does not exist in the eUI icon library. eUI icons use a specific naming convention:

- eUI built-in icons use the `eui-` prefix: `eui-edit`, `eui-trash`, `eui-close`, etc.
- Third-party icon sets use the `name:set` format: `key:regular`, `prohibit:regular`, `check-circle:regular`.

The `eui-icon-button` component silently fails when the icon name is not found — it renders the button container but no SVG content inside it.

## Evidence

Existing working patterns in the codebase:

```html
<!-- admin users component — uses "name:set" format -->
<eui-icon-button icon="key:regular" ... />
<eui-icon-button icon="prohibit:regular" ... />

<!-- eUI table samples — uses "eui-" prefix -->
<eui-icon-button icon="eui-edit" size="s" euiPrimary ... />
<eui-icon-button icon="eui-trash" size="s" euiDanger ... />
<eui-icon-button icon="eui-arrow-right" size="s" euiInfo ... />
```

## Fix

Change `icon="edit"` to `icon="eui-edit"` in `portfolio.component.html`.

## Files Affected

- `src/app/features/projects/portfolio/portfolio.component.html`

## Lesson Learned

Always verify icon names against the eUI icon library naming convention. The `eui-icon-button` component does not throw errors or warnings for invalid icon names — it silently renders an empty container. Add `eui-edit` icon naming to the eUI pitfalls steering file.
